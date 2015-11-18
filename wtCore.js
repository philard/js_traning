/**
 * Created by Philip_John_Ardley on 18-Nov-15.
 */




window.wtCore = function() {
  var exports;

  function t() {
    function wordTreeDef(a) {
      var s = someArray ? someArray.count : 0;
      if (s) {
        m(someArray, k / someArray.count);
        var h = r(j.nodes(someArray));
        S.domain(l(someArray) ? [someArray.count - 1, someArray.count + 1] : [0, someArray.count]);
        var u = a.selectAll("text").data(h, c);
        u.attr("font-size", t).attr("dy", ".3em").each(function(e) {
          e.length = this.getComputedTextLength()
        }), i(h), u.transition().duration(U).attr("x", function(e) {
          return d(e.x)
        }).attr("y", function(e) {
          return e.y
        });
        var p = u.enter().append("text"),
          g = u.selectAll("tspan").data(function(e) {
            return e.tokens.map(function(t) {
              return {
                data: e,
                token: t
              }
            })
          });
        g.enter().append("tspan").text(function(e, t) {
          return (t && e.token.whitespace ? "\xa0" : "") + e.token.token
        }), g.on("click", function(t) {
          var n, r = d3.event;
          r.ctrlKey || r.altKey || r.shiftKey ? (a.call(wordTreeDef.prefix([t.token.token])), n = t.token.token, t.data = someArray) : (n = f(t.data), o(t.data), wordTreeDef(a)), E.prefix({
            keyword: n,
            tree: t.data
          })
        }), p.attr("font-size", t).attr("dy", ".3em").each(function(e) {
          e.length = this.getComputedTextLength()
        }).each(function(e) {
          var t = e.parent;
          e.x = t ? t.x + (t.length || 0) + 50 : 0
        }).attr("x", function(e) {
          return d(e.x)
        }).attr("y", function(e) {
          return e.y
        }).attr("visibility", "hidden"), u.attr("text-anchor", L ? "end" : null).transition().delay(U).attr("visibility", null), u.exit().remove();
        var v = a.selectAll("path.link").data(j.links(h), function(e) {
          return c(e.source) + ":" + c(e.target)
        });
        v.attr("visibility", null).transition().duration(U).attr("d", I), v.enter().insert("path", "a").attr("class", "link").attr("d", I).attr("visibility", "hidden").transition().delay(U).attr("visibility", null), v.exit().remove(), U = 500, n(someArray)
      }
    }

    function t(e) {
      var t = e.count / someArray.count * k;
      return e.children && e.children.length ? "0px" | (t > 30 ? 30 + S(e.count - 30 * someArray.count / k) : t - 1) : Math.max(0, Math.min(15, t - 1))
    }

    function a(e, t, n) {
      var r = w[t.toLowerCase()];
      if (!r) return null;
      var i = r.length;
      if (!i) return null;
      for (var a = {}, c = {
        tokens: [e[r[0]]],
        children: [],
        index: r[0]
      }, l = 0; i > l; l++)
        for (var s = r[L ? i - l - 1 : l], h = Math.min(e.length, s + C), d = Math.max(0, s - C), f = c, g = [t]; L ? --s > d : ++s < h;) {
          var x = e[s];
          if (v(x)) break;
          g.push(x.token.toLowerCase());
          var m = g.join(" "),
            y = a[m];
          y ? f = y : (f.children.push(y = {
            tokens: [x],
            children: [],
            index: s
          }), a[m] = y, f = y)
        }
      return p(c), u(c, C - 1), n && n.length && (n = a[n.join(" ")], n && o(n.node || n)), c
    }

    function u(e, t) {
      if (0 >= t) return e.children = [], void 0;
      var n = e.count * A;
      e.children = e.children.filter(function(e) {
        return e.count > n ? (u(e, t - 1), !0) : void 0
      })
    }

    function d(e) {
      return L ? y - e : e
    }

    function p(e, t) {
      var n = 0,
        r = e.children.length;
      if (r) {
        if (1 === r) {
          var i = e.children[0];
          return (L ? e.tokens.unshift : e.tokens.push).apply(e.tokens, i.tokens), e.children = i.children, e.index < 0 && (e.index = i.index), i.node = e, p(e, t)
        }
        for (var o = 0; r > o; ++o) n += p(e.children[o], e)
      } else n = 1, g(e);
      return e.length = 0, e.parent = t, e.count = n
    }

    function f(e) {
      var t = [];
      do(L ? t.push : t.unshift).call(t, d3.merge(e.tokens.map(function(e) {
        return [e.whitespace ? " " : "", e.token]
      }))); while (e = e.parent);
      return t[0] = t[0].slice(1), d3.merge(t).join("")
    }

    function g(e) {
      if (L)
        for (var t = e.tokens[0].index, n = t - H; --t >= 0 && !v(_[t + 1]) && (t >= n || !x(_[t]));) e.tokens.unshift(_[t]);
      else
        for (var t = e.tokens[e.tokens.length - 1].index, n = t + H; ++t < _.length && !v(_[t]) && (n > t || !x(_[t - 1]));) e.tokens.push(_[t])
    }

    function v(e) {
      return z && /[\r\n]/.test(e.whitespace)
    }

    function x(e) {
      return /[\.!?]/.test(e.token)
    }

    function m(e, t) {
      e.count * t < 5 ? e.children && e.children.length > 1 && (e._collapsed = e.children, e.children = [e.children[0]]) : e._collapsed && !e._children && (e.children = e._collapsed), e.children && e.children.forEach(function(e) {
        m(e, t)
      })
    }
    var y,
      k,
      w,
      someArray,
      T = 5,
      C = 10,
      H = 15,
      A = .01,
      L = !1,
      M = s,
      _ = [],
      R = [],
      z = !1,
      E = d3.dispatch("prefix"),
      S = d3.scale.sqrt().range([0, 25]),
      j = d3.layout.partition().sort(h).value(function(e) {
        return e.count
      }),
      I = d3.svg.diagonal().projection(function(e) {
        return [d(e.y), e.x]
      }).source(function(e) {
        return {
          y: e.source.x + (e.source.length ? e.source.length + T : 0),
          x: e.source.y
        }
      }).target(function(e) {
        return {
          y: e.target.x - (e.target.length ? T : 0),
          x: e.target.y
        }
      }),
      U = 0;
    return wordTreeDef.tokens = function(t) {
      if (!arguments.length) return _;
      _ = t, w = {};
      for (var n, r = 0, i = _.length; i > r; ++r) n = M.call(wordTreeDef, _[r], r), (w.hasOwnProperty(n) ? w[n] : w[n] = []).push(r);
      return wordTreeDef
    }, wordTreeDef.prefix = function(t) {
      return arguments.length ? (R = t.slice(), someArray = a(_, L ? R[R.length - 1] : R[0], L ? R.reverse() : R), wordTreeDef) : R
    }, wordTreeDef.root = function() {
      return someArray
    }, wordTreeDef.reverse = function(t) {
      return arguments.length ? (L = !!t, wordTreeDef) : L
    }, wordTreeDef.width = function(t) {
      return arguments.length ? (j.size([j.size()[0], y = +t]), wordTreeDef) : y
    }, wordTreeDef.height = function(t) {
      return arguments.length ? (j.size([k = +t, j.size()[1]]), wordTreeDef) : k
    }, wordTreeDef.phraseLine = function(t) {
      return arguments.length ? (z = !!t, wordTreeDef) : z
    }, d3.rebind(d3.rebind(wordTreeDef, E, "on"), j, "sort")
  }

  function n(e) {
    e._collapsed && !e._children && (e.children = e._collapsed), e.children && e.children.forEach(n)
  }

  function r(e) {
    return e.forEach(function(e) {
      e.y = e.x + e.dx / 2, e.x = e.parent ? e.parent.x + 100 : 0
    }), e
  }

  function i(e) {
    return e.forEach(function(e) {
      var t = e.parent;
      e.x = t ? t.x + (t.length || 0) + 50 : 0
    }), e
  }

  function o(e) {
    for (a(e); e.parent;) e.parent._children || (e.parent._children = e.parent.children, e.parent.children = [e], e.parent._count = e.parent.count), e.parent.count = e.count, e = e.parent
  }

  function a(e) {
    e._children && (e.children = e._children, delete e._children, e.count = e._count, delete e._count), e.children && e.children.forEach(a)
  }

  function c(e) {
    var t = [];
    do t.unshift(e.index + "-" + e.tokens.length), e = e.parent; while (e);
    return t.join("/")
  }

  function l(e) {
    return !e.children || !e.children.length || 1 === e.children.length && l(e.children[0])
  }

  function s(e) {
    return e.token.toLowerCase()
  }

  function h(e, t) {
    return t.count - e.count
  }

  exports = t;
  return exports;
};










