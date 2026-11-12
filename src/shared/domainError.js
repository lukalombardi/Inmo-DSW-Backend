// Errores de dominio: los services los lanzan con un code y los controllers lo traducen a HTTP.
const DOMAIN_ERROR_STATUS = {
  NOT_FOUND: 404,
  FORBIDDEN: 403,
  ALREADY_LIKED: 409,
  HAS_DEPENDENTS: 409,
  EMAIL_TAKEN: 409
};

const domainError = (code, message) => {
  const error = new Error(message);
  error.code = code;
  return error;
};

// Si es un error de dominio responde con su status y devuelve true; si no, devuelve false.
const sendDomainError = (res, error) => {
  const status = DOMAIN_ERROR_STATUS[error.code];
  if (!status) return false;
  res.status(status).json({ error: error.message });
  return true;
};

module.exports = { DOMAIN_ERROR_STATUS, domainError, sendDomainError };
