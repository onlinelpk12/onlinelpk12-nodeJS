module.exports = (sequelize, Sequelize) => {
    const Data = sequelize.define("assessment_data", {
      course_name: {
        type: Sequelize.STRING
      },
      lesson_name:{
        type: Sequelize.STRING
      },
      page_num:{
        type: Sequelize.STRING
      },
      header:{
        type: Sequelize.STRING
      },
      data:{
        type: Sequelize.STRING
      },
      questions:{
        type: Sequelize.STRING
      },
      answers:{
        type: Sequelize.STRING
      }
    },{
      freezeTableName: true
    
    });
    return Data;
  };