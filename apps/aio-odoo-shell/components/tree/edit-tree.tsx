import React, { useRef, useState } from "react";
import { Button } from "@plate-ui/components/plate-ui/button";
import { Input } from "@plate-ui/components/plate-ui/input";
import { Tree, useSimpleTree} from "react-arborist";
import { AiOutlineFileAdd } from "react-icons/ai";
import { TbFolderPlus } from "react-icons/tb";
import Node from "./node";
import {TreeDataList} from "../../types/tree";

interface EditTreeProps {
    treeData: TreeDataList;
}

function EditTree({treeData}: EditTreeProps) {
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
            <div className="folderFileActions">{createFileFolder}</div>
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
                width={280}
                height={800}
                indent={24}
                rowHeight={32}
                // openByDefault={false}
                searchTerm={term}
                searchMatch={(node, term) =>
                    node.data.name.toLowerCase().includes(term.toLowerCase())
                }
                {...controller}
            >
                {(node) => <Node {...node} />}
            </Tree>
            <div>{JSON.stringify(data)}</div>
        </div>
    );
}

export default EditTree;
