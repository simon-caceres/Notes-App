const userCtrl = {};
const user = require('../models/user');
const passport = require('passport')

userCtrl.singUpForm = (req,res) => {
    res.render('users/sing-up')
}

userCtrl.singUp = async (req,res) => {
    const {name,email,password,confirm_password} = req.body;
    const errors = []
    if (password != confirm_password) {
        errors.push({text: 'password do not match'})
    }
    if (password.length < 4){
        errors.push({text: 'password mus be at least 4 characters'})
    }
    if (errors.length > 0) {
        res.render('users/sing-up', {
            errors,
            name,
            email,

        })
    } else {
        const emailUser = await user.findOne({email: email});
        if (emailUser) {
            req.flash('error_msg', 'the email is already in use')
            res.redirect('/singup');
        } else {
           const newUser = new user({name,email,password})
           newUser.password = await newUser.encryptPassword(password)
           await newUser.save();
           req.flash('sucess_msg', 'User Register')
           res.redirect('/singin');
        }
    }
    
}

userCtrl.singInForm = (req, res) => {
    res.render('users/sing-in')
}

userCtrl.singIn = passport.authenticate('local', {
    
    failureRedirect: '/singin',
    successRedirect: '/notes',
    failureFlash: true
})

userCtrl.logOut = (req, res) => {
    req.logOut();
    req.flash('success_msg', 'Youre Log Out');
    res.redirect('/singin')
}
module.exports = userCtrl;