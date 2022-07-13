import constants from "../../modules/item/config/constants";

const HTTP_STATUS = constants.HTTP_STATUS;

const notificationMessageHandler = {
    data() {
        return {
            notificationData: {}
        }
    },
    methods: {
        getMessageAsPerData(data, type, serverMessage = "") {
            this.notificationData = "error" === type ? this.getErrorMessageData(data) : this.getSuccessMessageData(data, serverMessage);
        },

        getErrorMessageData(error) {
            return {message: this.getErrorMessage(error), type: "error"};
        },

        getErrorMessage(error) {
            if (error.response) {
                const response = error.response;
                // added third condition for temporary fix for 500 status code as message was not user-friendly
                if (response.data && response.data.message && HTTP_STATUS.SERVER_ERROR !== response.status) {
                    return response.data.message;
                }
                const status = response.status;
                switch (status) {
                    case HTTP_STATUS.BAD_REQUEST:
                        return "Bad request";
                    case HTTP_STATUS.UNAUTHORIZED:
                        return "Unauthorized request";
                    case HTTP_STATUS.PAGE_NOT_FOUND:
                        return "Page not found";
                    case HTTP_STATUS.SERVER_ERROR:
                        return "Something went wrong";
                    default:
                        return "Something went wrong";
                }
            }
            if (error.request) {
                return "No response";
            }
            return "Something went wrong";
        },

        getSuccessMessageData(status, serverMessage) {
            let type = "success";
            let message = "";

            if (serverMessage) {
                message = serverMessage;
                return {message, type};
            }

            switch (status) {
                case HTTP_STATUS.NO_RECORD_FOUND:
                    message = "No record found";
                    type = "error"; // only in this, as we are showing red popup message for 204 status code
                    break;
                case HTTP_STATUS.SUCCESS:
                    message = "Successfully done";
                    break;
                default:
                    message = "";
            }

            return {message, type};
        }
    }
}

export default notificationMessageHandler
