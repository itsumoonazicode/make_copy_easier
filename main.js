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