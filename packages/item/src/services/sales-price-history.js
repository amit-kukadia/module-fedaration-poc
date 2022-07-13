import httpClient from "../global/config/httpClient";

// const ITEM_ID = sessionStorage.getItem('itemId')
const ITEM_ID = "BP0000001"
const END_POINT = `/v1/item/${ITEM_ID}/sales-price-history`;

export default {
    get(params) {
        return httpClient.get(`${END_POINT}/sales-type/${params.salesType}/unit/${params.unit}`);
    }
}
