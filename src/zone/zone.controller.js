const zoneService = require('./zone.service.js');

const getZones = async (req, res) => {
  try {
    const zones = await zoneService.findAll();
    res.json(zones);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las zonas' });
  }
};

const getZone = async (req, res) => {
  try {
    const zone = await zoneService.findOne(req.params.id);
    if (!zone) {
      return res.status(404).json({ error: 'Zona no encontrada' });
    }
    res.json(zone);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la zona' });
  }
};

const createZone = async (req, res) => {
  try {
    const zone = await zoneService.create({ name: req.body.name });
    res.status(201).json(zone);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la zona' });
  }
};

const updateZone = async (req, res) => {
  try {
    const updatedZone = await zoneService.update(req.params.id, {
      name: req.body.name
    });
    res.json(updatedZone);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Zona no encontrada' });
    }
    res.status(500).json({ error: 'Error al actualizar la zona' });
  }
};

const deleteZone = async (req, res) => {
  try {
    const deletedZone = await zoneService.remove(req.params.id);
    res.json(deletedZone);
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

module.exports = { getZones, getZone, createZone, updateZone, deleteZone };
