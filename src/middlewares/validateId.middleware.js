function validateId(name = 'id') {
  return (req, res, next) => {
    const id = Number(req.params[name]);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        error: `El parametro ${name} debe ser un entero positivo`
      });
    }

    req.params[name] = id;
    next();
  };
}

module.exports = { validateId };
