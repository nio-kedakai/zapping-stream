const cuentaModel = require('../models/cuenta.model');
const dotenv = require('dotenv');
const HttpError = require('../utils/HttpError');
dotenv.config();

class LoginPlayerController {
    getPlayerById = async (req, res, next) => {
        const player = await cuentaModel.find(req.body);

        if (!player) {
            throw new HttpError(404, 'Player no encontrado');
        }

        const { nombre, email } = player[0];
        console.log(nombre);
        console.log(email);
        res.status(200).render('../views/pages/player', { nombre, email });
    };
}

module.exports = new LoginPlayerController;