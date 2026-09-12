const { prisma } = require('../db.js');

const getZonas = async (req, res) => {
  try {
    const zonas = await prisma.zona.findMany();
    res.json(zonas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las zonas' });
  }
};

const getZona = async (req, res) => {
  try {
    const zona = await prisma.zona.findUnique({
      where: { id: parseInt(req.params.id) }
    });
    if (!zona) {
      return res.status(404).json({ error: 'Zona no encontrada' });
    }
    res.json(zona);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la zona' });
  }
};

const createZona = async (req, res) => {
  try {
    const zona = await prisma.zona.create({
      data: { nombreZona: req.body.nombreZona }
    });
    res.status(201).json(zona);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la zona' });
  }
};

const updateZona = async (req, res) => {
  try {
    const zonaActualizada = await prisma.zona.update({
      where: { id: parseInt(req.params.id) },
      data: { nombreZona: req.body.nombreZona }
    });
    res.json(zonaActualizada);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Zona no encontrada' });
    }
    res.status(500).json({ error: 'Error al actualizar la zona' });
  }
};

const deleteZona = async (req, res) => {
  try {
    const zonaEliminada = await prisma.zona.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.json(zonaEliminada);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Zona no encontrada' });
    }
    if (error.code === 'P2003') {
      return res.status(409).json({
        error: 'No se puede eliminar la zona porque tiene propiedades asociadas'
      });
    }
    res.status(500).json({ error: 'Error al eliminar la zona' });
  }
};

module.exports = { getZonas, getZona, createZona, updateZona, deleteZona };