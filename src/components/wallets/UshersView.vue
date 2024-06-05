<script setup lang="ts">
import {
  NConfigProvider,
  type GlobalThemeOverrides,
  type StepsProps,
  type UploadFileInfo
} from 'naive-ui'
import { ref } from 'vue'
import { useTicketStore } from '@/stores/tickets'
import Web3 from 'web3'
import ABI from '../../../contract/ABI'

const web3 = new Web3('https://rpc2.sepolia.org')

const ticketTokenAddress = ref('0x5F16813bAf39c710aFCB26F04Ef0E19a5ee1F653')
const contract = new web3.eth.Contract(ABI, ticketTokenAddress.value)

const attendeeWalletAddress = ref('')
const attendeeTicketBalance = ref()
const attendeePassword = ref('')
const attendeePrivateKey = ref('')
const attendeeHasTickets = ref(false)

const upload = ref<UploadFileInfo | null>(null)
const fileListLengthRef = ref(0)

const ticketQuantity = ref(1)
const minQuantity = 1
const maxQuantity = attendeeTicketBalance.value

const currentStatus = ref<StepsProps['status']>('process')
const current = ref<number>(1)

const ticketStore = useTicketStore()
const usherWalletAddress = ref('')
const usherTicketBalance = ref()

const viewAttendeeTickets = async () => {
  if (attendeeWalletAddress.value === '') {
    alert('Please enter a wallet address')
    return
  }
  if (web3.utils.isAddress(attendeeWalletAddress.value)) {
    await contract.methods
      .balanceOf(attendeeWalletAddress.value)
      .call()
      .then(function (balance: any) {
        attendeeTicketBalance.value = balance
      })
    if (attendeeTicketBalance.value > 0) {
      attendeeHasTickets.value = true
      console.log('attendeeHasTickets', attendeeHasTickets.value)
      next()
    }
  } else {
    alert('Invalid attendee token address given')
  }
}

const next = () => {
  if (current.value >= 3) {
    reset()
  } else {
    current.value += 1
  }
}

const reset = () => {
  attendeeWalletAddress.value = ''
  attendeeTicketBalance.value = undefined
  attendeePassword.value = ''
  attendeePrivateKey.value = ''
  attendeeHasTickets.value = false
  upload.value = null
  fileListLengthRef.value = 0
  ticketQuantity.value = 1
  current.value = 1
}

const handleChange = (data: { fileList: UploadFileInfo[] }) => {
  fileListLengthRef.value = data.fileList.length
  if (data.fileList.length > 0) {
    upload.value = data.fileList[0]
  } else {
    upload.value = null
  }
}

const decryptWallet = async (keystore: string, password: string) => {
  try {
    const wallet = await web3.eth.accounts.decrypt(keystore, password)
    if (attendeeWalletAddress.value === wallet.address) {
      attendeePrivateKey.value = wallet.privateKey
    } else {
      alert('Wallet address mismatch')
    }
  } catch (error) {
    console.error('Error decrypting wallet file', error)
    alert('Error parsing wallet file')
  }
}

const loadWallet = async () => {
  if (upload.value === null) {
    alert('Please upload a wallet file')
    return
  }
  if (attendeePassword.value === '') {
    alert('Please enter a password')
    return
  }
  const reader = new FileReader()
  reader.onload = async (e) => {
    const result = e.target?.result
    try {
      const keystore = result ? JSON.parse(result.toString()) : null
      await decryptWallet(keystore, attendeePassword.value)
      console.log('attendeePrivateKey', attendeePrivateKey.value)
    } catch (error) {
      console.error('Error decrypting wallet file', error)
      alert('Error parsing wallet file')
    }
  }
  if (upload.value !== null) {
    console.log('Reading file')
    reader.readAsText(upload.value.file as File)
    next()
  } else {
    alert('Please upload a wallet file')
  }
}

const viewUsherTickets = async () => {
  if (usherWalletAddress.value === '') {
    alert('Please enter a valid USHER wallet address')
    return
  }
  if (
    web3.utils.isAddress(usherWalletAddress.value) &&
    ticketStore.ushers.some((usher: any) => usher.walletAddress === usherWalletAddress.value)
  ) {
    usherTicketBalance.value = ticketStore.ushers.find(
      (usher: any) => usher.walletAddress === usherWalletAddress.value
    )?.ticketsCollected
  } else {
    alert('Invalid usher token address given')
  }
}

