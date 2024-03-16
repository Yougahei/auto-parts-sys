"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/ui/avatar";
import { Button } from "@repo/ui/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@repo/ui/components/ui/dropdown-menu";
import { Skeleton } from "@repo/ui/components/ui/skeleton";



import { logoutOdoo } from "../../actions/odoo-action";
import { getImage } from "../../api/odoo/odoo-api";
import { userStore } from "../../stores/userInfo";
import { BaseInfo } from "../../types/odooStoreType";
import request from "../../utils/request";


export function UserAccount() {
    const { userInfo, baseInfo,  hydrate } = userStore((state) => state);
    const [loading, setLoading] = useState(true);
    const [imgUrl, setImgUrl] = useState<string>();

    const router = useRouter();

    async function initUserAvartar() {
        const storedBaseInfo = sessionStorage.getItem("baseInfo");
        const infoBase: BaseInfo = JSON.parse(storedBaseInfo ?? "{}");
        const response = await getImage({
            model: "res.partner",
            field: "avatar_128",
            id: infoBase.partner_id,
            unique: 1709956427000,
        });

        const url = URL.createObjectURL(response);
        setImgUrl(url);
    }

    // 在页面加载时从SessionStorage中加载数据
    useEffect(() => {
        async function fetchData() {
            // 调用hydrate函数
            hydrate();
            await initUserAvartar();
            setLoading(false);
        }
        fetchData();
    }, []);

    if (loading) {
        return <Skeleton className="w-[32px] h-[32px] rounded-full" />; // 等待数据加载完成
    }

    return (
        <div className="ml-3">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="relative h-8 w-8 rounded-full"
                    >
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={imgUrl} alt="@shadcn" />
                            <AvatarFallback>{userInfo.username}</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">
                                {userInfo.name}
                            </p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            设置
                            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={async () => {
                            await logoutOdoo(baseInfo.token);
                            sessionStorage.clear();
                            router.push("/auth");
                        }}
                    >
                        退出登录
                        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
