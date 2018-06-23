# markdown-component

![Stability Experimental](https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square)

> barebones component that offers a textarea as input for markdown formatted text, and a div that outputs the rendered markdown.

a markdown editing [nanocomponent](https://github.com/choojs/nanocomponent)

![example screenshot](example.gif)

## Usage

```js
var MarkdownComponent = require('markdown-component')

var md = new MarkdownComponent()
var component = md.render('# title\n - list item', {
  component: {
    classes: 'flex justify-center'
  },
  textarea: {
    classes: 'outline w-50 pa3 mr2'
  },
  div: {
    classes: 'outline w-50 pa3 mr2'
  }
})
```

## API

```js
// default
var markdownComponent = require('markdown-component')
var md = new MarkdownComponent()
var component = md.render()
```

**`md.render`**: `String|Object`
- `String`: (optional), markdown formatted string 
- `Object`: (optional), options for the rendered elements

#### options object
```js
}
  component: {
    classes: 'classes for the containg div'
  },
  textarea: {
    classes: 'classes for the textarea element'
  },
  div: {
    classes: 'classes for the the output div'
  },
  onDrop: `Function|Boolean` 
    // Defualt: Adds markdown syntax for an image blob to the text editor, and renders the image in the output.
    // Implementing your own `onDrop` function will override the default onDrop function.
    // Setting `onDrop: false` will prevent the text editor from doing anything with file drag and drops.
}
```

## Example

```js
var choo = require('choo')
var html = require('choo/html')
var css = require('sheetify')
var strftime = require('strftime')
var MarkdownComponent = require('markdown-component')

css('tachyons')

var app = choo()
if (process.env.NODE_ENV !== 'production') {
  app.use(require('choo-devtools')())
}

app.route('/*', view)

module.exports = app.mount('body')

function view (state, emit) {
  var time = strftime('%B %d %Y - %X')
  var md = new MarkdownComponent()
  var component = md.render('# wow\n - cool', {
    component: {
      classes: 'flex justify-center'
    },
    textarea: {
      classes: 'outline w-50 pa3 mr2'
    },
    div: {
      classes: 'outline w-50 pa3 mr2'
    }
  })
  return html`
    <body class="code lh-copy">
      <main class="cf center">
        <section class="f6 ttu fw6 mt0 mb3 bb pb2 pa3">
          <h2>${time}</h2>
        </section>
        <form id=${time}>
          ${component}
        </form>
      </main>
    </body>
  `
}

```

## Install

With [npm](https://npmjs.org/) installed, run

```
$ npm install markdown-component
```


## Todo
- [ ] Write tests
- [ ] Expand on documentation
- [ ] Explore if this is even a good idea

## License

[MIT](https://tldrlegal.com/license/mit-license)
