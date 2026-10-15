const { prisma } = require('../shared/db.js');

const findAll = async (filtros = {}) => {
  const where = {};
  if (filtros.zonaId) where.zonaId = Number(filtros.zonaId);
  if (filtros.tipoId) where.tipoId = Number(filtros.tipoId);
  if (filtros.operacion) where.operacion = filtros.operacion;
  return prisma.propiedad.findMany({
    where,
    orderBy: { id: 'asc' },
    include: { tipo: true, zona: true, fotos: true }
  });
};

const findOne = async (id) => {
  return prisma.propiedad.findUnique({
    where: { id },
    include: { tipo: true, zona: true, fotos: true }
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
