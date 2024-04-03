import * as z from "zod";

// 定义一个枚举类型，包含所有允许的product_status值
export enum ProductStatusEnum {
    DRAFT = "draft",
    PREPARED = "prepared",
    REVIEWED = "reviewed",
    NOT_READY = "not_ready",
    DONE = "done"
}

export interface Product {
    id: number;
    name: string;
    sku: string;
    quantity: number;
    brand_id: string;
    product_status: ProductStatusEnum;
    tax_id: string;
    ean: string;
    mpn: string;
    packaging_id: string;
    uvp: number;
    tag: string;
    owner_user_id: string;
    assigned_user_id: string;
    long_description: string;
    product_serie_id: string;
    data: string;
    catalog_id: string;
    is_inherit_assigned_user: boolean;
    is_inherit_owner_user: boolean;
    is_inherit_teams: boolean;
    task_status: any;
    sort_order: number;
    price_unit_id: string;
    image_id: string;
    active: boolean;
    company_id: any[];
    price: number;
}

export type ProductList = Product[];

export const ProductSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1),
    sku: z.string().min(3),
    quantity: z.number(),
    product_status: z.nativeEnum(ProductStatusEnum),
    tax_id: z.string(),
    active: z.boolean(),
});
