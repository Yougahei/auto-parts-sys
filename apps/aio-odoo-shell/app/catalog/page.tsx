"use client";

import React, { useEffect } from "react";
import PlateEditor, {
    EditorValueList,
} from "@repo/plate-ui/src/components/plate-editor";
import { ELEMENT_PARAGRAPH } from "@udecode/plate-paragraph";

import { getCopyWriting } from "../../actions/odoo-action";
import StaticTree from "../../components/static-tree/static-tree";
import { BaseInfo } from "../../types/odooStoreType";

function Page() {
    let initialValueTemplate: EditorValueList = [
        {
            id: "1",
            type: ELEMENT_PARAGRAPH,
            children: [{ text: "Welcome to Plate!" }],
        },
    ];
    const [value, setValue] = React.useState<EditorValueList>([]);
    const [loading, setLoading] = React.useState(true);

    async function fetchInitialValue() {
        const storedBaseInfo = sessionStorage.getItem("baseInfo");
        const infoBase: BaseInfo = JSON.parse(storedBaseInfo ?? "{}");
        try {
            const response = await getCopyWriting(infoBase.token);
            setLoading(false);
            if(response.result[0].body_data)
                setValue(response.result[0].body_data);
            else
                setValue(initialValueTemplate);
        } catch (e) {
            setValue(initialValueTemplate);
            console.log(e);
            return;
        }
    }

    useEffect(() => {
        fetchInitialValue();
    }, []);

    if (loading) {
        return <div>loading...</div>;
    }

    return (
        <div className="flex ml-5">
            <div className="w-72 mr-6">
                <StaticTree />
            </div>
            <div className="w-full">
                <PlateEditor
                    value={value}
                    onChange={setValue}
                    className=" mt-2 w-full "
                />
            </div>
        </div>
    );
}

export default Page;
