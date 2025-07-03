const express = require('express');
const router = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const contatoController = require('./src/controllers/contatoController');

const { loginRequired } = require('./src/middlewares/middleware');


// rota home
router.get('/', homeController.index);

// Rotas de login
router.get('/login/index', loginController.index);
router.post('/login/register', loginController.register);
router.post('/login/login', loginController.connection);
router.get('/login/logout', loginController.logout);

// Rotas de contato
router.get('/contato/index', loginRequired, contatoController.index);
router.post('/contato/register', contatoController.register);


module.exports = router;