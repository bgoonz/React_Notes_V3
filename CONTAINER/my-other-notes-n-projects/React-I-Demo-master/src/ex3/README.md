# A Class Component with Some State

When we talked about class components, it was mentioned that class components can handle state. So what does that mean? Component state is any dynamic data that we want the component to keep track of. For example, let's say we have a form component. This form has some input fields that we'd like users to fill out. When a user types characters into an input field, how is that input persisted from the point of view of our form component?

The answer is by using component state! There are a few important concepts regarding component state, such as how to update it, pass it to another component, render it, etc. We'll talk about all of these in a bit, but for now, let's just focus on how to add state to a class component. 

Only class components have the ability to persist state, so if at any time you realize that a component needs to keep track of some state, you know that you'll automatically need a class component instead of a functional component. 

Our class component with state will look a lot like the basic class component we just wrote, but with some extra stuff:
```
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

Ok, now let's actually use this state object. One very common application of state objects in React components is to render the data being stored inside  them within our component's render function. Let's change our current class component to do that.

```
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

```
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
Our code is slightly cleaner, and doesn't require as many keystrokes as the older version. Fewer keystrokes are always a plus in my book! This new syntax is what is often referred to as 'syntactic sugar': under the hood, the React library translates this back into the old constructor code that we first started with, so that the JavaScript remains valid to the JavaScript interpreter. The clue to this is the fact that when we want to access some data from the state object, we still need to call it with `this.state.someData`; changing it to just `state.someData` does not work. 

While being able to write our code in this way is nice and convenient, going forward, I'm going to stick with the 'older' style of writing my React components by explicitly defining constructors so that you'll all have a better idea of what's going on under the hood. In other words, it's more "pedagogically sound". If you prefer the newer style (and I would in my own code), feel free to write your React components that way. 
