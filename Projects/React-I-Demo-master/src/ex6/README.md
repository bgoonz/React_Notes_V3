# Parent and Child Components

Now let's get into talking about how to have components interact with each other. A single isolated component isn't going to do us much good. That being said, it's _possible_ to simply throw all of the HTML for a page into a single React component, though at that point that one component would be so bloated and monolithic that you might as well not have used React at all. 

The beauty of React lies in the fact that it allows us to compose modular components together. Let's start off with the component we just saw, but let's change its name to `ParentComponent`.

```
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

Let's take a look now at the Child Component. It serves two purposes: 1) to render the props data that it gets from a parent component, and 2) to add the ability for a user to click on it and have it toggle a strikethrough, indicating that the item is 'complete'. 
```
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
The overall structure of the child component is nothing we haven't seen. It's just another class component with its own state object and a method called `handleClick`. 

A component accesses its props via the `this.props` object. Any prop a parent component passes down to a child component is accessible inside the child component's `this.prop` object.

So our child component keeps its own state that tracks whether the component has been clicked or not. Then at the top of the `render` function, it uses a ternary condition to determine whether the div tag that is being rendered should have a strikethrough or not. The `handleClick` method is then invoked via an `onClick` handler on the div tag; it does the work of toggling the `this.state.clicked` boolean. 

The overall structure of React applications can be represented as a hierarchical tree structure, just like how the DOM itself is structure. There is an overarching root component at the top of the hierarchy that every other component sits underneath. Specifying that a component should be a child of some parent component is as simple as throwing it in the parent component's render function, just like how we did it in this example. 
