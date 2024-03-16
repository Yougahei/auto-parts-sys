"use client";

import React, { ReactNode, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@repo/ui/components/ui/dropdown-menu";
import { Badge } from "@ui/components/ui/badge";
import { Button } from "@ui/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@ui/components/ui/card";
import { ScrollArea, ScrollBar } from "@ui/components/ui/scroll-area";
import { MoreHorizontal } from "lucide-react";

import OperateBar from "../page-tools/operate-bar";
import { defaultImageBase64, ImageBase64Header } from "../../../types/odoo/odoo-common";

/**
 * 注意：还需要做一个分页功能
 * */

interface KanbanViewProps {
    initDataList: any[];
    imageKey?: string; // 图片字段
    title?: string; // 指定显示标题
    content?: (data: any) => ReactNode;
    footer?: (data: any) => ReactNode;
    onClick: (data: any) => void; // 点击事件
    operateBar?: {
        view?: boolean; // 启用视图选项
        create?: string; // 启用创建选项
        options?: () => ReactNode;
        placeholder?: string;
        searchKey?: string;
    };
}

function ImageKanbanView({
    initDataList,
    operateBar,
    title,
    content,
    onClick,
    imageKey,
    footer,
}: KanbanViewProps) {
    const router = useRouter();
    const [dataList, setDataList] = React.useState(initDataList);
    const [change, setChange] = React.useState<string>();

    function findObjectByName(data: any[], key: string, value: any) {
        return data.filter((item) =>
            item[key].toLowerCase().includes(value.toLowerCase())
        );
    }

    useEffect(() => {
        if (change === "" || change === undefined) {
            setDataList(initDataList);
        } else {
            if (operateBar && operateBar.searchKey) {
                setDataList(
                    findObjectByName(initDataList, operateBar.searchKey, change)
                );
            } else {
                // operateBar 或 operateBar.searchKey 不存在，可以选择跳过调用 findObjectByName 函数
                // 或者给它们提供一个默认值
                console.log("operateBar 或 operateBar.searchKey 不存在");
            }
        }
    }, [change]);

    return (
        <>
            {dataList.length > 0 ? (
                <ScrollArea>
                    {operateBar?.view ? (
                        <OperateBar
                            create={operateBar?.create}
                            placeholder={operateBar?.placeholder}
                            change={change}
                            onChange={setChange}
                        />
                    ) : null}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {dataList.map((data, index) => {
                            const imageBase64 = data[imageKey? imageKey: "image"];
                            return (
                                <div key={index} className="flex flex-col">
                                    <div
                                        className="overflow-hidden shadow-sm rounded-lg group  flex flex-col h-auto"
                                        onClick={() =>
                                            onClick ? onClick(data) : null
                                        }
                                    >
                                        <Card className="p-4 h-full flex flex-row">
                                            <div className="flex-grow-1  h-full">
                                                <Image
                                                    src={`${ImageBase64Header}${imageBase64? imageBase64: defaultImageBase64}`}
                                                    alt={data.id}
                                                    width={64}
                                                    height={64}
                                                />
                                            </div>
                                            <div className="flex-grow-2 flex-col ml-2 h-full">
                                                <div className="flex flex-row justify-between items-center mb-3">
                                                    <CardTitle className="text-sm">
                                                        {title
                                                            ? data[
                                                                  title
                                                              ]
                                                            : data.name}
                                                    </CardTitle>
                                                </div>
                                                {content? (
                                                    <CardDescription>
                                                        {content(data)}
                                                    </CardDescription>
                                                ) : null}
                                                {
                                                    // 有 footer 函数时，显示 footer
                                                    footer ? (
                                                        <CardFooter>
                                                            {footer(data)}
                                                        </CardFooter>
                                                    ) : null
                                                }
                                            </div>
                                        </Card>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <ScrollBar />
                </ScrollArea>
            ) : (
                <div className="flex items-center justify-center h-96">
                    <p className="text-muted-foreground">暂无数据</p>
                </div>
            )}
        </>
    );
}

export default ImageKanbanView;
