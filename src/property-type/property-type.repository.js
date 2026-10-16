const { prisma } = require('../shared/db.js');

const findAll = async () => {
  return prisma.propertyType.findMany({
    orderBy: { id: 'asc' }
  });
};

const findOne = async (id) => {
  return prisma.propertyType.findUnique({
    where: { id }
  });
};

const create = async (data) => {
  return prisma.propertyType.create({
    data: { description: data.description }
  });
};

const update = async (id, data) => {
  return prisma.propertyType.update({
    where: { id },
    data: { description: data.description }
  });
};

const remove = async (id) => {
  return prisma.propertyType.delete({
    where: { id }
  });
};

module.exports = { findAll, findOne, create, update, remove };
