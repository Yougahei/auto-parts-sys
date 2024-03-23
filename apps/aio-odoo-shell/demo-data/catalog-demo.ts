import { TreeDataList } from "../types/tree";

export const catalogDemo: TreeDataList = [
    {
        id: "1",
        name: "Root",
        article_uuid: "1",
        active: true,
        children: [
            {
                id: "2",
                name: "Node 1",
                article_uuid: "2",
                active: true,
                children: [
                    {
                        id: "3",
                        name: "Node 1.1",
                        article_uuid: "3",
                        active: true,
                        children: [
                            {
                                id: "4",
                                name: "Node 1.1.1",
                                article_uuid: "4",
                                active: true,
                                children: [
                                    {
                                        id: "5",
                                        name: "Node",
                                        article_uuid: "5",
                                        active: true,
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        id: "6",
        name: "Node 2",
        article_uuid: "6",
        active: true,
        children: [
            {
                id: "7",
                name: "Node 2.1",
                article_uuid: "7",
                active: true,
                children: [
                    {
                        id: "8",
                        name: "Node 2.1.1",
                        article_uuid: "8",
                        active: true,
                        children: [],
                    },
                ],
            },
        ],
    },
    {
        id: "9",
        name: "Node 3",
        article_uuid: "9",
        active: true,
        children: [
            {
                id: "10",
                name: "Node 3.1",
                article_uuid: "10",
                active: true,
                children: [],
            },
        ],
    },
];
