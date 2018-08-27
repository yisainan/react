Now that we have something showing up in our view, it's time to add some functionality to our app. Because this is a to do app, we'll need to add a way for new items to be added to the list, a way to make off items as completed, and a way to delete any items we no longer want.

## 1. Functional Component

First we need to add an input element so the user can add a todo item. Let's do this by creating a new component. In the `components` folder, create `Input.js`, and within create and export a functional component called Input.

Remember that functional components return JSX and have access to the props argument. For now, we just need to return the form. Paste the following JSX into the return statement of your functional component:

```html
<form>
  <div
    className="form-group">
    <label
      htmlFor="listInput">
      Email address
    </label>
    <input
      type="text"
      className="form-control"
      id="listItemInput"
      placeholder="Add new todo"
    />
    <button
      className="btn btn-primary">
      Add Item
    </button>
  </div>
</form>
```

## 2. Input

Right now our JSX isn't doing anything special, just adding basic HTML to the view. Let's test it out to make sure everything is hunky dorey by importing the `Input` component into `ToDoApp.js` and instanciating it below the `List` component. It should look like this `<Input/>`.

Now's the time when I'll start keeping some of my instructions that we've already covered in past sections a little more vague. If you ever find yourself unable to figure things out, remember that you can reference the source code in this repo at any time.

Ok, let's check the view. Everything there? Good! Let's make it do stuff.

## 3. Props

The first thing we need to do is give ourselves access to the value of the input field. This value will need to be accessed in other components, so we don't want to handle the data storage within our `Input` component. In fact, I'll just reiterate that it's never a good idea to store data in a child component whenever possible. Most of the time, data should be stored at the top of your app and trickle down components through props.

Another thing to remember is that even though we are currently storing state in our `ToDoApp` component, eventually we'll be adding Redux to handle data for our entire app. We are simply working with local State to display the many things you can do in a React component.

Ok, now that we've got that out of the way, we're going to store the value of the input within the state of `ToDoApp` (later to be handled by Redux). To begin, within the `componentWillMount` method, add `newToDo: ''` within the `this.setState` call. It should look like this:

```javascript
  componentWillMount(){
    this.setState({
      list: ['thing1', 'thing2', 'thing3'],
      newToDo: 'test'
    })
  };
```

Now we need to pass that value through props. Find the `<Input/>` and add a new prop called value. Can you remember how to access a value from state? Pass it in. Look to the `listItems` prop on the `List` component for a hint.

## 4. Destructuring

In `Input.js` we now have access to the value prop, but we're going to be handling props in a slightly different way this time around. In this case we'll be adding a new ES6 feature called "destructuring" to make dealing with props just a little nicer.

Instead of adding the `props` argument to the `Input` component, we're going to add this `({ value })`. What this does is take the `props` argument, and breaks it down into variables we can have access to based on the key value pairs within the props object.

For example, this:

```
var props = {
  name: 'hector',
  age: 21
}


function log(props){
  console.log(props.name);
  console.log(props.age);
}

log(props);
```

is the same as this:

```
let props = {
  name: 'hector',
  age: 21
}

log = ({name, age}) => {
  console.log(name);
  console.log(age);
}

log(props);
```

So let's give our input access to the value. In the `input` within our JSX, add `value={value}`. Check the browser to confirm that this is indeed the value.

## 5. setState

You might have noticed that now that we've declared the value, we can't change it. That's because the value is being held in state and we haven't created a method to update state with our new value based on user input.

To do this, we'll need to add an `onChange` method to the same `input` we added value. Under value add 'onChange={onChange}', then where we destructure the props, add `onChange` so it looks like `({ onChange, value })`

Next, go within `ToDoApp.js`. Under `componentWillMount` add a new custom method called `onInputChange`. This will be a simple method that updates the state whenever the user adds or deletes something from the input. It'll take a single argument, `event` where it will capture the user input from. Within the method, add `this.setState({ newToDo: e.target.value });`

The method should look like this:

```javascript
onInputChange = (event) => {
  this.setState({ newToDo: event.target.value}); // updates state to new value when user changes the input value
};
```

Now, we just need to give our custom `Input` component access to this method through props. Within the JSX, add `onChange={this.onInputChange}`. That's everything we need to make the input editable, as well as give our app access to it's value at any time.

## 6. Adding items

Now time to add new items to our list. To do this, we're going to create another custom method within `ToDoApp` called `onInputSubmit`. This also contains an `event` arugment. Within the body of the method, we're going to `event.preventDefault()`, then use the `setState` method to push a new item to the list array. However, it's important to note that state should never be modified directly, otherwise React may not render the change, or state may be overridden unexpectedly.

