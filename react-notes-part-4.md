# React Notes Part 4



## Basic React Objectives

Learning React can seem daunting. The documentation available on the main site is geared toward people who have a lot of experience creating front-end applications. The basic React objectives gets you over that hump. At the end of the lessons, you should be able to:

* Explain how React uses a tree data structure called the "virtual DOM" to model the DOM
* Use `React.createElement` to create virtual DOM nodes
* Use `ReactDOM.render` to have React render your virtual DOM nodes into the actual Web page
* Use JSX to create virtual DOM nodes
* Describe how JSX transforms into `React.createElement` calls
* Use `Array#map` to create an array of virtual DOM nodes while specifying a unique key for each created virtual DOM node

## From JavaScript To DOM

The path from JavaScript to actual DOM elements appearing in your HTML document is not complex thanks to React. However, it is worth reviewing so that there is no mystery about it.

In this article, you will review how to use `React.createElement` to get what you want into React's virtual DOM so that React will convert into real DOM. There are three steps:

* Invoking `createElement` to build the "element tree"
* Invoking `render` to let React build its virtual DOM
* "Waiting" for React to convert its virtual DOM into real DOM

This article's goal is for React to create the following HTML in the DOM.

```text
<ul>
  <li class="selected">
    <a href="/pets">Pets</a>
  </li>
  <li>
    <a href="/owners">Owners</a>
  </li>
</ul>
```

### Using React

