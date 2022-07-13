<template>
    <div v-if="errorMessage">
        <BorderSpinner :errorMessage="errorMessage" class="item-text-height"/>
    </div>
    <div class="item-details-text mb-3" v-else>
        <div class="row form-data" v-if="Object.keys(itemData).length > 0">
            <div class="col-lg-6 col-12">
                <div class="one-info">
                    <label class="info-title">
                        <p>{{ $t("item.Template") }}</p>
                    </label>
                    <div class="info-value no-cursor" disabled>
                        <p>
                            {{
                                itemData.template && itemData.template.description
                                    ? itemData.template.description
                                    : ""
                            }}
                        </p>
                    </div>
                </div>
                <div class="one-info" :class="{ 'error-block': !formData['brandId'] }">
                    <div class="info-title">
                        <p>
                            {{ $t("item.Brand") }}
                            <AsteriskMark/>
                        </p>
                    </div>
                    <div class="info-value">
                        <Select2
                            v-model="formData.brandId"
                            :options="brands"
                            :placeholder="$t(`common-data.Select`)"
                            @click="setInputFocus"
                        />
                        <div class="error-message" v-if="!formData.brandId">
                            {{ fieldError }}
                        </div>
                    </div>
                </div>
                <div
                    class="one-info"
                    :class="{ 'error-block': !formData['categoryId'] }"
                >
                    <div class="info-title">
                        <p>
                            {{ $t("item.Category") }}
                            <AsteriskMark/>
                        </p>
                    </div>
                    <div class="info-value">
                        <Select2
                            v-model="formData.categoryId"
                            :options="categories"
                            :placeholder="$t(`common-data.Select`)"
                            @click="setInputFocus"
                        />
                        <div class="error-message" v-if="!formData.categoryId">
                            {{ fieldError }}
                        </div>
                    </div>
                </div>
                <div
                    class="one-info"
                    :class="{ 'error-block': !formData['classificationId'] }"
                >
                    <div class="info-title">
                        <p>
                            {{ $t("item.Classification") }}
                            <AsteriskMark/>
                        </p>
                    </div>
                    <div class="info-value">
                        <Select2
                            v-model="formData.classificationId"
                            :options="classifications"
                            :placeholder="$t(`common-data.Select`)"
                            @click="setInputFocus"
                        />
                        <div class="error-message" v-if="!formData.classificationId">
                            {{ fieldError }}
                        </div>
                    </div>
                </div>
                <div
                    class="one-info"
                    :class="{ 'error-block': (!formData.length || !formData.width || !formData.height) }"
                >
                    <div class="info-title">
                        <p>
                            {{ $t("item.Dimensions") }} (cm)
                            <AsteriskMark/>
                        </p>
                    </div>
                    <div class="info-value">
                        <div class="input-group">
                            <input
                                v-model="formData.length"
                                placeholder="L"
                                type="number"
                                @keydown="numericCheck"
                                class="form-control custom-form-group"
                            >
                            <input
                                v-model="formData.width"
                                placeholder="W"
                                type="number"
                                @keydown="numericCheck"
                                class="form-control custom-form-group"
                            >
                            <input
                                v-model="formData.height"
                                placeholder="H"
                                type="number"
                                @keydown="numericCheck"
                                class="form-control custom-form-group"
                            >
                        </div>
                        <div class="error-message" v-if="!formData.length || !formData.width || !formData.height">
                            {{ fieldError }}
                        </div>
                    </div>
                </div>
                <div class="one-info">
                    <div class="info-title">
                        <p>{{ $t("item.Weight") }} (kg)</p>
                    </div>
                    <div class="info-value">
                        <input
                            type="number"
                            min="0"
                            class="borderless-input"
                            v-model="formData.weight"
                            @keydown="numericCheck"
                        />
                    </div>
                </div>
                <div class="one-info">
                    <div class="info-title">
                        <p>{{ $t("item.Deposit or core item") }}</p>
                    </div>
                    <div
                        class="info-value no-cursor"
                        v-if="itemId.toLowerCase().includes('bt')"
                        disabled
                    >
                        <p>
                            {{
                                itemData.depositCoreChargeItem
                                    ? commonData.depositCoreChargeItem[
                                        itemData.depositCoreChargeItem
                                        ]
                                    : "-"
                            }}
                        </p>
                    </div>
                    <div class="info-value" v-else>
                        <Select2
                            v-model="formData.depositCoreChargeItem"
                            :options="commonData.depositCoreChargeItem"
                            :placeholder="$t(`common-data.Select`)"
                            @click="setInputFocus"
                        />
                    </div>
                </div>
                <div class="one-info">
                    <div class="info-title">
                        <p>{{ $t("item.TeccomApi") }}</p>
                    </div>
                    <div
                        class="info-value no-cursor"
                        v-if="itemId.toLowerCase().includes('bt')"
                    >
                        <p>
                            {{
                                itemData.enableTeccom
                                    ? getTranslation(itemData.enableTeccom)
                                    : "-"
                            }}
                        </p>
                    </div>
                    <div class="info-value" v-else>
                        <Select2
                            v-model="formData.enableTeccom"
                            :options="commonData.enableTeccomApi"
                            :placeholder="$t(`common-data.Select`)"
                            @click="setInputFocus"
                        />
                    </div>
                </div>
            </div>
            <div class="col-lg-6 col-12">
                <div class="one-info">
                    <div class="info-title">
                        <p>{{ $t("item.Stock") }}</p>
                    </div>
                    <div class="info-value no-cursor" disabled>
                        <p>
                            {{ itemData.itemStock ? itemData.itemStock : "-" }} [{{
                                $t("item.Free/Total")
                            }}]
                        </p>
                    </div>
                </div>
                <div
                    class="one-info"
                    :class="{ 'error-block': !formData['attributesImages'] }"
                >
                    <div class="info-title">
                        <p>
                            {{ $t("item.Attr./img per") }}
                            <AsteriskMark/>
                        </p>
                    </div>
                    <div class="info-value">
                        <Select2
                            v-model="formData.attributesImages"
                            :options="commonData.attributesPerImages"
                            :placeholder="$t(`common-data.Select`)"
                            @click="setInputFocus"
                        />
                        <div class="error-message" v-if="!formData.attributesImages">
                            {{ fieldError }}
                        </div>
                    </div>
                </div>
                <div class="one-info">
                    <div class="info-title">
                        <p>{{ $t("item.Tracebility code") }}</p>
                    </div>
                    <div class="info-value no-cursor" v-if="itemId.includes('_')">
                        {{ itemData.tracebilityCode ? itemData.tracebilityCode : "-" }}
                    </div>
                    <div class="info-value" v-else>
                        <Select2
                            v-model="formData.tracebilityCode"
                            :options="commonData.traceabilityCode"
                            :placeholder="$t(`common-data.Select`)"
                            @click="setInputFocus"
                        />
                    </div>
                </div>
                <div class="one-info">
                    <div class="info-title">
                        <p>{{ $t("item.Website") }}</p>
                    </div>
                    <div class="info-value">
                        <Select2
                            v-model="formData.websiteStatus"
                            :options="commonData.websiteStatuses"
                            :placeholder="$t(`common-data.Select`)"
                            @click="setInputFocus"
                        />
                    </div>
                </div>
                <div class="one-info">
                    <div class="info-title">
                        <p>{{ $t("item.Weborder") }}</p>
                    </div>
                    <div class="info-value">
                        <Select2
                            v-model="formData.weborderStatus"
                            :options="commonData.webOrderStatuses"
                            :placeholder="$t(`common-data.Select`)"
                            @click="setInputFocus"
                        />
                    </div>
                </div>
                <div class="one-info">
                    <div class="info-title">
                        <p>{{ $t("item.Item discount group") }}</p>
                    </div>
                    <div class="info-value">
                        <Select2
                            v-model="formData.discountGroupId"
                            :options="discountGroup"
                            :placeholder="$t(`common-data.Select`)"
                            @click="setInputFocus"
                        />
                    </div>
                </div>
                <div class="one-info">
                    <div class="info-title">
                        <p>{{ $t("item.Automatic pricing") }}</p>
                    </div>
                    <div
                        class="info-value"
                        :class="itemId.toLowerCase().includes('bt') ? 'no-cursor' : ''"
                    >
                        <input
                            :class="itemId.toLowerCase().includes('bt') ? 'disable-typeahead' : ''"
                            class="form-check-input"
                            type="checkbox"
                            id="flexCheckDefault"
                            :checked="itemData.automaticSalesPriceUpdate === 'Yes'"
                            @click="(event) => updateAutomaticPricing(event)"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script src="./edit-item.js"></script>

<style src="./item-details.css"></style>
