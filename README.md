# Introduction

### 

## Introduction

### React – A JavaScript library for building user interfaces

> A JavaScript library for building user interfaces

**Declarative**

React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.

Declarative views make your code more predictable and easier to debug.

**Component-Based**

Build encapsulated components that manage their own state, then compose them to make complex UIs.

Since component logic is written in JavaScript instead of templates, you can easily pass rich data through your app and keep state out of the DOM.

**Learn Once, Write Anywhere**

We don’t make assumptions about the rest of your technology stack, so you can develop new features in React without rewriting existing code.

React can also render on the server using Node and power mobile apps using [React Native](https://reactnative.dev/).

**A Simple Component**

React components implement a `render()` method that takes input data and returns what to display. This example uses an XML-like syntax called JSX. Input data that is passed into the component can be accessed by `render()` via `this.props`.

**JSX is optional and not required to use React.** Try the [Babel REPL](https://babeljs.io/repl/#?presets=react&code_lz=MYewdgzgLgBApgGzgWzmWBeGAeAFgRgD4AJRBEAGhgHcQAnBAEwEJsB6AwgbgChRJY_KAEMAlmDh0YWRiGABXVOgB0AczhQAokiVQAQgE8AkowAUAcjogQUcwEpeAJTjDgUACIB5ALLK6aRklTRBQ0KCohMQk6Bx4gA) to see the raw JavaScript code produced by the JSX compilation step.

```jsx
class HelloMessage extends React.Component {
  render() {
    return (
      <div\>
        Hello {this.props.name}
      </div\>
    );
  }
}

ReactDOM.render(
  <HelloMessage name\="Taylor" />,
  document.getElementById('hello-example')
);
```

**A Stateful Component**

In addition to taking input data \(accessed via `this.props`\), a component can maintain internal state data \(accessed via `this.state`\). When a component’s state data changes, the rendered markup will be updated by re-invoking `render()`.

```jsx
class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state \= { seconds: 0 };
  }

  tick() {
    this.setState(state \=\> ({
      seconds: state.seconds + 1
    }));
  }

  componentDidMount() {
    this.interval \= setInterval(() \=\> this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div\>
        Seconds: {this.state.seconds}
      </div\>
    );
  }
}

ReactDOM.render(
  <Timer />,
  document.getElementById('timer-example')
);
```

**An Application**

Using `props` and `state`, we can put together a small Todo application. This example uses `state` to track the current list of items as well as the text that the user has entered. Although event handlers appear to be rendered inline, they will be collected and implemented using event delegation.

```jsx
class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state \= { items: \[\], text: '' };
    this.handleChange \= this.handleChange.bind(this);
    this.handleSubmit \= this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div\>
        <h3\>TODO</h3\>
        <TodoList items\={this.state.items} />
        <form onSubmit\={this.handleSubmit}\>
          <label htmlFor\="new-todo"\>
            What needs to be done?
          </label\>
          <input
            id\="new-todo"
            onChange\={this.handleChange}
            value\={this.state.text}
          />
          <button\>
            Add #{this.state.items.length + 1}
          </button\>
        </form\>
      </div\>
    );
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.text.length \=== 0) {
      return;
    }
    const newItem \= {
      text: this.state.text,
      id: Date.now()
    };
    this.setState(state \=\> ({
      items: state.items.concat(newItem),
      text: ''
    }));
  }
}

class TodoList extends React.Component {
  render() {
    return (
      <ul\>
        {this.props.items.map(item \=\> (
          <li key\={item.id}\>{item.text}</li\>
        ))}
      </ul\>
    );
  }
}

ReactDOM.render(
  <TodoApp />,
  document.getElementById('todos-example')
);
```

**A Component Using External Plugins**

React allows you to interface with other libraries and frameworks. This example uses **remarkable**, an external Markdown library, to convert the `<textarea>`’s value in real time.

```jsx
class MarkdownEditor extends React.Component {
  constructor(props) {
    super(props);
    this.md \= new Remarkable();
    this.handleChange \= this.handleChange.bind(this);
    this.state \= { value: 'Hello, \*\*world\*\*!' };
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  getRawMarkup() {
    return { \_\_html: this.md.render(this.state.value) };
  }

  render() {
    return (
      <div className\="MarkdownEditor"\>
        <h3\>Input</h3\>
        <label htmlFor\="markdown-content"\>
          Enter some markdown
        </label\>
        <textarea
          id\="markdown-content"
          onChange\={this.handleChange}
          defaultValue\={this.state.value}
        />
        <h3\>Output</h3\>
        <div
          className\="content"
          dangerouslySetInnerHTML\={this.getRawMarkup()}
        />
      </div\>
    );
  }
}

ReactDOM.render(
  <MarkdownEditor />,
  document.getElementById('markdown-example')
);
```

#### description: First React Project

### Introduction

```javascript
t|15:03:54|bryan@LAPTOP-9LGJ3JGS:[react-translator] react-translator_exitstatus:0__________________________________________________________o>

tree 
.
├── package-lock.json
├── package.json
├── public
│   └── index.html
└── src
    ├── App.js
    ├── components
    │   ├── field.js
    │   ├── languages.js
    │   └── translate.js
    ├── index.js
    └── styles.css


3 directories, 9 files
```

**Index.html**

```markup
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
    <meta name="theme-color" content="#000000" />
    <script
      defer
      src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"
    ></script>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.min.css"
    />
    <!--
      manifest.json provides metadata used when your web app is added to the
      homescreen on Android. See https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/
    -->
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico" />
    <!--
      Notice the use of %PUBLIC_URL% in the tags above.
      It will be replaced with the URL of the `public` folder during the build.
      Only files inside the `public` folder can be referenced from the HTML.

      Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
      work correctly both with client-side routing and a non-root public URL.
      Learn how to configure a non-root public URL by running `npm run build`.
    -->
    <title>React App</title>
  </head>

  <body>
    <noscript>
      You need to enable JavaScript to run this app.
    </noscript>
    <div class="container" id="root"></div>
    <!--
      This HTML file is a template.
      If you open it directly in the browser, you will see an empty page.

      You can add webfonts, meta tags, or analytics to this file.
      The build step will place the bundled scripts into the <body> tag.

      To begin the development, run `npm start` or `yarn start`.
      To create a production bundle, use `npm run build` or `yarn build`.
    -->
  </body>
</html>
```

#### App.js:

```javascript
import "./styles.css";
import React, { useState } from "react";
import Field from "./components/field";
import Languages from "./components/languages";
import Translate from "./components/translate";

export default function App() {
  const [language, setLanguage] = useState("ru");
  const [text, setText] = useState("");

  return (
    <div>
      <Field label="Enter English" onChange={setText} value={text} />
      <Languages language={language} onLanguageChange={setLanguage} />
      <hr />
      <Translate text={text} language={language} />
    </div>
  );
}
```

**Index.js**

```javascript
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));
```

![](.gitbook/assets/image%20%284%29%20%282%29%20%282%29%20%282%29%20%282%29%20%282%29%20%283%29%20%281%29.png)

![](.gitbook/assets/image%20%282%29%20%282%29%20%282%29%20%282%29%20%282%29%20%282%29%20%282%29.png)

![](.gitbook/assets/react1.png)

If a given tag is a component react will walk through the contents of that tag... and evaluate if it is a vanilla html component... if react decides it is not it will parse through the react component and inspect it's children components.

![](.gitbook/assets/image%20%287%29.png)

![](.gitbook/assets/image%20%283%29%20%282%29%20%282%29%20%282%29%20%282%29%20%282%29%20%283%29%20%281%29.png)

![](.gitbook/assets/image%20%286%29%20%281%29%20%282%29%20%282%29%20%282%29%20%285%29%20%284%29.png)

![](.gitbook/assets/image%20%2825%29%20%282%29%20%282%29%20%282%29%20%282%29%20%283%29%20%283%29.png)

![](.gitbook/assets/image%20%288%29.png)

![](.gitbook/assets/image%20%289%29.png)

**First argument to ReactDOM.render\(**

**-----&gt; is App component or app function...we are telling react that we want to import all the code used in the app.js file.**

**Second argument is a reference to where we want to show the component with respect to root in index.html \(where to display\)**

**Difference between react and reactDOM?**

![](.gitbook/assets/image%20%2811%29.png)

ReactDOM is a Renderer

#### State System:

![](.gitbook/assets/image%20%2810%29.png)

### 

### Introduction

**We want to store some piece of data that will change over time... we want to store state about what language the user selects and what they type into the form... both of which are subject to change over time.**

![](.gitbook/assets/image%20%2820%29.png)

## README

This demo consists of a series of code snippets that each demonstrate basic React concepts in relative isolation. Feel free to refer back to this repository when you need to revisit basic React concepts.

* ex1 - A Basic React Component
* ex2 - A Basic React Class Component
* ex3 - A Class Component with State
* ex4 - A Class Component that Updates State
* ex5 - A Class Component that Iterates through State
* ex6 - An Example of Parent and Child Components

{% tabs %}
{% tab title="Basic React Component" %}
* ex1 - A Basic React Component

```javascript
import React from 'react';

const BasicComponent = () => <div>Hello World!</div>;

export default BasicComponent;
```
{% endtab %}

{% tab title="A Basic React Class Component" %}
* ex2 - A Basic React Class Component

```javascript
import React, {Component} from 'react';

class BasicClassComponent extends Component {
  render () {
    return <div> Hello World! </div>;
  }
}

export default BasicClassComponent;
```
{% endtab %}

{% tab title="Class Component with State" %}
* ex3 - A Class Component with State

```javascript
import React, {Component} from 'react';

class ClassComponentWithState extends Component {
  constructor () {
    super ();

    this.state = {
      aNumber: 8,
    };
  }

  render () {
    return <div> {`Here's a thing to render: ${this.state.aNumber}`} </div>;
  }
}

export default ClassComponentWithState;
```
{% endtab %}

{% tab title=" Class Component that Updates State" %}
* ex4 - A Class Component that Updates State

```javascript
import React, {Component} from 'react';

class ClassComponentUpdatingState extends Component {
  constructor () {
    super ();

    this.state = {
      aNumber: 8,
    };
  }

  increment = () => {
    this.setState ({
      aNumber: ++this.state.aNumber,
    });
  };

  decrement = () => {
    this.setState ({
      aNumber: --this.state.aNumber,
    });
  };

  render () {
    return (
      <div>
        <div> {`Our number: ${this.state.aNumber}`} </div>
        {' '}
        <button onClick={this.increment}> + </button>
        {' '}
        <button onClick={this.decrement}> - </button>
        {' '}
      </div>
    );
  }
}

export default ClassComponentUpdatingState;
```
{% endtab %}

{% tab title=" Class Component that Iterates through State" %}
* ex5 - A Class Component that Iterates through State

```javascript
import React, {Component} from 'react';

class ClassComponentIteratingState extends Component {
  constructor () {
    super ();

    this.state = {
      ingredients: ['flour', 'eggs', 'milk', 'sugar', 'vanilla'],
      newIngredient: '',
    };
  }

  addIngredient = event => {
    event.preventDefault ();
    const ingredientsList = this.state.ingredients;
    ingredientsList.push (this.state.newIngredient);
    this.setState ({
      newIngredient: '',
      ingredients: ingredientsList,
    });
  };

  handleIngredientInput = event => {
    this.setState ({newIngredient: event.target.value});
  };

  render () {
    return (
      <div>
        {this.state.ingredients.map (ingredient => <div>{ingredient}</div>)}
        <form onSubmit={this.addIngredient}>
          <input
            type="text"
            onChange={this.handleIngredientInput}
            placeholder="Add a new ingredient"
            value={this.state.newIngredient}
          />
        </form>
      </div>
    );
  }
}

export default ClassComponentIteratingState;
```
{% endtab %}

{% tab title="Parent & Child" %}
* **ex6 - An Example of Parent and Child Components**
* child:

```javascript
import React, {Component} from 'react';

class ChildComponent extends Component {
  constructor () {
    super ();
    this.state = {
      clicked: false,
    };
  }

  handleClick = () => {
    this.setState ({
      clicked: !this.state.clicked,
    });
  };

  render () {
    const styles = this.state.clicked
      ? {
          textDecoration: 'line-through',
        }
      : {
          textDecoration: 'none',
        };
    return (
      <div style={styles} onClick={this.handleClick}> {this.props.thing} </div>
    );
  }
}

export default ChildComponent;
```

* parent:

```javascript
import React, {Component} from 'react';
import ChildComponent from './ChildComponent';

class ParentComponent extends Component {
  constructor () {
    super ();

    this.state = {
      ingredients: ['flour', 'eggs', 'milk', 'sugar', 'vanilla'],
      newIngredient: '',
    };
  }

  handleIngredientInput = event => {
    this.setState ({
      newIngredient: event.target.value,
    });
  };

  addIngredient = event => {
    event.preventDefault ();
    const ingredientsList = this.state.ingredients;
    ingredientsList.push (this.state.newIngredient);
    this.setState ({
      newIngredient: '',
      ingredients: ingredientsList,
    });
  };

  render () {
    return (
      <div>
        {' '}
        {this.state.ingredients.map (ingredient => (
          <ChildComponent thing={ingredient} />
        ))}
        {' '}
        <form onSubmit={this.addIngredient}>
          <input
            type="text"
            onChange={this.handleIngredientInput}
            placeholder="Add a new ingredient"
            value={this.state.newIngredient}
          />
          {' '}
        </form>{' '}
      </div>
    );
  }
}

export default ParentComponent;
```
{% endtab %}
{% endtabs %}

**With regards to converting an existing HTML, CSS, and JS site into React, first you'll want to think about how to break up your site into components.**

* What the general hierarchical component structure of your site will look like.

  _From there, it's a simple matter of copying the relevant HTML for that component and throwing it into the render method of your component file._

  _Any methods that are needed for that component to function properly can added onto your new component._

`Once you've "component-ized" your HTML, you'll want to lay them out in the desired hierarchical structure, with children components being rendered by their parents, as well as ensuring that the parent components are passing down the necessary data as props to their children components.`

**The key abstraction that React provides is that of a component.**

#### To reiterate, a component is some thing that is being rendered in the browser.

_**- It could be a button, a form with a bunch of fields in it, a navigation bar at the top of the page, a single input field, etc.**_

React doesn't place any restrictions on how large or small a component can be.

You _could_ have an entire static site encapsulated in a single React component, but that at that point you may as well not be using React.

**So the first thing to remember about a component is that a component must** _**render**_ **something. If nothing is being rendered from a component, then React will throw an error.**

Let's write the most basic of components we can possibly write. Inside of `BasicComponent.js` , first import React at the top of the file. Our most basic of  
components looks like this:

```javascript
import React from 'react';

const BasicComponent = () => <div>Hello World!</div>;

export default BasicComponent;
```

This is a component that simply returns a div tag with the words Hello World! inside. The last line simply exports our component so that it can be imported  
by another file.

Notice that this component looks exactly like an anonymous arrow function that we've named `BasicComponent` . In fact, that is literally what this is. Nothing  
more, nothing less. The arrow function then is simply returning the div tag. When a component is written as a function like this one is, it is called a  
_functional_ component.

While a component can of course get a lot more complicated than this, fundamentally, all a component does is render some HTML.

The basic component you wrote in the previous exercise is an example of a functional component, which is appropriate since that component is literally  
nothing more than a function that returns some HTML. Functional components are great when all you want a component to do is to render some stuff; they  
are really good at doing just that.

Components can also be written as classes. For this exercise, we're going to write a class component that does exactly the same thing as the functional component we just wrote. We'll again need to import React at the top of the file, but we'll also need to add a little something. Our import statement will look like this:

```javascript
import React, { Component } from 'react';
```

So, in addition to importing React, we're also importing the base Component class that is included in the React library. The export statement at the bottom of the file also stays, completely unchanged. Our class component will thus look like this:

```javascript
import React, { Component } from 'react';

class BasicClassComponent extends Component {
    render() {
        return (
            <div>Hello World!</div>
        );
    }
}

export default BasicClassComponent;
```

Notice that our `BasicClassComponent` inherits from the base `Component` class that we imported from the React library, by virtue of the 'extends' keyword. That being said, there's nothing in this minimal component that takes advantage of any of those inherited methods. All we have is a method on our component class called `render` that returns the same div tag.

In this case, if we really were deciding between whether to use a functional component versus a class component to render a simple div tag, then the functional style is more appropriate to use. This is because class components are much better suited for handling component state and triggering events based on the component's lifecycle. Don't worry if you don't know what all these terms meant, we will get to them shortly.

The important takeaways at this point are that there are two types of components, functional and class components, and that functional components are well-suited if you're just looking to render some HTML. Class components, on the other hand, are much better suited for handling components that require more complex functionality, need to exhibit more varied behavior, and/or need to keep track of some state that may change throughout said component's lifecycle.

When we talked about class components, it was mentioned that class components can handle state. So what does that mean? Component state is any dynamic data that we want the component to keep track of. For example, let's say we have a form component. This form has some input fields that we'd like users to fill out. When a user types characters into an input field, how is that input persisted from the point of view of our form component?

The answer is by using component state! There are a few important concepts regarding component state, such as how to update it, pass it to another component, render it, etc. We'll talk about all of these in a bit, but for now, let's just focus on how to add state to a class component.

Only class components have the ability to persist state, so if at any time you realize that a component needs to keep track of some state, you know that you'll automatically need a class component instead of a functional component.

Our class component with state will look a lot like the basic class component we just wrote, but with some extra stuff:

```javascript
import React, { Component } from 'react';

class ClassComponentWithState extends Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <div>Hello World!</div>
        );
    }
}

