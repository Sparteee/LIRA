<script setup>
import { ref, computed } from "vue";
import AlertModal from "@/components/AlertModal.vue";
import App from "@/App.vue";
import { vIntersectionObserver } from "@vueuse/components";

import EtageUn from "@/components/floors/EtageUn.vue";
import EtageZero from "@/components/floors/EtageZero.vue";
import EtageMoinsUn from "@/components/floors/EtageMoinsUn.vue";
import MonitoringModal from "@/components/MonitoringModal.vue";
import { useDisplayAlertModal } from "@/composables/useDisplayAlertModal";

const { shouldDisplayModal } = useDisplayAlertModal();

const props = defineProps({
  alert: {
    type: Object,
  },
});

const pieceId = ref(0);
const isMonitoring = ref(false);
const emit = defineEmits(["closeAlert"]);
const isAlert = computed(() => {
  return props.alert !== null;
});

const handleClickPiece = (id) => {
  pieceId.value = id;
  isMonitoring.value = true;
};

const currentFloor = ref(0);
const root = ref(null);

function onIntersectionObserver([{ isIntersecting, target }]) {
  if (isIntersecting) {
    currentFloor.value = target.dataset.floor;
  }
}
</script>

<template>
  <main
    ref="root"
    :data-current-floor="currentFloor"
    :class="{ none_vaisseau: isMonitoring || (shouldDisplayModal && isAlert) }"
  >
    <ol class="indicator">
      <li :data-floor="1" class="pill">
        <span></span>
      </li>
      <li :data-floor="0" class="pill">
        <span></span>
      </li>
      <li :data-floor="2" class="pill">
        <span></span>
      </li>
    </ol>
    <!-- Etages -->
    <section :data-floor="1" v-intersection-observer="onIntersectionObserver">
      <EtageUn @monitoring="(args) => handleClickPiece(args)" />
    </section>
    <section :data-floor="0" v-intersection-observer="onIntersectionObserver">
      <EtageZero @monitoring="(args) => console.log(args)" />
    </section>
    <section :data-floor="2" v-intersection-observer="onIntersectionObserver">
      <EtageMoinsUn @monitoring="(args) => console.log(args)" />
    </section>
  </main>
  <div v-if="isMonitoring">
    <MonitoringModal
      :pieceId="pieceId"
      :viewModal="isMonitoring"
      @close="isMonitoring = false"
    ></MonitoringModal>
  </div>
  <div v-if="isAlert">
    <AlertModal
      :showModal="shouldDisplayModal && isAlert"
      :alertId="props?.alert?.id"
      @closeAlert="isAlert = false"
    />
  </div>
  <span class="etoile"></span>
  <span class="etoile"></span>
  <span class="etoile"></span>
  <span class="etoile"></span>
  <span class="etoile"></span>
  <span class="etoile"></span>
</template>

<style scoped lang="scss">
main {
  @for $i from 0 through 10 {
    &[data-current-floor="#{$i}"] {
      .indicator .pill[data-floor="#{$i}"] span {
        background-color: #fff;
      }
    }
  }

  .indicator {
    display: flex;
    flex-direction: column;
    list-style: none;
    position: fixed;
    z-index: 10;
    right: 1.5rem;
    top: 50%;
    transform: translateY(-50%);
    gap: 0.5rem;

    .pill {
      --line-height: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      align-items: center;

      span {
        display: block;
        width: 0.75rem;
        aspect-ratio: 1;
        border-radius: 999px;
        background-color: transparent;
        border: 2px solid black;
        transition: background-color 200ms ease;
        outline: 1px solid white;
      }

      &:not(:first-of-type) {
        &:before {
          content: "";
          display: block;
          width: 1px;
          height: var(--line-height);
          background-color: white;
        }
      }
    }
  }
}

section {
  scroll-snap-align: start;
  scroll-snap-stop: always;
  height: 100dvh;
  display: grid;
  align-content: center;
  justify-content: center;
}

.title {
  color: white;
}

.none_vaisseau {
  display: none;
}
.etoile {
  position: absolute;
  top: 50%;
  width: 4px;
  height: 4px;
  background: #fff;
  border-radius: 50%;
  box-shadow:
    0 0 0 4px rgba(255, 255, 255, 0.1),
    0 0 0 8px rgba(255, 255, 255, 0.1),
    0 0 20px rgba(255, 255, 255, 1);
  animation: animate 5s ease-in-out infinite;
}
.etoile::before {
  content: "";
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 300px;
  height: 1px;
  background: linear-gradient(90deg, #fff, transparent);
}
@keyframes animate {
  0% {
    transform: rotate(315deg) translateX(0);
    opacity: 1;
  }
  70% {
    opacity: 1;
  }
  100% {
    transform: rotate(315deg) translateX(-1500px);
    opacity: 0;
  }
}

.etoile:nth-child(2) {
  top: 0;
  right: 0%;
  animation-delay: 1.8s;
  animation-duration: 2s;
}

.etoile:nth-child(3) {
  top: 100%;
  right: 0;
  animation-delay: 2s;
  animation-duration: 2s;
}
.etoile:nth-child(4) {
  top: 200%;
  right: 0;
  animation-delay: 0.4s;
  animation-duration: 4s;
}
.etoile:nth-child(5) {
  top: 0;
  right: 40%;
  animation-delay: 0.4s;
  animation-duration: 2s;
}
.etoile:nth-child(6) {
  top: 280%;
  right: 0%;
  animation-delay: 0.8s;
  animation-duration: 2s;
}
.etoile:nth-child(7) {
  top: 250%;
  right: 0%;
  animation-delay: 0.4s;
  animation-duration: 2s;
}
</style>
