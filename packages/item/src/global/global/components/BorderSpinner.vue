<template>
    <div class="d-flex justify-content-center align-items-center info-title py-3 px-1">
        <div v-if="'Loading' === errorMessage">
            <div class="spinner-border" role="status"></div>
        </div>
        <div v-else class="font-14">
            {{ errorMessage }}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        errorMessage: String
    }
}
</script>
