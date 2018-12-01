const myStorage = localStorage;

const copyTexts = document.querySelectorAll(".copyText");
const lists = document.getElementById("list-group");
const copyBtn = document.getElementById("copyBtn");

// copyBtn.addEventListener("click", () => {
//     let data = {};
//     let i = 0;
//     copyTexts.forEach((e) => {
//         data[i] = e.value;
//         i++;
//     });
//     myStorage.setItem("copytxt", JSON.stringify(data));
//     copyBtn.insertAdjacentHTML("beforebegin", "<p><input type='text' class='copyText form-control'></p>");
// });

copyBtn.addEventListener("click", () => {
    let data = {};
    let i = 0;
    copyTexts.forEach((e) => {
        data[i] = e.value;
        navigator.clipboard.writeText(data[i])
        .then(() => {
            console.log("copied to clipboard");
        })
        .catch((err) => {
            console.error(err);
        });
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
// window.addEventListener("DOMContentLoaded", () => {
//     const copyButton = document.getElementById('copy');
//     copyButton.addEventListener('click', function () {
//         copy();
//     }, false);    
// }, false);

const paste = function () {
    navigator.clipboard.readText()
        .then((txt) => {
            document.getElementById('pasteArea').textContent = txt;
        })
        .catch((err) => {
            console.error(err);
        });
};
// window.addEventListener("DOMContentLoaded", () => {
//     const pasteButton = document.getElementById('paste');
//     pasteButton.addEventListener('click', function () {
//         paste();
//     }, false);
// }, false);


navigator.permissions.query({name: "clipboard-read"})
    .then((result) => {
        console.log(result);
        if(result.state === "granted") {
            console.info("クリップボードの変更を検知可能");
        } else if(result.state === "prompt") {
            console.info("クリップボードのreadパーミッションの許可が必要");
        } else if(result.state === "denied") {
            console.error("クリップボードのreadパーミッションが付与されていません。");
        }

        result.onchange = () => {
            console.info("パーミッションが変更されました。");
        }
    });


window.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("keydown",function(e){
        e = e || window.event;
        var key = e.which || e.keyCode; // keyCode detection
        var ctrl = e.ctrlKey ? e.ctrlKey : ((key === 17) ? true : false); // ctrl detection
    
        if ( key == 86 && ctrl )
        {
            paste();
        }
        // else if ( key == 67 && ctrl )
        // {
        //     copy();
        // } 
    },false);
});
