# Password Strength Checker
This is a [Vue 3](https://vuejs.org/) component for strength checking a [password input](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/password), while providing hints on current requirements.

It uses [HTML 5](https://developer.mozilla.org/en-US/docs/Glossary/HTML5) Attributes - like maxLength, size, pattern - on a password input to validate the password. The `setCustomValidity` function from the [Constraint Validation API](https://developer.mozilla.org/en-US/docs/Web/API/Constraint_validation) is used to display a hint.

An `id` of a password input is required. After mounting the component, the HTML Attributes are added to the input element and also listeners are attached for checking the password (`input`) and show(`focus`)/hide(`blur`) the hints.

Here are all component properties and their default values:
```json
for: null,
minLength: 10,
maxLength: 140,
needSpecialChar: true,
needUpperCaseChar: true,
needLowerCaseChar: true,
needDigit: true,
backgroundColor: 'rgba(220, 230, 240, 1)',
boxShadow: '0 0 2px #2c3e50',
checkboxTransition: '0.6s',
passwordInputTransition: '0.4s'
```
Special characters are defined as follows and can be changed by providing a regular expression:
```jsregexp
specialCharacters: /!|§|\$|%|&|\/|\(|\)|=|\?|\*|\+|~|#|-|_|\.|:|,|;|\^|°/
```
