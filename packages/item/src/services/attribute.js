import httpClient from "../../../config/httpClient";

const ITEM_ID = sessionStorage.getItem("itemId");
const END_POINT = `/v1/item/${ITEM_ID}/attribute`;

export default {
    get(params = "") {
        return httpClient.get(`${END_POINT}${params}`);
    },
    update(payload) {
        return httpClient.put(`${END_POINT}`, payload);
    }
}
