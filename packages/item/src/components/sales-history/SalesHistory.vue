<template>
    <div class="generic-popup history-popup" :class="isActive ? 'active-popup' : ''">
        <div class="popup-area" @click="(e) => stopPropagation(e)">
            <div class="headered-box">
                <div class="box-head d-flex justify-content-between align-items-center">
                    <h3 class="m-0">'sales.Sales price history'</h3>
                    <i class="fa-solid fa-xmark close-btn" @click="$emit('updatePopUp')"></i>
                </div>
                <div class="box-body">
                    <div class="item-view">
                        <div class="item-details" v-if="!errorMessage">
                            <div class="one-info">
                                <div class="info-title">
                                    <p>Type</p>
                                </div>
                                <div class="info-title">
                                    <p>Unit</p>
                                </div>
                                <div class="info-title">
                                    <p>Min qty</p>
                                </div>
                                <div class="info-title">
                                    <p>Price</p>
                                </div>
                                <div class="info-title">
                                    <p>Start date</p>
                                </div>
                                <div class="info-title">
                                    <p>End date</p>
                                </div>
                                <div class="info-title">
                                    <p>Created at</p>
                                </div>
                                <div class="info-title">
                                    <p>Created by</p>
                                </div>
                                <div class="info-title">
                                    <p>Updated at</p>
                                </div>
                                <div class="info-title">
                                    <p>Updated by</p>
                                </div>
                            </div>
                            <div class="one-info" v-for="sales in salesData" :key="sales.id">
                                <div class="info-value">
                                    <p>{{ sales.salesTypeLabel }}</p>
                                </div>
                                <div class="info-value">
                                    <p>{{ sales.unitLabel }}</p>
                                </div>
                                <div class="info-value">
                                    <p>{{ sales.minimumQuantity }}</p>
                                </div>
                                <div class="info-value">
                                    <p>{{ sales.price }}</p>
                                </div>
                                <div class="info-value">
                                    <p>{{ sales.startDate }}</p>
                                </div>
                                <div class="info-value">
                                    <p>{{ sales.endDate ? sales.endDate : "-" }}</p>
                                </div>
                                <div class="info-value">
                                    <p>{{ sales.createdAt }}</p>
                                </div>
                                <div class="info-value">
                                    <p>{{ sales.createdBy.name }}</p>
                                </div>
                                <div class="info-value">
                                    <p>{{ sales.updatedAt ? sales.updatedAt : "-" }}</p>
                                </div>
                                <div class="info-value">
                                    <p>
                                        {{ sales.updatedBy && sales.updatedBy.name ? sales.updatedBy.name : "-" }}</p>
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
</template>

<script src="./sales-history.js"></script>

<style scoped src="./sales-history.css"></style>
