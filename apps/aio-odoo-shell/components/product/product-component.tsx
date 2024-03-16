"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@ui/components/ui/tabs";

import { getProductList } from "../../actions/odoo-action";
import { Product } from "../../types/odoo/odoo-product";
import { BaseInfo } from "../../types/odooStoreType";
import { Heading } from "../common/page-tools/heading";
import ImageKanbanView from "../common/views/image-kanban-view";
import { Badge } from "@ui/components/ui/badge";

import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@ui/components/ui/dialog";
import { Button } from "@ui/components/ui/button";

const operateBar = {
    view: true,
    // create: "/product/create",
    placeholder: "搜索产品库",
    searchKey: "name",
};

function ProductComponent() {
    const router = useRouter();
    const [dataList, setDataList] = useState<Product[]>([]);
    const [loading, setLoading] = React.useState(true);

    const handleClick = (data: any) => {
        router.push(`/product?product_id=${data.id}`);
    };

    async function initData() {
        const storedBaseInfo = sessionStorage.getItem("baseInfo");
        const infoBase: BaseInfo = JSON.parse(storedBaseInfo ?? "{}");
        const data = await getProductList(infoBase.token);
        // console.log(data.result);
        setDataList(data.result);
        setLoading(false);
    }

    useEffect(() => {
        initData();
    }, []);

    if (loading) {
        return <div>loading...</div>;
    }

    function content(data: any) {
        return (
            <div>
                <div>{`SKU: ${data.default_code}`}</div>
                {/*<div>{`价格：${data.list_price}`}</div>*/}
                {/*<div>{`在手：${data.qty_available}`}</div>*/}
            </div>
        );
    }

    function footer(data: any) {
        return (
            <Dialog>
                <DialogTrigger>
                    <Badge >详细</Badge>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{data.name}</DialogTitle>
                        <DialogDescription>
                            <div>
                                {JSON.stringify(data)}
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">
                                Close
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Tabs defaultValue="kanban">
            <div className="flex items-center justify-between">
                <Heading title={"产品"} description={"产品管理页面"} />
                <TabsList className="grid grid-cols-2">
                    <TabsTrigger value="kanban">看板</TabsTrigger>
                    <TabsTrigger value="table">列表</TabsTrigger>
                </TabsList>
            </div>
            <TabsContent value="kanban" className="w-full">
                <ImageKanbanView
                    initDataList={dataList}
                    operateBar={operateBar}
                    onClick={() => handleClick}
                    imageKey="image_128"
                    content={content}
                    footer={footer}
                />
            </TabsContent>
            <TabsContent value="table" className="w-full">
                列表
            </TabsContent>
        </Tabs>
    );
}

export default ProductComponent;
