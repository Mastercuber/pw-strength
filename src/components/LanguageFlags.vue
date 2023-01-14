<template>
  <div class="language-indicator-container">
      <span v-for="(lang, index) in langs" :key="lang.locale" class="language-indicator" @click="setLang(lang.locale)" :title="lang.title">
        <span v-html="lang.flag"></span>
      </span>
  </div>
</template>

<script setup>
import {useI18n} from 'vue-i18n'

const { locale } = useI18n()

const langs = [
  {
    locale: 'de',
    flag: '&#127465&#127466',
    title: 'German'
  },
  {
    locale: 'en',
    flag: '&#127468&#127463',
    title: 'English'
  },
  {
    locale: 'fr',
    flag: '&#127467&#127479',
    title: 'French'
  }
]

function setLang(l = 'en') {
  locale.value = l
}

</script>

<style>
  @import "/src/assets/css/global/common.css";
</style>

<style scoped>

  @media all and (max-width: 600px) {
    .language-indicator-container {
      width: max(80px, 10vw);
      opacity: 0.65;
      height: 100vh;
    }
  }
  @media all and (max-width: 1300px) {
    .language-indicator-container {
      opacity: 0.65;
    }
  }

  .language-indicator-container .language-indicator:last-child span {
    width: 100%;
    height: 100%;
    position: relative;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 0 4px 0px;
  }

  .language-indicator-container {
    position: absolute;
    overflow-y: auto;
    overflow-x: hidden;
    z-index: 2;
    width: 20vw;
  }

  .language-indicator {
    width: 60px;
    height: 60px;
    position: relative;
    display: inline-block;
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 4px;
    background: lightblue;
    cursor: pointer;
    padding: 5px 7px;
    margin: 4px;
    font-weight: bold;
    font-size: 40px;
    user-select: none;
  }
</style>
