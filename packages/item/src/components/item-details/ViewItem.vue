<template>
    <div class="item-details-text" v-if="Object.keys(item).length > 0">
        <div class="row">
            <div class="col-lg-6 col-12">
                <div class="one-info">
                    <div class="info-title">
                        <p>{{ $t('item.Template') }}</p>
                    </div>
                    <div class="info-value">
                        <p>{{ item.template.description }}</p>
                    </div>
                </div>
                <div class="one-info">
                    <div class="info-title">
                        <p>{{ $t('item.Brand') }}</p>
                    </div>
                    <div class="info-value">
                        <p>{{ item.brand.brand }}</p>
                    </div>
                </div>
                <div class="one-info">
                    <div class="info-title">
                        <p>{{ $t('item.Category') }}</p>
                    </div>
                    <div class="info-value">
                        <p>
                            {{
                                item.category.description
                                    ? item.category.description
                                    : "-"
                            }}
                        </p>
                    </div>
                </div>
                <div class="one-info">
                    <div class="info-title">
                        <p>{{ $t('item.Classification') }}</p>
                    </div>
                    <div class="info-value">
                        <p>{{ item.classification.value }}</p>
                    </div>
                </div>
                <div class="one-info">
                    <div class="info-title">
                        <p>{{ $t('item.Dimensions') }} (cm)</p>
                    </div>
                    <div class="info-value">
                        <p>
                            {{ item.length }} x {{ item.width }} x
                            {{ item.height }}
                        </p>
                    </div>
                </div>
                <div class="one-info">
                    <div class="info-title">
                        <p>{{ $t('item.Weight') }} (kg)</p>
                    </div>
                    <div class="info-value">
                        <p>{{ item.weight }}</p>
                    </div>
                </div>
                <div class="one-info">
                    <div class="info-title">
                        <p>{{ $t('item.Deposit or core item') }}</p>
                    </div>
                    <div class="info-value">
                        <p>{{ item.depositCoreChargeItem }}</p>
                    </div>
                </div>
                <div class="one-info">
                    <div class="info-title">
                        <p>{{ $t('item.TeccomApi') }}</p>
                    </div>
                    <div class="info-value">
                        <p>{{ $t(`item.${item.enableTeccom}`) }}</p>
                    </div>
                </div>
            </div>

            <div class="col-lg-6 col-12">
                <div class="one-info">
                    <div class="info-title">
                        <p>{{ $t('item.Stock') }}</p>
                    </div>
                    <div class="info-value">
                        <p>
                            {{ item.itemStock ? item.itemStock : "-" }}
                            [{{ $t('item.Free/Total') }}]
                        </p>
                    </div>
                </div>
                <div class="one-info">
                    <div class="info-title">
                        <p>{{ $t('item.Attr./img per') }}</p>
                    </div>
                    <div class="info-value">
                        <p>{{ item.attributesImages }}</p>
                    </div>
                </div>
                <div class="one-info">
                    <div class="info-title">
                        <p>{{ $t('item.Tracebility code') }}</p>
                    </div>
                    <div class="info-value">
                        <p>
                            {{
                                item.tracebilityCode === "Select code"
                                    ? "-"
                                    : item.tracebilityCode
                            }}
                        </p>
                    </div>
                </div>
                <div class="one-info">
                    <div class="info-title">
                        <p>{{ $t('item.Website') }}</p>
                    </div>
                    <div class="info-value">
                        <p>{{ item.websiteStatus }}</p>
                    </div>
                </div>
                <div class="one-info">
                    <div class="info-title">
                        <p>{{ $t('item.Weborder') }}</p>
                    </div>
                    <div class="info-value">
                        <p>{{ $t(`item.${item.weborderStatus}`) }}</p>
                    </div>
                </div>
                <div class="one-info">
                    <div class="info-title">
                        <p>{{ $t('item.Item discount group') }}</p>
                    </div>
                    <div class="info-value">
                        <p>{{ item.discountGroup.description }}</p>
                    </div>
                </div>
                <div class="one-info">
                    <div class="info-title">
                        <p>{{ $t('item.Automatic pricing') }}</p>
                    </div>
                    <div class="info-value">
                        <p>{{ item.automaticSalesPriceUpdate }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ViewItem",
    props: {
        item: Object
    }
}
</script>
