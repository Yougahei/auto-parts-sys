"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";

import { getProductAliases, getProductCategories, getProductComponents } from "../../../../actions/odoo-action";
import { BaseInfo } from "../../../../types/odooStoreType";
import { ProductCatalog } from "../../../../types/odoo/odoo-product";

function CatalogForm() {
    const params = useParams<{ id: string }>();
    let infoBase: BaseInfo = {} as BaseInfo;
    const [loading, setLoading] = React.useState(true);
    const [productCatelog, setProductCatelog] = React.useState<ProductCatalog>();

    async function getCatalog() {
        if (params.id) {
            const categories = await getProductCategories(infoBase.token, [[["id", "=", params.id]]]);
            const aliases = await getProductAliases(infoBase.token);
            const components = await getProductComponents(infoBase.token);
            console.log(categories);
            setProductCatelog(categories.result[0]);
            setLoading(false);
        }
    }

    useEffect(() => {
        const storedBaseInfo = window.sessionStorage.getItem("baseInfo");
        infoBase = JSON.parse(storedBaseInfo ?? "{}");
        getCatalog();
    }, []);


    if (loading) {
        return <div>loading...</div>;
    }


    return (
        <>
            <div>{params.id ? <div>编辑{params.id}</div> : <div>创建</div>}</div>
            <div>{JSON.stringify(productCatelog)}</div>
        </>
    );
}

export default CatalogForm;