To get around this, `this.setState` also can take a callback function with access to `previousState`. To take advantage of this, we could write this (but don't):

```javascript
this.state((previousState)=>({
  list: previousState.list.push(previousState.newToDo)
}))
```

Above you can see how we use the `previousState` to update existing state. This method will work fine, but when we move on to Redux, our data handling layer, the `push` method will no longer be a viable option. This is because Redux depends on state being immutable. That means we can never change state directly, and unfortunately, push modifies the array it's called upon.

To get around this, and to make our development easier when it comes to implementing Redux, ES6 has some handy new features we're going to use. In this case, we're going to use an array spread opperator. What this does is return a new array by itterating through the old array and leaving the old array in tact. Then we'll simply add our item into the end of an array literal. It'll look like this:

```javascript
this.setState((previousState)=>({
  list: [...previousState.list, previousState.newToDo ], // the spread opperator is called by using the ... preceding the array
}));
```

Now that we have that taken care of, there's one more step we need to take. When a new list item is submitted, we need to reset the `newToDo` value to ''. To do this, simply add `newToDo: ''` within the `setState` method. It'll look like this:

```javascript
this.setState((previousState)=>({
  list: [...previousState.list, previousState.newToDo ],
  newToDo: ''
}));
```

Now that the method is done, see if you can pass it to the `Input` component, and add it to the `onSubmit` method on the `form` tag within the JSX. If you can't figure it out, take a look at the source code.

## 7. Cross off items

It's time to add the ability to cross off list items. To do this, we'll need to change the way we store our listItems. Instead of storing an array of strings, we'll store an array of objects with an `item` key which will hold a string of the item name, and a `done` boolean.

Now that we've made this discovery, it's time to update our data accordingly. For now, go to the `componentWillMount` method, and remove the strings from the list key. They've served their purpose, we can work without them from now on. It should look like: `list: []`. Then go to `onInputSubmit` and change the `setState` method to account for the new change in data structure. It'll look like this:

```javascript
onInputSubmit = (event) => {
  event.preventDefault();
  this.setState((previousState)=>({
    list: [...previousState.list, {item: previousState.newToDo, done: false }], // notice the change here
    newToDo: ''
  }));
};
```

With that change in place, we need a method to change the `done` boolean in each list item without modifying existing state. Try to figure it out without looking at the snippet below. It'll look like:

```javascript
onListItemClick = (i) => { // takes the index of the element to be updated
  this.setState((previousState)=>({
    list: [
      ...previousState.list.slice(0, i), // slice returns a new array without modifying the existing array. Takes everything up to, but not including, the index passed in.
      Object.assign({}, previousState.list[i], {done: !previousState.list[i].done}), // Object.assign is a new ES6 feature that creates a new object based on the first param (in this case an empty object). Other objects can be passed in and will be added to the first object without being modified.
      ...previousState.list.slice(i+1) // takes everything after the index passed in and adds it to the array.
    ]
  }))
};
```

With this method ready to role, let's pass it down to the `List` component through a prop called `onClick`. We'll need to make some changes to how this component displays it's list to make this work. There is one gotcha here, we need to pass in the index of the element clicked, but we can't call the function here otherwise our app won't function properly. To get around this we'll use the `.bind()` method with the first parameter being `null` and the second being the index. I'll look like this:

```javascript
onClick={props.onClick.bind(null, i)}
```

First, add an `onClick` method to the JSX `span` wrapping `{el}` and pass in the `onClick` prop we've given `List`. Let's also change `{el}` to `{el.item}` while we're here, to handle the new data.

Next, we're going to give this `span` some style. Within a `style` attribute, we're going to check `el.done`, and if it's `true` return `{textDecoration: 'line-through', fontSize: '20px'}`, and if false return `{textDecoration: 'none', fontSize: '20px'}`. I like doing this with a turnery. It'll look like this:

```javascript
<span
  style={
    el.done
    ? {textDecoration: 'line-through', fontSize: '20px'}
    : {textDecoration: 'none', fontSize: '20px'}
  }
  onClick={props.onClick.bind(null, i)}
>
```

Now, when we click on the element, it'll be crossed out. Cool! Try adding some items and crossing them out in your browser.

## 8. Delete Items

Finally, we need to be able to delete list items. This will be a very similar action to crossing list items off. In fact, it'll be nearly identical once we've added a delete button. Try figuring it out, and if you can't, come back and follow along.

First we need a delete button. Add it after the list item like so:

```javascript
<button
  className="btn btn-danger pull-right"
  >
  x
</button>
```

Now we need to give it an onClick method. Let's create that method first within the `ToDoApp` component. This method will take the index and update state to contain all list items except the on deleted. It'll look like this:

```javascript
deleteListItem = (i) => {
  this.setState((previousState)=>({ // using previous state again
    list: [
      ...previousState.list.slice(0, i), // again with the slice method
      ...previousState.list.slice(i+1) // the only diffence here is we're leaving out the clicked element
    ]
  }))
};
```

Pass the `deleteListItem` method to list, then add it to the delete button. Remeber to use `.bind`. Check the source files if you're having troubling with this last step.

Now we have an app with some functionality. It's pretty nice, but this method of handling data won't scale to larger apps, so next we'll learn how to convert this app to use Redux!



