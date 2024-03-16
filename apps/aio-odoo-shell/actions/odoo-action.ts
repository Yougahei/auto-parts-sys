"use server";

import { cookies } from "next/headers";

import { Payload, RpcData } from "../types/odoo/odoo-common";
import { randomId } from "../utils/other";
import { decryptA256GCM } from "../utils/symmetric-encryption";
import { deleteCookie, getCookie, setCookie } from "./cookie-action";

export async function jsonRpc(
    url: string,
    data: RpcData,
    options: RequestInit = {}
) {
    const headers = {
        "Content-Type": "application/json",
        ...options.headers,
    };

    return fetch(`${process.env.NEXT_PUBLIC_ODOO_API}/${url}`, {
        ...options,
        method: options.method ? options.method : "POST",
        headers: headers,
        body: JSON.stringify(data),
    });
}

export async function loginOdoo(params: {
    db: string;
    login: string;
    password: string;
}) {
    const rpcData: RpcData = {
        jsonrpc: "2.0",
        params: {
            ...params,
            password: decryptA256GCM(params.password),
        },
        id: randomId(),
    };
    const response = await jsonRpc("/json-call/user_authenticate", rpcData);
    const setCookieHeader = response.headers.get("Set-Cookie");
    const sessionIdMatch = setCookieHeader?.match(/session_id=([^;]+)/);
    const sessionId = sessionIdMatch ? sessionIdMatch[1] : null;
    if (sessionId) {
        await setCookie("session_id", sessionId);
    }
    console.log(response);
    return response.json();
}

export async function logoutOdoo(token: string) {
    const rpcData: RpcData = {
        jsonrpc: "2.0",
        params: {
            token: token,
        },
        id: randomId(),
    };
    const response = await jsonRpc("json-call/user_logout", rpcData);
    const destroyed = await sessionDestroy();
    console.log(destroyed);
    return await response.json();
}

async function sessionDestroy() {
    const cookie_session_id = await getCookie("session_id");
    const destroyed = await jsonRpc(
        "/web/session/destroy",
        {
            jsonrpc: "2.0",
            method: "call",
            params: {},
            id: randomId(),
        },
        {
            headers: {
                Cookie: `session_id=${cookie_session_id}`,
            },
        }
    );
    await deleteCookie("session_id");
    return await destroyed.json();
}

export async function getSessionInfo() {
    const sessionId = await getCookie("session_id");
    console.log(sessionId?.value);
    const rpcData: RpcData = {
        jsonrpc: "2.0",
        method: "call",
        params: {},
        id: randomId(),
    };
    const response = await jsonRpc("/web/session/get_session_info", rpcData, {
        headers: {
            Cookie: `session_id=${sessionId?.value}`,
        },
    });
    return await response.json();
}

export async function loadMenus(menu_hashes: string) {
    const sessionId = await getCookie("session_id");
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_ODOO_API}/web/webclient/load_menus/${menu_hashes}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Cookie: `session_id=${sessionId?.value}`,
            },
        }
    );
    return await response.json();
}

export async function callKw(payload: Payload) {
    const sessionId = await getCookie("session_id");
    const rpcData: RpcData = {
        jsonrpc: "2.0",
        method: "call",
        params: payload,
        id: randomId(),
    };
    const response = await jsonRpc("/web/dataset/call_kw", rpcData, {
        headers: {
            Cookie: `session_id=${sessionId?.value}`,
        },
    });
    return await response.json();
}

export async function getDatabaseList() {
    const response = await jsonRpc(`/web/database/list`, {
        jsonrpc: "2.0",
        method: "call",
        params: {},
        id: randomId(),
    });
    return await response.json();
}

export async function getProductList(token: string) {
    const sessionId = await getCookie("session_id");
    const rpcData: RpcData = {
        jsonrpc: "2.0",
        params: {
            model: "product.template",
            method: "search_read",
            token: token,
            args: [],
        },
        id: randomId(),
    };

    const response = await jsonRpc(
        `/json-call`,
        rpcData,
        {
            headers: {
                "Content-Type": "application/json",
                Cookie: `session_id=${sessionId?.value}`,
            },
        }
    );
    return await response.json();
}

export async function getProductCategories(token: string, domain: any[] = []) {
    const sessionId = await getCookie("session_id");
    const rpcData: RpcData = {
        jsonrpc: "2.0",
        params: {
            model: "product_catalog_management.product_catalog",
            method: "search_read",
            token: token,
            args: domain,
        },
        id: randomId(),
    };

    const response = await jsonRpc(
        `/json-call`,
        rpcData,
        {
            headers: {
                "Content-Type": "application/json",
                Cookie: `session_id=${sessionId?.value}`,
            },
        }
    );
    return await response.json();
}

export async function getProductAliases(token: string) {
    const sessionId = await getCookie("session_id");
    const rpcData: RpcData = {
        jsonrpc: "2.0",
        params: {
            model: "product_catalog_management.product_alias",
            method: "search_read",
            token: token,
            args: [],
        },
        id: randomId(),
    };

    const response = await jsonRpc(
        `/json-call`,
        rpcData,
        {
            headers: {
                "Content-Type": "application/json",
                Cookie: `session_id=${sessionId?.value}`,
            },
        }
    );
    return await response.json();
}

export async function getProductComponents(token: string) {
    const sessionId = await getCookie("session_id");
    const rpcData: RpcData = {
        jsonrpc: "2.0",
        params: {
            model: "product_catalog_management.product_component",
            method: "search_read",
            token: token,
            args: [],
        },
        id: randomId(),
    };

    const response = await jsonRpc(
        `/json-call`,
        rpcData,
        {
            headers: {
                "Content-Type": "application/json",
                Cookie: `session_id=${sessionId?.value}`,
            },
        }
    );
    return await response.json();
}
