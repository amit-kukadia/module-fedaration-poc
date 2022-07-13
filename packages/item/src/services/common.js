import httpClient from '../../../config/httpClient';

export default {
    getCategories() {
        return httpClient.get(`/v1/category`);
    },
    getBrands() {
        return httpClient.get(`/v1/brand`);
    },
    getClassifications() {
        return httpClient.get(`/v1/classification`);
    },
    getCommonItems() {
        return httpClient.get(`/v1/common-item`);
    },
    getDiscountGroup() {
        return httpClient.get(`/v1/item-discount-group`);
    }
}
