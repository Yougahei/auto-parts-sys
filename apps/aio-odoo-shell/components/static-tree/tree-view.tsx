"use client";

import React from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

import { useTreeState } from "./tree-context";

const TreeNode = ({ node }: { node: any }) => {
    const { dispatch } = useTreeState();
    return (
        <div
            className={`my-2.5 pl-5 ${node.isHighlight ? "text-red-500" : "text-black"} items-center text-left`}
        >
            <div className="flex flex-row">
                {node.children && (
                    <div
                        className="flex items-center cursor-pointer bg-transparent focus:outline-2 focus:outline-blue-500 h-6 w-6"
                        onClick={() =>
                            dispatch({
                                type: "TOGGLE_NODE",
                                id: node.id,
                                isExpanded: !node.isExpanded,
                            })
                        }
                    >
                        {node.isExpanded ? (
                            <ChevronDown size={16} />
                        ) : (
                            <ChevronRight size={16} />
                        )}
                    </div>
                )}
                <span
                    className="select-none"
                    onClick={() => dispatch({ type: "NODE_CLICKED", node })}
                >
                    {node.name}
                </span>
            </div>
            {node.isExpanded && <TreeView data={node?.children} />}
        </div>
    );
};

function TreeView({ data }: { data: any[] }) {
    return (
        <div className="m-0 p-0 list-none">
            {data?.map((node) => <TreeNode key={node.id} node={node} />)}
        </div>
    );
}

export default TreeView;
