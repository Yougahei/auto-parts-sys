import React, { Fragment } from "react";
import Link from "next/link";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { cn } from "@ui/lib/utils";

type BreadCrumbType = {
    title: string;
    link: string;
};

type BreadCrumbPropsType = {
    items: BreadCrumbType[];
};

export default function BreadCrumb({ items }: BreadCrumbPropsType) {
    return (
        <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
            <Link
                href={"/"}
                className="overflow-hidden text-ellipsis whitespace-nowrap"
            >
                主页
            </Link>
            {items?.map((item: BreadCrumbType, index: number) => (
                <Fragment key={item.title}>
                    <ChevronRightIcon className="h-4 w-4" />
                    <Link
                        href={item.link}
                        className={cn(
                            "font-medium",
                            index === items.length - 1
                                ? "text-foreground pointer-events-none"
                                : "text-muted-foreground"
                        )}
                    >
                        {item.title}
                    </Link>
                </Fragment>
            ))}
        </div>
    );
}
