const cuentaModel = require('../models/cuenta.model');
const dotenv = require('dotenv');
const HttpError = require('../utils/HttpError');
dotenv.config();

class LoginPlayerController {
    getPlayerById = async (req, res, next) => {

        const player = await cuentaModel.find(req.body)
            .then((player) => {
                if (!player[0]) {
                    const mensaje = `Usuario ${req.body.email_login} no encontrado`;
                    // throw new HttpError(404, 'Player no encontrado');
                    res.status(404).render('../views/pages/info', { mensaje, isLogin: false });

                } else {
                    const { nombre, email } = player[0];
                    console.log(nombre);
                    console.log(email);
                    const mensaje = `Hola ${nombre} ahora puedes reproducir simular el live streaming con Zapping!`;
                    res.status(200).render('../views/pages/player', { mensaje, isLogin: true });
                }


            })
            .catch((e) => {
                const mensaje = `Algo falló, error: ${e}`;
                console.log(`mensaje ${mensaje}`);
                // throw new HttpError(404, 'Player no encontrado');
                res.status(500).render('../views/pages/info', { mensaje, isLogin: false });
            });

    };
}

module.exports = new LoginPlayerController;