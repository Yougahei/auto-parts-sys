"use client";

import React, { useEffect, useState } from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { Button } from "@repo/ui/components/ui/button";
import {
    Command,
    CommandEmpty, CommandGroup,
    CommandInput, CommandItem,
} from "@repo/ui/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@repo/ui/components/ui/popover";
import { Textarea } from "@repo/ui/components/ui/textarea";
import { Navigation, NavigationOff } from "lucide-react";
import { chatStore } from "../../stores/chatStore";
import { ChatMessageList } from "../../types/chat";
import chatService from "../../utils/chatService";
import { cn } from "@repo/ui/lib/utils";


export default function ChatInput() {
    const { chatLoading, setChatLoading, chatMessageList, setChatMessageList } = chatStore((state) => state);
    const [ prompt, setPrompt ] = useState<string>("");
    const [ open, setOpen ] = React.useState(false);
    const [ choosen, setChoosen ] = useState<string>();
    const { knowlegeBase, setKnowlegeBase } = chatStore((state) => state);

    useEffect(() => {
        setKnowlegeBase([{value: "1", label: "知识库1"}]);
    }, []);

    function onSend() {
        if (chatLoading) return chatService.cancel();
        if (prompt === '') return;
        const list: ChatMessageList = [
            ...chatMessageList,
            {
                message: prompt,
                role: 'user'
            }
        ];
        setChatMessageList(list);
        setChatLoading(true);
        chatService.getStream({ url: "/api/chat", question: prompt });
        setPrompt('');
    }

    return (
        <>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[200px] justify-between"
                    >
                        {choosen
                            ? knowlegeBase.find((base) => base.value === choosen)?.label
                            : "选择知识库提问..."}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandInput placeholder="Search framework..." className="h-9" />
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                            {knowlegeBase.map((framework) => (
                                <CommandItem
                                    key={framework.value}
                                    value={framework.value}
                                    onSelect={(currentValue) => {
                                        setChoosen(currentValue === choosen ? "" : currentValue)
                                        setOpen(false)
                                    }}
                                >
                                    {framework.label}
                                    <CheckIcon
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            choosen === framework.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>
            <div className="fixed-0 relative bottom-0 w-full">
                <Textarea
                    placeholder="Type your message here."
                    className="resize-y"
                    disabled={chatLoading}
                    value={prompt}
                    onChange={(e) => {
                        setPrompt(e.target.value);
                    }}
                />
                <Button className="absolute right-4 bottom-4 w-12" onClick={onSend}>
                    {chatLoading ? <NavigationOff /> : <Navigation />}
                </Button>
            </div>
        </>

    );
}
