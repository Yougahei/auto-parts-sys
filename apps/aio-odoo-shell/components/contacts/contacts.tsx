"use client";

import React, { useEffect } from "react";

import { callKw } from "../../actions/odoo-action";
import { Payload } from "../../types/odoo/odoo-common";
import TextKanbanView from "../common/views/text-kanban-view";

function Contacts() {
    const [contacts, setContacts] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        getContacts();
    }, []);

    async function getContacts() {
        const payload: Payload = {
            model: "res.partner",
            method: "web_search_read",
            args: [],
            kwargs: {
                specification: {
                    id: {},
                    color: {},
                    display_name: {},
                    title: {
                        fields: {
                            display_name: {},
                        },
                    },
                    email: {},
                    parent_id: {
                        fields: {
                            display_name: {},
                        },
                    },
                    is_company: {},
                    function: {},
                    phone: {},
                    street: {},
                    street2: {},
                    zip: {},
                    city: {},
                    country_id: {
                        fields: {
                            display_name: {},
                        },
                    },
                    mobile: {},
                    state_id: {
                        fields: {
                            display_name: {},
                        },
                    },
                    category_id: {
                        fields: {
                            display_name: {},
                            color: {},
                        },
                    },
                    avatar_128: {},
                    type: {},
                    activity_state: {},
                    active: {},
                    write_date: {},
                    activity_ids: {
                        fields: {},
                    },
                    activity_exception_decoration: {},
                    activity_exception_icon: {},
                    activity_summary: {},
                    activity_type_icon: {},
                    activity_type_id: {
                        fields: {
                            display_name: {},
                        },
                    },
                },
                offset: 0,
                order: "",
                limit: 80,
                context: {
                    lang: "zh_CN",
                    tz: "Asia/Shanghai",
                    uid: 2,
                    allowed_company_ids: [1],
                    bin_size: true,
                    default_is_company: true,
                    current_company_id: 1,
                },
                count_limit: 10001,
                domain: [],
            },
        };
        // 获取联系人
        const response = await callKw(payload);
        setContacts(response.result.records);
        setLoading(false);
    }

    const operateBar = {
        view: true,
        placeholder: "搜索系统",
        searchKey: "name",
    };

    if (loading) return <div>loading...</div>;

    return (
        <div>
            <div>联系人页面</div>
            <TextKanbanView
                initDataList={contacts}
                onClick={(data) => null}
                operateBar={operateBar}
                title={"display_name"}
                canDelete={true}
            />
        </div>
    );
}

export default Contacts;
