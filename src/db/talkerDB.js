const conn = require('./connections');

const insert = (person) => conn.execute(
    `INSERT INTO talkers 
      (name, age, talk_watched_at, talk_rate) VALUES (?, ?, ?, ?)`,
    [person.name, person.age, person.talk_watched_at, person.talk_rate],
  );

const findAll = () => conn.execute('SELECT * FROM talkers');

const findById = (id) => conn.execute('SELECT * FROM talkers WHERE id = ?', [id]);

const update = (person, id) => conn.execute(
  `UPDATE talkers 
    SET name = ?, age = ?, talk_watched_at = ?, talk_rate = ? WHERE id = ?`,
  [person.firstName, person.lastName, person.email, person.phone, id],
);

const remove = (id) => conn.execute('DELETE FROM talkers WHERE id = ?', [id]);

module.exports = {
  insert,
  findAll,
  findById,
  update,
  remove,
};