<script setup>
import PasswordStrength from './components/PasswordStrength.vue'
</script>

<template>
  <form action="/">
    <label for="password" style="display: block">Passwort</label>
    <input
      id="password"
      type="password"
      required
      style="width: 50%; margin-bottom: 12px; padding: 12px; appearance: none"
      placeholder="***"
    >
    <PasswordStrength for="password" confirm-id="passwordConfirmation"/>
    <label for="passwordConfirmation" style="display: block">Passwort Bestätigung</label>
    <input
      id="passwordConfirmation"
      type="password"
      required
      autocomplete="off"
      style="width: 50%"
    >
    <input type="submit">
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
