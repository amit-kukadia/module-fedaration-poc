import statistics from "../../services/statistics";
import personPreference from "../../mixins/person-preference";
import notificationMessageHandler from "../../../../global/mixins/notification-messages";
import BorderSpinner from "../../../../global/components/BorderSpinner";

export default {
    name: "SalesMarketing",
    components: {
        BorderSpinner
    },
    mixins: [personPreference, notificationMessageHandler],
    data() {
        return {
            sales: {},
            marketing: {},
            component: "sales-marketing",
            errorMessage: "Loading"
        };
    },
    mounted() {
        this.getStatistics();
    },
    methods: {
        getStatistics() {
            statistics
                .get()
                .then((response) => {
                    this.marketing = response.data.marketing;
                    this.sales = response.data.sales;
                    this.errorMessage = "";
                })
                .catch((error) => {
                    this.errorMessage = this.getErrorMessage(error);
                });
        }
    },
};
