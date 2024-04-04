<script setup>
import { RouterLink, RouterView } from "vue-router";
import { useIndicateur } from "./composables/useAlerts";
import { onMounted, ref } from "vue";

const { fetchIndicateurs, getAlerte } = useIndicateur();

const lastKnownAlerte = ref(null);
onMounted(async () => {
  // Set interval

  const intervalID = setInterval(async () => {
    await fetchIndicateurs();
  }, 5000);

  const intervalAlert = setInterval(async () => {
    const [alerte] = await getAlerte();
    if (alerte != null) {
      if (!lastKnownAlerte.value) {
        //init
        console.log("premier passage");
        lastKnownAlerte.value = alerte;
        if (!lastKnownAlerte.value.attributes.resolved) {
          //open modal
          console.log("open modal");
        }
      } else if (lastKnownAlerte.value.id !== alerte.id) {
        lastKnownAlerte.value = alerte;
        console.log("nouvelle alerte");

        if (!lastKnownAlerte.value.attributes.resolved) {
          //open modal
          console.log("open modal");
        }
      }
    }
  }, 5000);
});
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
