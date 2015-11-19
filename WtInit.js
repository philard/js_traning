/**
 * Created by Philip_John_Ardley on 18-Nov-15.
 */


window.WtInit = (function() {
var exports = {};

exports.trees = []; 

window.wtCoreInstance = WtCore();

exports.trees[0] = wtCoreInstance().on("prefix", function (e) {
    text.call(textViewer);
    var t = state.prefix = e.keyword;
    keyword.property("value", t), UiFeats.url({
        prefix: t
    }), UiFeats.refreshText(e.tree)
});


exports.change = function change() {

  var prevStateSource = state ? state.source : null;
  state = WtIo.urlParams(location.search.substr(1));
  if (state.source && state.source !== prevStateSource) { //The change is in the URL
    source.property("value", state.source);
    WtIo.getURL(state.source, function (e) {
      TextProcessing.processText(e);
    });
  }
  else if (tokens && tokens.length) {         //The change is not in the URL
    var searchTerm = state.prefix;
    searchTerm = searchTerm || UiFeats.url( {prefix: searchTerm = tokens[0].token } );//Ensure the search erm in defined.
    keyword.property("value", searchTerm).node().select();
    searchTerm = searchTerm.toLowerCase()
        .match(TextProcessing.re);
    var sortBy = ("occurrence" === state.sort) ? 
        function (e, t) {return e.index - t.index} 
        : function (e, t) {return t.count - e.count || e.index - t.index};
    UiFeats.treeG.call(exports.trees[0].sort(sortBy).reverse(+state.reverse).phraseLine(+state["phrase-line"]).prefix(searchTerm));
    UiFeats.refreshText(exports.trees[0].root());
  }
};




return exports;
})();


