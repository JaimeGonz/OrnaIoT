const express = require('express')
// const { db } = require('../config/firebase')
const { vistaPrincipal, vistaTablas, vistaMap, vistaLogin, vistaSignup, vistaAgregar, sendData } = require('../controllers/PageController')
const router = express.Router()

router.get('/', vistaPrincipal)
router.get('/tables', vistaTablas)
router.get('/map', vistaMap)
router.get('/login', vistaLogin)
router.get('/signup', vistaSignup)

router.post('/agregar', vistaAgregar)

module.exports = { routes: router }