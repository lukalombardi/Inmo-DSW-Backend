const propertyTypeRepository = require('./property-type.repository.js');

const findAll = async () => {
  return propertyTypeRepository.findAll();
};

const findOne = async (id) => {
  return propertyTypeRepository.findOne(id);
};

const create = async (data) => {
  return propertyTypeRepository.create(data);
};

const update = async (id, data) => {
  return propertyTypeRepository.update(id, data);
};

const remove = async (id) => {
  return propertyTypeRepository.remove(id);
};

module.exports = { findAll, findOne, create, update, remove };
