const { prisma } = require('../shared/db.js');

const findAll = async () => {
  return prisma.inquiry.findMany();
};

const findOne = async (id) => {
  return prisma.inquiry.findUnique({
    where: { id }
  });
};

const create = async (data) => {
  return prisma.inquiry.create({
    data: {
      name: data.name,
      email: data.email,
      message: data.message,
      propertyId: data.propertyId
    }
  });
};

const update = async (id, data) => {
  return prisma.inquiry.update({
    where: { id },
    data: {
      name: data.name,
      email: data.email,
      message: data.message,
      propertyId: data.propertyId
    }
  });
};

const remove = async (id) => {
  return prisma.inquiry.delete({
    where: { id }
  });
};

module.exports = { findAll, findOne, create, update, remove };
