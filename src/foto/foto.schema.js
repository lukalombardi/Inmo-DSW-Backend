const { z } = require('zod');


const fotoSchema = z.object({
  propiedadId: z.coerce.number().int().positive()
});

module.exports = { fotoSchema };