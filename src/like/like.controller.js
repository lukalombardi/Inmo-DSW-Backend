const likeService = require('./like.service.js');
const { sendDomainError } = require('../shared/domainError.js');

const createLike = async (req, res) => {
  try {
    const like = await likeService.create({
      userId: req.user.id,
      propertyId: req.params.id
    });
    res.status(201).json(like);
  } catch (error) {
    if (sendDomainError(res, error)) return;
    console.error('createLike:', error);
    res.status(500).json({ error: 'Error al dar like a la propiedad' });
  }
};

const deleteLike = async (req, res) => {
  try {
    const like = await likeService.remove({
      userId: req.user.id,
      propertyId: req.params.id
    });
    res.json(like);
  } catch (error) {
    if (sendDomainError(res, error)) return;
    console.error('deleteLike:', error);
    res.status(500).json({ error: 'Error al quitar el like' });
  }
};

const getMyLikes = async (req, res) => {
  try {
    const properties = await likeService.findMine(req.user.id);
    res.json(properties);
  } catch (error) {
    console.error('getMyLikes:', error);
    res.status(500).json({ error: 'Error al obtener los favoritos' });
  }
};

module.exports = { createLike, deleteLike, getMyLikes };
