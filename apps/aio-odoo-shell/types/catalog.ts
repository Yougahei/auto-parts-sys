import {z} from "zod";

export type Catalog = {
    id: number,
    name: string,
    data: string,
    description: string,
    active: boolean,
    code: string,
    company_id: any[],
}

export type CatalogList = Catalog[]

export const catalogFormSchema = z.object({
    name: z.string().min(2).max(50),
    description: z.string(),
    active: z.boolean(),
    code: z.string().min(2).max(50),
});
