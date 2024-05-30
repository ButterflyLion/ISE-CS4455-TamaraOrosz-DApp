<script setup lang="ts">
import { NConfigProvider, type GlobalThemeOverrides } from 'naive-ui'
import { WalletTwotone } from '@vicons/antd'
import { useRouter, RouterLink } from 'vue-router'

const router = useRouter()

const eventOptions = [
  { label: 'Buy Ticket', key: 'buy-ticket' },
  { label: 'Sell Ticket', key: 'sell-ticket' }
]

const walletOptions = [
  { label: 'Create Wallets', key: 'create-wallet' },
  { label: 'View Wallets', key: 'view-wallet' },
]

function handleSelect(key: string): void {
  const routePath: string = getRoute(key) as string;
  router.push(routePath)
}

function getRoute(key: string) {
  switch (key) {
    case 'create-wallet':
      return '/create-wallet'
    case 'view-wallet':
      return '/view-wallet'
    case 'delete-wallet':
      return '/delete-wallet'
    case 'buy-ticket':
      return '/buy-ticket'
    case 'sell-ticket':
      return '/sell-ticket'
  }
}

const themeOverrides: GlobalThemeOverrides = {
  Dropdown: {
    color: '#01328a',
    optionTextColor: '#ccebff',
    optionTextColorHover: '#fe15c6',
    optionColorHover: '#ccebff',
    borderColor: 'none',
  },
  Button: {
    textColorHover: '#fe15c6',
    border: 'none',
    borderHover: 'none',
    paddingMedium: '14px 16px',
    textColor: '#01328a',
    colorHover: 'none',
    colorPressed: 'none',
    borderPressed: 'none',
    textColorPressed: 'none',
    textColorFocus: '#01328a',
    borderFocus: 'none',
  },
}
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides">
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
        <n-dropdown trigger="hover" :options="eventOptions" @select="handleSelect">
          <n-button style="text-transform: uppercase; font-size: x-large"
            >Event</n-button
          >
        </n-dropdown>
        <n-dropdown trigger="hover" :options="walletOptions" @select="handleSelect">
          <n-button style="text-transform: uppercase; font-size: x-large">
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
</n-config-provider>
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
</style>
