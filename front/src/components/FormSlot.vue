<script setup>
import { useAuth } from '@/composables/useAuth.js'
const props = defineProps({
  form: {
    type: Object,
  },
  formErrors: {
    type: Object,
  },
  label: {
    type: Array,
  },
});
//on click, fire submit event
const emit = defineEmits(['submit']);

</script>
<template>
  <form @submit.prevent="submit" class=" form">

    <div class="form-control" v-for="FormElem in Object.keys(props.form)">
      <label for="identifier" class="label text-black">{{ label[FormElem] }}</label>
      <slot :name="FormElem" :item="FormElem">
        <input type="text" class="input input-bordered text-black" name="identifier"
          :class="{ 'error-input': FormElem }" v-model="form[FormElem]" />
        <div v-if="formErrors[FormElem]" class="label">
          <span class="label-text-alt error-text">{{ formErrors[FormElem] }}</span>
        </div>
      </slot>

    </div>
    <button @click="emit('submit')" type="submit" class="btn btn-primary mt-4">
      <slot name="BoutonContent">Se connecter</slot>
    </button>
  </form>
</template>
