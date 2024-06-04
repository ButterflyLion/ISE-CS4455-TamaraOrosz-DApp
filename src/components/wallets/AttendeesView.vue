<script setup lang="ts">
import { NConfigProvider, type GlobalThemeOverrides } from 'naive-ui'
import { ref } from 'vue'
import Web3 from 'web3'
import ABI from '../../../contract/ABI'

const web3 = new Web3('https://rpc2.sepolia.org')

const walletAddress = ref('')
const ticketTokenAddress = ref('0x5F16813bAf39c710aFCB26F04Ef0E19a5ee1F653')
const contract = new web3.eth.Contract(ABI, ticketTokenAddress.value)

const walletCryptoBalance = ref<string | null>(null)
const ticketBalance = ref(null)

const viewBalance = async () => {
  if (walletAddress.value === '') {
    alert('Please enter a wallet address')
    return
  }
  if (web3.utils.isAddress(walletAddress.value)) {
    const balance = await web3.eth.getBalance(walletAddress.value)
    console.log(balance)
    const balanceInEther = web3.utils.fromWei(balance, 'ether')
    walletCryptoBalance.value = balanceInEther
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
    console.log('Valid token addresses')
    contract.methods
      .balanceOf(walletAddress.value)
      .call()
      .then(function (balance: any) {
        console.log(balance)
        ticketBalance.value = balance
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
    textColorFocus: '#01328a'
  },
  Input: {
    borderFocus: '#fe15c6',
    borderColor: '#fe15c6',
    boxShadowFocus: '#fe15c6',
    caretColor: '#01328a',
    textColor: '#01328a'
  },
  Tag: {
    textColor: '#fe15c6'
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
        </n-input-group>
        <n-input-group style="display: flex; justify-content: space-around">
          <n-button @click="viewBalance"> Account balance </n-button>
          <n-tag>{{ walletCryptoBalance ? `${walletCryptoBalance} ETH` : '- ETH' }}</n-tag>
          <n-button @click="viewTickets"> Ticket Balance </n-button>
          <n-tag>{{ ticketBalance ? `${ticketBalance} ticket(s)` : '- ticket(s)' }}</n-tag>
        </n-input-group>
      </n-card>
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

.n-tag {
  text-transform: none;
  margin: 10px;
}

.n-button {
  text-transform: uppercase;
  margin: 10px;
}
</style>
