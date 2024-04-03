"use client";

import React, { ReactNode } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

interface Props {
    children: ReactNode;
}

function EditorProvider({ children }: Props) {
    return <DndProvider backend={HTML5Backend}>{children}</DndProvider>;
}

export default EditorProvider;
