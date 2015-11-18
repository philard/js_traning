

window.TextProcessing = thing();
function thing() {
var exports = {};

exports.processText = function processText(e) {
    var t, n = 0,
      r = 0,
      i = 0,
      o = 0,
      a = text.append("span").text("m"),
      c = 285 / a.node().offsetWidth;
    a.remove(), tokens = [], lines = [];
    for (var i = []; t = re.exec(e);) {
        var l = e.substring(n, t.index);
        /\r\n\r\n|\r\r|\n\n/.test(l) ? (lines.push(i, []), i = [], o = t[0].length) : (o += t[0].length + !!l.length, o > c && (o = t[0].length, lines.push(i), i = []));
        var s = {
            token: t[0],
            lower: t[0].toLowerCase(),
            index: r++,
            whitespace: l,
            line: lines.length
        };
        tokens.push(s), i.push(s), n = re.lastIndex
    }
    lines.push(i), text.call(textViewer.size(lines.length)), tree.tokens(tokens), WtInit.change()
};


var unicodePunctuationRe = "!-#%-*,-/:;?@\\[-\\]_{}\xa1\xa7\xab\xb6\xb7\xbb\xbf\u037e\u0387\u055a-\u055f\u0589\u058a\u05be\u05c0\u05c3\u05c6\u05f3\u05f4\u0609\u060a\u060c\u060d\u061b\u061e\u061f\u066a-\u066d\u06d4\u0700-\u070d\u07f7-\u07f9\u0830-\u083e\u085e\u0964\u0965\u0970\u0af0\u0df4\u0e4f\u0e5a\u0e5b\u0f04-\u0f12\u0f14\u0f3a-\u0f3d\u0f85\u0fd0-\u0fd4\u0fd9\u0fda\u104a-\u104f\u10fb\u1360-\u1368\u1400\u166d\u166e\u169b\u169c\u16eb-\u16ed\u1735\u1736\u17d4-\u17d6\u17d8-\u17da\u1800-\u180a\u1944\u1945\u1a1e\u1a1f\u1aa0-\u1aa6\u1aa8-\u1aad\u1b5a-\u1b60\u1bfc-\u1bff\u1c3b-\u1c3f\u1c7e\u1c7f\u1cc0-\u1cc7\u1cd3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205e\u207d\u207e\u208d\u208e\u2329\u232a\u2768-\u2775\u27c5\u27c6\u27e6-\u27ef\u2983-\u2998\u29d8-\u29db\u29fc\u29fd\u2cf9-\u2cfc\u2cfe\u2cff\u2d70\u2e00-\u2e2e\u2e30-\u2e3b\u3001-\u3003\u3008-\u3011\u3014-\u301f\u3030\u303d\u30a0\u30fb\ua4fe\ua4ff\ua60d-\ua60f\ua673\ua67e\ua6f2-\ua6f7\ua874-\ua877\ua8ce\ua8cf\ua8f8-\ua8fa\ua92e\ua92f\ua95f\ua9c1-\ua9cd\ua9de\ua9df\uaa5c-\uaa5f\uaade\uaadf\uaaf0\uaaf1\uabeb\ufd3e\ufd3f\ufe10-\ufe19\ufe30-\ufe52\ufe54-\ufe61\ufe63\ufe68\ufe6a\ufe6b\uff01-\uff03\uff05-\uff0a\uff0c-\uff0f\uff1a\uff1b\uff1f\uff20\uff3b-\uff3d\uff3f\uff5b\uff5d\uff5f-\uff65";
!function () {
    d3.longscroll = function () {
        function e(e) {
            function o(o) {
                e.each(function () {
                    this.scrollTop = o;
                    var e = d3.select(this),
                      a = 1 + Math.ceil(this.clientHeight / i),
                      c = Math.max(0, Math.min(n - a, r)),
                      l = c + a;
                    e.select(".before").style("height", c * i + "px"), e.select(".after").style("height", (n - l) * i + "px");
                    var s = e.select(".current").selectAll("div.row").data(d3.range(c, Math.min(l, n)), String);
                    s.enter().append("div").attr("class", "row"), s.exit().remove(), s.order().call(t)
                })
            }

            e.selectAll("div.before").data([0]).enter().append("div").attr("class", "before");
            var a = e.selectAll("div.current").data([0]);
            a.enter().append("div").attr("class", "current"), e.selectAll("div.after").data([0]).enter().append("div").attr("class", "after"), e.on("scroll.longscroll", function () {
                r = Math.floor(this.scrollTop / i), o(this.scrollTop)
            }), o(0), e.each(function () {
                var e = d3.select(this);
                e.property("scrollTop", +e.select(".before").style("height").replace("px", ""))
            })
        }

        var t = null,
          n = 0,
          r = 0,
          i = 20;
        return e.render = function (n) {
            return arguments.length ? (t = n, e) : t
        }, e.rowHeight = function (t) {
            return arguments.length ? (i = +t, e) : i
        }, e.position = function (t) {
            return arguments.length ? (r = +t, e) : r
        }, e.size = function (t) {
            return arguments.length ? (n = +t, e) : n
        }, e
    }
}();


exports.width;
exports.height;
exports.tree = wordtree().on("prefix", function (e) {
    text.call(textViewer);
    var t = state.prefix = e.keyword;
    keyword.property("value", t), UiFeats.url({
        prefix: t
    }), UiFeats.refreshText(e.tree)
});


exports.textViewer = d3.longscroll().render(function (e) {
    var t = e.selectAll("a").data(function (e) {
        return lines[e] || []
    });
    t.enter().append("a").attr("href", function (e) {
        return "#" + encodeURIComponent(e.token)
    }).on("click", function (e) {
        d3.event.preventDefault(), UiFeats.url({
            prefix: e.token
        }), change()
    }).text(function (e) {
        return e.whitespace && this.parentNode.insertBefore(document.createTextNode(" "), this), e.token
    }), t.classed("highlight", highlight)
});


function highlight(e) {
    return e.highlight
}




exports.re = new RegExp("[" + unicodePunctuationRe + "]|\\d+|[^\\d" + unicodePunctuationRe + "0000-001F007F-009F002000A01680180E2000-200A20282029202F205F3000".replace(/\w{4}/g, "\\u$&") + "]+", "g");
exports.vis = d3.select("#vis");
exports.svg = vis.append("svg");
exports.clip = svg.append("defs").append("clipPath").attr("id", "clip").append("rect");
exports.treeG = svg.append("g").attr("transform", "translate(0,20)").attr("clip-path", "url(#clip)");//WTF. needs UiFeats.url or url...
exports.lines = [];
exports.text = d3.select("#text");
exports.hits = d3.select("#hits");
exports.keyword = d3.select("#keyword");
exports.source = d3.select("#source");
exports.state = {};
exports.tokens;
exports.selectedLines = [];


exports.entity = document.createElement("span");

return exports;
}