const { prisma } = require('../db.js');

const getConsultas = async (req,res)=>{
    try {
        const consultas = await prisma.consulta.findMany();
        res.json(consultas);
    }catch(error){
        console.error('getConsultas:', error);
        res.status(500).json({ error: 'Error al obtener las Consultas' });  
    }
};

const getConsulta = async(req,res) =>{
  try {
    const consulta = await prisma.consulta.findUnique({
      where: { id: req.params.id }
    });
    if (!consulta) {
      return res.status(404).json({ error: 'Consulta no encontrada' });
    }
    res.json(consulta);
  } catch (error) {
    console.error('getConsulta:', error);
    res.status(500).json({ error: 'Error al obtener la Consulta' });
  }

};

const updateConsulta = async (req, res) => {
  try {
    const consultaActualizada = await prisma.consulta.update({
      where: { id: req.params.id },
      data: {
        nombre: req.body.nombre,
        email: req.body.email,
        mensaje: req.body.mensaje,
        propiedadId: req.body.propiedadId }
    });
    res.json(consultaActualizada);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Consulta no encontrada' });
    }
    if (error.code === 'P2003') {
        return res.status(404).json({ error: 'La propiedad indicada no existe' });
    }
    console.error('updateConsulta:', error);
    res.status(500).json({ error: 'Error al actualizar la Consulta' });
  }
};

const createConsulta = async (req, res) => {
  try {
    const consulta = await prisma.consulta.create({
      data: {
        nombre: req.body.nombre,
        email: req.body.email,
        mensaje: req.body.mensaje,
        propiedadId: req.body.propiedadId
      }
    });
    res.status(201).json(consulta);
  } catch (error) {
    if (error.code === 'P2003') {
      return res.status(404).json({ error: 'La propiedad indicada no existe' });
    }
    console.error('createConsulta:', error);
    res.status(500).json({ error: 'Error al crear la Consulta' });
  }
};

const deleteConsulta = async (req, res) => {
  try {
    const consultaEliminada = await prisma.consulta.delete({
      where: { id: req.params.id }
    });
    res.json(consultaEliminada);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Consulta no encontrada' });
    }
    console.error('deleteConsulta:', error);
    res.status(500).json({ error: 'Error al eliminar la Consulta' });
  }
};
module.exports = { getConsulta, getConsultas, createConsulta, updateConsulta, deleteConsulta };