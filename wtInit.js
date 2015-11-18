/**
 * Created by Philip_John_Ardley on 18-Nov-15.
 */


window.wtInit = (function() {
var exports = {};


exports.change = function change() {

  if (!location.search) return showHelp(), void 0;
  var prevStateSource = state ? state.source : null;
  state = wtIo.urlParams(location.search.substr(1));
  if (state.source && state.source !== prevStateSource) { //The change is in the URL
    source.property("value", state.source);
    wtIo.getURL(state.source, function (e) {
      processText(e);
    });
  }
  else if (tokens && tokens.length) {         //The change is not in the URL
    var t = state.prefix;
    t || uiFeats.url({
      prefix: t = tokens[0].token
    }), keyword.property("value", t).node().select(), t = t.toLowerCase().match(re), treeG.call(tree.sort("occurrence" === state.sort ? function (e, t) {
      return e.index - t.index
    } : function (e, t) {
      return t.count - e.count || e.index - t.index
    }).reverse(+state.reverse).phraseLine(+state["phrase-line"]).prefix(t)), uiFeats.refreshText(tree.root())
  }
};

window.wordtree = wtCore();


return exports;
})();