export default ClassComponentWithState;
```

So far, the only new thing going on here is the constructor block. If you recall how classes in JavaScript work, classes need constructors. Additionally, if a class is extending off of another class and wants access to its parent class's methods and properties, then the `super` function needs to be called inside the class's constructor function. Point being, the constructor function and the call to the `super` function are _not_ associated with React, they are associated with all JavaScript classes.

Then there is the `this.state` property inside the constructor function that is set as an empty object. We're adding a property called `state` to our class and setting it to an empty object. State objects in React are always just plain old objects.

The observant student may be wondering why the basic class component we wrote in the previous exercise had no constructor function within its body. That is because we had no need for them since all our class component was doing was rendering some HTML. The constructor is needed here because that is where we need to initialize our state object. The call to `super` is needed because we can't reference `this` inside of our constructor without a call to `super` first.

Ok, now let's actually use this state object. One very common application of state objects in React components is to render the data being stored inside them within our component's render function. Let's change our current class component to do that.

```javascript
class ClassComponentWithState extends Component {
    constructor() {
        super();
        this.state = {
            someData: 8
        };
    }

    render() {
        return (
            <div>{`Here's some data to render: ${this.state.someData}`}</div>
        );
    }
}

export default ClassComponentWithState;
```

So what's changed here? Well, we added a key-value pair to our state object inside our constructor. Then we changed the contents of the render function. Now, it's actually rendering the data that we have inside the state object. Notice that inside the div tags we're using a template string literal so that we can access the value of `this.state.someData` straight inside of our rendered content. This is a very handy piece of functionality that React provides for us when writing components.

With React's newest version, we can actually now add state to a component without explicitly defining a constructor on the class. We can refactor our class component to look like this:

```javascript
class ClassComponentWithState extends Component {
    state = {
        someData: 8
    };

