const { prisma } = require('../shared/db.js');

const findAll = async () => {
  return prisma.propiedad.findMany({
    orderBy: { id: 'asc' }
  });
};

const findOne = async (id) => {
  return prisma.propiedad.findUnique({
    where: { id }
  });
};

const create = async (data) => {
  return prisma.propiedad.create({
    data: {
      cantHabitaciones: data.cantHabitaciones,
      metrosCuadrados: data.metrosCuadrados,
      cochera: data.cochera,
      aptoCredito: data.aptoCredito,
      descripcion: data.descripcion,
      operacion: data.operacion,
      direccion: data.direccion,
      latitud: data.latitud,
      longitud: data.longitud,
      moneda: data.moneda,
      precio: data.precio,
      tipoId: data.tipoId,
      zonaId: data.zonaId,
      usuarioId: data.usuarioId
    }
  });
};

const update = async (id, data) => {
  return prisma.propiedad.update({
    where: { id },
    data: {
      cantHabitaciones: data.cantHabitaciones,
      metrosCuadrados: data.metrosCuadrados,
      cochera: data.cochera,
      aptoCredito: data.aptoCredito,
      descripcion: data.descripcion,
      operacion: data.operacion,
      direccion: data.direccion,
      latitud: data.latitud,
      longitud: data.longitud,
      moneda: data.moneda,
      precio: data.precio,
      tipoId: data.tipoId,
      zonaId: data.zonaId,
      usuarioId: data.usuarioId
    }
  });
};

const remove = async (id) => {
  return prisma.propiedad.delete({
    where: { id }
  });
};

module.exports = { findAll, findOne, create, update, remove };
