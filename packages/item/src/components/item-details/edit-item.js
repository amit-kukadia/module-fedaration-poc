import AsteriskMark from "../../../../global/components/AsteriskMark";
import common from "../../services/common";
import detail from "../../services/detail";
import axios from "axios";
import notificationMessageHandler from "../../../../global/mixins/notification-messages";
import inputValidations from "../../../../global/mixins/input-validations";
import BorderSpinner from "../../../../global/components/BorderSpinner";
import select2InputFocus from "../../mixins/select2-input-focus";

export default {
    name: "EditItem",
    props: {
        itemData: Object,
        saveClicked: Boolean
    },
    mixins: [notificationMessageHandler, inputValidations, select2InputFocus],
    components: {
        AsteriskMark,
        BorderSpinner
    },
    data() {
        return {
            itemId: sessionStorage.getItem("itemId") || "",
            brands: [],
            categories: [],
            commonData: [],
            classifications: [],
            discountGroup: [],
            formData: {
                userId: localStorage.getItem("userId")
            },
            errorMessage: "",
            fieldError: this.$t("errors.Please enter valid data")
        }
    },
    mounted() {
        this.getAllData();
        this.setData();
    },
    watch: {
        saveClicked(newVal) {
            if (newVal) {
                this.submit();
            }
        }
    },
    methods: {
        getAllData() {
            this.errorMessage = "Loading";
            axios.all([common.getBrands(), common.getCategories(), common.getClassifications(), common.getCommonItems(), common.getDiscountGroup()])
                .then(axios.spread((response1, response2, response3, response4, response5) => {
                    this.brands = response1.data["brand-list"];
                    this.categories = response2.data["category-list"];
                    this.classifications = response3.data["classification-list"];
                    this.modifyCommonData(response4.data["common-list"]);
                    this.discountGroup = response5.data["item-discount-group-list"];
                    this.errorMessage = "";
                }))
                .catch((error) => {
                    this.errorMessage = this.getErrorMessage(error);
                })
        },

        modifyCommonData(data) {
            // convert all common data in id, text object format required for Select2
            Object.entries(data).map((items) => {
                this.commonData[items[0]] = [];
                Object.entries(items[1]).map((item) => {
                    if ("enableTeccomApi" === items[0] || "webOrderStatuses" === items[0]) {
                        this.commonData[items[0]].push({id: item[0], text: this.getTranslation(item[1])});
                    } else {
                        this.commonData[items[0]].push({id: item[0], text: item[1]})
                    }
                })
            })
        },

        getTranslation(val) {
            return this.$t(`item.${val}`);
        },

        setData() {
            this.formData.length = this.itemData.length;
            this.formData.width = this.itemData.width;
            this.formData.height = this.itemData.height;
            this.formData.weight = this.itemData.weight;
            this.formData.brandId = this.itemData.brand && this.itemData.brand.id ? `${this.itemData.brand.id}` : "";
            this.formData.categoryId = this.itemData.category && this.itemData.category.id ? `${this.itemData.category.id}` : "";
            this.formData.classificationId = this.itemData.classification && this.itemData.classification.id ? `${this.itemData.classification.id}` : "";
            this.formData.depositCoreChargeItem = this.itemData.depositCoreChargeItem;
            this.formData.enableTeccom = `${this.itemData.enableTeccomId}`;
            this.formData.attributesImages = `${this.itemData.attributesImagesId}`;
            this.formData.tracebilityCode = `${this.itemData.tracebilityCodeId}`;
            this.formData.websiteStatus = `${this.itemData.websiteStatusId}`;
            this.formData.weborderStatus = `${this.itemData.weborderStatusId}`;
            this.formData.discountGroupId = this.itemData.discountGroup ? `${this.itemData.discountGroup.id}` : "";
        },

        updateAutomaticPricing(event) {
            const value = event.currentTarget.checked;
            this.formData.automaticSalesPriceUpdate = value ? 1 : 0;
        },

        submit() {
            this.validate();
            if (this.valid) {
                this.errorMessage = "Loading";
                detail.update(this.formData).then((response) => {
                    this.errorMessage = "";
                    this.$emit("activateEditMode", '', false);
                    if (this.formData.categoryId != this.itemData.category.id) {
                        this.emitter.emit("reload-attribute", this.formData.categoryId);
                    }
                }).catch((error) => {
                    this.errorMessage = this.getErrorMessage(error);
                })
            } else {
                // disable save clicked
                if (this.saveClicked) {
                    this.$emit("updateSaveClicked", false);
                }
            }
        },

        validate() {
            if (this.formData.length && this.formData.width && this.formData.height && this.formData.brandId && this.formData.categoryId && this.formData.classificationId && this.formData.attributesImages) {
                if (!this.formData.weight || this.formData.weight < 0) {
                    this.formData.weight = 0;
                }
                this.valid = true;

                if (!this.saveClicked) {
                    this.$emit("updateSaveClicked", true);
                }

                return;
            }
            this.valid = false;
        }
    }
}
