'use client';
import React from "react";
import { userStore } from "../../stores/userInfo";

function Setting() {

    const { userInfo } = userStore((state)=> state)

    return (
        <div>
            <div>设置页面</div>
            <div>{JSON.stringify(userInfo)}</div>
        </div>
    );
}

export default Setting;
