const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, price, imageUrl, description);
  product
    .save()
    .then((result) => {
      console.log("exports.postAddProduct -> result", result);
      res.redirect("/admin/products");
    })
    .catch((error) => console.log("exports.postAddProduct -> error", error));
};

// exports.getEditProduct = (req, res, next) => {
//   const editMode = req.query.edit;
//   if (!editMode) {
//     return res.redirect("/");
//   }
//   const prodId = req.params.productId;
//   req.user
//     .getProducts({ where: { id: prodId } }) // same thing line 18
//     // Product.findByPk(prodId)
//     .then((products) => {
//       const product = products[0];
//       if (!product) {
//         return res.redirect("/");
//       }
//       res.render("admin/edit-product", {
//         pageTitle: "Edit Product",
//         path: "/admin/edit-product",
//         editing: editMode,
//         product: product,
//       });
//     })
//     .catch((error) => console.log("error", error));
// };

// exports.postEditProduct = (req, res, next) => {
//   const prodId = req.body.productId;
//   const updatedTitle = req.body.title;
//   const updatedPrice = req.body.price;
//   const updatedImageUrl = req.body.imageUrl;
//   const updatedDesc = req.body.description;
//   Product.findByPk(prodId)
//     .then((product) => {
//       product.title = updatedTitle;
//       product.imageUrl = updatedImageUrl;
//       product.description = updatedDesc;
//       product.price = updatedPrice;
//       return product.save(); // For update the item database (CURD) it's U
//     })
//     .then((result) => {
//       console.log("UPDATED product");
//       res.redirect("/admin/products");
//     })
//     .catch((error) => console.log("error", error));
// };

// exports.getProducts = (req, res, next) => {
//   req.user
//     .getProducts() // same thing line 18
//     // Product.findAll()
//     .then((products) => {
//       res.render("admin/products", {
//         prods: products,
//         pageTitle: "Admin Products",
//         path: "/admin/products",
//       });
//     })
//     .catch((error) => console.log("err", error));
// };

// exports.postDeleteProduct = (req, res, next) => {
//   const prodId = req.body.productId;
//   Product.findByPk(prodId)
//     .then((product) => {
//       return product.destroy(); //It will delete the item (CURD) its D
//     })
//     .then((result) => {
//       console.log("PRODUCT deleted successfully");
//       res.redirect("/admin/products");
//     })
//     .catch((error) => console.log("error", error));
// };
