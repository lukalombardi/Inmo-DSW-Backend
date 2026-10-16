const propertyTypeService = require('./property-type.service.js');

const getPropertyTypes = async (req, res) => {
  try {
    const propertyTypes = await propertyTypeService.findAll();
    res.json(propertyTypes);
  } catch (error) {
    console.error('getPropertyTypes:', error);
    res.status(500).json({ error: 'Error al obtener los tipos' });
  }
};

const getPropertyType = async (req, res) => {
  try {
    const propertyType = await propertyTypeService.findOne(req.params.id);
    if (!propertyType) {
      return res.status(404).json({ error: 'Tipo no encontrado' });
    }
    res.json(propertyType);
  } catch (error) {
    console.error('getPropertyType:', error);
    res.status(500).json({ error: 'Error al obtener el tipo' });
  }
};

const createPropertyType = async (req, res) => {
  try {
    const propertyType = await propertyTypeService.create({ description: req.body.description });
    res.status(201).json(propertyType);
  } catch (error) {
    console.error('createPropertyType:', error);
    res.status(500).json({ error: 'Error al crear el tipo' });
  }
};

const updatePropertyType = async (req, res) => {
  try {
    const updatedPropertyType = await propertyTypeService.update(req.params.id, {
      description: req.body.description
    });
    res.json(updatedPropertyType);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Tipo no encontrado' });
    }
    console.error('updatePropertyType:', error);
    res.status(500).json({ error: 'Error al actualizar el tipo' });
  }
};

const deletePropertyType = async (req, res) => {
  try {
    const deletedPropertyType = await propertyTypeService.remove(req.params.id);
    res.json(deletedPropertyType);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Tipo no encontrado' });
    }
    if (error.code === 'P2003') {
      return res.status(409).json({
        error: 'No se puede eliminar el tipo porque tiene propiedades asociadas'
      });
    }
    console.error('deletePropertyType:', error);
    res.status(500).json({ error: 'Error al eliminar el tipo' });
  }
};

module.exports = { getPropertyTypes, getPropertyType, createPropertyType, updatePropertyType, deletePropertyType };
