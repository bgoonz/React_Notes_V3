DAY-5<br>*React Context* {ignore=true}
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=2 orderedList=false} -->
________________________________________________________________________________
________________________________________________________________________________

# React Context Learning Objectives

You've been using a component's state and props to manage the information
rendered in your React applications. However, applications generally use global
state to share the same information across multiple components. After reading
and practicing how to use React Context, you should be able to manage
application-wide data by:

* Use Context to share and manage global information within a React application
* Create a wrapper component with `Context.Provider` to set a component's
  default context
* Create a wrapper component with `Context.Consumer` to share the global context
  through render props
* Create and pass a method through Context to update the global state from a
  nested component

________________________________________________________________________________
# React Context

At this point, you know how to manage a component's state and pass information
down an application's component tree by threading props from parent components
to child components. Think of how tedious it could be to pass down information,
like current user data or a UI theme, to every component in an application.
Instead of threading the information as props from a parent component to its
children and grandchildren, you can share information with any of your
application's components by using React Context!

[React Context] gives you a way to pass data through the component tree without
having to manually thread props. Context gives developers a convenient way to
share and update "global" data across a React application. Now it's time to dive
into application-wide data management!

When you finish this article, you should be able to:

* Use React Context to pass down global information
* Create a Provider wrapper component to set a default context
* Create a Consumer wrapper component to allow child components to subscribe to
  a global context
* Use the `static contextType` property to access the global context
* Update the global context from a nested component

> In a future lesson, you'll learn about Redux, a common approach for managing
> global state in React applications. The React Context can be thought of as a
> lightweight alternative to using Redux.

## Using Context

In this demo, you'll create a simple React app that uses Context to allow users
to choose what images/images/images/images/puppy picture to render.

Begin by cloning this starter React app with a folder of `pups` photos!

```sh
git clone https://github.com/appacademy-starters/react-context-pups-starter.git
```

Now let's import the pup photos into your `App.js` file and render the `speedy`
pup:

```js
// App.js
import React from 'react';
import speedy from './pups/speedy-pup.jpg'
import banana from './pups/banana-pup.jpg'
import sleepy from './pups/sleepy-pup.jpg'

const App = () => (
  <div id="app">
    <img src={speedy} alt="pup" />
  </div>
);

export default App;
```

Start your application is you'll see a huge and super happy pup that's running!
Take a moment to update your `index.css` file so that your pup photo isn't so
large:

```css
/* index.css */
body {
  padding: 50px;
}

#app {
  display: flex;
  flex-direction: column;
  width: 500px;
}

img {
  width: 500px;
}
```

Being able to render a pup photo is great, but what about giving your users the
chance to select a pup photo to render? Let's allow your users to select a pup
photo through a form by passing information through Context!

### Creating a Context

You can use the [React.createContext] method to create a `PupContext`. In order
to create a context, you can simply import the `createContext()` function from
`react`, invoke the function to create a Context object, and export the Context!

```js
// PupContext.js
import { createContext } from 'react';

const PupContext = createContext();

export default PupContext;
```

Note that if you invoke the `createContext` method with arguments, those
arguments will be set as the default context. In the next step, you'll set up a
component's state to use as the default context.

### Adding a Provider to the App component

The _Provider_ component expects `value` prop to set the context information
passed throughout your application. You need to wrap your child components with
provider component tags to give them access to the context. The context `value`
will include information to pass to child components by using context _Consumer_
components. As a reminder, Consumer components must always be nested under
Provider components because the Provider must render first (parent components
always render before children components).

```jsx
<MyContext.Provider value={/* some value */}>
  <ChildComponent />
</MyContext.Provider>
```

Now you'll use [Context.Provider] to create a wrapper component to set the
`value` of your `PupContext`! Let's go into your `App.js` file to create an
`AppWithContext` wrapper component that will pass a `puppyType` prop to
determine what image your `App` component renders.

Your wrapper component should set up a default `puppyType` state in its
constructor. Choose one of your imported pup photos (`banana`, `sleepy`, or
`speedy`) to set as the default state.

```js
this.state = {
  puppyType: speedy,
};
```

Note that you should set the `puppyType` as `speedy` instead of `"speedy"`
(without quotations), or else you'd be setting a string to be the default state,
instead of a default pup photo to be rendered.

Now let's visit the `AppWithContext` component's `render()` method! You'll want
to render the `App` component wrapped with `<PupContext.Provider>` tags to give
`App` and all of its children components access to the `PupContext`:

```js
render() {
  return (
    <PupContext.Provider value={}>
      <App />
    </PupContext.Provider>
  );
}
```

Remember that provider components expect to receive a `value` prop. The `value`
prop will hold the context information that will be passed throughout the
application. Set the provider component's `value` prop to be the `state` of your
`AppWithContext` component. As you know, a component re-renders when its state
is updated. This is how you'll update an application's context from nested
components. Your `AppWithContext` component's `render()` method should look
something like this:

```js
render() {
  return (
    <PupContext.Provider value={this.state}>
      <App />
    </PupContext.Provider>
  );
}
```

Since you are rendering the pup image from `App`, you can pass in the wrapper
component's `puppyType` state as a prop:

```jsx
<App puppyType={this.state.puppyType} />
```

Now you can refactor your `App` component to use its `puppyType` prop to render
a specific pup photo!

```js
const App = ({ puppyType }) => (
  <div id="app">
    <PupForm />
    <img src={puppyType} alt="pup" />
  </div>
);
```

Don't forget to update the `export` statement at the bottom of your `App.js`
file. You'll want to export the `AppWithContext` component instead of the `App`
component. Don't worry about changing the `App` import statement in your
`index.js` file. Since you are using `export default`, only the component
explicitly specified in your file's export statement will be exported from the
file. At this point, your full `App.js` file should look something like this:

```js
// App.js
import React from 'react';
import PupContext from './PupContext';
import banana from './pups/banana-pup.jpg'
import sleepy from './pups/sleepy-pup.jpg'
import speedy from './pups/speedy-pup.jpg'

const App = ({ puppyType }) => (
  <div id="app">
    <img src={puppyType} alt="pup" />
  </div>
);

class AppWithContext extends React.Component {
  constructor() {
    super();
    this.state = {
      puppyType: speedy,
    };
  }

  render() {
    return (
      <PupContext.Provider value={this.state}>
        <App puppyType={this.state.puppyType} />
      </PupContext.Provider>
    );
  }
}

export default AppWithContext;
```

Now start your server and make sure that your cute pup photo is rendering!

### Adding a Consumer to a nested component

Before setting up a consumer, let's create a nested child component that will
consume your `PupContext`! Create a `PupForm` component that will be be rendered
as a child of your `App` component. Begin by rendering a dropdown menu for users
to choose which pup photo to render in the app. Feel free to use the `PupForm`
component defined below:

```js
// PupForm.js
import React from 'react';
import banana from './pups/banana-pup.jpg';
import sleepy from './pups/sleepy-pup.jpg';
import speedy from './pups/speedy-pup.jpg';

class PupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPup: 'select', // Set the default select option
    };
  }

  // Update state with the user's dropdown selection
  updateSelection = (e) => {
    this.setState({ selectedPup: e.target.value });
  }

  render() {
    return (
      <form>
        <select
          name="pup"
          onChange={this.updateSelection}
          value={this.state.selectedPup}>

          <option value="select">Select a pup!</option>
          <option value={speedy}>Speedy Pup</option>
          <option value={banana}>Banana Pup</option>
          <option value={sleepy}>Sleepy Pup</option>
        </select>
        <button onClick={/* TODO: Set up the click handler */}>
          Submit
        </button>
      </form>
    );
  }
}
```

As you can see, the `PupForm` has a default `selectedPup` state that will set
the default select option to be "Select a pup!". There is also an
`updateSelection` method that listens for change events in the dropdown menu to
update the `selectedPup` slice of state. Now that you have a basic dropdown menu
set up, it's time to create a consumer wrapper so that the `PupForm` component
can have access to the `PupContext`!

You'll want to use a [Context.Consumer] component to wrap your `PupForm`
component, this way the wrapped component can subscribe to context changes. Note
that the `Context.Consumer` component expects a function as a child:

