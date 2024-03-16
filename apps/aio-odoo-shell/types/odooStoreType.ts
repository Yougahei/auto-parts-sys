export type UserInfo = {
    uid: number;
    is_system: boolean;
    is_admin: boolean;
    user_context: {
        lang: string;
        tz: string;
        uid: number;
    };
    db: string;
    server_version: string;
    server_version_info: [number, number, number, string, number, string];
    support_url: string;
    name: string;
    username: string;
    partner_display_name: string;
    company_id: number;
    partner_id: number;
    "web.base.url": string;
    active_ids_limit: number;
    profile_session: null;
    profile_collectors: null;
    profile_params: null;
    max_file_upload_size: number;
    home_action_id: boolean;
    cache_hashes: {
        translations: string;
        load_menus: string;
    };
    currencies: {
        [key: string]: {
            symbol: string;
            position: string;
            digits: [number, number];
        };
    };
    bundle_params: {
        lang: string;
    };
    user_companies: {
        current_company: number;
        allowed_companies: {
            [key: string]: {
                id: number;
                name: string;
                sequence: number;
            };
        };
    };
    show_effect: boolean;
    display_switch_company_menu: boolean;
    user_id: [number];
    web_tours: any[];
    tour_disable: boolean;
    notification_type: string;
    odoobot_initialized: boolean;
    iap_company_enrich: boolean;
};

export type BaseInfo = {
    token: string;
    admin_token?: string | boolean;
    uid: number;
    company_ids: number[];
    partner_id: number;
}

export type UserStore = {
    userInfo: UserInfo;
    baseInfo: BaseInfo,
    setBaseInfo: (baseInfo: BaseInfo) => void;
    setUserInfos: (userInfo: UserInfo) => void;
    hydrate: () => void;
};
