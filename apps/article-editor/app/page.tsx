"use client";

import { useState } from "react";
import { Button } from "@plate-ui/components/plate-ui/button";

import PlateEditor from "../components/plate-editor";

type EditorValue = {
    type: string;
    id?: string;
    children: { text: string }[];
}[];

export default function Page() {
    const initialValue = [
        {
            type: "p",
            children: [{ text: "你好，我是林个了檬sdfsdfsdfsdf" }],
        },
        { type: "paragraph", id: "eq76j", children: [{ text: "ad" }] },
        {
            type: "p",
            id: "9b8lc",
            children: [{ text: "a" }],
        },
        { type: "p", id: "3avvm", children: [{ text: "wd" }] },
        {
            type: "p",
            id: "by18e",
            children: [{ text: "addd" }],
        },
        { type: "paragraph", id: "7n2ey", children: [{ text: "wd" }] },
        {
            type: "h1",
            children: [{ text: "dddd" }],
            id: "qhy5k",
        },
        { type: "p", children: [{ text: "新航海" }], id: "biu1o" },
    ];
    const [value, setValue] = useState<EditorValue>(
        initialValue ? initialValue : []
    );

    async function handleSave(value: EditorValue) {
        console.log("save", JSON.stringify(value));
        setValue(value);
    }

    return (
        <main>
            <Button>Click me</Button>
            <PlateEditor value={value} onChange={setValue} />
            <div>
                <div>
                    <p>init</p>
                    <p>{JSON.stringify(initialValue)}</p>
                </div>
                <div>
                    <p>value</p>
                    <p>{JSON.stringify(value)}</p>
                </div>
            </div>
            <Button onClick={async () => await handleSave(value)}>Save</Button>
        </main>
    );
}
