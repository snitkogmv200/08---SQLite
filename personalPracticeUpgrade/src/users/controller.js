const pool = require("./../../db");
const queries = require("./queries");

const getUsers = (req, res) => {
  pool.query(queries.getUsers, (err, results) => {
    if (err) throw err;
    res.status(200).json(results.rows);
  });
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(queries.getUserById, [id], (err, results) => {
    if (err) throw err;
    res.status(200).json(results.rows);
  });
};

const createUser = (req, res) => {
  const { name, date_of_birth, age } = req.body;

  pool.query(queries.createUser, [name, date_of_birth, age], (err, results) => {
    if (err) throw err;
    res.status(201).send(`Пользователь с ID: ${results.rows[0].id} создан`);
  });
};

const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, date_of_birth, age } = req.body;

  pool.query(queries.getUserById, [id], (err, results) => {
    const noUserFound = !results.rows.length;

    if (noUserFound) {
      res.send("Пользователь в базе данных не найден");
    }

    pool.query(
      queries.updateUser,
      [name, date_of_birth, age, id],
      (err, results) => {
        if (err) throw err;
        res.status(201).send(`Пользователь отредактирован`);
      }
    );
  });
};

const removeAllUser = (req, res) => {
  pool.query(queries.removeAllUser, (err, results) => {
    if (err) throw err;
    res.status(200).json({ message: "Данные таблицы удалены" });
  });
};

const removeUser = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(queries.getUserById, [id], (err, results) => {
    const noUserFound = !results.rows.length;

    if (noUserFound) {
      res.send("Пользователь в базе данных не найден");
    }

    pool.query(queries.removeUser, [id], (err, results) => {
      if (err) throw err;

      res.status(200).send(`Пользователь удалён`);
    });
  });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  removeAllUser,
  removeUser,
  updateUser,
};