```jsx
<MyContext.Consumer>
  {(value) => <Component value={value} />}
</MyContext.Consumer>
```

The function has access to the `value` prop passed into the `Context.Provider`.
The `value` prop can then be passed as a render prop into the wrapped component.

Import your `PupContext` into your `PupForm.js` file and use the
`Context.Consumer` component to create a wrapper for your `PupForm` component
like so:

```js
const PupFormWithContext = () => {
  return (
    <PupContext.Consumer>
      {(value) => <PupForm value={value} />}
    </PupContext.Consumer>
  );
};
```

Just as you did with your `AppWithContext` component, you'll want to export the
`PupFormWithContext` wrapper component in your `PupForm.js` file.

```js
export default PupFormWithContext;
```

Now update your `App` component to render the `PupFormWithContext` component:

```js
const App = ({ puppyType }) => (
  <div id="app">
    <PupFormWithContext />
    <img src={puppyType} alt="pup" />
  </div>
);
```

Take a moment to create a `handleClick` function for your submit button's
`onClick` listener. For now, simply prevent the default re-render of the
submitted form and console log your component's props so that you can examine
the `value` prop passed into the `PupForm` component:

```js
handleClick = (e) => {
  e.preventDefault();
  console.log(this.props);
}
```

Open up your developer tools and click the submit button! You should see the
context `value` prop logged in your console:

```sh
{value: {...}}
```

If you expand the prop, you'll then see the `puppyType`, which is the default
context set by your `AppWithContext` component's state!

Note that you can also use the `static contextType` property to access context
value in class components. Take a moment to set the `contextType` property to
your `PupContext` in the `PupForm` class component:

```js
// Rest of file not shown
class PupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPup: 'select',
    };
  }

  static contextType = PupContext;
// Rest of file not shown
```

Now update your `handleClick` method to console log `this.context` instead of
`this.props`:

```js
handleClick = (e) => {
  e.preventDefault();
  console.log(this.context);
}
```

Click the submit button to fire your `handleClick` method and you should see the
context `value` object logged in your console:

```sh
{puppyType: "/static/media/speedy-pup.d706601f.jpg"}
```

Note that the `static contextType` property only works for class components.
Because of this, you'll focus on using `Context.Consumer` components to manually
pass render props.

## Updating the Context from a nested component

Now you can access the context value, but what about updating the context value?
It's a common need to update the global context from a child consumer component.
For example, if your Context is providing the UI theme or language, you might
have a child component that consumes the context and allows a user to select
their preferred theme or language.

Once a user makes a selection, your application will need a way to update the
context value. From the context update fired from the child component, your
application will re-render all of the nested components that depend on that
data.

Let's define an `updateContext` method in your `AppWithContext` component! This
method will take care of updating the `puppyType` slice of state:

```js
updateContext = (puppyType) => {
  this.setState({ puppyType });
}
```

You'll then set a reference to the method in the state so that a nested
component (with access to context) can invoke the `updateContext` method to
update the `AppWithContext` state (and therefore the global context)!

```js
this.state = {
  puppyType: speedy,
  updateContext: this.updateContext,
};
```

At this point, your complete `AppWithContext` component should look something
like this:

```js
class AppWithContext extends React.Component {
  constructor() {
    super();
    this.state = {
      puppyType: speedy,
      updateContext: this.updateContext,
    };
  }

  updateContext = (puppyType) => {
    this.setState({ puppyType });
  }

  render() {
    return (
      <PupContext.Provider value={this.state}>
        <App puppyType={this.state.puppyType} />
      </PupContext.Provider>
    );
  }
}
```

Since your `value` prop is taking in the component's `state`, this means that
your `updateContext` method is also available to any components with access to
context. Let's revisit the `PupFormWithContext` component! Update the wrapper
component to pass the `updateContext` method as a render prop to the `PupForm`:

```js
const PupFormWithContext = () => {
  return (
    <PupContext.Consumer>
      {(value) => <PupForm updateContext={value.updateContext} />}
    </PupContext.Consumer>
  );
};
```

Now if you update your `handleClick` method to console log both `this.props` and
`this.context`, you'll see the `updateContext` method you just created and
passed down!

```js
handleClick = (e) => {
  e.preventDefault();
  console.log(this.props);
  console.log(this.context);
}
```

This means that you can invoke either `this.props.value.updateContext` or
`this.context.updateContext` to update the global context. Take a moment to
refactor your `handleClick` method to invoke the `updateContext` method by
passing in the `selectedPup` from the `PupForm` state:

```js
handleClick = (e) => {
  e.preventDefault();
  this.props.value.updateContext(this.state.selectedPup);
}
```

Now you should be able to use the dropdown menu to select a pup photo to render!
Congratulations, you now know how to use React Context to share and update
global information across your application!

## What you learned

In this article, you learned how to:

* Create a Context to share global information with an application; and
* Use the `Context.Provider` to create a wrapper and set the default context;
  and
* Use the `Context.Consumer` to create a wrapper that shares the global context
  through render props; and
* Access the global context through the `contextType` property; and
* Pass a method to a nested component to update the global context.

[React Context]: https://reactjs.org/docs/context.html

[React.createContext]: https://reactjs.org/docs/context.html#reactcreatecontext

[Context.Provider]: https://reactjs.org/docs/context.html#contextprovider

[Context.Consumer]: https://reactjs.org/docs/context.html#contextconsumer

________________________________________________________________________________
# React Context To-do List Project

Today you'll be building a to-do list application with React and local storage.
Instead of threading props from a parent to its children and grandchildren,
you'll use Context to share information with any of your application's
components!

As a reminder, Context gives you a convenient way to pass data through the
component tree without having to manually thread props. This project will also
give you a better understanding of how to share and update "global" data across
a React application.

In this project, you will:

* Create and use a `TodoContext` to share global information
* Create an `AppWithContext` wrapper component that uses `Provider` to set the
  default value of `TodoContext` in your application
* Create a `TodoFormWithContext` wrapper component that uses `Consumer` to allow
  child components to subscribe to the application's global `TodoContext`
* Use the `static contextType` property to access the global `TodoContext` in a
  class component
* Update the global value of the `TodoContext` from a nested component
* Use a `debugger` to investigate the context value from nested component

## Phase 1: Set up your project

Begin by using the `create-react-app` package to create a React application:

```sh
npx create-react-app context-to-do-list --template @appacademy/simple
```

Next, set up your application file structure based on the file tree below. To
begin, you'll want two subdirectories within `src`: `components` and `contexts`.

```
├── package-lock.json
├── package.json
├── public
│   └── index.html
└── src
    ├── App.js
    ├── AppWithContext.js
    ├── components
    │   ├── Task.js
    │   ├── TodoForm.js
    │   └── TodoList.js
    ├── contexts
    │   └── TodoContext.js
    └── index.js
```

Within your `components` directory, you'll want a `Task` component:

```js
// ./src/components/Task.js

import React from 'react';

const Task = () => {
  const handleClick = () => {
    // TODO: Delete task
  }
  
  return (
    <li>
      <h1>Hi, I'm a task in your to-do list!</h1>
      <button onClick={handleClick}>Delete Task</button>
    </li>
  );
}

export default Task;
```

You'll also want a `TodoList` component:

```js
// ./src/components/TodoList.js

import React from 'react';
// import Task from './Task';
// TODO: Import context

class TodoList extends React.Component {
  // TODO: Access context

  render() {
    return (
      <ul>
        {/* TODO: Render a `Task` component for each of the `tasks` stored in context */}
      </ul>
    );
  }
} 

export default TodoList;
```

You'll also want a `TodoForm` component:

```js
// ./src/components/TodoForm.js

import React from 'react';
// TODO: Import TodoContext

class TodoForm extends React.Component {
  constructor(props) {
    super(props);
    // TODO: Set default `inputValue` state
  }

  handleInputChange = (e) => {
    // TODO: Update `inputValue` state
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Create a task based on the `inputValue`
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Add a todo"
          value={/* TODO: Set the `inputValue` state as the input's value */}
          onChange={this.handleInputChange}
        />
      </form>
    );
  }
}

const TodoFormWithContext = () => (
  // TODO: Use a Consumer component to wrap the TodoForm
  // TODO: Pass the `createTask` method stored in the context value as a prop to TodoForm
);

export default TodoFormWithContext;
```

