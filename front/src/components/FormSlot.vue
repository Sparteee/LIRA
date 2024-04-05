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
})
//on click, fire submit event
const emit = defineEmits(['submit'])

</script>
<template>
  <form @submit.prevent="submit" class=" form">
    <h2 class="title">Login</h2>
    <div class="form-control" v-for="FormElem in Object.keys(props.form)">
      <label for="identifier" class="label text-black">{{ label[FormElem] }}</label>
      <slot :name="FormElem" :item="FormElem">
        <input type="text" class="input input-bordered text-black" name="identifier" id="identifier"
               :class="{ 'error-input': FormElem }" v-model="form[FormElem]"/>
        <div v-if="formErrors[FormElem]" class="label">
          <span class="label-text-alt error-text">{{ formErrors[FormElem] }}</span>
        </div>
      </slot>

    </div>
    <button @click="emit('submit')" type="submit" class="submit">
      <slot name="BoutonContent">Se connecter</slot>
    </button>
  </form>
</template>

<style scoped>
.title {
  font-size: 2rem;
  font-family: 'Duborics', system-ui;
  color: white;
  text-align: center;
  margin-bottom: 0.6em;
}

input, label {
  font-family: 'Duborics', system-ui;
  font-size: 1.25rem;
  color: white;
  width: 100%;
}

label {
  opacity: 0.75;
}

.submit {
  padding: 1rem 1.5rem;
  border-radius: 2rem;
  font-size: 2rem;
  font-family: 'Duborics', system-ui;
  border: 0;
  color: white;
  background: linear-gradient(90deg, #219BE4 0%, #9B27B8 100%);
}

.form-control {
  position: relative;

  label {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%) scale(1);
    transform-origin: left center;
    opacity: 1;
    pointer-events: none;
    transition: transform 200ms ease, opacity 200ms ease;
    color: rgba(255, 255, 255, 0.6);
  }

  &:has(input:focus-within, input:not(:placeholder-shown)) {
    label {
      opacity: 0;
      transform:  translateY(-50%) scale(0.9);
    }
  }
}

form {
  padding: 2rem 1rem;
  border-radius: 2rem;
  background: rgba(255, 255, 255, .15);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.5rem;
}
</style>
