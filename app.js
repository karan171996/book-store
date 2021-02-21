const path = require("path");
const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");

dotenv.config();
const app = express();
const mongoConnect = require("./util/database").mongoConnect;
const User = require("./models/user");

app.set("view engine", "ejs");
app.set("views", "views");

const shopRoutes = require("./routes/shop");
const adminRoutes = require("./routes/admin");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("60315092edce93da49e1ac6e")
    .then((user) => {
      req.user = new User(user.name, user.email, user.cart, user._id); //sequelize object
      next();
    })
    .catch((err) => console.log(err));
});
app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);
mongoConnect(() => {
  app.listen(3000);
});
