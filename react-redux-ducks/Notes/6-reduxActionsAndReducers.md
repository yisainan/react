# Redux Actions and Reducers

Setting up Redux takes some leg work, but once you get passed that, it's a very nice paradim to work with, especially when compaiered to flux, the data handling implementation that it came to replace.

Before we get started, let's quickly cover a few concepts. Types, Actions, Action Creators, and Reducers are the elements you'll be working with when building a Redux powered app.

## Ducks

First let's talk about how we are originizing our Redux code. We're going to use Ducks, which is a simple system that has a few requirement which are:

### Each Ducks file:
- MUST export default a function called reducer()
- MUST export its action creators as functions
- MUST have action types in the form npm-module-or-app/reducer/ACTION_TYPE
- MAY export its action types as UPPER_SNAKE_CASE, if an external reducer needs to listen for them, or if it is a published reusable library

We'll see these principles in action as we go.

## Types

Types are constants that are typically defined either in their own file or, when following the ducks methodology like we are, at the top of the file containing your reducer. They are `const`s, all uppercase, and my be exported if other reducers need to listen for them.

Types are listened for within the reducer switch whenever an action is fired off. The action is sent to the reducer with a type, and when that type matches the type within the a case of the switch, some sort of data manipulation is fired off.

Types look like this:

```javascript
const ADD_ITEM = 'ADD_ITEM';
const DELETE_ITEM = 'DELETE_ITEM';
```

## Actions

Actions are simple javascript objects that at least contain a type, and may also contain data that can be sent to the reducer. When the user clicks on something that has an effect on the state of an app, an action creator sends an action to the reducer where the data manipulation happens.

An action typically looks like this:

```javascript
{ type: ADD_ITEM, item: 'Adding this item' }
{ type: DELETE_ITEM, index: 1 }
{ type: POP_ITEM }
```

## Action Creators

Action creators are the functions that create actions and send them to the reducer. They usually return an action, sometimes can dispatch multiple actions (with the help of middleware like thunk), or can begin asyncronous events like API calls (with the help of the Promise middleware). In this tutorial, we'll keep them simple.

A simple action creature looks like this:

```javascript
function addItem(item){
  return {
    type: ADD_ITEM,
    item // this is new ES6 shorthand for when the key is the same as a variable or perameter within the scope of the object. It's the same as item: item
  }
}
```

## Reducers

The reducer is typically the only thing that touches the store. It only deals within a particular part of the store, inicialized as `initialState`. It's a pure switch statement that does not directly change the state because state is immutable. That means you cannot use a method like `.pop` or `.push` that manipulates the array it's called on. Luckily for us, we've been keeping our data immutiable this whole time :)  Finally, all reducers have a default case that just returns state.

Here's an example of a reducer:

```javascript
const initialState = {
  list: []
};

export default function reducer(state = initialState, action){
  switch (action.type){
  case ADD_ITEM:
    return Object.assign(
      {},
      state,
      { list: [...state.list, action.item]} // here we see object.assign again, and we're returning a new state built from the old state without directly manipulating it
    )
  default:
    return state;
  }
}
```

Ok, those are the concepts. Now time for the real work.

## 1. Initial state

The first thing we'll want to do is make sure our data is coming in fine. To do this, add something into the `initialState` within `src/redux/modules/toDoApp`. Here's what mine looks like:

```javascript
const initialState = {
  list: [{item: 'test', done: false}] // just added this to test that state is being passed down propperly,
  newToDo: ''
};

export default function reducer(state = initialState, action){
  switch (action.type){
  default:
    return state;
  }
}
```
Now, in `ToDoApp.js`, in the `render()` method, before the return, I added `console.log(this.props)` to see what I get. I got this in my browser console:

```javascript
toDoApp: Object
  list: Array[1]
    0: "test"
    length: 1
    __proto__: Array[0]
  __proto__: Object
__proto__: Object
```
Looks good to me.

So the test passed. Let's take that data and pass it to the view. For this, all we need to do is to go to the JSX within `ToDoApp` and replace the `listItems` prop in the `List` component, and the `value` prop in the `Input` component. Try to implement this change yourself before moving forward.

Did you get it? The `List` and `Input` components should look like this:

```javascript
<List
  onClick={this.onListItemClick}
  listItems={this.props.toDoApp.list}
  deleteListItem={this.deleteListItem}
/>
<Input
  value={this.props.toDoApp.newToDo}
  onChange={this.onInputChange}
  onSubmit={this.onInputSubmit}
/>
```

Now, if you look at your app, and see the test list item. If you type in the input box or click something, you should be seeing errors in your console. Nothing happens on submit or click though, so we're going to add some actions.

## 3. Input action

The process we're going to take now is migrate all the logic we have in our `ToDoApp` component into our `toDoApp` module.

In 'toDoApp.js' (lowercase t), we're going to create new type called `INPUT_CHANGED'. Then create and export a new function called 'onInputChange' that takes `value` as a parameter and returns an action with the type equal to `INPUT_CHANGED` and `value` equal to `value`. These new features should look like this:

```javascript
const INPUT_CHANGED = 'INPUT_CHANGED';

export function inputChange(newToDo){
  return {
    type: INPUT_CHANGED,
    newToDo
  }
}
```

Now we need to add the logic to add this input to the store within the reducer. Within the switch statement, add:

```javascript
case INPUT_CHANGED:
  return Object.assign(
    {},
    state,
    {input: action.value}
  )
```

