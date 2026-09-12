const { z } = require('zod');

const zonaSchema = z.object({
  nombreZona: z.string().min(1)
});
const zonaUpdateSchema = zonaSchema.partial();

module.exports = { zonaSchema, zonaUpdateSchema };