Now you'll update your `App` component to render the `TodoForm` and `TodoList`
components, along with a "To-do List" header.

```js
// ./src/App.js

import React from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

const App = () => (
  <div>
    <h1>To-do List</h1>
    <TodoForm />
    <TodoList />
  </div>
);

export default App;
```

### Create a context

Let's get started on creating the `TodoContext` that will store your to-do list
application's global information! Within your `contexts` directory, you'll set
up the `TodoContext.js` file. Create and export a `TodoContext` by using the
`createContext()` method, like so:

```js
// ./src/contexts/TodoContext.js

import { createContext } from 'react';

const TodoContext = createContext();

export default TodoContext;
```

Now that you have a `TodoContext` set up, you can work on providing the context
value from a parent `TodoContext.Provider` component. In the next phase, you'll
create an `AppWithContext` to wrap your `App` component with a parent
`TodoContext.Provider` component. This will provide the context `value` to the
`App` component and any of its child or grandchildren components.

## Phase 2: Provider wrapper component

Create a `AppWithContext` wrapper component. This wrapper component will take
care of _providing_ the context value. Start off with this code skeleton of the
`AppWithContext` component:

```js
// ./src/AppWithContext.js

import React from 'react';
// TODO: Import TodoContext
// TODO: Import App

class AppWithContext extends React.Component {
  constructor() {
    super();
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    // TODO: Set up default state (tasks, createTask, deleteTask)
  }

  createTask = (task) => {
    // TODO: Use the built-in Date `getTime` method to generate the `nextTaskId` for the `newTask`
    // TODO: Generate a `newTask` object, structured with proper "state shape"
    // TODO: Update the `tasks` state
    // TODO: Invoke the `updateLocalStorageTasks` method
  }
  
  deleteTask = (id) => {
    // TODO: Delete the task based on the task `id`
    // TODO: Update the `tasks` state
    // TODO: Invoke the `updateLocalStorageTasks` method
  }

  updateLocalStorageTasks = () => {
    console.log(this.state.tasks);
    const jsonTasks = JSON.stringify(this.state.tasks);
    localStorage.setItem('tasks', jsonTasks);
  }
  
  render() {
    return (
      // TODO: Use a Provider component to wrap the App component
      // TODO: Use the AppWithContext state as the Provider component's `value`
    );
  }
}

export default AppWithContext;
```

Begin by importing the `TodoContext` and `App` component. Next, you'll want to
set up a default state with `tasks`, `createTask`, `deleteTask`.

### Set default state

Set the value of the `tasks` state to the `storedTasks`, _or_ an empty object
(`{}`) if `storedTasks` is null. Notice how `storedTasks` is simply accessing
the local storage item with a name of `tasks`, and parsing the JSON string back
to JavaScript.

```js
const storedTasks = JSON.parse(localStorage.getItem('tasks'));
```

For the `createTask` state and `deleteTask` state, you'll want to set the state
values to their prospective methods, like so:

```js
createTask: this.createTask,
deleteTask: this.deleteTask,
```

### Create a task

Now you'll define the `createTask` method. Use the built-in Date `getTime`
method to generate the `nextTaskId` for the `newTask`. You'll also want to
generate a `newTask` object. You can use square brackets around the `nextTaskId`
to use the generated integer as a key:

```js
const newTask = {
  [nextTaskId]: {
    id: nextTaskId,
    message: task,
  },
};
```

As you might remember, the `tasks` state is set to the `storedTasks`, _or_ an
empty object (`{}`) as default. You might be wondering why you are using an
object instead of an array. You are being prepared to work with [normalized
state shape]! The `byId` slice of state in the Redux documentation's example
illustrates the state format you will be building today. Similarly to how each
post has its ID as a key, each task will have its ID as a key, as well as `id`
and `message` properties.

```js
byId : {
  "post1" : {
    id : "post1",
    author : "user1",
    body : "......",
    comments : ["comment1", "comment2"]
  },
  "post2" : {
    id : "post2",
    author : "user2",
    body : "......",
    comments : ["comment3", "comment4", "comment5"]
  }
},
```

In the future, you'll be working with Redux and will manage much more data. Feel
free to view the [nested state shape with an array] and read more about how
using normalized state shape is an improvement. The documentation explains how
"compared to the original nested format, this is an improvement in several
ways."

After generating a `newTask` object, you'll want to update the `tasks` state
with the new object and then update the tasks stored in local storage. First,
let's take a closer look at the `updateLocalStorageTasks` method. You'll see
that it takes care of logging the tasks to your DevTools console, converting the
JavaScript `tasks` object into a JSON string, and then storing the tasks in
local storage, under the name `tasks`.

```js
updateLocalStorageTasks = () => {
  console.log(this.state.tasks);
  const jsonTasks = JSON.stringify(this.state.tasks);
  localStorage.setItem('tasks', jsonTasks);
}
```

You can spread the `tasks` slice of state and the attributes of the `newTask` to
generate a collection of updated tasks. When a state update depends on a
previous state value, you need to [pass a function] into the `setState` method
to reliably get the previous state value. Since your `createTask` method relies
on the previous state to produce the next state, the method's `setState`
invocation will look something like this:

```js
this.setState((state, props) => ({
  tasks: { ...state.tasks, ...newTask },
}));
```

After the `tasks` slice of state has been updated, you'll want to update the
tasks stored in local storage by invoking the `updateLocalStorageTasks` method.
The `setState()` method takes an optional callback as its second parameter so
that you can have asynchronous behavior with `setState()`. Note that you can't
`await` on a `setState()` method since it doesn't return a promise!

Invoke `setState` with a callback that invokes the `updateLocalStorageTasks`
method, so that the method is invoked after the state is set:

```js
this.setState((state, props) => ({
  tasks: { ...state.tasks, ...newTask },
}), () => this.updateLocalStorageTasks());
```

### Delete a task

Delete a task based on the task's `id`. Since your `tasks` state is structured
as an object, you can use the [delete operator] to delete a specific task.
Although you can delete a specific tasks directly from the `tasks` slice of
state, it's best practice not to do so.

It's best practice to maintain immutable state, meaning that you should not
directly delete a task from the `tasks` slice of state with the delete operator.
You can maintain immutable state by making a copy of the `tasks` slice of state
with spread syntax, and then using the delete operator to delete a specific task
within the `setState` method.

```js
this.setState((state, props) => {
  const tasksWithDeletion = { ...state.tasks };
  delete tasksWithDeletion[id];
  return {
    tasks: tasksWithDeletion,
  };
}));
```

> **Reminder:** when a state update depends on a previous state value, you need
> to pass a function into the `setState` method to reliably access the previous
> state.

Just like how you used an optional callback to invoke the
`updateLocalStorageTasks` method asynchronously within the `createTask` method,
you'll do the same for task deletion.

### Use a provider component

Now it's time to provide context to your application. Use a `Provider` component
(`<TodoContext.Provider>`) to wrap the `App` component in the `render` method.
You'll use the `AppWithContext` state as the Provider component's `value`.

As a reminder, rendering the `Provider` component and nesting the `App`
component as a child within the `Provider` component will provide the context
`value` (global state of the application) to your application. The `App`
component and any of its child or grandchildren components will then be able to
access any information stored within the context `value`. Since your `App`
component renders the rest of your application's components, the context value
will be provided to any of its child components as well - even if they were not
directly rendered as a child component of `<TodoContext.Provider>`!

Lastly, take a moment to update your `index.js` to render your new
`AppWithContext` component instead of the `App` component. This will not result
in any breaking changes, as you have simply replaced the `App` component with
another component that wraps and renders it.

## Phase 3: Consumer wrapper component

It's time to set up a consumer wrapper component to allow the `TodoForm`
component to _consume_ the `TodoContext`. Begin by importing `TodoContext` into
the file and updating the return of the `TodoFormWithContext`. Within the
`TodoFormWithContext`, you use a `Consumer` component (`<TodoContext.Consumer>`)
to wrap the `TodoForm` and pass render props.

