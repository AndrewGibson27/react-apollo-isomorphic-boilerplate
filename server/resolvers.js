import mongoose from 'mongoose';

import Category from './models/category';
import Product from './models/product';
import Cart from './models/cart';

const resolvers = {
  Query: {
    categories: () => (
      Category.find()
        .catch((err) => {
          throw new Error(err);
        })
    ),

    product: (root, { productId }) => (
      Product.findOne({ _id: productId })
        .then((product) => {
          if (!product) {
            throw new Error(`Product ${productId} does not exist`);
          }
          return product;
        })
        .catch((err) => {
          throw new Error(err);
        })
    ),

    products: () => (
      Product.find()
        .catch((err) => {
          throw new Error(err);
        })
    ),

    productsByCategory: (root, { categoryId }) => (
      Product.find()
        .populate({
          path: 'categories',
          match: { _id: { $eq: categoryId } },
        })
        .exec()
        .then(products => (
          products.filter(product => product.categories.length > 0)
        ))
        .catch((err) => {
          throw new Error(err);
        })
    ),

    cart: (root, args, context) => {
      const { session, session: { cartId } } = context;

      if (session && cartId) {
        return Cart.findOne({ _id: cartId })
          .then((cart) => {
            if (cart) {
              return cart;
            }
            throw new Error(`Cart ${cartId} does not exist`);
          })
          .catch((err) => {
            throw new Error(err);
          });
      }

      return null;
    },
  },

  Mutation: {
    addProduct: (root, args) => {
      const newProduct = new Product(args);

      return newProduct.save()
        .then((savedProduct) => {
          const { categories: prodCategoryIds } = args;
          const { _id: prodId } = savedProduct;

          if (prodCategoryIds) {
            Category.find({ _id: { $in: prodCategoryIds } })
              .then((categories) => {
                categories.forEach((category) => {
                  category.products.push(prodId);
                  category.save();
                });
              })
              .catch((err) => {
                throw new Error(err);
              });
          }

          return savedProduct;
        })
        .catch((err) => {
          throw new Error(err);
        });
    },

    addCategory: (root, args) => {
      const newCategory = new Category(args);

      return newCategory.save()
        .then((savedCategory) => {
          const { products: categoryProdIds } = args;
          const { _id: categoryId } = savedCategory;

          if (categoryProdIds) {
            Category.find({ _id: { $in: categoryProdIds } })
              .then((products) => {
                products.forEach((product) => {
                  product.products.push(categoryId);
                  product.save();
                });
              })
              .catch((err) => {
                throw new Error(err);
              });
          }

          return newCategory;
        })
        .catch((err) => {
          throw new Error(err);
        });
    },

    createCart: (root, args, context) => {
      const { session } = context;
      const cart = new Cart();

      return cart.save()
        .then((savedCart) => {
          session.cartId = savedCart._id; // eslint-disable-line no-underscore-dangle
          return savedCart;
        })
        .catch((err) => {
          throw new Error(err);
        });
    },

    addProductToCart: (root, args, context) => {
      const { productId, quantity } = args;
      const { session, session: { cartId } } = context;

      if (session && cartId) {
        return Cart.findOne({ _id: cartId })
          .then((cart) => {
            if (cart) {
              return Product.findOne({ _id: productId })
                .then((product) => {
                  if (product) {
                    const productInCart = {
                      _id: mongoose.Types.ObjectId(),
                      name: product.name,
                      quantity,
                    };
                    cart.products.push(productInCart);
                    cart.save();
                    return productInCart;
                  }
                  throw new Error(`Product ${productId} does not exist`);
                })
                .catch((err) => {
                  throw new Error(err);
                });
            }
            throw new Error(`Cart ${cartId} does not exist`);
          })
          .catch((err) => {
            throw new Error(err);
          });
      }

      throw new Error('There is no cart ID in this session');
    },
  },
};

export default resolvers;
