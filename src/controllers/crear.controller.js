const cuentaModel = require('../models/cuenta.model');
const dotenv = require('dotenv');
const HttpError = require('../utils/HttpError');
dotenv.config();

class CrearPlayerController {
    crearPlayer = async (req, res, next) => {
        //this.checkValidation(req);

        //await this.hashPassword(req);
        console.log(req.body);

        const player = await cuentaModel.find({ contrasena_login: req.body.contrasena, email_login: req.body.email })
            .then((player) => {
                console.log(`Validando si el usuario ${req.body.nombre} ya existe`);
                if (player[0]) {
                    const mensaje = `La cuenta para ${req.body.email} ya existe`;
                    console.log(`mensaje ${mensaje}`);
                    // throw new HttpError(404, 'Player no encontrado');
                    res.status(500).render('../views/pages/info', { mensaje, isLogin: false });

                } else {
                    const result = cuentaModel.create(req.body);

                    if (!result) {
                        const mensaje = `Usuario ${req.body.nombre} no fue posible crearlo`;
                        console.log(`mensaje ${mensaje}`);
                        res.status(500).render('../views/pages/info', { mensaje, isLogin: false });
                        //throw new HttpError(500, 'Error CrearPlayerController crearPlayer');
                    }

                    const mensaje = `Usuario ${req.body.nombre} creado exitosamente`;
                    console.log(`mensaje ${mensaje}`);
                    res.status(201).render('../views/pages/info', { mensaje, isLogin: false });
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


module.exports = new CrearPlayerController;