# A Basic Class Component

The basic component you wrote in the previous exercise is an example of a functional component, which is appropriate since that component is literally
nothing more than a function that returns some HTML. Functional components are great when all you want a component to do is to render some stuff; they
are really good at doing just that. 

Components can also be written as classes. For this exercise, we're going to write a class component that does exactly the same thing as the functional component we just wrote. We'll again need to import React at the top of the file, but we'll also need to add a little something. Our import statement will look like this:
```
import React, { Component } from 'react';
```

So, in addition to importing React, we're also importing the base Component class that is included in the React library. The export statement at the bottom of the file also stays, completely unchanged. Our class component will thus look like this:
```
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
