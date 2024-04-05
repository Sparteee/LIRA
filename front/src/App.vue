<script setup>
import { RouterLink, RouterView } from "vue-router";
import { useIndicateur } from "./composables/useIndicateur";
import { onMounted, ref } from "vue";
import { useCustomInterval } from "@/composables/useCustomInterval";

const { fetchIndicateurs, getAlerte } = useIndicateur();

const lastKnownAlerte = ref(null);
const alertHomeView = ref(null);

onMounted(async () => {
  // Use Interval

  setInterval(async () => {
    await fetchIndicateurs();
  }, 5000);

  const { pause, resume } = useCustomInterval(async () => {
    alertHomeView.value = null;
    const [alerte] = await getAlerte();
    if (alerte != null) {
      if (!lastKnownAlerte.value) {
        //init
        console.log("premier passage");
        lastKnownAlerte.value = alerte;
        if (!lastKnownAlerte.value.attributes.resolved) {
          //open modal
          console.log("open modal");
          alertHomeView.value = alerte;
          pause();
        }
      } else if (lastKnownAlerte.value.id !== alerte.id) {
        lastKnownAlerte.value = alerte;
        console.log("nouvelle alerte");
        if (!lastKnownAlerte.value.attributes.resolved) {
          //open modal
          console.log("open modal");
          alertHomeView.value = alerte;
        }
      }
    }
  });
});
</script>

<template>
  <RouterView :alert="alertHomeView" />
</template>

<style scoped></style>
