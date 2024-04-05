import { ref } from 'vue';
import { apiLogin, logoutApi } from '@/services/api.service';
import router from '@/router/index.js'

const token = ref(localStorage.getItem('AUTH_TOKEN') ?? "");

export function useAuth() {
  async function login(form) {
    try {
      console.log('form', form)
      const response = await apiLogin(form)
      localStorage.setItem('AUTH_TOKEN', response.data.jwt)
      token.value = response.data.jwt
      await router.push('/')
    } catch (error) {
      console.log(error)
      return error
    }
  }

  async function logout() {
    logoutApi()
    token.value = ""
    await router.push('/login')
  }


  return { login, logout }
}