    render() {
        return (
            <div>{`Here's some data to render: ${this.state.someData}`}</div>
        );
    }
}

export default ClassComponentWithState;
```

Our code is slightly cleaner, and doesn't require as many keystrokes as the older version. Fewer keystrokes are always a plus in my book! This new syntax is what is often referred to as 'syntactic sugar': under the hood, the React library translates this back into the old constructor code that we first started with, so that the JavaScript remains valid to the JavaScript interpreter. The clue to this is the fact that when we want to access some data from the state object, we still need to call it with `this.state.someData` ; changing it to just `state.someData` does not work.

While being able to write our code in this way is nice and convenient, going forward, I'm going to stick with the 'older' style of writing my React components by explicitly defining constructors so that you'll all have a better idea of what's going on under the hood. In other words, it's more "pedagogically sound". If you prefer the newer style \(and I would in my own code\), feel free to write your React components that way.

Great, so we can render some state that our component persists for us. However, we said an important use case of component state is to handle _dynamic_ data. A single static number isn't very dynamic at all. So now let's walk through how to update component state.

```javascript
import React, { Component } from 'react';

class ClassComponentUpdatingState extends Component {
  constructor() {
    super();
    this.state = {
      aNumber: 8
    };
  }

  increment = () => {
    this.setState({ aNumber: ++this.state.aNumber });
  };