Now, when the action creator is fired off, the action with the type of `INPUT_CHANGED` will be sent to the reducer, and state will be updated without being modified. Now we need to pass this functionality to the app.

In `toDoAppContainer.js` within the `mapDispatchToProps` function, we're going to add this new function. First import `onInputChange`, then in the return statement of `mapDispatchToProps` add: `onInputChange: (value) => dispatch(onInputChange(value))`.

The entire file should look like this:

```javascript
import { connect } from 'react-redux';
import ToDoApp from '../components/ToDoApp.js'
import {
  inputChange
} from '../redux/modules/toDoApp'; // we added this

function mapStateToProps(state) {
  return {
    toDoApp: state.toDoApp // gives our component access to state through props.toDoApp
  }
}

function mapDispatchToProps(dispatch) {
  return {
    inputChange: (value) => dispatch(inputChange(value)) // we added this
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToDoApp);
```
Now we should have acces to that in our `ToDoApp` component. An easy way to tell is to check in our browser console to see if it shows up in props. If so, you did it correctly. If not, check the source files of this project.

So, within the `onInputChange` method of `ToDoApp`, replace the line `this.setState({ newToDo: event.target.value});` to `this.props.inputChange(event.target.value);`. To test that this is coming through, go to the browser, find the input box and start typing. You should see some enchanced logs appearing. They'll say `prev state`, `action` and `next state`. This is the function of the Logger middleware, and it's very useful in development.

## 4. The other actions

All of the changes from here on will follow the same pattern as above. If you understand the pattern, try to retrofit the app on your own. If you get stumped, peek at the source code in this repo. Otherwise, let's get started with the next action.

Next we have `onInputSubmit`. Go to the redux file, `toDoApp.js` and start my making a type constant and an action creator. They should look like this:

```javascript

const INPUT_SUBMIT = 'INPUT_SUBMIT';

export function inputSubmit(){
  return {
    type: INPUT_SUBMIT
  };
}
```

Now we need to add a case for the type in our reducer that updates state. It should look like this:

```javascript
export default function reducer(state = initialState, action){
  switch (action.type){
  case INPUT_SUBMIT:
    return Object.assign(
      {},
      state,
      { list: [...state.list, {item: state.newToDo, done: false }],
      newToDo: ''}
    );
  case INPUT_CHANGED:
    return Object.assign(
      {},
      state,
      {newToDo: action.value}
    );
  default:
    return state;
  }
}
```

Now we need to add this action to our `toDoAppContainer`. Import it, then add it to the `mapDispatchToProps` function.

```javascript
import { connect } from 'react-redux';
import ToDoApp from '../components/ToDoApp.js'
import {
  inputChange,
  inputSubmit
} from '../redux/modules/toDoApp';

...

function mapDispatchToProps(dispatch) {
  return {
    onInputChange: (value) => dispatch(onInputChange(value)),
    inputSubmit: () => dispatch(inputSubmit())
  };
}
```

Cool. Now we have access to the in the `ToDoApp` component through props. Go there and remove the `setState` portion of the `onInputSubmit` method and call our new function. It should look like this:

```javascript
onInputSubmit = (event) => {
  event.preventDefault();
  this.props.inputSubmit();
};
```

Now repeat this process for the remaining actions. Let's do the remainder in bulk. We just have `onListItemClick` and `deleteListItem` remaining. In the redux file `toDoApp.js` add the remaining constants and action creators. They should look like this:

```javascript
const LIST_ITEM_CLICK = 'LIST_ITEM_CLICK';
const DELETE_LIST_ITEM = 'DELETE_LIST_ITEM';

export function listItemClick(index){
  return {
    type: {
      LIST_ITEM_CLICK,
      index
    }
  }
}

export function deleteListItem(index) {
  return {
    type: DELETE_LIST_ITEM,
    index
  }
}
```

Now we need to adjust the reducer to include these:

```javascript
case LIST_ITEM_CLICK:
  return Object.assign(
    {},
    state,
    {
      list: [
        ...state.list.slice(0, action.index),
        Object.assign({}, state.list[action.index], {done: !state.list[action.index].done}),
        ...state.list.slice(action.index+1)
      ]
    }
  );
case DELETE_LIST_ITEM:
  return Object.assign(
    {},
    state,
    {
      list: [
        ...state.list.slice(0, action.index),
        ...state.list.slice(action.index+1)
      ]
    }
  );
```
Then pass them through to `ToDoApp` using the `ToDoAppContainer`:

```javascript
function mapDispatchToProps(dispatch) {
  return {
    inputChange: (value) => dispatch(inputChange(value)),
    inputSubmit: () => dispatch(inputSubmit()),
    deleteListItem: (i) => dispatch(deleteListItem(i)),
    listItemClick: (i) => dispatch(listItemClick(i))
  }; // here we're mapping actions to props
}
```

Now, adjust the logic in `ToDoApp`:

```javascript
onInputChange = (event) => {
  this.props.inputChange(event.target.value);
};

onListItemClick = (i) => {
  this.props.listItemClick(i)
};
```

And finally, we can remove the `componentWillMount` method, because the state that it's setting is no longer being used.

## There you have it

You now should have a fully functional To Do App built with Redact, Webpack, Babel and Redux. There are still some more optimizations we can make if we wanted, still more functionality we could add. But what we have now is the first step for your next project. Keep these files with you to reference them when you need. Continue learning by starting with the suggested reading materials in the Readme. But most of all, never stop coding!
