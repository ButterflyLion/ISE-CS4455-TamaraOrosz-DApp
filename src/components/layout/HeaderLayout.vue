<script setup>
import { WalletTwotone } from '@vicons/antd'
import { useRouter, RouterLink } from 'vue-router'

const router = useRouter()

const options = [
  { label: 'Create Wallet', key: 'create-wallet' },
  { label: 'View Wallet', key: 'view-wallet' },
  { label: 'Manage Wallet', key: 'delete-wallet' }
]

function handleSelect(key) {
  const routePath = getRoute(key)
  router.push(routePath)
}

function getRoute(key) {
  switch (key) {
    case 'create-wallet':
      return '/create-wallet'
    case 'view-wallet':
      return '/view-wallet'
    case 'delete-wallet':
      return '/delete-wallet'
  }
}
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
        <n-dropdown
          trigger="hover"
          :options="options"
          @select="handleSelect"
          class="custom-dropdown"
        >
          <n-button
            quaternary
            style="text-transform: uppercase; color: #01328a; font-size: x-large"
          >
            <template #icon>
              <n-icon>
                <WalletTwotone />
              </n-icon>
            </template>
            wallets
          </n-button>
        </n-dropdown>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.full-width-header {
  display: flex;
  align-items: center;
  width: 100%;
  background-color: #ccebff;
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
  margin-right: 5px;
}

@media (hover: hover) {
  a:hover {
    color: #fe15c6;
  }
}

.custom-dropdown {
  --n-color: #ccebff;
}
</style>
