"use server";

import { RpcData } from "../types/odoo/odoo-common";
import { randomId } from "../utils/other";
import { getCookie } from "./cookie-action";
import { jsonRpc } from "./odoo-action";

export async function getArticleCatalog(token: string) {
    const sessionId = await getCookie("session_id");
    const rpcData: RpcData = {
        jsonrpc: "2.0",
        params: {
            model: "copywriting.article_category",
            method: "search_read",
            token: token,
            args: [],
        },
        id: randomId(),
    };

    const response = await jsonRpc(`/json-call`, rpcData, {
        headers: {
            "Content-Type": "application/json",
            Cookie: `session_id=${sessionId?.value}`,
        },
    });
    return await response.json();
}

export async function getArticleCollectLists(token: string, ids: number[]) {
    const sessionId = await getCookie("session_id");
    const rpcData: RpcData = {
        jsonrpc: "2.0",
        params: {
            model: "copywriting.article_collect",
            method: "search_read",
            token: token,
            args: [[["category_id", "in", ids]]],
        },
        id: randomId(),
    };

    const response = await jsonRpc(`/json-call`, rpcData, {
        headers: {
            "Content-Type": "application/json",
            Cookie: `session_id=${sessionId?.value}`,
        },
    });
    return await response.json();
}
