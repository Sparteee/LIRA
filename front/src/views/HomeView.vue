<script setup>
import { ref } from 'vue';
import { vIntersectionObserver } from '@vueuse/components'

import Monitoring from '@/components/Monitoring.vue';
const pieceId = ref(0);
const isMonitoring = ref(false);

const handleClickPiece = (id) => {
  pieceId.value = id;
  isMonitoring.value = true;
}


const sects = ['hello', 'hello 2', 'Helo 3', 'Hello 4']

const currentFloor = ref('0')
const root = ref(null)

function onIntersectionObserver ([{ isIntersecting, target }]) {
  if (isIntersecting) {
    currentFloor.value = target.dataset.floor
  }
}

</script>

<template>
  <main ref="root" :data-current-floor="currentFloor">
    <button @click="handleClickPiece(1)">Piece 1</button>
    <button @click="handleClickPiece(2)">Piece 2</button>
    <button @click="handleClickPiece(3)">Piece 3</button>
    <div v-if="isMonitoring">
      <Monitoring :pieceId="pieceId" />
    </div>
    <ol class="indicator">
      <li v-for="(_, idx) in sects" :key="_" :data-floor="idx" class="pill">
      </li>
    </ol>
    <!-- Etages -->
    <section v-for="(s, idx) in sects" :key="s" :data-floor="idx" v-intersection-observer="onIntersectionObserver">
      {{ s }}
    </section>
  </main>
</template>

<style scoped lang="scss">
main {
  @for $i from 0 through 10 {
    &[data-current-floor="#{$i}"] {
      .indicator .pill[data-floor="#{$i}"] {
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
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    gap: 0.5rem;

    .pill {
      width: 0.25rem;
      aspect-ratio: 1;
      border-radius: 999px;
      background: #000;
      border: 2px solid #000;
    }
  }
}

section {
  scroll-snap-align: start;
  scroll-snap-stop: always;
  height: 100dvh;

  &:nth-of-type(1) {
    background-color: indianred;
  }

  &:nth-of-type(2) {
    background-color: limegreen;
  }

  &:nth-of-type(3) {
    background-color: skyblue;
  }

  &:nth-of-type(4) {
    background-color: lightsalmon;
  }
}
</style>
