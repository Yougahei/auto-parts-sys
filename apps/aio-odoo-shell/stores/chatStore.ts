import { create } from "zustand";

import { chatList } from "../demo-data/chat-demo";
import { hitstoryList } from "../demo-data/history-demo";
import { ChatHistoryList, ChatMessageList } from "../types/chat";

interface ChatStore {
    chatMessageList: ChatMessageList;
    chatHistoryList: ChatHistoryList;
    chatLoading: boolean;
    knowlegeBase: { value: string; label: string }[];
    setChatMessageList: (chatMessageList: ChatMessageList) => void;
    setChatHistoryList: (chatHistoryList: ChatHistoryList) => void;
    setChatLoading: (chatLoading: boolean) => void;
    setKnowlegeBase: (knowlegeBase: { value: string; label: string }[]) => void;
}

export const chatStore = create<ChatStore>((set) => ({
    chatMessageList: chatList,
    chatHistoryList: hitstoryList,
    chatLoading: false,
    knowlegeBase: [],
    setChatMessageList: (chatMessageList: ChatMessageList) =>
        set({ chatMessageList }),
    setChatHistoryList: (chatHistoryList: ChatHistoryList) =>
        set({ chatHistoryList }),
    setChatLoading: (chatLoading: boolean) => set({ chatLoading }),
    setKnowlegeBase: (knowlegeBase: { value: string; label: string }[]) =>
        set({ knowlegeBase }),
}));
