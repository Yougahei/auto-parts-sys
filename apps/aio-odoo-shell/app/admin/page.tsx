'use client';
import { Button } from "@ui/components/ui/button";
import {
    callKw,
    getDatabaseList,
    getSessionInfo,
    loadMenus,
    loginOdoo,
    logoutOdoo
} from "../../actions/odoo-action";
import { useState } from "react";
import { encryptA256GCM } from "../../utils/symmetric-encryption";
import { userStore } from "../../stores/userInfo";
import { getImage } from "../../api/odoo/odoo-api";

function AdminPage() {
    const [state, setState] = useState("");
    const { baseInfo, userInfo } = userStore((state) => state);
    const [imgUrl, setImgUrl] = useState<string | null>(null);
    return (
        <div>
            <h1>Admin Page</h1>
            <div className="mt-5">
                <Button
                    onClick={async () => {
                        const response = await loginOdoo({
                            db: "meta17",
                            login: "admin",
                            password: encryptA256GCM("admin"),
                        });
                        console.log(response);
                        setState(JSON.stringify(response));
                    }}
                >
                    登录测试
                </Button>
                <Button
                    onClick={async () => {
                        const response = await getSessionInfo();
                        setState(JSON.stringify(response));
                    }}
                >
                    获取session信息
                </Button>
                <Button
                    onClick={async () => {
                        const response = await loadMenus(
                            "3d4a01dc340ac8e3e8cdeed6d3176d2aeee4dbc267b2fa4281445578e1664ef3"
                        );
                        setState(JSON.stringify(response));
                    }}
                >
                    获取菜单
                </Button>
                <Button
                    onClick={async () => {
                        const response = await logoutOdoo(baseInfo.token);
                        setState(JSON.stringify(response));
                    }}
                >
                    退出登录
                </Button>
                <Button
                    onClick={async () => {
                        const response = await callKw({
                            model: "res.partner",
                            method: "search_read",
                            args: [[["id", ">", 0]]],
                            kwargs: {
                                domain: [],
                                specification: {}
                            },
                        });
                        setState(JSON.stringify(response));
                    }}
                >
                    测试Call_kw
                </Button>
                <Button
                    onClick={async () => {
                        const response = await getDatabaseList();
                        setState(JSON.stringify(response));
                    }}
                >
                    数据库列表
                </Button>
                <Button onClick={async () => {
                    const response = await getImage({
                        model: "res.partner",
                        field: "avatar_128",
                        id: 18,
                    });

                    const url = URL.createObjectURL(response);
                    setImgUrl(url);
                    console.log(url);

                }}>
                    测试获取头像
                </Button>
                <div>{state}</div>
                {imgUrl ? <img src={imgUrl} alt="Avatar" /> : null}
            </div>
        </div>
    );
}

export default AdminPage;