Pass the `createTask` method stored in the context `value` as a prop to the
`TodoForm`. Since you set the `AppWithContext` state as the `value` in the
`<TodoContext.Provider>`, you can access anything stored in the `AppWithContext`
state through the `value` prop referenced within the `<TodoContext.Consumer>`:

```js
<TodoContext.Consumer>
  {value => /* TODO: Pass the `createTask` method as a prop to TodoForm */ }
</TodoContext.Consumer>
```

Now that you have the consumer wrapper component set up, it's time to work on
the `TodoForm` component. Set the default `inputValue` state to an empty string
and update `inputValue` state within the `handleInputChange` method. You'll also
want to set the `inputValue` state as the form input's value so that the input
is a [controlled component].

On form submission, you'll want to create a task based on the `inputValue` by
invoking the `createTask` prop passed from the context consumer. As a reminder,
the `createTask` method updates the `tasks` stored in the `AppWithContext`
state. This means that whenever the `createTask` method is invoked, the global
`tasks` state will update and any components that subscribe to the context (via
a `Consumer` component or `static contextType`) will have access to the updated
tasks.

Before moving onto the next phase, use a `debugger` to investigate what actions
happen when you submit the `TodoForm`. Set two `debugger` statements: one in the
`handleSubmit` method defined in `TodoForm` and another in the `createTask`
method defined in `AppWithContext`. With these two debugger statements, you can
trace whether invoking `this.props.createTask` really invokes the `createTask`
method in the `AppWithContext` component.

![debugger-createTask][debugger-createTask]

## Phase 4: Access context through contextType

Now you'll access context by using the `static contextType` property instead of
setting up a consumer wrapper component. Uncomment the import statement for
`Task` and import the `TodoContext` into your `TodoList.js` file. Set the
`TodoList` component's `static contextType` property to the `TodoContext`. By
setting the `contextType` property, the `TodoList` component gains access to the
context value via `this.context`. As a reminder, you can use a `debugger`
statement to investigate `this.context` to view everything stored as the context
value before moving forward.

![debugger-context][debugger-context]

Access the `tasks` and `deleteTask` method stored within the context value. Map
over each of the `tasks` and render a `Task` component for each task. Since your
tasks are currently formatted as an object, you'll need to convert the object to
an iterable array before mapping over them. You can use the [Object.values]
method to access an array containing the object's property values.

You'll want to set a task ID `key` for each of the tasks, as well as pass the
task as a prop for each `Task` component rendered. In order to keep the `Task`
component as a function component, you'll pass the `deleteTask` method from
context as a prop into each rendered `Task` as well. As a reminder, the `static
contextType` property can only be used in class components.

Now have the `Task` component take in the props. Then update the click handler
to invoke the `deleteTask` prop with the task's ID. You'll also want to replace
the "Hi, I'm a task in your to-do list!" message with the task's message.

Congratulations! You have just built a to-do list application with React
Context! You used a context provider to set a global context value, used a
context consumer to pass render props into a consuming component, and used the
`static contextType` property to give a class component access to the context
value. In the next Context project, you'll work on using Context to store a
user's login session information.

[normalized state shape]: https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape/#designing-a-normalized-state
[nested state shape with an array]: https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape/#normalizing-state-shape
[pass a function]: https://reactjs.org/docs/state-and-lifecycle.html#state-updates-may-be-asynchronous
[delete operator]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete
[Context.Consumer documentation]: https://reactjs.org/docs/context.html#contextconsumer
[controlled component]: https://reactjs.org/docs/forms.html#controlled-components
[Object.values]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values
[debugger-context]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Modular-Curriculum/content/react-redux/topics/react-context/assets/debugger-context.gif
[debugger-createTask]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/Modular-Curriculum/content/react-redux/topics/react-context/assets/debugger-createTask.gif

________________________________________________________________________________
# React Twitter Lite Project

A few weeks ago, you set up an Express API for tweets and created a client-side
application to render Pug views. Today you'll build a client-side application
with React to render a single-page application that interacts with your backend
Tweets API!

In this project, you’ll build a frontend client to render React components.
You'll use React Context to keep track of a user's login state to protect tweet
resources from unauthenticated users. You'll also use React Router to create
your application's routes and navigation bar.

When you have finished today's project, your application should have the
following features:

1. A frontend user registration
2. A `UserContext` to keep track of the current user
3. A protected and authenticated routes
4. A frontend user log-in
5. A home page with protected tweet resources
6. A user profile page

## Phase 1: Set up your project

Begin by cloning the tweets API you built with Express a few weeks ago:

```sh
git clone https://github.com/appacademy-starters/react-twitter-revisited-starter.git
```

Now go into your backend directory and install all of the application's
packages:

```sh
npm install
```

Now take a moment to create a database and database user by opening `psql` and
running the following SQL statements:

```sql
create database twitter_lite;
create user twitter_lite_app with password '«a strong password for the user»';
grant all privileges on database twitter_lite to twitter_lite_app;
```

Now you'll need to by set your environment variables. Remember you can refer to
the `.env.example` file to remember what environment variables to set. After you
have set up your database and environment variables, migrate and seed your
database:

```sh
npx dotenv sequelize db:migrate
npx dotenv sequelize db:seed:all
```

Take a moment to start your backend server and verify that everything is working
by navigating to `http://localhost:8080` and ensuring that you see your API's
`index root` response. Now you are ready to create a React frontend for your
backend tweets API!

Change out of your backend directory. Now use the command below to generate a
simple React template. You should be generating a sibling `twitter-front-end`
directory to your `twitter-back-end` directory.

```sh
npx create-react-app twitter-front-end --template @appacademy/simple
```

Since you'll be make fetch requests from your frontend client to your backend
API, you'll want to set up a proxy to make your frontend client act like it is
being served on a different server. The idea is to follow the same pattern that
you used in Express.

Here are the docs for setting up [`create-react-app` proxying in development].

To set up the proxy, you need to add the following line to the `package.json`
in your `twitter-front-end` project.

```json
{
  "proxy": "http://localhost:8080"
}
```

This will set up the frontend client's development environment to act like it
is served on `http://localhost:8080` (your backend Express server's port is 
`8080`) instead of `http://localhost:3000` (`create-react-app`'s default 
frontend server port is `3000`).

You can append url paths to your proxy URL whenever you need to make a request
to help clean up your code! For example:

```js
// With proxy
const res = await fetch(`/tweets`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
});

// Without proxy
const res = await fetch(`http://localhost:8080/tweets`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
});
```

Your backend server is already set up to accept all requests from 
`http://localhost:3000` using `cors`:

```js
// in twitter-back-end/app.js
app.use(cors({ origin: "http://localhost:3000" }));
```

Before moving onto the second phase, start your frontend server and make sure
that your backend server is still up and running!

## Phase 2: User registration form

Now it's time to create the user registration form! Begin by creating a
`components` directory to hold all your components in your frontend
application's `src` directory. Then create a `session` directory within your
`components` directory. This folder will hold your registration form component
and login form component. These extra directories are just to help organize your
components. They're not necessary. But, as the number of components that you has
grows, it helps to have them organized like this.

Create a `RegistrationForm.js` file to render a user sign-up form. You'll be
setting up a default state for your component's input fields, so make
`RegistrationForm` a class component:

```js
// ./twitter-front-end/src/components/session/RegistrationForm.js

import React from 'react';

class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    // TODO: Set up default state
    this.state = {};
  }

  render() {
    // TODO: Render registration form
    return (
      <form>
      </form>
    );
  }
}

export default RegistrationForm;
```

Take a moment to update your `App.js` file so that it renders your
`RegistrationForm` with a "Twitter Lite" title:

```js
import React from 'react';
import RegistrationForm from './components/session/RegistrationForm';

const App = () => (
  <div>
    <h1>Twitter Lite</h1>
    <RegistrationForm />
  </div>
);

export default App;
```

As you might remember from creating your initial frontend client for your tweets
application, you used scripts with event listeners to handle sign up requests.

