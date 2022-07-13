<template>
    <div
        class="item-cont"
    >
        <div class="accordion-item item-box item-details">
            <h2 id="sales-price-header" class="accordion-header">
                <button
                    aria-controls="sales-price"
                    aria-expanded="true"
                    class="accordion-button d-flex justify-content-between"
                    :class="isFolded(component) ? 'collapsed' : ''"
                    data-bs-target="#sales-price"
                    data-bs-toggle="collapse"
                    type="button"
                    @click="updatePersonPreference(component)"
                >
                    <span>{{ $t("message.hello") }}</span>
                    <div class="actions">
                        <a class="edit-item" href="#" v-if="!editComponentName || (editComponentName === component)">
                            <i class="fa-regular fa-pen-to-square my-1" @click="activateEditMode"></i>
                        </a>
                        <div class="prom-fields">
              <span
                  v-for="field in Object.entries(promotedFields)"
                  :key="field"
                  class="one-field"
              >
                {{ field[0] }}: {{ field[1] ? field[1] : "-" }}
              </span>
                        </div>
                        <i class="fa-regular fa-chevron-down item-arrow my-1"></i>
                    </div>
                </button>
            </h2>
            <div
                id="sales-price"
                aria-labelledby="sales-price-header"
                class="accordion-collapse collapse"
                :class="isFolded(component) ? '' : 'show'"
            >
                <div class="accordion-body">
                    <div class="sales-price-text">
                        <div class="row" v-if="!errorMessage">
                            <div class="col-12">
                                <div class="one-info info-titles">
                                    <div class="info-values">
                                        <div class="one-value">
                                            <p class="fw-bold">Type</p>
                                        </div>
                                        <div class="one-value">
                                            <p class="fw-bold">Unit</p>
                                        </div>
                                        <div class="one-value">
                                            <p class="fw-bold">Min qty</p>
                                        </div>
                                        <div class="one-value">
                                            <p class="fw-bold">Price</p>
                                        </div>
                                        <div class="one-value">
                                            <p class="fw-bold">IC-price</p>
                                        </div>
                                        <div class="one-value">
                                            <p class="fw-bold">Start date</p>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    v-for="sales in salesPrice"
                                    :key="sales.id"
                                    class="one-info"
                                >
                                    <div class="info-values">
                                        <div class="one-value">
                                            <p>{{ sales.salesTypeLabel }}</p>
                                        </div>
                                        <div class="one-value">
                                            <p>{{ sales.unitLabel }}</p>
                                        </div>
                                        <div class="one-value">
                                            <p>{{ sales.minimumQuantity }}</p>
                                        </div>
                                        <div class="one-value">
                                            <p>{{ sales.price }}</p>
                                        </div>
                                        <div class="one-value">
                                            <p>{{ sales.icPrice }}</p>
                                        </div>
                                        <div class="one-value">
                                            <p>
                                                {{ sales.startDate }}
                                                <i class="fa-regular fa-clock-rotate-left ms-1 show-history"
                                                   @click="(e) => updatePopUp(e, sales)"
                                                ></i>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-else>
                            <BorderSpinner :errorMessage="errorMessage"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <SalesHistory
        v-if="salesData.id"
        @update-pop-up="updatePopUp"
        :sales="salesData"
        :key="popUpKey"
    ></SalesHistory>
</template>

<script src="./sales-price.js"></script>

<style scoped src="./sales-price.css"></style>
