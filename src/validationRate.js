module.exports = (req, res, next) => {
  const { rate } = req.body.talk;
  const valid = Number.isInteger(rate) && rate >= 1 && rate <= 5;
  
if (rate === undefined) {
  return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
}
if (!valid) {
  return res.status(400).json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
}

next();
};