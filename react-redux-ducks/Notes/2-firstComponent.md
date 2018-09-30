# React Basics - Your First Component

Now that we have our app boilerplate out of the way, it's time to get to the fun stuff. Let's set up our first component.

## 1. index.html

The first thing we need to do is create out `index.html` page in the root of our project. This will be a very basic page. For this project, I've linked to a bootstrap cdn for basic styling. The only other things to look out for is the `<div id="app"></div>` tag (this is where our app will be injected), and the `<script src="bundle.js"></script>` tag (which will run the javascript that powers our app).

Here's the full HTML:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
</head>
<body>
  <div id="app"></div>
  <script src="bundle.js"></script>
</body>
</html>
```
## 2. Folders & Files

Create a new folder called `src`. The majority of your app's code will live inside this folder from now on.

Within `src` create a `app.js` file. Within every React app there is one root component, and for us, this is it. All other components will be nested within this one.

## 3. Imports

First we need to import react into this file. To do this, we'll be using a little ES6. `import React from 'react';` The `import` functionality is an ES6 feature, but currently it's powered by Webpack (as opposed to the browser where it may be powered in the near future).

We also need to import ReactDOM. Because react is used not only to power web apps (with ReactDOM), but also native mobile apps (with React Native), the rendering process is handled by ReactDOM. This is where the vertual DOM is created and diff'd against the actual DOM.

To import ReactDOM, add `import ReactDOM from 'react-dom';` at the top of the file.

## 4. Our First Component

Now we need to create our first Component. To do this we create an ES6 class that extends `React.Component`. At this point you may be wondering what is enabling all of this ES6 to work. While a lot of it is actually available in your browser right now, we are using Babel to power stage-0 and up features as well as make all ES6 backwards compatable.

To create your first class:

```javascipt
class App extends React.Component {
  render(){ // Every react component has a render method.
    return( // Every render method returns jsx. Jsx looks like HTML, but it's actually javascript and functions a lot like xml, with self closing tags requiring the `/` within the tag in order to work propperly
      <div>
        Hello World
      </div>
    );
  }
}
```

Notice that "Hello World" is nested within `div`s. All jsx must be nested within parent `div`s or it wont work.

## 5. Rendering

Finally, we need to render this component to the DOM. To do this, we'll use the `ReactDOM.render` method.

At the bottom of your `App.js` file, add: `ReactDOM.render(<App />, document.getElementById('app'));`

The first parameter is our App, which is rendered as `<App />`. The second is the DOM element where we'll be injecting our app. In this case, a `div` tag with the id of "app".