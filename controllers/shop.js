const Product = require("../models/product");
const Cart = require("../models/cart");

// This controller is for the  getting all items in Product Tab
exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => {
      console.log("err", err);
    });
};

// This controller is for single product in the Product Tab
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findByPk(prodId)
    .then((product) => {
      console.log(product);
      res.render("shop/product-detail", {
        product: product,
        pageTitle: product.title,
        path: "/products",
      });
    })
    .catch((error) => console.log(error));
};

// This. controller is for the showing all items under the Shop Tab
exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => {
      console.log("err", err);
    });
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then((cart) => {
      return cart
        .getProducts()
        .then((products) => {
          res.render("shop/cart", {
            path: "/cart",
            pageTitle: "Your Cart",
            products: products,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
// Below route responsible for adding new products to cart

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  console.log("exports.postCart -> prodId", prodId);
  let newQuantity = 1;
  let fetchedCart;
  req.user
    .getCart()
    .then((cart) => {
      // all cart stored in fetched Cart
      fetchedCart = cart;
      // this is added to check if the cart item already having the product
      // if not then we only add product otherwise increment value
      return cart.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }
      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(prodId);
    })
    .then((product) => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity },
      });
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId, (product) => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect("/cart");
  });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
