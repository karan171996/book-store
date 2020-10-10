const Sequelize = require("sequelize").Sequelize;
const sequelize = new Sequelize("node-complete", "root", "karan@171996", {
  dialect: "mysql",
  host: "localhost",
});
module.exports = sequelize;