Instead of using scripts to handle your sign up requests, you'll define an
`onChange` event handler method to set your component's `state` to the value of
user input fields. Then you'll create a `registerUser` method that will house
the logic to use your `state` and make a POST request to create a user with the
Fetch API.

Begin by setting your `RegistrationForm` component's default `username`,
`email`, and `password` state to empty strings. Now let's move forward to
rendering the form!

### Rendering the form

Return a `<form>` element within your `render()` method. Within the form, render
an `<h2>` with the content "Register", three input fields, and a submit button.
You'll want to create a `text` type field for your user to input a username. Set
the `name` of this field to be "username" and the `placeholder` to be "Enter
Username". You'll also want to set the `value` of this field to be your
component's `username` state.

If you try to type in your "username" field right now, you'll notice that you
are unable to. This is because you are setting the value of the field to be
`this.state.username`, which will always be an empty string unless you update
that slice of state. Note that you can have your render method destructure the
state into all the variables you need before you return the JSX:

```js
render() {
  const { username, email, password } = this.state;
  return (
    // TODO: Render form
  )
}
```

### Updating state

This is where creating `onChange` event handler methods to update state come
into play! You'll want to add an `onChange` listener to update state with the
user input. Begin by creating an `updateUsername` method:

```js
updateUsername = (e) => {
  this.setState({ username: e.target.value });
}
```

Now update your username input field to have an `onChange` handler:

```jsx
<input
  type="text"
  value={username}
  onChange={this.updateUsername}
  name="username"
  placeholder="Enter Username"
/>
```

Follow the same pattern to create your email and password fields with their
prospective `onChange` handler methods to update state. Remember that HTML
inputs have different type attributes (i.e. `type="email"` and
`type="password"`). JSX input fields also have access to those different type
attributes.

Now start your server and test your controlled input fields. You should be able
to type and erase within your fields. However if you try submitting the form,
nothing will happen. This is because you haven't added an `onSubmit` event
listener to your form! Add an `onSubmit` handler to your form to invoke a
`registerUser` method that you will define. Your form's opening tag should look
something like this:

```jsx
<form onSubmit={this.registerUser}>
```

Alternatively, you could define an `onClick` event listener to your form's
submit button like so:

```jsx
<button type="submit" onClick={this.registerUser}>
  Sign Up
</button>
```

In this case, your component would simply be listening for a _click_ event from
the submit button, instead of a _submit_ event from the form.

### Registering a user

Now let's define a `registerUser` method for your `onSubmit` listener! As you
have learned in the event handling readings, remember that `submit` events
automatically prompt a GET request to re-render the page. Make sure to prevent
the form from re-rendering by using `e.preventDefault()` at the beginning of
your submit event listener. (If you handled the button's click event, you'd want
to do the same, prevent the default action from occurring.)

```js
registerUser = (e) => {
  e.preventDefault();
  // TODO: Send a POST request to create a user
}
```

In your `registerUser` method, use the Fetch API to create a user. You can do so
by making a POST request to your backend API. As a reminder, a fetch call takes
in the following parameters: an endpoint URL to make a request and an options
object to specify a fetch call's method, body, and headers. Feel free to
reference the [Fetch API docs] for more reminders.

Use the Fetch API to make a POST request to `/users`. Remember that you can make
use of proxy to make a request to `/users` instead of 
`http://localhost:8080/users`.

You'll want to use the user's username, email, and password entries as the body
of the request. You can do so by transforming your component's `state` into JSON
and setting it as the `body` property of the fetch call's options object. Since
you are making a POST request with a JSON string body, don't forget to set your
call's `headers` option to include `"Content-Type": "application/json"`.

Since you'll want to await your fetch call, make your `registerUser` method an
asynchronous function to do so. Wrap your fetch call in a `try/catch` statement.
Now remember that the Fetch API does not throw errors, so you'll need to
manually check whether fetch response is valid and throw the response if it is
not:

```js
if (!res.ok) {
  throw res;
}
```

Don't forget about catching your errors. In the future, you'll use your
application's global state to keep track of and render errors. For now, just
console error the caught error responses in the `catch` block. You'll see these
errors as the full fetch response thrown from the `!res.ok` statement.

You'll also want to sign in your users as soon as they register. Take a moment
to remember that you have set up a JSON web token in the backend routes to
manage your user sessions. Remember that you can access the `token` and
`user.id` from your fetch response, once it is parsed in JSON. In a later phase, you'll use [React Context] with cookies to share these values across different
components.

For now, test your `registerUser` method by console logging the `token` and
`user.id` from your fetch response. Make sure that you have parsed your response
in JSON. Upon a successful user registration, you should see a JSON web token
and a user ID in your frontend console!

Now let's set up your frontend routes!

## Phase 3: Set up routes

Take a moment to install `react-router-dom`:

```sh
npm install react-router-dom@^5.0.0
```

Now set up `BrowserRouter` in your entry file by wrapping your rendered `App`
component. Then set up the following skeleton files for your `LoginForm`,
`Home`, and `Profile` components. Your `Home` and `Profile` components should
live in your `components` directory, while your `LoginForm` should live with
your `RegistrationForm` in the `session` directory.

### LoginForm

```js
// ./twitter-front-end/src/components/session/LoginForm.js
import React from 'react';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    // TODO: Set up default state
  }

  render() {
    return (
      <form>
        <h2>Log In</h2>
      </form>
    );
  }
};

export default LoginForm;
```

### Home

```js
// ./twitter-front-end/src/components/Home.js
import React from 'react';

class Home extends React.Component {
  constructor(props) {
    super(props);
    // TODO: Set up default state
  }

  async componentDidMount() {
    // TODO: Fetch tweets
  }

  render() {
    return (
      <div>
        <h1>Home Page</h1>
      </div>
    );
  }
};

export default Home;
```

### Profile

```js
// ./twitter-front-end/src/components/Profile.js
import React from 'react';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    // TODO: Set up default state
  }

  async componentDidMount() {
    // TODO: Fetch user and their tweets
  }

  render() {
    return (
      <h1>Profile Page</h1>
    );
  }
};

export default Profile;
```

Create the following routes within a `<Switch>` component in your `App.js` file:

| URL Path         | Components         |
| ---------------- | ------------------ |
| `/`              | `Home`             |
| `/register`      | `RegistrationForm` |
| `/login`         | `LoginForm`        |
| `/users/:userId` | `Profile`          |

Now that you have your routes set up, take a moment to create a `<nav>` bar to
render your "Register", "Login", and "Home" navigation links. Note that you
won't be creating a link for the current user's profile _yet_. Use `<NavLink>`
components to create your links so that you can style active links. Create an
`.active` class in your `index.css` file to style your active links to be bold. 

Now you're going to create a `ProtectedRoute` as a higher order component (a
component that takes in another component as an argument) to ensure that only
logged users can view the `Profile` and `Home` pages. Your `<ProtectedRoute>`
will use your current user context to determine whether your user is logged in.
If the user is not logged in, the route will render a `<Redirect>` component to
redirect the user to the login page.

You'll use a `currentUserId` prop to determine whether a route's component or a
`<Redirect>` is rendered. In the next phase, you'll create a `UserContext` that
will pass the `currentUserId` information as a prop into your `App` component.
Then you can check whether the `currentUserId` is _truthy_ or _falsey_ to
determine whether your `ProtectedRoute` renders a protected component (i.e.
`Home`) or redirects users to the `/login` path.

Make a new `Routes.js` file in your `src` directory. Think of what you'll need
to import to create routes with redirection. Just like how you can use
`window.location.href` into redirect a user upon an unsuccessful login, you can
use a `<ProtectedRoute>` component to wrap your `<Route>` components to redirect
users.

```js
// Excerpt from login script file for previous Twitter frontend client
if (res.status === 401) {
  window.location.href = "/log-in";
  return;
}
```

The `ProtectedRoute` below destructures and distributes its props to the `Route`
component it returns. Note that the `ProtectedRoute` will expect to receive
route props (`component`, `path`, and `exact`) as well as an additional
`currentUserId` prop.

Just like how a `Route` component references its `component`, `path`, and
`exact` flag props to create a front-end route, the `ProtectedRoute` will use
the same props to create a protected front-end route as well as check whether
its `currentUserId` prop is valid. The route's `component` will be conditionally
rendered based on whether there is a valid `currentUserId` prop.

