function writer(text, element, duration) {
    text = String(text)
    text = text || "Sample Text";
    element = element || document.body;
    duration = duration || 200;
    let len = text.length;
    let i = 0;
    let loop = setInterval(() => {
        if (i >= len) {
            clearInterval(loop)
        } else {
            element.innerHTML += text[i];
        }
        i++;
    }, duration);
}