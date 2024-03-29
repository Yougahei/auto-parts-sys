import React from "react";

import ProductComponent from "../../components/product/product-component";
import {cookies} from "next/headers";

function ProductPage() {
    const layout = cookies().get("product-resizable-panels:layout")
    const defaultLayout = layout ? JSON.parse(layout.value) : undefined

    return (
        <div>
            <ProductComponent
                defaultLayout={defaultLayout}
                navCollapsedSize={4}
            />
        </div>
    );
}

export default ProductPage;
