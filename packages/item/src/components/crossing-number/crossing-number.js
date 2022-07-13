import crossingService from "../../services/crossing-number";
import applicationTypeHandler from "../../mixins/application-type";
import personPreference from "../../mixins/person-preference";
import notificationMessageHandler from "../../../../global/mixins/notification-messages";
import constants from "../../config/constants";
import BorderSpinner from "../../../../global/components/BorderSpinner";

const TYPE = constants.APPLICATION_TYPE;

export default {
    name: "CrossingNumber",
    components: {
        BorderSpinner
    },
    mixins: [applicationTypeHandler, personPreference, notificationMessageHandler],
    data() {
        return {
            showMore: false,
            list: [],
            standard: [],
            component: "crossing-number",
            errorMessage: "Loading"
        };
    },
    mounted() {
        this.getCrossingNumberData();
    },
    methods: {
        getTranslations(applicationId) {
            switch (applicationId) {
                case TYPE.OEM:
                    return this.$t('crossing-numbers.OEM');
                case TYPE.FITS_ON:
                    return this.$t('crossing-numbers.Fits on');
                case TYPE.SUPPLIER_ITEM_NO:
                    return this.$t('crossing-numbers.Supplier number');
                case TYPE.CUSTOMER_GROUP:
                    return this.$t('crossing-numbers.Customer group');
            }
        },

        captureFoldEvent() {
            this.showMore = false;
            this.updatePersonPreference(this.component);
        },

        getCrossingNumberData() {
            crossingService
                .get()
                .then((response) => {
                    this.errorMessage = "";
                    const data = response.data["crossing-number-collection"];
                    this.standard = data.standard;
                    this.list = [...data.standard, ...data.normal];
                    if (this.list.length === 0) {
                        this.errorMessage = this.$t("errors.No record found");;
                    }
                })
                .catch((error) => {
                    this.errorMessage = this.getErrorMessage(error);
                });
        }
    },
};
