const { prisma } = require('../shared/db.js');

const usuarioSelect = { id: true, nombre: true, email: true, rol: true };

const findAll = async () => {
  return prisma.usuario.findMany({
    select: usuarioSelect
  });
};

const findOne = async (id) => {
  return prisma.usuario.findUnique({
    where: { id },
    select: usuarioSelect
  });
};

const findByEmail = async(email) => {
  return prisma.usuario.findUnique({
    where: {email},
  })
}

const create = async (data) => {
  return prisma.usuario.create({
    data: {
      nombre: data.nombre,
      email: data.email,
      password: data.password,
      rol: data.rol
    },
    select: usuarioSelect
  });
};

const update = async (id, data) => {
  return prisma.usuario.update({
    where: { id },
    data: {
      nombre: data.nombre,
      email: data.email,
      password: data.password,
      rol: data.rol
    },
    select: usuarioSelect
  });
};

const remove = async (id) => {
  return prisma.usuario.delete({
    where: { id },
    select: usuarioSelect
  });
};

module.exports = { findAll, findOne, create, update, remove, findByEmail };
