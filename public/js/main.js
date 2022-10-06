const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

function toggleModal() {
  $('#btn-modal').classList.toggle('hidden')
  $('#modal').classList.toggle('hidden')
}

function redirect(type) {
  let url = 'http://127.0.0.1:5500/'
  url = url + type + '.html'
  window.location=url
}

function typeSecurity() {
  const listBtn = $$('.btn-type__event')
  for(const element of listBtn) {
    element.addEventListener('click', () => {
      redirect(element.id)
    })
  }
}

// shift cipher js
function removeRed(keyLabel, key, keyValidate) {
  keyLabel.classList.remove('text-red-700')
  key.classList.remove('bg-red-50','border-red-500','text-red-900','dark:text-red-400','placeholder-red-700','dark:placeholder-red-500','focus:ring-red-500','focus:border-red-500','dark:border-red-500')
  keyValidate.classList.remove('text-red-600', 'dark:text-red-500')
  keyValidate.classList.add('hidden')
}

function removeGreen(keyLabel, key, keyValidate) {
  keyLabel.classList.remove('text-green-700')
  key.classList.remove('bg-green-50','border-green-500','text-green-900','dark:text-green-400','placeholder-green-700','dark:placeholder-green-500','focus:ring-green-500','focus:border-green-500','dark:border-green-500')
  keyValidate.classList.remove('text-green-600', 'dark:text-green-500')
  keyValidate.classList.add('hidden')
}

function addRed(keyLabel, key, keyValidate) {
  keyLabel.classList.add('text-red-700')
  key.classList.add('bg-red-50','border-red-500','text-red-900','dark:text-red-400','placeholder-red-700','dark:placeholder-red-500','focus:ring-red-500','focus:border-red-500','dark:border-red-500')
  keyValidate.classList.add('text-red-600', 'dark:text-red-500')
  keyValidate.classList.remove('hidden')
}

function addGreen(keyLabel, key, keyValidate) {
  keyLabel.classList.add('text-green-700')
  key.classList.add('bg-green-50','border-green-500','text-green-900','dark:text-green-400','placeholder-green-700','dark:placeholder-green-500','focus:ring-green-500','focus:border-green-500','dark:border-green-500')
  keyValidate.classList.add('text-green-600', 'dark:text-green-500')
  keyValidate.classList.remove('hidden')
}

//
function keyChange() {
  const keyLabel = $('#key-label')
  const key = $('#key')
  const keyValidate = $('#key-validate')
  const keyValidateText = $('#key-validate-text')

  if(key.value == '') { // Key rong
    removeRed(keyLabel, key, keyValidate)
    removeGreen(keyLabel, key, keyValidate)
  } else if(key.value >= 0 && key.value <= 25) { // key hop le
    removeRed(keyLabel, key, keyValidate)
    addGreen(keyLabel, key, keyValidate)
    keyValidateText.innerText = 'Valid Key!!!'
  } else { // key khong hop le
    removeGreen(keyLabel, key, keyValidate)
    addRed(keyLabel, key, keyValidate)
    keyValidateText.innerText = 'Invalid Key@@@'
  }
}

function validPlaintextValue(plaintext) {
  let isCheck = true
  for (let i = 0; i < plaintext.length; i++) {
    if(plaintext.charAt(i) >= 'a' && plaintext.charAt(i) <= 'z' || plaintext.charAt(i) == '\n' || plaintext.charAt(i) == ' ') {
      isCheck = true
    } else {
      return false
    }
  }
  return isCheck
}

function plaintextChange(event) {
  const plaintextLabel = $('#plaintext-label')
  const plaintext = $('#textarea-plaintext')
  const plaintextValidate = $('#plaintext-validate')
  const plaintextValidateText = $('#plaintext-validate-text')

  let plaintextValue = plaintext.value

  if(validPlaintextValue(plaintextValue)) { // Plaintext hop le
    if(plaintext.value == '') {
      removeRed(plaintextLabel, plaintext, plaintextValidate)
      removeGreen(plaintextLabel, plaintext, plaintextValidate)
    } else {
      removeRed(plaintextLabel, plaintext, plaintextValidate)
      addGreen(plaintextLabel, plaintext, plaintextValidate)
      plaintextValidateText.innerText = 'Valid Plaintext!!!'
    }
  } else { // Plaintext khong hop le
    removeGreen(plaintextLabel, plaintext, plaintextValidate)
    addRed(plaintextLabel, plaintext, plaintextValidate)
    plaintextValidateText.innerText = 'Invalid Plaintext@@@'
  }
}

function changeSynthesis(type1, type2, textarea1, textarea2, btn1, btn2) {
    type2.classList.remove('order-1')
    type1.classList.add('order-1')
    type1.classList.remove('order-3')
    type2.classList.add('order-3')

    // Change disabled textarea
    textarea2.disabled = true
    textarea1.disabled = false

    // Change placeholder
    textarea2.placeholder = ''
    textarea1.placeholder = 'Ex: Hello World with HeroesPluss'

    // Toggle hidden class button
    btn1.classList.toggle('hidden')
    btn2.classList.toggle('hidden')
}

//
function changeSelected() {
  const plaintext = $('#plaintext')
  const code = $('#code')
  const plaintextTextarea = $('#textarea-plaintext')
  const codeTextarea = $('#textarea-code')
  const btnCopyPlaintext = $('#copy-plaintext')
  const btnCopyCode = $('#copy-code')

  const value = $('#countries').value

  if(value == 'encode') {
    changeSynthesis(plaintext, code, plaintextTextarea, codeTextarea, btnCopyPlaintext, btnCopyCode)
  } else {
    changeSynthesis(code, plaintext, codeTextarea, plaintextTextarea, btnCopyPlaintext, btnCopyCode)
  }
}

function checkText(text) {
  if(text.value == '') return false
  return true
}

function checkKey(key) {
  if(key.value >= 0 && key.value <= 25) return true
  return false
}

//
function encodeAndDecode() {
  const keyLabel = $('#key-label')
  const key = $('#key')
  const keyValidate = $('#key-validate')
  const keyValidateText = $('#key-validate-text')

  const plaintextLabel = $('#plaintext-label')
  const plaintextTextarea = $('#textarea-plaintext')
  const plaintextValidate = $('#plaintext-validate')
  const plaintextValidateText = $('#plaintext-validate-text')

  const codeTextarea = $('#textarea-code')

  const value = $('#countries').value

  let isEmptyKey = checkText(key)

  if(value == 'encode') {
    if(isEmptyKey) {
      let validKey = checkKey(key)
      if(validKey) {
        let plaintextCheck = checkText(plaintextTextarea)
        if(plaintextCheck) {
          let code = encodeShiftCipher(plaintextTextarea, key)
          codeTextarea.value = code
        } else {
          plaintextTextarea.focus()
          addRed(plaintextLabel, plaintextTextarea, plaintextValidate, plaintextValidateText)
          plaintextValidateText.innerText = 'Please enter plaintext@@@'
        }
      } else {
        key.focus()
        addRed(keyLabel, key, keyValidate, keyValidateText)
      }
    } else {
      key.focus()
      addRed(keyLabel, key, keyValidate, keyValidateText)
      keyValidateText.innerText = 'Please enter key@@@'
    }
  } else {
  }
}

function copyCode() {
  const textAreaCode = $('#textarea-code')

  textAreaCode.disabled = false
  textAreaCode.select();
  document.execCommand('copy')
  textAreaCode.disabled = true
}
