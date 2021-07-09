# A Basic Component
 
The key abstraction that React provides is that of a component. To reiterate, a component is some thing that is being rendered in the browser. It could be a button, a form with a bunch of fields in it, a navigation bar at the top of the page, a single input field, etc. Any of these could be its own component. React doesn't place any restrictions on how large or small a component can be. You _could_ have an entire static site encapsulated in a single React component, but that at that point you may as well not be using React. So the first thing to remember about a component is that a component must _render_ something. If nothing is being rendered from a component, then React will throw an error. 

Let's write the most basic of components we can possibly write. Inside of `BasicComponent.js`, first import React at the top of the file. Our most basic of 
components looks like this:
```
import React from 'react';

const BasicComponent = () => <div>Hello World!</div>;

export default BasicComponent;
```

This is a component that simply returns a div tag with the words Hello World! inside. The last line simply exports our component so that it can be imported
by another file. 

Notice that this component looks exactly like an anonymous arrow function that we've named `BasicComponent`. In fact, that is literally what this is. Nothing
more, nothing less. The arrow function then is simply returning the div tag. When a component is written as a function like this one is, it is called a
_functional_ component. 

While a component can of course get a lot more complicated than this, fundamentally, all a component does is render some HTML. 