Since it is standard to capitalize components, the route below uses the syntax
`component: Component` to rename the `component` prop as `Component`. If the
`currentUserId` is _falsey_, then the route would redirect to the `/login` path
instead of rendering the `Component`.

```js
export const ProtectedRoute = ({ component: Component, path, currentUserId, exact }) => {
  return (
    <Route
      path={path}
      exact={exact}
      render={(props) =>
        currentUserId ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};
```

On another note, you also don't want your logged in users to be able to view the
login or registration forms. You can prevent them from viewing the session forms
by creating `AuthRoute` components that do the opposite of your `ProtectedRoute`
components. Your `AuthRoute` will redirect logged in users to the home page
(`"/"`) if they try to navigate to the authentication routes (`"/login"` or
`"/register"`). Your `AuthRoute` will also take care of redirecting users to the
home page once they're logged in.

```js
export const AuthRoute = ({ component: Component, path, currentUserId, exact }) => {
  return (
    <Route
      path={path}
      exact={exact}
      render={(props) =>
        currentUserId ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};
```

Notice how both your `ProtectedRoute` and `AuthRoute` simply deconstruct the
props that they receive to return a new `<Route>` that either renders a
specified component (with props) or a `<Redirect>` to a specified path.

Now that you have created your `ProtectedRoute` and `AuthRoute` components, take
a moment to refactor your routes! Import your route wrapper components into your
`App.js` file. Think of which routes you want to protect and which routes you
want to hide from authenticated users. For example, you would use your
`ProtectedRoute` to prevent your home page from being viewed by unauthenticated
users:

```jsx
<ProtectedRoute exact path="/" component={Home} />
```

Lastly, think of how might you want to order your routes within the `<Switch>`
tags.

Try navigating to your `Home` route. If you've set up your routes correctly, you
should be redirected to the `/login` route. This is because the route's
`currentUserId` prop is null, meaning that a `<Redirect>` will be rendered
instead of the `<Home>` component!

## Phase 4: Use React Context

Now that you have your `ProtectedRoute` and `AuthRoute` set up, you should
easily be able to tell if your context on a current user's login state is
properly shared across the application. Users will be redirected to the
`"/login"` page if they aren't logged in, or redirected to the home `"/"` page
if they are. Let's begin by setting up a `UserContext`!

Creating a `contexts` directory in your `src` directory. This folder will house
the current user context. Create a `UserContext.js` file and use the
`createContext()` method to generate a current user context, like so:

```js
// ./twitter-front-end/src/contexts/UserContext.js
import { createContext } from 'react';

const UserContext = createContext();

export default UserContext;
```

Now that you've set up a `UserContext`, you'll need to assign components that
_provide_ the context and components that _consume_ the context. You can do so
by wrapping your components in a similar way that you wrapped your routes to
create `AuthRoute` and `ProtectedRoute` components.

### Setting up the parent provider

Since you want your entire application to have access to whether a current user
is logged in, create a wrapper component with [Context.Provider] for your `App`
component.

Create an `AppWithContext.js` file as a sibling to your `App.js` file. You'll be
using React, the `UserContext`, and `App` component, so be sure to import each
of these.

Now create a new class component named `AppWithContext`:

```js
class AppWithContext extends React.Component {
  constructor() {
    super();
    // TODO: Set default context
  }

  render() {
    // TODO: Render wrapper component
  }
}
```

Be sure to export the `AppWithContext` class as the default export for the
`AppWithContext` module!

```js
export default AppWithContext;
```

Start by setting up the component's default state, which will also be the
default context. You'll update this state with the `token` and user `id` from
the registration and login fetch responses. Since you'll be storing the
`authToken` and `currentUserId` in the the cookie named `token`, you can persist 
user login by having the default state read and decode the cookie.

First, `npm install` the cookie parsing package `js-cookie` in your frontend
folder. Then import it at the top of your `AppWithContext.js` file:

```js
import Cookies from 'js-cookie';
```

In your initial state, get the user id from the token if the token exists:

```js
let authToken = Cookies.get('token'); // get the cookie with the name of 'token'
let currentUserId = null;
if (authToken) {
  try {
    const payload = authToken.split(".")[1]; // payload of a JWT is after the first period in the token string
    const decodedPayload = atob(payload); // payload needs to be decoded using the built-in function `atob`
    const payloadObj = JSON.parse(decodedPayload); // convert the decoded payload into a POJO from a JSON string
    const { data: { id }} = payloadObj; 
    /* payloadObj will look like:
    payloadObj = {
      data: { id: ..., email: ... }
    }
    */
    currentUserId = id; // set currentUserId equal to the payload's user id
  } catch(e) {
    // if there is an error parsing the token, then remove the 'token' cookie
    authToken = null;
    Cookies.remove('token');
  }
}
this.state = {
  authToken: authToken || null,
  currentUserId: currentUserId,
};
```

This means that if there is an `authToken` or `currentUserId` stored in your
browser's cookie, those values will be set as the default state. If your
browser's cookie does not have an `authToken` or a `currentUserId`, then
the default state will be set to `null`.

Now take a moment to render your `<App>` component wrapped in
`<UserContext.Provider>` tags so that your `UserContext` will be _provided_ to
your application:

```js
render() {
  return (
    <UserContext.Provider value={}>
      <App/>
    </UserContext.Provider>
  );
}
```

As a reminder, your `<UserContext.Provider>` component expects a `value` prop to
pass to the application as context. You'll manually pass this prop into your
child components when creating the _consumer_ wrapper components. Take a moment
to update your `<UserContext.Provider>` to take in the component's `state` as
its `value` prop:

```js
render() {
  return (
    <UserContext.Provider value={this.state}>
      <App />
    </UserContext.Provider>
  );
}
```

Now you have successfully set up the default context that can be provided to
your application! However, think of where your user login and registration logic
lives. The logic lives in the `RegistrationForm` and `LoginForm` components
themselves. Remember that your fetch request returns a `token` and current user
`id` in the response. How do you supply your application's `UserContext` with
information from the fetch response?

You can set the `AppWithContext` component's state (and therefore the
`UserContext`) from your `RegistrationForm` and `LoginForm` components by
passing in a method to the context value. This method will take care of updating
the `AppWithContext` component's state, which will then update the context.
Since your `value` prop is set to the `AppWithContext` component's state,
updating the component's state will update the entire application's context.

Define an `updateContext` method that takes in an `authToken` and
`currentUserId`. You'll use the method's arguments to update the state of
`AppWithContext`.

The `setState()` method takes an optional callback as its second parameter so
that you can have asynchronous behavior with `setState()`. Note that you can't
`await` on a `setState()` method since it doesn't return a promise!

Set an arrow function to console log `this.state` as the `setState()` method's
second parameter. This way, you can verify whether your `AppWithContext` state
is actually being set when your `updateContext` method is called from a consumer
component.

Your `updateContext` method should look something like this:

```js
updateContext = (authToken, currentUserId) => {
  this.setState({ authToken, currentUserId }, () => {
    console.log(this.state);
  });
}
```

Now whenever your `updateContext` method is called, you should see the `token`
and `id` from your fetch response console logged as the state of
`AppWithContext`!

Registering or logging in a user will set the `token` cookie on your browser
so you should be logged in upon refreshing the browser if you set the default state of `AppWithContext` correctly to extract the `token` and user's `id`
from the cookie properly. But you will only see those changes on a refresh
because only the initial state reads from the cookie. That's why the
`updateContext` method is necessary so that we don't need to force a refresh
to see a user logged in right away.

Take a moment to update your default state to include include your
`updateContext` method, like so:

```js
this.state = {
  authToken: authToken || null,
  currentUserId,
  updateContext: this.updateContext
};
```

Great! Now your `AppWithContext` wrapper component is all set up. In your
`index.js` file, replace your rendered `<App />` component with the
`<AppWithContext />` wrapper component you just created.

### Setting up the child consumers

