<script setup>
import { useCustomInterval } from "@/composables/useCustomInterval";
import { useRoute, useRouter } from "vue-router";
import { useAlerte } from "@/composables/useAlerte";
import { putAlerte, putIndicateur } from "@/services/api.service";

const { getOneAlerte } = useAlerte();
const { reset, pause, resume } = useCustomInterval();

const route = useRoute();
const router = useRouter();
const alertId = route.params.id;
const emit = defineEmits(["closeAlert"]);

const fixAlert = async () => {
  const data = await getOneAlerte(alertId);
  console.log(data);
  let seuilIndicateur = data.attributes.indicateur.data.attributes.seuil;
  const maxIndicateur = data.attributes.indicateur.data.attributes.max;
  const indicateurId = data.attributes.indicateur.data.id;
  seuilIndicateur = maxIndicateur - 1;
  console.log(seuilIndicateur);

  let updateAlerte = {
    resolved: true,
  };
  let updateIndicateur = {
    seuil: seuilIndicateur,
  };
  const responseIndicateur = await putIndicateur(
    indicateurId,
    updateIndicateur
  );
  const responseAlerte = await putAlerte(alertId, updateAlerte);
  reset();
  resume();
  emit("closeAlert");
  router.push({ path: "/" });
  return { responseIndicateur, responseAlerte };
};
</script>
<template>
  <main class="main">
    <nav class="main__nav">
      <h1 class="main__title">L.I.R.A.</h1>
      <svg
        class="main__attention"
        width="37"
        height="34"
        viewBox="0 0 37 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18.4998 0C20.106 0 21.603 0.821588 22.5196 2.19383L22.6962 2.47532L36.3433 26.3102C36.7581 27.0615 36.9837 27.9107 36.9991 28.7781C37.0146 29.6456 36.8193 30.5029 36.4316 31.2699C36.0439 32.0369 35.4764 32.6884 34.7823 33.1634C34.0883 33.6384 33.2903 33.9214 32.4631 33.9859L32.1351 34H4.84597C4.01797 33.9903 3.20582 33.7612 2.48534 33.3343C1.76487 32.9074 1.15954 32.2965 0.725881 31.5586C0.292218 30.8207 0.0443522 29.98 0.00542063 29.1148C-0.0335109 28.2496 0.137761 27.3882 0.503249 26.611L0.669759 26.2855L14.3101 2.46828C14.7469 1.71498 15.3618 1.09211 16.0957 0.659766C16.8296 0.227423 17.6576 0.000193816 18.4998 0ZM18.5166 23.4513L18.303 23.4636C17.8942 23.5145 17.5175 23.7204 17.2441 24.0424C16.9707 24.3643 16.8198 24.78 16.8198 25.2106C16.8198 25.6412 16.9707 26.0569 17.2441 26.3788C17.5175 26.7008 17.8942 26.9067 18.303 26.9576L18.4998 26.9699L18.7134 26.9576C19.1222 26.9067 19.499 26.7008 19.7723 26.3788C20.0457 26.0569 20.1967 25.6412 20.1967 25.2106C20.1967 24.78 20.0457 24.3643 19.7723 24.0424C19.499 23.7204 19.1222 23.5145 18.7134 23.4636L18.5166 23.4513ZM18.4998 11.1363C18.0879 11.1363 17.6902 11.2946 17.3824 11.5809C17.0745 11.8672 16.8779 12.2618 16.8297 12.6897L16.8179 12.8956V19.9327L16.8297 20.1386C16.8783 20.5662 17.0751 20.9603 17.383 21.2462C17.6908 21.5321 18.0881 21.6901 18.4998 21.6901C18.9115 21.6901 19.3089 21.5321 19.6167 21.2462C19.9245 20.9603 20.1213 20.5662 20.17 20.1386L20.1817 19.9327V12.8956L20.17 12.6897C20.1218 12.2618 19.9251 11.8672 19.6172 11.5809C19.3094 11.2946 18.9118 11.1363 18.4998 11.1363Z"
          fill="white"
        />
      </svg>
    </nav>
    <section class="alert">
      <div class="alert__header">
        <h2 class="alert__title">ALERTE <br />SECURITE</h2>
        <button @click="fixAlert()" class="alert__btn">Reparer</button>
      </div>
      <article class="alert__documentation documentation">
        <h2 class="documentation__title">Documentation</h2>
        <h3 class="documentation__titles">Si probleme d'oxygene :</h3>
        <p class="documentation__description">
          - Si le niveau d'oxygene descend en dessous du seuil minimal, activer
          immediatement les generateurs d'oxygene de secours et controler les
          systeemes de filtration pour assurer un apport d'air respirable.
        </p>
        <br />
        <p class="documentation__description">
          - Si l'oxygene depasse le seuil maximal, ajuster les systemes pour
          maintenir un niveau sur dans la salle du vaisseau spatial. Surveiller
          en permanence les indicateurs d'oxygene pour garantir un environnement
          securise.
        </p>
        <h3 class="documentation__titles">Si probleme de temperature :</h3>
        <p class="documentation__description">
          - Si la temperature baisse en dessous du seuil minimal, activer le
          chauffage et verifier les systemes de ventilation pour eliminer les
          obstructions.
        </p>
        <br />
        <p class="documentation__description">
          - Si la temperature depasse le seuil maximal, activer le
          refroidissement et surveiller en continu les capteurs de temperature
          pour maintenir un environnement optimal a bord du vaisseau spatial.
        </p>
        <h3 class="documentation__titles">Si probleme d'energie :</h3>
        <p class="documentation__description">
          - Si les niveaux d'energie diminuent en dessous du seuil minimal,
          reduire les charges non essentielles et activer les generateurs de
          secours.
        </p>
        <br />
        <p class="documentation__description">
          - En cas de depassement du seuil maximal, optimiser l'utilisation des
          sources d'energie alternatives et surveiller en continu les
          indicateurs d'energie pour assurer un fonctionnement optimal des
          systemes vitaux a bord du vaisseau spatial.
        </p>
        <h3 class="documentation__titles">Si probleme de gravite :</h3>
        <p class="documentation__description">
          - Si le niveau de gravite chute en dessous du seuil minimal, ajuster
          les systemes pour maintenir une gravite suffisante.
        </p>
        <br />
        <p class="documentation__description">
          - Si la gravite depasse le seuil maximal, activer les dispositifs de
          stabilisation pour assurer la seurite de l'equipage. Surveiller en
          continu les variations de gravite et prendre les mesures necessaires
          pour garantir un environnement stable a bord du vaisseau spatial.
        </p>

        <h3 class="documentation__titles">Si probleme de stelaris :</h3>
        <p class="documentation__description">
          - En cas de niveau de stelaris inferieur au seuil minimal, activer les
          boucliers de protection.
        </p>
        <br />
        <p class="documentation__description">
          - En cas de depassement du seuil maximal, mettre en place des
          protocoles de securite pour l'equipage. Utiliser les systemes de
          detection des radiations pour evaluer et reagir aux variations.
        </p>
      </article>
    </section>
  </main>
