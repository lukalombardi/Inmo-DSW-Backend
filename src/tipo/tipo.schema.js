const { z } = require('zod');

const tipoSchema = z.object({
  descTipo: z
    .string({ message: 'La descripción debe ser un texto' })
    .trim()
    .min(2, 'La descripción debe tener al menos 2 caracteres')
    .max(100, 'La descripción no puede superar los 100 caracteres')
});

const tipoUpdateSchema = tipoSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Debe enviar al menos un campo para actualizar'
  });

module.exports = { tipoSchema, tipoUpdateSchema };
