import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'leituras',
      component: () => import('@/views/Leitura/Leituras.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Usuario/LoginView.vue'),
    },
    {
      path: '/usuario/cadastrar',
      name: 'usuario-cadastrar',
      component: () => import('@/views/Usuario/CadastrarUsuario.vue'),
    },
    {
      path: '/leituras',
      name: 'leituras',
      component: () => import('@/views/Leitura/Leituras.vue'),
    },
    {
      path: '/leituras/cadastrar',
      name: 'leituras-cadastrar',
      component: () => import('@/views/Leitura/CadastrarLeitura.vue'),
    },
    {
      path: '/usuario/leituras',
      name: 'usuario-leituras',
      component: () => import('@/views/Leitura/UsuarioLeituras.vue'),
    },
  ],
})

export default router
