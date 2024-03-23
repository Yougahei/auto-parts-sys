import { create } from "zustand";
import {TreeDataList} from "../types/tree";


type TreeStore = {
    treeData: TreeDataList;
    setTreeData: (treeData: TreeDataList) => void;
    hydrate: () => void;
}

export const useTreeStore = create<TreeStore>((set) => ({
    treeData: [] as TreeDataList,
    setTreeData: (treeData: TreeDataList) => set({ treeData }),
    hydrate: () => {
        const storedData = localStorage.getItem('treeData');
        if (storedData) {
            const treeData: TreeDataList = JSON.parse(storedData);
            set({ treeData });
        }
    },
}))
