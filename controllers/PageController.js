// FIREBASE
var admin = require("firebase-admin");
var serviceAccount = require("../iot-ornacol-firebase-adminsdk-njbhz-f849b05fef.json");

// const { set, ref, getDatabase } = require('firebase-admin/database');

const moment = require("moment");
moment.locale('es');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://iot-ornacol-default-rtdb.firebaseio.com"
});

const db = admin.database();

var ref1 = db.ref("Baston/Datos/");
var ref2 = db.ref("Nodos/");


// Firebase sin Admin
const { initializeApp } = require('firebase/app');
const { getDatabase, set, ref } = require('firebase/database');
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, setPersistence, browserSessionPersistence } = require('firebase/auth');

const firebaseConfig = {
    apiKey: "AIzaSyAcQie2FivaQiwqsHbuD5GOehcX4INPXVs",
    authDomain: "iot-ornacol.firebaseapp.com",
    databaseURL: "https://iot-ornacol-default-rtdb.firebaseio.com",
    projectId: "iot-ornacol",
    storageBucket: "iot-ornacol.appspot.com",
    messagingSenderId: "721299366895",
    appId: "1:721299366895:web:f21cdf459cc5ea8e1e4c1a",
    measurementId: "G-5YFEGWDTZ9"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

setPersistence(auth, browserSessionPersistence);

const vistaPrincipal = (req, res) => {

    console.log("FUNCION VISTA PRINCIPAL");
    
    setTimeout(auth.onAuthStateChanged ( authenticate => {

        if ( authenticate ) {
            
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
            let indicadores_baston = [];
            // Indicadores
            let last_ph;
            let last_ce;
            let last_temperatura;
            let last_humedad;
            let last_luminosidad;
            let last_presion;

            ref1.once('value', function(snapshot) {
                let data = snapshot.val();

                //Obtener arreglo de valores de ph y las fechas
                Object.keys(data).forEach((key) => {
                    datos_baston.push(data[key])
                });


                datos_baston.forEach((row) => {

                    indicadores_baston.push(row);

                    let mes_actual = moment().format('M');
                    if ( (moment(row.dataTime).format('M') == 2) || (moment(row.dataTime).format('M') == 3) || (moment(row.dataTime).format('M') == 4) ){
                        filtro_datos_baston.push(row)

                        ph.push(row.ph)
                        fechas.push(moment(row.dataTime).format( 'L') );
                        ce_trim = row.ce.trim();
                        ce.push(ce_trim);
                    }

                });

                var keys = [1, 2, 3];
                
                indicadores_baston.map(function(obj) {
                    var key = Object.keys(obj);
                    for (var i in key) {
                        obj[key[i]] = obj[key[i]].trim();
                    }
                });

                let lastElement = datos_baston.pop();
                last_ph = lastElement.ph.trim();
                last_ce = lastElement.ce.trim();

                let ayer = moment().subtract(1, 'days').format('L');

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

                    let lastElement2 = arreglo.pop();
                    last_temperatura = lastElement2.Temperatura.trim();
                    last_humedad = lastElement2.Humedad.trim();
                    last_luminosidad = lastElement2.Luminosidad.trim();
                    last_presion = lastElement2.Presión.trim();

                    arreglo.forEach(row => {

                        let mes_actual = moment().format('M');
                        if ( (moment(row.Fecha_Hora).format('M') == 5) || (moment(row.Fecha_Hora).format('M') == 6) || (moment(row.Fecha_Hora).format('M') == 11) ){
                        
                            temperatura.push(row.Temperatura);
                            humedad.push(row.Humedad);
                            presion.push(row.Presión);
                            luminosidad.push(row.Luminosidad);
                            fechas_red.push(moment(row.Fecha_Hora).format('L'));

                        }
                    });

                    console.log("RENDER DEL HOME");
                    return res.render('home.ejs', { 
                        datos: data,
                        datos_red: arreglo,
                        date : moment,
                        ph : ph,
                        fechas : fechas,
                        ce : ce,
                        indicadores_baston : indicadores_baston,
                        filtro_datos_baston: filtro_datos_baston,
                        temperatura : temperatura,
                        humedad : humedad,
                        presion : presion,
                        luminosidad : luminosidad,
                        fechas_red : fechas_red,
                        last_ph : last_ph,
                        last_ce : last_ce,
                        last_temperatura : last_temperatura,
                        last_humedad : last_humedad,
                        last_luminosidad : last_luminosidad,
                        last_presion : last_presion,
                        title : "Panel de Control"
                    });
                });
            }); 

        }else{
            return res.redirect("/login")
        }
    }), 2000);
    
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

    auth.onAuthStateChanged ((authenticate) => {

        if (authenticate) {
            res.render('tables.ejs', { title : "Usuarios" })
            
        } else {
            res.redirect('/login');
        }
    });

}

