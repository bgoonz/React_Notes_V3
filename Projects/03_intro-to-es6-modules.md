# Intro to ES6 Modules
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Exporting one item per file](#exporting-one-item-per-file)
- [Exporting multiple items per file](#exporting-multiple-items-per-file)
- [Importing with ES6 vs CommonJS](#importing-with-es6-vs-commonjs)
- [Unnamed default imports](#unnamed-default-imports)
- [Aliasing imports](#aliasing-imports)
- [Browser support for ES6 Modules](#browser-support-for-es6-modules)
  - [Mini-project](#mini-project)
- [What you've learned](#what-youve-learned)

<!-- /code_chunk_output -->
________________________________________________________________________________

Now, you will learn more about ES6 module syntax and how it is used to export
and import items between different files. You'll compare the differences between
managing exports with ES6 module syntax vs CommonJS module syntax. At the end of
this article, you will understand how to manage your exports and imports with
ES6's:

* `export default` statement to export one item per file
* `export` keyword to export multiple items per file
* `import ... from` statement to import items from one file to another
* `export default` statement to export an unnamed item and rename the item in an
  import statement
* `as` keyword (in an `import ... from` statement) to _alias_ and _namespace_
  all of a file's exported items

## Exporting one item per file

You cannot export multiple items per file by using an `export default` statement
with ES6 module syntax. For instance, the example below will only export the
`Wallet` class from the file.

**ES6 modules**

```js
export default class Wallet {
  // ...
}

// sayHello will not be exported
function sayHello() {
  console.log('Hello!');
}
```

The `export default` statement is equivalent to using `module.exports` to
directly export **one** item from a file using (instead of an object).

**CommonJS modules**

```js
class Wallet {
  // ...
}

// sayHello will not be exported
function sayHello() {
  console.log('Hello!');
}

module.exports = Wallet;
```

## Exporting multiple items per file

You can export multiple items per file by using the `export` keyword
(**without** the `default` keyword) with ES6 module syntax. Using ES6's export,
you have two options for exporting items. You can export each item as you define
it. With ES6 modules, the preferred method to export multiple functions or
classes from a single file is to export each function or class as it's defined.

**ES6 modules (parts of an export)**

```js
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

Alternatively, you can refer to each item by name and export them all within an
object. This is the unpreferred method to export multiple functions or classes.

**ES6 modules (export object)**

```js
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

Using ES6's `export` keyword is similar to how you can export classes and
functions as individual parts of an export or an export object with CommonJS
module syntax. Unlike with ES6 modules, the preferred method to export multiple
items from a single file with CommonJS modules is to export an object with
`module.exports`.

**CommonJS modules (export object)**

```js
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

## Importing with ES6 vs CommonJS

| ES6 modules                          | CommonJS modules                          |
|--------------------------------------|-------------------------------------------|
| `import { Wallet } from './wallet';` | `const { Wallet } = require('./wallet');` |
| `import * as fs from 'fs';`          | `const fs = require('fs');`               |

Although calls to the `require` method can be anywhere in a JavaScript file
using CommonJS modules, this is not the case for ES6 modules. For ES6 modules,
the `import` statements must always be at the top of the file because imports
have to occur before the rest of the file's code runs.

**CommonJS modules**

```js
let { Wallet } = require('./wallet');

const wallet = new Wallet();

let fs = require('fs');
```

**ES6 modules**

```js
import { Wallet } from './wallet';
import * as fs from 'fs';

const wallet = new Wallet();
```

## Unnamed default imports

You can give unnamed items that are exported with `export default` any name you
want when importing them. For example, imagine if you `export default` a
`Wallet` class from a file name `wallet.js`. When you import the `Wallet` class
into `newFile.js`, you can rename the `Wallet` class because of how you used
`export default` to export the class from the `wallet.js` file.

**wallet.js**

```js
export default class Wallet {
  // ...
}
```

**newFile.js**

```js
import Money from 'wallet.js';

const wallet = new Money();
```

However, if you used the `export` instead of `export default`, you are using a
named export. With named exports, the import names have to exactly match.

**wallet.js**

```js
export class Wallet {
  // ...
}
```

**newFile.js**

```js
import { Wallet } from 'wallet.js';

const wallet = new Wallet();
```

## Aliasing imports

You can use an asterisk (`*`) to [import an entire module's contents]. Note that
you must alias your imported object using the `as` keyword to be able to refer
to it later. Aliasing can be used to namespace all the exported functions,
constants, etc. from a file to wrap them into a single, easily referenced
object.

**greetings.js**

```js
export function sayHello() {
  console.log('Hello!');
}

export const sayHi = () => {
  console.log('Hi!');
};
```

**newFile.js**

```js
import * as Greetings from 'greetings.js';

Greetings.sayHello(); // Hello!
Greetings.sayHi();    // Hi!
```

You can also use aliasing to rename identically named functions or items from
different files. For example, take the two `Wallet` classes below. Both classes
are named `Wallet`, but they come from different files. The `Wallet` from the
`wallet1` file is aliased as `W1` while the `Wallet` from the `wallet2` file is
aliased as `W2` to differentiate between the two `Wallet` classes.

```js
import { Wallet as W1 } from './wallet1';
import { Wallet as W2 } from './wallet2';

const w1 = new W1();
const w2 = new W2();
```

## Browser support for ES6 Modules

ES6 modules can only be used when a file is specified as a `module`. You can use
an HTTP server to serve an HTML file with a `<script>` tag of `type="module"`.
By running a local web server, you gain browser support for ES6 module syntax by
using a `<script>` tag in an HTML file to specify a JavaScript file as an ES6
module (not just a normal JavaScript file). Note the `<script>` tag of
`type="module"` below:

```html
<script type="module" src="./wallet.js"></script>
```

### Mini-project

Follow the guidelines below to use an HTTP server and import JavaScript files
with ES6 module syntax:

1. Create a folder with an `index.html` file. Fill in the file with the contents
   below. Note the use of the `type="module"` attribute in the `<script>` tag.
   You must include the `.js` file extension in the name of the module
   (`./program.js`). The browser needs to know the entire name of the JavaScript
   file it will be loading from a server.
    ```html
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
    ```js
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
    ```js
    import { Game } from './game.js';

    window.addEventListener('DOMContentLoaded', () => {
      const game = new Game();
      game.start();
    });
    ```
4. Make sure you are in the directory of your HTML and JavaScript files set up
   an HTTP server with `python3 -m http.server` to serve the `index.html` file
   to the browser.
5. When the browser reads the `index.html` file, it will read the `<script>` tag
   and know that the JavaScript file is using ES6 module syntax
   (`type="module"`) to load the `program.js` file.
6. The browser will start reading the `program.js` file from top to bottom,
   reading the `import { Game } from './game.js';` statement first. Note that
   the `.js` file extension must be present for the browser to know the entire
   name of the JavaScript file to load from the server.
7. The browser will then load the `game.js` file and all the code in the loaded
   JavaScript files will run!

## What you've learned

In this reading, you learned about managing exports and imports with ES6 modules
and how using ES6 modules compares to using CommonJS modules. You learned that:

* ES6 has `import` and `export` keywords (instead of `require` and
  `module.exports`)
* ES6 `import` statements are always at the top of the file
* The `export` keyword to exports multiple items from a file while the `export
  default` phrase exports **one** item from a file
* You can rename an item that is exported with `export default`
* The `as` keyword can be used to alias an imported item
* The `*` character can be used to [import an entire module's contents] with a
  namespace (`import * as Namespace from 'fileName.js';`)
* ES6 modules can only be used when a file is explicitly specified as a
  `module`, either through an HTML file with a `<script>` tag of `type="module"`
  or a `package.json` file with a `"type": "module"` field

[import an entire module's contents]:
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#Import_an_entire_modules_contents
