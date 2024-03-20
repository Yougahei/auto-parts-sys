import {ComponentType} from "react";

export interface BizTreeData {
    id: string;
    name: string;
    parent_id: string | false;
    child_ids: string[];
}

export type BizTreeDataList = BizTreeData[];

interface iconProps {
    color?: any
}

export type TreeData = {
    icon?: ComponentType<iconProps>;
    iconColor?: string;
    id: string;
    name: string;
    title: string;
    description: string | null;
    children?: TreeData[];
    active: boolean;
    parent_id: string | false;  //后加属性
}

export type TreeDataList = TreeData[];
