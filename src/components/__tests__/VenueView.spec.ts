import { describe, it, expect, vi } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import VenueView from '@/components/wallets/VenueView.vue'
import Web3 from 'web3'

const mockTotalSupply = '1000';
const mockTicketBalance = '300';

const mockContractMethods = {
  totalSupply: vi.fn().mockReturnThis(),
  contractBalance: vi.fn().mockReturnThis(),
  call: vi.fn()
};

mockContractMethods.call.mockImplementation(async function () {
  if (mockContractMethods.totalSupply().call()) {
    return mockTotalSupply;
  }
  if (mockContractMethods.contractBalance().call()) {
    return mockTicketBalance;
  }
});

vi.mock('web3', () => {
  return {
    default: vi.fn().mockImplementation(() => {
      return {
        eth: {
          Contract: vi.fn().mockImplementation(() => {
            return {
              methods: mockContractMethods
            };
          })
        }
      };
    })
  };
});

describe('VenueView', () => {
  
  it('renders view properly and updates on button click', async () => {

    const wrapper = mount(VenueView);

    const button = wrapper.find('n-button');
    expect(button.text()).toContain('Get balance');
    expect(button.exists()).toBe(true);

    const tdElements = wrapper.findAll('td');
    expect(tdElements.at(0)?.text()).toContain('...');
    expect(tdElements.at(1)?.text()).toContain('...');
    expect(tdElements.at(2)?.text()).toContain('...');

    await button.trigger('click');

    await new Promise(resolve => setTimeout(resolve, 2000));
    await nextTick();

    const updatedTdElements = wrapper.findAll('td');
    expect(updatedTdElements.at(0)?.text()).toContain(mockTotalSupply);
    expect(updatedTdElements.at(1)?.text()).toContain((parseInt(mockTotalSupply) - parseInt(mockTicketBalance)).toString());
    expect(updatedTdElements.at(2)?.text()).toContain(mockTicketBalance);
  });
});
