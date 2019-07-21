![mdnb](static-files/mdnb.png)

:warning: PRE-ALPHA, SEEKING INPUT :warning:

`mdnb` is a markdown notebook with plotly and mathjax support. Something between mdbook and jupyter. It works on an airplane.

```bash
git clone https://github.com/pbrandt1/mdnb.git
cd mdnb
npm link
mdnb
```

See `mdnb --help` for command line options, including `-p` for http port.

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the [npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).

Installation is done using the [`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
$ npm install -g mdnb
```

## Features

- Github-flavored Markdown
- The javascript blocks actually run in your browser
- Plotly support
- MathJax support
- emojione for a consistent emoji experience :woman_facepalming:

## Examples

screenshots please


## Customization

Here's a default mdnb.json. Change what you will.

```json
{
  "port": 8080,

  "title": "mdnb",
  "favicon": "favicon.png",
  "custom-css": "mdnb-theme.css",
  "custom-head": "mdnb-head.html",

  "MathJax": {
    "tex2jax": {
      "inlineMath": [["$","$"], ["\\(","\\)"]]
    }
  },
  
  "ignore": [
    "node_modules",
    ".git"
  ]
}

```

Copy the default mdnb.json file and change what you want. Put it in the root directory of your thing. If you don't want to clutter your root, you can use the `-f` option, like `mdnb -f "some/config/file.json"`.

You probably know some css. Probably more than me. I'd say you should dive in and override whatever you want.

TODO provide some copy-pasta

```css
/* change theme color */
pre {
    border-color: #000000;
}
```

## Really major cusotmization

Just fork the repo and go nuts.

## Tests

Tested by highly trained primates in North America.

## Contributing

Contribute in whatever way you seem appropriate. Just be nice.

## Things that make it work

- [Showdown](https://github.com/showdownjs/showdown)
- [MathJax](https://github.com/mathjax/MathJax)
- [plotly.js](https://github.com/plotly/plotly.js/)
- [Highlight.js](https://github.com/highlightjs/highlight.js)
- [express](https://github.com/expressjs/express)
- [socket.io](https://github.com/socketio/socket.io)
- [Milligram](https://github.com/milligram/milligram)
- [Public Sans](https://github.com/uswds/public-sans)
- [Source Code Pro](https://github.com/adobe-fonts/source-code-pro)
- [emojione](https://github.com/joypixels/emojione)
- [node.js](https://github.com/nodejs/node)

## Similar things

- [mdbook](https://rust-lang-nursery.github.io/mdBook/)
- [mkdocs](https://www.mkdocs.org/)
- [md-page](https://github.com/oscarmorrison/md-page)
- [Jupyter](https://jupyter.org/)

## License

[MIT](LICENSE)

## todo

- [x] mathjax offline
- [x] command line options
- [x] make demo plotly
- [ ] make the navbar scroll and stuff
- [ ] make the hamburger menu work
- [x] add options for title and make index.html a template
- [ ] make a search bar
- [ ] make loading fast by rendering before executing javascript
- [x] allow custom css somehow
- [x] allow loading custom header html
- [ ] add screenshots to readme, show live reloading
