const propertyRepository = require('./property.repository.js');

const findAll = async (filters) => {
  return propertyRepository.findAll(filters);
};

const findOne = async (id) => {
  return propertyRepository.findOne(id);
};

const create = async (data) => {
  return propertyRepository.create(data);
};

const update = async (id, data) => {
  return propertyRepository.update(id, data);
};

const remove = async (id) => {
  return propertyRepository.remove(id);
};

module.exports = { findAll, findOne, create, update, remove };
