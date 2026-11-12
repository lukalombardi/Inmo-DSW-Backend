const { z } = require('zod');

// El like se arma con el token y el id de la URL: el body tiene que venir vacio
const likeSchema = z.strictObject({}, { message: 'El body debe estar vacío' });

module.exports = { likeSchema };
