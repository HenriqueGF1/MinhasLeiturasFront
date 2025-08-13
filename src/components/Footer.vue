<script setup></script>

<template>
  <footer class="footer has-background-dark has-text-white-ter">
    <div class="content has-text-centered">
      <p><strong>MeuApp</strong> &copy; 2025. Todos os direitos reservados.</p>
      <p>
        <a href="#" class="has-text-white-ter">Política de Privacidade</a> |
        <a href="#" class="has-text-white-ter">Termos de Uso</a>
      </p>
      <div class="social-icons" style="margin-top: 0.5rem">
        <a href="#" class="icon has-text-white-ter"><i class="fab fa-facebook"></i></a>
        <a href="#" class="icon has-text-white-ter"><i class="fab fa-twitter"></i></a>
        <a href="#" class="icon has-text-white-ter"><i class="fab fa-instagram"></i></a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding: 2rem 1rem;
}

.social-icons a {
  margin: 0 0.5rem;
  transition: color 0.3s;
}

.social-icons a:hover {
  color: #00d1b2;
}
</style>
