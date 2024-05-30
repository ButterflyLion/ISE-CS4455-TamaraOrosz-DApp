<script setup lang="ts">
// https://blog.logrocket.com/integrate-web3-into-vue/
import { RouterView } from 'vue-router'
import HeaderLayout from './components/layout/HeaderLayout.vue'
import FooterLayout from './components/layout/FooterLayout.vue'
</script>

<template>
  <HeaderLayout />
  <RouterView />
  <FooterLayout />
</template>

<style></style>
