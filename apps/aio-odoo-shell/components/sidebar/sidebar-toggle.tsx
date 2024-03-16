'use client';

import * as React from 'react';
import { Button } from '@repo/ui/components/ui/button';
import { useSidebar } from '../../hooks/use-sidebar';
import { Icons } from "../common/icons";


export function SidebarToggle() {
    const { toggleSidebar } = useSidebar()

    return (
        <Button
            variant="ghost"
            className="-ml-2 hidden size-9 p-0 lg:flex"
            onClick={() => {
                toggleSidebar()
            }}
        >
            <Icons.IconSidebar className="size-6" />
            <span className="sr-only">Toggle Sidebar</span>
        </Button>
    )
}
