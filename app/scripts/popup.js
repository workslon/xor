/**
  * @desc initialize popup view interaction
  * @author Vitaliy Sobur workslon@gmail.com
  * @required code.js
*/

'use strict';

var Popup = (function () {

    var d           = document,
        passField   = d.getElementById('password'),
        textArea    = d.getElementById('message'),
        button      = d.getElementById('send-btn'),

        /**
          * @desc get password filed input value
          * @return {string} passsword
        */
        getPassword = function () {
            return passField.value;
        },

        /**
          * @desc get textarea input value
          * @return {string} text
        */
        getText = function () {
            return textArea.value;
        },

        /**
          * @desc set textarea input value
          * @return {string} text
        */
        setText = function (text) {
            textArea.value = text;
        },

        /**
          * @desc get all available form data
          * @return {object} data
        */
        getData = function () {
            var password    = getPassword(),
                text        = getText();

            return {
                password    : password,
                text        : text
            };
        },

        /**
          * @desc save textarea input value to localStorage
          * @return void
        */
        saveData = function () {
            var data = getText();
            window.localStorage.setItem('workslon.xor.input', data);
        },

        /**
          * @desc restore textarea input value to localStorage
          * @return void
        */
        restoreData = function () {
            var data = window.localStorage.getItem('workslon.xor.input');
            data && setText(data);
        },

        /**
          * @desc get code method name
          * @return {string} wording
        */
        getMethodName = function () {
            var input = textArea.value;

            if (unescape(input) === input) {
                return 'encode';
            } else {
                return 'decode';
            }
        },

        /**
          * @desc change button wording
          * @param {string} wording
        */
        changeBtnWording = function (wording) {
            button.innerHTML = wording;
        },

        /**
          * @desc select (highlight) textarea content
        */
        selectContent = function () {
            textArea.select();
        },

        /**
          * @desc button click handler
        */
        btnClickHandler = function () {
            var data = getData(),
                out, wording;

            // encode/decode input
            out = code(data.text, data.password);
            textArea.value = out;

            // change button wording
            wording = getMethodName();
            changeBtnWording(wording);

            // select encoded/decoded content
            selectContent();

            //save data
            saveData();
        },

        /**
          * @desc text area input event handler
        */
        textAreaInputHandler = function () {
            // change button wording
            var wording = getMethodName();
            changeBtnWording(wording);
            saveData();
        },

        /**
          * @desc popup view initialization
        */
        init = (function () {
            restoreData();
            selectContent();
            button.addEventListener('click', btnClickHandler);
            textArea.addEventListener('input', textAreaInputHandler);
        })();
})();