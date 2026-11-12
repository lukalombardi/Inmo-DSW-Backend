const bcrypt = require('bcryptjs');
const userRepository = require('../user/user.repository.js');
const jwt= require('jsonwebtoken');
const userService = require('../user/user.service.js');
const { domainError } = require('../shared/domainError.js');



// Firma compartida por login y register: mismo payload (id y role) y misma expiracion
const signToken = (user) => {
    return jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '8h' });
}

const login = async(email,  password) => {
    const user = await userRepository.findByEmail(email)
    if (user) {
        const match = await bcrypt.compare(password, user.password)
        if (match){
            return {
                token: signToken(user),
                user: { 
                    id: user.id, 
                    name: user.name, 
                    email: user.email, 
                    role: user.role }
            }
        }else{
            return null
        }
    }else{
        return null
    }
}

// Registro publico: el role lo decide el service, nunca el body
const register = async ({ name, email, password }) => {
    const existing = await userRepository.findByEmail(email)
    if (existing) {
        throw domainError('EMAIL_TAKEN', 'Ya existe un usuario con ese email')
    }
    // userService.create hashea la contraseña con bcrypt igual que POST /users
    // y devuelve el usuario sin password (id, name, email, role)
    const user = await userService.create({ name, email, password, role: 'VISITOR' })
    return { token: signToken(user), user }
}

module.exports = {login, register}