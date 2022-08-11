const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const path = require('path')
const app = express()

// Authentication
const cookieParser = require("cookie-parser");
const csrf = require("csurf");
const bodyParser = require("body-parser");
const csrfMiddleware = csrf({ cookie : true });

app.set('view engine', 'ejs');
app.use(expressLayouts)
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended:true}))

app.use(bodyParser.json());
app.use(cookieParser());
app.use(csrfMiddleware);

app.all("*", (req, res, next) => {

    // var token = req.csrfToken();
    // res.cookie('XSRF-TOKEN', token);
    // res.locals.csrfToken = token;
    res.cookie("XSRF-TOKEN", req.csrfToken());
    next();
});

//Utilizamos el router
const router = require('./routes/router')

app.use(router.routes);

app.listen(3000, () => {
    console.log('Server up running in http://localhost:3000') 
});


