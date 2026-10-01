const { z } = require('zod');
const zonaSchema = z.object({
  nombreZona: z
    .string({ message: 'El nombre debe ser un texto' })
    .trim()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede superar los 100 caracteres')
});

const zonaUpdateSchema = zonaSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Debe enviar al menos un campo para actualizar'
  });

module.exports = {zonaSchema, zonaUpdateSchema}