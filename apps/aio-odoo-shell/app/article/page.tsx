import React from 'react';
import ArticleMain from "../../components/article/article-main";
import {cookies} from "next/headers";

function Page() {
    const layout = cookies().get("article-resizable-panels:layout")
    const collapsed = cookies().get("article-resizable-panels:collapsed")

    const defaultLayout = layout ? JSON.parse(layout.value) : undefined
    const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined

    return (
        <div>
            <ArticleMain
                defaultLayout={defaultLayout}
                defaultCollapsed={defaultCollapsed}
                navCollapsedSize={4}
            />
        </div>
    );
}

export default Page;
