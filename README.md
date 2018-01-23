# React Apollo Isomorphic Boilerplate
Server-side rendering! Route-based code-splitting! GraphQL! It's all here.

## Tech
+ [Apollo + React](https://github.com/apollographql/react-apollo)
+ [Express Session Middleware](https://github.com/expressjs/session)
+ MongoDB + [Mongoose](https://github.com/Automattic/mongoose)
+ [React Router 4](https://github.com/ReactTraining/react-router)
+ [React Loadable](https://github.com/thejameskyle/react-loadable)

And, yeah, React.

## Set-up
+ You'll need MongoDB running on your machine, plus Node.js 6 or higher.
+ Create a file called `.env` in the project root and add `DB_HOST=<db-host>`.
+ `yarn` or `npm install` to install packages.

This boilerplate comes with an un-styled yet functional shopping-cart app to demonstrate how everything works.

## Commands
+ `yarn run client`: Build development bundle of client-side code.
+ `yarn run server`: Bundle the server-side code with Webpack.
+ `yarn start`: Start the Node server in development mode, including Webpack Hot Middleware.
+ `yarn run dev`: The above three commands, consecutively.
+ `yarn run clean`: Delete compiled assets.
+ `yarn run client:prod`: Build production bundle of client-side code.
+ `yarn run start:prod`: Start the Node server in production mode.
+ `yarn run prod`: The above three commands, plus `yarn run server`, consecutively.

## License
MIT.

## TODOs
+ Dockerize
+ Styles
+ Use `babel-env`
