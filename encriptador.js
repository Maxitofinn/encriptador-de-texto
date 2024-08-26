// Mapa de letras a sus representaciones encriptadas
const letraANumero = {
    'e': 'enter',
    'i': 'imes',
    'a': 'ai',
    'o': 'ober',
    'u': 'ufat'
};

// Crear un objeto para desencriptar
const numeroALetra = Object.fromEntries(
    Object.entries(letraANumero).map(([letra, encriptado]) => [encriptado, letra])
);

// Función para encriptar un texto
function encriptarTexto(texto) {
    let textoEncriptado = '';
    for (let i = 0; i < texto.length; i++) {
        const letra = texto[i];
        if (letraANumero[letra] !== undefined) {
            textoEncriptado += letraANumero[letra];
        } else {
            textoEncriptado += letra; // Dejar letras no mapeadas tal como están
        }
    }
    return textoEncriptado;
}

// Función para desencriptar un texto
function desencriptarTexto(texto) {
    let textoDesencriptado = '';
    let i = 0;

    while (i < texto.length) {
        let encontrado = false;

        // Intentar encontrar una coincidencia de las cadenas en numeroALetra
        for (const [encriptado, letra] of Object.entries(numeroALetra)) {
            if (texto.startsWith(encriptado, i)) {
                textoDesencriptado += letra;
                i += encriptado.length;
                encontrado = true;
                break;
            }
        }

        // Si no se encuentra ninguna coincidencia, añadir el carácter actual
        if (!encontrado) {
            textoDesencriptado += texto[i];
            i++;
        }
    }

    return textoDesencriptado;
}

// Función que se llama cuando se hace clic en el botón de encriptar
function encriptar() {
    // Obtener el valor del campo de entrada
    const mensaje = document.getElementById('mensaje').value;
    // Encriptar el mensaje
    const textoEncriptado = encriptarTexto(mensaje);
    // Mostrar el resultado
    document.getElementById('resultado').textContent = textoEncriptado;
    var imagen=document.getElementById("imagen");
    imagen.remove();
    document.getElementById("texto_a_quitar").textContent="";
}

// Función que se llama cuando se hace clic en el botón de desencriptar
function desencriptar() {
    // Obtener el valor del campo de entrada
    const mensaje = document.getElementById('mensaje').value;
    // Desencriptar el mensaje
    const textoDesencriptado = desencriptarTexto(mensaje);
    // Mostrar el resultado
    document.getElementById('resultado').textContent = textoDesencriptado;
}

function copiar() {
    // Obtener el contenido del elemento de resultado
    const texto = document.getElementById('resultado').textContent;
    
    // Crear un área de texto temporal para copiar el texto
    const tempInput = document.createElement('input');
    tempInput.value = texto;
    document.body.appendChild(tempInput);
    
    // Seleccionar y copiar el contenido
    tempInput.select();
    document.execCommand('copy');
    
    // Eliminar el área de texto temporal
    document.body.removeChild(tempInput);
    
    // Opcional: Avisar al usuario que el texto se copió
    alert('Texto copiado al portapapeles!');
}

