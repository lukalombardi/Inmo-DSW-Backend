const userService = require('./user.service.js');

const getUsers = async (req,res)=>{
    try {
        const users = await userService.findAll();
        res.json(users);
    }catch(error){
        console.error('getUsers:', error);
        res.status(500).json({ error: 'Error al obtener los Usuarios' });
    }
};

const getUser = async (req, res) => {
    try {
        const user = await userService.findOne(req.params.id);
    if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(user);
    } catch (error) {
        console.error('getUser:', error);
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
};

const createUser = async (req, res) => {
    try {
        const user = await userService.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        });
    res.status(201).json(user);
    } catch (error) {
    if (error.code === 'P2002') {
        return res.status(409).json({ error: 'Ya existe un usuario con ese email' });
        }
        console.error('createUser:', error);
        res.status(500).json({ error: 'Error al crear el usuario' });
    }
};

const updateUser = async (req, res) => {
    try {
        const updatedUser = await userService.update(req.params.id, {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role
        });
    res.json(updatedUser);
    } catch (error) {
    if (error.code === 'P2025') {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    if (error.code === 'P2002') {
        return res.status(409).json({ error: 'Ya existe un usuario con ese email' });
    }
    console.error('updateUser:', error);
    res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
};


const deleteUser = async (req, res) => {
    try {
        const deletedUser = await userService.remove(req.params.id);
    res.json(deletedUser);
        } catch (error) {
    if (error.code === 'P2025') {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    if (error.code === 'P2003') {
        return res.status(409).json({
        error: 'No se puede eliminar el usuario porque tiene propiedades asociadas'
        });
    }
    console.error('deleteUser:', error);
    res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
};


module.exports = {getUsers, getUser, createUser, updateUser, deleteUser}
