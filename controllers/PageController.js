// FIREBASE
var admin = require("firebase-admin");
var serviceAccount = require("../serviceAccountKey.json");
const firebase = require('firebase');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://iot-ornacol-default-rtdb.firebaseio.com"
});

const db = admin.database();
var ref1 = db.ref("Baston/Datos/");
var ref2 = db.ref("Nodos/");

firebase.initializeApp({
    apiKey : "AIzaSyAcQie2FivaQiwqsHbuD5GOehcX4INPXVs",
    authDomain : "iot-ornacol.firebaseapp.com",
    databaseURL: "https://iot-ornacol-default-rtdb.firebaseio.com",
    projectId: "iot-ornacol",
    storageBucket: "iot-ornacol.appspot.com",
    messagingSenderId: "721299366895",
    appId: "1:721299366895:web:f21cdf459cc5ea8e1e4c1a",
    measurementId: "G-5YFEGWDTZ9"
});

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
// Manejo del tiempo
const moment = require("moment");
// const { UserRecord } = require("firebase-admin/lib/auth/user-record");
moment.locale('es');

const vistaPrincipal = (req, res) => {

    const sessionCookie = req.cookies.session || "";

    admin
    .auth()
    .verifySessionCookie(sessionCookie, true )
    .then((userData) => {
        
        console.log("Ha iniciado sesión: ", userData.email);

        user = userData.email;
    
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

            Object.keys(data).forEach((key) => {
                datos_baston.push(data[key])
            });

            datos_baston.forEach((row) => {
                indicadores_baston.push(row);
                ph.push(row.ph)
                fechas.push(moment(row.dataTime).format( 'L') );
                ce_trim = row.ce.trim();
                ce.push(ce_trim);
            });
            
            indicadores_baston.map(function(obj) {
                var key = Object.keys(obj);
                for (var i in key) {
                    obj[key[i]] = obj[key[i]].trim();
                }
            });

            let lastElement = datos_baston.pop();
            last_ph = lastElement.ph.trim();
            last_ce = lastElement.ce.trim();

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
                    temperatura.push(row.Temperatura);
                    humedad.push(row.Humedad);
                    presion.push(row.Presión);
                    luminosidad.push(row.Luminosidad);
                    fechas_red.push(moment(row.Fecha_Hora).format('L'));
                });

                return res.render('home.ejs', { 
                    datos: data,
                    datos_red: arreglo,
                    date : moment,
                    ph : ph,
                    fechas : fechas,
                    ce : ce,
                    indicadores_baston : indicadores_baston,
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
                    title : "Panel de Control",
                    user: user
                });
            });
        }); 
    })
    .catch((error) => {
        console.log("Inicio de sesión inválido");
        res.redirect("/login");
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

    const sessionCookie = req.cookies.session || "";
    let productores = []; 

    admin
        .auth()
        .verifySessionCookie(sessionCookie, true /** checkRevoked */)
        .then((userData) => {
            console.log("Logged in:", userData.email)
            user = userData.email;

            if(userData.email == "admin@ornaiot.com"){
                console.log("El usuario es admnistrador");

                console.log("Registro de productores registrados en ORNACOL: ")
                
                const listAllUsers = (nextPageToken) => {

                    admin
                        .auth()
                        .listUsers(1000, nextPageToken)
                        .then((listUsersResult) => {

                            listUsersResult.users.forEach((userRecord) => {
                                productores.push(userRecord.email);
                            });
                            
                            if (listUsersResult.pageToken) {
                                // List next batch of users.
                                listAllUsers(listUsersResult.pageToken);
                            }
                            
                            res.render('tables.ejs', { title : "Productores", user: user, productores: productores })
                            
                        })
                        .catch((error) => {
                            console.log('Error listing users:', error);
                        });

                };

                listAllUsers();

            } else {
                res.redirect("/");
            }
        })
        .catch((error) => {
            res.redirect("/login");
        });
}

const vistaMap = (req, res) => {

    const sessionCookie = req.cookies.session || "";

    admin
        .auth()
        .verifySessionCookie(sessionCookie, true /** checkRevoked */)
        .then((userData) => {
            
            user = userData.email;
            console.log("Logged in:", userData.email);
            res.render('map.ejs', { title : "Mapa de Ornacol", user: user});
        })
        .catch((error) => {
        res.redirect("/login");
        });
}

const vistaLogin = (req, res) => {
    res.render('login.ejs', { layout: '../views/layouts/full-width.ejs' });
}

const vistaSignup = (req, res) => {
    
    res.render('signup.ejs', { layout: '../views/layouts/full-width.ejs', admin: admin });
}

// const registrarUsuario = (req, res) => {


//     const sessionCookie = req.cookies.session || "";

//     admin
//         .auth()
//         .verifySessionCookie(sessionCookie, true /** checkRevoked */)
//         .then((userData) => {
//             console.log("Logged in:", userData.email)
//             if(userData.email == "admin@ornaiot.com"){
//                 console.log("El usuario es admnistrador")
                
//                 console.log("Registrar");

//                 // const sessionCookie = req.cookies.session || "";

//     // admin
//     //     .auth()
//     //     .verifySessionCookie(sessionCookie, true /** checkRevoked */)
//     //     .then((userData) => {
//     //         console.log("Logged in:", userData.email)

//     //         if ( userData.email == "admin@ornaiot.com" ) {

//     //             console.log("El usuario es admnistrador")

//     //         } else {
//     //             res.redirect("/");
//     //         }
//     //     })
//     //     .catch((error) => {
//     //         res.redirect("/login");
//     //     });

//                 const username = {
//                     username : req.body.user,
//                     email : req.body.email,
//                     password : req.body.password
//                 }

//                 console.log(username, email, password);

//                 createUserWithEmailAndPassword(auth, username.email, username.password)
//                     .then((userCredential) => {

//                         const user = userCredential.user;
//                         console.log('Successfully created new user:', user.uid);

//                         // admin
//                         // .auth()
//                         // .createUser({
//                         //     email :username.email,
//                         //     password : username.password,
//                         //     emailVerified : false,
//                         //     disabled : false
//                         // })
//                         // .then((userRecord) => {
//                         //     // See the UserRecord reference doc for the contents of userRecord.
//                         //     console.log('Successfully created new user:', userRecord.uid);
                            
//                         //     // db.ref('Usuarios/' + userRecord.uid).set( {
//                         //     //     Usuario : user.email,
//                         //     //     Correo : user.email,
//                         //     //     Contraseña : user.password
//                         //     // });

//                         //     res.redirect('/')
//                         // })
//                         // .catch((error) => {
//                         //     console.log('Error creating new user:', error);
//                         //     res.render('signup', {
//                         //         layout: '../views/layouts/full-width.ejs',
//                         //         error : error
//                         //     });
//                         // }); 

//                         res.redirect('/tables');

//                     })
//                     .catch((error) => {
//                         const errorCode = error.code;
//                         const errorMessage = errorCode;
//                         console.log(errorMessage);
//                     });

//                         } else {
//                         res.redirect("/");
//                         }
//                     })
//                     .catch((error) => {
//                         res.redirect("/login");
//                     });
    
    

// }

// const iniciarSesion = async (req, res) => {

//     console.log("FUNCION INICIAR SESION")

//     const username = {
//         email : req.body.email,
//         password : req.body.password
//     }

//     await firebase
//         .auth()
//         .signInWithEmailAndPassword(username.email, username.password)
//         .then((userCred) => {
//             if (userCred) {
//                 console.log("Inicio de sesión exitosa... ")
//                 // Get the user's ID token and save it in the session cookie.

//                 firebase.auth().currentUser.getIdToken(true).then( token => {
//                     console.log(token)
//                     const expiresIn = 60 * 1 * 1000;

//                     getAuth()
//                     .createSessionCookie(token, { expiresIn })
//                     .then(
//                     (sessionCookie) => {
//                         // Set cookie policy for session cookie.
//                         const options = { maxAge: expiresIn, httpOnly: true, secure: true };
//                         res.cookie('session', sessionCookie, options);
//                         res.end(JSON.stringify({ status: 'success' }));
//                     },
//                     (error) => {
//                         res.status(401).send('UNAUTHORIZED REQUEST!');
//                     }
//                     );
//                 })
//                 .catch( error => {
//                     const errorMessage = error.message;
//                     console.log(errorMessage);
//                 });
//             }
//         });

//     // firebase.auth().onAuthStateChanged( (userCred) => {
//     //     if (userCred) {
//     //         userCred.getIdToken().then((token) => {
//     //             console.log(token);
//     //             // const csrfToken = getCookie('csrfToken');
//     //             // console.log(" CSRF TOKEN: " + csrfToken);
//     //             return postIdTokenToSessionLogin('/sessionLogin', token);
//     //         });
//     //     }
//     // }); 
    
// }

const sessionLogin = (req, res) => {

    // Create the session cookie. This will also verify the ID token in the process.
  // The session cookie will have the same claims as the ID token.
  // To only allow session cookie setting on recent sign-in, auth_time in ID token
  // can be checked to ensure user was recently signed in before creating a session cookie.

  // Get the ID token passed and the CSRF token.
    const idToken = req.body.idToken.toString();
    // Sec Min Hour Days to Miliseconds
    const expiresIn = 60 * 10 * 1 * 1 * 1000;

    admin
        .auth()
        .createSessionCookie(idToken, { expiresIn })
        .then(
            (sessionCookie) => {
                const options = { maxAge: expiresIn, httpOnly: true };
                res.cookie("session", sessionCookie, options);
                res.end(JSON.stringify({ status: "success" }));
            },
            (error) => {
                console.log("Error")
                res.status(401).send("UNAUTHORIZED REQUEST!");
            }
        );
};

const sessionLogout = (req, res) => {
    res.clearCookie("session");
    res.redirect("/login");
}

module.exports = {
    vistaPrincipal,
    vistaTablas,
    vistaMap,
    vistaLogin,
    vistaSignup,
    vistaAgregar,
    // registrarUsuario,
    sessionLogout,
    sessionLogin
}
