"use client";

import "react-datasheet-grid/dist/style.css";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
    DynamicDataSheetGrid,
    intColumn,
    keyColumn,
    textColumn,
} from "react-datasheet-grid";

import {
    createPimAttribute,
    getPimAttribute,
} from "../../../actions/odoo-action";
import { Attribute } from "../../../types/attribute";
import { BaseInfo } from "../../../types/odooStoreType";
import {Button} from "@ui/components/ui/button";

function ProductTeable() {
    const [data, setData] = useState<Attribute[]>([]);
    const [loading, setLoading] = useState(true);
    const [columns, setColumns] = useState<any[]>([]);
    const [prevData, setPrevData] = useState<Attribute[]>(data);

    const createdRowIds = useMemo(() => new Set(), []);
    const deletedRowIds = useMemo(() => new Set(), []);
    const updatedRowIds = useMemo(() => new Set(), []);

    const cancel = () => {
        setData(prevData);
        createdRowIds.clear();
        deletedRowIds.clear();
        updatedRowIds.clear();
    };

    const commit = async () => {
        /* Perform insert, update, and delete to the database here */

        const newData = data.filter(({ id }) => !deletedRowIds.has(id));
        setData(newData);
        setPrevData(newData);

        console.log("commit", createdRowIds.values());
        const newline = data
            .map(({ id, ...rest }) => {
                if (createdRowIds.has(id)) {
                    console.log("新增", rest);
                    return rest;
                }
                return null;
            })
            .filter((item) => item !== null);

        await createPimAttribute(infoBase.token, newline);

        console.log("newline", newline);
        createdRowIds.clear();
        deletedRowIds.clear();
        updatedRowIds.clear();
    };

    const storedBaseInfo = sessionStorage.getItem("baseInfo");
    const infoBase: BaseInfo = JSON.parse(storedBaseInfo ?? "{}");

    const initData = useCallback(async () => {
        const storedBaseInfo = sessionStorage.getItem("baseInfo");
        const infoBase: BaseInfo = JSON.parse(storedBaseInfo ?? "{}");
        const response = await getPimAttribute(infoBase.token);
        setData(response.result);
        setLoading(false);
        console.log("触发")
    }, []);

    const newColumns = useMemo(() => {
        if (data.length > 0 && data[0]) {
            const keys = Object.keys(data[0]);
            return keys.map((key) => ({
                ...keyColumn(key, key === "id" ? intColumn : textColumn), // Assuming all columns are text columns
                title: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize the key for the title
            }));
        }
        console.log("column")
        return [];
    }, [data]);

    useEffect(() => {
        initData();
    }, []);

    useEffect(() => {
        setColumns(newColumns as any[]);
    }, [newColumns]);


    if (loading) {
        return <div>loading...</div>;
    }
    return (
        <div className="space-y-2 mt-2">
            <div className="space-x-2">
                <Button variant="outline" onClick={commit}>Commit</Button>
                <Button variant="outline" onClick={cancel}>Cancel</Button>
            </div>

            <DynamicDataSheetGrid

                columns={columns}
                value={data}
                createRow={() => ({ id: Math.random(), name: "" }) as Attribute}
                duplicateRow={({ rowData }: { rowData: Attribute }) => ({
                    ...rowData,
                })}
                rowClassName={({ rowData }) => {
                    if (deletedRowIds.has(rowData.id)) {
                        return "row-deleted";
                    }
                    if (createdRowIds.has(rowData.id)) {
                        return "row-created";
                    }
                    if (updatedRowIds.has(rowData.id)) {
                        return "row-updated";
                    }
                }}
                onChange={(newValue: Attribute[], operations) => {
                    for (const operation of operations) {
                        if (operation.type === "CREATE") {
                            console.log("newValue", newValue);
                            newValue
                                .slice(
                                    operation.fromRowIndex,
                                    operation.toRowIndex
                                )
                                .forEach(({ id }) => createdRowIds.add(id));
                        }

                        if (operation.type === "UPDATE") {
                            newValue
                                .slice(
                                    operation.fromRowIndex,
                                    operation.toRowIndex
                                )
                                .forEach(({ id }) => {
                                    if (
                                        !createdRowIds.has(id) &&
                                        !deletedRowIds.has(id)
                                    ) {
                                        updatedRowIds.add(id);
                                    }
                                });
                        }

                        if (operation.type === "DELETE") {
                            let keptRows = 0;

                            data.slice(
                                operation.fromRowIndex,
                                operation.toRowIndex
                            ).forEach(({ id }, i) => {
                                updatedRowIds.delete(id);

                                if (createdRowIds.has(id)) {
                                    createdRowIds.delete(id);
                                } else {
                                    deletedRowIds.add(id);
                                    newValue.splice(
                                        operation.fromRowIndex + keptRows++,
                                        0,
                                        //@ts-ignore
                                        data[operation.fromRowIndex + i]
                                    );
                                }
                            });
                        }
                    }

                    setData(newValue);
                }}
            />
        </div>
    );
}

export default ProductTeable;
