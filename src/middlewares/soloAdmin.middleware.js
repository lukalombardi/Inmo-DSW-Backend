function soloAdmin(req, res, next) {
    if (req.usuario.rol !== 'ADMIN') {
        return res.status(403).json({ error: 'No tenés permiso para esta acción' });
    }
    next()
}

module.exports = {soloAdmin}