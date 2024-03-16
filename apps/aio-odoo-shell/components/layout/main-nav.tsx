"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@repo/ui/lib/utils";

import { siteConfig } from "../../config/site";
import { Icons } from "../common/icons";

export function MainNav() {
    const pathname = usePathname();

    return (
        <div className="mr-4 hidden md:flex">
            <Link
                href="/"
                className="mr-6 flex items-center space-x-2"
            >
                <Icons.logo className="h-6 w-6" />
                <span className="hidden font-bold sm:inline-block">
                    {siteConfig.name}
                </span>
            </Link>
            <nav className="flex items-center gap-6 text-sm">
                <Link
                    href="/auth"
                    className={cn(
                        "transition-colors hover:text-foreground/80",
                        pathname === "/auth"
                            ? "text-foreground"
                            : "text-foreground/60"
                    )}
                >
                    认证
                </Link>
                <Link
                    href="/product/catalog"
                    className={cn(
                        "transition-colors hover:text-foreground/80",
                        pathname === "/product/catalog"
                            ? "text-foreground"
                            : "text-foreground/60"
                    )}
                >
                    产品分类
                </Link>
                <Link
                    href="/product"
                    className={cn(
                        "transition-colors hover:text-foreground/80",
                        pathname === "/product"
                            ? "text-foreground"
                            : "text-foreground/60"
                    )}
                >
                    产品
                </Link>
                <Link
                    href={siteConfig.links.github}
                    className={cn(
                        "hidden text-foreground/60 transition-colors hover:text-foreground/80 lg:block"
                    )}
                >
                    GitHub
                </Link>
            </nav>
        </div>
    );
}
