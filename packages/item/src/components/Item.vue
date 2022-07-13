<template>

  <div class="page-content item-view">

    <div class="page-grid">
      <div class="left-col">
        <!-- <ItemDetails/> -->
        <SalesPrice />
        <!-- <SalesMarketing/> -->
      </div>
      <div class="mid-col">
        <ExtraBlock />
      </div>
      <div class="right-col">
        <select v-model="$i18n.locale">
          <option v-for="(lang, i) in ['nl', 'en']" :key="`Lang${i}`" :value="lang">{{ lang }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SalesPrice from './sales-price/SalesPrice.vue'
import ExtraBlock from "./extra-block/ExtraBlock.vue";

export default defineComponent({
  name: 'HelloWorld',
  components: {
    SalesPrice,
    ExtraBlock
  },
  props: {
    msg: String,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
