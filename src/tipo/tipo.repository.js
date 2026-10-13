const { prisma } = require('../shared/db.js');

const findAll = async () => {
  return prisma.tipo.findMany({
    orderBy: { id: 'asc' }
  });
};

const findOne = async (id) => {
  return prisma.tipo.findUnique({
    where: { id }
  });
};

const create = async (data) => {
  return prisma.tipo.create({
    data: { descTipo: data.descTipo }
  });
};

const update = async (id, data) => {
  return prisma.tipo.update({
    where: { id },
    data: { descTipo: data.descTipo }
  });
};

const remove = async (id) => {
  return prisma.tipo.delete({
    where: { id }
  });
};

module.exports = { findAll, findOne, create, update, remove };
