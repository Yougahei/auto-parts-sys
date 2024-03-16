"use client";

import React from "react";
import { Button, buttonVariants } from "@repo/ui/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@repo/ui/components/ui/dropdown-menu";
import {
    Archive,
    ExternalLink,
    MoreHorizontal,
    PencilLine,
    Trash2,
} from "lucide-react";

import { ChatHistoryList } from "../../types/chat";
import IconButton from "../common/icon-button";

interface ChatHistoryProps {
    historyList: ChatHistoryList;
}

export default function ChatHistory({ historyList }: ChatHistoryProps) {
    return (
        <div className="flex flex-col ml-3 space-y-1 mt-1">
            {historyList.map((history, index) => {
                return (
                    <DropdownMenu key={index}>
                        <div
                            className={`flex flex-row justify-between w-full py-2 rounded-md ${buttonVariants(
                                {
                                    variant: "ghost",
                                }
                            )}`}
                        >
                            <div className="text-lg flex items-center">
                                {history.title}
                            </div>
                            <div className="flex items-center">
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        className="mr-1 w-12"
                                        variant="ghost"
                                    >
                                        <MoreHorizontal />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuItem>
                                        <IconButton icon={<ExternalLink />}>
                                            分享
                                        </IconButton>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <IconButton icon={<PencilLine />}>
                                            重命名
                                        </IconButton>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <IconButton
                                            icon={<Trash2 />}
                                            variant="destructive"
                                        >
                                            删除
                                        </IconButton>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                                <Button className="mr-1 w-12" variant="ghost">
                                    <Archive />
                                </Button>
                            </div>
                        </div>
                    </DropdownMenu>
                );
            })}
        </div>
    );
}
