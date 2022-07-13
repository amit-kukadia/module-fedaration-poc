<template>
    <div id="react"></div>
</template>
<script setup>
import addReact from 'reactApp/addReact'
import { onMounted } from 'vue';
onMounted(()=>{
    addReact(document.getElementById('react'))
})
</script>