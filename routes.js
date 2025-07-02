const express = require('express');
const router = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');


// rota home
router.get('/', homeController.index);

// Rotas de login
router.get('/login/index', loginController.index);
router.post('/login/register', loginController.register);
router.post('/login/login', loginController.connection);
router.get('/login/logout', loginController.logout);

module.exports = router;