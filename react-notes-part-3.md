# React Notes Part 3

## React Concepts And Features

* [Modularity](https://github.com/bgoonz/React_Notes_V3/blob/master/my-other-notes-n-projects/02_react-concepts-and-features.md#modularity)
* [Easy to start](https://github.com/bgoonz/React_Notes_V3/blob/master/my-other-notes-n-projects/02_react-concepts-and-features.md#easy-to-start)
* [Declarative programming](https://github.com/bgoonz/React_Notes_V3/blob/master/my-other-notes-n-projects/02_react-concepts-and-features.md#declarative-programming)
* [Reusability](https://github.com/bgoonz/React_Notes_V3/blob/master/my-other-notes-n-projects/02_react-concepts-and-features.md#reusability)
* [One-flow of data](https://github.com/bgoonz/React_Notes_V3/blob/master/my-other-notes-n-projects/02_react-concepts-and-features.md#one-flow-of-data)
* [The "virtual DOM"](https://github.com/bgoonz/React_Notes_V3/blob/master/my-other-notes-n-projects/02_react-concepts-and-features.md#the-virtual-dom)
* [Speed](https://github.com/bgoonz/React_Notes_V3/blob/master/my-other-notes-n-projects/02_react-concepts-and-features.md#speed)
* [What you learned](https://github.com/bgoonz/React_Notes_V3/blob/master/my-other-notes-n-projects/02_react-concepts-and-features.md#what-you-learned)

In this article, you will gain insight into why you may want to use React for the front-end portion of your application, the part that runs in the browser, as opposed to using plain-old vanilla JavaScript, that is, just the JavaScript found in the browser.

### Modularity

Unlike the mess of code that you can create with event listeners and template strings in your JavaScript code to manipulate the DOM by adding, updating, and removing elements from it, React provides modularity from the ground up. If you see modularity, understanding where code is that's running, then React is for you.

### Easy to start

You don't need any special tools to use basic React. You can just import some files and get to work using the `createElement` method that React provides to define reusable "components" for what appears in the browser. They can be as simple as a really cool button, or as complex as Facebook's Web UI.

For more complex applications, there are may tools available to you to get a fully-functioning React application running from a single command on the command line, tools such as _Create React App_. This handy tools will create a full React application with live reload, testing, and support for things like advanced CSS manipulation.

### Declarative programming

In the same way that you use HTML to _declare_ what the user interface should look like, React provides the same mechanism in its element-based programming API, either through the `createElement` method or the higher-level language known as JSX.

### Reusability

React encourages you to think in terms of reusability as you construct the user interface from elements and components that you create. It works best when you think of the page as pieces of UI working in harmony with one another. When you make a list or a button or a product card, you can then reuse those components to show different data that your UI demands to show.

### One-flow of data

React applications are built as a combination of parent and child components. As the names suggest, each child component has a parent and a parent component will have one or more child components. Components receive data via an argument traditionally named `props`. Parent components can decide the data that its children should show by passing only a subset of what it has to its children. Data is never passed up from the child to the parent. Because you always know which way data flows, you can more easily debug your application to determine where the data display or event handling code is.

### The "virtual DOM"

You may have come to the conclusion that writing things like

```text
el.innerHTML = `
  <table>
    <tbody>` +
      arr.map(item => `<tr><td>${item.name}</td></tr>`)
    + `</tbody>
  </table>
`;
```

is hard to debug, maintain, and use in the long run. React solves this problem by providing a virtual DOM \(in memory\) that acts as an agent between the developer and the real DOM. The virtual DOM is a lot more user-friendly for developers.

### Speed

Due to the use of a virtual DOM, React handles changes to a Web page more intelligently than just string manipulation. It is constantly monitors the virtual DOM for changes. It very efficiently reconciles changes in the virtual DOM with what it has already produced in the real DOM. This is what makes React one of the speediest front-end libraries available.





## Intro to ES6 Modules

* [Exporting one item per file](https://github.com/bgoonz/React_Notes_V3/blob/master/my-other-notes-n-projects/03_intro-to-es6-modules.md#exporting-one-item-per-file)
* [Exporting multiple items per file](https://github.com/bgoonz/React_Notes_V3/blob/master/my-other-notes-n-projects/03_intro-to-es6-modules.md#exporting-multiple-items-per-file)
* [Importing with ES6 vs CommonJS](https://github.com/bgoonz/React_Notes_V3/blob/master/my-other-notes-n-projects/03_intro-to-es6-modules.md#importing-with-es6-vs-commonjs)
* [Unnamed default imports](https://github.com/bgoonz/React_Notes_V3/blob/master/my-other-notes-n-projects/03_intro-to-es6-modules.md#unnamed-default-imports)
* [Aliasing imports](https://github.com/bgoonz/React_Notes_V3/blob/master/my-other-notes-n-projects/03_intro-to-es6-modules.md#aliasing-imports)
* [Browser support for ES6 Modules](https://github.com/bgoonz/React_Notes_V3/blob/master/my-other-notes-n-projects/03_intro-to-es6-modules.md#browser-support-for-es6-modules)
  * [Mini-project](https://github.com/bgoonz/React_Notes_V3/blob/master/my-other-notes-n-projects/03_intro-to-es6-modules.md#mini-project)
* [What you've learned](https://github.com/bgoonz/React_Notes_V3/blob/master/my-other-notes-n-projects/03_intro-to-es6-modules.md#what-youve-learned)

Now, you will learn more about ES6 module syntax and how it is used to export and import items between different files. You'll compare the differences between managing exports with ES6 module syntax vs CommonJS module syntax. At the end of this article, you will understand how to manage your exports and imports with ES6's:

* `export default` statement to export one item per file
* `export` keyword to export multiple items per file
* `import ... from` statement to import items from one file to another
* `export default` statement to export an unnamed item and rename the item in an import statement
* `as` keyword \(in an `import ... from` statement\) to _alias_ and _namespace_ all of a file's exported items

### Exporting one item per file

You cannot export multiple items per file by using an `export default` statement with ES6 module syntax. For instance, the example below will only export the `Wallet` class from the file.

**ES6 modules**

```text
export default class Wallet {
  // ...
}

// sayHello will not be exported
function sayHello() {
  console.log('Hello!');
}
```

The `export default` statement is equivalent to using `module.exports` to directly export **one** item from a file using \(instead of an object\).

**CommonJS modules**

```text
class Wallet {
  // ...
}

// sayHello will not be exported
function sayHello() {
  console.log('Hello!');
}

module.exports = Wallet;
```

### Exporting multiple items per file

You can export multiple items per file by using the `export` keyword \(**without** the `default` keyword\) with ES6 module syntax. Using ES6's export, you have two options for exporting items. You can export each item as you define it. With ES6 modules, the preferred method to export multiple functions or classes from a single file is to export each function or class as it's defined.

**ES6 modules \(parts of an export\)**

```text
export class Wallet {
  // ...
}

export function sayHello() {
  console.log('Hello!');
}

export const sayHi = () => {
  console.log('Hi!');
};
```

Alternatively, you can refer to each item by name and export them all within an object. This is the unpreferred method to export multiple functions or classes.

**ES6 modules \(export object\)**

```text
class Wallet {
  // ...
}

function sayHello() {
  console.log('Hello!');
}

const sayHi = () => {
  console.log('Hi!');
};

export {
  Wallet,
  sayHello,
  sayHi,
};
```

Using ES6's `export` keyword is similar to how you can export classes and functions as individual parts of an export or an export object with CommonJS module syntax. Unlike with ES6 modules, the preferred method to export multiple items from a single file with CommonJS modules is to export an object with `module.exports`.

**CommonJS modules \(export object\)**

```text
class Wallet {
  // ...
}

function sayHello() {
  console.log('Hello!');
}

const sayHi = () => {
  console.log('Hi!');
};

module.exports = {
  Wallet,
  sayHello,
  sayHi,
};
```

### Importing with ES6 vs CommonJS

| ES6 modules | CommonJS modules |
| :--- | :--- |
| `import { Wallet } from './wallet';` | `const { Wallet } = require('./wallet');` |
| `import * as fs from 'fs';` | `const fs = require('fs');` |

Although calls to the `require` method can be anywhere in a JavaScript file using CommonJS modules, this is not the case for ES6 modules. For ES6 modules, the `import` statements must always be at the top of the file because imports have to occur before the rest of the file's code runs.

**CommonJS modules**

```text
let { Wallet } = require('./wallet');

const wallet = new Wallet();

let fs = require('fs');
```

**ES6 modules**

```text
import { Wallet } from './wallet';
import * as fs from 'fs';

const wallet = new Wallet();
```

### Unnamed default imports

You can give unnamed items that are exported with `export default` any name you want when importing them. For example, imagine if you `export default` a `Wallet` class from a file name `wallet.js`. When you import the `Wallet` class into `newFile.js`, you can rename the `Wallet` class because of how you used `export default` to export the class from the `wallet.js` file.

**wallet.js**

```text
export default class Wallet {
  // ...
}
```

**newFile.js**

```text
import Money from 'wallet.js';

const wallet = new Money();
```

However, if you used the `export` instead of `export default`, you are using a named export. With named exports, the import names have to exactly match.

**wallet.js**

```text
export class Wallet {
  // ...
}
```

**newFile.js**

```text
import { Wallet } from 'wallet.js';

const wallet = new Wallet();
```

### Aliasing imports

You can use an asterisk \(`*`\) to [import an entire module's contents](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#Import_an_entire_modules_contents). Note that you must alias your imported object using the `as` keyword to be able to refer to it later. Aliasing can be used to namespace all the exported functions, constants, etc. from a file to wrap them into a single, easily referenced object.

**greetings.js**

```text
export function sayHello() {
  console.log('Hello!');
}

export const sayHi = () => {
  console.log('Hi!');
};
```

**newFile.js**

```text
import * as Greetings from 'greetings.js';

Greetings.sayHello(); // Hello!
Greetings.sayHi();    // Hi!
```

You can also use aliasing to rename identically named functions or items from different files. For example, take the two `Wallet` classes below. Both classes are named `Wallet`, but they come from different files. The `Wallet` from the `wallet1` file is aliased as `W1` while the `Wallet` from the `wallet2` file is aliased as `W2` to differentiate between the two `Wallet` classes.

```text
import { Wallet as W1 } from './wallet1';
import { Wallet as W2 } from './wallet2';

const w1 = new W1();
const w2 = new W2();
```

### Browser support for ES6 Modules

ES6 modules can only be used when a file is specified as a `module`. You can use an HTTP server to serve an HTML file with a `<script>` tag of `type="module"`. By running a local web server, you gain browser support for ES6 module syntax by using a `<script>` tag in an HTML file to specify a JavaScript file as an ES6 module \(not just a normal JavaScript file\). Note the `<script>` tag of `type="module"` below:

```text
<script type="module" src="./wallet.js"></script>
```

#### Mini-project

Follow the guidelines below to use an HTTP server and import JavaScript files with ES6 module syntax:

1. Create a folder with an `index.html` file. Fill in the file with the contents below. Note the use of the `type="module"` attribute in the `<script>` tag. You must include the `.js` file extension in the name of the module \(`./program.js`\). The browser needs to know the entire name of the JavaScript file it will be loading from a server.

   ```text
   <html>
   <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>Browser</title>
   </head>
   <body>
     <button id="button">Start Game</button>
     <div id="message"></div>
     <script type="module" src="./program.js"></script>
   </body>
   </html>
   ```

2. Create a `game.js` file with the contents below:

   ```text
   export class Game {
     constructor() {
       this.gameStartMessage = "Hello! Do you want to play a game?";
     }

     start() {
       document
         .getElementById('button')
         .addEventListener('click', () => {
           const messageContainer = document.getElementById('message');
           messageContainer.innerText = this.gameStartMessage;
       });
     }
   }
   ```

3. Create a `program.js` file with the contents below:

   ```text
   import { Game } from './game.js';

   window.addEventListener('DOMContentLoaded', () => {
     const game = new Game();
     game.start();
   });
   ```

4. Make sure you are in the directory of your HTML and JavaScript files set up an HTTP server with `python3 -m http.server` to serve the `index.html` file to the browser.
5. When the browser reads the `index.html` file, it will read the `<script>` tag and know that the JavaScript file is using ES6 module syntax \(`type="module"`\) to load the `program.js` file.
6. The browser will start reading the `program.js` file from top to bottom, reading the `import { Game } from './game.js';` statement first. Note that the `.js` file extension must be present for the browser to know the entire name of the JavaScript file to load from the server.
7. The browser will then load the `game.js` file and all the code in the loaded JavaScript files will run!

### What you've learned

In this reading, you learned about managing exports and imports with ES6 modules and how using ES6 modules compares to using CommonJS modules. You learned that:

* ES6 has `import` and `export` keywords \(instead of `require` and `module.exports`\)
* ES6 `import` statements are always at the top of the file
* The `export` keyword to exports multiple items from a file while the `export default` phrase exports **one** item from a file
* You can rename an item that is exported with `export default`
* The `as` keyword can be used to alias an imported item
* The `*` character can be used to [import an entire module's contents](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#Import_an_entire_modules_contents) with a namespace \(`import * as Namespace from 'fileName.js';`\)
* ES6 modules can only be used when a file is explicitly specified as a `module`, either through an HTML file with a `<script>` tag of `type="module"` or a `package.json` file with a `"type": "module"` field

