# Sobre el proyecto zapping-stream

# Sobre el postulante



# Construido con

# Pre requisitos (Dependencias)

```
"dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^10.0.0",
    "ejs": "^3.1.6",
    "express": "^4.17.1",
    "mysql2": "^2.3.3"
  }
```

# Installar proyecto

## crear folder para el proyecto
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

```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node src/server.js",
    "audit": "make database-bulk",
    "develop": "nodemon --watch src"
  }
```

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
##Settings /DevLocal
DB_HOST=localhost
DB_USER=root
DB_PASS=zapping_2021
DB_NAME=zapping_db
DB_PORT=3000

##Settings for Centos/DevLocal
PORT=7000

##Settings /Centos8
DB_HOST=localhost
DB_USER=root
DB_PASS=Z@pping_2021
DB_NAME=zapping_db
DB_PORT=3306

```