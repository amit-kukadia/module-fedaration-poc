import attribute from "../../services/attribute";
import inputValidations from "../../../../global/mixins/input-validations";
import constants from "../../config/constants";
import notificationMessageHandler from "../../../../global/mixins/notification-messages";
import select2InputFocus from "../../mixins/select2-input-focus";
import BorderSpinner from "../../../../global/components/BorderSpinner";

export default {
    name: "EditAttribute",
    components: {
        BorderSpinner
    },
    mixins: [inputValidations, notificationMessageHandler, select2InputFocus],
    props: {
        attributesData: Object,
        saveClicked: Boolean
    },
    data() {
        return {
            errorMessage: "",
            typeaheadKey: 0,
            type: constants.ATTRIBUTE_TYPE,
            attributeInfoKey: 0,
            isLoading: true
        };
    },
    watch: {
        saveClicked(value) {
            if (value) {
                this.updateItemAttributes();
            }
        }
    },
    mounted() {
        this.setData();
    },
    methods: {
        setData() {
            //as for select2 v-model value should be string
            this.attributesData.list.map((item) => {
                item.attributeValue.id = `${item.attributeValue.id}`;
            })
            this.isLoading = false;
        },

        deleteAttribute(index, data) {
            this.attributesData.list.splice(index, 1);
            // add this removed data back to addMoreAttributeList as per it's format
            const newData = {
                id: data.attribute.id,
                text: data.attribute.text,
                type: data.attribute.type,
                attributeValues: data.attribute.attributeValues
            }
            this.attributesData.addMoreAttributeList.push(newData);
            this.attributeInfoKey = this.attributeInfoKey + 1;
        },

        selectedItems(item, data) {
            data.attributeValue.id = `${item.id}`;
            data.attributeValue.text = item.text;
        },

        selectedAttributes(item) {
            let data = {};
            data.attributeValue = {id: null, text: ""};
            data.attribute = {
                id: item.id,
                text: item.text,
                type: item.type,
                attributeValues: item.attributeValues
            };
            this.attributesData.list.push(data); //updating atttributes data
            const filteredList = this.attributesData.addMoreAttributeList.filter((attribute) => attribute.id != item.id);
            this.attributesData.addMoreAttributeList = filteredList;
            this.typeaheadKey = this.typeaheadKey + 1;
        },

        updateItemAttributes() {
            this.errorMessage = "Loading";
            let data = [];
            this.attributesData.list.map((item) => {
                data.push({
                    attributeId: `${item.attribute.id}`,
                    attributeValue: `${item.attributeValue.text}`
                })
            })
            attribute.update({data}).then((response) => {
                this.errorMessage = "";
                this.$emit("attributeDataSaved");
            }).catch((error) => {
                this.errorMessage = this.getErrorMessage(error);
            })
        }
    },
};
