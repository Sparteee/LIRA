<script setup>
import { useCustomInterval } from "@/composables/useCustomInterval";
import { useRoute } from "vue-router";
import { useAlerte } from "@/composables/useAlerte";
import { putAlerte, putIndicateur } from "@/services/api.service";

const { getOneAlerte } = useAlerte();
const { reset, pause, resume } = useCustomInterval();

const route = useRoute();
const alertId = route.params.id;

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
  return { responseIndicateur, responseAlerte };

  reset();
  resume();
};
</script>

<template>
  <button @click="fixAlert()" class="btnResolution">Réparer</button>
</template>