There is one method to consider when building interfaces using low-level React. From the [documentation](https://reactjs.org/docs/react-api.html#createelement), the `React.createElement` function has the following form:

```text
React.createElement(
  type,
  [props],
  [...children]
)
```

The arguments for it are

* **type**: the type of element to create, either a string for an HTML element, or a reference to a function or class that is a React component
* **props**: an object that contains data to render the element, either data to dynamically show or attributes to put on the element in the HTML
* **children**: the children of the element, as many as you want

### Creating elements

For each tag that you want to create with React, you will make a call to `React.createElement`. In the HTML above, there are five tags to create:

* One `ul` element
* Two `li` elements
* Two `a` elements

Three of those tags have attributes that you want to have appear in the DOM:

* One `li` element has a "class" attribute \(which you _must_ translate to "className" when using in React\)
* Both `a` elements have "href" attributes

Finally, there is a parent-child relationship between the elements.

* The `ul` element is the parent of both `li` elements
* Both `li` elements have a single `a` element child
* Both `a` elements have "child" text content

To summarize, here are the elements and how you would translate them to their respective arguments for `React.createElement`.

| HTML snippet | type | props | children |
| :--- | :--- | :--- | :--- |
| `<ul>...</ul>` | `'ul'` | `null` | Two calls to `React.createElement`, one for each `li` child |
| `<li class="selected">...</li>` | `'li'` | `{ className: 'selected' }` | One call to `React.createElement` for the `a` child |
| `<li>...</li>` | `'li'` | `null` | One call to `React.createElement` for the `a` child |
| `<a href="/pets">Pets</a>` | `'a'` | `{ href: '/pets' }` | The string `'Pets'` |
| `<a href="/owners">Owners</a>` | `'a'` | `{ href: '/owners' }` | The string `'Owners'` |

To create this tree of elements, you will use nested calls to `React.createElement`. The standard formatting for this is for elements to have children, put each argument on its own line, and for elements that have no children or just text content, put all arguments on a single line.

Since the `ul` has children, it will have its arguments on separate lines. Referring to the table above gives you:

```text
React.createElement(
  'ul',
  null,
  // First li child,
  // Second li child,
);
```

The first `li` element has a child. Its call to `React.createElement` will have its arguments each go on their own separate lines:

```text
React.createElement(
  'ul',
  null,
  React.createElement(
    'li',
    { className: 'selected' },
    // a child
  ),
  // Second li child,
);
```

The anchor element for "Pets" has only one text child. Its call to `React.createElement` will have its arguments on one line:

```text
React.createElement(
  'ul',
  null,
  React.createElement(
    'li',
    { className: 'selected' },
    React.createElement('a', { href: '/pets'}, 'Pets'),
  ),
  // Second li child,
);
```

The second `li` element has a child. Its call to `React.createElement` will have its arguments each go on their own separate lines:

```text
React.createElement(
  'ul',
  null,
  React.createElement(
    'li',
    { className: 'selected' },
    React.createElement('a', { href: '/pets'}, 'Pets'),
  ),
  React.createElement(
    'li',
    null,
    // a child
  ),
);
```

The other anchor element, the one for "Owners" has only one text child. Its call to `React.createElement` will have its arguments on one line:

```text
React.createElement(
  'ul',
  null,
  React.createElement(
    'li',
    { className: 'selected' },
    React.createElement('a', { href: '/pets'}, 'Pets'),
  ),
  React.createElement(
    'li',
    null,
    React.createElement('a', { href: '/owners'}, 'Owners'),
  ),
);
```

That's how you translate what you want from simple HTML into well-formatted calls to `React.createElement`. That will build the "element tree" for React to use.

### Converting to virtual DOM

To tell React to start the conversion process, you have to use the `React.render` method which takes a value returned from `React.createElement` and a DOM node in the actual document where React will insert the result of the conversion into real DOM.

If you wanted to insert what was created in the last section into the `main` tag, the most forward way of doing that is like this.

```text
// Put the element tree in a variable
const navList = React.createElement(
  'ul',
  null,
  React.createElement(
    'li',
    { className: 'selected' },
    React.createElement('a', { href: '/pets'}, 'Pets'),
  ),
  React.createElement(
    'li',
    null,
    React.createElement('a', { href: '/owners'}, 'Owners'),
  ),
);

// Get a DOM node for React to render to
const mainElement = document.querySelector('main');

// Give React the element tree and the target
ReactDOM.render(navList, mainElement);
```

At this point, you have given the element tree that you want created to React. It will then take that and construct its virtual DOM from it.

[![Convert element tree to virtual DOM](https://camo.githubusercontent.com/46fad4e7a7986e25d8b20785c6baee6d8eca7c725d4ad4f181b963c57615abcd/68747470733a2f2f61707061636164656d792d6f70656e2d6173736574732e73332d75732d776573742d312e616d617a6f6e6177732e636f6d2f4d6f64756c61722d437572726963756c756d2f636f6e74656e742f72656163742d72656475782f746f706963732f696e74726f2d746f2d72656163742f6173736574732f72656163742d6578616d706c652d636f6e76657273696f6e2d7669727475616c2d646f6d2e737667)](https://camo.githubusercontent.com/46fad4e7a7986e25d8b20785c6baee6d8eca7c725d4ad4f181b963c57615abcd/68747470733a2f2f61707061636164656d792d6f70656e2d6173736574732e73332d75732d776573742d312e616d617a6f6e6177732e636f6d2f4d6f64756c61722d437572726963756c756d2f636f6e74656e742f72656163742d72656475782f746f706963732f696e74726f2d746f2d72656163742f6173736574732f72656163742d6578616d706c652d636f6e76657273696f6e2d7669727475616c2d646f6d2e737667)

Now that it has built it's own model of the virtual DOM using the elements that you created, it can now take that and turn that into real DOM.

[![Convert virtual DOM to real DOM](https://github.com/bgoonz/React_Notes_V3/raw/master/my-other-notes-n-projects/images/react-example-conversion-real-dom.svg)](https://github.com/bgoonz/React_Notes_V3/blob/master/my-other-notes-n-projects/images/react-example-conversion-real-dom.svg)

It takes that real DOM and inserts it as the content of the target that you gave it which, in this case, is the `main` element in the body of the document.

### Updates

When you call `React.render` again for the same component and target, React takes the existing virtual DOM it knows about last time it rendered the element tree, compares it to whatever new thing you want to render, and determines which \(if any\) of the living DOM needs to change.

For example, let's say you constructed the same element tree but left off the "selected" class for the first list element. Then, when you rendered it, again, by calling `React.render`, React would compare the new element tree with the old element tree, figure out that one class was missing on that one `li` element, and remove that and only that from the real DOM.

[![Virtual DOM diff](https://github.com/bgoonz/React_Notes_V3/raw/master/my-other-notes-n-projects/images/react-example-virtual-dom-diff.svg)](https://github.com/bgoonz/React_Notes_V3/blob/master/my-other-notes-n-projects/images/react-example-virtual-dom-diff.svg)

### What you've learned

In this article, you learned

* To convert desired HTML into properly-formatted nested calls of `React.createElement`
* How React takes your element tree and builds its virtual DOM from the elements that you created
* How React takes that virtual DOM and inserts it into the living HTML document
* How React will compare an old virtual DOM tree with a new virtual DOM tree, figure out what changed, and then change that and only that in the real DOM

[Virtual DOM diff](https://github.com/bgoonz/React_Notes_V3/blob/master/my-other-notes-n-projects/images/react-example-virtual-dom-diff.svg): images/react-example-virtual-dom-diff.svgimages/react-example-virtual-dom-diff.svg orderedList=false} --&gt;

## JavaScript eXtension

Using `React.createElement` is a bore and a chore when creating React-powered applications. The developers that used React, both inside and outside of Facebook, wanted an easier way to interact with the React API and hide all of the minutiae that comes with using `React.createElement`. They invented a new language that sits on top of JavaScript called _JavaScript eXtension_, or JSX.

In this article, you will learn

* How to use JSX in your application
* The syntax of JSX, and
* How JSX transforms into `React.createElement` calls

### How to use JSX

Because browsers don't understand JSX, you have to use some tools to translate JSX into just plain old JavaScript. The main tool that you will use in almost every case is one called [Babel](https://babeljs.io/). It is a tool that can convert versions of modern JavaScript into old version of JavaScript. It can convert _future_ features of JavaScript into modern JavaScript. It can convert JSX into modern \(or old\) JavaScript.

However, using Babel by itself is like building a house with just a hammer. It'd be nice to have fancier tools to help you build that house. That's where tools like [Create React App](https://github.com/facebook/create-react-app) come into play. **Create React App** uses Babel underneath and, then, adds a whole lot more. You'll see more of \*_Create React App_ as you progress through the course.

### JSX Syntax

Here's a function-based component using `React.createElement` that has an `h1` element with the content "Hello!", a placeholder image, and a link to some search engine passed in through props.

```text
const ExampleComponent = props => React.createElement(
  React.Fragment,
  null,
  React.createElement('h1', null, 'Hello!'),
  React.createElement('img', { src: 'images/150' }),
  React.createElement('a', { href: props.searchUrl }, props.searchText),
);
```

You've likely seen that before. JSX allows you to get rid of all of the calls to `React.createElement` and replace them with almost HTML-looking tags. Here's what the above content looks like in JSX.

```text
const ExampleComponent = props =>
  <React.Fragment>
    <h1>Hello!</h1>
    <img src="images/150" />
    <a href={props.searchUrl}>{props.searchText}</a>
  </React.Fragment>
;
```

You can see Babel in action converting that JSX code above. Here's a [link to Babel](https://babeljs.io/en/repl#?babili=false&browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=DwIwrgLhD2B2AEcDCAbAlgYwNYF4DeAFAJTw4B88EAFmgM4B0tAphAMoQCGETBe86WJgBMAXJQBOYJvAC-RGWQBQ8FfAAyaQYuAB6cFDhkgA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=es2015%2Creact%2Cstage-2&prettier=false&targets=&version=7.4.3) already configured for you. Copy and paste that code above to see it transform back into `React.createElement` invocations.

#### HTML-like tags, but...

The `React.Fragment` element _contains_ the `h1`, `img`, and `a`, just like it does in the `React.createElement` version, except instead of using a method call to do it, it uses more familiar HTML-like tags. There's one super big difference between the HTML that you know and what JSX expects. Can you see it?

Look at the end of the `img` tag. See that "/" before the closing angle bracket? You _must_ include that if the tag that you're using doesn't have a close tag. If you want to use those HTML element in your JSX, then you have to put the slash. The following table shows some common tags that you'd use and their JSX equivalent.

| HTML self-closing tag | JSX equivalent |
| :--- | :--- |
| `<br>` | `<br />` |
| `<hr>` | `<hr />` |
| `<img>` | `<img />` |
| `<input>` | `<input />` |
| `<link>` | `<link />` |

#### Properties and data

When you use the low-level `React.createElement` function call, you pass the properties in as an object as the second argument. In JSX, you pass in properties as if they were attributes on the tag.

When you want to use a static value, just use a string literal like this.

```text
<img src="https://via.placeholder.com/150" />
```

becomes

```text
React.createElement(
  'img',
  { src: "https://via.placeholder.com/150" }
)
```

And, when you want to pass in some data rather than a sting literal like above, you use curly braces to turn

```text
<a href={props.searchUrl}>{props.searchText}</a>
```

into

```text
React.createElement(
  'a',
  { href: props.searchUrl },
  props.searchText
)
```

The stuff inside the curly braces is just a JavaScript expression, so you could do something like this, if you wanted, to make the search text uppercase:

```text
<a href={props.searchUrl}>
  {props.searchText.toUpperCase()}
</a>
```

#### Comments

To use comments in JSX, you use curly braces \(because that means its just a normal JavaScript expression\) and block-level JavaScript comments.

```text
<div>
  <h2>This is JSX</h2>
  {/* This is a comment in JSX */}
</div>
```

#### Property names

Please read [DOM Elements](https://reactjs.org/docs/dom-elements.html) in the React documentation to understand how property names work, as well as the special property names that React supports. You can be assessed on the following special attributes:

* `checked`
* `className`
* `dangerouslySetInnerHTML`
* `htmlFor`
* `onChange`
* `style`
* `value`

Also, you can be assessed on knowing that React uses camel-case for its attribute names so attributes like `maxlength` in HTML are `maxLength` in React.

### The JSX semicolon gotcha

You will also see code like this in other React projects, as well as in code generated by tools. It is a function-based component that uses the `function` keyword rather than an arrow function. Note the `return` statement.

```text
function App() {
  return (
    <div>
      <h1>Hello!</h1>
      <div>Welcome to JSX.</div>
    </div>
  );
}
```

You'll see that the JSX block is wrapped in parentheses. This is due to the way that JavaScript handles something called ["automatic semicolon insertion"](https://www.ecma-international.org/ecma-262/#sec-rules-of-automatic-semicolon-insertion). Here's a simple example. What do you think the function returns? \(Yes, this _is_ a "trick question".\)

```text
function sum(i, j) {
  return
    i + j;
}
```

If the answer isn't obvious, start Node on the command line, type it in exactly the way it is there, and try calling it with `sum(1, 2)`.

You may be surprised to see that it returns `undefined`. Here's why: when JavaScript reads your source code, it tries to be "helpful". When it reads the lines of your code, it asks, is each line a "complete" line? Is it and the following lines valid JavaScript expressions? If the answer is "yes", then it will add a semicolon at the end of the line _for you_. When it reads the above "sum" function, the JavaScript runner "thinks" to itself:

* Ok, I have two lines:
  * `return`
  * `i + j;`
* Are each of those valid JavaScript expressions? Yes!
* Now, I will put semicolons at the end of the lines that don't have any
  * `return;`
  * `i + j;`

Now, your function, in the eyes of JavaScript, looks like this.

```text
function sum(i, j) {
  return; // <- There's a new semicolon!
    i + j;
}
```

That function never gets to `i + j` because it always returns "no value" on the first line. Yikes!

To get around that, you can add parentheses to tell JavaScript that "more is coming".

```text
function sum(i, j) {
  return (
    i + j
  );
}
```

Now, when JavaScript reads the line `return (`, it "thinks" to itself, "Well, that's not a complete expression. There must be more coming. I will _not_ put a semicolon there."

The same is true for functions containing JSX. The above code

```text
function App() {
  return (
    <div>
      <h1>Hello!</h1>
      <div>Welcome to JSX.</div>
    </div>
  );
}
```

is equivalent to

```text
function App() {
  return (
    React.createElement(
      'div',
      null,
      React.createElement('h1', null, 'Hello!'),
      React.createElement('div', null, 'Welcome to JSX.'),
    )
  );
}
```

Without the parentheses starting right after the `return` keyword and ending after the outer call of `React.createElement`, JavaScript would just stick a semicolon after the `return` keyword and all of the fancy React stuff would get ignored.

The message is clear: if you use the `return` keyword in a function to "return some JSX", then make sure you wrap the JSX in parentheses.

### What you've learned

That's really all there is to JSX. You combine your knowledge of HTML and your knowledge of `React.createElement` to allow the Babel tool to turn your code into plain old JavaScript for you. Specifically, you have seen the following conversions:

| Conversion type | JSX | JavaScript |
| :--- | :--- | :--- |
| tags | `<h1></h1>` | `React.createElement('h1', null)` |
| attributes | `<img src="images/foo.png"/>` | `React.createElement('img', { src: "foo.png" })` |
| variables | `<h1>{message}</h1>` | `React.createElement('h1', null, message)` |

You've also read about the special property names that React supports.

Finally, you learned about the frustrating side effect of "automatic semicolon insertion" and, if you do use the `return` keyword in your functions, that you should wrap the JSX in parentheses to prevent JavaScript from _not_ returning your code.

## Walk-Through: Creating Elements In React

To start your React journey, you will build your foundational knowledge by starting out with the basic `React.createElement` and `ReactDOM.render`. One of the compelling features of this type of solution is that you do not need _any_ extra tools to get your app running in the browser. In the next walk-through, you will have to _install_ a ton of packages just to get React to properly work. This project will walk you through how to use a pure JavaScript version of React. Everything will work right out of the box.

### Getting started

Install the [React DevTools for Google Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi).

[![React DevTools for Google Chrome screenshot](https://camo.githubusercontent.com/ed6ef6e77ef9916d970667512572a0ebef83b6a4b55a1ced108f2ad3b91cb209/68747470733a2f2f61707061636164656d792d6f70656e2d6173736574732e73332d75732d776573742d312e616d617a6f6e6177732e636f6d2f4d6f64756c61722d437572726963756c756d2f636f6e74656e742f72656163742d72656475782f746f706963732f696e74726f2d746f2d72656163742f6173736574732f72656163742d646576746f6f6c732e706e67)](https://camo.githubusercontent.com/ed6ef6e77ef9916d970667512572a0ebef83b6a4b55a1ced108f2ad3b91cb209/68747470733a2f2f61707061636164656d792d6f70656e2d6173736574732e73332d75732d776573742d312e616d617a6f6e6177732e636f6d2f4d6f64756c61722d437572726963756c756d2f636f6e74656e742f72656163742d72656475782f746f706963732f696e74726f2d746f2d72656163742f6173736574732f72656163742d646576746f6f6c732e706e67)

Create a new directory to contain this new project. In that directory, create two files: an **index.html** file and an **app.js** file. In the **index.html** file, create a standard HTML 5 document. In the HTML `body` \(in this order\), create a `main` element and a `script` element for your **app.js** file with `type="module"` so you can use ES6 modules.

Serve your files with a local Python server by running the `python3 -m http.server` command in your terminal. Make sure you are running the command from within your project directory. You should be able to open [http://localhost:8000](http://localhost:8000/) to see the page, empty as it is.

### Test that things are working

Get ready! You're going to do the first React thing! You're going to create a React element that will display "Hello, programmers!". You will then have React render it to the DOM.

Copy and paste the following JavaScript code into your **app.js**, refresh your page, look at the code to get a feel for what it does, try to come up with explanations on your own, and then continue reading.

```text
import 'https://unpkg.com/react@16/umd/react.development.js';
import 'https://unpkg.com/react-dom@16/umd/react-dom.development.js';

const HelloWorld = () => React.createElement(
  'h1',
  null,
  'Hello, programmers',
);

const target = document.querySelector('main');
const app = React.createElement(HelloWorld, null);
ReactDOM.render(app, target);
```

**Note**: You may want to turn on "Disable cache" on the _Network_ tab of your DevTools and keep the DevTools open while you're doing this to make sure you always have the newest version of the files.

You should now have _Components_ and _Profiler_ tabs in your DevTools. If you click on the `HelloWorld` component in the _Components_ tab, you can see that it has no _props_. You'll learn much more about props later. For now, just remember that the React DevTools extension is a helpful tool for you to view information about your components and their props.

### Walking through the code

Even though there are only five statements in that code block, a lot is going on. This section carefully walks through each of the statements to help you get a deeper understanding.

#### Those wacky import statements

Consider those `import` statements. These differ in two ways from what you've seen with ES modules to date.

1. They come from another website altogether. When you use `import` to bring in modules from another domain, that request is governed by CORS; that means the other server _must_ have CORS configured to let you import their code. Luckily, unpkg.com configures CORS to allow any authority to import their script files.
2. They don't seem to import anything. There is no `import { React } from` there. It's just `import 'url'`. This is called a _side effect_ import and is generally frowned upon in modern Web development. But, React does not package their code in ES6 format. What those `import` statements do is _add variables in the global scope_. The two variables they add are `React` from the first import, and `ReactDOM` from the second import. Those global variables can then be used by your code, which happens with `React.createElement` and `ReactDOM.render`.

If you were going to move these into production, you would change the URLs that you import from

```text
import 'https://unpkg.com/react@16/umd/react.development.js';
import 'https://unpkg.com/react-dom@16/umd/react-dom.development.js';
```

to

```text
import 'https://unpkg.com/react@16/umd/react.production.min.js';
import 'https://unpkg.com/react-dom@16.13.1/umd/react-dom.production.min.js';
```

Those files contain the minified "production" version of the code, which is just a smaller version of the "development" versions. If you open up the links to the [react.development.js](https://unpkg.com/react@16/umd/react.development.js) and [react-production.min.js](https://unpkg.com/react@16/umd/react.production.min.js) files in your browser, you'll see JavaScript in both files. Notice how the non-minified version \([react.development.js](https://unpkg.com/react@16/umd/react.development.js)\) includes plain JavaScript you're used to seeing. The minified version simply compresses that JavaScript.

#### The odd-looking function

Turn your attention to this statement.

```text
const HelloWorld = () => React.createElement(
  'h1',
  null,
  'Hello, programmers!'
);
```

The statement declares the `HelloWorld` variable and stores a function in it. This is the way that components look in React. It is a function-based component because it's a function. It returns the value returned from `React.createElement`. If that syntax is weird, it is functionally the same as this code.

```text
const HelloWorld = () => {
  return React.createElement('h1', null, 'Hello, programmers!');
}
```

Because there are a lot of die-hard functional programmers \(as opposed to object-oriented programmers\) that like that kind of syntax \(arrow functions without curly braces that span multiple lines\), you will see it in a lot of places while learning React.

The arguments passed to `React.createElement` are:

1. What to create in the DOM.

* If it is a string, it needs to be all lowercase and the name of the HTML element to create. This example passes in `'h1'` as the tag to create in the DOM.
* Otherwise, it should be the variable that holds another component. You can see it being used that way in the later code.

1. Any properties/attributes to put on the generated element. This example passes in `null` because there are no attributes needed. You will see some, soon.
2. The child content of the element. The third \(and fourth and fifth and...\) arguments contains what React should put as the children of the content of the element. In this case, the content is `'Hello, programmers!'`.

**Important**: Every time this walk-through asks you to create a function-based component, this is what it will mostly look like. It will look like this _or_ it will look like this and have a single parameter named `props` like this.

```text
// Without the need for data
const HelloWorldNoData = () => React.createElement(
  'h1',
  null,
  'Hello, programmers!'
);

// With the need for data has the
// props parameter.
const HelloWorldWithData = props => React.createElement(
  'h1',
  null,
  'Hello, programmers!'
);
```

#### Putting it in the page

The last three statements in the code block are these.

```text
const target = document.querySelector('main');
const app = React.createElement(HelloWorld, null);
ReactDOM.render(app, target);
```

The first line is something you should be really familiar with. You are selecting the `<main>` element and referencing it as `target`.

The second line is using `React.createElement` to create an element from the `HelloWorld` function-based component discussed in the last section. It has `null` properties.

The third line _renders_ the component into the actual Web page, the component specified by the first argument, which is the one created from the `HelloWorld` component. Remember that you can open your DevTools, find the _Components_ tab, and click it to see the React DevTools show you the "HelloWorld" component rendered by React.

[![Hello programmers with dev tools](https://camo.githubusercontent.com/34c87f7d0be732eed985d8bcea1e451c873f70dce946c9a245aad1078b6e0dbc/68747470733a2f2f61707061636164656d792d6f70656e2d6173736574732e73332d75732d776573742d312e616d617a6f6e6177732e636f6d2f4d6f64756c61722d437572726963756c756d2f636f6e74656e742f72656163742d72656475782f746f706963732f696e74726f2d746f2d72656163742f6173736574732f72656163742d68656c6c6f2d70726f6772616d6d6572732d6372656174652d656c656d656e742d776974682d72656163742d746f6f6c732e706e67)](https://camo.githubusercontent.com/34c87f7d0be732eed985d8bcea1e451c873f70dce946c9a245aad1078b6e0dbc/68747470733a2f2f61707061636164656d792d6f70656e2d6173736574732e73332d75732d776573742d312e616d617a6f6e6177732e636f6d2f4d6f64756c61722d437572726963756c756d2f636f6e74656e742f72656163742d72656475782f746f706963732f696e74726f2d746f2d72656163742f6173736574732f72656163742d68656c6c6f2d70726f6772616d6d6572732d6372656174652d656c656d656e742d776974682d72656163742d746f6f6c732e706e67)

Before moving on, add some more to that, so you get a feel for how it works. Replace the content of your **app.js** with this stuff. The comments to the right of each line shows what React will do with the stuff only after you call `ReactDOM.render` with it.

> **Note:** since you have not included a CSS file to style `#nav-links` and `.is-selected` in your project, the `id` and `className` aren't actually being used for any styling purpose. The code below includes an `id` and `className` to shows an example of setting `id` and `className` with `React.createElement` and how it translates to HTML.

```text
import 'https://unpkg.com/react@16/umd/react.development.js';
import 'https://unpkg.com/react-dom@16/umd/react-dom.development.js';

const Links = () => React.createElement(
  'ul',                                  // <ul
  { id: 'nav-links' },                   //  id="nav-links">
  React.createElement(
    'li',                                // <li
    { className: 'is-selected' },        //  class="is-selected">
    React.createElement(
      'a',                               // <a
      { href: 'https://lambda-resources.netlify.app/' }, //  href="...">
      'Lambda'                      //    Lambda
    ),                                   // </a>
  ),                                     // </li>
  React.createElement(
    'li',                                // <li>
    null,
    React.createElement(
      'a',                               // <a
      { href: 'https://lambda-resources.netlify.app/' },   //  href="...">
      'Lambda Resources',                       
    ),                                   // </a>
  ),                                     // </li>
);                                       // </ul>

const HelloWorld = () => React.createElement(
  'h1',
  null,
  'Hello, programmers',
);

// Creates the HelloWorld first and, then, creates
// the Links
const AllTogether = () => React.createElement(
  'div',
  null,
  React.createElement(HelloWorld, null),
  React.createElement(Links, null),
);

const target = document.querySelector('main');
const app = React.createElement(AllTogether, null);
ReactDOM.render(app, target);
```

Look at what gets produced in the _Elements_ tab of your DevTools. Look at what gets produced in the _Components_ tab of your DevTools for all three of your components. Play around with it: change tags, replace some of those `null` second arguments with objects to see what gets presented. Give it a whirl. From this point on, you'll be working with JavaScript code known as **JSX** in your React projects. JSX is just syntactic sugar that translates to creating React element objects. Although you won't be creating full-scale projects with `React.createElement`, it's important to remember that React is actually using `React.createElement` under the hood.

## Thinking In Components

For the next couple of walk through articles, you will be reproducing a page from Petrack. Please go to [Petrack](https://polar-beach-08187.herokuapp.com/) and click around it so you can see how it works. Pay special attention to the detail page for the pets. This article will analyze it so that it can introduce you into how to "think in React".

[![Petrack pet detail page](https://camo.githubusercontent.com/516a3c3be41766740df025045e45a19a064fd638b816cb831766888afe249798/68747470733a2f2f61707061636164656d792d6f70656e2d6173736574732e73332d75732d776573742d312e616d617a6f6e6177732e636f6d2f4d6f64756c61722d437572726963756c756d2f636f6e74656e742f72656163742d72656475782f746f706963732f696e74726f2d746f2d72656163742f6173736574732f706574747261636b2d7065742d64657461696c2e706e67)](https://camo.githubusercontent.com/516a3c3be41766740df025045e45a19a064fd638b816cb831766888afe249798/68747470733a2f2f61707061636164656d792d6f70656e2d6173736574732e73332d75732d776573742d312e616d617a6f6e6177732e636f6d2f4d6f64756c61722d437572726963756c756d2f636f6e74656e742f72656163742d72656475782f746f706963732f696e74726f2d746f2d72656163742f6173736574732f706574747261636b2d7065742d64657461696c2e706e67)

When you "think in React", you are supposed to "think in components". A component in React is usually a JavaScript function or a class that returns a special React object called an "element". There is a _very_ vocal community that believes that function-based components are far superior than class-based components because they're easier to understand. You will have the opportunity to use both in this class and make up your mind which you like better.

In this article, you will gain insight into how to break a UI down into portions of functionality that React calls "components". The way this article presents the components is only one way to do it. Other developers may choose to do it differently. There is usually no wrong way to do it.

### Components

In React-speak, a "component" is a chunk of the user interface that can \(or should\) be treated as a unit because it may \(or likely will\) be used more than once or used to structure a page. That's not a very satisfying definition. This article will walk you through breaking down the page using the practical example of the Petrack pet detail page.

When you think of components, it's good to think in terms of the Single Responsibility Principle. Remember that? It's good to have a component do one thing and one thing well. In this analysis, it will identify how it fits \(or doesn't fit\) in with the Single Responsibility Principle.

If you think in terms of Pug, then a component is kind of like an `include`, a big or small amount of code that you could use over and over in your UI. The main difference is that React is _in the browser_ and handles user events and HTML generation for you so that you're not creating template strings and adding them via the `innerHTML` property or `appendChild` method. Pug is just on the server generating HTML.

### The navigation component

On all of the pages, there is the same navigation at the top of the page.

[![Petrack navigation](https://github.com/bgoonz/React_Notes_V3/raw/master/my-other-notes-n-projects/images/pettrack-pet-detail-static-content.png)](https://github.com/bgoonz/React_Notes_V3/blob/master/my-other-notes-n-projects/images/pettrack-pet-detail-static-content.png)

If you were working in Pug, that would be in your **layout.pug** because you would want it to appear in every page. In React, you will create a reusable component, maybe call it `Navigation`, and use it on all of your React-enabled pages.

This does one thing and one thing well: it shows the static content of the navigation. There's nothing else it needs to do. Good job, `Navigation` component!

What this means is that the code that will create the heading "Petrack", the links "Pets" and "Owners", and the "Back" link will all be in their own component, which is just a JavaScript function or class. It could look something like this, but with real code where it reads "some cool React code here". This is the skeleton of the code.

```text
// Navigation.js
import React from 'react';

const Navigation = props => {
  /* some cool React code here */
}

export default Navigation;
```

You would put that in a file named **Navigation.js**. It's capitalized because, in React world, the names of your custom components are _always_ capitalized.

Don't worry if that doesn't make complete sense, yet. You will be making these components and their files _for the rest of your lives_. Or, at least, for the rest of this course. And, definitely, for the remainder of this module.

The walk through articles that follow this will explain what's going on as well as what that `props` parameter is.

### The details components

Now, for the remainder of the page.

[![Petrack detail](https://github.com/bgoonz/React_Notes_V3/raw/master/my-other-notes-n-projects/images/pettrack-pet-detail-component.png)](https://github.com/bgoonz/React_Notes_V3/blob/master/my-other-notes-n-projects/images/pettrack-pet-detail-component.png)

This could be another component. It would create the "Details" headline, show the individual details of the pet, create the "Owners" headline, and then create the links to the owners. It could look something like this.

```text
// PetDetail.js
import React from 'react';

const PetDetail = props => {
  /* some cool React code here */
}

export default PetDetail;
```

This component, the `PetDetail` component, does too much. It's in charge of showing two different kinds of information, the details of the pet _and_ the owners links. That means there's probably an opportunity to create more components that this component can then use. This is called _component composition_.

#### Breaking it down further

Now, please think like a Pug developer for just a moment. How would you create this page in Pug? The code for this from the project looks like this.

```text
extends ../layout

block content
  h1 Details
  dl
    dt Name
    dd= pet.name
    dt Age
    dd= pet.age
    dt Type
    dd= pet.PetType.type

  h2 Owners
  ul
    each owner in pet.Owners
      li: a(href="/owners/" + owner.id) #{owner.lastName}, #{owner.firstName}
```

To start thinking in components, ask yourself

* What parts of that page are repeated?
* What parts have the same structure?

You can see that in the _Details_ section of the page, there are repeated structures of `dt` and `dd` elements. You can see in the _Owners_ section, there is a loop that creates a link to the owners based on the owner information. Those types of reusable chunks of content are good candidates for being their own components.

#### The pet information item component

You can extract the creation of the `dt` and `dd` elements into its own component.

[![Petrack pet information item](https://github.com/bgoonz/React_Notes_V3/raw/master/my-other-notes-n-projects/images/pettrack-pet-detail-information-item-component.png)](https://github.com/bgoonz/React_Notes_V3/blob/master/my-other-notes-n-projects/images/pettrack-pet-detail-information-item-component.png)

That could look something like this.

```text
// PetInformationItem.js
import React from 'react';

const PetInformationItem = props => {
  /* some cool React code here */
}

export default PetInformationItem;
```

It would be responsible for making that portion of the Web page appear. And, you would use it over and over for each of the different pieces of data you wanted to show. As you add more data about pets, you could use that `PetInformationItem` to maintain the visual consistency of the Web page, as well as allowing you to write less code. This component does one thing and does it well.

#### The owner link component

Just like extracting the pet information item, you can extract that owner link into its own component. It would generate the the `a` and format the person's name.

[![Petrack owner link](https://github.com/bgoonz/React_Notes_V3/raw/master/my-other-notes-n-projects/images/pettrack-pet-detail-owner-link-component.png)](https://github.com/bgoonz/React_Notes_V3/blob/master/my-other-notes-n-projects/images/pettrack-pet-detail-owner-link-component.png)

Again, the skeleton code would look something like this.

```text
// OwnerLink.js
import React from 'react';

const OwnerLink = props => {
  /* some cool React code here */
}

export default OwnerLink;
```

This component also does one thing and does it well. If you ever need to change the way owner names appear in lists of links in the application, you can come to this one component and change it. It would then take effect everywhere! Single Responsibility Principle for the win!

#### The owners list component

Now, the thing that manages the list itself and the use of the `OwnerLink` component is eligible for being its own component, too.

[![Petrack owners list](https://github.com/bgoonz/React_Notes_V3/raw/master/my-other-notes-n-projects/images/pettrack-pet-detail-owners-list-component.png)](https://github.com/bgoonz/React_Notes_V3/blob/master/my-other-notes-n-projects/images/pettrack-pet-detail-owners-list-component.png)

It's single responsibility is to manage creating the "Owners" header and the unordered list. It will use the `OwnerLink` component to do that! Again, this is called _component composition_.

```text
// OwnersList.js
import OwnerLink from './OwnerLink';
import React from 'react';

const OwnersList = props => {
  /* some cool React code here */

  /**
   * Use the OwnerLink component, too!
   */
}

export default OwnersList;
```

#### Putting the list and details together

If you create the `PetInformationItem` and the `OwnerLink` component, then you will want to use them in your `PetDetail` component. That is as easy as using the `import` statement to allow them to be used by that code.

```text
// PetDetail.js
import OwnersList from './OwnersList';
import PetInformationItem from './PetInformationItem';
import React from 'react';

const PetDetail = props => {
  /* some cool React code here */

  /**
   * Use the OwnersList and PetInformationItem
   * components, too!
   */
}

export default PetDetail;
```

### Putting it all together

Once you have all of those components, you would create one more component, the top-level "page" component, that would render the `Navigation` and `PetDetail` components.

```text
// PetDetailPage.js
import Navigation from './Navigation';
import PetDetail from './PetDetail';
import React from 'react';

const PetDetailPage = props => {
  /* some cool React code here */

  /**
   * Use the Navigation and PetDetail
   * components, too!
   */
}

export default PetDetailPage;
```

The final analysis in this breakdown of "components" to "think in React" looks like this.

[![Petrack final analysis](https://github.com/bgoonz/React_Notes_V3/raw/master/my-other-notes-n-projects/images/pettrack-pet-detail-all-components.png)](https://github.com/bgoonz/React_Notes_V3/blob/master/my-other-notes-n-projects/images/pettrack-pet-detail-all-components.png)

You can see each of the components that were described in this article. You can also see how the `PetInformationItem` and `OwnerLink` components get used multiple times on the page.

### There is probably more

Take a look at this, again, and think about if there is any "missing" component before continuing.

[![Petrack final analysis](https://github.com/bgoonz/React_Notes_V3/raw/master/my-other-notes-n-projects/images/pettrack-pet-detail-all-components.png)](https://github.com/bgoonz/React_Notes_V3/blob/master/my-other-notes-n-projects/images/pettrack-pet-detail-all-components.png)

You could also create a `PetDetailList` component, if you want, that would manage the "Details" header and the definition list. That would reflect the same structure that the `OwnersList` has, a component responsible for generating a header and a list. In the following walk through articles, the `PetDetailList` component will also be included in the development.

### What you've seen

This is thinking in React. Looking at a Web page and deciding what parts of it belong in sections, what parts are repeated, and how to group them all together. The React documentation calls this [breaking the UI into a component hierarchy](https://reactjs.org/docs/thinking-in-react.html#step-1-break-the-ui-into-a-component-hierarchy). That link is to a section in the React documentation entitled _Thinking in React_. That section performs the same exercise that this article performed, but with a lot fewer words and pictures.

In the upcoming exercises, you will create these components in a couple of ways. The first way is the hard way, but shows you how React works under the covers. The second way uses the fancy JSX language to make it easier for you.

## JSX Walk-Through: Navigation Component

You will now work on creating the PetTrack page.

* `PetDetailPage`: Created in this step
* `Navigation`: Created in this step
* `PetDetails`
* `PetDetailList`
* `PetInformationItem`
* `OwnersList`
* `OwnerLink`

[![Petrack component analysis](https://github.com/bgoonz/React_Notes_V3/raw/master/my-other-notes-n-projects/images/pettrack-pet-detail-all-components-with-details-list.png)](https://github.com/bgoonz/React_Notes_V3/blob/master/my-other-notes-n-projects/images/pettrack-pet-detail-all-components-with-details-list.png)

### The strategy

This guide will work top-down, in that it will start with the top-most \(or outer-most\) component, the `PetDetailPage` component. Then, it will move to a next level component, like `Navigation`. It will just keep adding components and getting them to work with the data from the AJAX call.

### The pet detail page component

The `PetDetailPage` component will be responsible for showing the navigation component, the details list component, and the owners list component. None of those exist, yet, so just stub out a new component to hold the source.

Create a new file named **PetDetailPage.js** in the **src** directory. In that file, type this content into it.

```text
import React from 'react';

const PetDetailPage = () =>
  <div>PetDetailPage component</div> // Temporary so it builds
;

export default PetDetailPage;
```

Here's some analysis.

#### The import statement

You will notice that the top of the file imports the `React` object, but you do not use it anywhere in the file! You have to do this because, remember, each JSX element, like `<header>...</header>`, ends up getting translated to `React.createElement` calls. Without the `import` statement, the `React` object would not exist and compiling would fail.

#### The component

The `const PetDetailPage = () => ...` is just a normal arrow function.

The body of the component is a JSX expression `<div></div>` which Babel will translate into an invocation of `React.createElement`. Here's what it looks like after passing through Babel.

```text
var PetDetailPage = function PetDetailPage() {
  return React.createElement("div", null, "PetDetailPage component");
} // Temporary so it builds
;
```

#### The export statement

This is just so you can import it into other components for use, which you will do now.

### Using the pet detail page component

Open up **src/App.js**. Import the newly-created `PetDetailPage` component. Remember that this is Webpack that's doing this for you, so you _do not_ need to put the **.js** extension on the name of the module that you import.

Replace the `<h1>Hello</h1>` with `<PetDetailPage></PetDetailPage>`. Save all of your files. You should now see this content in your browser and _Components_ tab.

[![Petrack with default PetDetailPage](https://github.com/bgoonz/React_Notes_V3/raw/master/my-other-notes-n-projects/images/create-react-app-with-default-pet-detail-page.png)](https://github.com/bgoonz/React_Notes_V3/blob/master/my-other-notes-n-projects/images/create-react-app-with-default-pet-detail-page.png)

The content of the **src/App.js** should look similar to this.

```text
import React from 'react';

import PetDetailPage from './PetDetailPage';

function App() {
  return (
    <PetDetailPage></PetDetailPage>
  );
}

export default App;
```

Since `PetDetailPage` has no child content, you could also write that code like this, with the ending slash.

```text
import React from 'react';

import PetDetailPage from './PetDetailPage';

function App() {
  return (
    <PetDetailPage />
  );
}

export default App;
```

### The navigation component

Create a new file named **Navigation.js** in the **src** directory of your application. Put this content in there. Please type it rather than copy and paste it.

```text
import React from 'react';

const Navigation = () =>
  <header>
    <h1>Petrack</h1>
    <nav>
      <ul>
        <li>
          <a href="/pets">Pets</a>
        </li>
        <li>
          <a href="/owners">Owners</a>
        </li>
      </ul>
    </nav>
  </header>
;

export default Navigation;
```

All of the JSX, the html-looking tags, those get converted into the calls to `React.createElement`. When Babel gets done with it, it looks like this, which is just an ugly version of one call to `React.createElement` for each of the elements in the JSX.

```text
var Navigation = function Navigation() {
  return React.createElement("header", null, React.createElement("h1", null, "Petrack"), React.createElement("nav", null, React.createElement("ul", null, React.createElement("li", null, React.createElement("a", {
    href: "/pets"
  }, "Pets")), React.createElement("li", null, React.createElement("a", {
    href: "/owners"
  }, "Owners")))));
};
```

### Using the navigation component

Back in the **src/PetDetailPage.js** file, import the `Navigation` component and replace the `<div>PetDetailPage component</div>` with the `Navigation` component much like you did in the `App` component with `PetDetailPage`.

Once you save your files, you should see the navigation.

[![PetDetailPage navigation complete](https://github.com/bgoonz/React_Notes_V3/raw/master/my-other-notes-n-projects/images/react-pet-detail-page-nav-complete.png)](https://github.com/bgoonz/React_Notes_V3/blob/master/my-other-notes-n-projects/images/react-pet-detail-page-nav-complete.png)

### What just happened?

You created two new components and added them to the **src** directory. You imported them so that other components could use them. It was fast and easy and \(hopefully\) painless. JSX is lovely to work with, far easier than the calls to `React.createElement` if that didn't exist.

[Petrack with default PetDetailPage](https://github.com/bgoonz/React_Notes_V3/blob/master/my-other-notes-n-projects/images/create-react-app-with-default-pet-detail-page.png): images/create-react-app-with-default-pet-detail-page.pngimages/create-react-app-with-default-pet-detail-page.png6 orderedList=false} --&gt;

You will now work on creating the PetTrack page.

* `PetDetailPage`: Created in this step
* `Navigation`: Created in this step
* `PetDetails`
* `PetDetailList`
* `PetInformationItem`
* `OwnersList`
* `OwnerLink`

[![Petrack component analysis](https://github.com/bgoonz/React_Notes_V3/raw/master/my-other-notes-n-projects/images/pettrack-pet-detail-all-components-with-details-list.png)](https://github.com/bgoonz/React_Notes_V3/blob/master/my-other-notes-n-projects/images/pettrack-pet-detail-all-components-with-details-list.png)

### The strategy

This guide will work top-down, in that it will start with the top-most \(or outer-most\) component, the `PetDetailPage` component. Then, it will move to a next level component, like `Navigation`. It will just keep adding components and getting them to work with the data from the AJAX call.

### The pet detail page component

The `PetDetailPage` component will be responsible for showing the navigation component, the details list component, and the owners list component. None of those exist, yet, so just stub out a new component to hold the source.

Create a new file named **PetDetailPage.js** in the **src** directory. In that file, type this content into it.

```text
import React from 'react';

const PetDetailPage = () =>
  <div>PetDetailPage component</div> // Temporary so it builds
;

export default PetDetailPage;
```

Here's some analysis.

#### The import statement

You will notice that the top of the file imports the `React` object, but you do not use it anywhere in the file! You have to do this because, remember, each JSX element, like `<header>...</header>`, ends up getting translated to `React.createElement` calls. Without the `import` statement, the `React` object would not exist and compiling would fail.

#### The component

The `const PetDetailPage = () => ...` is just a normal arrow function.

The body of the component is a JSX expression `<div></div>` which Babel will translate into an invocation of `React.createElement`. Here's what it looks like after passing through Babel.

```text
var PetDetailPage = function PetDetailPage() {
  return React.createElement("div", null, "PetDetailPage component");
} // Temporary so it builds
;
```

#### The export statement

This is just so you can import it into other components for use, which you will do now.

### Using the pet detail page component

Open up **src/App.js**. Import the newly-created `PetDetailPage` component. Remember that this is Webpack that's doing this for you, so you _do not_ need to put the **.js** extension on the name of the module that you import.

Replace the `<h1>Hello</h1>` with `<PetDetailPage></PetDetailPage>`. Save all of your files. You should now see this content in your browser and _Components_ tab.

[![Petrack with default PetDetailPage](https://github.com/bgoonz/React_Notes_V3/raw/master/my-other-notes-n-projects/images/create-react-app-with-default-pet-detail-page.png)](https://github.com/bgoonz/React_Notes_V3/blob/master/my-other-notes-n-projects/images/create-react-app-with-default-pet-detail-page.png)

The content of the **src/App.js** should look similar to this.

```text
import React from 'react';

import PetDetailPage from './PetDetailPage';

function App() {
  return (
    <PetDetailPage></PetDetailPage>
  );
}

export default App;
```

Since `PetDetailPage` has no child content, you could also write that code like this, with the ending slash.

```text
import React from 'react';

import PetDetailPage from './PetDetailPage';

function App() {
  return (
    <PetDetailPage />
  );
}

export default App;
```

### The navigation component

Create a new file named **Navigation.js** in the **src** directory of your application. Put this content in there. Please type it rather than copy and paste it.

```text
import React from 'react';

const Navigation = () =>
  <header>
    <h1>Petrack</h1>
    <nav>
      <ul>
        <li>
          <a href="/pets">Pets</a>
        </li>
        <li>
          <a href="/owners">Owners</a>
        </li>
      </ul>
    </nav>
  </header>
;

export default Navigation;
```

All of the JSX, the html-looking tags, those get converted into the calls to `React.createElement`. When Babel gets done with it, it looks like this, which is just an ugly version of one call to `React.createElement` for each of the elements in the JSX.

```text
var Navigation = function Navigation() {
  return React.createElement("header", null, React.createElement("h1", null, "Petrack"), React.createElement("nav", null, React.createElement("ul", null, React.createElement("li", null, React.createElement("a", {
    href: "/pets"
  }, "Pets")), React.createElement("li", null, React.createElement("a", {
    href: "/owners"
  }, "Owners")))));
};
```

### Using the navigation component

Back in the **src/PetDetailPage.js** file, import the `Navigation` component and replace the `<div>PetDetailPage component</div>` with the `Navigation` component much like you did in the `App` component with `PetDetailPage`.

Once you save your files, you should see the navigation.

[![PetDetailPage navigation complete](https://github.com/bgoonz/React_Notes_V3/raw/master/my-other-notes-n-projects/images/react-pet-detail-page-nav-complete.png)](https://github.com/bgoonz/React_Notes_V3/blob/master/my-other-notes-n-projects/images/react-pet-detail-page-nav-complete.png)

### What just happened?

You created two new components and added them to the **src** directory. You imported them so that other components could use them. It was fast and easy and \(hopefully\) painless. JSX is lovely to work with, far easier than the calls to `React.createElement` if that didn't exist.

## JSX Walk-Through: Pet Details, Part 1

You will now start adding data rendering to the page with the components created and modified in this step.

* `PetDetailPage`: Modified in this step
* `Navigation`: Done
* `PetDetails`: Created in this step
* `PetDetailList`: Created in this step
* `PetInformationItem`: Created in this step
* `OwnersList`
* `OwnerLink`

[![Petrack component analysis](https://github.com/bgoonz/React_Notes_V3/raw/master/my-other-notes-n-projects/images/pettrack-pet-detail-all-components-with-details-list.png)](https://github.com/bgoonz/React_Notes_V3/blob/master/my-other-notes-n-projects/images/pettrack-pet-detail-all-components-with-details-list.png)

### Getting some data

Open the **src/index.js** file. In it, after the call to `ReactDOM.render`, create a fetch call for the RESTful endpoint [https://polar-beach-08187.herokuapp.com/api/pets/2](https://polar-beach-08187.herokuapp.com/api/pets/2). \(You can click on the link to see the data. That's "Mog", the cat. She is forgetful.\) Do all of the normal stuff that you would do with `async` functions and what not.

```text
(async () => {
  const url = 'https://polar-beach-08187.herokuapp.com/api/pets/2';
  const response = await fetch(url);
  if (response.ok) {
    const pet = await response.json();
    console.log(pet);
  }
})();
```

[![Petrack Mog data fetch](https://github.com/bgoonz/React_Notes_V3/raw/master/my-other-notes-n-projects/images/react-mog-data-pull.png)](https://github.com/bgoonz/React_Notes_V3/blob/master/my-other-notes-n-projects/images/react-mog-data-pull.png)

Now, to pass that data into your React components, you will pass it as a property. You have to pass it on the element getting rendered. React is all about rendering things. You can just call another render from inside your `async` function. But, this time, you will pass the pet data in as an attribute of the `App` component with curly braces to indicate to JSX that it is a data value and not a string.

```text
(async () => {
  const url = 'https://polar-beach-08187.herokuapp.com/api/pets/2';
  const response = await fetch(url);
  if (response.ok) {
    const pet = await response.json();
    console.log(pet);

    ReactDOM.render(
      <React.StrictMode>
        <App pet={pet} />   {/* Now, with data */}
      </React.StrictMode>,
      document.getElementById('root')
    );
  }
})();
```

This has changed everything! You don't see it, yet, but once the AJAX call completes, go look at the _Components_ tab of your DevTools. Click on the `App` component and look at the values in the right pane. React now knows about the data that you passed in!

Now, you need to pass that to the `PetDetailPage` component. In the **src/App.js** file, change the function's parameter list to have a single parameter named "props". Then, pass the value of `props.pet` into the pet attribute of the `PetDetailPage` component, similar to what you did in **src/index.js** for the `App` component. You should be able to see the props in the _Components_ tab for both the `App` and `PetDetailPage` components.

[![Data passed down to PetDetailPage](https://camo.githubusercontent.com/8cc6113ce88eebafd0e9beb8407ef4d7b1e1bd8752dcc76958e2b14b1cc0df68/68747470733a2f2f61707061636164656d792d6f70656e2d6173736574732e73332d75732d776573742d312e616d617a6f6e6177732e636f6d2f4d6f64756c61722d437572726963756c756d2f636f6e74656e742f72656163742d72656475782f746f706963732f696e74726f2d746f2d72656163742f6173736574732f6372656174652d72656163742d6170702d70617373696e672d646174612d696e746f2d7065742d64657461696c2d706167652e676966)](https://camo.githubusercontent.com/8cc6113ce88eebafd0e9beb8407ef4d7b1e1bd8752dcc76958e2b14b1cc0df68/68747470733a2f2f61707061636164656d792d6f70656e2d6173736574732e73332d75732d776573742d312e616d617a6f6e6177732e636f6d2f4d6f64756c61722d437572726963756c756d2f636f6e74656e742f72656163742d72656475782f746f706963732f696e74726f2d746f2d72656163742f6173736574732f6372656174652d72656163742d6170702d70617373696e672d646174612d696e746f2d7065742d64657461696c2d706167652e676966)

You will use that data to pass down into the detail components that you will now create.

### The pet details component

**Note**: This section introduces an error that you will fix. It is a common error, so knowing how to fix it when you see it is good information to have.

The `PetDetails` component is in charge of rendering the `PetDetailList` and the `OwnersList` components. For now, get a new component working.

Create a new file named **src/PetDetails.js**. Import the `React` object. Create a function-based `PetDetails` component that has a `props` parameter, and have it render an empty `div`. Export the component as the default export for the module.

In the **PetDetailPage.js** file, import the new `PetDetails` component. Change the `PetDetailPage` component to accept a `props` parameter rather then an empty parameter list. Then, use the `PetDetails` component in the body of the `PetDetailPage` as a sibling to the `Navigation` component. You need to pass the pet data into it. Your code should look like this. \(You may have empty tags rather than the self-closing slash tags. That's fine.\)

```text
import React from 'react';

import Navigation from './Navigation';
import PetDetails from './PetDetails';

const PetDetailPage = props =>
  <Navigation />
  <PetDetails pet={props.pet} />
;

export default PetDetailPage;
```

Save all of your files. Look at your browser. There is an error.

[![PetDetailPage with adjacent element error](https://github.com/bgoonz/React_Notes_V3/raw/master/my-other-notes-n-projects/images/create-react-app-pet-detail-page-without-single-root-error.png)](https://github.com/bgoonz/React_Notes_V3/blob/master/my-other-notes-n-projects/images/create-react-app-pet-detail-page-without-single-root-error.png)

This happens because components _must_ have a single top-level element. You can see that `PetDetailPage` now has two because both `Navigation` and `PetDetails` are at the top level.

To solve this, you need the two elements in a single element. You could do that with a `div`, for example.

```text
const PetDetailPage = props =>
  <div>
    <Navigation />
    <PetDetails pet={props.pet} />
  </div>
;
```

This is fine, except for when you don't want to introduce extra tags for no reason in your HTML. That is why, in React 16, the developers introduced the idea of a `Fragment`. The `Fragment` is a special placeholder that groups together JSX elements in the virtual DOM, but does not creating any tags in the real DOM. You can wrap those two elements \(or any number of elements\) in a `React.Fragment` JSX element like this.

```text
const PetDetailPage = props =>
  <React.Fragment>
    <Navigation />
    <PetDetails pet={props.pet} />
  </React.Fragment>
;
```

If you do that and save the file, the compile error goes away and you see the content as it should be.

Wrapping things in `Fragment` elements like that is such a common thing, that there is a shortcut syntax for it. Since the `Fragment` does not represent any real tag, you write it like an HTML tag that _has no name_.

```text
const PetDetailPage = props =>
  <>
    <Navigation />
    <PetDetails pet={props.pet} />
  </>
;
```

It's pretty weird. But, it's a very _React_ way of doing things.

### Create the pet detail list component

Here's some code for you that you can use for your `PetDetailList` component. Create a file named **src/PetDetailList.js** and put it in there. Feel free to copy and paste it so that you can get on to the neat-o data stuff.

```text
import React from 'react';

const PetDetailList = props =>
  <>
    <h2>Details</h2>
    <dl>

    </dl>
  </>
;

export default PetDetailList;
```

Back in **PetDetails.js**, import this new `PetDetailList` component, and replace the empty `div` with it.

```text
// Add the import line
import PetDetailList from './PetDetailList.js';

const PetDetails = props =>
  <PetDetailList pet={props.pet} />
;

export default PetDetails;
```

Refresh your page. You should now see the `PetDetailList` in the _Components_ tab. It's props should have all of data for the pet on it. You should also see the "Details" headline in the rendered HTML, too.

The next step is to create the `PetInformationItem` component to fill out that `dl` just yearning for content in the `PetDetailList` component.

### The pet information item component

**Note**: The following steps will introduce an error that you will fix. This is so you can get a feel for what kind of errors you will see when working with React.

**Mira's Note**: The following will not actually introduce an error for the reason provided, because there is no missing pass-down of props in the chain of nested components if you follow the instructions. The error described after it, however, will show.

Create a new file, **src/PetInformationItem.js**. It will contain a function-based component that needs data to render, so stub out the function with the "props" parameter. Don't forget to import the React. Then, it needs to render two elements, the `dt` element and the `dd` element. Do that by wrapping a fragment around them.

```text
<dt>Name of property</dt>
<dd>Value of property</dd>
```

So, the code will look something like this.

```text
import React from 'react';

const PetInformationItem = props =>
  <>
    <dt>{props.name}</dt>
    {/* Replace this with the dd element and value */}
  </>
;

export default PetInformationItem;
```

Replace the comment with a `dd` JSX element that has `props.value` as its content, similar to how the `dt` has `props.name` as its content.

That implies an expectation that this component _needs_ a property named "name" that will be used to render the `dt` element, and it _needs_ a property named "value" to render the `dd` element.

Once you have that done, it's time to use it in the `PetDetailList` components. Go back to **src/PetDetailList.js**. Import the `PetInformationItem` component. You will use it three times, to show the name, age, and pet type of the pet. Here's the first one. Just put it in there and save it because you have to investigate an error.

```text
const PetDetailList = props =>
  <>
    <h2>Details</h2>
    <dl>
      <PetInformationItem name="Name" value={props.pet.name}/>
    </dl>
  </>
;
```

This shows that `PetDetailList` now has an expectation that `props` will have a "name" property, an "age" property, and a "PetType" property that will have a "type" property on it! That's a lot of expectations...

If you refresh your page, an error might occur.

[![Petrack PetDetails with error](https://github.com/bgoonz/React_Notes_V3/raw/master/my-other-notes-n-projects/images/create-react-app-with-property-error.png)](https://github.com/bgoonz/React_Notes_V3/blob/master/my-other-notes-n-projects/images/create-react-app-with-property-error.png)

The _Create React App_ reports the error for you in the browser's main window. This is nice so that you don't have to go mucking about the console to try to determine what went wrong.

In the above screen shot, it complains that it cannot get the "property 'name' of undefined". If you get this error, make sure you are passing down the `pet` prop from the `App` component all the way down to the `PetDetailList` component. You can see all the props for each component in the Chrome dev tools Component tab.

The following conditions trigger that same error but for a different reason.

In the `src/index.js` file, you render `App` twice. Once before the fetch call, and once after the fetch response comes back. **NOTE: This is NOT the normal way to render the App after a fetch call. You will be learning a better way to use fetch calls with React tomorrow.**

Your `src/index.js` should now look like this:

```text
// ... imports
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

(async () => {
  const url = 'https://polar-beach-08187.herokuapp.com/api/pets/2';
  const response = await fetch(url);
  if (response.ok) {
    const pet = await response.json();
    ReactDOM.render(
      <React.StrictMode>
        <App pet={pet} />   {/* Now, with data */}
      </React.StrictMode>,
      document.getElementById('root')
    );
  }
})();
```

If you refresh your page, you should see the following error.

[![Petrack PetDetails with error](https://github.com/bgoonz/React_Notes_V3/raw/master/my-other-notes-n-projects/images/create-react-app-with-property-error.png)](https://github.com/bgoonz/React_Notes_V3/blob/master/my-other-notes-n-projects/images/create-react-app-with-property-error.png)

Can you see where that's happening in the **PetDetailList.js** file? Take a moment to figure out where the error is being thrown.

If you identified the expression `props.pet.name`, then you got it! Remember that when the React first renders the virtual DOM, it has _no data_. That doesn't come until later, after the AJAX call completes. There are _so many_ ways to fix this but **only one** is idiomatic React. That is the use of `defaultProps`.

Recall that the `PetDetailList` component has an expectation that the `props` value should have a "pet" property that is an object. You can specify a default value for the "pet" property for the `PetDetails` component by putting the following code _after_ the function declaration.

```text
PetDetailList.defaultProps = {
  pet: {},
};
```

This tells React that, when the `PetDetailList` renders, if the "pet" property of `props` is undefined, then it should use the default value specified in the assignment. This is a built-in React feature and fixes the problem.

Refresh the page. You should now see the page render and, when the AJAX call completes, the name "Mog" to appear.

Now, add the other two `PetInformationItem` calls. One should have the name "Age" and the value of `props.pet.age`. The second should have the name "Type" and the value of `props.pet.PetType.type`. That will cause another error, so take care of it in the `defaultProps`.

[![Petrack PetDetails before and after load](https://camo.githubusercontent.com/17ec7caf469354066cbc253ee3f9440fd721d1a0d386a8111de29765ed8fa7c2/68747470733a2f2f61707061636164656d792d6f70656e2d6173736574732e73332d75732d776573742d312e616d617a6f6e6177732e636f6d2f4d6f64756c61722d437572726963756c756d2f636f6e74656e742f72656163742d72656475782f746f706963732f696e74726f2d746f2d72656163742f6173736574732f72656163742d696e666f726d6174696f6e2d646174612d6c6f61642e676966)](https://camo.githubusercontent.com/17ec7caf469354066cbc253ee3f9440fd721d1a0d386a8111de29765ed8fa7c2/68747470733a2f2f61707061636164656d792d6f70656e2d6173736574732e73332d75732d776573742d312e616d617a6f6e6177732e636f6d2f4d6f64756c61722d437572726963756c756d2f636f6e74656e742f72656163742d72656475782f746f706963732f696e74726f2d746f2d72656163742f6173736574732f72656163742d696e666f726d6174696f6e2d646174612d6c6f61642e676966)

If it's hard to see the before load, comment out the async function in the `src/index.js` to see what the page looks like before the fetch call is made.

```text
// ... src/index.js

// (async () => {
//   const url = 'https://polar-beach-08187.herokuapp.com/api/pets/2';
//   const response = await fetch(url);
//   if (response.ok) {
//     const pet = await response.json();
//     ReactDOM.render(
//       <React.StrictMode>
//         <App pet={pet} />   {/* Now, with data */}
//       </React.StrictMode>,
//       document.getElementById('root')
//     );
//   }
// })();
```

If you want that yucky bumpy load to not happen, consider creating a default value for the "value" property in `PetInformationItem`. In the following screenshot, you can see what happens when you set a default value of "loading..." for the "value" property in `PetInformationItem`.

[![Petrack PetDetails with loading message](https://camo.githubusercontent.com/dcd0fcc5e6fcdb05d7992173a8064922d0076072d81f1d5dd9bbb601d076978f/68747470733a2f2f61707061636164656d792d6f70656e2d6173736574732e73332d75732d776573742d312e616d617a6f6e6177732e636f6d2f4d6f64756c61722d437572726963756c756d2f636f6e74656e742f72656163742d72656475782f746f706963732f696e74726f2d746f2d72656163742f6173736574732f72656163742d696e666f726d6174696f6e2d776974682d6c6f6164696e672d6d6573736167652d646174612d6c6f61642e676966)](https://camo.githubusercontent.com/dcd0fcc5e6fcdb05d7992173a8064922d0076072d81f1d5dd9bbb601d076978f/68747470733a2f2f61707061636164656d792d6f70656e2d6173736574732e73332d75732d776573742d312e616d617a6f6e6177732e636f6d2f4d6f64756c61722d437572726963756c756d2f636f6e74656e742f72656163742d72656475782f746f706963732f696e74726f2d746f2d72656163742f6173736574732f72656163742d696e666f726d6174696f6e2d776974682d6c6f6164696e672d6d6573736167652d646174612d6c6f61642e676966)

### What you've seen

In this part of building a React application, you have

* Passed data from an AJAX call \(or really wherever\) into a React component
* Accessed data using the conventionally-named `props` parameter in your function-based components
* Passed data from a "parent" component to a "child" component
* Used default values to prevent errors and improve the aesthetic experience of using your application

Just one more step and you're done!

## JSX Walk-Through: Pet Details, Part 2

All you have left is to create a list of owners with links.

* `PetDetailPage`: Done
* `Navigation`: Done
* `PetDetails`: Modified in this step
* `PetDetailList`: Done
* `PetInformationItem`: Done
* `OwnersList`: Created in this step
* `OwnerLink`Created in this step

[![Petrack component analysis](https://github.com/bgoonz/React_Notes_V3/raw/master/my-other-notes-n-projects/images/pettrack-pet-detail-all-components-with-details-list.png)](https://github.com/bgoonz/React_Notes_V3/blob/master/my-other-notes-n-projects/images/pettrack-pet-detail-all-components-with-details-list.png)

You're almost done. Now, you get to handle a collection of data from the owners.

### Stub out the owners list component

You've done this four other times, so it's pretty straight forward.

* Create the **src/OwnersList.js** file. In it,
  * Import the React object
  * Create the function-based component named `OwnersList` with a `props` argument that uses a `React.Fragment` as its element
  * Add a child that is an 'h2' with the content "Owners"
  * Using `defaultProps`, add a default property value for "owners" and set it to an empty array because this component will expect an array of owner data
  * Export the `OwnersList` as the default export
* In the **PetDetails.js** file,
  * Import the `OwnersList` component
  * Add it as another child element of the `PetDetailPage` component after the `PetDetailList`
  * Wrap both the `PetDetailList` and `OwnersList` in a `Fragment`.
  * Pass in the owners to the `OwnersList` component in a property named "owners" like this `{props.pet.Owners}` which will pass in the array of owners for the pet
  * Fix the error with a default value for the "pet" property

```text
// src/PetDetails.js
import React from 'react';

import OwnersList from './OwnersList';
import PetDetailList from './PetDetailList';

const PetDetails = props =>
  <>
    <PetDetailList pet={props.pet} />
    <OwnersList owners={props.pet.Owners} />
  </>
;

PetDetails.defaultProps = {
  pet: {
    PetType: {},
  },
};

export default PetDetails;
```

Refresh the page and make sure everything still works.

[![Petrack with owners headline](https://github.com/bgoonz/React_Notes_V3/raw/master/my-other-notes-n-projects/images/react-pet-detail-with-owners-headline.png)](https://github.com/bgoonz/React_Notes_V3/blob/master/my-other-notes-n-projects/images/react-pet-detail-with-owners-headline.png)

### Dealing with the list

**Note**: This section introduces an error that you will fix. It is a common error about how to create React elements from lists. You may see it often. This way, you will know how to fix it, too.

Back in **OwnersList.js**, you want a `ul` to follow the `h2`.

```text
const OwnersList = props =>
  <>
    <h2>Owners</h2>
    <ul>
      {/* Create li elements here */}
    </ul>
  </>
;
```

Here's the thing. You have an array of owners. You want to turn them into some list items. For each owner, you want to _map_ that to a list item. And, therein lies the hint. Since the value in `props.owners` is an array, you can use the `map` function to generate another array of React elements and plop them in there! Give it a go with this code. Replace the comment about where list items go above with this line of code.

```text
{ props.owners.map(owner =>
  <li>{owner.firstName}</li>
)}
```

Refresh the page. What happens? You should now see "Human" for each of the list items. That's great! In the console, there's an error. That's sad!

[![Petrack with owners list and key error](https://github.com/bgoonz/React_Notes_V3/raw/master/my-other-notes-n-projects/images/react-pet-detail-owners-list-with-key-error.png)](https://github.com/bgoonz/React_Notes_V3/blob/master/my-other-notes-n-projects/images/react-pet-detail-owners-list-with-key-error.png)

In this last step, you've changed the way you're passing children into the `React.createElement`. Up until now, you've had discrete single elements as children, like in **PetDetailList.js** where you have this code.

```text
const PetDetailList = props =>
  <>
    <h2>Details</h2>
    <dl>
      <PetInformationItem name="Name" value={props.pet.name}/>
      <PetInformationItem name="Age" value={props.pet.age}/>
      <PetInformationItem name="Type" value={props.pet.PetType.type}/>
    </dl>
  </>
;
```

Each of `PetInformationItem` elements is a different, discrete, and separate child for the `dl` element.

The code in **OwnersList.js**, this code,

```text
const OwnersList = props =>
  <>
    <h2>Owners</h2>
    <ul>
      {props.owners.map(owner =>
        <li>{owner.firstName}</li>
      )}
    </ul>
  </>
;
```

in that, you have created an _array_ of objects. Recall that when you call the `map` function on an array, it returns _another array_. React doesn't care about this, but it would like a little help in tracking each of those entries in the virtual DOM that it builds. That's what the error message is about, giving React a little help by providing a "key" property for each of the elements that you're creating in the array. The value of the "key" property must be unique and stable, that is, for a given object \(like an owner named "Human One" with an id of 7\), the value returned must always be the same. Luckily, because you have the id of the owner, you can use that because that id value is tied to a primary key, somewhere, and should never change for this object. The name can change, of course. But, the id will likely never change.

Add a "key" property to the `li` element and set it equal to the id of the owner object, like this.

```text
<li key={owner.id}>{owner.firstName}</li>
```

Now, the error in the console goes away.

Back to the `OwnersList` component, look at the formatting, the indentation that you see in the code.

```text
const OwnersList = props =>
  <>
    <h2>Owners</h2>
    <ul>
      {props.owners.map(owner =>
        <li key={owner.id}>
          {owner.firstName}
        </li>
      )}
    </ul>
  </>
;
```

That, too, is idiomatic React, the _React_ way of doing things. You'll see that kind of code all over the React world.

### The owner link component

While it's nice, and all, to see the owner's first name in the list, the actual page has a link to the owner page with the format "last name, first name". Time to create the \(last!\) component of this walk-through.

Create a new file named **src/OwnerLink.js**. In it, do the following:

* Import the React object
* Create a new function-based component named `OwnerLink` that accepts data that has
  * `a` as its element
  * An object literal with the property name "href" and the value of the "href" property passed in through the `props`
  * A string as its child which contains the last name and the first name
* Export the component as the default export

Once you have that, import the `OwnerLink` component into the **src/OwnersList.js** file. Now, replace this line in `OwnersList`

```text
{owner.firstName}
```

with an `OwnerLink` component with _three_ attributes: "href", "firstName", and "lastName". Those are the three properties expected inside the component. Use the curly brace syntax to pass in the appropriate values of the `owner`. This is something you haven't done, yet. Try to think through the problem of how to pass in _multiple_ property values. If you get stuck and can't get it after about ten minutes, ask for help!

Refresh the page. If everything works, you're done!

### What you've done, here

In this part of the walk-through, you used a collection to render a collection of React elements. You found out that using a collection like that requires you to provide a "key" property that has a stable, unique value. Once you had that, React would gladly manage that collection of objects in its virtual DOM.

### What you've done, overall

You have used JSX to do some amazing things, here.

* You reinforced the best practice of putting one React component in its own file \(module\) and exporting it as the default value of the module
* You learned that JSX compiles to `React.createElement`
* You learned that `<>` and `</>` are shorthand literal for the often-used `React.Fragment` element
* You used `defaultProps` to make sure that components always had some valid values to work with
* You used _pure functional components_ all the way through this, which means that none of the components used any other data than what was given to it
* You are intimately familiar with how React creates its elements, now, which means there will be no magical thinking about JSX when you use it

[Petrack with owners list and key error](https://github.com/bgoonz/React_Notes_V3/blob/master/my-other-notes-n-projects/images/react-pet-detail-owners-list-with-key-error.png): images/react-pet-detail-owners-list-with-key-error.pngimages/react-pet-detail-owners-list-with-key-error.png=6 orderedList=false} --&gt;

All you have left is to create a list of owners with links.

* `PetDetailPage`: Done
* `Navigation`: Done
* `PetDetails`: Modified in this step
* `PetDetailList`: Done
* `PetInformationItem`: Done
* `OwnersList`: Created in this step
* `OwnerLink`Created in this step

[![Petrack component analysis](https://github.com/bgoonz/React_Notes_V3/raw/master/my-other-notes-n-projects/images/pettrack-pet-detail-all-components-with-details-list.png)](https://github.com/bgoonz/React_Notes_V3/blob/master/my-other-notes-n-projects/images/pettrack-pet-detail-all-components-with-details-list.png)

You're almost done. Now, you get to handle a collection of data from the owners.

### Stub out the owners list component

You've done this four other times, so it's pretty straight forward.

* Create the **src/OwnersList.js** file. In it,
  * Import the React object
  * Create the function-based component named `OwnersList` with a `props` argument that uses a `React.Fragment` as its element
  * Add a child that is an 'h2' with the content "Owners"
  * Using `defaultProps`, add a default property value for "owners" and set it to an empty array because this component will expect an array of owner data
  * Export the `OwnersList` as the default export
* In the **PetDetails.js** file,
  * Import the `OwnersList` component
  * Add it as another child element of the `PetDetailPage` component after the `PetDetailList`
  * Wrap both the `PetDetailList` and `OwnersList` in a `Fragment`.
  * Pass in the owners to the `OwnersList` component in a property named "owners" like this `{props.pet.Owners}` which will pass in the array of owners for the pet
  * Fix the error with a default value for the "pet" property

```text
// src/PetDetails.js
import React from 'react';

import OwnersList from './OwnersList';
import PetDetailList from './PetDetailList';

const PetDetails = props =>
  <>
    <PetDetailList pet={props.pet} />
    <OwnersList owners={props.pet.Owners} />
  </>
;

PetDetails.defaultProps = {
  pet: {
    PetType: {},
  },
};

export default PetDetails;
```

Refresh the page and make sure everything still works.

[![Petrack with owners headline](https://github.com/bgoonz/React_Notes_V3/raw/master/my-other-notes-n-projects/images/react-pet-detail-with-owners-headline.png)](https://github.com/bgoonz/React_Notes_V3/blob/master/my-other-notes-n-projects/images/react-pet-detail-with-owners-headline.png)

### Dealing with the list

**Note**: This section introduces an error that you will fix. It is a common error about how to create React elements from lists. You may see it often. This way, you will know how to fix it, too.

Back in **OwnersList.js**, you want a `ul` to follow the `h2`.

```text
const OwnersList = props =>
  <>
    <h2>Owners</h2>
    <ul>
      {/* Create li elements here */}
    </ul>
  </>
;
```

Here's the thing. You have an array of owners. You want to turn them into some list items. For each owner, you want to _map_ that to a list item. And, therein lies the hint. Since the value in `props.owners` is an array, you can use the `map` function to generate another array of React elements and plop them in there! Give it a go with this code. Replace the comment about where list items go above with this line of code.

```text
{ props.owners.map(owner =>
  <li>{owner.firstName}</li>
)}
```

Refresh the page. What happens? You should now see "Human" for each of the list items. That's great! In the console, there's an error. That's sad!

[![Petrack with owners list and key error](https://github.com/bgoonz/React_Notes_V3/raw/master/my-other-notes-n-projects/images/react-pet-detail-owners-list-with-key-error.png)](https://github.com/bgoonz/React_Notes_V3/blob/master/my-other-notes-n-projects/images/react-pet-detail-owners-list-with-key-error.png)

In this last step, you've changed the way you're passing children into the `React.createElement`. Up until now, you've had discrete single elements as children, like in **PetDetailList.js** where you have this code.

```text
const PetDetailList = props =>
  <>
    <h2>Details</h2>
    <dl>
      <PetInformationItem name="Name" value={props.pet.name}/>
      <PetInformationItem name="Age" value={props.pet.age}/>
      <PetInformationItem name="Type" value={props.pet.PetType.type}/>
    </dl>
  </>
;
```

Each of `PetInformationItem` elements is a different, discrete, and separate child for the `dl` element.

The code in **OwnersList.js**, this code,

```text
const OwnersList = props =>
  <>
    <h2>Owners</h2>
    <ul>
      {props.owners.map(owner =>
        <li>{owner.firstName}</li>
      )}
    </ul>
  </>
;
```

in that, you have created an _array_ of objects. Recall that when you call the `map` function on an array, it returns _another array_. React doesn't care about this, but it would like a little help in tracking each of those entries in the virtual DOM that it builds. That's what the error message is about, giving React a little help by providing a "key" property for each of the elements that you're creating in the array. The value of the "key" property must be unique and stable, that is, for a given object \(like an owner named "Human One" with an id of 7\), the value returned must always be the same. Luckily, because you have the id of the owner, you can use that because that id value is tied to a primary key, somewhere, and should never change for this object. The name can change, of course. But, the id will likely never change.

Add a "key" property to the `li` element and set it equal to the id of the owner object, like this.

```text
<li key={owner.id}>{owner.firstName}</li>
```

Now, the error in the console goes away.

Back to the `OwnersList` component, look at the formatting, the indentation that you see in the code.

```text
const OwnersList = props =>
  <>
    <h2>Owners</h2>
    <ul>
      {props.owners.map(owner =>
        <li key={owner.id}>
          {owner.firstName}
        </li>
      )}
    </ul>
  </>
;
```

That, too, is idiomatic React, the _React_ way of doing things. You'll see that kind of code all over the React world.

### The owner link component

While it's nice, and all, to see the owner's first name in the list, the actual page has a link to the owner page with the format "last name, first name". Time to create the \(last!\) component of this walk-through.

Create a new file named **src/OwnerLink.js**. In it, do the following:

* Import the React object
* Create a new function-based component named `OwnerLink` that accepts data that has
  * `a` as its element
  * An object literal with the property name "href" and the value of the "href" property passed in through the `props`
  * A string as its child which contains the last name and the first name
* Export the component as the default export

Once you have that, import the `OwnerLink` component into the **src/OwnersList.js** file. Now, replace this line in `OwnersList`

```text
{owner.firstName}
```

with an `OwnerLink` component with _three_ attributes: "href", "firstName", and "lastName". Those are the three properties expected inside the component. Use the curly brace syntax to pass in the appropriate values of the `owner`. This is something you haven't done, yet. Try to think through the problem of how to pass in _multiple_ property values. If you get stuck and can't get it after about ten minutes, ask for help!

Refresh the page. If everything works, you're done!

### What you've done, here

In this part of the walk-through, you used a collection to render a collection of React elements. You found out that using a collection like that requires you to provide a "key" property that has a stable, unique value. Once you had that, React would gladly manage that collection of objects in its virtual DOM.

### What you've done, overall

You have used JSX to do some amazing things, here.

* You reinforced the best practice of putting one React component in its own file \(module\) and exporting it as the default value of the module
* You learned that JSX compiles to `React.createElement`
* You learned that `<>` and `</>` are shorthand literal for the often-used `React.Fragment` element
* You used `defaultProps` to make sure that components always had some valid values to work with
* You used _pure functional components_ all the way through this, which means that none of the components used any other data than what was given to it
* You are intimately familiar with how React creates its elements, now, which means there will be no magical thinking about JSX when you use it

  
_React!_ {ignore=true}

## Basic React Objectives

Learning React can seem daunting. The documentation available on the main site is geared toward people who have a lot of experience creating front-end applications. The basic React objectives gets you over that hump. At the end of the lessons, you should be able to:

* Explain how React uses a tree data structure called the "virtual DOM" to model the DOM
* Use `React.createElement` to create virtual DOM nodes
* Use `ReactDOM.render` to have React render your virtual DOM nodes into the actual Web page
* Use JSX to create virtual DOM nodes
* Describe how JSX transforms into `React.createElement` calls
* Use `Array#map` to create an array of virtual DOM nodes while specifying a unique key for each created virtual DOM node

## From JavaScript To DOM

The path from JavaScript to actual DOM elements appearing in your HTML document is not complex thanks to React. However, it is worth reviewing so that there is no mystery about it.

In this article, you will review how to use `React.createElement` to get what you want into React's virtual DOM so that React will convert into real DOM. There are three steps:

* Invoking `createElement` to build the "element tree"
* Invoking `render` to let React build its virtual DOM
* "Waiting" for React to convert its virtual DOM into real DOM

This article's goal is for React to create the following HTML in the DOM.

```text
<ul>
  <li class="selected">
    <a href="/pets">Pets</a>
  </li>
  <li>
    <a href="/owners">Owners</a>
  </li>
</ul>
```

### Using React

There is one method to consider when building interfaces using low-level React. From the [documentation](https://reactjs.org/docs/react-api.html#createelement), the `React.createElement` function has the following form:

```text
React.createElement(
  type,
  [props],
  [...children]
)
```

The arguments for it are

* **type**: the type of element to create, either a string for an HTML element, or a reference to a function or class that is a React component
* **props**: an object that contains data to render the element, either data to dynamically show or attributes to put on the element in the HTML
* **children**: the children of the element, as many as you want

### Creating elements

For each tag that you want to create with React, you will make a call to `React.createElement`. In the HTML above, there are five tags to create:

* One `ul` element
* Two `li` elements
* Two `a` elements

Three of those tags have attributes that you want to have appear in the DOM:

* One `li` element has a "class" attribute \(which you _must_ translate to "className" when using in React\)
* Both `a` elements have "href" attributes

Finally, there is a parent-child relationship between the elements.

* The `ul` element is the parent of both `li` elements
* Both `li` elements have a single `a` element child
* Both `a` elements have "child" text content

To summarize, here are the elements and how you would translate them to their respective arguments for `React.createElement`.

| HTML snippet | type | props | children |
| :--- | :--- | :--- | :--- |
| `<ul>...</ul>` | `'ul'` | `null` | Two calls to `React.createElement`, one for each `li` child |
| `<li class="selected">...</li>` | `'li'` | `{ className: 'selected' }` | One call to `React.createElement` for the `a` child |
| `<li>...</li>` | `'li'` | `null` | One call to `React.createElement` for the `a` child |
| `<a href="/pets">Pets</a>` | `'a'` | `{ href: '/pets' }` | The string `'Pets'` |
| `<a href="/owners">Owners</a>` | `'a'` | `{ href: '/owners' }` | The string `'Owners'` |

To create this tree of elements, you will use nested calls to `React.createElement`. The standard formatting for this is for elements to have children, put each argument on its own line, and for elements that have no children or just text content, put all arguments on a single line.

Since the `ul` has children, it will have its arguments on separate lines. Referring to the table above gives you:

```text
React.createElement(
  'ul',
  null,
  // First li child,
  // Second li child,
);
```

The first `li` element has a child. Its call to `React.createElement` will have its arguments each go on their own separate lines:

```text
React.createElement(
  'ul',
  null,
  React.createElement(
    'li',
    { className: 'selected' },
    // a child
  ),
  // Second li child,
);
```

The anchor element for "Pets" has only one text child. Its call to `React.createElement` will have its arguments on one line:

```text
React.createElement(
  'ul',
  null,
  React.createElement(
    'li',
    { className: 'selected' },
    React.createElement('a', { href: '/pets'}, 'Pets'),
  ),
  // Second li child,
);
```

The second `li` element has a child. Its call to `React.createElement` will have its arguments each go on their own separate lines:

```text
React.createElement(
  'ul',
  null,
  React.createElement(
    'li',
    { className: 'selected' },
    React.createElement('a', { href: '/pets'}, 'Pets'),
  ),
  React.createElement(
    'li',
    null,
    // a child
  ),
);
```

The other anchor element, the one for "Owners" has only one text child. Its call to `React.createElement` will have its arguments on one line:

```text
React.createElement(
  'ul',
  null,
  React.createElement(
    'li',
    { className: 'selected' },
    React.createElement('a', { href: '/pets'}, 'Pets'),
  ),
  React.createElement(
    'li',
    null,
    React.createElement('a', { href: '/owners'}, 'Owners'),
  ),
);
```

That's how you translate what you want from simple HTML into well-formatted calls to `React.createElement`. That will build the "element tree" for React to use.

### Converting to virtual DOM

To tell React to start the conversion process, you have to use the `React.render` method which takes a value returned from `React.createElement` and a DOM node in the actual document where React will insert the result of the conversion into real DOM.

If you wanted to insert what was created in the last section into the `main` tag, the most forward way of doing that is like this.

```text
// Put the element tree in a variable
const navList = React.createElement(
  'ul',
  null,
  React.createElement(
    'li',
    { className: 'selected' },
    React.createElement('a', { href: '/pets'}, 'Pets'),
  ),
  React.createElement(
    'li',
    null,
    React.createElement('a', { href: '/owners'}, 'Owners'),
  ),
);

// Get a DOM node for React to render to
const mainElement = document.querySelector('main');

// Give React the element tree and the target
ReactDOM.render(navList, mainElement);
```

At this point, you have given the element tree that you want created to React. It will then take that and construct its virtual DOM from it.

[![Convert element tree to virtual DOM](https://camo.githubusercontent.com/46fad4e7a7986e25d8b20785c6baee6d8eca7c725d4ad4f181b963c57615abcd/68747470733a2f2f61707061636164656d792d6f70656e2d6173736574732e73332d75732d776573742d312e616d617a6f6e6177732e636f6d2f4d6f64756c61722d437572726963756c756d2f636f6e74656e742f72656163742d72656475782f746f706963732f696e74726f2d746f2d72656163742f6173736574732f72656163742d6578616d706c652d636f6e76657273696f6e2d7669727475616c2d646f6d2e737667)](https://camo.githubusercontent.com/46fad4e7a7986e25d8b20785c6baee6d8eca7c725d4ad4f181b963c57615abcd/68747470733a2f2f61707061636164656d792d6f70656e2d6173736574732e73332d75732d776573742d312e616d617a6f6e6177732e636f6d2f4d6f64756c61722d437572726963756c756d2f636f6e74656e742f72656163742d72656475782f746f706963732f696e74726f2d746f2d72656163742f6173736574732f72656163742d6578616d706c652d636f6e76657273696f6e2d7669727475616c2d646f6d2e737667)

Now that it has built it's own model of the virtual DOM using the elements that you created, it can now take that and turn that into real DOM.

[![Convert virtual DOM to real DOM](https://github.com/bgoonz/React_Notes_V3/raw/master/my-other-notes-n-projects/images/react-example-conversion-real-dom.svg)](https://github.com/bgoonz/React_Notes_V3/blob/master/my-other-notes-n-projects/images/react-example-conversion-real-dom.svg)

It takes that real DOM and inserts it as the content of the target that you gave it which, in this case, is the `main` element in the body of the document.

### Updates

When you call `React.render` again for the same component and target, React takes the existing virtual DOM it knows about last time it rendered the element tree, compares it to whatever new thing you want to render, and determines which \(if any\) of the living DOM needs to change.

For example, let's say you constructed the same element tree but left off the "selected" class for the first list element. Then, when you rendered it, again, by calling `React.render`, React would compare the new element tree with the old element tree, figure out that one class was missing on that one `li` element, and remove that and only that from the real DOM.

[![Virtual DOM diff](https://github.com/bgoonz/React_Notes_V3/raw/master/my-other-notes-n-projects/images/react-example-virtual-dom-diff.svg)](https://github.com/bgoonz/React_Notes_V3/blob/master/my-other-notes-n-projects/images/react-example-virtual-dom-diff.svg)

### What you've learned

In this article, you learned

* To convert desired HTML into properly-formatted nested calls of `React.createElement`
* How React takes your element tree and builds its virtual DOM from the elements that you created
* How React takes that virtual DOM and inserts it into the living HTML document
* How React will compare an old virtual DOM tree with a new virtual DOM tree, figure out what changed, and then change that and only that in the real DOM

[Virtual DOM diff](https://github.com/bgoonz/React_Notes_V3/blob/master/my-other-notes-n-projects/images/react-example-virtual-dom-diff.svg): images/react-example-virtual-dom-diff.svgimages/react-example-virtual-dom-diff.svg orderedList=false} --&gt;

The path from JavaScript to actual DOM elements appearing in your HTML document is not complex thanks to React. However, it is worth reviewing so that there is no mystery about it.

In this article, you will review how to use `React.createElement` to get what you want into React's virtual DOM so that React will convert into real DOM. There are three steps:

* Invoking `createElement` to build the "element tree"
* Invoking `render` to let React build its virtual DOM
* "Waiting" for React to convert its virtual DOM into real DOM

This article's goal is for React to create the following HTML in the DOM.

```text
<ul>
  <li class="selected">
    <a href="/pets">Pets</a>
  </li>
  <li>
    <a href="/owners">Owners</a>
  </li>
</ul>
```

### Using React

There is one method to consider when building interfaces using low-level React. From the [documentation](https://reactjs.org/docs/react-api.html#createelement), the `React.createElement` function has the following form:

```text
React.createElement(
  type,
  [props],
  [...children]
)
```

The arguments for it are

* **type**: the type of element to create, either a string for an HTML element, or a reference to a function or class that is a React component
* **props**: an object that contains data to render the element, either data to dynamically show or attributes to put on the element in the HTML
* **children**: the children of the element, as many as you want

### Creating elements

For each tag that you want to create with React, you will make a call to `React.createElement`. In the HTML above, there are five tags to create:

* One `ul` element
* Two `li` elements
* Two `a` elements

Three of those tags have attributes that you want to have appear in the DOM:

* One `li` element has a "class" attribute \(which you _must_ translate to "className" when using in React\)
* Both `a` elements have "href" attributes

Finally, there is a parent-child relationship between the elements.

* The `ul` element is the parent of both `li` elements
* Both `li` elements have a single `a` element child
* Both `a` elements have "child" text content

To summarize, here are the elements and how you would translate them to their respective arguments for `React.createElement`.

| HTML snippet | type | props | children |
| :--- | :--- | :--- | :--- |
| `<ul>...</ul>` | `'ul'` | `null` | Two calls to `React.createElement`, one for each `li` child |
| `<li class="selected">...</li>` | `'li'` | `{ className: 'selected' }` | One call to `React.createElement` for the `a` child |
| `<li>...</li>` | `'li'` | `null` | One call to `React.createElement` for the `a` child |
| `<a href="/pets">Pets</a>` | `'a'` | `{ href: '/pets' }` | The string `'Pets'` |
| `<a href="/owners">Owners</a>` | `'a'` | `{ href: '/owners' }` | The string `'Owners'` |

To create this tree of elements, you will use nested calls to `React.createElement`. The standard formatting for this is for elements to have children, put each argument on its own line, and for elements that have no children or just text content, put all arguments on a single line.

Since the `ul` has children, it will have its arguments on separate lines. Referring to the table above gives you:

```text
React.createElement(
  'ul',
  null,
  // First li child,
  // Second li child,
);
```

The first `li` element has a child. Its call to `React.createElement` will have its arguments each go on their own separate lines:

```text
React.createElement(
  'ul',
  null,
  React.createElement(
    'li',
    { className: 'selected' },
    // a child
  ),
  // Second li child,
);
```

The anchor element for "Pets" has only one text child. Its call to `React.createElement` will have its arguments on one line:

```text
React.createElement(
  'ul',
  null,
  React.createElement(
    'li',
    { className: 'selected' },
    React.createElement('a', { href: '/pets'}, 'Pets'),
  ),
  // Second li child,
);
```

The second `li` element has a child. Its call to `React.createElement` will have its arguments each go on their own separate lines:

```text
React.createElement(
  'ul',
  null,
  React.createElement(
    'li',
    { className: 'selected' },
    React.createElement('a', { href: '/pets'}, 'Pets'),
  ),
  React.createElement(
    'li',
    null,
    // a child
  ),
);
```

The other anchor element, the one for "Owners" has only one text child. Its call to `React.createElement` will have its arguments on one line:

```text
React.createElement(
  'ul',
  null,
  React.createElement(
    'li',
    { className: 'selected' },
    React.createElement('a', { href: '/pets'}, 'Pets'),
  ),
  React.createElement(
    'li',
    null,
    React.createElement('a', { href: '/owners'}, 'Owners'),
  ),
);
```

That's how you translate what you want from simple HTML into well-formatted calls to `React.createElement`. That will build the "element tree" for React to use.

### Converting to virtual DOM

To tell React to start the conversion process, you have to use the `React.render` method which takes a value returned from `React.createElement` and a DOM node in the actual document where React will insert the result of the conversion into real DOM.

If you wanted to insert what was created in the last section into the `main` tag, the most forward way of doing that is like this.

```text
// Put the element tree in a variable
const navList = React.createElement(
  'ul',
  null,
  React.createElement(
    'li',
    { className: 'selected' },
    React.createElement('a', { href: '/pets'}, 'Pets'),
  ),
  React.createElement(
    'li',
    null,
    React.createElement('a', { href: '/owners'}, 'Owners'),
  ),
);

// Get a DOM node for React to render to
const mainElement = document.querySelector('main');

// Give React the element tree and the target
ReactDOM.render(navList, mainElement);
```

At this point, you have given the element tree that you want created to React. It will then take that and construct its virtual DOM from it.

[![Convert element tree to virtual DOM](https://camo.githubusercontent.com/46fad4e7a7986e25d8b20785c6baee6d8eca7c725d4ad4f181b963c57615abcd/68747470733a2f2f61707061636164656d792d6f70656e2d6173736574732e73332d75732d776573742d312e616d617a6f6e6177732e636f6d2f4d6f64756c61722d437572726963756c756d2f636f6e74656e742f72656163742d72656475782f746f706963732f696e74726f2d746f2d72656163742f6173736574732f72656163742d6578616d706c652d636f6e76657273696f6e2d7669727475616c2d646f6d2e737667)](https://camo.githubusercontent.com/46fad4e7a7986e25d8b20785c6baee6d8eca7c725d4ad4f181b963c57615abcd/68747470733a2f2f61707061636164656d792d6f70656e2d6173736574732e73332d75732d776573742d312e616d617a6f6e6177732e636f6d2f4d6f64756c61722d437572726963756c756d2f636f6e74656e742f72656163742d72656475782f746f706963732f696e74726f2d746f2d72656163742f6173736574732f72656163742d6578616d706c652d636f6e76657273696f6e2d7669727475616c2d646f6d2e737667)

Now that it has built it's own model of the virtual DOM using the elements that you created, it can now take that and turn that into real DOM.

[![Convert virtual DOM to real DOM](https://github.com/bgoonz/React_Notes_V3/raw/master/my-other-notes-n-projects/images/react-example-conversion-real-dom.svg)](https://github.com/bgoonz/React_Notes_V3/blob/master/my-other-notes-n-projects/images/react-example-conversion-real-dom.svg)

It takes that real DOM and inserts it as the content of the target that you gave it which, in this case, is the `main` element in the body of the document.

### Updates

When you call `React.render` again for the same component and target, React takes the existing virtual DOM it knows about last time it rendered the element tree, compares it to whatever new thing you want to render, and determines which \(if any\) of the living DOM needs to change.

For example, let's say you constructed the same element tree but left off the "selected" class for the first list element. Then, when you rendered it, again, by calling `React.render`, React would compare the new element tree with the old element tree, figure out that one class was missing on that one `li` element, and remove that and only that from the real DOM.

[![Virtual DOM diff](https://github.com/bgoonz/React_Notes_V3/raw/master/my-other-notes-n-projects/images/react-example-virtual-dom-diff.svg)](https://github.com/bgoonz/React_Notes_V3/blob/master/my-other-notes-n-projects/images/react-example-virtual-dom-diff.svg)

### What you've learned

In this article, you learned

* To convert desired HTML into properly-formatted nested calls of `React.createElement`
* How React takes your element tree and builds its virtual DOM from the elements that you created
* How React takes that virtual DOM and inserts it into the living HTML document
* How React will compare an old virtual DOM tree with a new virtual DOM tree, figure out what changed, and then change that and only that in the real DOM

## JavaScript eXtension

Using `React.createElement` is a bore and a chore when creating React-powered applications. The developers that used React, both inside and outside of Facebook, wanted an easier way to interact with the React API and hide all of the minutiae that comes with using `React.createElement`. They invented a new language that sits on top of JavaScript called _JavaScript eXtension_, or JSX.

In this article, you will learn

* How to use JSX in your application
* The syntax of JSX, and
* How JSX transforms into `React.createElement` calls

### How to use JSX

Because browsers don't understand JSX, you have to use some tools to translate JSX into just plain old JavaScript. The main tool that you will use in almost every case is one called [Babel](https://babeljs.io/). It is a tool that can convert versions of modern JavaScript into old version of JavaScript. It can convert _future_ features of JavaScript into modern JavaScript. It can convert JSX into modern \(or old\) JavaScript.

However, using Babel by itself is like building a house with just a hammer. It'd be nice to have fancier tools to help you build that house. That's where tools like [Create React App](https://github.com/facebook/create-react-app) come into play. **Create React App** uses Babel underneath and, then, adds a whole lot more. You'll see more of \*_Create React App_ as you progress through the course.

### JSX Syntax

Here's a function-based component using `React.createElement` that has an `h1` element with the content "Hello!", a placeholder image, and a link to some search engine passed in through props.

```text
const ExampleComponent = props => React.createElement(
  React.Fragment,
  null,
  React.createElement('h1', null, 'Hello!'),
  React.createElement('img', { src: 'images/150' }),
  React.createElement('a', { href: props.searchUrl }, props.searchText),
);
```

You've likely seen that before. JSX allows you to get rid of all of the calls to `React.createElement` and replace them with almost HTML-looking tags. Here's what the above content looks like in JSX.

```text
const ExampleComponent = props =>
  <React.Fragment>
    <h1>Hello!</h1>
    <img src="images/150" />
    <a href={props.searchUrl}>{props.searchText}</a>
  </React.Fragment>
;
```

You can see Babel in action converting that JSX code above. Here's a [link to Babel](https://babeljs.io/en/repl#?babili=false&browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=DwIwrgLhD2B2AEcDCAbAlgYwNYF4DeAFAJTw4B88EAFmgM4B0tAphAMoQCGETBe86WJgBMAXJQBOYJvAC-RGWQBQ8FfAAyaQYuAB6cFDhkgA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=es2015%2Creact%2Cstage-2&prettier=false&targets=&version=7.4.3) already configured for you. Copy and paste that code above to see it transform back into `React.createElement` invocations.

#### HTML-like tags, but...

The `React.Fragment` element _contains_ the `h1`, `img`, and `a`, just like it does in the `React.createElement` version, except instead of using a method call to do it, it uses more familiar HTML-like tags. There's one super big difference between the HTML that you know and what JSX expects. Can you see it?

Look at the end of the `img` tag. See that "/" before the closing angle bracket? You _must_ include that if the tag that you're using doesn't have a close tag. If you want to use those HTML element in your JSX, then you have to put the slash. The following table shows some common tags that you'd use and their JSX equivalent.

| HTML self-closing tag | JSX equivalent |
| :--- | :--- |
| `<br>` | `<br />` |
| `<hr>` | `<hr />` |
| `<img>` | `<img />` |
| `<input>` | `<input />` |
| `<link>` | `<link />` |

#### Properties and data

When you use the low-level `React.createElement` function call, you pass the properties in as an object as the second argument. In JSX, you pass in properties as if they were attributes on the tag.

When you want to use a static value, just use a string literal like this.

```text
<img src="https://via.placeholder.com/150" />
```

becomes

```text
React.createElement(
  'img',
  { src: "https://via.placeholder.com/150" }
)
```

And, when you want to pass in some data rather than a sting literal like above, you use curly braces to turn

```text
<a href={props.searchUrl}>{props.searchText}</a>
```

into

```text
React.createElement(
  'a',
  { href: props.searchUrl },
  props.searchText
)
```

The stuff inside the curly braces is just a JavaScript expression, so you could do something like this, if you wanted, to make the search text uppercase:

```text
<a href={props.searchUrl}>
  {props.searchText.toUpperCase()}
</a>
```

#### Comments

To use comments in JSX, you use curly braces \(because that means its just a normal JavaScript expression\) and block-level JavaScript comments.

```text
<div>
  <h2>This is JSX</h2>
  {/* This is a comment in JSX */}
</div>
```

#### Property names

Please read [DOM Elements](https://reactjs.org/docs/dom-elements.html) in the React documentation to understand how property names work, as well as the special property names that React supports. You can be assessed on the following special attributes:

* `checked`
* `className`
* `dangerouslySetInnerHTML`
* `htmlFor`
* `onChange`
* `style`
* `value`

Also, you can be assessed on knowing that React uses camel-case for its attribute names so attributes like `maxlength` in HTML are `maxLength` in React.

### The JSX semicolon gotcha

You will also see code like this in other React projects, as well as in code generated by tools. It is a function-based component that uses the `function` keyword rather than an arrow function. Note the `return` statement.

```text
function App() {
  return (
    <div>
      <h1>Hello!</h1>
      <div>Welcome to JSX.</div>
    </div>
  );
}
```

You'll see that the JSX block is wrapped in parentheses. This is due to the way that JavaScript handles something called ["automatic semicolon insertion"](https://www.ecma-international.org/ecma-262/#sec-rules-of-automatic-semicolon-insertion). Here's a simple example. What do you think the function returns? \(Yes, this _is_ a "trick question".\)

```text
function sum(i, j) {
  return
    i + j;
}
```

If the answer isn't obvious, start Node on the command line, type it in exactly the way it is there, and try calling it with `sum(1, 2)`.

You may be surprised to see that it returns `undefined`. Here's why: when JavaScript reads your source code, it tries to be "helpful". When it reads the lines of your code, it asks, is each line a "complete" line? Is it and the following lines valid JavaScript expressions? If the answer is "yes", then it will add a semicolon at the end of the line _for you_. When it reads the above "sum" function, the JavaScript runner "thinks" to itself:

* Ok, I have two lines:
  * `return`
  * `i + j;`
* Are each of those valid JavaScript expressions? Yes!
* Now, I will put semicolons at the end of the lines that don't have any
  * `return;`
  * `i + j;`

Now, your function, in the eyes of JavaScript, looks like this.

```text
function sum(i, j) {
  return; // <- There's a new semicolon!
    i + j;
}
```

That function never gets to `i + j` because it always returns "no value" on the first line. Yikes!

To get around that, you can add parentheses to tell JavaScript that "more is coming".

```text
function sum(i, j) {
  return (
    i + j
  );
}
```

Now, when JavaScript reads the line `return (`, it "thinks" to itself, "Well, that's not a complete expression. There must be more coming. I will _not_ put a semicolon there."

The same is true for functions containing JSX. The above code

```text
function App() {
  return (
    <div>
      <h1>Hello!</h1>
      <div>Welcome to JSX.</div>
    </div>
  );
}
```

is equivalent to

```text
function App() {
  return (
    React.createElement(
      'div',
      null,
      React.createElement('h1', null, 'Hello!'),
      React.createElement('div', null, 'Welcome to JSX.'),
    )
  );
}
```

Without the parentheses starting right after the `return` keyword and ending after the outer call of `React.createElement`, JavaScript would just stick a semicolon after the `return` keyword and all of the fancy React stuff would get ignored.

The message is clear: if you use the `return` keyword in a function to "return some JSX", then make sure you wrap the JSX in parentheses.

### What you've learned

That's really all there is to JSX. You combine your knowledge of HTML and your knowledge of `React.createElement` to allow the Babel tool to turn your code into plain old JavaScript for you. Specifically, you have seen the following conversions:

| Conversion type | JSX | JavaScript |
| :--- | :--- | :--- |
| tags | `<h1></h1>` | `React.createElement('h1', null)` |
| attributes | `<img src="images/foo.png"/>` | `React.createElement('img', { src: "foo.png" })` |
| variables | `<h1>{message}</h1>` | `React.createElement('h1', null, message)` |

You've also read about the special property names that React supports.

Finally, you learned about the frustrating side effect of "automatic semicolon insertion" and, if you do use the `return` keyword in your functions, that you should wrap the JSX in parentheses to prevent JavaScript from _not_ returning your code.

## Walk-Through: Creating Elements In React

To start your React journey, you will build your foundational knowledge by starting out with the basic `React.createElement` and `ReactDOM.render`. One of the compelling features of this type of solution is that you do not need _any_ extra tools to get your app running in the browser. In the next walk-through, you will have to _install_ a ton of packages just to get React to properly work. This project will walk you through how to use a pure JavaScript version of React. Everything will work right out of the box.

### Getting started

Install the [React DevTools for Google Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi).

[![React DevTools for Google Chrome screenshot](https://camo.githubusercontent.com/ed6ef6e77ef9916d970667512572a0ebef83b6a4b55a1ced108f2ad3b91cb209/68747470733a2f2f61707061636164656d792d6f70656e2d6173736574732e73332d75732d776573742d312e616d617a6f6e6177732e636f6d2f4d6f64756c61722d437572726963756c756d2f636f6e74656e742f72656163742d72656475782f746f706963732f696e74726f2d746f2d72656163742f6173736574732f72656163742d646576746f6f6c732e706e67)](https://camo.githubusercontent.com/ed6ef6e77ef9916d970667512572a0ebef83b6a4b55a1ced108f2ad3b91cb209/68747470733a2f2f61707061636164656d792d6f70656e2d6173736574732e73332d75732d776573742d312e616d617a6f6e6177732e636f6d2f4d6f64756c61722d437572726963756c756d2f636f6e74656e742f72656163742d72656475782f746f706963732f696e74726f2d746f2d72656163742f6173736574732f72656163742d646576746f6f6c732e706e67)

Create a new directory to contain this new project. In that directory, create two files: an **index.html** file and an **app.js** file. In the **index.html** file, create a standard HTML 5 document. In the HTML `body` \(in this order\), create a `main` element and a `script` element for your **app.js** file with `type="module"` so you can use ES6 modules.

Serve your files with a local Python server by running the `python3 -m http.server` command in your terminal. Make sure you are running the command from within your project directory. You should be able to open [http://localhost:8000](http://localhost:8000/) to see the page, empty as it is.

### Test that things are working

Get ready! You're going to do the first React thing! You're going to create a React element that will display "Hello, programmers!". You will then have React render it to the DOM.

Copy and paste the following JavaScript code into your **app.js**, refresh your page, look at the code to get a feel for what it does, try to come up with explanations on your own, and then continue reading.

```text
import 'https://unpkg.com/react@16/umd/react.development.js';
import 'https://unpkg.com/react-dom@16/umd/react-dom.development.js';

const HelloWorld = () => React.createElement(
  'h1',
  null,
  'Hello, programmers',
);

const target = document.querySelector('main');
const app = React.createElement(HelloWorld, null);
ReactDOM.render(app, target);
```

**Note**: You may want to turn on "Disable cache" on the _Network_ tab of your DevTools and keep the DevTools open while you're doing this to make sure you always have the newest version of the files.

You should now have _Components_ and _Profiler_ tabs in your DevTools. If you click on the `HelloWorld` component in the _Components_ tab, you can see that it has no _props_. You'll learn much more about props later. For now, just remember that the React DevTools extension is a helpful tool for you to view information about your components and their props.

### Walking through the code

Even though there are only five statements in that code block, a lot is going on. This section carefully walks through each of the statements to help you get a deeper understanding.

#### Those wacky import statements

Consider those `import` statements. These differ in two ways from what you've seen with ES modules to date.

1. They come from another website altogether. When you use `import` to bring in modules from another domain, that request is governed by CORS; that means the other server _must_ have CORS configured to let you import their code. Luckily, unpkg.com configures CORS to allow any authority to import their script files.
2. They don't seem to import anything. There is no `import { React } from` there. It's just `import 'url'`. This is called a _side effect_ import and is generally frowned upon in modern Web development. But, React does not package their code in ES6 format. What those `import` statements do is _add variables in the global scope_. The two variables they add are `React` from the first import, and `ReactDOM` from the second import. Those global variables can then be used by your code, which happens with `React.createElement` and `ReactDOM.render`.

If you were going to move these into production, you would change the URLs that you import from

```text
import 'https://unpkg.com/react@16/umd/react.development.js';
import 'https://unpkg.com/react-dom@16/umd/react-dom.development.js';
```

to

```text
import 'https://unpkg.com/react@16/umd/react.production.min.js';
import 'https://unpkg.com/react-dom@16.13.1/umd/react-dom.production.min.js';
```

Those files contain the minified "production" version of the code, which is just a smaller version of the "development" versions. If you open up the links to the [react.development.js](https://unpkg.com/react@16/umd/react.development.js) and [react-production.min.js](https://unpkg.com/react@16/umd/react.production.min.js) files in your browser, you'll see JavaScript in both files. Notice how the non-minified version \([react.development.js](https://unpkg.com/react@16/umd/react.development.js)\) includes plain JavaScript you're used to seeing. The minified version simply compresses that JavaScript.

#### The odd-looking function

Turn your attention to this statement.

```text
const HelloWorld = () => React.createElement(
  'h1',
  null,
  'Hello, programmers!'
);
```

The statement declares the `HelloWorld` variable and stores a function in it. This is the way that components look in React. It is a function-based component because it's a function. It returns the value returned from `React.createElement`. If that syntax is weird, it is functionally the same as this code.

```text
const HelloWorld = () => {
  return React.createElement('h1', null, 'Hello, programmers!');
}
```

Because there are a lot of die-hard functional programmers \(as opposed to object-oriented programmers\) that like that kind of syntax \(arrow functions without curly braces that span multiple lines\), you will see it in a lot of places while learning React.

The arguments passed to `React.createElement` are:

1. What to create in the DOM.

* If it is a string, it needs to be all lowercase and the name of the HTML element to create. This example passes in `'h1'` as the tag to create in the DOM.
* Otherwise, it should be the variable that holds another component. You can see it being used that way in the later code.

1. Any properties/attributes to put on the generated element. This example passes in `null` because there are no attributes needed. You will see some, soon.
2. The child content of the element. The third \(and fourth and fifth and...\) arguments contains what React should put as the children of the content of the element. In this case, the content is `'Hello, programmers!'`.

**Important**: Every time this walk-through asks you to create a function-based component, this is what it will mostly look like. It will look like this _or_ it will look like this and have a single parameter named `props` like this.

```text
// Without the need for data
const HelloWorldNoData = () => React.createElement(
  'h1',
  null,
  'Hello, programmers!'
);

// With the need for data has the
// props parameter.
const HelloWorldWithData = props => React.createElement(
  'h1',
  null,
  'Hello, programmers!'
);
```

#### Putting it in the page

The last three statements in the code block are these.

```text
const target = document.querySelector('main');
const app = React.createElement(HelloWorld, null);
ReactDOM.render(app, target);
```

The first line is something you should be really familiar with. You are selecting the `<main>` element and referencing it as `target`.

The second line is using `React.createElement` to create an element from the `HelloWorld` function-based component discussed in the last section. It has `null` properties.

The third line _renders_ the component into the actual Web page, the component specified by the first argument, which is the one created from the `HelloWorld` component. Remember that you can open your DevTools, find the _Components_ tab, and click it to see the React DevTools show you the "HelloWorld" component rendered by React.

[![Hello programmers with dev tools](https://camo.githubusercontent.com/34c87f7d0be732eed985d8bcea1e451c873f70dce946c9a245aad1078b6e0dbc/68747470733a2f2f61707061636164656d792d6f70656e2d6173736574732e73332d75732d776573742d312e616d617a6f6e6177732e636f6d2f4d6f64756c61722d437572726963756c756d2f636f6e74656e742f72656163742d72656475782f746f706963732f696e74726f2d746f2d72656163742f6173736574732f72656163742d68656c6c6f2d70726f6772616d6d6572732d6372656174652d656c656d656e742d776974682d72656163742d746f6f6c732e706e67)](https://camo.githubusercontent.com/34c87f7d0be732eed985d8bcea1e451c873f70dce946c9a245aad1078b6e0dbc/68747470733a2f2f61707061636164656d792d6f70656e2d6173736574732e73332d75732d776573742d312e616d617a6f6e6177732e636f6d2f4d6f64756c61722d437572726963756c756d2f636f6e74656e742f72656163742d72656475782f746f706963732f696e74726f2d746f2d72656163742f6173736574732f72656163742d68656c6c6f2d70726f6772616d6d6572732d6372656174652d656c656d656e742d776974682d72656163742d746f6f6c732e706e67)

Before moving on, add some more to that, so you get a feel for how it works. Replace the content of your **app.js** with this stuff. The comments to the right of each line shows what React will do with the stuff only after you call `ReactDOM.render` with it.

> **Note:** since you have not included a CSS file to style `#nav-links` and `.is-selected` in your project, the `id` and `className` aren't actually being used for any styling purpose. The code below includes an `id` and `className` to shows an example of setting `id` and `className` with `React.createElement` and how it translates to HTML.

```text
import 'https://unpkg.com/react@16/umd/react.development.js';
import 'https://unpkg.com/react-dom@16/umd/react-dom.development.js';

const Links = () => React.createElement(
  'ul',                                  // <ul
  { id: 'nav-links' },                   //  id="nav-links">
  React.createElement(
    'li',                                // <li
    { className: 'is-selected' },        //  class="is-selected">
    React.createElement(
      'a',                               // <a
      { href: 'https://lambda-resources.netlify.app/' }, //  href="...">
      'Lambda'                      //    Lambda
    ),                                   // </a>
  ),                                     // </li>
  React.createElement(
    'li',                                // <li>
    null,
    React.createElement(
      'a',                               // <a
      { href: 'https://lambda-resources.netlify.app/' },   //  href="...">
      'Lambda Resources',                       
    ),                                   // </a>
  ),                                     // </li>
);                                       // </ul>

const HelloWorld = () => React.createElement(
  'h1',
  null,
  'Hello, programmers',
);

// Creates the HelloWorld first and, then, creates
// the Links
const AllTogether = () => React.createElement(
  'div',
  null,
  React.createElement(HelloWorld, null),
  React.createElement(Links, null),
);

const target = document.querySelector('main');
const app = React.createElement(AllTogether, null);
ReactDOM.render(app, target);
```

Look at what gets produced in the _Elements_ tab of your DevTools. Look at what gets produced in the _Components_ tab of your DevTools for all three of your components. Play around with it: change tags, replace some of those `null` second arguments with objects to see what gets presented. Give it a whirl. From this point on, you'll be working with JavaScript code known as **JSX** in your React projects. JSX is just syntactic sugar that translates to creating React element objects. Although you won't be creating full-scale projects with `React.createElement`, it's important to remember that React is actually using `React.createElement` under the hood.

## Thinking In Components

For the next couple of walk through articles, you will be reproducing a page from Petrack. Please go to [Petrack](https://polar-beach-08187.herokuapp.com/) and click around it so you can see how it works. Pay special attention to the detail page for the pets. This article will analyze it so that it can introduce you into how to "think in React".

[![Petrack pet detail page](https://camo.githubusercontent.com/516a3c3be41766740df025045e45a19a064fd638b816cb831766888afe249798/68747470733a2f2f61707061636164656d792d6f70656e2d6173736574732e73332d75732d776573742d312e616d617a6f6e6177732e636f6d2f4d6f64756c61722d437572726963756c756d2f636f6e74656e742f72656163742d72656475782f746f706963732f696e74726f2d746f2d72656163742f6173736574732f706574747261636b2d7065742d64657461696c2e706e67)](https://camo.githubusercontent.com/516a3c3be41766740df025045e45a19a064fd638b816cb831766888afe249798/68747470733a2f2f61707061636164656d792d6f70656e2d6173736574732e73332d75732d776573742d312e616d617a6f6e6177732e636f6d2f4d6f64756c61722d437572726963756c756d2f636f6e74656e742f72656163742d72656475782f746f706963732f696e74726f2d746f2d72656163742f6173736574732f706574747261636b2d7065742d64657461696c2e706e67)

When you "think in React", you are supposed to "think in components". A component in React is usually a JavaScript function or a class that returns a special React object called an "element". There is a _very_ vocal community that believes that function-based components are far superior than class-based components because they're easier to understand. You will have the opportunity to use both in this class and make up your mind which you like better.

In this article, you will gain insight into how to break a UI down into portions of functionality that React calls "components". The way this article presents the components is only one way to do it. Other developers may choose to do it differently. There is usually no wrong way to do it.

### Components

In React-speak, a "component" is a chunk of the user interface that can \(or should\) be treated as a unit because it may \(or likely will\) be used more than once or used to structure a page. That's not a very satisfying definition. This article will walk you through breaking down the page using the practical example of the Petrack pet detail page.

When you think of components, it's good to think in terms of the Single Responsibility Principle. Remember that? It's good to have a component do one thing and one thing well. In this analysis, it will identify how it fits \(or doesn't fit\) in with the Single Responsibility Principle.

If you think in terms of Pug, then a component is kind of like an `include`, a big or small amount of code that you could use over and over in your UI. The main difference is that React is _in the browser_ and handles user events and HTML generation for you so that you're not creating template strings and adding them via the `innerHTML` property or `appendChild` method. Pug is just on the server generating HTML.

### The navigation component

On all of the pages, there is the same navigation at the top of the page.

[![Petrack navigation](https://github.com/bgoonz/React_Notes_V3/raw/master/my-other-notes-n-projects/images/pettrack-pet-detail-static-content.png)](https://github.com/bgoonz/React_Notes_V3/blob/master/my-other-notes-n-projects/images/pettrack-pet-detail-static-content.png)

If you were working in Pug, that would be in your **layout.pug** because you would want it to appear in every page. In React, you will create a reusable component, maybe call it `Navigation`, and use it on all of your React-enabled pages.

This does one thing and one thing well: it shows the static content of the navigation. There's nothing else it needs to do. Good job, `Navigation` component!

What this means is that the code that will create the heading "Petrack", the links "Pets" and "Owners", and the "Back" link will all be in their own component, which is just a JavaScript function or class. It could look something like this, but with real code where it reads "some cool React code here". This is the skeleton of the code.

```text
// Navigation.js
import React from 'react';

const Navigation = props => {
  /* some cool React code here */
}

export default Navigation;
```

You would put that in a file named **Navigation.js**. It's capitalized because, in React world, the names of your custom components are _always_ capitalized.

Don't worry if that doesn't make complete sense, yet. You will be making these components and their files _for the rest of your lives_. Or, at least, for the rest of this course. And, definitely, for the remainder of this module.

The walk through articles that follow this will explain what's going on as well as what that `props` parameter is.

### The details components

Now, for the remainder of the page.

[![Petrack detail](https://github.com/bgoonz/React_Notes_V3/raw/master/my-other-notes-n-projects/images/pettrack-pet-detail-component.png)](https://github.com/bgoonz/React_Notes_V3/blob/master/my-other-notes-n-projects/images/pettrack-pet-detail-component.png)

This could be another component. It would create the "Details" headline, show the individual details of the pet, create the "Owners" headline, and then create the links to the owners. It could look something like this.

```text
// PetDetail.js
import React from 'react';

const PetDetail = props => {
  /* some cool React code here */
}

export default PetDetail;
```

This component, the `PetDetail` component, does too much. It's in charge of showing two different kinds of information, the details of the pet _and_ the owners links. That means there's probably an opportunity to create more components that this component can then use. This is called _component composition_.

#### Breaking it down further

Now, please think like a Pug developer for just a moment. How would you create this page in Pug? The code for this from the project looks like this.

```text
extends ../layout

block content
  h1 Details
  dl
    dt Name
    dd= pet.name
    dt Age
    dd= pet.age
    dt Type
    dd= pet.PetType.type

  h2 Owners
  ul
    each owner in pet.Owners
      li: a(href="/owners/" + owner.id) #{owner.lastName}, #{owner.firstName}
```

To start thinking in components, ask yourself

* What parts of that page are repeated?
* What parts have the same structure?

You can see that in the _Details_ section of the page, there are repeated structures of `dt` and `dd` elements. You can see in the _Owners_ section, there is a loop that creates a link to the owners based on the owner information. Those types of reusable chunks of content are good candidates for being their own components.

#### The pet information item component

You can extract the creation of the `dt` and `dd` elements into its own component.

[![Petrack pet information item](https://github.com/bgoonz/React_Notes_V3/raw/master/my-other-notes-n-projects/images/pettrack-pet-detail-information-item-component.png)](https://github.com/bgoonz/React_Notes_V3/blob/master/my-other-notes-n-projects/images/pettrack-pet-detail-information-item-component.png)

That could look something like this.

```text
// PetInformationItem.js
import React from 'react';

const PetInformationItem = props => {
  /* some cool React code here */
}

export default PetInformationItem;
```

It would be responsible for making that portion of the Web page appear. And, you would use it over and over for each of the different pieces of data you wanted to show. As you add more data about pets, you could use that `PetInformationItem` to maintain the visual consistency of the Web page, as well as allowing you to write less code. This component does one thing and does it well.

#### The owner link component

Just like extracting the pet information item, you can extract that owner link into its own component. It would generate the the `a` and format the person's name.

[![Petrack owner link](https://github.com/bgoonz/React_Notes_V3/raw/master/my-other-notes-n-projects/images/pettrack-pet-detail-owner-link-component.png)](https://github.com/bgoonz/React_Notes_V3/blob/master/my-other-notes-n-projects/images/pettrack-pet-detail-owner-link-component.png)

Again, the skeleton code would look something like this.

```text
// OwnerLink.js
import React from 'react';

const OwnerLink = props => {
  /* some cool React code here */
}

export default OwnerLink;
```

This component also does one thing and does it well. If you ever need to change the way owner names appear in lists of links in the application, you can come to this one component and change it. It would then take effect everywhere! Single Responsibility Principle for the win!

#### The owners list component

Now, the thing that manages the list itself and the use of the `OwnerLink` component is eligible for being its own component, too.

[![Petrack owners list](https://github.com/bgoonz/React_Notes_V3/raw/master/my-other-notes-n-projects/images/pettrack-pet-detail-owners-list-component.png)](https://github.com/bgoonz/React_Notes_V3/blob/master/my-other-notes-n-projects/images/pettrack-pet-detail-owners-list-component.png)

It's single responsibility is to manage creating the "Owners" header and the unordered list. It will use the `OwnerLink` component to do that! Again, this is called _component composition_.

```text
// OwnersList.js
import OwnerLink from './OwnerLink';
import React from 'react';

const OwnersList = props => {
  /* some cool React code here */

  /**
   * Use the OwnerLink component, too!
   */
}

export default OwnersList;
```

#### Putting the list and details together

If you create the `PetInformationItem` and the `OwnerLink` component, then you will want to use them in your `PetDetail` component. That is as easy as using the `import` statement to allow them to be used by that code.

```text
// PetDetail.js
import OwnersList from './OwnersList';
import PetInformationItem from './PetInformationItem';
import React from 'react';

const PetDetail = props => {
  /* some cool React code here */

  /**
   * Use the OwnersList and PetInformationItem
   * components, too!
   */
}

export default PetDetail;
```

### Putting it all together

Once you have all of those components, you would create one more component, the top-level "page" component, that would render the `Navigation` and `PetDetail` components.

```text
// PetDetailPage.js
import Navigation from './Navigation';
import PetDetail from './PetDetail';
import React from 'react';

const PetDetailPage = props => {
  /* some cool React code here */

  /**
   * Use the Navigation and PetDetail
   * components, too!
   */
}

export default PetDetailPage;
```

The final analysis in this breakdown of "components" to "think in React" looks like this.

[![Petrack final analysis](https://github.com/bgoonz/React_Notes_V3/raw/master/my-other-notes-n-projects/images/pettrack-pet-detail-all-components.png)](https://github.com/bgoonz/React_Notes_V3/blob/master/my-other-notes-n-projects/images/pettrack-pet-detail-all-components.png)

You can see each of the components that were described in this article. You can also see how the `PetInformationItem` and `OwnerLink` components get used multiple times on the page.

### There is probably more

Take a look at this, again, and think about if there is any "missing" component before continuing.

[![Petrack final analysis](https://github.com/bgoonz/React_Notes_V3/raw/master/my-other-notes-n-projects/images/pettrack-pet-detail-all-components.png)](https://github.com/bgoonz/React_Notes_V3/blob/master/my-other-notes-n-projects/images/pettrack-pet-detail-all-components.png)

You could also create a `PetDetailList` component, if you want, that would manage the "Details" header and the definition list. That would reflect the same structure that the `OwnersList` has, a component responsible for generating a header and a list. In the following walk through articles, the `PetDetailList` component will also be included in the development.

### What you've seen

This is thinking in React. Looking at a Web page and deciding what parts of it belong in sections, what parts are repeated, and how to group them all together. The React documentation calls this [breaking the UI into a component hierarchy](https://reactjs.org/docs/thinking-in-react.html#step-1-break-the-ui-into-a-component-hierarchy). That link is to a section in the React documentation entitled _Thinking in React_. That section performs the same exercise that this article performed, but with a lot fewer words and pictures.

In the upcoming exercises, you will create these components in a couple of ways. The first way is the hard way, but shows you how React works under the covers. The second way uses the fancy JSX language to make it easier for you.

## JSX Walk-Through: Navigation Component

You will now work on creating the PetTrack page.

* `PetDetailPage`: Created in this step
* `Navigation`: Created in this step
* `PetDetails`
* `PetDetailList`
* `PetInformationItem`
* `OwnersList`
* `OwnerLink`

[![Petrack component analysis](https://github.com/bgoonz/React_Notes_V3/raw/master/my-other-notes-n-projects/images/pettrack-pet-detail-all-components-with-details-list.png)](https://github.com/bgoonz/React_Notes_V3/blob/master/my-other-notes-n-projects/images/pettrack-pet-detail-all-components-with-details-list.png)

### The strategy

This guide will work top-down, in that it will start with the top-most \(or outer-most\) component, the `PetDetailPage` component. Then, it will move to a next level component, like `Navigation`. It will just keep adding components and getting them to work with the data from the AJAX call.

### The pet detail page component

The `PetDetailPage` component will be responsible for showing the navigation component, the details list component, and the owners list component. None of those exist, yet, so just stub out a new component to hold the source.

Create a new file named **PetDetailPage.js** in the **src** directory. In that file, type this content into it.

```text
import React from 'react';

const PetDetailPage = () =>
  <div>PetDetailPage component</div> // Temporary so it builds
;

export default PetDetailPage;
```

Here's some analysis.

#### The import statement

You will notice that the top of the file imports the `React` object, but you do not use it anywhere in the file! You have to do this because, remember, each JSX element, like `<header>...</header>`, ends up getting translated to `React.createElement` calls. Without the `import` statement, the `React` object would not exist and compiling would fail.

#### The component

The `const PetDetailPage = () => ...` is just a normal arrow function.

The body of the component is a JSX expression `<div></div>` which Babel will translate into an invocation of `React.createElement`. Here's what it looks like after passing through Babel.

```text
var PetDetailPage = function PetDetailPage() {
  return React.createElement("div", null, "PetDetailPage component");
} // Temporary so it builds
;
```

#### The export statement

This is just so you can import it into other components for use, which you will do now.

### Using the pet detail page component

Open up **src/App.js**. Import the newly-created `PetDetailPage` component. Remember that this is Webpack that's doing this for you, so you _do not_ need to put the **.js** extension on the name of the module that you import.

Replace the `<h1>Hello</h1>` with `<PetDetailPage></PetDetailPage>`. Save all of your files. You should now see this content in your browser and _Components_ tab.

[![Petrack with default PetDetailPage](https://github.com/bgoonz/React_Notes_V3/raw/master/my-other-notes-n-projects/images/create-react-app-with-default-pet-detail-page.png)](https://github.com/bgoonz/React_Notes_V3/blob/master/my-other-notes-n-projects/images/create-react-app-with-default-pet-detail-page.png)

The content of the **src/App.js** should look similar to this.

```text
import React from 'react';

import PetDetailPage from './PetDetailPage';

function App() {
  return (
    <PetDetailPage></PetDetailPage>
  );
}

export default App;
```

Since `PetDetailPage` has no child content, you could also write that code like this, with the ending slash.

```text
import React from 'react';

import PetDetailPage from './PetDetailPage';

function App() {
  return (
    <PetDetailPage />
  );
}

export default App;
```

### The navigation component

Create a new file named **Navigation.js** in the **src** directory of your application. Put this content in there. Please type it rather than copy and paste it.

```text
import React from 'react';

const Navigation = () =>
  <header>
    <h1>Petrack</h1>
    <nav>
      <ul>
        <li>
          <a href="/pets">Pets</a>
        </li>
        <li>
          <a href="/owners">Owners</a>
        </li>
      </ul>
    </nav>
  </header>
;

export default Navigation;
```

All of the JSX, the html-looking tags, those get converted into the calls to `React.createElement`. When Babel gets done with it, it looks like this, which is just an ugly version of one call to `React.createElement` for each of the elements in the JSX.

```text
var Navigation = function Navigation() {
  return React.createElement("header", null, React.createElement("h1", null, "Petrack"), React.createElement("nav", null, React.createElement("ul", null, React.createElement("li", null, React.createElement("a", {
    href: "/pets"
  }, "Pets")), React.createElement("li", null, React.createElement("a", {
    href: "/owners"
  }, "Owners")))));
};
```

### Using the navigation component

Back in the **src/PetDetailPage.js** file, import the `Navigation` component and replace the `<div>PetDetailPage component</div>` with the `Navigation` component much like you did in the `App` component with `PetDetailPage`.

Once you save your files, you should see the navigation.

[![PetDetailPage navigation complete](https://github.com/bgoonz/React_Notes_V3/raw/master/my-other-notes-n-projects/images/react-pet-detail-page-nav-complete.png)](https://github.com/bgoonz/React_Notes_V3/blob/master/my-other-notes-n-projects/images/react-pet-detail-page-nav-complete.png)

### What just happened?

You created two new components and added them to the **src** directory. You imported them so that other components could use them. It was fast and easy and \(hopefully\) painless. JSX is lovely to work with, far easier than the calls to `React.createElement` if that didn't exist.

[Petrack with default PetDetailPage](https://github.com/bgoonz/React_Notes_V3/blob/master/my-other-notes-n-projects/images/create-react-app-with-default-pet-detail-page.png): images/create-react-app-with-default-pet-detail-page.pngimages/create-react-app-with-default-pet-detail-page.png6 orderedList=false} --&gt;

You will now work on creating the PetTrack page.

* `PetDetailPage`: Created in this step
* `Navigation`: Created in this step
* `PetDetails`
* `PetDetailList`
* `PetInformationItem`
* `OwnersList`
* `OwnerLink`

[![Petrack component analysis](https://github.com/bgoonz/React_Notes_V3/raw/master/my-other-notes-n-projects/images/pettrack-pet-detail-all-components-with-details-list.png)](https://github.com/bgoonz/React_Notes_V3/blob/master/my-other-notes-n-projects/images/pettrack-pet-detail-all-components-with-details-list.png)

### The strategy

This guide will work top-down, in that it will start with the top-most \(or outer-most\) component, the `PetDetailPage` component. Then, it will move to a next level component, like `Navigation`. It will just keep adding components and getting them to work with the data from the AJAX call.

### The pet detail page component

The `PetDetailPage` component will be responsible for showing the navigation component, the details list component, and the owners list component. None of those exist, yet, so just stub out a new component to hold the source.

Create a new file named **PetDetailPage.js** in the **src** directory. In that file, type this content into it.

```text
import React from 'react';

const PetDetailPage = () =>
  <div>PetDetailPage component</div> // Temporary so it builds
;

export default PetDetailPage;
```

Here's some analysis.

#### The import statement

You will notice that the top of the file imports the `React` object, but you do not use it anywhere in the file! You have to do this because, remember, each JSX element, like `<header>...</header>`, ends up getting translated to `React.createElement` calls. Without the `import` statement, the `React` object would not exist and compiling would fail.

#### The component

The `const PetDetailPage = () => ...` is just a normal arrow function.

The body of the component is a JSX expression `<div></div>` which Babel will translate into an invocation of `React.createElement`. Here's what it looks like after passing through Babel.

```text
var PetDetailPage = function PetDetailPage() {
  return React.createElement("div", null, "PetDetailPage component");
} // Temporary so it builds
;
```

#### The export statement

This is just so you can import it into other components for use, which you will do now.

### Using the pet detail page component

Open up **src/App.js**. Import the newly-created `PetDetailPage` component. Remember that this is Webpack that's doing this for you, so you _do not_ need to put the **.js** extension on the name of the module that you import.

Replace the `<h1>Hello</h1>` with `<PetDetailPage></PetDetailPage>`. Save all of your files. You should now see this content in your browser and _Components_ tab.

[![Petrack with default PetDetailPage](https://github.com/bgoonz/React_Notes_V3/raw/master/my-other-notes-n-projects/images/create-react-app-with-default-pet-detail-page.png)](https://github.com/bgoonz/React_Notes_V3/blob/master/my-other-notes-n-projects/images/create-react-app-with-default-pet-detail-page.png)

The content of the **src/App.js** should look similar to this.

```text
import React from 'react';

import PetDetailPage from './PetDetailPage';

function App() {
  return (
    <PetDetailPage></PetDetailPage>
  );
}

export default App;
```

Since `PetDetailPage` has no child content, you could also write that code like this, with the ending slash.

```text
import React from 'react';

import PetDetailPage from './PetDetailPage';

function App() {
  return (
    <PetDetailPage />
  );
}

export default App;
```

### The navigation component

Create a new file named **Navigation.js** in the **src** directory of your application. Put this content in there. Please type it rather than copy and paste it.

```text
import React from 'react';

const Navigation = () =>
  <header>
    <h1>Petrack</h1>
    <nav>
      <ul>
        <li>
          <a href="/pets">Pets</a>
        </li>
        <li>
          <a href="/owners">Owners</a>
        </li>
      </ul>
    </nav>
  </header>
;

export default Navigation;
```

All of the JSX, the html-looking tags, those get converted into the calls to `React.createElement`. When Babel gets done with it, it looks like this, which is just an ugly version of one call to `React.createElement` for each of the elements in the JSX.

```text
var Navigation = function Navigation() {
  return React.createElement("header", null, React.createElement("h1", null, "Petrack"), React.createElement("nav", null, React.createElement("ul", null, React.createElement("li", null, React.createElement("a", {
    href: "/pets"
  }, "Pets")), React.createElement("li", null, React.createElement("a", {
    href: "/owners"
  }, "Owners")))));
};
```

### Using the navigation component

Back in the **src/PetDetailPage.js** file, import the `Navigation` component and replace the `<div>PetDetailPage component</div>` with the `Navigation` component much like you did in the `App` component with `PetDetailPage`.

Once you save your files, you should see the navigation.

[![PetDetailPage navigation complete](https://github.com/bgoonz/React_Notes_V3/raw/master/my-other-notes-n-projects/images/react-pet-detail-page-nav-complete.png)](https://github.com/bgoonz/React_Notes_V3/blob/master/my-other-notes-n-projects/images/react-pet-detail-page-nav-complete.png)

### What just happened?

You created two new components and added them to the **src** directory. You imported them so that other components could use them. It was fast and easy and \(hopefully\) painless. JSX is lovely to work with, far easier than the calls to `React.createElement` if that didn't exist.

## JSX Walk-Through: Pet Details, Part 1

You will now start adding data rendering to the page with the components created and modified in this step.

* `PetDetailPage`: Modified in this step
* `Navigation`: Done
* `PetDetails`: Created in this step
* `PetDetailList`: Created in this step
* `PetInformationItem`: Created in this step
* `OwnersList`
* `OwnerLink`

[![Petrack component analysis](https://github.com/bgoonz/React_Notes_V3/raw/master/my-other-notes-n-projects/images/pettrack-pet-detail-all-components-with-details-list.png)](https://github.com/bgoonz/React_Notes_V3/blob/master/my-other-notes-n-projects/images/pettrack-pet-detail-all-components-with-details-list.png)

### Getting some data

Open the **src/index.js** file. In it, after the call to `ReactDOM.render`, create a fetch call for the RESTful endpoint [https://polar-beach-08187.herokuapp.com/api/pets/2](https://polar-beach-08187.herokuapp.com/api/pets/2). \(You can click on the link to see the data. That's "Mog", the cat. She is forgetful.\) Do all of the normal stuff that you would do with `async` functions and what not.

```text
(async () => {
  const url = 'https://polar-beach-08187.herokuapp.com/api/pets/2';
  const response = await fetch(url);
  if (response.ok) {
    const pet = await response.json();
    console.log(pet);
  }
})();
```

[![Petrack Mog data fetch](https://github.com/bgoonz/React_Notes_V3/raw/master/my-other-notes-n-projects/images/react-mog-data-pull.png)](https://github.com/bgoonz/React_Notes_V3/blob/master/my-other-notes-n-projects/images/react-mog-data-pull.png)

Now, to pass that data into your React components, you will pass it as a property. You have to pass it on the element getting rendered. React is all about rendering things. You can just call another render from inside your `async` function. But, this time, you will pass the pet data in as an attribute of the `App` component with curly braces to indicate to JSX that it is a data value and not a string.

```text
(async () => {
  const url = 'https://polar-beach-08187.herokuapp.com/api/pets/2';
  const response = await fetch(url);
  if (response.ok) {
    const pet = await response.json();
    console.log(pet);

    ReactDOM.render(
      <React.StrictMode>
        <App pet={pet} />   {/* Now, with data */}
      </React.StrictMode>,
      document.getElementById('root')
    );
  }
})();
```

This has changed everything! You don't see it, yet, but once the AJAX call completes, go look at the _Components_ tab of your DevTools. Click on the `App` component and look at the values in the right pane. React now knows about the data that you passed in!

Now, you need to pass that to the `PetDetailPage` component. In the **src/App.js** file, change the function's parameter list to have a single parameter named "props". Then, pass the value of `props.pet` into the pet attribute of the `PetDetailPage` component, similar to what you did in **src/index.js** for the `App` component. You should be able to see the props in the _Components_ tab for both the `App` and `PetDetailPage` components.

[![Data passed down to PetDetailPage](https://camo.githubusercontent.com/8cc6113ce88eebafd0e9beb8407ef4d7b1e1bd8752dcc76958e2b14b1cc0df68/68747470733a2f2f61707061636164656d792d6f70656e2d6173736574732e73332d75732d776573742d312e616d617a6f6e6177732e636f6d2f4d6f64756c61722d437572726963756c756d2f636f6e74656e742f72656163742d72656475782f746f706963732f696e74726f2d746f2d72656163742f6173736574732f6372656174652d72656163742d6170702d70617373696e672d646174612d696e746f2d7065742d64657461696c2d706167652e676966)](https://camo.githubusercontent.com/8cc6113ce88eebafd0e9beb8407ef4d7b1e1bd8752dcc76958e2b14b1cc0df68/68747470733a2f2f61707061636164656d792d6f70656e2d6173736574732e73332d75732d776573742d312e616d617a6f6e6177732e636f6d2f4d6f64756c61722d437572726963756c756d2f636f6e74656e742f72656163742d72656475782f746f706963732f696e74726f2d746f2d72656163742f6173736574732f6372656174652d72656163742d6170702d70617373696e672d646174612d696e746f2d7065742d64657461696c2d706167652e676966)

You will use that data to pass down into the detail components that you will now create.

### The pet details component

**Note**: This section introduces an error that you will fix. It is a common error, so knowing how to fix it when you see it is good information to have.

The `PetDetails` component is in charge of rendering the `PetDetailList` and the `OwnersList` components. For now, get a new component working.

Create a new file named **src/PetDetails.js**. Import the `React` object. Create a function-based `PetDetails` component that has a `props` parameter, and have it render an empty `div`. Export the component as the default export for the module.

In the **PetDetailPage.js** file, import the new `PetDetails` component. Change the `PetDetailPage` component to accept a `props` parameter rather then an empty parameter list. Then, use the `PetDetails` component in the body of the `PetDetailPage` as a sibling to the `Navigation` component. You need to pass the pet data into it. Your code should look like this. \(You may have empty tags rather than the self-closing slash tags. That's fine.\)

```text
import React from 'react';

import Navigation from './Navigation';
import PetDetails from './PetDetails';

const PetDetailPage = props =>
  <Navigation />
  <PetDetails pet={props.pet} />
;

export default PetDetailPage;
```

Save all of your files. Look at your browser. There is an error.

[![PetDetailPage with adjacent element error](https://github.com/bgoonz/React_Notes_V3/raw/master/my-other-notes-n-projects/images/create-react-app-pet-detail-page-without-single-root-error.png)](https://github.com/bgoonz/React_Notes_V3/blob/master/my-other-notes-n-projects/images/create-react-app-pet-detail-page-without-single-root-error.png)

This happens because components _must_ have a single top-level element. You can see that `PetDetailPage` now has two because both `Navigation` and `PetDetails` are at the top level.

To solve this, you need the two elements in a single element. You could do that with a `div`, for example.

```text
const PetDetailPage = props =>
  <div>
    <Navigation />
    <PetDetails pet={props.pet} />
  </div>
;
```

This is fine, except for when you don't want to introduce extra tags for no reason in your HTML. That is why, in React 16, the developers introduced the idea of a `Fragment`. The `Fragment` is a special placeholder that groups together JSX elements in the virtual DOM, but does not creating any tags in the real DOM. You can wrap those two elements \(or any number of elements\) in a `React.Fragment` JSX element like this.

```text
const PetDetailPage = props =>
  <React.Fragment>
    <Navigation />
    <PetDetails pet={props.pet} />
  </React.Fragment>
;
```

If you do that and save the file, the compile error goes away and you see the content as it should be.

Wrapping things in `Fragment` elements like that is such a common thing, that there is a shortcut syntax for it. Since the `Fragment` does not represent any real tag, you write it like an HTML tag that _has no name_.

```text
const PetDetailPage = props =>
  <>
    <Navigation />
    <PetDetails pet={props.pet} />
  </>
;
```

It's pretty weird. But, it's a very _React_ way of doing things.

### Create the pet detail list component

Here's some code for you that you can use for your `PetDetailList` component. Create a file named **src/PetDetailList.js** and put it in there. Feel free to copy and paste it so that you can get on to the neat-o data stuff.

```text
import React from 'react';

const PetDetailList = props =>
  <>
    <h2>Details</h2>
    <dl>

    </dl>
  </>
;

export default PetDetailList;
```

Back in **PetDetails.js**, import this new `PetDetailList` component, and replace the empty `div` with it.

```text
// Add the import line
import PetDetailList from './PetDetailList.js';

const PetDetails = props =>
  <PetDetailList pet={props.pet} />
;

export default PetDetails;
```

Refresh your page. You should now see the `PetDetailList` in the _Components_ tab. It's props should have all of data for the pet on it. You should also see the "Details" headline in the rendered HTML, too.

The next step is to create the `PetInformationItem` component to fill out that `dl` just yearning for content in the `PetDetailList` component.

### The pet information item component

**Note**: The following steps will introduce an error that you will fix. This is so you can get a feel for what kind of errors you will see when working with React.

**Mira's Note**: The following will not actually introduce an error for the reason provided, because there is no missing pass-down of props in the chain of nested components if you follow the instructions. The error described after it, however, will show.

Create a new file, **src/PetInformationItem.js**. It will contain a function-based component that needs data to render, so stub out the function with the "props" parameter. Don't forget to import the React. Then, it needs to render two elements, the `dt` element and the `dd` element. Do that by wrapping a fragment around them.

```text
<dt>Name of property</dt>
<dd>Value of property</dd>
```

So, the code will look something like this.

```text
import React from 'react';

const PetInformationItem = props =>
  <>
    <dt>{props.name}</dt>
    {/* Replace this with the dd element and value */}
  </>
;

export default PetInformationItem;
```

Replace the comment with a `dd` JSX element that has `props.value` as its content, similar to how the `dt` has `props.name` as its content.

That implies an expectation that this component _needs_ a property named "name" that will be used to render the `dt` element, and it _needs_ a property named "value" to render the `dd` element.

Once you have that done, it's time to use it in the `PetDetailList` components. Go back to **src/PetDetailList.js**. Import the `PetInformationItem` component. You will use it three times, to show the name, age, and pet type of the pet. Here's the first one. Just put it in there and save it because you have to investigate an error.

```text
const PetDetailList = props =>
  <>
    <h2>Details</h2>
    <dl>
      <PetInformationItem name="Name" value={props.pet.name}/>
    </dl>
  </>
;
```

This shows that `PetDetailList` now has an expectation that `props` will have a "name" property, an "age" property, and a "PetType" property that will have a "type" property on it! That's a lot of expectations...

If you refresh your page, an error might occur.

[![Petrack PetDetails with error](https://github.com/bgoonz/React_Notes_V3/raw/master/my-other-notes-n-projects/images/create-react-app-with-property-error.png)](https://github.com/bgoonz/React_Notes_V3/blob/master/my-other-notes-n-projects/images/create-react-app-with-property-error.png)

The _Create React App_ reports the error for you in the browser's main window. This is nice so that you don't have to go mucking about the console to try to determine what went wrong.

In the above screen shot, it complains that it cannot get the "property 'name' of undefined". If you get this error, make sure you are passing down the `pet` prop from the `App` component all the way down to the `PetDetailList` component. You can see all the props for each component in the Chrome dev tools Component tab.

The following conditions trigger that same error but for a different reason.

In the `src/index.js` file, you render `App` twice. Once before the fetch call, and once after the fetch response comes back. **NOTE: This is NOT the normal way to render the App after a fetch call. You will be learning a better way to use fetch calls with React tomorrow.**

Your `src/index.js` should now look like this:

```text
// ... imports
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

(async () => {
  const url = 'https://polar-beach-08187.herokuapp.com/api/pets/2';
  const response = await fetch(url);
  if (response.ok) {
    const pet = await response.json();
    ReactDOM.render(
      <React.StrictMode>
        <App pet={pet} />   {/* Now, with data */}
      </React.StrictMode>,
      document.getElementById('root')
    );
  }
})();
```

If you refresh your page, you should see the following error.

[![Petrack PetDetails with error](https://github.com/bgoonz/React_Notes_V3/raw/master/my-other-notes-n-projects/images/create-react-app-with-property-error.png)](https://github.com/bgoonz/React_Notes_V3/blob/master/my-other-notes-n-projects/images/create-react-app-with-property-error.png)

Can you see where that's happening in the **PetDetailList.js** file? Take a moment to figure out where the error is being thrown.

If you identified the expression `props.pet.name`, then you got it! Remember that when the React first renders the virtual DOM, it has _no data_. That doesn't come until later, after the AJAX call completes. There are _so many_ ways to fix this but **only one** is idiomatic React. That is the use of `defaultProps`.

Recall that the `PetDetailList` component has an expectation that the `props` value should have a "pet" property that is an object. You can specify a default value for the "pet" property for the `PetDetails` component by putting the following code _after_ the function declaration.

```text
PetDetailList.defaultProps = {
  pet: {},
};
```

This tells React that, when the `PetDetailList` renders, if the "pet" property of `props` is undefined, then it should use the default value specified in the assignment. This is a built-in React feature and fixes the problem.

Refresh the page. You should now see the page render and, when the AJAX call completes, the name "Mog" to appear.

Now, add the other two `PetInformationItem` calls. One should have the name "Age" and the value of `props.pet.age`. The second should have the name "Type" and the value of `props.pet.PetType.type`. That will cause another error, so take care of it in the `defaultProps`.

[![Petrack PetDetails before and after load](https://camo.githubusercontent.com/17ec7caf469354066cbc253ee3f9440fd721d1a0d386a8111de29765ed8fa7c2/68747470733a2f2f61707061636164656d792d6f70656e2d6173736574732e73332d75732d776573742d312e616d617a6f6e6177732e636f6d2f4d6f64756c61722d437572726963756c756d2f636f6e74656e742f72656163742d72656475782f746f706963732f696e74726f2d746f2d72656163742f6173736574732f72656163742d696e666f726d6174696f6e2d646174612d6c6f61642e676966)](https://camo.githubusercontent.com/17ec7caf469354066cbc253ee3f9440fd721d1a0d386a8111de29765ed8fa7c2/68747470733a2f2f61707061636164656d792d6f70656e2d6173736574732e73332d75732d776573742d312e616d617a6f6e6177732e636f6d2f4d6f64756c61722d437572726963756c756d2f636f6e74656e742f72656163742d72656475782f746f706963732f696e74726f2d746f2d72656163742f6173736574732f72656163742d696e666f726d6174696f6e2d646174612d6c6f61642e676966)

If it's hard to see the before load, comment out the async function in the `src/index.js` to see what the page looks like before the fetch call is made.

```text
// ... src/index.js

// (async () => {
//   const url = 'https://polar-beach-08187.herokuapp.com/api/pets/2';
//   const response = await fetch(url);
//   if (response.ok) {
//     const pet = await response.json();
//     ReactDOM.render(
//       <React.StrictMode>
//         <App pet={pet} />   {/* Now, with data */}
//       </React.StrictMode>,
//       document.getElementById('root')
//     );
//   }
// })();
```

If you want that yucky bumpy load to not happen, consider creating a default value for the "value" property in `PetInformationItem`. In the following screenshot, you can see what happens when you set a default value of "loading..." for the "value" property in `PetInformationItem`.

[![Petrack PetDetails with loading message](https://camo.githubusercontent.com/dcd0fcc5e6fcdb05d7992173a8064922d0076072d81f1d5dd9bbb601d076978f/68747470733a2f2f61707061636164656d792d6f70656e2d6173736574732e73332d75732d776573742d312e616d617a6f6e6177732e636f6d2f4d6f64756c61722d437572726963756c756d2f636f6e74656e742f72656163742d72656475782f746f706963732f696e74726f2d746f2d72656163742f6173736574732f72656163742d696e666f726d6174696f6e2d776974682d6c6f6164696e672d6d6573736167652d646174612d6c6f61642e676966)](https://camo.githubusercontent.com/dcd0fcc5e6fcdb05d7992173a8064922d0076072d81f1d5dd9bbb601d076978f/68747470733a2f2f61707061636164656d792d6f70656e2d6173736574732e73332d75732d776573742d312e616d617a6f6e6177732e636f6d2f4d6f64756c61722d437572726963756c756d2f636f6e74656e742f72656163742d72656475782f746f706963732f696e74726f2d746f2d72656163742f6173736574732f72656163742d696e666f726d6174696f6e2d776974682d6c6f6164696e672d6d6573736167652d646174612d6c6f61642e676966)

### What you've seen

In this part of building a React application, you have

* Passed data from an AJAX call \(or really wherever\) into a React component
* Accessed data using the conventionally-named `props` parameter in your function-based components
* Passed data from a "parent" component to a "child" component
* Used default values to prevent errors and improve the aesthetic experience of using your application

Just one more step and you're done!

## JSX Walk-Through: Pet Details, Part 2

All you have left is to create a list of owners with links.

* `PetDetailPage`: Done
* `Navigation`: Done
* `PetDetails`: Modified in this step
* `PetDetailList`: Done
* `PetInformationItem`: Done
* `OwnersList`: Created in this step
* `OwnerLink`Created in this step

[![Petrack component analysis](https://github.com/bgoonz/React_Notes_V3/raw/master/my-other-notes-n-projects/images/pettrack-pet-detail-all-components-with-details-list.png)](https://github.com/bgoonz/React_Notes_V3/blob/master/my-other-notes-n-projects/images/pettrack-pet-detail-all-components-with-details-list.png)

You're almost done. Now, you get to handle a collection of data from the owners.

### Stub out the owners list component

You've done this four other times, so it's pretty straight forward.

* Create the **src/OwnersList.js** file. In it,
  * Import the React object
  * Create the function-based component named `OwnersList` with a `props` argument that uses a `React.Fragment` as its element
  * Add a child that is an 'h2' with the content "Owners"
  * Using `defaultProps`, add a default property value for "owners" and set it to an empty array because this component will expect an array of owner data
  * Export the `OwnersList` as the default export
* In the **PetDetails.js** file,
  * Import the `OwnersList` component
  * Add it as another child element of the `PetDetailPage` component after the `PetDetailList`
  * Wrap both the `PetDetailList` and `OwnersList` in a `Fragment`.
  * Pass in the owners to the `OwnersList` component in a property named "owners" like this `{props.pet.Owners}` which will pass in the array of owners for the pet
  * Fix the error with a default value for the "pet" property

```text
// src/PetDetails.js
import React from 'react';

import OwnersList from './OwnersList';
import PetDetailList from './PetDetailList';

const PetDetails = props =>
  <>
    <PetDetailList pet={props.pet} />
    <OwnersList owners={props.pet.Owners} />
  </>
;

PetDetails.defaultProps = {
  pet: {
    PetType: {},
  },
};

export default PetDetails;
```

Refresh the page and make sure everything still works.

[![Petrack with owners headline](https://github.com/bgoonz/React_Notes_V3/raw/master/my-other-notes-n-projects/images/react-pet-detail-with-owners-headline.png)](https://github.com/bgoonz/React_Notes_V3/blob/master/my-other-notes-n-projects/images/react-pet-detail-with-owners-headline.png)

### Dealing with the list

**Note**: This section introduces an error that you will fix. It is a common error about how to create React elements from lists. You may see it often. This way, you will know how to fix it, too.

Back in **OwnersList.js**, you want a `ul` to follow the `h2`.

```text
const OwnersList = props =>
  <>
    <h2>Owners</h2>
    <ul>
      {/* Create li elements here */}
    </ul>
  </>
;
```

Here's the thing. You have an array of owners. You want to turn them into some list items. For each owner, you want to _map_ that to a list item. And, therein lies the hint. Since the value in `props.owners` is an array, you can use the `map` function to generate another array of React elements and plop them in there! Give it a go with this code. Replace the comment about where list items go above with this line of code.

```text
{ props.owners.map(owner =>
  <li>{owner.firstName}</li>
)}
```

Refresh the page. What happens? You should now see "Human" for each of the list items. That's great! In the console, there's an error. That's sad!

[![Petrack with owners list and key error](https://github.com/bgoonz/React_Notes_V3/raw/master/my-other-notes-n-projects/images/react-pet-detail-owners-list-with-key-error.png)](https://github.com/bgoonz/React_Notes_V3/blob/master/my-other-notes-n-projects/images/react-pet-detail-owners-list-with-key-error.png)

In this last step, you've changed the way you're passing children into the `React.createElement`. Up until now, you've had discrete single elements as children, like in **PetDetailList.js** where you have this code.

```text
const PetDetailList = props =>
  <>
    <h2>Details</h2>
    <dl>
      <PetInformationItem name="Name" value={props.pet.name}/>
      <PetInformationItem name="Age" value={props.pet.age}/>
      <PetInformationItem name="Type" value={props.pet.PetType.type}/>
    </dl>
  </>
;
```

Each of `PetInformationItem` elements is a different, discrete, and separate child for the `dl` element.

The code in **OwnersList.js**, this code,

```text
const OwnersList = props =>
  <>
    <h2>Owners</h2>
    <ul>
      {props.owners.map(owner =>
        <li>{owner.firstName}</li>
      )}
    </ul>
  </>
;
```

in that, you have created an _array_ of objects. Recall that when you call the `map` function on an array, it returns _another array_. React doesn't care about this, but it would like a little help in tracking each of those entries in the virtual DOM that it builds. That's what the error message is about, giving React a little help by providing a "key" property for each of the elements that you're creating in the array. The value of the "key" property must be unique and stable, that is, for a given object \(like an owner named "Human One" with an id of 7\), the value returned must always be the same. Luckily, because you have the id of the owner, you can use that because that id value is tied to a primary key, somewhere, and should never change for this object. The name can change, of course. But, the id will likely never change.

Add a "key" property to the `li` element and set it equal to the id of the owner object, like this.

```text
<li key={owner.id}>{owner.firstName}</li>
```

Now, the error in the console goes away.

Back to the `OwnersList` component, look at the formatting, the indentation that you see in the code.

```text
const OwnersList = props =>
  <>
    <h2>Owners</h2>
    <ul>
      {props.owners.map(owner =>
        <li key={owner.id}>
          {owner.firstName}
        </li>
      )}
    </ul>
  </>
;
```

That, too, is idiomatic React, the _React_ way of doing things. You'll see that kind of code all over the React world.

### The owner link component

While it's nice, and all, to see the owner's first name in the list, the actual page has a link to the owner page with the format "last name, first name". Time to create the \(last!\) component of this walk-through.

Create a new file named **src/OwnerLink.js**. In it, do the following:

* Import the React object
* Create a new function-based component named `OwnerLink` that accepts data that has
  * `a` as its element
  * An object literal with the property name "href" and the value of the "href" property passed in through the `props`
  * A string as its child which contains the last name and the first name
* Export the component as the default export

Once you have that, import the `OwnerLink` component into the **src/OwnersList.js** file. Now, replace this line in `OwnersList`

```text
{owner.firstName}
```

with an `OwnerLink` component with _three_ attributes: "href", "firstName", and "lastName". Those are the three properties expected inside the component. Use the curly brace syntax to pass in the appropriate values of the `owner`. This is something you haven't done, yet. Try to think through the problem of how to pass in _multiple_ property values. If you get stuck and can't get it after about ten minutes, ask for help!

Refresh the page. If everything works, you're done!

### What you've done, here

In this part of the walk-through, you used a collection to render a collection of React elements. You found out that using a collection like that requires you to provide a "key" property that has a stable, unique value. Once you had that, React would gladly manage that collection of objects in its virtual DOM.

### What you've done, overall

You have used JSX to do some amazing things, here.

* You reinforced the best practice of putting one React component in its own file \(module\) and exporting it as the default value of the module
* You learned that JSX compiles to `React.createElement`
* You learned that `<>` and `</>` are shorthand literal for the often-used `React.Fragment` element
* You used `defaultProps` to make sure that components always had some valid values to work with
* You used _pure functional components_ all the way through this, which means that none of the components used any other data than what was given to it
* You are intimately familiar with how React creates its elements, now, which means there will be no magical thinking about JSX when you use it

[Petrack with owners list and key error](https://github.com/bgoonz/React_Notes_V3/blob/master/my-other-notes-n-projects/images/react-pet-detail-owners-list-with-key-error.png): images/react-pet-detail-owners-list-with-key-error.pngimages/react-pet-detail-owners-list-with-key-error.png=6 orderedList=false} --&gt;

All you have left is to create a list of owners with links.

* `PetDetailPage`: Done
* `Navigation`: Done
* `PetDetails`: Modified in this step
* `PetDetailList`: Done
* `PetInformationItem`: Done
* `OwnersList`: Created in this step
* `OwnerLink`Created in this step

[![Petrack component analysis](https://github.com/bgoonz/React_Notes_V3/raw/master/my-other-notes-n-projects/images/pettrack-pet-detail-all-components-with-details-list.png)](https://github.com/bgoonz/React_Notes_V3/blob/master/my-other-notes-n-projects/images/pettrack-pet-detail-all-components-with-details-list.png)

You're almost done. Now, you get to handle a collection of data from the owners.

### Stub out the owners list component

You've done this four other times, so it's pretty straight forward.

* Create the **src/OwnersList.js** file. In it,
  * Import the React object
  * Create the function-based component named `OwnersList` with a `props` argument that uses a `React.Fragment` as its element
  * Add a child that is an 'h2' with the content "Owners"
  * Using `defaultProps`, add a default property value for "owners" and set it to an empty array because this component will expect an array of owner data
  * Export the `OwnersList` as the default export
* In the **PetDetails.js** file,
  * Import the `OwnersList` component
  * Add it as another child element of the `PetDetailPage` component after the `PetDetailList`
  * Wrap both the `PetDetailList` and `OwnersList` in a `Fragment`.
  * Pass in the owners to the `OwnersList` component in a property named "owners" like this `{props.pet.Owners}` which will pass in the array of owners for the pet
  * Fix the error with a default value for the "pet" property

```text
// src/PetDetails.js
import React from 'react';

import OwnersList from './OwnersList';
import PetDetailList from './PetDetailList';

const PetDetails = props =>
  <>
    <PetDetailList pet={props.pet} />
    <OwnersList owners={props.pet.Owners} />
  </>
;

PetDetails.defaultProps = {
  pet: {
    PetType: {},
  },
};

export default PetDetails;
```

Refresh the page and make sure everything still works.

[![Petrack with owners headline](https://github.com/bgoonz/React_Notes_V3/raw/master/my-other-notes-n-projects/images/react-pet-detail-with-owners-headline.png)](https://github.com/bgoonz/React_Notes_V3/blob/master/my-other-notes-n-projects/images/react-pet-detail-with-owners-headline.png)

### Dealing with the list

**Note**: This section introduces an error that you will fix. It is a common error about how to create React elements from lists. You may see it often. This way, you will know how to fix it, too.

Back in **OwnersList.js**, you want a `ul` to follow the `h2`.

```text
const OwnersList = props =>
  <>
    <h2>Owners</h2>
    <ul>
      {/* Create li elements here */}
    </ul>
  </>
;
```

Here's the thing. You have an array of owners. You want to turn them into some list items. For each owner, you want to _map_ that to a list item. And, therein lies the hint. Since the value in `props.owners` is an array, you can use the `map` function to generate another array of React elements and plop them in there! Give it a go with this code. Replace the comment about where list items go above with this line of code.

```text
{ props.owners.map(owner =>
  <li>{owner.firstName}</li>
)}
```

Refresh the page. What happens? You should now see "Human" for each of the list items. That's great! In the console, there's an error. That's sad!

[![Petrack with owners list and key error](https://github.com/bgoonz/React_Notes_V3/raw/master/my-other-notes-n-projects/images/react-pet-detail-owners-list-with-key-error.png)](https://github.com/bgoonz/React_Notes_V3/blob/master/my-other-notes-n-projects/images/react-pet-detail-owners-list-with-key-error.png)

In this last step, you've changed the way you're passing children into the `React.createElement`. Up until now, you've had discrete single elements as children, like in **PetDetailList.js** where you have this code.

```text
const PetDetailList = props =>
  <>
    <h2>Details</h2>
    <dl>
      <PetInformationItem name="Name" value={props.pet.name}/>
      <PetInformationItem name="Age" value={props.pet.age}/>
      <PetInformationItem name="Type" value={props.pet.PetType.type}/>
    </dl>
  </>
;
```

Each of `PetInformationItem` elements is a different, discrete, and separate child for the `dl` element.

The code in **OwnersList.js**, this code,

```text
const OwnersList = props =>
  <>
    <h2>Owners</h2>
    <ul>
      {props.owners.map(owner =>
        <li>{owner.firstName}</li>
      )}
    </ul>
  </>
;
```

in that, you have created an _array_ of objects. Recall that when you call the `map` function on an array, it returns _another array_. React doesn't care about this, but it would like a little help in tracking each of those entries in the virtual DOM that it builds. That's what the error message is about, giving React a little help by providing a "key" property for each of the elements that you're creating in the array. The value of the "key" property must be unique and stable, that is, for a given object \(like an owner named "Human One" with an id of 7\), the value returned must always be the same. Luckily, because you have the id of the owner, you can use that because that id value is tied to a primary key, somewhere, and should never change for this object. The name can change, of course. But, the id will likely never change.

Add a "key" property to the `li` element and set it equal to the id of the owner object, like this.

```text
<li key={owner.id}>{owner.firstName}</li>
```

Now, the error in the console goes away.

Back to the `OwnersList` component, look at the formatting, the indentation that you see in the code.

```text
const OwnersList = props =>
  <>
    <h2>Owners</h2>
    <ul>
      {props.owners.map(owner =>
        <li key={owner.id}>
          {owner.firstName}
        </li>
      )}
    </ul>
  </>
;
```

That, too, is idiomatic React, the _React_ way of doing things. You'll see that kind of code all over the React world.

### The owner link component

While it's nice, and all, to see the owner's first name in the list, the actual page has a link to the owner page with the format "last name, first name". Time to create the \(last!\) component of this walk-through.

Create a new file named **src/OwnerLink.js**. In it, do the following:

* Import the React object
* Create a new function-based component named `OwnerLink` that accepts data that has
  * `a` as its element
  * An object literal with the property name "href" and the value of the "href" property passed in through the `props`
  * A string as its child which contains the last name and the first name
* Export the component as the default export

Once you have that, import the `OwnerLink` component into the **src/OwnersList.js** file. Now, replace this line in `OwnersList`

```text
{owner.firstName}
```

with an `OwnerLink` component with _three_ attributes: "href", "firstName", and "lastName". Those are the three properties expected inside the component. Use the curly brace syntax to pass in the appropriate values of the `owner`. This is something you haven't done, yet. Try to think through the problem of how to pass in _multiple_ property values. If you get stuck and can't get it after about ten minutes, ask for help!

Refresh the page. If everything works, you're done!

### What you've done, here

In this part of the walk-through, you used a collection to render a collection of React elements. You found out that using a collection like that requires you to provide a "key" property that has a stable, unique value. Once you had that, React would gladly manage that collection of objects in its virtual DOM.

### What you've done, overall

You have used JSX to do some amazing things, here.

* You reinforced the best practice of putting one React component in its own file \(module\) and exporting it as the default value of the module
* You learned that JSX compiles to `React.createElement`
* You learned that `<>` and `</>` are shorthand literal for the often-used `React.Fragment` element
* You used `defaultProps` to make sure that components always had some valid values to work with
* You used _pure functional components_ all the way through this, which means that none of the components used any other data than what was given to it
* You are intimately familiar with how React creates its elements, now, which means there will be no magical thinking about JSX when you use it

