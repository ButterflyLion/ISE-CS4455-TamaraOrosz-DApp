<script setup lang="ts">
import { NConfigProvider, type GlobalThemeOverrides } from 'naive-ui'
import { RouterLink } from 'vue-router'
import { WalletOutlined } from '@vicons/antd'
import { TicketOutline } from '@vicons/ionicons5'
import { MoneyHand20Regular } from '@vicons/fluent'

const themeOverrides: GlobalThemeOverrides = {
  Button: {
    colorHover: '#01328a',
    textColor: '#01328a',
    textColorHover: '#cce6ff',
    color: '#fe15c6',
    border: 'none',
    borderHover: 'none',
    colorPressed: '#fe15c6',
    borderPressed: 'none',
    textColorPressed: '#01328a',
    textColorGhostPressed: '#01328a',
    textColorTextPressed: '#01328a',
    textColorFocus: '#01328a'
  }
}
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <main>
      <div id="hero-image">
        <div class="wrapper">
          <div class="overlay"></div>
          <h2>
            <strong>The Future of Ticketing is Here</strong><br />
            <span style="text-transform: none; font-weight: 100">Secure your place.<br /></span>
            <span style="text-transform: none; font-weight: 100">See you there.</span>
          </h2>
          <RouterLink to="/buy-ticket">
            <n-button>Get tickets</n-button>
          </RouterLink>
        </div>
      </div>
      <div id="features">
        <div class="wrapper">
          <n-card>
            <n-grid cols="3" :x-gap="40" item-responsive>
              <n-grid-item>
                <n-icon size="70" color="#FE15C6">
                  <WalletOutlined />
                </n-icon>
                <h4>Get Started with a Secure Wallet</h4>
                <p>
                  Create a free account on the Sepolia testnet blockchain. This acts as your digital
                  wallet to securely store funds and manage your tickets.
                </p>
                <RouterLink to="/create-wallet">
                  <n-button>Get Started</n-button>
                </RouterLink>
              </n-grid-item>

              <n-grid-item>
                <n-icon size="70" color="#FE15C6"><TicketOutline /></n-icon>
                <h4>Buy Tickets with Confidence</h4>
                <p>
                  Use your wallet balance to purchase event tickets directly from our secure
                  platform. No more worrying about scams or lost tickets!
                </p>
                <RouterLink to="/buy-ticket">
                  <n-button>Buy Tickets</n-button>
                </RouterLink>
              </n-grid-item>

              <n-grid-item>
                <n-icon size="70" color="#FE15C6"><MoneyHand20Regular /></n-icon>
                <h4>Resell Tickets Effortlessly</h4>
                <p>
                  Can't make it to an event? Simply return your purchased tickets through our
                  platform and get a refund back to your wallet.
                </p>
                <RouterLink to="/sell-ticket">
                  <n-button>Resell Tickets</n-button>
                </RouterLink>
              </n-grid-item>
            </n-grid>
          </n-card>
        </div>
      </div>
    </main>
  </n-config-provider>
</template>

<style scoped>
.n-button {
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 20px;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  position: relative;
  z-index: 2;
}

.n-card {
  border-style: none;
  margin: 20px 20px 20px 20px;
  width: 100%;
  max-width: 1200px;
}

.wrapper {
  margin: 0 auto;
  padding: 0 10px;
  min-height: 100px;
}

#hero-image {
  min-height: 600px;
  width: 100%;
  background: url('src/assets/Blockchain checking tickets.png') no-repeat center;
  background-size: cover;
  position: relative;
}
#hero-image h2 {
  margin: 180px 0 40px 0;
  position: relative;
  z-index: 2;
}

.overlay {
  background: #01328a;
  height: 60%;
  width: 100%;
  opacity: 0.5;
  position: absolute;
  top: 50;
  left: 0;
  z-index: 1;
}

p {
  line-height: 1.5;
  margin-bottom: 20px;
  text-transform: none;
  text-align: justify;
  color: #01328a;
}

h2 {
  font-weight: 300;
  color: #fe15c6;
  font-size: 55px;
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 20px;
}

h4 {
  font-size: 18px;
  color: #fe15c6;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 20px;
}
</style>
