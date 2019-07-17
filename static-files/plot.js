function insertAfter(newNode, referenceNode) {
    return referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function print() {
    console.log.apply(null, Array.prototype.slice.call(arguments));
    var div = document.createElement('div');
    div.innerHTML = Array.prototype.slice.call(arguments).join(' ');
    var $div = insertAfter(div, mdnb.current_node);

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