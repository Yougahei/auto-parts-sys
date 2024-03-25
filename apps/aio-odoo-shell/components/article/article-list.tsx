import React, { useEffect } from "react";

import { useArtitleStore } from "../../stores/articleStore";
import EditTree from "../tree/edit-tree";

function ArticleList() {
    const { jsonTree } = useArtitleStore((state) => state);

    function itemClick(item: any) {
        console.log(item);
    }

    useEffect(() => {
        console.log(jsonTree);
    }, []);

    return (
        <div className="flex ml-5 mt-2">
            <EditTree
                treeData={jsonTree}
                create={false}
                operation={{
                    move: false,
                    rename: false,
                    delete: false,
                    create: false,
                    showIcon: false,
                    canDrag: false,
                }}
                itemClick={itemClick}
            />
        </div>
    );
}

export default ArticleList;
