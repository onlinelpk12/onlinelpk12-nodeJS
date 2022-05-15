exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  exports.studentBoard = (req, res) => {
    res.status(200).send(true);
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send(true);
  };
  
  exports.teacherBoard = (req, res) => {
    res.status(200).send("Teacher Content.");
  };