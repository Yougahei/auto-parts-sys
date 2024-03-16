"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

import { getProductAliases, getProductCategories, getProductComponents } from "../../../actions/odoo-action";
import { BaseInfo } from "../../../types/odooStoreType";
import TextKanbanView from "../../common/views/text-kanban-view";


function ProductCatalog() {
    let infoBase: BaseInfo = {} as BaseInfo;
    const router = useRouter();
    const [loading, setLoading] = React.useState(true);
    const [dataList, setDataList] = React.useState<any[]>([]);
    const [aliases, setAliases] = React.useState<any[]>([]);
    const [components, setComponents] = React.useState<any[]>([]);

    async function initData() {
        const categories = await getProductCategories(infoBase.token);
        const aliases = await getProductAliases(infoBase.token);
        const components = await getProductComponents(infoBase.token);

        setAliases(aliases.result);
        setDataList(categories.result);
        setComponents(components.result);
        setLoading(false);
    }

    useEffect(() => {
        const storedBaseInfo = window.sessionStorage.getItem("baseInfo");
        const info: BaseInfo = JSON.parse(storedBaseInfo ?? "{}");
        infoBase = info;
        initData();
    }, []);

    if (loading) {
        return <div>loading...</div>;
    }

    function content(data: any) {
        // console.log(data)
        const productAliasIdsSet = new Set(data.product_alias_ids);
        const componentIdsSet = new Set(data.product_component_ids);

        return (
            <div>
                {data.product_alias_ids.length > 0 ? <div>别名：</div>: null}
                {aliases.filter(alias => productAliasIdsSet.has(alias.id)).map((alias) => (
                    <div key={alias.id}>
                        {alias.name} - {alias.product_alias}
                    </div>
                ))}
                {data.product_component_ids.length > 0 ? <div>组件：</div>: null}
                {components.filter(component => componentIdsSet.has(component.id)).map((component) => (
                    <div key={component.id}>
                        {component.name} - {component.component_code}
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div><TextKanbanView initDataList={dataList} onClick={(data) => {
            router.push(`/product/catalog/${data.id}`);
        }} description={"reference_code"} content={content} /></div>
    );
}

export default ProductCatalog;
