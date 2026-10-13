const usuarioRepository = require('./usuario.repository.js');

const findAll = async () => {
  return usuarioRepository.findAll();
};

const findOne = async (id) => {
  return usuarioRepository.findOne(id);
};

const create = async (data) => {
  return usuarioRepository.create(data);
};

const update = async (id, data) => {
  return usuarioRepository.update(id, data);
};

const remove = async (id) => {
  return usuarioRepository.remove(id);
};

module.exports = { findAll, findOne, create, update, remove };
