const jwt = require('jsonwebtoken');



function verificarToken(req, res, next) {
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
        console.error('verificarToken: falta la variable de entorno JWT_SECRET');
        return res.status(503).json({ error: 'Servicio no disponible' });
}

const header = req.get('Authorization');
    if (header && header.startsWith('Bearer ')) {
        const token = header.split(' ')[1];
        try{req.usuario = jwt.verify(token, secretKey);
        }
        catch(e){
            return res.status(401).json({error: 'Token invalido o vencido'})
        }
    }
    else{
        return res.status(401).json({ error: 'Falta el token' });
    }
next();
}

module.exports = { verificarToken };
