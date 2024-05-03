<script setup>
import { FacebookFilled } from '@vicons/material'
import { InstagramFilled } from '@vicons/antd'
import { NIcon } from 'naive-ui'
</script>

<template>
  <footer className="footer">
    <div>
      <a href="/">
        <img alt="Logo" class="logo" src="@/assets/logo.svg" width="80" />
      </a>
      <p style="text-align: center">© Tamara Orosz, 2024. All rights reserved.</p>
    </div>
    <div class="footer-section">
      <p>Info</p>
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
      <a href="/news">News</a>
    </div>
    <div class="footer-section">
      <p>Help</p>
      <a href="/faqs">FAQs</a>
      <a href="/help">Customer Support</a>
      <a href="/privacy-policy">Privacy Policy</a>
      <a href="/terms-of-service">Terms of Service</a>
    </div>
    <div>
      <p>Follow us on social media</p>
      <n-icon size="30" color="#FE15C6">
        <FacebookFilled />
        <InstagramFilled />
      </n-icon>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  display: flex;
  justify-content: space-around;
  background-color: #ccebff;
  align-self: end;
  width: 100%;
  padding: 20px;
  text-align: center;
}

.footer p {
  color: #01328a;
  text-decoration: none;
  text-transform: uppercase;
  padding: 0px 15px 0px 15px;
  text-align: left;
}

.footer a {
  font-size: medium;
  text-decoration: none;
  padding: 0px 15px 0px 15px;
  text-align: left;
}

.footer-section {
  display: flex;
  flex-direction: column;
}

@media (hover: hover) {
  a:hover {
    color: #FE15C6;
  }
}
</style>
