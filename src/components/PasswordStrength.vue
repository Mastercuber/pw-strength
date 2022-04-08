<template>
  <transition name="pws-slide-up">
    <div v-if="isVisible" class="pws-container" ref="container">
      <div>
        <input id="pws-checkbox-hasValidLength" type="checkbox" v-model="hasValidLength">
        <label for="pws-checkbox-hasValidLength">{{t('pws.validLength')}}</label>
      </div>
      <div v-if="props.needCapital">
        <input id="pws-checkbox-needUpperCaseChar" type="checkbox" disabled v-model="containsCapital">
        <label for="pws-checkbox-needUpperCaseChar">{{t('pws.containsCapital')}}</label>
      </div>
      <div v-if="props.needSpecialChar">
        <input id="pws-checkbox-needSpecialChar" type="checkbox" disabled v-model="containsSpecialChar">
        <label for="pws-checkbox-needSpecialChar">{{t('pws.containsSpecialChar')}}</label>
      </div>
      <div v-if="props.needDigit">
        <input id="pws-checkbox-needDigit" type="checkbox" v-model="containsDigit">
        <label for="pws-checkbox-needDigit">{{t('pws.containsDigit')}}</label>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, onMounted, withDefaults, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const hasValidLength = ref(false)
const containsSpecialChar = ref(false)
const containsCapital = ref(false)
const containsDigit = ref(false)
const isVisible = ref(false)
const container = ref(null)

interface Props {
  for: string,
  minLength?: number,
  maxLength?: number,
  needSpecialChar?: boolean,
  needCapital?: boolean,
  needDigit?: boolean,
  specialCharacters?: RegExp,
  // CSS Props
  backgroundColor?: string,
  boxShadow?: string,
  checkboxTransition?: string,
  passwordInputTransition?: string
}

const props = withDefaults(defineProps<Props>(), {
  minLength: 10,
  maxLength: 140,
  needSpecialChar: true,
  needCapital: true,
  needDigit: true,
  specialCharacters: /!|§|\$|%|&|\/|\(|\)|=|\?|\*|\+|~|#|-|_|\.|:|,|;|\^|°/,
  backgroundColor: 'rgba(220, 230, 240, 1)',
  boxShadow: '0 0 2px #2c3e50',
  checkboxTransition: '0.6s',
  passwordInputTransition: '0.4s'
})
// CSS Vars
const backgroundColor = props.backgroundColor
const boxShadow = props.boxShadow
const checkboxTransition = props.checkboxTransition
const passwordInputTransition = props.passwordInputTransition
onMounted(() => {
  document.documentElement.style.setProperty('--pws-password-background-transition', `${passwordInputTransition}`)
})

function setValidationMessage(el: HTMLInputElement) {
  if (!hasValidLength.value) return
  else if (!containsCapital.value) el.setCustomValidity(t('pws.hint.needCapital'))
  else if (!containsSpecialChar.value) el.setCustomValidity(t('pws.hint.needSpecialChar'))
  else if (!containsDigit.value) el.setCustomValidity(t('pws.hint.needDigit'))
}

function checkPw(event: { target: HTMLInputElement }) {
  const pw: string = event.target.value
  hasValidLength.value = pw.length >= props.minLength && pw.length <= props.maxLength
  containsCapital.value = /[A-Z]/.test(pw)
  containsSpecialChar.value = props.specialCharacters.test(pw)
  containsDigit.value = /[0-9]/.test(pw)

  if (hasValidLength.value
      && containsCapital.value
      && containsSpecialChar.value
      && containsDigit.value)
    event.target.setCustomValidity('')
  else setValidationMessage(event.target)
}

function positionHint(el: HTMLInputElement) {
  container.value.style.setProperty('--pws-hint-left', `${el.offsetLeft}px`)
  container.value.style.setProperty('--pws-hint-top', `${el.offsetTop + el.clientHeight + 15}px`)
}

function preparePasswordInputElement(el: HTMLInputElement) {
  if (el) {
    el.addEventListener('input', checkPw)
    el.addEventListener('focus', () => {
      isVisible.value = true;
      nextTick(() => { positionHint(el) })
    })
    el.addEventListener('blur', () => { isVisible.value = false })
    el.minLength = props.minLength
    el.maxLength = props.maxLength
    el.size = props.maxLength
    el.autocomplete = 'new-password'

    let pattern = ''
    if (props.needDigit) pattern += '(?=.*[0-9])'
    if (props.needLowerCaseChar) pattern += '(?=.*[a-z])'
    if (props.needCapital) pattern += '(?=.*[A-Z])'
    if (props.needSpecialChar) pattern += `(?=.*(${props.specialCharacters.source}))`
    el.pattern = pattern + `.{${props.minLength},${props.maxLength}}`
  }
}

