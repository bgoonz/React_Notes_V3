# React Concepts And Features
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Modularity](#modularity)
- [Easy to start](#easy-to-start)
- [Declarative programming](#declarative-programming)
- [Reusability](#reusability)
- [One-flow of data](#one-flow-of-data)
- [The "virtual DOM"](#the-virtual-dom)
- [Speed](#speed)
- [What you learned](#what-you-learned)

<!-- /code_chunk_output -->
________________________________________________________________________________

In this article, you will gain insight into why you may want to use React for
the front-end portion of your application, the part that runs in the browser,
as opposed to using plain-old vanilla JavaScript, that is, just the JavaScript
found in the browser.

## Modularity

Unlike the mess of code that you can create with event listeners and template
strings in your JavaScript code to manipulate the DOM by adding, updating, and
removing elements from it, React provides modularity from the ground up. If you
see modularity, understanding where code is that's running, then React is for
you.

## Easy to start

You don't need any special tools to use basic React. You can just import some
files and get to work using the `createElement` method that React provides to
define reusable "components" for what appears in the browser. They can be as
simple as a really cool button, or as complex as Facebook's Web UI.

For more complex applications, there are may tools available to you to get a
fully-functioning React application running from a single command on the
command line, tools such as _Create React App_. This handy tools will create a
full React application with live reload, testing, and support for things like
advanced CSS manipulation.

## Declarative programming

In the same way that you use HTML to _declare_ what the user interface should
look like, React provides the same mechanism in its element-based programming
API, either through the `createElement` method or the higher-level language
known as JSX.

## Reusability

React encourages you to think in terms of reusability as you construct the user
interface from elements and components that you create. It works best when you
think of the page as pieces of UI working in harmony with one another. When you
make a list or a button or a product card, you can then reuse those components
to show different data that your UI demands to show.

## One-flow of data

React applications are built as a combination of parent and child components. As
the names suggest, each child component has a parent and a parent component will
have one or more child components. Components receive data via an argument
traditionally named `props`. Parent components can decide the data that its
children should show by passing only a subset of what it has to its children.
Data is never passed up from the child to the parent. Because you always know
which way data flows, you can more easily debug your application to determine
where the data display or event handling code is.

## The "virtual DOM"

You may have come to the conclusion that writing things like

```js
el.innerHTML = `
  <table>
    <tbody>` +
      arr.map(item => `<tr><td>${item.name}</td></tr>`)
    + `</tbody>
  </table>
`;
```

is hard to debug, maintain, and use in the long run.  React solves this problem
by providing a virtual DOM (in memory) that acts as an agent between the
developer and the real DOM. The virtual DOM is a lot more user-friendly for
developers.

## Speed

Due to the use of a virtual DOM, React handles changes to a Web page more
intelligently than just string manipulation. It is constantly monitors the
virtual DOM for changes. It very efficiently reconciles changes in the virtual
DOM with what it has already produced in the real DOM. This is what
makes React one of the speediest front-end libraries available.

## What you learned

You'll learn more about these in the upcoming videos and over the next couple
of days. Happy Reacting!

You found out that React has a variety of good points that encourage you to
choose it as the means to build your front-end:

* React encourages modular development
* React is easy to use, easy to start with, and has some great tools
* React follows the declarative programming style
* React encourages reusability in your code
* React has one way that data flows, which makes it much easier to reason about
  the code
* React uses a "virtual DOM" to make changes to the real DOM very fast and
  efficient
