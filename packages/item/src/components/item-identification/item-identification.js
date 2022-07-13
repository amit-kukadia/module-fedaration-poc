import identificationService from "../../services/identification";
import appearanceService from "../../services/appearance";
import constants from "../../config/constants";

export default {
    name: "ItemHeader",
    components: {},
    data() {
        return {
            userId: localStorage.getItem("userId"),
            itemId: sessionStorage.getItem("itemId"),
            totalAppearances: [],
            selectedAppearances: [],
            showOptions: false,
            navisionLink: "",
            item: {},
            isError: true,
        };
    },
    mounted() {
        this.getIdentificationData();
    },
    computed: {
        unselectedAppearances() {
            return this.totalAppearances.filter(
                (item) => !this.selectedAppearances.includes(item)
            );
        },
    },
    methods: {
        getIdentificationData() {
            identificationService
                .get()
                .then((response) => {
                    this.isError = constants.HTTP_STATUS.NO_RECORD_FOUND === response.status;
                    if (this.isError) {
                        this.$emit("updateNotification", response.status, "success");
                        return
                    }
                    const identification = response.data;
                    this.totalAppearances = identification.data.appearanceList;
                    this.selectedAppearances = identification.data.availableAppearanceList;
                    this.navisionLink = identification.links.navision;
                    this.item = identification.data.item;
                })
                .catch((error) => {
                    this.isError = true;
                    this.$emit("updateNotification", error, "error");
                }).finally(() => {
                    this.$emit("updateItemExistence", !this.isError);
            })
        },
        addAppearance() {
            this.showOptions = !this.showOptions;
        },
        changeAppearance(name) {
            const appearanceId = this.getId(name);
            const data = {
                itemId: this.itemId,
                appearanceId: appearanceId,
                userId: this.userId,
            };
            appearanceService
                .add(data)
                .then((response) => {
                    if (response.data && response.data.item) this.getIdentificationData();
                })
                .catch((error) => {
                    this.$emit("updateNotification", error, "error");
                    console.log(error);
                });
        },
        getId(name) {
            if (name === "UP") return 1;
            else if (name === "YP") return 2;
            else return 3;
        },
        updateRoute(name) {
            const prefix = name === "basic" ? "" : `_${name}`;
            const id = this.itemId ? this.itemId.split("_")[0] : "";
            window.location.href = `/item/${id}${prefix}`;
        },
    },
};
