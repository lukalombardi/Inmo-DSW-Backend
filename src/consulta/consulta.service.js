const consultaRepository = require('./consulta.repository.js');

const findAll = async () => {
  return consultaRepository.findAll();
};

const findOne = async (id) => {
  return consultaRepository.findOne(id);
};

const create = async (data) => {
  return consultaRepository.create(data);
};

const update = async (id, data) => {
  return consultaRepository.update(id, data);
};

const remove = async (id) => {
  return consultaRepository.remove(id);
};

module.exports = { findAll, findOne, create, update, remove };