  decrement = () => {
    this.setState({ aNumber: --this.state.aNumber });
  };

  render() {
    return (
      <div>
        <div>{`Our number: ${this.state.aNumber}`}</div>
        <button onClick={this.increment}>+</button>
        <button onClick={this.decrement}>-</button>
      </div>
    );
  }
}

export default ClassComponentUpdatingState;
```

Notice that we've added two methods to our class: `increment` and `decrement` . `increment` and `decrement` are methods that _we_ are adding to our class component. Unlike the `render` method, `increment` and `decrement` were not already a part of our class component. This is why `increment` and `decrement` are written as arrow functions, so that they are automatically bound to our class component. This needs to happen so that we can call them later on. Again, there's no crazy React black magic going on here, we simply added two methods to our class.

The more interesting thing is what is going on within the bodies of these methods. Each calls this funky `setState` function. `setState` in fact _is_ provided to us by React. It is the canonical way to update a component's state. Actually, it's the _only_ way you should ever update a component's state. It may seem more verbose than necessary, but there are good reasons for why you should be doing it this way. I'm not going to get into those reasons now. I'll leave a [link](https://reactjs.org/docs/react-component.html#setstate) to the official documentation on the `setState` function, although I'm pretty sure at this point it will probably just blow your mind and/or overwhelm you with jargon. So for now, take this as a case of "because I'm telling you so".

So the way to use `setState` to update a component's state is to pass it an object with each of the state keys you wish to update, along with the updated value. In our `increment` method we said "I would like to update the `aNumber` property on my component state by adding one to it and then setting the new value as my new `aNumber` ". The same thing happens in our `decrement` method, only we're subtracting instead of adding.

Then the other new concept we're running into here is how to actually call these methods we've added to our class. We added two HTML button tags within our `render` function, then in their respective `onClick` handlers, we specify the method that should be called whenever this button gets clicked. So whenever we click either of the buttons, our state gets updated appropriately and our component will re-render to show the correct value we're expecting.

---\# Class Component Iterating State

Another common state pattern you'll see being used in React components is iterating over an array in our state object and rendering each array element in its own tag. This is often used in order to render lists.

Additionally, we want to be able to easily update lists and have React re-render our updated list. We'll see how both of these are done and how they work together within a single component in order to create the behavior of a dynamic list.

```javascript
import React, { Component } from 'react';

