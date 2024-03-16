import React from "react";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@repo/ui/components/ui/avatar";

interface AvatarChatProps {
    message: string;
    role: "user" | "bot";
    avatar?: {
        src: string;
        fallback?: string;
    };
}

export default function AvatarChat({ message, avatar, role }: AvatarChatProps) {
    return (
        <div
            className={`flex ${role === "user" ? "flex-row-reverse" : "flex-row"} space-x-4`}
        >
            <Avatar className={role === "user" ? "ml-4" : ""}>
                <AvatarImage src={avatar?.src} alt="@fangce" />
                <AvatarFallback>
                    {role === "user" ? "用户" : "AI"}
                </AvatarFallback>
            </Avatar>
            <div className="space-y-1 overflow-auto break-words mt-2">
                {message}
            </div>
        </div>
    );
}
