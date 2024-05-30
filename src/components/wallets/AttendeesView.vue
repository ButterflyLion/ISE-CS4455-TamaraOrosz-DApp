<script setup lang="ts">
import { NConfigProvider, type GlobalThemeOverrides } from 'naive-ui'
import { ref } from 'vue'
import Web3 from 'web3'
import ABI from '../../../contract/ABI.js'

const web3 = new Web3('https://rpc2.sepolia.org')

const walletAddress = ref('')
const ticketTokenAddress = ref('0x67DA0F4381CF71Ca4d1F1efb32F049FC1576cAeC')

const viewBalance = async () => {
  if (walletAddress.value === '') {
    alert('Please enter a wallet address')
    return
  }
  if (web3.utils.isAddress(walletAddress.value)) {
    const balance = await web3.eth.getBalance(walletAddress.value)
    console.log(balance)
    const balanceInEther = web3.utils.fromWei(balance, 'ether')
    alert(`Balance: ${balanceInEther} ETH`)
  } else {
    alert('Invalid wallet address given')
  }
}

const viewTickets = async () => {
  if (walletAddress.value === '') {
    alert('Please enter a wallet address')
    return
  }
  if (web3.utils.isAddress(ticketTokenAddress.value) && web3.utils.isAddress(walletAddress.value)) {
    const contract = new web3.eth.Contract(ABI, ticketTokenAddress.value)
    contract.methods.balanceOf(walletAddress.value).call().then(function(balance: any) {
      console.log(balance)
      alert(`Balance: ${balance} tickets`)
    })
    contract.methods.symbol().call().then(function(symbol: string) {
      console.log(symbol)
      alert(`Token name: ${symbol}`)
    })
  } else {
    alert('Invalid token address given')
  }
}

const themeOverrides: GlobalThemeOverrides = {
  Card: {
    titleTextColor: '#01328a',
    titleFontSizeMedium: '1.5rem',
    borderColor: 'none'
  },
  Button: {
    colorHover: '#fe15c6',
    textColor: '#cce6ff',
    textColorHover: '#01328a',
    color: '#01328a',
    border: 'none',
    borderHover: 'none',
    colorPressed: '#fe15c6',
    borderPressed: 'none',
    textColorPressed: '#01328a',
    textColorGhostPressed: '#01328a',
    textColorTextPressed: '#01328a',
    textColorFocus: '#01328a',
    colorDisabled: '#01328a',
    borderDisabled: 'none',
    borderFocus: 'red'
  },
  Input: {
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
      <n-card title="View account balance">
        <label>Wallet address</label
        ><n-input-group>
          <n-input
            v-model:value="walletAddress"
            type="text"
            placeholder="Enter your wallet address"
          />
          <n-button @click="viewBalance"> View account balance </n-button>
        </n-input-group>
      </n-card>
      <n-card title="View tickets"
        ><n-input-group>
      <n-button @click="viewTickets">View tickets</n-button>
    </n-input-group></n-card>
    </main>
  </n-config-provider>
</template>

<style scoped>
label {
  font-size: 1rem;
  color: #01328a;
}

.n-input {
  text-transform: none;
}

.n-button {
  text-transform: uppercase;
}
</style>
