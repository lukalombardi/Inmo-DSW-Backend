const fs = require('fs/promises');
const path = require('path');
const photoRepository = require('./photo.repository.js');
const { UPLOAD_DIR } = require('../shared/upload.js');

const findAll = (propertyId) => photoRepository.findAll(propertyId);
const findOne = (id) => photoRepository.findOne(id);
const create = (data) => photoRepository.create(data);

const remove = async (id) => {
  const photo = await photoRepository.remove(id);   
  
  try {
    await fs.unlink(path.join(UPLOAD_DIR, path.basename(photo.url)));
  } catch (error) {
    console.error('No se pudo borrar el archivo fisico:', error.message);
  }
  return photo;
};

module.exports = { findAll, findOne, create, remove };