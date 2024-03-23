"use client";

import React, { createContext, useContext, useReducer } from "react";





const TreeStateContext = createContext<any>(null);

const toggleNode = (nodes: any[], id: any, expanded: any): any[] => {
    return nodes.map((node) => {
        if (node.id === id) {
            return { ...node, isExpanded: expanded };
        }
        if (node.children) {
            return {
                ...node,
                children: toggleNode(node.children, id, expanded),
            };
        }
        return node;
    });
};

const updateAllNodes = (nodes: any[], isExpanded: boolean): any[] => {
    return nodes.map((node) => {
        if (node.children) {
            return {
                ...node,
                isExpanded,
                children: updateAllNodes(node.children, isExpanded),
            };
        }
        return { ...node, isExpanded };
    });
};

const searchNodesAndUpdateHighlight = (nodes: any[], query: string) => {
    nodes.forEach((node) => {
        node.isHighlight = query.length
            ? node.name.toLowerCase().includes(query.toLowerCase())
            : false;

        if (node.children) {
            searchNodesAndUpdateHighlight(node.children, query);
            if (
                node.children.some(
                    (child: { isHighlight: boolean }) => child.isHighlight
                )
            ) {
                node.isHighlight = true;
            }
        }
    });

    return nodes;
};

const searchNodes = (nodes: any[], query: string) => {
    let result: any[] = [];
    nodes.forEach((node) => {
        if (node.name.toLowerCase().includes(query.toLowerCase())) {
            result.push(node);
        }
        if (node.children) {
            result = result.concat(searchNodes(node.children, query));
        }
    });
    return result;
};

const treeReducer = (state: any[], action: any) => {
    // console.log("ttt", action);
    switch (action.type) {
        case "INIT_DATA":
            return action.data;
        case "TOGGLE_NODE":
            return toggleNode(state, action.id, action.isExpanded);
        case "EXPAND_ALL":
            return updateAllNodes(state, true);
        case "COLLAPSE_ALL":
            return updateAllNodes(state, false);
        case "SEARCH":
            return searchNodesAndUpdateHighlight(state, action.query);
        case "NODE_CLICKED":
            console.log(state, action.node); // 这里会打印出被点击的节点的数据
            return state;
        default:
            return state;
    }
};

export const TreeProvider = ({ children }: { children: any }) => {
    const [state, dispatch] = useReducer(treeReducer, []); // Default state set as an empty array

    return (
        <TreeStateContext.Provider value={{ state, dispatch }}>
            {children}
        </TreeStateContext.Provider>
    );
};

export const useTreeState = () => {
    return useContext(TreeStateContext);
};
