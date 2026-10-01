const { z } = require('zod');

const consultaSchema = z.object({
  nombre:      z.string().trim().min(2).max(100),
  email:       z.string().trim().email('Email inválido'),
  mensaje:     z.string().trim().min(1).max(500),
  propiedadId: z.number().int().positive()
});

const consultaUpdateSchema = consultaSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Debe enviar al menos un campo para actualizar'
  });

module.exports = { consultaSchema, consultaUpdateSchema };