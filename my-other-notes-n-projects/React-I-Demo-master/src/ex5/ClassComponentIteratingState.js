import React, { Component } from 'react';

class ClassComponentIteratingState extends Component {
    constructor() {
        super();

        this.state = {
            ingredients: ['flour', 'eggs', 'milk', 'sugar', 'vanilla'],
            newIngredient: ''
        };
    }

    addIngredient = (event) => {
        event.preventDefault();
        const ingredientsList = this.state.ingredients;
        ingredientsList.push(this.state.newIngredient);
        this.setState({
            newIngredient: '',
            ingredients: ingredientsList
        });
    };

    handleIngredientInput = (event) => {
        this.setState({ newIngredient: event.target.value });
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
