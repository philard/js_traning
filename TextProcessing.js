window.TextProcessing = (function () {
  var exports = {};

  exports.processText = function processText(wholeBook) {
    var bookIterator;
    var n = 0;
    var r = 0;
    var currentRightBarLineProg = 0;
    var testM = text.append("span").text("m").node()
    var lengthOfAnM = testM.offsetWidth;
    testM.remove();
    var maxMsInRightBar = 285 / lengthOfAnM;


    var lines = [];
    for (var linesIndex = []; bookIterator = exports.re.exec(wholeBook);) {
      var separator = wholeBook.substring(n, bookIterator.index);
      if ((currentRightBarLineProg > maxMsInRightBar) || isNewLineSeparator(separator)) {
        currentRightBarLineProg = bookIterator[0].length;
        lines.push(linesIndex);
        linesIndex = [];
      } else {
        currentRightBarLineProg += bookIterator[0].length + !!separator.length;
      }

      var s = {
        token: bookIterator[0],
        lower: bookIterator[0].toLowerCase(),
        index: r++,
        whitespace: separator,
        line: lines.length
      };
      tokens.push(s), linesIndex.push(s), n = exports.re.lastIndex
    }
    lines.push(0), text.call(UiFeats.textViewer.size(lines.length)), WtInit.trees[0].tokens(tokens), WtInit.change()
  }
  function isNewLineSeparator(separator) {
    return (/\r\n\r\n|\r\r|\n\n/.test(separator));
  }

  var unicodePunctuationRe = "!-#%-*,-/:;?@\\[-\\]_{}\xa1\xa7\xab\xb6\xb7\xbb\xbf\u037e\u0387\u055a-\u055f\u0589\u058a\u05be\u05c0\u05c3\u05c6\u05f3\u05f4\u0609\u060a\u060c\u060d\u061b\u061e\u061f\u066a-\u066d\u06d4\u0700-\u070d\u07f7-\u07f9\u0830-\u083e\u085e\u0964\u0965\u0970\u0af0\u0df4\u0e4f\u0e5a\u0e5b\u0f04-\u0f12\u0f14\u0f3a-\u0f3d\u0f85\u0fd0-\u0fd4\u0fd9\u0fda\u104a-\u104f\u10fb\u1360-\u1368\u1400\u166d\u166e\u169b\u169c\u16eb-\u16ed\u1735\u1736\u17d4-\u17d6\u17d8-\u17da\u1800-\u180a\u1944\u1945\u1a1e\u1a1f\u1aa0-\u1aa6\u1aa8-\u1aad\u1b5a-\u1b60\u1bfc-\u1bff\u1c3b-\u1c3f\u1c7e\u1c7f\u1cc0-\u1cc7\u1cd3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205e\u207d\u207e\u208d\u208e\u2329\u232a\u2768-\u2775\u27c5\u27c6\u27e6-\u27ef\u2983-\u2998\u29d8-\u29db\u29fc\u29fd\u2cf9-\u2cfc\u2cfe\u2cff\u2d70\u2e00-\u2e2e\u2e30-\u2e3b\u3001-\u3003\u3008-\u3011\u3014-\u301f\u3030\u303d\u30a0\u30fb\ua4fe\ua4ff\ua60d-\ua60f\ua673\ua67e\ua6f2-\ua6f7\ua874-\ua877\ua8ce\ua8cf\ua8f8-\ua8fa\ua92e\ua92f\ua95f\ua9c1-\ua9cd\ua9de\ua9df\uaa5c-\uaa5f\uaade\uaadf\uaaf0\uaaf1\uabeb\ufd3e\ufd3f\ufe10-\ufe19\ufe30-\ufe52\ufe54-\ufe61\ufe63\ufe68\ufe6a\ufe6b\uff01-\uff03\uff05-\uff0a\uff0c-\uff0f\uff1a\uff1b\uff1f\uff20\uff3b-\uff3d\uff3f\uff5b\uff5d\uff5f-\uff65";


  exports.re = new RegExp("[" + unicodePunctuationRe + "]|\\d+|[^\\d" + unicodePunctuationRe + "0000-001F007F-009F002000A01680180E2000-200A20282029202F205F3000".replace(/\w{4}/g, "\\u$&") + "]+", "g");
  var width;
  var height;
  var lines = [];


  exports.getLines = function () {
    return lines;
  }


  return exports;
})();


var text = d3.select("#text");
var hits = d3.select("#hits");
var keyword = d3.select("#keyword");
var source = d3.select("#source");
var state = {};
tokens = [];
selectedLines = [];


var entity = document.createElement("span");

