"use client";

import React, { useEffect } from "react";
import { Input } from "@ui/components/ui/input";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@ui/components/ui/resizable";
import { Separator } from "@ui/components/ui/separator";
import { TooltipProvider } from "@ui/components/ui/tooltip";
import { cn } from "@ui/lib/utils";



import { getArticleCatalog } from "../../actions/odoo-article-actions";
import { ArticleCatalogList } from "../../types/article";
import { BaseInfo } from "../../types/odooStoreType";
import ArticleCollects from "./article-collects";
import ArticleList from "./article-list";
import { Nav } from "./Nav";
import {useArtitleStore} from "../../stores/articleStore";


interface AriticleMainProps {
    defaultLayout?: number[] | undefined;
    defaultCollapsed?: boolean;
    navCollapsedSize: number;
}

function ArticleMain({
    defaultLayout = [20, 60, 20],
    defaultCollapsed = false,
    navCollapsedSize,
}: AriticleMainProps) {
    let articleCatalogList: ArticleCatalogList = [];
    const [loading, setLoading] = React.useState(true);
    const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
    const [navLinks, setNavLinks] =
        React.useState<ArticleCatalogList>(articleCatalogList);

    const { setSelectCollectIds } = useArtitleStore((state) => state);

    useEffect(() => {
        fetchInitialValue();
    }, []);

    function onChange(e: any) {
        const value = e.target.value;
        console.log(value);
        if (!value) {
            setNavLinks(articleCatalogList);
            return;
        } else {
            const filterLinks = navLinks.filter((link) => {
                return link.name.toLowerCase().includes(value);
            });
            setNavLinks(filterLinks);
        }
    }

    async function fetchInitialValue() {
        const storedBaseInfo = sessionStorage.getItem("baseInfo");
        const infoBase: BaseInfo = JSON.parse(storedBaseInfo ?? "{}");
        try {
            const response = await getArticleCatalog(infoBase.token);
            articleCatalogList = response.result;
            setNavLinks(articleCatalogList);
            if(articleCatalogList[0] && articleCatalogList[0].article_collect_ids.length > 0) {
                setSelectCollectIds(articleCatalogList[0].article_collect_ids);
            }
            setLoading(false);
        } catch (e) {
            return;
        }
    }

    return (
        <TooltipProvider delayDuration={0}>
            <ResizablePanelGroup
                direction="horizontal"
                onLayout={(sizes: number[]) => {
                    document.cookie = `article-resizable-panels:layout=${JSON.stringify(
                        sizes
                    )}`;
                }}
                className="h-full max-h-[800px] items-stretch"
            >
                <ResizablePanel
                    defaultSize={defaultLayout[0]}
                    collapsedSize={navCollapsedSize}
                    collapsible={true}
                    minSize={20}
                    maxSize={20}
                    //@ts-ignore
                    onCollapse={(collapsed) => {
                        setIsCollapsed(collapsed);
                        document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
                            collapsed
                        )}`;
                    }}
                    className={cn(
                        isCollapsed &&
                            "min-w-[50px] transition-all duration-300 ease-in-out h-[92vh]"
                    )}
                >
                    <div
                        className={cn(
                            "flex h-[52px] items-center justify-center",
                            isCollapsed ? "h-[52px]" : "px-2"
                        )}
                    >
                        <Input placeholder="分类搜索" onChange={onChange} />
                    </div>
                    <Separator />
                    {loading ? (
                        <div>loading...</div>
                    ) : (
                        <Nav isCollapsed={isCollapsed} links={navLinks} />
                    )}
                </ResizablePanel>
                <ResizableHandle disabled />
                <ResizablePanel
                    defaultSize={defaultLayout[1]}
                    minSize={60}
                    maxSize={60}
                >
                    <div className="flex items-center px-4 py-2 mb-2">
                        <h1 className="text-xl font-bold">
                            Article Collections
                        </h1>
                    </div>
                    <Separator />
                    <ArticleCollects/>
                </ResizablePanel>
                <ResizableHandle disabled />
                <ResizablePanel defaultSize={defaultLayout[2]}>
                    <ArticleList/>
                </ResizablePanel>
            </ResizablePanelGroup>
        </TooltipProvider>
    );
}

export default ArticleMain;
