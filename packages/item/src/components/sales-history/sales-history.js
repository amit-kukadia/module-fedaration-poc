import salesHistory from "../../services/sales-price-history";
import BorderSpinner from "../../global/components/BorderSpinner";

export default {
    name: "SalesHistory",
    components: {
        BorderSpinner
    },
    props: {
        sales: Object
    },
    data() {
        return {
            salesData: [],
            errorMessage: "Loading",
            isActive: true
        }
    },
    mounted() {
        this.isActive = true;
        this.$el.addEventListener('click', this.onClick);
        this.getSalesHistory();
    },
    destroyed() {
        this.$el.removeEventListener('click', this.onClick);
    },
    methods: {
        onClick() {
            this.isActive = false;
        },
        getSalesHistory() {
            salesHistory.get({salesType: this.sales.salesType, unit: this.sales.unit}).then((response) => {
                this.salesData = response.data["sales-price-history-collection"];
                if (0 === this.salesData.length) {
                    this.errorMessage = this.$t("errors.No record found");
                    this.errorMessage = "errors.No record found"
                }
                this.errorMessage = "";
            }).catch((error) => {
                this.errorMessage = this.getErrorMessage(error);
            })
        },
        stopPropagation(event) {
            event.stopPropagation();
        }
    }
};
