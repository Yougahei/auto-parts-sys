"use client";

import Link from "next/link";
import { buttonVariants } from "@ui/components/ui/button";
import { ScrollArea, ScrollBar } from "@ui/components/ui/scroll-area";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@ui/components/ui/tooltip";
import { cn } from "@ui/lib/utils";

import { ArticleCatalogList } from "../../types/article";
import {useArtitleStore} from "../../stores/articleStore";

interface NavProps {
    isCollapsed: boolean;
    links: ArticleCatalogList;
}

export function Nav({ links, isCollapsed }: NavProps) {
    const { setSelectCollectIds } = useArtitleStore((state) => state);

    return (
        <ScrollArea className="h-[80vh] w-full">
            <div
                data-collapsed={isCollapsed}
                className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
            >
                <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
                    {links.map((link, index) =>
                        isCollapsed ? (
                            <Tooltip key={index} delayDuration={0}>
                                <TooltipTrigger asChild>
                                    <Link
                                        href="#"
                                        onClick={() => setSelectCollectIds(link.article_collect_ids)}
                                        className={cn(
                                            buttonVariants({
                                                variant: link.variant? link.variant: "ghost",
                                                size: "icon",
                                            }),
                                            "h-9 w-9",
                                            link.variant === "default" &&
                                                "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                                        )}
                                    >
                                        <span className="sr-only">
                                            {link.name}
                                        </span>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent
                                    side="right"
                                    className="flex items-center gap-4"
                                >
                                    {link.name}
                                    {link.article_collect_ids && (
                                        <span className="ml-auto text-muted-foreground">
                                            {link.article_collect_ids.length}
                                        </span>
                                    )}
                                </TooltipContent>
                            </Tooltip>
                        ) : (
                            <Link
                                key={index}
                                onClick={() => setSelectCollectIds(link.article_collect_ids)}
                                href="#"
                                className={cn(
                                    buttonVariants({
                                        variant: link.variant? link.variant: "ghost",
                                        size: "sm",
                                    }),
                                    link.variant === "default" &&
                                        "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                                    "justify-start"
                                )}
                            >
                                {link.name}
                                {link.article_collect_ids && (
                                    <span
                                        className={cn(
                                            "ml-auto",
                                            link.variant === "default" &&
                                                "text-background dark:text-white"
                                        )}
                                    >
                                        {link.article_collect_ids.length}
                                    </span>
                                )}
                            </Link>
                        )
                    )}
                </nav>
            </div>
            <ScrollBar orientation={"vertical"} />
        </ScrollArea>
    );
}
