import {ComponentType} from "react";

export interface BizTreeData {
    id: string;
    name: string;
    article_uuid: string;
    parent_id: string | false;
    child_ids: string[];
}

export type BizTreeDataList = BizTreeData[];

interface iconProps {
    color?: any
}

export type TreeData = {
    // icon?: ComponentType<iconProps>;
    // iconColor?: string;
    id: string;
    name: string;
    article_uuid?: string;
    children?: TreeData[];
    active: boolean;
    product_list?: string[];
}

export type TreeDataList = TreeData[];
