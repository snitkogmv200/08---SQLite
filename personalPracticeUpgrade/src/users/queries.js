const getUsers = "SELECT * FROM users_up ORDER BY id ASC";
const getUserById = "SELECT * FROM users_up WHERE id = $1";
const createUser =
  "INSERT INTO users_up (name, date_of_birth, age) VALUES ($1, $2, $3) RETURNING *";
const removeAllUser = "TRUNCATE users_up";
const removeUser = "DELETE FROM users_up WHERE id = $1";
const updateUser =
  "UPDATE users_up SET name = $1, date_of_birth = $2, age = $3 WHERE id = $4";

module.exports = {
  getUsers,
  getUserById,
  createUser,
  removeAllUser,
  removeUser,
  updateUser,
};
