import Category from './models/category';
import Product from './models/product';

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
            select: ['_id', 'name'],
            match: { _id: { $eq: args.categoryId } },
          })
          .exec()
          .then(products => (
            products.filter(product => product.categories.length > 0)
          ));
      }

      return Product.find()
        .populate({
          path: 'categories',
          select: ['_id', 'name'],
        }).exec();
    },
  },
};

export default resolvers;
