# React
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [React](#react)
  - [A front-end timeline](#a-front-end-timeline)
  - [React (2013)](#react-2013)
  - [Using tools with React](#using-tools-with-react)
  - [Choosing React](#choosing-react)
  - [What you've just seen](#what-youve-just-seen)

<!-- /code_chunk_output -->
________________________________________________________________________________

You've been using what we call _vanilla JavaScript_ (often referred to as
_Vanilla.js_) to build your front-end applications. And, you may have noticed that
it's _hard_. Creating strings to put new DOM into the page _should_ be easier.

In this article, you will find out more about React and why you should consider
using it as a way to build separate front-end apps.

## A front-end timeline

Lots of JavaScript/CSS libraries and frameworks have been invented to ease the
pain of front-end development. Here's an abbreviated list of some of the more
noteworthy ones in chronological order. Please click on each of the links and
just quickly browse each of these libraries' Web sites to get a feel for the
functionality each provides you.

* [script.aculo.us]: (2005) This is one of the first libraries that started
  easing this by adding special effects and dynamic content for client-side
  development.
* [dojo]: (2005) This toolkit added a log of non-visual and visual components
  that allowed developers to rapidly develop AJAX-enabled applications.
* [YUI]: (2006) A full framework that provided dynamic loading of scripts,
  events, visual components, data binding, and a philosophy on how to build
  client-side applications.
* [Knockout]: (2010) This is a standalone JavaScript implementation of the
  [Model-View-ViewModel] pattern used to build very fast dynamic components for
  client-side applications. It is the progenitor of many other libraries,
  include React.
* [AngularJS]: (2011) This framework from Google built on the success of Knockout
  and introduced a full set of utilities and philosophies to build modular
  client-side applications. (The current version has been branded [Angular].) In
  the rewrite of Angular to make the idea of a component a first-order concept,
  many developers left and joined the React community.
* [Elm]: (2012) This is an entirely new _language_ used to build front-end
  applications. You write your front-end application in Elm. Then, you "compile"
  it. The Elm "compiler" translates all of the source code written in Elm to
  highly-tuned JavaScript so that it runs really fast in your Web browser. It
  claims that by using Elm that your front-end code will have "no runtime
  exceptions" which is a bold (and mostly true) claim.

## React (2013)

In an effort to make its own Web front-end more maintainable, Facebook decided
to build its own JavaScript-based library to create fast and functional
front-end Web applications. Thus, React was born.

React manages the **creation and updating of DOM nodes in your Web page**. It
does not do AJAX. It does not do services. It does not do local storage. It does
not provide a pretty CSS framework for you. It just dynamically renders stuff
into the DOM

Because of Facebook's immense popularity as a developer-centric organization,
React was quickly adopted across the software-development industry, eclipsing
the use of all other front-end libraries and frameworks for many years. React is
still considered the _standard_ front-end library to use to build modern Web
applications.

React is _unopinionated_ about many aspects of front-end development. It doesn't
care how you make AJAX calls. It doesn't really care about how your page is laid
out. It has a few simple rules that you must follow, and _It Just Works_. You'll
learn about those in the next article, _React Concepts and Features_.

Working with plain old React became a real chore for anything non-trivial, so
they invented a new language to help write React applications. That language is
called JSX, or JavaScript eXtension. It looks like a mixture of JavaScript and
HTML (technically, XML).

Instead of writing Vanilla.js like this to create some DOM elements based on
some data that comes back from an API call. Don't worry about understanding what
you see. You will get the opportunity to learn more about all of this in later
articles, lectures, and projects.

```js
fetch('https://example.com/api/people')
  .then(response => response.json())
  .then(people => {
    const html = '<ul>';
    for (let person of people) {
      html += `<li>${person.lastName}, ${person.firstName}</li>`;
    }
    html += '</ul>';
    document.querySelector('#people-list').innerHTML = html;
  });
```

You would write something like this using JSX.

```jsx
function PeopleList(props) {
  return (
    <ul>
      {props.people.map(person => (
        <li>{person.lastName}, {person.firstName}</li>
      ))}
    </ul>
  );
}

const peopleListElement = document.querySelector('#people-list');
fetch('https://example.com/api/people')
  .then(response => response.json())
  .then(people => {
    const props = { people };
    ReactDOM.render(<PeopleList props={props}/>, peopleListElement);
  });
```

In this "simple" example, you may think, "Well, that's like twice the code! Why
would I do that?" Great question! When you start building _lots of components_,
lots of different pieces of visual widgets to put together to manage a complex
graphical human interface, it becomes really nice to put each of those functions
(or classes) into their own files and _organize_ the code so you know where
everything is.

## Using tools with React

Oh, and the tools! Because software developers constantly look for ways to make
things easier, the tools that have grown up around React are amazing. You'll
install React DevTools, a new tab in the Developer Tools that lets you see how
React actually works in the browser, much like the _Elements_ tab does for just
HTML elements.

![React DevTools]

There is `create-react-app`, an extensible command-line tool that
helps you generate standard React applications. We'll show you how to use it
with custom templates, too, to help remove some of the over-engineered stuff
that comes with the standard template.

Because browsers only understand JavaScript and not JSX, there is an extra
"build step" involved with creating React-based front-end applications. There
are a variety of tools that software developers use to make this happen. The
most popular, right now, is to use a tool called [Webpack]. Later this week,
you'll get into some of the details about how that works.

![Webpack.js]

A really popular feature of modern React development is the concept of _hot
module replacement_ (HMR). When you make changes to your source code, right now,
you must refresh your browser to see the changes. HMR sense what has changed and
send the change to the browser without you having to refresh it. The changes are
delivered in _real-time_, updating the UI for you as you make changes to the
source code. It is almost magic what happens.

After using React on their own massively complex Web interface, React developers
decided they did need to have an opinion about how to architect the state of
their application, that is, how to allow discretely different parts of their Web
page to consume and modify data received from back-end APIs. This introduced the
_Flux architecture_ which you will learn about next week.

![Flux]

## Choosing React

Because of the tools, because of the popularity, because (seemingly) _everyone_
knows React, choosing React to power your front-end is an easy choice. Hundreds
of thousands of other software developes know and love React. Tens of thousands
of companies use React on their Web sites and to power their Web applications.


There are other viable modern alternatives to React. However, they are almost
all heavily influenced by React's design and implementation. Learning them is
like learning React and different parts of its vibrant ecosystem. React has
really become the stick by which all other front-end libraries are measured. And
will likely continue to hold that position for the near future.

## What you've just seen

In this article, you've discovered that React is one of many front-end libraries
that you can use to build dynamic data-driven front-end JavaScript-based modern
Web applications. You've seen that React has its own language, JSX, to easily
write React applications. In addition to an easy-to-use language to write in,
the React team and community have created a bunch of tools and utilities for you
to use and add to your React application; these will help you inspect and debug
your application as you build it. React is a _safe_ choice because you learn
about it here and in hundreds of other places.