</template>

<style scoped lang="scss">
.main {
  color: white;
  &__nav {
    flex-wrap: wrap;
    position: relative;
    width: 100vw;
    height: 15vh;
    display: flex;
    align-content: center;
    justify-content: center;
  }
  &__attention {
    position: absolute;
    top: 44px;
    right: 16px;
  }
  &__title {
    font-family: "Debodies", Fallback, sans-serif;
    font-size: 2.5rem;
  }
}

.alert {
  height: 85vh;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  // justify-content: space-around;
  align-items: center;
  &__title {
    font-size: 2rem;
    padding-bottom: 2rem;
  }
  &__header {
    text-align: center;
    padding-block: 1.5rem;
    width: 90vw;
    background-color: rgba(255, 255, 255, 0.15);
    border-radius: 25px;
    text-transform: uppercase;
    font-family: "Duborics";
  }
  &__btn {
    font-size: 1.5rem;
    padding-inline: 1.5rem;
    border-radius: 60px;
    color: red;
    padding-block: 0.5rem;
  }
}
.documentation {
  background-color: rgba(255, 255, 255, 0.15);
  // padding-inline: 1.5rem;
  max-width: 80dvw;
  border-radius: 25px;
  font-family: "Duborics";
  display: flex;
  flex-direction: column;
  padding: 1rem;
  &__title {
    padding: 0.5rem 0;
    font-size: 30px;
    text-align: center;
    text-transform: uppercase;
  }
  &__titles {
    font-size: 15px;
    padding: 0.5rem 0;
    text-decoration: underline;
  }
  &__description {
    font-size: 12px;
  }
}
</style>
