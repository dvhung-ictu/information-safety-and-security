// encode shift cipher
function encodeShiftCipher(plaintextTextarea, key, Zx) {
    let plaintext = plaintextTextarea.value
    let keyValue = parseInt(key.value)
    let code = ''
    for(let i = 0; i < plaintext.length; i++) {
        let val = ''
        if(Zx.indexOf(plaintext.charAt(i)) >= 0) {
            let chAtIndex = (Zx.indexOf(plaintext.charAt(i)) + keyValue) % Zx.length
            val = Zx.charAt(chAtIndex)
        } else {
            if(plaintext.charAt(i) == ' ') {
                val = ' '
            } else {
                val = '\n'
            }
        }
        code += val
    }
    return code
}

// decode shift cipher
function decodeShiftCipher(codeTextarea, key, Zx) {
    let code = codeTextarea.value
    let keyValue = parseInt(key.value)
    let plaintext = ''
    for(let i = 0; i < code.length; i++) {
        let val = ''
        if(Zx.indexOf(code.charAt(i)) >= 0) {
            let temp = Zx.indexOf(code.charAt(i)) - keyValue
            let chAtIndex = 0
            if(temp >= 0) {
                chAtIndex = temp % Zx.length
            } else {
                chAtIndex = temp + ((Math.floor(Math.abs(temp)/Zx.length) + 1) * Zx.length)
            }
            val = Zx.charAt(chAtIndex)
        } else {
            if(code.charAt(i) == ' ') {
                val = ' '
            } else {
                val = '\n'
            }
        }
        plaintext += val
    }
    return plaintext
}

// encode substitution cipher
function encodeSubstitutionCipher(plaintextTextarea, key, Zx) {
    let plaintext = plaintextTextarea.value
    let keyValue = key.value
    let code = ''
    for(let i = 0; i < plaintext.length; i++) {
        let val = ''
        if(Zx.indexOf(plaintext.charAt(i)) >= 0) {
            let chAtIndex = Zx.indexOf(plaintext.charAt(i))
            val = keyValue.charAt(chAtIndex)
        } else {
            if(plaintext.charAt(i) == ' ') {
                val = ' '
            } else {
                val = '\n'
            }
        }
        code += val
    }
    return code
}

// decode substitution cipher
function decodeSubstitutionCipher(codeTextarea, key, Zx) {
    let code = codeTextarea.value
    let keyValue = key.value
    let plaintext = ''
    for(let i = 0; i < code.length; i++) {
        let val = ''
        if(keyValue.indexOf(code.charAt(i)) >= 0) {
            let chAtIndex = keyValue.indexOf(code.charAt(i))
            val = Zx.charAt(chAtIndex)
        } else {
            if(code.charAt(i) == ' ') {
                val = ' '
            } else {
                val = '\n'
            }
        }
        plaintext += val
    }
    return plaintext
}

// encode affine
function encodeAffine(plaintextTextarea, keyA, keyB, Zx) {
    let plaintext = plaintextTextarea.value
    let keyAValue = parseInt(keyA.value)
    let keyBValue = parseInt(keyB.value)
    let code = ''
    for(let i = 0; i < plaintext.length; i++) {
        let val = ''
        if(Zx.indexOf(plaintext.charAt(i)) >= 0) {
            let chAtIndex = (keyAValue*Zx.indexOf(plaintext.charAt(i)) + keyBValue) % Zx.length
            val = Zx.charAt(chAtIndex)
        } else {
            if(plaintext.charAt(i) == ' ') {
                val = ' '
            } else {
                val = '\n'
            }
        }
        code += val
    }
    return code
}

// decode affine
function decodeAffine(codeTextarea, keyA, keyB, Zx) {
    let code = codeTextarea.value
    let invertibleA = getInvertible(keyA, Zx)
    console.log(invertibleA)
    let keyBValue = parseInt(keyB.value)
    let plaintext = ''
    for(let i = 0; i < code.length; i++) {
        let val = ''
        if(Zx.indexOf(code.charAt(i)) >= 0) {
            let temp = invertibleA * (Zx.indexOf(code.charAt(i)) - keyBValue)
            let chAtIndex = 0
            if(temp >= 0) {
                chAtIndex = temp % Zx.length
            } else {
                chAtIndex = temp + ((Math.floor(Math.abs(temp)/Zx.length) + 1) * Zx.length)
            }
            val = Zx.charAt(chAtIndex)
        } else {
            if(code.charAt(i) == ' ') {
                val = ' '
            } else {
                val = '\n'
            }
        }
        plaintext += val
    }
    return plaintext
}