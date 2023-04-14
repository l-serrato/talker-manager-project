const express = require('express');
const talkerDB = require('../db/talkerDB');

const router = express.Router();

router.post('/', async (req, res) => {
  const person = req.body;
  try {
    const [result] = await talkerDB.insert(person);
    res.status(201).json({
      message: `Pessoa cadastrada com sucesso com o id ${result.insertId}` });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Ocorreu um erro ao cadastrar uma pessoa' });
  }
});

router.get('/', async (_req, res) => {
  /* try { */
    const [result] = await talkerDB.findAll();
    res.status(200).json([result]);
  /* } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.sqlMessage });
  } */
});

router.get('/:id', async (req, res) => {
  /* try { */
    const { id } = req.params;
    const [[result]] = await talkerDB.findById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
  /* } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.sqlMessage });
  } */
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const person = req.body;
    const [result] = await talkerDB.update(person, id);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: `Pessoa de id ${id} atualizada com sucesso` });
    } else {
      res.status(404).json({ message: 'Pessoa não encontrada' });
    }
  } catch (err) {
    res.status(500).json({ message: err.sqlMessage });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await talkerDB.remove(id);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: `Pessoa de id ${id} excluída com sucesso` });
    } else {
      res.status(404).json({ message: 'Pessoa não encontrada' });
    }
  } catch (err) {
    res.status(500).json({ message: err.sqlMessage });
  }
});

module.exports = router;