onMounted(() => {
  const el: HTMLInputElement = document.getElementById(props.for) as HTMLInputElement
  preparePasswordInputElement(el)
})
</script>

<style>
  input[type=password] {
    transition: background var(--pws-password-background-transition);
  }
  input[type=password]:focus:valid {
    background: rgba(0, 255, 1, 0.2);
    outline: 2px outset rgba(0,255,1,0.4);
  }
  input[type=password]:focus:invalid {
    background: rgba(252,0,2,0.4);
    outline: 2px outset rgba(252,0,2,0.4);
  }
</style>

<style scoped>
  .pws-slide-up-enter-from::before {
    top: -20px;
  }
  .pws-slide-up-enter-to::before {
    top: 0;
  }
  .pws-slide-up-enter-active::before {
    transition: top 0.4s ease;
  }
  .pws-slide-up-enter-from {
    opacity: 0;
    margin-top: 20px;
  }
  .pws-slide-up-enter-to {
    opacity: 1;
    margin-top: 0;
  }
  .pws-slide-up-enter-active {
    transition: margin-top 0.4s ease, opacity 0.4s ease;
  }
  .pws-slide-up-leave-from {
    opacity: 1;
    margin-top: 0;
  }
  .pws-slide-up-leave-to {
    opacity: 0;
    margin-top: 20px;
  }
  .pws-slide-up-leave-active {
    transition: margin-top 0.4s ease, opacity 0.4s ease;
  }

  .pws-container::before {
    content: '';
    position: absolute;
    z-index: -1;
    left: 8px;
    top: -8px;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;

    border-bottom: 8px solid v-bind(backgroundColor);
  }
  .pws-container {
    background: v-bind(backgroundColor);
    position: absolute;
    text-align: left;
    padding: 1rem;
    line-height: 1.3;
    box-shadow: v-bind(boxShadow);
    --pws-hint-left: 0;
    --pws-hint-top: 0;
    left: var(--pws-hint-left);
    top: var(--pws-hint-top);
  }
  input[type=checkbox] {
    color: limegreen;
    background: white;
    appearance: none;
    width: 12px;
    height: 12px;
    border: 1px solid lightslategray;
    margin: auto 4px auto 0;
    box-shadow: 0 0 1px inset lightslategray;
    position: relative;
    transition: v-bind(checkboxTransition);
  }
  input[type=checkbox]:checked {
    border-color: green;
    box-shadow: 0 0 1px inset green;
  }
  input[type=checkbox]::before {
    content: "\2713";
    color: green;
    top: -2px;
    position: absolute;
    transition: v-bind(checkboxTransition);
    opacity: 0;
  }
  input[type=checkbox]:checked::before {
    opacity: 1;
  }
  label {
    user-select: none;
  }
</style>

<i18n>
{
  "de": {
    "pws": {
      "hint": {
        "needCapital": "Ein Großbuchstabe wird benötigt",
        "needSpecialChar": "Ein Spezialzeichen wird benötigt",
        "needDigit": "Eine Zahl wird benötigt"
      },
      "validLength": "Gültige Länge",
      "minLength": "Mindestlänge",
      "maxLength": "Maximallänge",
      "containsSpecialChar": "Beinhaltet Sonderzeichen",
      "containsCapital": "Beinhaltet Großbuchstabe",
      "containsDigit": "Beinhaltet Zahl"
    }
  },
  "en": {
    "pws": {
      "hint": {
        "needCapital": "An upper case letter is required",
        "needSpecialChar": "A special character is required",
        "needDigit": "A digit is required"
      },
      "validLength": "Valid length",
      "minLength": "Minimum length",
      "maxLength": "Maximum length",
      "containsSpecialChar": "Contains special character",
      "containsCapital": "Contains capital",
      "containsDigit": "Contains digit"
    }
  },
  "fr": {
    "pws": {
      "hint": {
        "needCapital": "Au moins une lettre majuscule",
        "needSpecialChar": "Au moins un caractère spécial",
        "needDigit": "Au moins un chiffre"
      },
      "validLength": "Longueur valide",
      "minLength": "Longueur minimale",
      "maxLength": "Longueur maximale",
      "containsSpecialChar": "Contient des caractères spéciaux",
      "containsCapital": "Contient une majuscule",
      "containsDigit": "Comprend le nombre"
    }
  }
}
</i18n>
