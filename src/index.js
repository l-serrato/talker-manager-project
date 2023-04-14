const express = require('express');
const talkerMng = require('./talkerMng');
const authentication = require('./auhtentication');
const generateToken = require('./generateToken');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

app.get('/talker', authentication, async (req, res) => {
  const talkers = await talkerMng.getAllTalkers();
  res.status(200).json(talkers);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await talkerMng.getTalkersById(Number(id));
  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(talker);
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;

  if (!email) {
    res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!password) {
    res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
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
