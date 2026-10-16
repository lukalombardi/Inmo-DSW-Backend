function requireAdmin(req, res, next) {
    if (req.user.role !== 'ADMIN') {
        return res.status(403).json({ error: 'No tenés permiso para esta acción' });
    }
    next()
}

module.exports = {requireAdmin}