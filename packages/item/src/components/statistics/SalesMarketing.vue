<template>
    <div class="item-cont">
        <div class="accordion-item item-box item-details">
            <h2 class="accordion-header" id="sales-stats-header">
                <button
                    class="accordion-button d-flex justify-content-between"
                    :class="isFolded(component) ? 'collapsed' : ''"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#sales-stats"
                    aria-expanded="true"
                    aria-controls="sales-stats"
                    @click="updatePersonPreference(component)"
                >
                    <span>{{ $t("statistic.Sales & Marketing statistics") }}</span>
                    <div class="actions">
                        <i class="fa-regular fa-chevron-down item-arrow"></i>
                    </div>
                </button>
            </h2>
            <div
                id="sales-stats"
                class="accordion-collapse collapse"
                aria-labelledby="sales-stats-header"
                :class="isFolded(component) ? '' : 'show'"
            >
                <div class="accordion-body">
                    <div class="sales-stats-text">
                        <div v-if="!errorMessage" class="row">
                            <div class="col-lg-6 col-12">
                                <div class="one-info info-titles">
                                    <div class="info-title"></div>
                                    <div class="info-values" v-for="(value, name) in sales.years" :key="name">
                                        <p>{{ value }}</p>
                                    </div>
                                </div>
                                <div class="one-info">
                                    <div class="info-title">
                                        <p>{{ $t("statistic.Sold external") }}</p>
                                    </div>
                                    <div class="info-values" v-for="(value, name) in sales.soldExternal" :key="name">
                                        <p>{{ value }}</p>
                                    </div>
                                </div>
                                <div class="one-info">
                                    <div class="info-title">
                                        <p>{{ $t("statistic.Sold internal") }}</p>
                                    </div>
                                    <div class="info-values" v-for="(value, name) in sales.soldInternal" :key="name">
                                        <p>{{ value }}</p>
                                    </div>
                                </div>
                                <div class="one-info">
                                    <div class="info-title">
                                        <p>{{ $t("statistic.Total") }}</p>
                                    </div>
                                    <div class="info-values" v-for="(value, name) in sales.total" :key="name">
                                        <p>{{ value }}</p>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-6 col-12">
                                <div class="one-info info-titles">
                                    <div class="info-title"></div>
                                    <div class="info-values">
                                        {{ $t("statistic.7 days") }}
                                    </div>
                                    <div class="info-values">
                                        {{ $t("statistic.30 days") }}
                                    </div>
                                    <div class="info-values">
                                        {{ $t("statistic.6 months") }}
                                    </div>
                                </div>
                                <div class="one-info">
                                    <div class="info-title">
                                        <p>{{ $t("statistic.Views") }}</p>
                                    </div>
                                    <div class="info-values" v-for="(value, name) in marketing.views" :key="name">
                                        <p>{{ value }}</p>
                                    </div>
                                </div>
                                <div class="one-info">
                                    <div class="info-title">
                                        <p>{{ $t("statistic.Add to cart") }}</p>
                                    </div>
                                    <div class="info-values" v-for="(value, name) in marketing.addToCart" :key="name">
                                        <p>{{ value }}</p>
                                    </div>
                                </div>
                                <div class="one-info">
                                    <div class="info-title">
                                        <p>{{ $t("statistic.Favourites") }}</p>
                                    </div>
                                    <div class="info-values" v-for="(value, name) in marketing.favorites" :key="name">
                                        <p>{{ value }}</p>
                                    </div>
                                </div>
                                <div class="one-info">
                                    <div class="info-title">
                                        <p>{{ $t("statistic.Tickets") }}</p>
                                    </div>
                                    <div class="info-values" v-for="(value, name) in marketing.tickets" :key="name">
                                        <p>{{ value }}</p>
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
</template>

<script src="./sales-marketing.js"></script>

<style src="./sales-marketing.css"></style>
