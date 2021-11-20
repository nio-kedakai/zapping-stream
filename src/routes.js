const express = require('express');
const router = express.Router();
const crearPlayerController = require('./controllers/crear.controller');
const loginPlayerController = require('./controllers/login.controller');



// seteando las vistas EJS
router.get('/', function (req, res) {
    if (req.nombre) {
        console.log(req.nombre);
    }
    res.render('../views/pages/index', { nombre: req.nombre });
});

router.get('/login', function (req, res) {
    if (req.nombre) {
        console.log(req.nombre);
    }
    res.render('../views/pages/login', { nombre: req.nombre });
});


router.get('/crear',
    function (req, res) {
        if (req.nombre) {
            console.log(req.nombre);
        }
        res.render('../views/pages/crear', { nombre: req.nombre });
    });


// seteando las acciones de los forms en los EJS
router.post('/login', loginPlayerController.getPlayerById);

router.post('/crear', crearPlayerController.crearPlayer);


router.get('/player',
    function (req, res) {
        console.log('/player link router');
        //const videoPath = __dirname + '/assets/hls/segment.m3u8';
        // const videoPath = __dirname + '/assets/hls/playlist.m3u8';
        // console.log('videoPath: ' + videoPath);
        // res.render('../views/pages/player', 
        //     { 
        //         nombre: req.nombre, 
        //         videoPath: videoPath 
        //     }
        // );
        res.render('../views/pages/player', {
            nombre: req.nombre
        });
    });

module.exports = router;