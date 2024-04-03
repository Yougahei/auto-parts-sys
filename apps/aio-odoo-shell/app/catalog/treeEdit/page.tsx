import React from 'react';
import CatalogListTree from "../../../components/catalog/catalog-list-tree";

function Page({searchParams}: { [key: string]: string | undefined }) {
    return (
       <CatalogListTree searchParams={searchParams}/>
    );
}

export default Page;
