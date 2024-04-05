<script setup>
import { RouterLink, RouterView, useRouter } from "vue-router";
import { useIndicateur } from "./composables/useIndicateur";
import { onMounted, ref, computed } from "vue";
import { useCustomInterval } from "@/composables/useCustomInterval";
import { useDisplayAlertModal } from "@/composables/useDisplayAlertModal";
import { useAlerte } from "@/composables/useAlerte";
const { fetchIndicateurs, getAlerte } = useIndicateur();
const { changeTest, getTest } = useAlerte();
const { setDisplayAlertModal } = useDisplayAlertModal();

const lastKnownAlerte = ref(null);
const alertHomeView = ref(null);
const router = useRouter();
const test = ref(false);
const classAlert = computed(() => {
  console.log("alertHomeView", alertHomeView);
  console.log("lastKnownAlerte", lastKnownAlerte);
  if (lastKnownAlerte.value === null) {
    return false;
  }
  return alertHomeView !== null && !lastKnownAlerte.value?.attributes?.resolved
});
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
          setDisplayAlertModal(true);
          pause();
          changeTest();
        }
      } else if (lastKnownAlerte.value.id !== alerte.id) {
        lastKnownAlerte.value = alerte;
        console.log("nouvelle alerte");
        if (!lastKnownAlerte.value.attributes.resolved) {
          //open modal
          console.log("open modal");
          alertHomeView.value = alerte;
          setDisplayAlertModal(true);
          pause();
          changeTest();

        }
      }
    }
  });
});


const handleClick = () => {
  router.push({ path: "/login" });
};
</script>

<template>
  <h1 class="main__title">L.I.R.A.</h1>
  <button type="button" @click="handleClick" class="main__attention" :class="{ alert: getTest() }">
    <svg width="37" height="34" viewBox="0 0 37 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M18.4998 0C20.106 0 21.603 0.821588 22.5196 2.19383L22.6962 2.47532L36.3433 26.3102C36.7581 27.0615 36.9837 27.9107 36.9991 28.7781C37.0146 29.6456 36.8193 30.5029 36.4316 31.2699C36.0439 32.0369 35.4764 32.6884 34.7823 33.1634C34.0883 33.6384 33.2903 33.9214 32.4631 33.9859L32.1351 34H4.84597C4.01797 33.9903 3.20582 33.7612 2.48534 33.3343C1.76487 32.9074 1.15954 32.2965 0.725881 31.5586C0.292218 30.8207 0.0443522 29.98 0.00542063 29.1148C-0.0335109 28.2496 0.137761 27.3882 0.503249 26.611L0.669759 26.2855L14.3101 2.46828C14.7469 1.71498 15.3618 1.09211 16.0957 0.659766C16.8296 0.227423 17.6576 0.000193816 18.4998 0ZM18.5166 23.4513L18.303 23.4636C17.8942 23.5145 17.5175 23.7204 17.2441 24.0424C16.9707 24.3643 16.8198 24.78 16.8198 25.2106C16.8198 25.6412 16.9707 26.0569 17.2441 26.3788C17.5175 26.7008 17.8942 26.9067 18.303 26.9576L18.4998 26.9699L18.7134 26.9576C19.1222 26.9067 19.499 26.7008 19.7723 26.3788C20.0457 26.0569 20.1967 25.6412 20.1967 25.2106C20.1967 24.78 20.0457 24.3643 19.7723 24.0424C19.499 23.7204 19.1222 23.5145 18.7134 23.4636L18.5166 23.4513ZM18.4998 11.1363C18.0879 11.1363 17.6902 11.2946 17.3824 11.5809C17.0745 11.8672 16.8779 12.2618 16.8297 12.6897L16.8179 12.8956V19.9327L16.8297 20.1386C16.8783 20.5662 17.0751 20.9603 17.383 21.2462C17.6908 21.5321 18.0881 21.6901 18.4998 21.6901C18.9115 21.6901 19.3089 21.5321 19.6167 21.2462C19.9245 20.9603 20.1213 20.5662 20.17 20.1386L20.1817 19.9327V12.8956L20.17 12.6897C20.1218 12.2618 19.9251 11.8672 19.6172 11.5809C19.3094 11.2946 18.9118 11.1363 18.4998 11.1363Z"
        fill="white" />
    </svg>
  </button>
  <img src="/video/shooting-stars.gif" alt="" class="video">
  <RouterView :alert="alertHomeView" />
</template>

<style>
html {
  overscroll-behavior: none;
  scroll-snap-type: y mandatory;
  scrollbar-width: thin;
  overflow-x: hidden;
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

.video {
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
}

.main__attention {
  position: fixed;
  top: 35px;
  right: 24px;
  aspect-ratio: 1;
  background: none;
  outline: none;
  border: 0;
  z-index: 999;
  cursor: pointer;

  &.alert {
    --accent-color: red;
  }

  svg {
    width: 100%;
    height: auto;
  }

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 150%;
    height: 150%;
    z-index: -1;
    transform: translate(-50%, -50%);
    border-radius: 999px;
    background-color: var(--accent-color, purple);
    filter: blur(20px);
  }
}
</style>
