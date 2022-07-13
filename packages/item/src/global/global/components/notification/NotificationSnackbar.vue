<template>
    <div
        class="action-notification"
        :class="
      'error' === notificationData.type
        ? 'failed-notification'
        : 'success-notification'
    "
    >
        <p>{{ notificationData.message }}</p>
    </div>
</template>

<script src="./notification-snackbar.js"></script>

<style scoped src="./notification-snackbar.css"></style>
