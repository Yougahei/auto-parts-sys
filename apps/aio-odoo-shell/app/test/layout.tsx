"use client";

import React, { ReactNode } from "react";

import { TreeProvider } from "../../components/static-tree/tree-context";

interface Props {
    children: ReactNode;
}

export default function TestLayout({ children }: Props) {
    return (
        <div className="mr-10 ml-10">
            <TreeProvider>{children}</TreeProvider>
        </div>
    );
}
