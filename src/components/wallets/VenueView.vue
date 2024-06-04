<script setup lang="ts">
import { NConfigProvider, type GlobalThemeOverrides } from 'naive-ui'
import { computed, ref } from 'vue'
import Web3 from 'web3'
import ABI from '../../../contract/ABI'

const web3 = new Web3('https://rpc2.sepolia.org')

const ticketTokenAddress = ref('0x5F16813bAf39c710aFCB26F04Ef0E19a5ee1F653')
const contract = new web3.eth.Contract(ABI, ticketTokenAddress.value)

const totalSupplyPromise = contract.methods.totalSupply().call()
const totalSupply = ref()
const ticketBalancePromise = contract.methods.contractBalance().call()
const ticketBalance = ref()

const soldTickets = computed(() => {
  return parseInt(totalSupply.value) - parseInt(ticketBalance.value)
})

const viewTicketBalance = async () => {
  await totalSupplyPromise.then((totalSupplY) => {
    totalSupply.value = totalSupplY
  })

  await ticketBalancePromise.then((balance) => {
    ticketBalance.value = balance
  })
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
  },
  Table: {
    tdColor: '#ccebff',
    thColor: '#ccebff',
    tdTextColor: '#fe15c6',
    thTextColor: '#01328a',
    borderColor: '#01328a'
  }
}
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <main>
      <n-card title="View ticket balance">
        <n-table
          :bordered="false"
          single-column
          :single-line="false"
          size="large"
          clearable="false"
        >
          <thead>
            <tr>
              <th>Total</th>
              <th>Sold</th>
              <th>Remaining</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ totalSupply ? `${totalSupply}` : '...' }}</td>
              <td>{{ soldTickets ? `${soldTickets}` : '...' }}</td>
              <td>{{ ticketBalance ? `${ticketBalance}` : '...' }}</td>
            </tr>
          </tbody>
        </n-table>
        <n-button @click="viewTicketBalance"> Get balance </n-button>
      </n-card>
    </main>
  </n-config-provider>
</template>

<style scoped>
.n-button {
  text-transform: uppercase;
  margin: 10px;
}
</style>
