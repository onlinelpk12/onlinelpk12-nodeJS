module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      first_name: {
        type: Sequelize.STRING
      },
      last_name:{
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      
      email_id: {
        type: Sequelize.STRING
      },
      user_type: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      }
    },{
      freezeTableName: true
    
    });
    return User;
  };