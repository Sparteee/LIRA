<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import IconExit from '@/components/icons/IconExit.vue'
import { usePiece } from '@/composables/usePiece.js'
const { getIndicateursByPiece } = usePiece()
const tab = ref([])
const piece = ref({})

const props = defineProps({
  pieceId: {
    type: Number,
    required: true
  },
  viewModal: {
    type: Boolean,
    required: true,
    default: false
  }
})
const getData = async () => {
  const data = await getIndicateursByPiece(props.pieceId);
  tab.value = data.attributes.indicateurs.data;
  piece.value = data.attributes
}

onMounted(async () => {
  await getData()
})


watch(() => props.pieceId, getData)

const emit = defineEmits(['close'])

</script>

<template>
  <div class="modal" :class="{ 'modal-open': viewModal }">
    <div class="modal-box">
      <form class="form__modal" method="dialog">
        <button class="btn" @click="emit('close')">
          <IconExit />
        </button>
      </form>
      <article>
        <div>
          <img class="modal__img" :src="'/pieces/' + piece.image" alt="piece" width="273" height="273" />
        </div>
        <div class="indicateur__container">
          <div class="indicateur" v-for="  indicateur   in   tab  " :key="indicateur.id">
            <h4 class="indicateur__title">{{ indicateur.attributes.nom }}</h4>
            <p class="indicateur__value">{{ indicateur.attributes.nom === "Temperature" ? indicateur.attributes.seuil +
    '°' : indicateur.attributes.seuil + "%" }}</p>
          </div>
        </div>
      </article>
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
  width: 75%;
  max-width: 32rem;
  border-radius: 1.6rem;
  transform: scaleX(var(--scale-x, 0.9)) scaleY(var(--scale-y, 0.9));
  background-color:
    rgba(255, 255, 255, 0.15);
  padding: 1.5rem;
  transition-property: background-color, opacity, transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
  box-shadow: rgba(0, 0, 0, 0.25) 0 25px 50px -12px;
  overflow-y: auto;
  overscroll-behavior: contain;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.btn {
  background: none;
  border: none;
}

.modal__img {
  border-radius: 24px;
  aspect-ratio: 1;
  object-fit: cover;
}

.form__modal {
  display: flex;
  justify-content: center;
}

.indicateur__container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
}

.indicateur {
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__title {
    font-size: 20px;
    font-family: 'Duborics', sans-serif;
    color: white;
  }

  &__value {
    font-size: 20px;
    font-family: 'Duborics', sans-serif;
    color: white;
    padding: 0.6rem 1rem;
    border: 1px solid white;
    border-radius: 16px;
    min-width: 3rem;
    text-align: center;
  }
}
</style>
