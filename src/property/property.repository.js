const { prisma } = require('../shared/db.js');

const findAll = async (filters = {}) => {
  const where = {};
  if (filters.zoneId) where.zoneId = Number(filters.zoneId);
  if (filters.propertyTypeId) where.propertyTypeId = Number(filters.propertyTypeId);
  if (filters.operation) where.operation = filters.operation;
  return prisma.property.findMany({
    where,
    orderBy: { id: 'asc' },
    include: { propertyType: true, zone: true, photos: true }
  });
};

const findOne = async (id) => {
  return prisma.property.findUnique({
    where: { id },
    include: { propertyType: true, zone: true, photos: true }
  });
};

const create = async (data) => {
  return prisma.property.create({
    data: {
      rooms: data.rooms,
      squareMeters: data.squareMeters,
      garage: data.garage,
      creditEligible: data.creditEligible,
      description: data.description,
      operation: data.operation,
      address: data.address,
      latitude: data.latitude,
      longitude: data.longitude,
      currency: data.currency,
      price: data.price,
      propertyTypeId: data.propertyTypeId,
      zoneId: data.zoneId,
      userId: data.userId
    }
  });
};

const update = async (id, data) => {
  return prisma.property.update({
    where: { id },
    data: {
      rooms: data.rooms,
      squareMeters: data.squareMeters,
      garage: data.garage,
      creditEligible: data.creditEligible,
      description: data.description,
      operation: data.operation,
      address: data.address,
      latitude: data.latitude,
      longitude: data.longitude,
      currency: data.currency,
      price: data.price,
      propertyTypeId: data.propertyTypeId,
      zoneId: data.zoneId,
      userId: data.userId
    }
  });
};

const remove = async (id) => {
  return prisma.property.delete({
    where: { id }
  });
};

module.exports = { findAll, findOne, create, update, remove };
