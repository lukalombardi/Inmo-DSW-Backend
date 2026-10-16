const {z} = require('zod')
const userSchema = z.object({
  name:        z.string().trim().min(2).max(100),
  email:       z.string().trim().email('Email inválido'),
  password:     z.string().trim().min(1).max(500),
  role: z.enum(['ADMIN', 'OPERATOR'])
});

const userUpdateSchema = userSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Debe enviar al menos un campo para actualizar'
  });

module.exports = {userSchema, userUpdateSchema}