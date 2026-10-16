const { z } = require('zod');

const inquirySchema = z.object({
  name:        z.string().trim().min(2).max(100),
  email:       z.string().trim().email('Email inválido'),
  message:     z.string().trim().min(1).max(500),
  propertyId:  z.number().int().positive()
});

const inquiryUpdateSchema = inquirySchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Debe enviar al menos un campo para actualizar'
  });

module.exports = { inquirySchema, inquiryUpdateSchema };