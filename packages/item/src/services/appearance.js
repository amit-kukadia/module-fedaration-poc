import httpClient from '../../../config/httpClient';

const ITEM_ID = sessionStorage.getItem("itemId")
const END_POINT = `/v1/item/${ITEM_ID}/appearance`;

export default {
  add(params) {
    return httpClient.post(`${END_POINT}`, params);
  },
}
