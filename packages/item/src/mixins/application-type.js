import constants from "../config/constants";

const TYPE = constants.APPLICATION_TYPE;

const applicationTypeHandler = {
    data() {
        return {
            notificationData: {}
        }
    },
    methods: {
        getApplicationTypeIcon(applicationId) {
            switch (applicationId) {
                case TYPE.OLD_NAV:
                    return "Nav";
                case TYPE.OEM:
                    return "<i class='fa-regular fa-cog fa-xl'></i>";
                case TYPE.FITS_ON:
                    return "<i class='fa-regular fa-check-square fa-xl'></i>";
                case TYPE.SUPPLIER_ITEM_NO:
                    return "<i class='fa-regular fa-shopping-cart fa-xl'></i>";
                case TYPE.RE_MANUFACTURED:
                    return "REM";
                case TYPE.IDENTICAL:
                    return "IDE";
                case TYPE.CUSTOMER_GROUP:
                    return "<i class='fa-regular fa-user fa-xl'></i>";
                default:
                    return "";
            }
        }
    }
}

export default applicationTypeHandler
