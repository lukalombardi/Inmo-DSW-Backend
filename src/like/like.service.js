const likeRepository = require('./like.repository.js');
const propertyRepository = require('../property/property.repository.js');
const { domainError } = require('../shared/domainError.js');

const create = async ({ userId, propertyId }) => {
  const property = await propertyRepository.findOne(propertyId);
  if (!property) {
    throw domainError('NOT_FOUND', 'Propiedad no encontrada');
  }
  const existing = await likeRepository.findByUserAndProperty(userId, propertyId);
  if (existing) {
    throw domainError('ALREADY_LIKED', 'Ya le diste like a esta propiedad');
  }
  return likeRepository.create({ userId, propertyId });
};

const remove = async ({ userId, propertyId }) => {
  const like = await likeRepository.findByUserAndProperty(userId, propertyId);
  if (!like) {
    throw domainError('NOT_FOUND', 'No le diste like a esta propiedad');
  }
  return likeRepository.remove(like.id);
};

// Devuelve las propiedades marcadas, de la mas reciente a la mas vieja
const findMine = async (userId) => {
  const likes = await likeRepository.findMine(userId);
  return likes.map((like) => like.property);
};

module.exports = { create, remove, findMine };
