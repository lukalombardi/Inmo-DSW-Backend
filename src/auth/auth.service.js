const bcrypt = require('bcryptjs');
const userRepository = require('../user/user.repository.js');
const jwt= require('jsonwebtoken');



const login = async(email,  password) => {
    const user = await userRepository.findByEmail(email)
    if (user) {
        const match = await bcrypt.compare(password, user.password)
        if (match){
            const token = jwt.sign(
                { id: user.id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: '8h' });
            return {
                token: token,
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

module.exports = {login}