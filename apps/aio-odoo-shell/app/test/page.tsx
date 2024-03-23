"use client";

import { useState } from "react";
import { Button } from "@ui/components/ui/button";
import { getImage } from "../../api/odoo/odoo-api";
import { userStore } from "../../stores/userInfo";
import EditTree from "../../components/common/tree/edit-tree";
import {catalogDemo} from "../../demo-data/catalog-demo";


function Page() {
    const [state, setState] = useState("");
    const [imgUrl, setImgUrl] = useState<string | null>(null);
    // const baseInfo = userStore((state) => state.baseInfo);
    return (
        <div className="mt-5 flex ">
            <div className="w-72">
                <EditTree treeData={catalogDemo}/>
            </div>
            <div>
                <Button onClick={async () => {
                    const response = await getImage({
                        model: "res.partner",
                        field: "avatar_128",
                        id: 3,
                        unique: 1709956427000,
                    });

                    const url = URL.createObjectURL(response);
                    setImgUrl(url);
                    console.log(url);

                }}>
                    测试获取头像
                </Button>
                <div>{state}</div>
                {imgUrl? <img src={imgUrl} alt="Avatar" />: null}
            </div>
        </div>
    );
}

export default Page;
