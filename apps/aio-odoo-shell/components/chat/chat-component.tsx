"use client";

import React, { useState } from "react";
import { Button } from "@repo/ui/components/ui/button";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,

} from "@repo/ui/components/ui/resizable";
import { ScrollArea, ScrollBar } from "@repo/ui/components/ui/scroll-area";
import { TooltipProvider } from "@repo/ui/components/ui/tooltip";
import { cn } from "@repo/ui/lib/utils";
import { Bot, SquarePen } from "lucide-react";

import { chatStore } from "../../stores/chatStore";
import { ChatMessageList } from "../../types/chat";
import chatService from "../../utils/chatService";
import ChatHistory from "./chat-history";
import ChatMain from "./chat-main";
import { Separator } from "@ui/components/ui/separator";

interface ChatProps {
    defaultLayout: number[] | undefined;
    defaultCollapsed?: boolean;
    navCollapsedSize: number;
}

export default function ChatComponent({
    defaultLayout = [235, 995],
    defaultCollapsed = false,
    navCollapsedSize,
}: ChatProps) {

    const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
    const {
        setChatLoading,
        chatMessageList,
        setChatMessageList,
        chatHistoryList,
    } = chatStore((state) => state);

    const setMessage = (suggestion: string) => {
        if (suggestion === "") return;
        const len = chatMessageList.length;
        const lastMessage = len ? chatMessageList[len - 1] : null;
        let newList: ChatMessageList;
        if (lastMessage?.role === "bot") {
            newList = [
                ...chatMessageList.slice(0, len - 1),
                {
                    ...lastMessage,
                    message: suggestion,
                },
            ];
        } else {
            newList = [
                ...chatMessageList,
                {
                    message: suggestion,
                    role: "bot",
                },
            ];
        }
        setChatMessageList(newList);
    };

    chatService.actions = {
        onCompleting: (sug) => setMessage(sug),
        onCompleted() {
            setChatLoading(false);
        },
    };

    return (
        <TooltipProvider delayDuration={0}>
            <ResizablePanelGroup
                direction="horizontal"
                onLayout={(sizes: number[]) => {
                    document.cookie = `chat-resizable-panels:layout=${JSON.stringify(
                        sizes
                    )}`;
                }}
                className="h-full items-stretch"
            >
                <ResizablePanel
                    defaultSize={15}
                    collapsedSize={navCollapsedSize}
                    collapsible={true}
                    minSize={15}
                    maxSize={15}
                    onCollapse={() => {
                        setIsCollapsed(!isCollapsed);
                        document.cookie = `chat-resizable-panels:collapsed=${JSON.stringify(
                            !isCollapsed
                        )}`;
                    }}
                    className={cn(
                        isCollapsed &&
                            "min-w-0 transition-all duration-300 ease-in-out  ml-3 mr-3 space-y-1"
                    )}
                >
                    <div>
                        <div
                            className={cn(
                                "flex h-[52px] items-center justify-center rounded-md px-2"
                            )}
                        >
                            <Button className="w-full" variant="ghost">
                                <div className="flex justify-between w-full">
                                    <div className=" flex ">
                                        <Bot className="mr-3" /> 开始新的聊天
                                    </div>
                                    <SquarePen />
                                </div>
                            </Button>
                        </div>
                        <Separator />
                        <ScrollArea className="flex-1">
                            <ChatHistory historyList={chatHistoryList} />
                            <ScrollBar orientation="vertical" />
                        </ScrollArea>
                    </div>
                </ResizablePanel>
                <ResizableHandle  disabled/>
                <ResizablePanel defaultSize={85} minSize={30}>
                    <ChatMain chatList={chatMessageList} />
                </ResizablePanel>
            </ResizablePanelGroup>
        </TooltipProvider>
    );
}
