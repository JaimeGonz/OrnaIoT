const express = require('express')
const { vistaPrincipal, vistaTablas, vistaMap, vistaLogin, vistaSignup, vistaAgregar,  
        sessionLogout, sessionLogin } = require('../controllers/PageController')
const router = express.Router()

router.get('/', vistaPrincipal)
router.get('/login', vistaLogin)
router.get('/tables', vistaTablas)
router.get('/map', vistaMap)
router.get('/signup', vistaSignup)
router.get('/sessionLogout', sessionLogout);

router.post('/agregar', vistaAgregar)
router.post('/sessionLogin', sessionLogin)

module.exports = { routes: router }