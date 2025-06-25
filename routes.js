const express = require('express');
const router = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');


// rota home
router.get('/', homeController.index);

// Rotas de login
router.get('/login/index', loginController.index);
router.post('/login/register', loginController.register);


module.exports = router;