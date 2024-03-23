import CryptoJS from "crypto-js";
import { BizTreeData, BizTreeDataList, TreeData, TreeDataList } from "../types/tree";

/**
 *加密处理
 */
export function encryption(src: string, keyWord: string): string {
    const key = CryptoJS.enc.Utf8.parse(keyWord);
    // 加密
    var encrypted = CryptoJS.AES.encrypt(src, key, {
        iv: key,
        mode: CryptoJS.mode.CFB,
        padding: CryptoJS.pad.NoPadding,
    });
    return encrypted.toString();
}

/**
 *  解密
 * @param {*} params 参数列表
 * @returns 明文
 */
export function decryption(src: string, keyWord: string): string {
    const key = CryptoJS.enc.Utf8.parse(keyWord);
    // 解密逻辑
    var decryptd = CryptoJS.AES.decrypt(src, key, {
        iv: key,
        mode: CryptoJS.mode.CFB,
        padding: CryptoJS.pad.NoPadding,
    });

    return decryptd.toString(CryptoJS.enc.Utf8);
}

export function randomId(): number {
    return Math.floor(Math.random() * 1000000000 + 1);
}

/**
 * 统一批量导出
 * @method  encryption 加密处理
 */

const other = {
    encryption: (src: string, keyWord: string) => {
        return encryption(src, keyWord);
    },
    decryption: (src: string, keyWord: string) => {
        return decryption(src, keyWord);
    },
};


export function BizDataToTreeData(dataList: BizTreeDataList): TreeDataList {
    let map: { [key: string]: TreeData } = {};

    dataList.forEach(item => {
        map[item.id] = {
            id: item.id,
            name: item.name,
            title: item.name,
            description: null,
            children: [],
            active: true,
            parent_id: item.parent_id
        };
    });

    let roots: TreeDataList = [];

    dataList.forEach((item: BizTreeData) => {
        if (item.parent_id && map[item.parent_id]) {
            //@ts-ignore
            map[item.parent_id].children.push(map[item.id]);
        } else {
            //@ts-ignore
            roots.push(map[item.id]);
        }
    });

    Object.values(map).forEach(item => {
        if (item.children && item.children.length === 0) {
            delete item.children;
        }
    });

    return roots;
}

// 统一批量导出
export default other;
