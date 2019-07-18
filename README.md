# mdnb


:warning: PRE-ALPHA, SEEKING INPUT :warning:

also the command line options have not been implemented yet, will do that this weekend.

`mdnb` is a markdown notebook with plotly and mathjax support. Something between mdbook and jupyter. It's supposed to work on a plane. Still need to get mathjax working offline, but most other things should work.


SOME DAY:

```bash
$ npx mdnb
```

but until it's published, if you want to try it, clone this repo and then npm link it

```bash
git clone https://github.com/pbrandt1/mdnb.git
npm link
```

and then spin it up with

```bash
$ mdnb
```

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
$ npm install mdnb
```

## Features

- Github-flavored Markdown
- The javascript blocks run in your browser
- Plotly support
- MathJax support
- emojione for a consistent emoji experience :woman_facepalming:

## Docs & Community

### Security Issues

If you discover a security vulnerability in mdnb, please make an issue. That said, it is not meant to be "safe". Like don't go reporting that omg there is an `eval()` in the code. Yes, I put it there. But please do tell me if one of the dependnecies is phoning home or something.

## Customization

You probably know some css. Probably more than me. I'd say you should dive in and override whatever you want.

TODO provide some copy-pasta

```css
/* change theme color */
pre {
    border-color: #000000;
}
```

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

## Similar things

- [mdbook](https://rust-lang-nursery.github.io/mdBook/)
- [mkdocs](https://www.mkdocs.org/)
- [md-page](https://github.com/oscarmorrison/md-page)
- [Jupyter](https://jupyter.org/)

## License

[MIT](LICENSE)

## todo

- [ ] mathjax offline
- [ ] change color theme to blue for release
- [ ] command line options
- [ ] make demo plotly
- [ ] add screenshots to readme, show live reloading
- [ ] make the navbar nice
- [ ] make the hamburger menu work
