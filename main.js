const myStorage = localStorage;

const copyTexts = document.querySelectorAll(".copyText");
const lists = document.getElementById("list-group");
const copyBtn = document.getElementById("copyBtn");

copyBtn.addEventListener("click", () => {
    const copyTexts = document.querySelectorAll(".copyText");
    let data = {};
    let i = 0;
    copyTexts.forEach((e) => {
        data[i] = e.value;
        i++;
    });
    myStorage.setItem("copytxt", JSON.stringify(data));
    copyBtn.insertAdjacentHTML("beforebegin", "<p><input type='text' class='copyText form-control'></p>");
});

const parseCopyTxts = JSON.parse(myStorage.getItem("copytxt"));
if(parseCopyTxts instanceof Object) {
    let mappingValue = Object.keys(parseCopyTxts).map((key) => {
        return parseCopyTxts[key];
    });
    // 配列からfalsyな値を排除する
    mappingValue = mappingValue.filter(Boolean);
    console.log(mappingValue);

    for(let j = 0; j < mappingValue.length; j++) {
        lists.insertAdjacentHTML("beforeend", "<li class='list-group-item'>" + mappingValue[j] + "</li>");
        console.log(mappingValue[j]);
    }
}



// Async Clipboard API を使用したクリップボード操作の実装（現状はテキストのみに対応）

const copy = function () {
    navigator.clipboard.writeText(document.getElementById('copyText').value)
    .then(function () {
        console.log('copied to clipboard');
    }, function () {
        console.log('failed to copy');
    });
};
window.addEventListener("DOMContentLoaded", () => {
    const copyButton = document.getElementById('copy');
    copyButton.addEventListener('click', function () {
        copy();
    }, false);    
}, false);

const paste = function () {
    navigator.clipboard.readText()
    .then(function (text) {
        document.getElementById('pasteArea').textContent = text;
    }, function () {
        console.log('failed to paste');
    });
};
window.addEventListener("DOMContentLoaded", () => {
    const pasteButton = document.getElementById('paste');
    pasteButton.addEventListener('click', function () {
        paste();
    }, false);
}, false);
