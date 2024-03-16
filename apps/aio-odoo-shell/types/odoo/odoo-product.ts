import CatalogForm from "../../components/product/category/form/catalog-form";

export interface Product {
    id: number;
    image_1920: boolean|string;
    image_1024: boolean|string;
    image_512: boolean|string;
    image_256: boolean|string;
    image_128: boolean|string;
    activity_ids: any[]; // 根据实际情况更改类型
    activity_state: boolean;
    activity_user_id: boolean;
    activity_type_id: boolean;
    activity_type_icon: boolean;
    activity_date_deadline: boolean;
    my_activity_date_deadline: boolean;
    activity_summary: boolean;
    activity_exception_decoration: boolean;
    activity_exception_icon: boolean;
    message_is_follower: boolean;
    message_follower_ids: number[];
    message_partner_ids: number[];
    message_ids: number[];
    has_message: boolean;
    message_needaction: boolean;
    message_needaction_counter: number;
    message_has_error: boolean;
    message_has_error_counter: number;
    message_attachment_count: number;
    website_message_ids: any[]; // 根据实际情况更改类型
    message_has_sms_error: boolean;
    name: string;
    sequence: number;
    description: boolean;
    description_purchase: boolean;
    description_sale: boolean;
    detailed_type: string;
    type: string;
    categ_id: (number | string)[];
    currency_id: (number | string)[];
    cost_currency_id: (number | string)[];
    list_price: number;
    standard_price: number;
    volume: number;
    volume_uom_name: string;
    weight: number;
    weight_uom_name: string;
    sale_ok: boolean;
    purchase_ok: boolean;
    uom_id: (number | string)[];
    uom_name: string;
    uom_po_id: (number | string)[];
    company_id: boolean;
    packaging_ids: any[]; // 根据实际情况更改类型
    seller_ids: any[]; // 根据实际情况更改类型
    variant_seller_ids: any[]; // 根据实际情况更改类型
    active: boolean;
    color: number;
    is_product_variant: boolean;
    attribute_line_ids: any[]; // 根据实际情况更改类型
    valid_product_template_attribute_line_ids: any[]; // 根据实际情况更改类型
    product_variant_ids: number[];
    product_variant_id: (number | string)[];
    product_variant_count: number;
    barcode: boolean;
    default_code: boolean;
    pricelist_item_count: number;
    product_document_ids: any[]; // 根据实际情况更改类型
    product_document_count: number;
    can_image_1024_be_zoomed: boolean;
    has_configurable_attributes: boolean;
    product_tooltip: string;
    priority: string;
    product_tag_ids: any[]; // 根据实际情况更改类型
    product_properties: any[]; // 根据实际情况更改类型
    display_name: string;
    create_uid: (number | string)[];
    create_date: string;
    write_uid: (number | string)[];
    write_date: string;
    product_multi_alias_ids: any[]; // 根据实际情况更改类型
    product_multi_alias_join: string;
    taxes_id: number[];
    tax_string: string;
    supplier_taxes_id: number[];
    property_account_income_id: boolean;
    property_account_expense_id: boolean;
    account_tag_ids: any[]; // 根据实际情况更改类型
    fiscal_country_codes: string;
    responsible_id: (number | string)[];
    property_stock_production: (number | string)[];
    property_stock_inventory: (number | string)[];
    sale_delay: number;
    tracking: string;
    description_picking: boolean;
    description_pickingout: boolean;
    description_pickingin: boolean;
    qty_available: number;
    virtual_available: number;
    incoming_qty: number;
    outgoing_qty: number;
    location_id: boolean;
    warehouse_id: boolean;
    has_available_route_ids: boolean;
    route_ids: any[]; // 根据实际情况更改类型
    nbr_moves_in: number;
    nbr_moves_out: number;
    nbr_reordering_rules: number;
    reordering_min_qty: number;
    reordering_max_qty: number;
    route_from_categ_ids: any[]; // 根据实际情况更改类型
    show_on_hand_qty_status_button: boolean;
    show_forecasted_qty_status_button: boolean;
    cost_method: string;
    valuation: string;
    service_type: string;
    sale_line_warn: string;
    sale_line_warn_msg: boolean;
    expense_policy: string;
    visible_expense_policy: boolean;
    sales_count: number;
    invoice_policy: string;
    optional_product_ids: any[]; // 根据实际情况更改类型
    hs_code: boolean;
    country_of_origin: boolean;
    ept_image_ids: any[]; // 根据实际情况更改类型
}

export interface ProductCatalog {
    id: number;
    name: string;
    reference_code: string;
    description: boolean | string;
    component_ids: number[];
    product_component_ids: number[];
    product_alias_ids: number[];
    display_name: string;
    create_uid: [number, string];
    create_date: string;
    write_uid: [number, string];
    write_date: string;
}
