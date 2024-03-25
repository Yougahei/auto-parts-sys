import React, { useState } from "react";
import { Input } from "@plate-ui/components/plate-ui/input";
import { NodeRendererProps } from "react-arborist";
import { AiFillFile, AiFillFolder } from "react-icons/ai";
import {
    MdArrowDropDown,
    MdArrowRight,
    MdEdit,
    MdOutlineSaveAs,
} from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

import { TreeData } from "../../types/tree";

type NodeComponentProps = NodeRendererProps<TreeData> & {
    canRename?: boolean;
    canDelete?: boolean;
    showIcon?: boolean;
    onClick?: (node: any) => void;
};

const Node = ({ node, style, dragHandle, tree, canRename=true, canDelete=true, showIcon=true, onClick}: NodeComponentProps) => {
    //@ts-ignore
    const CustomIcon = node.data.icon;
    //@ts-ignore
    const iconColor = node.data.iconColor;

    const [inputValue, setInputValue] = useState(node.data.name);

    return (
        <div
            className={`flex h-full items-center w-full ${node.state.isSelected ? "bg-gray-300 text-white rounded-none" : ""}`}
            style={style}
            ref={dragHandle}
        >
            <div
                onClick={() => node.isInternal}
                className="flex h-full items-center w-full cursor-pointer"
            >
                {!(node.children && node.children?.length > 0) ? (
                    <div>
                        <span className="w-5 text-lg flex"></span>
                        <span className="mr-1.5 flex items-center text-lg">
                            {showIcon? (
                                CustomIcon ? (
                                    <CustomIcon
                                        color={iconColor ? iconColor : "#6bc7f6"}
                                    />
                                ) : (
                                    <AiFillFile color="#6bc7f6" />
                                )
                            ): null}
                        </span>
                    </div>
                ) : (
                    <div
                        onClick={() => node.isInternal && node.toggle()}
                        className="flex items-center flex-row"
                    >
                        <span className="w-5 text-lg flex">
                            {node.isOpen ? (
                                <MdArrowDropDown />
                            ) : (
                                <MdArrowRight />
                            )}
                        </span>
                        <span className="mr-1.5 flex items-center text-lg">
                            {showIcon? (
                                CustomIcon ? (
                                    <CustomIcon
                                        color={iconColor ? iconColor : "#f6cf60"}
                                    />
                                ) : (
                                    <AiFillFolder color="#f6cf60" />
                                )
                            ): null}
                        </span>
                    </div>
                )}
                <span className="text-gray-700 font-semibold" onClick={() => onClick?.(node.data)}>
                    {node.isEditing ? (
                        <Input
                            className="w-full h-6 border-1 rounded-md px-1.5 focus:outline-none focus:border-blue-500"
                            type="text"
                            value={inputValue}
                            onChange={(e: any) => {
                                setInputValue(e.currentTarget.value);
                            }}
                            onFocus={(e: any) => e.currentTarget.select()}
                            // onBlur={() => node.reset()}
                            onKeyDown={(e: any) => {
                                if (e.key === "Escape") node.reset();
                                if (e.key === "Enter") node.submit(e.currentTarget.value);
                            }}
                            autoFocus
                        />
                    ) : (
                        <span>{node.data.name}</span>
                    )}
                </span>
            </div>

            <div className="h-full flex">
                <div className="flex flex-row items-center mr-2.5">
                    {node.isEditing ? (
                        <button
                            onClick={() => node.submit(inputValue)}
                            title="Delete"
                        >
                            <MdOutlineSaveAs/>
                        </button>
                    ) : (
                        canRename ? <button onClick={() => node.edit()} title="Rename...">
                            <MdEdit/>
                        </button> : null
                    )}
                    {canDelete ? <button onClick={() => tree.delete(node.id)} title="Delete">
                        <RxCross2/>
                    </button> : null}
                </div>
            </div>
        </div>
    );
};

export default Node;
