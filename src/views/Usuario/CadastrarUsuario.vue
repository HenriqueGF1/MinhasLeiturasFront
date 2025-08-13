<script setup>
import { ref, reactive } from 'vue'
import api from '../../api/instanceAxios'
import ErroMensagemValidacaoForm from '../../components/ErroMensagemValidacaoForm.vue'

const usuario = reactive({
  nome: 'Ana',
  email: 'Ana@gmail.com',
  password: '12345678',
  data_nascimento: '',
})

const erros = reactive({
  geral: [],
  nome: [],
  email: [],
  password: [],
  data_nascimento: [],
})

const carregar = ref(false)

const hoje = new Date()
const dataMinima18anos = ref(
  new Date(hoje.getFullYear() - 18, hoje.getMonth(), hoje.getDate()).toISOString().slice(0, 10),
)

const cadastrarUsuario = async () => {
  carregar.value = true
  erros.geral = []
  erros.nome = []
  erros.email = []
  erros.password = []
  erros.data_nascimento = []

  try {
    const response = await api.post('/usuario/cadastrar', {
      nome: usuario.nome,
      email: usuario.email,
      password: usuario.password,
      data_nascimento: usuario.data_nascimento,
    })

    const token = response.data.authorisation.token
    localStorage.setItem('token', token)
    console.log('Cadastro bem-sucedido:', response)
  } catch (error) {
    if (error.response?.status === 500) {
      erros.geral.push('Erro. Tente novamente mais tarde.')
    } else if (error.response?.data?.errors) {
      const dataErrors = error.response.data.errors
      erros.nome = dataErrors.nome ?? []
      erros.email = dataErrors.email ?? []
      erros.password = dataErrors.password ?? []
      erros.data_nascimento = dataErrors.data_nascimento ?? []
    } else {
      erros.geral.push('Ocorreu um erro inesperado.')
    }
  } finally {
    carregar.value = false
  }
}
</script>

<template>
  <div class="columns is-centered is-vcentered" style="height: 100vh; overflow: hidden">
    <div class="column is-4">
      <div class="box">
        <h1 class="title has-text-centered">Cadastro de Usuário</h1>

        <!-- Erros gerais -->
        <div v-if="erros.geral.length" class="notification is-danger">
          <ErroMensagemValidacaoForm :erros="erros.geral" />
        </div>

        <form @submit.prevent="cadastrarUsuario">
          <div class="field">
            <label class="label" for="nome">Nome</label>
            <div class="control">
              <input
                id="nome"
                type="text"
                v-model="usuario.nome"
                class="input"
                :class="{ 'is-danger': erros.nome.length }"
              />
            </div>
            <p v-if="erros.nome.length">
              <ErroMensagemValidacaoForm :erros="erros.nome" />
            </p>
          </div>

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
            <label class="label" for="data_nascimento">Data de Nascimento</label>
            <div class="control">
              <input
                id="data_nascimento"
                type="date"
                v-model="usuario.data_nascimento"
                :max="dataMinima18anos"
                class="input"
                :class="{ 'is-danger': erros.data_nascimento.length }"
              />
            </div>
            <p v-if="erros.data_nascimento.length">
              <ErroMensagemValidacaoForm :erros="erros.data_nascimento" />
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
  </div>
</template>

<style scoped></style>
