import { create } from "zustand";

import request from "../utils/request";
import { BaseInfo, UserInfo, UserStore } from "../types/odooStoreType";

/**
 * 获取用户信息方法
 * @function setUserInfos
 * @async
 */
export const userStore = create<UserStore>((set) => ({
    userInfo: {} as UserInfo,
    baseInfo: {} as BaseInfo,
    setBaseInfo: (baseInfo: BaseInfo) => set({ baseInfo }),
    setUserInfos: (userInfo: UserInfo) => set({ userInfo }),
    // 从SessionStorage加载数据的方法
    hydrate: () => {
        const storedData = sessionStorage.getItem('userInfo');
        const storedBaseInfo = sessionStorage.getItem('baseInfo');
        if (storedData) {
            const infoUser: UserInfo = JSON.parse(storedData);
            // console.log('infoUser', infoUser)
            set({ userInfo: infoUser });
        }
        if (storedBaseInfo) {
            const infoBase: BaseInfo = JSON.parse(storedBaseInfo);
            // console.log('infoBase', infoBase)
            set({ baseInfo: infoBase });
        }
    },
}));
