"use client";

import React from "react";
import { Editor } from "@plate-ui/components/plate-ui/editor";
import { Plate } from "@udecode/plate-common";

function PlateEditor() {
    return (
        <Plate>
            <Editor placeholder="Type your message here." />
        </Plate>
    );
}

export default PlateEditor;
