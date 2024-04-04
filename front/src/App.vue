<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <RouterView/>
</template>

<style>
html {
  overscroll-behavior: none;
  scroll-snap-type: y mandatory;
  scrollbar-width: thin;
}

html,
body,
#app,
section {
  block-size: 100%;
}
</style>
