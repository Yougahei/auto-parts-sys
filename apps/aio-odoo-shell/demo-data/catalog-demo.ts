import { BizTreeDataList } from "../types/tree";

export const catalogDemo: BizTreeDataList = [
    {
        id: "1",
        name: "Level 1",
        parent_id: false,
        child_ids: ["2", "3"]
    },
    {
        id: "2",
        name: "Level 1-1",
        parent_id: "1",
        child_ids: ["4"]
    },
    {
        id: "3",
        name: "Level 1-2",
        parent_id: "1",
        child_ids: []
    },
    {
        id: "4",
        name: "Level 1-1-1",
        parent_id: "2",
        child_ids: []
    },
    {
        id: "5",
        name: "Level 2",
        parent_id: false,
        child_ids: ["6"]
    },
    {
        id: "6",
        name: "Level 2-1",
        parent_id: "5",
        child_ids: []
    }
];
