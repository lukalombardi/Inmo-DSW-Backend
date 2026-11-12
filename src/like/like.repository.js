const { prisma } = require('../shared/db.js');

const create = async (data) => {
  return prisma.like.create({
    data: {
      userId: data.userId,
      propertyId: data.propertyId
    }
  });
};

const remove = async (id) => {
  return prisma.like.delete({
    where: { id }
  });
};

const findByUserAndProperty = async (userId, propertyId) => {
  return prisma.like.findUnique({
    where: { propertyId_userId: { propertyId, userId } }
  });
};

const findMine = async (userId) => {
  return prisma.like.findMany({
    where: { userId },
    orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
    include: {
      property: {
        include: {
          propertyType: true,
          zone: true,
          photos: true,
          _count: { select: { likes: true } }
        }
      }
    }
  });
};

module.exports = { create, remove, findByUserAndProperty, findMine };