class ClassComponentIteratingState extends Component {
    constructor() {
        super();

        this.state = {
            ingredients: ['flour', 'eggs', 'milk', 'sugar', 'vanilla extract'],
            newIngredient: ''
        };
    }

    handleIngredientInput = (event) => {
        this.setState({ newIngredient: event.target.value });
    };

    addIngredient = (event) => {
        event.preventDefault();
        const ingredientsList = this.state.ingredients;
        ingredientsList.push(this.state.newIngredient);
        this.setState({
            newIngredient: '',
            ingredients: ingredientsList
        });
    };

    render() {
        return (
            <div>
                {this.state.ingredients.map(ingredient => <div>{ingredient}</div>)}
                <form onSubmit={this.addIngredient}>
                    <input type="text" onChange={this.handleIngredientInput} placeholder="Add a new ingredient" value={this.state.newIngredient} />
                </form>
            </div>
        );
    }
}

export default ClassComponentIteratingState;
```

The first change to note is that our state object now has an 'ingredients' array, and a 'newIngredient' field that has been initialized to an empty string. The ingredients array contains the elements that we'll want to render in our list. We'll see shortly why the newIngredient field is needed.

The `addIngredient` and `handleIngredientInput` methods we've added to our class receives a parameter called 'event'. This event object is part of the browser's API. When we interact with some DOM element, such as clicking on an HTML button, the function that is invoked upon that button being clicked actually receives the event object. So when we type some input into an input tag, we're able grab each character that was typed into the input field through the event object paramter.

The `handleIngredientInput` method is what gets invoked every time the user presses a key to enter text in the input box for adding a new ingredient. Every character the user types gets persisted in the `newIngredient` field on the state object. We're able to grab the text in the input box using `event.target.value` , which holds the value of the string text that is currently in the input box. We use that to update our `newIngredient` string field.

Breaking down the `addIngredient` method, we see this `event.preventDefault()` invocation. This is because this method will be used upon submitting a form, and it turns out that submitting a form triggers some default form behavior that we don't want to trigger when we submit the form \(namely refreshing the entire page\). `event.preventDefault()` will prevent this default form behavior, meaning our form will only do what we want it to do when it is submitted.

Next, we store a reference to `this.state.ingredients` in a variable called `ingredientsList` . So we now have a copy of the array that is stored in our state object. We want to update the copy of the ingredients array first instead of directly updating the actual array itself in state. This is a React best practice.

Now we push whatever value is being stored at our `newIngredient` field onto the `ingredientsList` array so that our `ingredientsList` array is now more up-to-date than our `this.state.ingredients` array. So all we have to do now is call `setState` appropriately in order to update the value in our state object. Additionally, we also set the `newIngredient` field back to an empty string in order to clear out the input field once we submit a new ingredient. Now it's ready to accept more user input!

Looking at our render function, first note the `this.state.ingredients.map` call. This is looping through each ingredient in our `ingredients` array and returning each one within its own div tag. This is a very common syntax for rendering everything inside an array.

Then we have an HTML form which contains an input field. The purpose of this form is to allow a user to add new ingredients to the list. Note that we're passing our `addIngredient` method to the form's `onSubmit` handler. This means that our `addIngredient` method gets invoked whenever our form is submitted.

Lastly, the input field has an `onChange` handler that invokes our `handleIngredientInput` method whenever there is some sort of change in the input field, namely when a user types into it. Notice that the `value` field in our input tag reads off of `this.state.newIngredient` in order to know what value to display. So when a user enters text into the input field, the `onChange` handler is invoked every time, which updates our `this.state.newIngredient` field, which the input field  
then renders.

### Parent and Child Components <a id="parent-and-child-components"></a>

Now let's get into talking about how to have components interact with each other. A single isolated component isn't going to do us much good. That being said, it's _possible_ to simply throw all of the HTML for a page into a single React component, though at that point that one component would be so bloated and monolithic that you might as well not have used React at all.

The beauty of React lies in the fact that it allows us to compose modular components together. Let's start off with the component we just saw, but let's change its name to `ParentComponent` .

```javascript
import React, { Component } from 'react';
import ChildComponent from './ChildComponent';

