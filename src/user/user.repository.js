const { prisma } = require('../shared/db.js');

const userSelect = { id: true, name: true, email: true, role: true };

const findAll = async () => {
  return prisma.user.findMany({
    select: userSelect
  });
};

const findOne = async (id) => {
  return prisma.user.findUnique({
    where: { id },
    select: userSelect
  });
};

const findByEmail = async(email) => {
  return prisma.user.findUnique({
    where: {email},
  })
}

const create = async (data) => {
  return prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role
    },
    select: userSelect
  });
};

const update = async (id, data) => {
  return prisma.user.update({
    where: { id },
    data: {
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role
    },
    select: userSelect
  });
};

const remove = async (id) => {
  return prisma.user.delete({
    where: { id },
    select: userSelect
  });
};

module.exports = { findAll, findOne, create, update, remove, findByEmail };
