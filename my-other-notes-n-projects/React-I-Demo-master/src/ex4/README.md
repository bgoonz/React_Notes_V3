# Class Component Updating State

Great, so we can render some state that our component persists for us. However, we said an important use case of component state is to handle _dynamic_ data. A single static number isn't very dynamic at all. So now let's walk through how to update component state. 
```
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

Notice that we've added two methods to our class: `increment` and `decrement`. `increment` and `decrement` are methods that _we_ are adding to our class component. Unlike the `render` method,`increment` and `decrement` were not already a part of our class component. This is why `increment` and `decrement` are written as arrow functions, so that they are automatically bound to our class component. This needs to happen so that we can call them later on. Again, there's no crazy React black magic going on here, we simply added two methods to our class. 

The more interesting thing is what is going on within the bodies of these methods. Each calls this funky `setState`function. `setState` in fact _is_ provided to us by React. It is the canonical way to update a component's state. Actually, it's the _only_ way you should ever update a component's state. It may seem more verbose than necessary, but there are good reasons for why you should be doing it this way. I'm not going to get into those reasons now. I'll leave a [link](https://reactjs.org/docs/react-component.html#setstate) to the official documentation on the `setState` function, although I'm pretty sure at this point it will probably just blow your mind and/or overwhelm you with jargon. So for now, take this as a case of "because I'm telling you so". 

So the way to use `setState` to update a component's state is to pass it an object with each of the state keys you wish to update, along with the updated value. In our `increment` method we said "I would like to update the `aNumber` property on my component state by adding one to it and then setting the new value as my new `aNumber`". The same thing happens in our `decrement` method, only we're subtracting instead of adding.

Then the other new concept we're running into here is how to actually call these methods we've added to our class. We added two HTML button tags within our `render` function, then in their respective `onClick` handlers, we specify the method that should be called whenever this button gets clicked. So whenever we click either of the buttons, our state gets updated appropriately and our component will re-render to show the correct value we're expecting. 
