# Setting up your React App - The most difficult part of any react app :)

## 1. NPM INIT

`npm init` to create your `package.json` file.

## 2. Install dependencies:
  - `npm install --save react` - Install React.
  - `npm install --save react-dom` Install React Dom, the package that handles the virtual DOM.
  - `npm install --save-dev webpack` - Install Webpack, our module bundler.
  - `npm install --save-dev webpack-dev-server` - A dev server that enables hot reloading.
  - `npm install --save-dev babel` - Install Babel, which will transpile our ES6 code into ES5.
    - install these other babel dependencies:
    - `npm install --save-dev babel-core` - The main features of babel.
    - `npm install --save-dev babel-polyfill` - Babel includes a polyfill that includes a custom regenerator runtime and core.js. This will emulate a full ES6 environment.
    - `npm install --save-dev babel-loader` - This package allows transpiling JavaScript files using Babel and webpack.
    - `npm install --save-dev babel-runtime` - A dependency of Babel transform runtime plugin.
    - `npm install --save-dev babel-plugin-transform-runtime` - Externalise references to helpers and builtins, automatically polyfilling your code without polluting globals.
    - `npm install --save-dev babel-preset-es2015` - Babel preset for all es2015 plugins.
    - `npm install --save-dev babel-preset-react` - Strip flow types and transform JSX into createElement calls.
    - `npm install --save-dev babel-preset-stage-0` - All you need to use stage 0 (and greater) plugins (experimental javascript).

## 3. Open `package.json` and add some scripts:
  ```
  "scripts": {
    "start": "webpack-dev-server --hot --inline --progress --colors",
    "build": "webpack --progress --colors"
  }
  ```

  Running `npm start` will start your dev server.
  Running `npm build` will build your app for production.

## 4. Setup Webpack
  Webpack is our bundler. It's an important peice of our dev environment, and alows us to use some awesome features like hot reloading. Our `webpack.config.js` file is below with comments. As your app grows, your config file may change.

  ```javascript
  var webpack = require('webpack');
  module.exports = {
      entry: [
        'babel-polyfill',
        'webpack/hot/only-dev-server',
        './src/app.js' // the entry point of our app. All react apps have one parent component. Yours should live here.
      ],
      output: {
          path: __dirname + '/build', // When we run 'npm build', our bundled .js file will be exported here.
          filename: "bundle.js" // Our exported file will be called 'bundle.js'
      },
      module: {
          loaders: [
              {
                test: /\.js$/, // all .js files will be subjected to these loaders
                exclude: /node_modules/, // no files within the node_modules folder will be processed
                loader: 'babel-loader', // all .js files will be ran through babel for transpiling
                query: {
                  plugins: ['transform-runtime'],
                  presets:['es2015', 'react', 'stage-0'] // we are using es2015, plus reacts jsx, plus some experimental javascript
                }
              },
              { test: /\.css$/, loader: "style!css" } // allows us to import css files in our javascript.
          ]
      }
  };

  ```
Your boiler plate is now done. Time to start writing some react code.
