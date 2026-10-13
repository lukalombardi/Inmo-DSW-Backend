const zonaRepository = require('./zona.repository.js');

const findAll = async () => {
  return zonaRepository.findAll();
};

const findOne = async (id) => {
  return zonaRepository.findOne(id);
};

const create = async (data) => {
  return zonaRepository.create(data);
};

const update = async (id, data) => {
  return zonaRepository.update(id, data);
};

const remove = async (id) => {
  return zonaRepository.remove(id);
};

module.exports = { findAll, findOne, create, update, remove };
