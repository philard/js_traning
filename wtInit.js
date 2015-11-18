/**
 * Created by Philip_John_Ardley on 18-Nov-15.
 */


window.WtInit = (function() {
var exports = {};


exports.change = function change() {

  if (!location.search) return showHelp(), void 0;
  var prevStateSource = state ? state.source : null;
  state = WtIo.urlParams(location.search.substr(1));
  if (state.source && state.source !== prevStateSource) { //The change is in the URL
    source.property("value", state.source);
    WtIo.getURL(state.source, function (e) {
      TextProcessing.processText(e);
    });
  }
  else if (tokens && tokens.length) {         //The change is not in the URL
    var t = state.prefix;
    t || UiFeats.url({
      prefix: t = tokens[0].token
    }), keyword.property("value", t).node().select(), t = t.toLowerCase().match(TextProcessing.re), treeG.call(exports.tree.sort("occurrence" === state.sort ? function (e, t) {
      return e.index - t.index
    } : function (e, t) {
      return t.count - e.count || e.index - t.index
    }).reverse(+state.reverse).phraseLine(+state["phrase-line"]).prefix(t)), UiFeats.refreshText(exports.tree.root())
  }
};

window.wordtree = WtCore();

exports.tree = wordtree().on("prefix", function (e) {
    text.call(textViewer);
    var t = state.prefix = e.keyword;
    keyword.property("value", t), UiFeats.url({
        prefix: t
    }), UiFeats.refreshText(e.tree)
});



return exports;
})();


