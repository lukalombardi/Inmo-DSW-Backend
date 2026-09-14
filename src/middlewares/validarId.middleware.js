function validarId(nombre = 'id') {
  return (req, res, next) => {
    const id = Number(req.params[nombre]);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        error: `El parametro ${nombre} debe ser un entero positivo`
      });
    }

    req.params[nombre] = id;
    next();
  };
}

module.exports = { validarId };
