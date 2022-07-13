<template>
    <div class="item-details-text">
        <div class="row">
            <div class="col-12" v-for="(item, index) in attributes" :key="item.id">
                <div class="one-info"
                     :class="`${index%2 == 0 ? '' : 'highlightRow'}`">
                    <div class="info-title">
                        <p>{{ item.attribute.text }}</p>
                    </div>
                    <div class="info-value">
                        <p>{{ item.attributeValue.text ? item.attributeValue.text : "-" }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ViewItemAttributes",
    props: {
        attributes: Object
    }
}
</script>
