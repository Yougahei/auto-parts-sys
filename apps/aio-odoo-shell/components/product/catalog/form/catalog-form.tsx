"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";

import { getProductAliases, getProductCategories, getProductComponents } from "../../../../actions/odoo-action";
import { BaseInfo } from "../../../../types/odooStoreType";
import { ProductCatalog } from "../../../../types/odoo/odoo-product";
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@ui/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@ui/components/ui/form"
import { Input } from "@ui/components/ui/input"
import { Textarea } from "@ui/components/ui/textarea"

function CatalogForm() {
    const params = useParams<{ id: string }>();
    let infoBase: BaseInfo = {} as BaseInfo;
    const [loading, setLoading] = React.useState(true);
    const [productCatelog, setProductCatelog] = React.useState<ProductCatalog>();

    const catalogFormSchema = z.object({
        reference_code: z.string().min(2).max(50),
        name: z.string().min(2).max(50),
        description: z.string().max(256),
    })

    const catalogForm = useForm<z.infer<typeof catalogFormSchema>>({
        resolver: zodResolver(catalogFormSchema)
    })

    function setFormValues(data: ProductCatalog) {
        if (data) {
            catalogForm.setValue("reference_code", data.reference_code);
            catalogForm.setValue("name", data.name);
            if(data.description){
                catalogForm.setValue("description", data.description);
            }else{
                catalogForm.setValue("description", "");
            }

        }
    }

    async function getCatalog() {
        if (params.id) {
            const categories = await getProductCategories(infoBase.token, [[["id", "=", params.id]]]);
            // const aliases = await getProductAliases(infoBase.token);
            // const components = await getProductComponents(infoBase.token);
            console.log(categories);
            setProductCatelog(categories.result[0]);
            setFormValues(categories.result[0]);
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


    function onSubmit(values: z.infer<typeof catalogFormSchema>) {
        console.log(values);
    }

    return (
        <>
            <div>{params.id ? <div>编辑{params.id}</div> : <div>创建</div>}</div>
            <Form {...catalogForm}>
                <form onSubmit={catalogForm.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={catalogForm.control}
                        name="reference_code"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>内部编码</FormLabel>
                                <FormControl>
                                    <Input placeholder="内部编码" {...field}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={catalogForm.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>产品名称</FormLabel>
                                <FormControl>
                                    <Input placeholder="产品名称" {...field}/>
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
                                <FormLabel>产品描述</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="产品描述" {...field}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>

        </>
    );
}

export default CatalogForm;
