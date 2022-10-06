const z26 = 'abcdefghijklmnopqrstuvwxyz'

// encode shift cipher
function encodeShiftCipher(plaintextTextarea, key) {
    let plaintext = plaintextTextarea.value
    let keyValue = parseInt(key.value)
    let code = ''
    for(let i = 0; i < plaintext.length; i++) {
        let val = ''
        if(z26.indexOf(plaintext.charAt(i)) >= 0) {
            let chAtIndex = (z26.indexOf(plaintext.charAt(i)) + keyValue) % z26.length
            val = z26.charAt(chAtIndex)
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

// encode substitution cipher

// decode substitution cipher