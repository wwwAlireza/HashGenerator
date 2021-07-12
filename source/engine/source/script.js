function selectElm(s) {
    return document.querySelector(s);
}
var hashType = "MD5";
// DOM

const hashTypesBtn = selectElm("#hashTypes");
const generateBtn = selectElm("#generateBtn");
const inputText = selectElm("#inputText");
const alertContainer = selectElm(".alert-container");
const alertClose = selectElm(".alert-close");
const alertText = selectElm("#alertText");
const hashContainer = selectElm(".hash-container");
const hashWrite = selectElm("#hash");



// events
alertClose.addEventListener("click", () => {
    newAlert.closeAlert();
    newAlert.clearInner();
})

inputText.addEventListener("input", () => {
    newAlert.closeAlert();
})

generateBtn.addEventListener("click", generateHash);
inputText.onkeypress = function(e) {
    if (e.key == "Enter" || e.charCode == 13) {
        generateHash()
    }
}

hashContainer.addEventListener('click', () => selectText(hashWrite));



function selectText(node) {

    if (document.body.createTextRange) {
        const range = document.body.createTextRange();
        range.moveToElementText(node);
        range.select();
    } else if (window.getSelection) {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(node);
        selection.removeAllRanges();
        selection.addRange(range);
    } else {
        console.warn("Could not select text in node: Unsupported browser.");
    }
    document.execCommand("copy");
    newAlert.copy();
}

function changeType(type) {
    hashType = type;
    hashType = type;
    hashTypesBtn.innerText = type + "  ";
}

function generateHash() {
    if (inputText.value) {
        if (inputText.value.length <= 30) {
            finallyGenerate(inputText.value);
        } else {
            newAlert.range();
        }
    } else {
        newAlert.empty();
    }
}

function finallyGenerate(val) {
    var hash;
    switch (hashType) {
        case "MD5":
            {
                try {
                    hash = CryptoJS.MD5(val);
                } catch (e) {
                    newAlert.unknown();
                }
            }
            break;
        case "SHA-1":
            {
                try {
                    hash = CryptoJS.SHA1(val);
                } catch (e) {
                    newAlert.unknown();
                }
            }
            break;
        case "SHA-512":
            {
                try {
                    hash = CryptoJS.SHA512(val);
                } catch (e) {
                    newAlert.unknown();
                }
            }
            break;
        case "SHA-256":
            {
                try {
                    hash = CryptoJS.SHA256(val);
                } catch (e) {
                    newAlert.unknown();
                }
            }
            break;
        case "RIPEMD-160":
            {
                try {
                    hash = CryptoJS.RIPEMD160(val);
                } catch (e) {
                    newAlert.unknown();
                }
            }
            break;
        default:
            {
                newAlert.unknown();
            }
            break;
    }
    if (hash) {
        fadeIn(hashContainer);
        hashWrite.innerText = "";
        writer(hash, hashWrite, 30)
    }
}



// animation

function fadeOut(elm) {
    let opacity = 1;
    let fadeLoop = setInterval(() => {
        if (opacity > 0) {
            opacity -= 0.1;
            elm.style.opacity = opacity;
        } else {
            clearInterval(fadeLoop);
            elm.style.visibility = "hidden"
            elm.style.opacity = "0";
        }
    }, 20)
}

function fadeIn(elm) {
    elm.style.visibility = "visible";
    elm.style.opacity = "0";
    let opacity = 0;
    let fadeLoop = setInterval(() => {
        if (opacity < 1) {
            opacity += 0.1;
            elm.style.opacity = opacity;
        } else {
            clearInterval(fadeLoop);
            elm.style.visibility = "visible"
            elm.style.opacity = "1";
        }
    }, 20)
}


// error handler

var newAlert = {
    empty: () => {
        newAlert.closeAlert();
        alertText.innerText = "Please write something";
        fadeIn(alertContainer);
        alertDanger();
        startTimeToClose();
    },
    range: () => {
        newAlert.closeAlert();
        alertText.innerText = "Count out of range";
        fadeIn(alertContainer)
        alertDanger();
        startTimeToClose();
    },
    unknown: () => {
        newAlert.closeAlert();
        alertText.innerText = "Unknown error";
        fadeIn(alertContainer)
        alertDanger();
        startTimeToClose();
    },
    clearInner: () => {
        alertText.innerText = "";
    },
    closeAlert: () => {
        fadeOut(alertContainer);
    },
    copy: () => {
        newAlert.closeAlert();
        alertText.innerText = "Hash copied !";
        fadeIn(alertContainer);
        alertSuccess();
        startTimeToClose();
    }
}

function alertSuccess() {
    alertContainer.classList.remove("alertDanger")
    alertContainer.classList.add("alertSuccess")
}

function alertDanger() {
    alertContainer.classList.remove("alertSuccess")
    alertContainer.classList.add("alertDanger")
}

function startTimeToClose() {
    if (CloseTimer) {
        clearTimeout(CloseTimer);
    }
    var CloseTimer = setTimeout(() => {
        newAlert.closeAlert();
    }, 4000);
}