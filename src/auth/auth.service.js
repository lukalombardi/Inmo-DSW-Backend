const bcrypt = require('bcryptjs');
const usuarioRepository = require('../usuario/usuario.repository.js');
const jwt= require('jsonwebtoken');



const login = async(email,  password) => {
    const usuario = await usuarioRepository.findByEmail(email)
    if (usuario) {
        const match = await bcrypt.compare(password, usuario.password)
        if (match){
            const token = jwt.sign(
                { id: usuario.id, rol: usuario.rol },
                process.env.JWT_SECRET,
                { expiresIn: '8h' });
            return {
                token: token,
                usuario: { 
                    id: usuario.id, 
                    nombre: usuario.nombre, 
                    email: usuario.email, 
                    rol: usuario.rol }
            }
        }
        else{
            return null
        }
    } 
    else{
            return null
        }
}

module.exports = {login}