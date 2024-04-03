"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@ui/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@ui/components/ui/form";
import { Input } from "@ui/components/ui/input";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@ui/components/ui/resizable";
import { toast } from "@ui/lib/use-toast";
import { useForm } from "react-hook-form";
import { LuSaveAll } from "react-icons/lu";
import { z } from "zod";

import { getPimCatalog, savePimCatalogTree } from "../../actions/odoo-action";
import { useCatalogListStore } from "../../stores/catalogStore";
import {Catalog, catalogFormSchema} from "../../types/catalog";
import { BaseInfo } from "../../types/odooStoreType";
import { TreeDataList } from "../../types/tree";
import EditTree from "../tree/edit-tree";
import {Textarea} from "@ui/components/ui/textarea";
import {Switch} from "@ui/components/ui/switch";

function CatalogListTree({
    searchParams,
}: {
    [key: string]: string | undefined;
}) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [catalog, setCatalog] = useState<Catalog>();
    const { catalogList } = useCatalogListStore((state) => state);
    const [treeData, setTreeData] = useState<TreeDataList>([]);

    const catalogForm = useForm<z.infer<typeof catalogFormSchema>>({
        resolver: zodResolver(catalogFormSchema),
        defaultValues: {
            name: "",
        },
    });

    function onSubmit(values: z.infer<typeof catalogFormSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
    }

    async function initData() {
        const storedBaseInfo = sessionStorage.getItem("baseInfo");
        const infoBase: BaseInfo = JSON.parse(storedBaseInfo ?? "{}");
        const response = await getPimCatalog(
            infoBase.token,
            //@ts-ignore
            [["id", "=", searchParams?.id]],
            ["data"]
        );
        const tree = response.result[0];
        setTreeData(JSON.parse(tree.data as string));
        setLoading(false);
    }

    useEffect(() => {
        console.log("catalogList", catalogList);
        const foundItem = catalogList.find((item) => {
            //@ts-ignore
            return item.id.toString() === searchParams?.id;
        });
        // setTreeData(JSON.parse(foundItem?.data as string));
        setCatalog(foundItem);
        initData();
    }, []);

    function toobar(data: any) {
        async function saveTree(data: any) {
            const storedBaseInfo = sessionStorage.getItem("baseInfo");
            const infoBase: BaseInfo = JSON.parse(storedBaseInfo ?? "{}");
            const response = await savePimCatalogTree(infoBase.token, {
                id: catalog?.id as number,
                tree: data,
            });
            if (response.result) {
                toast({
                    title: "保存成功",
                    description: "保存成功",
                    variant: "default",
                });
                setTimeout(() => {
                    router.push("/catalog");
                }, 1500);
            } else {
                toast({
                    title: "保存失败",
                    description: "保存失败, 请重试",
                    variant: "destructive",
                });
            }
        }

        return (
            <Button onClick={() => saveTree(data)} variant="ghost">
                <LuSaveAll />
            </Button>
        );
    }

    if (loading) return <>Loading ..... </>;

    return (
        <ResizablePanelGroup className="p-5 rounded-lg space-x-2" direction="horizontal">
            <ResizablePanel defaultSize={70} minSize={40}>
                <Form {...catalogForm}>
                    <form
                        onSubmit={catalogForm.handleSubmit(onSubmit)}
                        className="space-y-8 p-1"
                    >
                        <FormField
                            control={catalogForm.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>

                            )}
                        />
                        <FormField
                            control={catalogForm.control}
                            name="code"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Code</FormLabel>
                                    <FormControl>
                                        <div className="flex w-full items-center space-x-2">
                                            <Input
                                                placeholder="Code"
                                                {...field}
                                            />
                                            <Button>Generate Code</Button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={catalogForm.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="catalog description"
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={catalogForm.control}
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
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={20} minSize={20}>
                <EditTree
                    treeData={treeData ? treeData : []}
                    create={true}
                    operation={{
                        move: true,
                        rename: true,
                        delete: true,
                        create: true,
                        showIcon: false,
                        canDrag: true,
                    }}
                    itemClick={() => null}
                    toobar={toobar}
                />
            </ResizablePanel>
        </ResizablePanelGroup>
    );
}

export default CatalogListTree;
