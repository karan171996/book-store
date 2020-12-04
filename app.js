const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const sequelize = require("./util/database");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-Item");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user; //sequelize object
      next();
    })
    .catch((err) => console.log(err));
});
app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);
//One to Many
// onDelete means when user gets deleted then its product also deleted
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" }); // user created this product (Important) (Product is beleonging to user becuse , user created it)

User.hasMany(Product); //one user has many products

// One to One Relatin Ship
User.hasOne(Cart); // a user have one cart
Cart.belongsTo(User); // cart belongs to user (it is inverse of user has one cart) // it is optional , one direction is enought to

// Many to Many Relation Ship
Cart.belongsToMany(Product, { through: CartItem }); // one cart can hold multiple product
Product.belongsToMany(Cart, { through: CartItem }); // single product can be a part of different Products

sequelize
  // .sync({ force: true })
  .sync()
  .then((result) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "Karan", email: "test@test.com" });
    }
    return user;
  })
  .then((user) => {
    // console.log("user", user);
    user.createCart();
  })
  .then((cart) => {
    app.listen(3000);
  })
  .catch((error) => {
    console.log("error", error);
  });
