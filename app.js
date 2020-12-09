const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");

const app = express();
const monogoConnect = require("./util/database");

app.set("view engine", "ejs");
app.set("views", "views");

// const adminRoutes = require("./routes/admin");
// const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  // User.findByPk(1)
  //   .then((user) => {
  //     req.user = user; //sequelize object
  //     next();
  //   })
  //   .catch((err) => console.log(err));
});
// app.use("/admin", adminRoutes);
// app.use(shopRoutes);

app.use(errorController.get404);
monogoConnect((client) => {
  console.log(client);
  app.listen(3000);
});
