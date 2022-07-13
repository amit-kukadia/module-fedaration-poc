<template>
    <div>item page</div>
    <Item msg="Welcome"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Item from 'item/Item'; 
export default defineComponent({
  name: 'ItemView',
  components: {
    Item
  },
});
</script>