import constants from "../../config/constants";
import detailService from "../../services/detail";
import personPreference from "../../mixins/person-preference";
import notificationMessageHandler from "../../../../global/mixins/notification-messages";
import BorderSpinner from "../../../../global/components/BorderSpinner";
import ViewItem from "./ViewItem";
import EditItem from "./EditItem";

export default {
    name: "ItemDetails",
    components: {
        ViewItem,
        EditItem,
        BorderSpinner
    },
    mixins: [personPreference, notificationMessageHandler],
    props: {
        editComponentName: String
    },
    data() {
        return {
            itemId: sessionStorage.getItem("itemId"),
            showMore: false,
            item: {},
            promotedFields: {},
            component: "item-detail",
            errorMessage: "",
            editMode: false,
            saveClicked: false
        };
    },
    mounted() {
        this.createSplide();
        this.getItemDetailData();
    },
    methods: {
        updateSaveClicked(value) {
            this.saveClicked = value;
        },

        activateEditMode(event, editMode) {
            if (event) {
                event.stopPropagation();
            }
            this.editMode = editMode;

            if (editMode) {
                this.emitter.emit("edit-component", "item-detail");
                this.saveClicked = false;
                this.showMore = true;

                return;
            }

            if (this.saveClicked) {
                this.getItemDetailData(); // don't call it for cancel action
            }
            this.emitter.emit("edit-component", "");

        },

        saveChanges(event) {
            event.stopPropagation();
            this.saveClicked = true;
        },

        update() {
            this.showMore = false;
            this.updatePersonPreference(this.component);
        },

        createSplide() {
            const splide = new Splide(".splide", {
                perPage: 4,
                perMove: 1,
                gap: 30,
                pagination: false,
            });
            splide.mount();
        },

        getItemDetailData() {
            this.errorMessage = "Loading";
            detailService
                .get()
                .then((response) => {
                    if (constants.HTTP_STATUS.NO_RECORD_FOUND === response.status) {
                        let notification = this.getSuccessMessageData(response.status);
                        this.errorMessage = notification.message;

                        return;
                    }
                    const itemDetail = response.data["item-detail"];
                    this.item = itemDetail.item;
                    this.promotedFields = itemDetail.promotedFields;
                    this.errorMessage = "";
                })
                .catch((error) => {
                    this.errorMessage = this.getErrorMessage(error);
                });
        },
    },
};
