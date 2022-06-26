// FIREBASE
var admin = require("firebase-admin");
var serviceAccount = require("../iot-ornacol-firebase-adminsdk-njbhz-f849b05fef.json");
const moment = require("moment");
moment.locale('es');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://iot-ornacol-default-rtdb.firebaseio.com"
});

const db = admin.database();
var ref = db.ref("Baston/Datos/");
var ref2 = db.ref("Nodos/");

const vistaPrincipal = (req, res) => {

    let datos_baston = [];
    let datos_red = [];

    let ph = [];
    let fechas = [];
    let ce = [];

    let temperatura = [];
    let humedad = [];
    let presion = [];
    let luminosidad = []
    let fechas_red = [];

    let filtro_datos_baston = [];

    ref.once('value', function(snapshot) {
        let data = snapshot.val();

        //Obtener arreglo de valores de ph y las fechas
        Object.keys(data).forEach((key) => {
            datos_baston.push(data[key])
        });

        datos_baston.forEach((row) => {

            let mes_actual = moment().format('M');
            // console.log(moment(row.dataTime).format('M'));
            if ( (moment(row.dataTime).format('M') == 2) || (moment(row.dataTime).format('M') == 3) || (moment(row.dataTime).format('M') == 4) ){
                filtro_datos_baston.push(row)

                ph.push(row.ph)
                fechas.push(moment(row.dataTime).format( 'L') );
                ce_trim = row.ce.trim();
                ce.push(ce_trim);
            }
        
        });

        // console.log(filtro_datos_baston)
        // console.log((moment().format('L')));
        let ayer = moment().subtract(1, 'days').format('L');
        // console.log(ayer);

        ref2.once('value', function(snapshot) {
            red_sensores = snapshot.val();
            datos_red = [];

            Object.keys(red_sensores).forEach((key)=>{
                datos_red.push(red_sensores[key])
            });

            let arreglo = []
            datos_red.forEach(obj => {
                for (let key in obj) {
                    arreglo.push(obj[key])
                }
            });

            arreglo.forEach(row => {

                // console.log(row)

                let mes_actual = moment().format('M');
                // console.log(moment(row.Fecha_Hora).format('M'));
                if ( (moment(row.Fecha_Hora).format('M') == 5) || (moment(row.Fecha_Hora).format('M') == 6) || (moment(row.Fecha_Hora).format('M') == 11) ){
                
                    temperatura.push(row.Temperatura);
                    humedad.push(row.Humedad);
                    presion.push(row.Presión);
                    luminosidad.push(row.Luminosidad);
                    fechas_red.push(moment(row.Fecha_Hora).format('L'));

                }
            })

            res.render('home', { 
                datos: data,
                datos_red: arreglo,
                date : moment,
                ph : ph,
                fechas : fechas,
                ce : ce,
                filtro_datos_baston: filtro_datos_baston,
                temperatura : temperatura,
                humedad : humedad,
                presion : presion,
                luminosidad : luminosidad,
                fechas_red : fechas_red
            });
        });
    });
}

const vistaAgregar = (req, res) => {
    const productor = {
        nombre: req.body.nombre,
        correo: req.body.correo,
        telefono: req.body.telefono,
    }
    console.log(db)
    console.log(productor)
    db.ref('Baston').push(productor)
    res.redirect('/')
}

const vistaTablas = (req, res) => {
    res.render('tables')
}

const vistaMap = (req, res) => {
    res.render('map')
}

const vistaLogin = (req, res) => {
    res.render('login', { layout: '../views/layouts/full-width.ejs' })
}

const vistaSignup = (req, res) => {
    res.render('signup')
}

const sendData = (req, res) => {

    Object.keys(data).forEach((key) => {
        datos_baston.push(data[key])
    });

    datos_baston.forEach((row) => {
        ph.push(row.ph)
        fechas.push(row.dataTime)
    });

    console.log(ph);
    console.log(fechas);

    res.render('layout',{ 
        ph : ph,
        fechas : fechas
    });
}

module.exports = {
    vistaPrincipal,
    vistaTablas,
    vistaMap,
    vistaLogin,
    vistaSignup,
    vistaAgregar,
    sendData,
}