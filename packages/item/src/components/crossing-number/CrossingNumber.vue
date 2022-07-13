<template>
    <div
        class="item-cont ml-3"
    >
        <div class="accordion-item item-box item-details">
            <h2 class="accordion-header" id="crossing-numbers-header">
                <button
                    class="accordion-button d-flex justify-content-between"
                    :class="isFolded(component) ? 'collapsed' : ''"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#crossing-numbers"
                    aria-expanded="true"
                    aria-controls="crossing-numbers"
                    @click="captureFoldEvent"
                >
                    <span>{{ $t('crossing-numbers.Crossing numbers') }}</span>
                    <div class="actions">
                        <a href="#" class="edit-item">
                            <i class="fa-solid fa-plus my-1"></i>
                        </a>
                        <div class="prom-fields" v-for="(item) in standard" :key="item.id">
              <span class="one-field"
              ><i class="fa-regular fa-gear"></i> {{ [...item.crossing].pop() }}
              </span>
                        </div>
                        <i class="fa-regular fa-chevron-down item-arrow my-1"></i>
                    </div>
                </button>
            </h2>
            <div
                id="crossing-numbers"
                class="accordion-collapse collapse"
                aria-labelledby="crossing-numbers-header"
                :class="isFolded(component) ? '' : 'show'"
            >
                <div class="accordion-body" :class="showMore ? 'full-height' : ''">
                    <div class="crossing-numbers-text">
                        <div class="row" v-if="list.length > 0 && !errorMessage">
                            <div class="col-12">
                                <div class="one-info info-titles">
                                    <div class="info-values">
                                        <div class="one-value w-20">
                                            <p class="fw-bold">Type</p>
                                        </div>
                                        <div class="one-value w-35">
                                            <p class="fw-bold">Supplier</p>
                                        </div>
                                        <div class="one-value w-35">
                                            <p class="fw-bold">Crossing</p>
                                        </div>
                                        <div class="one-value w-10"></div>
                                    </div>
                                </div>
                                <div class="one-info" v-for="item in list" :key="item.id"
                                     :style="{maxHeight: (item.crossing.length * 50) + 'px'}">
                                    <div class="info-values">
                                        <div class="one-value w-20">
                                            <span v-html="getApplicationTypeIcon(item.applicationType)" :title="getTranslations(item.applicationType)"></span>
                                        </div>
                                        <div class="one-value w-35">
                                            <p>{{ item.supplier }}</p>
                                        </div>
                                        <div class="one-value w-35">
                                            <p v-for="(crossing, index) in item.crossing" :key="crossing">
                                                <i class="fa-solid fa-arrow-turn-down-right" v-if="index > 0"
                                                   :style="{ marginLeft: (index < 10 ? 3*index : 3*10) + 'px' }"></i>
                                                {{ crossing }}
                                            </p>
                                        </div>
                                        <div class="one-value w-10">
                                            <i class="fa-regular fa-pen-to-square" @click="emitter.emit('edit-component', 'crossing-number')"></i>
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
                <div
                    class="toggle-expand text-center"
                    @click="showMore = !showMore"
                    :class="showMore ? 'show-less' : ''"
                    v-if="list.length > 0"
                >
                    <p class="more-text">
                        Show more fields <i class="fa-regular fa-chevron-down"></i>
                    </p>
                    <p class="less-text">
                        Show less fields <i class="fa-regular fa-chevron-up"></i>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped src="./crossing-numbers.css"></style>

<script src="./crossing-number.js"></script>
