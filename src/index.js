const express = require('express');
const talkerMng = require('./talkerMng');
const authentication = require('./auhtentication');
const generateToken = require('./generateToken');
const validationName = require('./validationName');
const validationAge = require('./validationAge');
const validationTalk = require('./validationTalk');
const validationRate = require('./validationRate');
const validationWatchedAt = require('./validationWatchedAt');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

app.get('/talker', async (req, res) => {
  const talkers = await talkerMng.getAllTalkers();
  res.status(200).json(talkers);
});

app.get('/talker/search', authentication, async (req, res) => {
  const { name } = req.query;
  const talker = await talkerMng.searchTalker(name);
  res.status(talker.length === 0 ? 404 : 200).json(talker);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await talkerMng.getTalkersById(Number(id));
  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(talker);
});

app.post('/talker',
authentication,
validationName,
validationAge,
validationTalk,
validationRate,
validationWatchedAt,
async (req, res) => {
  const talkers = await talkerMng.getAllTalkers();
  const newPerson = { id: talkers.length + 1, ...req.body };
talkers.push(newPerson);
// const newArray = [...talkers, newPerson];
await talkerMng.writeTalkerFile(talkers);
return res.status(201).json(newPerson);
});

/* app.put('/talker', authentication, validationName, validationAge, validationTalk, validationRate, validationWatchedAt, async (req, res) => {
  try {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const updatedTalkers = await talkerMng.updateTalkers({ id, name, age, talk }); 

  if (updatedTalkers) return res.status(200).json({ talker: updatedTalkers });
}
catch {
  res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
}
}); */

app.delete('/talker/:id',
authentication,
validationName,
validationAge,
validationTalk,
validationRate,
validationWatchedAt,
async (req, res) => {
  const talkers = await talkerMng.getAllTalkers();
  const id = Number(req.params.id);
  const talker = talkers.find((t) => t.id === id);
    const index = talkers.indexOf(talker);
    talkers.splice(index, 1);
  res.sendStatus(204);
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const emailRegex = /\S+@\S+\.\S+/;

  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  
  const token = generateToken();
  return res.status(200).json({ token });
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
