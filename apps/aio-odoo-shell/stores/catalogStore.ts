import { create } from "zustand";
import {CatalogList} from "../types/catalog";

type CatalogStore = {
    catalogList: CatalogList,
    setCatalogList: (catalogList: CatalogList) => void
}

export const useCatalogListStore = create<CatalogStore>((set) => ({
    catalogList: JSON.parse(sessionStorage.getItem("catalogList") || '[]'),
    setCatalogList: (catalogList: CatalogList) => {
        sessionStorage.setItem("catalogList", JSON.stringify(catalogList))
        set({catalogList})
    }
}))
