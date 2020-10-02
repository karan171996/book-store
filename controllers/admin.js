const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null, title, imageUrl, description, price);
  product.save();
  res.redirect('/');
};

exports.getEditProducts = (req, res, next) => {
    const prodId = req.params.productId
    const editForm = req.query.edit;
    console.log('editForm', editForm)
    if(!editForm){
      return res.redirect('/')
    }
    Product.findById(prodId, products => {
      if(!products){
        return res.redirect('/')
      }
      res.render('admin/edit-product', {
        product: products,
        pageTitle: 'Edit Products',
        path: '/admin/edit-product',
        editing: editForm
      });
    })
};

exports.postEditproducts = (req,res,next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImage = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updateddescription = req.body.description;
  const updatedProduct = new Product(prodId, updatedTitle, updatedImage, updateddescription, updatedPrice)
  updatedProduct.save()
  res.redirect('/admin/products')
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};
