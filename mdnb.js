const fs = require('fs')
const path = require('path')

const express = require('express')
require('colors')


function mdnb(options) {
    options = options || {}
    options.port = options.port || 8080
    options.root = options.root || path.resolve('.')
    options.ignore = options.ignore || ['node_modules', 'git']
    options.title = options.title || path.basename(path.resolve('.'))
    options.favicon = options.favicon || path.join(__dirname, 'static-files', 'mdnb.png')
    options.MathJax = options.MathJax || {
        tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]}
    };
    options.custom_css = options.custom_css || '';
    options.custom_head = options.custom_head || '';

    const app = express()
    var http = require('http').createServer(app);
    var io = require('socket.io')(http);

    //
    // Inject the user configuration into the index.html file
    //
    var indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8')

    // handle options.custom_css
    var customTheme = ''
    if (fs.existsSync(options.custom_css)) {
        customTheme = fs.readFileSync(options.custom_css, 'utf8')
    } else if (options.custom_css) {
        console.log('Warning'.red.bold + ` custom css file "${options.custom_css}" not found`.bold)
    }
    app.get('/theme.css', (req, res) => {
        res.setHeader('Content-Type', 'text/css; charset=UTF-8')
        res.send(customTheme);
    })

    // handle options.title
    indexHtml = indexHtml.replace(/__MDNB_TITLE__/g, options.title)

    // handle options.favicon
    if (!fs.existsSync(options.favicon)) {
        console.log('Warning'.red.bold + ` custom favicon "${options.favicon}" not found`.bold)
    } else {
        app.get('/favicon.png', (req, res) => {
            res.sendFile(options.favicon);
        })
    }

    // handle options.custom_head
    var customHead = ''
    if (fs.existsSync(options.custom_head)) {
        customHead = fs.readFileSync(options.custom_head, 'utf8')
    } else if (options.custom_head) {
        console.log('Warning'.red.bold + ` custom head html file "${options.custom_head}" not found`.bold)
    }
    indexHtml = indexHtml.replace('<!-- __MDNB_CUSTOM_HEAD__ -->', customHead)

    // handle options.MathJax
    app.get('/mathjax-config.js', (req, res) => {
        var config = JSON.stringify(options.MathJax);
        res.setHeader('Content-Type', 'application/javascript; charset=UTF-8');
        res.send(`var MATHJAX_CONFIG=${config};MathJax.Hub.Config(MATHJAX_CONFIG);`)
    })

    //
    // find all the markdown files
    //
    var markdowns = []
    function read_dir(dir) {
        fs.readdirSync(dir).filter(f => {
            return !(options.ignore).includes(f)
        }).map(f => {
            if (fs.lstatSync(path.join(dir, f)).isDirectory()) {
                return read_dir(path.join(dir, f))
            } else if (f.endsWith('.md')) {
                // ok this is complicated. basically we want to turn the path into a URL
                // first we'll get the path relative to the root of this repo, using native separations "/" on linux, or "\\" on windows
                var relative_path = path.relative(options.root, path.join(dir, f))
                var url = '/' + relative_path.split(path.sep).join('/')
                markdowns.push(url)
            }
        })
    }

    // initiate the recursive recombulator
    read_dir(options.root)

    //
    // when anyone requests a readme file, serve the index, which will pick up the .md from the URL and fetch the md via socket.io
    // express only really serves static content and stuff
    //
    markdowns.map(f => {
        app.get(f, (req, res) => {
            res.setHeader('Content-Type', 'text/html; charset=UTF-8');
            res.send(indexHtml);
        })
    })

    // if a root-level README exists, redirect / to /README.md
    if (markdowns.includes('/README.md')) {
        app.get('/', (req, res) => {
            res.redirect('/README.md')
        })
    } else if (markdowns.length > 0) {
        // otherwise redirect to literally the first file
        app.get('/', (req, res) => {
            res.redirect(markdowns[0])
        })
    } else {
        // or serve an error page because no markdowns were found
        res.send('no markdown files were found, check your logs in the console')
    }


    // static files yo
    app.use(express.static(options.root))
    app.use(express.static(path.join(__dirname, 'static-files')))

    // helper
    function mdToFile(md) {
        return path.join(options.root, md.slice(1).split('/').join(path.sep))
    }

    //
    // socket.io
    //
    var sockets = {}
    io.on('connection', (socket) => {
        console.log('user connected', socket.id)
        sockets[socket.id] = socket;

        socket.on('md', (md) => {
            // make sure that page exists
            if (!markdowns.includes(md)) {
                console.error('error', md, 'during includes(md)')
                return socket.emit('error', md + ' not found, go home')
            }
            fs.readFile(mdToFile(md), 'utf8', (e, str) => {
                if (e) {
                    console.error('error', md, 'during readFIle')
                    return socket.emit('error', md + ' errored out, go home')
                }
                socket.md = md;
                socket.emit('md', str)
            })
        })

        socket.on('tree', () => {
            socket.emit('tree', markdowns)
        })

        socket.on('disconnect', () => {
            console.log('user disconnected')
            delete sockets[socket.id]
        })
    })

    //
    // livereload watcher
    //
    var poll_times = {}
    markdowns.map(md => {
        var f = mdToFile(md)
        fs.stat(f, (e, stats) => {
            poll_times[md] = {
                mtime: stats.mtime,
                f: f
            }
        })
    })

    setInterval(() => {
        markdowns.map(md => {
            fs.stat(poll_times[md].f, (e, stats) => {
                if (stats.mtime > poll_times[md].mtime) {
                    poll_times[md].mtime = stats.mtime
                    // find all the sockets that are using this md
                    var str = null;
                    Object.keys(sockets).map(k => {
                        var s = sockets[k]
                        if (s.md === md) {
                            if (!str) {
                                str = fs.readFileSync(poll_times[md].f, 'utf8')
                            }
                            console.log('updating', md)
                            s.emit('md', str)
                        }
                    })
                }
            })
        })
    }, 300)


    http.listen(options.port, () => {
        console.log('Serving and watching:'.cyan.bold)
        markdowns.map(md => {
            console.log(`  http://localhost:${options.port}` + md.replace(/[^\/]+.md/, (md) => md.bold))
        })
        console.log('have fun'.gray)
    })
}

module.exports = mdnb
