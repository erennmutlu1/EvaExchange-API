module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      // Define your User model fields here
      // For example:
      username: { type: DataTypes.STRING, unique: true },
      email: { type: DataTypes.STRING, unique: true },
      password: DataTypes.STRING,
    });
  
    User.associate = (models) => {
      // Define associations with other models if needed
    };
  
    return User;
  };
  