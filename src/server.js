const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const _handlebars = require('handlebars')
const morgan = require('morgan');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const MethodOverride = require('method-override')
const flash = require('connect-flash');
const sesion = require('express-session');
const passport = require('passport')

//initializate
const app = express();
require('./config/passport')
//SEttings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname + '/views'))
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    handlebars: allowInsecurePrototypeAccess(_handlebars),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');
//middlewares
app.use(express.urlencoded({extended: false}))
app.use(morgan('dev'));
app.use(MethodOverride('_method'));
app.use(sesion({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
//global variables
app.use((req,res,next)=> {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error')
    res.locals.user = req.user || null;
    next();
})
//routes
app.use(require('./routes/index'))
app.use(require('./routes/routes'))
app.use(require('./routes/users'))
//STatics files
app.use(express.static(path.join(__dirname, 'public')))


module.exports= app;