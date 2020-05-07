const {Schema, model} = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
}, {timestamps: true});

userSchema.methods.encryptPassword = async password => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};
//se utiliza la funcion tipica de js5 para poder acceder al metodo this(que me permite acceder a la contraseña del usuario)
userSchema.methods.matchPassword = async function (password) {
   return await bcrypt.compare(password, this.password)
}

module.exports = model('users', userSchema);