const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const z26 = 'abcdefghijklmnopqrstuvwxyz'
const z52 = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
const z62 = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

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

function getZx() {
  const typeZ = $('#type-z')
  let Zx = z26
  switch (typeZ.value) {
      case 'z26':
          Zx = z26
          break;
      case 'z52':
          Zx = z52
          break;
      case 'z62':
          Zx = z62
          break;
      default:
          break;
  }

  return Zx
}

//
function keyChange() {
  const keyLabel = $('#key-label')
  const key = $('#key')
  const keyValidate = $('#key-validate')
  const keyValidateText = $('#key-validate-text')

  const lengthZx = getZx().length

  if(key.value == '') { // Key rong
    removeRed(keyLabel, key, keyValidate)
    removeGreen(keyLabel, key, keyValidate)
  } else if(key.value >= 0 && key.value < lengthZx) { // key hop le
    removeRed(keyLabel, key, keyValidate)
    addGreen(keyLabel, key, keyValidate)
    keyValidateText.innerText = 'Valid Key!!!'
  } else { // key khong hop le
    removeGreen(keyLabel, key, keyValidate)
    addRed(keyLabel, key, keyValidate)
    keyValidateText.innerText = 'Invalid Key@@@'
  }
}

function validateValueZ26(value) {
  let isCheck = true
  for (let i = 0; i < value.length; i++) {
    if(value.charAt(i) >= 'a' && value.charAt(i) <= 'z' || value.charAt(i) == '\n' || value.charAt(i) == ' ') {
      isCheck = true
    } else {
      return false
    }
  }
  return isCheck
}

function validateValueZ52(value) {
  let isCheck = true
  for (let i = 0; i < value.length; i++) {
    if(value.charAt(i) >= 'a' && value.charAt(i) <= 'z' || value.charAt(i) >= 'A' && value.charAt(i) <= 'Z' || value.charAt(i) == '\n' || value.charAt(i) == ' ') {
      isCheck = true
    } else {
      return false
    }
  }
  return isCheck
}

function validateValueZ62(value) {
  let isCheck = true
  for (let i = 0; i < value.length; i++) {
    if(value.charAt(i) >= 'a' && value.charAt(i) <= 'z' || value.charAt(i) >= 'A' && value.charAt(i) <= 'Z' || value.charAt(i) >= '0' && value.charAt(i) <= '9' || value.charAt(i) == '\n' || value.charAt(i) == ' ') {
      isCheck = true
    } else {
      return false
    }
  }
  return isCheck
}

function checkValidate(value) {
  let isValidate = true
  let Zx = getZx()
  if(Zx == z26) {
    isValidate = validateValueZ26(value)
  } else if (Zx == z52) {
    isValidate = validateValueZ52(value)
  } else {
    isValidate = validateValueZ62(value)
  }
  return isValidate
}

