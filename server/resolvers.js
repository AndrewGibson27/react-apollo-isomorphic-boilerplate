import Category from './models/category';
import Product from './models/product';
import Cart from './models/cart';

const resolvers = {
  Query: {
    categories: () => (
      Category.find((err, categories) => {
        if (err) {
          return console.error(err); // eslint-disable-line
        }
        return categories;
      })
    ),

    product: (root, args) => (
      Product.findOne({ _id: args.productId }, (err, product) => {
        if (err) {
          return console.error(err); // eslint-disable-line
        }
        return product;
      })
    ),

    products: (root, args) => {
      const { categoryId } = args;

      if (categoryId) {
        return Product.find()
          .populate({
            path: 'categories',
            match: { _id: { $eq: args.categoryId } },
          })
          .exec()
          .then(products => (
            products.filter(product => product.categories.length > 0)
          ));
      }

      return Product.find().populate({ path: 'categories' }).exec();
    },

    productsInCart: (root, args) => (
      Cart.findOne({ _id: args.cartId })
        .populate('products')
        .exec()
        .then(cart => cart.products)
    ),
  },

  Mutation: {
    addProduct: (root, args) => {
      const newProduct = new Product(args);

      return newProduct.save((err1, savedProduct) => {
        if (err1) {
          console.error(err1); // eslint-disable-line
        } else {
          const { categories: prodCategoryIds } = args;
          const { _id: prodId } = savedProduct;

          if (prodCategoryIds) {
            Category.find({ _id: { $in: prodCategoryIds } }, (err2, categories) => {
              if (err2) {
                console.error(err2); // eslint-disable-line
              } else {
                categories.forEach((category) => {
                  category.products.push(prodId);
                  category.save();
                });
              }
            });
          }
        }
      });
    },

    addCategory: (root, args) => {
      const newCategory = new Category(args);

      return newCategory.save((err1, savedCategory) => {
        if (err1) {
          console.error(err1); // eslint-disable-line
        } else {
          const { products: categoryProdIds } = args;
          const { _id: categoryId } = savedCategory;

          if (categoryProdIds) {
            Product.find({ _id: { $in: categoryProdIds } }, (err2, products) => {
              if (err2) {
                console.error(err2); // eslint-disable-line
              } else {
                products.forEach((product) => {
                  product.products.push(categoryId);
                  product.save();
                });
              }
            });
          }
        }
      });
    },

    createCart: () => {
      const cart = new Cart();

      return cart.save((err) => {
        if (err) {
          console.error(err); // eslint-disable-line
        }
      });
    },

    addProductToCart: (root, args) => {
      const { productId, cartId } = args;

      Cart.findOne({ _id: cartId }, (err, cart) => {
        cart.products.push(productId);
        cart.save();
      });

      return Product.findOne({ _id: productId }, (err) => {
        if (err) {
          console.error(err); // eslint-disable-line
        }
      });
    },
  },
};

export default resolvers;
