function insertAfter(newNode, referenceNode) {
    return referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function print() {
    // always console.log it
    console.log.apply(null, Array.prototype.slice.call(arguments));

    // if an print log div already exists, append to that. otherwise create a new one.
    var div;
    if (mdnb.current_node.nextSibling
        && mdnb.current_node.nextSibling.classList
        && mdnb.current_node.nextSibling.classList.contains('message')) {
        div = mdnb.current_node.nextSibling;  
    } else {
        div = document.createElement('div')
        div.classList.add('message')
        div.innerHTML = "<div>Output:</div><textarea readonly />";
        div = insertAfter(div, mdnb.current_node)
    }

    var textarea = div.childNodes[1]
    textarea.value += '\n' + Array.prototype.slice.call(arguments).join(' ');
    textarea.style.height = textarea.scrollHeight + 'px';
}

function plot(x, y, title, legend) {
    var div = document.createElement('div')
    div.id = Math.random().toString(32).slice(2)
    div.style.height = '250px'
    div.style.width = '100%' // TODO

    if (!(y[0] instanceof Array)) {
        y = [y]
        legend = [legend]
    }

    var data = y.map((line, i) => {
        return {
            x: x,
            y: line,
            name: legend[i]
        }
    })

    var $div = insertAfter(div, mdnb.current_node)
    Plotly.plot($div, {
        data,
        layout: {
            // showlegend: typeof title !== 'undefined',
            autosize: true,
            margin: {
                t: 5,
                b: 25,
                l: 50,
                r: 0
            },
            // title: title
        }
    })

    div = document.createElement('div')
    div.classList.add('figure-caption')
    div.innerHTML = title
    $div = insertAfter(div, $div)

    mdnb.current_node = $div
}