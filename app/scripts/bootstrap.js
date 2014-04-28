'use strict';

chrome.pageAction.onClicked.addListener(function(tab) {
    chrome.pageAction.show(tab.id);
});