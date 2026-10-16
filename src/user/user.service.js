const bcrypt = require('bcryptjs');
const userRepository = require('./user.repository.js');

const findAll = async () => {
  return userRepository.findAll();
};

const findOne = async (id) => {
  return userRepository.findOne(id);
};

const create = async (data) => {
  const passwordHash = await bcrypt.hash(data.password, 10);
  return userRepository.create({...data, password: passwordHash});
};

const update = async (id, data) => {
  if (data.password){
    const passwordHash = await bcrypt.hash(data.password, 10);
    return userRepository.update(id, {...data, password: passwordHash});
  }
  else{
    return userRepository.update(id, data);
  }
};

const remove = async (id) => {
  return userRepository.remove(id);
};

module.exports = { findAll, findOne, create, update, remove };
