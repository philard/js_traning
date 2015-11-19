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
  if (state.source && state.source !== prevStateSource) { //The change is in the URL (e.g. its first run of this change method)
    source.property("value", state.source);
    WtIo.getURL(state.source, function (wholeBook) {

      TextProcessing.processText(wholeBook);  //When the book is recieved the wtCoreInstance is populated with a list of nodes each with a single word.
      window.dispMe = window.wtCoreInstance.wordNodes;
    });
  }
  else if (wtCoreInstance.wordNodes && wtCoreInstance.wordNodes.length) {         //The change is not in the URL
    var searchTerm = state.prefix;
    searchTerm = searchTerm || UiFeats.url( {prefix: searchTerm = wtCoreInstance.wordNodes[0].token } );//Ensure the search term has some text.
    keyword.property("value", searchTerm).node().select();
    searchTerm = searchTerm.toLowerCase()
        .match(TextProcessing.re);
    var sortBy = ("occurrence" === state.sort) ? 
        function (e, t) {return e.index - t.index} 
        : function (e, t) {return t.count - e.count || e.index - t.index};
    UiFeats.treeG.call(exports.trees[0].sort(sortBy).reverse(+state.reverse).phraseLine(+state["phrase-line"]).prefix(searchTerm));//render lines
    UiFeats.refreshText(exports.trees[0].root());//render text
  }
};




return exports;
})();


