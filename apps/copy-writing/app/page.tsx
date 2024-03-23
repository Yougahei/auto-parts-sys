"use client";

import { useState } from "react";
import { EditorValueList } from "@plate-ui/components/plate-editor";
import PlateEditor from "@repo/plate-ui/src/components/plate-editor";
import { ELEMENT_PARAGRAPH } from "@udecode/plate-paragraph";

export default function Page() {
    const initialValue: EditorValueList = [
        {
            id: "1",
            type: ELEMENT_PARAGRAPH,
            children: [{ text: "Welcome to Plate!" }],
        },
    ];
    const [value, setValue] = useState<EditorValueList>(initialValue);

    return (
        <main>
            <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
                <div className="flex max-w-[980px] flex-col items-start gap-2">
                    <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
                        Plate Playground.
                    </h1>
                    <p className="max-w-[700px] text-lg text-muted-foreground">
                        Plugin system & primitive component library.{" "}
                        <br className="hidden sm:inline" />
                        CLI for styled components. Customizable. Open Source.
                        And Next.js 14 Ready.
                    </p>
                </div>
                <div className="max-w-[1336px] rounded-lg border bg-background shadow">
                    <PlateEditor
                        initialValue={initialValue}
                        value={value}
                        onChange={setValue}
                    />
                </div>
            </section>
        </main>
    );
}
