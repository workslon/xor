;(function () {
    "use strict";

    var cryptTable  =   "0123456789  !@#$%^&*()`'-=[];,./?_+{}|:<> " +
                        "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
                        "abcdefghijklmnopqrstuvwxyz" +
                        "ЯЧСМИТЬБЮФЫВАПРОЛДЖЭЙЦУКЕНГШЩЗХЪЁ" +
                        "ячсмитьбюфывапролджэйцукенгшщзхъё" +
                        "ЇЄҐ" +
                        "їєґ" +
                        "ÖÄÜß" +
                        "öäüß" +
                        "~",

        cryptLength = cryptTable.length,
        escapeChar  = cryptTable.charAt(cryptLength),
        lineFeed    = "\n",
        doubleQuote = '"',

        encrypt = function (input, password) {
            var i, // input index
                j, // password index
                inChar,
                inValue,
                outValue,
                output      = "",
                arNumberPw  = [],
                pwLength    = password.length,
                inLength    = input.length;

            for (j = 0; j < pwLength; j ++) {
                arNumberPw[j] = cryptTable.indexOf(password.charAt(j));
            }

            for (i = 0, j = 0; i < inLength; i ++, j ++) {
                if (j === pwLength) {
                    j = 0;
                }

                inChar = input.charAt(i);
                inValue = cryptTable.indexOf(inChar);

                if (inValue !== -1) {
                    outValue = arNumberPw[j] ^ inValue;

                    if (outValue >= cryptLength) {
                        outValue = escapeChar + cryptTable.charAt(outValue - cryptLength);
                    } else {
                        outValue = cryptTable.charAt(outValue);
                    }

                } else if (inChar=="\r") {
                    outValue = escapeChar + escapeChar;
                    if (input.charAt(i + 1) === "\n") i ++;
                } else if (inChar === "\n") {
                    outValue = escapeChar + escapeChar;
                } else if (inChar === doubleQuote) {
                    outValue = escapeChar + "'";
                } else {
                    outValue = inChar;
                }

                output += outValue;
            }

            return output;
        },

        decrypt = function (input, password) {
            var i, //input index
                j,
                inChar,
                inValue,
                outValue,
                escape      = false,
                output      = "",
                arNumberPw  = [],
                pwLength    = password.length,
                inLength    = input.length;

            for (j = 0; j < pwLength; j ++) {
                arNumberPw[j] = cryptTable.indexOf(password.charAt(j));
            }

            for (i = 0, j = 0; i < inLength; i ++, j ++) {
                if (j >= pwLength) {
                    j = 0;
                }

                inChar = input.charAt(i);
                inValue = cryptTable.indexOf(inChar);

                if (inValue === -1) {
                    outValue = inChar;
                } else if (escape) {
                    if (inValue === cryptLength) {
                        outValue = lineFeed;
                        inValue = -1;
                    } else if (inChar === "'") {
                        outValue = doubleQuote;
                        inValue = -1;
                    } else {
                        inValue += cryptLength;
                    }

                    escape=false;
                } else if (inValue === cryptLength) {
                    escape = true;
                    j --;
                    outValue = "";
                    inValue=-1;
                }

                if (inValue !== -1) {
                    outValue = cryptTable.charAt(arNumberPw[j] ^ inValue);
                }

                output += outValue;
            }

            return output;
        };
})();