<template>
  <div class="top-box" v-if="!isError">
      <div class="box-grid d-flex justify-content-between flex-wrap">
          <div class="small-btns">
              <button
                  class="box-button"
                  :class="itemId.includes('_') ? 'white-button' : 'blue-button'"
                  @click="updateRoute('basic')"
              >
                  Basic
              </button>
              <button
          :class="itemId.includes(appearance) ? 'blue-button' : 'white-button'"
          class="box-button"
          v-for="appearance in selectedAppearances"
          :key="appearance"
          @click="updateRoute(appearance)"
        >
          {{ appearance }}
        </button>
        <div
          :class="showOptions ? 'show-options' : ''"
          class="plus"
          v-if="
            totalAppearances.length > selectedAppearances.length &&
            !itemId.includes('_')
          "
        >
          <button
            class="blue-button box-button plus-btn"
            @click="addAppearance"
          >
            <i class="fa-regular fa-plus" />
          </button>
          <div class="plus-options">
            <button
              v-for="appearance in unselectedAppearances"
              :key="appearance"
              @click="changeAppearance(appearance)"
            >
              {{ appearance }}
            </button>
          </div>
        </div>
      </div>

      <div class="box-title">
        <a :href="navisionLink" target="blank" :title="navisionLink"
          ><img
            src="/images/item-view/top-box-icon.png"
            alt="icon"
            class="item-icon"
        /></a>
        {{ item.id }} {{ item.description }}
      </div>

      <div class="actions">
        <input type="text" class="counter" value="1" />
        <button class="blue-button box-button">Missing sales</button>
          <button class="blue-button box-button">De-duplicate</button>
          <button class="blue-button box-button">Copy item</button>
          <button class="blue-button box-button">Remove</button>
      </div>
      </div>
  </div>
</template>

<script src="./item-identification.js"></script>

<style scoped src="./item-identification.css"></style>
