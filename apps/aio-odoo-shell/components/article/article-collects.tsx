"use client";

import React, {useEffect} from "react";
import { Badge } from "@ui/components/ui/badge";
import { Input } from "@ui/components/ui/input";
import { ScrollArea, ScrollBar } from "@ui/components/ui/scroll-area";
import { cn } from "@ui/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { Search } from "lucide-react";

import { getArticleCollectLists } from "../../actions/odoo-article-actions";
import { useArtitleStore } from "../../stores/articleStore";
import { ArticleCollectList } from "../../types/article";
import { BaseInfo } from "../../types/odooStoreType";

function ArticleCollects() {
    const { articleCollectList, setArticleCollectList, selectCatalogCollectIds, jsonTree, setJsonTree } =
        useArtitleStore((state) => state);
    const [search, setSearch] =
        React.useState<ArticleCollectList>(articleCollectList);

    function onChange(e: any) {
        console.log(e.target.value);
        if (!e.target.value) {
            setSearch(articleCollectList);
            return;
        } else {
            const filterItems = articleCollectList.filter((item) => {
                return item.name.toLowerCase().includes(e.target.value);
            });
            setSearch(filterItems);
        }
    }

    // 获取文章集合
    async function getCollectList() {
        const storedBaseInfo = sessionStorage.getItem("baseInfo");
        const infoBase: BaseInfo = JSON.parse(storedBaseInfo ?? "{}");
        try {
            const response = await getArticleCollectLists(
                infoBase.token,
                selectCatalogCollectIds
            );
            setArticleCollectList(response.result);
            setSearch(response.result);
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        // 监听选中分类变化获取对应分类的集合
        getCollectList();
    }, [selectCatalogCollectIds]);

    return (
        <div>
            <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <form>
                    <div className="relative">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search"
                            className="pl-8"
                            onChange={onChange}
                        />
                    </div>
                </form>
            </div>

            {articleCollectList.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                    <div className="">No items found</div>
                </div>
            ) : (
                <ScrollArea className="h-[70vh] w-full">
                    <div className="flex flex-col gap-2 p-4 pt-0 h-full">
                        {search.map((item) => (
                            <button
                                key={item.id}
                                className={cn(
                                    "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent"
                                    // mail.selected === item.id && "bg-muted"
                                )}
                                onClick={
                                    () => setJsonTree(item.catalog_list? JSON.parse(item.catalog_list) : [])
                                }
                            >
                                <div className="flex w-full flex-col gap-1">
                                    <div className="flex items-center">
                                        <div className="flex items-center gap-2">
                                            <div className="font-semibold">
                                                {item.name}
                                            </div>
                                            {/*{!item.active && (*/}
                                            {/*    <span className="flex h-2 w-2 rounded-full bg-blue-600" />*/}
                                            {/*)}*/}
                                        </div>
                                        <div
                                            className={cn(
                                                "ml-auto text-xs"
                                                // jsonTree === item.catalog_list
                                                //     ? "text-foreground"
                                                //     : "text-muted-foreground"
                                            )}
                                        >
                                            {formatDistanceToNow(
                                                new Date(item.write_date),
                                                {
                                                    addSuffix: true,
                                                }
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="line-clamp-2 text-xs text-muted-foreground">
                                    {item.description
                                        ? item.description.substring(0, 300)
                                        : "No description"}
                                </div>

                                <div className="flex items-center gap-2">
                                    <Badge
                                        variant={
                                            item.active
                                                ? "default"
                                                : "destructive"
                                        }
                                        className={
                                            item.active ? "bg-green-500" : ""
                                        }
                                    >
                                        {item.active ? "启用" : "禁用"}
                                    </Badge>
                                </div>
                            </button>
                        ))}
                    </div>
                    <ScrollBar orientation="vertical" />
                </ScrollArea>
            )}
        </div>
    );
}

export default ArticleCollects;
