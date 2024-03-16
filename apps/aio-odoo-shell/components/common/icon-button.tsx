import React from "react";
import { Button } from "@repo/ui/components/ui/button";

type ButtonProps =
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;

interface IconButtonProps {
    variant?: ButtonProps;
    icon?: React.ReactNode;
    children?: React.ReactNode;
    onClick?: () => void;
    className?: string;
}

export default function IconButton({
    icon,
    variant,
    children,
    onClick,
    className,
}: IconButtonProps) {
    return (
        <Button
            className={`mr-1 w-full items-start ${className}`}
            variant={variant ? variant : "ghost"}
            onClick={onClick}
        >
            <div className="w-full space-x-2 flex items-center">
                {icon ? icon : <></>}
                {children ? <div>{children}</div> : null}
            </div>
        </Button>
    );
}
