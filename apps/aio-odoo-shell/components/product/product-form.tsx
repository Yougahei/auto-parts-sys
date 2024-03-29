"use client";

import React from "react";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@ui/components/ui/select";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { ProductSchema, ProductStatusEnum } from "../../types/product";
import {Switch} from "@ui/components/ui/switch";

function ProductForm() {
    function onSubmit(values: z.infer<typeof ProductSchema>) {
        console.log(values);
    }

    const productForm = useForm<z.infer<typeof ProductSchema>>({
        resolver: zodResolver(ProductSchema),
        defaultValues:{
            name: "",
            sku: "",
            quantity: 0,
            tax_id: "",
            active: true,
            product_status: ProductStatusEnum.DRAFT
        } as z.infer<typeof ProductSchema>
    });

    return (
        <Form {...productForm}>
            <form
                onSubmit={productForm.handleSubmit(onSubmit)}
                className="w-2/3 space-y-6"
            >
                <FormField
                    control={productForm.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Product Name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={productForm.control}
                    name="sku"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>SKU</FormLabel>
                            <FormControl>
                                <div className="flex w-full items-center space-x-2">
                                    <Input
                                        placeholder="Product Name"
                                        {...field}
                                    />
                                    <Button>Generate SKU</Button>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={productForm.control}
                    name="quantity"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Quantity</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Product Quantity"
                                    type="number"
                                    {...field}
                                    onChange={(e) => {
                                        field.onChange(parseInt(e.target.value));
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={productForm.control}
                    name="product_status"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Status</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Product Status ..." />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {Object.values(ProductStatusEnum).map(
                                            (status) => (
                                                <SelectItem
                                                    key={status}
                                                    value={status}
                                                >
                                                    {status.toUpperCase()}
                                                </SelectItem>
                                            )
                                        )}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={productForm.control}
                    name="tax_id"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tax</FormLabel>
                            <FormControl>
                                <Input placeholder="Product Tax" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={productForm.control}
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
    );
}

export default ProductForm;
