# Learn ReactJS 

> How do I put one HTML file in another HTML file?

When we create HTML files by hand, we often come across the problem of reusability. For example, we may want to reuse a `heading` component across a bunch of HTML files. Or, we have a navigation bar, and we want to avoid copying and pasting each navigation item over and over again. React helps us solve this problem.

Fundamentals
------------

Before I show you how to do this, I'd like to share one of the fundamental concepts of React. Components. You can think of a component as a capsule that contains some HTML, CSS, and JavaScript.

Let me show you some examples

[![](https://storage.googleapis.com/replit/images/1561252846504_5e3cc11a92f83c5fe98fe1b11797d4e1.png)](https://storage.googleapis.com/replit/images/1561252846504_5e3cc11a92f83c5fe98fe1b11797d4e1.png)

As you can see, each colored rectangle is a component. Rectangles that have the same color are the same component, but with a few differences. For example, all the components with the blue rectangle look the same because they all have a title, a 'last edited' time, and a picture. The differences are the actual numbers, and the actual text of the titles. The formatting is near-identical.

I found another website, and outlined a few components. The header component is in red, and the navigation components are in yellow.

[![](https://storage.googleapis.com/replit/images/1561236547119_ea1ac7638720be70487e3f3be63e6d25.png)](https://storage.googleapis.com/replit/images/1561236547119_ea1ac7638720be70487e3f3be63e6d25.png)

From these example, you may have noticed that components are made to be reusable. That's part of the point. 🙂 So rather than having the following in your HTML:

    <nav>
        <ul>
            <li>
                <div class="wrapper">
                    <a href="/">Home</a>
                </div>
            </li>
            <li>
                <div class="wrapper">
                    <a href="/about">About</a>
                </div>
            </li>
            <li>
                <div class="wrapper">
                    <a href="/contact">Contact</a>
                </div>
            </li>
        </ul>
    </nav>

You may want to have something like this:

    <nav>
        <ul>
            <NavigationItem></NavigationItem>
            <NavigationItem></NavigationItem>
            <NavigationItem></NavigationItem>
        </ul>
    </nav>

(Note that this is not valid HTML markup, but it's useful to think this way when using React components)

Each `<NavigationItem>` is a reusable component and may contain the following.

    <li>
        <div>
            <a href="placeholder1">placeholder 2</a>
        </div>
    </li>

Although this code won't actually run, it's useful to have this mindset of components. If you are reusing a set of element on the page, it's likely you can create a component out of it.

Components in React
-------------------

You create components in React with something called [JSX](https://reactjs.org/docs/introducing-jsx.html). In a nutshell, it's a way of writing HTML in JavaScript.

Here is a classic example of JSX

    const element = <h1>Hello, world!</h1>;

With some special tools, you will be able to create HTML elements using this kind of syntax with React.

Here is another example - writing JSX over multiple lines.

    let MyComponent = (
        <div className="App">
            <h1>Very neat</h1>
            <MyOtherComponent />
      </div>
    );

As you have noticed, one main difference between writing HTML and JSX, is the use of [HTML classes](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/class). Because JSX is more close to JavaScript (rather than HTML), you cannot use the word `class`. It's a reserved word (see [JS Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)). If we ever want to have an HTML class, we just have to write `className` instead of `class`.

Creating a React Repl 🚀
------------------------

Now that we know a bit about `React`, and `JS`, let's create a `React` repl!

[![](https://storage.googleapis.com/replit/images/1561247370292_b2935d177fb4040ca76d8babde1eb169.png)](https://storage.googleapis.com/replit/images/1561247370292_b2935d177fb4040ca76d8babde1eb169.png)

A bunch of files are already created for us. I'd recommend looking at `public/index.html`. This is the actual `html` file that's send to your browser.

You might be a little confused because there aren't any `<script></script>` tags to any JavaScript files or `<link>` tags to any CSS files. But after "Inspect Elementing" our website, you can clearly see that someone put them there (see the bottom of the orange rectangle or underneath the red rectangle).

[![](https://storage.googleapis.com/replit/images/1561323653360_acd8e1eb433c4022f2a20968f1f35f25.png)](https://storage.googleapis.com/replit/images/1561323653360_acd8e1eb433c4022f2a20968f1f35f25.png)

Who's putting our script tags there? The details are a bit too complicated for this tutorial, but just know that certain build tools automatically inject JavaScript and CSS files in our HTML. You don't need to know about these tools right now. Just know they exist when you create a React repl, and that they work ✨magically ✨behind the scenes.

Before we leave our `index.html` element, just take a mental note of the single HTML in our `<body>` tag

    <div id="root"></div>

So now let's check out our `src/index.js` (I deleted a few lines, since some of them were not needed).

[![](https://storage.googleapis.com/replit/images/1561248344033_517b2240d5a212b4297dee54fdc2002b.png)](https://storage.googleapis.com/replit/images/1561248344033_517b2240d5a212b4297dee54fdc2002b.png)

`index.js` is the start for our app. Here, we're importing React, our global CSS, and our main `App` component.

*   Our global CSS is the `index.css` file. It contains CSS for the entire page. Don't put too much CSS in here since it can potentially override CSS in your React components
*   Our `App` component is where all our other components will start. For example, you might have a `<Heading />`, `<BodyComponent />`, and `<FooterComponent />` in your `App` component

Under all the imports,, we really have one line of code on our page

    ReactDOM.render(<App />, document.getElementById('root'));

It's pretty self explanatory, but this makes React render our App component. It renders our App component and puts it all inside of that `<div id="root"></div>` element that I showed you earlier.

So React is rendering our `App` component! What is inside of of it?

[![](https://storage.googleapis.com/replit/images/1561238900833_754ee5ebfcc924a6612805353cb45f2b.png)](https://storage.googleapis.com/replit/images/1561238900833_754ee5ebfcc924a6612805353cb45f2b.png)

Here, we create a class called `App`. This class is a React component. Inside this class, we are creating a render function. This function returns JSX, which will eventually get rendered on the screen.

If you're a bit confused, try looking at the render function this way:

    class App extends Component {
        render() {
            let myJSX = (
                <div className="App">
                    <header className="App-header">
                       ...
                    </header>
                </div>
            );
            return myJSX;
        }
    }

Here, we explicitly create a variable called `myJSX`, then return it.

Creating our Own Components
---------------------------

Now you know a bit about `React` and `JSX`, let's create our own components. Components are usually put in a folder titled `components`.

[![](https://storage.googleapis.com/replit/images/1561243541448_9344f05b43f33f43d64dba5aff6a127c.png)](https://storage.googleapis.com/replit/images/1561243541448_9344f05b43f33f43d64dba5aff6a127c.png)

I'm going to start off by making a Heading component. I only have text in here, just to keep it simple.

We want to put the `Heading` component inside our `App` component. To do this, we just have to import it inside our `App` component!

    import Heading from './components/Heading'

Now, anywhere in your JSX, you can add the `<Heading />` element. I'm going to add it to the top.

[![](https://storage.googleapis.com/replit/images/1561243568219_a4fc4c223367f3652da681f19d62ee03.png)](https://storage.googleapis.com/replit/images/1561243568219_a4fc4c223367f3652da681f19d62ee03.png)

It's working! However, the formatting is a bit off since there is a scrollbar. I solved this by removing everything inside of `<header></header>` and replacing it with my own `<Body />` component. I also replaced the `App.css` file with my own `css`:

    * {
      margin: 0;
      padding: 0;
    }
    
    html, body {
      height: 100%;
      width: 100%;
    }
    
    .App {
      height: 100%;
    }

If you want to see the repl up to this point, you can find it [here](https://repl.it/@eankeen/react-tutorial). It looks like this:

[![](https://storage.googleapis.com/replit/images/1561244980323_de21ec9735cbd8c6901a408c94931069.png)](https://storage.googleapis.com/replit/images/1561244980323_de21ec9735cbd8c6901a408c94931069.png)

Remember how I was talking about reusing components? This is where we would do it - just copy whatever element you want to be repeated!

[![](https://storage.googleapis.com/replit/images/1561323934183_a7c5e512ae3688cf4a763acb425041e5.png)](https://storage.googleapis.com/replit/images/1561323934183_a7c5e512ae3688cf4a763acb425041e5.png)

Go ahead and try to play around - create some components and add them to your `App`, `Heading`, or `Body` component!

Props
-----

There is one more basic concept that you should know about: props. Props (which stands for properties) let us transfer data from our parent component to a child component. This might sound confusing at first, but hopefully it'll clear up when I give an example.

For this example, I'm going to be using the repl located [here](https://repl.it/@eankeen/react-tutorial-1).

### Example

I want to transfer data from my `Heading` to each `NavigationItem`. So, the parent component is `Heading` and child component is `NavigationItem`.

Inside of the parent component, I need to have my child component imported and being used.

[![](https://storage.googleapis.com/replit/images/1561250249289_e3221fc9acdeb03d5a2d1cedf84b8f8f.png)](https://storage.googleapis.com/replit/images/1561250249289_e3221fc9acdeb03d5a2d1cedf84b8f8f.png)

I already have imported the `NavigationItem` component. I'm also using it (3 times).

The next step is to add the prop. Props need to have a name and a value. I'm going to name them `myPropName` and `myPropValue`

[![](https://storage.googleapis.com/replit/images/1561250581141_d5fb212826ef65da1bc9cbd49f30c0ff.png)](https://storage.googleapis.com/replit/images/1561250581141_d5fb212826ef65da1bc9cbd49f30c0ff.png)

Great! We're now sending the prop from our `Heading` component to the `NavigationItem` component! We are almost finished - now we just have to render it!

The props you pass down are properties of the `this.props` object. Simply access your prop by its name (in the child component), and you're good to go! Don't forget to add the `{}`curly brackets!

[![](https://storage.googleapis.com/replit/images/1561250630261_d5c0edc32ae9fdbd3ec459a3f34cb98b.png)](https://storage.googleapis.com/replit/images/1561250630261_d5c0edc32ae9fdbd3ec459a3f34cb98b.png)

You can also use props when you're dealing with HTML attribute values. Just add brackets and access the prop!

    <img src={ this.props.myImageLink } />

I hope this introduction to React was helpful! I remember when I was getting into JavaScript frameworks it was difficult since tutorials would gloss over the "obvious" parts. If this helped you or some parts were confusing, let me know and I'll make it better!


[Source](https://repl.it/talk/learn/Learn-ReactJS-on-Replit/15980)
