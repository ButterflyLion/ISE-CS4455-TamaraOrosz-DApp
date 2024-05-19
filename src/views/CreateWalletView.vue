<script lang="ts">
import { defineComponent, ref } from 'vue'
import Web3 from 'web3'

export default defineComponent({
  setup() {
    const password = ref('')
    const walletAddress = ref('')
    const privKey = ref('')
    const keystore = ref('')

    const createWallet = async () => {
      if (password.value === '') {
        alert('Please enter a password')
        return
      }

      const web3 = new Web3("https://rpc2.sepolia.org")
      const wallet = web3.eth.accounts.create()

      walletAddress.value = wallet.address
      privKey.value = wallet.privateKey

      const newKeystore = await web3.eth.accounts.encrypt(wallet.privateKey, password.value)
      console.log(newKeystore)
      keystore.value = JSON.stringify(newKeystore)
      console.log(keystore.value)
    }

    const downloadKeystore = () => {
      if(keystore.value === '') {
        alert('Please create a wallet first')
        return
      }
      const keystoreBlob = new Blob([keystore.value], { type: 'text/plain;charset=utf-8' })
      saveAs(keystoreBlob, walletAddress.value + '.json')
    }

    const saveAs = (blob: Blob | MediaSource, filename: string) => {
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      a.click()
      URL.revokeObjectURL(url)
    }

    return {
      password,
      walletAddress,
      privKey,
      keystore,
      createWallet,
      downloadKeystore
    }
  }
})
</script>

<template>
  <main>
    <n-card title="Create a wallet">
      <div class="inputGroup">
        <n-input-group>
          <n-input
            v-model:value="password"
            type="password"
            show-password-on="click"
            placeholder="Set your wallet password"
            :minlength="12"
          />
          <n-button @click="createWallet" type="primary" color="#fe15c6"> Create wallet </n-button>
        </n-input-group>
        <n-flex justify="space-around" :style="{ padding: '10px' }">
          <n-input
            v-model:value="walletAddress"
            type="text"
            placeholder="Wallet Address will be displayed here"
            :disabled="true"
          />
          <n-input
            v-model:value="privKey"
            type="text"
            placeholder="Private key will be displayed here"
            :disabled="true"
          />
          <n-input
            v-model:value="keystore"
            type="textarea"
            :autosize="true"
            placeholder="Key Store will be displayed here"
            :disabled="true"
          />
        </n-flex>
          <n-button @click="downloadKeystore" type="primary" color="#fe15c6">Download</n-button>
      </div>
    </n-card>
  </main>
</template>

<style scoped>
.inputGroup {
  text-transform: none;
}
</style>
