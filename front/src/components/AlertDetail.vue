<script setup>
import { useCustomInterval } from "@/composables/useCustomInterval";
import { useRoute, useRouter } from "vue-router";
import { useAlerte } from "@/composables/useAlerte";
import { putAlerte, putIndicateur } from "@/services/api.service";
import { useDisplayAlertModal } from "@/composables/useDisplayAlertModal";

const { setDisplayAlertModal } = useDisplayAlertModal();

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
  setDisplayAlertModal(false);
  router.push({ path: "/" });
  return { responseIndicateur, responseAlerte };
};
</script>
<template>
  <main class="main">
    <div class="vide"></div>
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

.vide {
  height: 13vh;
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
    border: none;
    background-color: white;
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
  height: 500px;
  overflow-y: auto;

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