Now it's time to create a wrapper component with [Context.Consumer] so that your
`RegistrationForm` component will receive context information. In your
`RegistrationForm.js` file, you'll create a `RegistrationFormWithContext`
wrapper component. Begin by importing the `UserContext` into the file.

Create a `RegistrationFormWithContext` component that takes in props and returns
your `RegistrationForm` wrapped with `<UserContext.Consumer>` tags. Remember
that you passed in a `value` prop to your `<UserContext.Provider>` component in
your `AppWithContext.js` file. `Context.Consumer` components receive this
`value` prop to distribute into their rendered child components. As a reminder,
`Context.Consumer` components require a [function as a child] to pass a provided
`value` prop as a [render prop]:

```js
// MyContext.Consumer example from ReactJS docs:

<MyContext.Consumer>
  {value => /* render something based on the context value */}
</MyContext.Consumer>
```

In your `RegistrationFormWithContext` wrapper, you will render the
`RegistrationForm` component with the `value.updateContext` method passed as an
`updateContext` prop:

```js
<UserContext.Consumer>
  {value => <RegistrationForm /* TODO: Pass props */ />}
</UserContext.Consumer>
```

Don't forget to also spread and pass in props received by the wrapper component
(`{...props}`)! Make sure to update the `export default` statement to export the
`RegistrationFormWithContext` instead of the `RegistrationForm`. Since you are
using `export default`, you won't need to manually rename component references
in import statements. If a component is exported with `export default`, then
that component is the only component that is actually exported from the file, no
matter what their import reference is named.

This means that if you use `export default RegistrationFormWithContext` instead
of `export default RegistrationForm`, your `import RegistrationForm from
'./components/session/RegistrationForm'` statement in `App.js` will actually be
importing your `RegistrationFormWithContext` component. By updating the export
statement, your route will render your `RegistrationFormWithContext` wrapper
component instead of the `RegistrationForm` component.

Because you passed an `updateContext` prop in your wrapper component, you can
now update the state of `AppWithContext` from within your `RegistrationForm`
component by simply invoking `this.props.updateContext` with arguments from the
fetch response (`token` and user `id`)!

### Updating context

Now let's revisit the `registerUser` method in your `RegistrationForm`
component. As you might remember, you last left off on accessing the `token` and
`user.id` of your fetch response (after parsing it to JSON):

```js
const {
  token,
  user: { id },
} = await res.json();
```

Now, you'll invoke the `updateContext` method passed as a prop to update the 
state of `AppWithContext` so that your entire app knows that a user has been
logged in.

```js
this.props.updateContext(token, id);
```

Congratulations, you just set up a connection between the `App` and
`RegistrationForm` components by using React Context! Now let's share the
`currentUserId` context with your routes so that you can test your user
registration.

### Sharing currentUserId context with the routes

Let's review the routes in your `App.js` file. At this point, your routes should
either be `AuthRoute` or `ProtectedRoute` components, each with a `path` prop
and a `component` prop. You'll notice that your `AuthRoute` and `ProtectedRoute`
wrapper routes expect a `currentUserId` prop. But where does this
`currentUserId` prop come from? Let's revisit your `AppWithContext.js` file to
pass the `currentUserId` into `App`.

Since your routes need access to the updated `currentUserId`, pass the
`currentUserId` state (from your `AppWithContext` wrapper component) as a prop
to your `App` component. This way your routes can simply reference
`props.currentUserId` to know whether there is a _truthy_ or _falsey_ current
user! Lastly, update your rendered routes to take in a `currentUserId` prop set
to the value of the `App` component's `currentUserId` prop.

Now you can navigate to http://localhost:3000/register and create a new user.
Upon successfully creating a user, you should receive a `201` status response in
your backend terminal and be redirected to the home page!

## Phase 5: User login form

Creating your login form will be very similar to creating your registration
form. You'll want to render a `<form>` with a `<h2>` title of "Log In", two
input fields (email and password), and a `<submit>` button. You'll also want to
define the default `email` and `password` slices of state and create `onChange`
handlers to set the state with input value from your login form. As a reminder,
you can destructure your state into the `email` and `password` variables you
need in the `render()` method:

```js
render() {
  const { email, password } = this.state;
  return(
    // TODO: Render form
  )
}
```

### Updating state

Instead of creating two different methods to update specific slices of state,
you can use interpolation with the event target's name (`[e.target.name]`) to
dynamically set the slice of state you want to update. Since you are referencing
both the `name` and `value` of your event target, you can destructure those
values to update state. For example, you could define and reuse the following
method for all your input `onChange` handlers:

```js
update = (e) => {
  const { name, value } = e.target;
  this.setState({ [name]: value });
};
```

Now each input field's `onChange` prop should look something like this:

```jsx
<input
  type="text"
  value={this.state.email}
  onChange={this.update}
  name="email"
  placeholder="Enter email"
/>
```

Feel free to refactor your `onChange` handlers in your `RegistrationForm`
component as well! Remember that you need to add an `onSubmit` handler to your
form to invoke a `loginUser` method (like your registration form's
`registerUser` method).

### Logging in a user

In your `loginUser` method, make a fetch request to log in a user. You'll do so
by making a POST request to `/users/token`. You'll use the component's `email`
and `password` state as a JSON string for your fetch request `body`. Since
you're sending a JSON string in your POST request, don't forget to set your
fetch request `headers` option to include `"Content-Type": "application/json"`.

Remember that you'll be awaiting your fetch call, so you need to make your
`loginUser` method an asynchronous function. Then wrap your fetch call in a
`try/catch` statement. You'll need to throw an error within the `try` block if
your response is unsuccessful (`!res.ok`). Like in your registration form,
you'll console error any unsuccessful fetch responses that were caught as errors
in the `catch` block.

To iterate, normally you would use your application's global state to keep track
of and render your application's errors. But for today, you'll simply console
error any unsuccessful fetch requests.

Remember that you want to use the JSON web `token` and current user `id` from
your fetch response to update the `UserContext`. Take a moment to create a
`LoginFormWithContext` wrapper to access `value`, the render prop of your
`UserContext.Consumer` component. Make sure to spread and pass in the `props` it
receives, as well as pass an `updateContext` prop with the `updateContext`
method from the context `value`. Lastly, don't forget to update the export
statement in your `LoginForm.js` file.

Now let's return to your `loginUser` method. Begin by parsing your fetch
response in JSON. Next you'll want to access the `token` and `user.id` from your
JSON response. Remember that you have passed an `updateContext` prop into the
`LoginForm` through the `LoginFormWithContext` wrapper.

You can now update the `UserContext` by invoking the `updateContext` prop with
the `token` and `user.id` from the fetch response. Invoking the method will set
the state of the `AppWithContext` component (so that these values can be shared
across your application). 

Now it's time to test your user login! Create a new user and return to the login
form to verify that the login process works. You should have received a `200`
status response in your backend terminal and have been redirected to the home
page!

### Creating login and logout methods

Now that you have a successful user login through the `updateContext` method,
let's rename the method to `login` to give the method a more descriptive name.
As a reminder, you can use `cmd + shift + f` to search through all of your
project directory for whenever you use the `updateContext` method. Take a moment
to refactor so that the `updateContext` method is renamed to be your `login`
method.

Now test your user login to ensure that your refactorization didn't create any
bugs. Once you have a working `login` method, you can easily create a `logout`
method with similar logic! Instead of setting `authToken` and `currentUserId`
values, you can reset them to be `null`. Make sure to also remove the token 
cookie once the setting of the state is complete (use the `Cookies.remove`
method from the `js-cookie` package):

```js
logout = () => {
  this.setState({ authToken: null, currentUserId: null }, () => {
    console.log(this.state);
    Cookies.remove('token');
  });
}
```

Take a moment to set your `logout` method in the `AppWithContext` state to pass
the method into the `UserContext` value. In the next phase, you'll build more
functionality in your home page by rendering a button that logs out a user upon
click and rendering a tweets index.

## Phase 6: Authenticated home page

When a user is redirected to the home page after logging in, a fetch request for
all tweets should be made in the `componentDidMount()` method to update the
`Home` component's `tweets` state. Notice how your `componentDidMount()` is
prefaced by the `async` keyword. This is to explicitly identify your code within
the life cycle method to be asynchronous. Now take a moment to set the default
`tweets` state to an empty array.

