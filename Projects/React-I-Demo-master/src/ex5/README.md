# Class Component Iterating State

Another common state pattern you'll see being used in React components is iterating over an array in our state object and rendering each array element in its own tag. This is often used in order to render lists. 

Additionally, we want to be able to easily update lists and have React re-render our updated list. We'll see how both of these are done and how they work together within a single component in order to create the behavior of a dynamic list. 

```
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

The `handleIngredientInput` method is what gets invoked every time the user presses a key to enter text in the input box for adding a new ingredient. Every character the user types gets persisted in the `newIngredient` field on the state object. We're able to grab the text in the input box using `event.target.value`, which holds the value of the string text that is currently in the input box. We use that to update our `newIngredient` string field.

Breaking down the `addIngredient` method, we see this `event.preventDefault()` invocation. This is because this method will be used upon submitting a form, and it turns out that submitting a form triggers some default form behavior that we don't want to trigger when we submit the form (namely refreshing the entire page). `event.preventDefault()` will prevent this default form behavior, meaning our form will only do what we want it to do when it is submitted. 

Next, we store a reference to `this.state.ingredients` in a variable called `ingredientsList`. So we now have a copy of the array that is stored in our state object. We want to update the copy of the ingredients array first instead of directly updating the actual array itself in state. This is a React best practice.

Now we push whatever value is being stored at our `newIngredient` field onto the `ingredientsList` array so that our `ingredientsList` array is now more up-to-date than our `this.state.ingredients` array. So all we have to do now is call `setState` appropriately in order to update the value in our state object. Additionally, we also set the `newIngredient` field back to an empty string in order to clear out the input field once we submit a new ingredient. Now it's ready to accept more user input!

Looking at our render function, first note the `this.state.ingredients.map` call. This is looping through each ingredient in our `ingredients` array and returning each one within its own div tag. This is a very common syntax for rendering everything inside an array. 

Then we have an HTML form which contains an input field. The purpose of this form is to allow a user to add new ingredients to the list. Note that we're passing our `addIngredient` method to the form's `onSubmit` handler. This means that our `addIngredient` method gets invoked whenever our form is submitted.

Lastly, the input field has an `onChange` handler that invokes our `handleIngredientInput` method whenever there is some sort of change in the input field, namely when a user types into it. Notice that the `value` field in our input tag reads off of `this.state.newIngredient` in order to know what value to display. So when a user enters text into the input field, the `onChange` handler is invoked every time, which updates our `this.state.newIngredient` field, which the input field
then renders. 
