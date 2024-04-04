<script setup>
import { onMounted, ref, watch } from 'vue'
import { usePiece } from '@/composables/usePiece.js'
const { getIndicateursByPiece } = usePiece()
const tab = ref([])

const props = defineProps({
  pieceId: {
    type: Number,
    required: true
  }
})
const getData = async () => {
  const data = await getIndicateursByPiece(props.pieceId);
  tab.value = data.attributes.indicateurs.data;
}

onMounted(async () => {
  await getData()
})

watch(() => props.pieceId, getData)



</script>

<template>
  <div>
    <h1>Monitoring</h1>
    <p>Here you can monitor the status of your devices.</p>

    <table></table>
    <thead>
      <tr>
        <th>Indicateur</th>
        <th>Valeur</th>
        <th>Min</th>
        <th>Max</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="indicateur in tab" :key="indicateur.id">
        <td>{{ indicateur.attributes.nom }}</td>
        <td>{{ indicateur.attributes.seuil }}</td>
        <td>{{ indicateur.attributes.min }}</td>
        <td>{{ indicateur.attributes.max }}</td>
      </tr>
    </tbody>
  </div>
</template>

<style scoped></style>