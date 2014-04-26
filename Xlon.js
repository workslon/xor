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
            inLength    = input.length,

        for (i = 0; i < pwLength; i ++) {
            arNumberPw[i] = cryptTable.indexOf(password.charAt(i));
        }

        for (i = 0, j = 0; i < inLength; i ++, j ++) {
            if (j === pwLength) j = 0;
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