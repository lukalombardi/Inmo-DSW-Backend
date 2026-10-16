const { z } = require('zod');
const zoneSchema = z.object({
  name: z
    .string({ message: 'El nombre debe ser un texto' })
    .trim()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede superar los 100 caracteres')
});

const zoneUpdateSchema = zoneSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Debe enviar al menos un campo para actualizar'
  });

module.exports = {zoneSchema, zoneUpdateSchema}