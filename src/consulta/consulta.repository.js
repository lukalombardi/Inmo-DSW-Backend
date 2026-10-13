const { prisma } = require('../shared/db.js');

const findAll = async () => {
  return prisma.consulta.findMany();
};

const findOne = async (id) => {
  return prisma.consulta.findUnique({
    where: { id }
  });
};

const create = async (data) => {
  return prisma.consulta.create({
    data: {
      nombre: data.nombre,
      email: data.email,
      mensaje: data.mensaje,
      propiedadId: data.propiedadId
    }
  });
};

const update = async (id, data) => {
  return prisma.consulta.update({
    where: { id },
    data: {
      nombre: data.nombre,
      email: data.email,
      mensaje: data.mensaje,
      propiedadId: data.propiedadId
    }
  });
};

const remove = async (id) => {
  return prisma.consulta.delete({
    where: { id }
  });
};

module.exports = { findAll, findOne, create, update, remove };
