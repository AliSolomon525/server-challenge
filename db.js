const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "blue-server-challenges", //name of the database, no name? it can't connect
  "postgres", //type of database
  "pw", //password for your database
  {
    host: "localhost",
    dialect: "postgres",
  }
);

sequelize.authenticate().then(
  function () {
    console.log("Connected to blue-server-challenges postgres database!");
  },
  function (err) {
    console.log(err);
  }
);

module.exports = sequelize;

