<script lang="ts">
import { defineComponent, ref } from 'vue'
import Web3 from 'web3'

export default defineComponent({
  setup() {
    const password = ref('')
    const walletAddress = ref('')
    const privKey = ref('')
    const keystore = ref('')
    const tokenAddress = ref('')

    return {
      password,
      walletAddress,
      privKey,
      keystore,
      tokenAddress
    }
  }
})
</script>

<template>
  <main>
    <n-flex justify="center">
      <n-card title="View crypto balance"
        ><n-input v-model="walletAddress" label="Wallet address" type="text"
      /></n-card>
      <n-card title="View ticket token balance"
        ><n-input v-model="tokenAddress" label="Token address" type="text"
      /></n-card>
    </n-flex>
  </main>
</template>

<style scoped>
.card {
  width: 100%;
  margin: 20px;
  color: #fe15c6;
}
</style>
