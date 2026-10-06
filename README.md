# Trabajo práctico 04
## Descripción
Programa que permite leer un catálogo de mascotas desde un archivo mascotas.json , ubicado dentro de la carpeta datos. 
Este programa permite leer el contenido del archivo mascotas.json, guardandolo en una constante cuyo contenido es utilizado a traves del servidor express, para poder mostrar con distintos EndPoints como ser: 
* Listado de todas las mascotas.
* Mostrar el detalle de una mascota seleccionada (especificada por id en el endpoint).
* Agregar una nueva mascota. 

## Instalación
Para poder ejecutar el programa en cualquier PC, se descargan los archivos del repositorio, luego abrir la carpeta en Visual Studio, abrir una terminal haciendo click en la barra de Menú en los 3 puntos("...") que aparecen al final, seleccionar el submenú "Terminal", y dentro del submenú que se despliega elegir la Opcion "Nuevo terminal".
Al abrirse en la parte inferior de la ventana de Visual Studio la terminal, ahi escribir lo siguiente:
"npm install", esto creará una carpeta llamada "node_modules" la cual contendrá las dependencias incluidas en el archivo "package.json".

## Ejecución
Para poder ejecutarlo se debe abrir una terminal haciendo click en la barra de Menú en los 3 puntos("...") que aparecen al final, seleccionar el submenú "Terminal", y dentro del submenú que se despliega elegir la Opcion "Nuevo terminal".
Al abrirse en la parte inferior de la ventana de Visual Studio la terminal, ahi escribir lo siguiente: "npm run check" (chequea que las rutas del proyecto esten correctas y existan), y para ejecutar el programa escribir "npm start" y presionar la tecla Enter, esto ejecutará el programa que levantar el servidor en el puerto 3000 (direccion de acceso: http://localhost:3000/). Ambos son scripts que realizan las funciones descriptas anteriormente.
Para detener el servidor se debe presionar las teclas CTRL + C.

## Páginas y rutas
* GET: http://localhost:3000/ (Pagina de Inicio)
* GET: http://localhost:3000/mascotas (Listado de mascotas)
* GET: http://localhost:3000/mascotas/:id (Detalle de una mascota seleccionada)
* GET: http://localhost:3000/mascotas/nueva (Formulario para cargar una nueva mascota)
* POST: http://localhost:3000/mascotas (Envio de datos del Formulario para guardar la nueva mascota)

## Estructura de vistas
* views/
*   |-- layouts/
*       |-- main.ejs
*   |-- partials/
*   |   |-- encabezado.ejs
*   |   |-- pie.ejs
*   |-- mascotas/
*   |   |-- lista.ejs
*   |   |-- detalle.ejs
*   |   |-- nueva.ejs
*   |-- inicio.ejs
*   |-- no-encontrado.ejs

## Recursos estáticos
* Imagen: /public/img/mascota.png
* Hoja de estilos: /public/css/estilos.css
* Scripts: /public/js/app.js


## Formulario
En el Formulario para agregar una nueva mascota se pueden ingresar los siguientes datos:
* Nombre
* Especie
* Edad (el valor ingreado debe ser numérico y mayor o igual 0)
* Descripcion
* Estado (Se podra selecionar entre las opciones: adopcion, reservada, adoptada)
Al presionar el botón Guardar mascota severificará que se hayan ingresado y/o seleccionado todos los datos, asi como que sean correctos. Caso contrario se mostrará el formulario con los datos ingrsados y con un mensaje en la parte superior informando el/los datos erróneos.

## Persistencia de los datos
Al realizar el siguiente Endpoint con el método POST: http://localhost:3000/mascotas, con los datos enivados en formato JSON de la nueva mascota y es exitoso, la nueva mascota debe aparecer en el listado mientras el servidor continúe activo.
Al reiniciar el servidor, la mascota desaparecerá, porque la aplicación vuelve a cargar el JSON original. No se guardará el cambio en el archivo mascotas.json.

## 1
* Layout: Es el esqueleto o la plantilla principal que define la estructura global de la página: contiene <html>, <head>, la barra de navegación general y el pie de página. 
Envuelve a las demás páginas para no repetir código de la estructura principal.

* Vista: Es la página específica o contenido único que responde a una ruta concreta (por ejemplo detalle.ejs, lista.ejs, nueva.ejs). Se agrega dentro del layout principal.

* Parcial(Partial): Es un fragmento pequeño de código HTML reutilizable, que se inserta en varias vistas o en el layout (como el encabezado o pie de página).

## 2
La sintaxis es: res.render(vista, [datos], [callback]):
* Vista: El nombre o la ruta del archivo de plantilla (por ejemplo lista.ejs) ubicado en la carpeta de vistas.

* Datos: Un objeto de JavaScript cuyas propiedades se convierten en variables disponibles dentro de la plantilla a ser mostradas.

## 3
La función express.static() es un middleware integrado en Express, que permite utilizar archivos estáticos directamente (como ser imágenes, archivos CSS, JavaScript y documentos HTML), sin necesidad de programar una ruta específica para cada archivo.
Cuando se configura este middleware indicando una carpeta (por ejemplo, llamada public), le dices a Express que busque automáticamente dentro de ese directorio cada vez que el navegador solicite un recurso estático.

## 4
La función express.urlencoded() es un middleware integrado en Express que permite recibir datos enviados por el formulario html a través de solicitudes HTTP (como POST o PUT).

## 5
El recorrido POST,Redireccion y GET es un diseño de desarrollo web muy utilizado, para evitar que los usuarios reenvíen formularios accidentalmente al recargar una página.
Este recorrido introduce un paso intermedio para limpiar el historial del navegador:
1. POST: El usuario envía los datos del formulario. El servidor los procesa (los guarda en la base de datos por ejemplo).
2. Redirección: En lugar de renderizar una página, el servidor responde con una instrucción de redirección (código HTTP 302 o 303) hacia una nueva URL.
3. GET: El navegador del usuario recibe la redirección, y automáticamente hace una nueva petición, esta vez de tipo GET, a la URL indicada.
4. Respuesta: El servidor responde con la página de éxito. Si el usuario recarga la página, solo refrescará la petición GET, sin volver a enviar los datos.

## 6
Al reiniciar el servidor, la nueva mascota desaparecerá, porque la aplicación vuelve a cargar el JSON original. No se guardará el cambio en el archivo mascotas.json.
