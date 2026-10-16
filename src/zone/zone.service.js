const zoneRepository = require('./zone.repository.js');

const findAll = async () => {
  return zoneRepository.findAll();
};

const findOne = async (id) => {
  return zoneRepository.findOne(id);
};

const create = async (data) => {
  return zoneRepository.create(data);
};

const update = async (id, data) => {
  return zoneRepository.update(id, data);
};

const remove = async (id) => {
  return zoneRepository.remove(id);
};

module.exports = { findAll, findOne, create, update, remove };
