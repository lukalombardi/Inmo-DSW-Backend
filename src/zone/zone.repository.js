const { prisma } = require('../shared/db.js');

const findAll = async () => {
  return prisma.zone.findMany();
};

const findOne = async (id) => {
  return prisma.zone.findUnique({
    where: { id }
  });
};

const create = async (data) => {
  return prisma.zone.create({
    data: { name: data.name }
  });
};

const update = async (id, data) => {
  return prisma.zone.update({
    where: { id },
    data: { name: data.name }
  });
};

const remove = async (id) => {
  return prisma.zone.delete({
    where: { id }
  });
};

module.exports = { findAll, findOne, create, update, remove };
