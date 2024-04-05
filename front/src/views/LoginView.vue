<script setup>
import LoginForm from "@/components/LoginForm.vue";

</script>

<template>
  <div class="flex flex-col justify-center items-center login">
    <div class="tabs">
      <div class="tab-header">
        <a role="tab" class="tab-tab">Se connecter</a>
      </div>
      <div class="tab-form">
        <LoginForm />
      </div>
    </div>
  </div>
</template>
