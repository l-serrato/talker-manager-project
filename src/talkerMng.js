const fs = require('fs').promises;
const { join } = require('path');

const readTalkers = async () => {
  const path = './talker.json';
  try {
    const contentFile = await fs.readFile(join(__dirname, path), 'utf-8');
    return JSON.parse(contentFile);
  } catch (error) {
    return null;
  }
};

const getAllTalkers = async () => {
  const talkers = await readTalkers();
  return talkers;
};

const getTalkersById = async (id) => {
  const talkers = await readTalkers();
  return talkers.find((talker) => talker.id === id);
};

module.exports = {
  getAllTalkers,
  getTalkersById,
};