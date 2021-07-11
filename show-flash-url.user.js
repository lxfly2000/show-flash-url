// ==UserScript==
// @name         Show Flash URL
// @namespace    https://github.com/lxfly2000/show-flash-url/raw/master/show-flash-url.user.js
// @version      1.0
// @updateURL    https://github.com/lxfly2000/show-flash-url/raw/master/show-flash-url.user.js
// @downloadURL  https://github.com/lxfly2000/show-flash-url/raw/master/show-flash-url.user.js
// @description  显示网页中的Flash链接
// @author       lxfly2000
// @match        */*
// @grant        none
// ==/UserScript==

function ShowFlashURL_StandarizeURL(str){
    return new URL(str).href;
}

function ShowFlashURL_GetURL(objDom){
    var str=objDom.querySelector("param[name=movie]").value;
    return ShowFlashURL_StandarizeURL(str);
}

(function() {
    'use strict';

    var flashObjs=document.querySelectorAll("object[classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000']");
    for(var i=0;i<flashObjs.length;i++){
        var linkText=document.createElement("a");
        linkText.innerText=linkText.href=ShowFlashURL_GetURL(flashObjs[i]);
        console.log("发现Flash资源：["+i+"]"+linkText);
        flashObjs[i].parentElement.append(linkText);
    }
})();
