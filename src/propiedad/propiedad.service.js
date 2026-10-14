const propiedadRepository = require('./propiedad.repository.js');

const findAll = async (filtros) => {
  return propiedadRepository.findAll(filtros);
};

const findOne = async (id) => {
  return propiedadRepository.findOne(id);
};

const create = async (data) => {
  return propiedadRepository.create(data);
};

const update = async (id, data) => {
  return propiedadRepository.update(id, data);
};

const remove = async (id) => {
  return propiedadRepository.remove(id);
};

module.exports = { findAll, findOne, create, update, remove };
