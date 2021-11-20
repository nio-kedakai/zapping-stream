const cuentaModel = require('../models/cuenta.model');
const dotenv = require('dotenv');
const HttpError = require('../utils/HttpError');
dotenv.config();

class CrearPlayerController {
    crearPlayer = async (req, res, next) => {
        //this.checkValidation(req);

        //await this.hashPassword(req);
        console.log(req.body);
        const result = cuentaModel.create(req.body);

        if (!result) {
            throw new HttpError(500, 'Error CrearPlayerController crearPlayer');
        }
    
        res.status(201).render('../views/pages/info', { nombre: req.body.nombre });

    };
}


module.exports = new CrearPlayerController;