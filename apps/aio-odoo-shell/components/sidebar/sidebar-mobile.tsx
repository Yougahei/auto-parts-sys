'use client'

import { Sheet, SheetContent, SheetTrigger } from '@repo/ui/components/ui/sheet'

import { Sidebar } from './sidebar'
import { Button } from '@repo/ui/components/ui/button'

import { Icons } from '../common/icons'

interface SidebarMobileProps {
    children: React.ReactNode
}

export function SidebarMobile({ children }: SidebarMobileProps) {
    return (
        <Sheet>
            {/*<SheetTrigger asChild>*/}
            {/*    <Button variant="ghost" className="-ml-2 flex size-9 p-0 lg:hidden">*/}
            {/*        <Icons.IconSidebar className="size-6" />*/}
            {/*        <span className="sr-only">Toggle Sidebar</span>*/}
            {/*    </Button>*/}
            {/*</SheetTrigger>*/}
            <SheetContent className="inset-y-0 flex h-auto w-[300px] flex-col p-0">
                <Sidebar className="flex">{children}</Sidebar>
            </SheetContent>
        </Sheet>
    )
}
