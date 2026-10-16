const { z } = require('zod');

const propertyTypeSchema = z.object({
  description: z
    .string({ message: 'La descripción debe ser un texto' })
    .trim()
    .min(2, 'La descripción debe tener al menos 2 caracteres')
    .max(100, 'La descripción no puede superar los 100 caracteres')
});

const propertyTypeUpdateSchema = propertyTypeSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Debe enviar al menos un campo para actualizar'
  });

module.exports = { propertyTypeSchema, propertyTypeUpdateSchema };