function plaintextChange() {
  const plaintextLabel = $('#plaintext-label')
  const plaintext = $('#textarea-plaintext')
  const plaintextValidate = $('#plaintext-validate')
  const plaintextValidateText = $('#plaintext-validate-text')

  let plaintextValue = plaintext.value

  if(checkValidate(plaintextValue)) { // Plaintext hop le
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

function codeChange() {
  const codeLabel = $('#code-label')
  const code = $('#textarea-code')
  const codeValidate = $('#code-validate')
  const codeValidateText = $('#code-validate-text')

  let codeValue = code.value

  if(checkValidate(codeValue)) { // Code hop le
    if(code.value == '') {
      removeRed(codeLabel, code, codeValidate)
      removeGreen(codeLabel, code, codeValidate)
    } else {
      removeRed(codeLabel, code, codeValidate)
      addGreen(codeLabel, code, codeValidate)
      codeValidateText.innerText = 'Valid Code!!!'
    }
  } else { // Code khong hop le
    removeGreen(codeLabel, code, codeValidate)
    addRed(codeLabel, code, codeValidate)
    codeValidateText.innerText = 'Invalid Code@@@'
  }
}

function resetPlaintextAndCode() {
  const plaintextLabel = $('#plaintext-label')
  const plaintextTextarea = $('#textarea-plaintext')
  const plaintextValidate = $('#plaintext-validate')

  const codeLabel = $('#code-label')
  const codeTextarea = $('#textarea-code')
  const codeValidate = $('#code-validate')

  plaintextTextarea.value = ''
  removeRed(plaintextLabel, plaintextTextarea, plaintextValidate)
  removeGreen(plaintextLabel, plaintextTextarea, plaintextValidate)

  codeTextarea.value = ''
  removeRed(codeLabel, codeTextarea, codeValidate)
  removeGreen(codeLabel, codeTextarea, codeValidate)
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

function changeTypeZ() {
  const keyLabel = $('#key-label')
  const key = $('#key')
  const keyValidate = $('#key-validate')

  const plaintextLabel = $('#plaintext-label')
  const plaintext = $('#textarea-plaintext')
  const plaintextValidate = $('#plaintext-validate')

  const codeLabel = $('#code-label')
  const code= $('#textarea-code')
  const codeValidate = $('#code-validate')

  const typeValue = $('#type-encodeDecode').value
  if(typeValue == 'encode') {
    code.value = ''
    let isEmptyPlaintext = checkText(plaintext)
    if(isEmptyPlaintext) {
      if(checkValidate(plaintext.value)) {
        removeRed(plaintextLabel, plaintext, plaintextValidate)
        addGreen(plaintextLabel, plaintext, plaintextValidate)
      } else {
        removeGreen(plaintextLabel, plaintext, plaintextValidate)
        addRed(plaintextLabel, plaintext, plaintextValidate)
      }
    } else {
      removeGreen(plaintextLabel, plaintext, plaintextValidate)
      removeRed(plaintextLabel, plaintext, plaintextValidate)
    }
  } else {
    plaintext.value = ''
    let isEmptyCode = checkText(code)
    if(isEmptyCode) {
      if(checkValidate(code.value)) {
        removeRed(codeLabel, code, codeValidate)
        addGreen(codeLabel, code, codeValidate)
      } else {
        removeGreen(codeLabel, code, codeValidate)
        addRed(codeLabel, code, codeValidate)
      }
    } else {
      removeGreen(codeLabel, code, codeValidate)
      removeRed(codeLabel, code, codeValidate)
    }
  }

  if(key) {
    let isEmptyKey = checkText(key)
    if(isEmptyKey) {
      let isKey = checkKey(key)
      if(isKey) {
        removeRed(keyLabel, key, keyValidate)
        addGreen(keyLabel, key, keyValidate)
      } else {
        removeGreen(keyLabel, key, keyValidate)
        addRed(keyLabel, key, keyValidate)
      }

      keySubstitutionChange()
    } else {
      removeRed(keyLabel, key, keyValidate)
      removeGreen(keyLabel, key, keyValidate)
      resetPlaintextAndCode()
    }
  } else {
    console.log("HAHA")
  }
}

//
function changeSelected() {
  const plaintext = $('#plaintext')
  const code = $('#code')
  const plaintextTextarea = $('#textarea-plaintext')
  const codeTextarea = $('#textarea-code')
  const btnCopyPlaintext = $('#copy-plaintext')
  const btnCopyCode = $('#copy-code')

  const value = $('#type-encodeDecode').value

  resetPlaintextAndCode()
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
  let lengthZx = getZx().length
  if(key.value >= 0 && key.value < lengthZx) return true
  return false
}

// ShiftCipher
function encodeAndDecodeShiftCipher() {
  const keyLabel = $('#key-label')
  const key = $('#key')
  const keyValidate = $('#key-validate')
  const keyValidateText = $('#key-validate-text')

  const plaintextLabel = $('#plaintext-label')
  const plaintextTextarea = $('#textarea-plaintext')
  const plaintextValidate = $('#plaintext-validate')
  const plaintextValidateText = $('#plaintext-validate-text')

  const codeLabel = $('#code-label')
  const codeTextarea = $('#textarea-code')
  const codeValidate = $('#code-validate')
  const codeValidateText = $('#code-validate-text')

  const value = $('#type-encodeDecode').value

  let isEmptyKey = checkText(key)

  if(value == 'encode') {
    if(isEmptyKey) {
      let validKey = checkKey(key)
      if(validKey) {
        let plaintextCheck = checkText(plaintextTextarea)
        if(plaintextCheck) {
          if(checkValidate(plaintextTextarea.value)) {
            let Zx = getZx()
            let code = encodeShiftCipher(plaintextTextarea, key, Zx)
            codeTextarea.value = code
          } else {
            plaintextTextarea.focus()
          }
        } else {
          plaintextTextarea.focus()
          removeGreen(plaintextLabel, plaintextTextarea, plaintextValidate)
          addRed(plaintextLabel, plaintextTextarea, plaintextValidate)
          plaintextValidateText.innerText = 'Please enter plaintext@@@'
        }
      } else {
        key.focus()
        removeRed(keyLabel, key, keyValidate, keyValidateText)
        addRed(keyLabel, key, keyValidate, keyValidateText)
      }
    } else {
      key.focus()
      removeRed(keyLabel, key, keyValidate, keyValidateText)
      addRed(keyLabel, key, keyValidate, keyValidateText)
      keyValidateText.innerText = 'Please enter key@@@'
    }
  } else {
    if(isEmptyKey) {
      let validKey = checkKey(key)
      if(validKey) {
        let codeCheck = checkText(codeTextarea)
        if(codeCheck) {
          if(checkValidate(codeTextarea.value)) {
            let Zx = getZx()
            let plaintext = decodeShiftCipher(codeTextarea, key, Zx)
            plaintextTextarea.value = plaintext
          } else {
            codeTextarea.focus()
          }
        } else {
          codeTextarea.focus()
          removeGreen(codeLabel, codeTextarea, codeValidate)
          addRed(codeLabel, codeTextarea, codeValidate)
          codeValidateText.innerText = 'Please enter code@@@'
        }
      } else {
        key.focus()
        removeGreen(keyLabel, key, keyValidate, keyValidateText)
        addRed(keyLabel, key, keyValidate, keyValidateText)
      }
    } else {
      key.focus()
      removeGreen(keyLabel, key, keyValidate, keyValidateText)
      addRed(keyLabel, key, keyValidate, keyValidateText)
      keyValidateText.innerText = 'Please enter key@@@'
    }
  }
}

function copyCode() {
  const textAreaCode = $('#textarea-code')

  textAreaCode.disabled = false
  textAreaCode.select();
  document.execCommand('copy')
  textAreaCode.disabled = true
}

function copyPlaintext() {
  const textAreaPlaintext = $('#textarea-plaintext')

  textAreaPlaintext.disabled = false
  textAreaPlaintext.select();
  document.execCommand('copy')
  textAreaPlaintext.disabled = true
}


// Substitution Cipher
function keySubstitutionChange() {
  const keyLabel = $('#key-label')
  const key = $('#key')
  const keyValidate = $('#key-validate')
  const keyValidateText = $('#key-validate-text')
  let Zx = getZx()

  const listkey = key.value.split('').sort()
  const listLetter = Zx.split('').sort()

  const isEqual  = JSON.stringify(listkey) === JSON.stringify(listLetter)
  if(isEqual) {
    removeRed(keyLabel, key, keyValidate)
    addGreen(keyLabel, key, keyValidate)
  } else {
    removeGreen(keyLabel, key, keyValidate)
    addRed(keyLabel, key, keyValidate)
    keyValidateText.innerText = 'Valid key!!!'
  }
}

function encodeAndDecodeSubstitutionCipher() {
  const keyLabel = $('#key-label')
  const key = $('#key')
  const keyValidate = $('#key-validate')
  const keyValidateText = $('#key-validate-text')

  const plaintextLabel = $('#plaintext-label')
  const plaintextTextarea = $('#textarea-plaintext')
  const plaintextValidate = $('#plaintext-validate')
  const plaintextValidateText = $('#plaintext-validate-text')

  const codeLabel = $('#code-label')
  const codeTextarea = $('#textarea-code')
  const codeValidate = $('#code-validate')
  const codeValidateText = $('#code-validate-text')

  const value = $('#type-encodeDecode').value

  let Zx = getZx()
  const listkey = key.value.split('').sort()
  const listLetter = Zx.split('').sort()
  const isEqual  = JSON.stringify(listkey) === JSON.stringify(listLetter)

  if(value == 'encode') {
    if(isEqual) {
      let plaintextCheck = checkText(plaintextTextarea)
      if(plaintextCheck) {
        if(checkValidate(plaintextTextarea.value)) {
          let Zx = getZx()
          let code = encodeSubstitutionCipher(plaintextTextarea, key, Zx)
          codeTextarea.value = code
        } else {
          plaintextTextarea.focus()
        }
      } else {
        plaintextTextarea.focus()
        removeGreen(plaintextLabel, plaintextTextarea, plaintextValidate)
        addRed(plaintextLabel, plaintextTextarea, plaintextValidate)
        plaintextValidateText.innerText = 'Please enter plaintext@@@'
      }
    } else {
      key.focus()
      removeRed(keyLabel, key, keyValidate, keyValidateText)
      addRed(keyLabel, key, keyValidate, keyValidateText)
      keyValidateText.innerText = 'Please enter key@@@'
    }
  } else {
    if(isEqual) {
      let codeCheck = checkText(codeTextarea)
      if(codeCheck) {
        if(checkValidate(codeTextarea.value)) {
          let Zx = getZx()
          let plaintext = decodeSubstitutionCipher(codeTextarea, key, Zx)
          plaintextTextarea.value = plaintext
        } else {
          codeTextarea.focus()
        }
      } else {
        codeTextarea.focus()
        removeGreen(codeLabel, codeTextarea, codeValidate)
        addRed(codeLabel, codeTextarea, codeValidate)
        codeValidateText.innerText = 'Please enter code@@@'
      }
    } else {
      key.focus()
      removeGreen(keyLabel, key, keyValidate, keyValidateText)
      addRed(keyLabel, key, keyValidate, keyValidateText)
      keyValidateText.innerText = 'Please enter key@@@'
    }
  }
}

// Affine
function getInvertible(key, Zx) {
  let invertible = 0
  for(let index = 0; index < Zx.length; index++) {
    if((parseInt(key.value) * index) % Zx.length == 1) {
      invertible = index
      break
    }
  }
  return invertible
}

function keyAffineAChange() {
  const keyLabelA = $('#key-label-a')
  const keyA = $('#key-affine-a')
  const keyValidateA = $('#key-validate-a')
  const keyValidateTextA = $('#key-validate-text-a')
  const Zx = getZx()

  let status = true
  let message = ''

  if(checkText(keyA)) {
    if(keyA.value >= 0) {
      let isInvertivle = getInvertible(keyA, Zx)
      if(isInvertivle != 0) {
        removeRed(keyLabelA, keyA, keyValidateA)
        addGreen(keyLabelA, keyA, keyValidateA)
        keyValidateTextA.innerText = 'Element a in valid!!!'
      } else {
        status = false
        message = 'Element a has no inverse@@@'
      }
    } else {
      if(keyA.value < 0) {
        status = false
        message= 'Element a cannot be negative@@@'
      } else {
        status = false
        message= 'Element a is not valid@@@'
      }
    }
  } else {
    removeGreen(keyLabelA, keyA, keyValidateA)
    removeRed(keyLabelA, keyA, keyValidateA)
  }

  if(!status) {
    removeGreen(keyLabelA, keyA, keyValidateA)
    addRed(keyLabelA, keyA, keyValidateA)
    keyValidateTextA.innerText = message
  }
}

function keyAffineBChange() {
  const keyLabelB = $('#key-label-b')
  const keyB = $('#key-affine-b')
  const keyValidateB = $('#key-validate-b')
  const keyValidateTextB = $('#key-validate-text-b')
  const Zx = getZx()

  let status = true
  let message = ''

  if(checkText(keyB)) {
    if(keyB.value >= 0) {
      let isInvertivle = checkKey(keyB, Zx)
      if(isInvertivle != 0) {
        removeRed(keyLabelB, keyB, keyValidateB)
        addGreen(keyLabelB, keyB, keyValidateB)
        keyValidateTextB.innerText = 'Element B in valid!!!'
      } else {
        status = false
        message = 'Element B is not valid@@@'
      }
    } else {
      if(keyB.value < 0) {
        status = false
        message= 'Element b cannot be negative@@@'
      } else {
        status = false
        message= 'Element b is not valid@@@'
      }
    }
  } else {
    removeGreen(keyLabelB, keyB, keyValidateB)
    removeRed(keyLabelB, keyB, keyValidateB)
  }

  if(!status) {
    removeGreen(keyLabelB, keyB, keyValidateB)
    addRed(keyLabelB, keyB, keyValidateB)
    keyValidateTextB.innerText = message
  }
}

function encodeAndDecodeAffine() {
  const keyLabelA = $('#key-label-a')
  const keyA = $('#key-affine-a')
  const keyValidateA = $('#key-validate-a')
  const keyValidateTextA = $('#key-validate-text-a')

  const keyLabelB = $('#key-label-b')
  const keyB = $('#key-affine-b')
  const keyValidateB = $('#key-validate-b')
  const keyValidateTextB = $('#key-validate-text-b')

  const plaintextLabel = $('#plaintext-label')
  const plaintextTextarea = $('#textarea-plaintext')
  const plaintextValidate = $('#plaintext-validate')
  const plaintextValidateText = $('#plaintext-validate-text')

  const codeLabel = $('#code-label')
  const codeTextarea = $('#textarea-code')
  const codeValidate = $('#code-validate')
  const codeValidateText = $('#code-validate-text')

  const value = $('#type-encodeDecode').value
  const Zx = getZx()

  let isEmptyKey = checkText(keyA) && checkText(keyB)
  if(value == 'encode') {
    if(isEmptyKey) {
      let validKey = (getInvertible(keyA, Zx) != 0) && checkKey(keyB)
      if(validKey) {
        let plaintextCheck = checkText(plaintextTextarea)
        if(plaintextCheck) {
          if(checkValidate(plaintextTextarea.value)) {
            let Zx = getZx()
            let code = encodeAffine(plaintextTextarea, keyA, keyB, Zx)
            codeTextarea.value = code
          } else {
            plaintextTextarea.focus()
          }
        } else {
          plaintextTextarea.focus()
          removeGreen(plaintextLabel, plaintextTextarea, plaintextValidate)
          addRed(plaintextLabel, plaintextTextarea, plaintextValidate)
          plaintextValidateText.innerText = 'Please enter plaintext@@@'
        }
      } else {
        if(!getInvertible(keyA, Zx)) {
          keyA.focus()
          removeRed(keyLabelA, keyA, keyValidateA, keyValidateTextA)
          addRed(keyLabelA, keyA, keyValidateA, keyValidateTextA)
          keyValidateTextA.innerText = 'Element a is not valid@@@'
        } else {
          keyB.focus()
          removeRed(keyLabelB, keyB, keyValidateB, keyValidateTextB)
          addRed(keyLabelB, keyB, keyValidateB, keyValidateTextB)
          keyValidateTextB.innerText = 'Element b is not valid@@@'
        }
      }
    } else {
      if(!checkText(keyA)) {
        keyA.focus()
        removeRed(keyLabelA, keyA, keyValidateA, keyValidateTextA)
        addRed(keyLabelA, keyA, keyValidateA, keyValidateTextA)
        keyValidateTextA.innerText = 'Please enter element a of key {a, b}@@@'
      } else {
        keyB.focus()
        removeRed(keyLabelB, keyB, keyValidateB, keyValidateTextB)
        addRed(keyLabelB, keyB, keyValidateB, keyValidateTextB)
        keyValidateTextB.innerText = 'Please enter element b of key {a, b}@@@'
      }
    }
  } else {
    if(isEmptyKey) {
      let validKey = (getInvertible(keyA, Zx) != 0) && checkKey(keyB)
      if(validKey) {
        let codeCheck = checkText(codeTextarea)
        if(codeCheck) {
          if(checkValidate(codeTextarea.value)) {
            let Zx = getZx()
            let code = decodeAffine(codeTextarea, keyA, keyB, Zx)
            plaintextTextarea.value = code
          } else {
            codeTextarea.focus()
          }
        } else {
          codeTextarea.focus()
          removeGreen(codeLabel, codeTextarea, codeValidate)
          addRed(codeLabel, codeTextarea, codeValidate)
          codeValidateText.innerText = 'Please enter code@@@'
        }
      } else {
        if(!getInvertible(keyA, Zx)) {
          keyA.focus()
          removeRed(keyLabelA, keyA, keyValidateA, keyValidateTextA)
          addRed(keyLabelA, keyA, keyValidateA, keyValidateTextA)
          keyValidateTextA.innerText = 'Element a is not valid@@@'
        } else {
          keyB.focus()
          removeRed(keyLabelB, keyB, keyValidateB, keyValidateTextB)
          addRed(keyLabelB, keyB, keyValidateB, keyValidateTextB)
          keyValidateTextB.innerText = 'Element b is not valid@@@'
        }
      }
    } else {
      if(!checkText(keyA)) {
        keyA.focus()
        removeRed(keyLabelA, keyA, keyValidateA, keyValidateTextA)
        addRed(keyLabelA, keyA, keyValidateA, keyValidateTextA)
        keyValidateTextA.innerText = 'Please enter element a of key {a, b}@@@'
      } else {
        keyB.focus()
        removeRed(keyLabelB, keyB, keyValidateB, keyValidateTextB)
        addRed(keyLabelB, keyB, keyValidateB, keyValidateTextB)
        keyValidateTextB.innerText = 'Please enter element b of key {a, b}@@@'
      }
    }
  }


}