export interface ChatMessage {
    role: "user" | "bot";
    message: string;
    avatar?: {
        src: string;
        fallback?: string;
    };
}

export type ChatMessageList = ChatMessage[];


export interface ChatHistory {
    id: string;
    title: string;
    description: string;
}

export type ChatHistoryList = ChatHistory[];
