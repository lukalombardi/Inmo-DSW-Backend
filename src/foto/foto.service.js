const fs = require('fs/promises');
const path = require('path');
const fotoRepository = require('./foto.repository.js');
const { UPLOAD_DIR } = require('../shared/upload.js');

const findAll = (propiedadId) => fotoRepository.findAll(propiedadId);
const findOne = (id) => fotoRepository.findOne(id);
const create = (data) => fotoRepository.create(data);

const remove = async (id) => {
  const foto = await fotoRepository.remove(id);   // tira P2025 si no existe
  // borrar el archivo del disco (best-effort: si ya no esta, no rompemos)
  try {
    await fs.unlink(path.join(UPLOAD_DIR, path.basename(foto.url)));
  } catch (error) {
    console.error('No se pudo borrar el archivo fisico:', error.message);
  }
  return foto;
};

module.exports = { findAll, findOne, create, remove };