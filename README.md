# React

# A visual guide to React Mental models



When I started building websites in 2014 I had a hard time understanding how it all worked. Building my blog with WordPress was easy, but I had no idea about hosting, servers, DNS, certificates, and much more.

As I read articles and tried stuff out (and broke my server config more than once) I started to grasp the system, to get glimpses into how it all worked, until eventually it "clicked" and I felt comfortable working with it. My mind had built a mental model around this system that I could use to work with it.

If someone had explained it by transferred their mental model to me, I would've understood it much faster. Here I'll explain (and show) the mental models I use with React. It will help you understand React better and make you a better developer.

[](#react-mental-models)React Mental Models
-------------------------------------------

React helps us build complex, interactive UIs more easily than ever before. It also encourages us to write code in a certain way, guiding us to create apps that are simpler to navigate and understand.

 ![An abstract model inside a mind looking at the React logo](https://obedparla.com/static/c9f28303d7dad2744b40d64b0ab33358/9aabf/react-mental-model-illustration.jpg ) 


React itself is a mental model with a simple idea at its core: encapsulate portions of your app that rely on similar logic and UI and React will make sure that portion is always up kept up to date.

Whether you've been working with React for years or are just starting, having a clear mental model is the best way to feel confident working with it. So for me to transfer my mental models to you I'll start from first-principles and build on top of them.

[](#its-functions-all-the-way-down)It's functions all the way down
------------------------------------------------------------------

Let's start by modeling the basic building blocks of JavaScript and React: functions.

*   A React component is just a function
*   Components containing other components are functions calling other functions
*   Props are the function's arguments

This is hidden away by JSX, the markup language React uses. Strip away JSX and React is a bunch of functions calling one another. JSX is in itself an applied mental model that makes using React simpler and more intuitive.

Let's look at each part individually.

### [](#a-component-is-a-function-that-returns-jsx)A component is a function that returns JSX

React is used with JSX—JavaScript XML—a way to write what seems as HTML with all of JavaScript's power. JSX offers a great applied mental model for using nested functions in a way that feels intuitive.

Let's ignore class components and focus on the far more common functional components. A _functional_ component is a function that behaves exactly like any other JavaScript function. React components always return JSX which is then executed and turned into HTML.

This is what simple JSX looks like:
```jsx
    const Li = props => <li {...props}>{props.children}</li>;
    
    export const RickRoll = () => (
      <div>
        <div className='wrapper'>
          <ul>
            <Li color={'red'}>Never give you up</Li>
          </ul>
        </div>
      </div>
    );
```
Which compiled into pure JavaScript by Babel:
```jsx
    const Li = props => React.createElement('li', props, props.children);
    
    export const RickRoll = () =>
      React.createElement(
        'div',
        null,
        React.createElement(
          'div',
          {
            className: 'wrapper',
          },
          React.createElement(
            'ul',
            null,
            React.createElement(
              Li,
              {
                color: 'red',
              },
              'Never give you up',
            ),
          ),
        ),
      );
```


Now, notice how each component is a function calling another function, and each new component is the third argument for the `React.createElement` function. Whenever you write a component, it's useful to keep in mind that it's a normal JavaScript function.

An important feature of React is that a component can have many children but only one parent. I found this a confusing until I realized it's the same logic HTML has, where each element must be inside other elements, and can have many children. You can notice this in the code above, where there's only one parent `div` containing all the children.

### [](#components-props-are-the-same-as-a-functions-arguments)component's props are the same as a function's arguments

When using a function we can use arguments to share information with that function. For React components we call these arguments `props` (funny story, I didn't realize props is short for _properties_ for a long time).

Under the hood, props behave _exactly_ like function arguments, the differences are that we interact with them through the nicer interface of JSX, and that React gives extra functionality to props such as `children`.

[](#creating-a-mental-model-around-functions)Creating a mental model around functions
-------------------------------------------------------------------------------------

Using this knowledge let's craft a mental model to intuitively understand functions!

When I think about a function I imagine it as a box, and that box will do something whenever it's called. It could return a value or not:
```js
    function sum(a, b) {
      return a + b;
    }
    
    console.log(sum(10, 20)); 
    
    function logSum(a, b) {
      console.log(a + b); 
    }
```
Since a component is a fancy function, that makes a component a box as well, with `props` as the ingredients the box needs to create the output.

 ![A plus B in a box with props explaining a mental model for JavaScript functions](https://obedparla.com/static/1078eb1563b832008167b49c2b8edb11/ce2e0/a-plus-b-box.jpg ) 
![(" ")](https://obedparla.com/static/1078eb1563b832008167b49c2b8edb11/ce2e0/a-plus-b-box.jpg) 

When a component is executed it will run whatever logic it has, if any, and evaluate its JSX. Any tags will become HTML and any component will be executed, and the process is repeated until reaching the last component in the chain of children.

Since a component can have many children but only one parent I imagine multiple components as a set of boxes, one inside another. Each box must be contained within a bigger box and can have many smaller boxes inside.

 ![One big box with many smaller boxes inside and text saying "it's a box in another box"](https://obedparla.com/static/cf7892f6a3db2815d6c502fe74538e4a/1df45/box-inside-box.jpg ) 


But the mental model of a box representing a component is not complete without understanding how it can interact with other boxes.

[](#how-to-think-about-closures)
How To Think About Closures
-----------------------------------------------------------

Closures are a core concept in JavaScript. They enable complex functionality in the language, they're super important to understand to have a good mental model around React.

They're also one of the features newcomers struggle with the most, so instead of explaining the technicalities I'll demonstrate the mental model I have around closures.

The basic description of a closure is that it's a function. I imagine it as a box that keeps what's inside of it from spilling out, while allowing the things outside of it from entering, like a semi-permeable box. But spilling out where?

While the closure itself is a box, any closure will be inside bigger boxes, with the outermost box being the Window object.

 ![A box describing a mental model of a javascript closure, showing Window, scripts and React apps](https://obedparla.com/static/952aebfcba6f1850f93b3bf6d15392f3/ce2e0/closures_window.jpg)
  

>The window object encapsulates everything else

### [](#but-what-is-a-closure)But what _is_ a closure?

A closure is a feature of JavaScript functions. If you're using a function, you're using a closure.

As I've mentioned, a function is a box and that makes a closure a box too. Considering that each function can contain many others inside of it, then the closure is the ability of a function to use the information outside of it, while keeping the information it has inside from "spilling out", or being used by the outer function.

Speaking in terms of my mental model: I imagine the functions as boxes within boxes, and each smaller box can see the information of the outer box, or parent, but the big box cannot see the smaller one's information. That's as simple and accurate an explanation of closures as I can make.

 ![Visual representation of closures and the sharing of information between functions in a mental model, from a box view and a tree view](https://obedparla.com/static/96f403cd585425c1057214447165bbbe/7efee/data-flow.jpg)
 
  "Each function can only access its own ![(information and the parent's")](https://obedparla.com/static/96f403cd585425c1057214447165bbbe/01d85/data-flow.jpg) 

Each function can only access its own information and the parent's

Closures are important because they can be exploited to create some powerful mechanics and React takes full advantage of this.

### [](#closures-in-react)Closures in React

Each React component is also a closure. Within components, you can only pass props down from parent to child and the parent cannot see what's inside the child, this is an intended feature to make our app's data flow simpler to trace. To find where data comes from, we usually need to go up the tree to find which parent is sending it down.

A great example of closures in React is updating a parent's state through a child component. You've probably done this without realizing you were messing around with closures.

To start, we know the parent can't access the child's information directly, but the child can access the parent's. So we send down that info from parent to child through `props`. In this case, the information takes the shape of a function that updates the parent's state.
```jsx
    const Parent = () => {
      const [count, setCount] = useState(0);
    
      return (
        <div>
          The count is {count}
          <div>
            <ChildButtons onClick={setCount} count={count} />
          </div>
        </div>
      );
    };
    
    const ChildButtons = props => (
      <div>
        <button onClick={() => props.onClick(props.count + 1)}>
          Increase count
        </button>
        <button onClick={() => props.onClick(props.count - 1)}>
          Decrease count
        </button>
      </div>
    );
```
When an `onClick` happens in a `button`, that will execute the function received from props `props.onClick`, and update the value using `props.count`.

The insight here lies in the way we're updating a parent's state through a child, in this case, the `props.onClick` function. The reason this works is that the function was _declared_ within the `Parent` component's scope, within its closure, so it will have access to the parent's information. Once that function is called in a child, it still lives in the same closure.

This can be hard to grasp, so the way I imagine it is as a "tunnel" between closures. Each has its own scope, but we can create a one-way communication tunnel that connects both.

Once we understand how closures affect our components, we can take the next big step: React state.

[](#fitting-reacts-state-into-our-mental-model)Fitting React's State Into Our Mental Model
------------------------------------------------------------------------------------------

React's philosophy is simple: it handles _when_ and _how_ to render elements, and developers control _what_ to render. State is our tool to decide that what.

When state changes, its component renders and therefore re-executes all the code within. We do this to show new, updated information to the user.

In my mental model state is like a special property inside the box. It's independent of everything else that happens within it. It will get a default value on the first render and always be up to date with the latest value.

Each variable and function is created on every render, which means their values are also brand new. Even if a variable's value never changes, it is recalculated and reassigned every time. That's not the case with state, it only changes when there's a request for it to change via a `set state` event.

 ![React component state visualized as a part of a bigger box with props coming in from outside](https://obedparla.com/static/acd86ef0ea8a3fe610df603769e68ad9/44313/state-in-box.jpg ) 


State is a special, independent part of the box; with props coming from outside

State follows a simple rule: Whenever it changes it will re-rendered the component and its children. Props follow the same logic, if a prop changes, the component will re-render, however, we can control state by modifying it, props are more static and usually change as a reaction to a state change.

# the-rendering-mental-model-understanding-reacts-magic
>The Rendering Mental Model: understanding React's magic
-----------------------------------------------------------------------------------------------------------------

I consider rendering to be React's most confusing part because a lot of things happen during rendering that sometimes isn't obvious by looking at the code. That's why having a clear mental model helps.

The way I imagine rendering with my imaginary boxes is two-fold: the first render brings the box into existence, that's when the state is initialized. The second part is when it re-renders, that's the box being recycled, most of it is brand new but some important elements of it remain namely state.

On every render, everything inside a component is created, including variables and functions, that's why we can have variables storing a calculation's results, since they will be recalculated on every render. It's also why functions are not reliable as values, due to their reference (the function's value, per se) being different every render.
```jsx
    const Thumbnail = props => (
      <div>
        {props.withIcon && <AmazingIcon />}
        <img src={props.imgUrl} alt={props.alt} />
      </div>
    );
```
The above will give a different result depending on the props the component receives. The reason React _must_ re-render on every prop change is that it wants to keep the user up to date with the latest information.

However, the state doesn't change on re-renders, its value is maintained. That's why the box is "recycled" instead of created brand new every time. Internally, React is keeping track of each box and making sure its state is always consistent. That's how React knows when to update a component.

 ![Mental model of a React component re-rendering when props change](https://obedparla.com/static/78de62863da9bd4c40c588c294167031/7efee/react-rendering-mental-model.jpg)
 > "When props (or state) changes, a new render happens and the component's output can change")]
 ![](https://obedparla.com/static/78de62863da9bd4c40c588c294167031/ea2ac/react-rendering-mental-model.jpg) 

When props (or state) changes, a new render happens and the component's output can change

By imagining a box being recycled I can understand what's going on inside of it. For simple components, it's easy to grasp, but the more complex a component becomes, the more props it receives, the more state it maintains, the more useful a clear mental model becomes.

[](#a-complete-react-mental-model-putting-it-all-together)A complete React mental model: Putting it all together.
-----------------------------------------------------------------------------------------------------------------

Now that I've explained all the different parts of the puzzle separately, let's put it all together. Here's the complete mental model I use for React components, directly translated from how I imagine them into words.

I imagine a React component as a box that contains all of its information within its walls, including its children, which are more boxes.

And like a box in the real world, it can have other boxes inside of it and these boxes can, in turn, contain more boxes. That way each box/component must have a single parent, and a parent can have many children.

 ![Basic representation of a React component as a mental model using boxes](https://obedparla.com/static/d6c8afaef3597fd26d9174e070be1ce3/ce2e0/react-mental-model-basic.jpg )
 
 ![("The basic representation of a React component")](https://obedparla.com/static/d6c8afaef3597fd26d9174e070be1ce3/ce2e0/react-mental-model-basic.jpg) 

>The basic representation of a React component

The boxes are semi-permeable, meaning they never leak anything to the outside but can use information from the outside as if it belonged to them. I imagine like this to represent how closures work in JavaScript.

In React the way to share information between components is called `props`, the same idea applies to function and then it's called `arguments`, they both work in the same way but with a different syntax.

Within components, information can only travel _down_ from parents to children. In other words, children can access their parent's data and state, but not the other way around, and the way we share that information is through `props`.

I imagine this directional sharing of information as boxes within boxes. With the inner-most box being able to absorb the parent's data.

 ![ React Mental model of data sharing between components visualized as information flowing downward ](https://obedparla.com/static/a3471b4d03d16406ea159b3bc3f3e218/ce2e0/data-sharing-model.jpg ) 


Data is shared from parent to child

The box must first be created though, and this happens on `render`, where the default value is given to `state` and just like with functions, all the code within the component is executed. In my mental model, this is equivalent to the box being _created_.

Subsequent renders, or `re-renders`, execute all the code in the component again, recalculating variables, recreating functions, and so on. Everything except for `state` is brand new on each render. State's value is maintained across renders is updated only through a `set` method.

In my mental model, I see re-rendering as recycling the box since most of it is recreated, but it's still the same box due to React keeping track of the component's state.

When a box is recycled all the boxes within it, its children, are also recycled. This can happen because the component's state was modified or a prop changed.

 ![Mental model of a React component re-rendering when props or state change](https://obedparla.com/static/267768646d810a0032728d222c3f13a5/7efee/react-rendering-mental-model-full.jpg ) 


Mental model of a React component re-rendering when props or state change

Remember that a state or prop changing means the information the user sees is outdated, and React always wants to keep the UI updated so it re-renders the component that must show the new data.

By using these mental models I feel confident when working with React. They help me visualize what can be a maze of code into a comprehensive mental map. It also demystifies React and brings it to a level I'm much more comfortable with.

React is not that complex once you start understanding the core principles behind it and create some ways to imagine how your code works.



## Cheatsheet

```js
/* *******************************************************************************************
 * REACT.JS CHEATSHEET
 * DOCUMENTATION: https://reactjs.org/docs/
 * FILE STRUCTURE: https://reactjs.org/docs/faq-structure.html
 * ******************************************************************************************* */
```

npm install --save react // declarative and flexible JavaScript library for building UI
npm install --save react-dom // serves as the entry point of the DOM-related rendering paths
npm install --save prop-types // runtime type checking for React props and similar objects

````

// notes: don't forget the command lines


/* *******************************************************************************************
 * REACT
 * https://reactjs.org/docs/react-api.html
 * ******************************************************************************************* */


// Create and return a new React element of the given type.
// Code written with JSX will be converted to use React.createElement().
// You will not typically invoke React.createElement() directly if you are using JSX.
React.createElement(
  type,
  [props],
  [...children]
)

// Clone and return a new React element using element as the starting point.
// The resulting element will have the original element’s props with the new props merged in shallowly.
React.cloneElement(
  element,
  [props],
  [...children]
)

// Verifies the object is a React element. Returns true or false.
React.isValidElement(object)

React.Children  // provides utilities for dealing with the this.props.children opaque data structure.

// Invokes a function on every immediate child contained within children with this set to thisArg.
React.Children.map(children, function[(thisArg)])

// Like React.Children.map() but does not return an array.
React.Children.forEach(children, function[(thisArg)])

// Returns the total number of components in children,
// equal to the number of times that a callback passed to map or forEach would be invoked.
React.Children.count(children)

// Verifies that children has only one child (a React element) and returns it.
// Otherwise this method throws an error.
React.Children.only(children)

// Returns the children opaque data structure as a flat array with keys assigned to each child.
// Useful if you want to manipulate collections of children in your render methods,
// especially if you want to reorder or slice this.props.children before passing it down.
React.Children.toArray(children)

// The React.Fragment component lets you return multiple elements in a render() method without creating an additional DOM element
// You can also use it with the shorthand <></> syntax.
React.Fragment


/* *******************************************************************************************
 * REACT.COMPONENT
 * React.Component is an abstract base class, so it rarely makes sense to refer to React.Component
 * directly. Instead, you will typically subclass it, and define at least a render() method.
 * https://reactjs.org/docs/react-component.html
 * ******************************************************************************************* */


class Component extends React.Component {
  // Will be called before it is mounted
  constructor(props) {
    // Call this method before any other statement
    // or this.props will be undefined in the constructor
    super(props);

    // The constructor is also often used to bind event handlers to the class instance.
    // Binding makes sure the method has access to component attributes like this.props and this.state
    this.method = this.method.bind(this);

    // The constructor is the right place to initialize state.
    this.state = {
      active: true,

      // In rare cases, it’s okay to initialize state based on props.
      // This effectively “forks” the props and sets the state with the initial props.
      // If you “fork” props by using them for state, you might also want to implement componentWillReceiveProps(nextProps)
      // to keep the state up-to-date with them. But lifting state up is often easier and less bug-prone.
      color: props.initialColor
    };
  }

  // Enqueues changes to the component state and
  // tells React that this component and its children need to be re-rendered with the updated state.
  // setState() does not always immediately update the component. It may batch or defer the update until later.
  // This makes reading this.state right after calling setState() a potential pitfall.
  // Instead, use componentDidUpdate or a setState callback.
  // You may optionally pass an object as the first argument to setState() instead of a function.
  setState(updater[, callback]) { }

  // Invoked just before mounting occurs (before render())
  // This is the only lifecycle hook called on server rendering.
  componentWillMount() { }

  // Invoked immediately after a component is mounted.
  // Initialization that requires DOM nodes should go here.
  // If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
  // This method is a good place to set up any subscriptions. If you do that, don’t forget to unsubscribe in componentWillUnmount().
  componentDidMount() { }

  // Invoked before a mounted component receives new props.
  // If you need to update the state in response to prop changes (for example, to reset it),
  // you may compare this.props and nextProps and perform state transitions using this.setState() in this method.
  componentWillReceiveProps(nextProps) { }

  // Let React know if a component’s output is not affected by the current change in state or props.
  // The default behavior is to re-render on every state change, and in the vast majority of cases you should rely on the default behavior.
  // shouldComponentUpdate() is invoked before rendering when new props or state are being received. Defaults to true.
  // This method is not called for the initial render or when forceUpdate() is used.
  // Returning false does not prevent child components from re-rendering when their state changes.
  shouldComponentUpdate(nextProps, nextState) { }

  // Invoked just before rendering when new props or state are being received.
  // Use this as an opportunity to perform preparation before an update occurs. This method is not called for the initial render.
  // Note that you cannot call this.setState() here; nor should you do anything else
  // (e.g. dispatch a Redux action) that would trigger an update to a React component before componentWillUpdate() returns.
  // If you need to update state in response to props changes, use componentWillReceiveProps() instead.
  componentWillUpdate(nextProps, nextState) { }

  // Invoked immediately after updating occurs. This method is not called for the initial render.
  // Use this as an opportunity to operate on the DOM when the component has been updated.
  // This is also a good place to do network requests as long as you compare the current props to previous props (e.g. a network request may not be necessary if the props have not changed).
  componentDidUpdate(prevProps, prevState) { }

  // Invoked immediately before a component is unmounted and destroyed.
  // Perform any necessary cleanup in this method, such as invalidating timers, canceling network requests,
  // or cleaning up any subscriptions that were created in componentDidMount().
  componentWillUnmount() { }

  // Error boundaries are React components that catch JavaScript errors anywhere in their child component tree,
  // log those errors, and display a fallback UI instead of the component tree that crashed.
  // Error boundaries catch errors during rendering, in lifecycle methods, and in constructors of the whole tree below them.
  componentDidCatch() { }

  // This method is required.
  // It should be pure, meaning that it does not modify component state,
  // it returns the same result each time it’s invoked, and
  // it does not directly interact with the browser (use lifecycle methods for this)
  // It must return one of the following types: react elements, string and numbers, portals, null or booleans.
  render() {
    // Contains the props that were defined by the caller of this component.
    console.log(this.props);

    // Contains data specific to this component that may change over time.
    // The state is user-defined, and it should be a plain JavaScript object.
    // If you don’t use it in render(), it shouldn’t be in the state.
    // For example, you can put timer IDs directly on the instance.
    // Never mutate this.state directly, as calling setState() afterwards may replace the mutation you made.
    // Treat this.state as if it were immutable.
    console.log(this.state);

    return (
      <div>
        {/* Comment goes here */}
        Hello, {this.props.name}!
      </div>
    );
  }
}

// Can be defined as a property on the component class itself, to set the default props for the class.
// This is used for undefined props, but not for null props.
Component.defaultProps = {
  color: 'blue'
};

component = new Component();

// By default, when your component’s state or props change, your component will re-render.
// If your render() method depends on some other data, you can tell React that the component needs re-rendering by calling forceUpdate().
// Normally you should try to avoid all uses of forceUpdate() and only read from this.props and this.state in render().
component.forceUpdate(callback)


/* *******************************************************************************************
 * REACT.DOM
 * The react-dom package provides DOM-specific methods that can be used at the top level of
 * your app and as an escape hatch to get outside of the React model if you need to.
 * Most of your components should not need to use this module.
 * https://reactjs.org/docs/react-dom.html
 * ******************************************************************************************* */


// Render a React element into the DOM in the supplied container and return a reference
// to the component (or returns null for stateless components).
ReactDOM.render(element, container[, callback])

// Same as render(), but is used to hydrate a container whose HTML contents were rendered
// by ReactDOMServer. React will attempt to attach event listeners to the existing markup.
ReactDOM.hydrate(element, container[, callback])

// Remove a mounted React component from the DOM and clean up its event handlers and state.
// If no component was mounted in the container, calling this function does nothing.
// Returns true if a component was unmounted and false if there was no component to unmount.
ReactDOM.unmountComponentAtNode(container)

// If this component has been mounted into the DOM, this returns the corresponding native browser
// DOM element. This method is useful for reading values out of the DOM, such as form field values
// and performing DOM measurements. In most cases, you can attach a ref to the DOM node and avoid
// using findDOMNode at all.
ReactDOM.findDOMNode(component)

// Creates a portal. Portals provide a way to render children into a DOM node that exists outside
// the hierarchy of the DOM component.
ReactDOM.createPortal(child, container)


/* *******************************************************************************************
 * REACTDOMSERVER
 * The ReactDOMServer object enables you to render components to static markup.
 * https://reactjs.org/docs/react-dom.html
 * ******************************************************************************************* */


// Render a React element to its initial HTML. React will return an HTML string.
// You can use this method to generate HTML on the server and send the markup down on the initial
// request for faster page loads and to allow search engines to crawl your pages for SEO purposes.
ReactDOMServer.renderToString(element)

// Similar to renderToString, except this doesn’t create extra DOM attributes that React uses
// internally, such as data-reactroot. This is useful if you want to use React as a simple static
// page generator, as stripping away the extra attributes can save some bytes.
ReactDOMServer.renderToStaticMarkup(element)

// Render a React element to its initial HTML. Returns a Readable stream that outputs an HTML string.
// The HTML output by this stream is exactly equal to what ReactDOMServer.renderToString would return.
// You can use this method to generate HTML on the server and send the markup down on the initial
// request for faster page loads and to allow search engines to crawl your pages for SEO purposes.
ReactDOMServer.renderToNodeStream(element)

// Similar to renderToNodeStream, except this doesn’t create extra DOM attributes that React uses
// internally, such as data-reactroot. This is useful if you want to use React as a simple static
// page generator, as stripping away the extra attributes can save some bytes.
ReactDOMServer.renderToStaticNodeStream(element)


/* *******************************************************************************************
 * TYPECHECKING WITH PROPTYPES
 * https://reactjs.org/docs/typechecking-with-proptypes.html
 * ******************************************************************************************* */


import PropTypes from 'prop-types';

MyComponent.propTypes = {
  // You can declare that a prop is a specific JS type. By default, these
  // are all optional.
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
  optionalSymbol: PropTypes.symbol,

  // Anything that can be rendered: numbers, strings, elements or an array
  // (or fragment) containing these types.
  optionalNode: PropTypes.node,

  // A React element.
  optionalElement: PropTypes.element,

  // You can also declare that a prop is an instance of a class. This uses
  // JS's instanceof operator.
  optionalMessage: PropTypes.instanceOf(Message),

  // You can ensure that your prop is limited to specific values by treating
  // it as an enum.
  optionalEnum: PropTypes.oneOf(['News', 'Photos']),

  // An object that could be one of many types
  optionalUnion: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Message)
  ]),

  // An array of a certain type
  optionalArrayOf: PropTypes.arrayOf(PropTypes.number),

  // An object with property values of a certain type
  optionalObjectOf: PropTypes.objectOf(PropTypes.number),

  // An object taking on a particular shape
  optionalObjectWithShape: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number
  }),

  // You can chain any of the above with `isRequired` to make sure a warning
  // is shown if the prop isn't provided.
  requiredFunc: PropTypes.func.isRequired,

  // A value of any data type
  requiredAny: PropTypes.any.isRequired,

  // You can also specify a custom validator. It should return an Error
  // object if the validation fails. Don't `console.warn` or throw, as this
  // won't work inside `oneOfType`.
  customProp: function(props, propName, componentName) {
    if (!/matchme/.test(props[propName])) {
      return new Error(
        'Invalid prop `' + propName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  },

  // You can also supply a custom validator to `arrayOf` and `objectOf`.
  // It should return an Error object if the validation fails. The validator
  // will be called for each key in the array or object. The first two
  // arguments of the validator are the array or object itself, and the
  // current item's key.
  customArrayProp: PropTypes.arrayOf(function(propValue, key, componentName, location, propFullName) {
    if (!/matchme/.test(propValue[key])) {
      return new Error(
        'Invalid prop `' + propFullName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  })
};
    ```
````
