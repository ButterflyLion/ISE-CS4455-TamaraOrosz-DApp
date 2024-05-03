<script setup lang="ts">
import Web3 from 'web3'
// https://blog.logrocket.com/integrate-web3-into-vue/
import { RouterView } from 'vue-router'
import HeaderLayout from '@/components/layout/HeaderLayout.vue'
import FooterLayout from '@/components/layout/FooterLayout.vue'
</script>

<template>
  <HeaderLayout />
  <RouterView />
  <FooterLayout />
</template>

<style scoped>
main {
  min-height: 100vh;
  display: flex;
  align-items: center;
}
</style>
