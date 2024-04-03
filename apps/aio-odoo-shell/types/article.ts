export type ArticleCollect = {
    id: string
    name: string
    description: string | false
    category_id: any[]
    catalog_list:string
    article_ids: number[]
    company_id: any[]
    active: boolean
    write_date: string
}

export type ArticleCollectList = ArticleCollect[]

export type ArticleCatalogList = ArticleCatalog[];

export type ArticleCatalog = {
    id: string;
    name: string;
    variant: "default" | "ghost";
    company_id: any[];
    article_collect_ids: number[];
}
