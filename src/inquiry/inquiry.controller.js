const inquiryService = require('./inquiry.service.js');

const getInquiries = async (req,res)=>{
    try {
        const inquiries = await inquiryService.findAll();
        res.json(inquiries);
    }catch(error){
        console.error('getInquiries:', error);
        res.status(500).json({ error: 'Error al obtener las Consultas' });
    }
};

const getInquiry = async(req,res) =>{
  try {
    const inquiry = await inquiryService.findOne(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ error: 'Consulta no encontrada' });
    }
    res.json(inquiry);
  } catch (error) {
    console.error('getInquiry:', error);
    res.status(500).json({ error: 'Error al obtener la Consulta' });
  }

};

const updateInquiry = async (req, res) => {
  try {
    const updatedInquiry = await inquiryService.update(req.params.id, {
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
        propertyId: req.body.propertyId
    });
    res.json(updatedInquiry);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Consulta no encontrada' });
    }
    if (error.code === 'P2003') {
        return res.status(404).json({ error: 'La propiedad indicada no existe' });
    }
    console.error('updateInquiry:', error);
    res.status(500).json({ error: 'Error al actualizar la Consulta' });
  }
};

const createInquiry = async (req, res) => {
  try {
    const inquiry = await inquiryService.create({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
        propertyId: req.body.propertyId
    });
    res.status(201).json(inquiry);
  } catch (error) {
    if (error.code === 'P2003') {
      return res.status(404).json({ error: 'La propiedad indicada no existe' });
    }
    console.error('createInquiry:', error);
    res.status(500).json({ error: 'Error al crear la Consulta' });
  }
};

const deleteInquiry = async (req, res) => {
  try {
    const deletedInquiry = await inquiryService.remove(req.params.id);
    res.json(deletedInquiry);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Consulta no encontrada' });
    }
    console.error('deleteInquiry:', error);
    res.status(500).json({ error: 'Error al eliminar la Consulta' });
  }
};
module.exports = { getInquiry, getInquiries, createInquiry, updateInquiry, deleteInquiry };
