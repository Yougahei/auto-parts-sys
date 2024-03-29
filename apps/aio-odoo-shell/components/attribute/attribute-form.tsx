"use client";

import React, {useEffect, useState} from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@repo/ui/components/ui/form";
import { Input } from "@repo/ui/components/ui/input";
import { Switch } from "@repo/ui/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@ui/components/ui/select";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
    getPimAttributeGroup,
    getPimAttributeTab,
} from "../../actions/odoo-action";
import {
    AttributeGroupList,
    AttributeSchema,
    AttributeTabList,
} from "../../types/attribute";
import { BaseInfo } from "../../types/odooStoreType";

interface AttributeFormProps {
    className?: string;
}

function AttributeForm({ className }: AttributeFormProps) {
    const [attributeGroups, setAttributeGroups] = useState<AttributeGroupList>(
        []
    );
    const [attributeTabs, setAttributeTabs] = useState<AttributeTabList>([]);
    const [loading, setLoading] = useState(true);

    const attributeForm = useForm<z.infer<typeof AttributeSchema>>({
        resolver: zodResolver(AttributeSchema),
    });

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

    async function init() {
        await getAllAttributeGroups();
        await getAllAttributeTabs();
        setLoading(false);
    }

    useEffect(() => {
        init();
    }, []);

    function onSubmit(values: z.infer<typeof AttributeSchema>) {
        console.log(values);
    }

    if(loading) return <div>Loading...</div>;

    return (
        <div className={className}>
            <Form {...attributeForm}>
                <form
                    onSubmit={attributeForm.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <FormField
                        control={attributeForm.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={attributeForm.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Type</FormLabel>
                                <FormControl>
                                    <Input placeholder="Type" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={attributeForm.control}
                        name="attribute_group_id"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Attribute Group</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a Attribute Group" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {attributeGroups.map((group) => (
                                            <SelectItem
                                                key={group.id}
                                                value={group.id.toString()}
                                            >
                                                {group.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={attributeForm.control}
                        name="attribute_tab_id"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Attribute Tab</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a Attribute Tab" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {attributeTabs.map((tab) => (
                                            <SelectItem
                                                key={tab.id}
                                                value={tab.id.toString()}
                                            >
                                                {tab.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={attributeForm.control}
                        name="code"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Code</FormLabel>
                                <FormControl>
                                    <Input placeholder="Code" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={attributeForm.control}
                        name="active"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center text-center justify-between rounded-lg p-4">
                                <FormControl>
                                    <div className="space-y-0.5">
                                        <FormLabel>Active</FormLabel>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    );
}

export default AttributeForm;
