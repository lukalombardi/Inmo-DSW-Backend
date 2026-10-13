const { prisma } = require('../shared/db.js');

const findAll = async (propiedadId) => {
  const where = propiedadId ? { propiedadId: Number(propiedadId) } : {};
  return prisma.foto.findMany({ where, orderBy: { id: 'asc' } });
};

const findOne = async (id) => prisma.foto.findUnique({ where: { id } });

const create = async (data) =>
  prisma.foto.create({ data: { url: data.url, propiedadId: data.propiedadId } });

const remove = async (id) => prisma.foto.delete({ where: { id } });

module.exports = { findAll, findOne, create, remove };