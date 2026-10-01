const { prisma } = require('../db.js');

const getUsuarios = async (req,res)=>{
    try {
        const usuarios = await prisma.usuario.findMany();
        res.json(usuarios);
    }catch(error){
        console.error('getusuarios:', error);
        res.status(500).json({ error: 'Error al obtener los Usuarios' });  
    }
};

// ACA VA EL RESTO DEL CRUD RENZI

module.exports = {getUsuarios}