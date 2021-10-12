# React Cheat Sheet



## React.js cheatsheet

> React.Component · render\(\) · componentDidMount\(\) · props/state · dangerouslySetInnerHTML · React is a JavaScript library for building user interfaces. This guide targets React v15 to v16.

[React](https://reactjs.org/) is a JavaScript library for building user interfaces. This guide targets React v15 to v16.

## React Cheat Sheet

### render

```text
render() {
  return <div />;
}
```

### constructor

```text
    constructor(props) {
      super(props);
      this.state = {
        list: props.initialList
      };
    }
    
    // where props aren't used in constructor
    
    constructor() {
      super();
      this.state = {
        list: []
      };
    }
```

### componentWillMount

```text
    componentWillMount() {
      // invoked once.
      // fires before initial 'render'
    }
```

### componentDidMount

```text
    componentDidMount() {
      // good for AJAX: fetch, ajax, or subscriptions.
    
      // invoked once (client-side only).
      // fires before initial 'render'
    }
```

### componentWillReceiveProps

```text
    componentWillReceiveProps(nextProps) {
      // invoked every time component recieves new props.
      // does not before initial 'render'
    }
```

### shouldComponentUpdate

```text
    shouldComponentUpdate(nextProps, nextState) {
      // invoked before every update (new props or state).
      // does not fire before initial 'render'.
    }
```

### componentWillUpdate

```text
    componentWillUpdate(nextProps, nextState) {
      // invoked immediately before update (new props or state).
      // does not fire before initial 'render'.
    
      // (see componentWillReceiveProps if you need to call setState)
    }
```

**✖ this.setState**

### componentDidUpdate

```text
    componentDidUpdate(prevProps, prevState) {
      // invoked immediately after DOM updates
      // does not fire after initial 'render'
    }
```

### componentWillUnmount

```text
    componentWillUnmount() {
      // invoked immediately before a component is unmounted.
    }
```

### setState \(function\)

```text
    // good for state transitions
    
    this.setState((prevState, props) => {
      return {count: prevState.count + props.step};
    });
```

### setState \(object\)

```text
    // good for static values
    
    this.setState({mykey: 'my new value'});
    
    ```

setState (optional callback)
----------------------------
```js
    // fires after setState
    // prefer componentDidUpdate
    
    this.setState(
      (prevState, props) => ({ count: prevState.count + props.step }),
      () => console.log(this.state.count)
    );
```

### forceUpdate

```text
    // forces a re-render; AVOID if possible
    
    this.forceUpdate();
```

### displayName

```text
    displayName: "MyComponent"
    
    
    ```

defaultProps
------------
```js
    class Greeting extends React.Component {
          render() {
            return <h1>Hi {this.props.name}</h1>
          }
        }
        
        CustomButton.defaultProps = {
          name: 'guest'
        };
```

### Children.map



```text
    React.Children.map(this.props.children, (child, i) => {
        return child;
    })
```

### Children.forEach

```text
    React.Children.forEach(this.props.children, (child, i) => {
      console.log(child + ' at index: ' + i);
    })
```

### Children.count

```text
    React.Children.count(this.props.children);
```

### Children.only

```text
    React.Children.only(this.props.children);
```

### Children.toArray

```text
    React.Children.toArray(this.props.children)
```

### Context \(example\)

```text
    // requires 'prop-types' library
    
    import { string } from "prop-types";
    
    class Cowboy extends React.Component {
      childContextTypes: {
        salutation: string
      }
    
      getChildContext() {
        return { salutation: "Howdy" };
      }
    
      render() {
        return React.Children.only(this.props.children);
      }
    }
    
    const Greeting = (props, context) =>
      <div>{context.salutation} {props.name}.</div>
    
    Greeting.contextTypes = {
      salutation: PropTypes.string
    }
    
    // <Greeting name="Michael" />
    // => Michael.
    
    // <Cowboy><Greeting name="Michael" /></Cowboy>
    // => Howdy Michael.
```

### contextTypes

```text
    // add to the context-aware component
    // requires 'prop-types' library
    
    contextTypes: {
      color: PropTypes.string
    },
```

### childContextTypes

```text
    // add to the context provider
    // requires 'prop-types' library
    
    childContextTypes: {
      color: PropTypes.string
    },
```

### getChildContext

```text
    // add to the context provider
    
    getChildContext() {
      return {color: "purple"};
    }
```

### [\#](https://bryanguner.medium.com/media/a554d6ce459e6a031eb45921c3c5e6fd#components)Components

#### Components

```text
    import React from 'react'
    import ReactDOM from 'react-dom'
    

    class Hello extends React.Component {
      render () {
        return <div className='message-box'>
          Hello {this.props.name}
        </div>
      }
    }
    

    const el = document.body
    ReactDOM.render(<Hello name='John' />, el)
```

Use the [React.js jsfiddle](https://jsfiddle.net/reactjs/69z2wepo/) to start hacking. \(or the unofficial [jsbin](http://jsbin.com/yafixat/edit?js,output)\)

#### Import multiple exports

```text
    import React, {Component} from 'react'
    import ReactDOM from 'react-dom'
    

    class Hello extends Component {
      ...
    }
```

#### Properties

```text
    <Video fullscreen={true} autoplay={false} />
    

    render () {
      this.props.fullscreen
      const { fullscreen, autoplay } = this.props
      ···
    }
```

Use `this.props` to access properties passed to the component.

See: [Properties](https://reactjs.org/docs/tutorial.html#using-props)

#### States

```text
    constructor(props) {
      super(props)
      this.state = { username: undefined }
    }
    

    this.setState({ username: 'rstacruz' })
    

    render () {
      this.state.username
      const { username } = this.state
      ···
    }
```

Use states \(`this.state`\) to manage dynamic data.

With [Babel](https://babeljs.io/) you can use [proposal-class-fields](https://github.com/tc39/proposal-class-fields) and get rid of constructor

```text
    class Hello extends Component {
      state = { username: undefined };
      ...
    }
```

See: [States](https://reactjs.org/docs/tutorial.html#reactive-state)

#### Nesting

```text
    class Info extends Component {
      render () {
        const { avatar, username } = this.props
    
        return <div>
          <UserAvatar src={avatar} />
          <UserProfile username={username} />
        </div>
      }
    }
```

As of React v16.2.0, fragments can be used to return multiple children without adding extra wrapping nodes to the DOM.

```text
    import React, {
      Component,
      Fragment
    } from 'react'
    
    class Info extends Component {
      render () {
        const { avatar, username } = this.props
    
        return (
          <Fragment>
            <UserAvatar src={avatar} />
            <UserProfile username={username} />
          </Fragment>
        )
      }
    }
```

Nest components to separate concerns.

See: [Composing Components](https://reactjs.org/docs/components-and-props.html#composing-components)

#### Children

```text
    <AlertBox>
      <h1>You have pending notifications</h1>
    </AlertBox>
    

    class AlertBox extends Component {
      render () {
        return <div className='alert-box'>
          {this.props.children}
        </div>
      }
    }
```

Children are passed as the `children` property.

### [\#](https://bryanguner.medium.com/media/a554d6ce459e6a031eb45921c3c5e6fd#defaults)Defaults

#### Setting default props

```text
    Hello.defaultProps = {
      color: 'blue'
    }
```

See: [defaultProps](https://reactjs.org/docs/react-component.html#defaultprops)

#### Setting default state

```text
    class Hello extends Component {
      constructor (props) {
        super(props)
        this.state = { visible: true }
      }
    }
```

Set the default state in the `constructor()`.

And without constructor using [Babel](https://babeljs.io/) with [proposal-class-fields](https://github.com/tc39/proposal-class-fields).

```text
    class Hello extends Component {
      state = { visible: true }
    }
```

See: [Setting the default state](https://reactjs.org/docs/react-without-es6.html#setting-the-initial-state)

### [\#](https://bryanguner.medium.com/media/a554d6ce459e6a031eb45921c3c5e6fd#other-components)Other components

#### Functional components

```text
    function MyComponent ({ name }) {
      return <div className='message-box'>
        Hello {name}
      </div>
    }
```

Functional components have no state. Also, their `props` are passed as the first parameter to a function.

See: [Function and Class Components](https://reactjs.org/docs/components-and-props.html#functional-and-class-components)

#### Pure components

```text
    import React, {PureComponent} from 'react'
    
    class MessageBox extends PureComponent {
      ···
    }
```

Performance-optimized version of `React.Component`. Doesn’t rerender if props/state hasn’t changed.

See: [Pure components](https://reactjs.org/docs/react-api.html#react.purecomponent)

#### Component API

```text
    this.forceUpdate()
    

    this.setState({ ... })
    this.setState(state => { ... })
    

    this.state
    this.props
```

These methods and properties are available for `Component` instances.

See: [Component API](https://facebook.github.io/react/docs/component-api.html)

### [\#](https://bryanguner.medium.com/media/a554d6ce459e6a031eb45921c3c5e6fd#lifecycle)Lifecycle

#### Mounting

| Method | Description |
| :--- | :--- |
| `constructor` _\(props\)_ | Before rendering [\#](https://reactjs.org/docs/react-component.html#constructor) |
| `componentWillMount()` | _Don’t use this_ [\#](https://reactjs.org/docs/react-component.html#componentwillmount) |
| `render()` | Render [\#](https://reactjs.org/docs/react-component.html#render) |
| `componentDidMount()` | After rendering \(DOM available\) [\#](https://reactjs.org/docs/react-component.html#componentdidmount) |
| `componentWillUnmount()` | Before DOM removal [\#](https://reactjs.org/docs/react-component.html#componentwillunmount) |
| `componentDidCatch()` | Catch errors \(16+\) [\#](https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html) |

Set initial the state on `constructor()`. Add DOM event handlers, timers \(etc\) on `componentDidMount()`, then remove them on `componentWillUnmount()`.

#### Updating

| Method | Description |
| :--- | :--- |
| `componentDidUpdate` _\(prevProps, prevState, snapshot\)_ | Use `setState()` here, but remember to compare props |
| `shouldComponentUpdate` _\(newProps, newState\)_ | Skips `render()` if returns false |
| `render()` | Render |
| `componentDidUpdate` _\(prevProps, prevState\)_ | Operate on the DOM here |

Called when parents change properties and `.setState()`. These are not called for initial renders.

See: [Component specs](https://facebook.github.io/react/docs/component-specs.html#updating-componentwillreceiveprops)

### [\#](https://bryanguner.medium.com/media/a554d6ce459e6a031eb45921c3c5e6fd#hooks-new)Hooks \(New\)

#### State Hook

```text
    import React, { useState } from 'react';
    
    function Example() {
      
      const [count, setCount] = useState(0);
    
      return (
        <div>
          <p>You clicked {count} times</p>
          <button onClick={() => setCount(count + 1)}>
            Click me
          </button>
        </div>
      );
    }
```

Hooks are a new addition in React 16.8.

See: [Hooks at a Glance](https://reactjs.org/docs/hooks-overview.html)

#### Declaring multiple state variables

```text
    function ExampleWithManyStates() {
      
      const [age, setAge] = useState(42);
      const [fruit, setFruit] = useState('banana');
      const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
      
    }
```

#### Effect hook

```text
    import React, { useState, useEffect } from 'react';
    
    function Example() {
      const [count, setCount] = useState(0);
    
      
      useEffect(() => {
        
        document.title = `You clicked ${count} times`;
      }, [count]);
    
      return (
        <div>
          <p>You clicked {count} times</p>
          <button onClick={() => setCount(count + 1)}>
            Click me
          </button>
        </div>
      );
    }
```

If you’re familiar with React class lifecycle methods, you can think of `useEffect` Hook as `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` combined.

By default, React runs the effects after every render — including the first render.

#### Building your own hooks

**Define FriendStatus**

```text
    import React, { useState, useEffect } from 'react';
    
    function FriendStatus(props) {
      const [isOnline, setIsOnline] = useState(null);
    
      useEffect(() => {
        function handleStatusChange(status) {
          setIsOnline(status.isOnline);
        }
    
        ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
        return () => {
          ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
        };
      }, [props.friend.id]);
    
      if (isOnline === null) {
        return 'Loading...';
      }
      return isOnline ? 'Online' : 'Offline';
    }
```

Effects may also optionally specify how to “clean up” after them by returning a function.

**Use FriendStatus**

```text
    function FriendStatus(props) {
      const isOnline = useFriendStatus(props.friend.id);
    
      if (isOnline === null) {
        return 'Loading...';
      }
      return isOnline ? 'Online' : 'Offline';
    }
```

See: [Building Your Own Hooks](https://reactjs.org/docs/hooks-custom.html)

#### Hooks API Reference

Also see: [Hooks FAQ](https://reactjs.org/docs/hooks-faq.html)

**Basic Hooks**

| Hook | Description |
| :--- | :--- |
| `useState`_\(initialState\)_ |  |
| `useEffect`_\(\(\) =&gt; { … }\)_ |  |
| `useContext`_\(MyContext\)_ | value returned from `React.createContext` |

Full details: [Basic Hooks](https://reactjs.org/docs/hooks-reference.html#basic-hooks)

**Additional Hooks**

| Hook | Description |
| :--- | :--- |
| `useReducer`_\(reducer, initialArg, init\)_ |  |
| `useCallback`_\(\(\) =&gt; { … }\)_ |  |
| `useMemo`_\(\(\) =&gt; { … }\)_ |  |
| `useRef`_\(initialValue\)_ |  |
| `useImperativeHandle`_\(ref, \(\) =&gt; { … }\)_ |  |
| `useLayoutEffect` | identical to `useEffect`, but it fires synchronously after all DOM mutations |
| `useDebugValue`_\(value\)_ | display a label for custom hooks in React DevTools |

Full details: [Additional Hooks](https://reactjs.org/docs/hooks-reference.html#additional-hooks)

### [\#](https://bryanguner.medium.com/media/a554d6ce459e6a031eb45921c3c5e6fd#dom-nodes)DOM nodes

#### References

```text
    class MyComponent extends Component {
      render () {
        return <div>
          <input ref={el => this.input = el} />
        </div>
      }
    
      componentDidMount () {
        this.input.focus()
      }
    }
```

Allows access to DOM nodes.

See: [Refs and the DOM](https://reactjs.org/docs/refs-and-the-dom.html)

#### DOM Events

```text
    class MyComponent extends Component {
      render () {
        <input type="text"
            value={this.state.value}
            onChange={event => this.onChange(event)} />
      }
    
      onChange (event) {
        this.setState({ value: event.target.value })
      }
    }
```

Pass functions to attributes like `onChange`.

See: [Events](https://reactjs.org/docs/events.html)

### [\#](https://bryanguner.medium.com/media/a554d6ce459e6a031eb45921c3c5e6fd#other-features)Other features

#### Transferring props

```text
    <VideoPlayer src="video.mp4" />
    

    class VideoPlayer extends Component {
      render () {
        return <VideoEmbed {...this.props} />
      }
    }
```

Propagates `src="..."` down to the sub-component.

See [Transferring props](https://facebook.github.io/react/docs/transferring-props.html)

#### Top-level API

```text
    React.createClass({ ... })
    React.isValidElement(c)
    

    ReactDOM.render(<Component />, domnode, [callback])
    ReactDOM.unmountComponentAtNode(domnode)
    

    ReactDOMServer.renderToString(<Component />)
    ReactDOMServer.renderToStaticMarkup(<Component />)
```

There are more, but these are most common.

See: [React top-level API](https://reactjs.org/docs/react-api.html)

### [\#](https://bryanguner.medium.com/media/a554d6ce459e6a031eb45921c3c5e6fd#jsx-patterns)JSX patterns

#### Style shorthand

```text
    const style = { height: 10 }
    return <div style={style}></div>
    

    return <div style={{ margin: 0, padding: 0 }}></div>
```

See: [Inline styles](https://reactjs.org/tips/inline-styles.html)

#### Inner HTML

```text
    function markdownify() { return "<p>...</p>"; }
    <div dangerouslySetInnerHTML={{__html: markdownify()}} />
```

See: [Dangerously set innerHTML](https://reactjs.org/tips/dangerously-set-inner-html.html)

#### Lists

```text
    class TodoList extends Component {
      render () {
        const { items } = this.props
    
        return <ul>
          {items.map(item =>
            <TodoItem item={item} key={item.key} />)}
        </ul>
      }
    }
```

Always supply a `key` property.

#### Conditionals

```text
    <Fragment>
      {showMyComponent
        ? <MyComponent />
        : <OtherComponent />}
    </Fragment>
```

#### Short-circuit evaluation

```text
    <Fragment>
      {showPopup && <Popup />}
      ...
    </Fragment>
```

### [\#](https://bryanguner.medium.com/media/a554d6ce459e6a031eb45921c3c5e6fd#new-features)New features

#### Returning multiple elements

You can return multiple elements as arrays or fragments.

**Arrays**

```text
    render () {
      
      return [
        <li key="A">First item</li>,
        <li key="B">Second item</li>
      ]
    }
```

**Fragments**

```text
    render () {
      
      return (
        <Fragment>
          <li>First item</li>
          <li>Second item</li>
        </Fragment>
      )
    }
```

See: [Fragments and strings](https://reactjs.org/blog/2017/09/26/react-v16.0.html#new-render-return-types-fragments-and-strings)

#### Returning strings

```text
    render() {
      return 'Look ma, no spans!';
    }
```

You can return just a string.

See: [Fragments and strings](https://reactjs.org/blog/2017/09/26/react-v16.0.html#new-render-return-types-fragments-and-strings)

#### Errors

```text
    class MyComponent extends Component {
      ···
      componentDidCatch (error, info) {
        this.setState({ error })
      }
    }
```

Catch errors via `componentDidCatch`. \(React 16+\)

See: [Error handling in React 16](https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html)

#### Portals

```text
    render () {
      return React.createPortal(
        this.props.children,
        document.getElementById('menu')
      )
    }
```

This renders `this.props.children` into any location in the DOM.

See: [Portals](https://reactjs.org/docs/portals.html)

#### Hydration

```text
    const el = document.getElementById('app')
    ReactDOM.hydrate(<App />, el)
```

Use `ReactDOM.hydrate` instead of using `ReactDOM.render` if you’re rendering over the output of [ReactDOMServer](https://reactjs.org/docs/react-dom-server.html).

See: [Hydrate](https://reactjs.org/docs/react-dom.html#hydrate)

### [\#](https://bryanguner.medium.com/media/a554d6ce459e6a031eb45921c3c5e6fd#property-validation)Property validation

#### PropTypes

```text
    import PropTypes from 'prop-types'
```

See: [Typechecking with PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html)

| Key | Description |
| :--- | :--- |
| `any` | Anything |

**Basic**

| Key | Description |
| :--- | :--- |
| `string` |  |
| `number` |  |
| `func` | Function |
| `bool` | True or false |

**Enum**

| Key | Description |
| :--- | :--- |
| `oneOf`_\(any\)_ | Enum types |
| `oneOfType`_\(type array\)_ | Union |

**Array**

| Key | Description |
| :--- | :--- |
| `array` |  |
| `arrayOf`_\(…\)_ |  |

**Object**

| Key | Description |
| :--- | :--- |
| `object` |  |
| `objectOf`_\(…\)_ | Object with values of a certain type |
| `instanceOf`_\(…\)_ | Instance of a class |
| `shape`_\(…\)_ |  |

**Elements**

| Key | Description |
| :--- | :--- |
| `element` | React element |
| `node` | DOM node |

**Required**

| Key | Description |
| :--- | :--- |
| `(···).isRequired` | Required |

#### Basic types

```text
    MyComponent.propTypes = {
      email:      PropTypes.string,
      seats:      PropTypes.number,
      callback:   PropTypes.func,
      isClosed:   PropTypes.bool,
      any:        PropTypes.any
    }
```

#### Required types

```text
    MyCo.propTypes = {
      name:  PropTypes.string.isRequired
    }
```

#### Elements

```text
    MyCo.propTypes = {
      
      element: PropTypes.element,
    
      
      node: PropTypes.node
    }
```

#### Enumerables \(oneOf\)

```text
    MyCo.propTypes = {
      direction: PropTypes.oneOf([
        'left', 'right'
      ])
    }
```

#### Arrays and objects

```text
    MyCo.propTypes = {
      list: PropTypes.array,
      ages: PropTypes.arrayOf(PropTypes.number),
      user: PropTypes.object,
      user: PropTypes.objectOf(PropTypes.number),
      message: PropTypes.instanceOf(Message)
    }
    

    MyCo.propTypes = {
      user: PropTypes.shape({
        name: PropTypes.string,
        age:  PropTypes.number
      })
    }
```

Use `.array[Of]`, `.object[Of]`, `.instanceOf`, `.shape`.

#### Custom validation

```text
    MyCo.propTypes = {
      customProp: (props, key, componentName) => {
        if (!/matchme/.test(props[key])) {
          return new Error('Validation failed!')
        }
      }
    }
```

