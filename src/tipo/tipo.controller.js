const tipoService = require('./tipo.service.js');

const getTipos = async (req, res) => {
  try {
    const tipos = await tipoService.findAll();
    res.json(tipos);
  } catch (error) {
    console.error('getTipos:', error);
    res.status(500).json({ error: 'Error al obtener los tipos' });
  }
};

const getTipo = async (req, res) => {
  try {
    const tipo = await tipoService.findOne(req.params.id);
    if (!tipo) {
      return res.status(404).json({ error: 'Tipo no encontrado' });
    }
    res.json(tipo);
  } catch (error) {
    console.error('getTipo:', error);
    res.status(500).json({ error: 'Error al obtener el tipo' });
  }
};

const createTipo = async (req, res) => {
  try {
    const tipo = await tipoService.create({ descTipo: req.body.descTipo });
    res.status(201).json(tipo);
  } catch (error) {
    console.error('createTipo:', error);
    res.status(500).json({ error: 'Error al crear el tipo' });
  }
};

const updateTipo = async (req, res) => {
  try {
    const tipoActualizado = await tipoService.update(req.params.id, {
      descTipo: req.body.descTipo
    });
    res.json(tipoActualizado);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Tipo no encontrado' });
    }
    console.error('updateTipo:', error);
    res.status(500).json({ error: 'Error al actualizar el tipo' });
  }
};

const deleteTipo = async (req, res) => {
  try {
    const tipoEliminado = await tipoService.remove(req.params.id);
    res.json(tipoEliminado);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Tipo no encontrado' });
    }
    if (error.code === 'P2003') {
      return res.status(409).json({
        error: 'No se puede eliminar el tipo porque tiene propiedades asociadas'
      });
    }
    console.error('deleteTipo:', error);
    res.status(500).json({ error: 'Error al eliminar el tipo' });
  }
};

module.exports = { getTipos, getTipo, createTipo, updateTipo, deleteTipo };
