const path = require('path');
const fs = require('fs');


const playList = path.join(process.cwd(), 'src/assets/hls/append.m3u8');
class PlayerVideoController {

    playerVideo = async (req, res, next) => {
        // console.log(' PlayerVideoController playListToArray() \n');
        
        fs.readFile(playList, function (err, data) {
            if (err) {
                throw err;
            }

            const array = data.toString().split("\n");
            addNewSegmentsPlayList(array);
            //console.log(`nuevaPlayListArray.length: ${nuevaPlayListArray.length}`);
            //return nuevaPlayListArray;
        });
        res.status(206).send({ status: 206, message: 'OK', isLogin: true });
    }


}


async function addNewSegmentsPlayList(playListArray) {
    //console.log('addNewSegmentsPlayList() \n');

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
            //createWritePlayList(playListArray);
            break;
        }

        //PREGUNTAMOS SI LLEGAMOS AL ULTIMO SEGMENTO Y AGREGAMOS LA FILA FINAL #EXT-X-ENDLIST
        if (playListArray[playListArray.length - 1].includes('segment63.ts')) {
            console.log('no se pueden agregar mas segmentos');
            playListArray.push('#EXT-X-ENDLIST');
            //createWritePlayList(playListArray);
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


    //showArrayPlayList(playListArray);


    console.log(`playListArray ${playListArray.length}`);
    createWritePlayList(playListArray);

    return playListArray;

}


async function showArrayPlayList(playListArray) {
    for (i in playListArray) {
        console.log(`${playListArray[i]}`);
    }
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

module.exports = new PlayerVideoController;