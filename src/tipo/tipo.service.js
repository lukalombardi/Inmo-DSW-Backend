const tipoRepository = require('./tipo.repository.js');

const findAll = async () => {
  return tipoRepository.findAll();
};

const findOne = async (id) => {
  return tipoRepository.findOne(id);
};

const create = async (data) => {
  return tipoRepository.create(data);
};

const update = async (id, data) => {
  return tipoRepository.update(id, data);
};

const remove = async (id) => {
  return tipoRepository.remove(id);
};

module.exports = { findAll, findOne, create, update, remove };
