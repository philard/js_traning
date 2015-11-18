/**
 * Created by Philip_John_Ardley on 17-Nov-15.
 */
window.wtIo = (function() {
  var exports = {};

  exports.urlParams = function urlParams(e) {
    var t = {};
    return e && e.split(/&/g).forEach(function(e) {
      e = e.split("="), t[decodeURIComponent(e[0])] = decodeURIComponent(e[1])
    }), t
  }

  exports.getURL = function getURL(e, t) {
    function n(e, n) {
      t(/^text\/html\b/.test(n.getResponseHeader("Content-Type")) ? n.responseText.replace(/<script[^>]*>([\S\s]*?)<\/script>/gim, "").replace(/<style[^>]*>([\S\s]*?)<\/style>/gim, "").replace(/<head[^>]*>([\S\s]*?)<\/head>/gim, "").replace(/<[^>]*?>/gm, " ").replace(/&#?\w+;/g, decodeEntity) : n.responseText)
    }
    if ("https:" === location.protocol && /^http:/.test(e)) proxy(e, n);
    else try {
      d3.xhr(e, function(t, r) {
        t ? proxy(e, n) : n(t, r)
      })
    } catch (r) {
      proxy(e, n)
    }
  }

  return exports;
})()

