<script setup>
defineProps({
  showModal: {
    type: Boolean,
    required: true,
    default: false
  },
})

const emit = defineEmits(['close'])
</script>

<template>
  <div class="modal" :class="{ 'modal-open': showModal }">
    <div class="modal-box">
      <form method="dialog">
        <button
            class="btn"
            @click="emit('close')"
        >
          ✕
        </button>
      </form>
      <h3 class="title">
        <slot name="title">#Title</slot>
      </h3>
      <slot name="body">#body</slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .modal {
    overflow-y: hidden;
    pointer-events: none;
    position: fixed;
    inset: 0;
    padding: 0;
    margin: 0;
    display: grid;
    width: 100%;
    height: 100%;
    max-height: none;
    max-width: none;
    align-content: center;
    justify-items: center;
    overscroll-behavior: contain;
    z-index: 999;
    background-color: transparent;
    color: inherit;
    transition-duration: 200ms;
    transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
    transition-property: transform, opacity, visibility;
    opacity: 0;

    // backdrop
    &.modal-open {
      background: rgba(0, 0, 0, 0.4);
    }
  }

  .modal-open {
    pointer-events: auto;
    visibility: visible;
    opacity: 1;

    .modal-box {
      --scale-x: 1;
      --scale-y: 1;
      --translate-y: 0;

      transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
  }

  .modal-box {
    max-height: calc(100vh - 5em);
    grid-column-start: 1;
    grid-row-start: 1;
    width: 90%;
    max-width: 32rem;
    border-radius: 1rem;
    transform: scaleX(var(--scale-x, 0.9)) scaleY(var(--scale-y, 0.9));
    background-color: white;
    padding: 1.5rem;
    transition-property: background-color, opacity, transform;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 200ms;
    box-shadow: rgba(0, 0, 0, 0.25) 0 25px 50px -12px;
    overflow-y: auto;
    overscroll-behavior: contain;
  }
</style>
