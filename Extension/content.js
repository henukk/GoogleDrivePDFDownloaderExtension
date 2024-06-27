// Inyecta el script jsPDF en la página
let trustedURL = chrome.runtime.getURL("jspdf.min.js");
let scriptElement = document.createElement("script");
scriptElement.src = trustedURL;
scriptElement.onload = function () {
    // Inyecta el script principal después de que jsPDF se haya cargado
    let mainScriptURL = chrome.runtime.getURL("main.js");
    let mainScriptElement = document.createElement("script");
    mainScriptElement.src = mainScriptURL;
    mainScriptElement.onerror = function () {
        console.error("Error al cargar el archivo main.js.");
    };
    document.body.appendChild(mainScriptElement);
};
scriptElement.onerror = function () {
    console.error("Error al cargar el archivo jsPDF.");
};
document.body.appendChild(scriptElement);
