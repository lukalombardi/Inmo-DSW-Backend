function validarTipo(schema) {
  return (req, res, next) => {
    const resultado = schema.safeParse(req.body);
    if (!resultado.success) {
      return res.status(400).json({ error: resultado.error.issues });
    }
    req.body = resultado.data; 
    next();
  };
}

module.exports = { validarTipo };