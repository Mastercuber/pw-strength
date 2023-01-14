<template>
  <transition name="pws-slide-up">
    <div
      v-if="isVisible"
      ref="container"
      class="pws-container"
    >
      <div>
        <input
          id="pws-checkbox-hasValidLength"
          v-model="hasValidLength"
          type="checkbox"
          disabled
        >
        <label for="pws-checkbox-hasValidLength">{{ t('pws.validLength') }}</label>
      </div>
      <div v-if="props.needLowerCaseChar">
        <input
          id="pws-checkbox-needLowerCaseChar"
          v-model="containsLowerCaseChar"
          type="checkbox"
          disabled
        >
        <label for="pws-checkbox-needLowerCaseChar">{{ t('pws.containsLowerCaseChar') }}</label>
      </div>
      <div v-if="props.needCapital">
        <input
          id="pws-checkbox-needCapital"
          v-model="containsCapital"
          type="checkbox"
          disabled
        >
        <label for="pws-checkbox-needCapital">{{ t('pws.containsCapital') }}</label>
      </div>
      <div v-if="props.needSpecialChar">
        <input
          id="pws-checkbox-needSpecialChar"
          v-model="containsSpecialChar"
          type="checkbox"
          disabled
        >
        <label for="pws-checkbox-needSpecialChar">{{ t('pws.containsSpecialChar') }}</label>
      </div>
      <div v-if="props.needDigit">
        <input
          id="pws-checkbox-needDigit"
          v-model="containsDigit"
          type="checkbox"
          disabled
        >
        <label for="pws-checkbox-needDigit">{{ t('pws.containsDigit') }}</label>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import {nextTick, onMounted, ref, withDefaults} from 'vue'
import {useI18n} from 'vue-i18n'

const { t } = useI18n()

const hasValidLength = ref(false)
const containsSpecialChar = ref(false)
const containsLowerCaseChar = ref(false)
const containsCapital = ref(false)
const containsDigit = ref(false)
const isVisible = ref(false)
const container = ref(null)

let el: HTMLInputElement
let confirmEl: HTMLInputElement

interface Props {
  for: string,
  confirmId?: string,
  minLength?: number,
  maxLength?: number,
  needSpecialChar?: boolean,
  needLowerCaseChar?: boolean,
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
  needLowerCaseChar: true,
  needCapital: true,
  needDigit: true,
  specialCharacters: /!|§|\$|%|&|\/|\(|\)|=|\?|\*|\+|~|#|-|_|\.|:|,|;|\^|°/,
  backgroundColor: 'rgba(220, 230, 240, 1)',
  boxShadow: '0 0 2px #2c3e50',
  checkboxTransition: '0.6s',
  passwordInputTransition: '0.4s'
})

onMounted(() => {
  document.documentElement.style.setProperty('--pws-password-background-transition', `${props.passwordInputTransition}`)

  el = document.getElementById(props.for) as HTMLInputElement
  preparePasswordInputElement(el)

  if ('confirmId' in props && props.confirmId && props.confirmId !== '') {
    confirmEl = document.getElementById(props.confirmId) as HTMLInputElement
    preparePasswordConfirmInputElement(confirmEl)
  }
})

function setValidationMessage(el: HTMLInputElement) {
  if (!hasValidLength.value) return
  else if (!containsLowerCaseChar.value) el.setCustomValidity(t('pws.hint.needLowerCaseChar'))
  else if (!containsCapital.value) el.setCustomValidity(t('pws.hint.needCapital'))
  else if (!containsSpecialChar.value) el.setCustomValidity(t('pws.hint.needSpecialChar'))
  else if (!containsDigit.value) el.setCustomValidity(t('pws.hint.needDigit'))
}

