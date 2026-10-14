const bcrypt = require('bcryptjs');
const usuarioRepository = require('./usuario.repository.js');

const findAll = async () => {
  return usuarioRepository.findAll();
};

const findOne = async (id) => {
  return usuarioRepository.findOne(id);
};

const create = async (data) => {
  const passwordHash = await bcrypt.hash(data.password, 10);
  return usuarioRepository.create({...data, password: passwordHash});
};

const update = async (id, data) => {
  if (data.password){
    const passwordHash = await bcrypt.hash(data.password, 10);
    return usuarioRepository.update(id, {...data, password: passwordHash});
  }
  else{
    return usuarioRepository.update(id, data);
  }
};

const remove = async (id) => {
  return usuarioRepository.remove(id);
};

module.exports = { findAll, findOne, create, update, remove };
