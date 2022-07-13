import salesPriceService from "../../services/sales-price.js";
import SalesHistory from "../sales-history/SalesHistory.vue";
import personPreference from "../../mixins/person-preference";
import BorderSpinner from "../../global/components/BorderSpinner";

export default {
    name: "SalesPrice",
    components: {
        SalesHistory,
        BorderSpinner
    },
    mixins: [personPreference],
    props: {
      editComponentName: String
    },
    data() {
        return {
            promotedFields: {},
            salesPrice: [],
            component: "sales-price",
            errorMessage: "Loading",
            salesData: {},
            popUpKey: 0,
        }
    },
    mounted() {
        this.getSalesPrice();
    },
    methods: {
        activateEditMode() {
            // will add this when edit mode of sales-price will be there in sprint
            // this.emitter.emit('edit-component', 'sales-price')
        },
        getSalesPrice() {
            salesPriceService.get()
                .then((response) => {
                    this.errorMessage = "";
                    const item = response.data.item;
                    this.promotedFields = item.promotedFields;
                    this.salesPrice = item.salesPrice;
                    if (this.salesPrice.length === 0) {
                        this.errorMessage = "errors.No record found";
                        // this.errorMessage = this.$t("errors.No record found");
                    }
                }).catch((error) => {
                this.errorMessage = this.getErrorMessage(error);
            })
        },
        updatePopUp(e = null, sales = {}) {
            this.popUpKey = this.popUpKey + 1;
            this.salesData = sales;
            if (e) e.stopPropagation();
        }
    }
};
