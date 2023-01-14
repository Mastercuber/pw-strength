<script setup>
import PasswordStrength from './components/PasswordStrength.vue'
import LanguageFlags from './components/LanguageFlags.vue'</script>

<template>
  <div style="position: relative; z-index: 2">
    <LanguageFlags style="position: absolute; z-index: 2;" />
    <form action="/" style="position: relative; z-index: 1;">
      <label for="password" style="display: block">Password</label>
      <input
          id="password"
          type="password"
          required
          style="width: 50%; margin-bottom: 12px; padding: 12px; appearance: none"
          placeholder="***"
          pws
      >
      <PasswordStrength for="password" confirm-id="passwordConfirmation"/>
      <label for="passwordConfirmation" style="display: block">Password Confirmation</label>
      <input
          id="passwordConfirmation"
          type="password"
          required
          autocomplete="off"
          style="width: 50%; margin-bottom: 12px; padding: 12px; appearance: none"
      >
      <input style="display: block; margin-left: auto; margin-right: auto" type="submit">
    </form>
  </div>
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