const vistaMap = (req, res) => {

    auth.onAuthStateChanged ((authenticate) => {

        if (authenticate) {
            res.render('map.ejs', { title : "Mapa de Ornacol"})
        } else {
            res.redirect('/login');
        }
    });
}

const vistaLogin = (req, res) => {
    res.render('login.ejs', { layout: '../views/layouts/full-width.ejs' });
}

const vistaSignup = (req, res) => {
    
    res.render('signup.ejs', { layout: '../views/layouts/full-width.ejs' });
}

const registrarUsuario = async (req, res) => {

    const username = {
        username : req.body.user,
        email : req.body.email,
        password : req.body.password
    }
    // console.log(user);
    // console.log(admin.auth);

    createUserWithEmailAndPassword(auth, username.email, username.password)
        .then((userCredential) => {

            const user = userCredential.user;
            console.log('Successfully created new user:', user.uid);

            db.ref('Usuarios/' + user.uid).set( {
                Usuario : username.email,
                Correo : username.email,
                Contraseña : username.password
            });

            res.redirect('/tables');

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = errorCode;
            console.log(errorMessage);
        });


    // await admin.auth().createUser({
    //     email :user.email,
    //     password : user.password,
    //     emailVerified : false,
    //     disabled : false
    // })
    // .then((userRecord) => {
    //     // See the UserRecord reference doc for the contents of userRecord.
    //     console.log('Successfully created new user:', userRecord.uid);
        
    //     db.ref('Usuarios/' + userRecord.uid).set( {
    //         Usuario : user.email,
    //         Correo : user.email,
    //         Contraseña : user.password
    //     });

    //     res.redirect('/login')
    // })
    // .catch((error) => {
    //     console.log('Error creating new user:', error);
    //     res.render('signup', {
    //         layout: '../views/layouts/full-width.ejs',
    //         error : error
    //     });
    // });    
}

const iniciarSesion = async (req, res) => {

    console.log("FUNCION INICIAR SESION")

    const username = {
        email : req.body.email,
        password : req.body.password
    }
    
    await signInWithEmailAndPassword(auth, username.email, username.password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            
            if (username.email === user.email){
                // console.log("\n Los emails coinciden ");
                console.log("Inicio de sesión exitosa");
                return res.redirect('/');
            }else{
                return res.redirect('/login');
            }
            // auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
            
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = errorCode;
            console.log(errorMessage);
            console.log("Redirect login")
            return res.redirect('/login')

            // res.render('login', {
            //     layout: '../views/layouts/full-width.ejs',
            //     error : error
            // });
        });
}

const signout = (req, res) => {
    
    signOut(auth).then(() => {
        // Sign-out successful.
        console.log("Se ha cerrado sesión con éxito");
        res.redirect('/login')
    }).catch((error) => {
    // An error happened.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        res.redirect('/login')
    });
}

module.exports = {
    vistaPrincipal,
    vistaTablas,
    vistaMap,
    vistaLogin,
    vistaSignup,
    vistaAgregar,
    registrarUsuario,
    iniciarSesion,
    signout
}

// 