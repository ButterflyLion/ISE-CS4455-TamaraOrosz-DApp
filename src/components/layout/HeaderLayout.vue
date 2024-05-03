<script setup>

</script>

<template>
    <header>
    <div class="full-width-header">
      <nav>
        <RouterLink to="/">
          <img alt="Logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
        </RouterLink>
      </nav>
      <nav class="pages-links">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about-us">About us</RouterLink>
        <RouterLink to="/event">Event</RouterLink>
        <RouterLink to="/create-a-wallet">Wallets</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.full-width-header {
  display: flex;
  align-items: center;
  width: 100%;
  background-color: #CCEBFF;
  padding: 1rem 2rem;
}

.pages-links {
  margin-left: auto;
  margin-right: 2rem;
}

nav {
  text-transform: uppercase;
}

nav a {
  padding: 14px 16px;
  text-align: center;
  font-size: 20px;
  margin-right: 5px;
}

@media (hover: hover) {
  a:hover {
    color: #FE15C6;
  }
}
</style>