# 📚 Gerenciamento de Leituras

[![Vue.js](https://img.shields.io/badge/Vue.js-3.x-42b883)](https://vuejs.org/)
[![Bulma](https://img.shields.io/badge/Bulma-0.9.4-00d1b2)](https://bulma.io/)

Este projeto é uma aplicação de **gerenciamento de leituras** que permite aos usuários cadastrar, organizar e acompanhar seu progresso em livros, HQs e outros.  
Com ele, é possível definir metas, registrar avaliações, acompanhar estatísticas, receber lembretes de leitura e muito mais.

---

## 🚀 Tecnologias utilizadas (Front-end)

- **Framework:** [Vue.js](https://vuejs.org/) (v3)
- **Estilização:** [Bulma](https://bulma.io/) (v0.9.4)

---

## 📡 APIs Integradas

- **[Google Books API](https://developers.google.com/books/docs/v1/using?hl=pt-br)**  
  Para buscar informações completas dos livros, como título, autor, ISBN, capa e descrição.

---

## 📌 Funcionalidades

- **Autenticação de Usuário**
  - Cadastro com nome, e-mail, senha e data de nascimento
  - Login com geração de token JWT
  - Logout

- **Gerenciamento de Livros**
  - Cadastro de livros, HQs, etc.
  - Pesquisa por ISBN
  - Listagem, pesquisa e exclusão de livros

- **Progresso de Leitura**
  - Registro diário do número de páginas lidas
  - Acompanhamento da evolução de leitura

- **Avaliações de Livros**
  - Criação de avaliações
  - Listagem e exclusão de avaliações

---

## Algumas telas

- Tela de Leituras
  ![Tela de Leituras](/printsReadme/tela-de-leituras.png 'Tela de Leituras')
- Tela de Cadastro de Leituras
  ![TTela de Cadastro de Leituras](/printsReadme/tela-de-cadastro-de-leitura.png 'Tela de Cadastro de Leituras')
- Tela de Avaliações de Leituras
  ![Tela de Avaliações de Leituras](/printsReadme/tela-de-avaliacoes.png 'Tela de Avaliações de Leituras')
- Tela de Leituras do Usuário
  ![Tela de Leituras do Usuário](/printsReadme/leituras-do-usuario.png 'Tela de Leituras do Usuário')

---

## 🏁 Passo a Passo para Baixar e Iniciar o Projeto

PASSO A PASSO PARA BAIXAR E INICIAR O PROJETO

1. Clone o repositório:
   </br> `git clone https://github.com/HenriqueGF1/MinhasLeiturasFront.git` </br>
   `cd MinhasLeiturasFront` </br>
2. Instale as dependências do backend (Laravel):
   </br> `npm install` </br>

3. Inicie o servidor Laravel:
   </br> `npm run dev` </br>
