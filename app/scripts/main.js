'use strict';

document.addEventListener('DOMContentLoaded', function () {
    var d           = document,
        passField   = d.getElementById('password'),
        textArea    = d.getElementById('message'),
        button      = d.getElementById('send-btn'),

        getPassword = function () {
            return passField.value;
        },

        getText = function () {
            return textArea.value;
        },

        getData = function () {
            var password    = getPassword(),
                text        = getText();

            return {
                password    : password,
                text        : text
            };
        },

        btnClickHandler = function () {
            var data = getData(),
                out;

            out = code(data.text, data.password);
            textArea.value = out;
        };

    button.addEventListener('click', btnClickHandler);
});