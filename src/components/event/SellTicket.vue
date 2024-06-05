<script setup lang="ts">
import { NConfigProvider, type GlobalThemeOverrides } from 'naive-ui'
import type { UploadFileInfo } from 'naive-ui'
import { computed, ref } from 'vue'
import Web3 from 'web3'
import ABI from '../../../contract/ABI'

const web3 = new Web3('https://rpc2.sepolia.org')
const showModal = ref(false)

const ticketTokenAddress = ref('0x5F16813bAf39c710aFCB26F04Ef0E19a5ee1F653')
const contract = new web3.eth.Contract(ABI, ticketTokenAddress.value)
const tokenPricePromise = contract.methods.ticketPrice().call()
const ticketPrice = ref()

tokenPricePromise.then((price) => {
  const displayedPrice = parseFloat(web3.utils.fromWei(String(price), 'ether')) // Cast to number and convert from wei
  ticketPrice.value = displayedPrice
})

const upload = ref<UploadFileInfo | null>(null)
const fileListLengthRef = ref(0)
const loading = ref(false)

const walletAddress = ref('')
const password = ref('')
const privateKey = ref('')
const attendeeTicketBalance = ref()
const attendeeHasTickets = ref(false)

const ticketQuantity = ref(1)
const minQuantity = 1
const maxQuantity = attendeeTicketBalance.value ?? 10

const handleChange = (data: { fileList: UploadFileInfo[] }) => {
  fileListLengthRef.value = data.fileList.length
  if (data.fileList.length > 0) {
    upload.value = data.fileList[0]
  } else {
    upload.value = null
  }
}

const loadWallet = async () => {
  loading.value = true
  let wallet
  if (upload.value === null) {
    loading.value = false
    alert('Please upload a wallet file')
    return
  }
  if (password.value === '') {
    loading.value = false
    alert('Please enter a password')
    return
  }
  const reader = new FileReader()
  reader.onload = async (e) => {
    const result = e.target?.result
    try {
      const keystore = result ? JSON.parse(result.toString()) : null
      wallet = await decryptWallet(keystore, password.value)
    } catch (error) {
      console.error('Error decrypting wallet file', error)
      alert('Error parsing wallet file')
    } finally {
      showModal.value = false
      await handleSell()
      loading.value = false
    }
  }
  if (upload.value !== null) {
    console.log('Reading file')
    reader.readAsText(upload.value.file as File)
  } else {
    loading.value = false
    alert('Please upload a wallet file')
  }
}

const decryptWallet = async (keystore: string, password: string) => {
  try {
    const wallet = await web3.eth.accounts.decrypt(keystore, password)
    privateKey.value = wallet.privateKey
    walletAddress.value = wallet.address
    return wallet
  } catch (error) {
    console.error('Error decrypting wallet file', error)
    alert('Error parsing wallet file')
  }
}

const viewAttendeeTickets = async () => {
  if (walletAddress.value === '') {
    alert('Please enter a wallet address')
    return
  }
  if (web3.utils.isAddress(walletAddress.value)) {
    await contract.methods
      .balanceOf(walletAddress.value)
      .call()
      .then(function (balance: any) {
        attendeeTicketBalance.value = balance
      })
    if (attendeeTicketBalance.value > 0) {
      attendeeHasTickets.value = true
    }
  } else {
    alert('Invalid attendee token address given')
  }
}

const totalRefund = computed((): number => {
  return Number(ticketPrice.value) * Number(ticketQuantity.value)
})

const handleSell = async () => {
  try {
    if (
      web3.utils.isAddress(walletAddress.value) &&
      web3.utils.isAddress(ticketTokenAddress.value) &&
      privateKey.value !== ''
    ) {
      const walletBalance = await web3.eth.getBalance(walletAddress.value)
      const contractBalance = contract.methods.contractBalance()

      const account = web3.eth.accounts.privateKeyToAccount(privateKey.value)
      const transaction = contract.methods.transfer(ticketTokenAddress.value, ticketQuantity.value)
      const encodedABI = transaction.encodeABI()
      const gasPrice = await web3.eth.getGasPrice()

      const tx = {
        from: account.address,
        to: ticketTokenAddress.value,
        data: encodedABI,
        gas: 2000000,
        gasPrice: gasPrice
      }

      web3.eth.accounts.signTransaction(tx, privateKey.value).then(function (signedTx) {
        web3.eth.sendSignedTransaction(signedTx.rawTransaction).on('receipt', function (receipt) {
          alert('Transaction successful')
        })
      })
    } else {
      alert('Invalid wallet or token address given')
    }
  } catch (error) {
    console.error('Error buying tickets', error)
    alert('Error buying tickets')
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
  },
  Upload: {
    itemIconColor: '#fe15c6',
    itemTextColor: '#fe15c6'
  },
  Table: {
    tdColor: '#ccebff',
    thColor: '#ccebff',
    tdTextColor: '#01328a',
    thTextColor: '#01328a',
    borderColor: 'none'
  },
  InputNumber: {
    borderHover: 'none'
  }
}
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <main>
      <n-modal v-model:show="showModal" title="Approve Return" preset="card">
        <n-upload ref="upload" accept=".json" @change="handleChange" :default-upload="false">
          <n-button>Import wallet</n-button>
        </n-upload>
        <n-input-group>
          <n-input
            v-model:value="password"
            type="password"
            show-password-on="click"
            placeholder="Enter wallet password"
            :minlength="12"
          />
        </n-input-group>
        <n-button @click="loadWallet" :loading="loading"> Confirm </n-button>
      </n-modal>
      <n-card title="Sell Tickets">
        <n-space vertical>
          <label>Attendee wallet address</label>
          <n-input-group>
            <n-input v-model:value="walletAddress" type="text" placeholder="Enter wallet address" />
            <n-button @click="viewAttendeeTickets"> View ticket balance </n-button>
          </n-input-group>
          <n-input-group>
            <n-tag>{{
              attendeeTicketBalance
                ? `${attendeeTicketBalance} ticket(s) in wallet`
                : '- ticket(s) in wallet'
            }}</n-tag>
          </n-input-group>
        </n-space>
        <n-table
          :bordered="false"
          single-column
          :single-line="false"
          size="large"
          clearable="false"
        >
          <thead>
            <tr>
              <th>Ticket</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Regular</td>
              <td>{{ ticketPrice }} SETH</td>
              <td>
                <n-input-number
                  id="ticketQuantity"
                  style="width: 50%"
                  v-model:value="ticketQuantity"
                  button-placement="both"
                  :min="minQuantity"
                  :max="maxQuantity"
                  :step="1"
                />
              </td>
            </tr>
            <tr>
              <td style="font-weight: bold">Total</td>
              <td style="font-weight: bold">{{ totalRefund }} SETH</td>
              <td><n-button @click="showModal = true">Sell</n-button></td>
            </tr>
          </tbody>
        </n-table>
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
  margin: 0px 10px 10px 0px;
}

.n-button {
  text-transform: uppercase;
}
</style>
