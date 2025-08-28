<script setup>
import { ref, reactive, onMounted } from 'vue'
import api from '../../api/instanceAxios'
import ErroMensagemValidacaoForm from '../../components/ErroMensagemValidacaoForm.vue'
import LeituraAleatoria from '@/components/Leitura/LeituraAleatoria.vue'
import { useLeituraStore } from '@/stores/leituraStore'
import Carregando from '../../components/Carregando.vue'

const leituraStore = useLeituraStore()

onMounted(() => {
  leituraStore.fetchLeituraAleatoria()
})

const usuario = reactive({
  email: 'Henrique@gmail.com',
  password: '12345678',
})

const erros = reactive({
  geral: [],
  email: [],
  password: [],
})

const carregar = ref(false)

const realizarLogin = async () => {
  carregar.value = true
  erros.geral = []
  erros.email = []
  erros.password = []

  try {
    const response = await api.post('/usuario/login', {
      email: usuario.email,
      password: usuario.password,
    })

    const token = response.data.authorisation.token
    localStorage.setItem('token', token)
    console.log('Login bem-sucedido:', response)
  } catch (error) {
    console.error('Erro no login:', error)

    if (error.response?.status === 500) {
      erros.geral.push('Erro. Tente novamente mais tarde.')
    } else if (error.response?.data?.errors) {
      const dataErrors = error.response.data.errors
      erros.email = dataErrors.email ?? []
      erros.password = dataErrors.password ?? []
    } else {
      erros.geral.push('Ocorreu um erro inesperado.')
    }
  } finally {
    carregar.value = false
  }
}
</script>

<template>
  <div class="columns is-vcentered is-centered" style="height: 100vh">
    <!-- Coluna Login -->
    <div class="column is-4 is-flex is-justify-content-center is-align-items-center">
      <div class="box" style="width: 100%; max-width: 400px">
        <h1 class="title has-text-centered">Login de Usuário</h1>

        <div v-if="erros.geral.length" class="notification is-danger">
          <ErroMensagemValidacaoForm :erros="erros.geral" />
        </div>

        <form @submit.prevent="realizarLogin">
          <div class="field">
            <label class="label" for="email">Email</label>
            <div class="control">
              <input
                id="email"
                type="text"
                v-model="usuario.email"
                class="input"
                :class="{ 'is-danger': erros.email.length }"
              />
            </div>
            <p v-if="erros.email.length">
              <ErroMensagemValidacaoForm :erros="erros.email" />
            </p>
          </div>

          <div class="field">
            <label class="label" for="password">Senha</label>
            <div class="control">
              <input
                id="password"
                type="password"
                v-model="usuario.password"
                class="input"
                :class="{ 'is-danger': erros.password.length }"
              />
            </div>
            <p v-if="erros.password.length">
              <ErroMensagemValidacaoForm :erros="erros.password" />
            </p>
          </div>

          <div class="field">
            <div class="control">
              <button type="submit" class="button is-primary is-fullwidth" :disabled="carregar">
                {{ carregar ? 'Enviando...' : 'Enviar' }}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>

    <div class="column is-4 is-flex is-justify-content-center is-align-items-center">
      <!-- Mostra o loader enquanto carrega OU se não houver leitura -->
      <div v-if="leituraStore.estaCarregando || !leituraStore.leituraAleatoria">
        <Carregando />
      </div>

      <!-- Renderiza só quando existir um objeto válido -->
      <LeituraAleatoria v-else :leitura="leituraStore.leituraAleatoria" />
    </div>
  </div>
</template>
