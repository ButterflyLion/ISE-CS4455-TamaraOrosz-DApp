import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import CreateWalletView from '@/components/wallets/CreateWalletView.vue'
import EventView from '@/views/EventView.vue'
import ErrorView from '@/views/ErrorView.vue'
import ViewWalletBalances from '@/components/wallets/ViewWalletBalances.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about-us',
      name: 'about-us',
      component: AboutView
    },
    {
      path: '/create-wallet',
      name: 'create-wallet',
      component: CreateWalletView
    },
    {
      path: '/view-wallet',
      name: 'view-wallet',
      component: ViewWalletBalances
    },
    {
      path: '/event',
      name: 'event',
      component: EventView
    },
    {
      path: '/:catchAll(.*)*',
      name: 'not-found',
      component: ErrorView
    }
  ]
})

export default router
