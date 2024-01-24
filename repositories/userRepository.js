const { User } = require('../models');

class UserRepository {
  async getAllUsers() {
    return User.findAll();
  }

  async getUserById(userId) {
    return User.findByPk(userId);
  }

  async createUser(userData) {
    return User.create(userData);
  }

  async updateUser(userId, updatedUserData) {
    await User.update(updatedUserData, {
      where: { id: userId },
    });
    return this.getUserById(userId);
  }

  async deleteUser(userId) {
    const user = await this.getUserById(userId);
    if (user) {
      await user.destroy();
    }
    return user;
  }
}

module.exports = new UserRepository();