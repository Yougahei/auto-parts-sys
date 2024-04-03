"use client";

import React from "react";
import Image from "next/image";
import { Cross1Icon, DotsVerticalIcon } from "@radix-ui/react-icons";
import { Badge } from "@ui/components/ui/badge";
import { Button } from "@ui/components/ui/button";
import { ScrollArea, ScrollBar } from "@ui/components/ui/scroll-area";
import { Separator } from "@ui/components/ui/separator";
import { Package2, Info } from 'lucide-react';

import {
    defaultImageBase64,
    ImageBase64Header,
} from "../../types/odoo/odoo-common";
import { Product, ProductStatusEnum } from "../../types/product";
import { product_status } from "./product-component";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@ui/components/ui/tabs";

const productDemo: Product = {
    id: 1,
    name: "Product Name",
    sku: "SKU",
    quantity: 1,
    tax_id: "Tax ID",
    active: true,
    product_status: ProductStatusEnum.DRAFT,
    price: 100,
} as Product;

function ProductSideInfo() {
    const imageBase64 = undefined;
    return (
        <Tabs defaultValue="info">
            <div className="flex items-center px-4 py-2 justify-between">
                <h2 className="text-l font-bold">Product Cards</h2>
                <div>
                    <Button variant="ghost">
                        <DotsVerticalIcon />
                    </Button>
                    <Button variant="ghost">
                        <Cross1Icon />
                    </Button>
                </div>
            </div>
            <Separator />
            <TabsList className="w-full">
                <TabsTrigger value="info" className="w-full">
                    <Info />
                </TabsTrigger>
                <TabsTrigger value="package" className="w-full">
                    <Package2/>
                </TabsTrigger>
            </TabsList>
            <TabsContent value="info">
                <ScrollArea className="h-[72vh] p-3">
                <div className="flex items-center justify-center w-full h-auto">
                    <Image
                        src={`${ImageBase64Header}${imageBase64 ? imageBase64 : defaultImageBase64}`}
                        alt={productDemo.id.toString()}
                        width={256}
                        height={256}
                    />
                </div>
                <div className="space-y-2 p-3">
                    <div className="flex justify-between items-center">
                        <div>{`Name:`}</div>
                        <div>{productDemo.name}</div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div>{`SKU:`}</div>
                        <div>{productDemo.sku}</div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div>{`Status:`}</div>
                        <div>{product_status(productDemo.product_status)}</div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div>{`Active:`}</div>
                        <div>
                            <Badge
                                className={`${
                                    productDemo.active
                                        ? "bg-green-500"
                                        : "bg-red-500"
                                } `}
                            >
                                {productDemo.active ? "InUse" : "NotUse"}
                            </Badge>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div>{`Quantity:`}</div>
                        <div>{productDemo.quantity}</div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div>{`Tax ID:`}</div>
                        <div>{productDemo.tax_id}</div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div>{`Price:`}</div>
                        <div>{productDemo.price}</div>
                    </div>
                </div>
                <ScrollBar orientation={"vertical"}/>
            </ScrollArea>
            </TabsContent>
            <TabsContent value="package">
                Change your password here.
            </TabsContent>
        </Tabs>
    );
}

export default ProductSideInfo;
