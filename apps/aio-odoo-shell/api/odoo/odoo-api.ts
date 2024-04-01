import { ImageParams } from "../../types/odoo/odoo-common";

export async function getImage(img_params: ImageParams)
{
    try{
        const params = new URLSearchParams({
            model: img_params.model,
            id: img_params.id.toString(),
            field: img_params.field
        }).toString();
        const response = await fetch(`/odoo/web/image?${params}`, {
            method: "GET",
            headers: {
                "Accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
            },
        });
        return await response.blob();
    }catch (e) {
        console.error(e);
        return false;
    }

}