class ParentComponent extends Component {
    constructor() {
        super();

        this.state = {
            ingredients: ['flour', 'eggs', 'milk', 'sugar', 'vanilla'],
            newIngredient: ''
        };
    }

    handleIngredientInput = (event) => {
        this.setState({ newIngredient: event.target.value });
    };

    addIngredient = (event) => {
        event.preventDefault();
        const ingredientsList = this.state.ingredients;
        ingredientsList.push(this.state.newIngredient);
        this.setState({
            newIngredient: '',
            ingredients: ingredientsList
        });
    };

    render() {
        return (
            <div>
                {this.state.ingredients.map(ingredient => <ChildComponent thing={ingredient} />)}
                <form onSubmit={this.addIngredient}>
                    <input type="text" onChange={this.handleIngredientInput} placeholder="Add a new ingredient" value={this.state.newIngredient} />
                </form>
            </div>
        );
    }
}

export default ParentComponent;
```

The only two other differences in this component are that we're importing a `ChildComponent` and then using it inside our `this.state.ingredients.map` call. `ChildComponent` is another React component. Notice that we're using it just as if it were any other HTML tag. This is how we lay out our component hierarchy: the ChildComponent is rendered within the ParentComponent. We can see this to be the case if we open up the developer console and inspect these elements.

Note also that we're passing each ingredient as a 'thing' to the ChildComponent component. This is how a parent component passes data to a child component. It doesn't need to be called 'thing'; you can call it whatever you want. Conceptually though, every piece of data that a parent component passes down to a child component is called a 'prop' in React lingo.

Let's take a look now at the Child Component. It serves two purposes: 1\) to render the props data that it gets from a parent component, and 2\) to add the ability for a user to click on it and have it toggle a strikethrough, indicating that the item is 'complete'.

```javascript
import React, { Component } from 'react';

class ChildComponent extends Component {
  constructor() {
    super();
    this.state = {
      clicked: false
    };
  }

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  };

  render() {
    const styles = this.state.clicked ? { textDecoration: 'line-through'} : { textDecoration: 'none' };
    return (
      <div style={styles} onClick={this.handleClick}>{this.props.thing}</div>
    );
  }
}

export default ChildComponent;
```

The overall structure of the child component is nothing we haven't seen. It's just another class component with its own state object and a method called `handleClick` .

A component accesses its props via the `this.props` object. Any prop a parent component passes down to a child component is accessible inside the child component's `this.prop` object.

So our child component keeps its own state that tracks whether the component has been clicked or not. Then at the top of the `render` function, it uses a ternary condition to determine whether the div tag that is being rendered should have a strikethrough or not. The `handleClick` method is then invoked via an `onClick` handler on the div tag; it does the work of toggling the `this.state.clicked` boolean.

The overall structure of React applications can be represented as a hierarchical tree structure, just like how the DOM itself is structure. There is an overarching root component at the top of the hierarchy that every other component sits underneath. Specifying that a component should be a child of some parent component is as simple as throwing it in the parent component's render function, just like how we did it in this example.

