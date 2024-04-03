"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@repo/ui/components/ui/form";
import { Input } from "@repo/ui/components/ui/input";
import { useToast } from "@repo/ui/lib/use-toast";
import { useForm } from "react-hook-form";


import { signInFormSchema, SignInFormType } from "../../types/auth";
import { Session } from "../../utils/storage";
import { encryptA256GCM } from "../../utils/symmetric-encryption";
import GitHubSignInButton from "./github-auth-button";
import { getDatabaseList, getSessionInfo, loginOdoo } from "../../actions/odoo-action";
import { cn } from "@ui/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@ui/components/ui/popover";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@ui/components/ui/command";

export default function UserSignInForm() {
    const [dbList, setDbList] = useState<any[]>([]);
    const { toast } = useToast();
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl");
    const [loading, setLoading] = useState(false);
    const defaultValues = {
        db: "meta17",
        login: "admin",
        password: "admin",
    };

    useEffect(() => {
        getDatabaseList().then((res) => {
            setDbList(res.result.map((item: string) => ({ label: item, value: item })));
        });
    }, []);

    const setUserInfos = userStore((state: any) => state.setUserInfos);
    const setBaseInfo = userStore((state: any) => state.setBaseInfo);

    const form = useForm<SignInFormType>({
        resolver: zodResolver(signInFormSchema),
        defaultValues,
    });

    const onSubmit = async (formData: SignInFormType) => {
        const singinData = {
            db: formData.db,
            login: formData.login,
            password: encryptA256GCM(formData.password),
        };
        // console.log("提交表单：",singinData);
        setLoading(true);
        // 登录请求
        const response = await loginOdoo(singinData);
        console.log(response)

        setLoading(false);
        // 判断状态
        if (response.error) {
            toast({
                title: "登录失败",
                description: `${ response.error.data.message } 请检查用户名或密码`,
                variant: "destructive",
            });
        } else {
            toast({
                title: "登录成功",
                description: "欢迎回来",
                variant: "default",
            });
            // 存储信息
            Session.set("baseInfo", response.result);
            const session = await getSessionInfo();
            Session.set("userInfo", session.result);
            setUserInfos(session.result);
            setBaseInfo(response.result);
            setTimeout(() => {
                router.push(callbackUrl ? callbackUrl : "/");
            }, 500);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                    用户登录
                </h1>
                <p className="text-sm text-muted-foreground">
                    请输入您的用户名登录
                </p>
            </div>
            <Form {...form}>
                <form className="space-y-5 w-full" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="db"
                        render={({ field }) => (
                            <FormItem className="flex flex-col mt-3">
                                <FormLabel>数据库</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                className={cn(
                                                    "w-full justify-between",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value
                                                    ? dbList.find(
                                                        (db) => db.value === field.value
                                                    )?.label
                                                    : "选择数据库..."}
                                                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[340px] p-0">
                                        <Command>
                                            <CommandInput
                                                placeholder="搜索数据库..."
                                                className="h-9"
                                            />
                                            <CommandEmpty>No framework found.</CommandEmpty>
                                            <CommandGroup>
                                                {dbList.map((db) => (
                                                    <CommandItem
                                                        value={db.label}
                                                        key={db.value}
                                                        onSelect={() => {
                                                            form.setValue("db", db.value)
                                                        }}
                                                    >
                                                        {db.label}
                                                        <CheckIcon
                                                            className={cn(
                                                                "ml-auto h-4 w-4",
                                                                db.value === field.value
                                                                    ? "opacity-100"
                                                                    : "opacity-0"
                                                            )}
                                                        />
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="login"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>用户名</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="输入您的用户名..."
                                        disabled={loading}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>密码</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="请输入密码..."
                                        disabled={loading}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        disabled={loading}
                        className="ml-auto w-full"
                        type="submit"
                    >
                        登录
                    </Button>
                </form>
            </Form>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                        或者
                    </span>
                </div>
            </div>
            <GitHubSignInButton />
        </div>
    );
}