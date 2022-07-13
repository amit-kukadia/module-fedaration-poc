import httpClient from "../../../config/httpClient";

const ITEM_ID = sessionStorage.getItem('itemId')
const END_POINT = `/v1/item/${ITEM_ID}/sales-marketing-statistic`;

export default {
    get() {
        return httpClient.get(`${END_POINT}`);
    }
}
