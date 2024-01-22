// controllers/userController.js
const userRepository = require('../repository/userRepository');

class UserController {
  async getAllUsers(req, res) {
    try {
      const users = await userRepository.getAllUsers();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getUserById(req, res) {
    const { userId } = req.params;
    try {
      const user = await userRepository.getUserById(userId);
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async createUser(req, res) {
    const { username, email } = req.body;
    try {
      const newUser = await userRepository.createUser({ username, email });
      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async updateUser(req, res) {
    const { userId } = req.params;
    const { username, email } = req.body;
    try {
      const user = await userRepository.updateUser(userId, { username, email });
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async deleteUser(req, res) {
    const { userId } = req.params;
    try {
      const deletedUser = await userRepository.deleteUser(userId);
      if (deletedUser) {
        res.json(deletedUser);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = UserController;
