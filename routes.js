const express = require('express');
const router = express.Router();
const homeController = require('./src/controllers/homeController');
const contato = require('./src/controllers/controllerContato');
const end = require('./src/controllers/controllerEnd');

// rota home
router.get('/', homeController.paginaInicial);
router.post('/', homeController.tratandoInicial);

// rota contato
router.get('/contato', contato.controllerContato);
router.post('/contato', contato.tratandoContato);

// rota end
router.get('/end', end.controllerEnd);

module.exports = router;