# React I Demo

This demo consists of a series of code snippets that each demonstrate basic React concepts in relative isolation. Feel free to refer back to this repository when you need to revisit basic React concepts. 

 * ex1 - A Basic React Component
 * ex2 - A Basic React Class Component
 * ex3 - A Class Component with State
 * ex4 - A Class Component that Updates State
 * ex5 - A Class Component that Iterates through State
 * ex6 - An Example of Parent and Child Components

 With regards to converting an existing HTML, CSS, and JS site into React, first you'll want to think about how to break up your site into components, as well as think about what the general hierarchical component structure of your site will look like. From there, it's a simple matter of copying the relevant HTML for that component and throwing it into the render method of your component file. Any methods that are needed for that component to function properly can added onto your new component. 

 Once you've "component-ized" your HTML, you'll want to lay them out in the desired hierarchical structure, with children components being rendered by their parents, as well as ensuring that the parent components are passing down the necessary data as props to their children components. 