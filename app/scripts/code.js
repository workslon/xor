/**
  * @desc provides encode/decode functionality
  * @author Vitaliy Sobur workslon@gmail.com
*/

'use strict';

/**
  * @param {string} input
  * @param {string} password
  * @return {string} output
*/
var code = function (input, password) {
    var method          = (unescape(input) === input) ? 'encode' : 'decode',
        input           = unescape(input),
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
                output.push(escape(charFromCode));
            } else {
                output.push(charFromCode);
            }
        }

    return output.join('');
};