const collectTicket = async () => {
  await viewUsherTickets()
  console.log('after viewUsherTickets()')
  if (attendeeWalletAddress.value === '' || usherWalletAddress.value === '') {
    alert('Please enter both attendee and usher wallet addresses')
    return
  }

  if (ticketQuantity.value > attendeeTicketBalance.value) {
    alert('Not enough tickets in attendee wallet')
    return
  }

  const transaction = contract.methods.transfer(ticketTokenAddress.value, ticketQuantity.value)
  const encodedABI = transaction.encodeABI()
  const gasPrice = await web3.eth.getGasPrice()

  const tx = {
    from: attendeeWalletAddress.value,
    to: ticketTokenAddress.value,
    data: encodedABI,
    gas: await web3.eth.estimateGas({
      from: attendeeWalletAddress.value,
      to: ticketTokenAddress.value,
      data: encodedABI
    }),
    gasPrice: gasPrice
  }

  await web3.eth.accounts.signTransaction(tx, attendeePrivateKey.value).then(function (signedTx) {
    web3.eth.sendSignedTransaction(signedTx.rawTransaction).on('receipt', function (receipt) {
      console.log('Transaction receipt:', receipt)
    })

    if (ticketQuantity.value > 1) {
      ticketStore.collectTicket(usherWalletAddress.value, ticketQuantity.value)
      alert('Tickets collected')
    } else {
      ticketStore.collectTicket(usherWalletAddress.value, ticketQuantity.value)
      alert('Ticket collected')
    }
  })

  await viewUsherTickets()
  next()
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
  Divider: {
    color: '#fe15c6'
  },
  Steps: {
    indicatorColorProcess: '#fe15c6',
    indicatorBorderColorProcess: '#fe15c6',
    indicatorColorFinish: '#fe15c6',
    headerTextColorProcess: '#01328a'
  },
  Upload: {
    itemIconColor: '#fe15c6',
    itemTextColor: '#fe15c6'
  }
}
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <main>
      <n-space>
        <n-steps vertical :current="(current as number)" :status="currentStatus">
          <n-step title="Check tickets of attendee">
            <n-card>
              <label>Attendee wallet address</label>
              <n-input-group>
                <n-input
                  v-model:value="attendeeWalletAddress"
                  type="text"
                  placeholder="Enter wallet address"
                />
                <n-button @click="viewAttendeeTickets"> View ticket balance </n-button>
              </n-input-group>
              <n-input-group>
                <n-tag>{{
                  attendeeTicketBalance
                    ? `${attendeeTicketBalance} ticket(s) in wallet`
                    : '- ticket(s) in wallet'
                }}</n-tag>
              </n-input-group>
            </n-card>
          </n-step>
          <n-step title="Verify attendee identity">
            <n-card>
              <n-input-group>
                <n-upload
                  ref="upload"
                  accept=".json"
                  @change="handleChange"
                  :default-upload="false"
                >
                  <n-button>Import wallet</n-button>
                </n-upload>
              </n-input-group>
              <n-input-group>
                <n-input
                  v-model:value="attendeePassword"
                  type="password"
                  show-password-on="click"
                  placeholder="Attendee should enter their wallet password"
                  :minlength="12"
                />
                <n-button @click="loadWallet"> Verify </n-button>
              </n-input-group>
            </n-card>
          </n-step>
          <n-step title="Admit attendee">
            <n-card>
              <label>Usher wallet address</label>
              <n-input-group>
                <n-input-number
                  id="ticketQuantity"
                  style="width: 20%"
                  v-model:value="ticketQuantity"
                  button-placement="both"
                  :min="minQuantity"
                  :max="maxQuantity"
                  :step="1"
                />
                <n-input
                  v-model:value="usherWalletAddress"
                  type="text"
                  placeholder="Enter wallet address"
                />
                <n-button @click="collectTicket"> Admit </n-button>
              </n-input-group>
              <n-input-group>
                <n-tag>{{
                  usherTicketBalance !== undefined
                    ? `${usherTicketBalance} ticket(s) collected altogether`
                    : '- ticket(s) collected'
                }}</n-tag>
              </n-input-group>
            </n-card>
          </n-step>
        </n-steps>
      </n-space>
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
}
</style>
