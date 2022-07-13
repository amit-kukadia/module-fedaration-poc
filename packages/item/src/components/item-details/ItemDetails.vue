<template>
    <div class="item-cont" :class="editMode ? 'edit-mode' : ''">
        <div class="accordion-item item-box item-details">
            <h2 id="item-details-header" class="accordion-header">
                <div
                    :class="isFolded(component) ? 'collapsed' : ''"
                    aria-controls="item-details"
                    aria-expanded="true"
                    class="accordion-button d-flex justify-content-between"
                    :data-bs-target="editMode ? '' : '#item-details'"
                    data-bs-toggle="collapse"
                    type="button"
                    @click="editMode ? '' : update()"
                >
                    <span> {{ $t("item.Item details") }}</span>
                    <div class="actions">
                        <div v-if="!editMode">
                            <a
                                class="edit-item"
                                href="#"
                                v-if="!editComponentName || editComponentName === component"
                            >
                                <i
                                    data-bs-toggle="collapse"
                                    data-bs-target
                                    @click="(event) => activateEditMode(event, true)"
                                    class="fa-regular fa-pen-to-square my-1"
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
                            >
                                <i class="fa-regular fa-check"></i>
                                {{ $t("common-data.Save Changes") }}
                            </a>
                        </div>
                        <div class="prom-fields" v-if="!editMode">
                            <span
                                v-for="field in Object.entries(promotedFields)"
                                :key="field"
                                :title="[field[0] === 'itemStock' ? 'Free/Total' : '']"
                                class="one-field"
                            >
                                {{ field[0] }}: {{ field[1] ? field[1] : "-" }}
                            </span>
                        </div>
                        <i class="fa-regular fa-chevron-down item-arrow my-1"></i>
                    </div>
                </div>
            </h2>
            <div
                id="item-details"
                :class="isFolded(component) ? '' : 'show'"
                aria-labelledby="item-details-header"
                class="accordion-collapse collapse"
            >
                <div
                    :class="showMore ? 'full-height' : 'hide-overflow show-less'"
                    class="accordion-body"
                >
                    <div class="item-images" v-show="'Item' === item.attributesImages">
                        <div class="splide">
                            <div class="splide__track">
                                <ul class="splide__list">
                                    <li class="splide__slide">
                                        <img
                                            alt="item image"
                                            class="one-image"
                                            src="/images/item-view/item-image.png"
                                        />
                                    </li>
                                    <li class="splide__slide">
                                        <img
                                            alt="item image"
                                            class="one-image"
                                            src="/images/item-view/item-image.png"
                                        />
                                    </li>
                                    <li class="splide__slide">
                                        <img
                                            alt="item image"
                                            class="one-image"
                                            src="/images/item-view/item-image.png"
                                        />
                                    </li>
                                    <li class="splide__slide">
                                        <img
                                            alt="item image"
                                            class="one-image"
                                            src="/images/item-view/item-image.png"
                                        />
                                    </li>
                                    <li class="splide__slide">
                                        <img
                                            alt="item image"
                                            class="one-image"
                                            src="/images/item-view/item-image.png"
                                        />
                                    </li>
                                    <li class="splide__slide">
                                        <a href="#">
                                            <img
                                                alt="item image"
                                                class="one-image"
                                                src="/images/item-view/item-image-edit.png"
                                            />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div v-if="!errorMessage">
                        <EditItem
                            v-if="editMode"
                            :saveClicked="saveClicked"
                            :itemData="item"
                            @activate-edit-mode="activateEditMode"
                            @update-save-clicked="updateSaveClicked"
                        />
                        <ViewItem v-else :item="item"/>
                    </div>
                </div>
                <div v-if="errorMessage">
                    <BorderSpinner :errorMessage="errorMessage" :class="showMore ? 'item-text-height' : ''"/>
                </div>
                <div
                    class="toggle-expand text-center"
                    @click="showMore = !showMore"
                    v-if="!errorMessage && !editMode"
                >
                    <p class="more-text">
                        <span v-if="showMore">
                            {{ $t("common-data.Show less fields") }}
                            <i class="fa-regular fa-chevron-up mx-2"></i>
                        </span>
                        <span v-else>
                            {{ $t("common-data.Show more fields") }}
                            <i class="fa-regular fa-chevron-down mx-2"></i>
                        </span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script src="./item-details.js"></script>

<style src="./item-details.css"></style>
