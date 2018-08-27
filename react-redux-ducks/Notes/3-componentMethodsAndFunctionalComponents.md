Ok, now we have our root component in the `app.js` file. It doesn't do much on it's own, so we're going to start making this app do stuff.

The app we're making is a to do app. We'll be building an app with an input field that takes in to do items and adds them to a list. Once the item is clicked, we'll cross the item off the list. When a delete button is cliced, the item will be removed. Through this process, you'll learn all the basic building blocks of a fully funcitonal React app.

But before we do all of this, we need to start with some smaller componets. A component is the building block of a react app. There are two types of components, class based components and functional componets. In this stage, we'll make both a class component and a functional component, use lifecycle methods, work with state, and pass props.

## 1. Components Folder

Start by creating a `components` folder within `src`. So your file structure should look like `~/src/components`.

## 2. ToDoApp.js

Inside `components`, we're going to create the file `ToDoApp.js`. As with all react components, we'll start by importing react with `import React from 'react';`

## 3. Test Component

This will be a class component. As we saw before, all class components have a render method which returns jsx. This one will be no different.

Your ToDoApp class should look like this:

```javascript
class ToDoApp extends React.Component {
  render() {
    return (
      <div>To Do App</div>
    );
  }
}
```

## 4. Export Component

In order to import this component into our app, first we'll need to export it. At the bottom of the file add `export default ToDoApp;`

## 5. Import Component

In `app.js`, at the top of the file, add `import ToDoApp from '.components/ToDoApp';` Then replace the text `Hello World` with our new component. We can now render our `ToDoApp` component by adding it to our JSX where our Hello World text was. To do this, add `<ToDoApp />` You'll notice that this is a self closing tag.

## 6. Smart Component

In your browser, you should now see the words "To Do App" has replaced "Hello World"! Nice, you've now nested your first child component inside of your apps Root component. This is the general pattern you'll use when building any React app. So, now let's make this app smart.

Back in `ToDoApp` we're going to start making our first list. First, let's make it look half decent with a little bootstrap. Copy the following JSX into the `return` statment of the `render` method, replacing all of the current jsx:

```html
<div className="row">
  <div className="col-md-10 col-md-offset-1">
    <div className="panel panel-default">
      <div className="panel-body">
        <h1>My To Do App</h1>
        <hr/>
        List goes here.
      </div>
    </div>
  </div>
</div>
```

Now if you look at your browser, the text should read "My To Do App" followed by "List Goes Here" within a bootstrap panel. So where are we going to store the data that populates our list? The answer is `state`. Every class based component has `state` which can be accessed anywhere in your component with `this.state` and can be update with `this.setState({ key: "value" })`. While we try not to use component state unless it's absolutely necessary, for the sake of this example, and for the immediate future, we will be using state only in this component until we setup redux.

Inside `ToDoApp` we also have access to lifecycle methods, one of which is `componentWillMount`. This method is run once when the page loads and before the render method is called, so if you need to access data from a server or API, this is a good place to do that. In our case, we're going to start with a dummy list.

Inside `ToDoApp`, before the `render` method, add:

```javascript
  componentWillMount(){ // run before the render method
    this.setState({ // add an array of strings to state.
      list: ['thing1', 'thing2', 'thing3']
    })
  };
```

And now we have access to a dummy list. It's important to note that React depends on state, as well as props (which we'll cover soon). Only when state or props change will the react app refresh. This means if data changes somewhere else, and is used in the view, the view won't update to display the change. Only when state or props change.

## 7. A List

Now we need to add our list to the view. Instead of simply adding the JSX into our `render` method, we'll be creating a functional component to handle the list. Once again, we'll be following the pattern of nesting components within components. Functional components are new to React, and it is considered a best practice to use them whenever possible. However, it's important to note that functional components dont have lifecycle methods or state. They are simply a function that returns jsx and contain props as an argument.

We've talked about props a bit now. Props are the name of data that is passed down from a parent component into a child component. This is typically the way data is passed through a react app. Keeping the data near the top of the app, and letting that data trickle down through components keeps your app running proficiantly. Poor handling of data and props can slow your app down, but if you follow the practices within this course you're app will run very fast.

To create our functional component, first create a new file in `components` called `List.js`. Start by importing react, then we'll create a function that returns JSX. Our function will be a `const` because it wont be manipulated over time. It'll take one argument called `props`.

Your function should look like this:

```javascript
const List = (props) => { // we're using an arrow function and const variable type, a ES6 features

  return (
    <div>
      I'm a list!!!
    </div>
  )
};

export default List;
```

## 8. Dynamic List

Inside `ToDoApp.js`, import List. Then replace the words `List goes here.` with the `List` component. It will look just like a class component in our JSX: `<List />`. Now in the browser you should see the words "I'm a list!!!"

Now, to make our list, we need to give `List` some data, which we'll pass through props. We'll call this prop "listItems" which will read from state. We do this by adding what will look very similar to an HTML attribute to our JSX `List` component call. It will look like this: `<List listItems={this.state.list} />` Now `List` has access to the data which is containe in `ToDoApp` through props!

To access this data, in the `List` component we'll need to render the list. Replace the JSX within the `return` statement with the following code:

```javascript
<div>
  <ul>
    {
      list // this is a variable we'll define next
    }
  </ul>
</div>
```

Notice the curly braces. Within these sections, javascript can execute and what is returned will be added to the view. In this case, the result of a yet to be defined list variable will be added to the view. So let's define that variable:

```javascript
const list = props.listItems.map((el, i)=>(
  // All where doing here is getting the items listItems prop
  // (which is stored in the state of the parent component)
  // which is an array, and we're running the .map method
  // which returns a new array of list items. The key attribute is
  // required, and must be unique.
  <li key={i}><span>{el}</span></li>
));
```

The entire component should look like:

```javascript
import React from 'react';

const List = (props) => {

  const list = props.listItems.map((el, i)=>(
    <li key={i}><span>{el}</span></li>
  ));

  return (
    <div>
      <ul>
        {
          list
        }
      </ul>
    </div>
  )
};

export default List;
```
Now if we look at the browser, we should see a list of items! Next we'll need to add some functionality to our app.
