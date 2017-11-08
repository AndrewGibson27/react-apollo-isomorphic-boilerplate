import React from 'react';
import { graphql } from 'react-apollo';
// import { Route, Switch } from 'react-router-dom';

// import { productsQuery } from '../queries';
import { addProductMutation } from '../mutations';

const Categories = ({ mutate }) => {
  return (
    <ul>
      <button
        onClick={() => {
          mutate({
            variables: {
              name: 'new product name',
              description: 'new product description',
              image: 'img',
              price: 2.5,
              categories: [
                '59f2a656f835611746a3527c',
                '59f2a66b952428174e8ae681',
              ],
            },
          })
          .then((data) => {
            console.log(data);
          });
        }}
      />
    </ul>
  );
};

/* const ProductsWithData = graphql(productsQuery, {
  options: { variables: { categoryId: '59f2a66b952428174e8ae681' } },
})(Categories); */

const CategoriesWithMutation = graphql(addProductMutation)(Categories);

export default CategoriesWithMutation;
