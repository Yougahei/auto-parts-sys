"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@ui/components/ui/button";
import { Input } from "@ui/components/ui/input";

import { catalogDemo } from "../../demo-data/catalog-demo";
import { BizDataToTreeData } from "../../utils/other";
import { useTreeState } from "./tree-context";
import TreeView from "./tree-view";

function StaticTree() {
    const { state, dispatch } = useTreeState();
    const [searchQuery, setSearchQuery] = useState("");

    const onHandleSearch = (e: any) => {
        const query = e.target.value;
        setSearchQuery(query);

        // Perform search and update filtered state
        dispatch({ type: "SEARCH", query });
    };

    useEffect(() => {
        // fetchData().then((data) => {
        //     dispatch({ type: "INIT_DATA", data });
        // });
        const treeData = BizDataToTreeData(catalogDemo);
        dispatch({ type: "INIT_DATA", data: treeData });
    }, []);

    return (
        <div className="mt-3 space-y-2">
            <Input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={onHandleSearch}
            />
            <div className="space-x-2">
                <Button
                    onClick={() => dispatch({ type: "EXPAND_ALL" })}
                    variant="outline"
                    className="h-7 w-16"
                >
                    展开全部
                </Button>
                <Button
                    onClick={() => dispatch({ type: "COLLAPSE_ALL" })}
                    variant="outline"
                    className="h-7 w-16"
                >
                    收起全部
                </Button>
            </div>
            <div className="rounded-md border-2">
                <TreeView data={state} />
            </div>
        </div>
    );
}

export default StaticTree;
