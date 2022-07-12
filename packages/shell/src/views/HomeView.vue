<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome"/>
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue';
// eslint-disable-next-line
import HelloWorld from 'item/HelloWorld'; // @ is an alias to /src
export default defineComponent({
  name: 'HomeView',
  components: {
    // HelloWorld: () =>defineAsyncComponent(() => import('item/HelloWorld')),
    HelloWorld
    // HelloWorld: () => import('item/HelloWorld'),
    // HelloWorld
  },
});
</script>
