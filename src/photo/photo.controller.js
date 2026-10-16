const fs = require('fs/promises');
const path = require('path');
const photoService = require('./photo.service.js');
const { UPLOAD_DIR } = require('../shared/upload.js');


const removeUploadedFile = async (file) => {
  if (!file) return;
  try { await fs.unlink(path.join(UPLOAD_DIR, file.filename)); } catch (_) {}
};

const getPhotos = async (req, res) => {
  try {
    const photos = await photoService.findAll(req.query.propertyId);
    res.json(photos);
  } catch (error) {
    console.error('getPhotos:', error);
    res.status(500).json({ error: 'Error al obtener las fotos' });
  }
};

const getPhoto = async (req, res) => {
  try {
    const photo = await photoService.findOne(req.params.id);
    if (!photo) return res.status(404).json({ error: 'Foto no encontrada' });
    res.json(photo);
  } catch (error) {
    console.error('getPhoto:', error);
    res.status(500).json({ error: 'Error al obtener la foto' });
  }
};

const createPhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Falta el archivo de imagen (campo "image")' });
    }
    const photo = await photoService.create({
      url: `/uploads/${req.file.filename}`,
      propertyId: req.body.propertyId   // ya es number por el coerce de Zod
    });
    res.status(201).json(photo);
  } catch (error) {
    await removeUploadedFile(req.file);
    if (error.code === 'P2003') {
      return res.status(404).json({ error: 'La propiedad indicada no existe' });
    }
    console.error('createPhoto:', error);
    res.status(500).json({ error: 'Error al crear la foto' });
  }
};

const deletePhoto = async (req, res) => {
  try {
    const photo = await photoService.remove(req.params.id);
    res.json(photo);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Foto no encontrada' });
    }
    console.error('deletePhoto:', error);
    res.status(500).json({ error: 'Error al eliminar la foto' });
  }
};

module.exports = { getPhotos, getPhoto, createPhoto, deletePhoto };