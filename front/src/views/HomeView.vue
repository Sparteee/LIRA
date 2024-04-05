<script setup>
import { ref, computed } from "vue";
import AlertModal from "@/components/AlertModal.vue";
import App from "@/App.vue";
import { vIntersectionObserver } from "@vueuse/components";

import EtageUn from "@/components/floors/EtageUn.vue";
import EtageZero from "@/components/floors/EtageZero.vue";
import EtageMoinsUn from "@/components/floors/EtageMoinsUn.vue";
import MonitoringModal from "@/components/MonitoringModal.vue";

const props = defineProps({
  alert: {
    type: Object,
  },
});

const pieceId = ref(0);
const isMonitoring = ref(false);
const emit = defineEmits(["closeAlert"]);
const test = ref(false);
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
  <main ref="root" :data-current-floor="currentFloor" :class="{ 'none_vaisseau': isMonitoring || isAlert }">
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
      :showModal="isAlert"
      :alertId="props.alert.id"
      @closeAlert="isAlert = false"
    />
  </div>
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
</style>
