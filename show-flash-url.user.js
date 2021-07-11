// ==UserScript==
// @name         Show Flash URL
// @namespace    https://github.com/lxfly2000/show-flash-url/raw/master/show-flash-url.user.js
// @version      1.0.5
// @updateURL    https://github.com/lxfly2000/show-flash-url/raw/master/show-flash-url.user.js
// @downloadURL  https://github.com/lxfly2000/show-flash-url/raw/master/show-flash-url.user.js
// @description  显示网页中的Flash链接
// @author       lxfly2000
// @match        */*
// @grant        none
// ==/UserScript==

function ShowFlashURL_StandarizeURL(str){
    return new URL(str,location.href).href;
}

(function() {
    'use strict';

    var flashObjs=document.querySelectorAll("object[classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000']");
    for(var i=0;i<flashObjs.length;i++){
        var divLink=document.createElement("div");
        var linkText=document.createElement("a");
        divLink.append(linkText);
        var param=flashObjs[i].querySelector("param[name=movie]").value;
        if(param!=undefined&&param!=""){
            linkText.innerText=linkText.href=ShowFlashURL_StandarizeURL(param);
            console.log("发现Flash资源(ActiveX)：["+i+"]"+linkText);
            flashObjs[i].insertAdjacentElement("afterend",divLink);
        }
    }
    //Non-IE case
    if(flashObjs.length==0){
        flashObjs=document.querySelectorAll("object[type='application/x-shockwave-flash']");
        for(i=0;i<flashObjs.length;i++){
            divLink=document.createElement("div");
            linkText=document.createElement("a");
            divLink.append(linkText);
            param=flashObjs[i].data;
            if(param!=undefined&&param!=""){
                linkText.innerText=linkText.href=ShowFlashURL_StandarizeURL(param);
                console.log("发现Flash资源(Plugin)：["+i+"]"+linkText);
                flashObjs[i].insertAdjacentElement("afterend",divLink);
            }
        }
    }
})();
