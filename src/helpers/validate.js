const helpers = {};

helpers.isAut = (req,res,next) => {
    if (req.isAuthenticated()) {
        
        return next();
    } 
    req.flash('error_msg', 'not authorized')
    res.redirect('/singin')
}

module.exports = helpers;