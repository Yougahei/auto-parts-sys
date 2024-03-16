import React, { useEffect, useRef } from "react";

import { ChatMessageList } from "../../types/chat";
import { ScrollArea, ScrollBar } from "@repo/ui/components/ui/scroll-area";
import AvatarChat from "./avatar-chat";
import ChatInput from "./chat-input";

interface ChatMainProps {
    chatList: ChatMessageList;
}

export default function ChatMain({ chatList }: ChatMainProps) {
    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
    };

    useEffect(scrollToBottom, [chatList]);

    return (
        <div className="rounded-md container h-[92vh] flex flex-col justify-between " >
            <div className="flex flex-col h-full overflow-auto w-full">
                <ScrollArea>
                    {chatList.map((chat, index) => {
                        return (
                            <div
                                className={`flex-shrink-0 p-4 w-auto ${chat.role === "bot" ? "mr-auto" : "ml-auto"}`}
                                key={index}
                            >
                                <AvatarChat
                                    message={chat.message}
                                    role={chat.role}
                                    avatar={chat.avatar}
                                />
                            </div>
                        );
                    })}
                    <div ref={messagesEndRef} />
                    <ScrollBar />
                </ScrollArea>
            </div>
            <ChatInput />
        </div>
    );
}
