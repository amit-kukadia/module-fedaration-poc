<template>
    <div class="item-cont" :class="editMode ? 'edit-mode' : ''">
        <div class="accordion-item item-box item-details">
            <h2 class="accordion-header" id="item-attributes-header">
                <button
                    class="accordion-button d-flex justify-content-between"
                    :class="isFolded(component) ? 'collapsed' : ''"
                    type="button"
                    :data-bs-target="editMode ? '' : '#item-attributes'"
                    data-bs-toggle="collapse"
                    aria-expanded="true"
                    aria-controls="item-attributes"
                    @click="editMode ? '' : updatePersonPreference(component)"
                >
                    <span>{{ $t("attributes.Item attributes") }}</span>
                    <div class="actions">
                        <div v-if="!editMode">
                            <a
                                href="#"
                                class="edit-item"
                                v-if="!editComponentName || editComponentName === component"
                            >
                                <i
                                    data-bs-toggle="collapse"
                                    data-bs-target
                                    class="fa-regular fa-pen-to-square my-1"
                                    @click="(event) => getAttributesForEdit(event, true)"
                                ></i>
                            </a>
                        </div>
                        <div
                            v-else
                            class="edit-actions align-items-center"
                            data-bs-toggle="collapse"
                            data-bs-target
                        >
                            <a
                                href="#"
                                :class="isFolded(component) ? 'folded-cancel-link' : ''"
                                class="cancel-link"
                                @click="(e) => activateEditMode(e, false)"
                            >
                                {{ $t("common-data.Cancel") }}
                            </a>
                            <a
                                href="#"
                                class="blue-button save-link mt-1 mb-1"
                                @click="(e) => saveChanges(e)"
                            ><i class="fa-regular fa-check"></i>
                                {{ $t("common-data.Save Changes") }}
                            </a>
                        </div>
                        <div class="prom-fields">
                            <span
                                v-for="field in promotedFields"
                                :key="field"
                                class="one-field"
                            >
                                {{ Object.keys(field)[0] }}: {{ Object.values(field)[0] }}
                            </span>
                        </div>
                        <i class="fa-regular fa-chevron-down item-arrow my-1"></i>
                    </div>
                </button>
            </h2>
            <div
                id="item-attributes"
                class="accordion-collapse collapse"
                aria-labelledby="item-attributes-header"
                :class="isFolded(component) ? '' : 'show'"
            >
                <div class="accordion-body full-height">
                    <div v-if="!errorMessage">
                        <EditItemAttributes
                            v-if="editMode"
                            :attributesData="attributesData"
                            :saveClicked="saveClicked"
                            @attribute-data-saved="attributeDataSaved"
                        />
                        <ViewItemAttributes :attributes="attributes" v-else/>
                    </div>
                    <div v-else>
                        <BorderSpinner :errorMessage="errorMessage" :style="{'min-height': getLoaderHeight()}"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script src="./item-attributes.js"></script>

<style src="./item-attributes.css"></style>
