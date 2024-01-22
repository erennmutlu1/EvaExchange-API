// repositories/shareRepository.js
const { Share } = require('../models');

const getAllShares = async () => {
  return Share.findAll();
};

const getShareById = async (id) => {
  return Share.findByPk(id);
};

const createShare = async (data) => {
  return Share.create(data);
};

const updateShare = async (id, data) => {
  const share = await Share.findByPk(id);
  if (!share) {
    return null;
  }
  return share.update(data);
};

const deleteShare = async (id) => {
  const share = await Share.findByPk(id);
  if (!share) {
    return false;
  }
  await share.destroy();
  return true;
};

module.exports = {
  getAllShares,
  getShareById,
  createShare,
  updateShare,
  deleteShare,
};
