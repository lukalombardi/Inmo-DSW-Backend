const usuarioService = require('./usuario.service.js');

const getUsuarios = async (req,res)=>{
    try {
        const usuarios = await usuarioService.findAll();
        res.json(usuarios);
    }catch(error){
        console.error('getusuarios:', error);
        res.status(500).json({ error: 'Error al obtener los Usuarios' });
    }
};

const getUsuario = async (req, res) => {
    try {
        const usuario = await usuarioService.findOne(req.params.id);
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
        const usuario = await usuarioService.create({
            nombre: req.body.nombre,
            email: req.body.email,
            password: req.body.password,
            rol: req.body.rol
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
        const usuarioActualizado = await usuarioService.update(req.params.id, {
            nombre: req.body.nombre,
            email: req.body.email,
            password: req.body.password,
            rol: req.body.rol
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
        const UsuarioEliminado = await usuarioService.remove(req.params.id);
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
