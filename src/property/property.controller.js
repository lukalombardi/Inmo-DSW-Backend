const propertyService = require('./property.service.js');

const getProperties = async (req, res) => {
    try {
    const properties = await propertyService.findAll(req.query);
    res.json(properties);
    } catch (error) {
        console.error('getProperties:', error);
        res.status(500).json({ error: 'Error al obtener las propiedades' });
    }
};

const getProperty = async (req, res) => {
    try {
        const property = await propertyService.findOne(req.params.id);
    if (!property) {
        return res.status(404).json({ error: 'Propiedad no encontrada' });
    }
    res.json(property);
    } catch (error) {
        console.error('getProperty:', error);
        res.status(500).json({ error: 'Error al obtener la propiedad' });
    }
};

const createProperty = async (req, res) => {
    try {
        const property = await propertyService.create({
            rooms: req.body.rooms,
            squareMeters: req.body.squareMeters,
            garage: req.body.garage,
            creditEligible: req.body.creditEligible,
            description: req.body.description,
            operation: req.body.operation,
            address: req.body.address,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            currency: req.body.currency,
            price: req.body.price,
            propertyTypeId: req.body.propertyTypeId,
            zoneId: req.body.zoneId,
            userId: req.body.userId
        });
    res.status(201).json(property);
    } catch (error) {
        if (error.code === 'P2003') {
            return res.status(400).json({ error: 'La zona, el tipo o el usuario indicado no existe' });
        }
        console.error('createProperty:', error);
        res.status(500).json({ error: 'Error al crear la propiedad' });
    }
};

const updateProperty = async (req, res) => {
    try {
        const updatedProperty = await propertyService.update(req.params.id, {
            rooms: req.body.rooms,
            squareMeters: req.body.squareMeters,
            garage: req.body.garage,
            creditEligible: req.body.creditEligible,
            description: req.body.description,
            operation: req.body.operation,
            address: req.body.address,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            currency: req.body.currency,
            price: req.body.price,
            propertyTypeId: req.body.propertyTypeId,
            zoneId: req.body.zoneId,
            userId: req.body.userId
        });
    res.json(updatedProperty);
    } catch (error) {
    if (error.code === 'P2025') {
        return res.status(404).json({ error: 'Propiedad no encontrada' });
    }
    if (error.code === 'P2003') {
        return res.status(400).json({ error: 'La zona, el tipo o el usuario indicado no existe' });
    }
    console.error('updateProperty:', error);
    res.status(500).json({ error: 'Error al actualizar la propiedad' });
    }
};


const deleteProperty = async (req, res) => {
    try {
        const deletedProperty = await propertyService.remove(req.params.id);
    res.json(deletedProperty);
        } catch (error) {
    if (error.code === 'P2025') {
        return res.status(404).json({ error: 'Propiedad no encontrada' });
    }
    //en la linea que sigue creo que no puede ocurrir ese error en esta clase
    /*if (error.code === 'P2003') {
        return res.status(409).json({
        error: 'No se puede eliminar la propiedad porque tiene propiedades asociadas'
        });
    }*/
    console.error('deleteProperty:', error);
    res.status(500).json({ error: 'Error al eliminar la propiedad' });
    }
};

module.exports = { getProperties, getProperty, createProperty, updateProperty, deleteProperty };
