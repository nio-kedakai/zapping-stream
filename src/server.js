const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const conexion = require('./db/conexion');
const indexRouter = require('./routes');
const path = require('path');
const bodyParser = require('body-parser');


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



module.exports = app;