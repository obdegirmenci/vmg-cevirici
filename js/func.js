const charList =
{
    "=C4=9E": "Ğ",
    "=C4=9F": "ğ",
    "=C4=B0": "İ",
    "=C4=B1": "ı",
    "=C3=9C": "Ü",
    "=C3=BC": "ü",
    "=C3=96": "Ö",
    "=C3=B6": "ö",
    "=C3=B6": "ö",
    "=C3=87": "Ç",
    "=C3=A7": "ç",
    "=C5=9E": "Ş",
    "=C5=9F": "ş",
    "=20": " ",
};

document.addEventListener('DOMContentLoaded', pageReady(), false);

function pageReady() {
    let middle =  document.querySelector(".middle");
    let area =  document.querySelector(".vmg-form__area");

    //area.value= Object.keys(charList);
    middle.addEventListener('click', e => { captureClick(e) }, false);
    middle.addEventListener('mouseout', e => { captureOut(e) }, false);
}

function captureClick(e) {
    let el = e.target.className;

    if (el === "vmg-controls__submit") {
        e.preventDefault();
        convert();
    } else if (el === "vmg-controls__copy") {
        changeToolTip();
        copyText();
    } else if (el === "vmg-controls__paste") {
        //changeToolTip();
        pasteText();
    }
}

function captureOut(e) {
    let el = e.target.className;

    if (el === "vmg-controls__copy") {
        changeToolTip("reset");
    }
}

function convert() {
    let message = document.querySelector(".vmg-form__area").value;
    let newMessage = message;

    //console.log(`Old Message:\n${message}`);

    for ([key, value] of Object.entries(charList)){
        //console.log(`${key} ${value}`);
        newMessage = newMessage.replaceAll(key, value);
    }

    //console.log(`New Message:\n${newMessage}`)
    printResult(newMessage);
}

function printResult(result) {
    let outputEl = document.querySelector(".vmg-form__result");

    outputEl.value = result;
}

function copyText() {
    let text = document.querySelector(".vmg-form__result");

    text.select();
    text.setSelectionRange(0, 99999); /* For mobile */
    navigator.clipboard.writeText(text.value);
}

function changeToolTip(state) {
    let tooltip = document.querySelector(".tooltip-text__copy");
    let isNotEmpty = document.querySelector(".vmg-form__result").value.length;

    if (state === "reset") {
        tooltip.textContent = "Panoya Kopyala";
    } else if (!state && isNotEmpty) {
        tooltip.textContent = "Kopyalandı!";
    } else {
        tooltip.textContent = "Çeviri bulunamadı.";
    }
}