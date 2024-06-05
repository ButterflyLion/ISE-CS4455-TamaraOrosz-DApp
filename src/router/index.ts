import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import CreateWalletView from '@/components/wallets/CreateWalletView.vue'
import EventView from '@/views/EventView.vue'
import ErrorView from '@/views/ErrorView.vue'
import ViewWalletBalances from '@/components/wallets/ViewWalletBalances.vue'
import BuyTicket from '@/components/event/BuyTicket.vue'
import SellTicket from '@/components/event/SellTicket.vue'

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
      path: '/buy-ticket',
      name: 'buy-ticket',
      component: BuyTicket,
    },
    {
      path: '/sell-ticket',
      name: 'sell-ticket',
      component: SellTicket,
    },
    {
      path: '/:catchAll(.*)*',
      name: 'not-found',
      component: ErrorView
    }
  ]
})

export default router
