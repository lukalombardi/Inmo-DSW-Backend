const propiedadService = require('./propiedad.service.js');

const getPropiedades = async (req, res) => {
    try {
    const propiedades = await propiedadService.findAll(req.query);
    res.json(propiedades);
    } catch (error) {
        console.error('getPropiedades:', error);
        res.status(500).json({ error: 'Error al obtener las propiedades' });
    }
};

const getPropiedad = async (req, res) => {
    try {
        const propiedad = await propiedadService.findOne(req.params.id);
    if (!propiedad) {
        return res.status(404).json({ error: 'Propiedad no encontrada' });
    }
    res.json(propiedad);
    } catch (error) {
        console.error('getPropiedad:', error);
        res.status(500).json({ error: 'Error al obtener la propiedad' });
    }
};

const createPropiedad = async (req, res) => {
    try {
        const propiedad = await propiedadService.create({
            cantHabitaciones: req.body.cantHabitaciones,
            metrosCuadrados: req.body.metrosCuadrados,
            cochera: req.body.cochera,
            aptoCredito: req.body.aptoCredito,
            descripcion: req.body.descripcion,
            operacion: req.body.operacion,
            direccion: req.body.direccion,
            latitud: req.body.latitud,
            longitud: req.body.longitud,
            moneda: req.body.moneda,
            precio: req.body.precio,
            tipoId: req.body.tipoId,
            zonaId: req.body.zonaId,
            usuarioId: req.body.usuarioId
        });
    res.status(201).json(propiedad);
    } catch (error) {
        if (error.code === 'P2003') {
            return res.status(400).json({ error: 'La zona, el tipo o el usuario indicado no existe' });
        }
        console.error('createPropiedad:', error);
        res.status(500).json({ error: 'Error al crear la propiedad' });
    }
};

const updatePropiedad = async (req, res) => {
    try {
        const propiedadActualizada = await propiedadService.update(req.params.id, {
            cantHabitaciones: req.body.cantHabitaciones,
            metrosCuadrados: req.body.metrosCuadrados,
            cochera: req.body.cochera,
            aptoCredito: req.body.aptoCredito,
            descripcion: req.body.descripcion,
            operacion: req.body.operacion,
            direccion: req.body.direccion,
            latitud: req.body.latitud,
            longitud: req.body.longitud,
            moneda: req.body.moneda,
            precio: req.body.precio,
            tipoId: req.body.tipoId,
            zonaId: req.body.zonaId,
            usuarioId: req.body.usuarioId
        });
    res.json(propiedadActualizada);
    } catch (error) {
    if (error.code === 'P2025') {
        return res.status(404).json({ error: 'Propiedad no encontrada' });
    }
    if (error.code === 'P2003') {
        return res.status(400).json({ error: 'La zona, el tipo o el usuario indicado no existe' });
    }
    console.error('updatePropiedad:', error);
    res.status(500).json({ error: 'Error al actualizar la propiedad' });
    }
};


const deletePropiedad = async (req, res) => {
    try {
        const PropiedadEliminada = await propiedadService.remove(req.params.id);
    res.json(PropiedadEliminada);
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
    console.error('deletePropiedad:', error);
    res.status(500).json({ error: 'Error al eliminar la propiedad' });
    }
};

module.exports = { getPropiedades, getPropiedad, createPropiedad, updatePropiedad, deletePropiedad };
