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
          pause();
        }
      }
    }
  });
});
</script>

<template>
  <h1 class="main__title">L.I.R.A.</h1>
  <RouterView :alert="alertHomeView" />
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

.main__title {
  position: fixed;
  right: 50%;
  transform: translateX(55%);
  top: 4dvh;
  color: white;
  font-size: 2.4rem;
  font-family: 'Debodies', sans-serif;
}
</style>
