module.exports = (sequelize, Sequelize) => {
    const Data = sequelize.define("slide_data", {
      course_name: {
        type: Sequelize.STRING
      },
      lesson_name:{
        type: Sequelize.STRING
      },
      pdf:{
        type: Sequelize.STRING
      }
    },{
      freezeTableName: true
    
    });
    return Data;
  };