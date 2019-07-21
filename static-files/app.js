var socket = io();
var converter = new showdown.Converter()
converter.setFlavor('github')

$content = document.querySelector('main')
var mdnb = {}

function Deferred() {
    this.resolved = false;
    this.callbacks = [];
}

Deferred.prototype.then = function(callback) {
    if (this.resolved) {
        callback();
    } else {
        this.callbacks.push(callback);
    }
}

Deferred.prototype.resolve = function() {
    if (this.resolved) {
        return // already done
    }
    this.resolved = true;
    this.callbacks.map(c => c());
}

//
// aliases
//
var PI = Math.PI;
var TAU = Math.PI * 2;
setTimeout( () => {
    // setTImeout because firefox was being weird
    ['cos', 'sin', 'tan', 'acos', 'asin', 'atan'].map(name => {
        window[name] = Math[name]
        var degrees_version = name + 'd'
        if (name[0] === 'a') {
            window[degrees_version] = function() {
                var radians = Math[name].apply(null, arguments)
                return 180 / PI * radians;
            }
        } else {
            window[degrees_version] = function() {
                var args = Array.prototype.slice.call(arguments).map(a => {
                    return PI / 180 * a
                })
                return Math[name].apply(null, args)
            }
        }
    });

    ['sqrt', 'pow'].map(name => {
        window[name] = Math[name]
    })
}, 0)

socket.on('md', (str) => {
    // html-ify the markdown
    var html = converter.makeHtml(str)

    // emojify it
    // html = emojione.toImage(html);

    // load it into the DOM
    $content.innerHTML = html;
    
    // do all the highlighting
    // execute all the javascript
    document.querySelectorAll('pre code').forEach(n => {
        // highlight syntax
        hljs.highlightBlock(n)

        // execute javascript
        if (n.classList.contains('js')) {
            // do something here to set up any potential plots that will display below TODO
            mdnb.current_node = n.parentNode;
            mdnb.code_node = n.parentNode;
            try {
                eval.call(null, n.innerText)
                n.parentElement.classList.remove('error')
            } catch (e) {
                console.error(e)
                var div = document.createElement('div')
                div.id = Math.random().toString(32).slice(2)
                div.classList.add('message')
                div.classList.add('error-message')
                div.innerText = 'Error: ' + e.message
                var $div = insertAfter(div, mdnb.code_node)
                n.parentElement.classList.add('error')
                
                // highlight the line
                var lines = n.innerHTML.split('\n')
                lines[e.lineNumber - 1] = '<span class="error-line">' + lines[e.lineNumber - 1] + '</span>'
                n.innerHTML = lines.join('\n')
            }
        }
    })

    // do mathjax on the whole page
    MathJax.Hub.Config(MATHJAX_CONFIG);
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);

})

//
// Build the sidenav
//
var treeDone = new Deferred();
socket.on('tree', (files) => {
    var tree = {
        name: '/',
        files: [],
        dirs: []
    };

    files.map(f => {
        // get the directory path
        // turn "/wow/nice/file.md"
        // into ['wow', 'nice']
        var dirs = f.split('/').slice(1, -1)
        var currentNode = tree;
        for (d of dirs) {
            if (typeof currentNode.dirs[d] === 'undefined') {
                currentNode.dirs[d] = {
                    name: d,
                    files: [],
                    dirs: {}
                }
            }
            currentNode = currentNode.dirs[d]
        }

        // push the full path
        currentNode.files.push(f)
    })

    // first i'll just show them all
    var items = []

    var indent = '<div class="indent">&nbsp;</div>'

    function addTree(t, indentLevel) {
        if (t.name === '/') {
            indentLevel = ''
        } else {
            items.push(`<div class="dir-toggle item">${indentLevel}<div class="dir open"></div>${t.name}</div>`)
            items.push('<div class="children">')
            indentLevel = indentLevel + indent;
        }

        // sort dirs
        var dirs = Object.keys(t.dirs).sort((a, b) => a.toLowerCase() > b.toLowerCase())
        for (var d of dirs) {
            addTree(t.dirs[d], indentLevel)
        }

        // sort filenames
        t.files = t.files.sort((a, b) => a.toLowerCase() > b.toLowerCase())
        for (var f of t.files) {
            items.push(`<a href="${f}"><div class="item">${indentLevel}${f.split('/').pop()}</div></a>`)
        }
        if (t.name !== '/') {
            items.push('</div>')
        }
    }

    addTree(tree, '');
    document.querySelector('nav').innerHTML = items.join('');

    document.querySelectorAll('div.dir-toggle').forEach(el => {
        el.addEventListener('click', () => {
            var $dir = el.querySelector('.dir')
            if ($dir.classList.contains('open')) {
                el.nextElementSibling.style.display = 'none';
                $dir.classList.remove('open')
            } else {
                el.nextElementSibling.style.display = 'block'
                $dir.classList.add('open')
            }
        })
    })

    document.querySelectorAll('nav a').forEach(el => {
        el.addEventListener('click', (ev) => {
            goto(el.href.replace(location.origin, ''))
            window.scroll(0, 0)
            ev.preventDefault()
            ev.stopPropagation()
            return false;
        })
    })

    treeDone.resolve();
})

// set up nav tree
socket.emit('tree', '')

function goto(md) {
    socket.emit('md', md)
    document.querySelector('main').innerHTML = 'Loading content...'
    history.pushState({}, md, md);
    // highlight the node in the nav tree
    treeDone.then(() => {
        document.querySelectorAll('nav .item.active').forEach(l => l.classList.remove('active'))
        document.querySelectorAll('nav a').forEach(link => {
            if (link.href.replace(location.origin, '') === md) {
                link.children[0].classList.add('active')
            }
        })
    })
    return false;
}

// setup nav open/close listeners
document.querySelector(".nav-open").addEventListener('click', () => {
    document.body.classList.add('nav-open')
})
document.querySelector(".nav-close").addEventListener('click', () => {
    document.body.classList.remove('nav-open')
})

// start the party
goto(location.pathname);



// fun stuff
mdnb.bind = function(classname, fn) {
    document.querySelectorAll(classname).forEach(node => {
        function getValue() {
            var value = node.value
            if (node.type === 'number') {
                value = parseFloat(node.value);
            }
            return value
        }

        // catch it on change
        node.addEventListener('change', (e) => {
            fn(getValue());
        })

        // and also do it once on load
        fn(getValue());
    })
}