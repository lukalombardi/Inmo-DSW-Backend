const STAFF_ROLES = ['ADMIN', 'OPERATOR'];

function requireStaff(req, res, next) {
    if (!STAFF_ROLES.includes(req.user.role)) {
        return res.status(403).json({ error: 'No tenés permiso para esta acción' });
    }
    next()
}

module.exports = {requireStaff}
