const { prisma } = require('../shared/db.js');

const findAll = async () => {
  return prisma.zona.findMany();
};

const findOne = async (id) => {
  return prisma.zona.findUnique({
    where: { id }
  });
};

const create = async (data) => {
  return prisma.zona.create({
    data: { nombreZona: data.nombreZona }
  });
};

const update = async (id, data) => {
  return prisma.zona.update({
    where: { id },
    data: { nombreZona: data.nombreZona }
  });
};

const remove = async (id) => {
  return prisma.zona.delete({
    where: { id }
  });
};

module.exports = { findAll, findOne, create, update, remove };
