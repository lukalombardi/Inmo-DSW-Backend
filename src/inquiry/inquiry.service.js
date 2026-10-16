const inquiryRepository = require('./inquiry.repository.js');

const findAll = async () => {
  return inquiryRepository.findAll();
};

const findOne = async (id) => {
  return inquiryRepository.findOne(id);
};

const create = async (data) => {
  return inquiryRepository.create(data);
};

const update = async (id, data) => {
  return inquiryRepository.update(id, data);
};

const remove = async (id) => {
  return inquiryRepository.remove(id);
};

module.exports = { findAll, findOne, create, update, remove };
