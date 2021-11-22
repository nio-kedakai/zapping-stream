const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const conexion = require('./db/conexion');
const indexRouter = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');


const app = express();

dotenv.config();

app.use(express.json());
console.log('public root: ' + (path.join(__dirname, 'assets/hls')));
app.use(express.static(path.join(__dirname, 'assets/hls')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/', indexRouter);

app.use(cors());

// para llamadas de diferentes dominios
app.use("*", cors());

const PORT = Number(process.env.PORT || 3000);

app.listen(PORT, () => console.log(`Server iniciado en el puerto ${PORT}`));

app.get('/health', (req, res) => {
    res.status(200).json({ 'message': 'ok' });
});

app.get('/health-db', (req, res) => {
    conexion.connect(function (err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            res.status(500).json({ 'error': err.stack });
        }

        res.status(200).json({ 'message': 'ok' });
    });

});




const playList = path.join(__dirname, 'assets/hls/append.m3u8');


app.get('/load', (req, res) => {

    const array = playListToArray();

    console.log(`array.length ${array.length}`);

    res.status(200).json({ 'message': 'ok' });

});

async function playListToArray() {
    console.log('playListToArray() \n');
    let nuevaPlayListArray = new Array();
    fs.readFile(playList, function (err, data) {
        if (err) {
            throw err;
        }

        const array = data.toString().split("\n");
        nuevaPlayListArray = addNewSegmentsPlayList(array);
        console.log(`nuevaPlayListArray.length: ${nuevaPlayListArray.length}`);
        return nuevaPlayListArray;
    });

}

const FINAL_LINE = '#EXT-X-ENDLIST';
async function addNewSegmentsPlayList(playListArray) {
    console.log('addNewSegmentsPlayList() \n');

    // PREGUNTAMOS SI LLEGAMOS AL FINAL DE LA LISTA
    if (playListArray[playListArray.length - 1].includes('#EXT-X-ENDLIST')) {
        console.log('fin del archivo, se debe guardar');
        //invocar funcion para guardar archivo o guardar aca
        createWritePlayList(playListArray);
        return;
    }

    // PREGUNTAMOS SI LLEGAMOS AL ULTIMO SEGMENTO Y AGREGAMOS LA FILA FINAL #EXT-X-ENDLIST
    if (playListArray[playListArray.length - 1].includes('segment63.ts')) {
        console.log('no se pueden agregar mas segmentos');
        playListArray.push('#EXT-X-ENDLIST');
        //invocar funcion para guardar archivo o guardar aca
        createWritePlayList(playListArray);
        return;
    }

    //AGREGAMOS UNA UNIDAD AL ATRIBUTO EXT-X-MEDIA-SEQUENCE
    let MEDIA_SEQUENCE_ARRAY = playListArray[3].toString().split(":");

    let prefix_sequence = MEDIA_SEQUENCE_ARRAY[0];
    let sequence = Number(MEDIA_SEQUENCE_ARRAY[1]);
    console.log(`prefix_sequence: ${prefix_sequence} sequence : ` + sequence);
    playListArray[3] = prefix_sequence + `:${sequence + 1}`;

    //ELIMINAMOS EL PRIMER SEGMENTO CARGADO EN LA PLAYLIST Y SU EXTINF
    playListArray.splice(4, 1);
    playListArray.splice(4, 1);


    for (let i = 1; i <= 3; i++) {
        //#EXTINF:10.000000,
        // segment3.ts
        //PREGUNTAMOS SI LLEGAMOS AL FINAL DE LA LISTA
        if (playListArray[playListArray.length - 1].includes('#EXT-X-ENDLIST')) {
            console.log('fin del archivo, se debe guardar');
            createWritePlayList(playListArray);
            break;
        }

        //PREGUNTAMOS SI LLEGAMOS AL ULTIMO SEGMENTO Y AGREGAMOS LA FILA FINAL #EXT-X-ENDLIST
        if (playListArray[playListArray.length - 1].includes('segment63.ts')) {
            console.log('no se pueden agregar mas segmentos');
            playListArray.push('#EXT-X-ENDLIST');
            createWritePlayList(playListArray);
            break;
        }
        const LINEA_SEGMENTO_ARRAY = playListArray[playListArray.length - 1].split('.');

        const numberoSegmentoActual = Number(LINEA_SEGMENTO_ARRAY[0].split('segment')[1]);
        console.log(`numberoSegmentoActual ${numberoSegmentoActual}`);
        playListArray.push('#EXTINF:10.000000,');
        //playListArray.push(`segment${numberoSegmentoActual + 1}.ts`);
        let segment = `segment${numberoSegmentoActual + 1}.ts`;
        playListArray.push(segment);
    }


    for (i in playListArray) {
        console.log(`${playListArray[i]}`);
    }


    console.log(`playListArray ${playListArray.length}`);
    createWritePlayList(playListArray);

    return playListArray;

}

async function createWritePlayList(playListArray) {
    var stream = fs.createWriteStream(playList, { flags: 'w' });
    // console.log(new Date().toISOString());

    for (let index = 0; index < playListArray.length - 1; index++) {
        stream.write(playListArray[index] + '\n');
    }


    //console.log(new Date().toISOString());
    stream.end(playListArray[playListArray.length - 1]);

}


module.exports = app;