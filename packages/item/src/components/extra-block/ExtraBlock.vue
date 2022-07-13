<template>
  <div class="item-cont">
    <div class="accordion-item item-box item-details">
      <h2 class="accordion-header" id="extra-block-header">
        <button
          class="accordion-button d-flex justify-content-between"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#extra-block"
          aria-expanded="true"
          aria-controls="extra-block"
        >
          <span>Extra Block</span>
          <div class="actions">
            <a href="#" class="edit-item" v-if="!editComponentName || (editComponentName === component)">
              <i class="fa-regular fa-pen-to-square my-1"></i>
            </a>
            <div class="prom-fields">
              <span class="one-field">Elevated item: Textfield </span>
            </div>
            <i class="fa-regular fa-chevron-down item-arrow my-1"></i>
          </div>
        </button>
      </h2>
      <div
        id="extra-block"
        class="accordion-collapse collapse show"
        aria-labelledby="extra-block-header"
      >
        <div class="accordion-body">
          <div class="item-details-text">
            <div class="row">
              <div class="col-12">
                <div class="one-info">
                  <div class="info-title">
                    <p>Height (cm)</p>
                  </div>
                  <div class="info-value">
                    <p>22</p>
                  </div>
                </div>
                <div class="one-info">
                  <div class="info-title">
                    <p>Reference no.</p>
                  </div>
                  <div class="info-value">
                    <p>BP0753921</p>
                  </div>
                </div>
                <div class="one-info">
                  <div class="info-title">
                    <p>Automatic (all customer) pricing</p>
                  </div>
                  <div class="info-value">
                    <p>Yes</p>
                  </div>
                </div>
                <div class="one-info">
                  <div class="info-title">
                    <p>Attr./img per</p>
                  </div>
                  <div class="info-value">
                    <p>Item</p>
                  </div>
                </div>
                <div class="one-info">
                  <div class="info-title">
                    <p>Deposit</p>
                  </div>
                  <div class="info-value">
                    <p>No</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./extra-block.js"></script>

