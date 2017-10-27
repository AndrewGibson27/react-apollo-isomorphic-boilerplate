import Category from './models/category';

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
  },
};

export default resolvers;
