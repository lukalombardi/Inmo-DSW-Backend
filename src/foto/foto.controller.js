const fs = require('fs/promises');
const path = require('path');
const fotoService = require('./foto.service.js');
const { UPLOAD_DIR } = require('../shared/upload.js');

// si algo falla despues de subir el archivo, lo borramos para no dejar huerfanos
const limpiarArchivo = async (file) => {
  if (!file) return;
  try { await fs.unlink(path.join(UPLOAD_DIR, file.filename)); } catch (_) {}
};

const getFotos = async (req, res) => {
  try {
    const fotos = await fotoService.findAll(req.query.propiedadId);
    res.json(fotos);
  } catch (error) {
    console.error('getFotos:', error);
    res.status(500).json({ error: 'Error al obtener las fotos' });
  }
};

const getFoto = async (req, res) => {
  try {
    const foto = await fotoService.findOne(req.params.id);
    if (!foto) return res.status(404).json({ error: 'Foto no encontrada' });
    res.json(foto);
  } catch (error) {
    console.error('getFoto:', error);
    res.status(500).json({ error: 'Error al obtener la foto' });
  }
};

const createFoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Falta el archivo de imagen (campo "imagen")' });
    }
    const foto = await fotoService.create({
      url: `/uploads/${req.file.filename}`,
      propiedadId: req.body.propiedadId   // ya es number por el coerce de Zod
    });
    res.status(201).json(foto);
  } catch (error) {
    await limpiarArchivo(req.file);
    if (error.code === 'P2003') {
      return res.status(404).json({ error: 'La propiedad indicada no existe' });
    }
    console.error('createFoto:', error);
    res.status(500).json({ error: 'Error al crear la foto' });
  }
};

const deleteFoto = async (req, res) => {
  try {
    const foto = await fotoService.remove(req.params.id);
    res.json(foto);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Foto no encontrada' });
    }
    console.error('deleteFoto:', error);
    res.status(500).json({ error: 'Error al eliminar la foto' });
  }
};

module.exports = { getFotos, getFoto, createFoto, deleteFoto };