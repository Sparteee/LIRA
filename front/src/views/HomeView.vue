<script setup>
import { useIntersectionObserver } from '@vueuse/core'
import { vIntersectionObserver } from '@vueuse/components'
import { computed, ref } from 'vue'

const sects = ['hello', 'hello 2', 'Helo 3', 'Hello 4']

const currentFloor = ref('0')
const root = ref(null)

function onIntersectionObserver ([{ isIntersecting, target }]) {
  if (isIntersecting) {
    console.log(target)
    currentFloor.value = target.dataset.floor
  }
}

</script>

<template>
  <main ref="root" :data-current-floor="currentFloor">
    <ol class="indicator">
      <li v-for="(_, idx) in sects" :key="_" :data-floor="idx" class="pill">
      </li>
    </ol>
    <section v-for="(s, idx) in sects" :key="s" :data-floor="idx" v-intersection-observer="onIntersectionObserver">
      {{ s }}
    </section>
  </main>
</template>

<style lang="scss" scoped>

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
