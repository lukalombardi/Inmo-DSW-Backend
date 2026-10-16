const { z } = require('zod');


const photoSchema = z.object({
  propertyId: z.coerce.number().int().positive()
});

module.exports = { photoSchema };