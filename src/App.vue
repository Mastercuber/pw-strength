<script async setup>
import PasswordStrength from './components/PasswordStrength.vue'
</script>

<template>
  <form action="/">
    <input id="password" type="password" required style="width: 50%; margin-bottom: 12px; padding: 12px; appearance: none" placeholder="***">
    <PasswordStrength for="password"/>
    <input type="submit">
    <div>
      <h3>Irgendas</h3>
      <p>Noch was</p>
    </div>
    <input type="email" required>

    <input id="password2" type="password" required style="width: 50%">
    <PasswordStrength for="password2"/>
  </form>
</template>

<style>
* {
  box-sizing: border-box;
}
html, body {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
