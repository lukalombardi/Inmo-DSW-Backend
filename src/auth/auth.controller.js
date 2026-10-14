const authService = require('./auth.service.js');

const login = async (req,res)=>{
    try {
        const result = await authService.login(req.body.email, req.body.password);
        if(result){
            res.json(result);}
        else{
            res.status(401).json({error: 'Email o contraseña incorrectos'})
        }
    }catch(error){
        console.error('login', error);
        res.status(500).json({ error: 'Error al iniciar sesion' });
    }
};

module.exports = {login}