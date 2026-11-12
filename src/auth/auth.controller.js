const authService = require('./auth.service.js');
const { sendDomainError } = require('../shared/domainError.js');

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

const register = async (req, res) => {
    try {
        const result = await authService.register({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        res.status(201).json(result);
    } catch (error) {
        if (sendDomainError(res, error)) return;
        console.error('register', error);
        res.status(500).json({ error: 'Error al registrar el usuario' });
    }
};

module.exports = {login, register}