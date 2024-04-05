<script setup>
import { useRouter } from "vue-router";
import { onMounted, ref, watch } from "vue";
import { RouterLink } from "vue-router";
import { useAlerte } from "@/composables/useAlerte";
const { getPieceAlerte } = useAlerte();

const tab = ref([])
const piece = ref({})
const indicateur = ref({})

const props = defineProps({
  showModal: {
    type: Boolean,
    required: true,
    default: false,
  },
  alertId: {
    type: Number,
  },
});

const router = useRouter();

const emit = defineEmits(["closeAlert"]);
console.log(props.alertId);

const handleClickAlert = (alertId) => {
  emit("closeAlert");
  router.push({ path: `/alert/${alertId}` });
};

const getData = () => {
  const data = getPieceAlerte(102);
  indicateur.value = data.attributes.indicateur.data
  piece.value = data.attributes.indicateur.data.attributes.piece.data
  tab.value = data

}

onMounted(async () => {
  await getData()
})

</script>

<template>
  <div class="modal" :class="{ 'modal-open': showModal }">
    <div class="modal-box">
      <article>
        <div>
          <img class="modal__img" :src="'src/assets/img/pieces/Habitats.png'" alt="piece">
        </div>

        <div class="container__content">
          <div class="container__title">
            <h4 class="alert__title">ALERTE<br>SECURITE</h4>
            <p class="alert__subtitle">ZONE : CANTINE</p>
          </div>
          <div class="indicateur__container">
            <div class="indicateur">
              <h4 class="indicateur__title">TEMPERATURE</h4>
              <p class="indicateur__value">41°</p>
            </div>
          </div>
          <button class="btnResolve" @click="handleClickAlert(alertId)">
            <RouterLink :to="{ name: 'Alert', params: { id: alertId } }">REPARER</RouterLink>
          </button>
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
  border-radius: 1rem;
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

.container__title {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 1.6rem;
}

.alert {
  &__title {
    color: white;
    font-size: 32px;
    text-align: center;
    font-family: 'Duborics', sans-serif;
  }

  &__subtitle {
    color: white;
    font-size: 16px;
    font-family: 'Duborics', sans-serif;
  }
}

.modal__img {
  border-radius: 24px;
  aspect-ratio: 1;
  object-fit: cover;
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
    color: red;
    padding: 0.6rem 1rem;
    border: 2px solid red;
    background-color: white;
    border-radius: 16px;
    min-width: 3rem;
    text-align: center;
  }
}

.container__content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.btnResolve {
  background-color: white;
  border-radius: 50px;
  font-size: 30px;
  padding: 0.4rem;

  a {
    color: red;
    text-decoration: none;
    font-family: 'Duborics', sans-serif;
  }
}
</style>
