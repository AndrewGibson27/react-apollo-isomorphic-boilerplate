import Category from './models/category';
import Product from './models/product';
import Cart from './models/cart';

const resolvers = {
  Query: {
    categories: () => (
      Category.find()
        .exec()
        .catch((err) => {
          throw new Error(err);
        })
    ),

    product: (root, args) => (
      Product.findOne({ _id: args.productId })
        .exec()
        .catch((err) => {
          throw new Error(err);
        })
    ),

    products: () => (
      Product.find()
        .exec()
        .catch((err) => {
          throw new Error(err);
        })
    ),

    productsByCategory: (root, args) => (
      Product.find()
        .populate({
          path: 'categories',
          match: { _id: { $eq: args.categoryId } },
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
          .populate('products')
          .exec()
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
      const { productId } = args;
      const { session, session: { cartId } } = context;

      if (session && cartId) {
        return Cart.findOne({ _id: cartId })
          .then((cart) => {
            if (cart) {
              cart.products.push(productId);
              cart.save();
              return Product.findOne({ _id: productId })
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

      return null;
    },
  },
};

export default resolvers;
