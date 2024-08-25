const d = document;
const texArea = d.querySelector(".form__input");
const imagenMuneco = d.querySelector(".result__img");
const loaderPunto = d.querySelector(".loader");
const progressTitle = d.querySelector(".result__title");
const resultadoText = d.querySelector(".result__text");
const botonEncriptar = d.querySelector(".form__boton");
const botonDesencriptar = d.querySelector(".form__boton--secundary");
const botonCopiar = d.querySelector(".result__btn");
const llaves = [
    ["a", "ai"],
    ["e", "enter"],
    ["i", "imes"],
    ["o", "ober"],
    ["u", "ufat"]
];
// Función para encriptar
function encriptarMensaje(mensaje) {
    let mensajeEncriptado = "";
    for (let i = 0; i < mensaje.length; i++) {
        let letra = mensaje[i];
        let encriptada = letra;
        for (let j = 0; j < llaves.length; j++) {
            if (letra === llaves[j][0]) {
                encriptada = llaves[j][1]; // Reemplaza la letra por palabra definida
                break; // Da término al bucle cuando se encuentra la palabra
            }
        }
        mensajeEncriptado += encriptada;
    }
    return mensajeEncriptado;
}
// Función para desencriptar
function desencriptarMensaje(mensaje) {
    let mensajeDesencriptado = mensaje;
    for (let i = 0; i < llaves.length; i++) {
        let regex = new RegExp(llaves[i][1], 'g');
        mensajeDesencriptado = mensajeDesencriptado.replace(regex, llaves[i][0]);
    }
    return mensajeDesencriptado;
}
texArea.addEventListener("input", (e) => {
    imagenMuneco.style.display = "none"
    loaderPunto.classList.remove("hidden");
    progressTitle.textContent ="Registrando mensaje."
    resultadoText.textContent = "";
});
//Funcion del boton para encriptar
botonEncriptar.addEventListener("click", (e) => { 
    e.preventDefault();
    let mensaje = texArea.value.toLowerCase();
    let mensajeEncriptado = encriptarMensaje(mensaje)
    resultadoText.textContent = mensajeEncriptado;
    botonCopiar.classList.remove("hidden");
    progressTitle.textContent = "El resultado es:";
})
// Función del botón para desencriptar
botonDesencriptar.addEventListener("click", (e) => {
    e.preventDefault();
    let mensaje = texArea.value.toLowerCase();
    let mensajeDesencriptado = desencriptarMensaje(mensaje);
    resultadoText.textContent = mensajeDesencriptado;
    progressTitle.textContent = "El resultado es:";
    botonCopiar.classList.remove("hidden");
});
// Función del botón para copiar al portapapeles
botonCopiar.addEventListener('click', () => {
    let textoCopiado = resultadoText.textContent;
    navigator.clipboard.writeText(textoCopiado).then(() => {
        imagenMuneco.style.display = "block"
        loaderPunto.classList.add("hidden")
        progressTitle.textContent = "El texto ha sido copiado."
        botonCopiar.classList.add("hidden");
        resultadoText.textContent = ""
        console.log(`Se copió el texto: ${textoCopiado}`);
    }).catch(err => {
        console.error('Error al copiar el texto: ', err);
    });
});
