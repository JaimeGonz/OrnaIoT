const express = require('express')
// const { db } = require('../config/firebase')
const { vistaPrincipal, vistaTablas, vistaMap, vistaLogin, vistaSignup, vistaAgregar , registrarUsuario, iniciarSesion, signout } = require('../controllers/PageController')
const router = express.Router()

router.get('/', vistaPrincipal)
router.get('/login', vistaLogin)
router.get('/tables', vistaTablas)
router.get('/map', vistaMap)
router.get('/signup', vistaSignup)
router.get('/signout', signout);

router.post('/iniciarSesion', iniciarSesion)
router.post('/registrarUsuario', registrarUsuario)
router.post('/agregar', vistaAgregar)

module.exports = { routes: router }