
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


    function hoverKey() {
        svg.classed("hover", d3.event.shiftKey)
    }
    

    d3.select("#form").on("submit", function() {
        d3.event.preventDefault();
        url({prefix: keyword.property("value")});
        change();
    });


    return exports;
})()


