export type RpcData = {
    jsonrpc: "2.0",
    method?: string,
    params: Payload | {},
    id: number,
};

export type Payload = {
    model: string,
    service?: string,
    method?: string,
    args: any[],
    kwargs?: Kwargs,  //原生ODOOJSONRPC必填
};

export type Kwargs = {
    domain: any[],  //条件
    specification: any, //字段{ name：{}}
    offset?: number,
    order?: string,
    limit?: number,
    args?: any[],
    context?: {
        lang: string,
        tz: string ,
        uid: number,
        allowed_company_ids: number[],
        bin_size: boolean,
        default_is_company: boolean,
        current_company_id: number,
    },
    count_limit?: 10001,
};

export type ImageParams = {
    model: string,
    id: number,
    field: string,
    unique?: number,
};

export const defaultImageBase64 = "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"

export const ImageBase64Header = "data:image/png;base64,"
