<script setup lang="ts">
import { NConfigProvider, type GlobalThemeOverrides } from 'naive-ui'
import { ref } from 'vue'
import Web3 from 'web3'

const password = ref('')
const walletAddress = ref('')
const privKey = ref('')
const keystore = ref('')

var walletCreated = ref(false)
const loading = ref(false)

const createWallet = async () => {
  if (password.value === '') {
    alert('Please enter a password')
    return
  }

  const web3 = new Web3('https://rpc2.sepolia.org')
  const wallet = web3.eth.accounts.create()

  walletAddress.value = wallet.address
  privKey.value = wallet.privateKey

  try {
    loading.value = true
    const newKeystore = await web3.eth.accounts.encrypt(wallet.privateKey, password.value)
    if (newKeystore === undefined) {
      alert('Error creating wallet')
      return
    } else {
      walletCreated.value = true
      console.log(newKeystore)
      keystore.value = JSON.stringify(newKeystore)
      console.log(keystore.value)
    }
  } catch (error) {
    console.error('Error creating a new wallet', error)
  } finally {
    loading.value = false
  }
}

const downloadKeystore = () => {
  if (keystore.value === '') {
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

const themeOverrides: GlobalThemeOverrides = {
  Card: {
    titleTextColor: '#01328a',
    titleFontSizeMedium: '1.5rem',
    borderColor: 'none'
  },
  Button: {
    colorHover: '#fe15c6',
    textColorHover: '#01328a',
    color: '#01328a',
    border: 'none',
    borderHover: 'none',
    colorDisabled: '#01328a',
    borderDisabled: 'none',
    colorPressed: 'none',
    borderPressed: 'none',
    textColorPressed: 'none',
    colorFocus: 'none',
    textColor: '#ccebff',
    textColorFocus: 'none',
    borderFocus: 'none',
    borderTextFocus: 'none',
    textColorGhostFocus: 'none',
    textColorTextPressed: 'none',
    borderTextPressed: 'none',
    textColorTextDisabled: '#ccebff',
    textColorDisabled: '#ccebff',
  },
  Input: {
    borderHover: '#fe15c6',
    borderFocus: '#fe15c6',
    borderColor: '#fe15c6',
    boxShadowFocus: '#fe15c6',
    caretColor: '#01328a',
    textColor: '#01328a'
  }
}
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <main>
      <n-card title="Create a wallet">
        <n-input-group>
          <n-input
            v-model:value="password"
            type="password"
            show-password-on="click"
            placeholder="Set your wallet password"
            :minlength="12"
          />
          <n-button @click="createWallet"> Create wallet </n-button>
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
        <n-button @click="downloadKeystore" :loading="loading" :disabled="!walletCreated"
          >Download</n-button
        >
      </n-card>
    </main>
  </n-config-provider>
</template>

<style scoped>
.n-input {
  text-transform: none;
}

.n-button {
  text-transform: uppercase;
}
</style>
