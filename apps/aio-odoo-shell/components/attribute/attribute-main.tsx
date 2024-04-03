"use client";

import React, { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@ui/components/ui/select";

import {
    getPimAttribute,
    getPimAttributeGroup,
    getPimAttributeTab,
} from "../../actions/odoo-action";
import {
    AttributeGroupList,
    AttributeList,
    AttributeTabList,
} from "../../types/attribute";
import { BaseInfo } from "../../types/odooStoreType";

function AttributeMain() {
    const [loading, setLoading] = useState(true);
    const [attributes, setAttributes] = useState<AttributeList>([]);
    const [attributeGroups, setAttributeGroups] = useState<AttributeGroupList>(
        []
    );
    const [attributeTabs, setAttributeTabs] = useState<AttributeTabList>([]);

    async function getAllAttributes() {
        const storedBaseInfo = window.sessionStorage.getItem("baseInfo");
        const info: BaseInfo = JSON.parse(storedBaseInfo ?? "{}");
        const response = await getPimAttribute(info.token);
        setAttributes(response.result);
    }

    async function getAllAttributeGroups() {
        const storedBaseInfo = window.sessionStorage.getItem("baseInfo");
        const info: BaseInfo = JSON.parse(storedBaseInfo ?? "{}");
        const response = await getPimAttributeGroup(info.token);
        setAttributeGroups(response.result);
    }

    async function getAllAttributeTabs() {
        const storedBaseInfo = window.sessionStorage.getItem("baseInfo");
        const info: BaseInfo = JSON.parse(storedBaseInfo ?? "{}");
        const response = await getPimAttributeTab(info.token);
        setAttributeTabs(response.result);
    }

    async function getAll() {
        await Promise.all([
            getAllAttributes(),
            getAllAttributeGroups(),
            getAllAttributeTabs(),
        ]);
        setLoading(false);
    }

    useEffect(() => {
        getAll();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="space-y-2 mt-2">
            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="选择一个属性" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {attributes.length > 0
                            ? attributes.map((attribute) => (
                                  <SelectItem value={attribute.id.toString()}>
                                      {attribute.name}
                                  </SelectItem>
                              ))
                            : null}
                    </SelectGroup>
                </SelectContent>
            </Select>

            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="选择一个属性" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {attributeGroups.length > 0
                            ? attributeGroups.map((group) => (
                                  <SelectItem value={group.id.toString()}>
                                      {group.name}
                                  </SelectItem>
                              ))
                            : null}
                    </SelectGroup>
                </SelectContent>
            </Select>

            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="选择一个属性" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {attributeTabs.length > 0
                            ? attributeTabs.map((tab) => (
                                  <SelectItem value={tab.id.toString()}>
                                      {tab.name}
                                  </SelectItem>
                              ))
                            : null}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}

export default AttributeMain;
