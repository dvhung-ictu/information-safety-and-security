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

// decode substitution cipher