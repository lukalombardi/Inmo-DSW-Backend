const { prisma } = require('../db.js');

const getUsuarios = async (req,res)=>{
    try {
        const usuarios = await prisma.usuario.findMany({
            select: { id: true, nombre: true, email: true, rol: true }
                });
        res.json(usuarios);
    }catch(error){
        console.error('getusuarios:', error);
        res.status(500).json({ error: 'Error al obtener los Usuarios' });  
    }
};

const getUsuario = async (req, res) => {
    try {
        const usuario = await prisma.usuario.findUnique({
        where: { id: req.params.id }, 
        select: { id: true, nombre: true, email: true, rol: true }
    });
    if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(usuario);
    } catch (error) {
        console.error('getUsuario:', error);
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
};

const createUsuario = async (req, res) => {
    try {
        const usuario = await prisma.usuario.create({
        data: { nombre: req.body.nombre, email: req.body.email, password: req.body.password, rol: req.body.rol },
        select: { id: true, nombre: true, email: true, rol: true }
    });
    res.status(201).json(usuario);
    } catch (error) {
    if (error.code === 'P2002') {
        return res.status(409).json({ error: 'Ya existe un usuario con ese email' });
        }
        console.error('createUsuario:', error);
        res.status(500).json({ error: 'Error al crear el usuario' });
    }
};

const updateUsuario = async (req, res) => {
    try {
        const usuarioActualizado = await prisma.usuario.update({
        where: { id: req.params.id },
        data: {  nombre: req.body.nombre, email: req.body.email, password: req.body.password, rol: req.body.rol  },
        select: { id: true, nombre: true, email: true, rol: true }
    });
    res.json(usuarioActualizado);
    } catch (error) {
    if (error.code === 'P2025') {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    if (error.code === 'P2002') {
        return res.status(409).json({ error: 'Ya existe un usuario con ese email' });
    }
    console.error('updateUsuario:', error);
    res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
};


const deleteUsuario = async (req, res) => {
    try {
        const UsuarioEliminado = await prisma.usuario.delete({
        where: { id: req.params.id },
        select: { id: true, nombre: true, email: true, rol: true }
    });
    res.json(UsuarioEliminado);
        } catch (error) {
    if (error.code === 'P2025') {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    if (error.code === 'P2003') {
        return res.status(409).json({
        error: 'No se puede eliminar el usuario porque tiene propiedades asociadas'
        });
    }
    console.error('deleteUsuario:', error);
    res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
};


module.exports = {getUsuarios, getUsuario, createUsuario, updateUsuario, deleteUsuario}

