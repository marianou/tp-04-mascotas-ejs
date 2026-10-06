const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("node:path");

const {leerJson} = require("./archivos");

//definir puerto
const PORT = 3000;

//construir ruta absoluta para el archivo plantas.json
const rutaDatos = path.join(__dirname,"..","datos","mascotas.json");


async function main(){
    try {
        const mascotas = await leerJson(rutaDatos);
        const app = express();

        console.log(mascotas.length);
        //Indica que las vistas utilizaran el motor de plantillas ejs
        app.set("view engine", "ejs");
        
        //indica donde se encuentran  las vistas de la aplicación
        app.set("views", path.join(__dirname,"..", "views"));

        
        //activamos el soporte para layouts compartidos
        app.use(expressLayouts);

        //definir el layout utilizado por defecto
        app.set("layout", "layouts/main");
        
        //expone los archivos estáticos de la carpeta
        app.use(express.static(path.join(__dirname,"..","public")));

        //Permite recibir datos enviados por el formulario html
        app.use(express.urlencoded({extended: false}));

        
        app.get("/", (req, res) => {
            //console.log(plantas);
            res.render("inicio",{titulo: "Mascotas Adorables"});
            console.log("Ruta: ", __dirname);
        });

        app.get("/mascotas", (req, res) => {
            res.render("mascotas/lista",{
            titulo: "Catálogo de mascotas",
            mascotas});
        });

        app.get("/mascotas/nueva", (req, res) =>{
            res.render("mascotas/nueva", {
                titulo: "Nueva mascota",
                error: null,
                valores: {},
            })
         });

        app.get("/mascotas/:id", (req, res) => {
            const mascota = mascotas.find((m) => m.id === Number(req.params.id));  
            
            if(!mascota){
                return res.status(404).render("no-encontrado", {
                    titulo: "Mascota no encontrada",
                    mensaje: "No existe una mascota con ese identificador"
                });
            }
            
            return res.status(200).render("mascotas/detalle",{
             titulo: mascota.nombre,
             mascota});
        });

         app.post("/mascotas",(req, res) => {
            const {nombre, especie, edad, descripcion, estado} = req.body;

            if(!nombre || !especie || !edad || !descripcion || !estado ){
                return res.status(400).render("mascotas/nueva", {
                    titulo: "Nueva mascota",
                    error: "Completa todos los campos",
                    valores: req.body,
                });
            }

            
            if(Number(edad)<0 || isNaN(edad) === true){
                return res.status(400).render("mascotas/nueva", {
                    titulo: "Nueva mascota",
                    error: "Carga una edad válida",
                    valores: req.body,
                });
            }

            const imagen = "/img/mascota.png"
            const ultimoid = mascotas.length === 0 ? 0 : mascotas[mascotas.length - 1].id;
            mascotas.push({
                nombre,
                id: ultimoid + 1,
                especie, 
                edad, 
                descripcion, 
                estado,
                imagen
            });    
            res.redirect("mascotas");
         });

        app.listen(PORT, () => {
            console.log(`Servidor escuchando en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Error al iniciar el servidor:",error);
    }
}

main();