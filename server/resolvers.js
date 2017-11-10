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

    createCart: () => {
      const cart = new Cart();

      return cart.save((err) => {
        if (err) {
          console.error(err1); // eslint-disable-line
        }
      });
    },
  },
};

export default resolvers;
