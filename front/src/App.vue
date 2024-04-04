<script setup>
import { RouterLink, RouterView } from "vue-router";
import { useIndicateur } from "./composables/useAlerts";
import { onMounted } from "vue";

const { fetchIndicateurs } = useIndicateur();

onMounted(() => {
  // TODO Set timeout
  fetchIndicateurs();
});
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
