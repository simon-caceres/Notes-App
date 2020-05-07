const {Router} = require('express')
const router = Router();
const { 
    singUpForm,
    singIn,
    singInForm,
    singUp,
    logOut
 } = require('../controllers/user.controllers')

router.get('/singup',singUpForm);

router.post('/singup', singUp);

router.get('/singin', singInForm);

router.post('/singin', singIn);

router.get('/logout', logOut);

module.exports = router;