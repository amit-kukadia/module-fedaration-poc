<template>
    <div class="edit-mode">
        <div v-if="errorMessage">
            <BorderSpinner :errorMessage="errorMessage" :style="{'min-height': `${((attributesData.list.length + 1) * 45)}px`}"/>
        </div>
        <div v-else class="item-attr-text">
            <div class="row" v-if="!isLoading">
                <div
                    class="col-12 mt-1"
                    v-for="(data, index) in attributesData.list"
                    :key="data.attribute.id"
                >
                    <div class="one-info">
                        <div class="info-title">
                            <p>{{ data.attribute.text }}</p>
                        </div>
                        <div class="info-value row gx-0" :key="attributeInfoKey">
                            <div class="col-11 attributes-padding">
                                <div v-if="type.SELECT === data.attribute.type">
                                    <Select2
                                        v-model="data.attributeValue.id"
                                        :options="data.attribute.attributeValues"
                                        :placeholder="$t(`common-data.Select`)"
                                        @select="selectedItems($event, data)"
                                        @click="setInputFocus"
                                    />
                                </div>
                                <div v-else>
                                    <input
                                        :type="type.TEXT === data.attribute.type ? 'text' : 'number'"
                                        class="full-input"
                                        v-model="data.attributeValue.text"
                                        @keydown="(event) => type.TEXT === data.attribute.type ? '' : numericCheck(event)"
                                    />
                                </div>
                            </div>
                            <div class="col-1 attributes-padding">
                                <i class="fa-regular fa-xmark remove-btn" @click="deleteAttribute(index, data)"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-12 mb-2 mt-1">
                    <div class="one-info">
                        <div class="info-title">
                            <p></p>
                        </div>
                        <div class="info-value">
                            <Select2
                                :options="attributesData.addMoreAttributeList"
                                :placeholder="$t('attributes.Add attribute')"
                                @select="selectedAttributes($event)"
                                @click="setInputFocus"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script src="./edit-item-attributes.js"></script>
