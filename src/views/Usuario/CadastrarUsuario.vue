<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

import { useLeituraStore } from '@/stores/leituraStore'
import { useUsuarioStore } from '@/stores/usuarioStore'

import LeituraAleatoria from '@/components/Leitura/LeituraAleatoria.vue'

import Carregando from '../../components/Carregando.vue'
import ErroMensagemValidacaoForm from '../../components/ErroMensagemValidacaoForm.vue'

const leituraStore = useLeituraStore()
const usuarioStore = useUsuarioStore()

const novosErros = reactive({})

const router = useRouter()

onMounted(() => {
  leituraStore.fetchLeituraAleatoria()
})

const usuario = reactive({
  nome: '',
  email: '',
  password: '',
  data_nascimento: '',
})

const carregar = ref(false)

const hoje = new Date()
const dataMinima18anos = ref(
  new Date(hoje.getFullYear() - 18, hoje.getMonth(), hoje.getDate()).toISOString().slice(0, 10),
)

const cadastrarUsuario = async () => {
  Object.assign(novosErros, {})

  const response = await usuarioStore.cadastro(usuario)

  Object.assign(novosErros, usuarioStore.erros)

  if (response.status != 200) {
    return
  }

  router.push({ name: 'leituras' })
}
</script>

<template>
  <div class="columns is-centered is-vcentered" style="height: 100vh; overflow: hidden">
    <div class="column is-4">
      <div class="box">
        <h1 class="title has-text-centered">Cadastro de Usuário</h1>

        <div v-if="Object.keys(novosErros).length" class="notification is-danger is-light">
          <ErroMensagemValidacaoForm :erros="novosErros" />
        </div>

        <form @submit.prevent="cadastrarUsuario">
          <div class="field">
            <label class="label" for="nome">Nome</label>
            <div class="control">
              <input id="nome" type="text" v-model="usuario.nome" class="input" />
            </div>
            <p v-if="Object.keys(novosErros).length">
              <ErroMensagemValidacaoForm :erros="novosErros.nome" />
            </p>
          </div>

          <div class="field">
            <label class="label" for="email">Email</label>
            <div class="control">
              <input id="email" type="text" v-model="usuario.email" class="input" />
            </div>
            <p v-if="Object.keys(novosErros).length">
              <ErroMensagemValidacaoForm :erros="novosErros.email" />
            </p>
          </div>

          <div class="field">
            <label class="label" for="password">Senha</label>
            <div class="control">
              <input id="password" type="password" v-model="usuario.password" class="input" />
            </div>
            <p v-if="Object.keys(novosErros).length">
              <ErroMensagemValidacaoForm :erros="novosErros.password" />
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
              />
            </div>
            <p v-if="Object.keys(novosErros).length">
              <ErroMensagemValidacaoForm :erros="novosErros.data_nascimento" />
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
      <div v-if="leituraStore.estaCarregando || !leituraStore.leituraAleatoria">
        <Carregando />
      </div>

      <LeituraAleatoria v-else :leitura="leituraStore.leituraAleatoria" />
    </div>
  </div>
</template>
