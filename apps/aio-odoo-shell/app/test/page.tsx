"use client";

import {useEffect, useState} from "react";
import { Button } from "@ui/components/ui/button";
import { getImage } from "../../api/odoo/odoo-api";
import EditTree from "../../components/tree/edit-tree";
import {TreeDataList} from "../../types/tree";
import {catalogDemo} from "../../demo-data/catalog-demo";


function Page() {
    const [imgUrl, setImgUrl] = useState<string | null>(null);
    const [treeData, setTreeData] = useState<TreeDataList>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        localStorage.setItem("treeData", JSON.stringify(catalogDemo));
        setTreeData(catalogDemo)
        setLoading(false);
    }, []);

    if(loading){
        return <div>Loading...</div>
    }

    return (
        <div className="mt-5 flex ">
            <div className="w-72">
                <EditTree treeData={treeData}/>
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
                {imgUrl? <img src={imgUrl} alt="Avatar" />: null}
            </div>
        </div>
    );
}

export default Page;
