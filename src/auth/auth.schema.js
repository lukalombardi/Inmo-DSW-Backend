const {z} = require('zod')

const loginSchema = z.object({
    email:       z.string().trim().email('Email inválido'),
    password:     z.string().trim().min(1, 'Falta la contraseña').max(500),
});

// Sin role: el registro publico siempre crea VISITOR (si mandan role, zod lo descarta)
const registerSchema = z.object({
    name:        z.string().trim().min(2).max(100),
    email:       z.string().trim().email('Email inválido'),
    password:     z.string().trim().min(1, 'Falta la contraseña').max(500),
});

module.exports = {loginSchema, registerSchema}