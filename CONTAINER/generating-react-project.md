# Getting Started

> ## Super Simple Intro To React <a id="bb0f"></a>
>
> ### This is a basic introduction for those who feel overwhelmed by the vast microcosm that is the React ecosystem! <a id="ea6d"></a>
>
>
>
> ## Here’s a sandbox for you to practice with: <a id="9cd6"></a>
>
> [IntroductionJSX is optional and not required to use React. Try the to see the raw JavaScript code produced by the JSX compilation…webdevhub-1.gitbook.io](https://webdevhub-1.gitbook.io/mynotes/)
>
> ## Introduction to React <a id="8e3f"></a>
>
> * Simply a nice library that turns data into DOM.
> * **`Tree Diffing`** : Fast comparison and patching of data by comparing the current virtual DOM and new virtual DOM - updating only the pieces that change.
> * `It's just a tree with some fancy diffing`
>
> ## Create Element <a id="049b"></a>
>
> **From JavaScript To DOM**
>
> * The `React.createElement` function has the following form:
>
> ```text
> React.createElement(type, [props], [...children]);
> ```
>
> * **`Type`** : Type of element to create, i.e. a string for an HTML element or a reference to a function or class that is a React component.
> * **`Props`** : Object that contains data to render the element.
> * **`Children`** : Children of the element, as many as you want.
>
> **Creating elements**
>
> * Our rendering goal:
>
> ```javascript
> <ul>
>   <li class="selected">
>     <a href="/pets">Pets</a>
>   </li>
>   <li>
>     <a href="/owners">Owners</a>
>   </li>
> </ul>
> ```
>
> * There are five tags to create:
> * One `ul`
> * Two `li`
> * Two `a`
>
> > There are certain attributes we want to appear in the DOM for these tags as well:
>
> * Each `li` has a `class` \(or `className` in React\)
> * Both `a` ele's have `href` attributes
> * Also keep in mind the parent child relationships happening between the tags.
> * `ul` is the parent of both `li`
> * Each `li` has an `a` element as a child
> * Each `a` has a `text content` child
>
> ```javascript
> React.createElement(
>   "ul",
>   null,
>   React.createElement(
>     "li",
>     { className: "selected" },
>     React.createElement("a", { href: "/pets" }, "Pets")
>   ),
>   React.createElement(
>     "li",
>     null,
>     React.createElement("a", { href: "/owners" }, "Owners")
>   )
> );
> ```
>
> **Converting to virtual DOM**
>
> * After you set up your `React.createElement`, you use `React.render` to take the value returned from cE and a DOM node to insert into the conversion of the real DOM.
>
> ```javascript
> // Put the element tree in a variable
> const navList = React.createElement(
>   "ul",
>   null,
>   React.createElement(
>     "li",
>     { className: "selected" },
>     React.createElement("a", { href: "/pets" }, "Pets")
>   ),
>   React.createElement(
>     "li",
>     null,
>     React.createElement("a", { href: "/owners" }, "Owners")
>   )
> );// Get a DOM node for React to render to
> const mainElement = document.querySelector("main");// Give React the element tree and the target
> ReactDOM.render(navList, mainElement);
> ```
>
> > JS Code =&gt; Virtual DOM =&gt; Real Dom
>
> **Updates**
>
> * If you call React.render a second or multiple times it just checks the existing Virtual DOM and it knows which smaller areas to change.
>
> **Thinking in Components**
>
> * Components are pieces of reusable front-end pieces.
> * Components should be Single Responsibility Principle compliant.
>
> ## Create Element <a id="4ba0"></a>
>
> **`React.createElement Demo`**
>
> * Can import non-local dependencies with `import 'package-link'`
>
> ```javascript
> const App = () => React.createElement("h1", null, "Hello, Programmers!");const target = document.querySelector("main");
> const app = React.createElement(App, null);
> // Give React the element tree and the target
> ReactDOM.render(app, target);
> ```
>
> * Remember when importing modules from other files you have to denote the file type in the import statement.
>
> **HTML Original**
>
> ```javascript
> <section class="clue">
>   <h1 class="clue__title">Clue$ 268530</h1>
>   <div class="clue__question">
>       2009: I dreamed a Dream
>   </div>
>   <div class="clue__category">
>       <<unparsed>>
>   </div>
>   <div class="clue__amount">
>       $800
>   </div>
> </section>
> ```
>
> **React Version**
>
> ```javascript
> const Clue = () =>
>   React.createElement(
>     "section",
>     { className: "clue" },
>     React.createElement("h1", { className: "clue__title" }, "Title"),
>     React.createElement("div", { className: "clue__question" }, "?"),
>     React.createElement("div", { className: "clue__category" }, "Category"),
>     React.createElement("div", { className: "clue__amount" }, "$800")
>   );
> ```
>
> * Because `class` is a reserved keyword in JS, in React we can use `className` to assign a class to an element.
> * Remember the data that goes into createElement: element type, data to pass into the element, and then children.
> * **`props`** : Properties;
> * To handle certain values that are initially undefined, we can use `defaultProps`.
>
> ```text
> Clue.defaultProps = {
>   category: {},
> };
> ```
>
> * You can change in the devTools Network tab the internet speed to check for values that may be undefined to hangle with defaultProps.
> * If we fetch multiple pieces of data, we can render many things by using `map`.
> * You need to assign a unique key to each of the clues.
> * We need to keep track of them individually so that React can easily refer to a specific one if there is an issue. `clue => { key:clue.id, ...clue }`
>
> ```javascript
> const App = (props) =>
>   React.createElement(
>     "h1",
>     null,
>     props.clues.map((clue) =>
>       React.createElement(Clue, { key: clue.id, ...clue })
>     )
>   );export default App;
> ```
>
> * Note: JSX is preferred over React.createElement;
>
> ## Notes from Hello Programmer Exercise <a id="a91a"></a>
>
> * When you import modules from websites they must have CORs activated.
> * These import statements, import `global variables`.
> * When we want to move our code into production we need to change the imports into the production minified versions.
>
> ```text
> import "https://unpkg.com/react@16/umd/react.production.min.js";
> import "https://unpkg.com/react-dom@16.13.1/umd/react-dom.production.min.js";
> ```
>
> * While we will never actually be creating full apps with just React.createElement =&gt; it is the enginer that is running under the hood!
>
> ```javascript
> import "https://unpkg.com/react@16/umd/react.development.js";
> import "https://unpkg.com/react-dom@16/umd/react-dom.development.js";const Links = () =>
>   React.createElement(
>     "ul",
>     { id: "nav-links" },
>     React.createElement(
>       "li",
>       { className: "is-selected" },
>       React.createElement("a", { href: "https://bgoonz-blog.netlify.app/" }, "BgoonzBlog2.0")
>     ),
>     React.createElement(
>       "li",
>       null,
>       React.createElement("a", { href: "https://github.com/bgoonz/" }, "Github")
>     )
>   );// Set up React Element: Type, Imported Data, Child (Child is Text in this Scenario)
> // HelloWorld is a function based component
> const HelloWorld = () => React.createElement("h1", null, "Hello, Programmers");const AllTogether = () =>
>   React.createElement(
>     "div",
>     null,
>     React.createElement(HelloWorld, null),
>     React.createElement(Links, null)
>   );// Target the Element to append new Ele
> const target = document.querySelector("main");// Assign your 'App' to your created Elements
> // We are creating an element from the HelloWorld function.
> const app = React.createElement(AllTogether, null);// Render from the Virtual Dom to the Actual Dom
> ReactDOM.render(app, target);
> ```
>
> ## Introduction to JSX <a id="acc4"></a>
>
> * **`JSX`** : Javascript Extension, a new language created by React developers to have an easier way of interacting with the React API.
>
> **How to use JSX**
>
> * We will use **`babel`** to convert version of modern JS into an older version of JS. **React Create Element**
>
> ```javascript
> const ExampleComponent = (props) =>
>   React.createElement(
>     React.Fragment,
>     null,
>     React.createElement("h1", null, "Hello!"),
>     React.createElement("img", { src: "https://via.placeholder.com/150" }),
>     React.createElement("a", { href: props.searchUrl }, props.searchText)
>   );
> ```
>
> **JSX Version**
>
> ```javascript
> const ExampleComponent = (props) => (
>   <React.Fragment>
>     <h1>Hello!</h1>
>     <img src="https://via.placeholder.com/150" />
>     <a href={props.searchUrl}>{props.searchText}</a>
>   </React.Fragment>
> );
> ```
>
> * Keep in mind that self closing tags in React must have a `forward slash` to close it.
>
> ## Properties and Data <a id="d69a"></a>
>
> ```javascript
> <img src="https://via.placeholder.com/150" />;
> // becomes..
> React.createElement("img", { src: "https://via.placeholder.com/150" });
> // if we want to pass in data vs just a string literal
> <a href={props.searchUrl}>{props.searchText}</a>;
> // so it becomes..
> React.createElement("a", { href: props.searchUrl }, props.searchText);
> // if you want the text search uppercase..
> <a href={props.searchUrl}>{props.searchText.toUpperCase()}</a>;
> ```
>
> * Comments in JSX have the following syntax:
>
> ```text
> <div>
>   <h2>This is JSX</h2>
>   {/* This is a comment in JSX */}
> </div>
> ```
>
> ### `Property Names`: <a id="4ba8"></a>
>
> * **`checked`** : Attribute of input components such as checkbox or radio, use it to set whether the component is checked or not.
> * **`className`** : Used to specify a CSS class.
> * **`dangerouslySetInnerHTML`** : React's equivalent of innerHTML because it is risky to cross-site scripting attacks.
> * **`htmlFor`** : Because `for` is protected keyword, React elements use this instead.
> * **`onChange`** : Event fired whenever a form field is changed.
> * **`style`** : Accepts a JS object with camelCase properties rather than a CSS string.
> * **`value`** : Supported by Input, Select, and TextArea components; use it to set the value of the component.
>
> > Note: React uses camel-case!!!
>
> ### The JSX semicolon gotcha <a id="cd1e"></a>
>
> * We wrap what want to return in parenthesis so JS doesn’t auto add semi-colons after every line and run the code incorrectly.
>
> ```javascript
> function App() {
>   return (
>     <div>
>       <h1>Hello!</h1>
>       <div>Welcome to JSX.</div>
>     </div>
>   );
> }
> ```
>
> ### create Element equivalent <a id="65c8"></a>
>
> ```javascript
> is equivalent tofunction App() {
>   return (
>     React.createElement(
>       'div',
>       null,
>       React.createElement('h1', null, 'Hello!'),
>       React.createElement('div', null, 'Welcome to JSX.'),
>     )
>   );
> }
> ```
>
> * Just remember if you decided to use the return keyword in a function to ‘return some JSX’, then make sure you wrap the JSX in parenthesis.
>
> `npx create-react-app my-app`
>
> * Single line used to initiate a React application.
> * React has a great toolchain where you can see changes live as you’re editing your application.
> * React errors will be rendered directly onto the browser window.
> * A downside is that it installs a lot of bloat files.
> * Examples of React create Element and JSX equivalent
>
> ```javascript
> React.createElement(
>   "a",
>   {
>     className: "active",
>     href: "https://github.com/bgoonz/",
>   },
>   "Github"
> );
> // JSX Version
> <a className="active" href="https://github.com/bgoonz/">
>   Github
> </a>;React.createElement(
>   OwnerDetails,
>   {
>     owner: props.data.owner,
>     number: props.index + 1,
>   },
>   props.name
> );
> // JSX Version
> <OwnerDetails owner={props.data.owner} number={props.index + 1}>
>   {props.name}
> </OwnerDetails>;
> ```
>
> **More Complex JSX Example**
>
> ```javascript
> const BookPanel = (props) => {
>   <section className="book" id={`book-${props.id}`}>
>     <h1 className="book__title">{props.title}</h1>
>     <img src={props.coverUrl} />
>     <div className="book__desc">{props.description}</div>
>   </section>;
> };
> ```
>
> ## My Blog: <a id="c68d"></a>
>
> [Web-Dev-HubMemoization, Tabulation, and Sorting Algorithms by Example Why is looking at runtime not a reliable method of…master — bgoonz-blog.netlify.app  
> ](https://master--bgoonz-blog.netlify.app/)
>
>
>
> A JavaScript library for building user interfaces

![](https://miro.medium.com/max/851/0*3wl1cp6IklxaFuBi.gif)

Use an integrated toolchain for the best user and developer experience.

This page describes a few popular React toolchains which help with tasks like:

* Scaling to many files and components.
* Using third-party libraries from npm.
* Detecting common mistakes early.
* Live-editing CSS and JS in development.
* Optimizing the output for production.

The toolchains recommended on this page **don’t require configuration to get started**.

If you don’t experience the problems described above or don’t feel comfortable using JavaScript tools yet, consider [adding React as a plain `<script>` tag on an HTML page](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/docs/add-react-to-a-website.html), optionally [with JSX](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/docs/add-react-to-a-website.html#optional-try-react-with-jsx).

This is also **the easiest way to integrate React into an existing website.** You can always add a larger toolchain if you find it helpful!

The React team primarily recommends these solutions:

* If you’re **learning React** or **creating a new** [**single-page**](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/docs/glossary.html#single-page-application) **app,** use [Create React App]().
* If you’re building a **server-rendered website with Node.js,** try [Next.js]().
* If you’re building a **static content-oriented website,** try [Gatsby]().
* If you’re building a **component library** or **integrating with an existing codebase**, try [More Flexible Toolchains]().

## Create React App

[Create React App](https://github.com/facebookincubator/create-react-app) is a comfortable environment for **learning React**, and is the best way to start building **a new** [**single-page**](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/docs/glossary.html#single-page-application) **application** in React.

It sets up your development environment so that you can use the latest JavaScript features, provides a nice developer experience, and optimizes your app for production. You’ll need to have [Node &gt;= 10.16 and npm &gt;= 5.6](https://nodejs.org/en/) on your machine. To create a project, run:

```text
npx create-react-app my-app
cd my-app
npm start
```

> Note
>
> `npx` on the first line is not a typo — it’s a [package runner tool that comes with npm 5.2+](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b).

Create React App doesn’t handle backend logic or databases; it just creates a frontend build pipeline, so you can use it with any backend you want. Under the hood, it uses [Babel](https://babeljs.io/) and [webpack](https://webpack.js.org/), but you don’t need to know anything about them.

When you’re ready to deploy to production, running `npm run build` will create an optimized build of your app in the `build` folder. You can learn more about Create React App [from its README](https://github.com/facebookincubator/create-react-app#create-react-app--) and the [User Guide](https://facebook.github.io/create-react-app/).

## Next.js

[Next.js](https://nextjs.org/) is a popular and lightweight framework for **static and server‑rendered applications** built with React. It includes **styling and routing solutions** out of the box, and assumes that you’re using [Node.js](https://nodejs.org/) as the server environment.

Learn Next.js from [its official guide](https://nextjs.org/learn/).

## Gatsby

[Gatsby](https://www.gatsbyjs.org/) is the best way to create **static websites** with React. It lets you use React components, but outputs pre-rendered HTML and CSS to guarantee the fastest load time.

Learn Gatsby from [its official guide](https://www.gatsbyjs.org/docs/) and a [gallery of starter kits](https://www.gatsbyjs.org/docs/gatsby-starters/).

## More Flexible Toolchains

The following toolchains offer more flexibility and choice. We recommend them to more experienced users:

* [**Neutrino**](https://neutrinojs.org/) combines the power of [webpack](https://webpack.js.org/) with the simplicity of presets, and includes a preset for [React apps](https://neutrinojs.org/packages/react/) and [React components](https://neutrinojs.org/packages/react-components/).
* [**Nx**](https://nx.dev/react) is a toolkit for full-stack monorepo development, with built-in support for React, Next.js, [Express](https://expressjs.com/), and more.
* [**Parcel**](https://parceljs.org/) is a fast, zero configuration web application bundler that [works with React](https://parceljs.org/recipes.html#react).
* [**Razzle**](https://github.com/jaredpalmer/razzle) is a server-rendering framework that doesn’t require any configuration, but offers more flexibility than Next.js.

A JavaScript build toolchain typically consists of:

* A **package manager**, such as [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/). It lets you take advantage of a vast ecosystem of third-party packages, and easily install or update them.
* A **bundler**, such as [webpack](https://webpack.js.org/) or [Parcel](https://parceljs.org/). It lets you write modular code and bundle it together into small packages to optimize load time.
* A **compiler** such as [Babel](https://babeljs.io/). It lets you write modern JavaScript code that still works in older browsers.

If you prefer to set up your own JavaScript toolchain from scratch, [check out this guide](https://blog.usejournal.com/creating-a-react-app-from-scratch-f3c693b84658) that re-creates some of the Create React App functionality.

Don’t forget to ensure your custom toolchain [is correctly set up for production](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/docs/optimizing-performance.html#use-the-production-build).

[Source](https://reactjs.org/docs/create-a-new-react-app.html)

