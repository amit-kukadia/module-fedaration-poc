import attribute from "../../services/attribute.js";
import personPreference from "../../mixins/person-preference";
import notificationMessageHandler from "../../../../global/mixins/notification-messages";
import EditItemAttributes from "./EditItemAttributes";
import ViewItemAttributes from "./ViewItemAttributes";
import category from "../../services/category.js";
import BorderSpinner from "../../../../global/components/BorderSpinner";

export default {
    name: "ItemAttributes",
    components: {
        ViewItemAttributes,
        EditItemAttributes,
        BorderSpinner
    },
    mixins: [personPreference, notificationMessageHandler],
    props: {
        editComponentName: String
    },
    data() {
        return {
            promotedFields: {},
            attributes: [],
            component: "item-attributes",
            errorMessage: "",
            editMode: false,
            attributesData: {},
            saveClicked: false
        }
    },
    mounted() {
        this.getAttributes();
    },
    created() {
        this.emitter.on("reload-attribute", (categoryId) => {
            this.getAttributesForCategory(categoryId);
        })
    },
    methods: {
        getAttributesForCategory(id) {
            this.errorMessage = "Loading";
            category.getAttributes(id)
                .then((response) => {
                    const data = response.data;
                    this.setAttributesData(data);
                    this.errorMessage = "";
                    this.editMode = true;
                    this.emitter.emit("edit-component", this.component);
                })
                .catch((error) => {
                    this.errorMessage = this.getErrorMessage(error);
                })
        },

        setAttributesData(data) {
            let finalData = {};
            finalData.addMoreAttributeList = data.addMoreAttributeList;
            finalData.list = data.attributeList;
            this.attributesData = finalData;
        },

        getAttributesForEdit(event, value) {
            if (event) {
                event.stopPropagation();
            }
            this.errorMessage = "Loading";
            this.emitter.emit("edit-component", this.component);
            attribute.get("?action=edit")
                .then((response) => {
                    this.errorMessage = "";
                    this.activateEditMode(event, value);
                    this.attributesData = response.data;
                })
                .catch((error) => {
                    this.errorMessage = this.getErrorMessage(error);
                })
        },

        activateEditMode(event, value) {
            event.stopPropagation();
            this.editMode = value;
            if (!value) {
                this.emitter.emit("edit-component", "");
            }
        },

        saveChanges(event) {
            event.stopPropagation();
            this.saveClicked = true;
        },

        getAttributes() {
            this.errorMessage = "Loading";
            attribute.get()
                .then((response) => {
                    const data = response.data;
                    this.attributes = data.list;
                    this.promotedFields = data.promotedFields;
                    this.errorMessage = "";
                    if (this.attributes.length === 0) {
                        this.errorMessage = this.$t("errors.No record found");
                    }
                    this.editMode = false;
                })
                .catch((error) => {
                    this.errorMessage = this.getErrorMessage(error);
                })
        },

        attributeDataSaved() {
            this.saveClicked = false;
            this.emitter.emit("edit-component", "");
            this.getAttributes();
        },

        getLoaderHeight() {
            // doing +1 for edit mode as we have one block for add attributes also
            return this.editMode ? `${((this.attributesData.list.length + 1) * 45)}px` : `${(this.attributes.length * 40)}px`
        }

    }

};
