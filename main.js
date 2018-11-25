const myStorage = localStorage;

const copyTexts = document.querySelectorAll(".copyText");
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
});
