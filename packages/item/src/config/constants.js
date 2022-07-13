const data = {
    HTTP_STATUS: {
        SUCCESS: 200,
        NO_RECORD_FOUND: 204,
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        PAGE_NOT_FOUND: 404,
        SERVER_ERROR: 500
    },
    APPLICATION_TYPE: {
        OLD_NAV: 0,
        OEM: 1,
        FITS_ON: 2,
        SUPPLIER_ITEM_NO: 3,
        RE_MANUFACTURED: 4,
        IDENTICAL: 5,
        CUSTOMER_GROUP: 6,
    },
    ATTRIBUTE_TYPE: {
        SELECT: 0,
        TEXT: 1,
        NUMBER: 2
    }
}

export default data
