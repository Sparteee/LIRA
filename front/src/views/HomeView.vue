<script setup>
import { ref } from 'vue';
import Monitoring from '@/components/Monitoring.vue';
const pieceId = ref(0);
const isMonitoring = ref(false);

const handleClickPiece = (id) => {
  pieceId.value = id;
  isMonitoring.value = true;
}

</script>

<template>
  <main>
    <button @click="handleClickPiece(1)">Piece 1</button>
    <button @click="handleClickPiece(2)">Piece 2</button>
    <button @click="handleClickPiece(3)">Piece 3</button>
    <div v-if="isMonitoring">
      <Monitoring :pieceId="pieceId" />
    </div>
  </main>
</template>
