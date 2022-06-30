# Password Strength Checker
This is a [Vue 3](https://vuejs.org/) component for strength checking a [password input](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/password), while providing hints on current requirements.

It uses [HTML 5](https://developer.mozilla.org/en-US/docs/Glossary/HTML5) Attributes - like maxLength, size, pattern - on a password input to validate the password. The `setCustomValidity` function from the [Constraint Validation API](https://developer.mozilla.org/en-US/docs/Web/API/Constraint_validation) is used to display a hint.

[vue-i18n](https://www.npmjs.com/package/vue-i18n) needs to be installed in your project to use this component. Translations for de, en and fr are provided. Other translations can be defined globally.

An `id` of a password input is required. A second, optional, id can be provided as `confirmId`, which refers to the password confirmation (retype password) input element. The password input elements aren't styled by default. To apply the `valid` and `invalid` state style, provide `pws` as an attribute on the primary password input and `pws-confirm` on the secondary input.

When the icon should be displayed on the right instead of the left, provide one of the following classes on the input: `.icon-right, .icon-right-1 .icon-right-2`. 

After mounting the component, the HTML Attributes are added to the input element and also listeners are attached for checking the password (`input`) and show(`focus`)/hide(`blur`) the hints.

To use this component you need to import the component itself, and it's style with:
```javascript
import PasswordStrength from '@avensio/pw-strength'
import '@avensio/pw-strength/style.css'
```

Here are all component properties and their default values:
```javascript
for: null,
confirmId: null,
minLength: 10,
maxLength: 140,
needSpecialChar: true,
needLowerCaseChar: true,
needCapital: true,
needDigit: true,
needDiacritic: false,
needUmlaut: false,
backgroundColor: 'rgba(220, 230, 240, 1)',
boxShadow: '0 0 2px #2c3e50',
checkboxTransition: '0.6s',
passwordInputTransition: '0.4s'
```
The last 4 properties values are CSS values (`background`, `box-shadow`, `transition`).

Special characters are defined as follows and can be changed by providing a disjunction as regular expression:
```jsregexp
specialCharacters: /!|§|\$|%|&|\/|\(|\)|=|\?|\*|\+|~|#|-|_|\.|:|,|;|\^|°/
```
Symbols reserved for Regular Expressions needs to be escaped! (e.g. `\^` instead of `^`; `\.` instead of `.`)

Inspect the password element with the used browser dev tools to see the html attributes set. When focusing the background changes to current validity state and the input element itself gets a hint attached. In addition, a container with all hints is shown beneath the password input.

![Hints](https://www.avensio.de/img/hints.png)

Be aware that when a password comply to the **default** configuration, the password has the following **keyspace** and **key length** (*without diacritic signs, umlauts etc.*):  
Lower case letters: **l = 26**  
Capital letters: **c = 26**  
Digits: 0-9 -> **d = 10**  
Special characters: **s = 21**  
min length: **m = 10**

All symbols:  
l + c + d + s  
26 + 26 + 10 + 21 = 83

when m = 8  
keyspace: 83^m = 83^8 about 2.25 * 10^15, or **2^51**  
key length: log2(83^8) about 51, so **51 bit**

when m = 10  
keyspace: 83^10 about 1.55 * 10^19, or **2^63.75**  
key length: log2(83^10) about 63.75, so **64 bit**

when m = 11  
keyspace: 83^11 about 1.29 * 10^21, or **2^70.13**  
key length: log2(83^11) about 70,13, so **71 bit**

when m = 12  
keyspace: 83^12 about 1.07 * 10^23, or **2^76.5**  
key length: log2(83^12) about 76,5, so **77 bit**

when m = 13  
keyspace: 83^13 about 8.87 * 10^24, or **2^82.87**  
key length: log2(83^13) about 82.87, so **83 bit**

when m = 14  
keyspace: 83^14 about 7.36 * 10^26, or **2^89.25**  
key length: log2(83^14) about 89.25, so **90 bit**

when m = 15    
keyspace: 83^15 about 6.11 * 10^28, or **2^95.63**  
key length: log2(83^15) about 95.63, so **96 bit**

when m = 16  
keyspace: 83^16 about 5.07 * 10^30, or **2^102**  
key length: log2(83^16) about **102 bit**

when m = 17  
keyspace: 83^17 about 4.21 * 10^32, or **2^108.38**  
key length: log2(83^17) about 108.38, so **109 bit**

when m = 18  
keyspace: 83^18 about 3.49 * 10^34, or **2^114.75**  
key length: log2(83^18) about 114.75, so **115 bit**

when m = 19
keyspace: 83^19 about 2.9 * 10^36, or **2^121.13**  
key length: log2(83^19) about 121.13, so **122 bit**

when m = 20  
keyspace: 83^20 about 2.41 * 10^38, or **2^127.5**  
key length: log2(83^20) about 127.5, so **128 bit**

What I learned, future-proof is **about 128-bit** key length and **64-bit** is *searchable* in **days** (with brute-force).  
Therefore, to have a future-proof password, you need at least 20 Characters with the default configuration.

This, of course, may vary with another source.

It is possible to increase the amount of symbols, instead of increasing the minimum password length. Just pass the default `specialCharacters` Regex, plus some extra characters, over to the component. But, this has not that much effect on the actual key length, as increasing the minimum password length (m).
