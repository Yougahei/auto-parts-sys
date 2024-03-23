import React from "react";

import EditorComponent from "../../components/common/editor/editor-component";
import StaticTree from "../../components/static-tree/static-tree";

function Page() {
    return (
        <div className="flex ml-5">
            <div className="w-auto mr-16">
                <StaticTree />
            </div>
            <div className="w-full ">
                <EditorComponent className="mt-2 w-2/3"/>
            </div>
        </div>
    );
}

export default Page;