### Accessing context through contextType

Remember that you have created a `logout` method in your `AppWithContext`
component and passed it into the `UserContext` through setting the method in the
`AppWithContext` state. You also set the `authToken` as a slice of state in your
`AppWithContext` component. This means that you should be able to receive the
`logout` method and the `authToken` through the `UserContext`!

You created wrapper components for your `RegistrationForm` and `LoginForm`
components to access context. For your home page component, you'll use the
`static contextType` property to make a `this.context` object available to the
class component.

In your `Home` component, set the component's context type to be the
`UserContext` with the `static contextType` property:

```js
// ./twitter-front-end/src/components/Home.js
import React from 'react';
import UserContext from '../contexts/UserContext';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
    }
  }

  static contextType = UserContext;

  async componentDidMount() {
    // TODO: Fetch tweets
  }

  render() {
    return (
      <div>
        <h1>Home Page</h1>
      </div>
    );
  }
};

export default Home;
```

In your `componentDidMount()` method, try console logging `this.context` to see
what is available in the component's context object. You should see `authToken`
and `logout`. You'll use the `authToken` in your fetch request's authorization
header and the `logout` method to log out users upon click of a button!

Note that using the `static contextType` property is an alternative way to
access context. It is still important to know how to manually pass render props
through `Context.Consumer` components, as the `static contextType` property is
only available for class components.

### Fetching home page tweets

Write a `fetchTweets` method that will be invoked in your `componentDidMount()`
method! If you simply made a fetch request to `/tweets` without setting request
headers, the fetch call would would fail even though a current user is logged
in. This is because your fetch call doesn't know if your current user is logged
in unless you explicitly set an authorization header.

Think of how you can access the `authToken` from your application's
`UserContext` and set the authorization header. Set the `Authorization` header
to the JSON web token that was stored in your `UserContext`, like so:

```js
const res = await fetch(`/tweets`);
```

### Rendering home page tweets

Upon a successful fetch, parse the response in JSON and return the `tweets` from
the response. Then you can invoke and await the response of your `fetchTweets`
method to set your component's `tweets` state in your asynchronous
`componentDidMount()`. Remember that setting the component's `tweets` state will
update the state before triggering a re-render. Now you can use the updated
`tweets` state to render an unordered list of tweets! You should map over the
`tweets` from `state` to generate the list of tweets, like so:

```js
render() {
  return (
    <div>
      <h1>Home Page</h1>
      <ul>
        {this.state.tweets.map((tweet) => {
          const { id, message, user: { username }} = tweet;
          return (
            <li key={id}>
              <h3>{username}</h3>
              <p>{message}</p>
            </li>
        )})}
      </ul>
    </div>
  );
}
```

Think of how you would handle errors for unsuccessful fetch responses. Remember
that you'll need to manually throw responses, as the Fetch API does not throw
errors of unsuccessful requests. For now, you can use `console.error()` to log
any error responses. Think of what you might return in your `fetchTweets`
method's `catch` block to indicate that there were no tweets fetched.

### Logging out a user

Now it's time to render a logout button! Have your application render a
`<button>` underneath the "Home Page" header. Add an `onClick` event listener to
the button. Upon a user's click, your component should invoke the
`this.context.logout` method.

Once you have a logout button set up, test your application's user login and
logout flow! Once you are logged in, you should see an list of fetched tweets.
Take a moment to also notice how your application does not allow you to browse
to the `/login` and `/register` routes when you are logged in. This is due to
the `AuthRoute` components you created to wrap those routes!

## Phase 7: User profile page

In the profile page, you'll want to see a user's username as well as tweets they
have written. Since you'll be fetching information to render within a component,
you'll want to use `state`. Set a default `user` state to an empty object
literal and a default `tweets` state to an empty array. Now create a wrapper
component for your `Profile` component to access the `UserContext`. Make a fetch
request to `/users/:userId/tweets` to fetch a specific user's tweets. Since
you'll need authorization to make successful fetch requests for a current user
and their tweets, pass the `authToken` and `currentUserId` from your context as
props.

In your `Profile ` component, you'll define a method to fetch the current user
from the database. You'll invoke your fetch request in the asynchronous
`componentDidMount()` method. Remember that you can use the `match` prop to
access your router's `params` and receive the value of the `:userId` parameter
from the `/users/:userId` URL. Then you could use the `:userId` parameter to
make a fetch request to the correct route.

For today, use the `currentUserId` passed from your context so that a logged in
user can only see their personal profile. Make sure to include an
`Authorization` header that uses the `authToken` prop passed from the
`AppWithContext` wrapper component.

Once you have successfully fetched the current user, you'll want to save the
user as a slice of state and render the user's `username` in `<h1>` tags. The
next step is to fetch all of the tweets that belong to the user. Think of how
you might structure your asynchronous `componentDidMount()` method to make
multiple fetch calls before updating state. You'll want to fetch a user's tweets
only after successfully fetching a user from the database.

Before moving onto the bonus phase, check that your user profile correctly
fetching the current user's data from the backend API! Console log the `Profile`
component's state as the second optional callback in the `this.setState()` call
in your `componentDidMount()`:

```js
this.setState(
  { user, tweets },
  () => console.log(this.state),
);
```

Once you have a `user` slice of state with fetched data successfully logged in
your developer tools console, move forward to the bonus phase where you will set
up a way to create and delete tweets!

## Bonus: Creating and deleting tweets

Great! Now after successfully fetching your current user's tweets, you can
render the tweets in an unordered list like in your `Home` component. But what
about creating and deleting tweets?

Create a method to make `createTweet` requests from your `Home` component. Below
your home page's navigation bar, render a form create a tweet. Think how what
headers you might need to set to create tweets (hint: you'll need not one, but
two headers). The endpoint for creating a tweet is `/tweets`.

After implementing tweet creation, create a method to make `deleteTweet`
requests from your `Profile` component. Have your `Profile` component render a
delete `<button>` for each tweet rendered. The endpoint for deleting a tweet is
`/tweets/:tweetId`.

Think of how you might update your `tweets` state upon tweet creation and
deletion. What might you render if a home page or profile has no fetched tweets?
After you have rendered your user profile, add a navigation link titled "My
Profile" to the `/users/${currentUserId}` path. Only have the navigation link
render if there is a valid current user logged in!

Now test your tweet creation and deletion. The update to  your `tweets` slice of
state should be rendered to the `Profile` page without a manual browser refresh.

## Bonus: Higher order components

As a brief introduction, [higher order components (HOC)] are a pattern for
reusing component logic. Ultimately, higher order components allow you to
dynamically generate wrapper components. Your `ProtectedRoute` and `AuthRoute`
components are higher order components that used a function to return a new
wrapped `Route` component. A higher order component is just a component that
takes another component as an argument.

Take a moment to think of how you could refactor your context wrapper components
by using the following `withContext` higher order component below:

```js
// ./twitter-front-end/src/contexts/withContext.js
import React from 'react';
import UserContext from './UserContext';

const withContext = (Component) => {
  return function ContextComponent(props) {
    return (
      <UserContext.Consumer>
        {value => <Component {...props} value={value} />}
      </UserContext.Consumer>
    );
  }
}

export default withContext;
```

As you learn about implementing Redux with React, you'll see more design
patterns like higher order components. For example, you'll become familiar with
Redux's [connect()] function that wraps functions to connect with your
application's Redux store.

[`create-react-app` proxying in development]: 
https://create-react-app.dev/docs/proxying-api-requests-in-development/

[Fetch API docs]:
https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#Supplying_request_options

[React Context]: https://reactjs.org/docs/context.html

[Context.Provider]: https://reactjs.org/docs/context.html#contextprovider

[Context.Consumer]: https://reactjs.org/docs/context.html#contextconsumer

[function as a child]:
https://reactjs.org/docs/render-props.html#using-props-other-than-render

[render prop]: https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce

[higher order components (HOC)]:
https://reactjs.org/docs/higher-order-components.html

[connect()]:
https://github.com/reduxjs/react-redux/blob/master/docs/api/connect.md#connect
