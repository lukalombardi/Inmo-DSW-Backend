const {z} = require('zod')

const loginSchema = z.object({
    email:       z.string().trim().email('Email inválido'),
    password:     z.string().trim().min(1, 'Falta la contraseña').max(500),
});

module.exports = {loginSchema}