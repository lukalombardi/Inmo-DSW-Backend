const { prisma } = require('../shared/db.js');

const findAll = async (propertyId) => {
  const where = propertyId ? { propertyId: Number(propertyId) } : {};
  return prisma.photo.findMany({ where, orderBy: { id: 'asc' } });
};

const findOne = async (id) => prisma.photo.findUnique({ where: { id } });

const create = async (data) =>
  prisma.photo.create({ data: { url: data.url, propertyId: data.propertyId } });

const remove = async (id) => prisma.photo.delete({ where: { id } });

module.exports = { findAll, findOne, create, remove };