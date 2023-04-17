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

const writeTalkerFile = async (content) => {
  const path = './talker.json';
  try {
    const completePath = join(__dirname, path);
    await fs.writeFile(completePath, JSON.stringify(content, null, 2));
  } catch (e) {
    console.error('Erro ao salvar o arquivo', e.message);
    return null;
  }
};

const updateTalkers = async (id, update) => {
  const talkerMng = await readTalkers();
  const talkerToUpdate = talkerMng.talkers.find(
    (talker) => talker.id === id,
  );

  if (talkerToUpdate) {
    talkerMng.talkers = talkerMng.talkers.map((talker) => {
        if (talker.id === id) return { ...talker, ...update };
        return talker;
      });
  
    await writeTalkerFile(talkerMng);
    return { ...talkerToUpdate, ...update };
  }

  return false;
};

const searchTalker = async (query) => {
  const talkerMng = await readTalkers();
  return talkerMng.talkers
    .filter((talker) => talker.name.includes(query));
};

module.exports = {
  getAllTalkers,
  getTalkersById,
  updateTalkers,
  searchTalker,
  writeTalkerFile,
};