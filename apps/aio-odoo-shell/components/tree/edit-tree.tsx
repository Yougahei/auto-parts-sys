import React, { useRef, useState } from "react";
import { Button } from "@plate-ui/components/plate-ui/button";
import { Input } from "@plate-ui/components/plate-ui/input";
import { Tree, useSimpleTree } from "react-arborist";
import { AiOutlineFileAdd } from "react-icons/ai";
import { TbFolderPlus } from "react-icons/tb";

import { TreeDataList } from "../../types/tree";
import Node from "./node";

type Operation = {
    move?: boolean;
    rename?: boolean;
    delete?: boolean;
    create?: boolean;
    showIcon?: boolean;
    canDrag?: boolean;
};

interface EditTreeProps {
    treeData: TreeDataList;
    create?: boolean;
    operation?: Operation;
    itemClick?: (item: any) => void;
}

function EditTree({
    treeData,
    create = true,
    operation = {
        move: true,
        rename: true,
        delete: true,
        create: true,
        showIcon: true,
        canDrag: true,
    },
    itemClick
}: EditTreeProps) {
    const [term, setTerm] = useState("");
    const treeRef = useRef(null);
    const [data, controller] = useSimpleTree(treeData);

    const createFileFolder = (
        <div className="space-x-1">
            <Button
                variant="link"
                // @ts-ignore
                onClick={() => treeRef.current.createInternal()}
                title="New Folder..."
            >
                <TbFolderPlus />
            </Button>
            <Button
                variant="link"
                // @ts-ignore
                onClick={() => treeRef.current.createLeaf()}
                title="新建"
            >
                <AiOutlineFileAdd />
            </Button>
        </div>
    );

    return (
        <div className="ml-2">
            {create ? (
                <div className="folderFileActions">{createFileFolder}</div>
            ) : null}
            <Input
                type="text"
                placeholder="Search..."
                className="search-input"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
            />
            <Tree
                ref={treeRef}
                data={data}
                width={"full"}
                height={600}
                indent={24}
                rowHeight={32}
                disableDrag={!operation.canDrag}
                // openByDefault={false}
                searchTerm={term}
                searchMatch={(node, term) =>
                    node.data.name.toLowerCase().includes(term.toLowerCase())
                }
                onSelect={(node) => console.log(node)}
                onMove={operation.move ? controller.onMove : undefined}
                onCreate={operation.create ? controller.onCreate : undefined}
                onDelete={operation.delete ? controller.onDelete : undefined}
                onRename={operation.rename ? controller.onRename : undefined}
            >
                {(node) => (
                    <Node
                        {...node}
                        canRename={operation?.rename}
                        canDelete={operation?.delete}
                        showIcon={operation?.showIcon}
                        onClick={itemClick}
                    />
                )}
            </Tree>
            <div>{JSON.stringify(data)}</div>
        </div>
    );
}

export default EditTree;
