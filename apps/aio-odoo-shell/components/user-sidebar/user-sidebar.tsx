import React from "react";

import { SidebarMobile } from "../sidebar/sidebar-mobile";

interface UserSidebarProps {
    children: React.ReactNode;
}

function UserSidebar({ children }: UserSidebarProps) {
    return <SidebarMobile>{children}</SidebarMobile>;
}

export default UserSidebar;
