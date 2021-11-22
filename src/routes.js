const express = require('express');
const router = express.Router();
const crearPlayerController = require('./controllers/crear.controller');
const loginPlayerController = require('./controllers/login.controller');
const playerVideoController = require('./controllers/player.controller');



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
        res.render('../views/pages/player', {
            isLogin: false
        });
    });

//permite recargar el archivo playlist con los nuevos segmentos simulando
//el live streaming
router.get('/load', playerVideoController.playerVideo);

module.exports = router;