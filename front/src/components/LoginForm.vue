<script setup>
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth.js'
import { useForm } from "@/composables/useForm.js";
import FormSlot from './FormSlot.vue'

const { login } = useAuth()
const options = {
  form: {
    identifier: '',
    password: ''
  },
  validation: {
    identifier: {
      type: 'string',
      required: true,
      message: 'Identifiant requis'
    },
    password: {
      type: 'string',
      required: true,
      message: 'Mot de passe requis'
    }
  }
}
const label = { identifier: 'Identifiant', password: 'Mot de passe' }
const { formErrors, form, validate } = useForm(options)
const error = ref(null)

const submit = async () => {
  validate()
  console.log(Object.keys(formErrors.value))
  if (Object.keys(formErrors.value).length === 0) {
    const isLogged = await login(form.value)
    if (isLogged.code === "ERR_BAD_REQUEST") {
      error.value = "Identifiant ou mot de passe incorrect"
    }
  }
}

</script>

<template>
  <FormSlot :form="form" :form-errors="formErrors" @submit="submit" :label="label">
    <template v-slot:identifier="{ item }">
      <input type="text" class="input input-bordered text-black" :name="item"
        :class="{ 'error-input': formErrors[item] }" v-model="form[item]" placeholder=" " />
      <div v-if="formErrors[item]" class="label">
        <span class="label-text-alt error-text">{{ formErrors[item] }}</span>
      </div>
    </template>
    <template v-slot:password="{ item }">
      <input type="password" class="input input-bordered text-black" :name="item"
        :class="{ 'error-input': formErrors[item] }" v-model="form[item]" placeholder=" " />
      <div v-if="formErrors.password" class="label">
        <span class="label-text-alt error-text">{{ formErrors[item] }}</span>
      </div>
    </template>
    <template v-slot:BoutonContent>Connexion</template>
  </FormSlot>
  <RouterLink to="/" class="btn">Retour</RouterLink>
</template>

<style scoped>

.btn {
  margin-top: 2rem;
  font-family: 'Duborics', system-ui;
  color: white;
  text-align: center;
  text-decoration: none;
}
.input {
  outline: none;
  color: white;
  border: 1px solid #cacaca;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  border-radius: 1rem;
}
</style>
