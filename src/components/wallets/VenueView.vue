<script setup lang="ts">
import { NConfigProvider, type GlobalThemeOverrides } from 'naive-ui'
import { ref } from 'vue'
import Web3 from 'web3'
import ABI from '../../../contract/ABI'

const web3 = new Web3('https://rpc2.sepolia.org')

const ticketTokenAddress = ref('0x5F16813bAf39c710aFCB26F04Ef0E19a5ee1F653')
const contract = new web3.eth.Contract(ABI, ticketTokenAddress.value)

const viewTicketBalance = async () => {
  if (web3.utils.isAddress(ticketTokenAddress.value)) {
    contract.methods.totalSupply().call().then(function(totalSupply: any) {
      console.log(totalSupply)
      alert(`totalSupply: ${totalSupply} tickets`)
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
      <n-card title="View tickets sold">
        <label>Tickets Sold</label
        ><n-input-group>
          <n-button @click="viewTicketBalance"> View ticket balance </n-button>
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

.n-button {
  text-transform: uppercase;
}
</style>