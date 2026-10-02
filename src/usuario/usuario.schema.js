const {z} = require('zod')
const usuarioSchema = z.object({
  nombre:      z.string().trim().min(2).max(100),
  email:       z.string().trim().email('Email inválido'),
  password:     z.string().trim().min(1).max(500),
  rol: z.enum(['ADMIN', 'OPERADOR'])
});

const usuarioUpdateSchema = usuarioSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Debe enviar al menos un campo para actualizar'
  });

module.exports = {usuarioSchema, usuarioUpdateSchema}