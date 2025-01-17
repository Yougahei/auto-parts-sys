"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/components/ui/button";
import { Checkbox } from "@repo/ui/components/ui/checkbox";
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

import { signUpFormSchema, SignUpFormType } from "../../types/auth";
import GitHubSignInButton from "./github-auth-button";

interface SignUpFormProps {
    changeToSignIn: () => void;
}

export default function UserSignUpForm({changeToSignIn}: SignUpFormProps) {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const defaultValues = {
        username: "",
        password: "",
        phone: "",
        checked: false,
    };

    const form = useForm<SignUpFormType>({
        resolver: zodResolver(signUpFormSchema),
        defaultValues,
    });

    const onSubmit = async (data: SignUpFormType) => {
        setLoading(true);
        console.log(data);
        setLoading(false);
    };

    return (
        <>
            <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                    创建一个用户
                </h1>
                <p className="text-sm text-muted-foreground">
                    请注册一个新用户，开始使用我们的服务
                </p>
            </div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-5 w-full"
                >
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>用户名</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="请输入您用户名..."
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

                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>手机号</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="输入手机号..."
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
                        name="checked"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <FormLabel className="ml-2 items-center">
                                    我已阅读并同意
                                </FormLabel>
                                <FormLabel className="text-primary">
                                    服务条款
                                </FormLabel>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        disabled={loading || !form.getValues("checked")}
                        className="ml-auto w-full"
                        type="submit"
                    >
                        注册
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
        </>
    );
}
