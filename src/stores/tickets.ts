import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTicketStore = defineStore('tickets', () => {
  const ushers = ref([
    {
      name: 'Kairi',
      walletAddress: '0x2BDF7bB097f086335e434157D7FF15373f13Dd9C',
      ticketsCollected: 0
    },
    {
      name: 'Amani',
      walletAddress: '0xA6d82FFD260A65B1c1C6925815Cde63d69594f33',
      ticketsCollected: 0
    },
    {
      name: 'Mateo',
      walletAddress: '0xDe91b7A0f6e1775a54cC73B88Bb6fe0902aa95ec',
      ticketsCollected: 0
    }
  ])
  
  const collectTicket = (usherWalletAddress: string, ticketQuantity: number) => {
    const usher = ushers.value.find(usher => usher.walletAddress === usherWalletAddress)
    if (usher) {
      usher.ticketsCollected += ticketQuantity
    } else {
      alert('Not a valid usher wallet address.')
    }
  }

  return { ushers, collectTicket}
})
