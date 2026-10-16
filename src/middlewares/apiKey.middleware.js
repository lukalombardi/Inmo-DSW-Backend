const crypto = require('crypto');


const isEqual = (received, expected) => {
  const a = Buffer.from(received, 'utf8');
  const b = Buffer.from(expected, 'utf8');
  if (a.length !== b.length) {
    return false;
  }
  return crypto.timingSafeEqual(a, b);
};

function verifyApiKey(req, res, next) {
  const expectedApiKey = process.env.API_KEY;


  if (!expectedApiKey) {
    console.error('verifyApiKey: falta la variable de entorno API_KEY');
    return res.status(503).json({ error: 'Servicio no disponible' });
  }

  const receivedApiKey = req.get('x-api-key');
  if (!receivedApiKey) {
    return res.status(401).json({ error: 'Falta la API key (header x-api-key)' });
  }

  if (!isEqual(receivedApiKey, expectedApiKey)) {
    return res.status(403).json({ error: 'API key invalida' });
  }

  next();
}

module.exports = { verifyApiKey };
