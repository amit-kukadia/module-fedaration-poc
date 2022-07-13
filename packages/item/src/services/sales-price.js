import httpClient from "../global/config/httpClient";

const ITEM_ID = "BP0000001"
// const ITEM_ID = sessionStorage.getItem('itemId')
const END_POINT = `/v1/item/${ITEM_ID}/sales-price`;

export default {
    get() {
        return httpClient.get(`${END_POINT}`);
    }
}
