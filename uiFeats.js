
window.uiFeats = (function(){
   

var exports = {};

exports.currentLine = function currentLine(e) {
    if (!e) return 0;
    for (var t = e.children; t && t.length;) e = t[0], t = e.children;
    return e.tokens[0].line - 3
}


exports.clearHighlight = function clearHighlight() {
    for (var e = -1; ++e < tokens.length;) tokens[e].highlight = !1
}

exports.highlightTokens = function highlightTokens(e, t) {
    if (e && e.children && e.children.length) {
        t += e.tokens.length;
        e.children.forEach(function(e) {
            highlightTokens(e, t)
        });
    } else {
        e.tokens.forEach(function(e) {
            e.highlight = !0
        });
        for (var n = e.tokens[0].index, r = Math.max(0, n - t); n >= r; r++) {
            tokens[r].highlight = !0;
            selectedLines.push(tokens[r].line);
        }
    }
}


d3.select("#form").on("submit", function() {
    d3.event.preventDefault();
    url({prefix: keyword.property("value")});
    change();
});

d3.select("#form-source").on("submit", function() {
    debugger;//ye
    d3.event.preventDefault();
    url({source: source.property("value"),prefix: ""}, !0);
    change()
});

//START useless stuff
d3.select(window)
    .on("keydown.hover", hoverKey)
    .on("keyup.hover", hoverKey)
    .on("resize", resize)
    .on("popstate", change), change(), resize();


function hoverKey() {
    svg.classed("hover", d3.event.shiftKey)
}

function resize() {
    width = vis.node().clientWidth,
    height = window.innerHeight - 50 - 0, 
    svg.attr("width", width).attr("height", height),
    clip.attr("width", width - 30.5).attr("height", height), 
    treeG.call(tree.width(width - 30).height(height - 20)), 
    text.call(textViewer)
}
//END useless stuff

    
// one phrase per line checkbox
d3.select("#phrase-line").property("checked", +state["phrase-line"]).on("change", function() {
    url({"phrase-line": this.checked ? 1 : 0});
    change();
});

exports.url = function url(e, t) {
    var n = [],
        r = {};
    for (var i in state) r[i] = state[i];
    for (var i in e) r[i] = e[i];
    for (var i in r) n.push(encodeURIComponent(i) + "=" + encodeURIComponent(r[i]));
    history[t ? "pushState" : "replaceState"](null, null, "?" + n.join("&"))
}

return exports;
})();
