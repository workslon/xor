'use strict';

var code = function (input, password) {
    var method          = (decodeURI(input) === input) ? 'encode' : 'decode',
        input           = decodeURI(input),
        inputLength     = input.length,
        passLength      = password.length,
        inputCharCode   = 0,
        passCharCode    = 0,
        charFromCode    = '',
        output          = [],
        i               = 0;

        for (; i < inputLength; i ++) {
            inputCharCode   = input.charCodeAt(i);
            passCharCode    = password.charCodeAt(i % passLength);

            if (inputCharCode !== passCharCode) {
                inputCharCode ^= passCharCode;
            }

            charFromCode = String.fromCharCode(inputCharCode);

            if (method === 'encode') {
                output.push(encodeURI(charFromCode));
            } else {
                output.push(charFromCode);
            }
        }

    return output.join('');
};