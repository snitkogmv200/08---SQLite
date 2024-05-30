let users = [];
let currentId = 1;

module.exports = {
  getUsers: () => users,

  getUser: (id) => users.find((u) => u.id === id),

  createUser: (user) => {
    user.id = currentId++;
    users.push(user);
  },

  changeUser: (id, updatedUser) => {
    const userId = users.findIndex((u) => u.id == parseInt(id));

    if (userId !== -1) {
      users[userId] = { ...users[userId], ...updatedUser };
      return users[userId];
    }

    return null;
  },

  deleteUser: (id) => {
    const userId = users.findIndex((u) => u.id == parseInt(id));

    if (userId !== -1) {
      return users.splice(userId, 1);
    }

    return null;
  },
};
