"use client";

import React, { useEffect, useState } from "react";
import { Badge } from "@ui/components/ui/badge";
import { Input } from "@ui/components/ui/input";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@ui/components/ui/resizable";
import { Separator } from "@ui/components/ui/separator";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@ui/components/ui/tabs";
import { TooltipProvider } from "@ui/components/ui/tooltip";
import { cn } from "@ui/lib/utils";

import { getProductList } from "../../actions/odoo-action";
import { BaseInfo } from "../../types/odooStoreType";
import { Product, ProductList, ProductStatusEnum } from "../../types/product";
import { Heading } from "../common/page-tools/heading";
import ImageKanbanView from "../common/views/image-kanban-view";
import ProductFilter from "./filter/product-filter";

const operateBar = {
    view: true,
    create: "/product/create",
    placeholder: "搜索产品库",
    searchKey: "name",
};

interface ProductComponentProps {
    defaultLayout?: number[];
    defaultCollapsed?: boolean;
    navCollapsedSize: number;
}

function ProductComponent({
    defaultLayout = [20, 40, 40],
    navCollapsedSize,
}: ProductComponentProps) {
    const [dataList, setDataList] = useState<ProductList>([]);
    const [loading, setLoading] = React.useState(true);

    const handleClick = (data: Product) => {
        // router.push(`/product?product_id=${data.id}`);
    };

    async function initData() {
        const storedBaseInfo = sessionStorage.getItem("baseInfo");
        const infoBase: BaseInfo = JSON.parse(storedBaseInfo ?? "{}");
        const data = await getProductList(infoBase.token);
        setDataList(data.result);
        setLoading(false);
    }

    useEffect(() => {
        initData();
    }, []);

    if (loading) {
        return <div>loading...</div>;
    }

    function product_status(data: ProductStatusEnum) {
        const badgeStatus = {
            draft: { color: "bg-red-500", name: "草稿" },
            prepared: { color: "bg-blue-500", name: "已准备" },
            reviewed: { color: "bg-yellow-500", name: "审核" },
            not_ready: { color: "bg-gray-500", name: "未准备" },
            done: { color: "bg-green-500", name: "完成" },
        };
        return (
            <Badge className={badgeStatus[data].color}>
                {badgeStatus[data].name}
            </Badge>
        );
    }

    function content(data: Product) {
        return (
            <div className="space-y-0.5">
                <div>{`SKU: ${data.sku}`}</div>
                <div>
                    {`Status：`} {product_status(data.product_status)}
                </div>
                <div>
                    {`Active：`}{" "}
                    <Badge
                        className={data.active ? "bg-green-500" : "bg-red-500"}
                    >
                        {data.active ? "InUse" : "NotUse"}
                    </Badge>
                </div>
            </div>
        );
    }

    return (
        <div>
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
                    >
                        <Tabs defaultValue="filter">
                            <TabsList className="w-full">
                                <TabsTrigger value="filter" className="w-full">
                                    Filter
                                </TabsTrigger>
                                <TabsTrigger value="views" className="w-full">
                                    Views
                                </TabsTrigger>
                            </TabsList>
                            <Separator />
                            <TabsContent value="filter"><ProductFilter/></TabsContent>
                            <TabsContent value="views">Change your password here.</TabsContent>
                        </Tabs>
                    </ResizablePanel>
                    <ResizableHandle disabled />
                    <ResizablePanel
                        defaultSize={defaultLayout[1]}
                        minSize={defaultLayout[1]}
                        maxSize={defaultLayout[1]}
                    >
                        <div className="flex items-center px-4 py-2 mb-2">
                            <h1 className="text-xl font-bold">Product Cards</h1>
                        </div>
                        <ImageKanbanView
                            initDataList={dataList}
                            operateBar={operateBar}
                            onClick={(data) => handleClick(data)}
                            // imageKey="image_128"
                            content={content}
                        />
                    </ResizablePanel>
                    <ResizableHandle disabled />
                    <ResizablePanel defaultSize={defaultLayout[2]}>
                        <>内容3</>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </TooltipProvider>
        </div>
    );
}

export default ProductComponent;
