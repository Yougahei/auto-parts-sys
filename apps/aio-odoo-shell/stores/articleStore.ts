import { create } from "zustand";
import {ArticleCollectList} from "../types/article";
import {TreeDataList} from "../types/tree";


type ArticleStore = {
    articleCollectList: ArticleCollectList;
    setArticleCollectList: (articleCollectList: ArticleCollectList) => void;
    selectCatalogCollectIds: number[];
    setSelectCollectIds: (selectCatalogCollectIds: number[]) => void;
    jsonTree: TreeDataList ;
    setJsonTree: (jsonTree: TreeDataList) => void;
}

export const useArtitleStore = create<ArticleStore>((set) => ({
    articleCollectList: [] as ArticleCollectList,
    setArticleCollectList: (articleCollectList: ArticleCollectList) => set({ articleCollectList }),
    selectCatalogCollectIds: [] as number[],
    setSelectCollectIds: (selectCatalogCollectIds: number[]) => set({ selectCatalogCollectIds }),
    jsonTree: [],
    setJsonTree: (jsonTree: TreeDataList) => set({ jsonTree }),
}))