function checkPw(event: { target: HTMLInputElement }) {
  const pw: string = event.target.value
  hasValidLength.value = pw.length >= props.minLength && pw.length <= props.maxLength
  containsCapital.value = /[A-Z]/.test(pw)
  containsLowerCaseChar.value = /[a-z]/.test(pw)
  containsSpecialChar.value = props.specialCharacters.test(pw)
  containsDigit.value = /[0-9]/.test(pw)

  if (hasValidLength.value
      && containsLowerCaseChar.value
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

function checkEquality() {
  if (el.value === confirmEl.value) {
    confirmEl.setCustomValidity('')
    confirmEl.title = t('pws.passwordsMatch')
  } else {
    confirmEl.title = t('pws.passwordsNotMatch')
    confirmEl.setCustomValidity(t('pws.passwordsNotMatch'))
  }
}

function preparePasswordConfirmInputElement(el: HTMLInputElement) {
  if (el) {
    el.addEventListener('input', checkEquality)
    el.autocomplete = 'off'
  }
}

function preparePasswordInputElement(el: HTMLInputElement) {
  if (el) {
    el.addEventListener('input', checkPw)
    el.addEventListener('focus', () => {
      isVisible.value = true
      nextTick(() => {
        positionHint(el)
      })
    })
    el.addEventListener('blur', () => {
      isVisible.value = false
    })
    el.minLength = props.minLength
    el.maxLength = props.maxLength
    el.size = props.minLength * 3
    el.autocomplete = 'new-password'

    let pattern = ''
    if (props.needDigit) pattern += '(?=.*[0-9])'
    if (props.needLowerCaseChar) pattern += '(?=.*[a-z])'
    if (props.needCapital) pattern += '(?=.*[A-Z])'
    if (props.needSpecialChar) pattern += `(?=.*(${props.specialCharacters.source}))`
    el.pattern = `${pattern}.{${props.minLength},${props.maxLength}}`
  }
}
</script>

<style>
  input[type=password][pws], input[type=password][pws-confirm] {
    transition: background-color var(--pws-password-background-transition), padding-left 0.4s;
  }
  input[type=password][pws]:not(.icon-right):not(.icon-right-1):not(.icon-right-2):focus:valid, input[type=password][pws-confirm]:not(.icon-right):not(.icon-right-1):not(.icon-right-2):focus:valid {
    outline: 2px outset rgba(0,255,1,0.4);
    background: rgba(0, 255, 1, 0.2) url("../assets/hint-valid.svg") no-repeat left 0.4em center;
    background-size: 1.7em 1.7em;
    padding-left: 2.4em !important;
  }
  input[type=password][pws]:not(.icon-right):not(.icon-right-1):not(.icon-right-2):focus:invalid, input[type=password][pws-confirm]:not(.icon-right):not(.icon-right-1):not(.icon-right-2):focus:invalid {
    outline: 2px outset rgba(252,0,2,0.4);
    background: rgba(252, 0, 2, 0.4) url("../assets/hint-invalid.svg") no-repeat left 0.4em center;
    background-size: 1.7em 1.7em;
    padding-left: 2.4em !important;
  }
  input[type=password][pws].icon-right:focus:invalid, input[type=password][pws-confirm].icon-right-1:focus:invalid, input[type=password][pws-confirm].icon-right-2:focus:invalid {
    outline: 2px outset rgba(252,0,2,0.4);
    background: rgba(252, 0, 2, 0.4) url("../assets/hint-invalid.svg") no-repeat right 0.4em center;
    background-size: 1.7em 1.7em;
  }
  input[type=password][pws].icon-right:focus:valid, input[type=password][pws-confirm].icon-right-1:focus:valid, input[type=password][pws-confirm].icon-right-2:focus:valid {
    outline: 2px outset rgba(0,255,1,0.4);
    background: rgba(0, 255, 1, 0.2) url("../assets/hint-valid.svg") no-repeat right 0.4em center;
    background-size: 1.7em 1.7em;
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
  .pws-slide-up-leave-to, .pws-slide-up-enter-from {
    opacity: 0;
    margin-top: 20px;
  }
  .pws-slide-up-enter-active, .pws-slide-up-leave-active {
    transition: margin-top 0.4s ease, opacity 0.4s ease;
  }
  .pws-slide-up-enter-to, .pws-slide-up-leave-from {
    opacity: 1;
    margin-top: 0;
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
    z-index: 10;
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
    font-size: 12px;
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
        "needLowerCaseChar": "Ein Kleinbuchstabe wird benötigt",
        "needCapital": "Ein Großbuchstabe wird benötigt",
        "needSpecialChar": "Ein Spezialzeichen wird benötigt",
        "needDigit": "Eine Zahl wird benötigt"
      },
      "passwordsNotMatch": "Passwörter stimmen nicht überein",
      "passwordsMatch": "Passwörter stimmen überein",
      "validLength": "Gültige Länge",
      "minLength": "Mindestlänge",
      "maxLength": "Maximallänge",
      "containsSpecialChar": "Beinhaltet Sonderzeichen",
      "containsLowerCaseChar": "Beinhaltet Kleinbuchstaben",
      "containsCapital": "Beinhaltet Großbuchstabe",
      "containsDigit": "Beinhaltet Zahl"
    }
  },
  "en": {
    "pws": {
      "hint": {
        "needLowerCaseChar": "A lower case letter is required",
        "needCapital": "A capital is required",
        "needSpecialChar": "A special character is required",
        "needDigit": "A digit is required"
      },
      "passwordsNotMatch": "Passwords do not match",
      "passwordsMatch": "Passwords match",
      "validLength": "Valid length",
      "minLength": "Minimum length",
      "maxLength": "Maximum length",
      "containsSpecialChar": "Contains special character",
      "containsLowerCaseChar": "Contains lower case letter",
      "containsCapital": "Contains capital",
      "containsDigit": "Contains digit"
    }
  },
  "fr": {
    "pws": {
      "hint": {
        "needLowerCaseChar": "Une lettre minuscule est nécessaire",
        "needCapital": "Au moins une lettre majuscule",
        "needSpecialChar": "Au moins un caractère spécial",
        "needDigit": "Au moins un chiffre"
      },
      "passwordsNotMatch": "Les mots de passe ne correspondent pas",
      "passwordsMatch": "Les mots de passe correspondent",
      "validLength": "Longueur valide",
      "minLength": "Longueur minimale",
      "maxLength": "Longueur maximale",
      "containsSpecialChar": "Contient des caractères spéciaux",
      "containsLowerCaseChar": "Contient des lettres minuscules",
      "containsCapital": "Contient une majuscule",
      "containsDigit": "Comprend le nombre"
    }
  }
}
</i18n>
