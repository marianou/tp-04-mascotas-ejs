const fs = require("node:fs/promises");

async function leerJson(ruta) {
    const texto = await fs.readFile(ruta, "utf-8");
    
    if(!texto || texto.trim() === ''){
        console.log("Archivo JSON vacio");
        return [];
    }
    try{
        return JSON.parse(texto);
    }catch(error){
        console.error("Error al parsear el JSON:", error);
    }
    
}

module.exports = {
    leerJson,
};