# Sobre el proyecto zapping-stream


La prueba consiste en hacer un proyecto en NodeJS usando ExpressJS.
1.- Se entregará una máquina con Centos 8 limpia para que puedas instalar lo necesario.
2.- Debes crear un sitio web con 3 páginas.
- Crear Cuenta, Un formulario que solicite nombre, email y contraseña.
- Login
- Player
3.- Debes usar MYSQL para el registro de usuarios.
4.- Al Player solo deben poder ingresar usuarios Registrados.

A.- Player Backend
- Crear un microservicio que entregue un Live Streaming HLS con una aplicación
NodeJS.
- Utilizar los segmentos de video provistos, que duran 10 segundos cada uno.
- Se deben entregar 30s de video por request al servicio (5 segmentos)
- Para simular que es un livestreaming, cada 10 segundos se debe eliminar el último
segmento (primero de la lista) y agregar un segmento nuevo al final de la lista.
- La etiqueta EXT-X-MEDIA-SEQUENCE aumenta secuencialmente cuando se quita un
segmento.


Ejemplo archivo m3u8 Live Streaming HLS:
```
#EXTM3U
#EXT-X-VERSION:3
#EXT-X-TARGETDURATION:6
#EXT-X-MEDIA-SEQUENCE:1
#EXTINF:6.000000,
segmento_1.ts
#EXTINF:6.000000,
segmento_2.ts
#EXTINF:6.000000,
segmento_3.ts
#EXTINF:6.000000,
Segmento_4.ts
```

Link para descargar segmentos:
https://drive.google.com/file/d/1exGq6BJ6r1lXezOanp88sWwxqcMbDntJ/view?usp=shari
ng

B.- Frontend (Player)
- Debe tener un HTML con Javascript y un player HLS.js o Video.js para reproducir el
Livestreaming generado en NodeJS.
- Se puede utilizar Bootstrap y Jquery

Se observará:
- Orden de código.
- Buen uso de funciones asincronas y sincronas.
- Estructura de datos.
- Buen manejo de la memoria RAM.
Opcionales
- Cualquier función adicional interesante/divertida que el desarrollador quiera agregar.
- Cualquier detalle entretenido en las vistas HTML serán bienvenidos :)



# Sobre el postulante

https://www.linkedin.com/in/alexis-perez-monares/

# Construido con
NodeJS https://nodejs.org/
Express https://expressjs.com/
HTTP Live Streaming https://github.com/video-dev/hls.js
EJS Embedded JavaScript https://ejs.co/
Bootstrap https://getbootstrap.com/

# Pre requisitos (Dependencias)

Instalar gestor de paquetes para Node

```sh
npm install npm@latest -g
```

# Installar proyecto

## Crear carpeta root para el proyecto
```sh
mkdir home/zapping/ && cd home/zapping/
```
## Descargar fuentes desde Github

```sh
git clone https://github.com/nio-kedakai/zapping-stream.git
```


```sh
cd home/zapping/zapping-streaming
npm i
```


# Correr proyecto
## Usar comando en productivo

```sh
cd home/zapping/zapping-streaming
npm start
```


## Usar comando en modo desarrollo

```sh
cd home/zapping/zapping-streaming
npm run develop
```


# Árbol de Directorios
```
zapping-stream
├── Makefile
├── nodemon.json
├── package-lock.json
├── package.json
├── player.html
└── src
    ├── assets
    │   └── hls
    │       ├── HLS.js
    │       ├── playlist.m3u8
    │       ├── segment.m3u8
    │       ├── segment0.ts
    │       ├── segment1.ts
    │       ├── segment2.ts
    │       ├── segment[n-esimo].ts
    │       └── video.js 
    ├── controllers
    │   ├── crear.controller.js
    │   ├── login.controller.js
    │   └── player.controller.js
    ├── db
    │   └── conexion.js
    ├── models
    │   └── cuenta.model.js
    ├── routes.js
    ├── scripts
    │   ├── data.dummy.sql
    │   └── database.sql
    ├── server.js
    ├── utils
    │   └── HttpError.js
    └── views
        ├── fragments
        │   ├── footer.ejs
        │   ├── head.ejs
        │   └── header.ejs
        ├── js
        └── pages
            ├── crear.ejs
            ├── index.ejs
            ├── info.ejs
            ├── login.ejs
            └── player.ejs
```
# Configuraciones del ambiente (.env)

```
#Settings /DevLocal
DB_HOST=localhost
DB_USER=root
DB_PASS=zapping_2021
DB_NAME=zapping_db
DB_PORT=3000
```
```
#Settings for Centos8/DevLocal
PORT=7000
```
```
#Settings /Centos8
DB_HOST=localhost
DB_USER=root
DB_PASS=Z@pping_2021
DB_NAME=zapping_db
DB_PORT=3306
```
