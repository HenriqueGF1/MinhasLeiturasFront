<script setup>
import { onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'

import { useLeituraStore } from '@/stores/leituraStore'
import { useUsuarioStore } from '@/stores/usuarioStore'

import LeituraAleatoria from '@/components/Leitura/LeituraAleatoria.vue'

import Carregando from '../../components/Carregando.vue'
import ErroMensagemValidacaoForm from '../../components/ErroMensagemValidacaoForm.vue'

const router = useRouter()

const leituraStore = useLeituraStore()
const usuarioStore = useUsuarioStore()

onMounted(() => {
  leituraStore.fetchLeituraAleatoria()
})

const usuario = reactive({
  email: 'Henrique@gmail.com',
  // email: 'H',
  password: '12345678',
})

const novosErros = reactive({})

const realizarLogin = async () => {
  Object.assign(novosErros, {})

  const response = await usuarioStore.login(usuario)

  Object.assign(novosErros, usuarioStore.erros)

  if (response.code != 200) {
    return
  }

  router.push({ name: 'leituras' })
}
</script>

<template>
  <div class="columns is-vcentered is-centered" style="height: 100vh">
    <!-- Coluna Login -->
    <div class="column is-4 is-flex is-justify-content-center is-align-items-center">
      <div class="box" style="width: 100%; max-width: 400px">
        <h1 class="title has-text-centered">Login de Usuário</h1>

        <!-- <div v-if="Object.keys(novosErros).length" class="notification is-danger">
          <ErroMensagemValidacaoForm :erros="novosErros" />
        </div> -->

        <form @submit.prevent="realizarLogin">
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
            <div class="control">
              <button
                type="submit"
                class="button is-primary is-fullwidth"
                :disabled="usuarioStore.estaCarregandoUsuario"
              >
                {{ usuarioStore.estaCarregandoUsuario ? 'Enviando...' : 'Enviar' }}
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
