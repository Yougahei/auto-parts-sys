import * as z from "zod";

export interface Attribute {
    id: number;
    name: string;
    type: string;
    attribute_group_id: string;
    attribute_tab_id: string;
    code: string;
    owner_user_id: string;
    assigned_user_id: string;
    is_multilang: boolean;
    asset_type: string;
    pattern: string;
    unique: boolean;
    prohibited_empty_value: boolean;
    data: string;
    virtual_product_field: boolean;
    is_required: boolean;
    sort_order: number;
    default_channel_id: string;
    sort_order_in_attribute_group: number;
    sort_order_in_product: number;
    tooltip: string;
    description: string;
    extensible_enum_id: string;
    amount_of_digits_after_comma: number;
    default_unit: string;
    measure_id: string;
    use_disabled_textarea_in_view_mode: boolean;
    default_date: string;
    default_value: string;
    active: boolean;
    company_id: any[]   // [1, "公司"]
}

export interface AttributeGroup {
    id: number;
    name: string;
    description: string;
    assigned_user_id: number[];
    code: number;
    owner_user_id: number;
    active: boolean;
    company_id: any[]   // [1, "公司"]
}

export interface AttributeTab {
    id: number;
    name: string;
    description: string;
    active: boolean;
    company_id: any[]   // [1, "公司"]
}

export type AttributeList = Attribute[];
export type AttributeGroupList = AttributeGroup[];
export type AttributeTabList = AttributeTab[];

export const AttributeSchema = z.object({
    id: z.number().optional(),
    name: z.string(),
    type: z.string().optional(),
    attribute_group_id: z.string(),
    attribute_tab_id: z.string(),
    code: z.string().optional(),
    owner_user_id: z.string().optional(),
    assigned_user_id: z.string().optional(),
    is_multilang: z.boolean().optional(),
    asset_type: z.string().optional(),
    pattern: z.string().optional(),
    unique: z.boolean().optional(),
    prohibited_empty_value: z.boolean().optional(),
    data: z.string().optional(),
    virtual_product_field: z.boolean().optional(),
    is_required: z.boolean().optional(),
    sort_order: z.number().optional(),
    default_channel_id: z.string().optional(),
    sort_order_in_attribute_group: z.number().optional(),
    sort_order_in_product: z.number().optional(),
    tooltip: z.string().optional(),
    description: z.string().optional(),
    extensible_enum_id: z.string().optional(),
    amount_of_digits_after_comma: z.number().optional(),
    default_unit: z.string().optional(),
    measure_id: z.string().optional(),
    use_disabled_textarea_in_view_mode: z.boolean().optional(),
    default_date: z.string().optional(),
    default_value: z.string().optional(),
    active: z.boolean(),
});

export const AttributeGroupSchema = z.object({
    id: z.number().optional(),
    name: z.string(),
    description: z.string().optional(),
    assigned_user_id: z.array(z.number()).optional(),
    code: z.number().optional(),
    owner_user_id: z.number().optional(),
    active: z.boolean(),
    company_id: z.array(z.any()),
});

export const AttributeTabSchema = z.object({
    id: z.number().optional(),
    name: z.string(),
    description: z.string().optional(),
    active: z.boolean(),
    company_id: z.array(z.any()),
});
