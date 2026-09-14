const crypto = require('crypto');

// Compara sin cortar en la primera diferencia, para no filtrar informacion
// sobre la clave a traves del tiempo que tarda la respuesta.
const sonIguales = (recibida, esperada) => {
  const a = Buffer.from(recibida, 'utf8');
  const b = Buffer.from(esperada, 'utf8');
  if (a.length !== b.length) {
    return false;
  }
  return crypto.timingSafeEqual(a, b);
};

function verificarApiKey(req, res, next) {
  const apiKeyEsperada = process.env.API_KEY;

  // Si el server arranca sin API_KEY configurada cerramos el paso en vez de
  // dejar la ruta abierta por accidente.
  if (!apiKeyEsperada) {
    console.error('verificarApiKey: falta la variable de entorno API_KEY');
    return res.status(503).json({ error: 'Servicio no disponible' });
  }

  const apiKeyRecibida = req.get('x-api-key');
  if (!apiKeyRecibida) {
    return res.status(401).json({ error: 'Falta la API key (header x-api-key)' });
  }

  if (!sonIguales(apiKeyRecibida, apiKeyEsperada)) {
    return res.status(403).json({ error: 'API key invalida' });
  }

  next();
}

module.exports = { verificarApiKey };
