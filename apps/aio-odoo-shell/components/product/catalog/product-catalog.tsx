"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";



import { getProductAliases, getProductCategories, getProductComponents } from "../../../actions/odoo-action";
import { catalogDemo } from "../../../demo-data/catalog-demo";
import { BaseInfo } from "../../../types/odooStoreType";
import TextKanbanView from "../../common/views/text-kanban-view";
import EditTree from "../../tree/edit-tree";
import ProductTeable from "./product-teable";


function ProductCatalog() {
    const [loading, setLoading] = React.useState(true);
    const [productList, setProductList] = React.useState<string[]>([]);

    async function initData() {
        setLoading(false);
    }

    function itemClick(item: any) {
        console.log(item);
        setProductList(item.product_list)
    }

    useEffect(() => {
        const storedBaseInfo = window.sessionStorage.getItem("baseInfo");
        const info: BaseInfo = JSON.parse(storedBaseInfo ?? "{}");
        initData();
    }, []);

    if (loading) {
        return <div>loading...</div>;
    }


    return (
        <div className="flex flex-row space-x-2">
            <div className="w-1/4">
                <EditTree
                    treeData={catalogDemo}
                    // create={false}
                    operation={{
                        move: true,
                        rename: true,
                        delete: true,
                        create: true,
                        showIcon: false,
                        canDrag: true,
                    }}
                    itemClick={itemClick}
                />
                <div>{JSON.stringify(productList)}</div>
            </div>
            <div className="w-3/4">
                <ProductTeable />
            </div>
        </div>
    );
}

export default ProductCatalog;
