import personService from "../services/person-preference";
import constants from "../config/constants";

const personPreference = {
    data() {
        return {
            foldedComponents: []
        }
    },
    methods: {
        getPersonPreferences() {
            personService.get().then((response) => {
                const foldedComponents = response.data["person-preferences"];
                this.foldedComponents = foldedComponents;
                localStorage.setItem("foldedComponents", JSON.stringify(foldedComponents));
            }).catch((error) => {
                console.log(error);
            })
        },

        isFolded(componentName) {
            const foldedComponents = JSON.parse(localStorage.getItem("foldedComponents"));
            if (foldedComponents) {
                return foldedComponents[componentName];
            } else return false;
        },

        updatePersonPreference(componentName) {
            const payload = {
                personId: constants.userId,
                component: componentName,
                preference: this.isFolded(componentName) ? 0 : 1,
            };
            this.updateFoldedComponents(componentName, payload.preference);
            personService.update(payload).then((response) => {
                const data = response.data;
            }).catch((error) => {
                console.log(error);
            })
        },

        updateFoldedComponents(componentName, preference) {
            // preference 0 => remove from foldedComponents
            // preference 1 => add to foldedComponents
            const foldedComponents = JSON.parse(localStorage.getItem("foldedComponents"));
            foldedComponents[componentName] = preference === 1;
            localStorage.setItem("foldedComponents", JSON.stringify(foldedComponents));
        }
    }
}

export default personPreference
