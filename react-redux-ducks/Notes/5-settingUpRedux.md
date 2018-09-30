So far we've learned how to setup our app with Webpack and Babel, how to create class based and functional components, handling state within a component, and adding functionality. While this alone is sufficent to power a small app like ours, as our app grows, we'll quickly find that handling data and actions in this way is insufficient. That's where Redux comes in.

So how does Redux handle data differently? First, Redux gives your app a single state object for your entire app. This is in contrast to other data handling methods like Flux which often will contain multiple states based on the view. So how does Redux deal with a complex app where a single state object may get too complex? It breaks data handling into seperate reducer functions, action creators, and actions that work together to make data handling streamlined.

To learn more about Redux, look at the readme at the root of this project where you'll find many informative articles that delve in depth on the subject, including some that compair redux with flux.

Ok, let's get started.

## 1. First we'll need to install some new packages.

First, let's install `redux` and `react-redux` (which has some bindings for pairing redux with react).

```
npm install --save redux
npm install --save react-redux
```

Next, we're going to install a piece of redux middleware called `redux-logger` which will help us while we develop.

```
npm install --save redux-logger
```

When you begin working on your own apps, you might find other middleware useful as well, including `redux-thunk` and `redux-promise`, but for the sake of this project, we're going to be sticking to the logger middleware only.

## 2. Setup

Now we need to setup our app to handle Redux. There's a little boilerplating involved that you just need to do every time you fit an app with redux, so we're going to keep it simple this time.

The first thing we need to do is configure our redux store. Create a new file in the within `/src/` called `redux`. Within this folder, create a new file called `configureStore.js`.

Open our new file, and add the following imports:

```javascript
import { createStore, applyMiddleware, combineReducers } from 'redux';
import createLogger from 'redux-logger';
```

`createStore` is the function provided by redux to initialize our store, while `applyMiddleware` is an entry point for us to add any middleware we'd like to apply.

`combineReducers` is used as your app grows to combine multiple reducers into a single entity.

`createLogger` is a middleware that enhances our console to give us a detailed look of how data is being handled over time with each action. It's super cool.


Under these imports, add the following code:

```javascript
const loggerMiddleware = createLogger(); // initialize logger

const createStoreWithMiddleware = applyMiddleware( loggerMiddleware)(createStore); // apply logger to redux
```

We're not done here, but we'll need to create another file before we can progress.

## 3. Modules

Within `src/redux/` create another folder called `modules`. Within here we'll store all our reducers, action creators, and constants needed to make redux work. We're going to be using an orginizational structure called ducks where we store related constants, reducers, and action creators in a single file, rather than having multiple files for each. I find this makes our code much easier to work with, though there are conflicting points of view here.

Within the `modules` folder, create 'toDoApp.js'. I like to name my ducks files after the parent component they are most closely associated with. Notice that the filename begins with a lowercase.

Now were going to create our initial state and our reducer function. This is actually very simple as state is just a JavaScript object and the reducer is just a JavaScript switch statement. It should look like this:

```javascript
const initialState = {}; //The initial state of this reducer (will be combined with the states of other reducers as your app grows)

export default function reducer(state = initialState, action){ // a function that has two parameters, state (which is initialized as our initialState obj), and action, which we'll cover soon.
  switch (action.type){
  default:
    return state;
  }
}
```

## 4. Configure Store

Now that we have our first reducer, it's time to add it to our `configureStore.js` file. Go back to that file and add this import statement `import toDoApp from './modules/toDoApp';`

Now we're going to use the combineReducers function to combine our current reducer with any future reducers that may come along as our app grows. At the bottom of the file, add:

```javascript
const reducer = combineReducers({
  toDoApp
});
```

Finally, add the following line of code to bring it all together:

```javascript
const configureStore = (initialState) => createStoreWithMiddleware(reducer, initialState);
export default configureStore;
```

Cool. We're done here.

## 5. Connect

Now that we have a reducer, we need a way to give our app access to it. This will take two more steps, and then we can get to the good stuff.

We've talked before about class components and functional components. These are sometimes also known as smart components and dumb components. We'll we're going to add one more kind of component into the mix called a container. This is simply a wrapper for a React component that give the component it wraps access to actions (the functions that make a Redux app work), and state.

To create our first container, first we'll need to create another new folder within `/src/` called `containers`. Within `containers`, create a new file called `toDoAppContainer.js`.

At the top of this new file, we're going to import the `connect` function from `react-redux` which ties together the container to the component, as well as the component. It should look like:

```javascript
import { connect } from 'react-redux';
import ToDoApp from '../components/ToDoApp.js'
```

`connect` is a function that is called twice, first with two callbacks: `mapStateToProps` and `mapDispatchToProps`. The second time it's called, it we pass in the component we're mapping state and dispatch to.

We already know what state is, but dispatch is new. When we want something to happen in Redux, we call a dispatch function and give it an action which in turn sends our reducer a constant that tells it how to manipulate state. This will become more clear as we press forward. Currently we don't have any actions to dispatch, so we'll only be using the first for a short while, but we'll write both functions anyway.

```javascript
function mapStateToProps(state) {
  return {
    toDoApp: state.toDoApp // gives our component access to state through props.toDoApp
  }
}

function mapDispatchToProps(dispatch) {
  return {}; // here we'll soon be mapping actions to props
}
```

Now all we need to do is export and call the connect function:

```javascript
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToDoApp);
```

6. Provider

We're nearly done with setting up Redux. For the final step in getting all of this revved, we need to go back to the `app.js` file.

First, we need to import a few things. We no longer need our `ToDoApp` component, because that is now going to be replaced by our `ToDoAppContainer`. We also need to import our `configureStore` function, as well as a final helper Component from `react-redux` called `Provider`. So add these to the top of the `app.js` file:

```javascript
import { Provider } from 'react-redux';
import ToDoAppContainer from './containers/ToDoAppContainer';
import configureStore from './redux/configureStore';
```

`configureStore` is the function we created that takes our combined reducers and our redux middleware and mashes them all together. Let's intialize that with the following line:

```javascript
const store = configureStore();
```

Now, within the JSX of the `App` component, we have two more changes. Change the `ToDoApp` component to the new `ToDoAppContainer` component. Then, we'll wrap it with the `Provider` component provided to us by `react-redux`. This component passes down the state of our entire app to the containers nested within it, giving those containers access to the state.

Our JSX should now look like this:

```javascript
<Provider store={store}> // we pass the store through to Provider with props
  <ToDoAppContainer />
</Provider>
```

Now go back to the browser. Everything should be functioning as it was before. If not, then something went wronge. Take a look at the source files within this branch to make sure you have everything correct, then move on to the next branch to start moving our logic over to the Redux layer.

