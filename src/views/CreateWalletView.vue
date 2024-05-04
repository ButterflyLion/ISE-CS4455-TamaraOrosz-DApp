<script></script>

<template>
  <main>
    <h1>Welcome!</h1>
    <n-card class="card" style="color: #01328a">
      <n-input type="password" show-password-on="click" placeholder="Set your wallet password" :maxlength="20" name="passwordInput" />
    </n-card>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  padding: 15px 15px 15px 15px;
  text-align: center;
  text-transform: uppercase;
  color: #fe15c6;
}

.card {
  padding: 20px;
  background-color: #ccebff;
  text-align: center;
  text-transform: uppercase;
  color: #01328a;
}
.card title {
  color: #01328a;
}
</style>
