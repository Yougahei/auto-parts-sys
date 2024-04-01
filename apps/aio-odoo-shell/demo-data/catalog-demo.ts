import { TreeDataList } from "../types/tree";

export const catalogDemo: TreeDataList = [
    {
        id: "1",
        name: "产品目录1",
        article_uuid: "1",
        active: true,
        product_list: [],
        children: [
            {
                id: "9",
                name: "宝马",
                article_uuid: "9",
                active: true,
                product_list: ["sdasdkjalsd", "sdasdkjalsd", "sdasdkjalsd"],
                children: [
                    {
                        id: "10",
                        name: "发动机",
                        article_uuid: "10",
                        active: true,
                        product_list: [],
                        children: [
                            {
                                id: "simple-tree-id-0",
                                name: "四缸",
                                article_uuid: "11",
                                active: true,
                                product_list: [],
                                children: [],
                            },
                        ],
                    },
                ],
            },
            {
                id: "6",
                name: "丰田",
                article_uuid: "6",
                active: true,
                product_list: [],
                children: [
                    {
                        id: "7",
                        name: "方向盘",
                        article_uuid: "7",
                        active: true,
                        product_list: [],
                        children: [
                            {
                                id: "8",
                                name: "真皮",
                                article_uuid: "8",
                                active: true,
                                product_list: [],
                                children: [],
                            },
                        ],
                    },
                ],
            },
            {
                id: "2",
                name: "华为问界",
                article_uuid: "2",
                active: true,
                product_list: [],
                children: [
                    {
                        id: "3",
                        name: "轮胎",
                        article_uuid: "3",
                        active: true,
                        product_list: [],
                        children: [
                            {
                                id: "4",
                                name: "轮毂",
                                article_uuid: "4",
                                active: true,
                                product_list: [],
                                children: [],
                            },
                        ],
                    },
                ],
            },
        ],
    },
];
