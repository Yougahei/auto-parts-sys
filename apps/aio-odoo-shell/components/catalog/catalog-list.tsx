"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { DropdownMenuItem } from "@ui/components/ui/dropdown-menu";
import { toast } from "@ui/lib/use-toast";

import { getPimCatalog } from "../../actions/odoo-action";
import { useCatalogListStore } from "../../stores/catalogStore";
import { BaseInfo } from "../../types/odooStoreType";
import TextKanbanView from "../common/views/text-kanban-view";

function CatalogList() {
    const [loading, setLoading] = useState(true);
    // const [catalogList, setCatalogList] = useState<any[]>([]);
    const pathname = usePathname();

    const { catalogList, setCatalogList } = useCatalogListStore(
        (state) => state
    );

    useEffect(() => {
        initData();
    }, []);

    async function initData() {
        const storedBaseInfo = sessionStorage.getItem("baseInfo");
        const infoBase: BaseInfo = JSON.parse(storedBaseInfo ?? "{}");
        const response = await getPimCatalog(
            infoBase.token,
            [],
            ["id", "name", "description", "active", "code", "company_id"]
        );
        if (response.result) {
            console.log(response.result);
            setCatalogList(response.result);
        } else {
            toast({
                title: "呀出错啦？",
                description: `快告诉管理员${JSON.stringify(response.error)}`,
                variant: "destructive",
            });
        }
        setLoading(false);
    }

    if (loading) {
        return <>Loading ..... </>;
    }

    return (
        <div className="p-3">
            <TextKanbanView
                initDataList={catalogList}
                onClick={(data) => {
                    console.log(data);
                }}
                editLink={`${pathname}/treeEdit`}
            />
        </div>
    );
}

export default CatalogList;
