var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/codemirror/lib/codemirror.js
var require_codemirror = __commonJS({
  "node_modules/codemirror/lib/codemirror.js"(exports, module) {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = global || self, global.CodeMirror = factory());
    })(exports, function() {
      "use strict";
      var userAgent = navigator.userAgent;
      var platform = navigator.platform;
      var gecko = /gecko\/\d/i.test(userAgent);
      var ie_upto10 = /MSIE \d/.test(userAgent);
      var ie_11up = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(userAgent);
      var edge = /Edge\/(\d+)/.exec(userAgent);
      var ie = ie_upto10 || ie_11up || edge;
      var ie_version = ie && (ie_upto10 ? document.documentMode || 6 : +(edge || ie_11up)[1]);
      var webkit = !edge && /WebKit\//.test(userAgent);
      var qtwebkit = webkit && /Qt\/\d+\.\d+/.test(userAgent);
      var chrome = !edge && /Chrome\/(\d+)/.exec(userAgent);
      var chrome_version = chrome && +chrome[1];
      var presto = /Opera\//.test(userAgent);
      var safari = /Apple Computer/.test(navigator.vendor);
      var mac_geMountainLion = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(userAgent);
      var phantom = /PhantomJS/.test(userAgent);
      var ios = safari && (/Mobile\/\w+/.test(userAgent) || navigator.maxTouchPoints > 2);
      var android = /Android/.test(userAgent);
      var mobile = ios || android || /webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(userAgent);
      var mac = ios || /Mac/.test(platform);
      var chromeOS = /\bCrOS\b/.test(userAgent);
      var windows = /win/i.test(platform);
      var presto_version = presto && userAgent.match(/Version\/(\d*\.\d*)/);
      if (presto_version) {
        presto_version = Number(presto_version[1]);
      }
      if (presto_version && presto_version >= 15) {
        presto = false;
        webkit = true;
      }
      var flipCtrlCmd = mac && (qtwebkit || presto && (presto_version == null || presto_version < 12.11));
      var captureRightClick = gecko || ie && ie_version >= 9;
      function classTest(cls) {
        return new RegExp("(^|\\s)" + cls + "(?:$|\\s)\\s*");
      }
      var rmClass = function(node, cls) {
        var current = node.className;
        var match = classTest(cls).exec(current);
        if (match) {
          var after = current.slice(match.index + match[0].length);
          node.className = current.slice(0, match.index) + (after ? match[1] + after : "");
        }
      };
      function removeChildren(e) {
        for (var count = e.childNodes.length; count > 0; --count) {
          e.removeChild(e.firstChild);
        }
        return e;
      }
      function removeChildrenAndAdd(parent, e) {
        return removeChildren(parent).appendChild(e);
      }
      function elt(tag, content, className, style) {
        var e = document.createElement(tag);
        if (className) {
          e.className = className;
        }
        if (style) {
          e.style.cssText = style;
        }
        if (typeof content == "string") {
          e.appendChild(document.createTextNode(content));
        } else if (content) {
          for (var i2 = 0; i2 < content.length; ++i2) {
            e.appendChild(content[i2]);
          }
        }
        return e;
      }
      function eltP(tag, content, className, style) {
        var e = elt(tag, content, className, style);
        e.setAttribute("role", "presentation");
        return e;
      }
      var range;
      if (document.createRange) {
        range = function(node, start, end, endNode) {
          var r = document.createRange();
          r.setEnd(endNode || node, end);
          r.setStart(node, start);
          return r;
        };
      } else {
        range = function(node, start, end) {
          var r = document.body.createTextRange();
          try {
            r.moveToElementText(node.parentNode);
          } catch (e) {
            return r;
          }
          r.collapse(true);
          r.moveEnd("character", end);
          r.moveStart("character", start);
          return r;
        };
      }
      function contains(parent, child) {
        if (child.nodeType == 3) {
          child = child.parentNode;
        }
        if (parent.contains) {
          return parent.contains(child);
        }
        do {
          if (child.nodeType == 11) {
            child = child.host;
          }
          if (child == parent) {
            return true;
          }
        } while (child = child.parentNode);
      }
      function activeElt(doc2) {
        var activeElement;
        try {
          activeElement = doc2.activeElement;
        } catch (e) {
          activeElement = doc2.body || null;
        }
        while (activeElement && activeElement.shadowRoot && activeElement.shadowRoot.activeElement) {
          activeElement = activeElement.shadowRoot.activeElement;
        }
        return activeElement;
      }
      function addClass(node, cls) {
        var current = node.className;
        if (!classTest(cls).test(current)) {
          node.className += (current ? " " : "") + cls;
        }
      }
      function joinClasses(a, b) {
        var as = a.split(" ");
        for (var i2 = 0; i2 < as.length; i2++) {
          if (as[i2] && !classTest(as[i2]).test(b)) {
            b += " " + as[i2];
          }
        }
        return b;
      }
      var selectInput = function(node) {
        node.select();
      };
      if (ios) {
        selectInput = function(node) {
          node.selectionStart = 0;
          node.selectionEnd = node.value.length;
        };
      } else if (ie) {
        selectInput = function(node) {
          try {
            node.select();
          } catch (_e) {
          }
        };
      }
      function doc(cm) {
        return cm.display.wrapper.ownerDocument;
      }
      function win(cm) {
        return doc(cm).defaultView;
      }
      function bind(f) {
        var args = Array.prototype.slice.call(arguments, 1);
        return function() {
          return f.apply(null, args);
        };
      }
      function copyObj(obj, target, overwrite) {
        if (!target) {
          target = {};
        }
        for (var prop2 in obj) {
          if (obj.hasOwnProperty(prop2) && (overwrite !== false || !target.hasOwnProperty(prop2))) {
            target[prop2] = obj[prop2];
          }
        }
        return target;
      }
      function countColumn(string, end, tabSize, startIndex, startValue) {
        if (end == null) {
          end = string.search(/[^\s\u00a0]/);
          if (end == -1) {
            end = string.length;
          }
        }
        for (var i2 = startIndex || 0, n = startValue || 0; ; ) {
          var nextTab = string.indexOf("	", i2);
          if (nextTab < 0 || nextTab >= end) {
            return n + (end - i2);
          }
          n += nextTab - i2;
          n += tabSize - n % tabSize;
          i2 = nextTab + 1;
        }
      }
      var Delayed = function() {
        this.id = null;
        this.f = null;
        this.time = 0;
        this.handler = bind(this.onTimeout, this);
      };
      Delayed.prototype.onTimeout = function(self2) {
        self2.id = 0;
        if (self2.time <= +new Date()) {
          self2.f();
        } else {
          setTimeout(self2.handler, self2.time - +new Date());
        }
      };
      Delayed.prototype.set = function(ms, f) {
        this.f = f;
        var time = +new Date() + ms;
        if (!this.id || time < this.time) {
          clearTimeout(this.id);
          this.id = setTimeout(this.handler, ms);
          this.time = time;
        }
      };
      function indexOf(array, elt2) {
        for (var i2 = 0; i2 < array.length; ++i2) {
          if (array[i2] == elt2) {
            return i2;
          }
        }
        return -1;
      }
      var scrollerGap = 50;
      var Pass = { toString: function() {
        return "CodeMirror.Pass";
      } };
      var sel_dontScroll = { scroll: false }, sel_mouse = { origin: "*mouse" }, sel_move = { origin: "+move" };
      function findColumn(string, goal, tabSize) {
        for (var pos = 0, col = 0; ; ) {
          var nextTab = string.indexOf("	", pos);
          if (nextTab == -1) {
            nextTab = string.length;
          }
          var skipped = nextTab - pos;
          if (nextTab == string.length || col + skipped >= goal) {
            return pos + Math.min(skipped, goal - col);
          }
          col += nextTab - pos;
          col += tabSize - col % tabSize;
          pos = nextTab + 1;
          if (col >= goal) {
            return pos;
          }
        }
      }
      var spaceStrs = [""];
      function spaceStr(n) {
        while (spaceStrs.length <= n) {
          spaceStrs.push(lst(spaceStrs) + " ");
        }
        return spaceStrs[n];
      }
      function lst(arr) {
        return arr[arr.length - 1];
      }
      function map(array, f) {
        var out = [];
        for (var i2 = 0; i2 < array.length; i2++) {
          out[i2] = f(array[i2], i2);
        }
        return out;
      }
      function insertSorted(array, value, score) {
        var pos = 0, priority = score(value);
        while (pos < array.length && score(array[pos]) <= priority) {
          pos++;
        }
        array.splice(pos, 0, value);
      }
      function nothing() {
      }
      function createObj(base, props) {
        var inst;
        if (Object.create) {
          inst = Object.create(base);
        } else {
          nothing.prototype = base;
          inst = new nothing();
        }
        if (props) {
          copyObj(props, inst);
        }
        return inst;
      }
      var nonASCIISingleCaseWordChar = /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;
      function isWordCharBasic(ch) {
        return /\w/.test(ch) || ch > "\x80" && (ch.toUpperCase() != ch.toLowerCase() || nonASCIISingleCaseWordChar.test(ch));
      }
      function isWordChar(ch, helper) {
        if (!helper) {
          return isWordCharBasic(ch);
        }
        if (helper.source.indexOf("\\w") > -1 && isWordCharBasic(ch)) {
          return true;
        }
        return helper.test(ch);
      }
      function isEmpty(obj) {
        for (var n in obj) {
          if (obj.hasOwnProperty(n) && obj[n]) {
            return false;
          }
        }
        return true;
      }
      var extendingChars = /[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/;
      function isExtendingChar(ch) {
        return ch.charCodeAt(0) >= 768 && extendingChars.test(ch);
      }
      function skipExtendingChars(str, pos, dir) {
        while ((dir < 0 ? pos > 0 : pos < str.length) && isExtendingChar(str.charAt(pos))) {
          pos += dir;
        }
        return pos;
      }
      function findFirst(pred, from, to) {
        var dir = from > to ? -1 : 1;
        for (; ; ) {
          if (from == to) {
            return from;
          }
          var midF = (from + to) / 2, mid = dir < 0 ? Math.ceil(midF) : Math.floor(midF);
          if (mid == from) {
            return pred(mid) ? from : to;
          }
          if (pred(mid)) {
            to = mid;
          } else {
            from = mid + dir;
          }
        }
      }
      function iterateBidiSections(order, from, to, f) {
        if (!order) {
          return f(from, to, "ltr", 0);
        }
        var found = false;
        for (var i2 = 0; i2 < order.length; ++i2) {
          var part = order[i2];
          if (part.from < to && part.to > from || from == to && part.to == from) {
            f(Math.max(part.from, from), Math.min(part.to, to), part.level == 1 ? "rtl" : "ltr", i2);
            found = true;
          }
        }
        if (!found) {
          f(from, to, "ltr");
        }
      }
      var bidiOther = null;
      function getBidiPartAt(order, ch, sticky) {
        var found;
        bidiOther = null;
        for (var i2 = 0; i2 < order.length; ++i2) {
          var cur = order[i2];
          if (cur.from < ch && cur.to > ch) {
            return i2;
          }
          if (cur.to == ch) {
            if (cur.from != cur.to && sticky == "before") {
              found = i2;
            } else {
              bidiOther = i2;
            }
          }
          if (cur.from == ch) {
            if (cur.from != cur.to && sticky != "before") {
              found = i2;
            } else {
              bidiOther = i2;
            }
          }
        }
        return found != null ? found : bidiOther;
      }
      var bidiOrdering = function() {
        var lowTypes = "bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN";
        var arabicTypes = "nnnnnnNNr%%r,rNNmmmmmmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmmmnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmnNmmmmmmrrmmNmmmmrr1111111111";
        function charType(code) {
          if (code <= 247) {
            return lowTypes.charAt(code);
          } else if (1424 <= code && code <= 1524) {
            return "R";
          } else if (1536 <= code && code <= 1785) {
            return arabicTypes.charAt(code - 1536);
          } else if (1774 <= code && code <= 2220) {
            return "r";
          } else if (8192 <= code && code <= 8203) {
            return "w";
          } else if (code == 8204) {
            return "b";
          } else {
            return "L";
          }
        }
        var bidiRE = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/;
        var isNeutral = /[stwN]/, isStrong = /[LRr]/, countsAsLeft = /[Lb1n]/, countsAsNum = /[1n]/;
        function BidiSpan(level, from, to) {
          this.level = level;
          this.from = from;
          this.to = to;
        }
        return function(str, direction) {
          var outerType = direction == "ltr" ? "L" : "R";
          if (str.length == 0 || direction == "ltr" && !bidiRE.test(str)) {
            return false;
          }
          var len = str.length, types = [];
          for (var i2 = 0; i2 < len; ++i2) {
            types.push(charType(str.charCodeAt(i2)));
          }
          for (var i$12 = 0, prev = outerType; i$12 < len; ++i$12) {
            var type = types[i$12];
            if (type == "m") {
              types[i$12] = prev;
            } else {
              prev = type;
            }
          }
          for (var i$22 = 0, cur = outerType; i$22 < len; ++i$22) {
            var type$1 = types[i$22];
            if (type$1 == "1" && cur == "r") {
              types[i$22] = "n";
            } else if (isStrong.test(type$1)) {
              cur = type$1;
              if (type$1 == "r") {
                types[i$22] = "R";
              }
            }
          }
          for (var i$3 = 1, prev$1 = types[0]; i$3 < len - 1; ++i$3) {
            var type$2 = types[i$3];
            if (type$2 == "+" && prev$1 == "1" && types[i$3 + 1] == "1") {
              types[i$3] = "1";
            } else if (type$2 == "," && prev$1 == types[i$3 + 1] && (prev$1 == "1" || prev$1 == "n")) {
              types[i$3] = prev$1;
            }
            prev$1 = type$2;
          }
          for (var i$4 = 0; i$4 < len; ++i$4) {
            var type$3 = types[i$4];
            if (type$3 == ",") {
              types[i$4] = "N";
            } else if (type$3 == "%") {
              var end = void 0;
              for (end = i$4 + 1; end < len && types[end] == "%"; ++end) {
              }
              var replace = i$4 && types[i$4 - 1] == "!" || end < len && types[end] == "1" ? "1" : "N";
              for (var j = i$4; j < end; ++j) {
                types[j] = replace;
              }
              i$4 = end - 1;
            }
          }
          for (var i$5 = 0, cur$1 = outerType; i$5 < len; ++i$5) {
            var type$4 = types[i$5];
            if (cur$1 == "L" && type$4 == "1") {
              types[i$5] = "L";
            } else if (isStrong.test(type$4)) {
              cur$1 = type$4;
            }
          }
          for (var i$6 = 0; i$6 < len; ++i$6) {
            if (isNeutral.test(types[i$6])) {
              var end$1 = void 0;
              for (end$1 = i$6 + 1; end$1 < len && isNeutral.test(types[end$1]); ++end$1) {
              }
              var before = (i$6 ? types[i$6 - 1] : outerType) == "L";
              var after = (end$1 < len ? types[end$1] : outerType) == "L";
              var replace$1 = before == after ? before ? "L" : "R" : outerType;
              for (var j$1 = i$6; j$1 < end$1; ++j$1) {
                types[j$1] = replace$1;
              }
              i$6 = end$1 - 1;
            }
          }
          var order = [], m;
          for (var i$7 = 0; i$7 < len; ) {
            if (countsAsLeft.test(types[i$7])) {
              var start = i$7;
              for (++i$7; i$7 < len && countsAsLeft.test(types[i$7]); ++i$7) {
              }
              order.push(new BidiSpan(0, start, i$7));
            } else {
              var pos = i$7, at = order.length, isRTL = direction == "rtl" ? 1 : 0;
              for (++i$7; i$7 < len && types[i$7] != "L"; ++i$7) {
              }
              for (var j$2 = pos; j$2 < i$7; ) {
                if (countsAsNum.test(types[j$2])) {
                  if (pos < j$2) {
                    order.splice(at, 0, new BidiSpan(1, pos, j$2));
                    at += isRTL;
                  }
                  var nstart = j$2;
                  for (++j$2; j$2 < i$7 && countsAsNum.test(types[j$2]); ++j$2) {
                  }
                  order.splice(at, 0, new BidiSpan(2, nstart, j$2));
                  at += isRTL;
                  pos = j$2;
                } else {
                  ++j$2;
                }
              }
              if (pos < i$7) {
                order.splice(at, 0, new BidiSpan(1, pos, i$7));
              }
            }
          }
          if (direction == "ltr") {
            if (order[0].level == 1 && (m = str.match(/^\s+/))) {
              order[0].from = m[0].length;
              order.unshift(new BidiSpan(0, 0, m[0].length));
            }
            if (lst(order).level == 1 && (m = str.match(/\s+$/))) {
              lst(order).to -= m[0].length;
              order.push(new BidiSpan(0, len - m[0].length, len));
            }
          }
          return direction == "rtl" ? order.reverse() : order;
        };
      }();
      function getOrder(line, direction) {
        var order = line.order;
        if (order == null) {
          order = line.order = bidiOrdering(line.text, direction);
        }
        return order;
      }
      var noHandlers = [];
      var on = function(emitter, type, f) {
        if (emitter.addEventListener) {
          emitter.addEventListener(type, f, false);
        } else if (emitter.attachEvent) {
          emitter.attachEvent("on" + type, f);
        } else {
          var map2 = emitter._handlers || (emitter._handlers = {});
          map2[type] = (map2[type] || noHandlers).concat(f);
        }
      };
      function getHandlers(emitter, type) {
        return emitter._handlers && emitter._handlers[type] || noHandlers;
      }
      function off(emitter, type, f) {
        if (emitter.removeEventListener) {
          emitter.removeEventListener(type, f, false);
        } else if (emitter.detachEvent) {
          emitter.detachEvent("on" + type, f);
        } else {
          var map2 = emitter._handlers, arr = map2 && map2[type];
          if (arr) {
            var index = indexOf(arr, f);
            if (index > -1) {
              map2[type] = arr.slice(0, index).concat(arr.slice(index + 1));
            }
          }
        }
      }
      function signal(emitter, type) {
        var handlers = getHandlers(emitter, type);
        if (!handlers.length) {
          return;
        }
        var args = Array.prototype.slice.call(arguments, 2);
        for (var i2 = 0; i2 < handlers.length; ++i2) {
          handlers[i2].apply(null, args);
        }
      }
      function signalDOMEvent(cm, e, override) {
        if (typeof e == "string") {
          e = { type: e, preventDefault: function() {
            this.defaultPrevented = true;
          } };
        }
        signal(cm, override || e.type, cm, e);
        return e_defaultPrevented(e) || e.codemirrorIgnore;
      }
      function signalCursorActivity(cm) {
        var arr = cm._handlers && cm._handlers.cursorActivity;
        if (!arr) {
          return;
        }
        var set = cm.curOp.cursorActivityHandlers || (cm.curOp.cursorActivityHandlers = []);
        for (var i2 = 0; i2 < arr.length; ++i2) {
          if (indexOf(set, arr[i2]) == -1) {
            set.push(arr[i2]);
          }
        }
      }
      function hasHandler(emitter, type) {
        return getHandlers(emitter, type).length > 0;
      }
      function eventMixin(ctor) {
        ctor.prototype.on = function(type, f) {
          on(this, type, f);
        };
        ctor.prototype.off = function(type, f) {
          off(this, type, f);
        };
      }
      function e_preventDefault(e) {
        if (e.preventDefault) {
          e.preventDefault();
        } else {
          e.returnValue = false;
        }
      }
      function e_stopPropagation(e) {
        if (e.stopPropagation) {
          e.stopPropagation();
        } else {
          e.cancelBubble = true;
        }
      }
      function e_defaultPrevented(e) {
        return e.defaultPrevented != null ? e.defaultPrevented : e.returnValue == false;
      }
      function e_stop(e) {
        e_preventDefault(e);
        e_stopPropagation(e);
      }
      function e_target(e) {
        return e.target || e.srcElement;
      }
      function e_button(e) {
        var b = e.which;
        if (b == null) {
          if (e.button & 1) {
            b = 1;
          } else if (e.button & 2) {
            b = 3;
          } else if (e.button & 4) {
            b = 2;
          }
        }
        if (mac && e.ctrlKey && b == 1) {
          b = 3;
        }
        return b;
      }
      var dragAndDrop = function() {
        if (ie && ie_version < 9) {
          return false;
        }
        var div = elt("div");
        return "draggable" in div || "dragDrop" in div;
      }();
      var zwspSupported;
      function zeroWidthElement(measure) {
        if (zwspSupported == null) {
          var test = elt("span", "\u200B");
          removeChildrenAndAdd(measure, elt("span", [test, document.createTextNode("x")]));
          if (measure.firstChild.offsetHeight != 0) {
            zwspSupported = test.offsetWidth <= 1 && test.offsetHeight > 2 && !(ie && ie_version < 8);
          }
        }
        var node = zwspSupported ? elt("span", "\u200B") : elt("span", "\xA0", null, "display: inline-block; width: 1px; margin-right: -1px");
        node.setAttribute("cm-text", "");
        return node;
      }
      var badBidiRects;
      function hasBadBidiRects(measure) {
        if (badBidiRects != null) {
          return badBidiRects;
        }
        var txt = removeChildrenAndAdd(measure, document.createTextNode("A\u062EA"));
        var r0 = range(txt, 0, 1).getBoundingClientRect();
        var r1 = range(txt, 1, 2).getBoundingClientRect();
        removeChildren(measure);
        if (!r0 || r0.left == r0.right) {
          return false;
        }
        return badBidiRects = r1.right - r0.right < 3;
      }
      var splitLinesAuto = "\n\nb".split(/\n/).length != 3 ? function(string) {
        var pos = 0, result = [], l = string.length;
        while (pos <= l) {
          var nl = string.indexOf("\n", pos);
          if (nl == -1) {
            nl = string.length;
          }
          var line = string.slice(pos, string.charAt(nl - 1) == "\r" ? nl - 1 : nl);
          var rt = line.indexOf("\r");
          if (rt != -1) {
            result.push(line.slice(0, rt));
            pos += rt + 1;
          } else {
            result.push(line);
            pos = nl + 1;
          }
        }
        return result;
      } : function(string) {
        return string.split(/\r\n?|\n/);
      };
      var hasSelection = window.getSelection ? function(te) {
        try {
          return te.selectionStart != te.selectionEnd;
        } catch (e) {
          return false;
        }
      } : function(te) {
        var range2;
        try {
          range2 = te.ownerDocument.selection.createRange();
        } catch (e) {
        }
        if (!range2 || range2.parentElement() != te) {
          return false;
        }
        return range2.compareEndPoints("StartToEnd", range2) != 0;
      };
      var hasCopyEvent = function() {
        var e = elt("div");
        if ("oncopy" in e) {
          return true;
        }
        e.setAttribute("oncopy", "return;");
        return typeof e.oncopy == "function";
      }();
      var badZoomedRects = null;
      function hasBadZoomedRects(measure) {
        if (badZoomedRects != null) {
          return badZoomedRects;
        }
        var node = removeChildrenAndAdd(measure, elt("span", "x"));
        var normal = node.getBoundingClientRect();
        var fromRange = range(node, 0, 1).getBoundingClientRect();
        return badZoomedRects = Math.abs(normal.left - fromRange.left) > 1;
      }
      var modes = {}, mimeModes = {};
      function defineMode(name, mode) {
        if (arguments.length > 2) {
          mode.dependencies = Array.prototype.slice.call(arguments, 2);
        }
        modes[name] = mode;
      }
      function defineMIME(mime, spec) {
        mimeModes[mime] = spec;
      }
      function resolveMode(spec) {
        if (typeof spec == "string" && mimeModes.hasOwnProperty(spec)) {
          spec = mimeModes[spec];
        } else if (spec && typeof spec.name == "string" && mimeModes.hasOwnProperty(spec.name)) {
          var found = mimeModes[spec.name];
          if (typeof found == "string") {
            found = { name: found };
          }
          spec = createObj(found, spec);
          spec.name = found.name;
        } else if (typeof spec == "string" && /^[\w\-]+\/[\w\-]+\+xml$/.test(spec)) {
          return resolveMode("application/xml");
        } else if (typeof spec == "string" && /^[\w\-]+\/[\w\-]+\+json$/.test(spec)) {
          return resolveMode("application/json");
        }
        if (typeof spec == "string") {
          return { name: spec };
        } else {
          return spec || { name: "null" };
        }
      }
      function getMode2(options, spec) {
        spec = resolveMode(spec);
        var mfactory = modes[spec.name];
        if (!mfactory) {
          return getMode2(options, "text/plain");
        }
        var modeObj = mfactory(options, spec);
        if (modeExtensions.hasOwnProperty(spec.name)) {
          var exts = modeExtensions[spec.name];
          for (var prop2 in exts) {
            if (!exts.hasOwnProperty(prop2)) {
              continue;
            }
            if (modeObj.hasOwnProperty(prop2)) {
              modeObj["_" + prop2] = modeObj[prop2];
            }
            modeObj[prop2] = exts[prop2];
          }
        }
        modeObj.name = spec.name;
        if (spec.helperType) {
          modeObj.helperType = spec.helperType;
        }
        if (spec.modeProps) {
          for (var prop$1 in spec.modeProps) {
            modeObj[prop$1] = spec.modeProps[prop$1];
          }
        }
        return modeObj;
      }
      var modeExtensions = {};
      function extendMode(mode, properties) {
        var exts = modeExtensions.hasOwnProperty(mode) ? modeExtensions[mode] : modeExtensions[mode] = {};
        copyObj(properties, exts);
      }
      function copyState(mode, state) {
        if (state === true) {
          return state;
        }
        if (mode.copyState) {
          return mode.copyState(state);
        }
        var nstate = {};
        for (var n in state) {
          var val = state[n];
          if (val instanceof Array) {
            val = val.concat([]);
          }
          nstate[n] = val;
        }
        return nstate;
      }
      function innerMode(mode, state) {
        var info;
        while (mode.innerMode) {
          info = mode.innerMode(state);
          if (!info || info.mode == mode) {
            break;
          }
          state = info.state;
          mode = info.mode;
        }
        return info || { mode, state };
      }
      function startState(mode, a1, a2) {
        return mode.startState ? mode.startState(a1, a2) : true;
      }
      var StringStream = function(string, tabSize, lineOracle) {
        this.pos = this.start = 0;
        this.string = string;
        this.tabSize = tabSize || 8;
        this.lastColumnPos = this.lastColumnValue = 0;
        this.lineStart = 0;
        this.lineOracle = lineOracle;
      };
      StringStream.prototype.eol = function() {
        return this.pos >= this.string.length;
      };
      StringStream.prototype.sol = function() {
        return this.pos == this.lineStart;
      };
      StringStream.prototype.peek = function() {
        return this.string.charAt(this.pos) || void 0;
      };
      StringStream.prototype.next = function() {
        if (this.pos < this.string.length) {
          return this.string.charAt(this.pos++);
        }
      };
      StringStream.prototype.eat = function(match) {
        var ch = this.string.charAt(this.pos);
        var ok;
        if (typeof match == "string") {
          ok = ch == match;
        } else {
          ok = ch && (match.test ? match.test(ch) : match(ch));
        }
        if (ok) {
          ++this.pos;
          return ch;
        }
      };
      StringStream.prototype.eatWhile = function(match) {
        var start = this.pos;
        while (this.eat(match)) {
        }
        return this.pos > start;
      };
      StringStream.prototype.eatSpace = function() {
        var start = this.pos;
        while (/[\s\u00a0]/.test(this.string.charAt(this.pos))) {
          ++this.pos;
        }
        return this.pos > start;
      };
      StringStream.prototype.skipToEnd = function() {
        this.pos = this.string.length;
      };
      StringStream.prototype.skipTo = function(ch) {
        var found = this.string.indexOf(ch, this.pos);
        if (found > -1) {
          this.pos = found;
          return true;
        }
      };
      StringStream.prototype.backUp = function(n) {
        this.pos -= n;
      };
      StringStream.prototype.column = function() {
        if (this.lastColumnPos < this.start) {
          this.lastColumnValue = countColumn(this.string, this.start, this.tabSize, this.lastColumnPos, this.lastColumnValue);
          this.lastColumnPos = this.start;
        }
        return this.lastColumnValue - (this.lineStart ? countColumn(this.string, this.lineStart, this.tabSize) : 0);
      };
      StringStream.prototype.indentation = function() {
        return countColumn(this.string, null, this.tabSize) - (this.lineStart ? countColumn(this.string, this.lineStart, this.tabSize) : 0);
      };
      StringStream.prototype.match = function(pattern, consume, caseInsensitive) {
        if (typeof pattern == "string") {
          var cased = function(str) {
            return caseInsensitive ? str.toLowerCase() : str;
          };
          var substr = this.string.substr(this.pos, pattern.length);
          if (cased(substr) == cased(pattern)) {
            if (consume !== false) {
              this.pos += pattern.length;
            }
            return true;
          }
        } else {
          var match = this.string.slice(this.pos).match(pattern);
          if (match && match.index > 0) {
            return null;
          }
          if (match && consume !== false) {
            this.pos += match[0].length;
          }
          return match;
        }
      };
      StringStream.prototype.current = function() {
        return this.string.slice(this.start, this.pos);
      };
      StringStream.prototype.hideFirstChars = function(n, inner) {
        this.lineStart += n;
        try {
          return inner();
        } finally {
          this.lineStart -= n;
        }
      };
      StringStream.prototype.lookAhead = function(n) {
        var oracle = this.lineOracle;
        return oracle && oracle.lookAhead(n);
      };
      StringStream.prototype.baseToken = function() {
        var oracle = this.lineOracle;
        return oracle && oracle.baseToken(this.pos);
      };
      function getLine(doc2, n) {
        n -= doc2.first;
        if (n < 0 || n >= doc2.size) {
          throw new Error("There is no line " + (n + doc2.first) + " in the document.");
        }
        var chunk = doc2;
        while (!chunk.lines) {
          for (var i2 = 0; ; ++i2) {
            var child = chunk.children[i2], sz = child.chunkSize();
            if (n < sz) {
              chunk = child;
              break;
            }
            n -= sz;
          }
        }
        return chunk.lines[n];
      }
      function getBetween(doc2, start, end) {
        var out = [], n = start.line;
        doc2.iter(start.line, end.line + 1, function(line) {
          var text = line.text;
          if (n == end.line) {
            text = text.slice(0, end.ch);
          }
          if (n == start.line) {
            text = text.slice(start.ch);
          }
          out.push(text);
          ++n;
        });
        return out;
      }
      function getLines(doc2, from, to) {
        var out = [];
        doc2.iter(from, to, function(line) {
          out.push(line.text);
        });
        return out;
      }
      function updateLineHeight(line, height) {
        var diff = height - line.height;
        if (diff) {
          for (var n = line; n; n = n.parent) {
            n.height += diff;
          }
        }
      }
      function lineNo(line) {
        if (line.parent == null) {
          return null;
        }
        var cur = line.parent, no = indexOf(cur.lines, line);
        for (var chunk = cur.parent; chunk; cur = chunk, chunk = chunk.parent) {
          for (var i2 = 0; ; ++i2) {
            if (chunk.children[i2] == cur) {
              break;
            }
            no += chunk.children[i2].chunkSize();
          }
        }
        return no + cur.first;
      }
      function lineAtHeight(chunk, h) {
        var n = chunk.first;
        outer:
          do {
            for (var i$12 = 0; i$12 < chunk.children.length; ++i$12) {
              var child = chunk.children[i$12], ch = child.height;
              if (h < ch) {
                chunk = child;
                continue outer;
              }
              h -= ch;
              n += child.chunkSize();
            }
            return n;
          } while (!chunk.lines);
        var i2 = 0;
        for (; i2 < chunk.lines.length; ++i2) {
          var line = chunk.lines[i2], lh = line.height;
          if (h < lh) {
            break;
          }
          h -= lh;
        }
        return n + i2;
      }
      function isLine(doc2, l) {
        return l >= doc2.first && l < doc2.first + doc2.size;
      }
      function lineNumberFor(options, i2) {
        return String(options.lineNumberFormatter(i2 + options.firstLineNumber));
      }
      function Pos(line, ch, sticky) {
        if (sticky === void 0)
          sticky = null;
        if (!(this instanceof Pos)) {
          return new Pos(line, ch, sticky);
        }
        this.line = line;
        this.ch = ch;
        this.sticky = sticky;
      }
      function cmp(a, b) {
        return a.line - b.line || a.ch - b.ch;
      }
      function equalCursorPos(a, b) {
        return a.sticky == b.sticky && cmp(a, b) == 0;
      }
      function copyPos(x) {
        return Pos(x.line, x.ch);
      }
      function maxPos(a, b) {
        return cmp(a, b) < 0 ? b : a;
      }
      function minPos(a, b) {
        return cmp(a, b) < 0 ? a : b;
      }
      function clipLine(doc2, n) {
        return Math.max(doc2.first, Math.min(n, doc2.first + doc2.size - 1));
      }
      function clipPos(doc2, pos) {
        if (pos.line < doc2.first) {
          return Pos(doc2.first, 0);
        }
        var last = doc2.first + doc2.size - 1;
        if (pos.line > last) {
          return Pos(last, getLine(doc2, last).text.length);
        }
        return clipToLen(pos, getLine(doc2, pos.line).text.length);
      }
      function clipToLen(pos, linelen) {
        var ch = pos.ch;
        if (ch == null || ch > linelen) {
          return Pos(pos.line, linelen);
        } else if (ch < 0) {
          return Pos(pos.line, 0);
        } else {
          return pos;
        }
      }
      function clipPosArray(doc2, array) {
        var out = [];
        for (var i2 = 0; i2 < array.length; i2++) {
          out[i2] = clipPos(doc2, array[i2]);
        }
        return out;
      }
      var SavedContext = function(state, lookAhead) {
        this.state = state;
        this.lookAhead = lookAhead;
      };
      var Context = function(doc2, state, line, lookAhead) {
        this.state = state;
        this.doc = doc2;
        this.line = line;
        this.maxLookAhead = lookAhead || 0;
        this.baseTokens = null;
        this.baseTokenPos = 1;
      };
      Context.prototype.lookAhead = function(n) {
        var line = this.doc.getLine(this.line + n);
        if (line != null && n > this.maxLookAhead) {
          this.maxLookAhead = n;
        }
        return line;
      };
      Context.prototype.baseToken = function(n) {
        if (!this.baseTokens) {
          return null;
        }
        while (this.baseTokens[this.baseTokenPos] <= n) {
          this.baseTokenPos += 2;
        }
        var type = this.baseTokens[this.baseTokenPos + 1];
        return {
          type: type && type.replace(/( |^)overlay .*/, ""),
          size: this.baseTokens[this.baseTokenPos] - n
        };
      };
      Context.prototype.nextLine = function() {
        this.line++;
        if (this.maxLookAhead > 0) {
          this.maxLookAhead--;
        }
      };
      Context.fromSaved = function(doc2, saved, line) {
        if (saved instanceof SavedContext) {
          return new Context(doc2, copyState(doc2.mode, saved.state), line, saved.lookAhead);
        } else {
          return new Context(doc2, copyState(doc2.mode, saved), line);
        }
      };
      Context.prototype.save = function(copy) {
        var state = copy !== false ? copyState(this.doc.mode, this.state) : this.state;
        return this.maxLookAhead > 0 ? new SavedContext(state, this.maxLookAhead) : state;
      };
      function highlightLine(cm, line, context, forceToEnd) {
        var st = [cm.state.modeGen], lineClasses = {};
        runMode(
          cm,
          line.text,
          cm.doc.mode,
          context,
          function(end, style) {
            return st.push(end, style);
          },
          lineClasses,
          forceToEnd
        );
        var state = context.state;
        var loop = function(o2) {
          context.baseTokens = st;
          var overlay = cm.state.overlays[o2], i2 = 1, at = 0;
          context.state = true;
          runMode(cm, line.text, overlay.mode, context, function(end, style) {
            var start = i2;
            while (at < end) {
              var i_end = st[i2];
              if (i_end > end) {
                st.splice(i2, 1, end, st[i2 + 1], i_end);
              }
              i2 += 2;
              at = Math.min(end, i_end);
            }
            if (!style) {
              return;
            }
            if (overlay.opaque) {
              st.splice(start, i2 - start, end, "overlay " + style);
              i2 = start + 2;
            } else {
              for (; start < i2; start += 2) {
                var cur = st[start + 1];
                st[start + 1] = (cur ? cur + " " : "") + "overlay " + style;
              }
            }
          }, lineClasses);
          context.state = state;
          context.baseTokens = null;
          context.baseTokenPos = 1;
        };
        for (var o = 0; o < cm.state.overlays.length; ++o)
          loop(o);
        return { styles: st, classes: lineClasses.bgClass || lineClasses.textClass ? lineClasses : null };
      }
      function getLineStyles(cm, line, updateFrontier) {
        if (!line.styles || line.styles[0] != cm.state.modeGen) {
          var context = getContextBefore(cm, lineNo(line));
          var resetState = line.text.length > cm.options.maxHighlightLength && copyState(cm.doc.mode, context.state);
          var result = highlightLine(cm, line, context);
          if (resetState) {
            context.state = resetState;
          }
          line.stateAfter = context.save(!resetState);
          line.styles = result.styles;
          if (result.classes) {
            line.styleClasses = result.classes;
          } else if (line.styleClasses) {
            line.styleClasses = null;
          }
          if (updateFrontier === cm.doc.highlightFrontier) {
            cm.doc.modeFrontier = Math.max(cm.doc.modeFrontier, ++cm.doc.highlightFrontier);
          }
        }
        return line.styles;
      }
      function getContextBefore(cm, n, precise) {
        var doc2 = cm.doc, display = cm.display;
        if (!doc2.mode.startState) {
          return new Context(doc2, true, n);
        }
        var start = findStartLine(cm, n, precise);
        var saved = start > doc2.first && getLine(doc2, start - 1).stateAfter;
        var context = saved ? Context.fromSaved(doc2, saved, start) : new Context(doc2, startState(doc2.mode), start);
        doc2.iter(start, n, function(line) {
          processLine(cm, line.text, context);
          var pos = context.line;
          line.stateAfter = pos == n - 1 || pos % 5 == 0 || pos >= display.viewFrom && pos < display.viewTo ? context.save() : null;
          context.nextLine();
        });
        if (precise) {
          doc2.modeFrontier = context.line;
        }
        return context;
      }
      function processLine(cm, text, context, startAt) {
        var mode = cm.doc.mode;
        var stream = new StringStream(text, cm.options.tabSize, context);
        stream.start = stream.pos = startAt || 0;
        if (text == "") {
          callBlankLine(mode, context.state);
        }
        while (!stream.eol()) {
          readToken(mode, stream, context.state);
          stream.start = stream.pos;
        }
      }
      function callBlankLine(mode, state) {
        if (mode.blankLine) {
          return mode.blankLine(state);
        }
        if (!mode.innerMode) {
          return;
        }
        var inner = innerMode(mode, state);
        if (inner.mode.blankLine) {
          return inner.mode.blankLine(inner.state);
        }
      }
      function readToken(mode, stream, state, inner) {
        for (var i2 = 0; i2 < 10; i2++) {
          if (inner) {
            inner[0] = innerMode(mode, state).mode;
          }
          var style = mode.token(stream, state);
          if (stream.pos > stream.start) {
            return style;
          }
        }
        throw new Error("Mode " + mode.name + " failed to advance stream.");
      }
      var Token = function(stream, type, state) {
        this.start = stream.start;
        this.end = stream.pos;
        this.string = stream.current();
        this.type = type || null;
        this.state = state;
      };
      function takeToken(cm, pos, precise, asArray) {
        var doc2 = cm.doc, mode = doc2.mode, style;
        pos = clipPos(doc2, pos);
        var line = getLine(doc2, pos.line), context = getContextBefore(cm, pos.line, precise);
        var stream = new StringStream(line.text, cm.options.tabSize, context), tokens;
        if (asArray) {
          tokens = [];
        }
        while ((asArray || stream.pos < pos.ch) && !stream.eol()) {
          stream.start = stream.pos;
          style = readToken(mode, stream, context.state);
          if (asArray) {
            tokens.push(new Token(stream, style, copyState(doc2.mode, context.state)));
          }
        }
        return asArray ? tokens : new Token(stream, style, context.state);
      }
      function extractLineClasses(type, output) {
        if (type) {
          for (; ; ) {
            var lineClass = type.match(/(?:^|\s+)line-(background-)?(\S+)/);
            if (!lineClass) {
              break;
            }
            type = type.slice(0, lineClass.index) + type.slice(lineClass.index + lineClass[0].length);
            var prop2 = lineClass[1] ? "bgClass" : "textClass";
            if (output[prop2] == null) {
              output[prop2] = lineClass[2];
            } else if (!new RegExp("(?:^|\\s)" + lineClass[2] + "(?:$|\\s)").test(output[prop2])) {
              output[prop2] += " " + lineClass[2];
            }
          }
        }
        return type;
      }
      function runMode(cm, text, mode, context, f, lineClasses, forceToEnd) {
        var flattenSpans = mode.flattenSpans;
        if (flattenSpans == null) {
          flattenSpans = cm.options.flattenSpans;
        }
        var curStart = 0, curStyle = null;
        var stream = new StringStream(text, cm.options.tabSize, context), style;
        var inner = cm.options.addModeClass && [null];
        if (text == "") {
          extractLineClasses(callBlankLine(mode, context.state), lineClasses);
        }
        while (!stream.eol()) {
          if (stream.pos > cm.options.maxHighlightLength) {
            flattenSpans = false;
            if (forceToEnd) {
              processLine(cm, text, context, stream.pos);
            }
            stream.pos = text.length;
            style = null;
          } else {
            style = extractLineClasses(readToken(mode, stream, context.state, inner), lineClasses);
          }
          if (inner) {
            var mName = inner[0].name;
            if (mName) {
              style = "m-" + (style ? mName + " " + style : mName);
            }
          }
          if (!flattenSpans || curStyle != style) {
            while (curStart < stream.start) {
              curStart = Math.min(stream.start, curStart + 5e3);
              f(curStart, curStyle);
            }
            curStyle = style;
          }
          stream.start = stream.pos;
        }
        while (curStart < stream.pos) {
          var pos = Math.min(stream.pos, curStart + 5e3);
          f(pos, curStyle);
          curStart = pos;
        }
      }
      function findStartLine(cm, n, precise) {
        var minindent, minline, doc2 = cm.doc;
        var lim = precise ? -1 : n - (cm.doc.mode.innerMode ? 1e3 : 100);
        for (var search = n; search > lim; --search) {
          if (search <= doc2.first) {
            return doc2.first;
          }
          var line = getLine(doc2, search - 1), after = line.stateAfter;
          if (after && (!precise || search + (after instanceof SavedContext ? after.lookAhead : 0) <= doc2.modeFrontier)) {
            return search;
          }
          var indented = countColumn(line.text, null, cm.options.tabSize);
          if (minline == null || minindent > indented) {
            minline = search - 1;
            minindent = indented;
          }
        }
        return minline;
      }
      function retreatFrontier(doc2, n) {
        doc2.modeFrontier = Math.min(doc2.modeFrontier, n);
        if (doc2.highlightFrontier < n - 10) {
          return;
        }
        var start = doc2.first;
        for (var line = n - 1; line > start; line--) {
          var saved = getLine(doc2, line).stateAfter;
          if (saved && (!(saved instanceof SavedContext) || line + saved.lookAhead < n)) {
            start = line + 1;
            break;
          }
        }
        doc2.highlightFrontier = Math.min(doc2.highlightFrontier, start);
      }
      var sawReadOnlySpans = false, sawCollapsedSpans = false;
      function seeReadOnlySpans() {
        sawReadOnlySpans = true;
      }
      function seeCollapsedSpans() {
        sawCollapsedSpans = true;
      }
      function MarkedSpan(marker, from, to) {
        this.marker = marker;
        this.from = from;
        this.to = to;
      }
      function getMarkedSpanFor(spans, marker) {
        if (spans) {
          for (var i2 = 0; i2 < spans.length; ++i2) {
            var span = spans[i2];
            if (span.marker == marker) {
              return span;
            }
          }
        }
      }
      function removeMarkedSpan(spans, span) {
        var r;
        for (var i2 = 0; i2 < spans.length; ++i2) {
          if (spans[i2] != span) {
            (r || (r = [])).push(spans[i2]);
          }
        }
        return r;
      }
      function addMarkedSpan(line, span, op) {
        var inThisOp = op && window.WeakSet && (op.markedSpans || (op.markedSpans = /* @__PURE__ */ new WeakSet()));
        if (inThisOp && line.markedSpans && inThisOp.has(line.markedSpans)) {
          line.markedSpans.push(span);
        } else {
          line.markedSpans = line.markedSpans ? line.markedSpans.concat([span]) : [span];
          if (inThisOp) {
            inThisOp.add(line.markedSpans);
          }
        }
        span.marker.attachLine(line);
      }
      function markedSpansBefore(old, startCh, isInsert) {
        var nw;
        if (old) {
          for (var i2 = 0; i2 < old.length; ++i2) {
            var span = old[i2], marker = span.marker;
            var startsBefore = span.from == null || (marker.inclusiveLeft ? span.from <= startCh : span.from < startCh);
            if (startsBefore || span.from == startCh && marker.type == "bookmark" && (!isInsert || !span.marker.insertLeft)) {
              var endsAfter = span.to == null || (marker.inclusiveRight ? span.to >= startCh : span.to > startCh);
              (nw || (nw = [])).push(new MarkedSpan(marker, span.from, endsAfter ? null : span.to));
            }
          }
        }
        return nw;
      }
      function markedSpansAfter(old, endCh, isInsert) {
        var nw;
        if (old) {
          for (var i2 = 0; i2 < old.length; ++i2) {
            var span = old[i2], marker = span.marker;
            var endsAfter = span.to == null || (marker.inclusiveRight ? span.to >= endCh : span.to > endCh);
            if (endsAfter || span.from == endCh && marker.type == "bookmark" && (!isInsert || span.marker.insertLeft)) {
              var startsBefore = span.from == null || (marker.inclusiveLeft ? span.from <= endCh : span.from < endCh);
              (nw || (nw = [])).push(new MarkedSpan(
                marker,
                startsBefore ? null : span.from - endCh,
                span.to == null ? null : span.to - endCh
              ));
            }
          }
        }
        return nw;
      }
      function stretchSpansOverChange(doc2, change) {
        if (change.full) {
          return null;
        }
        var oldFirst = isLine(doc2, change.from.line) && getLine(doc2, change.from.line).markedSpans;
        var oldLast = isLine(doc2, change.to.line) && getLine(doc2, change.to.line).markedSpans;
        if (!oldFirst && !oldLast) {
          return null;
        }
        var startCh = change.from.ch, endCh = change.to.ch, isInsert = cmp(change.from, change.to) == 0;
        var first = markedSpansBefore(oldFirst, startCh, isInsert);
        var last = markedSpansAfter(oldLast, endCh, isInsert);
        var sameLine = change.text.length == 1, offset = lst(change.text).length + (sameLine ? startCh : 0);
        if (first) {
          for (var i2 = 0; i2 < first.length; ++i2) {
            var span = first[i2];
            if (span.to == null) {
              var found = getMarkedSpanFor(last, span.marker);
              if (!found) {
                span.to = startCh;
              } else if (sameLine) {
                span.to = found.to == null ? null : found.to + offset;
              }
            }
          }
        }
        if (last) {
          for (var i$12 = 0; i$12 < last.length; ++i$12) {
            var span$1 = last[i$12];
            if (span$1.to != null) {
              span$1.to += offset;
            }
            if (span$1.from == null) {
              var found$1 = getMarkedSpanFor(first, span$1.marker);
              if (!found$1) {
                span$1.from = offset;
                if (sameLine) {
                  (first || (first = [])).push(span$1);
                }
              }
            } else {
              span$1.from += offset;
              if (sameLine) {
                (first || (first = [])).push(span$1);
              }
            }
          }
        }
        if (first) {
          first = clearEmptySpans(first);
        }
        if (last && last != first) {
          last = clearEmptySpans(last);
        }
        var newMarkers = [first];
        if (!sameLine) {
          var gap = change.text.length - 2, gapMarkers;
          if (gap > 0 && first) {
            for (var i$22 = 0; i$22 < first.length; ++i$22) {
              if (first[i$22].to == null) {
                (gapMarkers || (gapMarkers = [])).push(new MarkedSpan(first[i$22].marker, null, null));
              }
            }
          }
          for (var i$3 = 0; i$3 < gap; ++i$3) {
            newMarkers.push(gapMarkers);
          }
          newMarkers.push(last);
        }
        return newMarkers;
      }
      function clearEmptySpans(spans) {
        for (var i2 = 0; i2 < spans.length; ++i2) {
          var span = spans[i2];
          if (span.from != null && span.from == span.to && span.marker.clearWhenEmpty !== false) {
            spans.splice(i2--, 1);
          }
        }
        if (!spans.length) {
          return null;
        }
        return spans;
      }
      function removeReadOnlyRanges(doc2, from, to) {
        var markers = null;
        doc2.iter(from.line, to.line + 1, function(line) {
          if (line.markedSpans) {
            for (var i3 = 0; i3 < line.markedSpans.length; ++i3) {
              var mark = line.markedSpans[i3].marker;
              if (mark.readOnly && (!markers || indexOf(markers, mark) == -1)) {
                (markers || (markers = [])).push(mark);
              }
            }
          }
        });
        if (!markers) {
          return null;
        }
        var parts = [{ from, to }];
        for (var i2 = 0; i2 < markers.length; ++i2) {
          var mk = markers[i2], m = mk.find(0);
          for (var j = 0; j < parts.length; ++j) {
            var p = parts[j];
            if (cmp(p.to, m.from) < 0 || cmp(p.from, m.to) > 0) {
              continue;
            }
            var newParts = [j, 1], dfrom = cmp(p.from, m.from), dto = cmp(p.to, m.to);
            if (dfrom < 0 || !mk.inclusiveLeft && !dfrom) {
              newParts.push({ from: p.from, to: m.from });
            }
            if (dto > 0 || !mk.inclusiveRight && !dto) {
              newParts.push({ from: m.to, to: p.to });
            }
            parts.splice.apply(parts, newParts);
            j += newParts.length - 3;
          }
        }
        return parts;
      }
      function detachMarkedSpans(line) {
        var spans = line.markedSpans;
        if (!spans) {
          return;
        }
        for (var i2 = 0; i2 < spans.length; ++i2) {
          spans[i2].marker.detachLine(line);
        }
        line.markedSpans = null;
      }
      function attachMarkedSpans(line, spans) {
        if (!spans) {
          return;
        }
        for (var i2 = 0; i2 < spans.length; ++i2) {
          spans[i2].marker.attachLine(line);
        }
        line.markedSpans = spans;
      }
      function extraLeft(marker) {
        return marker.inclusiveLeft ? -1 : 0;
      }
      function extraRight(marker) {
        return marker.inclusiveRight ? 1 : 0;
      }
      function compareCollapsedMarkers(a, b) {
        var lenDiff = a.lines.length - b.lines.length;
        if (lenDiff != 0) {
          return lenDiff;
        }
        var aPos = a.find(), bPos = b.find();
        var fromCmp = cmp(aPos.from, bPos.from) || extraLeft(a) - extraLeft(b);
        if (fromCmp) {
          return -fromCmp;
        }
        var toCmp = cmp(aPos.to, bPos.to) || extraRight(a) - extraRight(b);
        if (toCmp) {
          return toCmp;
        }
        return b.id - a.id;
      }
      function collapsedSpanAtSide(line, start) {
        var sps = sawCollapsedSpans && line.markedSpans, found;
        if (sps) {
          for (var sp = void 0, i2 = 0; i2 < sps.length; ++i2) {
            sp = sps[i2];
            if (sp.marker.collapsed && (start ? sp.from : sp.to) == null && (!found || compareCollapsedMarkers(found, sp.marker) < 0)) {
              found = sp.marker;
            }
          }
        }
        return found;
      }
      function collapsedSpanAtStart(line) {
        return collapsedSpanAtSide(line, true);
      }
      function collapsedSpanAtEnd(line) {
        return collapsedSpanAtSide(line, false);
      }
      function collapsedSpanAround(line, ch) {
        var sps = sawCollapsedSpans && line.markedSpans, found;
        if (sps) {
          for (var i2 = 0; i2 < sps.length; ++i2) {
            var sp = sps[i2];
            if (sp.marker.collapsed && (sp.from == null || sp.from < ch) && (sp.to == null || sp.to > ch) && (!found || compareCollapsedMarkers(found, sp.marker) < 0)) {
              found = sp.marker;
            }
          }
        }
        return found;
      }
      function conflictingCollapsedRange(doc2, lineNo2, from, to, marker) {
        var line = getLine(doc2, lineNo2);
        var sps = sawCollapsedSpans && line.markedSpans;
        if (sps) {
          for (var i2 = 0; i2 < sps.length; ++i2) {
            var sp = sps[i2];
            if (!sp.marker.collapsed) {
              continue;
            }
            var found = sp.marker.find(0);
            var fromCmp = cmp(found.from, from) || extraLeft(sp.marker) - extraLeft(marker);
            var toCmp = cmp(found.to, to) || extraRight(sp.marker) - extraRight(marker);
            if (fromCmp >= 0 && toCmp <= 0 || fromCmp <= 0 && toCmp >= 0) {
              continue;
            }
            if (fromCmp <= 0 && (sp.marker.inclusiveRight && marker.inclusiveLeft ? cmp(found.to, from) >= 0 : cmp(found.to, from) > 0) || fromCmp >= 0 && (sp.marker.inclusiveRight && marker.inclusiveLeft ? cmp(found.from, to) <= 0 : cmp(found.from, to) < 0)) {
              return true;
            }
          }
        }
      }
      function visualLine(line) {
        var merged;
        while (merged = collapsedSpanAtStart(line)) {
          line = merged.find(-1, true).line;
        }
        return line;
      }
      function visualLineEnd(line) {
        var merged;
        while (merged = collapsedSpanAtEnd(line)) {
          line = merged.find(1, true).line;
        }
        return line;
      }
      function visualLineContinued(line) {
        var merged, lines;
        while (merged = collapsedSpanAtEnd(line)) {
          line = merged.find(1, true).line;
          (lines || (lines = [])).push(line);
        }
        return lines;
      }
      function visualLineNo(doc2, lineN) {
        var line = getLine(doc2, lineN), vis = visualLine(line);
        if (line == vis) {
          return lineN;
        }
        return lineNo(vis);
      }
      function visualLineEndNo(doc2, lineN) {
        if (lineN > doc2.lastLine()) {
          return lineN;
        }
        var line = getLine(doc2, lineN), merged;
        if (!lineIsHidden(doc2, line)) {
          return lineN;
        }
        while (merged = collapsedSpanAtEnd(line)) {
          line = merged.find(1, true).line;
        }
        return lineNo(line) + 1;
      }
      function lineIsHidden(doc2, line) {
        var sps = sawCollapsedSpans && line.markedSpans;
        if (sps) {
          for (var sp = void 0, i2 = 0; i2 < sps.length; ++i2) {
            sp = sps[i2];
            if (!sp.marker.collapsed) {
              continue;
            }
            if (sp.from == null) {
              return true;
            }
            if (sp.marker.widgetNode) {
              continue;
            }
            if (sp.from == 0 && sp.marker.inclusiveLeft && lineIsHiddenInner(doc2, line, sp)) {
              return true;
            }
          }
        }
      }
      function lineIsHiddenInner(doc2, line, span) {
        if (span.to == null) {
          var end = span.marker.find(1, true);
          return lineIsHiddenInner(doc2, end.line, getMarkedSpanFor(end.line.markedSpans, span.marker));
        }
        if (span.marker.inclusiveRight && span.to == line.text.length) {
          return true;
        }
        for (var sp = void 0, i2 = 0; i2 < line.markedSpans.length; ++i2) {
          sp = line.markedSpans[i2];
          if (sp.marker.collapsed && !sp.marker.widgetNode && sp.from == span.to && (sp.to == null || sp.to != span.from) && (sp.marker.inclusiveLeft || span.marker.inclusiveRight) && lineIsHiddenInner(doc2, line, sp)) {
            return true;
          }
        }
      }
      function heightAtLine(lineObj) {
        lineObj = visualLine(lineObj);
        var h = 0, chunk = lineObj.parent;
        for (var i2 = 0; i2 < chunk.lines.length; ++i2) {
          var line = chunk.lines[i2];
          if (line == lineObj) {
            break;
          } else {
            h += line.height;
          }
        }
        for (var p = chunk.parent; p; chunk = p, p = chunk.parent) {
          for (var i$12 = 0; i$12 < p.children.length; ++i$12) {
            var cur = p.children[i$12];
            if (cur == chunk) {
              break;
            } else {
              h += cur.height;
            }
          }
        }
        return h;
      }
      function lineLength(line) {
        if (line.height == 0) {
          return 0;
        }
        var len = line.text.length, merged, cur = line;
        while (merged = collapsedSpanAtStart(cur)) {
          var found = merged.find(0, true);
          cur = found.from.line;
          len += found.from.ch - found.to.ch;
        }
        cur = line;
        while (merged = collapsedSpanAtEnd(cur)) {
          var found$1 = merged.find(0, true);
          len -= cur.text.length - found$1.from.ch;
          cur = found$1.to.line;
          len += cur.text.length - found$1.to.ch;
        }
        return len;
      }
      function findMaxLine(cm) {
        var d = cm.display, doc2 = cm.doc;
        d.maxLine = getLine(doc2, doc2.first);
        d.maxLineLength = lineLength(d.maxLine);
        d.maxLineChanged = true;
        doc2.iter(function(line) {
          var len = lineLength(line);
          if (len > d.maxLineLength) {
            d.maxLineLength = len;
            d.maxLine = line;
          }
        });
      }
      var Line = function(text, markedSpans, estimateHeight2) {
        this.text = text;
        attachMarkedSpans(this, markedSpans);
        this.height = estimateHeight2 ? estimateHeight2(this) : 1;
      };
      Line.prototype.lineNo = function() {
        return lineNo(this);
      };
      eventMixin(Line);
      function updateLine(line, text, markedSpans, estimateHeight2) {
        line.text = text;
        if (line.stateAfter) {
          line.stateAfter = null;
        }
        if (line.styles) {
          line.styles = null;
        }
        if (line.order != null) {
          line.order = null;
        }
        detachMarkedSpans(line);
        attachMarkedSpans(line, markedSpans);
        var estHeight = estimateHeight2 ? estimateHeight2(line) : 1;
        if (estHeight != line.height) {
          updateLineHeight(line, estHeight);
        }
      }
      function cleanUpLine(line) {
        line.parent = null;
        detachMarkedSpans(line);
      }
      var styleToClassCache = {}, styleToClassCacheWithMode = {};
      function interpretTokenStyle(style, options) {
        if (!style || /^\s*$/.test(style)) {
          return null;
        }
        var cache = options.addModeClass ? styleToClassCacheWithMode : styleToClassCache;
        return cache[style] || (cache[style] = style.replace(/\S+/g, "cm-$&"));
      }
      function buildLineContent(cm, lineView) {
        var content = eltP("span", null, null, webkit ? "padding-right: .1px" : null);
        var builder = {
          pre: eltP("pre", [content], "CodeMirror-line"),
          content,
          col: 0,
          pos: 0,
          cm,
          trailingSpace: false,
          splitSpaces: cm.getOption("lineWrapping")
        };
        lineView.measure = {};
        for (var i2 = 0; i2 <= (lineView.rest ? lineView.rest.length : 0); i2++) {
          var line = i2 ? lineView.rest[i2 - 1] : lineView.line, order = void 0;
          builder.pos = 0;
          builder.addToken = buildToken;
          if (hasBadBidiRects(cm.display.measure) && (order = getOrder(line, cm.doc.direction))) {
            builder.addToken = buildTokenBadBidi(builder.addToken, order);
          }
          builder.map = [];
          var allowFrontierUpdate = lineView != cm.display.externalMeasured && lineNo(line);
          insertLineContent(line, builder, getLineStyles(cm, line, allowFrontierUpdate));
          if (line.styleClasses) {
            if (line.styleClasses.bgClass) {
              builder.bgClass = joinClasses(line.styleClasses.bgClass, builder.bgClass || "");
            }
            if (line.styleClasses.textClass) {
              builder.textClass = joinClasses(line.styleClasses.textClass, builder.textClass || "");
            }
          }
          if (builder.map.length == 0) {
            builder.map.push(0, 0, builder.content.appendChild(zeroWidthElement(cm.display.measure)));
          }
          if (i2 == 0) {
            lineView.measure.map = builder.map;
            lineView.measure.cache = {};
          } else {
            (lineView.measure.maps || (lineView.measure.maps = [])).push(builder.map);
            (lineView.measure.caches || (lineView.measure.caches = [])).push({});
          }
        }
        if (webkit) {
          var last = builder.content.lastChild;
          if (/\bcm-tab\b/.test(last.className) || last.querySelector && last.querySelector(".cm-tab")) {
            builder.content.className = "cm-tab-wrap-hack";
          }
        }
        signal(cm, "renderLine", cm, lineView.line, builder.pre);
        if (builder.pre.className) {
          builder.textClass = joinClasses(builder.pre.className, builder.textClass || "");
        }
        return builder;
      }
      function defaultSpecialCharPlaceholder(ch) {
        var token = elt("span", "\u2022", "cm-invalidchar");
        token.title = "\\u" + ch.charCodeAt(0).toString(16);
        token.setAttribute("aria-label", token.title);
        return token;
      }
      function buildToken(builder, text, style, startStyle, endStyle, css, attributes) {
        if (!text) {
          return;
        }
        var displayText = builder.splitSpaces ? splitSpaces(text, builder.trailingSpace) : text;
        var special = builder.cm.state.specialChars, mustWrap = false;
        var content;
        if (!special.test(text)) {
          builder.col += text.length;
          content = document.createTextNode(displayText);
          builder.map.push(builder.pos, builder.pos + text.length, content);
          if (ie && ie_version < 9) {
            mustWrap = true;
          }
          builder.pos += text.length;
        } else {
          content = document.createDocumentFragment();
          var pos = 0;
          while (true) {
            special.lastIndex = pos;
            var m = special.exec(text);
            var skipped = m ? m.index - pos : text.length - pos;
            if (skipped) {
              var txt = document.createTextNode(displayText.slice(pos, pos + skipped));
              if (ie && ie_version < 9) {
                content.appendChild(elt("span", [txt]));
              } else {
                content.appendChild(txt);
              }
              builder.map.push(builder.pos, builder.pos + skipped, txt);
              builder.col += skipped;
              builder.pos += skipped;
            }
            if (!m) {
              break;
            }
            pos += skipped + 1;
            var txt$1 = void 0;
            if (m[0] == "	") {
              var tabSize = builder.cm.options.tabSize, tabWidth = tabSize - builder.col % tabSize;
              txt$1 = content.appendChild(elt("span", spaceStr(tabWidth), "cm-tab"));
              txt$1.setAttribute("role", "presentation");
              txt$1.setAttribute("cm-text", "	");
              builder.col += tabWidth;
            } else if (m[0] == "\r" || m[0] == "\n") {
              txt$1 = content.appendChild(elt("span", m[0] == "\r" ? "\u240D" : "\u2424", "cm-invalidchar"));
              txt$1.setAttribute("cm-text", m[0]);
              builder.col += 1;
            } else {
              txt$1 = builder.cm.options.specialCharPlaceholder(m[0]);
              txt$1.setAttribute("cm-text", m[0]);
              if (ie && ie_version < 9) {
                content.appendChild(elt("span", [txt$1]));
              } else {
                content.appendChild(txt$1);
              }
              builder.col += 1;
            }
            builder.map.push(builder.pos, builder.pos + 1, txt$1);
            builder.pos++;
          }
        }
        builder.trailingSpace = displayText.charCodeAt(text.length - 1) == 32;
        if (style || startStyle || endStyle || mustWrap || css || attributes) {
          var fullStyle = style || "";
          if (startStyle) {
            fullStyle += startStyle;
          }
          if (endStyle) {
            fullStyle += endStyle;
          }
          var token = elt("span", [content], fullStyle, css);
          if (attributes) {
            for (var attr in attributes) {
              if (attributes.hasOwnProperty(attr) && attr != "style" && attr != "class") {
                token.setAttribute(attr, attributes[attr]);
              }
            }
          }
          return builder.content.appendChild(token);
        }
        builder.content.appendChild(content);
      }
      function splitSpaces(text, trailingBefore) {
        if (text.length > 1 && !/  /.test(text)) {
          return text;
        }
        var spaceBefore = trailingBefore, result = "";
        for (var i2 = 0; i2 < text.length; i2++) {
          var ch = text.charAt(i2);
          if (ch == " " && spaceBefore && (i2 == text.length - 1 || text.charCodeAt(i2 + 1) == 32)) {
            ch = "\xA0";
          }
          result += ch;
          spaceBefore = ch == " ";
        }
        return result;
      }
      function buildTokenBadBidi(inner, order) {
        return function(builder, text, style, startStyle, endStyle, css, attributes) {
          style = style ? style + " cm-force-border" : "cm-force-border";
          var start = builder.pos, end = start + text.length;
          for (; ; ) {
            var part = void 0;
            for (var i2 = 0; i2 < order.length; i2++) {
              part = order[i2];
              if (part.to > start && part.from <= start) {
                break;
              }
            }
            if (part.to >= end) {
              return inner(builder, text, style, startStyle, endStyle, css, attributes);
            }
            inner(builder, text.slice(0, part.to - start), style, startStyle, null, css, attributes);
            startStyle = null;
            text = text.slice(part.to - start);
            start = part.to;
          }
        };
      }
      function buildCollapsedSpan(builder, size, marker, ignoreWidget) {
        var widget = !ignoreWidget && marker.widgetNode;
        if (widget) {
          builder.map.push(builder.pos, builder.pos + size, widget);
        }
        if (!ignoreWidget && builder.cm.display.input.needsContentAttribute) {
          if (!widget) {
            widget = builder.content.appendChild(document.createElement("span"));
          }
          widget.setAttribute("cm-marker", marker.id);
        }
        if (widget) {
          builder.cm.display.input.setUneditable(widget);
          builder.content.appendChild(widget);
        }
        builder.pos += size;
        builder.trailingSpace = false;
      }
      function insertLineContent(line, builder, styles) {
        var spans = line.markedSpans, allText = line.text, at = 0;
        if (!spans) {
          for (var i$12 = 1; i$12 < styles.length; i$12 += 2) {
            builder.addToken(builder, allText.slice(at, at = styles[i$12]), interpretTokenStyle(styles[i$12 + 1], builder.cm.options));
          }
          return;
        }
        var len = allText.length, pos = 0, i2 = 1, text = "", style, css;
        var nextChange = 0, spanStyle, spanEndStyle, spanStartStyle, collapsed, attributes;
        for (; ; ) {
          if (nextChange == pos) {
            spanStyle = spanEndStyle = spanStartStyle = css = "";
            attributes = null;
            collapsed = null;
            nextChange = Infinity;
            var foundBookmarks = [], endStyles = void 0;
            for (var j = 0; j < spans.length; ++j) {
              var sp = spans[j], m = sp.marker;
              if (m.type == "bookmark" && sp.from == pos && m.widgetNode) {
                foundBookmarks.push(m);
              } else if (sp.from <= pos && (sp.to == null || sp.to > pos || m.collapsed && sp.to == pos && sp.from == pos)) {
                if (sp.to != null && sp.to != pos && nextChange > sp.to) {
                  nextChange = sp.to;
                  spanEndStyle = "";
                }
                if (m.className) {
                  spanStyle += " " + m.className;
                }
                if (m.css) {
                  css = (css ? css + ";" : "") + m.css;
                }
                if (m.startStyle && sp.from == pos) {
                  spanStartStyle += " " + m.startStyle;
                }
                if (m.endStyle && sp.to == nextChange) {
                  (endStyles || (endStyles = [])).push(m.endStyle, sp.to);
                }
                if (m.title) {
                  (attributes || (attributes = {})).title = m.title;
                }
                if (m.attributes) {
                  for (var attr in m.attributes) {
                    (attributes || (attributes = {}))[attr] = m.attributes[attr];
                  }
                }
                if (m.collapsed && (!collapsed || compareCollapsedMarkers(collapsed.marker, m) < 0)) {
                  collapsed = sp;
                }
              } else if (sp.from > pos && nextChange > sp.from) {
                nextChange = sp.from;
              }
            }
            if (endStyles) {
              for (var j$1 = 0; j$1 < endStyles.length; j$1 += 2) {
                if (endStyles[j$1 + 1] == nextChange) {
                  spanEndStyle += " " + endStyles[j$1];
                }
              }
            }
            if (!collapsed || collapsed.from == pos) {
              for (var j$2 = 0; j$2 < foundBookmarks.length; ++j$2) {
                buildCollapsedSpan(builder, 0, foundBookmarks[j$2]);
              }
            }
            if (collapsed && (collapsed.from || 0) == pos) {
              buildCollapsedSpan(
                builder,
                (collapsed.to == null ? len + 1 : collapsed.to) - pos,
                collapsed.marker,
                collapsed.from == null
              );
              if (collapsed.to == null) {
                return;
              }
              if (collapsed.to == pos) {
                collapsed = false;
              }
            }
          }
          if (pos >= len) {
            break;
          }
          var upto = Math.min(len, nextChange);
          while (true) {
            if (text) {
              var end = pos + text.length;
              if (!collapsed) {
                var tokenText = end > upto ? text.slice(0, upto - pos) : text;
                builder.addToken(
                  builder,
                  tokenText,
                  style ? style + spanStyle : spanStyle,
                  spanStartStyle,
                  pos + tokenText.length == nextChange ? spanEndStyle : "",
                  css,
                  attributes
                );
              }
              if (end >= upto) {
                text = text.slice(upto - pos);
                pos = upto;
                break;
              }
              pos = end;
              spanStartStyle = "";
            }
            text = allText.slice(at, at = styles[i2++]);
            style = interpretTokenStyle(styles[i2++], builder.cm.options);
          }
        }
      }
      function LineView(doc2, line, lineN) {
        this.line = line;
        this.rest = visualLineContinued(line);
        this.size = this.rest ? lineNo(lst(this.rest)) - lineN + 1 : 1;
        this.node = this.text = null;
        this.hidden = lineIsHidden(doc2, line);
      }
      function buildViewArray(cm, from, to) {
        var array = [], nextPos;
        for (var pos = from; pos < to; pos = nextPos) {
          var view = new LineView(cm.doc, getLine(cm.doc, pos), pos);
          nextPos = pos + view.size;
          array.push(view);
        }
        return array;
      }
      var operationGroup = null;
      function pushOperation(op) {
        if (operationGroup) {
          operationGroup.ops.push(op);
        } else {
          op.ownsGroup = operationGroup = {
            ops: [op],
            delayedCallbacks: []
          };
        }
      }
      function fireCallbacksForOps(group) {
        var callbacks = group.delayedCallbacks, i2 = 0;
        do {
          for (; i2 < callbacks.length; i2++) {
            callbacks[i2].call(null);
          }
          for (var j = 0; j < group.ops.length; j++) {
            var op = group.ops[j];
            if (op.cursorActivityHandlers) {
              while (op.cursorActivityCalled < op.cursorActivityHandlers.length) {
                op.cursorActivityHandlers[op.cursorActivityCalled++].call(null, op.cm);
              }
            }
          }
        } while (i2 < callbacks.length);
      }
      function finishOperation(op, endCb) {
        var group = op.ownsGroup;
        if (!group) {
          return;
        }
        try {
          fireCallbacksForOps(group);
        } finally {
          operationGroup = null;
          endCb(group);
        }
      }
      var orphanDelayedCallbacks = null;
      function signalLater(emitter, type) {
        var arr = getHandlers(emitter, type);
        if (!arr.length) {
          return;
        }
        var args = Array.prototype.slice.call(arguments, 2), list;
        if (operationGroup) {
          list = operationGroup.delayedCallbacks;
        } else if (orphanDelayedCallbacks) {
          list = orphanDelayedCallbacks;
        } else {
          list = orphanDelayedCallbacks = [];
          setTimeout(fireOrphanDelayed, 0);
        }
        var loop = function(i3) {
          list.push(function() {
            return arr[i3].apply(null, args);
          });
        };
        for (var i2 = 0; i2 < arr.length; ++i2)
          loop(i2);
      }
      function fireOrphanDelayed() {
        var delayed = orphanDelayedCallbacks;
        orphanDelayedCallbacks = null;
        for (var i2 = 0; i2 < delayed.length; ++i2) {
          delayed[i2]();
        }
      }
      function updateLineForChanges(cm, lineView, lineN, dims) {
        for (var j = 0; j < lineView.changes.length; j++) {
          var type = lineView.changes[j];
          if (type == "text") {
            updateLineText(cm, lineView);
          } else if (type == "gutter") {
            updateLineGutter(cm, lineView, lineN, dims);
          } else if (type == "class") {
            updateLineClasses(cm, lineView);
          } else if (type == "widget") {
            updateLineWidgets(cm, lineView, dims);
          }
        }
        lineView.changes = null;
      }
      function ensureLineWrapped(lineView) {
        if (lineView.node == lineView.text) {
          lineView.node = elt("div", null, null, "position: relative");
          if (lineView.text.parentNode) {
            lineView.text.parentNode.replaceChild(lineView.node, lineView.text);
          }
          lineView.node.appendChild(lineView.text);
          if (ie && ie_version < 8) {
            lineView.node.style.zIndex = 2;
          }
        }
        return lineView.node;
      }
      function updateLineBackground(cm, lineView) {
        var cls = lineView.bgClass ? lineView.bgClass + " " + (lineView.line.bgClass || "") : lineView.line.bgClass;
        if (cls) {
          cls += " CodeMirror-linebackground";
        }
        if (lineView.background) {
          if (cls) {
            lineView.background.className = cls;
          } else {
            lineView.background.parentNode.removeChild(lineView.background);
            lineView.background = null;
          }
        } else if (cls) {
          var wrap = ensureLineWrapped(lineView);
          lineView.background = wrap.insertBefore(elt("div", null, cls), wrap.firstChild);
          cm.display.input.setUneditable(lineView.background);
        }
      }
      function getLineContent(cm, lineView) {
        var ext = cm.display.externalMeasured;
        if (ext && ext.line == lineView.line) {
          cm.display.externalMeasured = null;
          lineView.measure = ext.measure;
          return ext.built;
        }
        return buildLineContent(cm, lineView);
      }
      function updateLineText(cm, lineView) {
        var cls = lineView.text.className;
        var built = getLineContent(cm, lineView);
        if (lineView.text == lineView.node) {
          lineView.node = built.pre;
        }
        lineView.text.parentNode.replaceChild(built.pre, lineView.text);
        lineView.text = built.pre;
        if (built.bgClass != lineView.bgClass || built.textClass != lineView.textClass) {
          lineView.bgClass = built.bgClass;
          lineView.textClass = built.textClass;
          updateLineClasses(cm, lineView);
        } else if (cls) {
          lineView.text.className = cls;
        }
      }
      function updateLineClasses(cm, lineView) {
        updateLineBackground(cm, lineView);
        if (lineView.line.wrapClass) {
          ensureLineWrapped(lineView).className = lineView.line.wrapClass;
        } else if (lineView.node != lineView.text) {
          lineView.node.className = "";
        }
        var textClass = lineView.textClass ? lineView.textClass + " " + (lineView.line.textClass || "") : lineView.line.textClass;
        lineView.text.className = textClass || "";
      }
      function updateLineGutter(cm, lineView, lineN, dims) {
        if (lineView.gutter) {
          lineView.node.removeChild(lineView.gutter);
          lineView.gutter = null;
        }
        if (lineView.gutterBackground) {
          lineView.node.removeChild(lineView.gutterBackground);
          lineView.gutterBackground = null;
        }
        if (lineView.line.gutterClass) {
          var wrap = ensureLineWrapped(lineView);
          lineView.gutterBackground = elt(
            "div",
            null,
            "CodeMirror-gutter-background " + lineView.line.gutterClass,
            "left: " + (cm.options.fixedGutter ? dims.fixedPos : -dims.gutterTotalWidth) + "px; width: " + dims.gutterTotalWidth + "px"
          );
          cm.display.input.setUneditable(lineView.gutterBackground);
          wrap.insertBefore(lineView.gutterBackground, lineView.text);
        }
        var markers = lineView.line.gutterMarkers;
        if (cm.options.lineNumbers || markers) {
          var wrap$1 = ensureLineWrapped(lineView);
          var gutterWrap = lineView.gutter = elt("div", null, "CodeMirror-gutter-wrapper", "left: " + (cm.options.fixedGutter ? dims.fixedPos : -dims.gutterTotalWidth) + "px");
          gutterWrap.setAttribute("aria-hidden", "true");
          cm.display.input.setUneditable(gutterWrap);
          wrap$1.insertBefore(gutterWrap, lineView.text);
          if (lineView.line.gutterClass) {
            gutterWrap.className += " " + lineView.line.gutterClass;
          }
          if (cm.options.lineNumbers && (!markers || !markers["CodeMirror-linenumbers"])) {
            lineView.lineNumber = gutterWrap.appendChild(
              elt(
                "div",
                lineNumberFor(cm.options, lineN),
                "CodeMirror-linenumber CodeMirror-gutter-elt",
                "left: " + dims.gutterLeft["CodeMirror-linenumbers"] + "px; width: " + cm.display.lineNumInnerWidth + "px"
              )
            );
          }
          if (markers) {
            for (var k = 0; k < cm.display.gutterSpecs.length; ++k) {
              var id = cm.display.gutterSpecs[k].className, found = markers.hasOwnProperty(id) && markers[id];
              if (found) {
                gutterWrap.appendChild(elt(
                  "div",
                  [found],
                  "CodeMirror-gutter-elt",
                  "left: " + dims.gutterLeft[id] + "px; width: " + dims.gutterWidth[id] + "px"
                ));
              }
            }
          }
        }
      }
      function updateLineWidgets(cm, lineView, dims) {
        if (lineView.alignable) {
          lineView.alignable = null;
        }
        var isWidget = classTest("CodeMirror-linewidget");
        for (var node = lineView.node.firstChild, next = void 0; node; node = next) {
          next = node.nextSibling;
          if (isWidget.test(node.className)) {
            lineView.node.removeChild(node);
          }
        }
        insertLineWidgets(cm, lineView, dims);
      }
      function buildLineElement(cm, lineView, lineN, dims) {
        var built = getLineContent(cm, lineView);
        lineView.text = lineView.node = built.pre;
        if (built.bgClass) {
          lineView.bgClass = built.bgClass;
        }
        if (built.textClass) {
          lineView.textClass = built.textClass;
        }
        updateLineClasses(cm, lineView);
        updateLineGutter(cm, lineView, lineN, dims);
        insertLineWidgets(cm, lineView, dims);
        return lineView.node;
      }
      function insertLineWidgets(cm, lineView, dims) {
        insertLineWidgetsFor(cm, lineView.line, lineView, dims, true);
        if (lineView.rest) {
          for (var i2 = 0; i2 < lineView.rest.length; i2++) {
            insertLineWidgetsFor(cm, lineView.rest[i2], lineView, dims, false);
          }
        }
      }
      function insertLineWidgetsFor(cm, line, lineView, dims, allowAbove) {
        if (!line.widgets) {
          return;
        }
        var wrap = ensureLineWrapped(lineView);
        for (var i2 = 0, ws = line.widgets; i2 < ws.length; ++i2) {
          var widget = ws[i2], node = elt("div", [widget.node], "CodeMirror-linewidget" + (widget.className ? " " + widget.className : ""));
          if (!widget.handleMouseEvents) {
            node.setAttribute("cm-ignore-events", "true");
          }
          positionLineWidget(widget, node, lineView, dims);
          cm.display.input.setUneditable(node);
          if (allowAbove && widget.above) {
            wrap.insertBefore(node, lineView.gutter || lineView.text);
          } else {
            wrap.appendChild(node);
          }
          signalLater(widget, "redraw");
        }
      }
      function positionLineWidget(widget, node, lineView, dims) {
        if (widget.noHScroll) {
          (lineView.alignable || (lineView.alignable = [])).push(node);
          var width = dims.wrapperWidth;
          node.style.left = dims.fixedPos + "px";
          if (!widget.coverGutter) {
            width -= dims.gutterTotalWidth;
            node.style.paddingLeft = dims.gutterTotalWidth + "px";
          }
          node.style.width = width + "px";
        }
        if (widget.coverGutter) {
          node.style.zIndex = 5;
          node.style.position = "relative";
          if (!widget.noHScroll) {
            node.style.marginLeft = -dims.gutterTotalWidth + "px";
          }
        }
      }
      function widgetHeight(widget) {
        if (widget.height != null) {
          return widget.height;
        }
        var cm = widget.doc.cm;
        if (!cm) {
          return 0;
        }
        if (!contains(document.body, widget.node)) {
          var parentStyle = "position: relative;";
          if (widget.coverGutter) {
            parentStyle += "margin-left: -" + cm.display.gutters.offsetWidth + "px;";
          }
          if (widget.noHScroll) {
            parentStyle += "width: " + cm.display.wrapper.clientWidth + "px;";
          }
          removeChildrenAndAdd(cm.display.measure, elt("div", [widget.node], null, parentStyle));
        }
        return widget.height = widget.node.parentNode.offsetHeight;
      }
      function eventInWidget(display, e) {
        for (var n = e_target(e); n != display.wrapper; n = n.parentNode) {
          if (!n || n.nodeType == 1 && n.getAttribute("cm-ignore-events") == "true" || n.parentNode == display.sizer && n != display.mover) {
            return true;
          }
        }
      }
      function paddingTop(display) {
        return display.lineSpace.offsetTop;
      }
      function paddingVert(display) {
        return display.mover.offsetHeight - display.lineSpace.offsetHeight;
      }
      function paddingH(display) {
        if (display.cachedPaddingH) {
          return display.cachedPaddingH;
        }
        var e = removeChildrenAndAdd(display.measure, elt("pre", "x", "CodeMirror-line-like"));
        var style = window.getComputedStyle ? window.getComputedStyle(e) : e.currentStyle;
        var data = { left: parseInt(style.paddingLeft), right: parseInt(style.paddingRight) };
        if (!isNaN(data.left) && !isNaN(data.right)) {
          display.cachedPaddingH = data;
        }
        return data;
      }
      function scrollGap(cm) {
        return scrollerGap - cm.display.nativeBarWidth;
      }
      function displayWidth(cm) {
        return cm.display.scroller.clientWidth - scrollGap(cm) - cm.display.barWidth;
      }
      function displayHeight(cm) {
        return cm.display.scroller.clientHeight - scrollGap(cm) - cm.display.barHeight;
      }
      function ensureLineHeights(cm, lineView, rect) {
        var wrapping = cm.options.lineWrapping;
        var curWidth = wrapping && displayWidth(cm);
        if (!lineView.measure.heights || wrapping && lineView.measure.width != curWidth) {
          var heights = lineView.measure.heights = [];
          if (wrapping) {
            lineView.measure.width = curWidth;
            var rects = lineView.text.firstChild.getClientRects();
            for (var i2 = 0; i2 < rects.length - 1; i2++) {
              var cur = rects[i2], next = rects[i2 + 1];
              if (Math.abs(cur.bottom - next.bottom) > 2) {
                heights.push((cur.bottom + next.top) / 2 - rect.top);
              }
            }
          }
          heights.push(rect.bottom - rect.top);
        }
      }
      function mapFromLineView(lineView, line, lineN) {
        if (lineView.line == line) {
          return { map: lineView.measure.map, cache: lineView.measure.cache };
        }
        if (lineView.rest) {
          for (var i2 = 0; i2 < lineView.rest.length; i2++) {
            if (lineView.rest[i2] == line) {
              return { map: lineView.measure.maps[i2], cache: lineView.measure.caches[i2] };
            }
          }
          for (var i$12 = 0; i$12 < lineView.rest.length; i$12++) {
            if (lineNo(lineView.rest[i$12]) > lineN) {
              return { map: lineView.measure.maps[i$12], cache: lineView.measure.caches[i$12], before: true };
            }
          }
        }
      }
      function updateExternalMeasurement(cm, line) {
        line = visualLine(line);
        var lineN = lineNo(line);
        var view = cm.display.externalMeasured = new LineView(cm.doc, line, lineN);
        view.lineN = lineN;
        var built = view.built = buildLineContent(cm, view);
        view.text = built.pre;
        removeChildrenAndAdd(cm.display.lineMeasure, built.pre);
        return view;
      }
      function measureChar(cm, line, ch, bias) {
        return measureCharPrepared(cm, prepareMeasureForLine(cm, line), ch, bias);
      }
      function findViewForLine(cm, lineN) {
        if (lineN >= cm.display.viewFrom && lineN < cm.display.viewTo) {
          return cm.display.view[findViewIndex(cm, lineN)];
        }
        var ext = cm.display.externalMeasured;
        if (ext && lineN >= ext.lineN && lineN < ext.lineN + ext.size) {
          return ext;
        }
      }
      function prepareMeasureForLine(cm, line) {
        var lineN = lineNo(line);
        var view = findViewForLine(cm, lineN);
        if (view && !view.text) {
          view = null;
        } else if (view && view.changes) {
          updateLineForChanges(cm, view, lineN, getDimensions(cm));
          cm.curOp.forceUpdate = true;
        }
        if (!view) {
          view = updateExternalMeasurement(cm, line);
        }
        var info = mapFromLineView(view, line, lineN);
        return {
          line,
          view,
          rect: null,
          map: info.map,
          cache: info.cache,
          before: info.before,
          hasHeights: false
        };
      }
      function measureCharPrepared(cm, prepared, ch, bias, varHeight) {
        if (prepared.before) {
          ch = -1;
        }
        var key = ch + (bias || ""), found;
        if (prepared.cache.hasOwnProperty(key)) {
          found = prepared.cache[key];
        } else {
          if (!prepared.rect) {
            prepared.rect = prepared.view.text.getBoundingClientRect();
          }
          if (!prepared.hasHeights) {
            ensureLineHeights(cm, prepared.view, prepared.rect);
            prepared.hasHeights = true;
          }
          found = measureCharInner(cm, prepared, ch, bias);
          if (!found.bogus) {
            prepared.cache[key] = found;
          }
        }
        return {
          left: found.left,
          right: found.right,
          top: varHeight ? found.rtop : found.top,
          bottom: varHeight ? found.rbottom : found.bottom
        };
      }
      var nullRect = { left: 0, right: 0, top: 0, bottom: 0 };
      function nodeAndOffsetInLineMap(map2, ch, bias) {
        var node, start, end, collapse, mStart, mEnd;
        for (var i2 = 0; i2 < map2.length; i2 += 3) {
          mStart = map2[i2];
          mEnd = map2[i2 + 1];
          if (ch < mStart) {
            start = 0;
            end = 1;
            collapse = "left";
          } else if (ch < mEnd) {
            start = ch - mStart;
            end = start + 1;
          } else if (i2 == map2.length - 3 || ch == mEnd && map2[i2 + 3] > ch) {
            end = mEnd - mStart;
            start = end - 1;
            if (ch >= mEnd) {
              collapse = "right";
            }
          }
          if (start != null) {
            node = map2[i2 + 2];
            if (mStart == mEnd && bias == (node.insertLeft ? "left" : "right")) {
              collapse = bias;
            }
            if (bias == "left" && start == 0) {
              while (i2 && map2[i2 - 2] == map2[i2 - 3] && map2[i2 - 1].insertLeft) {
                node = map2[(i2 -= 3) + 2];
                collapse = "left";
              }
            }
            if (bias == "right" && start == mEnd - mStart) {
              while (i2 < map2.length - 3 && map2[i2 + 3] == map2[i2 + 4] && !map2[i2 + 5].insertLeft) {
                node = map2[(i2 += 3) + 2];
                collapse = "right";
              }
            }
            break;
          }
        }
        return { node, start, end, collapse, coverStart: mStart, coverEnd: mEnd };
      }
      function getUsefulRect(rects, bias) {
        var rect = nullRect;
        if (bias == "left") {
          for (var i2 = 0; i2 < rects.length; i2++) {
            if ((rect = rects[i2]).left != rect.right) {
              break;
            }
          }
        } else {
          for (var i$12 = rects.length - 1; i$12 >= 0; i$12--) {
            if ((rect = rects[i$12]).left != rect.right) {
              break;
            }
          }
        }
        return rect;
      }
      function measureCharInner(cm, prepared, ch, bias) {
        var place = nodeAndOffsetInLineMap(prepared.map, ch, bias);
        var node = place.node, start = place.start, end = place.end, collapse = place.collapse;
        var rect;
        if (node.nodeType == 3) {
          for (var i$12 = 0; i$12 < 4; i$12++) {
            while (start && isExtendingChar(prepared.line.text.charAt(place.coverStart + start))) {
              --start;
            }
            while (place.coverStart + end < place.coverEnd && isExtendingChar(prepared.line.text.charAt(place.coverStart + end))) {
              ++end;
            }
            if (ie && ie_version < 9 && start == 0 && end == place.coverEnd - place.coverStart) {
              rect = node.parentNode.getBoundingClientRect();
            } else {
              rect = getUsefulRect(range(node, start, end).getClientRects(), bias);
            }
            if (rect.left || rect.right || start == 0) {
              break;
            }
            end = start;
            start = start - 1;
            collapse = "right";
          }
          if (ie && ie_version < 11) {
            rect = maybeUpdateRectForZooming(cm.display.measure, rect);
          }
        } else {
          if (start > 0) {
            collapse = bias = "right";
          }
          var rects;
          if (cm.options.lineWrapping && (rects = node.getClientRects()).length > 1) {
            rect = rects[bias == "right" ? rects.length - 1 : 0];
          } else {
            rect = node.getBoundingClientRect();
          }
        }
        if (ie && ie_version < 9 && !start && (!rect || !rect.left && !rect.right)) {
          var rSpan = node.parentNode.getClientRects()[0];
          if (rSpan) {
            rect = { left: rSpan.left, right: rSpan.left + charWidth(cm.display), top: rSpan.top, bottom: rSpan.bottom };
          } else {
            rect = nullRect;
          }
        }
        var rtop = rect.top - prepared.rect.top, rbot = rect.bottom - prepared.rect.top;
        var mid = (rtop + rbot) / 2;
        var heights = prepared.view.measure.heights;
        var i2 = 0;
        for (; i2 < heights.length - 1; i2++) {
          if (mid < heights[i2]) {
            break;
          }
        }
        var top = i2 ? heights[i2 - 1] : 0, bot = heights[i2];
        var result = {
          left: (collapse == "right" ? rect.right : rect.left) - prepared.rect.left,
          right: (collapse == "left" ? rect.left : rect.right) - prepared.rect.left,
          top,
          bottom: bot
        };
        if (!rect.left && !rect.right) {
          result.bogus = true;
        }
        if (!cm.options.singleCursorHeightPerLine) {
          result.rtop = rtop;
          result.rbottom = rbot;
        }
        return result;
      }
      function maybeUpdateRectForZooming(measure, rect) {
        if (!window.screen || screen.logicalXDPI == null || screen.logicalXDPI == screen.deviceXDPI || !hasBadZoomedRects(measure)) {
          return rect;
        }
        var scaleX = screen.logicalXDPI / screen.deviceXDPI;
        var scaleY = screen.logicalYDPI / screen.deviceYDPI;
        return {
          left: rect.left * scaleX,
          right: rect.right * scaleX,
          top: rect.top * scaleY,
          bottom: rect.bottom * scaleY
        };
      }
      function clearLineMeasurementCacheFor(lineView) {
        if (lineView.measure) {
          lineView.measure.cache = {};
          lineView.measure.heights = null;
          if (lineView.rest) {
            for (var i2 = 0; i2 < lineView.rest.length; i2++) {
              lineView.measure.caches[i2] = {};
            }
          }
        }
      }
      function clearLineMeasurementCache(cm) {
        cm.display.externalMeasure = null;
        removeChildren(cm.display.lineMeasure);
        for (var i2 = 0; i2 < cm.display.view.length; i2++) {
          clearLineMeasurementCacheFor(cm.display.view[i2]);
        }
      }
      function clearCaches(cm) {
        clearLineMeasurementCache(cm);
        cm.display.cachedCharWidth = cm.display.cachedTextHeight = cm.display.cachedPaddingH = null;
        if (!cm.options.lineWrapping) {
          cm.display.maxLineChanged = true;
        }
        cm.display.lineNumChars = null;
      }
      function pageScrollX(doc2) {
        if (chrome && android) {
          return -(doc2.body.getBoundingClientRect().left - parseInt(getComputedStyle(doc2.body).marginLeft));
        }
        return doc2.defaultView.pageXOffset || (doc2.documentElement || doc2.body).scrollLeft;
      }
      function pageScrollY(doc2) {
        if (chrome && android) {
          return -(doc2.body.getBoundingClientRect().top - parseInt(getComputedStyle(doc2.body).marginTop));
        }
        return doc2.defaultView.pageYOffset || (doc2.documentElement || doc2.body).scrollTop;
      }
      function widgetTopHeight(lineObj) {
        var ref = visualLine(lineObj);
        var widgets = ref.widgets;
        var height = 0;
        if (widgets) {
          for (var i2 = 0; i2 < widgets.length; ++i2) {
            if (widgets[i2].above) {
              height += widgetHeight(widgets[i2]);
            }
          }
        }
        return height;
      }
      function intoCoordSystem(cm, lineObj, rect, context, includeWidgets) {
        if (!includeWidgets) {
          var height = widgetTopHeight(lineObj);
          rect.top += height;
          rect.bottom += height;
        }
        if (context == "line") {
          return rect;
        }
        if (!context) {
          context = "local";
        }
        var yOff = heightAtLine(lineObj);
        if (context == "local") {
          yOff += paddingTop(cm.display);
        } else {
          yOff -= cm.display.viewOffset;
        }
        if (context == "page" || context == "window") {
          var lOff = cm.display.lineSpace.getBoundingClientRect();
          yOff += lOff.top + (context == "window" ? 0 : pageScrollY(doc(cm)));
          var xOff = lOff.left + (context == "window" ? 0 : pageScrollX(doc(cm)));
          rect.left += xOff;
          rect.right += xOff;
        }
        rect.top += yOff;
        rect.bottom += yOff;
        return rect;
      }
      function fromCoordSystem(cm, coords, context) {
        if (context == "div") {
          return coords;
        }
        var left = coords.left, top = coords.top;
        if (context == "page") {
          left -= pageScrollX(doc(cm));
          top -= pageScrollY(doc(cm));
        } else if (context == "local" || !context) {
          var localBox = cm.display.sizer.getBoundingClientRect();
          left += localBox.left;
          top += localBox.top;
        }
        var lineSpaceBox = cm.display.lineSpace.getBoundingClientRect();
        return { left: left - lineSpaceBox.left, top: top - lineSpaceBox.top };
      }
      function charCoords(cm, pos, context, lineObj, bias) {
        if (!lineObj) {
          lineObj = getLine(cm.doc, pos.line);
        }
        return intoCoordSystem(cm, lineObj, measureChar(cm, lineObj, pos.ch, bias), context);
      }
      function cursorCoords(cm, pos, context, lineObj, preparedMeasure, varHeight) {
        lineObj = lineObj || getLine(cm.doc, pos.line);
        if (!preparedMeasure) {
          preparedMeasure = prepareMeasureForLine(cm, lineObj);
        }
        function get(ch2, right) {
          var m = measureCharPrepared(cm, preparedMeasure, ch2, right ? "right" : "left", varHeight);
          if (right) {
            m.left = m.right;
          } else {
            m.right = m.left;
          }
          return intoCoordSystem(cm, lineObj, m, context);
        }
        var order = getOrder(lineObj, cm.doc.direction), ch = pos.ch, sticky = pos.sticky;
        if (ch >= lineObj.text.length) {
          ch = lineObj.text.length;
          sticky = "before";
        } else if (ch <= 0) {
          ch = 0;
          sticky = "after";
        }
        if (!order) {
          return get(sticky == "before" ? ch - 1 : ch, sticky == "before");
        }
        function getBidi(ch2, partPos2, invert) {
          var part = order[partPos2], right = part.level == 1;
          return get(invert ? ch2 - 1 : ch2, right != invert);
        }
        var partPos = getBidiPartAt(order, ch, sticky);
        var other = bidiOther;
        var val = getBidi(ch, partPos, sticky == "before");
        if (other != null) {
          val.other = getBidi(ch, other, sticky != "before");
        }
        return val;
      }
      function estimateCoords(cm, pos) {
        var left = 0;
        pos = clipPos(cm.doc, pos);
        if (!cm.options.lineWrapping) {
          left = charWidth(cm.display) * pos.ch;
        }
        var lineObj = getLine(cm.doc, pos.line);
        var top = heightAtLine(lineObj) + paddingTop(cm.display);
        return { left, right: left, top, bottom: top + lineObj.height };
      }
      function PosWithInfo(line, ch, sticky, outside, xRel) {
        var pos = Pos(line, ch, sticky);
        pos.xRel = xRel;
        if (outside) {
          pos.outside = outside;
        }
        return pos;
      }
      function coordsChar(cm, x, y) {
        var doc2 = cm.doc;
        y += cm.display.viewOffset;
        if (y < 0) {
          return PosWithInfo(doc2.first, 0, null, -1, -1);
        }
        var lineN = lineAtHeight(doc2, y), last = doc2.first + doc2.size - 1;
        if (lineN > last) {
          return PosWithInfo(doc2.first + doc2.size - 1, getLine(doc2, last).text.length, null, 1, 1);
        }
        if (x < 0) {
          x = 0;
        }
        var lineObj = getLine(doc2, lineN);
        for (; ; ) {
          var found = coordsCharInner(cm, lineObj, lineN, x, y);
          var collapsed = collapsedSpanAround(lineObj, found.ch + (found.xRel > 0 || found.outside > 0 ? 1 : 0));
          if (!collapsed) {
            return found;
          }
          var rangeEnd = collapsed.find(1);
          if (rangeEnd.line == lineN) {
            return rangeEnd;
          }
          lineObj = getLine(doc2, lineN = rangeEnd.line);
        }
      }
      function wrappedLineExtent(cm, lineObj, preparedMeasure, y) {
        y -= widgetTopHeight(lineObj);
        var end = lineObj.text.length;
        var begin = findFirst(function(ch) {
          return measureCharPrepared(cm, preparedMeasure, ch - 1).bottom <= y;
        }, end, 0);
        end = findFirst(function(ch) {
          return measureCharPrepared(cm, preparedMeasure, ch).top > y;
        }, begin, end);
        return { begin, end };
      }
      function wrappedLineExtentChar(cm, lineObj, preparedMeasure, target) {
        if (!preparedMeasure) {
          preparedMeasure = prepareMeasureForLine(cm, lineObj);
        }
        var targetTop = intoCoordSystem(cm, lineObj, measureCharPrepared(cm, preparedMeasure, target), "line").top;
        return wrappedLineExtent(cm, lineObj, preparedMeasure, targetTop);
      }
      function boxIsAfter(box, x, y, left) {
        return box.bottom <= y ? false : box.top > y ? true : (left ? box.left : box.right) > x;
      }
      function coordsCharInner(cm, lineObj, lineNo2, x, y) {
        y -= heightAtLine(lineObj);
        var preparedMeasure = prepareMeasureForLine(cm, lineObj);
        var widgetHeight2 = widgetTopHeight(lineObj);
        var begin = 0, end = lineObj.text.length, ltr = true;
        var order = getOrder(lineObj, cm.doc.direction);
        if (order) {
          var part = (cm.options.lineWrapping ? coordsBidiPartWrapped : coordsBidiPart)(cm, lineObj, lineNo2, preparedMeasure, order, x, y);
          ltr = part.level != 1;
          begin = ltr ? part.from : part.to - 1;
          end = ltr ? part.to : part.from - 1;
        }
        var chAround = null, boxAround = null;
        var ch = findFirst(function(ch2) {
          var box = measureCharPrepared(cm, preparedMeasure, ch2);
          box.top += widgetHeight2;
          box.bottom += widgetHeight2;
          if (!boxIsAfter(box, x, y, false)) {
            return false;
          }
          if (box.top <= y && box.left <= x) {
            chAround = ch2;
            boxAround = box;
          }
          return true;
        }, begin, end);
        var baseX, sticky, outside = false;
        if (boxAround) {
          var atLeft = x - boxAround.left < boxAround.right - x, atStart = atLeft == ltr;
          ch = chAround + (atStart ? 0 : 1);
          sticky = atStart ? "after" : "before";
          baseX = atLeft ? boxAround.left : boxAround.right;
        } else {
          if (!ltr && (ch == end || ch == begin)) {
            ch++;
          }
          sticky = ch == 0 ? "after" : ch == lineObj.text.length ? "before" : measureCharPrepared(cm, preparedMeasure, ch - (ltr ? 1 : 0)).bottom + widgetHeight2 <= y == ltr ? "after" : "before";
          var coords = cursorCoords(cm, Pos(lineNo2, ch, sticky), "line", lineObj, preparedMeasure);
          baseX = coords.left;
          outside = y < coords.top ? -1 : y >= coords.bottom ? 1 : 0;
        }
        ch = skipExtendingChars(lineObj.text, ch, 1);
        return PosWithInfo(lineNo2, ch, sticky, outside, x - baseX);
      }
      function coordsBidiPart(cm, lineObj, lineNo2, preparedMeasure, order, x, y) {
        var index = findFirst(function(i2) {
          var part2 = order[i2], ltr2 = part2.level != 1;
          return boxIsAfter(cursorCoords(
            cm,
            Pos(lineNo2, ltr2 ? part2.to : part2.from, ltr2 ? "before" : "after"),
            "line",
            lineObj,
            preparedMeasure
          ), x, y, true);
        }, 0, order.length - 1);
        var part = order[index];
        if (index > 0) {
          var ltr = part.level != 1;
          var start = cursorCoords(
            cm,
            Pos(lineNo2, ltr ? part.from : part.to, ltr ? "after" : "before"),
            "line",
            lineObj,
            preparedMeasure
          );
          if (boxIsAfter(start, x, y, true) && start.top > y) {
            part = order[index - 1];
          }
        }
        return part;
      }
      function coordsBidiPartWrapped(cm, lineObj, _lineNo, preparedMeasure, order, x, y) {
        var ref = wrappedLineExtent(cm, lineObj, preparedMeasure, y);
        var begin = ref.begin;
        var end = ref.end;
        if (/\s/.test(lineObj.text.charAt(end - 1))) {
          end--;
        }
        var part = null, closestDist = null;
        for (var i2 = 0; i2 < order.length; i2++) {
          var p = order[i2];
          if (p.from >= end || p.to <= begin) {
            continue;
          }
          var ltr = p.level != 1;
          var endX = measureCharPrepared(cm, preparedMeasure, ltr ? Math.min(end, p.to) - 1 : Math.max(begin, p.from)).right;
          var dist = endX < x ? x - endX + 1e9 : endX - x;
          if (!part || closestDist > dist) {
            part = p;
            closestDist = dist;
          }
        }
        if (!part) {
          part = order[order.length - 1];
        }
        if (part.from < begin) {
          part = { from: begin, to: part.to, level: part.level };
        }
        if (part.to > end) {
          part = { from: part.from, to: end, level: part.level };
        }
        return part;
      }
      var measureText;
      function textHeight(display) {
        if (display.cachedTextHeight != null) {
          return display.cachedTextHeight;
        }
        if (measureText == null) {
          measureText = elt("pre", null, "CodeMirror-line-like");
          for (var i2 = 0; i2 < 49; ++i2) {
            measureText.appendChild(document.createTextNode("x"));
            measureText.appendChild(elt("br"));
          }
          measureText.appendChild(document.createTextNode("x"));
        }
        removeChildrenAndAdd(display.measure, measureText);
        var height = measureText.offsetHeight / 50;
        if (height > 3) {
          display.cachedTextHeight = height;
        }
        removeChildren(display.measure);
        return height || 1;
      }
      function charWidth(display) {
        if (display.cachedCharWidth != null) {
          return display.cachedCharWidth;
        }
        var anchor = elt("span", "xxxxxxxxxx");
        var pre = elt("pre", [anchor], "CodeMirror-line-like");
        removeChildrenAndAdd(display.measure, pre);
        var rect = anchor.getBoundingClientRect(), width = (rect.right - rect.left) / 10;
        if (width > 2) {
          display.cachedCharWidth = width;
        }
        return width || 10;
      }
      function getDimensions(cm) {
        var d = cm.display, left = {}, width = {};
        var gutterLeft = d.gutters.clientLeft;
        for (var n = d.gutters.firstChild, i2 = 0; n; n = n.nextSibling, ++i2) {
          var id = cm.display.gutterSpecs[i2].className;
          left[id] = n.offsetLeft + n.clientLeft + gutterLeft;
          width[id] = n.clientWidth;
        }
        return {
          fixedPos: compensateForHScroll(d),
          gutterTotalWidth: d.gutters.offsetWidth,
          gutterLeft: left,
          gutterWidth: width,
          wrapperWidth: d.wrapper.clientWidth
        };
      }
      function compensateForHScroll(display) {
        return display.scroller.getBoundingClientRect().left - display.sizer.getBoundingClientRect().left;
      }
      function estimateHeight(cm) {
        var th = textHeight(cm.display), wrapping = cm.options.lineWrapping;
        var perLine = wrapping && Math.max(5, cm.display.scroller.clientWidth / charWidth(cm.display) - 3);
        return function(line) {
          if (lineIsHidden(cm.doc, line)) {
            return 0;
          }
          var widgetsHeight = 0;
          if (line.widgets) {
            for (var i2 = 0; i2 < line.widgets.length; i2++) {
              if (line.widgets[i2].height) {
                widgetsHeight += line.widgets[i2].height;
              }
            }
          }
          if (wrapping) {
            return widgetsHeight + (Math.ceil(line.text.length / perLine) || 1) * th;
          } else {
            return widgetsHeight + th;
          }
        };
      }
      function estimateLineHeights(cm) {
        var doc2 = cm.doc, est = estimateHeight(cm);
        doc2.iter(function(line) {
          var estHeight = est(line);
          if (estHeight != line.height) {
            updateLineHeight(line, estHeight);
          }
        });
      }
      function posFromMouse(cm, e, liberal, forRect) {
        var display = cm.display;
        if (!liberal && e_target(e).getAttribute("cm-not-content") == "true") {
          return null;
        }
        var x, y, space = display.lineSpace.getBoundingClientRect();
        try {
          x = e.clientX - space.left;
          y = e.clientY - space.top;
        } catch (e$1) {
          return null;
        }
        var coords = coordsChar(cm, x, y), line;
        if (forRect && coords.xRel > 0 && (line = getLine(cm.doc, coords.line).text).length == coords.ch) {
          var colDiff = countColumn(line, line.length, cm.options.tabSize) - line.length;
          coords = Pos(coords.line, Math.max(0, Math.round((x - paddingH(cm.display).left) / charWidth(cm.display)) - colDiff));
        }
        return coords;
      }
      function findViewIndex(cm, n) {
        if (n >= cm.display.viewTo) {
          return null;
        }
        n -= cm.display.viewFrom;
        if (n < 0) {
          return null;
        }
        var view = cm.display.view;
        for (var i2 = 0; i2 < view.length; i2++) {
          n -= view[i2].size;
          if (n < 0) {
            return i2;
          }
        }
      }
      function regChange(cm, from, to, lendiff) {
        if (from == null) {
          from = cm.doc.first;
        }
        if (to == null) {
          to = cm.doc.first + cm.doc.size;
        }
        if (!lendiff) {
          lendiff = 0;
        }
        var display = cm.display;
        if (lendiff && to < display.viewTo && (display.updateLineNumbers == null || display.updateLineNumbers > from)) {
          display.updateLineNumbers = from;
        }
        cm.curOp.viewChanged = true;
        if (from >= display.viewTo) {
          if (sawCollapsedSpans && visualLineNo(cm.doc, from) < display.viewTo) {
            resetView(cm);
          }
        } else if (to <= display.viewFrom) {
          if (sawCollapsedSpans && visualLineEndNo(cm.doc, to + lendiff) > display.viewFrom) {
            resetView(cm);
          } else {
            display.viewFrom += lendiff;
            display.viewTo += lendiff;
          }
        } else if (from <= display.viewFrom && to >= display.viewTo) {
          resetView(cm);
        } else if (from <= display.viewFrom) {
          var cut = viewCuttingPoint(cm, to, to + lendiff, 1);
          if (cut) {
            display.view = display.view.slice(cut.index);
            display.viewFrom = cut.lineN;
            display.viewTo += lendiff;
          } else {
            resetView(cm);
          }
        } else if (to >= display.viewTo) {
          var cut$1 = viewCuttingPoint(cm, from, from, -1);
          if (cut$1) {
            display.view = display.view.slice(0, cut$1.index);
            display.viewTo = cut$1.lineN;
          } else {
            resetView(cm);
          }
        } else {
          var cutTop = viewCuttingPoint(cm, from, from, -1);
          var cutBot = viewCuttingPoint(cm, to, to + lendiff, 1);
          if (cutTop && cutBot) {
            display.view = display.view.slice(0, cutTop.index).concat(buildViewArray(cm, cutTop.lineN, cutBot.lineN)).concat(display.view.slice(cutBot.index));
            display.viewTo += lendiff;
          } else {
            resetView(cm);
          }
        }
        var ext = display.externalMeasured;
        if (ext) {
          if (to < ext.lineN) {
            ext.lineN += lendiff;
          } else if (from < ext.lineN + ext.size) {
            display.externalMeasured = null;
          }
        }
      }
      function regLineChange(cm, line, type) {
        cm.curOp.viewChanged = true;
        var display = cm.display, ext = cm.display.externalMeasured;
        if (ext && line >= ext.lineN && line < ext.lineN + ext.size) {
          display.externalMeasured = null;
        }
        if (line < display.viewFrom || line >= display.viewTo) {
          return;
        }
        var lineView = display.view[findViewIndex(cm, line)];
        if (lineView.node == null) {
          return;
        }
        var arr = lineView.changes || (lineView.changes = []);
        if (indexOf(arr, type) == -1) {
          arr.push(type);
        }
      }
      function resetView(cm) {
        cm.display.viewFrom = cm.display.viewTo = cm.doc.first;
        cm.display.view = [];
        cm.display.viewOffset = 0;
      }
      function viewCuttingPoint(cm, oldN, newN, dir) {
        var index = findViewIndex(cm, oldN), diff, view = cm.display.view;
        if (!sawCollapsedSpans || newN == cm.doc.first + cm.doc.size) {
          return { index, lineN: newN };
        }
        var n = cm.display.viewFrom;
        for (var i2 = 0; i2 < index; i2++) {
          n += view[i2].size;
        }
        if (n != oldN) {
          if (dir > 0) {
            if (index == view.length - 1) {
              return null;
            }
            diff = n + view[index].size - oldN;
            index++;
          } else {
            diff = n - oldN;
          }
          oldN += diff;
          newN += diff;
        }
        while (visualLineNo(cm.doc, newN) != newN) {
          if (index == (dir < 0 ? 0 : view.length - 1)) {
            return null;
          }
          newN += dir * view[index - (dir < 0 ? 1 : 0)].size;
          index += dir;
        }
        return { index, lineN: newN };
      }
      function adjustView(cm, from, to) {
        var display = cm.display, view = display.view;
        if (view.length == 0 || from >= display.viewTo || to <= display.viewFrom) {
          display.view = buildViewArray(cm, from, to);
          display.viewFrom = from;
        } else {
          if (display.viewFrom > from) {
            display.view = buildViewArray(cm, from, display.viewFrom).concat(display.view);
          } else if (display.viewFrom < from) {
            display.view = display.view.slice(findViewIndex(cm, from));
          }
          display.viewFrom = from;
          if (display.viewTo < to) {
            display.view = display.view.concat(buildViewArray(cm, display.viewTo, to));
          } else if (display.viewTo > to) {
            display.view = display.view.slice(0, findViewIndex(cm, to));
          }
        }
        display.viewTo = to;
      }
      function countDirtyView(cm) {
        var view = cm.display.view, dirty = 0;
        for (var i2 = 0; i2 < view.length; i2++) {
          var lineView = view[i2];
          if (!lineView.hidden && (!lineView.node || lineView.changes)) {
            ++dirty;
          }
        }
        return dirty;
      }
      function updateSelection(cm) {
        cm.display.input.showSelection(cm.display.input.prepareSelection());
      }
      function prepareSelection(cm, primary) {
        if (primary === void 0)
          primary = true;
        var doc2 = cm.doc, result = {};
        var curFragment = result.cursors = document.createDocumentFragment();
        var selFragment = result.selection = document.createDocumentFragment();
        var customCursor = cm.options.$customCursor;
        if (customCursor) {
          primary = true;
        }
        for (var i2 = 0; i2 < doc2.sel.ranges.length; i2++) {
          if (!primary && i2 == doc2.sel.primIndex) {
            continue;
          }
          var range2 = doc2.sel.ranges[i2];
          if (range2.from().line >= cm.display.viewTo || range2.to().line < cm.display.viewFrom) {
            continue;
          }
          var collapsed = range2.empty();
          if (customCursor) {
            var head = customCursor(cm, range2);
            if (head) {
              drawSelectionCursor(cm, head, curFragment);
            }
          } else if (collapsed || cm.options.showCursorWhenSelecting) {
            drawSelectionCursor(cm, range2.head, curFragment);
          }
          if (!collapsed) {
            drawSelectionRange(cm, range2, selFragment);
          }
        }
        return result;
      }
      function drawSelectionCursor(cm, head, output) {
        var pos = cursorCoords(cm, head, "div", null, null, !cm.options.singleCursorHeightPerLine);
        var cursor = output.appendChild(elt("div", "\xA0", "CodeMirror-cursor"));
        cursor.style.left = pos.left + "px";
        cursor.style.top = pos.top + "px";
        cursor.style.height = Math.max(0, pos.bottom - pos.top) * cm.options.cursorHeight + "px";
        if (/\bcm-fat-cursor\b/.test(cm.getWrapperElement().className)) {
          var charPos = charCoords(cm, head, "div", null, null);
          var width = charPos.right - charPos.left;
          cursor.style.width = (width > 0 ? width : cm.defaultCharWidth()) + "px";
        }
        if (pos.other) {
          var otherCursor = output.appendChild(elt("div", "\xA0", "CodeMirror-cursor CodeMirror-secondarycursor"));
          otherCursor.style.display = "";
          otherCursor.style.left = pos.other.left + "px";
          otherCursor.style.top = pos.other.top + "px";
          otherCursor.style.height = (pos.other.bottom - pos.other.top) * 0.85 + "px";
        }
      }
      function cmpCoords(a, b) {
        return a.top - b.top || a.left - b.left;
      }
      function drawSelectionRange(cm, range2, output) {
        var display = cm.display, doc2 = cm.doc;
        var fragment = document.createDocumentFragment();
        var padding = paddingH(cm.display), leftSide = padding.left;
        var rightSide = Math.max(display.sizerWidth, displayWidth(cm) - display.sizer.offsetLeft) - padding.right;
        var docLTR = doc2.direction == "ltr";
        function add(left, top, width, bottom) {
          if (top < 0) {
            top = 0;
          }
          top = Math.round(top);
          bottom = Math.round(bottom);
          fragment.appendChild(elt("div", null, "CodeMirror-selected", "position: absolute; left: " + left + "px;\n                             top: " + top + "px; width: " + (width == null ? rightSide - left : width) + "px;\n                             height: " + (bottom - top) + "px"));
        }
        function drawForLine(line, fromArg, toArg) {
          var lineObj = getLine(doc2, line);
          var lineLen = lineObj.text.length;
          var start, end;
          function coords(ch, bias) {
            return charCoords(cm, Pos(line, ch), "div", lineObj, bias);
          }
          function wrapX(pos, dir, side) {
            var extent = wrappedLineExtentChar(cm, lineObj, null, pos);
            var prop2 = dir == "ltr" == (side == "after") ? "left" : "right";
            var ch = side == "after" ? extent.begin : extent.end - (/\s/.test(lineObj.text.charAt(extent.end - 1)) ? 2 : 1);
            return coords(ch, prop2)[prop2];
          }
          var order = getOrder(lineObj, doc2.direction);
          iterateBidiSections(order, fromArg || 0, toArg == null ? lineLen : toArg, function(from, to, dir, i2) {
            var ltr = dir == "ltr";
            var fromPos = coords(from, ltr ? "left" : "right");
            var toPos = coords(to - 1, ltr ? "right" : "left");
            var openStart = fromArg == null && from == 0, openEnd = toArg == null && to == lineLen;
            var first = i2 == 0, last = !order || i2 == order.length - 1;
            if (toPos.top - fromPos.top <= 3) {
              var openLeft = (docLTR ? openStart : openEnd) && first;
              var openRight = (docLTR ? openEnd : openStart) && last;
              var left = openLeft ? leftSide : (ltr ? fromPos : toPos).left;
              var right = openRight ? rightSide : (ltr ? toPos : fromPos).right;
              add(left, fromPos.top, right - left, fromPos.bottom);
            } else {
              var topLeft, topRight, botLeft, botRight;
              if (ltr) {
                topLeft = docLTR && openStart && first ? leftSide : fromPos.left;
                topRight = docLTR ? rightSide : wrapX(from, dir, "before");
                botLeft = docLTR ? leftSide : wrapX(to, dir, "after");
                botRight = docLTR && openEnd && last ? rightSide : toPos.right;
              } else {
                topLeft = !docLTR ? leftSide : wrapX(from, dir, "before");
                topRight = !docLTR && openStart && first ? rightSide : fromPos.right;
                botLeft = !docLTR && openEnd && last ? leftSide : toPos.left;
                botRight = !docLTR ? rightSide : wrapX(to, dir, "after");
              }
              add(topLeft, fromPos.top, topRight - topLeft, fromPos.bottom);
              if (fromPos.bottom < toPos.top) {
                add(leftSide, fromPos.bottom, null, toPos.top);
              }
              add(botLeft, toPos.top, botRight - botLeft, toPos.bottom);
            }
            if (!start || cmpCoords(fromPos, start) < 0) {
              start = fromPos;
            }
            if (cmpCoords(toPos, start) < 0) {
              start = toPos;
            }
            if (!end || cmpCoords(fromPos, end) < 0) {
              end = fromPos;
            }
            if (cmpCoords(toPos, end) < 0) {
              end = toPos;
            }
          });
          return { start, end };
        }
        var sFrom = range2.from(), sTo = range2.to();
        if (sFrom.line == sTo.line) {
          drawForLine(sFrom.line, sFrom.ch, sTo.ch);
        } else {
          var fromLine = getLine(doc2, sFrom.line), toLine = getLine(doc2, sTo.line);
          var singleVLine = visualLine(fromLine) == visualLine(toLine);
          var leftEnd = drawForLine(sFrom.line, sFrom.ch, singleVLine ? fromLine.text.length + 1 : null).end;
          var rightStart = drawForLine(sTo.line, singleVLine ? 0 : null, sTo.ch).start;
          if (singleVLine) {
            if (leftEnd.top < rightStart.top - 2) {
              add(leftEnd.right, leftEnd.top, null, leftEnd.bottom);
              add(leftSide, rightStart.top, rightStart.left, rightStart.bottom);
            } else {
              add(leftEnd.right, leftEnd.top, rightStart.left - leftEnd.right, leftEnd.bottom);
            }
          }
          if (leftEnd.bottom < rightStart.top) {
            add(leftSide, leftEnd.bottom, null, rightStart.top);
          }
        }
        output.appendChild(fragment);
      }
      function restartBlink(cm) {
        if (!cm.state.focused) {
          return;
        }
        var display = cm.display;
        clearInterval(display.blinker);
        var on2 = true;
        display.cursorDiv.style.visibility = "";
        if (cm.options.cursorBlinkRate > 0) {
          display.blinker = setInterval(function() {
            if (!cm.hasFocus()) {
              onBlur(cm);
            }
            display.cursorDiv.style.visibility = (on2 = !on2) ? "" : "hidden";
          }, cm.options.cursorBlinkRate);
        } else if (cm.options.cursorBlinkRate < 0) {
          display.cursorDiv.style.visibility = "hidden";
        }
      }
      function ensureFocus(cm) {
        if (!cm.hasFocus()) {
          cm.display.input.focus();
          if (!cm.state.focused) {
            onFocus(cm);
          }
        }
      }
      function delayBlurEvent(cm) {
        cm.state.delayingBlurEvent = true;
        setTimeout(function() {
          if (cm.state.delayingBlurEvent) {
            cm.state.delayingBlurEvent = false;
            if (cm.state.focused) {
              onBlur(cm);
            }
          }
        }, 100);
      }
      function onFocus(cm, e) {
        if (cm.state.delayingBlurEvent && !cm.state.draggingText) {
          cm.state.delayingBlurEvent = false;
        }
        if (cm.options.readOnly == "nocursor") {
          return;
        }
        if (!cm.state.focused) {
          signal(cm, "focus", cm, e);
          cm.state.focused = true;
          addClass(cm.display.wrapper, "CodeMirror-focused");
          if (!cm.curOp && cm.display.selForContextMenu != cm.doc.sel) {
            cm.display.input.reset();
            if (webkit) {
              setTimeout(function() {
                return cm.display.input.reset(true);
              }, 20);
            }
          }
          cm.display.input.receivedFocus();
        }
        restartBlink(cm);
      }
      function onBlur(cm, e) {
        if (cm.state.delayingBlurEvent) {
          return;
        }
        if (cm.state.focused) {
          signal(cm, "blur", cm, e);
          cm.state.focused = false;
          rmClass(cm.display.wrapper, "CodeMirror-focused");
        }
        clearInterval(cm.display.blinker);
        setTimeout(function() {
          if (!cm.state.focused) {
            cm.display.shift = false;
          }
        }, 150);
      }
      function updateHeightsInViewport(cm) {
        var display = cm.display;
        var prevBottom = display.lineDiv.offsetTop;
        var viewTop = Math.max(0, display.scroller.getBoundingClientRect().top);
        var oldHeight = display.lineDiv.getBoundingClientRect().top;
        var mustScroll = 0;
        for (var i2 = 0; i2 < display.view.length; i2++) {
          var cur = display.view[i2], wrapping = cm.options.lineWrapping;
          var height = void 0, width = 0;
          if (cur.hidden) {
            continue;
          }
          oldHeight += cur.line.height;
          if (ie && ie_version < 8) {
            var bot = cur.node.offsetTop + cur.node.offsetHeight;
            height = bot - prevBottom;
            prevBottom = bot;
          } else {
            var box = cur.node.getBoundingClientRect();
            height = box.bottom - box.top;
            if (!wrapping && cur.text.firstChild) {
              width = cur.text.firstChild.getBoundingClientRect().right - box.left - 1;
            }
          }
          var diff = cur.line.height - height;
          if (diff > 5e-3 || diff < -5e-3) {
            if (oldHeight < viewTop) {
              mustScroll -= diff;
            }
            updateLineHeight(cur.line, height);
            updateWidgetHeight(cur.line);
            if (cur.rest) {
              for (var j = 0; j < cur.rest.length; j++) {
                updateWidgetHeight(cur.rest[j]);
              }
            }
          }
          if (width > cm.display.sizerWidth) {
            var chWidth = Math.ceil(width / charWidth(cm.display));
            if (chWidth > cm.display.maxLineLength) {
              cm.display.maxLineLength = chWidth;
              cm.display.maxLine = cur.line;
              cm.display.maxLineChanged = true;
            }
          }
        }
        if (Math.abs(mustScroll) > 2) {
          display.scroller.scrollTop += mustScroll;
        }
      }
      function updateWidgetHeight(line) {
        if (line.widgets) {
          for (var i2 = 0; i2 < line.widgets.length; ++i2) {
            var w = line.widgets[i2], parent = w.node.parentNode;
            if (parent) {
              w.height = parent.offsetHeight;
            }
          }
        }
      }
      function visibleLines(display, doc2, viewport) {
        var top = viewport && viewport.top != null ? Math.max(0, viewport.top) : display.scroller.scrollTop;
        top = Math.floor(top - paddingTop(display));
        var bottom = viewport && viewport.bottom != null ? viewport.bottom : top + display.wrapper.clientHeight;
        var from = lineAtHeight(doc2, top), to = lineAtHeight(doc2, bottom);
        if (viewport && viewport.ensure) {
          var ensureFrom = viewport.ensure.from.line, ensureTo = viewport.ensure.to.line;
          if (ensureFrom < from) {
            from = ensureFrom;
            to = lineAtHeight(doc2, heightAtLine(getLine(doc2, ensureFrom)) + display.wrapper.clientHeight);
          } else if (Math.min(ensureTo, doc2.lastLine()) >= to) {
            from = lineAtHeight(doc2, heightAtLine(getLine(doc2, ensureTo)) - display.wrapper.clientHeight);
            to = ensureTo;
          }
        }
        return { from, to: Math.max(to, from + 1) };
      }
      function maybeScrollWindow(cm, rect) {
        if (signalDOMEvent(cm, "scrollCursorIntoView")) {
          return;
        }
        var display = cm.display, box = display.sizer.getBoundingClientRect(), doScroll = null;
        var doc2 = display.wrapper.ownerDocument;
        if (rect.top + box.top < 0) {
          doScroll = true;
        } else if (rect.bottom + box.top > (doc2.defaultView.innerHeight || doc2.documentElement.clientHeight)) {
          doScroll = false;
        }
        if (doScroll != null && !phantom) {
          var scrollNode = elt("div", "\u200B", null, "position: absolute;\n                         top: " + (rect.top - display.viewOffset - paddingTop(cm.display)) + "px;\n                         height: " + (rect.bottom - rect.top + scrollGap(cm) + display.barHeight) + "px;\n                         left: " + rect.left + "px; width: " + Math.max(2, rect.right - rect.left) + "px;");
          cm.display.lineSpace.appendChild(scrollNode);
          scrollNode.scrollIntoView(doScroll);
          cm.display.lineSpace.removeChild(scrollNode);
        }
      }
      function scrollPosIntoView(cm, pos, end, margin) {
        if (margin == null) {
          margin = 0;
        }
        var rect;
        if (!cm.options.lineWrapping && pos == end) {
          end = pos.sticky == "before" ? Pos(pos.line, pos.ch + 1, "before") : pos;
          pos = pos.ch ? Pos(pos.line, pos.sticky == "before" ? pos.ch - 1 : pos.ch, "after") : pos;
        }
        for (var limit = 0; limit < 5; limit++) {
          var changed = false;
          var coords = cursorCoords(cm, pos);
          var endCoords = !end || end == pos ? coords : cursorCoords(cm, end);
          rect = {
            left: Math.min(coords.left, endCoords.left),
            top: Math.min(coords.top, endCoords.top) - margin,
            right: Math.max(coords.left, endCoords.left),
            bottom: Math.max(coords.bottom, endCoords.bottom) + margin
          };
          var scrollPos = calculateScrollPos(cm, rect);
          var startTop = cm.doc.scrollTop, startLeft = cm.doc.scrollLeft;
          if (scrollPos.scrollTop != null) {
            updateScrollTop(cm, scrollPos.scrollTop);
            if (Math.abs(cm.doc.scrollTop - startTop) > 1) {
              changed = true;
            }
          }
          if (scrollPos.scrollLeft != null) {
            setScrollLeft(cm, scrollPos.scrollLeft);
            if (Math.abs(cm.doc.scrollLeft - startLeft) > 1) {
              changed = true;
            }
          }
          if (!changed) {
            break;
          }
        }
        return rect;
      }
      function scrollIntoView(cm, rect) {
        var scrollPos = calculateScrollPos(cm, rect);
        if (scrollPos.scrollTop != null) {
          updateScrollTop(cm, scrollPos.scrollTop);
        }
        if (scrollPos.scrollLeft != null) {
          setScrollLeft(cm, scrollPos.scrollLeft);
        }
      }
      function calculateScrollPos(cm, rect) {
        var display = cm.display, snapMargin = textHeight(cm.display);
        if (rect.top < 0) {
          rect.top = 0;
        }
        var screentop = cm.curOp && cm.curOp.scrollTop != null ? cm.curOp.scrollTop : display.scroller.scrollTop;
        var screen2 = displayHeight(cm), result = {};
        if (rect.bottom - rect.top > screen2) {
          rect.bottom = rect.top + screen2;
        }
        var docBottom = cm.doc.height + paddingVert(display);
        var atTop = rect.top < snapMargin, atBottom = rect.bottom > docBottom - snapMargin;
        if (rect.top < screentop) {
          result.scrollTop = atTop ? 0 : rect.top;
        } else if (rect.bottom > screentop + screen2) {
          var newTop = Math.min(rect.top, (atBottom ? docBottom : rect.bottom) - screen2);
          if (newTop != screentop) {
            result.scrollTop = newTop;
          }
        }
        var gutterSpace = cm.options.fixedGutter ? 0 : display.gutters.offsetWidth;
        var screenleft = cm.curOp && cm.curOp.scrollLeft != null ? cm.curOp.scrollLeft : display.scroller.scrollLeft - gutterSpace;
        var screenw = displayWidth(cm) - display.gutters.offsetWidth;
        var tooWide = rect.right - rect.left > screenw;
        if (tooWide) {
          rect.right = rect.left + screenw;
        }
        if (rect.left < 10) {
          result.scrollLeft = 0;
        } else if (rect.left < screenleft) {
          result.scrollLeft = Math.max(0, rect.left + gutterSpace - (tooWide ? 0 : 10));
        } else if (rect.right > screenw + screenleft - 3) {
          result.scrollLeft = rect.right + (tooWide ? 0 : 10) - screenw;
        }
        return result;
      }
      function addToScrollTop(cm, top) {
        if (top == null) {
          return;
        }
        resolveScrollToPos(cm);
        cm.curOp.scrollTop = (cm.curOp.scrollTop == null ? cm.doc.scrollTop : cm.curOp.scrollTop) + top;
      }
      function ensureCursorVisible(cm) {
        resolveScrollToPos(cm);
        var cur = cm.getCursor();
        cm.curOp.scrollToPos = { from: cur, to: cur, margin: cm.options.cursorScrollMargin };
      }
      function scrollToCoords(cm, x, y) {
        if (x != null || y != null) {
          resolveScrollToPos(cm);
        }
        if (x != null) {
          cm.curOp.scrollLeft = x;
        }
        if (y != null) {
          cm.curOp.scrollTop = y;
        }
      }
      function scrollToRange(cm, range2) {
        resolveScrollToPos(cm);
        cm.curOp.scrollToPos = range2;
      }
      function resolveScrollToPos(cm) {
        var range2 = cm.curOp.scrollToPos;
        if (range2) {
          cm.curOp.scrollToPos = null;
          var from = estimateCoords(cm, range2.from), to = estimateCoords(cm, range2.to);
          scrollToCoordsRange(cm, from, to, range2.margin);
        }
      }
      function scrollToCoordsRange(cm, from, to, margin) {
        var sPos = calculateScrollPos(cm, {
          left: Math.min(from.left, to.left),
          top: Math.min(from.top, to.top) - margin,
          right: Math.max(from.right, to.right),
          bottom: Math.max(from.bottom, to.bottom) + margin
        });
        scrollToCoords(cm, sPos.scrollLeft, sPos.scrollTop);
      }
      function updateScrollTop(cm, val) {
        if (Math.abs(cm.doc.scrollTop - val) < 2) {
          return;
        }
        if (!gecko) {
          updateDisplaySimple(cm, { top: val });
        }
        setScrollTop(cm, val, true);
        if (gecko) {
          updateDisplaySimple(cm);
        }
        startWorker(cm, 100);
      }
      function setScrollTop(cm, val, forceScroll) {
        val = Math.max(0, Math.min(cm.display.scroller.scrollHeight - cm.display.scroller.clientHeight, val));
        if (cm.display.scroller.scrollTop == val && !forceScroll) {
          return;
        }
        cm.doc.scrollTop = val;
        cm.display.scrollbars.setScrollTop(val);
        if (cm.display.scroller.scrollTop != val) {
          cm.display.scroller.scrollTop = val;
        }
      }
      function setScrollLeft(cm, val, isScroller, forceScroll) {
        val = Math.max(0, Math.min(val, cm.display.scroller.scrollWidth - cm.display.scroller.clientWidth));
        if ((isScroller ? val == cm.doc.scrollLeft : Math.abs(cm.doc.scrollLeft - val) < 2) && !forceScroll) {
          return;
        }
        cm.doc.scrollLeft = val;
        alignHorizontally(cm);
        if (cm.display.scroller.scrollLeft != val) {
          cm.display.scroller.scrollLeft = val;
        }
        cm.display.scrollbars.setScrollLeft(val);
      }
      function measureForScrollbars(cm) {
        var d = cm.display, gutterW = d.gutters.offsetWidth;
        var docH = Math.round(cm.doc.height + paddingVert(cm.display));
        return {
          clientHeight: d.scroller.clientHeight,
          viewHeight: d.wrapper.clientHeight,
          scrollWidth: d.scroller.scrollWidth,
          clientWidth: d.scroller.clientWidth,
          viewWidth: d.wrapper.clientWidth,
          barLeft: cm.options.fixedGutter ? gutterW : 0,
          docHeight: docH,
          scrollHeight: docH + scrollGap(cm) + d.barHeight,
          nativeBarWidth: d.nativeBarWidth,
          gutterWidth: gutterW
        };
      }
      var NativeScrollbars = function(place, scroll, cm) {
        this.cm = cm;
        var vert = this.vert = elt("div", [elt("div", null, null, "min-width: 1px")], "CodeMirror-vscrollbar");
        var horiz = this.horiz = elt("div", [elt("div", null, null, "height: 100%; min-height: 1px")], "CodeMirror-hscrollbar");
        vert.tabIndex = horiz.tabIndex = -1;
        place(vert);
        place(horiz);
        on(vert, "scroll", function() {
          if (vert.clientHeight) {
            scroll(vert.scrollTop, "vertical");
          }
        });
        on(horiz, "scroll", function() {
          if (horiz.clientWidth) {
            scroll(horiz.scrollLeft, "horizontal");
          }
        });
        this.checkedZeroWidth = false;
        if (ie && ie_version < 8) {
          this.horiz.style.minHeight = this.vert.style.minWidth = "18px";
        }
      };
      NativeScrollbars.prototype.update = function(measure) {
        var needsH = measure.scrollWidth > measure.clientWidth + 1;
        var needsV = measure.scrollHeight > measure.clientHeight + 1;
        var sWidth = measure.nativeBarWidth;
        if (needsV) {
          this.vert.style.display = "block";
          this.vert.style.bottom = needsH ? sWidth + "px" : "0";
          var totalHeight = measure.viewHeight - (needsH ? sWidth : 0);
          this.vert.firstChild.style.height = Math.max(0, measure.scrollHeight - measure.clientHeight + totalHeight) + "px";
        } else {
          this.vert.scrollTop = 0;
          this.vert.style.display = "";
          this.vert.firstChild.style.height = "0";
        }
        if (needsH) {
          this.horiz.style.display = "block";
          this.horiz.style.right = needsV ? sWidth + "px" : "0";
          this.horiz.style.left = measure.barLeft + "px";
          var totalWidth = measure.viewWidth - measure.barLeft - (needsV ? sWidth : 0);
          this.horiz.firstChild.style.width = Math.max(0, measure.scrollWidth - measure.clientWidth + totalWidth) + "px";
        } else {
          this.horiz.style.display = "";
          this.horiz.firstChild.style.width = "0";
        }
        if (!this.checkedZeroWidth && measure.clientHeight > 0) {
          if (sWidth == 0) {
            this.zeroWidthHack();
          }
          this.checkedZeroWidth = true;
        }
        return { right: needsV ? sWidth : 0, bottom: needsH ? sWidth : 0 };
      };
      NativeScrollbars.prototype.setScrollLeft = function(pos) {
        if (this.horiz.scrollLeft != pos) {
          this.horiz.scrollLeft = pos;
        }
        if (this.disableHoriz) {
          this.enableZeroWidthBar(this.horiz, this.disableHoriz, "horiz");
        }
      };
      NativeScrollbars.prototype.setScrollTop = function(pos) {
        if (this.vert.scrollTop != pos) {
          this.vert.scrollTop = pos;
        }
        if (this.disableVert) {
          this.enableZeroWidthBar(this.vert, this.disableVert, "vert");
        }
      };
      NativeScrollbars.prototype.zeroWidthHack = function() {
        var w = mac && !mac_geMountainLion ? "12px" : "18px";
        this.horiz.style.height = this.vert.style.width = w;
        this.horiz.style.visibility = this.vert.style.visibility = "hidden";
        this.disableHoriz = new Delayed();
        this.disableVert = new Delayed();
      };
      NativeScrollbars.prototype.enableZeroWidthBar = function(bar, delay, type) {
        bar.style.visibility = "";
        function maybeDisable() {
          var box = bar.getBoundingClientRect();
          var elt2 = type == "vert" ? document.elementFromPoint(box.right - 1, (box.top + box.bottom) / 2) : document.elementFromPoint((box.right + box.left) / 2, box.bottom - 1);
          if (elt2 != bar) {
            bar.style.visibility = "hidden";
          } else {
            delay.set(1e3, maybeDisable);
          }
        }
        delay.set(1e3, maybeDisable);
      };
      NativeScrollbars.prototype.clear = function() {
        var parent = this.horiz.parentNode;
        parent.removeChild(this.horiz);
        parent.removeChild(this.vert);
      };
      var NullScrollbars = function() {
      };
      NullScrollbars.prototype.update = function() {
        return { bottom: 0, right: 0 };
      };
      NullScrollbars.prototype.setScrollLeft = function() {
      };
      NullScrollbars.prototype.setScrollTop = function() {
      };
      NullScrollbars.prototype.clear = function() {
      };
      function updateScrollbars(cm, measure) {
        if (!measure) {
          measure = measureForScrollbars(cm);
        }
        var startWidth = cm.display.barWidth, startHeight = cm.display.barHeight;
        updateScrollbarsInner(cm, measure);
        for (var i2 = 0; i2 < 4 && startWidth != cm.display.barWidth || startHeight != cm.display.barHeight; i2++) {
          if (startWidth != cm.display.barWidth && cm.options.lineWrapping) {
            updateHeightsInViewport(cm);
          }
          updateScrollbarsInner(cm, measureForScrollbars(cm));
          startWidth = cm.display.barWidth;
          startHeight = cm.display.barHeight;
        }
      }
      function updateScrollbarsInner(cm, measure) {
        var d = cm.display;
        var sizes = d.scrollbars.update(measure);
        d.sizer.style.paddingRight = (d.barWidth = sizes.right) + "px";
        d.sizer.style.paddingBottom = (d.barHeight = sizes.bottom) + "px";
        d.heightForcer.style.borderBottom = sizes.bottom + "px solid transparent";
        if (sizes.right && sizes.bottom) {
          d.scrollbarFiller.style.display = "block";
          d.scrollbarFiller.style.height = sizes.bottom + "px";
          d.scrollbarFiller.style.width = sizes.right + "px";
        } else {
          d.scrollbarFiller.style.display = "";
        }
        if (sizes.bottom && cm.options.coverGutterNextToScrollbar && cm.options.fixedGutter) {
          d.gutterFiller.style.display = "block";
          d.gutterFiller.style.height = sizes.bottom + "px";
          d.gutterFiller.style.width = measure.gutterWidth + "px";
        } else {
          d.gutterFiller.style.display = "";
        }
      }
      var scrollbarModel = { "native": NativeScrollbars, "null": NullScrollbars };
      function initScrollbars(cm) {
        if (cm.display.scrollbars) {
          cm.display.scrollbars.clear();
          if (cm.display.scrollbars.addClass) {
            rmClass(cm.display.wrapper, cm.display.scrollbars.addClass);
          }
        }
        cm.display.scrollbars = new scrollbarModel[cm.options.scrollbarStyle](function(node) {
          cm.display.wrapper.insertBefore(node, cm.display.scrollbarFiller);
          on(node, "mousedown", function() {
            if (cm.state.focused) {
              setTimeout(function() {
                return cm.display.input.focus();
              }, 0);
            }
          });
          node.setAttribute("cm-not-content", "true");
        }, function(pos, axis) {
          if (axis == "horizontal") {
            setScrollLeft(cm, pos);
          } else {
            updateScrollTop(cm, pos);
          }
        }, cm);
        if (cm.display.scrollbars.addClass) {
          addClass(cm.display.wrapper, cm.display.scrollbars.addClass);
        }
      }
      var nextOpId = 0;
      function startOperation(cm) {
        cm.curOp = {
          cm,
          viewChanged: false,
          // Flag that indicates that lines might need to be redrawn
          startHeight: cm.doc.height,
          // Used to detect need to update scrollbar
          forceUpdate: false,
          // Used to force a redraw
          updateInput: 0,
          // Whether to reset the input textarea
          typing: false,
          // Whether this reset should be careful to leave existing text (for compositing)
          changeObjs: null,
          // Accumulated changes, for firing change events
          cursorActivityHandlers: null,
          // Set of handlers to fire cursorActivity on
          cursorActivityCalled: 0,
          // Tracks which cursorActivity handlers have been called already
          selectionChanged: false,
          // Whether the selection needs to be redrawn
          updateMaxLine: false,
          // Set when the widest line needs to be determined anew
          scrollLeft: null,
          scrollTop: null,
          // Intermediate scroll position, not pushed to DOM yet
          scrollToPos: null,
          // Used to scroll to a specific position
          focus: false,
          id: ++nextOpId,
          // Unique ID
          markArrays: null
          // Used by addMarkedSpan
        };
        pushOperation(cm.curOp);
      }
      function endOperation(cm) {
        var op = cm.curOp;
        if (op) {
          finishOperation(op, function(group) {
            for (var i2 = 0; i2 < group.ops.length; i2++) {
              group.ops[i2].cm.curOp = null;
            }
            endOperations(group);
          });
        }
      }
      function endOperations(group) {
        var ops = group.ops;
        for (var i2 = 0; i2 < ops.length; i2++) {
          endOperation_R1(ops[i2]);
        }
        for (var i$12 = 0; i$12 < ops.length; i$12++) {
          endOperation_W1(ops[i$12]);
        }
        for (var i$22 = 0; i$22 < ops.length; i$22++) {
          endOperation_R2(ops[i$22]);
        }
        for (var i$3 = 0; i$3 < ops.length; i$3++) {
          endOperation_W2(ops[i$3]);
        }
        for (var i$4 = 0; i$4 < ops.length; i$4++) {
          endOperation_finish(ops[i$4]);
        }
      }
      function endOperation_R1(op) {
        var cm = op.cm, display = cm.display;
        maybeClipScrollbars(cm);
        if (op.updateMaxLine) {
          findMaxLine(cm);
        }
        op.mustUpdate = op.viewChanged || op.forceUpdate || op.scrollTop != null || op.scrollToPos && (op.scrollToPos.from.line < display.viewFrom || op.scrollToPos.to.line >= display.viewTo) || display.maxLineChanged && cm.options.lineWrapping;
        op.update = op.mustUpdate && new DisplayUpdate(cm, op.mustUpdate && { top: op.scrollTop, ensure: op.scrollToPos }, op.forceUpdate);
      }
      function endOperation_W1(op) {
        op.updatedDisplay = op.mustUpdate && updateDisplayIfNeeded(op.cm, op.update);
      }
      function endOperation_R2(op) {
        var cm = op.cm, display = cm.display;
        if (op.updatedDisplay) {
          updateHeightsInViewport(cm);
        }
        op.barMeasure = measureForScrollbars(cm);
        if (display.maxLineChanged && !cm.options.lineWrapping) {
          op.adjustWidthTo = measureChar(cm, display.maxLine, display.maxLine.text.length).left + 3;
          cm.display.sizerWidth = op.adjustWidthTo;
          op.barMeasure.scrollWidth = Math.max(display.scroller.clientWidth, display.sizer.offsetLeft + op.adjustWidthTo + scrollGap(cm) + cm.display.barWidth);
          op.maxScrollLeft = Math.max(0, display.sizer.offsetLeft + op.adjustWidthTo - displayWidth(cm));
        }
        if (op.updatedDisplay || op.selectionChanged) {
          op.preparedSelection = display.input.prepareSelection();
        }
      }
      function endOperation_W2(op) {
        var cm = op.cm;
        if (op.adjustWidthTo != null) {
          cm.display.sizer.style.minWidth = op.adjustWidthTo + "px";
          if (op.maxScrollLeft < cm.doc.scrollLeft) {
            setScrollLeft(cm, Math.min(cm.display.scroller.scrollLeft, op.maxScrollLeft), true);
          }
          cm.display.maxLineChanged = false;
        }
        var takeFocus = op.focus && op.focus == activeElt(doc(cm));
        if (op.preparedSelection) {
          cm.display.input.showSelection(op.preparedSelection, takeFocus);
        }
        if (op.updatedDisplay || op.startHeight != cm.doc.height) {
          updateScrollbars(cm, op.barMeasure);
        }
        if (op.updatedDisplay) {
          setDocumentHeight(cm, op.barMeasure);
        }
        if (op.selectionChanged) {
          restartBlink(cm);
        }
        if (cm.state.focused && op.updateInput) {
          cm.display.input.reset(op.typing);
        }
        if (takeFocus) {
          ensureFocus(op.cm);
        }
      }
      function endOperation_finish(op) {
        var cm = op.cm, display = cm.display, doc2 = cm.doc;
        if (op.updatedDisplay) {
          postUpdateDisplay(cm, op.update);
        }
        if (display.wheelStartX != null && (op.scrollTop != null || op.scrollLeft != null || op.scrollToPos)) {
          display.wheelStartX = display.wheelStartY = null;
        }
        if (op.scrollTop != null) {
          setScrollTop(cm, op.scrollTop, op.forceScroll);
        }
        if (op.scrollLeft != null) {
          setScrollLeft(cm, op.scrollLeft, true, true);
        }
        if (op.scrollToPos) {
          var rect = scrollPosIntoView(
            cm,
            clipPos(doc2, op.scrollToPos.from),
            clipPos(doc2, op.scrollToPos.to),
            op.scrollToPos.margin
          );
          maybeScrollWindow(cm, rect);
        }
        var hidden = op.maybeHiddenMarkers, unhidden = op.maybeUnhiddenMarkers;
        if (hidden) {
          for (var i2 = 0; i2 < hidden.length; ++i2) {
            if (!hidden[i2].lines.length) {
              signal(hidden[i2], "hide");
            }
          }
        }
        if (unhidden) {
          for (var i$12 = 0; i$12 < unhidden.length; ++i$12) {
            if (unhidden[i$12].lines.length) {
              signal(unhidden[i$12], "unhide");
            }
          }
        }
        if (display.wrapper.offsetHeight) {
          doc2.scrollTop = cm.display.scroller.scrollTop;
        }
        if (op.changeObjs) {
          signal(cm, "changes", cm, op.changeObjs);
        }
        if (op.update) {
          op.update.finish();
        }
      }
      function runInOp(cm, f) {
        if (cm.curOp) {
          return f();
        }
        startOperation(cm);
        try {
          return f();
        } finally {
          endOperation(cm);
        }
      }
      function operation(cm, f) {
        return function() {
          if (cm.curOp) {
            return f.apply(cm, arguments);
          }
          startOperation(cm);
          try {
            return f.apply(cm, arguments);
          } finally {
            endOperation(cm);
          }
        };
      }
      function methodOp(f) {
        return function() {
          if (this.curOp) {
            return f.apply(this, arguments);
          }
          startOperation(this);
          try {
            return f.apply(this, arguments);
          } finally {
            endOperation(this);
          }
        };
      }
      function docMethodOp(f) {
        return function() {
          var cm = this.cm;
          if (!cm || cm.curOp) {
            return f.apply(this, arguments);
          }
          startOperation(cm);
          try {
            return f.apply(this, arguments);
          } finally {
            endOperation(cm);
          }
        };
      }
      function startWorker(cm, time) {
        if (cm.doc.highlightFrontier < cm.display.viewTo) {
          cm.state.highlight.set(time, bind(highlightWorker, cm));
        }
      }
      function highlightWorker(cm) {
        var doc2 = cm.doc;
        if (doc2.highlightFrontier >= cm.display.viewTo) {
          return;
        }
        var end = +new Date() + cm.options.workTime;
        var context = getContextBefore(cm, doc2.highlightFrontier);
        var changedLines = [];
        doc2.iter(context.line, Math.min(doc2.first + doc2.size, cm.display.viewTo + 500), function(line) {
          if (context.line >= cm.display.viewFrom) {
            var oldStyles = line.styles;
            var resetState = line.text.length > cm.options.maxHighlightLength ? copyState(doc2.mode, context.state) : null;
            var highlighted = highlightLine(cm, line, context, true);
            if (resetState) {
              context.state = resetState;
            }
            line.styles = highlighted.styles;
            var oldCls = line.styleClasses, newCls = highlighted.classes;
            if (newCls) {
              line.styleClasses = newCls;
            } else if (oldCls) {
              line.styleClasses = null;
            }
            var ischange = !oldStyles || oldStyles.length != line.styles.length || oldCls != newCls && (!oldCls || !newCls || oldCls.bgClass != newCls.bgClass || oldCls.textClass != newCls.textClass);
            for (var i2 = 0; !ischange && i2 < oldStyles.length; ++i2) {
              ischange = oldStyles[i2] != line.styles[i2];
            }
            if (ischange) {
              changedLines.push(context.line);
            }
            line.stateAfter = context.save();
            context.nextLine();
          } else {
            if (line.text.length <= cm.options.maxHighlightLength) {
              processLine(cm, line.text, context);
            }
            line.stateAfter = context.line % 5 == 0 ? context.save() : null;
            context.nextLine();
          }
          if (+new Date() > end) {
            startWorker(cm, cm.options.workDelay);
            return true;
          }
        });
        doc2.highlightFrontier = context.line;
        doc2.modeFrontier = Math.max(doc2.modeFrontier, context.line);
        if (changedLines.length) {
          runInOp(cm, function() {
            for (var i2 = 0; i2 < changedLines.length; i2++) {
              regLineChange(cm, changedLines[i2], "text");
            }
          });
        }
      }
      var DisplayUpdate = function(cm, viewport, force) {
        var display = cm.display;
        this.viewport = viewport;
        this.visible = visibleLines(display, cm.doc, viewport);
        this.editorIsHidden = !display.wrapper.offsetWidth;
        this.wrapperHeight = display.wrapper.clientHeight;
        this.wrapperWidth = display.wrapper.clientWidth;
        this.oldDisplayWidth = displayWidth(cm);
        this.force = force;
        this.dims = getDimensions(cm);
        this.events = [];
      };
      DisplayUpdate.prototype.signal = function(emitter, type) {
        if (hasHandler(emitter, type)) {
          this.events.push(arguments);
        }
      };
      DisplayUpdate.prototype.finish = function() {
        for (var i2 = 0; i2 < this.events.length; i2++) {
          signal.apply(null, this.events[i2]);
        }
      };
      function maybeClipScrollbars(cm) {
        var display = cm.display;
        if (!display.scrollbarsClipped && display.scroller.offsetWidth) {
          display.nativeBarWidth = display.scroller.offsetWidth - display.scroller.clientWidth;
          display.heightForcer.style.height = scrollGap(cm) + "px";
          display.sizer.style.marginBottom = -display.nativeBarWidth + "px";
          display.sizer.style.borderRightWidth = scrollGap(cm) + "px";
          display.scrollbarsClipped = true;
        }
      }
      function selectionSnapshot(cm) {
        if (cm.hasFocus()) {
          return null;
        }
        var active = activeElt(doc(cm));
        if (!active || !contains(cm.display.lineDiv, active)) {
          return null;
        }
        var result = { activeElt: active };
        if (window.getSelection) {
          var sel = win(cm).getSelection();
          if (sel.anchorNode && sel.extend && contains(cm.display.lineDiv, sel.anchorNode)) {
            result.anchorNode = sel.anchorNode;
            result.anchorOffset = sel.anchorOffset;
            result.focusNode = sel.focusNode;
            result.focusOffset = sel.focusOffset;
          }
        }
        return result;
      }
      function restoreSelection(snapshot) {
        if (!snapshot || !snapshot.activeElt || snapshot.activeElt == activeElt(snapshot.activeElt.ownerDocument)) {
          return;
        }
        snapshot.activeElt.focus();
        if (!/^(INPUT|TEXTAREA)$/.test(snapshot.activeElt.nodeName) && snapshot.anchorNode && contains(document.body, snapshot.anchorNode) && contains(document.body, snapshot.focusNode)) {
          var doc2 = snapshot.activeElt.ownerDocument;
          var sel = doc2.defaultView.getSelection(), range2 = doc2.createRange();
          range2.setEnd(snapshot.anchorNode, snapshot.anchorOffset);
          range2.collapse(false);
          sel.removeAllRanges();
          sel.addRange(range2);
          sel.extend(snapshot.focusNode, snapshot.focusOffset);
        }
      }
      function updateDisplayIfNeeded(cm, update) {
        var display = cm.display, doc2 = cm.doc;
        if (update.editorIsHidden) {
          resetView(cm);
          return false;
        }
        if (!update.force && update.visible.from >= display.viewFrom && update.visible.to <= display.viewTo && (display.updateLineNumbers == null || display.updateLineNumbers >= display.viewTo) && display.renderedView == display.view && countDirtyView(cm) == 0) {
          return false;
        }
        if (maybeUpdateLineNumberWidth(cm)) {
          resetView(cm);
          update.dims = getDimensions(cm);
        }
        var end = doc2.first + doc2.size;
        var from = Math.max(update.visible.from - cm.options.viewportMargin, doc2.first);
        var to = Math.min(end, update.visible.to + cm.options.viewportMargin);
        if (display.viewFrom < from && from - display.viewFrom < 20) {
          from = Math.max(doc2.first, display.viewFrom);
        }
        if (display.viewTo > to && display.viewTo - to < 20) {
          to = Math.min(end, display.viewTo);
        }
        if (sawCollapsedSpans) {
          from = visualLineNo(cm.doc, from);
          to = visualLineEndNo(cm.doc, to);
        }
        var different = from != display.viewFrom || to != display.viewTo || display.lastWrapHeight != update.wrapperHeight || display.lastWrapWidth != update.wrapperWidth;
        adjustView(cm, from, to);
        display.viewOffset = heightAtLine(getLine(cm.doc, display.viewFrom));
        cm.display.mover.style.top = display.viewOffset + "px";
        var toUpdate = countDirtyView(cm);
        if (!different && toUpdate == 0 && !update.force && display.renderedView == display.view && (display.updateLineNumbers == null || display.updateLineNumbers >= display.viewTo)) {
          return false;
        }
        var selSnapshot = selectionSnapshot(cm);
        if (toUpdate > 4) {
          display.lineDiv.style.display = "none";
        }
        patchDisplay(cm, display.updateLineNumbers, update.dims);
        if (toUpdate > 4) {
          display.lineDiv.style.display = "";
        }
        display.renderedView = display.view;
        restoreSelection(selSnapshot);
        removeChildren(display.cursorDiv);
        removeChildren(display.selectionDiv);
        display.gutters.style.height = display.sizer.style.minHeight = 0;
        if (different) {
          display.lastWrapHeight = update.wrapperHeight;
          display.lastWrapWidth = update.wrapperWidth;
          startWorker(cm, 400);
        }
        display.updateLineNumbers = null;
        return true;
      }
      function postUpdateDisplay(cm, update) {
        var viewport = update.viewport;
        for (var first = true; ; first = false) {
          if (!first || !cm.options.lineWrapping || update.oldDisplayWidth == displayWidth(cm)) {
            if (viewport && viewport.top != null) {
              viewport = { top: Math.min(cm.doc.height + paddingVert(cm.display) - displayHeight(cm), viewport.top) };
            }
            update.visible = visibleLines(cm.display, cm.doc, viewport);
            if (update.visible.from >= cm.display.viewFrom && update.visible.to <= cm.display.viewTo) {
              break;
            }
          } else if (first) {
            update.visible = visibleLines(cm.display, cm.doc, viewport);
          }
          if (!updateDisplayIfNeeded(cm, update)) {
            break;
          }
          updateHeightsInViewport(cm);
          var barMeasure = measureForScrollbars(cm);
          updateSelection(cm);
          updateScrollbars(cm, barMeasure);
          setDocumentHeight(cm, barMeasure);
          update.force = false;
        }
        update.signal(cm, "update", cm);
        if (cm.display.viewFrom != cm.display.reportedViewFrom || cm.display.viewTo != cm.display.reportedViewTo) {
          update.signal(cm, "viewportChange", cm, cm.display.viewFrom, cm.display.viewTo);
          cm.display.reportedViewFrom = cm.display.viewFrom;
          cm.display.reportedViewTo = cm.display.viewTo;
        }
      }
      function updateDisplaySimple(cm, viewport) {
        var update = new DisplayUpdate(cm, viewport);
        if (updateDisplayIfNeeded(cm, update)) {
          updateHeightsInViewport(cm);
          postUpdateDisplay(cm, update);
          var barMeasure = measureForScrollbars(cm);
          updateSelection(cm);
          updateScrollbars(cm, barMeasure);
          setDocumentHeight(cm, barMeasure);
          update.finish();
        }
      }
      function patchDisplay(cm, updateNumbersFrom, dims) {
        var display = cm.display, lineNumbers = cm.options.lineNumbers;
        var container = display.lineDiv, cur = container.firstChild;
        function rm(node2) {
          var next = node2.nextSibling;
          if (webkit && mac && cm.display.currentWheelTarget == node2) {
            node2.style.display = "none";
          } else {
            node2.parentNode.removeChild(node2);
          }
          return next;
        }
        var view = display.view, lineN = display.viewFrom;
        for (var i2 = 0; i2 < view.length; i2++) {
          var lineView = view[i2];
          if (lineView.hidden)
            ;
          else if (!lineView.node || lineView.node.parentNode != container) {
            var node = buildLineElement(cm, lineView, lineN, dims);
            container.insertBefore(node, cur);
          } else {
            while (cur != lineView.node) {
              cur = rm(cur);
            }
            var updateNumber = lineNumbers && updateNumbersFrom != null && updateNumbersFrom <= lineN && lineView.lineNumber;
            if (lineView.changes) {
              if (indexOf(lineView.changes, "gutter") > -1) {
                updateNumber = false;
              }
              updateLineForChanges(cm, lineView, lineN, dims);
            }
            if (updateNumber) {
              removeChildren(lineView.lineNumber);
              lineView.lineNumber.appendChild(document.createTextNode(lineNumberFor(cm.options, lineN)));
            }
            cur = lineView.node.nextSibling;
          }
          lineN += lineView.size;
        }
        while (cur) {
          cur = rm(cur);
        }
      }
      function updateGutterSpace(display) {
        var width = display.gutters.offsetWidth;
        display.sizer.style.marginLeft = width + "px";
        signalLater(display, "gutterChanged", display);
      }
      function setDocumentHeight(cm, measure) {
        cm.display.sizer.style.minHeight = measure.docHeight + "px";
        cm.display.heightForcer.style.top = measure.docHeight + "px";
        cm.display.gutters.style.height = measure.docHeight + cm.display.barHeight + scrollGap(cm) + "px";
      }
      function alignHorizontally(cm) {
        var display = cm.display, view = display.view;
        if (!display.alignWidgets && (!display.gutters.firstChild || !cm.options.fixedGutter)) {
          return;
        }
        var comp = compensateForHScroll(display) - display.scroller.scrollLeft + cm.doc.scrollLeft;
        var gutterW = display.gutters.offsetWidth, left = comp + "px";
        for (var i2 = 0; i2 < view.length; i2++) {
          if (!view[i2].hidden) {
            if (cm.options.fixedGutter) {
              if (view[i2].gutter) {
                view[i2].gutter.style.left = left;
              }
              if (view[i2].gutterBackground) {
                view[i2].gutterBackground.style.left = left;
              }
            }
            var align = view[i2].alignable;
            if (align) {
              for (var j = 0; j < align.length; j++) {
                align[j].style.left = left;
              }
            }
          }
        }
        if (cm.options.fixedGutter) {
          display.gutters.style.left = comp + gutterW + "px";
        }
      }
      function maybeUpdateLineNumberWidth(cm) {
        if (!cm.options.lineNumbers) {
          return false;
        }
        var doc2 = cm.doc, last = lineNumberFor(cm.options, doc2.first + doc2.size - 1), display = cm.display;
        if (last.length != display.lineNumChars) {
          var test = display.measure.appendChild(elt(
            "div",
            [elt("div", last)],
            "CodeMirror-linenumber CodeMirror-gutter-elt"
          ));
          var innerW = test.firstChild.offsetWidth, padding = test.offsetWidth - innerW;
          display.lineGutter.style.width = "";
          display.lineNumInnerWidth = Math.max(innerW, display.lineGutter.offsetWidth - padding) + 1;
          display.lineNumWidth = display.lineNumInnerWidth + padding;
          display.lineNumChars = display.lineNumInnerWidth ? last.length : -1;
          display.lineGutter.style.width = display.lineNumWidth + "px";
          updateGutterSpace(cm.display);
          return true;
        }
        return false;
      }
      function getGutters(gutters, lineNumbers) {
        var result = [], sawLineNumbers = false;
        for (var i2 = 0; i2 < gutters.length; i2++) {
          var name = gutters[i2], style = null;
          if (typeof name != "string") {
            style = name.style;
            name = name.className;
          }
          if (name == "CodeMirror-linenumbers") {
            if (!lineNumbers) {
              continue;
            } else {
              sawLineNumbers = true;
            }
          }
          result.push({ className: name, style });
        }
        if (lineNumbers && !sawLineNumbers) {
          result.push({ className: "CodeMirror-linenumbers", style: null });
        }
        return result;
      }
      function renderGutters(display) {
        var gutters = display.gutters, specs = display.gutterSpecs;
        removeChildren(gutters);
        display.lineGutter = null;
        for (var i2 = 0; i2 < specs.length; ++i2) {
          var ref = specs[i2];
          var className = ref.className;
          var style = ref.style;
          var gElt = gutters.appendChild(elt("div", null, "CodeMirror-gutter " + className));
          if (style) {
            gElt.style.cssText = style;
          }
          if (className == "CodeMirror-linenumbers") {
            display.lineGutter = gElt;
            gElt.style.width = (display.lineNumWidth || 1) + "px";
          }
        }
        gutters.style.display = specs.length ? "" : "none";
        updateGutterSpace(display);
      }
      function updateGutters(cm) {
        renderGutters(cm.display);
        regChange(cm);
        alignHorizontally(cm);
      }
      function Display(place, doc2, input, options) {
        var d = this;
        this.input = input;
        d.scrollbarFiller = elt("div", null, "CodeMirror-scrollbar-filler");
        d.scrollbarFiller.setAttribute("cm-not-content", "true");
        d.gutterFiller = elt("div", null, "CodeMirror-gutter-filler");
        d.gutterFiller.setAttribute("cm-not-content", "true");
        d.lineDiv = eltP("div", null, "CodeMirror-code");
        d.selectionDiv = elt("div", null, null, "position: relative; z-index: 1");
        d.cursorDiv = elt("div", null, "CodeMirror-cursors");
        d.measure = elt("div", null, "CodeMirror-measure");
        d.lineMeasure = elt("div", null, "CodeMirror-measure");
        d.lineSpace = eltP(
          "div",
          [d.measure, d.lineMeasure, d.selectionDiv, d.cursorDiv, d.lineDiv],
          null,
          "position: relative; outline: none"
        );
        var lines = eltP("div", [d.lineSpace], "CodeMirror-lines");
        d.mover = elt("div", [lines], null, "position: relative");
        d.sizer = elt("div", [d.mover], "CodeMirror-sizer");
        d.sizerWidth = null;
        d.heightForcer = elt("div", null, null, "position: absolute; height: " + scrollerGap + "px; width: 1px;");
        d.gutters = elt("div", null, "CodeMirror-gutters");
        d.lineGutter = null;
        d.scroller = elt("div", [d.sizer, d.heightForcer, d.gutters], "CodeMirror-scroll");
        d.scroller.setAttribute("tabIndex", "-1");
        d.wrapper = elt("div", [d.scrollbarFiller, d.gutterFiller, d.scroller], "CodeMirror");
        if (chrome && chrome_version >= 105) {
          d.wrapper.style.clipPath = "inset(0px)";
        }
        d.wrapper.setAttribute("translate", "no");
        if (ie && ie_version < 8) {
          d.gutters.style.zIndex = -1;
          d.scroller.style.paddingRight = 0;
        }
        if (!webkit && !(gecko && mobile)) {
          d.scroller.draggable = true;
        }
        if (place) {
          if (place.appendChild) {
            place.appendChild(d.wrapper);
          } else {
            place(d.wrapper);
          }
        }
        d.viewFrom = d.viewTo = doc2.first;
        d.reportedViewFrom = d.reportedViewTo = doc2.first;
        d.view = [];
        d.renderedView = null;
        d.externalMeasured = null;
        d.viewOffset = 0;
        d.lastWrapHeight = d.lastWrapWidth = 0;
        d.updateLineNumbers = null;
        d.nativeBarWidth = d.barHeight = d.barWidth = 0;
        d.scrollbarsClipped = false;
        d.lineNumWidth = d.lineNumInnerWidth = d.lineNumChars = null;
        d.alignWidgets = false;
        d.cachedCharWidth = d.cachedTextHeight = d.cachedPaddingH = null;
        d.maxLine = null;
        d.maxLineLength = 0;
        d.maxLineChanged = false;
        d.wheelDX = d.wheelDY = d.wheelStartX = d.wheelStartY = null;
        d.shift = false;
        d.selForContextMenu = null;
        d.activeTouch = null;
        d.gutterSpecs = getGutters(options.gutters, options.lineNumbers);
        renderGutters(d);
        input.init(d);
      }
      var wheelSamples = 0, wheelPixelsPerUnit = null;
      if (ie) {
        wheelPixelsPerUnit = -0.53;
      } else if (gecko) {
        wheelPixelsPerUnit = 15;
      } else if (chrome) {
        wheelPixelsPerUnit = -0.7;
      } else if (safari) {
        wheelPixelsPerUnit = -1 / 3;
      }
      function wheelEventDelta(e) {
        var dx = e.wheelDeltaX, dy = e.wheelDeltaY;
        if (dx == null && e.detail && e.axis == e.HORIZONTAL_AXIS) {
          dx = e.detail;
        }
        if (dy == null && e.detail && e.axis == e.VERTICAL_AXIS) {
          dy = e.detail;
        } else if (dy == null) {
          dy = e.wheelDelta;
        }
        return { x: dx, y: dy };
      }
      function wheelEventPixels(e) {
        var delta = wheelEventDelta(e);
        delta.x *= wheelPixelsPerUnit;
        delta.y *= wheelPixelsPerUnit;
        return delta;
      }
      function onScrollWheel(cm, e) {
        if (chrome && chrome_version == 102) {
          if (cm.display.chromeScrollHack == null) {
            cm.display.sizer.style.pointerEvents = "none";
          } else {
            clearTimeout(cm.display.chromeScrollHack);
          }
          cm.display.chromeScrollHack = setTimeout(function() {
            cm.display.chromeScrollHack = null;
            cm.display.sizer.style.pointerEvents = "";
          }, 100);
        }
        var delta = wheelEventDelta(e), dx = delta.x, dy = delta.y;
        var pixelsPerUnit = wheelPixelsPerUnit;
        if (e.deltaMode === 0) {
          dx = e.deltaX;
          dy = e.deltaY;
          pixelsPerUnit = 1;
        }
        var display = cm.display, scroll = display.scroller;
        var canScrollX = scroll.scrollWidth > scroll.clientWidth;
        var canScrollY = scroll.scrollHeight > scroll.clientHeight;
        if (!(dx && canScrollX || dy && canScrollY)) {
          return;
        }
        if (dy && mac && webkit) {
          outer:
            for (var cur = e.target, view = display.view; cur != scroll; cur = cur.parentNode) {
              for (var i2 = 0; i2 < view.length; i2++) {
                if (view[i2].node == cur) {
                  cm.display.currentWheelTarget = cur;
                  break outer;
                }
              }
            }
        }
        if (dx && !gecko && !presto && pixelsPerUnit != null) {
          if (dy && canScrollY) {
            updateScrollTop(cm, Math.max(0, scroll.scrollTop + dy * pixelsPerUnit));
          }
          setScrollLeft(cm, Math.max(0, scroll.scrollLeft + dx * pixelsPerUnit));
          if (!dy || dy && canScrollY) {
            e_preventDefault(e);
          }
          display.wheelStartX = null;
          return;
        }
        if (dy && pixelsPerUnit != null) {
          var pixels = dy * pixelsPerUnit;
          var top = cm.doc.scrollTop, bot = top + display.wrapper.clientHeight;
          if (pixels < 0) {
            top = Math.max(0, top + pixels - 50);
          } else {
            bot = Math.min(cm.doc.height, bot + pixels + 50);
          }
          updateDisplaySimple(cm, { top, bottom: bot });
        }
        if (wheelSamples < 20 && e.deltaMode !== 0) {
          if (display.wheelStartX == null) {
            display.wheelStartX = scroll.scrollLeft;
            display.wheelStartY = scroll.scrollTop;
            display.wheelDX = dx;
            display.wheelDY = dy;
            setTimeout(function() {
              if (display.wheelStartX == null) {
                return;
              }
              var movedX = scroll.scrollLeft - display.wheelStartX;
              var movedY = scroll.scrollTop - display.wheelStartY;
              var sample = movedY && display.wheelDY && movedY / display.wheelDY || movedX && display.wheelDX && movedX / display.wheelDX;
              display.wheelStartX = display.wheelStartY = null;
              if (!sample) {
                return;
              }
              wheelPixelsPerUnit = (wheelPixelsPerUnit * wheelSamples + sample) / (wheelSamples + 1);
              ++wheelSamples;
            }, 200);
          } else {
            display.wheelDX += dx;
            display.wheelDY += dy;
          }
        }
      }
      var Selection = function(ranges, primIndex) {
        this.ranges = ranges;
        this.primIndex = primIndex;
      };
      Selection.prototype.primary = function() {
        return this.ranges[this.primIndex];
      };
      Selection.prototype.equals = function(other) {
        if (other == this) {
          return true;
        }
        if (other.primIndex != this.primIndex || other.ranges.length != this.ranges.length) {
          return false;
        }
        for (var i2 = 0; i2 < this.ranges.length; i2++) {
          var here = this.ranges[i2], there = other.ranges[i2];
          if (!equalCursorPos(here.anchor, there.anchor) || !equalCursorPos(here.head, there.head)) {
            return false;
          }
        }
        return true;
      };
      Selection.prototype.deepCopy = function() {
        var out = [];
        for (var i2 = 0; i2 < this.ranges.length; i2++) {
          out[i2] = new Range(copyPos(this.ranges[i2].anchor), copyPos(this.ranges[i2].head));
        }
        return new Selection(out, this.primIndex);
      };
      Selection.prototype.somethingSelected = function() {
        for (var i2 = 0; i2 < this.ranges.length; i2++) {
          if (!this.ranges[i2].empty()) {
            return true;
          }
        }
        return false;
      };
      Selection.prototype.contains = function(pos, end) {
        if (!end) {
          end = pos;
        }
        for (var i2 = 0; i2 < this.ranges.length; i2++) {
          var range2 = this.ranges[i2];
          if (cmp(end, range2.from()) >= 0 && cmp(pos, range2.to()) <= 0) {
            return i2;
          }
        }
        return -1;
      };
      var Range = function(anchor, head) {
        this.anchor = anchor;
        this.head = head;
      };
      Range.prototype.from = function() {
        return minPos(this.anchor, this.head);
      };
      Range.prototype.to = function() {
        return maxPos(this.anchor, this.head);
      };
      Range.prototype.empty = function() {
        return this.head.line == this.anchor.line && this.head.ch == this.anchor.ch;
      };
      function normalizeSelection(cm, ranges, primIndex) {
        var mayTouch = cm && cm.options.selectionsMayTouch;
        var prim = ranges[primIndex];
        ranges.sort(function(a, b) {
          return cmp(a.from(), b.from());
        });
        primIndex = indexOf(ranges, prim);
        for (var i2 = 1; i2 < ranges.length; i2++) {
          var cur = ranges[i2], prev = ranges[i2 - 1];
          var diff = cmp(prev.to(), cur.from());
          if (mayTouch && !cur.empty() ? diff > 0 : diff >= 0) {
            var from = minPos(prev.from(), cur.from()), to = maxPos(prev.to(), cur.to());
            var inv = prev.empty() ? cur.from() == cur.head : prev.from() == prev.head;
            if (i2 <= primIndex) {
              --primIndex;
            }
            ranges.splice(--i2, 2, new Range(inv ? to : from, inv ? from : to));
          }
        }
        return new Selection(ranges, primIndex);
      }
      function simpleSelection(anchor, head) {
        return new Selection([new Range(anchor, head || anchor)], 0);
      }
      function changeEnd(change) {
        if (!change.text) {
          return change.to;
        }
        return Pos(
          change.from.line + change.text.length - 1,
          lst(change.text).length + (change.text.length == 1 ? change.from.ch : 0)
        );
      }
      function adjustForChange(pos, change) {
        if (cmp(pos, change.from) < 0) {
          return pos;
        }
        if (cmp(pos, change.to) <= 0) {
          return changeEnd(change);
        }
        var line = pos.line + change.text.length - (change.to.line - change.from.line) - 1, ch = pos.ch;
        if (pos.line == change.to.line) {
          ch += changeEnd(change).ch - change.to.ch;
        }
        return Pos(line, ch);
      }
      function computeSelAfterChange(doc2, change) {
        var out = [];
        for (var i2 = 0; i2 < doc2.sel.ranges.length; i2++) {
          var range2 = doc2.sel.ranges[i2];
          out.push(new Range(
            adjustForChange(range2.anchor, change),
            adjustForChange(range2.head, change)
          ));
        }
        return normalizeSelection(doc2.cm, out, doc2.sel.primIndex);
      }
      function offsetPos(pos, old, nw) {
        if (pos.line == old.line) {
          return Pos(nw.line, pos.ch - old.ch + nw.ch);
        } else {
          return Pos(nw.line + (pos.line - old.line), pos.ch);
        }
      }
      function computeReplacedSel(doc2, changes, hint) {
        var out = [];
        var oldPrev = Pos(doc2.first, 0), newPrev = oldPrev;
        for (var i2 = 0; i2 < changes.length; i2++) {
          var change = changes[i2];
          var from = offsetPos(change.from, oldPrev, newPrev);
          var to = offsetPos(changeEnd(change), oldPrev, newPrev);
          oldPrev = change.to;
          newPrev = to;
          if (hint == "around") {
            var range2 = doc2.sel.ranges[i2], inv = cmp(range2.head, range2.anchor) < 0;
            out[i2] = new Range(inv ? to : from, inv ? from : to);
          } else {
            out[i2] = new Range(from, from);
          }
        }
        return new Selection(out, doc2.sel.primIndex);
      }
      function loadMode(cm) {
        cm.doc.mode = getMode2(cm.options, cm.doc.modeOption);
        resetModeState(cm);
      }
      function resetModeState(cm) {
        cm.doc.iter(function(line) {
          if (line.stateAfter) {
            line.stateAfter = null;
          }
          if (line.styles) {
            line.styles = null;
          }
        });
        cm.doc.modeFrontier = cm.doc.highlightFrontier = cm.doc.first;
        startWorker(cm, 100);
        cm.state.modeGen++;
        if (cm.curOp) {
          regChange(cm);
        }
      }
      function isWholeLineUpdate(doc2, change) {
        return change.from.ch == 0 && change.to.ch == 0 && lst(change.text) == "" && (!doc2.cm || doc2.cm.options.wholeLineUpdateBefore);
      }
      function updateDoc(doc2, change, markedSpans, estimateHeight2) {
        function spansFor(n) {
          return markedSpans ? markedSpans[n] : null;
        }
        function update(line, text2, spans) {
          updateLine(line, text2, spans, estimateHeight2);
          signalLater(line, "change", line, change);
        }
        function linesFor(start, end) {
          var result = [];
          for (var i2 = start; i2 < end; ++i2) {
            result.push(new Line(text[i2], spansFor(i2), estimateHeight2));
          }
          return result;
        }
        var from = change.from, to = change.to, text = change.text;
        var firstLine = getLine(doc2, from.line), lastLine = getLine(doc2, to.line);
        var lastText = lst(text), lastSpans = spansFor(text.length - 1), nlines = to.line - from.line;
        if (change.full) {
          doc2.insert(0, linesFor(0, text.length));
          doc2.remove(text.length, doc2.size - text.length);
        } else if (isWholeLineUpdate(doc2, change)) {
          var added = linesFor(0, text.length - 1);
          update(lastLine, lastLine.text, lastSpans);
          if (nlines) {
            doc2.remove(from.line, nlines);
          }
          if (added.length) {
            doc2.insert(from.line, added);
          }
        } else if (firstLine == lastLine) {
          if (text.length == 1) {
            update(firstLine, firstLine.text.slice(0, from.ch) + lastText + firstLine.text.slice(to.ch), lastSpans);
          } else {
            var added$1 = linesFor(1, text.length - 1);
            added$1.push(new Line(lastText + firstLine.text.slice(to.ch), lastSpans, estimateHeight2));
            update(firstLine, firstLine.text.slice(0, from.ch) + text[0], spansFor(0));
            doc2.insert(from.line + 1, added$1);
          }
        } else if (text.length == 1) {
          update(firstLine, firstLine.text.slice(0, from.ch) + text[0] + lastLine.text.slice(to.ch), spansFor(0));
          doc2.remove(from.line + 1, nlines);
        } else {
          update(firstLine, firstLine.text.slice(0, from.ch) + text[0], spansFor(0));
          update(lastLine, lastText + lastLine.text.slice(to.ch), lastSpans);
          var added$2 = linesFor(1, text.length - 1);
          if (nlines > 1) {
            doc2.remove(from.line + 1, nlines - 1);
          }
          doc2.insert(from.line + 1, added$2);
        }
        signalLater(doc2, "change", doc2, change);
      }
      function linkedDocs(doc2, f, sharedHistOnly) {
        function propagate(doc3, skip, sharedHist) {
          if (doc3.linked) {
            for (var i2 = 0; i2 < doc3.linked.length; ++i2) {
              var rel = doc3.linked[i2];
              if (rel.doc == skip) {
                continue;
              }
              var shared = sharedHist && rel.sharedHist;
              if (sharedHistOnly && !shared) {
                continue;
              }
              f(rel.doc, shared);
              propagate(rel.doc, doc3, shared);
            }
          }
        }
        propagate(doc2, null, true);
      }
      function attachDoc(cm, doc2) {
        if (doc2.cm) {
          throw new Error("This document is already in use.");
        }
        cm.doc = doc2;
        doc2.cm = cm;
        estimateLineHeights(cm);
        loadMode(cm);
        setDirectionClass(cm);
        cm.options.direction = doc2.direction;
        if (!cm.options.lineWrapping) {
          findMaxLine(cm);
        }
        cm.options.mode = doc2.modeOption;
        regChange(cm);
      }
      function setDirectionClass(cm) {
        (cm.doc.direction == "rtl" ? addClass : rmClass)(cm.display.lineDiv, "CodeMirror-rtl");
      }
      function directionChanged(cm) {
        runInOp(cm, function() {
          setDirectionClass(cm);
          regChange(cm);
        });
      }
      function History(prev) {
        this.done = [];
        this.undone = [];
        this.undoDepth = prev ? prev.undoDepth : Infinity;
        this.lastModTime = this.lastSelTime = 0;
        this.lastOp = this.lastSelOp = null;
        this.lastOrigin = this.lastSelOrigin = null;
        this.generation = this.maxGeneration = prev ? prev.maxGeneration : 1;
      }
      function historyChangeFromChange(doc2, change) {
        var histChange = { from: copyPos(change.from), to: changeEnd(change), text: getBetween(doc2, change.from, change.to) };
        attachLocalSpans(doc2, histChange, change.from.line, change.to.line + 1);
        linkedDocs(doc2, function(doc3) {
          return attachLocalSpans(doc3, histChange, change.from.line, change.to.line + 1);
        }, true);
        return histChange;
      }
      function clearSelectionEvents(array) {
        while (array.length) {
          var last = lst(array);
          if (last.ranges) {
            array.pop();
          } else {
            break;
          }
        }
      }
      function lastChangeEvent(hist, force) {
        if (force) {
          clearSelectionEvents(hist.done);
          return lst(hist.done);
        } else if (hist.done.length && !lst(hist.done).ranges) {
          return lst(hist.done);
        } else if (hist.done.length > 1 && !hist.done[hist.done.length - 2].ranges) {
          hist.done.pop();
          return lst(hist.done);
        }
      }
      function addChangeToHistory(doc2, change, selAfter, opId) {
        var hist = doc2.history;
        hist.undone.length = 0;
        var time = +new Date(), cur;
        var last;
        if ((hist.lastOp == opId || hist.lastOrigin == change.origin && change.origin && (change.origin.charAt(0) == "+" && hist.lastModTime > time - (doc2.cm ? doc2.cm.options.historyEventDelay : 500) || change.origin.charAt(0) == "*")) && (cur = lastChangeEvent(hist, hist.lastOp == opId))) {
          last = lst(cur.changes);
          if (cmp(change.from, change.to) == 0 && cmp(change.from, last.to) == 0) {
            last.to = changeEnd(change);
          } else {
            cur.changes.push(historyChangeFromChange(doc2, change));
          }
        } else {
          var before = lst(hist.done);
          if (!before || !before.ranges) {
            pushSelectionToHistory(doc2.sel, hist.done);
          }
          cur = {
            changes: [historyChangeFromChange(doc2, change)],
            generation: hist.generation
          };
          hist.done.push(cur);
          while (hist.done.length > hist.undoDepth) {
            hist.done.shift();
            if (!hist.done[0].ranges) {
              hist.done.shift();
            }
          }
        }
        hist.done.push(selAfter);
        hist.generation = ++hist.maxGeneration;
        hist.lastModTime = hist.lastSelTime = time;
        hist.lastOp = hist.lastSelOp = opId;
        hist.lastOrigin = hist.lastSelOrigin = change.origin;
        if (!last) {
          signal(doc2, "historyAdded");
        }
      }
      function selectionEventCanBeMerged(doc2, origin, prev, sel) {
        var ch = origin.charAt(0);
        return ch == "*" || ch == "+" && prev.ranges.length == sel.ranges.length && prev.somethingSelected() == sel.somethingSelected() && new Date() - doc2.history.lastSelTime <= (doc2.cm ? doc2.cm.options.historyEventDelay : 500);
      }
      function addSelectionToHistory(doc2, sel, opId, options) {
        var hist = doc2.history, origin = options && options.origin;
        if (opId == hist.lastSelOp || origin && hist.lastSelOrigin == origin && (hist.lastModTime == hist.lastSelTime && hist.lastOrigin == origin || selectionEventCanBeMerged(doc2, origin, lst(hist.done), sel))) {
          hist.done[hist.done.length - 1] = sel;
        } else {
          pushSelectionToHistory(sel, hist.done);
        }
        hist.lastSelTime = +new Date();
        hist.lastSelOrigin = origin;
        hist.lastSelOp = opId;
        if (options && options.clearRedo !== false) {
          clearSelectionEvents(hist.undone);
        }
      }
      function pushSelectionToHistory(sel, dest) {
        var top = lst(dest);
        if (!(top && top.ranges && top.equals(sel))) {
          dest.push(sel);
        }
      }
      function attachLocalSpans(doc2, change, from, to) {
        var existing = change["spans_" + doc2.id], n = 0;
        doc2.iter(Math.max(doc2.first, from), Math.min(doc2.first + doc2.size, to), function(line) {
          if (line.markedSpans) {
            (existing || (existing = change["spans_" + doc2.id] = {}))[n] = line.markedSpans;
          }
          ++n;
        });
      }
      function removeClearedSpans(spans) {
        if (!spans) {
          return null;
        }
        var out;
        for (var i2 = 0; i2 < spans.length; ++i2) {
          if (spans[i2].marker.explicitlyCleared) {
            if (!out) {
              out = spans.slice(0, i2);
            }
          } else if (out) {
            out.push(spans[i2]);
          }
        }
        return !out ? spans : out.length ? out : null;
      }
      function getOldSpans(doc2, change) {
        var found = change["spans_" + doc2.id];
        if (!found) {
          return null;
        }
        var nw = [];
        for (var i2 = 0; i2 < change.text.length; ++i2) {
          nw.push(removeClearedSpans(found[i2]));
        }
        return nw;
      }
      function mergeOldSpans(doc2, change) {
        var old = getOldSpans(doc2, change);
        var stretched = stretchSpansOverChange(doc2, change);
        if (!old) {
          return stretched;
        }
        if (!stretched) {
          return old;
        }
        for (var i2 = 0; i2 < old.length; ++i2) {
          var oldCur = old[i2], stretchCur = stretched[i2];
          if (oldCur && stretchCur) {
            spans:
              for (var j = 0; j < stretchCur.length; ++j) {
                var span = stretchCur[j];
                for (var k = 0; k < oldCur.length; ++k) {
                  if (oldCur[k].marker == span.marker) {
                    continue spans;
                  }
                }
                oldCur.push(span);
              }
          } else if (stretchCur) {
            old[i2] = stretchCur;
          }
        }
        return old;
      }
      function copyHistoryArray(events, newGroup, instantiateSel) {
        var copy = [];
        for (var i2 = 0; i2 < events.length; ++i2) {
          var event = events[i2];
          if (event.ranges) {
            copy.push(instantiateSel ? Selection.prototype.deepCopy.call(event) : event);
            continue;
          }
          var changes = event.changes, newChanges = [];
          copy.push({ changes: newChanges });
          for (var j = 0; j < changes.length; ++j) {
            var change = changes[j], m = void 0;
            newChanges.push({ from: change.from, to: change.to, text: change.text });
            if (newGroup) {
              for (var prop2 in change) {
                if (m = prop2.match(/^spans_(\d+)$/)) {
                  if (indexOf(newGroup, Number(m[1])) > -1) {
                    lst(newChanges)[prop2] = change[prop2];
                    delete change[prop2];
                  }
                }
              }
            }
          }
        }
        return copy;
      }
      function extendRange(range2, head, other, extend) {
        if (extend) {
          var anchor = range2.anchor;
          if (other) {
            var posBefore = cmp(head, anchor) < 0;
            if (posBefore != cmp(other, anchor) < 0) {
              anchor = head;
              head = other;
            } else if (posBefore != cmp(head, other) < 0) {
              head = other;
            }
          }
          return new Range(anchor, head);
        } else {
          return new Range(other || head, head);
        }
      }
      function extendSelection(doc2, head, other, options, extend) {
        if (extend == null) {
          extend = doc2.cm && (doc2.cm.display.shift || doc2.extend);
        }
        setSelection(doc2, new Selection([extendRange(doc2.sel.primary(), head, other, extend)], 0), options);
      }
      function extendSelections(doc2, heads, options) {
        var out = [];
        var extend = doc2.cm && (doc2.cm.display.shift || doc2.extend);
        for (var i2 = 0; i2 < doc2.sel.ranges.length; i2++) {
          out[i2] = extendRange(doc2.sel.ranges[i2], heads[i2], null, extend);
        }
        var newSel = normalizeSelection(doc2.cm, out, doc2.sel.primIndex);
        setSelection(doc2, newSel, options);
      }
      function replaceOneSelection(doc2, i2, range2, options) {
        var ranges = doc2.sel.ranges.slice(0);
        ranges[i2] = range2;
        setSelection(doc2, normalizeSelection(doc2.cm, ranges, doc2.sel.primIndex), options);
      }
      function setSimpleSelection(doc2, anchor, head, options) {
        setSelection(doc2, simpleSelection(anchor, head), options);
      }
      function filterSelectionChange(doc2, sel, options) {
        var obj = {
          ranges: sel.ranges,
          update: function(ranges) {
            this.ranges = [];
            for (var i2 = 0; i2 < ranges.length; i2++) {
              this.ranges[i2] = new Range(
                clipPos(doc2, ranges[i2].anchor),
                clipPos(doc2, ranges[i2].head)
              );
            }
          },
          origin: options && options.origin
        };
        signal(doc2, "beforeSelectionChange", doc2, obj);
        if (doc2.cm) {
          signal(doc2.cm, "beforeSelectionChange", doc2.cm, obj);
        }
        if (obj.ranges != sel.ranges) {
          return normalizeSelection(doc2.cm, obj.ranges, obj.ranges.length - 1);
        } else {
          return sel;
        }
      }
      function setSelectionReplaceHistory(doc2, sel, options) {
        var done = doc2.history.done, last = lst(done);
        if (last && last.ranges) {
          done[done.length - 1] = sel;
          setSelectionNoUndo(doc2, sel, options);
        } else {
          setSelection(doc2, sel, options);
        }
      }
      function setSelection(doc2, sel, options) {
        setSelectionNoUndo(doc2, sel, options);
        addSelectionToHistory(doc2, doc2.sel, doc2.cm ? doc2.cm.curOp.id : NaN, options);
      }
      function setSelectionNoUndo(doc2, sel, options) {
        if (hasHandler(doc2, "beforeSelectionChange") || doc2.cm && hasHandler(doc2.cm, "beforeSelectionChange")) {
          sel = filterSelectionChange(doc2, sel, options);
        }
        var bias = options && options.bias || (cmp(sel.primary().head, doc2.sel.primary().head) < 0 ? -1 : 1);
        setSelectionInner(doc2, skipAtomicInSelection(doc2, sel, bias, true));
        if (!(options && options.scroll === false) && doc2.cm && doc2.cm.getOption("readOnly") != "nocursor") {
          ensureCursorVisible(doc2.cm);
        }
      }
      function setSelectionInner(doc2, sel) {
        if (sel.equals(doc2.sel)) {
          return;
        }
        doc2.sel = sel;
        if (doc2.cm) {
          doc2.cm.curOp.updateInput = 1;
          doc2.cm.curOp.selectionChanged = true;
          signalCursorActivity(doc2.cm);
        }
        signalLater(doc2, "cursorActivity", doc2);
      }
      function reCheckSelection(doc2) {
        setSelectionInner(doc2, skipAtomicInSelection(doc2, doc2.sel, null, false));
      }
      function skipAtomicInSelection(doc2, sel, bias, mayClear) {
        var out;
        for (var i2 = 0; i2 < sel.ranges.length; i2++) {
          var range2 = sel.ranges[i2];
          var old = sel.ranges.length == doc2.sel.ranges.length && doc2.sel.ranges[i2];
          var newAnchor = skipAtomic(doc2, range2.anchor, old && old.anchor, bias, mayClear);
          var newHead = range2.head == range2.anchor ? newAnchor : skipAtomic(doc2, range2.head, old && old.head, bias, mayClear);
          if (out || newAnchor != range2.anchor || newHead != range2.head) {
            if (!out) {
              out = sel.ranges.slice(0, i2);
            }
            out[i2] = new Range(newAnchor, newHead);
          }
        }
        return out ? normalizeSelection(doc2.cm, out, sel.primIndex) : sel;
      }
      function skipAtomicInner(doc2, pos, oldPos, dir, mayClear) {
        var line = getLine(doc2, pos.line);
        if (line.markedSpans) {
          for (var i2 = 0; i2 < line.markedSpans.length; ++i2) {
            var sp = line.markedSpans[i2], m = sp.marker;
            var preventCursorLeft = "selectLeft" in m ? !m.selectLeft : m.inclusiveLeft;
            var preventCursorRight = "selectRight" in m ? !m.selectRight : m.inclusiveRight;
            if ((sp.from == null || (preventCursorLeft ? sp.from <= pos.ch : sp.from < pos.ch)) && (sp.to == null || (preventCursorRight ? sp.to >= pos.ch : sp.to > pos.ch))) {
              if (mayClear) {
                signal(m, "beforeCursorEnter");
                if (m.explicitlyCleared) {
                  if (!line.markedSpans) {
                    break;
                  } else {
                    --i2;
                    continue;
                  }
                }
              }
              if (!m.atomic) {
                continue;
              }
              if (oldPos) {
                var near = m.find(dir < 0 ? 1 : -1), diff = void 0;
                if (dir < 0 ? preventCursorRight : preventCursorLeft) {
                  near = movePos(doc2, near, -dir, near && near.line == pos.line ? line : null);
                }
                if (near && near.line == pos.line && (diff = cmp(near, oldPos)) && (dir < 0 ? diff < 0 : diff > 0)) {
                  return skipAtomicInner(doc2, near, pos, dir, mayClear);
                }
              }
              var far = m.find(dir < 0 ? -1 : 1);
              if (dir < 0 ? preventCursorLeft : preventCursorRight) {
                far = movePos(doc2, far, dir, far.line == pos.line ? line : null);
              }
              return far ? skipAtomicInner(doc2, far, pos, dir, mayClear) : null;
            }
          }
        }
        return pos;
      }
      function skipAtomic(doc2, pos, oldPos, bias, mayClear) {
        var dir = bias || 1;
        var found = skipAtomicInner(doc2, pos, oldPos, dir, mayClear) || !mayClear && skipAtomicInner(doc2, pos, oldPos, dir, true) || skipAtomicInner(doc2, pos, oldPos, -dir, mayClear) || !mayClear && skipAtomicInner(doc2, pos, oldPos, -dir, true);
        if (!found) {
          doc2.cantEdit = true;
          return Pos(doc2.first, 0);
        }
        return found;
      }
      function movePos(doc2, pos, dir, line) {
        if (dir < 0 && pos.ch == 0) {
          if (pos.line > doc2.first) {
            return clipPos(doc2, Pos(pos.line - 1));
          } else {
            return null;
          }
        } else if (dir > 0 && pos.ch == (line || getLine(doc2, pos.line)).text.length) {
          if (pos.line < doc2.first + doc2.size - 1) {
            return Pos(pos.line + 1, 0);
          } else {
            return null;
          }
        } else {
          return new Pos(pos.line, pos.ch + dir);
        }
      }
      function selectAll(cm) {
        cm.setSelection(Pos(cm.firstLine(), 0), Pos(cm.lastLine()), sel_dontScroll);
      }
      function filterChange(doc2, change, update) {
        var obj = {
          canceled: false,
          from: change.from,
          to: change.to,
          text: change.text,
          origin: change.origin,
          cancel: function() {
            return obj.canceled = true;
          }
        };
        if (update) {
          obj.update = function(from, to, text, origin) {
            if (from) {
              obj.from = clipPos(doc2, from);
            }
            if (to) {
              obj.to = clipPos(doc2, to);
            }
            if (text) {
              obj.text = text;
            }
            if (origin !== void 0) {
              obj.origin = origin;
            }
          };
        }
        signal(doc2, "beforeChange", doc2, obj);
        if (doc2.cm) {
          signal(doc2.cm, "beforeChange", doc2.cm, obj);
        }
        if (obj.canceled) {
          if (doc2.cm) {
            doc2.cm.curOp.updateInput = 2;
          }
          return null;
        }
        return { from: obj.from, to: obj.to, text: obj.text, origin: obj.origin };
      }
      function makeChange(doc2, change, ignoreReadOnly) {
        if (doc2.cm) {
          if (!doc2.cm.curOp) {
            return operation(doc2.cm, makeChange)(doc2, change, ignoreReadOnly);
          }
          if (doc2.cm.state.suppressEdits) {
            return;
          }
        }
        if (hasHandler(doc2, "beforeChange") || doc2.cm && hasHandler(doc2.cm, "beforeChange")) {
          change = filterChange(doc2, change, true);
          if (!change) {
            return;
          }
        }
        var split = sawReadOnlySpans && !ignoreReadOnly && removeReadOnlyRanges(doc2, change.from, change.to);
        if (split) {
          for (var i2 = split.length - 1; i2 >= 0; --i2) {
            makeChangeInner(doc2, { from: split[i2].from, to: split[i2].to, text: i2 ? [""] : change.text, origin: change.origin });
          }
        } else {
          makeChangeInner(doc2, change);
        }
      }
      function makeChangeInner(doc2, change) {
        if (change.text.length == 1 && change.text[0] == "" && cmp(change.from, change.to) == 0) {
          return;
        }
        var selAfter = computeSelAfterChange(doc2, change);
        addChangeToHistory(doc2, change, selAfter, doc2.cm ? doc2.cm.curOp.id : NaN);
        makeChangeSingleDoc(doc2, change, selAfter, stretchSpansOverChange(doc2, change));
        var rebased = [];
        linkedDocs(doc2, function(doc3, sharedHist) {
          if (!sharedHist && indexOf(rebased, doc3.history) == -1) {
            rebaseHist(doc3.history, change);
            rebased.push(doc3.history);
          }
          makeChangeSingleDoc(doc3, change, null, stretchSpansOverChange(doc3, change));
        });
      }
      function makeChangeFromHistory(doc2, type, allowSelectionOnly) {
        var suppress = doc2.cm && doc2.cm.state.suppressEdits;
        if (suppress && !allowSelectionOnly) {
          return;
        }
        var hist = doc2.history, event, selAfter = doc2.sel;
        var source = type == "undo" ? hist.done : hist.undone, dest = type == "undo" ? hist.undone : hist.done;
        var i2 = 0;
        for (; i2 < source.length; i2++) {
          event = source[i2];
          if (allowSelectionOnly ? event.ranges && !event.equals(doc2.sel) : !event.ranges) {
            break;
          }
        }
        if (i2 == source.length) {
          return;
        }
        hist.lastOrigin = hist.lastSelOrigin = null;
        for (; ; ) {
          event = source.pop();
          if (event.ranges) {
            pushSelectionToHistory(event, dest);
            if (allowSelectionOnly && !event.equals(doc2.sel)) {
              setSelection(doc2, event, { clearRedo: false });
              return;
            }
            selAfter = event;
          } else if (suppress) {
            source.push(event);
            return;
          } else {
            break;
          }
        }
        var antiChanges = [];
        pushSelectionToHistory(selAfter, dest);
        dest.push({ changes: antiChanges, generation: hist.generation });
        hist.generation = event.generation || ++hist.maxGeneration;
        var filter = hasHandler(doc2, "beforeChange") || doc2.cm && hasHandler(doc2.cm, "beforeChange");
        var loop = function(i3) {
          var change = event.changes[i3];
          change.origin = type;
          if (filter && !filterChange(doc2, change, false)) {
            source.length = 0;
            return {};
          }
          antiChanges.push(historyChangeFromChange(doc2, change));
          var after = i3 ? computeSelAfterChange(doc2, change) : lst(source);
          makeChangeSingleDoc(doc2, change, after, mergeOldSpans(doc2, change));
          if (!i3 && doc2.cm) {
            doc2.cm.scrollIntoView({ from: change.from, to: changeEnd(change) });
          }
          var rebased = [];
          linkedDocs(doc2, function(doc3, sharedHist) {
            if (!sharedHist && indexOf(rebased, doc3.history) == -1) {
              rebaseHist(doc3.history, change);
              rebased.push(doc3.history);
            }
            makeChangeSingleDoc(doc3, change, null, mergeOldSpans(doc3, change));
          });
        };
        for (var i$12 = event.changes.length - 1; i$12 >= 0; --i$12) {
          var returned = loop(i$12);
          if (returned)
            return returned.v;
        }
      }
      function shiftDoc(doc2, distance) {
        if (distance == 0) {
          return;
        }
        doc2.first += distance;
        doc2.sel = new Selection(map(doc2.sel.ranges, function(range2) {
          return new Range(
            Pos(range2.anchor.line + distance, range2.anchor.ch),
            Pos(range2.head.line + distance, range2.head.ch)
          );
        }), doc2.sel.primIndex);
        if (doc2.cm) {
          regChange(doc2.cm, doc2.first, doc2.first - distance, distance);
          for (var d = doc2.cm.display, l = d.viewFrom; l < d.viewTo; l++) {
            regLineChange(doc2.cm, l, "gutter");
          }
        }
      }
      function makeChangeSingleDoc(doc2, change, selAfter, spans) {
        if (doc2.cm && !doc2.cm.curOp) {
          return operation(doc2.cm, makeChangeSingleDoc)(doc2, change, selAfter, spans);
        }
        if (change.to.line < doc2.first) {
          shiftDoc(doc2, change.text.length - 1 - (change.to.line - change.from.line));
          return;
        }
        if (change.from.line > doc2.lastLine()) {
          return;
        }
        if (change.from.line < doc2.first) {
          var shift = change.text.length - 1 - (doc2.first - change.from.line);
          shiftDoc(doc2, shift);
          change = {
            from: Pos(doc2.first, 0),
            to: Pos(change.to.line + shift, change.to.ch),
            text: [lst(change.text)],
            origin: change.origin
          };
        }
        var last = doc2.lastLine();
        if (change.to.line > last) {
          change = {
            from: change.from,
            to: Pos(last, getLine(doc2, last).text.length),
            text: [change.text[0]],
            origin: change.origin
          };
        }
        change.removed = getBetween(doc2, change.from, change.to);
        if (!selAfter) {
          selAfter = computeSelAfterChange(doc2, change);
        }
        if (doc2.cm) {
          makeChangeSingleDocInEditor(doc2.cm, change, spans);
        } else {
          updateDoc(doc2, change, spans);
        }
        setSelectionNoUndo(doc2, selAfter, sel_dontScroll);
        if (doc2.cantEdit && skipAtomic(doc2, Pos(doc2.firstLine(), 0))) {
          doc2.cantEdit = false;
        }
      }
      function makeChangeSingleDocInEditor(cm, change, spans) {
        var doc2 = cm.doc, display = cm.display, from = change.from, to = change.to;
        var recomputeMaxLength = false, checkWidthStart = from.line;
        if (!cm.options.lineWrapping) {
          checkWidthStart = lineNo(visualLine(getLine(doc2, from.line)));
          doc2.iter(checkWidthStart, to.line + 1, function(line) {
            if (line == display.maxLine) {
              recomputeMaxLength = true;
              return true;
            }
          });
        }
        if (doc2.sel.contains(change.from, change.to) > -1) {
          signalCursorActivity(cm);
        }
        updateDoc(doc2, change, spans, estimateHeight(cm));
        if (!cm.options.lineWrapping) {
          doc2.iter(checkWidthStart, from.line + change.text.length, function(line) {
            var len = lineLength(line);
            if (len > display.maxLineLength) {
              display.maxLine = line;
              display.maxLineLength = len;
              display.maxLineChanged = true;
              recomputeMaxLength = false;
            }
          });
          if (recomputeMaxLength) {
            cm.curOp.updateMaxLine = true;
          }
        }
        retreatFrontier(doc2, from.line);
        startWorker(cm, 400);
        var lendiff = change.text.length - (to.line - from.line) - 1;
        if (change.full) {
          regChange(cm);
        } else if (from.line == to.line && change.text.length == 1 && !isWholeLineUpdate(cm.doc, change)) {
          regLineChange(cm, from.line, "text");
        } else {
          regChange(cm, from.line, to.line + 1, lendiff);
        }
        var changesHandler = hasHandler(cm, "changes"), changeHandler = hasHandler(cm, "change");
        if (changeHandler || changesHandler) {
          var obj = {
            from,
            to,
            text: change.text,
            removed: change.removed,
            origin: change.origin
          };
          if (changeHandler) {
            signalLater(cm, "change", cm, obj);
          }
          if (changesHandler) {
            (cm.curOp.changeObjs || (cm.curOp.changeObjs = [])).push(obj);
          }
        }
        cm.display.selForContextMenu = null;
      }
      function replaceRange(doc2, code, from, to, origin) {
        var assign;
        if (!to) {
          to = from;
        }
        if (cmp(to, from) < 0) {
          assign = [to, from], from = assign[0], to = assign[1];
        }
        if (typeof code == "string") {
          code = doc2.splitLines(code);
        }
        makeChange(doc2, { from, to, text: code, origin });
      }
      function rebaseHistSelSingle(pos, from, to, diff) {
        if (to < pos.line) {
          pos.line += diff;
        } else if (from < pos.line) {
          pos.line = from;
          pos.ch = 0;
        }
      }
      function rebaseHistArray(array, from, to, diff) {
        for (var i2 = 0; i2 < array.length; ++i2) {
          var sub = array[i2], ok = true;
          if (sub.ranges) {
            if (!sub.copied) {
              sub = array[i2] = sub.deepCopy();
              sub.copied = true;
            }
            for (var j = 0; j < sub.ranges.length; j++) {
              rebaseHistSelSingle(sub.ranges[j].anchor, from, to, diff);
              rebaseHistSelSingle(sub.ranges[j].head, from, to, diff);
            }
            continue;
          }
          for (var j$1 = 0; j$1 < sub.changes.length; ++j$1) {
            var cur = sub.changes[j$1];
            if (to < cur.from.line) {
              cur.from = Pos(cur.from.line + diff, cur.from.ch);
              cur.to = Pos(cur.to.line + diff, cur.to.ch);
            } else if (from <= cur.to.line) {
              ok = false;
              break;
            }
          }
          if (!ok) {
            array.splice(0, i2 + 1);
            i2 = 0;
          }
        }
      }
      function rebaseHist(hist, change) {
        var from = change.from.line, to = change.to.line, diff = change.text.length - (to - from) - 1;
        rebaseHistArray(hist.done, from, to, diff);
        rebaseHistArray(hist.undone, from, to, diff);
      }
      function changeLine(doc2, handle, changeType, op) {
        var no = handle, line = handle;
        if (typeof handle == "number") {
          line = getLine(doc2, clipLine(doc2, handle));
        } else {
          no = lineNo(handle);
        }
        if (no == null) {
          return null;
        }
        if (op(line, no) && doc2.cm) {
          regLineChange(doc2.cm, no, changeType);
        }
        return line;
      }
      function LeafChunk(lines) {
        this.lines = lines;
        this.parent = null;
        var height = 0;
        for (var i2 = 0; i2 < lines.length; ++i2) {
          lines[i2].parent = this;
          height += lines[i2].height;
        }
        this.height = height;
      }
      LeafChunk.prototype = {
        chunkSize: function() {
          return this.lines.length;
        },
        // Remove the n lines at offset 'at'.
        removeInner: function(at, n) {
          for (var i2 = at, e = at + n; i2 < e; ++i2) {
            var line = this.lines[i2];
            this.height -= line.height;
            cleanUpLine(line);
            signalLater(line, "delete");
          }
          this.lines.splice(at, n);
        },
        // Helper used to collapse a small branch into a single leaf.
        collapse: function(lines) {
          lines.push.apply(lines, this.lines);
        },
        // Insert the given array of lines at offset 'at', count them as
        // having the given height.
        insertInner: function(at, lines, height) {
          this.height += height;
          this.lines = this.lines.slice(0, at).concat(lines).concat(this.lines.slice(at));
          for (var i2 = 0; i2 < lines.length; ++i2) {
            lines[i2].parent = this;
          }
        },
        // Used to iterate over a part of the tree.
        iterN: function(at, n, op) {
          for (var e = at + n; at < e; ++at) {
            if (op(this.lines[at])) {
              return true;
            }
          }
        }
      };
      function BranchChunk(children) {
        this.children = children;
        var size = 0, height = 0;
        for (var i2 = 0; i2 < children.length; ++i2) {
          var ch = children[i2];
          size += ch.chunkSize();
          height += ch.height;
          ch.parent = this;
        }
        this.size = size;
        this.height = height;
        this.parent = null;
      }
      BranchChunk.prototype = {
        chunkSize: function() {
          return this.size;
        },
        removeInner: function(at, n) {
          this.size -= n;
          for (var i2 = 0; i2 < this.children.length; ++i2) {
            var child = this.children[i2], sz = child.chunkSize();
            if (at < sz) {
              var rm = Math.min(n, sz - at), oldHeight = child.height;
              child.removeInner(at, rm);
              this.height -= oldHeight - child.height;
              if (sz == rm) {
                this.children.splice(i2--, 1);
                child.parent = null;
              }
              if ((n -= rm) == 0) {
                break;
              }
              at = 0;
            } else {
              at -= sz;
            }
          }
          if (this.size - n < 25 && (this.children.length > 1 || !(this.children[0] instanceof LeafChunk))) {
            var lines = [];
            this.collapse(lines);
            this.children = [new LeafChunk(lines)];
            this.children[0].parent = this;
          }
        },
        collapse: function(lines) {
          for (var i2 = 0; i2 < this.children.length; ++i2) {
            this.children[i2].collapse(lines);
          }
        },
        insertInner: function(at, lines, height) {
          this.size += lines.length;
          this.height += height;
          for (var i2 = 0; i2 < this.children.length; ++i2) {
            var child = this.children[i2], sz = child.chunkSize();
            if (at <= sz) {
              child.insertInner(at, lines, height);
              if (child.lines && child.lines.length > 50) {
                var remaining = child.lines.length % 25 + 25;
                for (var pos = remaining; pos < child.lines.length; ) {
                  var leaf = new LeafChunk(child.lines.slice(pos, pos += 25));
                  child.height -= leaf.height;
                  this.children.splice(++i2, 0, leaf);
                  leaf.parent = this;
                }
                child.lines = child.lines.slice(0, remaining);
                this.maybeSpill();
              }
              break;
            }
            at -= sz;
          }
        },
        // When a node has grown, check whether it should be split.
        maybeSpill: function() {
          if (this.children.length <= 10) {
            return;
          }
          var me = this;
          do {
            var spilled = me.children.splice(me.children.length - 5, 5);
            var sibling = new BranchChunk(spilled);
            if (!me.parent) {
              var copy = new BranchChunk(me.children);
              copy.parent = me;
              me.children = [copy, sibling];
              me = copy;
            } else {
              me.size -= sibling.size;
              me.height -= sibling.height;
              var myIndex = indexOf(me.parent.children, me);
              me.parent.children.splice(myIndex + 1, 0, sibling);
            }
            sibling.parent = me.parent;
          } while (me.children.length > 10);
          me.parent.maybeSpill();
        },
        iterN: function(at, n, op) {
          for (var i2 = 0; i2 < this.children.length; ++i2) {
            var child = this.children[i2], sz = child.chunkSize();
            if (at < sz) {
              var used = Math.min(n, sz - at);
              if (child.iterN(at, used, op)) {
                return true;
              }
              if ((n -= used) == 0) {
                break;
              }
              at = 0;
            } else {
              at -= sz;
            }
          }
        }
      };
      var LineWidget = function(doc2, node, options) {
        if (options) {
          for (var opt in options) {
            if (options.hasOwnProperty(opt)) {
              this[opt] = options[opt];
            }
          }
        }
        this.doc = doc2;
        this.node = node;
      };
      LineWidget.prototype.clear = function() {
        var cm = this.doc.cm, ws = this.line.widgets, line = this.line, no = lineNo(line);
        if (no == null || !ws) {
          return;
        }
        for (var i2 = 0; i2 < ws.length; ++i2) {
          if (ws[i2] == this) {
            ws.splice(i2--, 1);
          }
        }
        if (!ws.length) {
          line.widgets = null;
        }
        var height = widgetHeight(this);
        updateLineHeight(line, Math.max(0, line.height - height));
        if (cm) {
          runInOp(cm, function() {
            adjustScrollWhenAboveVisible(cm, line, -height);
            regLineChange(cm, no, "widget");
          });
          signalLater(cm, "lineWidgetCleared", cm, this, no);
        }
      };
      LineWidget.prototype.changed = function() {
        var this$1 = this;
        var oldH = this.height, cm = this.doc.cm, line = this.line;
        this.height = null;
        var diff = widgetHeight(this) - oldH;
        if (!diff) {
          return;
        }
        if (!lineIsHidden(this.doc, line)) {
          updateLineHeight(line, line.height + diff);
        }
        if (cm) {
          runInOp(cm, function() {
            cm.curOp.forceUpdate = true;
            adjustScrollWhenAboveVisible(cm, line, diff);
            signalLater(cm, "lineWidgetChanged", cm, this$1, lineNo(line));
          });
        }
      };
      eventMixin(LineWidget);
      function adjustScrollWhenAboveVisible(cm, line, diff) {
        if (heightAtLine(line) < (cm.curOp && cm.curOp.scrollTop || cm.doc.scrollTop)) {
          addToScrollTop(cm, diff);
        }
      }
      function addLineWidget(doc2, handle, node, options) {
        var widget = new LineWidget(doc2, node, options);
        var cm = doc2.cm;
        if (cm && widget.noHScroll) {
          cm.display.alignWidgets = true;
        }
        changeLine(doc2, handle, "widget", function(line) {
          var widgets = line.widgets || (line.widgets = []);
          if (widget.insertAt == null) {
            widgets.push(widget);
          } else {
            widgets.splice(Math.min(widgets.length, Math.max(0, widget.insertAt)), 0, widget);
          }
          widget.line = line;
          if (cm && !lineIsHidden(doc2, line)) {
            var aboveVisible = heightAtLine(line) < doc2.scrollTop;
            updateLineHeight(line, line.height + widgetHeight(widget));
            if (aboveVisible) {
              addToScrollTop(cm, widget.height);
            }
            cm.curOp.forceUpdate = true;
          }
          return true;
        });
        if (cm) {
          signalLater(cm, "lineWidgetAdded", cm, widget, typeof handle == "number" ? handle : lineNo(handle));
        }
        return widget;
      }
      var nextMarkerId = 0;
      var TextMarker = function(doc2, type) {
        this.lines = [];
        this.type = type;
        this.doc = doc2;
        this.id = ++nextMarkerId;
      };
      TextMarker.prototype.clear = function() {
        if (this.explicitlyCleared) {
          return;
        }
        var cm = this.doc.cm, withOp = cm && !cm.curOp;
        if (withOp) {
          startOperation(cm);
        }
        if (hasHandler(this, "clear")) {
          var found = this.find();
          if (found) {
            signalLater(this, "clear", found.from, found.to);
          }
        }
        var min = null, max = null;
        for (var i2 = 0; i2 < this.lines.length; ++i2) {
          var line = this.lines[i2];
          var span = getMarkedSpanFor(line.markedSpans, this);
          if (cm && !this.collapsed) {
            regLineChange(cm, lineNo(line), "text");
          } else if (cm) {
            if (span.to != null) {
              max = lineNo(line);
            }
            if (span.from != null) {
              min = lineNo(line);
            }
          }
          line.markedSpans = removeMarkedSpan(line.markedSpans, span);
          if (span.from == null && this.collapsed && !lineIsHidden(this.doc, line) && cm) {
            updateLineHeight(line, textHeight(cm.display));
          }
        }
        if (cm && this.collapsed && !cm.options.lineWrapping) {
          for (var i$12 = 0; i$12 < this.lines.length; ++i$12) {
            var visual = visualLine(this.lines[i$12]), len = lineLength(visual);
            if (len > cm.display.maxLineLength) {
              cm.display.maxLine = visual;
              cm.display.maxLineLength = len;
              cm.display.maxLineChanged = true;
            }
          }
        }
        if (min != null && cm && this.collapsed) {
          regChange(cm, min, max + 1);
        }
        this.lines.length = 0;
        this.explicitlyCleared = true;
        if (this.atomic && this.doc.cantEdit) {
          this.doc.cantEdit = false;
          if (cm) {
            reCheckSelection(cm.doc);
          }
        }
        if (cm) {
          signalLater(cm, "markerCleared", cm, this, min, max);
        }
        if (withOp) {
          endOperation(cm);
        }
        if (this.parent) {
          this.parent.clear();
        }
      };
      TextMarker.prototype.find = function(side, lineObj) {
        if (side == null && this.type == "bookmark") {
          side = 1;
        }
        var from, to;
        for (var i2 = 0; i2 < this.lines.length; ++i2) {
          var line = this.lines[i2];
          var span = getMarkedSpanFor(line.markedSpans, this);
          if (span.from != null) {
            from = Pos(lineObj ? line : lineNo(line), span.from);
            if (side == -1) {
              return from;
            }
          }
          if (span.to != null) {
            to = Pos(lineObj ? line : lineNo(line), span.to);
            if (side == 1) {
              return to;
            }
          }
        }
        return from && { from, to };
      };
      TextMarker.prototype.changed = function() {
        var this$1 = this;
        var pos = this.find(-1, true), widget = this, cm = this.doc.cm;
        if (!pos || !cm) {
          return;
        }
        runInOp(cm, function() {
          var line = pos.line, lineN = lineNo(pos.line);
          var view = findViewForLine(cm, lineN);
          if (view) {
            clearLineMeasurementCacheFor(view);
            cm.curOp.selectionChanged = cm.curOp.forceUpdate = true;
          }
          cm.curOp.updateMaxLine = true;
          if (!lineIsHidden(widget.doc, line) && widget.height != null) {
            var oldHeight = widget.height;
            widget.height = null;
            var dHeight = widgetHeight(widget) - oldHeight;
            if (dHeight) {
              updateLineHeight(line, line.height + dHeight);
            }
          }
          signalLater(cm, "markerChanged", cm, this$1);
        });
      };
      TextMarker.prototype.attachLine = function(line) {
        if (!this.lines.length && this.doc.cm) {
          var op = this.doc.cm.curOp;
          if (!op.maybeHiddenMarkers || indexOf(op.maybeHiddenMarkers, this) == -1) {
            (op.maybeUnhiddenMarkers || (op.maybeUnhiddenMarkers = [])).push(this);
          }
        }
        this.lines.push(line);
      };
      TextMarker.prototype.detachLine = function(line) {
        this.lines.splice(indexOf(this.lines, line), 1);
        if (!this.lines.length && this.doc.cm) {
          var op = this.doc.cm.curOp;
          (op.maybeHiddenMarkers || (op.maybeHiddenMarkers = [])).push(this);
        }
      };
      eventMixin(TextMarker);
      function markText(doc2, from, to, options, type) {
        if (options && options.shared) {
          return markTextShared(doc2, from, to, options, type);
        }
        if (doc2.cm && !doc2.cm.curOp) {
          return operation(doc2.cm, markText)(doc2, from, to, options, type);
        }
        var marker = new TextMarker(doc2, type), diff = cmp(from, to);
        if (options) {
          copyObj(options, marker, false);
        }
        if (diff > 0 || diff == 0 && marker.clearWhenEmpty !== false) {
          return marker;
        }
        if (marker.replacedWith) {
          marker.collapsed = true;
          marker.widgetNode = eltP("span", [marker.replacedWith], "CodeMirror-widget");
          if (!options.handleMouseEvents) {
            marker.widgetNode.setAttribute("cm-ignore-events", "true");
          }
          if (options.insertLeft) {
            marker.widgetNode.insertLeft = true;
          }
        }
        if (marker.collapsed) {
          if (conflictingCollapsedRange(doc2, from.line, from, to, marker) || from.line != to.line && conflictingCollapsedRange(doc2, to.line, from, to, marker)) {
            throw new Error("Inserting collapsed marker partially overlapping an existing one");
          }
          seeCollapsedSpans();
        }
        if (marker.addToHistory) {
          addChangeToHistory(doc2, { from, to, origin: "markText" }, doc2.sel, NaN);
        }
        var curLine = from.line, cm = doc2.cm, updateMaxLine;
        doc2.iter(curLine, to.line + 1, function(line) {
          if (cm && marker.collapsed && !cm.options.lineWrapping && visualLine(line) == cm.display.maxLine) {
            updateMaxLine = true;
          }
          if (marker.collapsed && curLine != from.line) {
            updateLineHeight(line, 0);
          }
          addMarkedSpan(line, new MarkedSpan(
            marker,
            curLine == from.line ? from.ch : null,
            curLine == to.line ? to.ch : null
          ), doc2.cm && doc2.cm.curOp);
          ++curLine;
        });
        if (marker.collapsed) {
          doc2.iter(from.line, to.line + 1, function(line) {
            if (lineIsHidden(doc2, line)) {
              updateLineHeight(line, 0);
            }
          });
        }
        if (marker.clearOnEnter) {
          on(marker, "beforeCursorEnter", function() {
            return marker.clear();
          });
        }
        if (marker.readOnly) {
          seeReadOnlySpans();
          if (doc2.history.done.length || doc2.history.undone.length) {
            doc2.clearHistory();
          }
        }
        if (marker.collapsed) {
          marker.id = ++nextMarkerId;
          marker.atomic = true;
        }
        if (cm) {
          if (updateMaxLine) {
            cm.curOp.updateMaxLine = true;
          }
          if (marker.collapsed) {
            regChange(cm, from.line, to.line + 1);
          } else if (marker.className || marker.startStyle || marker.endStyle || marker.css || marker.attributes || marker.title) {
            for (var i2 = from.line; i2 <= to.line; i2++) {
              regLineChange(cm, i2, "text");
            }
          }
          if (marker.atomic) {
            reCheckSelection(cm.doc);
          }
          signalLater(cm, "markerAdded", cm, marker);
        }
        return marker;
      }
      var SharedTextMarker = function(markers, primary) {
        this.markers = markers;
        this.primary = primary;
        for (var i2 = 0; i2 < markers.length; ++i2) {
          markers[i2].parent = this;
        }
      };
      SharedTextMarker.prototype.clear = function() {
        if (this.explicitlyCleared) {
          return;
        }
        this.explicitlyCleared = true;
        for (var i2 = 0; i2 < this.markers.length; ++i2) {
          this.markers[i2].clear();
        }
        signalLater(this, "clear");
      };
      SharedTextMarker.prototype.find = function(side, lineObj) {
        return this.primary.find(side, lineObj);
      };
      eventMixin(SharedTextMarker);
      function markTextShared(doc2, from, to, options, type) {
        options = copyObj(options);
        options.shared = false;
        var markers = [markText(doc2, from, to, options, type)], primary = markers[0];
        var widget = options.widgetNode;
        linkedDocs(doc2, function(doc3) {
          if (widget) {
            options.widgetNode = widget.cloneNode(true);
          }
          markers.push(markText(doc3, clipPos(doc3, from), clipPos(doc3, to), options, type));
          for (var i2 = 0; i2 < doc3.linked.length; ++i2) {
            if (doc3.linked[i2].isParent) {
              return;
            }
          }
          primary = lst(markers);
        });
        return new SharedTextMarker(markers, primary);
      }
      function findSharedMarkers(doc2) {
        return doc2.findMarks(Pos(doc2.first, 0), doc2.clipPos(Pos(doc2.lastLine())), function(m) {
          return m.parent;
        });
      }
      function copySharedMarkers(doc2, markers) {
        for (var i2 = 0; i2 < markers.length; i2++) {
          var marker = markers[i2], pos = marker.find();
          var mFrom = doc2.clipPos(pos.from), mTo = doc2.clipPos(pos.to);
          if (cmp(mFrom, mTo)) {
            var subMark = markText(doc2, mFrom, mTo, marker.primary, marker.primary.type);
            marker.markers.push(subMark);
            subMark.parent = marker;
          }
        }
      }
      function detachSharedMarkers(markers) {
        var loop = function(i3) {
          var marker = markers[i3], linked = [marker.primary.doc];
          linkedDocs(marker.primary.doc, function(d) {
            return linked.push(d);
          });
          for (var j = 0; j < marker.markers.length; j++) {
            var subMarker = marker.markers[j];
            if (indexOf(linked, subMarker.doc) == -1) {
              subMarker.parent = null;
              marker.markers.splice(j--, 1);
            }
          }
        };
        for (var i2 = 0; i2 < markers.length; i2++)
          loop(i2);
      }
      var nextDocId = 0;
      var Doc = function(text, mode, firstLine, lineSep, direction) {
        if (!(this instanceof Doc)) {
          return new Doc(text, mode, firstLine, lineSep, direction);
        }
        if (firstLine == null) {
          firstLine = 0;
        }
        BranchChunk.call(this, [new LeafChunk([new Line("", null)])]);
        this.first = firstLine;
        this.scrollTop = this.scrollLeft = 0;
        this.cantEdit = false;
        this.cleanGeneration = 1;
        this.modeFrontier = this.highlightFrontier = firstLine;
        var start = Pos(firstLine, 0);
        this.sel = simpleSelection(start);
        this.history = new History(null);
        this.id = ++nextDocId;
        this.modeOption = mode;
        this.lineSep = lineSep;
        this.direction = direction == "rtl" ? "rtl" : "ltr";
        this.extend = false;
        if (typeof text == "string") {
          text = this.splitLines(text);
        }
        updateDoc(this, { from: start, to: start, text });
        setSelection(this, simpleSelection(start), sel_dontScroll);
      };
      Doc.prototype = createObj(BranchChunk.prototype, {
        constructor: Doc,
        // Iterate over the document. Supports two forms -- with only one
        // argument, it calls that for each line in the document. With
        // three, it iterates over the range given by the first two (with
        // the second being non-inclusive).
        iter: function(from, to, op) {
          if (op) {
            this.iterN(from - this.first, to - from, op);
          } else {
            this.iterN(this.first, this.first + this.size, from);
          }
        },
        // Non-public interface for adding and removing lines.
        insert: function(at, lines) {
          var height = 0;
          for (var i2 = 0; i2 < lines.length; ++i2) {
            height += lines[i2].height;
          }
          this.insertInner(at - this.first, lines, height);
        },
        remove: function(at, n) {
          this.removeInner(at - this.first, n);
        },
        // From here, the methods are part of the public interface. Most
        // are also available from CodeMirror (editor) instances.
        getValue: function(lineSep) {
          var lines = getLines(this, this.first, this.first + this.size);
          if (lineSep === false) {
            return lines;
          }
          return lines.join(lineSep || this.lineSeparator());
        },
        setValue: docMethodOp(function(code) {
          var top = Pos(this.first, 0), last = this.first + this.size - 1;
          makeChange(this, {
            from: top,
            to: Pos(last, getLine(this, last).text.length),
            text: this.splitLines(code),
            origin: "setValue",
            full: true
          }, true);
          if (this.cm) {
            scrollToCoords(this.cm, 0, 0);
          }
          setSelection(this, simpleSelection(top), sel_dontScroll);
        }),
        replaceRange: function(code, from, to, origin) {
          from = clipPos(this, from);
          to = to ? clipPos(this, to) : from;
          replaceRange(this, code, from, to, origin);
        },
        getRange: function(from, to, lineSep) {
          var lines = getBetween(this, clipPos(this, from), clipPos(this, to));
          if (lineSep === false) {
            return lines;
          }
          if (lineSep === "") {
            return lines.join("");
          }
          return lines.join(lineSep || this.lineSeparator());
        },
        getLine: function(line) {
          var l = this.getLineHandle(line);
          return l && l.text;
        },
        getLineHandle: function(line) {
          if (isLine(this, line)) {
            return getLine(this, line);
          }
        },
        getLineNumber: function(line) {
          return lineNo(line);
        },
        getLineHandleVisualStart: function(line) {
          if (typeof line == "number") {
            line = getLine(this, line);
          }
          return visualLine(line);
        },
        lineCount: function() {
          return this.size;
        },
        firstLine: function() {
          return this.first;
        },
        lastLine: function() {
          return this.first + this.size - 1;
        },
        clipPos: function(pos) {
          return clipPos(this, pos);
        },
        getCursor: function(start) {
          var range2 = this.sel.primary(), pos;
          if (start == null || start == "head") {
            pos = range2.head;
          } else if (start == "anchor") {
            pos = range2.anchor;
          } else if (start == "end" || start == "to" || start === false) {
            pos = range2.to();
          } else {
            pos = range2.from();
          }
          return pos;
        },
        listSelections: function() {
          return this.sel.ranges;
        },
        somethingSelected: function() {
          return this.sel.somethingSelected();
        },
        setCursor: docMethodOp(function(line, ch, options) {
          setSimpleSelection(this, clipPos(this, typeof line == "number" ? Pos(line, ch || 0) : line), null, options);
        }),
        setSelection: docMethodOp(function(anchor, head, options) {
          setSimpleSelection(this, clipPos(this, anchor), clipPos(this, head || anchor), options);
        }),
        extendSelection: docMethodOp(function(head, other, options) {
          extendSelection(this, clipPos(this, head), other && clipPos(this, other), options);
        }),
        extendSelections: docMethodOp(function(heads, options) {
          extendSelections(this, clipPosArray(this, heads), options);
        }),
        extendSelectionsBy: docMethodOp(function(f, options) {
          var heads = map(this.sel.ranges, f);
          extendSelections(this, clipPosArray(this, heads), options);
        }),
        setSelections: docMethodOp(function(ranges, primary, options) {
          if (!ranges.length) {
            return;
          }
          var out = [];
          for (var i2 = 0; i2 < ranges.length; i2++) {
            out[i2] = new Range(
              clipPos(this, ranges[i2].anchor),
              clipPos(this, ranges[i2].head || ranges[i2].anchor)
            );
          }
          if (primary == null) {
            primary = Math.min(ranges.length - 1, this.sel.primIndex);
          }
          setSelection(this, normalizeSelection(this.cm, out, primary), options);
        }),
        addSelection: docMethodOp(function(anchor, head, options) {
          var ranges = this.sel.ranges.slice(0);
          ranges.push(new Range(clipPos(this, anchor), clipPos(this, head || anchor)));
          setSelection(this, normalizeSelection(this.cm, ranges, ranges.length - 1), options);
        }),
        getSelection: function(lineSep) {
          var ranges = this.sel.ranges, lines;
          for (var i2 = 0; i2 < ranges.length; i2++) {
            var sel = getBetween(this, ranges[i2].from(), ranges[i2].to());
            lines = lines ? lines.concat(sel) : sel;
          }
          if (lineSep === false) {
            return lines;
          } else {
            return lines.join(lineSep || this.lineSeparator());
          }
        },
        getSelections: function(lineSep) {
          var parts = [], ranges = this.sel.ranges;
          for (var i2 = 0; i2 < ranges.length; i2++) {
            var sel = getBetween(this, ranges[i2].from(), ranges[i2].to());
            if (lineSep !== false) {
              sel = sel.join(lineSep || this.lineSeparator());
            }
            parts[i2] = sel;
          }
          return parts;
        },
        replaceSelection: function(code, collapse, origin) {
          var dup = [];
          for (var i2 = 0; i2 < this.sel.ranges.length; i2++) {
            dup[i2] = code;
          }
          this.replaceSelections(dup, collapse, origin || "+input");
        },
        replaceSelections: docMethodOp(function(code, collapse, origin) {
          var changes = [], sel = this.sel;
          for (var i2 = 0; i2 < sel.ranges.length; i2++) {
            var range2 = sel.ranges[i2];
            changes[i2] = { from: range2.from(), to: range2.to(), text: this.splitLines(code[i2]), origin };
          }
          var newSel = collapse && collapse != "end" && computeReplacedSel(this, changes, collapse);
          for (var i$12 = changes.length - 1; i$12 >= 0; i$12--) {
            makeChange(this, changes[i$12]);
          }
          if (newSel) {
            setSelectionReplaceHistory(this, newSel);
          } else if (this.cm) {
            ensureCursorVisible(this.cm);
          }
        }),
        undo: docMethodOp(function() {
          makeChangeFromHistory(this, "undo");
        }),
        redo: docMethodOp(function() {
          makeChangeFromHistory(this, "redo");
        }),
        undoSelection: docMethodOp(function() {
          makeChangeFromHistory(this, "undo", true);
        }),
        redoSelection: docMethodOp(function() {
          makeChangeFromHistory(this, "redo", true);
        }),
        setExtending: function(val) {
          this.extend = val;
        },
        getExtending: function() {
          return this.extend;
        },
        historySize: function() {
          var hist = this.history, done = 0, undone = 0;
          for (var i2 = 0; i2 < hist.done.length; i2++) {
            if (!hist.done[i2].ranges) {
              ++done;
            }
          }
          for (var i$12 = 0; i$12 < hist.undone.length; i$12++) {
            if (!hist.undone[i$12].ranges) {
              ++undone;
            }
          }
          return { undo: done, redo: undone };
        },
        clearHistory: function() {
          var this$1 = this;
          this.history = new History(this.history);
          linkedDocs(this, function(doc2) {
            return doc2.history = this$1.history;
          }, true);
        },
        markClean: function() {
          this.cleanGeneration = this.changeGeneration(true);
        },
        changeGeneration: function(forceSplit) {
          if (forceSplit) {
            this.history.lastOp = this.history.lastSelOp = this.history.lastOrigin = null;
          }
          return this.history.generation;
        },
        isClean: function(gen) {
          return this.history.generation == (gen || this.cleanGeneration);
        },
        getHistory: function() {
          return {
            done: copyHistoryArray(this.history.done),
            undone: copyHistoryArray(this.history.undone)
          };
        },
        setHistory: function(histData) {
          var hist = this.history = new History(this.history);
          hist.done = copyHistoryArray(histData.done.slice(0), null, true);
          hist.undone = copyHistoryArray(histData.undone.slice(0), null, true);
        },
        setGutterMarker: docMethodOp(function(line, gutterID, value) {
          return changeLine(this, line, "gutter", function(line2) {
            var markers = line2.gutterMarkers || (line2.gutterMarkers = {});
            markers[gutterID] = value;
            if (!value && isEmpty(markers)) {
              line2.gutterMarkers = null;
            }
            return true;
          });
        }),
        clearGutter: docMethodOp(function(gutterID) {
          var this$1 = this;
          this.iter(function(line) {
            if (line.gutterMarkers && line.gutterMarkers[gutterID]) {
              changeLine(this$1, line, "gutter", function() {
                line.gutterMarkers[gutterID] = null;
                if (isEmpty(line.gutterMarkers)) {
                  line.gutterMarkers = null;
                }
                return true;
              });
            }
          });
        }),
        lineInfo: function(line) {
          var n;
          if (typeof line == "number") {
            if (!isLine(this, line)) {
              return null;
            }
            n = line;
            line = getLine(this, line);
            if (!line) {
              return null;
            }
          } else {
            n = lineNo(line);
            if (n == null) {
              return null;
            }
          }
          return {
            line: n,
            handle: line,
            text: line.text,
            gutterMarkers: line.gutterMarkers,
            textClass: line.textClass,
            bgClass: line.bgClass,
            wrapClass: line.wrapClass,
            widgets: line.widgets
          };
        },
        addLineClass: docMethodOp(function(handle, where, cls) {
          return changeLine(this, handle, where == "gutter" ? "gutter" : "class", function(line) {
            var prop2 = where == "text" ? "textClass" : where == "background" ? "bgClass" : where == "gutter" ? "gutterClass" : "wrapClass";
            if (!line[prop2]) {
              line[prop2] = cls;
            } else if (classTest(cls).test(line[prop2])) {
              return false;
            } else {
              line[prop2] += " " + cls;
            }
            return true;
          });
        }),
        removeLineClass: docMethodOp(function(handle, where, cls) {
          return changeLine(this, handle, where == "gutter" ? "gutter" : "class", function(line) {
            var prop2 = where == "text" ? "textClass" : where == "background" ? "bgClass" : where == "gutter" ? "gutterClass" : "wrapClass";
            var cur = line[prop2];
            if (!cur) {
              return false;
            } else if (cls == null) {
              line[prop2] = null;
            } else {
              var found = cur.match(classTest(cls));
              if (!found) {
                return false;
              }
              var end = found.index + found[0].length;
              line[prop2] = cur.slice(0, found.index) + (!found.index || end == cur.length ? "" : " ") + cur.slice(end) || null;
            }
            return true;
          });
        }),
        addLineWidget: docMethodOp(function(handle, node, options) {
          return addLineWidget(this, handle, node, options);
        }),
        removeLineWidget: function(widget) {
          widget.clear();
        },
        markText: function(from, to, options) {
          return markText(this, clipPos(this, from), clipPos(this, to), options, options && options.type || "range");
        },
        setBookmark: function(pos, options) {
          var realOpts = {
            replacedWith: options && (options.nodeType == null ? options.widget : options),
            insertLeft: options && options.insertLeft,
            clearWhenEmpty: false,
            shared: options && options.shared,
            handleMouseEvents: options && options.handleMouseEvents
          };
          pos = clipPos(this, pos);
          return markText(this, pos, pos, realOpts, "bookmark");
        },
        findMarksAt: function(pos) {
          pos = clipPos(this, pos);
          var markers = [], spans = getLine(this, pos.line).markedSpans;
          if (spans) {
            for (var i2 = 0; i2 < spans.length; ++i2) {
              var span = spans[i2];
              if ((span.from == null || span.from <= pos.ch) && (span.to == null || span.to >= pos.ch)) {
                markers.push(span.marker.parent || span.marker);
              }
            }
          }
          return markers;
        },
        findMarks: function(from, to, filter) {
          from = clipPos(this, from);
          to = clipPos(this, to);
          var found = [], lineNo2 = from.line;
          this.iter(from.line, to.line + 1, function(line) {
            var spans = line.markedSpans;
            if (spans) {
              for (var i2 = 0; i2 < spans.length; i2++) {
                var span = spans[i2];
                if (!(span.to != null && lineNo2 == from.line && from.ch >= span.to || span.from == null && lineNo2 != from.line || span.from != null && lineNo2 == to.line && span.from >= to.ch) && (!filter || filter(span.marker))) {
                  found.push(span.marker.parent || span.marker);
                }
              }
            }
            ++lineNo2;
          });
          return found;
        },
        getAllMarks: function() {
          var markers = [];
          this.iter(function(line) {
            var sps = line.markedSpans;
            if (sps) {
              for (var i2 = 0; i2 < sps.length; ++i2) {
                if (sps[i2].from != null) {
                  markers.push(sps[i2].marker);
                }
              }
            }
          });
          return markers;
        },
        posFromIndex: function(off2) {
          var ch, lineNo2 = this.first, sepSize = this.lineSeparator().length;
          this.iter(function(line) {
            var sz = line.text.length + sepSize;
            if (sz > off2) {
              ch = off2;
              return true;
            }
            off2 -= sz;
            ++lineNo2;
          });
          return clipPos(this, Pos(lineNo2, ch));
        },
        indexFromPos: function(coords) {
          coords = clipPos(this, coords);
          var index = coords.ch;
          if (coords.line < this.first || coords.ch < 0) {
            return 0;
          }
          var sepSize = this.lineSeparator().length;
          this.iter(this.first, coords.line, function(line) {
            index += line.text.length + sepSize;
          });
          return index;
        },
        copy: function(copyHistory) {
          var doc2 = new Doc(
            getLines(this, this.first, this.first + this.size),
            this.modeOption,
            this.first,
            this.lineSep,
            this.direction
          );
          doc2.scrollTop = this.scrollTop;
          doc2.scrollLeft = this.scrollLeft;
          doc2.sel = this.sel;
          doc2.extend = false;
          if (copyHistory) {
            doc2.history.undoDepth = this.history.undoDepth;
            doc2.setHistory(this.getHistory());
          }
          return doc2;
        },
        linkedDoc: function(options) {
          if (!options) {
            options = {};
          }
          var from = this.first, to = this.first + this.size;
          if (options.from != null && options.from > from) {
            from = options.from;
          }
          if (options.to != null && options.to < to) {
            to = options.to;
          }
          var copy = new Doc(getLines(this, from, to), options.mode || this.modeOption, from, this.lineSep, this.direction);
          if (options.sharedHist) {
            copy.history = this.history;
          }
          (this.linked || (this.linked = [])).push({ doc: copy, sharedHist: options.sharedHist });
          copy.linked = [{ doc: this, isParent: true, sharedHist: options.sharedHist }];
          copySharedMarkers(copy, findSharedMarkers(this));
          return copy;
        },
        unlinkDoc: function(other) {
          if (other instanceof CodeMirror3) {
            other = other.doc;
          }
          if (this.linked) {
            for (var i2 = 0; i2 < this.linked.length; ++i2) {
              var link = this.linked[i2];
              if (link.doc != other) {
                continue;
              }
              this.linked.splice(i2, 1);
              other.unlinkDoc(this);
              detachSharedMarkers(findSharedMarkers(this));
              break;
            }
          }
          if (other.history == this.history) {
            var splitIds = [other.id];
            linkedDocs(other, function(doc2) {
              return splitIds.push(doc2.id);
            }, true);
            other.history = new History(null);
            other.history.done = copyHistoryArray(this.history.done, splitIds);
            other.history.undone = copyHistoryArray(this.history.undone, splitIds);
          }
        },
        iterLinkedDocs: function(f) {
          linkedDocs(this, f);
        },
        getMode: function() {
          return this.mode;
        },
        getEditor: function() {
          return this.cm;
        },
        splitLines: function(str) {
          if (this.lineSep) {
            return str.split(this.lineSep);
          }
          return splitLinesAuto(str);
        },
        lineSeparator: function() {
          return this.lineSep || "\n";
        },
        setDirection: docMethodOp(function(dir) {
          if (dir != "rtl") {
            dir = "ltr";
          }
          if (dir == this.direction) {
            return;
          }
          this.direction = dir;
          this.iter(function(line) {
            return line.order = null;
          });
          if (this.cm) {
            directionChanged(this.cm);
          }
        })
      });
      Doc.prototype.eachLine = Doc.prototype.iter;
      var lastDrop = 0;
      function onDrop(e) {
        var cm = this;
        clearDragCursor(cm);
        if (signalDOMEvent(cm, e) || eventInWidget(cm.display, e)) {
          return;
        }
        e_preventDefault(e);
        if (ie) {
          lastDrop = +new Date();
        }
        var pos = posFromMouse(cm, e, true), files = e.dataTransfer.files;
        if (!pos || cm.isReadOnly()) {
          return;
        }
        if (files && files.length && window.FileReader && window.File) {
          var n = files.length, text = Array(n), read = 0;
          var markAsReadAndPasteIfAllFilesAreRead = function() {
            if (++read == n) {
              operation(cm, function() {
                pos = clipPos(cm.doc, pos);
                var change = {
                  from: pos,
                  to: pos,
                  text: cm.doc.splitLines(
                    text.filter(function(t) {
                      return t != null;
                    }).join(cm.doc.lineSeparator())
                  ),
                  origin: "paste"
                };
                makeChange(cm.doc, change);
                setSelectionReplaceHistory(cm.doc, simpleSelection(clipPos(cm.doc, pos), clipPos(cm.doc, changeEnd(change))));
              })();
            }
          };
          var readTextFromFile = function(file, i3) {
            if (cm.options.allowDropFileTypes && indexOf(cm.options.allowDropFileTypes, file.type) == -1) {
              markAsReadAndPasteIfAllFilesAreRead();
              return;
            }
            var reader = new FileReader();
            reader.onerror = function() {
              return markAsReadAndPasteIfAllFilesAreRead();
            };
            reader.onload = function() {
              var content = reader.result;
              if (/[\x00-\x08\x0e-\x1f]{2}/.test(content)) {
                markAsReadAndPasteIfAllFilesAreRead();
                return;
              }
              text[i3] = content;
              markAsReadAndPasteIfAllFilesAreRead();
            };
            reader.readAsText(file);
          };
          for (var i2 = 0; i2 < files.length; i2++) {
            readTextFromFile(files[i2], i2);
          }
        } else {
          if (cm.state.draggingText && cm.doc.sel.contains(pos) > -1) {
            cm.state.draggingText(e);
            setTimeout(function() {
              return cm.display.input.focus();
            }, 20);
            return;
          }
          try {
            var text$1 = e.dataTransfer.getData("Text");
            if (text$1) {
              var selected;
              if (cm.state.draggingText && !cm.state.draggingText.copy) {
                selected = cm.listSelections();
              }
              setSelectionNoUndo(cm.doc, simpleSelection(pos, pos));
              if (selected) {
                for (var i$12 = 0; i$12 < selected.length; ++i$12) {
                  replaceRange(cm.doc, "", selected[i$12].anchor, selected[i$12].head, "drag");
                }
              }
              cm.replaceSelection(text$1, "around", "paste");
              cm.display.input.focus();
            }
          } catch (e$1) {
          }
        }
      }
      function onDragStart(cm, e) {
        if (ie && (!cm.state.draggingText || +new Date() - lastDrop < 100)) {
          e_stop(e);
          return;
        }
        if (signalDOMEvent(cm, e) || eventInWidget(cm.display, e)) {
          return;
        }
        e.dataTransfer.setData("Text", cm.getSelection());
        e.dataTransfer.effectAllowed = "copyMove";
        if (e.dataTransfer.setDragImage && !safari) {
          var img = elt("img", null, null, "position: fixed; left: 0; top: 0;");
          img.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
          if (presto) {
            img.width = img.height = 1;
            cm.display.wrapper.appendChild(img);
            img._top = img.offsetTop;
          }
          e.dataTransfer.setDragImage(img, 0, 0);
          if (presto) {
            img.parentNode.removeChild(img);
          }
        }
      }
      function onDragOver(cm, e) {
        var pos = posFromMouse(cm, e);
        if (!pos) {
          return;
        }
        var frag = document.createDocumentFragment();
        drawSelectionCursor(cm, pos, frag);
        if (!cm.display.dragCursor) {
          cm.display.dragCursor = elt("div", null, "CodeMirror-cursors CodeMirror-dragcursors");
          cm.display.lineSpace.insertBefore(cm.display.dragCursor, cm.display.cursorDiv);
        }
        removeChildrenAndAdd(cm.display.dragCursor, frag);
      }
      function clearDragCursor(cm) {
        if (cm.display.dragCursor) {
          cm.display.lineSpace.removeChild(cm.display.dragCursor);
          cm.display.dragCursor = null;
        }
      }
      function forEachCodeMirror(f) {
        if (!document.getElementsByClassName) {
          return;
        }
        var byClass = document.getElementsByClassName("CodeMirror"), editors = [];
        for (var i2 = 0; i2 < byClass.length; i2++) {
          var cm = byClass[i2].CodeMirror;
          if (cm) {
            editors.push(cm);
          }
        }
        if (editors.length) {
          editors[0].operation(function() {
            for (var i3 = 0; i3 < editors.length; i3++) {
              f(editors[i3]);
            }
          });
        }
      }
      var globalsRegistered = false;
      function ensureGlobalHandlers() {
        if (globalsRegistered) {
          return;
        }
        registerGlobalHandlers();
        globalsRegistered = true;
      }
      function registerGlobalHandlers() {
        var resizeTimer;
        on(window, "resize", function() {
          if (resizeTimer == null) {
            resizeTimer = setTimeout(function() {
              resizeTimer = null;
              forEachCodeMirror(onResize);
            }, 100);
          }
        });
        on(window, "blur", function() {
          return forEachCodeMirror(onBlur);
        });
      }
      function onResize(cm) {
        var d = cm.display;
        d.cachedCharWidth = d.cachedTextHeight = d.cachedPaddingH = null;
        d.scrollbarsClipped = false;
        cm.setSize();
      }
      var keyNames = {
        3: "Pause",
        8: "Backspace",
        9: "Tab",
        13: "Enter",
        16: "Shift",
        17: "Ctrl",
        18: "Alt",
        19: "Pause",
        20: "CapsLock",
        27: "Esc",
        32: "Space",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "Left",
        38: "Up",
        39: "Right",
        40: "Down",
        44: "PrintScrn",
        45: "Insert",
        46: "Delete",
        59: ";",
        61: "=",
        91: "Mod",
        92: "Mod",
        93: "Mod",
        106: "*",
        107: "=",
        109: "-",
        110: ".",
        111: "/",
        145: "ScrollLock",
        173: "-",
        186: ";",
        187: "=",
        188: ",",
        189: "-",
        190: ".",
        191: "/",
        192: "`",
        219: "[",
        220: "\\",
        221: "]",
        222: "'",
        224: "Mod",
        63232: "Up",
        63233: "Down",
        63234: "Left",
        63235: "Right",
        63272: "Delete",
        63273: "Home",
        63275: "End",
        63276: "PageUp",
        63277: "PageDown",
        63302: "Insert"
      };
      for (var i = 0; i < 10; i++) {
        keyNames[i + 48] = keyNames[i + 96] = String(i);
      }
      for (var i$1 = 65; i$1 <= 90; i$1++) {
        keyNames[i$1] = String.fromCharCode(i$1);
      }
      for (var i$2 = 1; i$2 <= 12; i$2++) {
        keyNames[i$2 + 111] = keyNames[i$2 + 63235] = "F" + i$2;
      }
      var keyMap = {};
      keyMap.basic = {
        "Left": "goCharLeft",
        "Right": "goCharRight",
        "Up": "goLineUp",
        "Down": "goLineDown",
        "End": "goLineEnd",
        "Home": "goLineStartSmart",
        "PageUp": "goPageUp",
        "PageDown": "goPageDown",
        "Delete": "delCharAfter",
        "Backspace": "delCharBefore",
        "Shift-Backspace": "delCharBefore",
        "Tab": "defaultTab",
        "Shift-Tab": "indentAuto",
        "Enter": "newlineAndIndent",
        "Insert": "toggleOverwrite",
        "Esc": "singleSelection"
      };
      keyMap.pcDefault = {
        "Ctrl-A": "selectAll",
        "Ctrl-D": "deleteLine",
        "Ctrl-Z": "undo",
        "Shift-Ctrl-Z": "redo",
        "Ctrl-Y": "redo",
        "Ctrl-Home": "goDocStart",
        "Ctrl-End": "goDocEnd",
        "Ctrl-Up": "goLineUp",
        "Ctrl-Down": "goLineDown",
        "Ctrl-Left": "goGroupLeft",
        "Ctrl-Right": "goGroupRight",
        "Alt-Left": "goLineStart",
        "Alt-Right": "goLineEnd",
        "Ctrl-Backspace": "delGroupBefore",
        "Ctrl-Delete": "delGroupAfter",
        "Ctrl-S": "save",
        "Ctrl-F": "find",
        "Ctrl-G": "findNext",
        "Shift-Ctrl-G": "findPrev",
        "Shift-Ctrl-F": "replace",
        "Shift-Ctrl-R": "replaceAll",
        "Ctrl-[": "indentLess",
        "Ctrl-]": "indentMore",
        "Ctrl-U": "undoSelection",
        "Shift-Ctrl-U": "redoSelection",
        "Alt-U": "redoSelection",
        "fallthrough": "basic"
      };
      keyMap.emacsy = {
        "Ctrl-F": "goCharRight",
        "Ctrl-B": "goCharLeft",
        "Ctrl-P": "goLineUp",
        "Ctrl-N": "goLineDown",
        "Ctrl-A": "goLineStart",
        "Ctrl-E": "goLineEnd",
        "Ctrl-V": "goPageDown",
        "Shift-Ctrl-V": "goPageUp",
        "Ctrl-D": "delCharAfter",
        "Ctrl-H": "delCharBefore",
        "Alt-Backspace": "delWordBefore",
        "Ctrl-K": "killLine",
        "Ctrl-T": "transposeChars",
        "Ctrl-O": "openLine"
      };
      keyMap.macDefault = {
        "Cmd-A": "selectAll",
        "Cmd-D": "deleteLine",
        "Cmd-Z": "undo",
        "Shift-Cmd-Z": "redo",
        "Cmd-Y": "redo",
        "Cmd-Home": "goDocStart",
        "Cmd-Up": "goDocStart",
        "Cmd-End": "goDocEnd",
        "Cmd-Down": "goDocEnd",
        "Alt-Left": "goGroupLeft",
        "Alt-Right": "goGroupRight",
        "Cmd-Left": "goLineLeft",
        "Cmd-Right": "goLineRight",
        "Alt-Backspace": "delGroupBefore",
        "Ctrl-Alt-Backspace": "delGroupAfter",
        "Alt-Delete": "delGroupAfter",
        "Cmd-S": "save",
        "Cmd-F": "find",
        "Cmd-G": "findNext",
        "Shift-Cmd-G": "findPrev",
        "Cmd-Alt-F": "replace",
        "Shift-Cmd-Alt-F": "replaceAll",
        "Cmd-[": "indentLess",
        "Cmd-]": "indentMore",
        "Cmd-Backspace": "delWrappedLineLeft",
        "Cmd-Delete": "delWrappedLineRight",
        "Cmd-U": "undoSelection",
        "Shift-Cmd-U": "redoSelection",
        "Ctrl-Up": "goDocStart",
        "Ctrl-Down": "goDocEnd",
        "fallthrough": ["basic", "emacsy"]
      };
      keyMap["default"] = mac ? keyMap.macDefault : keyMap.pcDefault;
      function normalizeKeyName(name) {
        var parts = name.split(/-(?!$)/);
        name = parts[parts.length - 1];
        var alt, ctrl, shift, cmd;
        for (var i2 = 0; i2 < parts.length - 1; i2++) {
          var mod = parts[i2];
          if (/^(cmd|meta|m)$/i.test(mod)) {
            cmd = true;
          } else if (/^a(lt)?$/i.test(mod)) {
            alt = true;
          } else if (/^(c|ctrl|control)$/i.test(mod)) {
            ctrl = true;
          } else if (/^s(hift)?$/i.test(mod)) {
            shift = true;
          } else {
            throw new Error("Unrecognized modifier name: " + mod);
          }
        }
        if (alt) {
          name = "Alt-" + name;
        }
        if (ctrl) {
          name = "Ctrl-" + name;
        }
        if (cmd) {
          name = "Cmd-" + name;
        }
        if (shift) {
          name = "Shift-" + name;
        }
        return name;
      }
      function normalizeKeyMap(keymap) {
        var copy = {};
        for (var keyname in keymap) {
          if (keymap.hasOwnProperty(keyname)) {
            var value = keymap[keyname];
            if (/^(name|fallthrough|(de|at)tach)$/.test(keyname)) {
              continue;
            }
            if (value == "...") {
              delete keymap[keyname];
              continue;
            }
            var keys = map(keyname.split(" "), normalizeKeyName);
            for (var i2 = 0; i2 < keys.length; i2++) {
              var val = void 0, name = void 0;
              if (i2 == keys.length - 1) {
                name = keys.join(" ");
                val = value;
              } else {
                name = keys.slice(0, i2 + 1).join(" ");
                val = "...";
              }
              var prev = copy[name];
              if (!prev) {
                copy[name] = val;
              } else if (prev != val) {
                throw new Error("Inconsistent bindings for " + name);
              }
            }
            delete keymap[keyname];
          }
        }
        for (var prop2 in copy) {
          keymap[prop2] = copy[prop2];
        }
        return keymap;
      }
      function lookupKey(key, map2, handle, context) {
        map2 = getKeyMap(map2);
        var found = map2.call ? map2.call(key, context) : map2[key];
        if (found === false) {
          return "nothing";
        }
        if (found === "...") {
          return "multi";
        }
        if (found != null && handle(found)) {
          return "handled";
        }
        if (map2.fallthrough) {
          if (Object.prototype.toString.call(map2.fallthrough) != "[object Array]") {
            return lookupKey(key, map2.fallthrough, handle, context);
          }
          for (var i2 = 0; i2 < map2.fallthrough.length; i2++) {
            var result = lookupKey(key, map2.fallthrough[i2], handle, context);
            if (result) {
              return result;
            }
          }
        }
      }
      function isModifierKey(value) {
        var name = typeof value == "string" ? value : keyNames[value.keyCode];
        return name == "Ctrl" || name == "Alt" || name == "Shift" || name == "Mod";
      }
      function addModifierNames(name, event, noShift) {
        var base = name;
        if (event.altKey && base != "Alt") {
          name = "Alt-" + name;
        }
        if ((flipCtrlCmd ? event.metaKey : event.ctrlKey) && base != "Ctrl") {
          name = "Ctrl-" + name;
        }
        if ((flipCtrlCmd ? event.ctrlKey : event.metaKey) && base != "Mod") {
          name = "Cmd-" + name;
        }
        if (!noShift && event.shiftKey && base != "Shift") {
          name = "Shift-" + name;
        }
        return name;
      }
      function keyName(event, noShift) {
        if (presto && event.keyCode == 34 && event["char"]) {
          return false;
        }
        var name = keyNames[event.keyCode];
        if (name == null || event.altGraphKey) {
          return false;
        }
        if (event.keyCode == 3 && event.code) {
          name = event.code;
        }
        return addModifierNames(name, event, noShift);
      }
      function getKeyMap(val) {
        return typeof val == "string" ? keyMap[val] : val;
      }
      function deleteNearSelection(cm, compute) {
        var ranges = cm.doc.sel.ranges, kill = [];
        for (var i2 = 0; i2 < ranges.length; i2++) {
          var toKill = compute(ranges[i2]);
          while (kill.length && cmp(toKill.from, lst(kill).to) <= 0) {
            var replaced = kill.pop();
            if (cmp(replaced.from, toKill.from) < 0) {
              toKill.from = replaced.from;
              break;
            }
          }
          kill.push(toKill);
        }
        runInOp(cm, function() {
          for (var i3 = kill.length - 1; i3 >= 0; i3--) {
            replaceRange(cm.doc, "", kill[i3].from, kill[i3].to, "+delete");
          }
          ensureCursorVisible(cm);
        });
      }
      function moveCharLogically(line, ch, dir) {
        var target = skipExtendingChars(line.text, ch + dir, dir);
        return target < 0 || target > line.text.length ? null : target;
      }
      function moveLogically(line, start, dir) {
        var ch = moveCharLogically(line, start.ch, dir);
        return ch == null ? null : new Pos(start.line, ch, dir < 0 ? "after" : "before");
      }
      function endOfLine(visually, cm, lineObj, lineNo2, dir) {
        if (visually) {
          if (cm.doc.direction == "rtl") {
            dir = -dir;
          }
          var order = getOrder(lineObj, cm.doc.direction);
          if (order) {
            var part = dir < 0 ? lst(order) : order[0];
            var moveInStorageOrder = dir < 0 == (part.level == 1);
            var sticky = moveInStorageOrder ? "after" : "before";
            var ch;
            if (part.level > 0 || cm.doc.direction == "rtl") {
              var prep = prepareMeasureForLine(cm, lineObj);
              ch = dir < 0 ? lineObj.text.length - 1 : 0;
              var targetTop = measureCharPrepared(cm, prep, ch).top;
              ch = findFirst(function(ch2) {
                return measureCharPrepared(cm, prep, ch2).top == targetTop;
              }, dir < 0 == (part.level == 1) ? part.from : part.to - 1, ch);
              if (sticky == "before") {
                ch = moveCharLogically(lineObj, ch, 1);
              }
            } else {
              ch = dir < 0 ? part.to : part.from;
            }
            return new Pos(lineNo2, ch, sticky);
          }
        }
        return new Pos(lineNo2, dir < 0 ? lineObj.text.length : 0, dir < 0 ? "before" : "after");
      }
      function moveVisually(cm, line, start, dir) {
        var bidi = getOrder(line, cm.doc.direction);
        if (!bidi) {
          return moveLogically(line, start, dir);
        }
        if (start.ch >= line.text.length) {
          start.ch = line.text.length;
          start.sticky = "before";
        } else if (start.ch <= 0) {
          start.ch = 0;
          start.sticky = "after";
        }
        var partPos = getBidiPartAt(bidi, start.ch, start.sticky), part = bidi[partPos];
        if (cm.doc.direction == "ltr" && part.level % 2 == 0 && (dir > 0 ? part.to > start.ch : part.from < start.ch)) {
          return moveLogically(line, start, dir);
        }
        var mv = function(pos, dir2) {
          return moveCharLogically(line, pos instanceof Pos ? pos.ch : pos, dir2);
        };
        var prep;
        var getWrappedLineExtent = function(ch2) {
          if (!cm.options.lineWrapping) {
            return { begin: 0, end: line.text.length };
          }
          prep = prep || prepareMeasureForLine(cm, line);
          return wrappedLineExtentChar(cm, line, prep, ch2);
        };
        var wrappedLineExtent2 = getWrappedLineExtent(start.sticky == "before" ? mv(start, -1) : start.ch);
        if (cm.doc.direction == "rtl" || part.level == 1) {
          var moveInStorageOrder = part.level == 1 == dir < 0;
          var ch = mv(start, moveInStorageOrder ? 1 : -1);
          if (ch != null && (!moveInStorageOrder ? ch >= part.from && ch >= wrappedLineExtent2.begin : ch <= part.to && ch <= wrappedLineExtent2.end)) {
            var sticky = moveInStorageOrder ? "before" : "after";
            return new Pos(start.line, ch, sticky);
          }
        }
        var searchInVisualLine = function(partPos2, dir2, wrappedLineExtent3) {
          var getRes = function(ch3, moveInStorageOrder3) {
            return moveInStorageOrder3 ? new Pos(start.line, mv(ch3, 1), "before") : new Pos(start.line, ch3, "after");
          };
          for (; partPos2 >= 0 && partPos2 < bidi.length; partPos2 += dir2) {
            var part2 = bidi[partPos2];
            var moveInStorageOrder2 = dir2 > 0 == (part2.level != 1);
            var ch2 = moveInStorageOrder2 ? wrappedLineExtent3.begin : mv(wrappedLineExtent3.end, -1);
            if (part2.from <= ch2 && ch2 < part2.to) {
              return getRes(ch2, moveInStorageOrder2);
            }
            ch2 = moveInStorageOrder2 ? part2.from : mv(part2.to, -1);
            if (wrappedLineExtent3.begin <= ch2 && ch2 < wrappedLineExtent3.end) {
              return getRes(ch2, moveInStorageOrder2);
            }
          }
        };
        var res = searchInVisualLine(partPos + dir, dir, wrappedLineExtent2);
        if (res) {
          return res;
        }
        var nextCh = dir > 0 ? wrappedLineExtent2.end : mv(wrappedLineExtent2.begin, -1);
        if (nextCh != null && !(dir > 0 && nextCh == line.text.length)) {
          res = searchInVisualLine(dir > 0 ? 0 : bidi.length - 1, dir, getWrappedLineExtent(nextCh));
          if (res) {
            return res;
          }
        }
        return null;
      }
      var commands = {
        selectAll,
        singleSelection: function(cm) {
          return cm.setSelection(cm.getCursor("anchor"), cm.getCursor("head"), sel_dontScroll);
        },
        killLine: function(cm) {
          return deleteNearSelection(cm, function(range2) {
            if (range2.empty()) {
              var len = getLine(cm.doc, range2.head.line).text.length;
              if (range2.head.ch == len && range2.head.line < cm.lastLine()) {
                return { from: range2.head, to: Pos(range2.head.line + 1, 0) };
              } else {
                return { from: range2.head, to: Pos(range2.head.line, len) };
              }
            } else {
              return { from: range2.from(), to: range2.to() };
            }
          });
        },
        deleteLine: function(cm) {
          return deleteNearSelection(cm, function(range2) {
            return {
              from: Pos(range2.from().line, 0),
              to: clipPos(cm.doc, Pos(range2.to().line + 1, 0))
            };
          });
        },
        delLineLeft: function(cm) {
          return deleteNearSelection(cm, function(range2) {
            return {
              from: Pos(range2.from().line, 0),
              to: range2.from()
            };
          });
        },
        delWrappedLineLeft: function(cm) {
          return deleteNearSelection(cm, function(range2) {
            var top = cm.charCoords(range2.head, "div").top + 5;
            var leftPos = cm.coordsChar({ left: 0, top }, "div");
            return { from: leftPos, to: range2.from() };
          });
        },
        delWrappedLineRight: function(cm) {
          return deleteNearSelection(cm, function(range2) {
            var top = cm.charCoords(range2.head, "div").top + 5;
            var rightPos = cm.coordsChar({ left: cm.display.lineDiv.offsetWidth + 100, top }, "div");
            return { from: range2.from(), to: rightPos };
          });
        },
        undo: function(cm) {
          return cm.undo();
        },
        redo: function(cm) {
          return cm.redo();
        },
        undoSelection: function(cm) {
          return cm.undoSelection();
        },
        redoSelection: function(cm) {
          return cm.redoSelection();
        },
        goDocStart: function(cm) {
          return cm.extendSelection(Pos(cm.firstLine(), 0));
        },
        goDocEnd: function(cm) {
          return cm.extendSelection(Pos(cm.lastLine()));
        },
        goLineStart: function(cm) {
          return cm.extendSelectionsBy(
            function(range2) {
              return lineStart(cm, range2.head.line);
            },
            { origin: "+move", bias: 1 }
          );
        },
        goLineStartSmart: function(cm) {
          return cm.extendSelectionsBy(
            function(range2) {
              return lineStartSmart(cm, range2.head);
            },
            { origin: "+move", bias: 1 }
          );
        },
        goLineEnd: function(cm) {
          return cm.extendSelectionsBy(
            function(range2) {
              return lineEnd(cm, range2.head.line);
            },
            { origin: "+move", bias: -1 }
          );
        },
        goLineRight: function(cm) {
          return cm.extendSelectionsBy(function(range2) {
            var top = cm.cursorCoords(range2.head, "div").top + 5;
            return cm.coordsChar({ left: cm.display.lineDiv.offsetWidth + 100, top }, "div");
          }, sel_move);
        },
        goLineLeft: function(cm) {
          return cm.extendSelectionsBy(function(range2) {
            var top = cm.cursorCoords(range2.head, "div").top + 5;
            return cm.coordsChar({ left: 0, top }, "div");
          }, sel_move);
        },
        goLineLeftSmart: function(cm) {
          return cm.extendSelectionsBy(function(range2) {
            var top = cm.cursorCoords(range2.head, "div").top + 5;
            var pos = cm.coordsChar({ left: 0, top }, "div");
            if (pos.ch < cm.getLine(pos.line).search(/\S/)) {
              return lineStartSmart(cm, range2.head);
            }
            return pos;
          }, sel_move);
        },
        goLineUp: function(cm) {
          return cm.moveV(-1, "line");
        },
        goLineDown: function(cm) {
          return cm.moveV(1, "line");
        },
        goPageUp: function(cm) {
          return cm.moveV(-1, "page");
        },
        goPageDown: function(cm) {
          return cm.moveV(1, "page");
        },
        goCharLeft: function(cm) {
          return cm.moveH(-1, "char");
        },
        goCharRight: function(cm) {
          return cm.moveH(1, "char");
        },
        goColumnLeft: function(cm) {
          return cm.moveH(-1, "column");
        },
        goColumnRight: function(cm) {
          return cm.moveH(1, "column");
        },
        goWordLeft: function(cm) {
          return cm.moveH(-1, "word");
        },
        goGroupRight: function(cm) {
          return cm.moveH(1, "group");
        },
        goGroupLeft: function(cm) {
          return cm.moveH(-1, "group");
        },
        goWordRight: function(cm) {
          return cm.moveH(1, "word");
        },
        delCharBefore: function(cm) {
          return cm.deleteH(-1, "codepoint");
        },
        delCharAfter: function(cm) {
          return cm.deleteH(1, "char");
        },
        delWordBefore: function(cm) {
          return cm.deleteH(-1, "word");
        },
        delWordAfter: function(cm) {
          return cm.deleteH(1, "word");
        },
        delGroupBefore: function(cm) {
          return cm.deleteH(-1, "group");
        },
        delGroupAfter: function(cm) {
          return cm.deleteH(1, "group");
        },
        indentAuto: function(cm) {
          return cm.indentSelection("smart");
        },
        indentMore: function(cm) {
          return cm.indentSelection("add");
        },
        indentLess: function(cm) {
          return cm.indentSelection("subtract");
        },
        insertTab: function(cm) {
          return cm.replaceSelection("	");
        },
        insertSoftTab: function(cm) {
          var spaces = [], ranges = cm.listSelections(), tabSize = cm.options.tabSize;
          for (var i2 = 0; i2 < ranges.length; i2++) {
            var pos = ranges[i2].from();
            var col = countColumn(cm.getLine(pos.line), pos.ch, tabSize);
            spaces.push(spaceStr(tabSize - col % tabSize));
          }
          cm.replaceSelections(spaces);
        },
        defaultTab: function(cm) {
          if (cm.somethingSelected()) {
            cm.indentSelection("add");
          } else {
            cm.execCommand("insertTab");
          }
        },
        // Swap the two chars left and right of each selection's head.
        // Move cursor behind the two swapped characters afterwards.
        //
        // Doesn't consider line feeds a character.
        // Doesn't scan more than one line above to find a character.
        // Doesn't do anything on an empty line.
        // Doesn't do anything with non-empty selections.
        transposeChars: function(cm) {
          return runInOp(cm, function() {
            var ranges = cm.listSelections(), newSel = [];
            for (var i2 = 0; i2 < ranges.length; i2++) {
              if (!ranges[i2].empty()) {
                continue;
              }
              var cur = ranges[i2].head, line = getLine(cm.doc, cur.line).text;
              if (line) {
                if (cur.ch == line.length) {
                  cur = new Pos(cur.line, cur.ch - 1);
                }
                if (cur.ch > 0) {
                  cur = new Pos(cur.line, cur.ch + 1);
                  cm.replaceRange(
                    line.charAt(cur.ch - 1) + line.charAt(cur.ch - 2),
                    Pos(cur.line, cur.ch - 2),
                    cur,
                    "+transpose"
                  );
                } else if (cur.line > cm.doc.first) {
                  var prev = getLine(cm.doc, cur.line - 1).text;
                  if (prev) {
                    cur = new Pos(cur.line, 1);
                    cm.replaceRange(
                      line.charAt(0) + cm.doc.lineSeparator() + prev.charAt(prev.length - 1),
                      Pos(cur.line - 1, prev.length - 1),
                      cur,
                      "+transpose"
                    );
                  }
                }
              }
              newSel.push(new Range(cur, cur));
            }
            cm.setSelections(newSel);
          });
        },
        newlineAndIndent: function(cm) {
          return runInOp(cm, function() {
            var sels = cm.listSelections();
            for (var i2 = sels.length - 1; i2 >= 0; i2--) {
              cm.replaceRange(cm.doc.lineSeparator(), sels[i2].anchor, sels[i2].head, "+input");
            }
            sels = cm.listSelections();
            for (var i$12 = 0; i$12 < sels.length; i$12++) {
              cm.indentLine(sels[i$12].from().line, null, true);
            }
            ensureCursorVisible(cm);
          });
        },
        openLine: function(cm) {
          return cm.replaceSelection("\n", "start");
        },
        toggleOverwrite: function(cm) {
          return cm.toggleOverwrite();
        }
      };
      function lineStart(cm, lineN) {
        var line = getLine(cm.doc, lineN);
        var visual = visualLine(line);
        if (visual != line) {
          lineN = lineNo(visual);
        }
        return endOfLine(true, cm, visual, lineN, 1);
      }
      function lineEnd(cm, lineN) {
        var line = getLine(cm.doc, lineN);
        var visual = visualLineEnd(line);
        if (visual != line) {
          lineN = lineNo(visual);
        }
        return endOfLine(true, cm, line, lineN, -1);
      }
      function lineStartSmart(cm, pos) {
        var start = lineStart(cm, pos.line);
        var line = getLine(cm.doc, start.line);
        var order = getOrder(line, cm.doc.direction);
        if (!order || order[0].level == 0) {
          var firstNonWS = Math.max(start.ch, line.text.search(/\S/));
          var inWS = pos.line == start.line && pos.ch <= firstNonWS && pos.ch;
          return Pos(start.line, inWS ? 0 : firstNonWS, start.sticky);
        }
        return start;
      }
      function doHandleBinding(cm, bound, dropShift) {
        if (typeof bound == "string") {
          bound = commands[bound];
          if (!bound) {
            return false;
          }
        }
        cm.display.input.ensurePolled();
        var prevShift = cm.display.shift, done = false;
        try {
          if (cm.isReadOnly()) {
            cm.state.suppressEdits = true;
          }
          if (dropShift) {
            cm.display.shift = false;
          }
          done = bound(cm) != Pass;
        } finally {
          cm.display.shift = prevShift;
          cm.state.suppressEdits = false;
        }
        return done;
      }
      function lookupKeyForEditor(cm, name, handle) {
        for (var i2 = 0; i2 < cm.state.keyMaps.length; i2++) {
          var result = lookupKey(name, cm.state.keyMaps[i2], handle, cm);
          if (result) {
            return result;
          }
        }
        return cm.options.extraKeys && lookupKey(name, cm.options.extraKeys, handle, cm) || lookupKey(name, cm.options.keyMap, handle, cm);
      }
      var stopSeq = new Delayed();
      function dispatchKey(cm, name, e, handle) {
        var seq = cm.state.keySeq;
        if (seq) {
          if (isModifierKey(name)) {
            return "handled";
          }
          if (/\'$/.test(name)) {
            cm.state.keySeq = null;
          } else {
            stopSeq.set(50, function() {
              if (cm.state.keySeq == seq) {
                cm.state.keySeq = null;
                cm.display.input.reset();
              }
            });
          }
          if (dispatchKeyInner(cm, seq + " " + name, e, handle)) {
            return true;
          }
        }
        return dispatchKeyInner(cm, name, e, handle);
      }
      function dispatchKeyInner(cm, name, e, handle) {
        var result = lookupKeyForEditor(cm, name, handle);
        if (result == "multi") {
          cm.state.keySeq = name;
        }
        if (result == "handled") {
          signalLater(cm, "keyHandled", cm, name, e);
        }
        if (result == "handled" || result == "multi") {
          e_preventDefault(e);
          restartBlink(cm);
        }
        return !!result;
      }
      function handleKeyBinding(cm, e) {
        var name = keyName(e, true);
        if (!name) {
          return false;
        }
        if (e.shiftKey && !cm.state.keySeq) {
          return dispatchKey(cm, "Shift-" + name, e, function(b) {
            return doHandleBinding(cm, b, true);
          }) || dispatchKey(cm, name, e, function(b) {
            if (typeof b == "string" ? /^go[A-Z]/.test(b) : b.motion) {
              return doHandleBinding(cm, b);
            }
          });
        } else {
          return dispatchKey(cm, name, e, function(b) {
            return doHandleBinding(cm, b);
          });
        }
      }
      function handleCharBinding(cm, e, ch) {
        return dispatchKey(cm, "'" + ch + "'", e, function(b) {
          return doHandleBinding(cm, b, true);
        });
      }
      var lastStoppedKey = null;
      function onKeyDown(e) {
        var cm = this;
        if (e.target && e.target != cm.display.input.getField()) {
          return;
        }
        cm.curOp.focus = activeElt(doc(cm));
        if (signalDOMEvent(cm, e)) {
          return;
        }
        if (ie && ie_version < 11 && e.keyCode == 27) {
          e.returnValue = false;
        }
        var code = e.keyCode;
        cm.display.shift = code == 16 || e.shiftKey;
        var handled = handleKeyBinding(cm, e);
        if (presto) {
          lastStoppedKey = handled ? code : null;
          if (!handled && code == 88 && !hasCopyEvent && (mac ? e.metaKey : e.ctrlKey)) {
            cm.replaceSelection("", null, "cut");
          }
        }
        if (gecko && !mac && !handled && code == 46 && e.shiftKey && !e.ctrlKey && document.execCommand) {
          document.execCommand("cut");
        }
        if (code == 18 && !/\bCodeMirror-crosshair\b/.test(cm.display.lineDiv.className)) {
          showCrossHair(cm);
        }
      }
      function showCrossHair(cm) {
        var lineDiv = cm.display.lineDiv;
        addClass(lineDiv, "CodeMirror-crosshair");
        function up(e) {
          if (e.keyCode == 18 || !e.altKey) {
            rmClass(lineDiv, "CodeMirror-crosshair");
            off(document, "keyup", up);
            off(document, "mouseover", up);
          }
        }
        on(document, "keyup", up);
        on(document, "mouseover", up);
      }
      function onKeyUp(e) {
        if (e.keyCode == 16) {
          this.doc.sel.shift = false;
        }
        signalDOMEvent(this, e);
      }
      function onKeyPress(e) {
        var cm = this;
        if (e.target && e.target != cm.display.input.getField()) {
          return;
        }
        if (eventInWidget(cm.display, e) || signalDOMEvent(cm, e) || e.ctrlKey && !e.altKey || mac && e.metaKey) {
          return;
        }
        var keyCode = e.keyCode, charCode = e.charCode;
        if (presto && keyCode == lastStoppedKey) {
          lastStoppedKey = null;
          e_preventDefault(e);
          return;
        }
        if (presto && (!e.which || e.which < 10) && handleKeyBinding(cm, e)) {
          return;
        }
        var ch = String.fromCharCode(charCode == null ? keyCode : charCode);
        if (ch == "\b") {
          return;
        }
        if (handleCharBinding(cm, e, ch)) {
          return;
        }
        cm.display.input.onKeyPress(e);
      }
      var DOUBLECLICK_DELAY = 400;
      var PastClick = function(time, pos, button) {
        this.time = time;
        this.pos = pos;
        this.button = button;
      };
      PastClick.prototype.compare = function(time, pos, button) {
        return this.time + DOUBLECLICK_DELAY > time && cmp(pos, this.pos) == 0 && button == this.button;
      };
      var lastClick, lastDoubleClick;
      function clickRepeat(pos, button) {
        var now = +new Date();
        if (lastDoubleClick && lastDoubleClick.compare(now, pos, button)) {
          lastClick = lastDoubleClick = null;
          return "triple";
        } else if (lastClick && lastClick.compare(now, pos, button)) {
          lastDoubleClick = new PastClick(now, pos, button);
          lastClick = null;
          return "double";
        } else {
          lastClick = new PastClick(now, pos, button);
          lastDoubleClick = null;
          return "single";
        }
      }
      function onMouseDown(e) {
        var cm = this, display = cm.display;
        if (signalDOMEvent(cm, e) || display.activeTouch && display.input.supportsTouch()) {
          return;
        }
        display.input.ensurePolled();
        display.shift = e.shiftKey;
        if (eventInWidget(display, e)) {
          if (!webkit) {
            display.scroller.draggable = false;
            setTimeout(function() {
              return display.scroller.draggable = true;
            }, 100);
          }
          return;
        }
        if (clickInGutter(cm, e)) {
          return;
        }
        var pos = posFromMouse(cm, e), button = e_button(e), repeat = pos ? clickRepeat(pos, button) : "single";
        win(cm).focus();
        if (button == 1 && cm.state.selectingText) {
          cm.state.selectingText(e);
        }
        if (pos && handleMappedButton(cm, button, pos, repeat, e)) {
          return;
        }
        if (button == 1) {
          if (pos) {
            leftButtonDown(cm, pos, repeat, e);
          } else if (e_target(e) == display.scroller) {
            e_preventDefault(e);
          }
        } else if (button == 2) {
          if (pos) {
            extendSelection(cm.doc, pos);
          }
          setTimeout(function() {
            return display.input.focus();
          }, 20);
        } else if (button == 3) {
          if (captureRightClick) {
            cm.display.input.onContextMenu(e);
          } else {
            delayBlurEvent(cm);
          }
        }
      }
      function handleMappedButton(cm, button, pos, repeat, event) {
        var name = "Click";
        if (repeat == "double") {
          name = "Double" + name;
        } else if (repeat == "triple") {
          name = "Triple" + name;
        }
        name = (button == 1 ? "Left" : button == 2 ? "Middle" : "Right") + name;
        return dispatchKey(cm, addModifierNames(name, event), event, function(bound) {
          if (typeof bound == "string") {
            bound = commands[bound];
          }
          if (!bound) {
            return false;
          }
          var done = false;
          try {
            if (cm.isReadOnly()) {
              cm.state.suppressEdits = true;
            }
            done = bound(cm, pos) != Pass;
          } finally {
            cm.state.suppressEdits = false;
          }
          return done;
        });
      }
      function configureMouse(cm, repeat, event) {
        var option = cm.getOption("configureMouse");
        var value = option ? option(cm, repeat, event) : {};
        if (value.unit == null) {
          var rect = chromeOS ? event.shiftKey && event.metaKey : event.altKey;
          value.unit = rect ? "rectangle" : repeat == "single" ? "char" : repeat == "double" ? "word" : "line";
        }
        if (value.extend == null || cm.doc.extend) {
          value.extend = cm.doc.extend || event.shiftKey;
        }
        if (value.addNew == null) {
          value.addNew = mac ? event.metaKey : event.ctrlKey;
        }
        if (value.moveOnDrag == null) {
          value.moveOnDrag = !(mac ? event.altKey : event.ctrlKey);
        }
        return value;
      }
      function leftButtonDown(cm, pos, repeat, event) {
        if (ie) {
          setTimeout(bind(ensureFocus, cm), 0);
        } else {
          cm.curOp.focus = activeElt(doc(cm));
        }
        var behavior = configureMouse(cm, repeat, event);
        var sel = cm.doc.sel, contained;
        if (cm.options.dragDrop && dragAndDrop && !cm.isReadOnly() && repeat == "single" && (contained = sel.contains(pos)) > -1 && (cmp((contained = sel.ranges[contained]).from(), pos) < 0 || pos.xRel > 0) && (cmp(contained.to(), pos) > 0 || pos.xRel < 0)) {
          leftButtonStartDrag(cm, event, pos, behavior);
        } else {
          leftButtonSelect(cm, event, pos, behavior);
        }
      }
      function leftButtonStartDrag(cm, event, pos, behavior) {
        var display = cm.display, moved = false;
        var dragEnd = operation(cm, function(e) {
          if (webkit) {
            display.scroller.draggable = false;
          }
          cm.state.draggingText = false;
          if (cm.state.delayingBlurEvent) {
            if (cm.hasFocus()) {
              cm.state.delayingBlurEvent = false;
            } else {
              delayBlurEvent(cm);
            }
          }
          off(display.wrapper.ownerDocument, "mouseup", dragEnd);
          off(display.wrapper.ownerDocument, "mousemove", mouseMove);
          off(display.scroller, "dragstart", dragStart);
          off(display.scroller, "drop", dragEnd);
          if (!moved) {
            e_preventDefault(e);
            if (!behavior.addNew) {
              extendSelection(cm.doc, pos, null, null, behavior.extend);
            }
            if (webkit && !safari || ie && ie_version == 9) {
              setTimeout(function() {
                display.wrapper.ownerDocument.body.focus({ preventScroll: true });
                display.input.focus();
              }, 20);
            } else {
              display.input.focus();
            }
          }
        });
        var mouseMove = function(e2) {
          moved = moved || Math.abs(event.clientX - e2.clientX) + Math.abs(event.clientY - e2.clientY) >= 10;
        };
        var dragStart = function() {
          return moved = true;
        };
        if (webkit) {
          display.scroller.draggable = true;
        }
        cm.state.draggingText = dragEnd;
        dragEnd.copy = !behavior.moveOnDrag;
        on(display.wrapper.ownerDocument, "mouseup", dragEnd);
        on(display.wrapper.ownerDocument, "mousemove", mouseMove);
        on(display.scroller, "dragstart", dragStart);
        on(display.scroller, "drop", dragEnd);
        cm.state.delayingBlurEvent = true;
        setTimeout(function() {
          return display.input.focus();
        }, 20);
        if (display.scroller.dragDrop) {
          display.scroller.dragDrop();
        }
      }
      function rangeForUnit(cm, pos, unit) {
        if (unit == "char") {
          return new Range(pos, pos);
        }
        if (unit == "word") {
          return cm.findWordAt(pos);
        }
        if (unit == "line") {
          return new Range(Pos(pos.line, 0), clipPos(cm.doc, Pos(pos.line + 1, 0)));
        }
        var result = unit(cm, pos);
        return new Range(result.from, result.to);
      }
      function leftButtonSelect(cm, event, start, behavior) {
        if (ie) {
          delayBlurEvent(cm);
        }
        var display = cm.display, doc$1 = cm.doc;
        e_preventDefault(event);
        var ourRange, ourIndex, startSel = doc$1.sel, ranges = startSel.ranges;
        if (behavior.addNew && !behavior.extend) {
          ourIndex = doc$1.sel.contains(start);
          if (ourIndex > -1) {
            ourRange = ranges[ourIndex];
          } else {
            ourRange = new Range(start, start);
          }
        } else {
          ourRange = doc$1.sel.primary();
          ourIndex = doc$1.sel.primIndex;
        }
        if (behavior.unit == "rectangle") {
          if (!behavior.addNew) {
            ourRange = new Range(start, start);
          }
          start = posFromMouse(cm, event, true, true);
          ourIndex = -1;
        } else {
          var range2 = rangeForUnit(cm, start, behavior.unit);
          if (behavior.extend) {
            ourRange = extendRange(ourRange, range2.anchor, range2.head, behavior.extend);
          } else {
            ourRange = range2;
          }
        }
        if (!behavior.addNew) {
          ourIndex = 0;
          setSelection(doc$1, new Selection([ourRange], 0), sel_mouse);
          startSel = doc$1.sel;
        } else if (ourIndex == -1) {
          ourIndex = ranges.length;
          setSelection(
            doc$1,
            normalizeSelection(cm, ranges.concat([ourRange]), ourIndex),
            { scroll: false, origin: "*mouse" }
          );
        } else if (ranges.length > 1 && ranges[ourIndex].empty() && behavior.unit == "char" && !behavior.extend) {
          setSelection(
            doc$1,
            normalizeSelection(cm, ranges.slice(0, ourIndex).concat(ranges.slice(ourIndex + 1)), 0),
            { scroll: false, origin: "*mouse" }
          );
          startSel = doc$1.sel;
        } else {
          replaceOneSelection(doc$1, ourIndex, ourRange, sel_mouse);
        }
        var lastPos = start;
        function extendTo(pos) {
          if (cmp(lastPos, pos) == 0) {
            return;
          }
          lastPos = pos;
          if (behavior.unit == "rectangle") {
            var ranges2 = [], tabSize = cm.options.tabSize;
            var startCol = countColumn(getLine(doc$1, start.line).text, start.ch, tabSize);
            var posCol = countColumn(getLine(doc$1, pos.line).text, pos.ch, tabSize);
            var left = Math.min(startCol, posCol), right = Math.max(startCol, posCol);
            for (var line = Math.min(start.line, pos.line), end = Math.min(cm.lastLine(), Math.max(start.line, pos.line)); line <= end; line++) {
              var text = getLine(doc$1, line).text, leftPos = findColumn(text, left, tabSize);
              if (left == right) {
                ranges2.push(new Range(Pos(line, leftPos), Pos(line, leftPos)));
              } else if (text.length > leftPos) {
                ranges2.push(new Range(Pos(line, leftPos), Pos(line, findColumn(text, right, tabSize))));
              }
            }
            if (!ranges2.length) {
              ranges2.push(new Range(start, start));
            }
            setSelection(
              doc$1,
              normalizeSelection(cm, startSel.ranges.slice(0, ourIndex).concat(ranges2), ourIndex),
              { origin: "*mouse", scroll: false }
            );
            cm.scrollIntoView(pos);
          } else {
            var oldRange = ourRange;
            var range3 = rangeForUnit(cm, pos, behavior.unit);
            var anchor = oldRange.anchor, head;
            if (cmp(range3.anchor, anchor) > 0) {
              head = range3.head;
              anchor = minPos(oldRange.from(), range3.anchor);
            } else {
              head = range3.anchor;
              anchor = maxPos(oldRange.to(), range3.head);
            }
            var ranges$1 = startSel.ranges.slice(0);
            ranges$1[ourIndex] = bidiSimplify(cm, new Range(clipPos(doc$1, anchor), head));
            setSelection(doc$1, normalizeSelection(cm, ranges$1, ourIndex), sel_mouse);
          }
        }
        var editorSize = display.wrapper.getBoundingClientRect();
        var counter = 0;
        function extend(e) {
          var curCount = ++counter;
          var cur = posFromMouse(cm, e, true, behavior.unit == "rectangle");
          if (!cur) {
            return;
          }
          if (cmp(cur, lastPos) != 0) {
            cm.curOp.focus = activeElt(doc(cm));
            extendTo(cur);
            var visible = visibleLines(display, doc$1);
            if (cur.line >= visible.to || cur.line < visible.from) {
              setTimeout(operation(cm, function() {
                if (counter == curCount) {
                  extend(e);
                }
              }), 150);
            }
          } else {
            var outside = e.clientY < editorSize.top ? -20 : e.clientY > editorSize.bottom ? 20 : 0;
            if (outside) {
              setTimeout(operation(cm, function() {
                if (counter != curCount) {
                  return;
                }
                display.scroller.scrollTop += outside;
                extend(e);
              }), 50);
            }
          }
        }
        function done(e) {
          cm.state.selectingText = false;
          counter = Infinity;
          if (e) {
            e_preventDefault(e);
            display.input.focus();
          }
          off(display.wrapper.ownerDocument, "mousemove", move);
          off(display.wrapper.ownerDocument, "mouseup", up);
          doc$1.history.lastSelOrigin = null;
        }
        var move = operation(cm, function(e) {
          if (e.buttons === 0 || !e_button(e)) {
            done(e);
          } else {
            extend(e);
          }
        });
        var up = operation(cm, done);
        cm.state.selectingText = up;
        on(display.wrapper.ownerDocument, "mousemove", move);
        on(display.wrapper.ownerDocument, "mouseup", up);
      }
      function bidiSimplify(cm, range2) {
        var anchor = range2.anchor;
        var head = range2.head;
        var anchorLine = getLine(cm.doc, anchor.line);
        if (cmp(anchor, head) == 0 && anchor.sticky == head.sticky) {
          return range2;
        }
        var order = getOrder(anchorLine);
        if (!order) {
          return range2;
        }
        var index = getBidiPartAt(order, anchor.ch, anchor.sticky), part = order[index];
        if (part.from != anchor.ch && part.to != anchor.ch) {
          return range2;
        }
        var boundary = index + (part.from == anchor.ch == (part.level != 1) ? 0 : 1);
        if (boundary == 0 || boundary == order.length) {
          return range2;
        }
        var leftSide;
        if (head.line != anchor.line) {
          leftSide = (head.line - anchor.line) * (cm.doc.direction == "ltr" ? 1 : -1) > 0;
        } else {
          var headIndex = getBidiPartAt(order, head.ch, head.sticky);
          var dir = headIndex - index || (head.ch - anchor.ch) * (part.level == 1 ? -1 : 1);
          if (headIndex == boundary - 1 || headIndex == boundary) {
            leftSide = dir < 0;
          } else {
            leftSide = dir > 0;
          }
        }
        var usePart = order[boundary + (leftSide ? -1 : 0)];
        var from = leftSide == (usePart.level == 1);
        var ch = from ? usePart.from : usePart.to, sticky = from ? "after" : "before";
        return anchor.ch == ch && anchor.sticky == sticky ? range2 : new Range(new Pos(anchor.line, ch, sticky), head);
      }
      function gutterEvent(cm, e, type, prevent) {
        var mX, mY;
        if (e.touches) {
          mX = e.touches[0].clientX;
          mY = e.touches[0].clientY;
        } else {
          try {
            mX = e.clientX;
            mY = e.clientY;
          } catch (e$1) {
            return false;
          }
        }
        if (mX >= Math.floor(cm.display.gutters.getBoundingClientRect().right)) {
          return false;
        }
        if (prevent) {
          e_preventDefault(e);
        }
        var display = cm.display;
        var lineBox = display.lineDiv.getBoundingClientRect();
        if (mY > lineBox.bottom || !hasHandler(cm, type)) {
          return e_defaultPrevented(e);
        }
        mY -= lineBox.top - display.viewOffset;
        for (var i2 = 0; i2 < cm.display.gutterSpecs.length; ++i2) {
          var g = display.gutters.childNodes[i2];
          if (g && g.getBoundingClientRect().right >= mX) {
            var line = lineAtHeight(cm.doc, mY);
            var gutter = cm.display.gutterSpecs[i2];
            signal(cm, type, cm, line, gutter.className, e);
            return e_defaultPrevented(e);
          }
        }
      }
      function clickInGutter(cm, e) {
        return gutterEvent(cm, e, "gutterClick", true);
      }
      function onContextMenu(cm, e) {
        if (eventInWidget(cm.display, e) || contextMenuInGutter(cm, e)) {
          return;
        }
        if (signalDOMEvent(cm, e, "contextmenu")) {
          return;
        }
        if (!captureRightClick) {
          cm.display.input.onContextMenu(e);
        }
      }
      function contextMenuInGutter(cm, e) {
        if (!hasHandler(cm, "gutterContextMenu")) {
          return false;
        }
        return gutterEvent(cm, e, "gutterContextMenu", false);
      }
      function themeChanged(cm) {
        cm.display.wrapper.className = cm.display.wrapper.className.replace(/\s*cm-s-\S+/g, "") + cm.options.theme.replace(/(^|\s)\s*/g, " cm-s-");
        clearCaches(cm);
      }
      var Init = { toString: function() {
        return "CodeMirror.Init";
      } };
      var defaults = {};
      var optionHandlers = {};
      function defineOptions(CodeMirror4) {
        var optionHandlers2 = CodeMirror4.optionHandlers;
        function option(name, deflt, handle, notOnInit) {
          CodeMirror4.defaults[name] = deflt;
          if (handle) {
            optionHandlers2[name] = notOnInit ? function(cm, val, old) {
              if (old != Init) {
                handle(cm, val, old);
              }
            } : handle;
          }
        }
        CodeMirror4.defineOption = option;
        CodeMirror4.Init = Init;
        option("value", "", function(cm, val) {
          return cm.setValue(val);
        }, true);
        option("mode", null, function(cm, val) {
          cm.doc.modeOption = val;
          loadMode(cm);
        }, true);
        option("indentUnit", 2, loadMode, true);
        option("indentWithTabs", false);
        option("smartIndent", true);
        option("tabSize", 4, function(cm) {
          resetModeState(cm);
          clearCaches(cm);
          regChange(cm);
        }, true);
        option("lineSeparator", null, function(cm, val) {
          cm.doc.lineSep = val;
          if (!val) {
            return;
          }
          var newBreaks = [], lineNo2 = cm.doc.first;
          cm.doc.iter(function(line) {
            for (var pos = 0; ; ) {
              var found = line.text.indexOf(val, pos);
              if (found == -1) {
                break;
              }
              pos = found + val.length;
              newBreaks.push(Pos(lineNo2, found));
            }
            lineNo2++;
          });
          for (var i2 = newBreaks.length - 1; i2 >= 0; i2--) {
            replaceRange(cm.doc, val, newBreaks[i2], Pos(newBreaks[i2].line, newBreaks[i2].ch + val.length));
          }
        });
        option("specialChars", /[\u0000-\u001f\u007f-\u009f\u00ad\u061c\u200b\u200e\u200f\u2028\u2029\u202d\u202e\u2066\u2067\u2069\ufeff\ufff9-\ufffc]/g, function(cm, val, old) {
          cm.state.specialChars = new RegExp(val.source + (val.test("	") ? "" : "|	"), "g");
          if (old != Init) {
            cm.refresh();
          }
        });
        option("specialCharPlaceholder", defaultSpecialCharPlaceholder, function(cm) {
          return cm.refresh();
        }, true);
        option("electricChars", true);
        option("inputStyle", mobile ? "contenteditable" : "textarea", function() {
          throw new Error("inputStyle can not (yet) be changed in a running editor");
        }, true);
        option("spellcheck", false, function(cm, val) {
          return cm.getInputField().spellcheck = val;
        }, true);
        option("autocorrect", false, function(cm, val) {
          return cm.getInputField().autocorrect = val;
        }, true);
        option("autocapitalize", false, function(cm, val) {
          return cm.getInputField().autocapitalize = val;
        }, true);
        option("rtlMoveVisually", !windows);
        option("wholeLineUpdateBefore", true);
        option("theme", "default", function(cm) {
          themeChanged(cm);
          updateGutters(cm);
        }, true);
        option("keyMap", "default", function(cm, val, old) {
          var next = getKeyMap(val);
          var prev = old != Init && getKeyMap(old);
          if (prev && prev.detach) {
            prev.detach(cm, next);
          }
          if (next.attach) {
            next.attach(cm, prev || null);
          }
        });
        option("extraKeys", null);
        option("configureMouse", null);
        option("lineWrapping", false, wrappingChanged, true);
        option("gutters", [], function(cm, val) {
          cm.display.gutterSpecs = getGutters(val, cm.options.lineNumbers);
          updateGutters(cm);
        }, true);
        option("fixedGutter", true, function(cm, val) {
          cm.display.gutters.style.left = val ? compensateForHScroll(cm.display) + "px" : "0";
          cm.refresh();
        }, true);
        option("coverGutterNextToScrollbar", false, function(cm) {
          return updateScrollbars(cm);
        }, true);
        option("scrollbarStyle", "native", function(cm) {
          initScrollbars(cm);
          updateScrollbars(cm);
          cm.display.scrollbars.setScrollTop(cm.doc.scrollTop);
          cm.display.scrollbars.setScrollLeft(cm.doc.scrollLeft);
        }, true);
        option("lineNumbers", false, function(cm, val) {
          cm.display.gutterSpecs = getGutters(cm.options.gutters, val);
          updateGutters(cm);
        }, true);
        option("firstLineNumber", 1, updateGutters, true);
        option("lineNumberFormatter", function(integer) {
          return integer;
        }, updateGutters, true);
        option("showCursorWhenSelecting", false, updateSelection, true);
        option("resetSelectionOnContextMenu", true);
        option("lineWiseCopyCut", true);
        option("pasteLinesPerSelection", true);
        option("selectionsMayTouch", false);
        option("readOnly", false, function(cm, val) {
          if (val == "nocursor") {
            onBlur(cm);
            cm.display.input.blur();
          }
          cm.display.input.readOnlyChanged(val);
        });
        option("screenReaderLabel", null, function(cm, val) {
          val = val === "" ? null : val;
          cm.display.input.screenReaderLabelChanged(val);
        });
        option("disableInput", false, function(cm, val) {
          if (!val) {
            cm.display.input.reset();
          }
        }, true);
        option("dragDrop", true, dragDropChanged);
        option("allowDropFileTypes", null);
        option("cursorBlinkRate", 530);
        option("cursorScrollMargin", 0);
        option("cursorHeight", 1, updateSelection, true);
        option("singleCursorHeightPerLine", true, updateSelection, true);
        option("workTime", 100);
        option("workDelay", 100);
        option("flattenSpans", true, resetModeState, true);
        option("addModeClass", false, resetModeState, true);
        option("pollInterval", 100);
        option("undoDepth", 200, function(cm, val) {
          return cm.doc.history.undoDepth = val;
        });
        option("historyEventDelay", 1250);
        option("viewportMargin", 10, function(cm) {
          return cm.refresh();
        }, true);
        option("maxHighlightLength", 1e4, resetModeState, true);
        option("moveInputWithCursor", true, function(cm, val) {
          if (!val) {
            cm.display.input.resetPosition();
          }
        });
        option("tabindex", null, function(cm, val) {
          return cm.display.input.getField().tabIndex = val || "";
        });
        option("autofocus", null);
        option("direction", "ltr", function(cm, val) {
          return cm.doc.setDirection(val);
        }, true);
        option("phrases", null);
      }
      function dragDropChanged(cm, value, old) {
        var wasOn = old && old != Init;
        if (!value != !wasOn) {
          var funcs = cm.display.dragFunctions;
          var toggle = value ? on : off;
          toggle(cm.display.scroller, "dragstart", funcs.start);
          toggle(cm.display.scroller, "dragenter", funcs.enter);
          toggle(cm.display.scroller, "dragover", funcs.over);
          toggle(cm.display.scroller, "dragleave", funcs.leave);
          toggle(cm.display.scroller, "drop", funcs.drop);
        }
      }
      function wrappingChanged(cm) {
        if (cm.options.lineWrapping) {
          addClass(cm.display.wrapper, "CodeMirror-wrap");
          cm.display.sizer.style.minWidth = "";
          cm.display.sizerWidth = null;
        } else {
          rmClass(cm.display.wrapper, "CodeMirror-wrap");
          findMaxLine(cm);
        }
        estimateLineHeights(cm);
        regChange(cm);
        clearCaches(cm);
        setTimeout(function() {
          return updateScrollbars(cm);
        }, 100);
      }
      function CodeMirror3(place, options) {
        var this$1 = this;
        if (!(this instanceof CodeMirror3)) {
          return new CodeMirror3(place, options);
        }
        this.options = options = options ? copyObj(options) : {};
        copyObj(defaults, options, false);
        var doc2 = options.value;
        if (typeof doc2 == "string") {
          doc2 = new Doc(doc2, options.mode, null, options.lineSeparator, options.direction);
        } else if (options.mode) {
          doc2.modeOption = options.mode;
        }
        this.doc = doc2;
        var input = new CodeMirror3.inputStyles[options.inputStyle](this);
        var display = this.display = new Display(place, doc2, input, options);
        display.wrapper.CodeMirror = this;
        themeChanged(this);
        if (options.lineWrapping) {
          this.display.wrapper.className += " CodeMirror-wrap";
        }
        initScrollbars(this);
        this.state = {
          keyMaps: [],
          // stores maps added by addKeyMap
          overlays: [],
          // highlighting overlays, as added by addOverlay
          modeGen: 0,
          // bumped when mode/overlay changes, used to invalidate highlighting info
          overwrite: false,
          delayingBlurEvent: false,
          focused: false,
          suppressEdits: false,
          // used to disable editing during key handlers when in readOnly mode
          pasteIncoming: -1,
          cutIncoming: -1,
          // help recognize paste/cut edits in input.poll
          selectingText: false,
          draggingText: false,
          highlight: new Delayed(),
          // stores highlight worker timeout
          keySeq: null,
          // Unfinished key sequence
          specialChars: null
        };
        if (options.autofocus && !mobile) {
          display.input.focus();
        }
        if (ie && ie_version < 11) {
          setTimeout(function() {
            return this$1.display.input.reset(true);
          }, 20);
        }
        registerEventHandlers(this);
        ensureGlobalHandlers();
        startOperation(this);
        this.curOp.forceUpdate = true;
        attachDoc(this, doc2);
        if (options.autofocus && !mobile || this.hasFocus()) {
          setTimeout(function() {
            if (this$1.hasFocus() && !this$1.state.focused) {
              onFocus(this$1);
            }
          }, 20);
        } else {
          onBlur(this);
        }
        for (var opt in optionHandlers) {
          if (optionHandlers.hasOwnProperty(opt)) {
            optionHandlers[opt](this, options[opt], Init);
          }
        }
        maybeUpdateLineNumberWidth(this);
        if (options.finishInit) {
          options.finishInit(this);
        }
        for (var i2 = 0; i2 < initHooks.length; ++i2) {
          initHooks[i2](this);
        }
        endOperation(this);
        if (webkit && options.lineWrapping && getComputedStyle(display.lineDiv).textRendering == "optimizelegibility") {
          display.lineDiv.style.textRendering = "auto";
        }
      }
      CodeMirror3.defaults = defaults;
      CodeMirror3.optionHandlers = optionHandlers;
      function registerEventHandlers(cm) {
        var d = cm.display;
        on(d.scroller, "mousedown", operation(cm, onMouseDown));
        if (ie && ie_version < 11) {
          on(d.scroller, "dblclick", operation(cm, function(e) {
            if (signalDOMEvent(cm, e)) {
              return;
            }
            var pos = posFromMouse(cm, e);
            if (!pos || clickInGutter(cm, e) || eventInWidget(cm.display, e)) {
              return;
            }
            e_preventDefault(e);
            var word = cm.findWordAt(pos);
            extendSelection(cm.doc, word.anchor, word.head);
          }));
        } else {
          on(d.scroller, "dblclick", function(e) {
            return signalDOMEvent(cm, e) || e_preventDefault(e);
          });
        }
        on(d.scroller, "contextmenu", function(e) {
          return onContextMenu(cm, e);
        });
        on(d.input.getField(), "contextmenu", function(e) {
          if (!d.scroller.contains(e.target)) {
            onContextMenu(cm, e);
          }
        });
        var touchFinished, prevTouch = { end: 0 };
        function finishTouch() {
          if (d.activeTouch) {
            touchFinished = setTimeout(function() {
              return d.activeTouch = null;
            }, 1e3);
            prevTouch = d.activeTouch;
            prevTouch.end = +new Date();
          }
        }
        function isMouseLikeTouchEvent(e) {
          if (e.touches.length != 1) {
            return false;
          }
          var touch = e.touches[0];
          return touch.radiusX <= 1 && touch.radiusY <= 1;
        }
        function farAway(touch, other) {
          if (other.left == null) {
            return true;
          }
          var dx = other.left - touch.left, dy = other.top - touch.top;
          return dx * dx + dy * dy > 20 * 20;
        }
        on(d.scroller, "touchstart", function(e) {
          if (!signalDOMEvent(cm, e) && !isMouseLikeTouchEvent(e) && !clickInGutter(cm, e)) {
            d.input.ensurePolled();
            clearTimeout(touchFinished);
            var now = +new Date();
            d.activeTouch = {
              start: now,
              moved: false,
              prev: now - prevTouch.end <= 300 ? prevTouch : null
            };
            if (e.touches.length == 1) {
              d.activeTouch.left = e.touches[0].pageX;
              d.activeTouch.top = e.touches[0].pageY;
            }
          }
        });
        on(d.scroller, "touchmove", function() {
          if (d.activeTouch) {
            d.activeTouch.moved = true;
          }
        });
        on(d.scroller, "touchend", function(e) {
          var touch = d.activeTouch;
          if (touch && !eventInWidget(d, e) && touch.left != null && !touch.moved && new Date() - touch.start < 300) {
            var pos = cm.coordsChar(d.activeTouch, "page"), range2;
            if (!touch.prev || farAway(touch, touch.prev)) {
              range2 = new Range(pos, pos);
            } else if (!touch.prev.prev || farAway(touch, touch.prev.prev)) {
              range2 = cm.findWordAt(pos);
            } else {
              range2 = new Range(Pos(pos.line, 0), clipPos(cm.doc, Pos(pos.line + 1, 0)));
            }
            cm.setSelection(range2.anchor, range2.head);
            cm.focus();
            e_preventDefault(e);
          }
          finishTouch();
        });
        on(d.scroller, "touchcancel", finishTouch);
        on(d.scroller, "scroll", function() {
          if (d.scroller.clientHeight) {
            updateScrollTop(cm, d.scroller.scrollTop);
            setScrollLeft(cm, d.scroller.scrollLeft, true);
            signal(cm, "scroll", cm);
          }
        });
        on(d.scroller, "mousewheel", function(e) {
          return onScrollWheel(cm, e);
        });
        on(d.scroller, "DOMMouseScroll", function(e) {
          return onScrollWheel(cm, e);
        });
        on(d.wrapper, "scroll", function() {
          return d.wrapper.scrollTop = d.wrapper.scrollLeft = 0;
        });
        d.dragFunctions = {
          enter: function(e) {
            if (!signalDOMEvent(cm, e)) {
              e_stop(e);
            }
          },
          over: function(e) {
            if (!signalDOMEvent(cm, e)) {
              onDragOver(cm, e);
              e_stop(e);
            }
          },
          start: function(e) {
            return onDragStart(cm, e);
          },
          drop: operation(cm, onDrop),
          leave: function(e) {
            if (!signalDOMEvent(cm, e)) {
              clearDragCursor(cm);
            }
          }
        };
        var inp = d.input.getField();
        on(inp, "keyup", function(e) {
          return onKeyUp.call(cm, e);
        });
        on(inp, "keydown", operation(cm, onKeyDown));
        on(inp, "keypress", operation(cm, onKeyPress));
        on(inp, "focus", function(e) {
          return onFocus(cm, e);
        });
        on(inp, "blur", function(e) {
          return onBlur(cm, e);
        });
      }
      var initHooks = [];
      CodeMirror3.defineInitHook = function(f) {
        return initHooks.push(f);
      };
      function indentLine(cm, n, how, aggressive) {
        var doc2 = cm.doc, state;
        if (how == null) {
          how = "add";
        }
        if (how == "smart") {
          if (!doc2.mode.indent) {
            how = "prev";
          } else {
            state = getContextBefore(cm, n).state;
          }
        }
        var tabSize = cm.options.tabSize;
        var line = getLine(doc2, n), curSpace = countColumn(line.text, null, tabSize);
        if (line.stateAfter) {
          line.stateAfter = null;
        }
        var curSpaceString = line.text.match(/^\s*/)[0], indentation;
        if (!aggressive && !/\S/.test(line.text)) {
          indentation = 0;
          how = "not";
        } else if (how == "smart") {
          indentation = doc2.mode.indent(state, line.text.slice(curSpaceString.length), line.text);
          if (indentation == Pass || indentation > 150) {
            if (!aggressive) {
              return;
            }
            how = "prev";
          }
        }
        if (how == "prev") {
          if (n > doc2.first) {
            indentation = countColumn(getLine(doc2, n - 1).text, null, tabSize);
          } else {
            indentation = 0;
          }
        } else if (how == "add") {
          indentation = curSpace + cm.options.indentUnit;
        } else if (how == "subtract") {
          indentation = curSpace - cm.options.indentUnit;
        } else if (typeof how == "number") {
          indentation = curSpace + how;
        }
        indentation = Math.max(0, indentation);
        var indentString = "", pos = 0;
        if (cm.options.indentWithTabs) {
          for (var i2 = Math.floor(indentation / tabSize); i2; --i2) {
            pos += tabSize;
            indentString += "	";
          }
        }
        if (pos < indentation) {
          indentString += spaceStr(indentation - pos);
        }
        if (indentString != curSpaceString) {
          replaceRange(doc2, indentString, Pos(n, 0), Pos(n, curSpaceString.length), "+input");
          line.stateAfter = null;
          return true;
        } else {
          for (var i$12 = 0; i$12 < doc2.sel.ranges.length; i$12++) {
            var range2 = doc2.sel.ranges[i$12];
            if (range2.head.line == n && range2.head.ch < curSpaceString.length) {
              var pos$1 = Pos(n, curSpaceString.length);
              replaceOneSelection(doc2, i$12, new Range(pos$1, pos$1));
              break;
            }
          }
        }
      }
      var lastCopied = null;
      function setLastCopied(newLastCopied) {
        lastCopied = newLastCopied;
      }
      function applyTextInput(cm, inserted, deleted, sel, origin) {
        var doc2 = cm.doc;
        cm.display.shift = false;
        if (!sel) {
          sel = doc2.sel;
        }
        var recent = +new Date() - 200;
        var paste = origin == "paste" || cm.state.pasteIncoming > recent;
        var textLines = splitLinesAuto(inserted), multiPaste = null;
        if (paste && sel.ranges.length > 1) {
          if (lastCopied && lastCopied.text.join("\n") == inserted) {
            if (sel.ranges.length % lastCopied.text.length == 0) {
              multiPaste = [];
              for (var i2 = 0; i2 < lastCopied.text.length; i2++) {
                multiPaste.push(doc2.splitLines(lastCopied.text[i2]));
              }
            }
          } else if (textLines.length == sel.ranges.length && cm.options.pasteLinesPerSelection) {
            multiPaste = map(textLines, function(l) {
              return [l];
            });
          }
        }
        var updateInput = cm.curOp.updateInput;
        for (var i$12 = sel.ranges.length - 1; i$12 >= 0; i$12--) {
          var range2 = sel.ranges[i$12];
          var from = range2.from(), to = range2.to();
          if (range2.empty()) {
            if (deleted && deleted > 0) {
              from = Pos(from.line, from.ch - deleted);
            } else if (cm.state.overwrite && !paste) {
              to = Pos(to.line, Math.min(getLine(doc2, to.line).text.length, to.ch + lst(textLines).length));
            } else if (paste && lastCopied && lastCopied.lineWise && lastCopied.text.join("\n") == textLines.join("\n")) {
              from = to = Pos(from.line, 0);
            }
          }
          var changeEvent = {
            from,
            to,
            text: multiPaste ? multiPaste[i$12 % multiPaste.length] : textLines,
            origin: origin || (paste ? "paste" : cm.state.cutIncoming > recent ? "cut" : "+input")
          };
          makeChange(cm.doc, changeEvent);
          signalLater(cm, "inputRead", cm, changeEvent);
        }
        if (inserted && !paste) {
          triggerElectric(cm, inserted);
        }
        ensureCursorVisible(cm);
        if (cm.curOp.updateInput < 2) {
          cm.curOp.updateInput = updateInput;
        }
        cm.curOp.typing = true;
        cm.state.pasteIncoming = cm.state.cutIncoming = -1;
      }
      function handlePaste(e, cm) {
        var pasted = e.clipboardData && e.clipboardData.getData("Text");
        if (pasted) {
          e.preventDefault();
          if (!cm.isReadOnly() && !cm.options.disableInput && cm.hasFocus()) {
            runInOp(cm, function() {
              return applyTextInput(cm, pasted, 0, null, "paste");
            });
          }
          return true;
        }
      }
      function triggerElectric(cm, inserted) {
        if (!cm.options.electricChars || !cm.options.smartIndent) {
          return;
        }
        var sel = cm.doc.sel;
        for (var i2 = sel.ranges.length - 1; i2 >= 0; i2--) {
          var range2 = sel.ranges[i2];
          if (range2.head.ch > 100 || i2 && sel.ranges[i2 - 1].head.line == range2.head.line) {
            continue;
          }
          var mode = cm.getModeAt(range2.head);
          var indented = false;
          if (mode.electricChars) {
            for (var j = 0; j < mode.electricChars.length; j++) {
              if (inserted.indexOf(mode.electricChars.charAt(j)) > -1) {
                indented = indentLine(cm, range2.head.line, "smart");
                break;
              }
            }
          } else if (mode.electricInput) {
            if (mode.electricInput.test(getLine(cm.doc, range2.head.line).text.slice(0, range2.head.ch))) {
              indented = indentLine(cm, range2.head.line, "smart");
            }
          }
          if (indented) {
            signalLater(cm, "electricInput", cm, range2.head.line);
          }
        }
      }
      function copyableRanges(cm) {
        var text = [], ranges = [];
        for (var i2 = 0; i2 < cm.doc.sel.ranges.length; i2++) {
          var line = cm.doc.sel.ranges[i2].head.line;
          var lineRange = { anchor: Pos(line, 0), head: Pos(line + 1, 0) };
          ranges.push(lineRange);
          text.push(cm.getRange(lineRange.anchor, lineRange.head));
        }
        return { text, ranges };
      }
      function disableBrowserMagic(field, spellcheck, autocorrect, autocapitalize) {
        field.setAttribute("autocorrect", autocorrect ? "" : "off");
        field.setAttribute("autocapitalize", autocapitalize ? "" : "off");
        field.setAttribute("spellcheck", !!spellcheck);
      }
      function hiddenTextarea() {
        var te = elt("textarea", null, null, "position: absolute; bottom: -1em; padding: 0; width: 1px; height: 1em; min-height: 1em; outline: none");
        var div = elt("div", [te], null, "overflow: hidden; position: relative; width: 3px; height: 0px;");
        if (webkit) {
          te.style.width = "1000px";
        } else {
          te.setAttribute("wrap", "off");
        }
        if (ios) {
          te.style.border = "1px solid black";
        }
        disableBrowserMagic(te);
        return div;
      }
      function addEditorMethods(CodeMirror4) {
        var optionHandlers2 = CodeMirror4.optionHandlers;
        var helpers = CodeMirror4.helpers = {};
        CodeMirror4.prototype = {
          constructor: CodeMirror4,
          focus: function() {
            win(this).focus();
            this.display.input.focus();
          },
          setOption: function(option, value) {
            var options = this.options, old = options[option];
            if (options[option] == value && option != "mode") {
              return;
            }
            options[option] = value;
            if (optionHandlers2.hasOwnProperty(option)) {
              operation(this, optionHandlers2[option])(this, value, old);
            }
            signal(this, "optionChange", this, option);
          },
          getOption: function(option) {
            return this.options[option];
          },
          getDoc: function() {
            return this.doc;
          },
          addKeyMap: function(map2, bottom) {
            this.state.keyMaps[bottom ? "push" : "unshift"](getKeyMap(map2));
          },
          removeKeyMap: function(map2) {
            var maps = this.state.keyMaps;
            for (var i2 = 0; i2 < maps.length; ++i2) {
              if (maps[i2] == map2 || maps[i2].name == map2) {
                maps.splice(i2, 1);
                return true;
              }
            }
          },
          addOverlay: methodOp(function(spec, options) {
            var mode = spec.token ? spec : CodeMirror4.getMode(this.options, spec);
            if (mode.startState) {
              throw new Error("Overlays may not be stateful.");
            }
            insertSorted(
              this.state.overlays,
              {
                mode,
                modeSpec: spec,
                opaque: options && options.opaque,
                priority: options && options.priority || 0
              },
              function(overlay) {
                return overlay.priority;
              }
            );
            this.state.modeGen++;
            regChange(this);
          }),
          removeOverlay: methodOp(function(spec) {
            var overlays = this.state.overlays;
            for (var i2 = 0; i2 < overlays.length; ++i2) {
              var cur = overlays[i2].modeSpec;
              if (cur == spec || typeof spec == "string" && cur.name == spec) {
                overlays.splice(i2, 1);
                this.state.modeGen++;
                regChange(this);
                return;
              }
            }
          }),
          indentLine: methodOp(function(n, dir, aggressive) {
            if (typeof dir != "string" && typeof dir != "number") {
              if (dir == null) {
                dir = this.options.smartIndent ? "smart" : "prev";
              } else {
                dir = dir ? "add" : "subtract";
              }
            }
            if (isLine(this.doc, n)) {
              indentLine(this, n, dir, aggressive);
            }
          }),
          indentSelection: methodOp(function(how) {
            var ranges = this.doc.sel.ranges, end = -1;
            for (var i2 = 0; i2 < ranges.length; i2++) {
              var range2 = ranges[i2];
              if (!range2.empty()) {
                var from = range2.from(), to = range2.to();
                var start = Math.max(end, from.line);
                end = Math.min(this.lastLine(), to.line - (to.ch ? 0 : 1)) + 1;
                for (var j = start; j < end; ++j) {
                  indentLine(this, j, how);
                }
                var newRanges = this.doc.sel.ranges;
                if (from.ch == 0 && ranges.length == newRanges.length && newRanges[i2].from().ch > 0) {
                  replaceOneSelection(this.doc, i2, new Range(from, newRanges[i2].to()), sel_dontScroll);
                }
              } else if (range2.head.line > end) {
                indentLine(this, range2.head.line, how, true);
                end = range2.head.line;
                if (i2 == this.doc.sel.primIndex) {
                  ensureCursorVisible(this);
                }
              }
            }
          }),
          // Fetch the parser token for a given character. Useful for hacks
          // that want to inspect the mode state (say, for completion).
          getTokenAt: function(pos, precise) {
            return takeToken(this, pos, precise);
          },
          getLineTokens: function(line, precise) {
            return takeToken(this, Pos(line), precise, true);
          },
          getTokenTypeAt: function(pos) {
            pos = clipPos(this.doc, pos);
            var styles = getLineStyles(this, getLine(this.doc, pos.line));
            var before = 0, after = (styles.length - 1) / 2, ch = pos.ch;
            var type;
            if (ch == 0) {
              type = styles[2];
            } else {
              for (; ; ) {
                var mid = before + after >> 1;
                if ((mid ? styles[mid * 2 - 1] : 0) >= ch) {
                  after = mid;
                } else if (styles[mid * 2 + 1] < ch) {
                  before = mid + 1;
                } else {
                  type = styles[mid * 2 + 2];
                  break;
                }
              }
            }
            var cut = type ? type.indexOf("overlay ") : -1;
            return cut < 0 ? type : cut == 0 ? null : type.slice(0, cut - 1);
          },
          getModeAt: function(pos) {
            var mode = this.doc.mode;
            if (!mode.innerMode) {
              return mode;
            }
            return CodeMirror4.innerMode(mode, this.getTokenAt(pos).state).mode;
          },
          getHelper: function(pos, type) {
            return this.getHelpers(pos, type)[0];
          },
          getHelpers: function(pos, type) {
            var found = [];
            if (!helpers.hasOwnProperty(type)) {
              return found;
            }
            var help = helpers[type], mode = this.getModeAt(pos);
            if (typeof mode[type] == "string") {
              if (help[mode[type]]) {
                found.push(help[mode[type]]);
              }
            } else if (mode[type]) {
              for (var i2 = 0; i2 < mode[type].length; i2++) {
                var val = help[mode[type][i2]];
                if (val) {
                  found.push(val);
                }
              }
            } else if (mode.helperType && help[mode.helperType]) {
              found.push(help[mode.helperType]);
            } else if (help[mode.name]) {
              found.push(help[mode.name]);
            }
            for (var i$12 = 0; i$12 < help._global.length; i$12++) {
              var cur = help._global[i$12];
              if (cur.pred(mode, this) && indexOf(found, cur.val) == -1) {
                found.push(cur.val);
              }
            }
            return found;
          },
          getStateAfter: function(line, precise) {
            var doc2 = this.doc;
            line = clipLine(doc2, line == null ? doc2.first + doc2.size - 1 : line);
            return getContextBefore(this, line + 1, precise).state;
          },
          cursorCoords: function(start, mode) {
            var pos, range2 = this.doc.sel.primary();
            if (start == null) {
              pos = range2.head;
            } else if (typeof start == "object") {
              pos = clipPos(this.doc, start);
            } else {
              pos = start ? range2.from() : range2.to();
            }
            return cursorCoords(this, pos, mode || "page");
          },
          charCoords: function(pos, mode) {
            return charCoords(this, clipPos(this.doc, pos), mode || "page");
          },
          coordsChar: function(coords, mode) {
            coords = fromCoordSystem(this, coords, mode || "page");
            return coordsChar(this, coords.left, coords.top);
          },
          lineAtHeight: function(height, mode) {
            height = fromCoordSystem(this, { top: height, left: 0 }, mode || "page").top;
            return lineAtHeight(this.doc, height + this.display.viewOffset);
          },
          heightAtLine: function(line, mode, includeWidgets) {
            var end = false, lineObj;
            if (typeof line == "number") {
              var last = this.doc.first + this.doc.size - 1;
              if (line < this.doc.first) {
                line = this.doc.first;
              } else if (line > last) {
                line = last;
                end = true;
              }
              lineObj = getLine(this.doc, line);
            } else {
              lineObj = line;
            }
            return intoCoordSystem(this, lineObj, { top: 0, left: 0 }, mode || "page", includeWidgets || end).top + (end ? this.doc.height - heightAtLine(lineObj) : 0);
          },
          defaultTextHeight: function() {
            return textHeight(this.display);
          },
          defaultCharWidth: function() {
            return charWidth(this.display);
          },
          getViewport: function() {
            return { from: this.display.viewFrom, to: this.display.viewTo };
          },
          addWidget: function(pos, node, scroll, vert, horiz) {
            var display = this.display;
            pos = cursorCoords(this, clipPos(this.doc, pos));
            var top = pos.bottom, left = pos.left;
            node.style.position = "absolute";
            node.setAttribute("cm-ignore-events", "true");
            this.display.input.setUneditable(node);
            display.sizer.appendChild(node);
            if (vert == "over") {
              top = pos.top;
            } else if (vert == "above" || vert == "near") {
              var vspace = Math.max(display.wrapper.clientHeight, this.doc.height), hspace = Math.max(display.sizer.clientWidth, display.lineSpace.clientWidth);
              if ((vert == "above" || pos.bottom + node.offsetHeight > vspace) && pos.top > node.offsetHeight) {
                top = pos.top - node.offsetHeight;
              } else if (pos.bottom + node.offsetHeight <= vspace) {
                top = pos.bottom;
              }
              if (left + node.offsetWidth > hspace) {
                left = hspace - node.offsetWidth;
              }
            }
            node.style.top = top + "px";
            node.style.left = node.style.right = "";
            if (horiz == "right") {
              left = display.sizer.clientWidth - node.offsetWidth;
              node.style.right = "0px";
            } else {
              if (horiz == "left") {
                left = 0;
              } else if (horiz == "middle") {
                left = (display.sizer.clientWidth - node.offsetWidth) / 2;
              }
              node.style.left = left + "px";
            }
            if (scroll) {
              scrollIntoView(this, { left, top, right: left + node.offsetWidth, bottom: top + node.offsetHeight });
            }
          },
          triggerOnKeyDown: methodOp(onKeyDown),
          triggerOnKeyPress: methodOp(onKeyPress),
          triggerOnKeyUp: onKeyUp,
          triggerOnMouseDown: methodOp(onMouseDown),
          execCommand: function(cmd) {
            if (commands.hasOwnProperty(cmd)) {
              return commands[cmd].call(null, this);
            }
          },
          triggerElectric: methodOp(function(text) {
            triggerElectric(this, text);
          }),
          findPosH: function(from, amount, unit, visually) {
            var dir = 1;
            if (amount < 0) {
              dir = -1;
              amount = -amount;
            }
            var cur = clipPos(this.doc, from);
            for (var i2 = 0; i2 < amount; ++i2) {
              cur = findPosH(this.doc, cur, dir, unit, visually);
              if (cur.hitSide) {
                break;
              }
            }
            return cur;
          },
          moveH: methodOp(function(dir, unit) {
            var this$1 = this;
            this.extendSelectionsBy(function(range2) {
              if (this$1.display.shift || this$1.doc.extend || range2.empty()) {
                return findPosH(this$1.doc, range2.head, dir, unit, this$1.options.rtlMoveVisually);
              } else {
                return dir < 0 ? range2.from() : range2.to();
              }
            }, sel_move);
          }),
          deleteH: methodOp(function(dir, unit) {
            var sel = this.doc.sel, doc2 = this.doc;
            if (sel.somethingSelected()) {
              doc2.replaceSelection("", null, "+delete");
            } else {
              deleteNearSelection(this, function(range2) {
                var other = findPosH(doc2, range2.head, dir, unit, false);
                return dir < 0 ? { from: other, to: range2.head } : { from: range2.head, to: other };
              });
            }
          }),
          findPosV: function(from, amount, unit, goalColumn) {
            var dir = 1, x = goalColumn;
            if (amount < 0) {
              dir = -1;
              amount = -amount;
            }
            var cur = clipPos(this.doc, from);
            for (var i2 = 0; i2 < amount; ++i2) {
              var coords = cursorCoords(this, cur, "div");
              if (x == null) {
                x = coords.left;
              } else {
                coords.left = x;
              }
              cur = findPosV(this, coords, dir, unit);
              if (cur.hitSide) {
                break;
              }
            }
            return cur;
          },
          moveV: methodOp(function(dir, unit) {
            var this$1 = this;
            var doc2 = this.doc, goals = [];
            var collapse = !this.display.shift && !doc2.extend && doc2.sel.somethingSelected();
            doc2.extendSelectionsBy(function(range2) {
              if (collapse) {
                return dir < 0 ? range2.from() : range2.to();
              }
              var headPos = cursorCoords(this$1, range2.head, "div");
              if (range2.goalColumn != null) {
                headPos.left = range2.goalColumn;
              }
              goals.push(headPos.left);
              var pos = findPosV(this$1, headPos, dir, unit);
              if (unit == "page" && range2 == doc2.sel.primary()) {
                addToScrollTop(this$1, charCoords(this$1, pos, "div").top - headPos.top);
              }
              return pos;
            }, sel_move);
            if (goals.length) {
              for (var i2 = 0; i2 < doc2.sel.ranges.length; i2++) {
                doc2.sel.ranges[i2].goalColumn = goals[i2];
              }
            }
          }),
          // Find the word at the given position (as returned by coordsChar).
          findWordAt: function(pos) {
            var doc2 = this.doc, line = getLine(doc2, pos.line).text;
            var start = pos.ch, end = pos.ch;
            if (line) {
              var helper = this.getHelper(pos, "wordChars");
              if ((pos.sticky == "before" || end == line.length) && start) {
                --start;
              } else {
                ++end;
              }
              var startChar = line.charAt(start);
              var check = isWordChar(startChar, helper) ? function(ch) {
                return isWordChar(ch, helper);
              } : /\s/.test(startChar) ? function(ch) {
                return /\s/.test(ch);
              } : function(ch) {
                return !/\s/.test(ch) && !isWordChar(ch);
              };
              while (start > 0 && check(line.charAt(start - 1))) {
                --start;
              }
              while (end < line.length && check(line.charAt(end))) {
                ++end;
              }
            }
            return new Range(Pos(pos.line, start), Pos(pos.line, end));
          },
          toggleOverwrite: function(value) {
            if (value != null && value == this.state.overwrite) {
              return;
            }
            if (this.state.overwrite = !this.state.overwrite) {
              addClass(this.display.cursorDiv, "CodeMirror-overwrite");
            } else {
              rmClass(this.display.cursorDiv, "CodeMirror-overwrite");
            }
            signal(this, "overwriteToggle", this, this.state.overwrite);
          },
          hasFocus: function() {
            return this.display.input.getField() == activeElt(doc(this));
          },
          isReadOnly: function() {
            return !!(this.options.readOnly || this.doc.cantEdit);
          },
          scrollTo: methodOp(function(x, y) {
            scrollToCoords(this, x, y);
          }),
          getScrollInfo: function() {
            var scroller = this.display.scroller;
            return {
              left: scroller.scrollLeft,
              top: scroller.scrollTop,
              height: scroller.scrollHeight - scrollGap(this) - this.display.barHeight,
              width: scroller.scrollWidth - scrollGap(this) - this.display.barWidth,
              clientHeight: displayHeight(this),
              clientWidth: displayWidth(this)
            };
          },
          scrollIntoView: methodOp(function(range2, margin) {
            if (range2 == null) {
              range2 = { from: this.doc.sel.primary().head, to: null };
              if (margin == null) {
                margin = this.options.cursorScrollMargin;
              }
            } else if (typeof range2 == "number") {
              range2 = { from: Pos(range2, 0), to: null };
            } else if (range2.from == null) {
              range2 = { from: range2, to: null };
            }
            if (!range2.to) {
              range2.to = range2.from;
            }
            range2.margin = margin || 0;
            if (range2.from.line != null) {
              scrollToRange(this, range2);
            } else {
              scrollToCoordsRange(this, range2.from, range2.to, range2.margin);
            }
          }),
          setSize: methodOp(function(width, height) {
            var this$1 = this;
            var interpret = function(val) {
              return typeof val == "number" || /^\d+$/.test(String(val)) ? val + "px" : val;
            };
            if (width != null) {
              this.display.wrapper.style.width = interpret(width);
            }
            if (height != null) {
              this.display.wrapper.style.height = interpret(height);
            }
            if (this.options.lineWrapping) {
              clearLineMeasurementCache(this);
            }
            var lineNo2 = this.display.viewFrom;
            this.doc.iter(lineNo2, this.display.viewTo, function(line) {
              if (line.widgets) {
                for (var i2 = 0; i2 < line.widgets.length; i2++) {
                  if (line.widgets[i2].noHScroll) {
                    regLineChange(this$1, lineNo2, "widget");
                    break;
                  }
                }
              }
              ++lineNo2;
            });
            this.curOp.forceUpdate = true;
            signal(this, "refresh", this);
          }),
          operation: function(f) {
            return runInOp(this, f);
          },
          startOperation: function() {
            return startOperation(this);
          },
          endOperation: function() {
            return endOperation(this);
          },
          refresh: methodOp(function() {
            var oldHeight = this.display.cachedTextHeight;
            regChange(this);
            this.curOp.forceUpdate = true;
            clearCaches(this);
            scrollToCoords(this, this.doc.scrollLeft, this.doc.scrollTop);
            updateGutterSpace(this.display);
            if (oldHeight == null || Math.abs(oldHeight - textHeight(this.display)) > 0.5 || this.options.lineWrapping) {
              estimateLineHeights(this);
            }
            signal(this, "refresh", this);
          }),
          swapDoc: methodOp(function(doc2) {
            var old = this.doc;
            old.cm = null;
            if (this.state.selectingText) {
              this.state.selectingText();
            }
            attachDoc(this, doc2);
            clearCaches(this);
            this.display.input.reset();
            scrollToCoords(this, doc2.scrollLeft, doc2.scrollTop);
            this.curOp.forceScroll = true;
            signalLater(this, "swapDoc", this, old);
            return old;
          }),
          phrase: function(phraseText) {
            var phrases = this.options.phrases;
            return phrases && Object.prototype.hasOwnProperty.call(phrases, phraseText) ? phrases[phraseText] : phraseText;
          },
          getInputField: function() {
            return this.display.input.getField();
          },
          getWrapperElement: function() {
            return this.display.wrapper;
          },
          getScrollerElement: function() {
            return this.display.scroller;
          },
          getGutterElement: function() {
            return this.display.gutters;
          }
        };
        eventMixin(CodeMirror4);
        CodeMirror4.registerHelper = function(type, name, value) {
          if (!helpers.hasOwnProperty(type)) {
            helpers[type] = CodeMirror4[type] = { _global: [] };
          }
          helpers[type][name] = value;
        };
        CodeMirror4.registerGlobalHelper = function(type, name, predicate, value) {
          CodeMirror4.registerHelper(type, name, value);
          helpers[type]._global.push({ pred: predicate, val: value });
        };
      }
      function findPosH(doc2, pos, dir, unit, visually) {
        var oldPos = pos;
        var origDir = dir;
        var lineObj = getLine(doc2, pos.line);
        var lineDir = visually && doc2.direction == "rtl" ? -dir : dir;
        function findNextLine() {
          var l = pos.line + lineDir;
          if (l < doc2.first || l >= doc2.first + doc2.size) {
            return false;
          }
          pos = new Pos(l, pos.ch, pos.sticky);
          return lineObj = getLine(doc2, l);
        }
        function moveOnce(boundToLine) {
          var next;
          if (unit == "codepoint") {
            var ch = lineObj.text.charCodeAt(pos.ch + (dir > 0 ? 0 : -1));
            if (isNaN(ch)) {
              next = null;
            } else {
              var astral = dir > 0 ? ch >= 55296 && ch < 56320 : ch >= 56320 && ch < 57343;
              next = new Pos(pos.line, Math.max(0, Math.min(lineObj.text.length, pos.ch + dir * (astral ? 2 : 1))), -dir);
            }
          } else if (visually) {
            next = moveVisually(doc2.cm, lineObj, pos, dir);
          } else {
            next = moveLogically(lineObj, pos, dir);
          }
          if (next == null) {
            if (!boundToLine && findNextLine()) {
              pos = endOfLine(visually, doc2.cm, lineObj, pos.line, lineDir);
            } else {
              return false;
            }
          } else {
            pos = next;
          }
          return true;
        }
        if (unit == "char" || unit == "codepoint") {
          moveOnce();
        } else if (unit == "column") {
          moveOnce(true);
        } else if (unit == "word" || unit == "group") {
          var sawType = null, group = unit == "group";
          var helper = doc2.cm && doc2.cm.getHelper(pos, "wordChars");
          for (var first = true; ; first = false) {
            if (dir < 0 && !moveOnce(!first)) {
              break;
            }
            var cur = lineObj.text.charAt(pos.ch) || "\n";
            var type = isWordChar(cur, helper) ? "w" : group && cur == "\n" ? "n" : !group || /\s/.test(cur) ? null : "p";
            if (group && !first && !type) {
              type = "s";
            }
            if (sawType && sawType != type) {
              if (dir < 0) {
                dir = 1;
                moveOnce();
                pos.sticky = "after";
              }
              break;
            }
            if (type) {
              sawType = type;
            }
            if (dir > 0 && !moveOnce(!first)) {
              break;
            }
          }
        }
        var result = skipAtomic(doc2, pos, oldPos, origDir, true);
        if (equalCursorPos(oldPos, result)) {
          result.hitSide = true;
        }
        return result;
      }
      function findPosV(cm, pos, dir, unit) {
        var doc2 = cm.doc, x = pos.left, y;
        if (unit == "page") {
          var pageSize = Math.min(cm.display.wrapper.clientHeight, win(cm).innerHeight || doc2(cm).documentElement.clientHeight);
          var moveAmount = Math.max(pageSize - 0.5 * textHeight(cm.display), 3);
          y = (dir > 0 ? pos.bottom : pos.top) + dir * moveAmount;
        } else if (unit == "line") {
          y = dir > 0 ? pos.bottom + 3 : pos.top - 3;
        }
        var target;
        for (; ; ) {
          target = coordsChar(cm, x, y);
          if (!target.outside) {
            break;
          }
          if (dir < 0 ? y <= 0 : y >= doc2.height) {
            target.hitSide = true;
            break;
          }
          y += dir * 5;
        }
        return target;
      }
      var ContentEditableInput = function(cm) {
        this.cm = cm;
        this.lastAnchorNode = this.lastAnchorOffset = this.lastFocusNode = this.lastFocusOffset = null;
        this.polling = new Delayed();
        this.composing = null;
        this.gracePeriod = false;
        this.readDOMTimeout = null;
      };
      ContentEditableInput.prototype.init = function(display) {
        var this$1 = this;
        var input = this, cm = input.cm;
        var div = input.div = display.lineDiv;
        div.contentEditable = true;
        disableBrowserMagic(div, cm.options.spellcheck, cm.options.autocorrect, cm.options.autocapitalize);
        function belongsToInput(e) {
          for (var t = e.target; t; t = t.parentNode) {
            if (t == div) {
              return true;
            }
            if (/\bCodeMirror-(?:line)?widget\b/.test(t.className)) {
              break;
            }
          }
          return false;
        }
        on(div, "paste", function(e) {
          if (!belongsToInput(e) || signalDOMEvent(cm, e) || handlePaste(e, cm)) {
            return;
          }
          if (ie_version <= 11) {
            setTimeout(operation(cm, function() {
              return this$1.updateFromDOM();
            }), 20);
          }
        });
        on(div, "compositionstart", function(e) {
          this$1.composing = { data: e.data, done: false };
        });
        on(div, "compositionupdate", function(e) {
          if (!this$1.composing) {
            this$1.composing = { data: e.data, done: false };
          }
        });
        on(div, "compositionend", function(e) {
          if (this$1.composing) {
            if (e.data != this$1.composing.data) {
              this$1.readFromDOMSoon();
            }
            this$1.composing.done = true;
          }
        });
        on(div, "touchstart", function() {
          return input.forceCompositionEnd();
        });
        on(div, "input", function() {
          if (!this$1.composing) {
            this$1.readFromDOMSoon();
          }
        });
        function onCopyCut(e) {
          if (!belongsToInput(e) || signalDOMEvent(cm, e)) {
            return;
          }
          if (cm.somethingSelected()) {
            setLastCopied({ lineWise: false, text: cm.getSelections() });
            if (e.type == "cut") {
              cm.replaceSelection("", null, "cut");
            }
          } else if (!cm.options.lineWiseCopyCut) {
            return;
          } else {
            var ranges = copyableRanges(cm);
            setLastCopied({ lineWise: true, text: ranges.text });
            if (e.type == "cut") {
              cm.operation(function() {
                cm.setSelections(ranges.ranges, 0, sel_dontScroll);
                cm.replaceSelection("", null, "cut");
              });
            }
          }
          if (e.clipboardData) {
            e.clipboardData.clearData();
            var content = lastCopied.text.join("\n");
            e.clipboardData.setData("Text", content);
            if (e.clipboardData.getData("Text") == content) {
              e.preventDefault();
              return;
            }
          }
          var kludge = hiddenTextarea(), te = kludge.firstChild;
          cm.display.lineSpace.insertBefore(kludge, cm.display.lineSpace.firstChild);
          te.value = lastCopied.text.join("\n");
          var hadFocus = activeElt(div.ownerDocument);
          selectInput(te);
          setTimeout(function() {
            cm.display.lineSpace.removeChild(kludge);
            hadFocus.focus();
            if (hadFocus == div) {
              input.showPrimarySelection();
            }
          }, 50);
        }
        on(div, "copy", onCopyCut);
        on(div, "cut", onCopyCut);
      };
      ContentEditableInput.prototype.screenReaderLabelChanged = function(label) {
        if (label) {
          this.div.setAttribute("aria-label", label);
        } else {
          this.div.removeAttribute("aria-label");
        }
      };
      ContentEditableInput.prototype.prepareSelection = function() {
        var result = prepareSelection(this.cm, false);
        result.focus = activeElt(this.div.ownerDocument) == this.div;
        return result;
      };
      ContentEditableInput.prototype.showSelection = function(info, takeFocus) {
        if (!info || !this.cm.display.view.length) {
          return;
        }
        if (info.focus || takeFocus) {
          this.showPrimarySelection();
        }
        this.showMultipleSelections(info);
      };
      ContentEditableInput.prototype.getSelection = function() {
        return this.cm.display.wrapper.ownerDocument.getSelection();
      };
      ContentEditableInput.prototype.showPrimarySelection = function() {
        var sel = this.getSelection(), cm = this.cm, prim = cm.doc.sel.primary();
        var from = prim.from(), to = prim.to();
        if (cm.display.viewTo == cm.display.viewFrom || from.line >= cm.display.viewTo || to.line < cm.display.viewFrom) {
          sel.removeAllRanges();
          return;
        }
        var curAnchor = domToPos(cm, sel.anchorNode, sel.anchorOffset);
        var curFocus = domToPos(cm, sel.focusNode, sel.focusOffset);
        if (curAnchor && !curAnchor.bad && curFocus && !curFocus.bad && cmp(minPos(curAnchor, curFocus), from) == 0 && cmp(maxPos(curAnchor, curFocus), to) == 0) {
          return;
        }
        var view = cm.display.view;
        var start = from.line >= cm.display.viewFrom && posToDOM(cm, from) || { node: view[0].measure.map[2], offset: 0 };
        var end = to.line < cm.display.viewTo && posToDOM(cm, to);
        if (!end) {
          var measure = view[view.length - 1].measure;
          var map2 = measure.maps ? measure.maps[measure.maps.length - 1] : measure.map;
          end = { node: map2[map2.length - 1], offset: map2[map2.length - 2] - map2[map2.length - 3] };
        }
        if (!start || !end) {
          sel.removeAllRanges();
          return;
        }
        var old = sel.rangeCount && sel.getRangeAt(0), rng;
        try {
          rng = range(start.node, start.offset, end.offset, end.node);
        } catch (e) {
        }
        if (rng) {
          if (!gecko && cm.state.focused) {
            sel.collapse(start.node, start.offset);
            if (!rng.collapsed) {
              sel.removeAllRanges();
              sel.addRange(rng);
            }
          } else {
            sel.removeAllRanges();
            sel.addRange(rng);
          }
          if (old && sel.anchorNode == null) {
            sel.addRange(old);
          } else if (gecko) {
            this.startGracePeriod();
          }
        }
        this.rememberSelection();
      };
      ContentEditableInput.prototype.startGracePeriod = function() {
        var this$1 = this;
        clearTimeout(this.gracePeriod);
        this.gracePeriod = setTimeout(function() {
          this$1.gracePeriod = false;
          if (this$1.selectionChanged()) {
            this$1.cm.operation(function() {
              return this$1.cm.curOp.selectionChanged = true;
            });
          }
        }, 20);
      };
      ContentEditableInput.prototype.showMultipleSelections = function(info) {
        removeChildrenAndAdd(this.cm.display.cursorDiv, info.cursors);
        removeChildrenAndAdd(this.cm.display.selectionDiv, info.selection);
      };
      ContentEditableInput.prototype.rememberSelection = function() {
        var sel = this.getSelection();
        this.lastAnchorNode = sel.anchorNode;
        this.lastAnchorOffset = sel.anchorOffset;
        this.lastFocusNode = sel.focusNode;
        this.lastFocusOffset = sel.focusOffset;
      };
      ContentEditableInput.prototype.selectionInEditor = function() {
        var sel = this.getSelection();
        if (!sel.rangeCount) {
          return false;
        }
        var node = sel.getRangeAt(0).commonAncestorContainer;
        return contains(this.div, node);
      };
      ContentEditableInput.prototype.focus = function() {
        if (this.cm.options.readOnly != "nocursor") {
          if (!this.selectionInEditor() || activeElt(this.div.ownerDocument) != this.div) {
            this.showSelection(this.prepareSelection(), true);
          }
          this.div.focus();
        }
      };
      ContentEditableInput.prototype.blur = function() {
        this.div.blur();
      };
      ContentEditableInput.prototype.getField = function() {
        return this.div;
      };
      ContentEditableInput.prototype.supportsTouch = function() {
        return true;
      };
      ContentEditableInput.prototype.receivedFocus = function() {
        var this$1 = this;
        var input = this;
        if (this.selectionInEditor()) {
          setTimeout(function() {
            return this$1.pollSelection();
          }, 20);
        } else {
          runInOp(this.cm, function() {
            return input.cm.curOp.selectionChanged = true;
          });
        }
        function poll() {
          if (input.cm.state.focused) {
            input.pollSelection();
            input.polling.set(input.cm.options.pollInterval, poll);
          }
        }
        this.polling.set(this.cm.options.pollInterval, poll);
      };
      ContentEditableInput.prototype.selectionChanged = function() {
        var sel = this.getSelection();
        return sel.anchorNode != this.lastAnchorNode || sel.anchorOffset != this.lastAnchorOffset || sel.focusNode != this.lastFocusNode || sel.focusOffset != this.lastFocusOffset;
      };
      ContentEditableInput.prototype.pollSelection = function() {
        if (this.readDOMTimeout != null || this.gracePeriod || !this.selectionChanged()) {
          return;
        }
        var sel = this.getSelection(), cm = this.cm;
        if (android && chrome && this.cm.display.gutterSpecs.length && isInGutter(sel.anchorNode)) {
          this.cm.triggerOnKeyDown({ type: "keydown", keyCode: 8, preventDefault: Math.abs });
          this.blur();
          this.focus();
          return;
        }
        if (this.composing) {
          return;
        }
        this.rememberSelection();
        var anchor = domToPos(cm, sel.anchorNode, sel.anchorOffset);
        var head = domToPos(cm, sel.focusNode, sel.focusOffset);
        if (anchor && head) {
          runInOp(cm, function() {
            setSelection(cm.doc, simpleSelection(anchor, head), sel_dontScroll);
            if (anchor.bad || head.bad) {
              cm.curOp.selectionChanged = true;
            }
          });
        }
      };
      ContentEditableInput.prototype.pollContent = function() {
        if (this.readDOMTimeout != null) {
          clearTimeout(this.readDOMTimeout);
          this.readDOMTimeout = null;
        }
        var cm = this.cm, display = cm.display, sel = cm.doc.sel.primary();
        var from = sel.from(), to = sel.to();
        if (from.ch == 0 && from.line > cm.firstLine()) {
          from = Pos(from.line - 1, getLine(cm.doc, from.line - 1).length);
        }
        if (to.ch == getLine(cm.doc, to.line).text.length && to.line < cm.lastLine()) {
          to = Pos(to.line + 1, 0);
        }
        if (from.line < display.viewFrom || to.line > display.viewTo - 1) {
          return false;
        }
        var fromIndex, fromLine, fromNode;
        if (from.line == display.viewFrom || (fromIndex = findViewIndex(cm, from.line)) == 0) {
          fromLine = lineNo(display.view[0].line);
          fromNode = display.view[0].node;
        } else {
          fromLine = lineNo(display.view[fromIndex].line);
          fromNode = display.view[fromIndex - 1].node.nextSibling;
        }
        var toIndex = findViewIndex(cm, to.line);
        var toLine, toNode;
        if (toIndex == display.view.length - 1) {
          toLine = display.viewTo - 1;
          toNode = display.lineDiv.lastChild;
        } else {
          toLine = lineNo(display.view[toIndex + 1].line) - 1;
          toNode = display.view[toIndex + 1].node.previousSibling;
        }
        if (!fromNode) {
          return false;
        }
        var newText = cm.doc.splitLines(domTextBetween(cm, fromNode, toNode, fromLine, toLine));
        var oldText = getBetween(cm.doc, Pos(fromLine, 0), Pos(toLine, getLine(cm.doc, toLine).text.length));
        while (newText.length > 1 && oldText.length > 1) {
          if (lst(newText) == lst(oldText)) {
            newText.pop();
            oldText.pop();
            toLine--;
          } else if (newText[0] == oldText[0]) {
            newText.shift();
            oldText.shift();
            fromLine++;
          } else {
            break;
          }
        }
        var cutFront = 0, cutEnd = 0;
        var newTop = newText[0], oldTop = oldText[0], maxCutFront = Math.min(newTop.length, oldTop.length);
        while (cutFront < maxCutFront && newTop.charCodeAt(cutFront) == oldTop.charCodeAt(cutFront)) {
          ++cutFront;
        }
        var newBot = lst(newText), oldBot = lst(oldText);
        var maxCutEnd = Math.min(
          newBot.length - (newText.length == 1 ? cutFront : 0),
          oldBot.length - (oldText.length == 1 ? cutFront : 0)
        );
        while (cutEnd < maxCutEnd && newBot.charCodeAt(newBot.length - cutEnd - 1) == oldBot.charCodeAt(oldBot.length - cutEnd - 1)) {
          ++cutEnd;
        }
        if (newText.length == 1 && oldText.length == 1 && fromLine == from.line) {
          while (cutFront && cutFront > from.ch && newBot.charCodeAt(newBot.length - cutEnd - 1) == oldBot.charCodeAt(oldBot.length - cutEnd - 1)) {
            cutFront--;
            cutEnd++;
          }
        }
        newText[newText.length - 1] = newBot.slice(0, newBot.length - cutEnd).replace(/^\u200b+/, "");
        newText[0] = newText[0].slice(cutFront).replace(/\u200b+$/, "");
        var chFrom = Pos(fromLine, cutFront);
        var chTo = Pos(toLine, oldText.length ? lst(oldText).length - cutEnd : 0);
        if (newText.length > 1 || newText[0] || cmp(chFrom, chTo)) {
          replaceRange(cm.doc, newText, chFrom, chTo, "+input");
          return true;
        }
      };
      ContentEditableInput.prototype.ensurePolled = function() {
        this.forceCompositionEnd();
      };
      ContentEditableInput.prototype.reset = function() {
        this.forceCompositionEnd();
      };
      ContentEditableInput.prototype.forceCompositionEnd = function() {
        if (!this.composing) {
          return;
        }
        clearTimeout(this.readDOMTimeout);
        this.composing = null;
        this.updateFromDOM();
        this.div.blur();
        this.div.focus();
      };
      ContentEditableInput.prototype.readFromDOMSoon = function() {
        var this$1 = this;
        if (this.readDOMTimeout != null) {
          return;
        }
        this.readDOMTimeout = setTimeout(function() {
          this$1.readDOMTimeout = null;
          if (this$1.composing) {
            if (this$1.composing.done) {
              this$1.composing = null;
            } else {
              return;
            }
          }
          this$1.updateFromDOM();
        }, 80);
      };
      ContentEditableInput.prototype.updateFromDOM = function() {
        var this$1 = this;
        if (this.cm.isReadOnly() || !this.pollContent()) {
          runInOp(this.cm, function() {
            return regChange(this$1.cm);
          });
        }
      };
      ContentEditableInput.prototype.setUneditable = function(node) {
        node.contentEditable = "false";
      };
      ContentEditableInput.prototype.onKeyPress = function(e) {
        if (e.charCode == 0 || this.composing) {
          return;
        }
        e.preventDefault();
        if (!this.cm.isReadOnly()) {
          operation(this.cm, applyTextInput)(this.cm, String.fromCharCode(e.charCode == null ? e.keyCode : e.charCode), 0);
        }
      };
      ContentEditableInput.prototype.readOnlyChanged = function(val) {
        this.div.contentEditable = String(val != "nocursor");
      };
      ContentEditableInput.prototype.onContextMenu = function() {
      };
      ContentEditableInput.prototype.resetPosition = function() {
      };
      ContentEditableInput.prototype.needsContentAttribute = true;
      function posToDOM(cm, pos) {
        var view = findViewForLine(cm, pos.line);
        if (!view || view.hidden) {
          return null;
        }
        var line = getLine(cm.doc, pos.line);
        var info = mapFromLineView(view, line, pos.line);
        var order = getOrder(line, cm.doc.direction), side = "left";
        if (order) {
          var partPos = getBidiPartAt(order, pos.ch);
          side = partPos % 2 ? "right" : "left";
        }
        var result = nodeAndOffsetInLineMap(info.map, pos.ch, side);
        result.offset = result.collapse == "right" ? result.end : result.start;
        return result;
      }
      function isInGutter(node) {
        for (var scan = node; scan; scan = scan.parentNode) {
          if (/CodeMirror-gutter-wrapper/.test(scan.className)) {
            return true;
          }
        }
        return false;
      }
      function badPos(pos, bad) {
        if (bad) {
          pos.bad = true;
        }
        return pos;
      }
      function domTextBetween(cm, from, to, fromLine, toLine) {
        var text = "", closing = false, lineSep = cm.doc.lineSeparator(), extraLinebreak = false;
        function recognizeMarker(id) {
          return function(marker) {
            return marker.id == id;
          };
        }
        function close() {
          if (closing) {
            text += lineSep;
            if (extraLinebreak) {
              text += lineSep;
            }
            closing = extraLinebreak = false;
          }
        }
        function addText(str) {
          if (str) {
            close();
            text += str;
          }
        }
        function walk(node) {
          if (node.nodeType == 1) {
            var cmText = node.getAttribute("cm-text");
            if (cmText) {
              addText(cmText);
              return;
            }
            var markerID = node.getAttribute("cm-marker"), range2;
            if (markerID) {
              var found = cm.findMarks(Pos(fromLine, 0), Pos(toLine + 1, 0), recognizeMarker(+markerID));
              if (found.length && (range2 = found[0].find(0))) {
                addText(getBetween(cm.doc, range2.from, range2.to).join(lineSep));
              }
              return;
            }
            if (node.getAttribute("contenteditable") == "false") {
              return;
            }
            var isBlock = /^(pre|div|p|li|table|br)$/i.test(node.nodeName);
            if (!/^br$/i.test(node.nodeName) && node.textContent.length == 0) {
              return;
            }
            if (isBlock) {
              close();
            }
            for (var i2 = 0; i2 < node.childNodes.length; i2++) {
              walk(node.childNodes[i2]);
            }
            if (/^(pre|p)$/i.test(node.nodeName)) {
              extraLinebreak = true;
            }
            if (isBlock) {
              closing = true;
            }
          } else if (node.nodeType == 3) {
            addText(node.nodeValue.replace(/\u200b/g, "").replace(/\u00a0/g, " "));
          }
        }
        for (; ; ) {
          walk(from);
          if (from == to) {
            break;
          }
          from = from.nextSibling;
          extraLinebreak = false;
        }
        return text;
      }
      function domToPos(cm, node, offset) {
        var lineNode;
        if (node == cm.display.lineDiv) {
          lineNode = cm.display.lineDiv.childNodes[offset];
          if (!lineNode) {
            return badPos(cm.clipPos(Pos(cm.display.viewTo - 1)), true);
          }
          node = null;
          offset = 0;
        } else {
          for (lineNode = node; ; lineNode = lineNode.parentNode) {
            if (!lineNode || lineNode == cm.display.lineDiv) {
              return null;
            }
            if (lineNode.parentNode && lineNode.parentNode == cm.display.lineDiv) {
              break;
            }
          }
        }
        for (var i2 = 0; i2 < cm.display.view.length; i2++) {
          var lineView = cm.display.view[i2];
          if (lineView.node == lineNode) {
            return locateNodeInLineView(lineView, node, offset);
          }
        }
      }
      function locateNodeInLineView(lineView, node, offset) {
        var wrapper = lineView.text.firstChild, bad = false;
        if (!node || !contains(wrapper, node)) {
          return badPos(Pos(lineNo(lineView.line), 0), true);
        }
        if (node == wrapper) {
          bad = true;
          node = wrapper.childNodes[offset];
          offset = 0;
          if (!node) {
            var line = lineView.rest ? lst(lineView.rest) : lineView.line;
            return badPos(Pos(lineNo(line), line.text.length), bad);
          }
        }
        var textNode = node.nodeType == 3 ? node : null, topNode = node;
        if (!textNode && node.childNodes.length == 1 && node.firstChild.nodeType == 3) {
          textNode = node.firstChild;
          if (offset) {
            offset = textNode.nodeValue.length;
          }
        }
        while (topNode.parentNode != wrapper) {
          topNode = topNode.parentNode;
        }
        var measure = lineView.measure, maps = measure.maps;
        function find(textNode2, topNode2, offset2) {
          for (var i2 = -1; i2 < (maps ? maps.length : 0); i2++) {
            var map2 = i2 < 0 ? measure.map : maps[i2];
            for (var j = 0; j < map2.length; j += 3) {
              var curNode = map2[j + 2];
              if (curNode == textNode2 || curNode == topNode2) {
                var line2 = lineNo(i2 < 0 ? lineView.line : lineView.rest[i2]);
                var ch = map2[j] + offset2;
                if (offset2 < 0 || curNode != textNode2) {
                  ch = map2[j + (offset2 ? 1 : 0)];
                }
                return Pos(line2, ch);
              }
            }
          }
        }
        var found = find(textNode, topNode, offset);
        if (found) {
          return badPos(found, bad);
        }
        for (var after = topNode.nextSibling, dist = textNode ? textNode.nodeValue.length - offset : 0; after; after = after.nextSibling) {
          found = find(after, after.firstChild, 0);
          if (found) {
            return badPos(Pos(found.line, found.ch - dist), bad);
          } else {
            dist += after.textContent.length;
          }
        }
        for (var before = topNode.previousSibling, dist$1 = offset; before; before = before.previousSibling) {
          found = find(before, before.firstChild, -1);
          if (found) {
            return badPos(Pos(found.line, found.ch + dist$1), bad);
          } else {
            dist$1 += before.textContent.length;
          }
        }
      }
      var TextareaInput = function(cm) {
        this.cm = cm;
        this.prevInput = "";
        this.pollingFast = false;
        this.polling = new Delayed();
        this.hasSelection = false;
        this.composing = null;
        this.resetting = false;
      };
      TextareaInput.prototype.init = function(display) {
        var this$1 = this;
        var input = this, cm = this.cm;
        this.createField(display);
        var te = this.textarea;
        display.wrapper.insertBefore(this.wrapper, display.wrapper.firstChild);
        if (ios) {
          te.style.width = "0px";
        }
        on(te, "input", function() {
          if (ie && ie_version >= 9 && this$1.hasSelection) {
            this$1.hasSelection = null;
          }
          input.poll();
        });
        on(te, "paste", function(e) {
          if (signalDOMEvent(cm, e) || handlePaste(e, cm)) {
            return;
          }
          cm.state.pasteIncoming = +new Date();
          input.fastPoll();
        });
        function prepareCopyCut(e) {
          if (signalDOMEvent(cm, e)) {
            return;
          }
          if (cm.somethingSelected()) {
            setLastCopied({ lineWise: false, text: cm.getSelections() });
          } else if (!cm.options.lineWiseCopyCut) {
            return;
          } else {
            var ranges = copyableRanges(cm);
            setLastCopied({ lineWise: true, text: ranges.text });
            if (e.type == "cut") {
              cm.setSelections(ranges.ranges, null, sel_dontScroll);
            } else {
              input.prevInput = "";
              te.value = ranges.text.join("\n");
              selectInput(te);
            }
          }
          if (e.type == "cut") {
            cm.state.cutIncoming = +new Date();
          }
        }
        on(te, "cut", prepareCopyCut);
        on(te, "copy", prepareCopyCut);
        on(display.scroller, "paste", function(e) {
          if (eventInWidget(display, e) || signalDOMEvent(cm, e)) {
            return;
          }
          if (!te.dispatchEvent) {
            cm.state.pasteIncoming = +new Date();
            input.focus();
            return;
          }
          var event = new Event("paste");
          event.clipboardData = e.clipboardData;
          te.dispatchEvent(event);
        });
        on(display.lineSpace, "selectstart", function(e) {
          if (!eventInWidget(display, e)) {
            e_preventDefault(e);
          }
        });
        on(te, "compositionstart", function() {
          var start = cm.getCursor("from");
          if (input.composing) {
            input.composing.range.clear();
          }
          input.composing = {
            start,
            range: cm.markText(start, cm.getCursor("to"), { className: "CodeMirror-composing" })
          };
        });
        on(te, "compositionend", function() {
          if (input.composing) {
            input.poll();
            input.composing.range.clear();
            input.composing = null;
          }
        });
      };
      TextareaInput.prototype.createField = function(_display) {
        this.wrapper = hiddenTextarea();
        this.textarea = this.wrapper.firstChild;
      };
      TextareaInput.prototype.screenReaderLabelChanged = function(label) {
        if (label) {
          this.textarea.setAttribute("aria-label", label);
        } else {
          this.textarea.removeAttribute("aria-label");
        }
      };
      TextareaInput.prototype.prepareSelection = function() {
        var cm = this.cm, display = cm.display, doc2 = cm.doc;
        var result = prepareSelection(cm);
        if (cm.options.moveInputWithCursor) {
          var headPos = cursorCoords(cm, doc2.sel.primary().head, "div");
          var wrapOff = display.wrapper.getBoundingClientRect(), lineOff = display.lineDiv.getBoundingClientRect();
          result.teTop = Math.max(0, Math.min(
            display.wrapper.clientHeight - 10,
            headPos.top + lineOff.top - wrapOff.top
          ));
          result.teLeft = Math.max(0, Math.min(
            display.wrapper.clientWidth - 10,
            headPos.left + lineOff.left - wrapOff.left
          ));
        }
        return result;
      };
      TextareaInput.prototype.showSelection = function(drawn) {
        var cm = this.cm, display = cm.display;
        removeChildrenAndAdd(display.cursorDiv, drawn.cursors);
        removeChildrenAndAdd(display.selectionDiv, drawn.selection);
        if (drawn.teTop != null) {
          this.wrapper.style.top = drawn.teTop + "px";
          this.wrapper.style.left = drawn.teLeft + "px";
        }
      };
      TextareaInput.prototype.reset = function(typing) {
        if (this.contextMenuPending || this.composing && typing) {
          return;
        }
        var cm = this.cm;
        this.resetting = true;
        if (cm.somethingSelected()) {
          this.prevInput = "";
          var content = cm.getSelection();
          this.textarea.value = content;
          if (cm.state.focused) {
            selectInput(this.textarea);
          }
          if (ie && ie_version >= 9) {
            this.hasSelection = content;
          }
        } else if (!typing) {
          this.prevInput = this.textarea.value = "";
          if (ie && ie_version >= 9) {
            this.hasSelection = null;
          }
        }
        this.resetting = false;
      };
      TextareaInput.prototype.getField = function() {
        return this.textarea;
      };
      TextareaInput.prototype.supportsTouch = function() {
        return false;
      };
      TextareaInput.prototype.focus = function() {
        if (this.cm.options.readOnly != "nocursor" && (!mobile || activeElt(this.textarea.ownerDocument) != this.textarea)) {
          try {
            this.textarea.focus();
          } catch (e) {
          }
        }
      };
      TextareaInput.prototype.blur = function() {
        this.textarea.blur();
      };
      TextareaInput.prototype.resetPosition = function() {
        this.wrapper.style.top = this.wrapper.style.left = 0;
      };
      TextareaInput.prototype.receivedFocus = function() {
        this.slowPoll();
      };
      TextareaInput.prototype.slowPoll = function() {
        var this$1 = this;
        if (this.pollingFast) {
          return;
        }
        this.polling.set(this.cm.options.pollInterval, function() {
          this$1.poll();
          if (this$1.cm.state.focused) {
            this$1.slowPoll();
          }
        });
      };
      TextareaInput.prototype.fastPoll = function() {
        var missed = false, input = this;
        input.pollingFast = true;
        function p() {
          var changed = input.poll();
          if (!changed && !missed) {
            missed = true;
            input.polling.set(60, p);
          } else {
            input.pollingFast = false;
            input.slowPoll();
          }
        }
        input.polling.set(20, p);
      };
      TextareaInput.prototype.poll = function() {
        var this$1 = this;
        var cm = this.cm, input = this.textarea, prevInput = this.prevInput;
        if (this.contextMenuPending || this.resetting || !cm.state.focused || hasSelection(input) && !prevInput && !this.composing || cm.isReadOnly() || cm.options.disableInput || cm.state.keySeq) {
          return false;
        }
        var text = input.value;
        if (text == prevInput && !cm.somethingSelected()) {
          return false;
        }
        if (ie && ie_version >= 9 && this.hasSelection === text || mac && /[\uf700-\uf7ff]/.test(text)) {
          cm.display.input.reset();
          return false;
        }
        if (cm.doc.sel == cm.display.selForContextMenu) {
          var first = text.charCodeAt(0);
          if (first == 8203 && !prevInput) {
            prevInput = "\u200B";
          }
          if (first == 8666) {
            this.reset();
            return this.cm.execCommand("undo");
          }
        }
        var same = 0, l = Math.min(prevInput.length, text.length);
        while (same < l && prevInput.charCodeAt(same) == text.charCodeAt(same)) {
          ++same;
        }
        runInOp(cm, function() {
          applyTextInput(
            cm,
            text.slice(same),
            prevInput.length - same,
            null,
            this$1.composing ? "*compose" : null
          );
          if (text.length > 1e3 || text.indexOf("\n") > -1) {
            input.value = this$1.prevInput = "";
          } else {
            this$1.prevInput = text;
          }
          if (this$1.composing) {
            this$1.composing.range.clear();
            this$1.composing.range = cm.markText(
              this$1.composing.start,
              cm.getCursor("to"),
              { className: "CodeMirror-composing" }
            );
          }
        });
        return true;
      };
      TextareaInput.prototype.ensurePolled = function() {
        if (this.pollingFast && this.poll()) {
          this.pollingFast = false;
        }
      };
      TextareaInput.prototype.onKeyPress = function() {
        if (ie && ie_version >= 9) {
          this.hasSelection = null;
        }
        this.fastPoll();
      };
      TextareaInput.prototype.onContextMenu = function(e) {
        var input = this, cm = input.cm, display = cm.display, te = input.textarea;
        if (input.contextMenuPending) {
          input.contextMenuPending();
        }
        var pos = posFromMouse(cm, e), scrollPos = display.scroller.scrollTop;
        if (!pos || presto) {
          return;
        }
        var reset = cm.options.resetSelectionOnContextMenu;
        if (reset && cm.doc.sel.contains(pos) == -1) {
          operation(cm, setSelection)(cm.doc, simpleSelection(pos), sel_dontScroll);
        }
        var oldCSS = te.style.cssText, oldWrapperCSS = input.wrapper.style.cssText;
        var wrapperBox = input.wrapper.offsetParent.getBoundingClientRect();
        input.wrapper.style.cssText = "position: static";
        te.style.cssText = "position: absolute; width: 30px; height: 30px;\n      top: " + (e.clientY - wrapperBox.top - 5) + "px; left: " + (e.clientX - wrapperBox.left - 5) + "px;\n      z-index: 1000; background: " + (ie ? "rgba(255, 255, 255, .05)" : "transparent") + ";\n      outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);";
        var oldScrollY;
        if (webkit) {
          oldScrollY = te.ownerDocument.defaultView.scrollY;
        }
        display.input.focus();
        if (webkit) {
          te.ownerDocument.defaultView.scrollTo(null, oldScrollY);
        }
        display.input.reset();
        if (!cm.somethingSelected()) {
          te.value = input.prevInput = " ";
        }
        input.contextMenuPending = rehide;
        display.selForContextMenu = cm.doc.sel;
        clearTimeout(display.detectingSelectAll);
        function prepareSelectAllHack() {
          if (te.selectionStart != null) {
            var selected = cm.somethingSelected();
            var extval = "\u200B" + (selected ? te.value : "");
            te.value = "\u21DA";
            te.value = extval;
            input.prevInput = selected ? "" : "\u200B";
            te.selectionStart = 1;
            te.selectionEnd = extval.length;
            display.selForContextMenu = cm.doc.sel;
          }
        }
        function rehide() {
          if (input.contextMenuPending != rehide) {
            return;
          }
          input.contextMenuPending = false;
          input.wrapper.style.cssText = oldWrapperCSS;
          te.style.cssText = oldCSS;
          if (ie && ie_version < 9) {
            display.scrollbars.setScrollTop(display.scroller.scrollTop = scrollPos);
          }
          if (te.selectionStart != null) {
            if (!ie || ie && ie_version < 9) {
              prepareSelectAllHack();
            }
            var i2 = 0, poll = function() {
              if (display.selForContextMenu == cm.doc.sel && te.selectionStart == 0 && te.selectionEnd > 0 && input.prevInput == "\u200B") {
                operation(cm, selectAll)(cm);
              } else if (i2++ < 10) {
                display.detectingSelectAll = setTimeout(poll, 500);
              } else {
                display.selForContextMenu = null;
                display.input.reset();
              }
            };
            display.detectingSelectAll = setTimeout(poll, 200);
          }
        }
        if (ie && ie_version >= 9) {
          prepareSelectAllHack();
        }
        if (captureRightClick) {
          e_stop(e);
          var mouseup = function() {
            off(window, "mouseup", mouseup);
            setTimeout(rehide, 20);
          };
          on(window, "mouseup", mouseup);
        } else {
          setTimeout(rehide, 50);
        }
      };
      TextareaInput.prototype.readOnlyChanged = function(val) {
        if (!val) {
          this.reset();
        }
        this.textarea.disabled = val == "nocursor";
        this.textarea.readOnly = !!val;
      };
      TextareaInput.prototype.setUneditable = function() {
      };
      TextareaInput.prototype.needsContentAttribute = false;
      function fromTextArea(textarea, options) {
        options = options ? copyObj(options) : {};
        options.value = textarea.value;
        if (!options.tabindex && textarea.tabIndex) {
          options.tabindex = textarea.tabIndex;
        }
        if (!options.placeholder && textarea.placeholder) {
          options.placeholder = textarea.placeholder;
        }
        if (options.autofocus == null) {
          var hasFocus = activeElt(textarea.ownerDocument);
          options.autofocus = hasFocus == textarea || textarea.getAttribute("autofocus") != null && hasFocus == document.body;
        }
        function save() {
          textarea.value = cm.getValue();
        }
        var realSubmit;
        if (textarea.form) {
          on(textarea.form, "submit", save);
          if (!options.leaveSubmitMethodAlone) {
            var form = textarea.form;
            realSubmit = form.submit;
            try {
              var wrappedSubmit = form.submit = function() {
                save();
                form.submit = realSubmit;
                form.submit();
                form.submit = wrappedSubmit;
              };
            } catch (e) {
            }
          }
        }
        options.finishInit = function(cm2) {
          cm2.save = save;
          cm2.getTextArea = function() {
            return textarea;
          };
          cm2.toTextArea = function() {
            cm2.toTextArea = isNaN;
            save();
            textarea.parentNode.removeChild(cm2.getWrapperElement());
            textarea.style.display = "";
            if (textarea.form) {
              off(textarea.form, "submit", save);
              if (!options.leaveSubmitMethodAlone && typeof textarea.form.submit == "function") {
                textarea.form.submit = realSubmit;
              }
            }
          };
        };
        textarea.style.display = "none";
        var cm = CodeMirror3(
          function(node) {
            return textarea.parentNode.insertBefore(node, textarea.nextSibling);
          },
          options
        );
        return cm;
      }
      function addLegacyProps(CodeMirror4) {
        CodeMirror4.off = off;
        CodeMirror4.on = on;
        CodeMirror4.wheelEventPixels = wheelEventPixels;
        CodeMirror4.Doc = Doc;
        CodeMirror4.splitLines = splitLinesAuto;
        CodeMirror4.countColumn = countColumn;
        CodeMirror4.findColumn = findColumn;
        CodeMirror4.isWordChar = isWordCharBasic;
        CodeMirror4.Pass = Pass;
        CodeMirror4.signal = signal;
        CodeMirror4.Line = Line;
        CodeMirror4.changeEnd = changeEnd;
        CodeMirror4.scrollbarModel = scrollbarModel;
        CodeMirror4.Pos = Pos;
        CodeMirror4.cmpPos = cmp;
        CodeMirror4.modes = modes;
        CodeMirror4.mimeModes = mimeModes;
        CodeMirror4.resolveMode = resolveMode;
        CodeMirror4.getMode = getMode2;
        CodeMirror4.modeExtensions = modeExtensions;
        CodeMirror4.extendMode = extendMode;
        CodeMirror4.copyState = copyState;
        CodeMirror4.startState = startState;
        CodeMirror4.innerMode = innerMode;
        CodeMirror4.commands = commands;
        CodeMirror4.keyMap = keyMap;
        CodeMirror4.keyName = keyName;
        CodeMirror4.isModifierKey = isModifierKey;
        CodeMirror4.lookupKey = lookupKey;
        CodeMirror4.normalizeKeyMap = normalizeKeyMap;
        CodeMirror4.StringStream = StringStream;
        CodeMirror4.SharedTextMarker = SharedTextMarker;
        CodeMirror4.TextMarker = TextMarker;
        CodeMirror4.LineWidget = LineWidget;
        CodeMirror4.e_preventDefault = e_preventDefault;
        CodeMirror4.e_stopPropagation = e_stopPropagation;
        CodeMirror4.e_stop = e_stop;
        CodeMirror4.addClass = addClass;
        CodeMirror4.contains = contains;
        CodeMirror4.rmClass = rmClass;
        CodeMirror4.keyNames = keyNames;
      }
      defineOptions(CodeMirror3);
      addEditorMethods(CodeMirror3);
      var dontDelegate = "iter insert remove copy getEditor constructor".split(" ");
      for (var prop in Doc.prototype) {
        if (Doc.prototype.hasOwnProperty(prop) && indexOf(dontDelegate, prop) < 0) {
          CodeMirror3.prototype[prop] = function(method) {
            return function() {
              return method.apply(this.doc, arguments);
            };
          }(Doc.prototype[prop]);
        }
      }
      eventMixin(Doc);
      CodeMirror3.inputStyles = { "textarea": TextareaInput, "contenteditable": ContentEditableInput };
      CodeMirror3.defineMode = function(name) {
        if (!CodeMirror3.defaults.mode && name != "null") {
          CodeMirror3.defaults.mode = name;
        }
        defineMode.apply(this, arguments);
      };
      CodeMirror3.defineMIME = defineMIME;
      CodeMirror3.defineMode("null", function() {
        return { token: function(stream) {
          return stream.skipToEnd();
        } };
      });
      CodeMirror3.defineMIME("text/plain", "null");
      CodeMirror3.defineExtension = function(name, func) {
        CodeMirror3.prototype[name] = func;
      };
      CodeMirror3.defineDocExtension = function(name, func) {
        Doc.prototype[name] = func;
      };
      CodeMirror3.fromTextArea = fromTextArea;
      addLegacyProps(CodeMirror3);
      CodeMirror3.version = "5.65.9";
      return CodeMirror3;
    });
  }
});

// node_modules/clipboard/dist/clipboard.min.js
var require_clipboard_min = __commonJS({
  "node_modules/clipboard/dist/clipboard.min.js"(exports, module) {
    !function(t, e) {
      "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.ClipboardJS = e() : t.ClipboardJS = e();
    }(exports, function() {
      return n = { 686: function(t, e, n2) {
        "use strict";
        n2.d(e, { default: function() {
          return b;
        } });
        var e = n2(279), i = n2.n(e), e = n2(370), u = n2.n(e), e = n2(817), r2 = n2.n(e);
        function c(t2) {
          try {
            return document.execCommand(t2);
          } catch (t3) {
            return;
          }
        }
        var a = function(t2) {
          t2 = r2()(t2);
          return c("cut"), t2;
        };
        function o2(t2, e2) {
          var n3, o3, t2 = (n3 = t2, o3 = "rtl" === document.documentElement.getAttribute("dir"), (t2 = document.createElement("textarea")).style.fontSize = "12pt", t2.style.border = "0", t2.style.padding = "0", t2.style.margin = "0", t2.style.position = "absolute", t2.style[o3 ? "right" : "left"] = "-9999px", o3 = window.pageYOffset || document.documentElement.scrollTop, t2.style.top = "".concat(o3, "px"), t2.setAttribute("readonly", ""), t2.value = n3, t2);
          return e2.container.appendChild(t2), e2 = r2()(t2), c("copy"), t2.remove(), e2;
        }
        var f = function(t2) {
          var e2 = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : { container: document.body }, n3 = "";
          return "string" == typeof t2 ? n3 = o2(t2, e2) : t2 instanceof HTMLInputElement && !["text", "search", "url", "tel", "password"].includes(null == t2 ? void 0 : t2.type) ? n3 = o2(t2.value, e2) : (n3 = r2()(t2), c("copy")), n3;
        };
        function l(t2) {
          return (l = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t3) {
            return typeof t3;
          } : function(t3) {
            return t3 && "function" == typeof Symbol && t3.constructor === Symbol && t3 !== Symbol.prototype ? "symbol" : typeof t3;
          })(t2);
        }
        var s = function() {
          var t2 = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, e2 = t2.action, n3 = void 0 === e2 ? "copy" : e2, o3 = t2.container, e2 = t2.target, t2 = t2.text;
          if ("copy" !== n3 && "cut" !== n3)
            throw new Error('Invalid "action" value, use either "copy" or "cut"');
          if (void 0 !== e2) {
            if (!e2 || "object" !== l(e2) || 1 !== e2.nodeType)
              throw new Error('Invalid "target" value, use a valid Element');
            if ("copy" === n3 && e2.hasAttribute("disabled"))
              throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
            if ("cut" === n3 && (e2.hasAttribute("readonly") || e2.hasAttribute("disabled")))
              throw new Error(`Invalid "target" attribute. You can't cut text from elements with "readonly" or "disabled" attributes`);
          }
          return t2 ? f(t2, { container: o3 }) : e2 ? "cut" === n3 ? a(e2) : f(e2, { container: o3 }) : void 0;
        };
        function p(t2) {
          return (p = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t3) {
            return typeof t3;
          } : function(t3) {
            return t3 && "function" == typeof Symbol && t3.constructor === Symbol && t3 !== Symbol.prototype ? "symbol" : typeof t3;
          })(t2);
        }
        function d(t2, e2) {
          for (var n3 = 0; n3 < e2.length; n3++) {
            var o3 = e2[n3];
            o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(t2, o3.key, o3);
          }
        }
        function y(t2, e2) {
          return (y = Object.setPrototypeOf || function(t3, e3) {
            return t3.__proto__ = e3, t3;
          })(t2, e2);
        }
        function h(n3) {
          var o3 = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct)
              return false;
            if (Reflect.construct.sham)
              return false;
            if ("function" == typeof Proxy)
              return true;
            try {
              return Date.prototype.toString.call(Reflect.construct(Date, [], function() {
              })), true;
            } catch (t2) {
              return false;
            }
          }();
          return function() {
            var t2, e2 = v(n3);
            return t2 = o3 ? (t2 = v(this).constructor, Reflect.construct(e2, arguments, t2)) : e2.apply(this, arguments), e2 = this, !(t2 = t2) || "object" !== p(t2) && "function" != typeof t2 ? function(t3) {
              if (void 0 !== t3)
                return t3;
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }(e2) : t2;
          };
        }
        function v(t2) {
          return (v = Object.setPrototypeOf ? Object.getPrototypeOf : function(t3) {
            return t3.__proto__ || Object.getPrototypeOf(t3);
          })(t2);
        }
        function m(t2, e2) {
          t2 = "data-clipboard-".concat(t2);
          if (e2.hasAttribute(t2))
            return e2.getAttribute(t2);
        }
        var b = function() {
          !function(t3, e3) {
            if ("function" != typeof e3 && null !== e3)
              throw new TypeError("Super expression must either be null or a function");
            t3.prototype = Object.create(e3 && e3.prototype, { constructor: { value: t3, writable: true, configurable: true } }), e3 && y(t3, e3);
          }(r3, i());
          var t2, e2, n3, o3 = h(r3);
          function r3(t3, e3) {
            var n4;
            return function(t4) {
              if (!(t4 instanceof r3))
                throw new TypeError("Cannot call a class as a function");
            }(this), (n4 = o3.call(this)).resolveOptions(e3), n4.listenClick(t3), n4;
          }
          return t2 = r3, n3 = [{ key: "copy", value: function(t3) {
            var e3 = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : { container: document.body };
            return f(t3, e3);
          } }, { key: "cut", value: function(t3) {
            return a(t3);
          } }, { key: "isSupported", value: function() {
            var t3 = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : ["copy", "cut"], t3 = "string" == typeof t3 ? [t3] : t3, e3 = !!document.queryCommandSupported;
            return t3.forEach(function(t4) {
              e3 = e3 && !!document.queryCommandSupported(t4);
            }), e3;
          } }], (e2 = [{ key: "resolveOptions", value: function() {
            var t3 = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
            this.action = "function" == typeof t3.action ? t3.action : this.defaultAction, this.target = "function" == typeof t3.target ? t3.target : this.defaultTarget, this.text = "function" == typeof t3.text ? t3.text : this.defaultText, this.container = "object" === p(t3.container) ? t3.container : document.body;
          } }, { key: "listenClick", value: function(t3) {
            var e3 = this;
            this.listener = u()(t3, "click", function(t4) {
              return e3.onClick(t4);
            });
          } }, { key: "onClick", value: function(t3) {
            var e3 = t3.delegateTarget || t3.currentTarget, n4 = this.action(e3) || "copy", t3 = s({ action: n4, container: this.container, target: this.target(e3), text: this.text(e3) });
            this.emit(t3 ? "success" : "error", { action: n4, text: t3, trigger: e3, clearSelection: function() {
              e3 && e3.focus(), window.getSelection().removeAllRanges();
            } });
          } }, { key: "defaultAction", value: function(t3) {
            return m("action", t3);
          } }, { key: "defaultTarget", value: function(t3) {
            t3 = m("target", t3);
            if (t3)
              return document.querySelector(t3);
          } }, { key: "defaultText", value: function(t3) {
            return m("text", t3);
          } }, { key: "destroy", value: function() {
            this.listener.destroy();
          } }]) && d(t2.prototype, e2), n3 && d(t2, n3), r3;
        }();
      }, 828: function(t) {
        var e;
        "undefined" == typeof Element || Element.prototype.matches || ((e = Element.prototype).matches = e.matchesSelector || e.mozMatchesSelector || e.msMatchesSelector || e.oMatchesSelector || e.webkitMatchesSelector), t.exports = function(t2, e2) {
          for (; t2 && 9 !== t2.nodeType; ) {
            if ("function" == typeof t2.matches && t2.matches(e2))
              return t2;
            t2 = t2.parentNode;
          }
        };
      }, 438: function(t, e, n2) {
        var u = n2(828);
        function i(t2, e2, n3, o2, r2) {
          var i2 = function(e3, n4, t3, o3) {
            return function(t4) {
              t4.delegateTarget = u(t4.target, n4), t4.delegateTarget && o3.call(e3, t4);
            };
          }.apply(this, arguments);
          return t2.addEventListener(n3, i2, r2), { destroy: function() {
            t2.removeEventListener(n3, i2, r2);
          } };
        }
        t.exports = function(t2, e2, n3, o2, r2) {
          return "function" == typeof t2.addEventListener ? i.apply(null, arguments) : "function" == typeof n3 ? i.bind(null, document).apply(null, arguments) : ("string" == typeof t2 && (t2 = document.querySelectorAll(t2)), Array.prototype.map.call(t2, function(t3) {
            return i(t3, e2, n3, o2, r2);
          }));
        };
      }, 879: function(t, n2) {
        n2.node = function(t2) {
          return void 0 !== t2 && t2 instanceof HTMLElement && 1 === t2.nodeType;
        }, n2.nodeList = function(t2) {
          var e = Object.prototype.toString.call(t2);
          return void 0 !== t2 && ("[object NodeList]" === e || "[object HTMLCollection]" === e) && "length" in t2 && (0 === t2.length || n2.node(t2[0]));
        }, n2.string = function(t2) {
          return "string" == typeof t2 || t2 instanceof String;
        }, n2.fn = function(t2) {
          return "[object Function]" === Object.prototype.toString.call(t2);
        };
      }, 370: function(t, e, n2) {
        var f = n2(879), l = n2(438);
        t.exports = function(t2, e2, n3) {
          if (!t2 && !e2 && !n3)
            throw new Error("Missing required arguments");
          if (!f.string(e2))
            throw new TypeError("Second argument must be a String");
          if (!f.fn(n3))
            throw new TypeError("Third argument must be a Function");
          if (f.node(t2))
            return c = e2, a = n3, (u = t2).addEventListener(c, a), { destroy: function() {
              u.removeEventListener(c, a);
            } };
          if (f.nodeList(t2))
            return o2 = t2, r2 = e2, i = n3, Array.prototype.forEach.call(o2, function(t3) {
              t3.addEventListener(r2, i);
            }), { destroy: function() {
              Array.prototype.forEach.call(o2, function(t3) {
                t3.removeEventListener(r2, i);
              });
            } };
          if (f.string(t2))
            return t2 = t2, e2 = e2, n3 = n3, l(document.body, t2, e2, n3);
          throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList");
          var o2, r2, i, u, c, a;
        };
      }, 817: function(t) {
        t.exports = function(t2) {
          var e, n2 = "SELECT" === t2.nodeName ? (t2.focus(), t2.value) : "INPUT" === t2.nodeName || "TEXTAREA" === t2.nodeName ? ((e = t2.hasAttribute("readonly")) || t2.setAttribute("readonly", ""), t2.select(), t2.setSelectionRange(0, t2.value.length), e || t2.removeAttribute("readonly"), t2.value) : (t2.hasAttribute("contenteditable") && t2.focus(), n2 = window.getSelection(), (e = document.createRange()).selectNodeContents(t2), n2.removeAllRanges(), n2.addRange(e), n2.toString());
          return n2;
        };
      }, 279: function(t) {
        function e() {
        }
        e.prototype = { on: function(t2, e2, n2) {
          var o2 = this.e || (this.e = {});
          return (o2[t2] || (o2[t2] = [])).push({ fn: e2, ctx: n2 }), this;
        }, once: function(t2, e2, n2) {
          var o2 = this;
          function r2() {
            o2.off(t2, r2), e2.apply(n2, arguments);
          }
          return r2._ = e2, this.on(t2, r2, n2);
        }, emit: function(t2) {
          for (var e2 = [].slice.call(arguments, 1), n2 = ((this.e || (this.e = {}))[t2] || []).slice(), o2 = 0, r2 = n2.length; o2 < r2; o2++)
            n2[o2].fn.apply(n2[o2].ctx, e2);
          return this;
        }, off: function(t2, e2) {
          var n2 = this.e || (this.e = {}), o2 = n2[t2], r2 = [];
          if (o2 && e2)
            for (var i = 0, u = o2.length; i < u; i++)
              o2[i].fn !== e2 && o2[i].fn._ !== e2 && r2.push(o2[i]);
          return r2.length ? n2[t2] = r2 : delete n2[t2], this;
        } }, t.exports = e, t.exports.TinyEmitter = e;
      } }, r = {}, o.n = function(t) {
        var e = t && t.__esModule ? function() {
          return t.default;
        } : function() {
          return t;
        };
        return o.d(e, { a: e }), e;
      }, o.d = function(t, e) {
        for (var n2 in e)
          o.o(e, n2) && !o.o(t, n2) && Object.defineProperty(t, n2, { enumerable: true, get: e[n2] });
      }, o.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
      }, o(686).default;
      function o(t) {
        if (r[t])
          return r[t].exports;
        var e = r[t] = { exports: {} };
        return n[t](e, e.exports, o), e.exports;
      }
      var n, r;
    });
  }
});

// node_modules/codemirror/mode/css/css.js
var require_css = __commonJS({
  "node_modules/codemirror/mode/css/css.js"(exports, module) {
    (function(mod) {
      if (typeof exports == "object" && typeof module == "object")
        mod(require_codemirror());
      else if (typeof define == "function" && define.amd)
        define(["../../lib/codemirror"], mod);
      else
        mod(CodeMirror);
    })(function(CodeMirror3) {
      "use strict";
      CodeMirror3.defineMode("css", function(config, parserConfig) {
        var inline = parserConfig.inline;
        if (!parserConfig.propertyKeywords)
          parserConfig = CodeMirror3.resolveMode("text/css");
        var indentUnit = config.indentUnit, tokenHooks = parserConfig.tokenHooks, documentTypes2 = parserConfig.documentTypes || {}, mediaTypes2 = parserConfig.mediaTypes || {}, mediaFeatures2 = parserConfig.mediaFeatures || {}, mediaValueKeywords2 = parserConfig.mediaValueKeywords || {}, propertyKeywords2 = parserConfig.propertyKeywords || {}, nonStandardPropertyKeywords2 = parserConfig.nonStandardPropertyKeywords || {}, fontProperties2 = parserConfig.fontProperties || {}, counterDescriptors2 = parserConfig.counterDescriptors || {}, colorKeywords2 = parserConfig.colorKeywords || {}, valueKeywords2 = parserConfig.valueKeywords || {}, allowNested = parserConfig.allowNested, lineComment = parserConfig.lineComment, supportsAtComponent = parserConfig.supportsAtComponent === true, highlightNonStandardPropertyKeywords = config.highlightNonStandardPropertyKeywords !== false;
        var type, override;
        function ret(style, tp) {
          type = tp;
          return style;
        }
        function tokenBase(stream, state) {
          var ch = stream.next();
          if (tokenHooks[ch]) {
            var result = tokenHooks[ch](stream, state);
            if (result !== false)
              return result;
          }
          if (ch == "@") {
            stream.eatWhile(/[\w\\\-]/);
            return ret("def", stream.current());
          } else if (ch == "=" || (ch == "~" || ch == "|") && stream.eat("=")) {
            return ret(null, "compare");
          } else if (ch == '"' || ch == "'") {
            state.tokenize = tokenString(ch);
            return state.tokenize(stream, state);
          } else if (ch == "#") {
            stream.eatWhile(/[\w\\\-]/);
            return ret("atom", "hash");
          } else if (ch == "!") {
            stream.match(/^\s*\w*/);
            return ret("keyword", "important");
          } else if (/\d/.test(ch) || ch == "." && stream.eat(/\d/)) {
            stream.eatWhile(/[\w.%]/);
            return ret("number", "unit");
          } else if (ch === "-") {
            if (/[\d.]/.test(stream.peek())) {
              stream.eatWhile(/[\w.%]/);
              return ret("number", "unit");
            } else if (stream.match(/^-[\w\\\-]*/)) {
              stream.eatWhile(/[\w\\\-]/);
              if (stream.match(/^\s*:/, false))
                return ret("variable-2", "variable-definition");
              return ret("variable-2", "variable");
            } else if (stream.match(/^\w+-/)) {
              return ret("meta", "meta");
            }
          } else if (/[,+>*\/]/.test(ch)) {
            return ret(null, "select-op");
          } else if (ch == "." && stream.match(/^-?[_a-z][_a-z0-9-]*/i)) {
            return ret("qualifier", "qualifier");
          } else if (/[:;{}\[\]\(\)]/.test(ch)) {
            return ret(null, ch);
          } else if (stream.match(/^[\w-.]+(?=\()/)) {
            if (/^(url(-prefix)?|domain|regexp)$/i.test(stream.current())) {
              state.tokenize = tokenParenthesized;
            }
            return ret("variable callee", "variable");
          } else if (/[\w\\\-]/.test(ch)) {
            stream.eatWhile(/[\w\\\-]/);
            return ret("property", "word");
          } else {
            return ret(null, null);
          }
        }
        function tokenString(quote) {
          return function(stream, state) {
            var escaped = false, ch;
            while ((ch = stream.next()) != null) {
              if (ch == quote && !escaped) {
                if (quote == ")")
                  stream.backUp(1);
                break;
              }
              escaped = !escaped && ch == "\\";
            }
            if (ch == quote || !escaped && quote != ")")
              state.tokenize = null;
            return ret("string", "string");
          };
        }
        function tokenParenthesized(stream, state) {
          stream.next();
          if (!stream.match(/^\s*[\"\')]/, false))
            state.tokenize = tokenString(")");
          else
            state.tokenize = null;
          return ret(null, "(");
        }
        function Context(type2, indent, prev) {
          this.type = type2;
          this.indent = indent;
          this.prev = prev;
        }
        function pushContext(state, stream, type2, indent) {
          state.context = new Context(type2, stream.indentation() + (indent === false ? 0 : indentUnit), state.context);
          return type2;
        }
        function popContext(state) {
          if (state.context.prev)
            state.context = state.context.prev;
          return state.context.type;
        }
        function pass(type2, stream, state) {
          return states[state.context.type](type2, stream, state);
        }
        function popAndPass(type2, stream, state, n) {
          for (var i = n || 1; i > 0; i--)
            state.context = state.context.prev;
          return pass(type2, stream, state);
        }
        function wordAsValue(stream) {
          var word = stream.current().toLowerCase();
          if (valueKeywords2.hasOwnProperty(word))
            override = "atom";
          else if (colorKeywords2.hasOwnProperty(word))
            override = "keyword";
          else
            override = "variable";
        }
        var states = {};
        states.top = function(type2, stream, state) {
          if (type2 == "{") {
            return pushContext(state, stream, "block");
          } else if (type2 == "}" && state.context.prev) {
            return popContext(state);
          } else if (supportsAtComponent && /@component/i.test(type2)) {
            return pushContext(state, stream, "atComponentBlock");
          } else if (/^@(-moz-)?document$/i.test(type2)) {
            return pushContext(state, stream, "documentTypes");
          } else if (/^@(media|supports|(-moz-)?document|import)$/i.test(type2)) {
            return pushContext(state, stream, "atBlock");
          } else if (/^@(font-face|counter-style)/i.test(type2)) {
            state.stateArg = type2;
            return "restricted_atBlock_before";
          } else if (/^@(-(moz|ms|o|webkit)-)?keyframes$/i.test(type2)) {
            return "keyframes";
          } else if (type2 && type2.charAt(0) == "@") {
            return pushContext(state, stream, "at");
          } else if (type2 == "hash") {
            override = "builtin";
          } else if (type2 == "word") {
            override = "tag";
          } else if (type2 == "variable-definition") {
            return "maybeprop";
          } else if (type2 == "interpolation") {
            return pushContext(state, stream, "interpolation");
          } else if (type2 == ":") {
            return "pseudo";
          } else if (allowNested && type2 == "(") {
            return pushContext(state, stream, "parens");
          }
          return state.context.type;
        };
        states.block = function(type2, stream, state) {
          if (type2 == "word") {
            var word = stream.current().toLowerCase();
            if (propertyKeywords2.hasOwnProperty(word)) {
              override = "property";
              return "maybeprop";
            } else if (nonStandardPropertyKeywords2.hasOwnProperty(word)) {
              override = highlightNonStandardPropertyKeywords ? "string-2" : "property";
              return "maybeprop";
            } else if (allowNested) {
              override = stream.match(/^\s*:(?:\s|$)/, false) ? "property" : "tag";
              return "block";
            } else {
              override += " error";
              return "maybeprop";
            }
          } else if (type2 == "meta") {
            return "block";
          } else if (!allowNested && (type2 == "hash" || type2 == "qualifier")) {
            override = "error";
            return "block";
          } else {
            return states.top(type2, stream, state);
          }
        };
        states.maybeprop = function(type2, stream, state) {
          if (type2 == ":")
            return pushContext(state, stream, "prop");
          return pass(type2, stream, state);
        };
        states.prop = function(type2, stream, state) {
          if (type2 == ";")
            return popContext(state);
          if (type2 == "{" && allowNested)
            return pushContext(state, stream, "propBlock");
          if (type2 == "}" || type2 == "{")
            return popAndPass(type2, stream, state);
          if (type2 == "(")
            return pushContext(state, stream, "parens");
          if (type2 == "hash" && !/^#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(stream.current())) {
            override += " error";
          } else if (type2 == "word") {
            wordAsValue(stream);
          } else if (type2 == "interpolation") {
            return pushContext(state, stream, "interpolation");
          }
          return "prop";
        };
        states.propBlock = function(type2, _stream, state) {
          if (type2 == "}")
            return popContext(state);
          if (type2 == "word") {
            override = "property";
            return "maybeprop";
          }
          return state.context.type;
        };
        states.parens = function(type2, stream, state) {
          if (type2 == "{" || type2 == "}")
            return popAndPass(type2, stream, state);
          if (type2 == ")")
            return popContext(state);
          if (type2 == "(")
            return pushContext(state, stream, "parens");
          if (type2 == "interpolation")
            return pushContext(state, stream, "interpolation");
          if (type2 == "word")
            wordAsValue(stream);
          return "parens";
        };
        states.pseudo = function(type2, stream, state) {
          if (type2 == "meta")
            return "pseudo";
          if (type2 == "word") {
            override = "variable-3";
            return state.context.type;
          }
          return pass(type2, stream, state);
        };
        states.documentTypes = function(type2, stream, state) {
          if (type2 == "word" && documentTypes2.hasOwnProperty(stream.current())) {
            override = "tag";
            return state.context.type;
          } else {
            return states.atBlock(type2, stream, state);
          }
        };
        states.atBlock = function(type2, stream, state) {
          if (type2 == "(")
            return pushContext(state, stream, "atBlock_parens");
          if (type2 == "}" || type2 == ";")
            return popAndPass(type2, stream, state);
          if (type2 == "{")
            return popContext(state) && pushContext(state, stream, allowNested ? "block" : "top");
          if (type2 == "interpolation")
            return pushContext(state, stream, "interpolation");
          if (type2 == "word") {
            var word = stream.current().toLowerCase();
            if (word == "only" || word == "not" || word == "and" || word == "or")
              override = "keyword";
            else if (mediaTypes2.hasOwnProperty(word))
              override = "attribute";
            else if (mediaFeatures2.hasOwnProperty(word))
              override = "property";
            else if (mediaValueKeywords2.hasOwnProperty(word))
              override = "keyword";
            else if (propertyKeywords2.hasOwnProperty(word))
              override = "property";
            else if (nonStandardPropertyKeywords2.hasOwnProperty(word))
              override = highlightNonStandardPropertyKeywords ? "string-2" : "property";
            else if (valueKeywords2.hasOwnProperty(word))
              override = "atom";
            else if (colorKeywords2.hasOwnProperty(word))
              override = "keyword";
            else
              override = "error";
          }
          return state.context.type;
        };
        states.atComponentBlock = function(type2, stream, state) {
          if (type2 == "}")
            return popAndPass(type2, stream, state);
          if (type2 == "{")
            return popContext(state) && pushContext(state, stream, allowNested ? "block" : "top", false);
          if (type2 == "word")
            override = "error";
          return state.context.type;
        };
        states.atBlock_parens = function(type2, stream, state) {
          if (type2 == ")")
            return popContext(state);
          if (type2 == "{" || type2 == "}")
            return popAndPass(type2, stream, state, 2);
          return states.atBlock(type2, stream, state);
        };
        states.restricted_atBlock_before = function(type2, stream, state) {
          if (type2 == "{")
            return pushContext(state, stream, "restricted_atBlock");
          if (type2 == "word" && state.stateArg == "@counter-style") {
            override = "variable";
            return "restricted_atBlock_before";
          }
          return pass(type2, stream, state);
        };
        states.restricted_atBlock = function(type2, stream, state) {
          if (type2 == "}") {
            state.stateArg = null;
            return popContext(state);
          }
          if (type2 == "word") {
            if (state.stateArg == "@font-face" && !fontProperties2.hasOwnProperty(stream.current().toLowerCase()) || state.stateArg == "@counter-style" && !counterDescriptors2.hasOwnProperty(stream.current().toLowerCase()))
              override = "error";
            else
              override = "property";
            return "maybeprop";
          }
          return "restricted_atBlock";
        };
        states.keyframes = function(type2, stream, state) {
          if (type2 == "word") {
            override = "variable";
            return "keyframes";
          }
          if (type2 == "{")
            return pushContext(state, stream, "top");
          return pass(type2, stream, state);
        };
        states.at = function(type2, stream, state) {
          if (type2 == ";")
            return popContext(state);
          if (type2 == "{" || type2 == "}")
            return popAndPass(type2, stream, state);
          if (type2 == "word")
            override = "tag";
          else if (type2 == "hash")
            override = "builtin";
          return "at";
        };
        states.interpolation = function(type2, stream, state) {
          if (type2 == "}")
            return popContext(state);
          if (type2 == "{" || type2 == ";")
            return popAndPass(type2, stream, state);
          if (type2 == "word")
            override = "variable";
          else if (type2 != "variable" && type2 != "(" && type2 != ")")
            override = "error";
          return "interpolation";
        };
        return {
          startState: function(base) {
            return {
              tokenize: null,
              state: inline ? "block" : "top",
              stateArg: null,
              context: new Context(inline ? "block" : "top", base || 0, null)
            };
          },
          token: function(stream, state) {
            if (!state.tokenize && stream.eatSpace())
              return null;
            var style = (state.tokenize || tokenBase)(stream, state);
            if (style && typeof style == "object") {
              type = style[1];
              style = style[0];
            }
            override = style;
            if (type != "comment")
              state.state = states[state.state](type, stream, state);
            return override;
          },
          indent: function(state, textAfter) {
            var cx = state.context, ch = textAfter && textAfter.charAt(0);
            var indent = cx.indent;
            if (cx.type == "prop" && (ch == "}" || ch == ")"))
              cx = cx.prev;
            if (cx.prev) {
              if (ch == "}" && (cx.type == "block" || cx.type == "top" || cx.type == "interpolation" || cx.type == "restricted_atBlock")) {
                cx = cx.prev;
                indent = cx.indent;
              } else if (ch == ")" && (cx.type == "parens" || cx.type == "atBlock_parens") || ch == "{" && (cx.type == "at" || cx.type == "atBlock")) {
                indent = Math.max(0, cx.indent - indentUnit);
              }
            }
            return indent;
          },
          electricChars: "}",
          blockCommentStart: "/*",
          blockCommentEnd: "*/",
          blockCommentContinue: " * ",
          lineComment,
          fold: "brace"
        };
      });
      function keySet(array) {
        var keys = {};
        for (var i = 0; i < array.length; ++i) {
          keys[array[i].toLowerCase()] = true;
        }
        return keys;
      }
      var documentTypes_ = [
        "domain",
        "regexp",
        "url",
        "url-prefix"
      ], documentTypes = keySet(documentTypes_);
      var mediaTypes_ = [
        "all",
        "aural",
        "braille",
        "handheld",
        "print",
        "projection",
        "screen",
        "tty",
        "tv",
        "embossed"
      ], mediaTypes = keySet(mediaTypes_);
      var mediaFeatures_ = [
        "width",
        "min-width",
        "max-width",
        "height",
        "min-height",
        "max-height",
        "device-width",
        "min-device-width",
        "max-device-width",
        "device-height",
        "min-device-height",
        "max-device-height",
        "aspect-ratio",
        "min-aspect-ratio",
        "max-aspect-ratio",
        "device-aspect-ratio",
        "min-device-aspect-ratio",
        "max-device-aspect-ratio",
        "color",
        "min-color",
        "max-color",
        "color-index",
        "min-color-index",
        "max-color-index",
        "monochrome",
        "min-monochrome",
        "max-monochrome",
        "resolution",
        "min-resolution",
        "max-resolution",
        "scan",
        "grid",
        "orientation",
        "device-pixel-ratio",
        "min-device-pixel-ratio",
        "max-device-pixel-ratio",
        "pointer",
        "any-pointer",
        "hover",
        "any-hover",
        "prefers-color-scheme",
        "dynamic-range",
        "video-dynamic-range"
      ], mediaFeatures = keySet(mediaFeatures_);
      var mediaValueKeywords_ = [
        "landscape",
        "portrait",
        "none",
        "coarse",
        "fine",
        "on-demand",
        "hover",
        "interlace",
        "progressive",
        "dark",
        "light",
        "standard",
        "high"
      ], mediaValueKeywords = keySet(mediaValueKeywords_);
      var propertyKeywords_ = [
        "align-content",
        "align-items",
        "align-self",
        "alignment-adjust",
        "alignment-baseline",
        "all",
        "anchor-point",
        "animation",
        "animation-delay",
        "animation-direction",
        "animation-duration",
        "animation-fill-mode",
        "animation-iteration-count",
        "animation-name",
        "animation-play-state",
        "animation-timing-function",
        "appearance",
        "azimuth",
        "backdrop-filter",
        "backface-visibility",
        "background",
        "background-attachment",
        "background-blend-mode",
        "background-clip",
        "background-color",
        "background-image",
        "background-origin",
        "background-position",
        "background-position-x",
        "background-position-y",
        "background-repeat",
        "background-size",
        "baseline-shift",
        "binding",
        "bleed",
        "block-size",
        "bookmark-label",
        "bookmark-level",
        "bookmark-state",
        "bookmark-target",
        "border",
        "border-bottom",
        "border-bottom-color",
        "border-bottom-left-radius",
        "border-bottom-right-radius",
        "border-bottom-style",
        "border-bottom-width",
        "border-collapse",
        "border-color",
        "border-image",
        "border-image-outset",
        "border-image-repeat",
        "border-image-slice",
        "border-image-source",
        "border-image-width",
        "border-left",
        "border-left-color",
        "border-left-style",
        "border-left-width",
        "border-radius",
        "border-right",
        "border-right-color",
        "border-right-style",
        "border-right-width",
        "border-spacing",
        "border-style",
        "border-top",
        "border-top-color",
        "border-top-left-radius",
        "border-top-right-radius",
        "border-top-style",
        "border-top-width",
        "border-width",
        "bottom",
        "box-decoration-break",
        "box-shadow",
        "box-sizing",
        "break-after",
        "break-before",
        "break-inside",
        "caption-side",
        "caret-color",
        "clear",
        "clip",
        "color",
        "color-profile",
        "column-count",
        "column-fill",
        "column-gap",
        "column-rule",
        "column-rule-color",
        "column-rule-style",
        "column-rule-width",
        "column-span",
        "column-width",
        "columns",
        "contain",
        "content",
        "counter-increment",
        "counter-reset",
        "crop",
        "cue",
        "cue-after",
        "cue-before",
        "cursor",
        "direction",
        "display",
        "dominant-baseline",
        "drop-initial-after-adjust",
        "drop-initial-after-align",
        "drop-initial-before-adjust",
        "drop-initial-before-align",
        "drop-initial-size",
        "drop-initial-value",
        "elevation",
        "empty-cells",
        "fit",
        "fit-content",
        "fit-position",
        "flex",
        "flex-basis",
        "flex-direction",
        "flex-flow",
        "flex-grow",
        "flex-shrink",
        "flex-wrap",
        "float",
        "float-offset",
        "flow-from",
        "flow-into",
        "font",
        "font-family",
        "font-feature-settings",
        "font-kerning",
        "font-language-override",
        "font-optical-sizing",
        "font-size",
        "font-size-adjust",
        "font-stretch",
        "font-style",
        "font-synthesis",
        "font-variant",
        "font-variant-alternates",
        "font-variant-caps",
        "font-variant-east-asian",
        "font-variant-ligatures",
        "font-variant-numeric",
        "font-variant-position",
        "font-variation-settings",
        "font-weight",
        "gap",
        "grid",
        "grid-area",
        "grid-auto-columns",
        "grid-auto-flow",
        "grid-auto-rows",
        "grid-column",
        "grid-column-end",
        "grid-column-gap",
        "grid-column-start",
        "grid-gap",
        "grid-row",
        "grid-row-end",
        "grid-row-gap",
        "grid-row-start",
        "grid-template",
        "grid-template-areas",
        "grid-template-columns",
        "grid-template-rows",
        "hanging-punctuation",
        "height",
        "hyphens",
        "icon",
        "image-orientation",
        "image-rendering",
        "image-resolution",
        "inline-box-align",
        "inset",
        "inset-block",
        "inset-block-end",
        "inset-block-start",
        "inset-inline",
        "inset-inline-end",
        "inset-inline-start",
        "isolation",
        "justify-content",
        "justify-items",
        "justify-self",
        "left",
        "letter-spacing",
        "line-break",
        "line-height",
        "line-height-step",
        "line-stacking",
        "line-stacking-ruby",
        "line-stacking-shift",
        "line-stacking-strategy",
        "list-style",
        "list-style-image",
        "list-style-position",
        "list-style-type",
        "margin",
        "margin-bottom",
        "margin-left",
        "margin-right",
        "margin-top",
        "marks",
        "marquee-direction",
        "marquee-loop",
        "marquee-play-count",
        "marquee-speed",
        "marquee-style",
        "mask-clip",
        "mask-composite",
        "mask-image",
        "mask-mode",
        "mask-origin",
        "mask-position",
        "mask-repeat",
        "mask-size",
        "mask-type",
        "max-block-size",
        "max-height",
        "max-inline-size",
        "max-width",
        "min-block-size",
        "min-height",
        "min-inline-size",
        "min-width",
        "mix-blend-mode",
        "move-to",
        "nav-down",
        "nav-index",
        "nav-left",
        "nav-right",
        "nav-up",
        "object-fit",
        "object-position",
        "offset",
        "offset-anchor",
        "offset-distance",
        "offset-path",
        "offset-position",
        "offset-rotate",
        "opacity",
        "order",
        "orphans",
        "outline",
        "outline-color",
        "outline-offset",
        "outline-style",
        "outline-width",
        "overflow",
        "overflow-style",
        "overflow-wrap",
        "overflow-x",
        "overflow-y",
        "padding",
        "padding-bottom",
        "padding-left",
        "padding-right",
        "padding-top",
        "page",
        "page-break-after",
        "page-break-before",
        "page-break-inside",
        "page-policy",
        "pause",
        "pause-after",
        "pause-before",
        "perspective",
        "perspective-origin",
        "pitch",
        "pitch-range",
        "place-content",
        "place-items",
        "place-self",
        "play-during",
        "position",
        "presentation-level",
        "punctuation-trim",
        "quotes",
        "region-break-after",
        "region-break-before",
        "region-break-inside",
        "region-fragment",
        "rendering-intent",
        "resize",
        "rest",
        "rest-after",
        "rest-before",
        "richness",
        "right",
        "rotate",
        "rotation",
        "rotation-point",
        "row-gap",
        "ruby-align",
        "ruby-overhang",
        "ruby-position",
        "ruby-span",
        "scale",
        "scroll-behavior",
        "scroll-margin",
        "scroll-margin-block",
        "scroll-margin-block-end",
        "scroll-margin-block-start",
        "scroll-margin-bottom",
        "scroll-margin-inline",
        "scroll-margin-inline-end",
        "scroll-margin-inline-start",
        "scroll-margin-left",
        "scroll-margin-right",
        "scroll-margin-top",
        "scroll-padding",
        "scroll-padding-block",
        "scroll-padding-block-end",
        "scroll-padding-block-start",
        "scroll-padding-bottom",
        "scroll-padding-inline",
        "scroll-padding-inline-end",
        "scroll-padding-inline-start",
        "scroll-padding-left",
        "scroll-padding-right",
        "scroll-padding-top",
        "scroll-snap-align",
        "scroll-snap-type",
        "shape-image-threshold",
        "shape-inside",
        "shape-margin",
        "shape-outside",
        "size",
        "speak",
        "speak-as",
        "speak-header",
        "speak-numeral",
        "speak-punctuation",
        "speech-rate",
        "stress",
        "string-set",
        "tab-size",
        "table-layout",
        "target",
        "target-name",
        "target-new",
        "target-position",
        "text-align",
        "text-align-last",
        "text-combine-upright",
        "text-decoration",
        "text-decoration-color",
        "text-decoration-line",
        "text-decoration-skip",
        "text-decoration-skip-ink",
        "text-decoration-style",
        "text-emphasis",
        "text-emphasis-color",
        "text-emphasis-position",
        "text-emphasis-style",
        "text-height",
        "text-indent",
        "text-justify",
        "text-orientation",
        "text-outline",
        "text-overflow",
        "text-rendering",
        "text-shadow",
        "text-size-adjust",
        "text-space-collapse",
        "text-transform",
        "text-underline-position",
        "text-wrap",
        "top",
        "touch-action",
        "transform",
        "transform-origin",
        "transform-style",
        "transition",
        "transition-delay",
        "transition-duration",
        "transition-property",
        "transition-timing-function",
        "translate",
        "unicode-bidi",
        "user-select",
        "vertical-align",
        "visibility",
        "voice-balance",
        "voice-duration",
        "voice-family",
        "voice-pitch",
        "voice-range",
        "voice-rate",
        "voice-stress",
        "voice-volume",
        "volume",
        "white-space",
        "widows",
        "width",
        "will-change",
        "word-break",
        "word-spacing",
        "word-wrap",
        "writing-mode",
        "z-index",
        // SVG-specific
        "clip-path",
        "clip-rule",
        "mask",
        "enable-background",
        "filter",
        "flood-color",
        "flood-opacity",
        "lighting-color",
        "stop-color",
        "stop-opacity",
        "pointer-events",
        "color-interpolation",
        "color-interpolation-filters",
        "color-rendering",
        "fill",
        "fill-opacity",
        "fill-rule",
        "image-rendering",
        "marker",
        "marker-end",
        "marker-mid",
        "marker-start",
        "paint-order",
        "shape-rendering",
        "stroke",
        "stroke-dasharray",
        "stroke-dashoffset",
        "stroke-linecap",
        "stroke-linejoin",
        "stroke-miterlimit",
        "stroke-opacity",
        "stroke-width",
        "text-rendering",
        "baseline-shift",
        "dominant-baseline",
        "glyph-orientation-horizontal",
        "glyph-orientation-vertical",
        "text-anchor",
        "writing-mode"
      ], propertyKeywords = keySet(propertyKeywords_);
      var nonStandardPropertyKeywords_ = [
        "accent-color",
        "aspect-ratio",
        "border-block",
        "border-block-color",
        "border-block-end",
        "border-block-end-color",
        "border-block-end-style",
        "border-block-end-width",
        "border-block-start",
        "border-block-start-color",
        "border-block-start-style",
        "border-block-start-width",
        "border-block-style",
        "border-block-width",
        "border-inline",
        "border-inline-color",
        "border-inline-end",
        "border-inline-end-color",
        "border-inline-end-style",
        "border-inline-end-width",
        "border-inline-start",
        "border-inline-start-color",
        "border-inline-start-style",
        "border-inline-start-width",
        "border-inline-style",
        "border-inline-width",
        "content-visibility",
        "margin-block",
        "margin-block-end",
        "margin-block-start",
        "margin-inline",
        "margin-inline-end",
        "margin-inline-start",
        "overflow-anchor",
        "overscroll-behavior",
        "padding-block",
        "padding-block-end",
        "padding-block-start",
        "padding-inline",
        "padding-inline-end",
        "padding-inline-start",
        "scroll-snap-stop",
        "scrollbar-3d-light-color",
        "scrollbar-arrow-color",
        "scrollbar-base-color",
        "scrollbar-dark-shadow-color",
        "scrollbar-face-color",
        "scrollbar-highlight-color",
        "scrollbar-shadow-color",
        "scrollbar-track-color",
        "searchfield-cancel-button",
        "searchfield-decoration",
        "searchfield-results-button",
        "searchfield-results-decoration",
        "shape-inside",
        "zoom"
      ], nonStandardPropertyKeywords = keySet(nonStandardPropertyKeywords_);
      var fontProperties_ = [
        "font-display",
        "font-family",
        "src",
        "unicode-range",
        "font-variant",
        "font-feature-settings",
        "font-stretch",
        "font-weight",
        "font-style"
      ], fontProperties = keySet(fontProperties_);
      var counterDescriptors_ = [
        "additive-symbols",
        "fallback",
        "negative",
        "pad",
        "prefix",
        "range",
        "speak-as",
        "suffix",
        "symbols",
        "system"
      ], counterDescriptors = keySet(counterDescriptors_);
      var colorKeywords_ = [
        "aliceblue",
        "antiquewhite",
        "aqua",
        "aquamarine",
        "azure",
        "beige",
        "bisque",
        "black",
        "blanchedalmond",
        "blue",
        "blueviolet",
        "brown",
        "burlywood",
        "cadetblue",
        "chartreuse",
        "chocolate",
        "coral",
        "cornflowerblue",
        "cornsilk",
        "crimson",
        "cyan",
        "darkblue",
        "darkcyan",
        "darkgoldenrod",
        "darkgray",
        "darkgreen",
        "darkgrey",
        "darkkhaki",
        "darkmagenta",
        "darkolivegreen",
        "darkorange",
        "darkorchid",
        "darkred",
        "darksalmon",
        "darkseagreen",
        "darkslateblue",
        "darkslategray",
        "darkslategrey",
        "darkturquoise",
        "darkviolet",
        "deeppink",
        "deepskyblue",
        "dimgray",
        "dimgrey",
        "dodgerblue",
        "firebrick",
        "floralwhite",
        "forestgreen",
        "fuchsia",
        "gainsboro",
        "ghostwhite",
        "gold",
        "goldenrod",
        "gray",
        "grey",
        "green",
        "greenyellow",
        "honeydew",
        "hotpink",
        "indianred",
        "indigo",
        "ivory",
        "khaki",
        "lavender",
        "lavenderblush",
        "lawngreen",
        "lemonchiffon",
        "lightblue",
        "lightcoral",
        "lightcyan",
        "lightgoldenrodyellow",
        "lightgray",
        "lightgreen",
        "lightgrey",
        "lightpink",
        "lightsalmon",
        "lightseagreen",
        "lightskyblue",
        "lightslategray",
        "lightslategrey",
        "lightsteelblue",
        "lightyellow",
        "lime",
        "limegreen",
        "linen",
        "magenta",
        "maroon",
        "mediumaquamarine",
        "mediumblue",
        "mediumorchid",
        "mediumpurple",
        "mediumseagreen",
        "mediumslateblue",
        "mediumspringgreen",
        "mediumturquoise",
        "mediumvioletred",
        "midnightblue",
        "mintcream",
        "mistyrose",
        "moccasin",
        "navajowhite",
        "navy",
        "oldlace",
        "olive",
        "olivedrab",
        "orange",
        "orangered",
        "orchid",
        "palegoldenrod",
        "palegreen",
        "paleturquoise",
        "palevioletred",
        "papayawhip",
        "peachpuff",
        "peru",
        "pink",
        "plum",
        "powderblue",
        "purple",
        "rebeccapurple",
        "red",
        "rosybrown",
        "royalblue",
        "saddlebrown",
        "salmon",
        "sandybrown",
        "seagreen",
        "seashell",
        "sienna",
        "silver",
        "skyblue",
        "slateblue",
        "slategray",
        "slategrey",
        "snow",
        "springgreen",
        "steelblue",
        "tan",
        "teal",
        "thistle",
        "tomato",
        "turquoise",
        "violet",
        "wheat",
        "white",
        "whitesmoke",
        "yellow",
        "yellowgreen"
      ], colorKeywords = keySet(colorKeywords_);
      var valueKeywords_ = [
        "above",
        "absolute",
        "activeborder",
        "additive",
        "activecaption",
        "afar",
        "after-white-space",
        "ahead",
        "alias",
        "all",
        "all-scroll",
        "alphabetic",
        "alternate",
        "always",
        "amharic",
        "amharic-abegede",
        "antialiased",
        "appworkspace",
        "arabic-indic",
        "armenian",
        "asterisks",
        "attr",
        "auto",
        "auto-flow",
        "avoid",
        "avoid-column",
        "avoid-page",
        "avoid-region",
        "axis-pan",
        "background",
        "backwards",
        "baseline",
        "below",
        "bidi-override",
        "binary",
        "bengali",
        "blink",
        "block",
        "block-axis",
        "blur",
        "bold",
        "bolder",
        "border",
        "border-box",
        "both",
        "bottom",
        "break",
        "break-all",
        "break-word",
        "brightness",
        "bullets",
        "button",
        "buttonface",
        "buttonhighlight",
        "buttonshadow",
        "buttontext",
        "calc",
        "cambodian",
        "capitalize",
        "caps-lock-indicator",
        "caption",
        "captiontext",
        "caret",
        "cell",
        "center",
        "checkbox",
        "circle",
        "cjk-decimal",
        "cjk-earthly-branch",
        "cjk-heavenly-stem",
        "cjk-ideographic",
        "clear",
        "clip",
        "close-quote",
        "col-resize",
        "collapse",
        "color",
        "color-burn",
        "color-dodge",
        "column",
        "column-reverse",
        "compact",
        "condensed",
        "conic-gradient",
        "contain",
        "content",
        "contents",
        "content-box",
        "context-menu",
        "continuous",
        "contrast",
        "copy",
        "counter",
        "counters",
        "cover",
        "crop",
        "cross",
        "crosshair",
        "cubic-bezier",
        "currentcolor",
        "cursive",
        "cyclic",
        "darken",
        "dashed",
        "decimal",
        "decimal-leading-zero",
        "default",
        "default-button",
        "dense",
        "destination-atop",
        "destination-in",
        "destination-out",
        "destination-over",
        "devanagari",
        "difference",
        "disc",
        "discard",
        "disclosure-closed",
        "disclosure-open",
        "document",
        "dot-dash",
        "dot-dot-dash",
        "dotted",
        "double",
        "down",
        "drop-shadow",
        "e-resize",
        "ease",
        "ease-in",
        "ease-in-out",
        "ease-out",
        "element",
        "ellipse",
        "ellipsis",
        "embed",
        "end",
        "ethiopic",
        "ethiopic-abegede",
        "ethiopic-abegede-am-et",
        "ethiopic-abegede-gez",
        "ethiopic-abegede-ti-er",
        "ethiopic-abegede-ti-et",
        "ethiopic-halehame-aa-er",
        "ethiopic-halehame-aa-et",
        "ethiopic-halehame-am-et",
        "ethiopic-halehame-gez",
        "ethiopic-halehame-om-et",
        "ethiopic-halehame-sid-et",
        "ethiopic-halehame-so-et",
        "ethiopic-halehame-ti-er",
        "ethiopic-halehame-ti-et",
        "ethiopic-halehame-tig",
        "ethiopic-numeric",
        "ew-resize",
        "exclusion",
        "expanded",
        "extends",
        "extra-condensed",
        "extra-expanded",
        "fantasy",
        "fast",
        "fill",
        "fill-box",
        "fixed",
        "flat",
        "flex",
        "flex-end",
        "flex-start",
        "footnotes",
        "forwards",
        "from",
        "geometricPrecision",
        "georgian",
        "grayscale",
        "graytext",
        "grid",
        "groove",
        "gujarati",
        "gurmukhi",
        "hand",
        "hangul",
        "hangul-consonant",
        "hard-light",
        "hebrew",
        "help",
        "hidden",
        "hide",
        "higher",
        "highlight",
        "highlighttext",
        "hiragana",
        "hiragana-iroha",
        "horizontal",
        "hsl",
        "hsla",
        "hue",
        "hue-rotate",
        "icon",
        "ignore",
        "inactiveborder",
        "inactivecaption",
        "inactivecaptiontext",
        "infinite",
        "infobackground",
        "infotext",
        "inherit",
        "initial",
        "inline",
        "inline-axis",
        "inline-block",
        "inline-flex",
        "inline-grid",
        "inline-table",
        "inset",
        "inside",
        "intrinsic",
        "invert",
        "italic",
        "japanese-formal",
        "japanese-informal",
        "justify",
        "kannada",
        "katakana",
        "katakana-iroha",
        "keep-all",
        "khmer",
        "korean-hangul-formal",
        "korean-hanja-formal",
        "korean-hanja-informal",
        "landscape",
        "lao",
        "large",
        "larger",
        "left",
        "level",
        "lighter",
        "lighten",
        "line-through",
        "linear",
        "linear-gradient",
        "lines",
        "list-item",
        "listbox",
        "listitem",
        "local",
        "logical",
        "loud",
        "lower",
        "lower-alpha",
        "lower-armenian",
        "lower-greek",
        "lower-hexadecimal",
        "lower-latin",
        "lower-norwegian",
        "lower-roman",
        "lowercase",
        "ltr",
        "luminosity",
        "malayalam",
        "manipulation",
        "match",
        "matrix",
        "matrix3d",
        "media-play-button",
        "media-slider",
        "media-sliderthumb",
        "media-volume-slider",
        "media-volume-sliderthumb",
        "medium",
        "menu",
        "menulist",
        "menulist-button",
        "menutext",
        "message-box",
        "middle",
        "min-intrinsic",
        "mix",
        "mongolian",
        "monospace",
        "move",
        "multiple",
        "multiple_mask_images",
        "multiply",
        "myanmar",
        "n-resize",
        "narrower",
        "ne-resize",
        "nesw-resize",
        "no-close-quote",
        "no-drop",
        "no-open-quote",
        "no-repeat",
        "none",
        "normal",
        "not-allowed",
        "nowrap",
        "ns-resize",
        "numbers",
        "numeric",
        "nw-resize",
        "nwse-resize",
        "oblique",
        "octal",
        "opacity",
        "open-quote",
        "optimizeLegibility",
        "optimizeSpeed",
        "oriya",
        "oromo",
        "outset",
        "outside",
        "outside-shape",
        "overlay",
        "overline",
        "padding",
        "padding-box",
        "painted",
        "page",
        "paused",
        "persian",
        "perspective",
        "pinch-zoom",
        "plus-darker",
        "plus-lighter",
        "pointer",
        "polygon",
        "portrait",
        "pre",
        "pre-line",
        "pre-wrap",
        "preserve-3d",
        "progress",
        "push-button",
        "radial-gradient",
        "radio",
        "read-only",
        "read-write",
        "read-write-plaintext-only",
        "rectangle",
        "region",
        "relative",
        "repeat",
        "repeating-linear-gradient",
        "repeating-radial-gradient",
        "repeating-conic-gradient",
        "repeat-x",
        "repeat-y",
        "reset",
        "reverse",
        "rgb",
        "rgba",
        "ridge",
        "right",
        "rotate",
        "rotate3d",
        "rotateX",
        "rotateY",
        "rotateZ",
        "round",
        "row",
        "row-resize",
        "row-reverse",
        "rtl",
        "run-in",
        "running",
        "s-resize",
        "sans-serif",
        "saturate",
        "saturation",
        "scale",
        "scale3d",
        "scaleX",
        "scaleY",
        "scaleZ",
        "screen",
        "scroll",
        "scrollbar",
        "scroll-position",
        "se-resize",
        "searchfield",
        "searchfield-cancel-button",
        "searchfield-decoration",
        "searchfield-results-button",
        "searchfield-results-decoration",
        "self-start",
        "self-end",
        "semi-condensed",
        "semi-expanded",
        "separate",
        "sepia",
        "serif",
        "show",
        "sidama",
        "simp-chinese-formal",
        "simp-chinese-informal",
        "single",
        "skew",
        "skewX",
        "skewY",
        "skip-white-space",
        "slide",
        "slider-horizontal",
        "slider-vertical",
        "sliderthumb-horizontal",
        "sliderthumb-vertical",
        "slow",
        "small",
        "small-caps",
        "small-caption",
        "smaller",
        "soft-light",
        "solid",
        "somali",
        "source-atop",
        "source-in",
        "source-out",
        "source-over",
        "space",
        "space-around",
        "space-between",
        "space-evenly",
        "spell-out",
        "square",
        "square-button",
        "start",
        "static",
        "status-bar",
        "stretch",
        "stroke",
        "stroke-box",
        "sub",
        "subpixel-antialiased",
        "svg_masks",
        "super",
        "sw-resize",
        "symbolic",
        "symbols",
        "system-ui",
        "table",
        "table-caption",
        "table-cell",
        "table-column",
        "table-column-group",
        "table-footer-group",
        "table-header-group",
        "table-row",
        "table-row-group",
        "tamil",
        "telugu",
        "text",
        "text-bottom",
        "text-top",
        "textarea",
        "textfield",
        "thai",
        "thick",
        "thin",
        "threeddarkshadow",
        "threedface",
        "threedhighlight",
        "threedlightshadow",
        "threedshadow",
        "tibetan",
        "tigre",
        "tigrinya-er",
        "tigrinya-er-abegede",
        "tigrinya-et",
        "tigrinya-et-abegede",
        "to",
        "top",
        "trad-chinese-formal",
        "trad-chinese-informal",
        "transform",
        "translate",
        "translate3d",
        "translateX",
        "translateY",
        "translateZ",
        "transparent",
        "ultra-condensed",
        "ultra-expanded",
        "underline",
        "unidirectional-pan",
        "unset",
        "up",
        "upper-alpha",
        "upper-armenian",
        "upper-greek",
        "upper-hexadecimal",
        "upper-latin",
        "upper-norwegian",
        "upper-roman",
        "uppercase",
        "urdu",
        "url",
        "var",
        "vertical",
        "vertical-text",
        "view-box",
        "visible",
        "visibleFill",
        "visiblePainted",
        "visibleStroke",
        "visual",
        "w-resize",
        "wait",
        "wave",
        "wider",
        "window",
        "windowframe",
        "windowtext",
        "words",
        "wrap",
        "wrap-reverse",
        "x-large",
        "x-small",
        "xor",
        "xx-large",
        "xx-small"
      ], valueKeywords = keySet(valueKeywords_);
      var allWords = documentTypes_.concat(mediaTypes_).concat(mediaFeatures_).concat(mediaValueKeywords_).concat(propertyKeywords_).concat(nonStandardPropertyKeywords_).concat(colorKeywords_).concat(valueKeywords_);
      CodeMirror3.registerHelper("hintWords", "css", allWords);
      function tokenCComment(stream, state) {
        var maybeEnd = false, ch;
        while ((ch = stream.next()) != null) {
          if (maybeEnd && ch == "/") {
            state.tokenize = null;
            break;
          }
          maybeEnd = ch == "*";
        }
        return ["comment", "comment"];
      }
      CodeMirror3.defineMIME("text/css", {
        documentTypes,
        mediaTypes,
        mediaFeatures,
        mediaValueKeywords,
        propertyKeywords,
        nonStandardPropertyKeywords,
        fontProperties,
        counterDescriptors,
        colorKeywords,
        valueKeywords,
        tokenHooks: {
          "/": function(stream, state) {
            if (!stream.eat("*"))
              return false;
            state.tokenize = tokenCComment;
            return tokenCComment(stream, state);
          }
        },
        name: "css"
      });
      CodeMirror3.defineMIME("text/x-scss", {
        mediaTypes,
        mediaFeatures,
        mediaValueKeywords,
        propertyKeywords,
        nonStandardPropertyKeywords,
        colorKeywords,
        valueKeywords,
        fontProperties,
        allowNested: true,
        lineComment: "//",
        tokenHooks: {
          "/": function(stream, state) {
            if (stream.eat("/")) {
              stream.skipToEnd();
              return ["comment", "comment"];
            } else if (stream.eat("*")) {
              state.tokenize = tokenCComment;
              return tokenCComment(stream, state);
            } else {
              return ["operator", "operator"];
            }
          },
          ":": function(stream) {
            if (stream.match(/^\s*\{/, false))
              return [null, null];
            return false;
          },
          "$": function(stream) {
            stream.match(/^[\w-]+/);
            if (stream.match(/^\s*:/, false))
              return ["variable-2", "variable-definition"];
            return ["variable-2", "variable"];
          },
          "#": function(stream) {
            if (!stream.eat("{"))
              return false;
            return [null, "interpolation"];
          }
        },
        name: "css",
        helperType: "scss"
      });
      CodeMirror3.defineMIME("text/x-less", {
        mediaTypes,
        mediaFeatures,
        mediaValueKeywords,
        propertyKeywords,
        nonStandardPropertyKeywords,
        colorKeywords,
        valueKeywords,
        fontProperties,
        allowNested: true,
        lineComment: "//",
        tokenHooks: {
          "/": function(stream, state) {
            if (stream.eat("/")) {
              stream.skipToEnd();
              return ["comment", "comment"];
            } else if (stream.eat("*")) {
              state.tokenize = tokenCComment;
              return tokenCComment(stream, state);
            } else {
              return ["operator", "operator"];
            }
          },
          "@": function(stream) {
            if (stream.eat("{"))
              return [null, "interpolation"];
            if (stream.match(/^(charset|document|font-face|import|(-(moz|ms|o|webkit)-)?keyframes|media|namespace|page|supports)\b/i, false))
              return false;
            stream.eatWhile(/[\w\\\-]/);
            if (stream.match(/^\s*:/, false))
              return ["variable-2", "variable-definition"];
            return ["variable-2", "variable"];
          },
          "&": function() {
            return ["atom", "atom"];
          }
        },
        name: "css",
        helperType: "less"
      });
      CodeMirror3.defineMIME("text/x-gss", {
        documentTypes,
        mediaTypes,
        mediaFeatures,
        propertyKeywords,
        nonStandardPropertyKeywords,
        fontProperties,
        counterDescriptors,
        colorKeywords,
        valueKeywords,
        supportsAtComponent: true,
        tokenHooks: {
          "/": function(stream, state) {
            if (!stream.eat("*"))
              return false;
            state.tokenize = tokenCComment;
            return tokenCComment(stream, state);
          }
        },
        name: "css",
        helperType: "gss"
      });
    });
  }
});

// node_modules/codemirror/mode/clike/clike.js
var require_clike = __commonJS({
  "node_modules/codemirror/mode/clike/clike.js"(exports, module) {
    (function(mod) {
      if (typeof exports == "object" && typeof module == "object")
        mod(require_codemirror());
      else if (typeof define == "function" && define.amd)
        define(["../../lib/codemirror"], mod);
      else
        mod(CodeMirror);
    })(function(CodeMirror3) {
      "use strict";
      function Context(indented, column, type, info, align, prev) {
        this.indented = indented;
        this.column = column;
        this.type = type;
        this.info = info;
        this.align = align;
        this.prev = prev;
      }
      function pushContext(state, col, type, info) {
        var indent = state.indented;
        if (state.context && state.context.type == "statement" && type != "statement")
          indent = state.context.indented;
        return state.context = new Context(indent, col, type, info, null, state.context);
      }
      function popContext(state) {
        var t = state.context.type;
        if (t == ")" || t == "]" || t == "}")
          state.indented = state.context.indented;
        return state.context = state.context.prev;
      }
      function typeBefore(stream, state, pos) {
        if (state.prevToken == "variable" || state.prevToken == "type")
          return true;
        if (/\S(?:[^- ]>|[*\]])\s*$|\*$/.test(stream.string.slice(0, pos)))
          return true;
        if (state.typeAtEndOfLine && stream.column() == stream.indentation())
          return true;
      }
      function isTopScope(context) {
        for (; ; ) {
          if (!context || context.type == "top")
            return true;
          if (context.type == "}" && context.prev.info != "namespace")
            return false;
          context = context.prev;
        }
      }
      CodeMirror3.defineMode("clike", function(config, parserConfig) {
        var indentUnit = config.indentUnit, statementIndentUnit = parserConfig.statementIndentUnit || indentUnit, dontAlignCalls = parserConfig.dontAlignCalls, keywords = parserConfig.keywords || {}, types = parserConfig.types || {}, builtin = parserConfig.builtin || {}, blockKeywords = parserConfig.blockKeywords || {}, defKeywords = parserConfig.defKeywords || {}, atoms = parserConfig.atoms || {}, hooks = parserConfig.hooks || {}, multiLineStrings = parserConfig.multiLineStrings, indentStatements = parserConfig.indentStatements !== false, indentSwitch = parserConfig.indentSwitch !== false, namespaceSeparator = parserConfig.namespaceSeparator, isPunctuationChar = parserConfig.isPunctuationChar || /[\[\]{}\(\),;\:\.]/, numberStart = parserConfig.numberStart || /[\d\.]/, number = parserConfig.number || /^(?:0x[a-f\d]+|0b[01]+|(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?)(u|ll?|l|f)?/i, isOperatorChar = parserConfig.isOperatorChar || /[+\-*&%=<>!?|\/]/, isIdentifierChar = parserConfig.isIdentifierChar || /[\w\$_\xa1-\uffff]/, isReservedIdentifier = parserConfig.isReservedIdentifier || false;
        var curPunc, isDefKeyword;
        function tokenBase(stream, state) {
          var ch = stream.next();
          if (hooks[ch]) {
            var result = hooks[ch](stream, state);
            if (result !== false)
              return result;
          }
          if (ch == '"' || ch == "'") {
            state.tokenize = tokenString(ch);
            return state.tokenize(stream, state);
          }
          if (numberStart.test(ch)) {
            stream.backUp(1);
            if (stream.match(number))
              return "number";
            stream.next();
          }
          if (isPunctuationChar.test(ch)) {
            curPunc = ch;
            return null;
          }
          if (ch == "/") {
            if (stream.eat("*")) {
              state.tokenize = tokenComment;
              return tokenComment(stream, state);
            }
            if (stream.eat("/")) {
              stream.skipToEnd();
              return "comment";
            }
          }
          if (isOperatorChar.test(ch)) {
            while (!stream.match(/^\/[\/*]/, false) && stream.eat(isOperatorChar)) {
            }
            return "operator";
          }
          stream.eatWhile(isIdentifierChar);
          if (namespaceSeparator)
            while (stream.match(namespaceSeparator))
              stream.eatWhile(isIdentifierChar);
          var cur = stream.current();
          if (contains(keywords, cur)) {
            if (contains(blockKeywords, cur))
              curPunc = "newstatement";
            if (contains(defKeywords, cur))
              isDefKeyword = true;
            return "keyword";
          }
          if (contains(types, cur))
            return "type";
          if (contains(builtin, cur) || isReservedIdentifier && isReservedIdentifier(cur)) {
            if (contains(blockKeywords, cur))
              curPunc = "newstatement";
            return "builtin";
          }
          if (contains(atoms, cur))
            return "atom";
          return "variable";
        }
        function tokenString(quote) {
          return function(stream, state) {
            var escaped = false, next, end = false;
            while ((next = stream.next()) != null) {
              if (next == quote && !escaped) {
                end = true;
                break;
              }
              escaped = !escaped && next == "\\";
            }
            if (end || !(escaped || multiLineStrings))
              state.tokenize = null;
            return "string";
          };
        }
        function tokenComment(stream, state) {
          var maybeEnd = false, ch;
          while (ch = stream.next()) {
            if (ch == "/" && maybeEnd) {
              state.tokenize = null;
              break;
            }
            maybeEnd = ch == "*";
          }
          return "comment";
        }
        function maybeEOL(stream, state) {
          if (parserConfig.typeFirstDefinitions && stream.eol() && isTopScope(state.context))
            state.typeAtEndOfLine = typeBefore(stream, state, stream.pos);
        }
        return {
          startState: function(basecolumn) {
            return {
              tokenize: null,
              context: new Context((basecolumn || 0) - indentUnit, 0, "top", null, false),
              indented: 0,
              startOfLine: true,
              prevToken: null
            };
          },
          token: function(stream, state) {
            var ctx = state.context;
            if (stream.sol()) {
              if (ctx.align == null)
                ctx.align = false;
              state.indented = stream.indentation();
              state.startOfLine = true;
            }
            if (stream.eatSpace()) {
              maybeEOL(stream, state);
              return null;
            }
            curPunc = isDefKeyword = null;
            var style = (state.tokenize || tokenBase)(stream, state);
            if (style == "comment" || style == "meta")
              return style;
            if (ctx.align == null)
              ctx.align = true;
            if (curPunc == ";" || curPunc == ":" || curPunc == "," && stream.match(/^\s*(?:\/\/.*)?$/, false))
              while (state.context.type == "statement")
                popContext(state);
            else if (curPunc == "{")
              pushContext(state, stream.column(), "}");
            else if (curPunc == "[")
              pushContext(state, stream.column(), "]");
            else if (curPunc == "(")
              pushContext(state, stream.column(), ")");
            else if (curPunc == "}") {
              while (ctx.type == "statement")
                ctx = popContext(state);
              if (ctx.type == "}")
                ctx = popContext(state);
              while (ctx.type == "statement")
                ctx = popContext(state);
            } else if (curPunc == ctx.type)
              popContext(state);
            else if (indentStatements && ((ctx.type == "}" || ctx.type == "top") && curPunc != ";" || ctx.type == "statement" && curPunc == "newstatement")) {
              pushContext(state, stream.column(), "statement", stream.current());
            }
            if (style == "variable" && (state.prevToken == "def" || parserConfig.typeFirstDefinitions && typeBefore(stream, state, stream.start) && isTopScope(state.context) && stream.match(/^\s*\(/, false)))
              style = "def";
            if (hooks.token) {
              var result = hooks.token(stream, state, style);
              if (result !== void 0)
                style = result;
            }
            if (style == "def" && parserConfig.styleDefs === false)
              style = "variable";
            state.startOfLine = false;
            state.prevToken = isDefKeyword ? "def" : style || curPunc;
            maybeEOL(stream, state);
            return style;
          },
          indent: function(state, textAfter) {
            if (state.tokenize != tokenBase && state.tokenize != null || state.typeAtEndOfLine)
              return CodeMirror3.Pass;
            var ctx = state.context, firstChar = textAfter && textAfter.charAt(0);
            var closing = firstChar == ctx.type;
            if (ctx.type == "statement" && firstChar == "}")
              ctx = ctx.prev;
            if (parserConfig.dontIndentStatements)
              while (ctx.type == "statement" && parserConfig.dontIndentStatements.test(ctx.info))
                ctx = ctx.prev;
            if (hooks.indent) {
              var hook = hooks.indent(state, ctx, textAfter, indentUnit);
              if (typeof hook == "number")
                return hook;
            }
            var switchBlock = ctx.prev && ctx.prev.info == "switch";
            if (parserConfig.allmanIndentation && /[{(]/.test(firstChar)) {
              while (ctx.type != "top" && ctx.type != "}")
                ctx = ctx.prev;
              return ctx.indented;
            }
            if (ctx.type == "statement")
              return ctx.indented + (firstChar == "{" ? 0 : statementIndentUnit);
            if (ctx.align && (!dontAlignCalls || ctx.type != ")"))
              return ctx.column + (closing ? 0 : 1);
            if (ctx.type == ")" && !closing)
              return ctx.indented + statementIndentUnit;
            return ctx.indented + (closing ? 0 : indentUnit) + (!closing && switchBlock && !/^(?:case|default)\b/.test(textAfter) ? indentUnit : 0);
          },
          electricInput: indentSwitch ? /^\s*(?:case .*?:|default:|\{\}?|\})$/ : /^\s*[{}]$/,
          blockCommentStart: "/*",
          blockCommentEnd: "*/",
          blockCommentContinue: " * ",
          lineComment: "//",
          fold: "brace"
        };
      });
      function words(str) {
        var obj = {}, words2 = str.split(" ");
        for (var i = 0; i < words2.length; ++i)
          obj[words2[i]] = true;
        return obj;
      }
      function contains(words2, word) {
        if (typeof words2 === "function") {
          return words2(word);
        } else {
          return words2.propertyIsEnumerable(word);
        }
      }
      var cKeywords = "auto if break case register continue return default do sizeof static else struct switch extern typedef union for goto while enum const volatile inline restrict asm fortran";
      var cppKeywords = "alignas alignof and and_eq audit axiom bitand bitor catch class compl concept constexpr const_cast decltype delete dynamic_cast explicit export final friend import module mutable namespace new noexcept not not_eq operator or or_eq override private protected public reinterpret_cast requires static_assert static_cast template this thread_local throw try typeid typename using virtual xor xor_eq";
      var objCKeywords = "bycopy byref in inout oneway out self super atomic nonatomic retain copy readwrite readonly strong weak assign typeof nullable nonnull null_resettable _cmd @interface @implementation @end @protocol @encode @property @synthesize @dynamic @class @public @package @private @protected @required @optional @try @catch @finally @import @selector @encode @defs @synchronized @autoreleasepool @compatibility_alias @available";
      var objCBuiltins = "FOUNDATION_EXPORT FOUNDATION_EXTERN NS_INLINE NS_FORMAT_FUNCTION  NS_RETURNS_RETAINEDNS_ERROR_ENUM NS_RETURNS_NOT_RETAINED NS_RETURNS_INNER_POINTER NS_DESIGNATED_INITIALIZER NS_ENUM NS_OPTIONS NS_REQUIRES_NIL_TERMINATION NS_ASSUME_NONNULL_BEGIN NS_ASSUME_NONNULL_END NS_SWIFT_NAME NS_REFINED_FOR_SWIFT";
      var basicCTypes = words("int long char short double float unsigned signed void bool");
      var basicObjCTypes = words("SEL instancetype id Class Protocol BOOL");
      function cTypes(identifier) {
        return contains(basicCTypes, identifier) || /.+_t$/.test(identifier);
      }
      function objCTypes(identifier) {
        return cTypes(identifier) || contains(basicObjCTypes, identifier);
      }
      var cBlockKeywords = "case do else for if switch while struct enum union";
      var cDefKeywords = "struct enum union";
      function cppHook(stream, state) {
        if (!state.startOfLine)
          return false;
        for (var ch, next = null; ch = stream.peek(); ) {
          if (ch == "\\" && stream.match(/^.$/)) {
            next = cppHook;
            break;
          } else if (ch == "/" && stream.match(/^\/[\/\*]/, false)) {
            break;
          }
          stream.next();
        }
        state.tokenize = next;
        return "meta";
      }
      function pointerHook(_stream, state) {
        if (state.prevToken == "type")
          return "type";
        return false;
      }
      function cIsReservedIdentifier(token) {
        if (!token || token.length < 2)
          return false;
        if (token[0] != "_")
          return false;
        return token[1] == "_" || token[1] !== token[1].toLowerCase();
      }
      function cpp14Literal(stream) {
        stream.eatWhile(/[\w\.']/);
        return "number";
      }
      function cpp11StringHook(stream, state) {
        stream.backUp(1);
        if (stream.match(/^(?:R|u8R|uR|UR|LR)/)) {
          var match = stream.match(/^"([^\s\\()]{0,16})\(/);
          if (!match) {
            return false;
          }
          state.cpp11RawStringDelim = match[1];
          state.tokenize = tokenRawString;
          return tokenRawString(stream, state);
        }
        if (stream.match(/^(?:u8|u|U|L)/)) {
          if (stream.match(
            /^["']/,
            /* eat */
            false
          )) {
            return "string";
          }
          return false;
        }
        stream.next();
        return false;
      }
      function cppLooksLikeConstructor(word) {
        var lastTwo = /(\w+)::~?(\w+)$/.exec(word);
        return lastTwo && lastTwo[1] == lastTwo[2];
      }
      function tokenAtString(stream, state) {
        var next;
        while ((next = stream.next()) != null) {
          if (next == '"' && !stream.eat('"')) {
            state.tokenize = null;
            break;
          }
        }
        return "string";
      }
      function tokenRawString(stream, state) {
        var delim = state.cpp11RawStringDelim.replace(/[^\w\s]/g, "\\$&");
        var match = stream.match(new RegExp(".*?\\)" + delim + '"'));
        if (match)
          state.tokenize = null;
        else
          stream.skipToEnd();
        return "string";
      }
      function def(mimes, mode) {
        if (typeof mimes == "string")
          mimes = [mimes];
        var words2 = [];
        function add(obj) {
          if (obj) {
            for (var prop in obj)
              if (obj.hasOwnProperty(prop))
                words2.push(prop);
          }
        }
        add(mode.keywords);
        add(mode.types);
        add(mode.builtin);
        add(mode.atoms);
        if (words2.length) {
          mode.helperType = mimes[0];
          CodeMirror3.registerHelper("hintWords", mimes[0], words2);
        }
        for (var i = 0; i < mimes.length; ++i)
          CodeMirror3.defineMIME(mimes[i], mode);
      }
      def(["text/x-csrc", "text/x-c", "text/x-chdr"], {
        name: "clike",
        keywords: words(cKeywords),
        types: cTypes,
        blockKeywords: words(cBlockKeywords),
        defKeywords: words(cDefKeywords),
        typeFirstDefinitions: true,
        atoms: words("NULL true false"),
        isReservedIdentifier: cIsReservedIdentifier,
        hooks: {
          "#": cppHook,
          "*": pointerHook
        },
        modeProps: { fold: ["brace", "include"] }
      });
      def(["text/x-c++src", "text/x-c++hdr"], {
        name: "clike",
        keywords: words(cKeywords + " " + cppKeywords),
        types: cTypes,
        blockKeywords: words(cBlockKeywords + " class try catch"),
        defKeywords: words(cDefKeywords + " class namespace"),
        typeFirstDefinitions: true,
        atoms: words("true false NULL nullptr"),
        dontIndentStatements: /^template$/,
        isIdentifierChar: /[\w\$_~\xa1-\uffff]/,
        isReservedIdentifier: cIsReservedIdentifier,
        hooks: {
          "#": cppHook,
          "*": pointerHook,
          "u": cpp11StringHook,
          "U": cpp11StringHook,
          "L": cpp11StringHook,
          "R": cpp11StringHook,
          "0": cpp14Literal,
          "1": cpp14Literal,
          "2": cpp14Literal,
          "3": cpp14Literal,
          "4": cpp14Literal,
          "5": cpp14Literal,
          "6": cpp14Literal,
          "7": cpp14Literal,
          "8": cpp14Literal,
          "9": cpp14Literal,
          token: function(stream, state, style) {
            if (style == "variable" && stream.peek() == "(" && (state.prevToken == ";" || state.prevToken == null || state.prevToken == "}") && cppLooksLikeConstructor(stream.current()))
              return "def";
          }
        },
        namespaceSeparator: "::",
        modeProps: { fold: ["brace", "include"] }
      });
      def("text/x-java", {
        name: "clike",
        keywords: words("abstract assert break case catch class const continue default do else enum extends final finally for goto if implements import instanceof interface native new package private protected public return static strictfp super switch synchronized this throw throws transient try volatile while @interface"),
        types: words("var byte short int long float double boolean char void Boolean Byte Character Double Float Integer Long Number Object Short String StringBuffer StringBuilder Void"),
        blockKeywords: words("catch class do else finally for if switch try while"),
        defKeywords: words("class interface enum @interface"),
        typeFirstDefinitions: true,
        atoms: words("true false null"),
        number: /^(?:0x[a-f\d_]+|0b[01_]+|(?:[\d_]+\.?\d*|\.\d+)(?:e[-+]?[\d_]+)?)(u|ll?|l|f)?/i,
        hooks: {
          "@": function(stream) {
            if (stream.match("interface", false))
              return false;
            stream.eatWhile(/[\w\$_]/);
            return "meta";
          },
          '"': function(stream, state) {
            if (!stream.match(/""$/))
              return false;
            state.tokenize = tokenTripleString;
            return state.tokenize(stream, state);
          }
        },
        modeProps: { fold: ["brace", "import"] }
      });
      def("text/x-csharp", {
        name: "clike",
        keywords: words("abstract as async await base break case catch checked class const continue default delegate do else enum event explicit extern finally fixed for foreach goto if implicit in interface internal is lock namespace new operator out override params private protected public readonly ref return sealed sizeof stackalloc static struct switch this throw try typeof unchecked unsafe using virtual void volatile while add alias ascending descending dynamic from get global group into join let orderby partial remove select set value var yield"),
        types: words("Action Boolean Byte Char DateTime DateTimeOffset Decimal Double Func Guid Int16 Int32 Int64 Object SByte Single String Task TimeSpan UInt16 UInt32 UInt64 bool byte char decimal double short int long object sbyte float string ushort uint ulong"),
        blockKeywords: words("catch class do else finally for foreach if struct switch try while"),
        defKeywords: words("class interface namespace struct var"),
        typeFirstDefinitions: true,
        atoms: words("true false null"),
        hooks: {
          "@": function(stream, state) {
            if (stream.eat('"')) {
              state.tokenize = tokenAtString;
              return tokenAtString(stream, state);
            }
            stream.eatWhile(/[\w\$_]/);
            return "meta";
          }
        }
      });
      function tokenTripleString(stream, state) {
        var escaped = false;
        while (!stream.eol()) {
          if (!escaped && stream.match('"""')) {
            state.tokenize = null;
            break;
          }
          escaped = stream.next() == "\\" && !escaped;
        }
        return "string";
      }
      function tokenNestedComment(depth) {
        return function(stream, state) {
          var ch;
          while (ch = stream.next()) {
            if (ch == "*" && stream.eat("/")) {
              if (depth == 1) {
                state.tokenize = null;
                break;
              } else {
                state.tokenize = tokenNestedComment(depth - 1);
                return state.tokenize(stream, state);
              }
            } else if (ch == "/" && stream.eat("*")) {
              state.tokenize = tokenNestedComment(depth + 1);
              return state.tokenize(stream, state);
            }
          }
          return "comment";
        };
      }
      def("text/x-scala", {
        name: "clike",
        keywords: words(
          /* scala */
          "abstract case catch class def do else extends final finally for forSome if implicit import lazy match new null object override package private protected return sealed super this throw trait try type val var while with yield _ assert assume require print println printf readLine readBoolean readByte readShort readChar readInt readLong readFloat readDouble"
        ),
        types: words(
          "AnyVal App Application Array BufferedIterator BigDecimal BigInt Char Console Either Enumeration Equiv Error Exception Fractional Function IndexedSeq Int Integral Iterable Iterator List Map Numeric Nil NotNull Option Ordered Ordering PartialFunction PartialOrdering Product Proxy Range Responder Seq Serializable Set Specializable Stream StringBuilder StringContext Symbol Throwable Traversable TraversableOnce Tuple Unit Vector Boolean Byte Character CharSequence Class ClassLoader Cloneable Comparable Compiler Double Exception Float Integer Long Math Number Object Package Pair Process Runtime Runnable SecurityManager Short StackTraceElement StrictMath String StringBuffer System Thread ThreadGroup ThreadLocal Throwable Triple Void"
        ),
        multiLineStrings: true,
        blockKeywords: words("catch class enum do else finally for forSome if match switch try while"),
        defKeywords: words("class enum def object package trait type val var"),
        atoms: words("true false null"),
        indentStatements: false,
        indentSwitch: false,
        isOperatorChar: /[+\-*&%=<>!?|\/#:@]/,
        hooks: {
          "@": function(stream) {
            stream.eatWhile(/[\w\$_]/);
            return "meta";
          },
          '"': function(stream, state) {
            if (!stream.match('""'))
              return false;
            state.tokenize = tokenTripleString;
            return state.tokenize(stream, state);
          },
          "'": function(stream) {
            stream.eatWhile(/[\w\$_\xa1-\uffff]/);
            return "atom";
          },
          "=": function(stream, state) {
            var cx = state.context;
            if (cx.type == "}" && cx.align && stream.eat(">")) {
              state.context = new Context(cx.indented, cx.column, cx.type, cx.info, null, cx.prev);
              return "operator";
            } else {
              return false;
            }
          },
          "/": function(stream, state) {
            if (!stream.eat("*"))
              return false;
            state.tokenize = tokenNestedComment(1);
            return state.tokenize(stream, state);
          }
        },
        modeProps: { closeBrackets: { pairs: '()[]{}""', triples: '"' } }
      });
      function tokenKotlinString(tripleString) {
        return function(stream, state) {
          var escaped = false, next, end = false;
          while (!stream.eol()) {
            if (!tripleString && !escaped && stream.match('"')) {
              end = true;
              break;
            }
            if (tripleString && stream.match('"""')) {
              end = true;
              break;
            }
            next = stream.next();
            if (!escaped && next == "$" && stream.match("{"))
              stream.skipTo("}");
            escaped = !escaped && next == "\\" && !tripleString;
          }
          if (end || !tripleString)
            state.tokenize = null;
          return "string";
        };
      }
      def("text/x-kotlin", {
        name: "clike",
        keywords: words(
          /*keywords*/
          "package as typealias class interface this super val operator var fun for is in This throw return annotation break continue object if else while do try when !in !is as? file import where by get set abstract enum open inner override private public internal protected catch finally out final vararg reified dynamic companion constructor init sealed field property receiver param sparam lateinit data inline noinline tailrec external annotation crossinline const operator infix suspend actual expect setparam value"
        ),
        types: words(
          /* package java.lang */
          "Boolean Byte Character CharSequence Class ClassLoader Cloneable Comparable Compiler Double Exception Float Integer Long Math Number Object Package Pair Process Runtime Runnable SecurityManager Short StackTraceElement StrictMath String StringBuffer System Thread ThreadGroup ThreadLocal Throwable Triple Void Annotation Any BooleanArray ByteArray Char CharArray DeprecationLevel DoubleArray Enum FloatArray Function Int IntArray Lazy LazyThreadSafetyMode LongArray Nothing ShortArray Unit"
        ),
        intendSwitch: false,
        indentStatements: false,
        multiLineStrings: true,
        number: /^(?:0x[a-f\d_]+|0b[01_]+|(?:[\d_]+(\.\d+)?|\.\d+)(?:e[-+]?[\d_]+)?)(u|ll?|l|f)?/i,
        blockKeywords: words("catch class do else finally for if where try while enum"),
        defKeywords: words("class val var object interface fun"),
        atoms: words("true false null this"),
        hooks: {
          "@": function(stream) {
            stream.eatWhile(/[\w\$_]/);
            return "meta";
          },
          "*": function(_stream, state) {
            return state.prevToken == "." ? "variable" : "operator";
          },
          '"': function(stream, state) {
            state.tokenize = tokenKotlinString(stream.match('""'));
            return state.tokenize(stream, state);
          },
          "/": function(stream, state) {
            if (!stream.eat("*"))
              return false;
            state.tokenize = tokenNestedComment(1);
            return state.tokenize(stream, state);
          },
          indent: function(state, ctx, textAfter, indentUnit) {
            var firstChar = textAfter && textAfter.charAt(0);
            if ((state.prevToken == "}" || state.prevToken == ")") && textAfter == "")
              return state.indented;
            if (state.prevToken == "operator" && textAfter != "}" && state.context.type != "}" || state.prevToken == "variable" && firstChar == "." || (state.prevToken == "}" || state.prevToken == ")") && firstChar == ".")
              return indentUnit * 2 + ctx.indented;
            if (ctx.align && ctx.type == "}")
              return ctx.indented + (state.context.type == (textAfter || "").charAt(0) ? 0 : indentUnit);
          }
        },
        modeProps: { closeBrackets: { triples: '"' } }
      });
      def(["x-shader/x-vertex", "x-shader/x-fragment"], {
        name: "clike",
        keywords: words("sampler1D sampler2D sampler3D samplerCube sampler1DShadow sampler2DShadow const attribute uniform varying break continue discard return for while do if else struct in out inout"),
        types: words("float int bool void vec2 vec3 vec4 ivec2 ivec3 ivec4 bvec2 bvec3 bvec4 mat2 mat3 mat4"),
        blockKeywords: words("for while do if else struct"),
        builtin: words("radians degrees sin cos tan asin acos atan pow exp log exp2 sqrt inversesqrt abs sign floor ceil fract mod min max clamp mix step smoothstep length distance dot cross normalize ftransform faceforward reflect refract matrixCompMult lessThan lessThanEqual greaterThan greaterThanEqual equal notEqual any all not texture1D texture1DProj texture1DLod texture1DProjLod texture2D texture2DProj texture2DLod texture2DProjLod texture3D texture3DProj texture3DLod texture3DProjLod textureCube textureCubeLod shadow1D shadow2D shadow1DProj shadow2DProj shadow1DLod shadow2DLod shadow1DProjLod shadow2DProjLod dFdx dFdy fwidth noise1 noise2 noise3 noise4"),
        atoms: words("true false gl_FragColor gl_SecondaryColor gl_Normal gl_Vertex gl_MultiTexCoord0 gl_MultiTexCoord1 gl_MultiTexCoord2 gl_MultiTexCoord3 gl_MultiTexCoord4 gl_MultiTexCoord5 gl_MultiTexCoord6 gl_MultiTexCoord7 gl_FogCoord gl_PointCoord gl_Position gl_PointSize gl_ClipVertex gl_FrontColor gl_BackColor gl_FrontSecondaryColor gl_BackSecondaryColor gl_TexCoord gl_FogFragCoord gl_FragCoord gl_FrontFacing gl_FragData gl_FragDepth gl_ModelViewMatrix gl_ProjectionMatrix gl_ModelViewProjectionMatrix gl_TextureMatrix gl_NormalMatrix gl_ModelViewMatrixInverse gl_ProjectionMatrixInverse gl_ModelViewProjectionMatrixInverse gl_TextureMatrixTranspose gl_ModelViewMatrixInverseTranspose gl_ProjectionMatrixInverseTranspose gl_ModelViewProjectionMatrixInverseTranspose gl_TextureMatrixInverseTranspose gl_NormalScale gl_DepthRange gl_ClipPlane gl_Point gl_FrontMaterial gl_BackMaterial gl_LightSource gl_LightModel gl_FrontLightModelProduct gl_BackLightModelProduct gl_TextureColor gl_EyePlaneS gl_EyePlaneT gl_EyePlaneR gl_EyePlaneQ gl_FogParameters gl_MaxLights gl_MaxClipPlanes gl_MaxTextureUnits gl_MaxTextureCoords gl_MaxVertexAttribs gl_MaxVertexUniformComponents gl_MaxVaryingFloats gl_MaxVertexTextureImageUnits gl_MaxTextureImageUnits gl_MaxFragmentUniformComponents gl_MaxCombineTextureImageUnits gl_MaxDrawBuffers"),
        indentSwitch: false,
        hooks: { "#": cppHook },
        modeProps: { fold: ["brace", "include"] }
      });
      def("text/x-nesc", {
        name: "clike",
        keywords: words(cKeywords + " as atomic async call command component components configuration event generic implementation includes interface module new norace nx_struct nx_union post provides signal task uses abstract extends"),
        types: cTypes,
        blockKeywords: words(cBlockKeywords),
        atoms: words("null true false"),
        hooks: { "#": cppHook },
        modeProps: { fold: ["brace", "include"] }
      });
      def("text/x-objectivec", {
        name: "clike",
        keywords: words(cKeywords + " " + objCKeywords),
        types: objCTypes,
        builtin: words(objCBuiltins),
        blockKeywords: words(cBlockKeywords + " @synthesize @try @catch @finally @autoreleasepool @synchronized"),
        defKeywords: words(cDefKeywords + " @interface @implementation @protocol @class"),
        dontIndentStatements: /^@.*$/,
        typeFirstDefinitions: true,
        atoms: words("YES NO NULL Nil nil true false nullptr"),
        isReservedIdentifier: cIsReservedIdentifier,
        hooks: {
          "#": cppHook,
          "*": pointerHook
        },
        modeProps: { fold: ["brace", "include"] }
      });
      def("text/x-objectivec++", {
        name: "clike",
        keywords: words(cKeywords + " " + objCKeywords + " " + cppKeywords),
        types: objCTypes,
        builtin: words(objCBuiltins),
        blockKeywords: words(cBlockKeywords + " @synthesize @try @catch @finally @autoreleasepool @synchronized class try catch"),
        defKeywords: words(cDefKeywords + " @interface @implementation @protocol @class class namespace"),
        dontIndentStatements: /^@.*$|^template$/,
        typeFirstDefinitions: true,
        atoms: words("YES NO NULL Nil nil true false nullptr"),
        isReservedIdentifier: cIsReservedIdentifier,
        hooks: {
          "#": cppHook,
          "*": pointerHook,
          "u": cpp11StringHook,
          "U": cpp11StringHook,
          "L": cpp11StringHook,
          "R": cpp11StringHook,
          "0": cpp14Literal,
          "1": cpp14Literal,
          "2": cpp14Literal,
          "3": cpp14Literal,
          "4": cpp14Literal,
          "5": cpp14Literal,
          "6": cpp14Literal,
          "7": cpp14Literal,
          "8": cpp14Literal,
          "9": cpp14Literal,
          token: function(stream, state, style) {
            if (style == "variable" && stream.peek() == "(" && (state.prevToken == ";" || state.prevToken == null || state.prevToken == "}") && cppLooksLikeConstructor(stream.current()))
              return "def";
          }
        },
        namespaceSeparator: "::",
        modeProps: { fold: ["brace", "include"] }
      });
      def("text/x-squirrel", {
        name: "clike",
        keywords: words("base break clone continue const default delete enum extends function in class foreach local resume return this throw typeof yield constructor instanceof static"),
        types: cTypes,
        blockKeywords: words("case catch class else for foreach if switch try while"),
        defKeywords: words("function local class"),
        typeFirstDefinitions: true,
        atoms: words("true false null"),
        hooks: { "#": cppHook },
        modeProps: { fold: ["brace", "include"] }
      });
      var stringTokenizer = null;
      function tokenCeylonString(type) {
        return function(stream, state) {
          var escaped = false, next, end = false;
          while (!stream.eol()) {
            if (!escaped && stream.match('"') && (type == "single" || stream.match('""'))) {
              end = true;
              break;
            }
            if (!escaped && stream.match("``")) {
              stringTokenizer = tokenCeylonString(type);
              end = true;
              break;
            }
            next = stream.next();
            escaped = type == "single" && !escaped && next == "\\";
          }
          if (end)
            state.tokenize = null;
          return "string";
        };
      }
      def("text/x-ceylon", {
        name: "clike",
        keywords: words("abstracts alias assembly assert assign break case catch class continue dynamic else exists extends finally for function given if import in interface is let module new nonempty object of out outer package return satisfies super switch then this throw try value void while"),
        types: function(word) {
          var first = word.charAt(0);
          return first === first.toUpperCase() && first !== first.toLowerCase();
        },
        blockKeywords: words("case catch class dynamic else finally for function if interface module new object switch try while"),
        defKeywords: words("class dynamic function interface module object package value"),
        builtin: words("abstract actual aliased annotation by default deprecated doc final formal late license native optional sealed see serializable shared suppressWarnings tagged throws variable"),
        isPunctuationChar: /[\[\]{}\(\),;\:\.`]/,
        isOperatorChar: /[+\-*&%=<>!?|^~:\/]/,
        numberStart: /[\d#$]/,
        number: /^(?:#[\da-fA-F_]+|\$[01_]+|[\d_]+[kMGTPmunpf]?|[\d_]+\.[\d_]+(?:[eE][-+]?\d+|[kMGTPmunpf]|)|)/i,
        multiLineStrings: true,
        typeFirstDefinitions: true,
        atoms: words("true false null larger smaller equal empty finished"),
        indentSwitch: false,
        styleDefs: false,
        hooks: {
          "@": function(stream) {
            stream.eatWhile(/[\w\$_]/);
            return "meta";
          },
          '"': function(stream, state) {
            state.tokenize = tokenCeylonString(stream.match('""') ? "triple" : "single");
            return state.tokenize(stream, state);
          },
          "`": function(stream, state) {
            if (!stringTokenizer || !stream.match("`"))
              return false;
            state.tokenize = stringTokenizer;
            stringTokenizer = null;
            return state.tokenize(stream, state);
          },
          "'": function(stream) {
            stream.eatWhile(/[\w\$_\xa1-\uffff]/);
            return "atom";
          },
          token: function(_stream, state, style) {
            if ((style == "variable" || style == "type") && state.prevToken == ".") {
              return "variable-2";
            }
          }
        },
        modeProps: {
          fold: ["brace", "import"],
          closeBrackets: { triples: '"' }
        }
      });
    });
  }
});

// node_modules/codemirror/mode/dart/dart.js
var require_dart = __commonJS({
  "node_modules/codemirror/mode/dart/dart.js"(exports, module) {
    (function(mod) {
      if (typeof exports == "object" && typeof module == "object")
        mod(require_codemirror(), require_clike());
      else if (typeof define == "function" && define.amd)
        define(["../../lib/codemirror", "../clike/clike"], mod);
      else
        mod(CodeMirror);
    })(function(CodeMirror3) {
      "use strict";
      var keywords = "this super static final const abstract class extends external factory implements mixin get native set typedef with enum throw rethrow assert break case continue default in return new deferred async await covariant try catch finally do else for if switch while import library export part of show hide is as extension on yield late required".split(" ");
      var blockKeywords = "try catch finally do else for if switch while".split(" ");
      var atoms = "true false null".split(" ");
      var builtins = "void bool num int double dynamic var String Null Never".split(" ");
      function set(words) {
        var obj = {};
        for (var i = 0; i < words.length; ++i)
          obj[words[i]] = true;
        return obj;
      }
      function pushInterpolationStack(state) {
        (state.interpolationStack || (state.interpolationStack = [])).push(state.tokenize);
      }
      function popInterpolationStack(state) {
        return (state.interpolationStack || (state.interpolationStack = [])).pop();
      }
      function sizeInterpolationStack(state) {
        return state.interpolationStack ? state.interpolationStack.length : 0;
      }
      CodeMirror3.defineMIME("application/dart", {
        name: "clike",
        keywords: set(keywords),
        blockKeywords: set(blockKeywords),
        builtin: set(builtins),
        atoms: set(atoms),
        hooks: {
          "@": function(stream) {
            stream.eatWhile(/[\w\$_\.]/);
            return "meta";
          },
          // custom string handling to deal with triple-quoted strings and string interpolation
          "'": function(stream, state) {
            return tokenString("'", stream, state, false);
          },
          '"': function(stream, state) {
            return tokenString('"', stream, state, false);
          },
          "r": function(stream, state) {
            var peek = stream.peek();
            if (peek == "'" || peek == '"') {
              return tokenString(stream.next(), stream, state, true);
            }
            return false;
          },
          "}": function(_stream, state) {
            if (sizeInterpolationStack(state) > 0) {
              state.tokenize = popInterpolationStack(state);
              return null;
            }
            return false;
          },
          "/": function(stream, state) {
            if (!stream.eat("*"))
              return false;
            state.tokenize = tokenNestedComment(1);
            return state.tokenize(stream, state);
          },
          token: function(stream, _, style) {
            if (style == "variable") {
              var isUpper = RegExp("^[_$]*[A-Z][a-zA-Z0-9_$]*$", "g");
              if (isUpper.test(stream.current())) {
                return "variable-2";
              }
            }
          }
        }
      });
      function tokenString(quote, stream, state, raw) {
        var tripleQuoted = false;
        if (stream.eat(quote)) {
          if (stream.eat(quote))
            tripleQuoted = true;
          else
            return "string";
        }
        function tokenStringHelper(stream2, state2) {
          var escaped = false;
          while (!stream2.eol()) {
            if (!raw && !escaped && stream2.peek() == "$") {
              pushInterpolationStack(state2);
              state2.tokenize = tokenInterpolation;
              return "string";
            }
            var next = stream2.next();
            if (next == quote && !escaped && (!tripleQuoted || stream2.match(quote + quote))) {
              state2.tokenize = null;
              break;
            }
            escaped = !raw && !escaped && next == "\\";
          }
          return "string";
        }
        state.tokenize = tokenStringHelper;
        return tokenStringHelper(stream, state);
      }
      function tokenInterpolation(stream, state) {
        stream.eat("$");
        if (stream.eat("{")) {
          state.tokenize = null;
        } else {
          state.tokenize = tokenInterpolationIdentifier;
        }
        return null;
      }
      function tokenInterpolationIdentifier(stream, state) {
        stream.eatWhile(/[\w_]/);
        state.tokenize = popInterpolationStack(state);
        return "variable";
      }
      function tokenNestedComment(depth) {
        return function(stream, state) {
          var ch;
          while (ch = stream.next()) {
            if (ch == "*" && stream.eat("/")) {
              if (depth == 1) {
                state.tokenize = null;
                break;
              } else {
                state.tokenize = tokenNestedComment(depth - 1);
                return state.tokenize(stream, state);
              }
            } else if (ch == "/" && stream.eat("*")) {
              state.tokenize = tokenNestedComment(depth + 1);
              return state.tokenize(stream, state);
            }
          }
          return "comment";
        };
      }
      CodeMirror3.registerHelper("hintWords", "application/dart", keywords.concat(atoms).concat(builtins));
      CodeMirror3.defineMode("dart", function(conf) {
        return CodeMirror3.getMode(conf, "application/dart");
      }, "clike");
    });
  }
});

// node_modules/codemirror/mode/diff/diff.js
var require_diff = __commonJS({
  "node_modules/codemirror/mode/diff/diff.js"(exports, module) {
    (function(mod) {
      if (typeof exports == "object" && typeof module == "object")
        mod(require_codemirror());
      else if (typeof define == "function" && define.amd)
        define(["../../lib/codemirror"], mod);
      else
        mod(CodeMirror);
    })(function(CodeMirror3) {
      "use strict";
      CodeMirror3.defineMode("diff", function() {
        var TOKEN_NAMES = {
          "+": "positive",
          "-": "negative",
          "@": "meta"
        };
        return {
          token: function(stream) {
            var tw_pos = stream.string.search(/[\t ]+?$/);
            if (!stream.sol() || tw_pos === 0) {
              stream.skipToEnd();
              return ("error " + (TOKEN_NAMES[stream.string.charAt(0)] || "")).replace(/ $/, "");
            }
            var token_name = TOKEN_NAMES[stream.peek()] || stream.skipToEnd();
            if (tw_pos === -1) {
              stream.skipToEnd();
            } else {
              stream.pos = tw_pos;
            }
            return token_name;
          }
        };
      });
      CodeMirror3.defineMIME("text/x-diff", "diff");
    });
  }
});

// node_modules/codemirror/mode/fortran/fortran.js
var require_fortran = __commonJS({
  "node_modules/codemirror/mode/fortran/fortran.js"(exports, module) {
    (function(mod) {
      if (typeof exports == "object" && typeof module == "object")
        mod(require_codemirror());
      else if (typeof define == "function" && define.amd)
        define(["../../lib/codemirror"], mod);
      else
        mod(CodeMirror);
    })(function(CodeMirror3) {
      "use strict";
      CodeMirror3.defineMode("fortran", function() {
        function words(array) {
          var keys = {};
          for (var i = 0; i < array.length; ++i) {
            keys[array[i]] = true;
          }
          return keys;
        }
        var keywords = words([
          "abstract",
          "accept",
          "allocatable",
          "allocate",
          "array",
          "assign",
          "asynchronous",
          "backspace",
          "bind",
          "block",
          "byte",
          "call",
          "case",
          "class",
          "close",
          "common",
          "contains",
          "continue",
          "cycle",
          "data",
          "deallocate",
          "decode",
          "deferred",
          "dimension",
          "do",
          "elemental",
          "else",
          "encode",
          "end",
          "endif",
          "entry",
          "enumerator",
          "equivalence",
          "exit",
          "external",
          "extrinsic",
          "final",
          "forall",
          "format",
          "function",
          "generic",
          "go",
          "goto",
          "if",
          "implicit",
          "import",
          "include",
          "inquire",
          "intent",
          "interface",
          "intrinsic",
          "module",
          "namelist",
          "non_intrinsic",
          "non_overridable",
          "none",
          "nopass",
          "nullify",
          "open",
          "optional",
          "options",
          "parameter",
          "pass",
          "pause",
          "pointer",
          "print",
          "private",
          "program",
          "protected",
          "public",
          "pure",
          "read",
          "recursive",
          "result",
          "return",
          "rewind",
          "save",
          "select",
          "sequence",
          "stop",
          "subroutine",
          "target",
          "then",
          "to",
          "type",
          "use",
          "value",
          "volatile",
          "where",
          "while",
          "write"
        ]);
        var builtins = words([
          "abort",
          "abs",
          "access",
          "achar",
          "acos",
          "adjustl",
          "adjustr",
          "aimag",
          "aint",
          "alarm",
          "all",
          "allocated",
          "alog",
          "amax",
          "amin",
          "amod",
          "and",
          "anint",
          "any",
          "asin",
          "associated",
          "atan",
          "besj",
          "besjn",
          "besy",
          "besyn",
          "bit_size",
          "btest",
          "cabs",
          "ccos",
          "ceiling",
          "cexp",
          "char",
          "chdir",
          "chmod",
          "clog",
          "cmplx",
          "command_argument_count",
          "complex",
          "conjg",
          "cos",
          "cosh",
          "count",
          "cpu_time",
          "cshift",
          "csin",
          "csqrt",
          "ctime",
          "c_funloc",
          "c_loc",
          "c_associated",
          "c_null_ptr",
          "c_null_funptr",
          "c_f_pointer",
          "c_null_char",
          "c_alert",
          "c_backspace",
          "c_form_feed",
          "c_new_line",
          "c_carriage_return",
          "c_horizontal_tab",
          "c_vertical_tab",
          "dabs",
          "dacos",
          "dasin",
          "datan",
          "date_and_time",
          "dbesj",
          "dbesj",
          "dbesjn",
          "dbesy",
          "dbesy",
          "dbesyn",
          "dble",
          "dcos",
          "dcosh",
          "ddim",
          "derf",
          "derfc",
          "dexp",
          "digits",
          "dim",
          "dint",
          "dlog",
          "dlog",
          "dmax",
          "dmin",
          "dmod",
          "dnint",
          "dot_product",
          "dprod",
          "dsign",
          "dsinh",
          "dsin",
          "dsqrt",
          "dtanh",
          "dtan",
          "dtime",
          "eoshift",
          "epsilon",
          "erf",
          "erfc",
          "etime",
          "exit",
          "exp",
          "exponent",
          "extends_type_of",
          "fdate",
          "fget",
          "fgetc",
          "float",
          "floor",
          "flush",
          "fnum",
          "fputc",
          "fput",
          "fraction",
          "fseek",
          "fstat",
          "ftell",
          "gerror",
          "getarg",
          "get_command",
          "get_command_argument",
          "get_environment_variable",
          "getcwd",
          "getenv",
          "getgid",
          "getlog",
          "getpid",
          "getuid",
          "gmtime",
          "hostnm",
          "huge",
          "iabs",
          "iachar",
          "iand",
          "iargc",
          "ibclr",
          "ibits",
          "ibset",
          "ichar",
          "idate",
          "idim",
          "idint",
          "idnint",
          "ieor",
          "ierrno",
          "ifix",
          "imag",
          "imagpart",
          "index",
          "int",
          "ior",
          "irand",
          "isatty",
          "ishft",
          "ishftc",
          "isign",
          "iso_c_binding",
          "is_iostat_end",
          "is_iostat_eor",
          "itime",
          "kill",
          "kind",
          "lbound",
          "len",
          "len_trim",
          "lge",
          "lgt",
          "link",
          "lle",
          "llt",
          "lnblnk",
          "loc",
          "log",
          "logical",
          "long",
          "lshift",
          "lstat",
          "ltime",
          "matmul",
          "max",
          "maxexponent",
          "maxloc",
          "maxval",
          "mclock",
          "merge",
          "move_alloc",
          "min",
          "minexponent",
          "minloc",
          "minval",
          "mod",
          "modulo",
          "mvbits",
          "nearest",
          "new_line",
          "nint",
          "not",
          "or",
          "pack",
          "perror",
          "precision",
          "present",
          "product",
          "radix",
          "rand",
          "random_number",
          "random_seed",
          "range",
          "real",
          "realpart",
          "rename",
          "repeat",
          "reshape",
          "rrspacing",
          "rshift",
          "same_type_as",
          "scale",
          "scan",
          "second",
          "selected_int_kind",
          "selected_real_kind",
          "set_exponent",
          "shape",
          "short",
          "sign",
          "signal",
          "sinh",
          "sin",
          "sleep",
          "sngl",
          "spacing",
          "spread",
          "sqrt",
          "srand",
          "stat",
          "sum",
          "symlnk",
          "system",
          "system_clock",
          "tan",
          "tanh",
          "time",
          "tiny",
          "transfer",
          "transpose",
          "trim",
          "ttynam",
          "ubound",
          "umask",
          "unlink",
          "unpack",
          "verify",
          "xor",
          "zabs",
          "zcos",
          "zexp",
          "zlog",
          "zsin",
          "zsqrt"
        ]);
        var dataTypes = words([
          "c_bool",
          "c_char",
          "c_double",
          "c_double_complex",
          "c_float",
          "c_float_complex",
          "c_funptr",
          "c_int",
          "c_int16_t",
          "c_int32_t",
          "c_int64_t",
          "c_int8_t",
          "c_int_fast16_t",
          "c_int_fast32_t",
          "c_int_fast64_t",
          "c_int_fast8_t",
          "c_int_least16_t",
          "c_int_least32_t",
          "c_int_least64_t",
          "c_int_least8_t",
          "c_intmax_t",
          "c_intptr_t",
          "c_long",
          "c_long_double",
          "c_long_double_complex",
          "c_long_long",
          "c_ptr",
          "c_short",
          "c_signed_char",
          "c_size_t",
          "character",
          "complex",
          "double",
          "integer",
          "logical",
          "real"
        ]);
        var isOperatorChar = /[+\-*&=<>\/\:]/;
        var litOperator = /^\.(and|or|eq|lt|le|gt|ge|ne|not|eqv|neqv)\./i;
        function tokenBase(stream, state) {
          if (stream.match(litOperator)) {
            return "operator";
          }
          var ch = stream.next();
          if (ch == "!") {
            stream.skipToEnd();
            return "comment";
          }
          if (ch == '"' || ch == "'") {
            state.tokenize = tokenString(ch);
            return state.tokenize(stream, state);
          }
          if (/[\[\]\(\),]/.test(ch)) {
            return null;
          }
          if (/\d/.test(ch)) {
            stream.eatWhile(/[\w\.]/);
            return "number";
          }
          if (isOperatorChar.test(ch)) {
            stream.eatWhile(isOperatorChar);
            return "operator";
          }
          stream.eatWhile(/[\w\$_]/);
          var word = stream.current().toLowerCase();
          if (keywords.hasOwnProperty(word)) {
            return "keyword";
          }
          if (builtins.hasOwnProperty(word) || dataTypes.hasOwnProperty(word)) {
            return "builtin";
          }
          return "variable";
        }
        function tokenString(quote) {
          return function(stream, state) {
            var escaped = false, next, end = false;
            while ((next = stream.next()) != null) {
              if (next == quote && !escaped) {
                end = true;
                break;
              }
              escaped = !escaped && next == "\\";
            }
            if (end || !escaped)
              state.tokenize = null;
            return "string";
          };
        }
        return {
          startState: function() {
            return { tokenize: null };
          },
          token: function(stream, state) {
            if (stream.eatSpace())
              return null;
            var style = (state.tokenize || tokenBase)(stream, state);
            if (style == "comment" || style == "meta")
              return style;
            return style;
          }
        };
      });
      CodeMirror3.defineMIME("text/x-fortran", "fortran");
    });
  }
});

// node_modules/codemirror/mode/go/go.js
var require_go = __commonJS({
  "node_modules/codemirror/mode/go/go.js"(exports, module) {
    (function(mod) {
      if (typeof exports == "object" && typeof module == "object")
        mod(require_codemirror());
      else if (typeof define == "function" && define.amd)
        define(["../../lib/codemirror"], mod);
      else
        mod(CodeMirror);
    })(function(CodeMirror3) {
      "use strict";
      CodeMirror3.defineMode("go", function(config) {
        var indentUnit = config.indentUnit;
        var keywords = {
          "break": true,
          "case": true,
          "chan": true,
          "const": true,
          "continue": true,
          "default": true,
          "defer": true,
          "else": true,
          "fallthrough": true,
          "for": true,
          "func": true,
          "go": true,
          "goto": true,
          "if": true,
          "import": true,
          "interface": true,
          "map": true,
          "package": true,
          "range": true,
          "return": true,
          "select": true,
          "struct": true,
          "switch": true,
          "type": true,
          "var": true,
          "bool": true,
          "byte": true,
          "complex64": true,
          "complex128": true,
          "float32": true,
          "float64": true,
          "int8": true,
          "int16": true,
          "int32": true,
          "int64": true,
          "string": true,
          "uint8": true,
          "uint16": true,
          "uint32": true,
          "uint64": true,
          "int": true,
          "uint": true,
          "uintptr": true,
          "error": true,
          "rune": true,
          "any": true,
          "comparable": true
        };
        var atoms = {
          "true": true,
          "false": true,
          "iota": true,
          "nil": true,
          "append": true,
          "cap": true,
          "close": true,
          "complex": true,
          "copy": true,
          "delete": true,
          "imag": true,
          "len": true,
          "make": true,
          "new": true,
          "panic": true,
          "print": true,
          "println": true,
          "real": true,
          "recover": true
        };
        var isOperatorChar = /[+\-*&^%:=<>!|\/]/;
        var curPunc;
        function tokenBase(stream, state) {
          var ch = stream.next();
          if (ch == '"' || ch == "'" || ch == "`") {
            state.tokenize = tokenString(ch);
            return state.tokenize(stream, state);
          }
          if (/[\d\.]/.test(ch)) {
            if (ch == ".") {
              stream.match(/^[0-9]+([eE][\-+]?[0-9]+)?/);
            } else if (ch == "0") {
              stream.match(/^[xX][0-9a-fA-F]+/) || stream.match(/^0[0-7]+/);
            } else {
              stream.match(/^[0-9]*\.?[0-9]*([eE][\-+]?[0-9]+)?/);
            }
            return "number";
          }
          if (/[\[\]{}\(\),;\:\.]/.test(ch)) {
            curPunc = ch;
            return null;
          }
          if (ch == "/") {
            if (stream.eat("*")) {
              state.tokenize = tokenComment;
              return tokenComment(stream, state);
            }
            if (stream.eat("/")) {
              stream.skipToEnd();
              return "comment";
            }
          }
          if (isOperatorChar.test(ch)) {
            stream.eatWhile(isOperatorChar);
            return "operator";
          }
          stream.eatWhile(/[\w\$_\xa1-\uffff]/);
          var cur = stream.current();
          if (keywords.propertyIsEnumerable(cur)) {
            if (cur == "case" || cur == "default")
              curPunc = "case";
            return "keyword";
          }
          if (atoms.propertyIsEnumerable(cur))
            return "atom";
          return "variable";
        }
        function tokenString(quote) {
          return function(stream, state) {
            var escaped = false, next, end = false;
            while ((next = stream.next()) != null) {
              if (next == quote && !escaped) {
                end = true;
                break;
              }
              escaped = !escaped && quote != "`" && next == "\\";
            }
            if (end || !(escaped || quote == "`"))
              state.tokenize = tokenBase;
            return "string";
          };
        }
        function tokenComment(stream, state) {
          var maybeEnd = false, ch;
          while (ch = stream.next()) {
            if (ch == "/" && maybeEnd) {
              state.tokenize = tokenBase;
              break;
            }
            maybeEnd = ch == "*";
          }
          return "comment";
        }
        function Context(indented, column, type, align, prev) {
          this.indented = indented;
          this.column = column;
          this.type = type;
          this.align = align;
          this.prev = prev;
        }
        function pushContext(state, col, type) {
          return state.context = new Context(state.indented, col, type, null, state.context);
        }
        function popContext(state) {
          if (!state.context.prev)
            return;
          var t = state.context.type;
          if (t == ")" || t == "]" || t == "}")
            state.indented = state.context.indented;
          return state.context = state.context.prev;
        }
        return {
          startState: function(basecolumn) {
            return {
              tokenize: null,
              context: new Context((basecolumn || 0) - indentUnit, 0, "top", false),
              indented: 0,
              startOfLine: true
            };
          },
          token: function(stream, state) {
            var ctx = state.context;
            if (stream.sol()) {
              if (ctx.align == null)
                ctx.align = false;
              state.indented = stream.indentation();
              state.startOfLine = true;
              if (ctx.type == "case")
                ctx.type = "}";
            }
            if (stream.eatSpace())
              return null;
            curPunc = null;
            var style = (state.tokenize || tokenBase)(stream, state);
            if (style == "comment")
              return style;
            if (ctx.align == null)
              ctx.align = true;
            if (curPunc == "{")
              pushContext(state, stream.column(), "}");
            else if (curPunc == "[")
              pushContext(state, stream.column(), "]");
            else if (curPunc == "(")
              pushContext(state, stream.column(), ")");
            else if (curPunc == "case")
              ctx.type = "case";
            else if (curPunc == "}" && ctx.type == "}")
              popContext(state);
            else if (curPunc == ctx.type)
              popContext(state);
            state.startOfLine = false;
            return style;
          },
          indent: function(state, textAfter) {
            if (state.tokenize != tokenBase && state.tokenize != null)
              return CodeMirror3.Pass;
            var ctx = state.context, firstChar = textAfter && textAfter.charAt(0);
            if (ctx.type == "case" && /^(?:case|default)\b/.test(textAfter)) {
              state.context.type = "}";
              return ctx.indented;
            }
            var closing = firstChar == ctx.type;
            if (ctx.align)
              return ctx.column + (closing ? 0 : 1);
            else
              return ctx.indented + (closing ? 0 : indentUnit);
          },
          electricChars: "{}):",
          closeBrackets: "()[]{}''\"\"``",
          fold: "brace",
          blockCommentStart: "/*",
          blockCommentEnd: "*/",
          lineComment: "//"
        };
      });
      CodeMirror3.defineMIME("text/x-go", "go");
    });
  }
});

// node_modules/codemirror/mode/haskell/haskell.js
var require_haskell = __commonJS({
  "node_modules/codemirror/mode/haskell/haskell.js"(exports, module) {
    (function(mod) {
      if (typeof exports == "object" && typeof module == "object")
        mod(require_codemirror());
      else if (typeof define == "function" && define.amd)
        define(["../../lib/codemirror"], mod);
      else
        mod(CodeMirror);
    })(function(CodeMirror3) {
      "use strict";
      CodeMirror3.defineMode("haskell", function(_config, modeConfig) {
        function switchState(source, setState, f) {
          setState(f);
          return f(source, setState);
        }
        var smallRE = /[a-z_]/;
        var largeRE = /[A-Z]/;
        var digitRE = /\d/;
        var hexitRE = /[0-9A-Fa-f]/;
        var octitRE = /[0-7]/;
        var idRE = /[a-z_A-Z0-9'\xa1-\uffff]/;
        var symbolRE = /[-!#$%&*+.\/<=>?@\\^|~:]/;
        var specialRE = /[(),;[\]`{}]/;
        var whiteCharRE = /[ \t\v\f]/;
        function normal(source, setState) {
          if (source.eatWhile(whiteCharRE)) {
            return null;
          }
          var ch = source.next();
          if (specialRE.test(ch)) {
            if (ch == "{" && source.eat("-")) {
              var t = "comment";
              if (source.eat("#")) {
                t = "meta";
              }
              return switchState(source, setState, ncomment(t, 1));
            }
            return null;
          }
          if (ch == "'") {
            if (source.eat("\\")) {
              source.next();
            } else {
              source.next();
            }
            if (source.eat("'")) {
              return "string";
            }
            return "string error";
          }
          if (ch == '"') {
            return switchState(source, setState, stringLiteral);
          }
          if (largeRE.test(ch)) {
            source.eatWhile(idRE);
            if (source.eat(".")) {
              return "qualifier";
            }
            return "variable-2";
          }
          if (smallRE.test(ch)) {
            source.eatWhile(idRE);
            return "variable";
          }
          if (digitRE.test(ch)) {
            if (ch == "0") {
              if (source.eat(/[xX]/)) {
                source.eatWhile(hexitRE);
                return "integer";
              }
              if (source.eat(/[oO]/)) {
                source.eatWhile(octitRE);
                return "number";
              }
            }
            source.eatWhile(digitRE);
            var t = "number";
            if (source.match(/^\.\d+/)) {
              t = "number";
            }
            if (source.eat(/[eE]/)) {
              t = "number";
              source.eat(/[-+]/);
              source.eatWhile(digitRE);
            }
            return t;
          }
          if (ch == "." && source.eat("."))
            return "keyword";
          if (symbolRE.test(ch)) {
            if (ch == "-" && source.eat(/-/)) {
              source.eatWhile(/-/);
              if (!source.eat(symbolRE)) {
                source.skipToEnd();
                return "comment";
              }
            }
            var t = "variable";
            if (ch == ":") {
              t = "variable-2";
            }
            source.eatWhile(symbolRE);
            return t;
          }
          return "error";
        }
        function ncomment(type, nest) {
          if (nest == 0) {
            return normal;
          }
          return function(source, setState) {
            var currNest = nest;
            while (!source.eol()) {
              var ch = source.next();
              if (ch == "{" && source.eat("-")) {
                ++currNest;
              } else if (ch == "-" && source.eat("}")) {
                --currNest;
                if (currNest == 0) {
                  setState(normal);
                  return type;
                }
              }
            }
            setState(ncomment(type, currNest));
            return type;
          };
        }
        function stringLiteral(source, setState) {
          while (!source.eol()) {
            var ch = source.next();
            if (ch == '"') {
              setState(normal);
              return "string";
            }
            if (ch == "\\") {
              if (source.eol() || source.eat(whiteCharRE)) {
                setState(stringGap);
                return "string";
              }
              if (source.eat("&")) {
              } else {
                source.next();
              }
            }
          }
          setState(normal);
          return "string error";
        }
        function stringGap(source, setState) {
          if (source.eat("\\")) {
            return switchState(source, setState, stringLiteral);
          }
          source.next();
          setState(normal);
          return "error";
        }
        var wellKnownWords = function() {
          var wkw = {};
          function setType(t) {
            return function() {
              for (var i = 0; i < arguments.length; i++)
                wkw[arguments[i]] = t;
            };
          }
          setType("keyword")(
            "case",
            "class",
            "data",
            "default",
            "deriving",
            "do",
            "else",
            "foreign",
            "if",
            "import",
            "in",
            "infix",
            "infixl",
            "infixr",
            "instance",
            "let",
            "module",
            "newtype",
            "of",
            "then",
            "type",
            "where",
            "_"
          );
          setType("keyword")(
            "..",
            ":",
            "::",
            "=",
            "\\",
            "<-",
            "->",
            "@",
            "~",
            "=>"
          );
          setType("builtin")(
            "!!",
            "$!",
            "$",
            "&&",
            "+",
            "++",
            "-",
            ".",
            "/",
            "/=",
            "<",
            "<*",
            "<=",
            "<$>",
            "<*>",
            "=<<",
            "==",
            ">",
            ">=",
            ">>",
            ">>=",
            "^",
            "^^",
            "||",
            "*",
            "*>",
            "**"
          );
          setType("builtin")(
            "Applicative",
            "Bool",
            "Bounded",
            "Char",
            "Double",
            "EQ",
            "Either",
            "Enum",
            "Eq",
            "False",
            "FilePath",
            "Float",
            "Floating",
            "Fractional",
            "Functor",
            "GT",
            "IO",
            "IOError",
            "Int",
            "Integer",
            "Integral",
            "Just",
            "LT",
            "Left",
            "Maybe",
            "Monad",
            "Nothing",
            "Num",
            "Ord",
            "Ordering",
            "Rational",
            "Read",
            "ReadS",
            "Real",
            "RealFloat",
            "RealFrac",
            "Right",
            "Show",
            "ShowS",
            "String",
            "True"
          );
          setType("builtin")(
            "abs",
            "acos",
            "acosh",
            "all",
            "and",
            "any",
            "appendFile",
            "asTypeOf",
            "asin",
            "asinh",
            "atan",
            "atan2",
            "atanh",
            "break",
            "catch",
            "ceiling",
            "compare",
            "concat",
            "concatMap",
            "const",
            "cos",
            "cosh",
            "curry",
            "cycle",
            "decodeFloat",
            "div",
            "divMod",
            "drop",
            "dropWhile",
            "either",
            "elem",
            "encodeFloat",
            "enumFrom",
            "enumFromThen",
            "enumFromThenTo",
            "enumFromTo",
            "error",
            "even",
            "exp",
            "exponent",
            "fail",
            "filter",
            "flip",
            "floatDigits",
            "floatRadix",
            "floatRange",
            "floor",
            "fmap",
            "foldl",
            "foldl1",
            "foldr",
            "foldr1",
            "fromEnum",
            "fromInteger",
            "fromIntegral",
            "fromRational",
            "fst",
            "gcd",
            "getChar",
            "getContents",
            "getLine",
            "head",
            "id",
            "init",
            "interact",
            "ioError",
            "isDenormalized",
            "isIEEE",
            "isInfinite",
            "isNaN",
            "isNegativeZero",
            "iterate",
            "last",
            "lcm",
            "length",
            "lex",
            "lines",
            "log",
            "logBase",
            "lookup",
            "map",
            "mapM",
            "mapM_",
            "max",
            "maxBound",
            "maximum",
            "maybe",
            "min",
            "minBound",
            "minimum",
            "mod",
            "negate",
            "not",
            "notElem",
            "null",
            "odd",
            "or",
            "otherwise",
            "pi",
            "pred",
            "print",
            "product",
            "properFraction",
            "pure",
            "putChar",
            "putStr",
            "putStrLn",
            "quot",
            "quotRem",
            "read",
            "readFile",
            "readIO",
            "readList",
            "readLn",
            "readParen",
            "reads",
            "readsPrec",
            "realToFrac",
            "recip",
            "rem",
            "repeat",
            "replicate",
            "return",
            "reverse",
            "round",
            "scaleFloat",
            "scanl",
            "scanl1",
            "scanr",
            "scanr1",
            "seq",
            "sequence",
            "sequence_",
            "show",
            "showChar",
            "showList",
            "showParen",
            "showString",
            "shows",
            "showsPrec",
            "significand",
            "signum",
            "sin",
            "sinh",
            "snd",
            "span",
            "splitAt",
            "sqrt",
            "subtract",
            "succ",
            "sum",
            "tail",
            "take",
            "takeWhile",
            "tan",
            "tanh",
            "toEnum",
            "toInteger",
            "toRational",
            "truncate",
            "uncurry",
            "undefined",
            "unlines",
            "until",
            "unwords",
            "unzip",
            "unzip3",
            "userError",
            "words",
            "writeFile",
            "zip",
            "zip3",
            "zipWith",
            "zipWith3"
          );
          var override = modeConfig.overrideKeywords;
          if (override) {
            for (var word in override)
              if (override.hasOwnProperty(word))
                wkw[word] = override[word];
          }
          return wkw;
        }();
        return {
          startState: function() {
            return { f: normal };
          },
          copyState: function(s) {
            return { f: s.f };
          },
          token: function(stream, state) {
            var t = state.f(stream, function(s) {
              state.f = s;
            });
            var w = stream.current();
            return wellKnownWords.hasOwnProperty(w) ? wellKnownWords[w] : t;
          },
          blockCommentStart: "{-",
          blockCommentEnd: "-}",
          lineComment: "--"
        };
      });
      CodeMirror3.defineMIME("text/x-haskell", "haskell");
    });
  }
});

// node_modules/codemirror/mode/xml/xml.js
var require_xml = __commonJS({
  "node_modules/codemirror/mode/xml/xml.js"(exports, module) {
    (function(mod) {
      if (typeof exports == "object" && typeof module == "object")
        mod(require_codemirror());
      else if (typeof define == "function" && define.amd)
        define(["../../lib/codemirror"], mod);
      else
        mod(CodeMirror);
    })(function(CodeMirror3) {
      "use strict";
      var htmlConfig = {
        autoSelfClosers: {
          "area": true,
          "base": true,
          "br": true,
          "col": true,
          "command": true,
          "embed": true,
          "frame": true,
          "hr": true,
          "img": true,
          "input": true,
          "keygen": true,
          "link": true,
          "meta": true,
          "param": true,
          "source": true,
          "track": true,
          "wbr": true,
          "menuitem": true
        },
        implicitlyClosed: {
          "dd": true,
          "li": true,
          "optgroup": true,
          "option": true,
          "p": true,
          "rp": true,
          "rt": true,
          "tbody": true,
          "td": true,
          "tfoot": true,
          "th": true,
          "tr": true
        },
        contextGrabbers: {
          "dd": { "dd": true, "dt": true },
          "dt": { "dd": true, "dt": true },
          "li": { "li": true },
          "option": { "option": true, "optgroup": true },
          "optgroup": { "optgroup": true },
          "p": {
            "address": true,
            "article": true,
            "aside": true,
            "blockquote": true,
            "dir": true,
            "div": true,
            "dl": true,
            "fieldset": true,
            "footer": true,
            "form": true,
            "h1": true,
            "h2": true,
            "h3": true,
            "h4": true,
            "h5": true,
            "h6": true,
            "header": true,
            "hgroup": true,
            "hr": true,
            "menu": true,
            "nav": true,
            "ol": true,
            "p": true,
            "pre": true,
            "section": true,
            "table": true,
            "ul": true
          },
          "rp": { "rp": true, "rt": true },
          "rt": { "rp": true, "rt": true },
          "tbody": { "tbody": true, "tfoot": true },
          "td": { "td": true, "th": true },
          "tfoot": { "tbody": true },
          "th": { "td": true, "th": true },
          "thead": { "tbody": true, "tfoot": true },
          "tr": { "tr": true }
        },
        doNotIndent: { "pre": true },
        allowUnquoted: true,
        allowMissing: true,
        caseFold: true
      };
      var xmlConfig = {
        autoSelfClosers: {},
        implicitlyClosed: {},
        contextGrabbers: {},
        doNotIndent: {},
        allowUnquoted: false,
        allowMissing: false,
        allowMissingTagName: false,
        caseFold: false
      };
      CodeMirror3.defineMode("xml", function(editorConf, config_) {
        var indentUnit = editorConf.indentUnit;
        var config = {};
        var defaults = config_.htmlMode ? htmlConfig : xmlConfig;
        for (var prop in defaults)
          config[prop] = defaults[prop];
        for (var prop in config_)
          config[prop] = config_[prop];
        var type, setStyle;
        function inText(stream, state) {
          function chain(parser) {
            state.tokenize = parser;
            return parser(stream, state);
          }
          var ch = stream.next();
          if (ch == "<") {
            if (stream.eat("!")) {
              if (stream.eat("[")) {
                if (stream.match("CDATA["))
                  return chain(inBlock("atom", "]]>"));
                else
                  return null;
              } else if (stream.match("--")) {
                return chain(inBlock("comment", "-->"));
              } else if (stream.match("DOCTYPE", true, true)) {
                stream.eatWhile(/[\w\._\-]/);
                return chain(doctype(1));
              } else {
                return null;
              }
            } else if (stream.eat("?")) {
              stream.eatWhile(/[\w\._\-]/);
              state.tokenize = inBlock("meta", "?>");
              return "meta";
            } else {
              type = stream.eat("/") ? "closeTag" : "openTag";
              state.tokenize = inTag;
              return "tag bracket";
            }
          } else if (ch == "&") {
            var ok;
            if (stream.eat("#")) {
              if (stream.eat("x")) {
                ok = stream.eatWhile(/[a-fA-F\d]/) && stream.eat(";");
              } else {
                ok = stream.eatWhile(/[\d]/) && stream.eat(";");
              }
            } else {
              ok = stream.eatWhile(/[\w\.\-:]/) && stream.eat(";");
            }
            return ok ? "atom" : "error";
          } else {
            stream.eatWhile(/[^&<]/);
            return null;
          }
        }
        inText.isInText = true;
        function inTag(stream, state) {
          var ch = stream.next();
          if (ch == ">" || ch == "/" && stream.eat(">")) {
            state.tokenize = inText;
            type = ch == ">" ? "endTag" : "selfcloseTag";
            return "tag bracket";
          } else if (ch == "=") {
            type = "equals";
            return null;
          } else if (ch == "<") {
            state.tokenize = inText;
            state.state = baseState;
            state.tagName = state.tagStart = null;
            var next = state.tokenize(stream, state);
            return next ? next + " tag error" : "tag error";
          } else if (/[\'\"]/.test(ch)) {
            state.tokenize = inAttribute(ch);
            state.stringStartCol = stream.column();
            return state.tokenize(stream, state);
          } else {
            stream.match(/^[^\s\u00a0=<>\"\']*[^\s\u00a0=<>\"\'\/]/);
            return "word";
          }
        }
        function inAttribute(quote) {
          var closure = function(stream, state) {
            while (!stream.eol()) {
              if (stream.next() == quote) {
                state.tokenize = inTag;
                break;
              }
            }
            return "string";
          };
          closure.isInAttribute = true;
          return closure;
        }
        function inBlock(style, terminator) {
          return function(stream, state) {
            while (!stream.eol()) {
              if (stream.match(terminator)) {
                state.tokenize = inText;
                break;
              }
              stream.next();
            }
            return style;
          };
        }
        function doctype(depth) {
          return function(stream, state) {
            var ch;
            while ((ch = stream.next()) != null) {
              if (ch == "<") {
                state.tokenize = doctype(depth + 1);
                return state.tokenize(stream, state);
              } else if (ch == ">") {
                if (depth == 1) {
                  state.tokenize = inText;
                  break;
                } else {
                  state.tokenize = doctype(depth - 1);
                  return state.tokenize(stream, state);
                }
              }
            }
            return "meta";
          };
        }
        function lower(tagName) {
          return tagName && tagName.toLowerCase();
        }
        function Context(state, tagName, startOfLine) {
          this.prev = state.context;
          this.tagName = tagName || "";
          this.indent = state.indented;
          this.startOfLine = startOfLine;
          if (config.doNotIndent.hasOwnProperty(tagName) || state.context && state.context.noIndent)
            this.noIndent = true;
        }
        function popContext(state) {
          if (state.context)
            state.context = state.context.prev;
        }
        function maybePopContext(state, nextTagName) {
          var parentTagName;
          while (true) {
            if (!state.context) {
              return;
            }
            parentTagName = state.context.tagName;
            if (!config.contextGrabbers.hasOwnProperty(lower(parentTagName)) || !config.contextGrabbers[lower(parentTagName)].hasOwnProperty(lower(nextTagName))) {
              return;
            }
            popContext(state);
          }
        }
        function baseState(type2, stream, state) {
          if (type2 == "openTag") {
            state.tagStart = stream.column();
            return tagNameState;
          } else if (type2 == "closeTag") {
            return closeTagNameState;
          } else {
            return baseState;
          }
        }
        function tagNameState(type2, stream, state) {
          if (type2 == "word") {
            state.tagName = stream.current();
            setStyle = "tag";
            return attrState;
          } else if (config.allowMissingTagName && type2 == "endTag") {
            setStyle = "tag bracket";
            return attrState(type2, stream, state);
          } else {
            setStyle = "error";
            return tagNameState;
          }
        }
        function closeTagNameState(type2, stream, state) {
          if (type2 == "word") {
            var tagName = stream.current();
            if (state.context && state.context.tagName != tagName && config.implicitlyClosed.hasOwnProperty(lower(state.context.tagName)))
              popContext(state);
            if (state.context && state.context.tagName == tagName || config.matchClosing === false) {
              setStyle = "tag";
              return closeState;
            } else {
              setStyle = "tag error";
              return closeStateErr;
            }
          } else if (config.allowMissingTagName && type2 == "endTag") {
            setStyle = "tag bracket";
            return closeState(type2, stream, state);
          } else {
            setStyle = "error";
            return closeStateErr;
          }
        }
        function closeState(type2, _stream, state) {
          if (type2 != "endTag") {
            setStyle = "error";
            return closeState;
          }
          popContext(state);
          return baseState;
        }
        function closeStateErr(type2, stream, state) {
          setStyle = "error";
          return closeState(type2, stream, state);
        }
        function attrState(type2, _stream, state) {
          if (type2 == "word") {
            setStyle = "attribute";
            return attrEqState;
          } else if (type2 == "endTag" || type2 == "selfcloseTag") {
            var tagName = state.tagName, tagStart = state.tagStart;
            state.tagName = state.tagStart = null;
            if (type2 == "selfcloseTag" || config.autoSelfClosers.hasOwnProperty(lower(tagName))) {
              maybePopContext(state, tagName);
            } else {
              maybePopContext(state, tagName);
              state.context = new Context(state, tagName, tagStart == state.indented);
            }
            return baseState;
          }
          setStyle = "error";
          return attrState;
        }
        function attrEqState(type2, stream, state) {
          if (type2 == "equals")
            return attrValueState;
          if (!config.allowMissing)
            setStyle = "error";
          return attrState(type2, stream, state);
        }
        function attrValueState(type2, stream, state) {
          if (type2 == "string")
            return attrContinuedState;
          if (type2 == "word" && config.allowUnquoted) {
            setStyle = "string";
            return attrState;
          }
          setStyle = "error";
          return attrState(type2, stream, state);
        }
        function attrContinuedState(type2, stream, state) {
          if (type2 == "string")
            return attrContinuedState;
          return attrState(type2, stream, state);
        }
        return {
          startState: function(baseIndent) {
            var state = {
              tokenize: inText,
              state: baseState,
              indented: baseIndent || 0,
              tagName: null,
              tagStart: null,
              context: null
            };
            if (baseIndent != null)
              state.baseIndent = baseIndent;
            return state;
          },
          token: function(stream, state) {
            if (!state.tagName && stream.sol())
              state.indented = stream.indentation();
            if (stream.eatSpace())
              return null;
            type = null;
            var style = state.tokenize(stream, state);
            if ((style || type) && style != "comment") {
              setStyle = null;
              state.state = state.state(type || style, stream, state);
              if (setStyle)
                style = setStyle == "error" ? style + " error" : setStyle;
            }
            return style;
          },
          indent: function(state, textAfter, fullLine) {
            var context = state.context;
            if (state.tokenize.isInAttribute) {
              if (state.tagStart == state.indented)
                return state.stringStartCol + 1;
              else
                return state.indented + indentUnit;
            }
            if (context && context.noIndent)
              return CodeMirror3.Pass;
            if (state.tokenize != inTag && state.tokenize != inText)
              return fullLine ? fullLine.match(/^(\s*)/)[0].length : 0;
            if (state.tagName) {
              if (config.multilineTagIndentPastTag !== false)
                return state.tagStart + state.tagName.length + 2;
              else
                return state.tagStart + indentUnit * (config.multilineTagIndentFactor || 1);
            }
            if (config.alignCDATA && /<!\[CDATA\[/.test(textAfter))
              return 0;
            var tagAfter = textAfter && /^<(\/)?([\w_:\.-]*)/.exec(textAfter);
            if (tagAfter && tagAfter[1]) {
              while (context) {
                if (context.tagName == tagAfter[2]) {
                  context = context.prev;
                  break;
                } else if (config.implicitlyClosed.hasOwnProperty(lower(context.tagName))) {
                  context = context.prev;
                } else {
                  break;
                }
              }
            } else if (tagAfter) {
              while (context) {
                var grabbers = config.contextGrabbers[lower(context.tagName)];
                if (grabbers && grabbers.hasOwnProperty(lower(tagAfter[2])))
                  context = context.prev;
                else
                  break;
              }
            }
            while (context && context.prev && !context.startOfLine)
              context = context.prev;
            if (context)
              return context.indent + indentUnit;
            else
              return state.baseIndent || 0;
          },
          electricInput: /<\/[\s\w:]+>$/,
          blockCommentStart: "<!--",
          blockCommentEnd: "-->",
          configuration: config.htmlMode ? "html" : "xml",
          helperType: config.htmlMode ? "html" : "xml",
          skipAttribute: function(state) {
            if (state.state == attrValueState)
              state.state = attrState;
          },
          xmlCurrentTag: function(state) {
            return state.tagName ? { name: state.tagName, close: state.type == "closeTag" } : null;
          },
          xmlCurrentContext: function(state) {
            var context = [];
            for (var cx = state.context; cx; cx = cx.prev)
              context.push(cx.tagName);
            return context.reverse();
          }
        };
      });
      CodeMirror3.defineMIME("text/xml", "xml");
      CodeMirror3.defineMIME("application/xml", "xml");
      if (!CodeMirror3.mimeModes.hasOwnProperty("text/html"))
        CodeMirror3.defineMIME("text/html", { name: "xml", htmlMode: true });
    });
  }
});

// node_modules/codemirror/mode/javascript/javascript.js
var require_javascript = __commonJS({
  "node_modules/codemirror/mode/javascript/javascript.js"(exports, module) {
    (function(mod) {
      if (typeof exports == "object" && typeof module == "object")
        mod(require_codemirror());
      else if (typeof define == "function" && define.amd)
        define(["../../lib/codemirror"], mod);
      else
        mod(CodeMirror);
    })(function(CodeMirror3) {
      "use strict";
      CodeMirror3.defineMode("javascript", function(config, parserConfig) {
        var indentUnit = config.indentUnit;
        var statementIndent = parserConfig.statementIndent;
        var jsonldMode = parserConfig.jsonld;
        var jsonMode = parserConfig.json || jsonldMode;
        var trackScope = parserConfig.trackScope !== false;
        var isTS = parserConfig.typescript;
        var wordRE = parserConfig.wordCharacters || /[\w$\xa1-\uffff]/;
        var keywords = function() {
          function kw(type2) {
            return { type: type2, style: "keyword" };
          }
          var A = kw("keyword a"), B = kw("keyword b"), C = kw("keyword c"), D = kw("keyword d");
          var operator = kw("operator"), atom = { type: "atom", style: "atom" };
          return {
            "if": kw("if"),
            "while": A,
            "with": A,
            "else": B,
            "do": B,
            "try": B,
            "finally": B,
            "return": D,
            "break": D,
            "continue": D,
            "new": kw("new"),
            "delete": C,
            "void": C,
            "throw": C,
            "debugger": kw("debugger"),
            "var": kw("var"),
            "const": kw("var"),
            "let": kw("var"),
            "function": kw("function"),
            "catch": kw("catch"),
            "for": kw("for"),
            "switch": kw("switch"),
            "case": kw("case"),
            "default": kw("default"),
            "in": operator,
            "typeof": operator,
            "instanceof": operator,
            "true": atom,
            "false": atom,
            "null": atom,
            "undefined": atom,
            "NaN": atom,
            "Infinity": atom,
            "this": kw("this"),
            "class": kw("class"),
            "super": kw("atom"),
            "yield": C,
            "export": kw("export"),
            "import": kw("import"),
            "extends": C,
            "await": C
          };
        }();
        var isOperatorChar = /[+\-*&%=<>!?|~^@]/;
        var isJsonldKeyword = /^@(context|id|value|language|type|container|list|set|reverse|index|base|vocab|graph)"/;
        function readRegexp(stream) {
          var escaped = false, next, inSet = false;
          while ((next = stream.next()) != null) {
            if (!escaped) {
              if (next == "/" && !inSet)
                return;
              if (next == "[")
                inSet = true;
              else if (inSet && next == "]")
                inSet = false;
            }
            escaped = !escaped && next == "\\";
          }
        }
        var type, content;
        function ret(tp, style, cont2) {
          type = tp;
          content = cont2;
          return style;
        }
        function tokenBase(stream, state) {
          var ch = stream.next();
          if (ch == '"' || ch == "'") {
            state.tokenize = tokenString(ch);
            return state.tokenize(stream, state);
          } else if (ch == "." && stream.match(/^\d[\d_]*(?:[eE][+\-]?[\d_]+)?/)) {
            return ret("number", "number");
          } else if (ch == "." && stream.match("..")) {
            return ret("spread", "meta");
          } else if (/[\[\]{}\(\),;\:\.]/.test(ch)) {
            return ret(ch);
          } else if (ch == "=" && stream.eat(">")) {
            return ret("=>", "operator");
          } else if (ch == "0" && stream.match(/^(?:x[\dA-Fa-f_]+|o[0-7_]+|b[01_]+)n?/)) {
            return ret("number", "number");
          } else if (/\d/.test(ch)) {
            stream.match(/^[\d_]*(?:n|(?:\.[\d_]*)?(?:[eE][+\-]?[\d_]+)?)?/);
            return ret("number", "number");
          } else if (ch == "/") {
            if (stream.eat("*")) {
              state.tokenize = tokenComment;
              return tokenComment(stream, state);
            } else if (stream.eat("/")) {
              stream.skipToEnd();
              return ret("comment", "comment");
            } else if (expressionAllowed(stream, state, 1)) {
              readRegexp(stream);
              stream.match(/^\b(([gimyus])(?![gimyus]*\2))+\b/);
              return ret("regexp", "string-2");
            } else {
              stream.eat("=");
              return ret("operator", "operator", stream.current());
            }
          } else if (ch == "`") {
            state.tokenize = tokenQuasi;
            return tokenQuasi(stream, state);
          } else if (ch == "#" && stream.peek() == "!") {
            stream.skipToEnd();
            return ret("meta", "meta");
          } else if (ch == "#" && stream.eatWhile(wordRE)) {
            return ret("variable", "property");
          } else if (ch == "<" && stream.match("!--") || ch == "-" && stream.match("->") && !/\S/.test(stream.string.slice(0, stream.start))) {
            stream.skipToEnd();
            return ret("comment", "comment");
          } else if (isOperatorChar.test(ch)) {
            if (ch != ">" || !state.lexical || state.lexical.type != ">") {
              if (stream.eat("=")) {
                if (ch == "!" || ch == "=")
                  stream.eat("=");
              } else if (/[<>*+\-|&?]/.test(ch)) {
                stream.eat(ch);
                if (ch == ">")
                  stream.eat(ch);
              }
            }
            if (ch == "?" && stream.eat("."))
              return ret(".");
            return ret("operator", "operator", stream.current());
          } else if (wordRE.test(ch)) {
            stream.eatWhile(wordRE);
            var word = stream.current();
            if (state.lastType != ".") {
              if (keywords.propertyIsEnumerable(word)) {
                var kw = keywords[word];
                return ret(kw.type, kw.style, word);
              }
              if (word == "async" && stream.match(/^(\s|\/\*([^*]|\*(?!\/))*?\*\/)*[\[\(\w]/, false))
                return ret("async", "keyword", word);
            }
            return ret("variable", "variable", word);
          }
        }
        function tokenString(quote) {
          return function(stream, state) {
            var escaped = false, next;
            if (jsonldMode && stream.peek() == "@" && stream.match(isJsonldKeyword)) {
              state.tokenize = tokenBase;
              return ret("jsonld-keyword", "meta");
            }
            while ((next = stream.next()) != null) {
              if (next == quote && !escaped)
                break;
              escaped = !escaped && next == "\\";
            }
            if (!escaped)
              state.tokenize = tokenBase;
            return ret("string", "string");
          };
        }
        function tokenComment(stream, state) {
          var maybeEnd = false, ch;
          while (ch = stream.next()) {
            if (ch == "/" && maybeEnd) {
              state.tokenize = tokenBase;
              break;
            }
            maybeEnd = ch == "*";
          }
          return ret("comment", "comment");
        }
        function tokenQuasi(stream, state) {
          var escaped = false, next;
          while ((next = stream.next()) != null) {
            if (!escaped && (next == "`" || next == "$" && stream.eat("{"))) {
              state.tokenize = tokenBase;
              break;
            }
            escaped = !escaped && next == "\\";
          }
          return ret("quasi", "string-2", stream.current());
        }
        var brackets = "([{}])";
        function findFatArrow(stream, state) {
          if (state.fatArrowAt)
            state.fatArrowAt = null;
          var arrow = stream.string.indexOf("=>", stream.start);
          if (arrow < 0)
            return;
          if (isTS) {
            var m = /:\s*(?:\w+(?:<[^>]*>|\[\])?|\{[^}]*\})\s*$/.exec(stream.string.slice(stream.start, arrow));
            if (m)
              arrow = m.index;
          }
          var depth = 0, sawSomething = false;
          for (var pos = arrow - 1; pos >= 0; --pos) {
            var ch = stream.string.charAt(pos);
            var bracket = brackets.indexOf(ch);
            if (bracket >= 0 && bracket < 3) {
              if (!depth) {
                ++pos;
                break;
              }
              if (--depth == 0) {
                if (ch == "(")
                  sawSomething = true;
                break;
              }
            } else if (bracket >= 3 && bracket < 6) {
              ++depth;
            } else if (wordRE.test(ch)) {
              sawSomething = true;
            } else if (/["'\/`]/.test(ch)) {
              for (; ; --pos) {
                if (pos == 0)
                  return;
                var next = stream.string.charAt(pos - 1);
                if (next == ch && stream.string.charAt(pos - 2) != "\\") {
                  pos--;
                  break;
                }
              }
            } else if (sawSomething && !depth) {
              ++pos;
              break;
            }
          }
          if (sawSomething && !depth)
            state.fatArrowAt = pos;
        }
        var atomicTypes = {
          "atom": true,
          "number": true,
          "variable": true,
          "string": true,
          "regexp": true,
          "this": true,
          "import": true,
          "jsonld-keyword": true
        };
        function JSLexical(indented, column, type2, align, prev, info) {
          this.indented = indented;
          this.column = column;
          this.type = type2;
          this.prev = prev;
          this.info = info;
          if (align != null)
            this.align = align;
        }
        function inScope(state, varname) {
          if (!trackScope)
            return false;
          for (var v = state.localVars; v; v = v.next)
            if (v.name == varname)
              return true;
          for (var cx2 = state.context; cx2; cx2 = cx2.prev) {
            for (var v = cx2.vars; v; v = v.next)
              if (v.name == varname)
                return true;
          }
        }
        function parseJS(state, style, type2, content2, stream) {
          var cc = state.cc;
          cx.state = state;
          cx.stream = stream;
          cx.marked = null, cx.cc = cc;
          cx.style = style;
          if (!state.lexical.hasOwnProperty("align"))
            state.lexical.align = true;
          while (true) {
            var combinator = cc.length ? cc.pop() : jsonMode ? expression : statement;
            if (combinator(type2, content2)) {
              while (cc.length && cc[cc.length - 1].lex)
                cc.pop()();
              if (cx.marked)
                return cx.marked;
              if (type2 == "variable" && inScope(state, content2))
                return "variable-2";
              return style;
            }
          }
        }
        var cx = { state: null, column: null, marked: null, cc: null };
        function pass() {
          for (var i = arguments.length - 1; i >= 0; i--)
            cx.cc.push(arguments[i]);
        }
        function cont() {
          pass.apply(null, arguments);
          return true;
        }
        function inList(name, list) {
          for (var v = list; v; v = v.next)
            if (v.name == name)
              return true;
          return false;
        }
        function register(varname) {
          var state = cx.state;
          cx.marked = "def";
          if (!trackScope)
            return;
          if (state.context) {
            if (state.lexical.info == "var" && state.context && state.context.block) {
              var newContext = registerVarScoped(varname, state.context);
              if (newContext != null) {
                state.context = newContext;
                return;
              }
            } else if (!inList(varname, state.localVars)) {
              state.localVars = new Var(varname, state.localVars);
              return;
            }
          }
          if (parserConfig.globalVars && !inList(varname, state.globalVars))
            state.globalVars = new Var(varname, state.globalVars);
        }
        function registerVarScoped(varname, context) {
          if (!context) {
            return null;
          } else if (context.block) {
            var inner = registerVarScoped(varname, context.prev);
            if (!inner)
              return null;
            if (inner == context.prev)
              return context;
            return new Context(inner, context.vars, true);
          } else if (inList(varname, context.vars)) {
            return context;
          } else {
            return new Context(context.prev, new Var(varname, context.vars), false);
          }
        }
        function isModifier(name) {
          return name == "public" || name == "private" || name == "protected" || name == "abstract" || name == "readonly";
        }
        function Context(prev, vars, block2) {
          this.prev = prev;
          this.vars = vars;
          this.block = block2;
        }
        function Var(name, next) {
          this.name = name;
          this.next = next;
        }
        var defaultVars = new Var("this", new Var("arguments", null));
        function pushcontext() {
          cx.state.context = new Context(cx.state.context, cx.state.localVars, false);
          cx.state.localVars = defaultVars;
        }
        function pushblockcontext() {
          cx.state.context = new Context(cx.state.context, cx.state.localVars, true);
          cx.state.localVars = null;
        }
        pushcontext.lex = pushblockcontext.lex = true;
        function popcontext() {
          cx.state.localVars = cx.state.context.vars;
          cx.state.context = cx.state.context.prev;
        }
        popcontext.lex = true;
        function pushlex(type2, info) {
          var result = function() {
            var state = cx.state, indent = state.indented;
            if (state.lexical.type == "stat")
              indent = state.lexical.indented;
            else
              for (var outer = state.lexical; outer && outer.type == ")" && outer.align; outer = outer.prev)
                indent = outer.indented;
            state.lexical = new JSLexical(indent, cx.stream.column(), type2, null, state.lexical, info);
          };
          result.lex = true;
          return result;
        }
        function poplex() {
          var state = cx.state;
          if (state.lexical.prev) {
            if (state.lexical.type == ")")
              state.indented = state.lexical.indented;
            state.lexical = state.lexical.prev;
          }
        }
        poplex.lex = true;
        function expect(wanted) {
          function exp(type2) {
            if (type2 == wanted)
              return cont();
            else if (wanted == ";" || type2 == "}" || type2 == ")" || type2 == "]")
              return pass();
            else
              return cont(exp);
          }
          ;
          return exp;
        }
        function statement(type2, value) {
          if (type2 == "var")
            return cont(pushlex("vardef", value), vardef, expect(";"), poplex);
          if (type2 == "keyword a")
            return cont(pushlex("form"), parenExpr, statement, poplex);
          if (type2 == "keyword b")
            return cont(pushlex("form"), statement, poplex);
          if (type2 == "keyword d")
            return cx.stream.match(/^\s*$/, false) ? cont() : cont(pushlex("stat"), maybeexpression, expect(";"), poplex);
          if (type2 == "debugger")
            return cont(expect(";"));
          if (type2 == "{")
            return cont(pushlex("}"), pushblockcontext, block, poplex, popcontext);
          if (type2 == ";")
            return cont();
          if (type2 == "if") {
            if (cx.state.lexical.info == "else" && cx.state.cc[cx.state.cc.length - 1] == poplex)
              cx.state.cc.pop()();
            return cont(pushlex("form"), parenExpr, statement, poplex, maybeelse);
          }
          if (type2 == "function")
            return cont(functiondef);
          if (type2 == "for")
            return cont(pushlex("form"), pushblockcontext, forspec, statement, popcontext, poplex);
          if (type2 == "class" || isTS && value == "interface") {
            cx.marked = "keyword";
            return cont(pushlex("form", type2 == "class" ? type2 : value), className, poplex);
          }
          if (type2 == "variable") {
            if (isTS && value == "declare") {
              cx.marked = "keyword";
              return cont(statement);
            } else if (isTS && (value == "module" || value == "enum" || value == "type") && cx.stream.match(/^\s*\w/, false)) {
              cx.marked = "keyword";
              if (value == "enum")
                return cont(enumdef);
              else if (value == "type")
                return cont(typename, expect("operator"), typeexpr, expect(";"));
              else
                return cont(pushlex("form"), pattern, expect("{"), pushlex("}"), block, poplex, poplex);
            } else if (isTS && value == "namespace") {
              cx.marked = "keyword";
              return cont(pushlex("form"), expression, statement, poplex);
            } else if (isTS && value == "abstract") {
              cx.marked = "keyword";
              return cont(statement);
            } else {
              return cont(pushlex("stat"), maybelabel);
            }
          }
          if (type2 == "switch")
            return cont(
              pushlex("form"),
              parenExpr,
              expect("{"),
              pushlex("}", "switch"),
              pushblockcontext,
              block,
              poplex,
              poplex,
              popcontext
            );
          if (type2 == "case")
            return cont(expression, expect(":"));
          if (type2 == "default")
            return cont(expect(":"));
          if (type2 == "catch")
            return cont(pushlex("form"), pushcontext, maybeCatchBinding, statement, poplex, popcontext);
          if (type2 == "export")
            return cont(pushlex("stat"), afterExport, poplex);
          if (type2 == "import")
            return cont(pushlex("stat"), afterImport, poplex);
          if (type2 == "async")
            return cont(statement);
          if (value == "@")
            return cont(expression, statement);
          return pass(pushlex("stat"), expression, expect(";"), poplex);
        }
        function maybeCatchBinding(type2) {
          if (type2 == "(")
            return cont(funarg, expect(")"));
        }
        function expression(type2, value) {
          return expressionInner(type2, value, false);
        }
        function expressionNoComma(type2, value) {
          return expressionInner(type2, value, true);
        }
        function parenExpr(type2) {
          if (type2 != "(")
            return pass();
          return cont(pushlex(")"), maybeexpression, expect(")"), poplex);
        }
        function expressionInner(type2, value, noComma) {
          if (cx.state.fatArrowAt == cx.stream.start) {
            var body = noComma ? arrowBodyNoComma : arrowBody;
            if (type2 == "(")
              return cont(pushcontext, pushlex(")"), commasep(funarg, ")"), poplex, expect("=>"), body, popcontext);
            else if (type2 == "variable")
              return pass(pushcontext, pattern, expect("=>"), body, popcontext);
          }
          var maybeop = noComma ? maybeoperatorNoComma : maybeoperatorComma;
          if (atomicTypes.hasOwnProperty(type2))
            return cont(maybeop);
          if (type2 == "function")
            return cont(functiondef, maybeop);
          if (type2 == "class" || isTS && value == "interface") {
            cx.marked = "keyword";
            return cont(pushlex("form"), classExpression, poplex);
          }
          if (type2 == "keyword c" || type2 == "async")
            return cont(noComma ? expressionNoComma : expression);
          if (type2 == "(")
            return cont(pushlex(")"), maybeexpression, expect(")"), poplex, maybeop);
          if (type2 == "operator" || type2 == "spread")
            return cont(noComma ? expressionNoComma : expression);
          if (type2 == "[")
            return cont(pushlex("]"), arrayLiteral, poplex, maybeop);
          if (type2 == "{")
            return contCommasep(objprop, "}", null, maybeop);
          if (type2 == "quasi")
            return pass(quasi, maybeop);
          if (type2 == "new")
            return cont(maybeTarget(noComma));
          return cont();
        }
        function maybeexpression(type2) {
          if (type2.match(/[;\}\)\],]/))
            return pass();
          return pass(expression);
        }
        function maybeoperatorComma(type2, value) {
          if (type2 == ",")
            return cont(maybeexpression);
          return maybeoperatorNoComma(type2, value, false);
        }
        function maybeoperatorNoComma(type2, value, noComma) {
          var me = noComma == false ? maybeoperatorComma : maybeoperatorNoComma;
          var expr = noComma == false ? expression : expressionNoComma;
          if (type2 == "=>")
            return cont(pushcontext, noComma ? arrowBodyNoComma : arrowBody, popcontext);
          if (type2 == "operator") {
            if (/\+\+|--/.test(value) || isTS && value == "!")
              return cont(me);
            if (isTS && value == "<" && cx.stream.match(/^([^<>]|<[^<>]*>)*>\s*\(/, false))
              return cont(pushlex(">"), commasep(typeexpr, ">"), poplex, me);
            if (value == "?")
              return cont(expression, expect(":"), expr);
            return cont(expr);
          }
          if (type2 == "quasi") {
            return pass(quasi, me);
          }
          if (type2 == ";")
            return;
          if (type2 == "(")
            return contCommasep(expressionNoComma, ")", "call", me);
          if (type2 == ".")
            return cont(property, me);
          if (type2 == "[")
            return cont(pushlex("]"), maybeexpression, expect("]"), poplex, me);
          if (isTS && value == "as") {
            cx.marked = "keyword";
            return cont(typeexpr, me);
          }
          if (type2 == "regexp") {
            cx.state.lastType = cx.marked = "operator";
            cx.stream.backUp(cx.stream.pos - cx.stream.start - 1);
            return cont(expr);
          }
        }
        function quasi(type2, value) {
          if (type2 != "quasi")
            return pass();
          if (value.slice(value.length - 2) != "${")
            return cont(quasi);
          return cont(maybeexpression, continueQuasi);
        }
        function continueQuasi(type2) {
          if (type2 == "}") {
            cx.marked = "string-2";
            cx.state.tokenize = tokenQuasi;
            return cont(quasi);
          }
        }
        function arrowBody(type2) {
          findFatArrow(cx.stream, cx.state);
          return pass(type2 == "{" ? statement : expression);
        }
        function arrowBodyNoComma(type2) {
          findFatArrow(cx.stream, cx.state);
          return pass(type2 == "{" ? statement : expressionNoComma);
        }
        function maybeTarget(noComma) {
          return function(type2) {
            if (type2 == ".")
              return cont(noComma ? targetNoComma : target);
            else if (type2 == "variable" && isTS)
              return cont(maybeTypeArgs, noComma ? maybeoperatorNoComma : maybeoperatorComma);
            else
              return pass(noComma ? expressionNoComma : expression);
          };
        }
        function target(_, value) {
          if (value == "target") {
            cx.marked = "keyword";
            return cont(maybeoperatorComma);
          }
        }
        function targetNoComma(_, value) {
          if (value == "target") {
            cx.marked = "keyword";
            return cont(maybeoperatorNoComma);
          }
        }
        function maybelabel(type2) {
          if (type2 == ":")
            return cont(poplex, statement);
          return pass(maybeoperatorComma, expect(";"), poplex);
        }
        function property(type2) {
          if (type2 == "variable") {
            cx.marked = "property";
            return cont();
          }
        }
        function objprop(type2, value) {
          if (type2 == "async") {
            cx.marked = "property";
            return cont(objprop);
          } else if (type2 == "variable" || cx.style == "keyword") {
            cx.marked = "property";
            if (value == "get" || value == "set")
              return cont(getterSetter);
            var m;
            if (isTS && cx.state.fatArrowAt == cx.stream.start && (m = cx.stream.match(/^\s*:\s*/, false)))
              cx.state.fatArrowAt = cx.stream.pos + m[0].length;
            return cont(afterprop);
          } else if (type2 == "number" || type2 == "string") {
            cx.marked = jsonldMode ? "property" : cx.style + " property";
            return cont(afterprop);
          } else if (type2 == "jsonld-keyword") {
            return cont(afterprop);
          } else if (isTS && isModifier(value)) {
            cx.marked = "keyword";
            return cont(objprop);
          } else if (type2 == "[") {
            return cont(expression, maybetype, expect("]"), afterprop);
          } else if (type2 == "spread") {
            return cont(expressionNoComma, afterprop);
          } else if (value == "*") {
            cx.marked = "keyword";
            return cont(objprop);
          } else if (type2 == ":") {
            return pass(afterprop);
          }
        }
        function getterSetter(type2) {
          if (type2 != "variable")
            return pass(afterprop);
          cx.marked = "property";
          return cont(functiondef);
        }
        function afterprop(type2) {
          if (type2 == ":")
            return cont(expressionNoComma);
          if (type2 == "(")
            return pass(functiondef);
        }
        function commasep(what, end, sep) {
          function proceed(type2, value) {
            if (sep ? sep.indexOf(type2) > -1 : type2 == ",") {
              var lex = cx.state.lexical;
              if (lex.info == "call")
                lex.pos = (lex.pos || 0) + 1;
              return cont(function(type3, value2) {
                if (type3 == end || value2 == end)
                  return pass();
                return pass(what);
              }, proceed);
            }
            if (type2 == end || value == end)
              return cont();
            if (sep && sep.indexOf(";") > -1)
              return pass(what);
            return cont(expect(end));
          }
          return function(type2, value) {
            if (type2 == end || value == end)
              return cont();
            return pass(what, proceed);
          };
        }
        function contCommasep(what, end, info) {
          for (var i = 3; i < arguments.length; i++)
            cx.cc.push(arguments[i]);
          return cont(pushlex(end, info), commasep(what, end), poplex);
        }
        function block(type2) {
          if (type2 == "}")
            return cont();
          return pass(statement, block);
        }
        function maybetype(type2, value) {
          if (isTS) {
            if (type2 == ":")
              return cont(typeexpr);
            if (value == "?")
              return cont(maybetype);
          }
        }
        function maybetypeOrIn(type2, value) {
          if (isTS && (type2 == ":" || value == "in"))
            return cont(typeexpr);
        }
        function mayberettype(type2) {
          if (isTS && type2 == ":") {
            if (cx.stream.match(/^\s*\w+\s+is\b/, false))
              return cont(expression, isKW, typeexpr);
            else
              return cont(typeexpr);
          }
        }
        function isKW(_, value) {
          if (value == "is") {
            cx.marked = "keyword";
            return cont();
          }
        }
        function typeexpr(type2, value) {
          if (value == "keyof" || value == "typeof" || value == "infer" || value == "readonly") {
            cx.marked = "keyword";
            return cont(value == "typeof" ? expressionNoComma : typeexpr);
          }
          if (type2 == "variable" || value == "void") {
            cx.marked = "type";
            return cont(afterType);
          }
          if (value == "|" || value == "&")
            return cont(typeexpr);
          if (type2 == "string" || type2 == "number" || type2 == "atom")
            return cont(afterType);
          if (type2 == "[")
            return cont(pushlex("]"), commasep(typeexpr, "]", ","), poplex, afterType);
          if (type2 == "{")
            return cont(pushlex("}"), typeprops, poplex, afterType);
          if (type2 == "(")
            return cont(commasep(typearg, ")"), maybeReturnType, afterType);
          if (type2 == "<")
            return cont(commasep(typeexpr, ">"), typeexpr);
          if (type2 == "quasi") {
            return pass(quasiType, afterType);
          }
        }
        function maybeReturnType(type2) {
          if (type2 == "=>")
            return cont(typeexpr);
        }
        function typeprops(type2) {
          if (type2.match(/[\}\)\]]/))
            return cont();
          if (type2 == "," || type2 == ";")
            return cont(typeprops);
          return pass(typeprop, typeprops);
        }
        function typeprop(type2, value) {
          if (type2 == "variable" || cx.style == "keyword") {
            cx.marked = "property";
            return cont(typeprop);
          } else if (value == "?" || type2 == "number" || type2 == "string") {
            return cont(typeprop);
          } else if (type2 == ":") {
            return cont(typeexpr);
          } else if (type2 == "[") {
            return cont(expect("variable"), maybetypeOrIn, expect("]"), typeprop);
          } else if (type2 == "(") {
            return pass(functiondecl, typeprop);
          } else if (!type2.match(/[;\}\)\],]/)) {
            return cont();
          }
        }
        function quasiType(type2, value) {
          if (type2 != "quasi")
            return pass();
          if (value.slice(value.length - 2) != "${")
            return cont(quasiType);
          return cont(typeexpr, continueQuasiType);
        }
        function continueQuasiType(type2) {
          if (type2 == "}") {
            cx.marked = "string-2";
            cx.state.tokenize = tokenQuasi;
            return cont(quasiType);
          }
        }
        function typearg(type2, value) {
          if (type2 == "variable" && cx.stream.match(/^\s*[?:]/, false) || value == "?")
            return cont(typearg);
          if (type2 == ":")
            return cont(typeexpr);
          if (type2 == "spread")
            return cont(typearg);
          return pass(typeexpr);
        }
        function afterType(type2, value) {
          if (value == "<")
            return cont(pushlex(">"), commasep(typeexpr, ">"), poplex, afterType);
          if (value == "|" || type2 == "." || value == "&")
            return cont(typeexpr);
          if (type2 == "[")
            return cont(typeexpr, expect("]"), afterType);
          if (value == "extends" || value == "implements") {
            cx.marked = "keyword";
            return cont(typeexpr);
          }
          if (value == "?")
            return cont(typeexpr, expect(":"), typeexpr);
        }
        function maybeTypeArgs(_, value) {
          if (value == "<")
            return cont(pushlex(">"), commasep(typeexpr, ">"), poplex, afterType);
        }
        function typeparam() {
          return pass(typeexpr, maybeTypeDefault);
        }
        function maybeTypeDefault(_, value) {
          if (value == "=")
            return cont(typeexpr);
        }
        function vardef(_, value) {
          if (value == "enum") {
            cx.marked = "keyword";
            return cont(enumdef);
          }
          return pass(pattern, maybetype, maybeAssign, vardefCont);
        }
        function pattern(type2, value) {
          if (isTS && isModifier(value)) {
            cx.marked = "keyword";
            return cont(pattern);
          }
          if (type2 == "variable") {
            register(value);
            return cont();
          }
          if (type2 == "spread")
            return cont(pattern);
          if (type2 == "[")
            return contCommasep(eltpattern, "]");
          if (type2 == "{")
            return contCommasep(proppattern, "}");
        }
        function proppattern(type2, value) {
          if (type2 == "variable" && !cx.stream.match(/^\s*:/, false)) {
            register(value);
            return cont(maybeAssign);
          }
          if (type2 == "variable")
            cx.marked = "property";
          if (type2 == "spread")
            return cont(pattern);
          if (type2 == "}")
            return pass();
          if (type2 == "[")
            return cont(expression, expect("]"), expect(":"), proppattern);
          return cont(expect(":"), pattern, maybeAssign);
        }
        function eltpattern() {
          return pass(pattern, maybeAssign);
        }
        function maybeAssign(_type, value) {
          if (value == "=")
            return cont(expressionNoComma);
        }
        function vardefCont(type2) {
          if (type2 == ",")
            return cont(vardef);
        }
        function maybeelse(type2, value) {
          if (type2 == "keyword b" && value == "else")
            return cont(pushlex("form", "else"), statement, poplex);
        }
        function forspec(type2, value) {
          if (value == "await")
            return cont(forspec);
          if (type2 == "(")
            return cont(pushlex(")"), forspec1, poplex);
        }
        function forspec1(type2) {
          if (type2 == "var")
            return cont(vardef, forspec2);
          if (type2 == "variable")
            return cont(forspec2);
          return pass(forspec2);
        }
        function forspec2(type2, value) {
          if (type2 == ")")
            return cont();
          if (type2 == ";")
            return cont(forspec2);
          if (value == "in" || value == "of") {
            cx.marked = "keyword";
            return cont(expression, forspec2);
          }
          return pass(expression, forspec2);
        }
        function functiondef(type2, value) {
          if (value == "*") {
            cx.marked = "keyword";
            return cont(functiondef);
          }
          if (type2 == "variable") {
            register(value);
            return cont(functiondef);
          }
          if (type2 == "(")
            return cont(pushcontext, pushlex(")"), commasep(funarg, ")"), poplex, mayberettype, statement, popcontext);
          if (isTS && value == "<")
            return cont(pushlex(">"), commasep(typeparam, ">"), poplex, functiondef);
        }
        function functiondecl(type2, value) {
          if (value == "*") {
            cx.marked = "keyword";
            return cont(functiondecl);
          }
          if (type2 == "variable") {
            register(value);
            return cont(functiondecl);
          }
          if (type2 == "(")
            return cont(pushcontext, pushlex(")"), commasep(funarg, ")"), poplex, mayberettype, popcontext);
          if (isTS && value == "<")
            return cont(pushlex(">"), commasep(typeparam, ">"), poplex, functiondecl);
        }
        function typename(type2, value) {
          if (type2 == "keyword" || type2 == "variable") {
            cx.marked = "type";
            return cont(typename);
          } else if (value == "<") {
            return cont(pushlex(">"), commasep(typeparam, ">"), poplex);
          }
        }
        function funarg(type2, value) {
          if (value == "@")
            cont(expression, funarg);
          if (type2 == "spread")
            return cont(funarg);
          if (isTS && isModifier(value)) {
            cx.marked = "keyword";
            return cont(funarg);
          }
          if (isTS && type2 == "this")
            return cont(maybetype, maybeAssign);
          return pass(pattern, maybetype, maybeAssign);
        }
        function classExpression(type2, value) {
          if (type2 == "variable")
            return className(type2, value);
          return classNameAfter(type2, value);
        }
        function className(type2, value) {
          if (type2 == "variable") {
            register(value);
            return cont(classNameAfter);
          }
        }
        function classNameAfter(type2, value) {
          if (value == "<")
            return cont(pushlex(">"), commasep(typeparam, ">"), poplex, classNameAfter);
          if (value == "extends" || value == "implements" || isTS && type2 == ",") {
            if (value == "implements")
              cx.marked = "keyword";
            return cont(isTS ? typeexpr : expression, classNameAfter);
          }
          if (type2 == "{")
            return cont(pushlex("}"), classBody, poplex);
        }
        function classBody(type2, value) {
          if (type2 == "async" || type2 == "variable" && (value == "static" || value == "get" || value == "set" || isTS && isModifier(value)) && cx.stream.match(/^\s+[\w$\xa1-\uffff]/, false)) {
            cx.marked = "keyword";
            return cont(classBody);
          }
          if (type2 == "variable" || cx.style == "keyword") {
            cx.marked = "property";
            return cont(classfield, classBody);
          }
          if (type2 == "number" || type2 == "string")
            return cont(classfield, classBody);
          if (type2 == "[")
            return cont(expression, maybetype, expect("]"), classfield, classBody);
          if (value == "*") {
            cx.marked = "keyword";
            return cont(classBody);
          }
          if (isTS && type2 == "(")
            return pass(functiondecl, classBody);
          if (type2 == ";" || type2 == ",")
            return cont(classBody);
          if (type2 == "}")
            return cont();
          if (value == "@")
            return cont(expression, classBody);
        }
        function classfield(type2, value) {
          if (value == "!")
            return cont(classfield);
          if (value == "?")
            return cont(classfield);
          if (type2 == ":")
            return cont(typeexpr, maybeAssign);
          if (value == "=")
            return cont(expressionNoComma);
          var context = cx.state.lexical.prev, isInterface = context && context.info == "interface";
          return pass(isInterface ? functiondecl : functiondef);
        }
        function afterExport(type2, value) {
          if (value == "*") {
            cx.marked = "keyword";
            return cont(maybeFrom, expect(";"));
          }
          if (value == "default") {
            cx.marked = "keyword";
            return cont(expression, expect(";"));
          }
          if (type2 == "{")
            return cont(commasep(exportField, "}"), maybeFrom, expect(";"));
          return pass(statement);
        }
        function exportField(type2, value) {
          if (value == "as") {
            cx.marked = "keyword";
            return cont(expect("variable"));
          }
          if (type2 == "variable")
            return pass(expressionNoComma, exportField);
        }
        function afterImport(type2) {
          if (type2 == "string")
            return cont();
          if (type2 == "(")
            return pass(expression);
          if (type2 == ".")
            return pass(maybeoperatorComma);
          return pass(importSpec, maybeMoreImports, maybeFrom);
        }
        function importSpec(type2, value) {
          if (type2 == "{")
            return contCommasep(importSpec, "}");
          if (type2 == "variable")
            register(value);
          if (value == "*")
            cx.marked = "keyword";
          return cont(maybeAs);
        }
        function maybeMoreImports(type2) {
          if (type2 == ",")
            return cont(importSpec, maybeMoreImports);
        }
        function maybeAs(_type, value) {
          if (value == "as") {
            cx.marked = "keyword";
            return cont(importSpec);
          }
        }
        function maybeFrom(_type, value) {
          if (value == "from") {
            cx.marked = "keyword";
            return cont(expression);
          }
        }
        function arrayLiteral(type2) {
          if (type2 == "]")
            return cont();
          return pass(commasep(expressionNoComma, "]"));
        }
        function enumdef() {
          return pass(pushlex("form"), pattern, expect("{"), pushlex("}"), commasep(enummember, "}"), poplex, poplex);
        }
        function enummember() {
          return pass(pattern, maybeAssign);
        }
        function isContinuedStatement(state, textAfter) {
          return state.lastType == "operator" || state.lastType == "," || isOperatorChar.test(textAfter.charAt(0)) || /[,.]/.test(textAfter.charAt(0));
        }
        function expressionAllowed(stream, state, backUp) {
          return state.tokenize == tokenBase && /^(?:operator|sof|keyword [bcd]|case|new|export|default|spread|[\[{}\(,;:]|=>)$/.test(state.lastType) || state.lastType == "quasi" && /\{\s*$/.test(stream.string.slice(0, stream.pos - (backUp || 0)));
        }
        return {
          startState: function(basecolumn) {
            var state = {
              tokenize: tokenBase,
              lastType: "sof",
              cc: [],
              lexical: new JSLexical((basecolumn || 0) - indentUnit, 0, "block", false),
              localVars: parserConfig.localVars,
              context: parserConfig.localVars && new Context(null, null, false),
              indented: basecolumn || 0
            };
            if (parserConfig.globalVars && typeof parserConfig.globalVars == "object")
              state.globalVars = parserConfig.globalVars;
            return state;
          },
          token: function(stream, state) {
            if (stream.sol()) {
              if (!state.lexical.hasOwnProperty("align"))
                state.lexical.align = false;
              state.indented = stream.indentation();
              findFatArrow(stream, state);
            }
            if (state.tokenize != tokenComment && stream.eatSpace())
              return null;
            var style = state.tokenize(stream, state);
            if (type == "comment")
              return style;
            state.lastType = type == "operator" && (content == "++" || content == "--") ? "incdec" : type;
            return parseJS(state, style, type, content, stream);
          },
          indent: function(state, textAfter) {
            if (state.tokenize == tokenComment || state.tokenize == tokenQuasi)
              return CodeMirror3.Pass;
            if (state.tokenize != tokenBase)
              return 0;
            var firstChar = textAfter && textAfter.charAt(0), lexical = state.lexical, top;
            if (!/^\s*else\b/.test(textAfter))
              for (var i = state.cc.length - 1; i >= 0; --i) {
                var c = state.cc[i];
                if (c == poplex)
                  lexical = lexical.prev;
                else if (c != maybeelse && c != popcontext)
                  break;
              }
            while ((lexical.type == "stat" || lexical.type == "form") && (firstChar == "}" || (top = state.cc[state.cc.length - 1]) && (top == maybeoperatorComma || top == maybeoperatorNoComma) && !/^[,\.=+\-*:?[\(]/.test(textAfter)))
              lexical = lexical.prev;
            if (statementIndent && lexical.type == ")" && lexical.prev.type == "stat")
              lexical = lexical.prev;
            var type2 = lexical.type, closing = firstChar == type2;
            if (type2 == "vardef")
              return lexical.indented + (state.lastType == "operator" || state.lastType == "," ? lexical.info.length + 1 : 0);
            else if (type2 == "form" && firstChar == "{")
              return lexical.indented;
            else if (type2 == "form")
              return lexical.indented + indentUnit;
            else if (type2 == "stat")
              return lexical.indented + (isContinuedStatement(state, textAfter) ? statementIndent || indentUnit : 0);
            else if (lexical.info == "switch" && !closing && parserConfig.doubleIndentSwitch != false)
              return lexical.indented + (/^(?:case|default)\b/.test(textAfter) ? indentUnit : 2 * indentUnit);
            else if (lexical.align)
              return lexical.column + (closing ? 0 : 1);
            else
              return lexical.indented + (closing ? 0 : indentUnit);
          },
          electricInput: /^\s*(?:case .*?:|default:|\{|\})$/,
          blockCommentStart: jsonMode ? null : "/*",
          blockCommentEnd: jsonMode ? null : "*/",
          blockCommentContinue: jsonMode ? null : " * ",
          lineComment: jsonMode ? null : "//",
          fold: "brace",
          closeBrackets: "()[]{}''\"\"``",
          helperType: jsonMode ? "json" : "javascript",
          jsonldMode,
          jsonMode,
          expressionAllowed,
          skipExpression: function(state) {
            parseJS(state, "atom", "atom", "true", new CodeMirror3.StringStream("", 2, null));
          }
        };
      });
      CodeMirror3.registerHelper("wordChars", "javascript", /[\w$]/);
      CodeMirror3.defineMIME("text/javascript", "javascript");
      CodeMirror3.defineMIME("text/ecmascript", "javascript");
      CodeMirror3.defineMIME("application/javascript", "javascript");
      CodeMirror3.defineMIME("application/x-javascript", "javascript");
      CodeMirror3.defineMIME("application/ecmascript", "javascript");
      CodeMirror3.defineMIME("application/json", { name: "javascript", json: true });
      CodeMirror3.defineMIME("application/x-json", { name: "javascript", json: true });
      CodeMirror3.defineMIME("application/manifest+json", { name: "javascript", json: true });
      CodeMirror3.defineMIME("application/ld+json", { name: "javascript", jsonld: true });
      CodeMirror3.defineMIME("text/typescript", { name: "javascript", typescript: true });
      CodeMirror3.defineMIME("application/typescript", { name: "javascript", typescript: true });
    });
  }
});

// node_modules/codemirror/mode/htmlmixed/htmlmixed.js
var require_htmlmixed = __commonJS({
  "node_modules/codemirror/mode/htmlmixed/htmlmixed.js"(exports, module) {
    (function(mod) {
      if (typeof exports == "object" && typeof module == "object")
        mod(require_codemirror(), require_xml(), require_javascript(), require_css());
      else if (typeof define == "function" && define.amd)
        define(["../../lib/codemirror", "../xml/xml", "../javascript/javascript", "../css/css"], mod);
      else
        mod(CodeMirror);
    })(function(CodeMirror3) {
      "use strict";
      var defaultTags = {
        script: [
          ["lang", /(javascript|babel)/i, "javascript"],
          ["type", /^(?:text|application)\/(?:x-)?(?:java|ecma)script$|^module$|^$/i, "javascript"],
          ["type", /./, "text/plain"],
          [null, null, "javascript"]
        ],
        style: [
          ["lang", /^css$/i, "css"],
          ["type", /^(text\/)?(x-)?(stylesheet|css)$/i, "css"],
          ["type", /./, "text/plain"],
          [null, null, "css"]
        ]
      };
      function maybeBackup(stream, pat, style) {
        var cur = stream.current(), close = cur.search(pat);
        if (close > -1) {
          stream.backUp(cur.length - close);
        } else if (cur.match(/<\/?$/)) {
          stream.backUp(cur.length);
          if (!stream.match(pat, false))
            stream.match(cur);
        }
        return style;
      }
      var attrRegexpCache = {};
      function getAttrRegexp(attr) {
        var regexp = attrRegexpCache[attr];
        if (regexp)
          return regexp;
        return attrRegexpCache[attr] = new RegExp("\\s+" + attr + `\\s*=\\s*('|")?([^'"]+)('|")?\\s*`);
      }
      function getAttrValue(text, attr) {
        var match = text.match(getAttrRegexp(attr));
        return match ? /^\s*(.*?)\s*$/.exec(match[2])[1] : "";
      }
      function getTagRegexp(tagName, anchored) {
        return new RegExp((anchored ? "^" : "") + "</\\s*" + tagName + "\\s*>", "i");
      }
      function addTags(from, to) {
        for (var tag in from) {
          var dest = to[tag] || (to[tag] = []);
          var source = from[tag];
          for (var i = source.length - 1; i >= 0; i--)
            dest.unshift(source[i]);
        }
      }
      function findMatchingMode(tagInfo, tagText) {
        for (var i = 0; i < tagInfo.length; i++) {
          var spec = tagInfo[i];
          if (!spec[0] || spec[1].test(getAttrValue(tagText, spec[0])))
            return spec[2];
        }
      }
      CodeMirror3.defineMode("htmlmixed", function(config, parserConfig) {
        var htmlMode = CodeMirror3.getMode(config, {
          name: "xml",
          htmlMode: true,
          multilineTagIndentFactor: parserConfig.multilineTagIndentFactor,
          multilineTagIndentPastTag: parserConfig.multilineTagIndentPastTag,
          allowMissingTagName: parserConfig.allowMissingTagName
        });
        var tags = {};
        var configTags = parserConfig && parserConfig.tags, configScript = parserConfig && parserConfig.scriptTypes;
        addTags(defaultTags, tags);
        if (configTags)
          addTags(configTags, tags);
        if (configScript)
          for (var i = configScript.length - 1; i >= 0; i--)
            tags.script.unshift(["type", configScript[i].matches, configScript[i].mode]);
        function html(stream, state) {
          var style = htmlMode.token(stream, state.htmlState), tag = /\btag\b/.test(style), tagName;
          if (tag && !/[<>\s\/]/.test(stream.current()) && (tagName = state.htmlState.tagName && state.htmlState.tagName.toLowerCase()) && tags.hasOwnProperty(tagName)) {
            state.inTag = tagName + " ";
          } else if (state.inTag && tag && />$/.test(stream.current())) {
            var inTag = /^([\S]+) (.*)/.exec(state.inTag);
            state.inTag = null;
            var modeSpec = stream.current() == ">" && findMatchingMode(tags[inTag[1]], inTag[2]);
            var mode = CodeMirror3.getMode(config, modeSpec);
            var endTagA = getTagRegexp(inTag[1], true), endTag = getTagRegexp(inTag[1], false);
            state.token = function(stream2, state2) {
              if (stream2.match(endTagA, false)) {
                state2.token = html;
                state2.localState = state2.localMode = null;
                return null;
              }
              return maybeBackup(stream2, endTag, state2.localMode.token(stream2, state2.localState));
            };
            state.localMode = mode;
            state.localState = CodeMirror3.startState(mode, htmlMode.indent(state.htmlState, "", ""));
          } else if (state.inTag) {
            state.inTag += stream.current();
            if (stream.eol())
              state.inTag += " ";
          }
          return style;
        }
        ;
        return {
          startState: function() {
            var state = CodeMirror3.startState(htmlMode);
            return { token: html, inTag: null, localMode: null, localState: null, htmlState: state };
          },
          copyState: function(state) {
            var local;
            if (state.localState) {
              local = CodeMirror3.copyState(state.localMode, state.localState);
            }
            return {
              token: state.token,
              inTag: state.inTag,
              localMode: state.localMode,
              localState: local,
              htmlState: CodeMirror3.copyState(htmlMode, state.htmlState)
            };
          },
          token: function(stream, state) {
            return state.token(stream, state);
          },
          indent: function(state, textAfter, line) {
            if (!state.localMode || /^\s*<\//.test(textAfter))
              return htmlMode.indent(state.htmlState, textAfter, line);
            else if (state.localMode.indent)
              return state.localMode.indent(state.localState, textAfter, line);
            else
              return CodeMirror3.Pass;
          },
          innerMode: function(state) {
            return { state: state.localState || state.htmlState, mode: state.localMode || htmlMode };
          }
        };
      }, "xml", "javascript", "css");
      CodeMirror3.defineMIME("text/html", "htmlmixed");
    });
  }
});

// node_modules/codemirror/mode/julia/julia.js
var require_julia = __commonJS({
  "node_modules/codemirror/mode/julia/julia.js"(exports, module) {
    (function(mod) {
      if (typeof exports == "object" && typeof module == "object")
        mod(require_codemirror());
      else if (typeof define == "function" && define.amd)
        define(["../../lib/codemirror"], mod);
      else
        mod(CodeMirror);
    })(function(CodeMirror3) {
      "use strict";
      CodeMirror3.defineMode("julia", function(config, parserConf) {
        function wordRegexp(words, end, pre) {
          if (typeof pre === "undefined") {
            pre = "";
          }
          if (typeof end === "undefined") {
            end = "\\b";
          }
          return new RegExp("^" + pre + "((" + words.join(")|(") + "))" + end);
        }
        var octChar = "\\\\[0-7]{1,3}";
        var hexChar = "\\\\x[A-Fa-f0-9]{1,2}";
        var sChar = `\\\\[abefnrtv0%?'"\\\\]`;
        var uChar = "([^\\u0027\\u005C\\uD800-\\uDFFF]|[\\uD800-\\uDFFF][\\uDC00-\\uDFFF])";
        var asciiOperatorsList = [
          "[<>]:",
          "[<>=]=",
          "<<=?",
          ">>>?=?",
          "=>",
          "--?>",
          "<--[->]?",
          "\\/\\/",
          "\\.{2,3}",
          "[\\.\\\\%*+\\-<>!\\/^|&]=?",
          "\\?",
          "\\$",
          "~",
          ":"
        ];
        var operators = parserConf.operators || wordRegexp([
          "[<>]:",
          "[<>=]=",
          "[!=]==",
          "<<=?",
          ">>>?=?",
          "=>?",
          "--?>",
          "<--[->]?",
          "\\/\\/",
          "[\\\\%*+\\-<>!\\/^|&\\u00F7\\u22BB]=?",
          "\\?",
          "\\$",
          "~",
          ":",
          "\\u00D7",
          "\\u2208",
          "\\u2209",
          "\\u220B",
          "\\u220C",
          "\\u2218",
          "\\u221A",
          "\\u221B",
          "\\u2229",
          "\\u222A",
          "\\u2260",
          "\\u2264",
          "\\u2265",
          "\\u2286",
          "\\u2288",
          "\\u228A",
          "\\u22C5",
          "\\b(in|isa)\\b(?!.?\\()"
        ], "");
        var delimiters = parserConf.delimiters || /^[;,()[\]{}]/;
        var identifiers = parserConf.identifiers || /^[_A-Za-z\u00A1-\u2217\u2219-\uFFFF][\w\u00A1-\u2217\u2219-\uFFFF]*!*/;
        var chars = wordRegexp([octChar, hexChar, sChar, uChar], "'");
        var openersList = [
          "begin",
          "function",
          "type",
          "struct",
          "immutable",
          "let",
          "macro",
          "for",
          "while",
          "quote",
          "if",
          "else",
          "elseif",
          "try",
          "finally",
          "catch",
          "do"
        ];
        var closersList = ["end", "else", "elseif", "catch", "finally"];
        var keywordsList = [
          "if",
          "else",
          "elseif",
          "while",
          "for",
          "begin",
          "let",
          "end",
          "do",
          "try",
          "catch",
          "finally",
          "return",
          "break",
          "continue",
          "global",
          "local",
          "const",
          "export",
          "import",
          "importall",
          "using",
          "function",
          "where",
          "macro",
          "module",
          "baremodule",
          "struct",
          "type",
          "mutable",
          "immutable",
          "quote",
          "typealias",
          "abstract",
          "primitive",
          "bitstype"
        ];
        var builtinsList = ["true", "false", "nothing", "NaN", "Inf"];
        CodeMirror3.registerHelper("hintWords", "julia", keywordsList.concat(builtinsList));
        var openers = wordRegexp(openersList);
        var closers = wordRegexp(closersList);
        var keywords = wordRegexp(keywordsList);
        var builtins = wordRegexp(builtinsList);
        var macro = /^@[_A-Za-z\u00A1-\uFFFF][\w\u00A1-\uFFFF]*!*/;
        var symbol = /^:[_A-Za-z\u00A1-\uFFFF][\w\u00A1-\uFFFF]*!*/;
        var stringPrefixes = /^(`|([_A-Za-z\u00A1-\uFFFF]*"("")?))/;
        var macroOperators = wordRegexp(asciiOperatorsList, "", "@");
        var symbolOperators = wordRegexp(asciiOperatorsList, "", ":");
        function inArray(state) {
          return state.nestedArrays > 0;
        }
        function inGenerator(state) {
          return state.nestedGenerators > 0;
        }
        function currentScope(state, n) {
          if (typeof n === "undefined") {
            n = 0;
          }
          if (state.scopes.length <= n) {
            return null;
          }
          return state.scopes[state.scopes.length - (n + 1)];
        }
        function tokenBase(stream, state) {
          if (stream.match("#=", false)) {
            state.tokenize = tokenComment;
            return state.tokenize(stream, state);
          }
          var leavingExpr = state.leavingExpr;
          if (stream.sol()) {
            leavingExpr = false;
          }
          state.leavingExpr = false;
          if (leavingExpr) {
            if (stream.match(/^'+/)) {
              return "operator";
            }
          }
          if (stream.match(/\.{4,}/)) {
            return "error";
          } else if (stream.match(/\.{1,3}/)) {
            return "operator";
          }
          if (stream.eatSpace()) {
            return null;
          }
          var ch = stream.peek();
          if (ch === "#") {
            stream.skipToEnd();
            return "comment";
          }
          if (ch === "[") {
            state.scopes.push("[");
            state.nestedArrays++;
          }
          if (ch === "(") {
            state.scopes.push("(");
            state.nestedGenerators++;
          }
          if (inArray(state) && ch === "]") {
            while (state.scopes.length && currentScope(state) !== "[") {
              state.scopes.pop();
            }
            state.scopes.pop();
            state.nestedArrays--;
            state.leavingExpr = true;
          }
          if (inGenerator(state) && ch === ")") {
            while (state.scopes.length && currentScope(state) !== "(") {
              state.scopes.pop();
            }
            state.scopes.pop();
            state.nestedGenerators--;
            state.leavingExpr = true;
          }
          if (inArray(state)) {
            if (state.lastToken == "end" && stream.match(":")) {
              return "operator";
            }
            if (stream.match("end")) {
              return "number";
            }
          }
          var match;
          if (match = stream.match(openers, false)) {
            state.scopes.push(match[0]);
          }
          if (stream.match(closers, false)) {
            state.scopes.pop();
          }
          if (stream.match(/^::(?![:\$])/)) {
            state.tokenize = tokenAnnotation;
            return state.tokenize(stream, state);
          }
          if (!leavingExpr && (stream.match(symbol) || stream.match(symbolOperators))) {
            return "builtin";
          }
          if (stream.match(operators)) {
            return "operator";
          }
          if (stream.match(/^\.?\d/, false)) {
            var imMatcher = RegExp(/^im\b/);
            var numberLiteral = false;
            if (stream.match(/^0x\.[0-9a-f_]+p[\+\-]?[_\d]+/i)) {
              numberLiteral = true;
            }
            if (stream.match(/^0x[0-9a-f_]+/i)) {
              numberLiteral = true;
            }
            if (stream.match(/^0b[01_]+/i)) {
              numberLiteral = true;
            }
            if (stream.match(/^0o[0-7_]+/i)) {
              numberLiteral = true;
            }
            if (stream.match(/^(?:(?:\d[_\d]*)?\.(?!\.)(?:\d[_\d]*)?|\d[_\d]*\.(?!\.)(?:\d[_\d]*))?([Eef][\+\-]?[_\d]+)?/i)) {
              numberLiteral = true;
            }
            if (stream.match(/^\d[_\d]*(e[\+\-]?\d+)?/i)) {
              numberLiteral = true;
            }
            if (numberLiteral) {
              stream.match(imMatcher);
              state.leavingExpr = true;
              return "number";
            }
          }
          if (stream.match("'")) {
            state.tokenize = tokenChar;
            return state.tokenize(stream, state);
          }
          if (stream.match(stringPrefixes)) {
            state.tokenize = tokenStringFactory(stream.current());
            return state.tokenize(stream, state);
          }
          if (stream.match(macro) || stream.match(macroOperators)) {
            return "meta";
          }
          if (stream.match(delimiters)) {
            return null;
          }
          if (stream.match(keywords)) {
            return "keyword";
          }
          if (stream.match(builtins)) {
            return "builtin";
          }
          var isDefinition = state.isDefinition || state.lastToken == "function" || state.lastToken == "macro" || state.lastToken == "type" || state.lastToken == "struct" || state.lastToken == "immutable";
          if (stream.match(identifiers)) {
            if (isDefinition) {
              if (stream.peek() === ".") {
                state.isDefinition = true;
                return "variable";
              }
              state.isDefinition = false;
              return "def";
            }
            state.leavingExpr = true;
            return "variable";
          }
          stream.next();
          return "error";
        }
        function tokenAnnotation(stream, state) {
          stream.match(/.*?(?=[,;{}()=\s]|$)/);
          if (stream.match("{")) {
            state.nestedParameters++;
          } else if (stream.match("}") && state.nestedParameters > 0) {
            state.nestedParameters--;
          }
          if (state.nestedParameters > 0) {
            stream.match(/.*?(?={|})/) || stream.next();
          } else if (state.nestedParameters == 0) {
            state.tokenize = tokenBase;
          }
          return "builtin";
        }
        function tokenComment(stream, state) {
          if (stream.match("#=")) {
            state.nestedComments++;
          }
          if (!stream.match(/.*?(?=(#=|=#))/)) {
            stream.skipToEnd();
          }
          if (stream.match("=#")) {
            state.nestedComments--;
            if (state.nestedComments == 0)
              state.tokenize = tokenBase;
          }
          return "comment";
        }
        function tokenChar(stream, state) {
          var isChar = false, match;
          if (stream.match(chars)) {
            isChar = true;
          } else if (match = stream.match(/\\u([a-f0-9]{1,4})(?=')/i)) {
            var value = parseInt(match[1], 16);
            if (value <= 55295 || value >= 57344) {
              isChar = true;
              stream.next();
            }
          } else if (match = stream.match(/\\U([A-Fa-f0-9]{5,8})(?=')/)) {
            var value = parseInt(match[1], 16);
            if (value <= 1114111) {
              isChar = true;
              stream.next();
            }
          }
          if (isChar) {
            state.leavingExpr = true;
            state.tokenize = tokenBase;
            return "string";
          }
          if (!stream.match(/^[^']+(?=')/)) {
            stream.skipToEnd();
          }
          if (stream.match("'")) {
            state.tokenize = tokenBase;
          }
          return "error";
        }
        function tokenStringFactory(delimiter) {
          if (delimiter.substr(-3) === '"""') {
            delimiter = '"""';
          } else if (delimiter.substr(-1) === '"') {
            delimiter = '"';
          }
          function tokenString(stream, state) {
            if (stream.eat("\\")) {
              stream.next();
            } else if (stream.match(delimiter)) {
              state.tokenize = tokenBase;
              state.leavingExpr = true;
              return "string";
            } else {
              stream.eat(/[`"]/);
            }
            stream.eatWhile(/[^\\`"]/);
            return "string";
          }
          return tokenString;
        }
        var external = {
          startState: function() {
            return {
              tokenize: tokenBase,
              scopes: [],
              lastToken: null,
              leavingExpr: false,
              isDefinition: false,
              nestedArrays: 0,
              nestedComments: 0,
              nestedGenerators: 0,
              nestedParameters: 0,
              firstParenPos: -1
            };
          },
          token: function(stream, state) {
            var style = state.tokenize(stream, state);
            var current = stream.current();
            if (current && style) {
              state.lastToken = current;
            }
            return style;
          },
          indent: function(state, textAfter) {
            var delta = 0;
            if (textAfter === "]" || textAfter === ")" || /^end\b/.test(textAfter) || /^else/.test(textAfter) || /^catch\b/.test(textAfter) || /^elseif\b/.test(textAfter) || /^finally/.test(textAfter)) {
              delta = -1;
            }
            return (state.scopes.length + delta) * config.indentUnit;
          },
          electricInput: /\b(end|else|catch|finally)\b/,
          blockCommentStart: "#=",
          blockCommentEnd: "=#",
          lineComment: "#",
          closeBrackets: '()[]{}""',
          fold: "indent"
        };
        return external;
      });
      CodeMirror3.defineMIME("text/x-julia", "julia");
    });
  }
});

// node_modules/codemirror/mode/lua/lua.js
var require_lua = __commonJS({
  "node_modules/codemirror/mode/lua/lua.js"(exports, module) {
    (function(mod) {
      if (typeof exports == "object" && typeof module == "object")
        mod(require_codemirror());
      else if (typeof define == "function" && define.amd)
        define(["../../lib/codemirror"], mod);
      else
        mod(CodeMirror);
    })(function(CodeMirror3) {
      "use strict";
      CodeMirror3.defineMode("lua", function(config, parserConfig) {
        var indentUnit = config.indentUnit;
        function prefixRE(words) {
          return new RegExp("^(?:" + words.join("|") + ")", "i");
        }
        function wordRE(words) {
          return new RegExp("^(?:" + words.join("|") + ")$", "i");
        }
        var specials = wordRE(parserConfig.specials || []);
        var builtins = wordRE([
          "_G",
          "_VERSION",
          "assert",
          "collectgarbage",
          "dofile",
          "error",
          "getfenv",
          "getmetatable",
          "ipairs",
          "load",
          "loadfile",
          "loadstring",
          "module",
          "next",
          "pairs",
          "pcall",
          "print",
          "rawequal",
          "rawget",
          "rawset",
          "require",
          "select",
          "setfenv",
          "setmetatable",
          "tonumber",
          "tostring",
          "type",
          "unpack",
          "xpcall",
          "coroutine.create",
          "coroutine.resume",
          "coroutine.running",
          "coroutine.status",
          "coroutine.wrap",
          "coroutine.yield",
          "debug.debug",
          "debug.getfenv",
          "debug.gethook",
          "debug.getinfo",
          "debug.getlocal",
          "debug.getmetatable",
          "debug.getregistry",
          "debug.getupvalue",
          "debug.setfenv",
          "debug.sethook",
          "debug.setlocal",
          "debug.setmetatable",
          "debug.setupvalue",
          "debug.traceback",
          "close",
          "flush",
          "lines",
          "read",
          "seek",
          "setvbuf",
          "write",
          "io.close",
          "io.flush",
          "io.input",
          "io.lines",
          "io.open",
          "io.output",
          "io.popen",
          "io.read",
          "io.stderr",
          "io.stdin",
          "io.stdout",
          "io.tmpfile",
          "io.type",
          "io.write",
          "math.abs",
          "math.acos",
          "math.asin",
          "math.atan",
          "math.atan2",
          "math.ceil",
          "math.cos",
          "math.cosh",
          "math.deg",
          "math.exp",
          "math.floor",
          "math.fmod",
          "math.frexp",
          "math.huge",
          "math.ldexp",
          "math.log",
          "math.log10",
          "math.max",
          "math.min",
          "math.modf",
          "math.pi",
          "math.pow",
          "math.rad",
          "math.random",
          "math.randomseed",
          "math.sin",
          "math.sinh",
          "math.sqrt",
          "math.tan",
          "math.tanh",
          "os.clock",
          "os.date",
          "os.difftime",
          "os.execute",
          "os.exit",
          "os.getenv",
          "os.remove",
          "os.rename",
          "os.setlocale",
          "os.time",
          "os.tmpname",
          "package.cpath",
          "package.loaded",
          "package.loaders",
          "package.loadlib",
          "package.path",
          "package.preload",
          "package.seeall",
          "string.byte",
          "string.char",
          "string.dump",
          "string.find",
          "string.format",
          "string.gmatch",
          "string.gsub",
          "string.len",
          "string.lower",
          "string.match",
          "string.rep",
          "string.reverse",
          "string.sub",
          "string.upper",
          "table.concat",
          "table.insert",
          "table.maxn",
          "table.remove",
          "table.sort"
        ]);
        var keywords = wordRE([
          "and",
          "break",
          "elseif",
          "false",
          "nil",
          "not",
          "or",
          "return",
          "true",
          "function",
          "end",
          "if",
          "then",
          "else",
          "do",
          "while",
          "repeat",
          "until",
          "for",
          "in",
          "local"
        ]);
        var indentTokens = wordRE(["function", "if", "repeat", "do", "\\(", "{"]);
        var dedentTokens = wordRE(["end", "until", "\\)", "}"]);
        var dedentPartial = prefixRE(["end", "until", "\\)", "}", "else", "elseif"]);
        function readBracket(stream) {
          var level = 0;
          while (stream.eat("="))
            ++level;
          stream.eat("[");
          return level;
        }
        function normal(stream, state) {
          var ch = stream.next();
          if (ch == "-" && stream.eat("-")) {
            if (stream.eat("[") && stream.eat("["))
              return (state.cur = bracketed(readBracket(stream), "comment"))(stream, state);
            stream.skipToEnd();
            return "comment";
          }
          if (ch == '"' || ch == "'")
            return (state.cur = string(ch))(stream, state);
          if (ch == "[" && /[\[=]/.test(stream.peek()))
            return (state.cur = bracketed(readBracket(stream), "string"))(stream, state);
          if (/\d/.test(ch)) {
            stream.eatWhile(/[\w.%]/);
            return "number";
          }
          if (/[\w_]/.test(ch)) {
            stream.eatWhile(/[\w\\\-_.]/);
            return "variable";
          }
          return null;
        }
        function bracketed(level, style) {
          return function(stream, state) {
            var curlev = null, ch;
            while ((ch = stream.next()) != null) {
              if (curlev == null) {
                if (ch == "]")
                  curlev = 0;
              } else if (ch == "=")
                ++curlev;
              else if (ch == "]" && curlev == level) {
                state.cur = normal;
                break;
              } else
                curlev = null;
            }
            return style;
          };
        }
        function string(quote) {
          return function(stream, state) {
            var escaped = false, ch;
            while ((ch = stream.next()) != null) {
              if (ch == quote && !escaped)
                break;
              escaped = !escaped && ch == "\\";
            }
            if (!escaped)
              state.cur = normal;
            return "string";
          };
        }
        return {
          startState: function(basecol) {
            return { basecol: basecol || 0, indentDepth: 0, cur: normal };
          },
          token: function(stream, state) {
            if (stream.eatSpace())
              return null;
            var style = state.cur(stream, state);
            var word = stream.current();
            if (style == "variable") {
              if (keywords.test(word))
                style = "keyword";
              else if (builtins.test(word))
                style = "builtin";
              else if (specials.test(word))
                style = "variable-2";
            }
            if (style != "comment" && style != "string") {
              if (indentTokens.test(word))
                ++state.indentDepth;
              else if (dedentTokens.test(word))
                --state.indentDepth;
            }
            return style;
          },
          indent: function(state, textAfter) {
            var closing = dedentPartial.test(textAfter);
            return state.basecol + indentUnit * (state.indentDepth - (closing ? 1 : 0));
          },
          electricInput: /^\s*(?:end|until|else|\)|\})$/,
          lineComment: "--",
          blockCommentStart: "--[[",
          blockCommentEnd: "]]"
        };
      });
      CodeMirror3.defineMIME("text/x-lua", "lua");
    });
  }
});

// node_modules/codemirror/mode/meta.js
var require_meta = __commonJS({
  "node_modules/codemirror/mode/meta.js"(exports, module) {
    (function(mod) {
      if (typeof exports == "object" && typeof module == "object")
        mod(require_codemirror());
      else if (typeof define == "function" && define.amd)
        define(["../lib/codemirror"], mod);
      else
        mod(CodeMirror);
    })(function(CodeMirror3) {
      "use strict";
      CodeMirror3.modeInfo = [
        { name: "APL", mime: "text/apl", mode: "apl", ext: ["dyalog", "apl"] },
        { name: "PGP", mimes: ["application/pgp", "application/pgp-encrypted", "application/pgp-keys", "application/pgp-signature"], mode: "asciiarmor", ext: ["asc", "pgp", "sig"] },
        { name: "ASN.1", mime: "text/x-ttcn-asn", mode: "asn.1", ext: ["asn", "asn1"] },
        { name: "Asterisk", mime: "text/x-asterisk", mode: "asterisk", file: /^extensions\.conf$/i },
        { name: "Brainfuck", mime: "text/x-brainfuck", mode: "brainfuck", ext: ["b", "bf"] },
        { name: "C", mime: "text/x-csrc", mode: "clike", ext: ["c", "h", "ino"] },
        { name: "C++", mime: "text/x-c++src", mode: "clike", ext: ["cpp", "c++", "cc", "cxx", "hpp", "h++", "hh", "hxx"], alias: ["cpp"] },
        { name: "Cobol", mime: "text/x-cobol", mode: "cobol", ext: ["cob", "cpy", "cbl"] },
        { name: "C#", mime: "text/x-csharp", mode: "clike", ext: ["cs"], alias: ["csharp", "cs"] },
        { name: "Clojure", mime: "text/x-clojure", mode: "clojure", ext: ["clj", "cljc", "cljx"] },
        { name: "ClojureScript", mime: "text/x-clojurescript", mode: "clojure", ext: ["cljs"] },
        { name: "Closure Stylesheets (GSS)", mime: "text/x-gss", mode: "css", ext: ["gss"] },
        { name: "CMake", mime: "text/x-cmake", mode: "cmake", ext: ["cmake", "cmake.in"], file: /^CMakeLists\.txt$/ },
        { name: "CoffeeScript", mimes: ["application/vnd.coffeescript", "text/coffeescript", "text/x-coffeescript"], mode: "coffeescript", ext: ["coffee"], alias: ["coffee", "coffee-script"] },
        { name: "Common Lisp", mime: "text/x-common-lisp", mode: "commonlisp", ext: ["cl", "lisp", "el"], alias: ["lisp"] },
        { name: "Cypher", mime: "application/x-cypher-query", mode: "cypher", ext: ["cyp", "cypher"] },
        { name: "Cython", mime: "text/x-cython", mode: "python", ext: ["pyx", "pxd", "pxi"] },
        { name: "Crystal", mime: "text/x-crystal", mode: "crystal", ext: ["cr"] },
        { name: "CSS", mime: "text/css", mode: "css", ext: ["css"] },
        { name: "CQL", mime: "text/x-cassandra", mode: "sql", ext: ["cql"] },
        { name: "D", mime: "text/x-d", mode: "d", ext: ["d"] },
        { name: "Dart", mimes: ["application/dart", "text/x-dart"], mode: "dart", ext: ["dart"] },
        { name: "diff", mime: "text/x-diff", mode: "diff", ext: ["diff", "patch"] },
        { name: "Django", mime: "text/x-django", mode: "django" },
        { name: "Dockerfile", mime: "text/x-dockerfile", mode: "dockerfile", file: /^Dockerfile$/ },
        { name: "DTD", mime: "application/xml-dtd", mode: "dtd", ext: ["dtd"] },
        { name: "Dylan", mime: "text/x-dylan", mode: "dylan", ext: ["dylan", "dyl", "intr"] },
        { name: "EBNF", mime: "text/x-ebnf", mode: "ebnf" },
        { name: "ECL", mime: "text/x-ecl", mode: "ecl", ext: ["ecl"] },
        { name: "edn", mime: "application/edn", mode: "clojure", ext: ["edn"] },
        { name: "Eiffel", mime: "text/x-eiffel", mode: "eiffel", ext: ["e"] },
        { name: "Elm", mime: "text/x-elm", mode: "elm", ext: ["elm"] },
        { name: "Embedded JavaScript", mime: "application/x-ejs", mode: "htmlembedded", ext: ["ejs"] },
        { name: "Embedded Ruby", mime: "application/x-erb", mode: "htmlembedded", ext: ["erb"] },
        { name: "Erlang", mime: "text/x-erlang", mode: "erlang", ext: ["erl"] },
        { name: "Esper", mime: "text/x-esper", mode: "sql" },
        { name: "Factor", mime: "text/x-factor", mode: "factor", ext: ["factor"] },
        { name: "FCL", mime: "text/x-fcl", mode: "fcl" },
        { name: "Forth", mime: "text/x-forth", mode: "forth", ext: ["forth", "fth", "4th"] },
        { name: "Fortran", mime: "text/x-fortran", mode: "fortran", ext: ["f", "for", "f77", "f90", "f95"] },
        { name: "F#", mime: "text/x-fsharp", mode: "mllike", ext: ["fs"], alias: ["fsharp"] },
        { name: "Gas", mime: "text/x-gas", mode: "gas", ext: ["s"] },
        { name: "Gherkin", mime: "text/x-feature", mode: "gherkin", ext: ["feature"] },
        { name: "GitHub Flavored Markdown", mime: "text/x-gfm", mode: "gfm", file: /^(readme|contributing|history)\.md$/i },
        { name: "Go", mime: "text/x-go", mode: "go", ext: ["go"] },
        { name: "Groovy", mime: "text/x-groovy", mode: "groovy", ext: ["groovy", "gradle"], file: /^Jenkinsfile$/ },
        { name: "HAML", mime: "text/x-haml", mode: "haml", ext: ["haml"] },
        { name: "Haskell", mime: "text/x-haskell", mode: "haskell", ext: ["hs"] },
        { name: "Haskell (Literate)", mime: "text/x-literate-haskell", mode: "haskell-literate", ext: ["lhs"] },
        { name: "Haxe", mime: "text/x-haxe", mode: "haxe", ext: ["hx"] },
        { name: "HXML", mime: "text/x-hxml", mode: "haxe", ext: ["hxml"] },
        { name: "ASP.NET", mime: "application/x-aspx", mode: "htmlembedded", ext: ["aspx"], alias: ["asp", "aspx"] },
        { name: "HTML", mime: "text/html", mode: "htmlmixed", ext: ["html", "htm", "handlebars", "hbs"], alias: ["xhtml"] },
        { name: "HTTP", mime: "message/http", mode: "http" },
        { name: "IDL", mime: "text/x-idl", mode: "idl", ext: ["pro"] },
        { name: "Pug", mime: "text/x-pug", mode: "pug", ext: ["jade", "pug"], alias: ["jade"] },
        { name: "Java", mime: "text/x-java", mode: "clike", ext: ["java"] },
        { name: "Java Server Pages", mime: "application/x-jsp", mode: "htmlembedded", ext: ["jsp"], alias: ["jsp"] },
        {
          name: "JavaScript",
          mimes: ["text/javascript", "text/ecmascript", "application/javascript", "application/x-javascript", "application/ecmascript"],
          mode: "javascript",
          ext: ["js"],
          alias: ["ecmascript", "js", "node"]
        },
        { name: "JSON", mimes: ["application/json", "application/x-json"], mode: "javascript", ext: ["json", "map"], alias: ["json5"] },
        { name: "JSON-LD", mime: "application/ld+json", mode: "javascript", ext: ["jsonld"], alias: ["jsonld"] },
        { name: "JSX", mime: "text/jsx", mode: "jsx", ext: ["jsx"] },
        { name: "Jinja2", mime: "text/jinja2", mode: "jinja2", ext: ["j2", "jinja", "jinja2"] },
        { name: "Julia", mime: "text/x-julia", mode: "julia", ext: ["jl"], alias: ["jl"] },
        { name: "Kotlin", mime: "text/x-kotlin", mode: "clike", ext: ["kt"] },
        { name: "LESS", mime: "text/x-less", mode: "css", ext: ["less"] },
        { name: "LiveScript", mime: "text/x-livescript", mode: "livescript", ext: ["ls"], alias: ["ls"] },
        { name: "Lua", mime: "text/x-lua", mode: "lua", ext: ["lua"] },
        { name: "Markdown", mime: "text/x-markdown", mode: "markdown", ext: ["markdown", "md", "mkd"] },
        { name: "mIRC", mime: "text/mirc", mode: "mirc" },
        { name: "MariaDB SQL", mime: "text/x-mariadb", mode: "sql" },
        { name: "Mathematica", mime: "text/x-mathematica", mode: "mathematica", ext: ["m", "nb", "wl", "wls"] },
        { name: "Modelica", mime: "text/x-modelica", mode: "modelica", ext: ["mo"] },
        { name: "MUMPS", mime: "text/x-mumps", mode: "mumps", ext: ["mps"] },
        { name: "MS SQL", mime: "text/x-mssql", mode: "sql" },
        { name: "mbox", mime: "application/mbox", mode: "mbox", ext: ["mbox"] },
        { name: "MySQL", mime: "text/x-mysql", mode: "sql" },
        { name: "Nginx", mime: "text/x-nginx-conf", mode: "nginx", file: /nginx.*\.conf$/i },
        { name: "NSIS", mime: "text/x-nsis", mode: "nsis", ext: ["nsh", "nsi"] },
        {
          name: "NTriples",
          mimes: ["application/n-triples", "application/n-quads", "text/n-triples"],
          mode: "ntriples",
          ext: ["nt", "nq"]
        },
        { name: "Objective-C", mime: "text/x-objectivec", mode: "clike", ext: ["m"], alias: ["objective-c", "objc"] },
        { name: "Objective-C++", mime: "text/x-objectivec++", mode: "clike", ext: ["mm"], alias: ["objective-c++", "objc++"] },
        { name: "OCaml", mime: "text/x-ocaml", mode: "mllike", ext: ["ml", "mli", "mll", "mly"] },
        { name: "Octave", mime: "text/x-octave", mode: "octave", ext: ["m"] },
        { name: "Oz", mime: "text/x-oz", mode: "oz", ext: ["oz"] },
        { name: "Pascal", mime: "text/x-pascal", mode: "pascal", ext: ["p", "pas"] },
        { name: "PEG.js", mime: "null", mode: "pegjs", ext: ["jsonld"] },
        { name: "Perl", mime: "text/x-perl", mode: "perl", ext: ["pl", "pm"] },
        { name: "PHP", mimes: ["text/x-php", "application/x-httpd-php", "application/x-httpd-php-open"], mode: "php", ext: ["php", "php3", "php4", "php5", "php7", "phtml"] },
        { name: "Pig", mime: "text/x-pig", mode: "pig", ext: ["pig"] },
        { name: "Plain Text", mime: "text/plain", mode: "null", ext: ["txt", "text", "conf", "def", "list", "log"] },
        { name: "PLSQL", mime: "text/x-plsql", mode: "sql", ext: ["pls"] },
        { name: "PostgreSQL", mime: "text/x-pgsql", mode: "sql" },
        { name: "PowerShell", mime: "application/x-powershell", mode: "powershell", ext: ["ps1", "psd1", "psm1"] },
        { name: "Properties files", mime: "text/x-properties", mode: "properties", ext: ["properties", "ini", "in"], alias: ["ini", "properties"] },
        { name: "ProtoBuf", mime: "text/x-protobuf", mode: "protobuf", ext: ["proto"] },
        { name: "Python", mime: "text/x-python", mode: "python", ext: ["BUILD", "bzl", "py", "pyw"], file: /^(BUCK|BUILD)$/ },
        { name: "Puppet", mime: "text/x-puppet", mode: "puppet", ext: ["pp"] },
        { name: "Q", mime: "text/x-q", mode: "q", ext: ["q"] },
        { name: "R", mime: "text/x-rsrc", mode: "r", ext: ["r", "R"], alias: ["rscript"] },
        { name: "reStructuredText", mime: "text/x-rst", mode: "rst", ext: ["rst"], alias: ["rst"] },
        { name: "RPM Changes", mime: "text/x-rpm-changes", mode: "rpm" },
        { name: "RPM Spec", mime: "text/x-rpm-spec", mode: "rpm", ext: ["spec"] },
        { name: "Ruby", mime: "text/x-ruby", mode: "ruby", ext: ["rb"], alias: ["jruby", "macruby", "rake", "rb", "rbx"] },
        { name: "Rust", mime: "text/x-rustsrc", mode: "rust", ext: ["rs"] },
        { name: "SAS", mime: "text/x-sas", mode: "sas", ext: ["sas"] },
        { name: "Sass", mime: "text/x-sass", mode: "sass", ext: ["sass"] },
        { name: "Scala", mime: "text/x-scala", mode: "clike", ext: ["scala"] },
        { name: "Scheme", mime: "text/x-scheme", mode: "scheme", ext: ["scm", "ss"] },
        { name: "SCSS", mime: "text/x-scss", mode: "css", ext: ["scss"] },
        { name: "Shell", mimes: ["text/x-sh", "application/x-sh"], mode: "shell", ext: ["sh", "ksh", "bash"], alias: ["bash", "sh", "zsh"], file: /^PKGBUILD$/ },
        { name: "Sieve", mime: "application/sieve", mode: "sieve", ext: ["siv", "sieve"] },
        { name: "Slim", mimes: ["text/x-slim", "application/x-slim"], mode: "slim", ext: ["slim"] },
        { name: "Smalltalk", mime: "text/x-stsrc", mode: "smalltalk", ext: ["st"] },
        { name: "Smarty", mime: "text/x-smarty", mode: "smarty", ext: ["tpl"] },
        { name: "Solr", mime: "text/x-solr", mode: "solr" },
        { name: "SML", mime: "text/x-sml", mode: "mllike", ext: ["sml", "sig", "fun", "smackspec"] },
        { name: "Soy", mime: "text/x-soy", mode: "soy", ext: ["soy"], alias: ["closure template"] },
        { name: "SPARQL", mime: "application/sparql-query", mode: "sparql", ext: ["rq", "sparql"], alias: ["sparul"] },
        { name: "Spreadsheet", mime: "text/x-spreadsheet", mode: "spreadsheet", alias: ["excel", "formula"] },
        { name: "SQL", mime: "text/x-sql", mode: "sql", ext: ["sql"] },
        { name: "SQLite", mime: "text/x-sqlite", mode: "sql" },
        { name: "Squirrel", mime: "text/x-squirrel", mode: "clike", ext: ["nut"] },
        { name: "Stylus", mime: "text/x-styl", mode: "stylus", ext: ["styl"] },
        { name: "Swift", mime: "text/x-swift", mode: "swift", ext: ["swift"] },
        { name: "sTeX", mime: "text/x-stex", mode: "stex" },
        { name: "LaTeX", mime: "text/x-latex", mode: "stex", ext: ["text", "ltx", "tex"], alias: ["tex"] },
        { name: "SystemVerilog", mime: "text/x-systemverilog", mode: "verilog", ext: ["v", "sv", "svh"] },
        { name: "Tcl", mime: "text/x-tcl", mode: "tcl", ext: ["tcl"] },
        { name: "Textile", mime: "text/x-textile", mode: "textile", ext: ["textile"] },
        { name: "TiddlyWiki", mime: "text/x-tiddlywiki", mode: "tiddlywiki" },
        { name: "Tiki wiki", mime: "text/tiki", mode: "tiki" },
        { name: "TOML", mime: "text/x-toml", mode: "toml", ext: ["toml"] },
        { name: "Tornado", mime: "text/x-tornado", mode: "tornado" },
        { name: "troff", mime: "text/troff", mode: "troff", ext: ["1", "2", "3", "4", "5", "6", "7", "8", "9"] },
        { name: "TTCN", mime: "text/x-ttcn", mode: "ttcn", ext: ["ttcn", "ttcn3", "ttcnpp"] },
        { name: "TTCN_CFG", mime: "text/x-ttcn-cfg", mode: "ttcn-cfg", ext: ["cfg"] },
        { name: "Turtle", mime: "text/turtle", mode: "turtle", ext: ["ttl"] },
        { name: "TypeScript", mime: "application/typescript", mode: "javascript", ext: ["ts"], alias: ["ts"] },
        { name: "TypeScript-JSX", mime: "text/typescript-jsx", mode: "jsx", ext: ["tsx"], alias: ["tsx"] },
        { name: "Twig", mime: "text/x-twig", mode: "twig" },
        { name: "Web IDL", mime: "text/x-webidl", mode: "webidl", ext: ["webidl"] },
        { name: "VB.NET", mime: "text/x-vb", mode: "vb", ext: ["vb"] },
        { name: "VBScript", mime: "text/vbscript", mode: "vbscript", ext: ["vbs"] },
        { name: "Velocity", mime: "text/velocity", mode: "velocity", ext: ["vtl"] },
        { name: "Verilog", mime: "text/x-verilog", mode: "verilog", ext: ["v"] },
        { name: "VHDL", mime: "text/x-vhdl", mode: "vhdl", ext: ["vhd", "vhdl"] },
        { name: "Vue.js Component", mimes: ["script/x-vue", "text/x-vue"], mode: "vue", ext: ["vue"] },
        { name: "XML", mimes: ["application/xml", "text/xml"], mode: "xml", ext: ["xml", "xsl", "xsd", "svg"], alias: ["rss", "wsdl", "xsd"] },
        { name: "XQuery", mime: "application/xquery", mode: "xquery", ext: ["xy", "xquery"] },
        { name: "Yacas", mime: "text/x-yacas", mode: "yacas", ext: ["ys"] },
        { name: "YAML", mimes: ["text/x-yaml", "text/yaml"], mode: "yaml", ext: ["yaml", "yml"], alias: ["yml"] },
        { name: "Z80", mime: "text/x-z80", mode: "z80", ext: ["z80"] },
        { name: "mscgen", mime: "text/x-mscgen", mode: "mscgen", ext: ["mscgen", "mscin", "msc"] },
        { name: "xu", mime: "text/x-xu", mode: "mscgen", ext: ["xu"] },
        { name: "msgenny", mime: "text/x-msgenny", mode: "mscgen", ext: ["msgenny"] },
        { name: "WebAssembly", mime: "text/webassembly", mode: "wast", ext: ["wat", "wast"] }
      ];
      for (var i = 0; i < CodeMirror3.modeInfo.length; i++) {
        var info = CodeMirror3.modeInfo[i];
        if (info.mimes)
          info.mime = info.mimes[0];
      }
      CodeMirror3.findModeByMIME = function(mime) {
        mime = mime.toLowerCase();
        for (var i2 = 0; i2 < CodeMirror3.modeInfo.length; i2++) {
          var info2 = CodeMirror3.modeInfo[i2];
          if (info2.mime == mime)
            return info2;
          if (info2.mimes) {
            for (var j = 0; j < info2.mimes.length; j++)
              if (info2.mimes[j] == mime)
                return info2;
          }
        }
        if (/\+xml$/.test(mime))
          return CodeMirror3.findModeByMIME("application/xml");
        if (/\+json$/.test(mime))
          return CodeMirror3.findModeByMIME("application/json");
      };
      CodeMirror3.findModeByExtension = function(ext) {
        ext = ext.toLowerCase();
        for (var i2 = 0; i2 < CodeMirror3.modeInfo.length; i2++) {
          var info2 = CodeMirror3.modeInfo[i2];
          if (info2.ext) {
            for (var j = 0; j < info2.ext.length; j++)
              if (info2.ext[j] == ext)
                return info2;
          }
        }
      };
      CodeMirror3.findModeByFileName = function(filename) {
        for (var i2 = 0; i2 < CodeMirror3.modeInfo.length; i2++) {
          var info2 = CodeMirror3.modeInfo[i2];
          if (info2.file && info2.file.test(filename))
            return info2;
        }
        var dot = filename.lastIndexOf(".");
        var ext = dot > -1 && filename.substring(dot + 1, filename.length);
        if (ext)
          return CodeMirror3.findModeByExtension(ext);
      };
      CodeMirror3.findModeByName = function(name) {
        name = name.toLowerCase();
        for (var i2 = 0; i2 < CodeMirror3.modeInfo.length; i2++) {
          var info2 = CodeMirror3.modeInfo[i2];
          if (info2.name.toLowerCase() == name)
            return info2;
          if (info2.alias) {
            for (var j = 0; j < info2.alias.length; j++)
              if (info2.alias[j].toLowerCase() == name)
                return info2;
          }
        }
      };
    });
  }
});

// node_modules/codemirror/mode/markdown/markdown.js
var require_markdown = __commonJS({
  "node_modules/codemirror/mode/markdown/markdown.js"(exports, module) {
    (function(mod) {
      if (typeof exports == "object" && typeof module == "object")
        mod(require_codemirror(), require_xml(), require_meta());
      else if (typeof define == "function" && define.amd)
        define(["../../lib/codemirror", "../xml/xml", "../meta"], mod);
      else
        mod(CodeMirror);
    })(function(CodeMirror3) {
      "use strict";
      CodeMirror3.defineMode("markdown", function(cmCfg, modeCfg) {
        var htmlMode = CodeMirror3.getMode(cmCfg, "text/html");
        var htmlModeMissing = htmlMode.name == "null";
        function getMode2(name) {
          if (CodeMirror3.findModeByName) {
            var found = CodeMirror3.findModeByName(name);
            if (found)
              name = found.mime || found.mimes[0];
          }
          var mode2 = CodeMirror3.getMode(cmCfg, name);
          return mode2.name == "null" ? null : mode2;
        }
        if (modeCfg.highlightFormatting === void 0)
          modeCfg.highlightFormatting = false;
        if (modeCfg.maxBlockquoteDepth === void 0)
          modeCfg.maxBlockquoteDepth = 0;
        if (modeCfg.taskLists === void 0)
          modeCfg.taskLists = false;
        if (modeCfg.strikethrough === void 0)
          modeCfg.strikethrough = false;
        if (modeCfg.emoji === void 0)
          modeCfg.emoji = false;
        if (modeCfg.fencedCodeBlockHighlighting === void 0)
          modeCfg.fencedCodeBlockHighlighting = true;
        if (modeCfg.fencedCodeBlockDefaultMode === void 0)
          modeCfg.fencedCodeBlockDefaultMode = "text/plain";
        if (modeCfg.xml === void 0)
          modeCfg.xml = true;
        if (modeCfg.tokenTypeOverrides === void 0)
          modeCfg.tokenTypeOverrides = {};
        var tokenTypes = {
          header: "header",
          code: "comment",
          quote: "quote",
          list1: "variable-2",
          list2: "variable-3",
          list3: "keyword",
          hr: "hr",
          image: "image",
          imageAltText: "image-alt-text",
          imageMarker: "image-marker",
          formatting: "formatting",
          linkInline: "link",
          linkEmail: "link",
          linkText: "link",
          linkHref: "string",
          em: "em",
          strong: "strong",
          strikethrough: "strikethrough",
          emoji: "builtin"
        };
        for (var tokenType in tokenTypes) {
          if (tokenTypes.hasOwnProperty(tokenType) && modeCfg.tokenTypeOverrides[tokenType]) {
            tokenTypes[tokenType] = modeCfg.tokenTypeOverrides[tokenType];
          }
        }
        var hrRE = /^([*\-_])(?:\s*\1){2,}\s*$/, listRE = /^(?:[*\-+]|^[0-9]+([.)]))\s+/, taskListRE = /^\[(x| )\](?=\s)/i, atxHeaderRE = modeCfg.allowAtxHeaderWithoutSpace ? /^(#+)/ : /^(#+)(?: |$)/, setextHeaderRE = /^ {0,3}(?:\={1,}|-{2,})\s*$/, textRE = /^[^#!\[\]*_\\<>` "'(~:]+/, fencedCodeRE = /^(~~~+|```+)[ \t]*([\w\/+#-]*)[^\n`]*$/, linkDefRE = /^\s*\[[^\]]+?\]:.*$/, punctuation = /[!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u0AF0\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E42\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC9\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDF3C-\uDF3E]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]/, expandedTab = "    ";
        function switchInline(stream, state, f) {
          state.f = state.inline = f;
          return f(stream, state);
        }
        function switchBlock(stream, state, f) {
          state.f = state.block = f;
          return f(stream, state);
        }
        function lineIsEmpty(line) {
          return !line || !/\S/.test(line.string);
        }
        function blankLine(state) {
          state.linkTitle = false;
          state.linkHref = false;
          state.linkText = false;
          state.em = false;
          state.strong = false;
          state.strikethrough = false;
          state.quote = 0;
          state.indentedCode = false;
          if (state.f == htmlBlock) {
            var exit = htmlModeMissing;
            if (!exit) {
              var inner = CodeMirror3.innerMode(htmlMode, state.htmlState);
              exit = inner.mode.name == "xml" && inner.state.tagStart === null && (!inner.state.context && inner.state.tokenize.isInText);
            }
            if (exit) {
              state.f = inlineNormal;
              state.block = blockNormal;
              state.htmlState = null;
            }
          }
          state.trailingSpace = 0;
          state.trailingSpaceNewLine = false;
          state.prevLine = state.thisLine;
          state.thisLine = { stream: null };
          return null;
        }
        function blockNormal(stream, state) {
          var firstTokenOnLine = stream.column() === state.indentation;
          var prevLineLineIsEmpty = lineIsEmpty(state.prevLine.stream);
          var prevLineIsIndentedCode = state.indentedCode;
          var prevLineIsHr = state.prevLine.hr;
          var prevLineIsList = state.list !== false;
          var maxNonCodeIndentation = (state.listStack[state.listStack.length - 1] || 0) + 3;
          state.indentedCode = false;
          var lineIndentation = state.indentation;
          if (state.indentationDiff === null) {
            state.indentationDiff = state.indentation;
            if (prevLineIsList) {
              state.list = null;
              while (lineIndentation < state.listStack[state.listStack.length - 1]) {
                state.listStack.pop();
                if (state.listStack.length) {
                  state.indentation = state.listStack[state.listStack.length - 1];
                } else {
                  state.list = false;
                }
              }
              if (state.list !== false) {
                state.indentationDiff = lineIndentation - state.listStack[state.listStack.length - 1];
              }
            }
          }
          var allowsInlineContinuation = !prevLineLineIsEmpty && !prevLineIsHr && !state.prevLine.header && (!prevLineIsList || !prevLineIsIndentedCode) && !state.prevLine.fencedCodeEnd;
          var isHr = (state.list === false || prevLineIsHr || prevLineLineIsEmpty) && state.indentation <= maxNonCodeIndentation && stream.match(hrRE);
          var match = null;
          if (state.indentationDiff >= 4 && (prevLineIsIndentedCode || state.prevLine.fencedCodeEnd || state.prevLine.header || prevLineLineIsEmpty)) {
            stream.skipToEnd();
            state.indentedCode = true;
            return tokenTypes.code;
          } else if (stream.eatSpace()) {
            return null;
          } else if (firstTokenOnLine && state.indentation <= maxNonCodeIndentation && (match = stream.match(atxHeaderRE)) && match[1].length <= 6) {
            state.quote = 0;
            state.header = match[1].length;
            state.thisLine.header = true;
            if (modeCfg.highlightFormatting)
              state.formatting = "header";
            state.f = state.inline;
            return getType(state);
          } else if (state.indentation <= maxNonCodeIndentation && stream.eat(">")) {
            state.quote = firstTokenOnLine ? 1 : state.quote + 1;
            if (modeCfg.highlightFormatting)
              state.formatting = "quote";
            stream.eatSpace();
            return getType(state);
          } else if (!isHr && !state.setext && firstTokenOnLine && state.indentation <= maxNonCodeIndentation && (match = stream.match(listRE))) {
            var listType = match[1] ? "ol" : "ul";
            state.indentation = lineIndentation + stream.current().length;
            state.list = true;
            state.quote = 0;
            state.listStack.push(state.indentation);
            state.em = false;
            state.strong = false;
            state.code = false;
            state.strikethrough = false;
            if (modeCfg.taskLists && stream.match(taskListRE, false)) {
              state.taskList = true;
            }
            state.f = state.inline;
            if (modeCfg.highlightFormatting)
              state.formatting = ["list", "list-" + listType];
            return getType(state);
          } else if (firstTokenOnLine && state.indentation <= maxNonCodeIndentation && (match = stream.match(fencedCodeRE, true))) {
            state.quote = 0;
            state.fencedEndRE = new RegExp(match[1] + "+ *$");
            state.localMode = modeCfg.fencedCodeBlockHighlighting && getMode2(match[2] || modeCfg.fencedCodeBlockDefaultMode);
            if (state.localMode)
              state.localState = CodeMirror3.startState(state.localMode);
            state.f = state.block = local;
            if (modeCfg.highlightFormatting)
              state.formatting = "code-block";
            state.code = -1;
            return getType(state);
          } else if (
            // if setext set, indicates line after ---/===
            state.setext || // line before ---/===
            (!allowsInlineContinuation || !prevLineIsList) && !state.quote && state.list === false && !state.code && !isHr && !linkDefRE.test(stream.string) && (match = stream.lookAhead(1)) && (match = match.match(setextHeaderRE))
          ) {
            if (!state.setext) {
              state.header = match[0].charAt(0) == "=" ? 1 : 2;
              state.setext = state.header;
            } else {
              state.header = state.setext;
              state.setext = 0;
              stream.skipToEnd();
              if (modeCfg.highlightFormatting)
                state.formatting = "header";
            }
            state.thisLine.header = true;
            state.f = state.inline;
            return getType(state);
          } else if (isHr) {
            stream.skipToEnd();
            state.hr = true;
            state.thisLine.hr = true;
            return tokenTypes.hr;
          } else if (stream.peek() === "[") {
            return switchInline(stream, state, footnoteLink);
          }
          return switchInline(stream, state, state.inline);
        }
        function htmlBlock(stream, state) {
          var style = htmlMode.token(stream, state.htmlState);
          if (!htmlModeMissing) {
            var inner = CodeMirror3.innerMode(htmlMode, state.htmlState);
            if (inner.mode.name == "xml" && inner.state.tagStart === null && (!inner.state.context && inner.state.tokenize.isInText) || state.md_inside && stream.current().indexOf(">") > -1) {
              state.f = inlineNormal;
              state.block = blockNormal;
              state.htmlState = null;
            }
          }
          return style;
        }
        function local(stream, state) {
          var currListInd = state.listStack[state.listStack.length - 1] || 0;
          var hasExitedList = state.indentation < currListInd;
          var maxFencedEndInd = currListInd + 3;
          if (state.fencedEndRE && state.indentation <= maxFencedEndInd && (hasExitedList || stream.match(state.fencedEndRE))) {
            if (modeCfg.highlightFormatting)
              state.formatting = "code-block";
            var returnType;
            if (!hasExitedList)
              returnType = getType(state);
            state.localMode = state.localState = null;
            state.block = blockNormal;
            state.f = inlineNormal;
            state.fencedEndRE = null;
            state.code = 0;
            state.thisLine.fencedCodeEnd = true;
            if (hasExitedList)
              return switchBlock(stream, state, state.block);
            return returnType;
          } else if (state.localMode) {
            return state.localMode.token(stream, state.localState);
          } else {
            stream.skipToEnd();
            return tokenTypes.code;
          }
        }
        function getType(state) {
          var styles = [];
          if (state.formatting) {
            styles.push(tokenTypes.formatting);
            if (typeof state.formatting === "string")
              state.formatting = [state.formatting];
            for (var i = 0; i < state.formatting.length; i++) {
              styles.push(tokenTypes.formatting + "-" + state.formatting[i]);
              if (state.formatting[i] === "header") {
                styles.push(tokenTypes.formatting + "-" + state.formatting[i] + "-" + state.header);
              }
              if (state.formatting[i] === "quote") {
                if (!modeCfg.maxBlockquoteDepth || modeCfg.maxBlockquoteDepth >= state.quote) {
                  styles.push(tokenTypes.formatting + "-" + state.formatting[i] + "-" + state.quote);
                } else {
                  styles.push("error");
                }
              }
            }
          }
          if (state.taskOpen) {
            styles.push("meta");
            return styles.length ? styles.join(" ") : null;
          }
          if (state.taskClosed) {
            styles.push("property");
            return styles.length ? styles.join(" ") : null;
          }
          if (state.linkHref) {
            styles.push(tokenTypes.linkHref, "url");
          } else {
            if (state.strong) {
              styles.push(tokenTypes.strong);
            }
            if (state.em) {
              styles.push(tokenTypes.em);
            }
            if (state.strikethrough) {
              styles.push(tokenTypes.strikethrough);
            }
            if (state.emoji) {
              styles.push(tokenTypes.emoji);
            }
            if (state.linkText) {
              styles.push(tokenTypes.linkText);
            }
            if (state.code) {
              styles.push(tokenTypes.code);
            }
            if (state.image) {
              styles.push(tokenTypes.image);
            }
            if (state.imageAltText) {
              styles.push(tokenTypes.imageAltText, "link");
            }
            if (state.imageMarker) {
              styles.push(tokenTypes.imageMarker);
            }
          }
          if (state.header) {
            styles.push(tokenTypes.header, tokenTypes.header + "-" + state.header);
          }
          if (state.quote) {
            styles.push(tokenTypes.quote);
            if (!modeCfg.maxBlockquoteDepth || modeCfg.maxBlockquoteDepth >= state.quote) {
              styles.push(tokenTypes.quote + "-" + state.quote);
            } else {
              styles.push(tokenTypes.quote + "-" + modeCfg.maxBlockquoteDepth);
            }
          }
          if (state.list !== false) {
            var listMod = (state.listStack.length - 1) % 3;
            if (!listMod) {
              styles.push(tokenTypes.list1);
            } else if (listMod === 1) {
              styles.push(tokenTypes.list2);
            } else {
              styles.push(tokenTypes.list3);
            }
          }
          if (state.trailingSpaceNewLine) {
            styles.push("trailing-space-new-line");
          } else if (state.trailingSpace) {
            styles.push("trailing-space-" + (state.trailingSpace % 2 ? "a" : "b"));
          }
          return styles.length ? styles.join(" ") : null;
        }
        function handleText(stream, state) {
          if (stream.match(textRE, true)) {
            return getType(state);
          }
          return void 0;
        }
        function inlineNormal(stream, state) {
          var style = state.text(stream, state);
          if (typeof style !== "undefined")
            return style;
          if (state.list) {
            state.list = null;
            return getType(state);
          }
          if (state.taskList) {
            var taskOpen = stream.match(taskListRE, true)[1] === " ";
            if (taskOpen)
              state.taskOpen = true;
            else
              state.taskClosed = true;
            if (modeCfg.highlightFormatting)
              state.formatting = "task";
            state.taskList = false;
            return getType(state);
          }
          state.taskOpen = false;
          state.taskClosed = false;
          if (state.header && stream.match(/^#+$/, true)) {
            if (modeCfg.highlightFormatting)
              state.formatting = "header";
            return getType(state);
          }
          var ch = stream.next();
          if (state.linkTitle) {
            state.linkTitle = false;
            var matchCh = ch;
            if (ch === "(") {
              matchCh = ")";
            }
            matchCh = (matchCh + "").replace(/([.?*+^\[\]\\(){}|-])/g, "\\$1");
            var regex = "^\\s*(?:[^" + matchCh + "\\\\]+|\\\\\\\\|\\\\.)" + matchCh;
            if (stream.match(new RegExp(regex), true)) {
              return tokenTypes.linkHref;
            }
          }
          if (ch === "`") {
            var previousFormatting = state.formatting;
            if (modeCfg.highlightFormatting)
              state.formatting = "code";
            stream.eatWhile("`");
            var count = stream.current().length;
            if (state.code == 0 && (!state.quote || count == 1)) {
              state.code = count;
              return getType(state);
            } else if (count == state.code) {
              var t = getType(state);
              state.code = 0;
              return t;
            } else {
              state.formatting = previousFormatting;
              return getType(state);
            }
          } else if (state.code) {
            return getType(state);
          }
          if (ch === "\\") {
            stream.next();
            if (modeCfg.highlightFormatting) {
              var type = getType(state);
              var formattingEscape = tokenTypes.formatting + "-escape";
              return type ? type + " " + formattingEscape : formattingEscape;
            }
          }
          if (ch === "!" && stream.match(/\[[^\]]*\] ?(?:\(|\[)/, false)) {
            state.imageMarker = true;
            state.image = true;
            if (modeCfg.highlightFormatting)
              state.formatting = "image";
            return getType(state);
          }
          if (ch === "[" && state.imageMarker && stream.match(/[^\]]*\](\(.*?\)| ?\[.*?\])/, false)) {
            state.imageMarker = false;
            state.imageAltText = true;
            if (modeCfg.highlightFormatting)
              state.formatting = "image";
            return getType(state);
          }
          if (ch === "]" && state.imageAltText) {
            if (modeCfg.highlightFormatting)
              state.formatting = "image";
            var type = getType(state);
            state.imageAltText = false;
            state.image = false;
            state.inline = state.f = linkHref;
            return type;
          }
          if (ch === "[" && !state.image) {
            if (state.linkText && stream.match(/^.*?\]/))
              return getType(state);
            state.linkText = true;
            if (modeCfg.highlightFormatting)
              state.formatting = "link";
            return getType(state);
          }
          if (ch === "]" && state.linkText) {
            if (modeCfg.highlightFormatting)
              state.formatting = "link";
            var type = getType(state);
            state.linkText = false;
            state.inline = state.f = stream.match(/\(.*?\)| ?\[.*?\]/, false) ? linkHref : inlineNormal;
            return type;
          }
          if (ch === "<" && stream.match(/^(https?|ftps?):\/\/(?:[^\\>]|\\.)+>/, false)) {
            state.f = state.inline = linkInline;
            if (modeCfg.highlightFormatting)
              state.formatting = "link";
            var type = getType(state);
            if (type) {
              type += " ";
            } else {
              type = "";
            }
            return type + tokenTypes.linkInline;
          }
          if (ch === "<" && stream.match(/^[^> \\]+@(?:[^\\>]|\\.)+>/, false)) {
            state.f = state.inline = linkInline;
            if (modeCfg.highlightFormatting)
              state.formatting = "link";
            var type = getType(state);
            if (type) {
              type += " ";
            } else {
              type = "";
            }
            return type + tokenTypes.linkEmail;
          }
          if (modeCfg.xml && ch === "<" && stream.match(/^(!--|\?|!\[CDATA\[|[a-z][a-z0-9-]*(?:\s+[a-z_:.\-]+(?:\s*=\s*[^>]+)?)*\s*(?:>|$))/i, false)) {
            var end = stream.string.indexOf(">", stream.pos);
            if (end != -1) {
              var atts = stream.string.substring(stream.start, end);
              if (/markdown\s*=\s*('|"){0,1}1('|"){0,1}/.test(atts))
                state.md_inside = true;
            }
            stream.backUp(1);
            state.htmlState = CodeMirror3.startState(htmlMode);
            return switchBlock(stream, state, htmlBlock);
          }
          if (modeCfg.xml && ch === "<" && stream.match(/^\/\w*?>/)) {
            state.md_inside = false;
            return "tag";
          } else if (ch === "*" || ch === "_") {
            var len = 1, before = stream.pos == 1 ? " " : stream.string.charAt(stream.pos - 2);
            while (len < 3 && stream.eat(ch))
              len++;
            var after = stream.peek() || " ";
            var leftFlanking = !/\s/.test(after) && (!punctuation.test(after) || /\s/.test(before) || punctuation.test(before));
            var rightFlanking = !/\s/.test(before) && (!punctuation.test(before) || /\s/.test(after) || punctuation.test(after));
            var setEm = null, setStrong = null;
            if (len % 2) {
              if (!state.em && leftFlanking && (ch === "*" || !rightFlanking || punctuation.test(before)))
                setEm = true;
              else if (state.em == ch && rightFlanking && (ch === "*" || !leftFlanking || punctuation.test(after)))
                setEm = false;
            }
            if (len > 1) {
              if (!state.strong && leftFlanking && (ch === "*" || !rightFlanking || punctuation.test(before)))
                setStrong = true;
              else if (state.strong == ch && rightFlanking && (ch === "*" || !leftFlanking || punctuation.test(after)))
                setStrong = false;
            }
            if (setStrong != null || setEm != null) {
              if (modeCfg.highlightFormatting)
                state.formatting = setEm == null ? "strong" : setStrong == null ? "em" : "strong em";
              if (setEm === true)
                state.em = ch;
              if (setStrong === true)
                state.strong = ch;
              var t = getType(state);
              if (setEm === false)
                state.em = false;
              if (setStrong === false)
                state.strong = false;
              return t;
            }
          } else if (ch === " ") {
            if (stream.eat("*") || stream.eat("_")) {
              if (stream.peek() === " ") {
                return getType(state);
              } else {
                stream.backUp(1);
              }
            }
          }
          if (modeCfg.strikethrough) {
            if (ch === "~" && stream.eatWhile(ch)) {
              if (state.strikethrough) {
                if (modeCfg.highlightFormatting)
                  state.formatting = "strikethrough";
                var t = getType(state);
                state.strikethrough = false;
                return t;
              } else if (stream.match(/^[^\s]/, false)) {
                state.strikethrough = true;
                if (modeCfg.highlightFormatting)
                  state.formatting = "strikethrough";
                return getType(state);
              }
            } else if (ch === " ") {
              if (stream.match("~~", true)) {
                if (stream.peek() === " ") {
                  return getType(state);
                } else {
                  stream.backUp(2);
                }
              }
            }
          }
          if (modeCfg.emoji && ch === ":" && stream.match(/^(?:[a-z_\d+][a-z_\d+-]*|\-[a-z_\d+][a-z_\d+-]*):/)) {
            state.emoji = true;
            if (modeCfg.highlightFormatting)
              state.formatting = "emoji";
            var retType = getType(state);
            state.emoji = false;
            return retType;
          }
          if (ch === " ") {
            if (stream.match(/^ +$/, false)) {
              state.trailingSpace++;
            } else if (state.trailingSpace) {
              state.trailingSpaceNewLine = true;
            }
          }
          return getType(state);
        }
        function linkInline(stream, state) {
          var ch = stream.next();
          if (ch === ">") {
            state.f = state.inline = inlineNormal;
            if (modeCfg.highlightFormatting)
              state.formatting = "link";
            var type = getType(state);
            if (type) {
              type += " ";
            } else {
              type = "";
            }
            return type + tokenTypes.linkInline;
          }
          stream.match(/^[^>]+/, true);
          return tokenTypes.linkInline;
        }
        function linkHref(stream, state) {
          if (stream.eatSpace()) {
            return null;
          }
          var ch = stream.next();
          if (ch === "(" || ch === "[") {
            state.f = state.inline = getLinkHrefInside(ch === "(" ? ")" : "]");
            if (modeCfg.highlightFormatting)
              state.formatting = "link-string";
            state.linkHref = true;
            return getType(state);
          }
          return "error";
        }
        var linkRE = {
          ")": /^(?:[^\\\(\)]|\\.|\((?:[^\\\(\)]|\\.)*\))*?(?=\))/,
          "]": /^(?:[^\\\[\]]|\\.|\[(?:[^\\\[\]]|\\.)*\])*?(?=\])/
        };
        function getLinkHrefInside(endChar) {
          return function(stream, state) {
            var ch = stream.next();
            if (ch === endChar) {
              state.f = state.inline = inlineNormal;
              if (modeCfg.highlightFormatting)
                state.formatting = "link-string";
              var returnState = getType(state);
              state.linkHref = false;
              return returnState;
            }
            stream.match(linkRE[endChar]);
            state.linkHref = true;
            return getType(state);
          };
        }
        function footnoteLink(stream, state) {
          if (stream.match(/^([^\]\\]|\\.)*\]:/, false)) {
            state.f = footnoteLinkInside;
            stream.next();
            if (modeCfg.highlightFormatting)
              state.formatting = "link";
            state.linkText = true;
            return getType(state);
          }
          return switchInline(stream, state, inlineNormal);
        }
        function footnoteLinkInside(stream, state) {
          if (stream.match("]:", true)) {
            state.f = state.inline = footnoteUrl;
            if (modeCfg.highlightFormatting)
              state.formatting = "link";
            var returnType = getType(state);
            state.linkText = false;
            return returnType;
          }
          stream.match(/^([^\]\\]|\\.)+/, true);
          return tokenTypes.linkText;
        }
        function footnoteUrl(stream, state) {
          if (stream.eatSpace()) {
            return null;
          }
          stream.match(/^[^\s]+/, true);
          if (stream.peek() === void 0) {
            state.linkTitle = true;
          } else {
            stream.match(/^(?:\s+(?:"(?:[^"\\]|\\.)+"|'(?:[^'\\]|\\.)+'|\((?:[^)\\]|\\.)+\)))?/, true);
          }
          state.f = state.inline = inlineNormal;
          return tokenTypes.linkHref + " url";
        }
        var mode = {
          startState: function() {
            return {
              f: blockNormal,
              prevLine: { stream: null },
              thisLine: { stream: null },
              block: blockNormal,
              htmlState: null,
              indentation: 0,
              inline: inlineNormal,
              text: handleText,
              formatting: false,
              linkText: false,
              linkHref: false,
              linkTitle: false,
              code: 0,
              em: false,
              strong: false,
              header: 0,
              setext: 0,
              hr: false,
              taskList: false,
              list: false,
              listStack: [],
              quote: 0,
              trailingSpace: 0,
              trailingSpaceNewLine: false,
              strikethrough: false,
              emoji: false,
              fencedEndRE: null
            };
          },
          copyState: function(s) {
            return {
              f: s.f,
              prevLine: s.prevLine,
              thisLine: s.thisLine,
              block: s.block,
              htmlState: s.htmlState && CodeMirror3.copyState(htmlMode, s.htmlState),
              indentation: s.indentation,
              localMode: s.localMode,
              localState: s.localMode ? CodeMirror3.copyState(s.localMode, s.localState) : null,
              inline: s.inline,
              text: s.text,
              formatting: false,
              linkText: s.linkText,
              linkTitle: s.linkTitle,
              linkHref: s.linkHref,
              code: s.code,
              em: s.em,
              strong: s.strong,
              strikethrough: s.strikethrough,
              emoji: s.emoji,
              header: s.header,
              setext: s.setext,
              hr: s.hr,
              taskList: s.taskList,
              list: s.list,
              listStack: s.listStack.slice(0),
              quote: s.quote,
              indentedCode: s.indentedCode,
              trailingSpace: s.trailingSpace,
              trailingSpaceNewLine: s.trailingSpaceNewLine,
              md_inside: s.md_inside,
              fencedEndRE: s.fencedEndRE
            };
          },
          token: function(stream, state) {
            state.formatting = false;
            if (stream != state.thisLine.stream) {
              state.header = 0;
              state.hr = false;
              if (stream.match(/^\s*$/, true)) {
                blankLine(state);
                return null;
              }
              state.prevLine = state.thisLine;
              state.thisLine = { stream };
              state.taskList = false;
              state.trailingSpace = 0;
              state.trailingSpaceNewLine = false;
              if (!state.localState) {
                state.f = state.block;
                if (state.f != htmlBlock) {
                  var indentation = stream.match(/^\s*/, true)[0].replace(/\t/g, expandedTab).length;
                  state.indentation = indentation;
                  state.indentationDiff = null;
                  if (indentation > 0)
                    return null;
                }
              }
            }
            return state.f(stream, state);
          },
          innerMode: function(state) {
            if (state.block == htmlBlock)
              return { state: state.htmlState, mode: htmlMode };
            if (state.localState)
              return { state: state.localState, mode: state.localMode };
            return { state, mode };
          },
          indent: function(state, textAfter, line) {
            if (state.block == htmlBlock && htmlMode.indent)
              return htmlMode.indent(state.htmlState, textAfter, line);
            if (state.localState && state.localMode.indent)
              return state.localMode.indent(state.localState, textAfter, line);
            return CodeMirror3.Pass;
          },
          blankLine,
          getType,
          blockCommentStart: "<!--",
          blockCommentEnd: "-->",
          closeBrackets: "()[]{}''\"\"``",
          fold: "markdown"
        };
        return mode;
      }, "xml");
      CodeMirror3.defineMIME("text/markdown", "markdown");
      CodeMirror3.defineMIME("text/x-markdown", "markdown");
    });
  }
});

// node_modules/codemirror/mode/mllike/mllike.js
var require_mllike = __commonJS({
  "node_modules/codemirror/mode/mllike/mllike.js"(exports, module) {
    (function(mod) {
      if (typeof exports == "object" && typeof module == "object")
        mod(require_codemirror());
      else if (typeof define == "function" && define.amd)
        define(["../../lib/codemirror"], mod);
      else
        mod(CodeMirror);
    })(function(CodeMirror3) {
      "use strict";
      CodeMirror3.defineMode("mllike", function(_config, parserConfig) {
        var words = {
          "as": "keyword",
          "do": "keyword",
          "else": "keyword",
          "end": "keyword",
          "exception": "keyword",
          "fun": "keyword",
          "functor": "keyword",
          "if": "keyword",
          "in": "keyword",
          "include": "keyword",
          "let": "keyword",
          "of": "keyword",
          "open": "keyword",
          "rec": "keyword",
          "struct": "keyword",
          "then": "keyword",
          "type": "keyword",
          "val": "keyword",
          "while": "keyword",
          "with": "keyword"
        };
        var extraWords = parserConfig.extraWords || {};
        for (var prop in extraWords) {
          if (extraWords.hasOwnProperty(prop)) {
            words[prop] = parserConfig.extraWords[prop];
          }
        }
        var hintWords = [];
        for (var k in words) {
          hintWords.push(k);
        }
        CodeMirror3.registerHelper("hintWords", "mllike", hintWords);
        function tokenBase(stream, state) {
          var ch = stream.next();
          if (ch === '"') {
            state.tokenize = tokenString;
            return state.tokenize(stream, state);
          }
          if (ch === "{") {
            if (stream.eat("|")) {
              state.longString = true;
              state.tokenize = tokenLongString;
              return state.tokenize(stream, state);
            }
          }
          if (ch === "(") {
            if (stream.match(/^\*(?!\))/)) {
              state.commentLevel++;
              state.tokenize = tokenComment;
              return state.tokenize(stream, state);
            }
          }
          if (ch === "~" || ch === "?") {
            stream.eatWhile(/\w/);
            return "variable-2";
          }
          if (ch === "`") {
            stream.eatWhile(/\w/);
            return "quote";
          }
          if (ch === "/" && parserConfig.slashComments && stream.eat("/")) {
            stream.skipToEnd();
            return "comment";
          }
          if (/\d/.test(ch)) {
            if (ch === "0" && stream.eat(/[bB]/)) {
              stream.eatWhile(/[01]/);
            }
            if (ch === "0" && stream.eat(/[xX]/)) {
              stream.eatWhile(/[0-9a-fA-F]/);
            }
            if (ch === "0" && stream.eat(/[oO]/)) {
              stream.eatWhile(/[0-7]/);
            } else {
              stream.eatWhile(/[\d_]/);
              if (stream.eat(".")) {
                stream.eatWhile(/[\d]/);
              }
              if (stream.eat(/[eE]/)) {
                stream.eatWhile(/[\d\-+]/);
              }
            }
            return "number";
          }
          if (/[+\-*&%=<>!?|@\.~:]/.test(ch)) {
            return "operator";
          }
          if (/[\w\xa1-\uffff]/.test(ch)) {
            stream.eatWhile(/[\w\xa1-\uffff]/);
            var cur = stream.current();
            return words.hasOwnProperty(cur) ? words[cur] : "variable";
          }
          return null;
        }
        function tokenString(stream, state) {
          var next, end = false, escaped = false;
          while ((next = stream.next()) != null) {
            if (next === '"' && !escaped) {
              end = true;
              break;
            }
            escaped = !escaped && next === "\\";
          }
          if (end && !escaped) {
            state.tokenize = tokenBase;
          }
          return "string";
        }
        ;
        function tokenComment(stream, state) {
          var prev, next;
          while (state.commentLevel > 0 && (next = stream.next()) != null) {
            if (prev === "(" && next === "*")
              state.commentLevel++;
            if (prev === "*" && next === ")")
              state.commentLevel--;
            prev = next;
          }
          if (state.commentLevel <= 0) {
            state.tokenize = tokenBase;
          }
          return "comment";
        }
        function tokenLongString(stream, state) {
          var prev, next;
          while (state.longString && (next = stream.next()) != null) {
            if (prev === "|" && next === "}")
              state.longString = false;
            prev = next;
          }
          if (!state.longString) {
            state.tokenize = tokenBase;
          }
          return "string";
        }
        return {
          startState: function() {
            return { tokenize: tokenBase, commentLevel: 0, longString: false };
          },
          token: function(stream, state) {
            if (stream.eatSpace())
              return null;
            return state.tokenize(stream, state);
          },
          blockCommentStart: "(*",
          blockCommentEnd: "*)",
          lineComment: parserConfig.slashComments ? "//" : null
        };
      });
      CodeMirror3.defineMIME("text/x-ocaml", {
        name: "mllike",
        extraWords: {
          "and": "keyword",
          "assert": "keyword",
          "begin": "keyword",
          "class": "keyword",
          "constraint": "keyword",
          "done": "keyword",
          "downto": "keyword",
          "external": "keyword",
          "function": "keyword",
          "initializer": "keyword",
          "lazy": "keyword",
          "match": "keyword",
          "method": "keyword",
          "module": "keyword",
          "mutable": "keyword",
          "new": "keyword",
          "nonrec": "keyword",
          "object": "keyword",
          "private": "keyword",
          "sig": "keyword",
          "to": "keyword",
          "try": "keyword",
          "value": "keyword",
          "virtual": "keyword",
          "when": "keyword",
          // builtins
          "raise": "builtin",
          "failwith": "builtin",
          "true": "builtin",
          "false": "builtin",
          // Pervasives builtins
          "asr": "builtin",
          "land": "builtin",
          "lor": "builtin",
          "lsl": "builtin",
          "lsr": "builtin",
          "lxor": "builtin",
          "mod": "builtin",
          "or": "builtin",
          // More Pervasives
          "raise_notrace": "builtin",
          "trace": "builtin",
          "exit": "builtin",
          "print_string": "builtin",
          "print_endline": "builtin",
          "int": "type",
          "float": "type",
          "bool": "type",
          "char": "type",
          "string": "type",
          "unit": "type",
          // Modules
          "List": "builtin"
        }
      });
      CodeMirror3.defineMIME("text/x-fsharp", {
        name: "mllike",
        extraWords: {
          "abstract": "keyword",
          "assert": "keyword",
          "base": "keyword",
          "begin": "keyword",
          "class": "keyword",
          "default": "keyword",
          "delegate": "keyword",
          "do!": "keyword",
          "done": "keyword",
          "downcast": "keyword",
          "downto": "keyword",
          "elif": "keyword",
          "extern": "keyword",
          "finally": "keyword",
          "for": "keyword",
          "function": "keyword",
          "global": "keyword",
          "inherit": "keyword",
          "inline": "keyword",
          "interface": "keyword",
          "internal": "keyword",
          "lazy": "keyword",
          "let!": "keyword",
          "match": "keyword",
          "member": "keyword",
          "module": "keyword",
          "mutable": "keyword",
          "namespace": "keyword",
          "new": "keyword",
          "null": "keyword",
          "override": "keyword",
          "private": "keyword",
          "public": "keyword",
          "return!": "keyword",
          "return": "keyword",
          "select": "keyword",
          "static": "keyword",
          "to": "keyword",
          "try": "keyword",
          "upcast": "keyword",
          "use!": "keyword",
          "use": "keyword",
          "void": "keyword",
          "when": "keyword",
          "yield!": "keyword",
          "yield": "keyword",
          // Reserved words
          "atomic": "keyword",
          "break": "keyword",
          "checked": "keyword",
          "component": "keyword",
          "const": "keyword",
          "constraint": "keyword",
          "constructor": "keyword",
          "continue": "keyword",
          "eager": "keyword",
          "event": "keyword",
          "external": "keyword",
          "fixed": "keyword",
          "method": "keyword",
          "mixin": "keyword",
          "object": "keyword",
          "parallel": "keyword",
          "process": "keyword",
          "protected": "keyword",
          "pure": "keyword",
          "sealed": "keyword",
          "tailcall": "keyword",
          "trait": "keyword",
          "virtual": "keyword",
          "volatile": "keyword",
          // builtins
          "List": "builtin",
          "Seq": "builtin",
          "Map": "builtin",
          "Set": "builtin",
          "Option": "builtin",
          "int": "builtin",
          "string": "builtin",
          "not": "builtin",
          "true": "builtin",
          "false": "builtin",
          "raise": "builtin",
          "failwith": "builtin"
        },
        slashComments: true
      });
      CodeMirror3.defineMIME("text/x-sml", {
        name: "mllike",
        extraWords: {
          "abstype": "keyword",
          "and": "keyword",
          "andalso": "keyword",
          "case": "keyword",
          "datatype": "keyword",
          "fn": "keyword",
          "handle": "keyword",
          "infix": "keyword",
          "infixr": "keyword",
          "local": "keyword",
          "nonfix": "keyword",
          "op": "keyword",
          "orelse": "keyword",
          "raise": "keyword",
          "withtype": "keyword",
          "eqtype": "keyword",
          "sharing": "keyword",
          "sig": "keyword",
          "signature": "keyword",
          "structure": "keyword",
          "where": "keyword",
          "true": "keyword",
          "false": "keyword",
          // types
          "int": "builtin",
          "real": "builtin",
          "string": "builtin",
          "char": "builtin",
          "bool": "builtin"
        },
        slashComments: true
      });
    });
  }
});

// node_modules/codemirror/mode/nginx/nginx.js
var require_nginx = __commonJS({
  "node_modules/codemirror/mode/nginx/nginx.js"(exports, module) {
    (function(mod) {
      if (typeof exports == "object" && typeof module == "object")
        mod(require_codemirror());
      else if (typeof define == "function" && define.amd)
        define(["../../lib/codemirror"], mod);
      else
        mod(CodeMirror);
    })(function(CodeMirror3) {
      "use strict";
      CodeMirror3.defineMode("nginx", function(config) {
        function words(str) {
          var obj = {}, words2 = str.split(" ");
          for (var i = 0; i < words2.length; ++i)
            obj[words2[i]] = true;
          return obj;
        }
        var keywords = words(
          /* ngxDirectiveControl */
          "break return rewrite set accept_mutex accept_mutex_delay access_log add_after_body add_before_body add_header addition_types aio alias allow ancient_browser ancient_browser_value auth_basic auth_basic_user_file auth_http auth_http_header auth_http_timeout autoindex autoindex_exact_size autoindex_localtime charset charset_types client_body_buffer_size client_body_in_file_only client_body_in_single_buffer client_body_temp_path client_body_timeout client_header_buffer_size client_header_timeout client_max_body_size connection_pool_size create_full_put_path daemon dav_access dav_methods debug_connection debug_points default_type degradation degrade deny devpoll_changes devpoll_events directio directio_alignment empty_gif env epoll_events error_log eventport_events expires fastcgi_bind fastcgi_buffer_size fastcgi_buffers fastcgi_busy_buffers_size fastcgi_cache fastcgi_cache_key fastcgi_cache_methods fastcgi_cache_min_uses fastcgi_cache_path fastcgi_cache_use_stale fastcgi_cache_valid fastcgi_catch_stderr fastcgi_connect_timeout fastcgi_hide_header fastcgi_ignore_client_abort fastcgi_ignore_headers fastcgi_index fastcgi_intercept_errors fastcgi_max_temp_file_size fastcgi_next_upstream fastcgi_param fastcgi_pass_header fastcgi_pass_request_body fastcgi_pass_request_headers fastcgi_read_timeout fastcgi_send_lowat fastcgi_send_timeout fastcgi_split_path_info fastcgi_store fastcgi_store_access fastcgi_temp_file_write_size fastcgi_temp_path fastcgi_upstream_fail_timeout fastcgi_upstream_max_fails flv geoip_city geoip_country google_perftools_profiles gzip gzip_buffers gzip_comp_level gzip_disable gzip_hash gzip_http_version gzip_min_length gzip_no_buffer gzip_proxied gzip_static gzip_types gzip_vary gzip_window if_modified_since ignore_invalid_headers image_filter image_filter_buffer image_filter_jpeg_quality image_filter_transparency imap_auth imap_capabilities imap_client_buffer index ip_hash keepalive_requests keepalive_timeout kqueue_changes kqueue_events large_client_header_buffers limit_conn limit_conn_log_level limit_rate limit_rate_after limit_req limit_req_log_level limit_req_zone limit_zone lingering_time lingering_timeout lock_file log_format log_not_found log_subrequest map_hash_bucket_size map_hash_max_size master_process memcached_bind memcached_buffer_size memcached_connect_timeout memcached_next_upstream memcached_read_timeout memcached_send_timeout memcached_upstream_fail_timeout memcached_upstream_max_fails merge_slashes min_delete_depth modern_browser modern_browser_value msie_padding msie_refresh multi_accept open_file_cache open_file_cache_errors open_file_cache_events open_file_cache_min_uses open_file_cache_valid open_log_file_cache output_buffers override_charset perl perl_modules perl_require perl_set pid pop3_auth pop3_capabilities port_in_redirect postpone_gzipping postpone_output protocol proxy proxy_bind proxy_buffer proxy_buffer_size proxy_buffering proxy_buffers proxy_busy_buffers_size proxy_cache proxy_cache_key proxy_cache_methods proxy_cache_min_uses proxy_cache_path proxy_cache_use_stale proxy_cache_valid proxy_connect_timeout proxy_headers_hash_bucket_size proxy_headers_hash_max_size proxy_hide_header proxy_ignore_client_abort proxy_ignore_headers proxy_intercept_errors proxy_max_temp_file_size proxy_method proxy_next_upstream proxy_pass_error_message proxy_pass_header proxy_pass_request_body proxy_pass_request_headers proxy_read_timeout proxy_redirect proxy_send_lowat proxy_send_timeout proxy_set_body proxy_set_header proxy_ssl_session_reuse proxy_store proxy_store_access proxy_temp_file_write_size proxy_temp_path proxy_timeout proxy_upstream_fail_timeout proxy_upstream_max_fails random_index read_ahead real_ip_header recursive_error_pages request_pool_size reset_timedout_connection resolver resolver_timeout rewrite_log rtsig_overflow_events rtsig_overflow_test rtsig_overflow_threshold rtsig_signo satisfy secure_link_secret send_lowat send_timeout sendfile sendfile_max_chunk server_name_in_redirect server_names_hash_bucket_size server_names_hash_max_size server_tokens set_real_ip_from smtp_auth smtp_capabilities smtp_client_buffer smtp_greeting_delay so_keepalive source_charset ssi ssi_ignore_recycled_buffers ssi_min_file_chunk ssi_silent_errors ssi_types ssi_value_length ssl ssl_certificate ssl_certificate_key ssl_ciphers ssl_client_certificate ssl_crl ssl_dhparam ssl_engine ssl_prefer_server_ciphers ssl_protocols ssl_session_cache ssl_session_timeout ssl_verify_client ssl_verify_depth starttls stub_status sub_filter sub_filter_once sub_filter_types tcp_nodelay tcp_nopush thread_stack_size timeout timer_resolution types_hash_bucket_size types_hash_max_size underscores_in_headers uninitialized_variable_warn use user userid userid_domain userid_expires userid_mark userid_name userid_p3p userid_path userid_service valid_referers variables_hash_bucket_size variables_hash_max_size worker_connections worker_cpu_affinity worker_priority worker_processes worker_rlimit_core worker_rlimit_nofile worker_rlimit_sigpending worker_threads working_directory xclient xml_entities xslt_stylesheet xslt_typesdrew@li229-23"
        );
        var keywords_block = words(
          /* ngxDirectiveBlock */
          "http mail events server types location upstream charset_map limit_except if geo map"
        );
        var keywords_important = words(
          /* ngxDirectiveImportant */
          "include root server server_name listen internal proxy_pass memcached_pass fastcgi_pass try_files"
        );
        var indentUnit = config.indentUnit, type;
        function ret(style, tp) {
          type = tp;
          return style;
        }
        function tokenBase(stream, state) {
          stream.eatWhile(/[\w\$_]/);
          var cur = stream.current();
          if (keywords.propertyIsEnumerable(cur)) {
            return "keyword";
          } else if (keywords_block.propertyIsEnumerable(cur)) {
            return "variable-2";
          } else if (keywords_important.propertyIsEnumerable(cur)) {
            return "string-2";
          }
          var ch = stream.next();
          if (ch == "@") {
            stream.eatWhile(/[\w\\\-]/);
            return ret("meta", stream.current());
          } else if (ch == "/" && stream.eat("*")) {
            state.tokenize = tokenCComment;
            return tokenCComment(stream, state);
          } else if (ch == "<" && stream.eat("!")) {
            state.tokenize = tokenSGMLComment;
            return tokenSGMLComment(stream, state);
          } else if (ch == "=")
            ret(null, "compare");
          else if ((ch == "~" || ch == "|") && stream.eat("="))
            return ret(null, "compare");
          else if (ch == '"' || ch == "'") {
            state.tokenize = tokenString(ch);
            return state.tokenize(stream, state);
          } else if (ch == "#") {
            stream.skipToEnd();
            return ret("comment", "comment");
          } else if (ch == "!") {
            stream.match(/^\s*\w*/);
            return ret("keyword", "important");
          } else if (/\d/.test(ch)) {
            stream.eatWhile(/[\w.%]/);
            return ret("number", "unit");
          } else if (/[,.+>*\/]/.test(ch)) {
            return ret(null, "select-op");
          } else if (/[;{}:\[\]]/.test(ch)) {
            return ret(null, ch);
          } else {
            stream.eatWhile(/[\w\\\-]/);
            return ret("variable", "variable");
          }
        }
        function tokenCComment(stream, state) {
          var maybeEnd = false, ch;
          while ((ch = stream.next()) != null) {
            if (maybeEnd && ch == "/") {
              state.tokenize = tokenBase;
              break;
            }
            maybeEnd = ch == "*";
          }
          return ret("comment", "comment");
        }
        function tokenSGMLComment(stream, state) {
          var dashes = 0, ch;
          while ((ch = stream.next()) != null) {
            if (dashes >= 2 && ch == ">") {
              state.tokenize = tokenBase;
              break;
            }
            dashes = ch == "-" ? dashes + 1 : 0;
          }
          return ret("comment", "comment");
        }
        function tokenString(quote) {
          return function(stream, state) {
            var escaped = false, ch;
            while ((ch = stream.next()) != null) {
              if (ch == quote && !escaped)
                break;
              escaped = !escaped && ch == "\\";
            }
            if (!escaped)
              state.tokenize = tokenBase;
            return ret("string", "string");
          };
        }
        return {
          startState: function(base) {
            return {
              tokenize: tokenBase,
              baseIndent: base || 0,
              stack: []
            };
          },
          token: function(stream, state) {
            if (stream.eatSpace())
              return null;
            type = null;
            var style = state.tokenize(stream, state);
            var context = state.stack[state.stack.length - 1];
            if (type == "hash" && context == "rule")
              style = "atom";
            else if (style == "variable") {
              if (context == "rule")
                style = "number";
              else if (!context || context == "@media{")
                style = "tag";
            }
            if (context == "rule" && /^[\{\};]$/.test(type))
              state.stack.pop();
            if (type == "{") {
              if (context == "@media")
                state.stack[state.stack.length - 1] = "@media{";
              else
                state.stack.push("{");
            } else if (type == "}")
              state.stack.pop();
            else if (type == "@media")
              state.stack.push("@media");
            else if (context == "{" && type != "comment")
              state.stack.push("rule");
            return style;
          },
          indent: function(state, textAfter) {
            var n = state.stack.length;
            if (/^\}/.test(textAfter))
              n -= state.stack[state.stack.length - 1] == "rule" ? 2 : 1;
            return state.baseIndent + n * indentUnit;
          },
          electricChars: "}"
        };
      });
      CodeMirror3.defineMIME("text/x-nginx-conf", "nginx");
    });
  }
});

// node_modules/codemirror/mode/octave/octave.js
var require_octave = __commonJS({
  "node_modules/codemirror/mode/octave/octave.js"(exports, module) {
    (function(mod) {
      if (typeof exports == "object" && typeof module == "object")
        mod(require_codemirror());
      else if (typeof define == "function" && define.amd)
        define(["../../lib/codemirror"], mod);
      else
        mod(CodeMirror);
    })(function(CodeMirror3) {
      "use strict";
      CodeMirror3.defineMode("octave", function() {
        function wordRegexp(words) {
          return new RegExp("^((" + words.join(")|(") + "))\\b");
        }
        var singleOperators = new RegExp("^[\\+\\-\\*/&|\\^~<>!@'\\\\]");
        var singleDelimiters = new RegExp("^[\\(\\[\\{\\},:=;\\.]");
        var doubleOperators = new RegExp("^((==)|(~=)|(<=)|(>=)|(<<)|(>>)|(\\.[\\+\\-\\*/\\^\\\\]))");
        var doubleDelimiters = new RegExp("^((!=)|(\\+=)|(\\-=)|(\\*=)|(/=)|(&=)|(\\|=)|(\\^=))");
        var tripleDelimiters = new RegExp("^((>>=)|(<<=))");
        var expressionEnd = new RegExp("^[\\]\\)]");
        var identifiers = new RegExp("^[_A-Za-z\xA1-\uFFFF][_A-Za-z0-9\xA1-\uFFFF]*");
        var builtins = wordRegexp([
          "error",
          "eval",
          "function",
          "abs",
          "acos",
          "atan",
          "asin",
          "cos",
          "cosh",
          "exp",
          "log",
          "prod",
          "sum",
          "log10",
          "max",
          "min",
          "sign",
          "sin",
          "sinh",
          "sqrt",
          "tan",
          "reshape",
          "break",
          "zeros",
          "default",
          "margin",
          "round",
          "ones",
          "rand",
          "syn",
          "ceil",
          "floor",
          "size",
          "clear",
          "zeros",
          "eye",
          "mean",
          "std",
          "cov",
          "det",
          "eig",
          "inv",
          "norm",
          "rank",
          "trace",
          "expm",
          "logm",
          "sqrtm",
          "linspace",
          "plot",
          "title",
          "xlabel",
          "ylabel",
          "legend",
          "text",
          "grid",
          "meshgrid",
          "mesh",
          "num2str",
          "fft",
          "ifft",
          "arrayfun",
          "cellfun",
          "input",
          "fliplr",
          "flipud",
          "ismember"
        ]);
        var keywords = wordRegexp([
          "return",
          "case",
          "switch",
          "else",
          "elseif",
          "end",
          "endif",
          "endfunction",
          "if",
          "otherwise",
          "do",
          "for",
          "while",
          "try",
          "catch",
          "classdef",
          "properties",
          "events",
          "methods",
          "global",
          "persistent",
          "endfor",
          "endwhile",
          "printf",
          "sprintf",
          "disp",
          "until",
          "continue",
          "pkg"
        ]);
        function tokenTranspose(stream, state) {
          if (!stream.sol() && stream.peek() === "'") {
            stream.next();
            state.tokenize = tokenBase;
            return "operator";
          }
          state.tokenize = tokenBase;
          return tokenBase(stream, state);
        }
        function tokenComment(stream, state) {
          if (stream.match(/^.*%}/)) {
            state.tokenize = tokenBase;
            return "comment";
          }
          ;
          stream.skipToEnd();
          return "comment";
        }
        function tokenBase(stream, state) {
          if (stream.eatSpace())
            return null;
          if (stream.match("%{")) {
            state.tokenize = tokenComment;
            stream.skipToEnd();
            return "comment";
          }
          if (stream.match(/^[%#]/)) {
            stream.skipToEnd();
            return "comment";
          }
          if (stream.match(/^[0-9\.+-]/, false)) {
            if (stream.match(/^[+-]?0x[0-9a-fA-F]+[ij]?/)) {
              stream.tokenize = tokenBase;
              return "number";
            }
            ;
            if (stream.match(/^[+-]?\d*\.\d+([EeDd][+-]?\d+)?[ij]?/)) {
              return "number";
            }
            ;
            if (stream.match(/^[+-]?\d+([EeDd][+-]?\d+)?[ij]?/)) {
              return "number";
            }
            ;
          }
          if (stream.match(wordRegexp(["nan", "NaN", "inf", "Inf"]))) {
            return "number";
          }
          ;
          var m = stream.match(/^"(?:[^"]|"")*("|$)/) || stream.match(/^'(?:[^']|'')*('|$)/);
          if (m) {
            return m[1] ? "string" : "string error";
          }
          if (stream.match(keywords)) {
            return "keyword";
          }
          ;
          if (stream.match(builtins)) {
            return "builtin";
          }
          ;
          if (stream.match(identifiers)) {
            return "variable";
          }
          ;
          if (stream.match(singleOperators) || stream.match(doubleOperators)) {
            return "operator";
          }
          ;
          if (stream.match(singleDelimiters) || stream.match(doubleDelimiters) || stream.match(tripleDelimiters)) {
            return null;
          }
          ;
          if (stream.match(expressionEnd)) {
            state.tokenize = tokenTranspose;
            return null;
          }
          ;
          stream.next();
          return "error";
        }
        ;
        return {
          startState: function() {
            return {
              tokenize: tokenBase
            };
          },
          token: function(stream, state) {
            var style = state.tokenize(stream, state);
            if (style === "number" || style === "variable") {
              state.tokenize = tokenTranspose;
            }
            return style;
          },
          lineComment: "%",
          fold: "indent"
        };
      });
      CodeMirror3.defineMIME("text/x-octave", "octave");
    });
  }
});

// node_modules/codemirror/mode/perl/perl.js
var require_perl = __commonJS({
  "node_modules/codemirror/mode/perl/perl.js"(exports, module) {
    (function(mod) {
      if (typeof exports == "object" && typeof module == "object")
        mod(require_codemirror());
      else if (typeof define == "function" && define.amd)
        define(["../../lib/codemirror"], mod);
      else
        mod(CodeMirror);
    })(function(CodeMirror3) {
      "use strict";
      CodeMirror3.defineMode("perl", function() {
        var PERL = {
          //   null - magic touch
          //   1 - keyword
          //   2 - def
          //   3 - atom
          //   4 - operator
          //   5 - variable-2 (predefined)
          //   [x,y] - x=1,2,3; y=must be defined if x{...}
          //      PERL operators
          "->": 4,
          "++": 4,
          "--": 4,
          "**": 4,
          //   ! ~ \ and unary + and -
          "=~": 4,
          "!~": 4,
          "*": 4,
          "/": 4,
          "%": 4,
          "x": 4,
          "+": 4,
          "-": 4,
          ".": 4,
          "<<": 4,
          ">>": 4,
          //   named unary operators
          "<": 4,
          ">": 4,
          "<=": 4,
          ">=": 4,
          "lt": 4,
          "gt": 4,
          "le": 4,
          "ge": 4,
          "==": 4,
          "!=": 4,
          "<=>": 4,
          "eq": 4,
          "ne": 4,
          "cmp": 4,
          "~~": 4,
          "&": 4,
          "|": 4,
          "^": 4,
          "&&": 4,
          "||": 4,
          "//": 4,
          "..": 4,
          "...": 4,
          "?": 4,
          ":": 4,
          "=": 4,
          "+=": 4,
          "-=": 4,
          "*=": 4,
          //   etc. ???
          ",": 4,
          "=>": 4,
          "::": 4,
          //   list operators (rightward)
          "not": 4,
          "and": 4,
          "or": 4,
          "xor": 4,
          //      PERL predefined variables (I know, what this is a paranoid idea, but may be needed for people, who learn PERL, and for me as well, ...and may be for you?;)
          "BEGIN": [5, 1],
          "END": [5, 1],
          "PRINT": [5, 1],
          "PRINTF": [5, 1],
          "GETC": [5, 1],
          "READ": [5, 1],
          "READLINE": [5, 1],
          "DESTROY": [5, 1],
          "TIE": [5, 1],
          "TIEHANDLE": [5, 1],
          "UNTIE": [5, 1],
          "STDIN": 5,
          "STDIN_TOP": 5,
          "STDOUT": 5,
          "STDOUT_TOP": 5,
          "STDERR": 5,
          "STDERR_TOP": 5,
          "$ARG": 5,
          "$_": 5,
          "@ARG": 5,
          "@_": 5,
          "$LIST_SEPARATOR": 5,
          '$"': 5,
          "$PROCESS_ID": 5,
          "$PID": 5,
          "$$": 5,
          "$REAL_GROUP_ID": 5,
          "$GID": 5,
          "$(": 5,
          "$EFFECTIVE_GROUP_ID": 5,
          "$EGID": 5,
          "$)": 5,
          "$PROGRAM_NAME": 5,
          "$0": 5,
          "$SUBSCRIPT_SEPARATOR": 5,
          "$SUBSEP": 5,
          "$;": 5,
          "$REAL_USER_ID": 5,
          "$UID": 5,
          "$<": 5,
          "$EFFECTIVE_USER_ID": 5,
          "$EUID": 5,
          "$>": 5,
          "$a": 5,
          "$b": 5,
          "$COMPILING": 5,
          "$^C": 5,
          "$DEBUGGING": 5,
          "$^D": 5,
          "${^ENCODING}": 5,
          "$ENV": 5,
          "%ENV": 5,
          "$SYSTEM_FD_MAX": 5,
          "$^F": 5,
          "@F": 5,
          "${^GLOBAL_PHASE}": 5,
          "$^H": 5,
          "%^H": 5,
          "@INC": 5,
          "%INC": 5,
          "$INPLACE_EDIT": 5,
          "$^I": 5,
          "$^M": 5,
          "$OSNAME": 5,
          "$^O": 5,
          "${^OPEN}": 5,
          "$PERLDB": 5,
          "$^P": 5,
          "$SIG": 5,
          "%SIG": 5,
          "$BASETIME": 5,
          "$^T": 5,
          "${^TAINT}": 5,
          "${^UNICODE}": 5,
          "${^UTF8CACHE}": 5,
          "${^UTF8LOCALE}": 5,
          "$PERL_VERSION": 5,
          "$^V": 5,
          "${^WIN32_SLOPPY_STAT}": 5,
          "$EXECUTABLE_NAME": 5,
          "$^X": 5,
          "$1": 5,
          // - regexp $1, $2...
          "$MATCH": 5,
          "$&": 5,
          "${^MATCH}": 5,
          "$PREMATCH": 5,
          "$`": 5,
          "${^PREMATCH}": 5,
          "$POSTMATCH": 5,
          "$'": 5,
          "${^POSTMATCH}": 5,
          "$LAST_PAREN_MATCH": 5,
          "$+": 5,
          "$LAST_SUBMATCH_RESULT": 5,
          "$^N": 5,
          "@LAST_MATCH_END": 5,
          "@+": 5,
          "%LAST_PAREN_MATCH": 5,
          "%+": 5,
          "@LAST_MATCH_START": 5,
          "@-": 5,
          "%LAST_MATCH_START": 5,
          "%-": 5,
          "$LAST_REGEXP_CODE_RESULT": 5,
          "$^R": 5,
          "${^RE_DEBUG_FLAGS}": 5,
          "${^RE_TRIE_MAXBUF}": 5,
          "$ARGV": 5,
          "@ARGV": 5,
          "ARGV": 5,
          "ARGVOUT": 5,
          "$OUTPUT_FIELD_SEPARATOR": 5,
          "$OFS": 5,
          "$,": 5,
          "$INPUT_LINE_NUMBER": 5,
          "$NR": 5,
          "$.": 5,
          "$INPUT_RECORD_SEPARATOR": 5,
          "$RS": 5,
          "$/": 5,
          "$OUTPUT_RECORD_SEPARATOR": 5,
          "$ORS": 5,
          "$\\": 5,
          "$OUTPUT_AUTOFLUSH": 5,
          "$|": 5,
          "$ACCUMULATOR": 5,
          "$^A": 5,
          "$FORMAT_FORMFEED": 5,
          "$^L": 5,
          "$FORMAT_PAGE_NUMBER": 5,
          "$%": 5,
          "$FORMAT_LINES_LEFT": 5,
          "$-": 5,
          "$FORMAT_LINE_BREAK_CHARACTERS": 5,
          "$:": 5,
          "$FORMAT_LINES_PER_PAGE": 5,
          "$=": 5,
          "$FORMAT_TOP_NAME": 5,
          "$^": 5,
          "$FORMAT_NAME": 5,
          "$~": 5,
          "${^CHILD_ERROR_NATIVE}": 5,
          "$EXTENDED_OS_ERROR": 5,
          "$^E": 5,
          "$EXCEPTIONS_BEING_CAUGHT": 5,
          "$^S": 5,
          "$WARNING": 5,
          "$^W": 5,
          "${^WARNING_BITS}": 5,
          "$OS_ERROR": 5,
          "$ERRNO": 5,
          "$!": 5,
          "%OS_ERROR": 5,
          "%ERRNO": 5,
          "%!": 5,
          "$CHILD_ERROR": 5,
          "$?": 5,
          "$EVAL_ERROR": 5,
          "$@": 5,
          "$OFMT": 5,
          "$#": 5,
          "$*": 5,
          "$ARRAY_BASE": 5,
          "$[": 5,
          "$OLD_PERL_VERSION": 5,
          "$]": 5,
          //      PERL blocks
          "if": [1, 1],
          elsif: [1, 1],
          "else": [1, 1],
          "while": [1, 1],
          unless: [1, 1],
          "for": [1, 1],
          foreach: [1, 1],
          //      PERL functions
          "abs": 1,
          // - absolute value function
          accept: 1,
          // - accept an incoming socket connect
          alarm: 1,
          // - schedule a SIGALRM
          "atan2": 1,
          // - arctangent of Y/X in the range -PI to PI
          bind: 1,
          // - binds an address to a socket
          binmode: 1,
          // - prepare binary files for I/O
          bless: 1,
          // - create an object
          bootstrap: 1,
          //
          "break": 1,
          // - break out of a "given" block
          caller: 1,
          // - get context of the current subroutine call
          chdir: 1,
          // - change your current working directory
          chmod: 1,
          // - changes the permissions on a list of files
          chomp: 1,
          // - remove a trailing record separator from a string
          chop: 1,
          // - remove the last character from a string
          chown: 1,
          // - change the ownership on a list of files
          chr: 1,
          // - get character this number represents
          chroot: 1,
          // - make directory new root for path lookups
          close: 1,
          // - close file (or pipe or socket) handle
          closedir: 1,
          // - close directory handle
          connect: 1,
          // - connect to a remote socket
          "continue": [1, 1],
          // - optional trailing block in a while or foreach
          "cos": 1,
          // - cosine function
          crypt: 1,
          // - one-way passwd-style encryption
          dbmclose: 1,
          // - breaks binding on a tied dbm file
          dbmopen: 1,
          // - create binding on a tied dbm file
          "default": 1,
          //
          defined: 1,
          // - test whether a value, variable, or function is defined
          "delete": 1,
          // - deletes a value from a hash
          die: 1,
          // - raise an exception or bail out
          "do": 1,
          // - turn a BLOCK into a TERM
          dump: 1,
          // - create an immediate core dump
          each: 1,
          // - retrieve the next key/value pair from a hash
          endgrent: 1,
          // - be done using group file
          endhostent: 1,
          // - be done using hosts file
          endnetent: 1,
          // - be done using networks file
          endprotoent: 1,
          // - be done using protocols file
          endpwent: 1,
          // - be done using passwd file
          endservent: 1,
          // - be done using services file
          eof: 1,
          // - test a filehandle for its end
          "eval": 1,
          // - catch exceptions or compile and run code
          "exec": 1,
          // - abandon this program to run another
          exists: 1,
          // - test whether a hash key is present
          exit: 1,
          // - terminate this program
          "exp": 1,
          // - raise I to a power
          fcntl: 1,
          // - file control system call
          fileno: 1,
          // - return file descriptor from filehandle
          flock: 1,
          // - lock an entire file with an advisory lock
          fork: 1,
          // - create a new process just like this one
          format: 1,
          // - declare a picture format with use by the write() function
          formline: 1,
          // - internal function used for formats
          getc: 1,
          // - get the next character from the filehandle
          getgrent: 1,
          // - get next group record
          getgrgid: 1,
          // - get group record given group user ID
          getgrnam: 1,
          // - get group record given group name
          gethostbyaddr: 1,
          // - get host record given its address
          gethostbyname: 1,
          // - get host record given name
          gethostent: 1,
          // - get next hosts record
          getlogin: 1,
          // - return who logged in at this tty
          getnetbyaddr: 1,
          // - get network record given its address
          getnetbyname: 1,
          // - get networks record given name
          getnetent: 1,
          // - get next networks record
          getpeername: 1,
          // - find the other end of a socket connection
          getpgrp: 1,
          // - get process group
          getppid: 1,
          // - get parent process ID
          getpriority: 1,
          // - get current nice value
          getprotobyname: 1,
          // - get protocol record given name
          getprotobynumber: 1,
          // - get protocol record numeric protocol
          getprotoent: 1,
          // - get next protocols record
          getpwent: 1,
          // - get next passwd record
          getpwnam: 1,
          // - get passwd record given user login name
          getpwuid: 1,
          // - get passwd record given user ID
          getservbyname: 1,
          // - get services record given its name
          getservbyport: 1,
          // - get services record given numeric port
          getservent: 1,
          // - get next services record
          getsockname: 1,
          // - retrieve the sockaddr for a given socket
          getsockopt: 1,
          // - get socket options on a given socket
          given: 1,
          //
          glob: 1,
          // - expand filenames using wildcards
          gmtime: 1,
          // - convert UNIX time into record or string using Greenwich time
          "goto": 1,
          // - create spaghetti code
          grep: 1,
          // - locate elements in a list test true against a given criterion
          hex: 1,
          // - convert a string to a hexadecimal number
          "import": 1,
          // - patch a module's namespace into your own
          index: 1,
          // - find a substring within a string
          "int": 1,
          // - get the integer portion of a number
          ioctl: 1,
          // - system-dependent device control system call
          "join": 1,
          // - join a list into a string using a separator
          keys: 1,
          // - retrieve list of indices from a hash
          kill: 1,
          // - send a signal to a process or process group
          last: 1,
          // - exit a block prematurely
          lc: 1,
          // - return lower-case version of a string
          lcfirst: 1,
          // - return a string with just the next letter in lower case
          length: 1,
          // - return the number of bytes in a string
          "link": 1,
          // - create a hard link in the filesystem
          listen: 1,
          // - register your socket as a server
          local: 2,
          // - create a temporary value for a global variable (dynamic scoping)
          localtime: 1,
          // - convert UNIX time into record or string using local time
          lock: 1,
          // - get a thread lock on a variable, subroutine, or method
          "log": 1,
          // - retrieve the natural logarithm for a number
          lstat: 1,
          // - stat a symbolic link
          m: null,
          // - match a string with a regular expression pattern
          map: 1,
          // - apply a change to a list to get back a new list with the changes
          mkdir: 1,
          // - create a directory
          msgctl: 1,
          // - SysV IPC message control operations
          msgget: 1,
          // - get SysV IPC message queue
          msgrcv: 1,
          // - receive a SysV IPC message from a message queue
          msgsnd: 1,
          // - send a SysV IPC message to a message queue
          my: 2,
          // - declare and assign a local variable (lexical scoping)
          "new": 1,
          //
          next: 1,
          // - iterate a block prematurely
          no: 1,
          // - unimport some module symbols or semantics at compile time
          oct: 1,
          // - convert a string to an octal number
          open: 1,
          // - open a file, pipe, or descriptor
          opendir: 1,
          // - open a directory
          ord: 1,
          // - find a character's numeric representation
          our: 2,
          // - declare and assign a package variable (lexical scoping)
          pack: 1,
          // - convert a list into a binary representation
          "package": 1,
          // - declare a separate global namespace
          pipe: 1,
          // - open a pair of connected filehandles
          pop: 1,
          // - remove the last element from an array and return it
          pos: 1,
          // - find or set the offset for the last/next m//g search
          print: 1,
          // - output a list to a filehandle
          printf: 1,
          // - output a formatted list to a filehandle
          prototype: 1,
          // - get the prototype (if any) of a subroutine
          push: 1,
          // - append one or more elements to an array
          q: null,
          // - singly quote a string
          qq: null,
          // - doubly quote a string
          qr: null,
          // - Compile pattern
          quotemeta: null,
          // - quote regular expression magic characters
          qw: null,
          // - quote a list of words
          qx: null,
          // - backquote quote a string
          rand: 1,
          // - retrieve the next pseudorandom number
          read: 1,
          // - fixed-length buffered input from a filehandle
          readdir: 1,
          // - get a directory from a directory handle
          readline: 1,
          // - fetch a record from a file
          readlink: 1,
          // - determine where a symbolic link is pointing
          readpipe: 1,
          // - execute a system command and collect standard output
          recv: 1,
          // - receive a message over a Socket
          redo: 1,
          // - start this loop iteration over again
          ref: 1,
          // - find out the type of thing being referenced
          rename: 1,
          // - change a filename
          require: 1,
          // - load in external functions from a library at runtime
          reset: 1,
          // - clear all variables of a given name
          "return": 1,
          // - get out of a function early
          reverse: 1,
          // - flip a string or a list
          rewinddir: 1,
          // - reset directory handle
          rindex: 1,
          // - right-to-left substring search
          rmdir: 1,
          // - remove a directory
          s: null,
          // - replace a pattern with a string
          say: 1,
          // - print with newline
          scalar: 1,
          // - force a scalar context
          seek: 1,
          // - reposition file pointer for random-access I/O
          seekdir: 1,
          // - reposition directory pointer
          select: 1,
          // - reset default output or do I/O multiplexing
          semctl: 1,
          // - SysV semaphore control operations
          semget: 1,
          // - get set of SysV semaphores
          semop: 1,
          // - SysV semaphore operations
          send: 1,
          // - send a message over a socket
          setgrent: 1,
          // - prepare group file for use
          sethostent: 1,
          // - prepare hosts file for use
          setnetent: 1,
          // - prepare networks file for use
          setpgrp: 1,
          // - set the process group of a process
          setpriority: 1,
          // - set a process's nice value
          setprotoent: 1,
          // - prepare protocols file for use
          setpwent: 1,
          // - prepare passwd file for use
          setservent: 1,
          // - prepare services file for use
          setsockopt: 1,
          // - set some socket options
          shift: 1,
          // - remove the first element of an array, and return it
          shmctl: 1,
          // - SysV shared memory operations
          shmget: 1,
          // - get SysV shared memory segment identifier
          shmread: 1,
          // - read SysV shared memory
          shmwrite: 1,
          // - write SysV shared memory
          shutdown: 1,
          // - close down just half of a socket connection
          "sin": 1,
          // - return the sine of a number
          sleep: 1,
          // - block for some number of seconds
          socket: 1,
          // - create a socket
          socketpair: 1,
          // - create a pair of sockets
          "sort": 1,
          // - sort a list of values
          splice: 1,
          // - add or remove elements anywhere in an array
          "split": 1,
          // - split up a string using a regexp delimiter
          sprintf: 1,
          // - formatted print into a string
          "sqrt": 1,
          // - square root function
          srand: 1,
          // - seed the random number generator
          stat: 1,
          // - get a file's status information
          state: 1,
          // - declare and assign a state variable (persistent lexical scoping)
          study: 1,
          // - optimize input data for repeated searches
          "sub": 1,
          // - declare a subroutine, possibly anonymously
          "substr": 1,
          // - get or alter a portion of a string
          symlink: 1,
          // - create a symbolic link to a file
          syscall: 1,
          // - execute an arbitrary system call
          sysopen: 1,
          // - open a file, pipe, or descriptor
          sysread: 1,
          // - fixed-length unbuffered input from a filehandle
          sysseek: 1,
          // - position I/O pointer on handle used with sysread and syswrite
          system: 1,
          // - run a separate program
          syswrite: 1,
          // - fixed-length unbuffered output to a filehandle
          tell: 1,
          // - get current seekpointer on a filehandle
          telldir: 1,
          // - get current seekpointer on a directory handle
          tie: 1,
          // - bind a variable to an object class
          tied: 1,
          // - get a reference to the object underlying a tied variable
          time: 1,
          // - return number of seconds since 1970
          times: 1,
          // - return elapsed time for self and child processes
          tr: null,
          // - transliterate a string
          truncate: 1,
          // - shorten a file
          uc: 1,
          // - return upper-case version of a string
          ucfirst: 1,
          // - return a string with just the next letter in upper case
          umask: 1,
          // - set file creation mode mask
          undef: 1,
          // - remove a variable or function definition
          unlink: 1,
          // - remove one link to a file
          unpack: 1,
          // - convert binary structure into normal perl variables
          unshift: 1,
          // - prepend more elements to the beginning of a list
          untie: 1,
          // - break a tie binding to a variable
          use: 1,
          // - load in a module at compile time
          utime: 1,
          // - set a file's last access and modify times
          values: 1,
          // - return a list of the values in a hash
          vec: 1,
          // - test or set particular bits in a string
          wait: 1,
          // - wait for any child process to die
          waitpid: 1,
          // - wait for a particular child process to die
          wantarray: 1,
          // - get void vs scalar vs list context of current subroutine call
          warn: 1,
          // - print debugging info
          when: 1,
          //
          write: 1,
          // - print a picture record
          y: null
        };
        var RXstyle = "string-2";
        var RXmodifiers = /[goseximacplud]/;
        function tokenChain(stream, state, chain, style, tail) {
          state.chain = null;
          state.style = null;
          state.tail = null;
          state.tokenize = function(stream2, state2) {
            var e = false, c, i = 0;
            while (c = stream2.next()) {
              if (c === chain[i] && !e) {
                if (chain[++i] !== void 0) {
                  state2.chain = chain[i];
                  state2.style = style;
                  state2.tail = tail;
                } else if (tail)
                  stream2.eatWhile(tail);
                state2.tokenize = tokenPerl;
                return style;
              }
              e = !e && c == "\\";
            }
            return style;
          };
          return state.tokenize(stream, state);
        }
        function tokenSOMETHING(stream, state, string) {
          state.tokenize = function(stream2, state2) {
            if (stream2.string == string)
              state2.tokenize = tokenPerl;
            stream2.skipToEnd();
            return "string";
          };
          return state.tokenize(stream, state);
        }
        function tokenPerl(stream, state) {
          if (stream.eatSpace())
            return null;
          if (state.chain)
            return tokenChain(stream, state, state.chain, state.style, state.tail);
          if (stream.match(/^(\-?((\d[\d_]*)?\.\d+(e[+-]?\d+)?|\d+\.\d*)|0x[\da-fA-F_]+|0b[01_]+|\d[\d_]*(e[+-]?\d+)?)/))
            return "number";
          if (stream.match(/^<<(?=[_a-zA-Z])/)) {
            stream.eatWhile(/\w/);
            return tokenSOMETHING(stream, state, stream.current().substr(2));
          }
          if (stream.sol() && stream.match(/^\=item(?!\w)/)) {
            return tokenSOMETHING(stream, state, "=cut");
          }
          var ch = stream.next();
          if (ch == '"' || ch == "'") {
            if (prefix(stream, 3) == "<<" + ch) {
              var p = stream.pos;
              stream.eatWhile(/\w/);
              var n = stream.current().substr(1);
              if (n && stream.eat(ch))
                return tokenSOMETHING(stream, state, n);
              stream.pos = p;
            }
            return tokenChain(stream, state, [ch], "string");
          }
          if (ch == "q") {
            var c = look(stream, -2);
            if (!(c && /\w/.test(c))) {
              c = look(stream, 0);
              if (c == "x") {
                c = look(stream, 1);
                if (c == "(") {
                  eatSuffix(stream, 2);
                  return tokenChain(stream, state, [")"], RXstyle, RXmodifiers);
                }
                if (c == "[") {
                  eatSuffix(stream, 2);
                  return tokenChain(stream, state, ["]"], RXstyle, RXmodifiers);
                }
                if (c == "{") {
                  eatSuffix(stream, 2);
                  return tokenChain(stream, state, ["}"], RXstyle, RXmodifiers);
                }
                if (c == "<") {
                  eatSuffix(stream, 2);
                  return tokenChain(stream, state, [">"], RXstyle, RXmodifiers);
                }
                if (/[\^'"!~\/]/.test(c)) {
                  eatSuffix(stream, 1);
                  return tokenChain(stream, state, [stream.eat(c)], RXstyle, RXmodifiers);
                }
              } else if (c == "q") {
                c = look(stream, 1);
                if (c == "(") {
                  eatSuffix(stream, 2);
                  return tokenChain(stream, state, [")"], "string");
                }
                if (c == "[") {
                  eatSuffix(stream, 2);
                  return tokenChain(stream, state, ["]"], "string");
                }
                if (c == "{") {
                  eatSuffix(stream, 2);
                  return tokenChain(stream, state, ["}"], "string");
                }
                if (c == "<") {
                  eatSuffix(stream, 2);
                  return tokenChain(stream, state, [">"], "string");
                }
                if (/[\^'"!~\/]/.test(c)) {
                  eatSuffix(stream, 1);
                  return tokenChain(stream, state, [stream.eat(c)], "string");
                }
              } else if (c == "w") {
                c = look(stream, 1);
                if (c == "(") {
                  eatSuffix(stream, 2);
                  return tokenChain(stream, state, [")"], "bracket");
                }
                if (c == "[") {
                  eatSuffix(stream, 2);
                  return tokenChain(stream, state, ["]"], "bracket");
                }
                if (c == "{") {
                  eatSuffix(stream, 2);
                  return tokenChain(stream, state, ["}"], "bracket");
                }
                if (c == "<") {
                  eatSuffix(stream, 2);
                  return tokenChain(stream, state, [">"], "bracket");
                }
                if (/[\^'"!~\/]/.test(c)) {
                  eatSuffix(stream, 1);
                  return tokenChain(stream, state, [stream.eat(c)], "bracket");
                }
              } else if (c == "r") {
                c = look(stream, 1);
                if (c == "(") {
                  eatSuffix(stream, 2);
                  return tokenChain(stream, state, [")"], RXstyle, RXmodifiers);
                }
                if (c == "[") {
                  eatSuffix(stream, 2);
                  return tokenChain(stream, state, ["]"], RXstyle, RXmodifiers);
                }
                if (c == "{") {
                  eatSuffix(stream, 2);
                  return tokenChain(stream, state, ["}"], RXstyle, RXmodifiers);
                }
                if (c == "<") {
                  eatSuffix(stream, 2);
                  return tokenChain(stream, state, [">"], RXstyle, RXmodifiers);
                }
                if (/[\^'"!~\/]/.test(c)) {
                  eatSuffix(stream, 1);
                  return tokenChain(stream, state, [stream.eat(c)], RXstyle, RXmodifiers);
                }
              } else if (/[\^'"!~\/(\[{<]/.test(c)) {
                if (c == "(") {
                  eatSuffix(stream, 1);
                  return tokenChain(stream, state, [")"], "string");
                }
                if (c == "[") {
                  eatSuffix(stream, 1);
                  return tokenChain(stream, state, ["]"], "string");
                }
                if (c == "{") {
                  eatSuffix(stream, 1);
                  return tokenChain(stream, state, ["}"], "string");
                }
                if (c == "<") {
                  eatSuffix(stream, 1);
                  return tokenChain(stream, state, [">"], "string");
                }
                if (/[\^'"!~\/]/.test(c)) {
                  return tokenChain(stream, state, [stream.eat(c)], "string");
                }
              }
            }
          }
          if (ch == "m") {
            var c = look(stream, -2);
            if (!(c && /\w/.test(c))) {
              c = stream.eat(/[(\[{<\^'"!~\/]/);
              if (c) {
                if (/[\^'"!~\/]/.test(c)) {
                  return tokenChain(stream, state, [c], RXstyle, RXmodifiers);
                }
                if (c == "(") {
                  return tokenChain(stream, state, [")"], RXstyle, RXmodifiers);
                }
                if (c == "[") {
                  return tokenChain(stream, state, ["]"], RXstyle, RXmodifiers);
                }
                if (c == "{") {
                  return tokenChain(stream, state, ["}"], RXstyle, RXmodifiers);
                }
                if (c == "<") {
                  return tokenChain(stream, state, [">"], RXstyle, RXmodifiers);
                }
              }
            }
          }
          if (ch == "s") {
            var c = /[\/>\]})\w]/.test(look(stream, -2));
            if (!c) {
              c = stream.eat(/[(\[{<\^'"!~\/]/);
              if (c) {
                if (c == "[")
                  return tokenChain(stream, state, ["]", "]"], RXstyle, RXmodifiers);
                if (c == "{")
                  return tokenChain(stream, state, ["}", "}"], RXstyle, RXmodifiers);
                if (c == "<")
                  return tokenChain(stream, state, [">", ">"], RXstyle, RXmodifiers);
                if (c == "(")
                  return tokenChain(stream, state, [")", ")"], RXstyle, RXmodifiers);
                return tokenChain(stream, state, [c, c], RXstyle, RXmodifiers);
              }
            }
          }
          if (ch == "y") {
            var c = /[\/>\]})\w]/.test(look(stream, -2));
            if (!c) {
              c = stream.eat(/[(\[{<\^'"!~\/]/);
              if (c) {
                if (c == "[")
                  return tokenChain(stream, state, ["]", "]"], RXstyle, RXmodifiers);
                if (c == "{")
                  return tokenChain(stream, state, ["}", "}"], RXstyle, RXmodifiers);
                if (c == "<")
                  return tokenChain(stream, state, [">", ">"], RXstyle, RXmodifiers);
                if (c == "(")
                  return tokenChain(stream, state, [")", ")"], RXstyle, RXmodifiers);
                return tokenChain(stream, state, [c, c], RXstyle, RXmodifiers);
              }
            }
          }
          if (ch == "t") {
            var c = /[\/>\]})\w]/.test(look(stream, -2));
            if (!c) {
              c = stream.eat("r");
              if (c) {
                c = stream.eat(/[(\[{<\^'"!~\/]/);
                if (c) {
                  if (c == "[")
                    return tokenChain(stream, state, ["]", "]"], RXstyle, RXmodifiers);
                  if (c == "{")
                    return tokenChain(stream, state, ["}", "}"], RXstyle, RXmodifiers);
                  if (c == "<")
                    return tokenChain(stream, state, [">", ">"], RXstyle, RXmodifiers);
                  if (c == "(")
                    return tokenChain(stream, state, [")", ")"], RXstyle, RXmodifiers);
                  return tokenChain(stream, state, [c, c], RXstyle, RXmodifiers);
                }
              }
            }
          }
          if (ch == "`") {
            return tokenChain(stream, state, [ch], "variable-2");
          }
          if (ch == "/") {
            if (!/~\s*$/.test(prefix(stream)))
              return "operator";
            else
              return tokenChain(stream, state, [ch], RXstyle, RXmodifiers);
          }
          if (ch == "$") {
            var p = stream.pos;
            if (stream.eatWhile(/\d/) || stream.eat("{") && stream.eatWhile(/\d/) && stream.eat("}"))
              return "variable-2";
            else
              stream.pos = p;
          }
          if (/[$@%]/.test(ch)) {
            var p = stream.pos;
            if (stream.eat("^") && stream.eat(/[A-Z]/) || !/[@$%&]/.test(look(stream, -2)) && stream.eat(/[=|\\\-#?@;:&`~\^!\[\]*'"$+.,\/<>()]/)) {
              var c = stream.current();
              if (PERL[c])
                return "variable-2";
            }
            stream.pos = p;
          }
          if (/[$@%&]/.test(ch)) {
            if (stream.eatWhile(/[\w$]/) || stream.eat("{") && stream.eatWhile(/[\w$]/) && stream.eat("}")) {
              var c = stream.current();
              if (PERL[c])
                return "variable-2";
              else
                return "variable";
            }
          }
          if (ch == "#") {
            if (look(stream, -2) != "$") {
              stream.skipToEnd();
              return "comment";
            }
          }
          if (/[:+\-\^*$&%@=<>!?|\/~\.]/.test(ch)) {
            var p = stream.pos;
            stream.eatWhile(/[:+\-\^*$&%@=<>!?|\/~\.]/);
            if (PERL[stream.current()])
              return "operator";
            else
              stream.pos = p;
          }
          if (ch == "_") {
            if (stream.pos == 1) {
              if (suffix(stream, 6) == "_END__") {
                return tokenChain(stream, state, ["\0"], "comment");
              } else if (suffix(stream, 7) == "_DATA__") {
                return tokenChain(stream, state, ["\0"], "variable-2");
              } else if (suffix(stream, 7) == "_C__") {
                return tokenChain(stream, state, ["\0"], "string");
              }
            }
          }
          if (/\w/.test(ch)) {
            var p = stream.pos;
            if (look(stream, -2) == "{" && (look(stream, 0) == "}" || stream.eatWhile(/\w/) && look(stream, 0) == "}"))
              return "string";
            else
              stream.pos = p;
          }
          if (/[A-Z]/.test(ch)) {
            var l = look(stream, -2);
            var p = stream.pos;
            stream.eatWhile(/[A-Z_]/);
            if (/[\da-z]/.test(look(stream, 0))) {
              stream.pos = p;
            } else {
              var c = PERL[stream.current()];
              if (!c)
                return "meta";
              if (c[1])
                c = c[0];
              if (l != ":") {
                if (c == 1)
                  return "keyword";
                else if (c == 2)
                  return "def";
                else if (c == 3)
                  return "atom";
                else if (c == 4)
                  return "operator";
                else if (c == 5)
                  return "variable-2";
                else
                  return "meta";
              } else
                return "meta";
            }
          }
          if (/[a-zA-Z_]/.test(ch)) {
            var l = look(stream, -2);
            stream.eatWhile(/\w/);
            var c = PERL[stream.current()];
            if (!c)
              return "meta";
            if (c[1])
              c = c[0];
            if (l != ":") {
              if (c == 1)
                return "keyword";
              else if (c == 2)
                return "def";
              else if (c == 3)
                return "atom";
              else if (c == 4)
                return "operator";
              else if (c == 5)
                return "variable-2";
              else
                return "meta";
            } else
              return "meta";
          }
          return null;
        }
        return {
          startState: function() {
            return {
              tokenize: tokenPerl,
              chain: null,
              style: null,
              tail: null
            };
          },
          token: function(stream, state) {
            return (state.tokenize || tokenPerl)(stream, state);
          },
          lineComment: "#"
        };
      });
      CodeMirror3.registerHelper("wordChars", "perl", /[\w$]/);
      CodeMirror3.defineMIME("text/x-perl", "perl");
      function look(stream, c) {
        return stream.string.charAt(stream.pos + (c || 0));
      }
      function prefix(stream, c) {
        if (c) {
          var x = stream.pos - c;
          return stream.string.substr(x >= 0 ? x : 0, c);
        } else {
          return stream.string.substr(0, stream.pos - 1);
        }
      }
      function suffix(stream, c) {
        var y = stream.string.length;
        var x = y - stream.pos + 1;
        return stream.string.substr(stream.pos, c && c < y ? c : x);
      }
      function eatSuffix(stream, c) {
        var x = stream.pos + c;
        var y;
        if (x <= 0)
          stream.pos = 0;
        else if (x >= (y = stream.string.length - 1))
          stream.pos = y;
        else
          stream.pos = x;
      }
    });
  }
});

// node_modules/codemirror/mode/pascal/pascal.js
var require_pascal = __commonJS({
  "node_modules/codemirror/mode/pascal/pascal.js"(exports, module) {
    (function(mod) {
      if (typeof exports == "object" && typeof module == "object")
        mod(require_codemirror());
      else if (typeof define == "function" && define.amd)
        define(["../../lib/codemirror"], mod);
      else
        mod(CodeMirror);
    })(function(CodeMirror3) {
      "use strict";
      CodeMirror3.defineMode("pascal", function() {
        function words(str) {
          var obj = {}, words2 = str.split(" ");
          for (var i = 0; i < words2.length; ++i)
            obj[words2[i]] = true;
          return obj;
        }
        var keywords = words(
          "absolute and array asm begin case const constructor destructor div do downto else end file for function goto if implementation in inherited inline interface label mod nil not object of operator or packed procedure program record reintroduce repeat self set shl shr string then to type unit until uses var while with xor as class dispinterface except exports finalization finally initialization inline is library on out packed property raise resourcestring threadvar try absolute abstract alias assembler bitpacked break cdecl continue cppdecl cvar default deprecated dynamic enumerator experimental export external far far16 forward generic helper implements index interrupt iocheck local message name near nodefault noreturn nostackframe oldfpccall otherwise overload override pascal platform private protected public published read register reintroduce result safecall saveregisters softfloat specialize static stdcall stored strict unaligned unimplemented varargs virtual write"
        );
        var atoms = { "null": true };
        var isOperatorChar = /[+\-*&%=<>!?|\/]/;
        function tokenBase(stream, state) {
          var ch = stream.next();
          if (ch == "#" && state.startOfLine) {
            stream.skipToEnd();
            return "meta";
          }
          if (ch == '"' || ch == "'") {
            state.tokenize = tokenString(ch);
            return state.tokenize(stream, state);
          }
          if (ch == "(" && stream.eat("*")) {
            state.tokenize = tokenComment;
            return tokenComment(stream, state);
          }
          if (ch == "{") {
            state.tokenize = tokenCommentBraces;
            return tokenCommentBraces(stream, state);
          }
          if (/[\[\]\(\),;\:\.]/.test(ch)) {
            return null;
          }
          if (/\d/.test(ch)) {
            stream.eatWhile(/[\w\.]/);
            return "number";
          }
          if (ch == "/") {
            if (stream.eat("/")) {
              stream.skipToEnd();
              return "comment";
            }
          }
          if (isOperatorChar.test(ch)) {
            stream.eatWhile(isOperatorChar);
            return "operator";
          }
          stream.eatWhile(/[\w\$_]/);
          var cur = stream.current();
          if (keywords.propertyIsEnumerable(cur))
            return "keyword";
          if (atoms.propertyIsEnumerable(cur))
            return "atom";
          return "variable";
        }
        function tokenString(quote) {
          return function(stream, state) {
            var escaped = false, next, end = false;
            while ((next = stream.next()) != null) {
              if (next == quote && !escaped) {
                end = true;
                break;
              }
              escaped = !escaped && next == "\\";
            }
            if (end || !escaped)
              state.tokenize = null;
            return "string";
          };
        }
        function tokenComment(stream, state) {
          var maybeEnd = false, ch;
          while (ch = stream.next()) {
            if (ch == ")" && maybeEnd) {
              state.tokenize = null;
              break;
            }
            maybeEnd = ch == "*";
          }
          return "comment";
        }
        function tokenCommentBraces(stream, state) {
          var ch;
          while (ch = stream.next()) {
            if (ch == "}") {
              state.tokenize = null;
              break;
            }
          }
          return "comment";
        }
        return {
          startState: function() {
            return { tokenize: null };
          },
          token: function(stream, state) {
            if (stream.eatSpace())
              return null;
            var style = (state.tokenize || tokenBase)(stream, state);
            if (style == "comment" || style == "meta")
              return style;
            return style;
          },
          electricChars: "{}"
        };
      });
      CodeMirror3.defineMIME("text/x-pascal", "pascal");
    });
  }
});

// node_modules/codemirror/mode/php/php.js
var require_php = __commonJS({
  "node_modules/codemirror/mode/php/php.js"(exports, module) {
    (function(mod) {
      if (typeof exports == "object" && typeof module == "object")
        mod(require_codemirror(), require_htmlmixed(), require_clike());
      else if (typeof define == "function" && define.amd)
        define(["../../lib/codemirror", "../htmlmixed/htmlmixed", "../clike/clike"], mod);
      else
        mod(CodeMirror);
    })(function(CodeMirror3) {
      "use strict";
      function keywords(str) {
        var obj = {}, words = str.split(" ");
        for (var i = 0; i < words.length; ++i)
          obj[words[i]] = true;
        return obj;
      }
      function matchSequence(list, end, escapes) {
        if (list.length == 0)
          return phpString(end);
        return function(stream, state) {
          var patterns = list[0];
          for (var i = 0; i < patterns.length; i++)
            if (stream.match(patterns[i][0])) {
              state.tokenize = matchSequence(list.slice(1), end);
              return patterns[i][1];
            }
          state.tokenize = phpString(end, escapes);
          return "string";
        };
      }
      function phpString(closing, escapes) {
        return function(stream, state) {
          return phpString_(stream, state, closing, escapes);
        };
      }
      function phpString_(stream, state, closing, escapes) {
        if (escapes !== false && stream.match("${", false) || stream.match("{$", false)) {
          state.tokenize = null;
          return "string";
        }
        if (escapes !== false && stream.match(/^\$[a-zA-Z_][a-zA-Z0-9_]*/)) {
          if (stream.match("[", false)) {
            state.tokenize = matchSequence([
              [["[", null]],
              [
                [/\d[\w\.]*/, "number"],
                [/\$[a-zA-Z_][a-zA-Z0-9_]*/, "variable-2"],
                [/[\w\$]+/, "variable"]
              ],
              [["]", null]]
            ], closing, escapes);
          }
          if (stream.match(/^->\w/, false)) {
            state.tokenize = matchSequence([
              [["->", null]],
              [[/[\w]+/, "variable"]]
            ], closing, escapes);
          }
          return "variable-2";
        }
        var escaped = false;
        while (!stream.eol() && (escaped || escapes === false || !stream.match("{$", false) && !stream.match(/^(\$[a-zA-Z_][a-zA-Z0-9_]*|\$\{)/, false))) {
          if (!escaped && stream.match(closing)) {
            state.tokenize = null;
            state.tokStack.pop();
            state.tokStack.pop();
            break;
          }
          escaped = stream.next() == "\\" && !escaped;
        }
        return "string";
      }
      var phpKeywords = "abstract and array as break case catch class clone const continue declare default do else elseif enddeclare endfor endforeach endif endswitch endwhile enum extends final for foreach function global goto if implements interface instanceof namespace new or private protected public static switch throw trait try use var while xor die echo empty exit eval include include_once isset list require require_once return print unset __halt_compiler self static parent yield insteadof finally readonly match";
      var phpAtoms = "true false null TRUE FALSE NULL __CLASS__ __DIR__ __FILE__ __LINE__ __METHOD__ __FUNCTION__ __NAMESPACE__ __TRAIT__";
      var phpBuiltin = "func_num_args func_get_arg func_get_args strlen strcmp strncmp strcasecmp strncasecmp each error_reporting define defined trigger_error user_error set_error_handler restore_error_handler get_declared_classes get_loaded_extensions extension_loaded get_extension_funcs debug_backtrace constant bin2hex hex2bin sleep usleep time mktime gmmktime strftime gmstrftime strtotime date gmdate getdate localtime checkdate flush wordwrap htmlspecialchars htmlentities html_entity_decode md5 md5_file crc32 getimagesize image_type_to_mime_type phpinfo phpversion phpcredits strnatcmp strnatcasecmp substr_count strspn strcspn strtok strtoupper strtolower strpos strrpos strrev hebrev hebrevc nl2br basename dirname pathinfo stripslashes stripcslashes strstr stristr strrchr str_shuffle str_word_count strcoll substr substr_replace quotemeta ucfirst ucwords strtr addslashes addcslashes rtrim str_replace str_repeat count_chars chunk_split trim ltrim strip_tags similar_text explode implode setlocale localeconv parse_str str_pad chop strchr sprintf printf vprintf vsprintf sscanf fscanf parse_url urlencode urldecode rawurlencode rawurldecode readlink linkinfo link unlink exec system escapeshellcmd escapeshellarg passthru shell_exec proc_open proc_close rand srand getrandmax mt_rand mt_srand mt_getrandmax base64_decode base64_encode abs ceil floor round is_finite is_nan is_infinite bindec hexdec octdec decbin decoct dechex base_convert number_format fmod ip2long long2ip getenv putenv getopt microtime gettimeofday getrusage uniqid quoted_printable_decode set_time_limit get_cfg_var magic_quotes_runtime set_magic_quotes_runtime get_magic_quotes_gpc get_magic_quotes_runtime import_request_variables error_log serialize unserialize memory_get_usage memory_get_peak_usage var_dump var_export debug_zval_dump print_r highlight_file show_source highlight_string ini_get ini_get_all ini_set ini_alter ini_restore get_include_path set_include_path restore_include_path setcookie header headers_sent connection_aborted connection_status ignore_user_abort parse_ini_file is_uploaded_file move_uploaded_file intval floatval doubleval strval gettype settype is_null is_resource is_bool is_long is_float is_int is_integer is_double is_real is_numeric is_string is_array is_object is_scalar ereg ereg_replace eregi eregi_replace split spliti join sql_regcase dl pclose popen readfile rewind rmdir umask fclose feof fgetc fgets fgetss fread fopen fpassthru ftruncate fstat fseek ftell fflush fwrite fputs mkdir rename copy tempnam tmpfile file file_get_contents file_put_contents stream_select stream_context_create stream_context_set_params stream_context_set_option stream_context_get_options stream_filter_prepend stream_filter_append fgetcsv flock get_meta_tags stream_set_write_buffer set_file_buffer set_socket_blocking stream_set_blocking socket_set_blocking stream_get_meta_data stream_register_wrapper stream_wrapper_register stream_set_timeout socket_set_timeout socket_get_status realpath fnmatch fsockopen pfsockopen pack unpack get_browser crypt opendir closedir chdir getcwd rewinddir readdir dir glob fileatime filectime filegroup fileinode filemtime fileowner fileperms filesize filetype file_exists is_writable is_writeable is_readable is_executable is_file is_dir is_link stat lstat chown touch clearstatcache mail ob_start ob_flush ob_clean ob_end_flush ob_end_clean ob_get_flush ob_get_clean ob_get_length ob_get_level ob_get_status ob_get_contents ob_implicit_flush ob_list_handlers ksort krsort natsort natcasesort asort arsort sort rsort usort uasort uksort shuffle array_walk count end prev next reset current key min max in_array array_search extract compact array_fill range array_multisort array_push array_pop array_shift array_unshift array_splice array_slice array_merge array_merge_recursive array_keys array_values array_count_values array_reverse array_reduce array_pad array_flip array_change_key_case array_rand array_unique array_intersect array_intersect_assoc array_diff array_diff_assoc array_sum array_filter array_map array_chunk array_key_exists array_intersect_key array_combine array_column pos sizeof key_exists assert assert_options version_compare ftok str_rot13 aggregate session_name session_module_name session_save_path session_id session_regenerate_id session_decode session_register session_unregister session_is_registered session_encode session_start session_destroy session_unset session_set_save_handler session_cache_limiter session_cache_expire session_set_cookie_params session_get_cookie_params session_write_close preg_match preg_match_all preg_replace preg_replace_callback preg_split preg_quote preg_grep overload ctype_alnum ctype_alpha ctype_cntrl ctype_digit ctype_lower ctype_graph ctype_print ctype_punct ctype_space ctype_upper ctype_xdigit virtual apache_request_headers apache_note apache_lookup_uri apache_child_terminate apache_setenv apache_response_headers apache_get_version getallheaders mysql_connect mysql_pconnect mysql_close mysql_select_db mysql_create_db mysql_drop_db mysql_query mysql_unbuffered_query mysql_db_query mysql_list_dbs mysql_list_tables mysql_list_fields mysql_list_processes mysql_error mysql_errno mysql_affected_rows mysql_insert_id mysql_result mysql_num_rows mysql_num_fields mysql_fetch_row mysql_fetch_array mysql_fetch_assoc mysql_fetch_object mysql_data_seek mysql_fetch_lengths mysql_fetch_field mysql_field_seek mysql_free_result mysql_field_name mysql_field_table mysql_field_len mysql_field_type mysql_field_flags mysql_escape_string mysql_real_escape_string mysql_stat mysql_thread_id mysql_client_encoding mysql_get_client_info mysql_get_host_info mysql_get_proto_info mysql_get_server_info mysql_info mysql mysql_fieldname mysql_fieldtable mysql_fieldlen mysql_fieldtype mysql_fieldflags mysql_selectdb mysql_createdb mysql_dropdb mysql_freeresult mysql_numfields mysql_numrows mysql_listdbs mysql_listtables mysql_listfields mysql_db_name mysql_dbname mysql_tablename mysql_table_name pg_connect pg_pconnect pg_close pg_connection_status pg_connection_busy pg_connection_reset pg_host pg_dbname pg_port pg_tty pg_options pg_ping pg_query pg_send_query pg_cancel_query pg_fetch_result pg_fetch_row pg_fetch_assoc pg_fetch_array pg_fetch_object pg_fetch_all pg_affected_rows pg_get_result pg_result_seek pg_result_status pg_free_result pg_last_oid pg_num_rows pg_num_fields pg_field_name pg_field_num pg_field_size pg_field_type pg_field_prtlen pg_field_is_null pg_get_notify pg_get_pid pg_result_error pg_last_error pg_last_notice pg_put_line pg_end_copy pg_copy_to pg_copy_from pg_trace pg_untrace pg_lo_create pg_lo_unlink pg_lo_open pg_lo_close pg_lo_read pg_lo_write pg_lo_read_all pg_lo_import pg_lo_export pg_lo_seek pg_lo_tell pg_escape_string pg_escape_bytea pg_unescape_bytea pg_client_encoding pg_set_client_encoding pg_meta_data pg_convert pg_insert pg_update pg_delete pg_select pg_exec pg_getlastoid pg_cmdtuples pg_errormessage pg_numrows pg_numfields pg_fieldname pg_fieldsize pg_fieldtype pg_fieldnum pg_fieldprtlen pg_fieldisnull pg_freeresult pg_result pg_loreadall pg_locreate pg_lounlink pg_loopen pg_loclose pg_loread pg_lowrite pg_loimport pg_loexport http_response_code get_declared_traits getimagesizefromstring socket_import_stream stream_set_chunk_size trait_exists header_register_callback class_uses session_status session_register_shutdown echo print global static exit array empty eval isset unset die include require include_once require_once json_decode json_encode json_last_error json_last_error_msg curl_close curl_copy_handle curl_errno curl_error curl_escape curl_exec curl_file_create curl_getinfo curl_init curl_multi_add_handle curl_multi_close curl_multi_exec curl_multi_getcontent curl_multi_info_read curl_multi_init curl_multi_remove_handle curl_multi_select curl_multi_setopt curl_multi_strerror curl_pause curl_reset curl_setopt_array curl_setopt curl_share_close curl_share_init curl_share_setopt curl_strerror curl_unescape curl_version mysqli_affected_rows mysqli_autocommit mysqli_change_user mysqli_character_set_name mysqli_close mysqli_commit mysqli_connect_errno mysqli_connect_error mysqli_connect mysqli_data_seek mysqli_debug mysqli_dump_debug_info mysqli_errno mysqli_error_list mysqli_error mysqli_fetch_all mysqli_fetch_array mysqli_fetch_assoc mysqli_fetch_field_direct mysqli_fetch_field mysqli_fetch_fields mysqli_fetch_lengths mysqli_fetch_object mysqli_fetch_row mysqli_field_count mysqli_field_seek mysqli_field_tell mysqli_free_result mysqli_get_charset mysqli_get_client_info mysqli_get_client_stats mysqli_get_client_version mysqli_get_connection_stats mysqli_get_host_info mysqli_get_proto_info mysqli_get_server_info mysqli_get_server_version mysqli_info mysqli_init mysqli_insert_id mysqli_kill mysqli_more_results mysqli_multi_query mysqli_next_result mysqli_num_fields mysqli_num_rows mysqli_options mysqli_ping mysqli_prepare mysqli_query mysqli_real_connect mysqli_real_escape_string mysqli_real_query mysqli_reap_async_query mysqli_refresh mysqli_rollback mysqli_select_db mysqli_set_charset mysqli_set_local_infile_default mysqli_set_local_infile_handler mysqli_sqlstate mysqli_ssl_set mysqli_stat mysqli_stmt_init mysqli_store_result mysqli_thread_id mysqli_thread_safe mysqli_use_result mysqli_warning_count";
      CodeMirror3.registerHelper("hintWords", "php", [phpKeywords, phpAtoms, phpBuiltin].join(" ").split(" "));
      CodeMirror3.registerHelper("wordChars", "php", /[\w$]/);
      var phpConfig = {
        name: "clike",
        helperType: "php",
        keywords: keywords(phpKeywords),
        blockKeywords: keywords("catch do else elseif for foreach if switch try while finally"),
        defKeywords: keywords("class enum function interface namespace trait"),
        atoms: keywords(phpAtoms),
        builtin: keywords(phpBuiltin),
        multiLineStrings: true,
        hooks: {
          "$": function(stream) {
            stream.eatWhile(/[\w\$_]/);
            return "variable-2";
          },
          "<": function(stream, state) {
            var before;
            if (before = stream.match(/^<<\s*/)) {
              var quoted = stream.eat(/['"]/);
              stream.eatWhile(/[\w\.]/);
              var delim = stream.current().slice(before[0].length + (quoted ? 2 : 1));
              if (quoted)
                stream.eat(quoted);
              if (delim) {
                (state.tokStack || (state.tokStack = [])).push(delim, 0);
                state.tokenize = phpString(delim, quoted != "'");
                return "string";
              }
            }
            return false;
          },
          "#": function(stream) {
            while (!stream.eol() && !stream.match("?>", false))
              stream.next();
            return "comment";
          },
          "/": function(stream) {
            if (stream.eat("/")) {
              while (!stream.eol() && !stream.match("?>", false))
                stream.next();
              return "comment";
            }
            return false;
          },
          '"': function(_stream, state) {
            (state.tokStack || (state.tokStack = [])).push('"', 0);
            state.tokenize = phpString('"');
            return "string";
          },
          "{": function(_stream, state) {
            if (state.tokStack && state.tokStack.length)
              state.tokStack[state.tokStack.length - 1]++;
            return false;
          },
          "}": function(_stream, state) {
            if (state.tokStack && state.tokStack.length > 0 && !--state.tokStack[state.tokStack.length - 1]) {
              state.tokenize = phpString(state.tokStack[state.tokStack.length - 2]);
            }
            return false;
          }
        }
      };
      CodeMirror3.defineMode("php", function(config, parserConfig) {
        var htmlMode = CodeMirror3.getMode(config, parserConfig && parserConfig.htmlMode || "text/html");
        var phpMode = CodeMirror3.getMode(config, phpConfig);
        function dispatch(stream, state) {
          var isPHP = state.curMode == phpMode;
          if (stream.sol() && state.pending && state.pending != '"' && state.pending != "'")
            state.pending = null;
          if (!isPHP) {
            if (stream.match(/^<\?\w*/)) {
              state.curMode = phpMode;
              if (!state.php)
                state.php = CodeMirror3.startState(phpMode, htmlMode.indent(state.html, "", ""));
              state.curState = state.php;
              return "meta";
            }
            if (state.pending == '"' || state.pending == "'") {
              while (!stream.eol() && stream.next() != state.pending) {
              }
              var style = "string";
            } else if (state.pending && stream.pos < state.pending.end) {
              stream.pos = state.pending.end;
              var style = state.pending.style;
            } else {
              var style = htmlMode.token(stream, state.curState);
            }
            if (state.pending)
              state.pending = null;
            var cur = stream.current(), openPHP = cur.search(/<\?/), m;
            if (openPHP != -1) {
              if (style == "string" && (m = cur.match(/[\'\"]$/)) && !/\?>/.test(cur))
                state.pending = m[0];
              else
                state.pending = { end: stream.pos, style };
              stream.backUp(cur.length - openPHP);
            }
            return style;
          } else if (isPHP && state.php.tokenize == null && stream.match("?>")) {
            state.curMode = htmlMode;
            state.curState = state.html;
            if (!state.php.context.prev)
              state.php = null;
            return "meta";
          } else {
            return phpMode.token(stream, state.curState);
          }
        }
        return {
          startState: function() {
            var html = CodeMirror3.startState(htmlMode);
            var php = parserConfig.startOpen ? CodeMirror3.startState(phpMode) : null;
            return {
              html,
              php,
              curMode: parserConfig.startOpen ? phpMode : htmlMode,
              curState: parserConfig.startOpen ? php : html,
              pending: null
            };
          },
          copyState: function(state) {
            var html = state.html, htmlNew = CodeMirror3.copyState(htmlMode, html), php = state.php, phpNew = php && CodeMirror3.copyState(phpMode, php), cur;
            if (state.curMode == htmlMode)
              cur = htmlNew;
            else
              cur = phpNew;
            return {
              html: htmlNew,
              php: phpNew,
              curMode: state.curMode,
              curState: cur,
              pending: state.pending
            };
          },
          token: dispatch,
          indent: function(state, textAfter, line) {
            if (state.curMode != phpMode && /^\s*<\//.test(textAfter) || state.curMode == phpMode && /^\?>/.test(textAfter))
              return htmlMode.indent(state.html, textAfter, line);
            return state.curMode.indent(state.curState, textAfter, line);
          },
          blockCommentStart: "/*",
          blockCommentEnd: "*/",
          lineComment: "//",
          innerMode: function(state) {
            return { state: state.curState, mode: state.curMode };
          }
        };
      }, "htmlmixed", "clike");
      CodeMirror3.defineMIME("application/x-httpd-php", "php");
      CodeMirror3.defineMIME("application/x-httpd-php-open", { name: "php", startOpen: true });
      CodeMirror3.defineMIME("text/x-php", phpConfig);
    });
  }
});

// node_modules/codemirror/mode/powershell/powershell.js
var require_powershell = __commonJS({
  "node_modules/codemirror/mode/powershell/powershell.js"(exports, module) {
    (function(mod) {
      "use strict";
      if (typeof exports == "object" && typeof module == "object")
        mod(require_codemirror());
      else if (typeof define == "function" && define.amd)
        define(["../../lib/codemirror"], mod);
      else
        mod(window.CodeMirror);
    })(function(CodeMirror3) {
      "use strict";
      CodeMirror3.defineMode("powershell", function() {
        function buildRegexp(patterns, options) {
          options = options || {};
          var prefix = options.prefix !== void 0 ? options.prefix : "^";
          var suffix = options.suffix !== void 0 ? options.suffix : "\\b";
          for (var i = 0; i < patterns.length; i++) {
            if (patterns[i] instanceof RegExp) {
              patterns[i] = patterns[i].source;
            } else {
              patterns[i] = patterns[i].replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
            }
          }
          return new RegExp(prefix + "(" + patterns.join("|") + ")" + suffix, "i");
        }
        var notCharacterOrDash = "(?=[^A-Za-z\\d\\-_]|$)";
        var varNames = /[\w\-:]/;
        var keywords = buildRegexp([
          /begin|break|catch|continue|data|default|do|dynamicparam/,
          /else|elseif|end|exit|filter|finally|for|foreach|from|function|if|in/,
          /param|process|return|switch|throw|trap|try|until|where|while/
        ], { suffix: notCharacterOrDash });
        var punctuation = /[\[\]{},;`\\\.]|@[({]/;
        var wordOperators = buildRegexp([
          "f",
          /b?not/,
          /[ic]?split/,
          "join",
          /is(not)?/,
          "as",
          /[ic]?(eq|ne|[gl][te])/,
          /[ic]?(not)?(like|match|contains)/,
          /[ic]?replace/,
          /b?(and|or|xor)/
        ], { prefix: "-" });
        var symbolOperators = /[+\-*\/%]=|\+\+|--|\.\.|[+\-*&^%:=!|\/]|<(?!#)|(?!#)>/;
        var operators = buildRegexp([wordOperators, symbolOperators], { suffix: "" });
        var numbers = /^((0x[\da-f]+)|((\d+\.\d+|\d\.|\.\d+|\d+)(e[\+\-]?\d+)?))[ld]?([kmgtp]b)?/i;
        var identifiers = /^[A-Za-z\_][A-Za-z\-\_\d]*\b/;
        var symbolBuiltins = /[A-Z]:|%|\?/i;
        var namedBuiltins = buildRegexp([
          /Add-(Computer|Content|History|Member|PSSnapin|Type)/,
          /Checkpoint-Computer/,
          /Clear-(Content|EventLog|History|Host|Item(Property)?|Variable)/,
          /Compare-Object/,
          /Complete-Transaction/,
          /Connect-PSSession/,
          /ConvertFrom-(Csv|Json|SecureString|StringData)/,
          /Convert-Path/,
          /ConvertTo-(Csv|Html|Json|SecureString|Xml)/,
          /Copy-Item(Property)?/,
          /Debug-Process/,
          /Disable-(ComputerRestore|PSBreakpoint|PSRemoting|PSSessionConfiguration)/,
          /Disconnect-PSSession/,
          /Enable-(ComputerRestore|PSBreakpoint|PSRemoting|PSSessionConfiguration)/,
          /(Enter|Exit)-PSSession/,
          /Export-(Alias|Clixml|Console|Counter|Csv|FormatData|ModuleMember|PSSession)/,
          /ForEach-Object/,
          /Format-(Custom|List|Table|Wide)/,
          new RegExp("Get-(Acl|Alias|AuthenticodeSignature|ChildItem|Command|ComputerRestorePoint|Content|ControlPanelItem|Counter|Credential|Culture|Date|Event|EventLog|EventSubscriber|ExecutionPolicy|FormatData|Help|History|Host|HotFix|Item|ItemProperty|Job|Location|Member|Module|PfxCertificate|Process|PSBreakpoint|PSCallStack|PSDrive|PSProvider|PSSession|PSSessionConfiguration|PSSnapin|Random|Service|TraceSource|Transaction|TypeData|UICulture|Unique|Variable|Verb|WinEvent|WmiObject)"),
          /Group-Object/,
          /Import-(Alias|Clixml|Counter|Csv|LocalizedData|Module|PSSession)/,
          /ImportSystemModules/,
          /Invoke-(Command|Expression|History|Item|RestMethod|WebRequest|WmiMethod)/,
          /Join-Path/,
          /Limit-EventLog/,
          /Measure-(Command|Object)/,
          /Move-Item(Property)?/,
          new RegExp("New-(Alias|Event|EventLog|Item(Property)?|Module|ModuleManifest|Object|PSDrive|PSSession|PSSessionConfigurationFile|PSSessionOption|PSTransportOption|Service|TimeSpan|Variable|WebServiceProxy|WinEvent)"),
          /Out-(Default|File|GridView|Host|Null|Printer|String)/,
          /Pause/,
          /(Pop|Push)-Location/,
          /Read-Host/,
          /Receive-(Job|PSSession)/,
          /Register-(EngineEvent|ObjectEvent|PSSessionConfiguration|WmiEvent)/,
          /Remove-(Computer|Event|EventLog|Item(Property)?|Job|Module|PSBreakpoint|PSDrive|PSSession|PSSnapin|TypeData|Variable|WmiObject)/,
          /Rename-(Computer|Item(Property)?)/,
          /Reset-ComputerMachinePassword/,
          /Resolve-Path/,
          /Restart-(Computer|Service)/,
          /Restore-Computer/,
          /Resume-(Job|Service)/,
          /Save-Help/,
          /Select-(Object|String|Xml)/,
          /Send-MailMessage/,
          new RegExp("Set-(Acl|Alias|AuthenticodeSignature|Content|Date|ExecutionPolicy|Item(Property)?|Location|PSBreakpoint|PSDebug|PSSessionConfiguration|Service|StrictMode|TraceSource|Variable|WmiInstance)"),
          /Show-(Command|ControlPanelItem|EventLog)/,
          /Sort-Object/,
          /Split-Path/,
          /Start-(Job|Process|Service|Sleep|Transaction|Transcript)/,
          /Stop-(Computer|Job|Process|Service|Transcript)/,
          /Suspend-(Job|Service)/,
          /TabExpansion2/,
          /Tee-Object/,
          /Test-(ComputerSecureChannel|Connection|ModuleManifest|Path|PSSessionConfigurationFile)/,
          /Trace-Command/,
          /Unblock-File/,
          /Undo-Transaction/,
          /Unregister-(Event|PSSessionConfiguration)/,
          /Update-(FormatData|Help|List|TypeData)/,
          /Use-Transaction/,
          /Wait-(Event|Job|Process)/,
          /Where-Object/,
          /Write-(Debug|Error|EventLog|Host|Output|Progress|Verbose|Warning)/,
          /cd|help|mkdir|more|oss|prompt/,
          /ac|asnp|cat|cd|chdir|clc|clear|clhy|cli|clp|cls|clv|cnsn|compare|copy|cp|cpi|cpp|cvpa|dbp|del|diff|dir|dnsn|ebp/,
          /echo|epal|epcsv|epsn|erase|etsn|exsn|fc|fl|foreach|ft|fw|gal|gbp|gc|gci|gcm|gcs|gdr|ghy|gi|gjb|gl|gm|gmo|gp|gps/,
          /group|gsn|gsnp|gsv|gu|gv|gwmi|h|history|icm|iex|ihy|ii|ipal|ipcsv|ipmo|ipsn|irm|ise|iwmi|iwr|kill|lp|ls|man|md/,
          /measure|mi|mount|move|mp|mv|nal|ndr|ni|nmo|npssc|nsn|nv|ogv|oh|popd|ps|pushd|pwd|r|rbp|rcjb|rcsn|rd|rdr|ren|ri/,
          /rjb|rm|rmdir|rmo|rni|rnp|rp|rsn|rsnp|rujb|rv|rvpa|rwmi|sajb|sal|saps|sasv|sbp|sc|select|set|shcm|si|sl|sleep|sls/,
          /sort|sp|spjb|spps|spsv|start|sujb|sv|swmi|tee|trcm|type|where|wjb|write/
        ], { prefix: "", suffix: "" });
        var variableBuiltins = buildRegexp([
          /[$?^_]|Args|ConfirmPreference|ConsoleFileName|DebugPreference|Error|ErrorActionPreference|ErrorView|ExecutionContext/,
          /FormatEnumerationLimit|Home|Host|Input|MaximumAliasCount|MaximumDriveCount|MaximumErrorCount|MaximumFunctionCount/,
          /MaximumHistoryCount|MaximumVariableCount|MyInvocation|NestedPromptLevel|OutputEncoding|Pid|Profile|ProgressPreference/,
          /PSBoundParameters|PSCommandPath|PSCulture|PSDefaultParameterValues|PSEmailServer|PSHome|PSScriptRoot|PSSessionApplicationName/,
          /PSSessionConfigurationName|PSSessionOption|PSUICulture|PSVersionTable|Pwd|ShellId|StackTrace|VerbosePreference/,
          /WarningPreference|WhatIfPreference/,
          /Event|EventArgs|EventSubscriber|Sender/,
          /Matches|Ofs|ForEach|LastExitCode|PSCmdlet|PSItem|PSSenderInfo|This/,
          /true|false|null/
        ], { prefix: "\\$", suffix: "" });
        var builtins = buildRegexp([symbolBuiltins, namedBuiltins, variableBuiltins], { suffix: notCharacterOrDash });
        var grammar = {
          keyword: keywords,
          number: numbers,
          operator: operators,
          builtin: builtins,
          punctuation,
          identifier: identifiers
        };
        function tokenBase(stream, state) {
          var parent = state.returnStack[state.returnStack.length - 1];
          if (parent && parent.shouldReturnFrom(state)) {
            state.tokenize = parent.tokenize;
            state.returnStack.pop();
            return state.tokenize(stream, state);
          }
          if (stream.eatSpace()) {
            return null;
          }
          if (stream.eat("(")) {
            state.bracketNesting += 1;
            return "punctuation";
          }
          if (stream.eat(")")) {
            state.bracketNesting -= 1;
            return "punctuation";
          }
          for (var key in grammar) {
            if (stream.match(grammar[key])) {
              return key;
            }
          }
          var ch = stream.next();
          if (ch === "'") {
            return tokenSingleQuoteString(stream, state);
          }
          if (ch === "$") {
            return tokenVariable(stream, state);
          }
          if (ch === '"') {
            return tokenDoubleQuoteString(stream, state);
          }
          if (ch === "<" && stream.eat("#")) {
            state.tokenize = tokenComment;
            return tokenComment(stream, state);
          }
          if (ch === "#") {
            stream.skipToEnd();
            return "comment";
          }
          if (ch === "@") {
            var quoteMatch = stream.eat(/["']/);
            if (quoteMatch && stream.eol()) {
              state.tokenize = tokenMultiString;
              state.startQuote = quoteMatch[0];
              return tokenMultiString(stream, state);
            } else if (stream.eol()) {
              return "error";
            } else if (stream.peek().match(/[({]/)) {
              return "punctuation";
            } else if (stream.peek().match(varNames)) {
              return tokenVariable(stream, state);
            }
          }
          return "error";
        }
        function tokenSingleQuoteString(stream, state) {
          var ch;
          while ((ch = stream.peek()) != null) {
            stream.next();
            if (ch === "'" && !stream.eat("'")) {
              state.tokenize = tokenBase;
              return "string";
            }
          }
          return "error";
        }
        function tokenDoubleQuoteString(stream, state) {
          var ch;
          while ((ch = stream.peek()) != null) {
            if (ch === "$") {
              state.tokenize = tokenStringInterpolation;
              return "string";
            }
            stream.next();
            if (ch === "`") {
              stream.next();
              continue;
            }
            if (ch === '"' && !stream.eat('"')) {
              state.tokenize = tokenBase;
              return "string";
            }
          }
          return "error";
        }
        function tokenStringInterpolation(stream, state) {
          return tokenInterpolation(stream, state, tokenDoubleQuoteString);
        }
        function tokenMultiStringReturn(stream, state) {
          state.tokenize = tokenMultiString;
          state.startQuote = '"';
          return tokenMultiString(stream, state);
        }
        function tokenHereStringInterpolation(stream, state) {
          return tokenInterpolation(stream, state, tokenMultiStringReturn);
        }
        function tokenInterpolation(stream, state, parentTokenize) {
          if (stream.match("$(")) {
            var savedBracketNesting = state.bracketNesting;
            state.returnStack.push({
              /*jshint loopfunc:true */
              shouldReturnFrom: function(state2) {
                return state2.bracketNesting === savedBracketNesting;
              },
              tokenize: parentTokenize
            });
            state.tokenize = tokenBase;
            state.bracketNesting += 1;
            return "punctuation";
          } else {
            stream.next();
            state.returnStack.push({
              shouldReturnFrom: function() {
                return true;
              },
              tokenize: parentTokenize
            });
            state.tokenize = tokenVariable;
            return state.tokenize(stream, state);
          }
        }
        function tokenComment(stream, state) {
          var maybeEnd = false, ch;
          while ((ch = stream.next()) != null) {
            if (maybeEnd && ch == ">") {
              state.tokenize = tokenBase;
              break;
            }
            maybeEnd = ch === "#";
          }
          return "comment";
        }
        function tokenVariable(stream, state) {
          var ch = stream.peek();
          if (stream.eat("{")) {
            state.tokenize = tokenVariableWithBraces;
            return tokenVariableWithBraces(stream, state);
          } else if (ch != void 0 && ch.match(varNames)) {
            stream.eatWhile(varNames);
            state.tokenize = tokenBase;
            return "variable-2";
          } else {
            state.tokenize = tokenBase;
            return "error";
          }
        }
        function tokenVariableWithBraces(stream, state) {
          var ch;
          while ((ch = stream.next()) != null) {
            if (ch === "}") {
              state.tokenize = tokenBase;
              break;
            }
          }
          return "variable-2";
        }
        function tokenMultiString(stream, state) {
          var quote = state.startQuote;
          if (stream.sol() && stream.match(new RegExp(quote + "@"))) {
            state.tokenize = tokenBase;
          } else if (quote === '"') {
            while (!stream.eol()) {
              var ch = stream.peek();
              if (ch === "$") {
                state.tokenize = tokenHereStringInterpolation;
                return "string";
              }
              stream.next();
              if (ch === "`") {
                stream.next();
              }
            }
          } else {
            stream.skipToEnd();
          }
          return "string";
        }
        var external = {
          startState: function() {
            return {
              returnStack: [],
              bracketNesting: 0,
              tokenize: tokenBase
            };
          },
          token: function(stream, state) {
            return state.tokenize(stream, state);
          },
          blockCommentStart: "<#",
          blockCommentEnd: "#>",
          lineComment: "#",
          fold: "brace"
        };
        return external;
      });
      CodeMirror3.defineMIME("application/x-powershell", "powershell");
    });
  }
});

// node_modules/codemirror/mode/properties/properties.js
var require_properties = __commonJS({
  "node_modules/codemirror/mode/properties/properties.js"(exports, module) {
    (function(mod) {
      if (typeof exports == "object" && typeof module == "object")
        mod(require_codemirror());
      else if (typeof define == "function" && define.amd)
        define(["../../lib/codemirror"], mod);
      else
        mod(CodeMirror);
    })(function(CodeMirror3) {
      "use strict";
      CodeMirror3.defineMode("properties", function() {
        return {
          token: function(stream, state) {
            var sol = stream.sol() || state.afterSection;
            var eol = stream.eol();
            state.afterSection = false;
            if (sol) {
              if (state.nextMultiline) {
                state.inMultiline = true;
                state.nextMultiline = false;
              } else {
                state.position = "def";
              }
            }
            if (eol && !state.nextMultiline) {
              state.inMultiline = false;
              state.position = "def";
            }
            if (sol) {
              while (stream.eatSpace()) {
              }
            }
            var ch = stream.next();
            if (sol && (ch === "#" || ch === "!" || ch === ";")) {
              state.position = "comment";
              stream.skipToEnd();
              return "comment";
            } else if (sol && ch === "[") {
              state.afterSection = true;
              stream.skipTo("]");
              stream.eat("]");
              return "header";
            } else if (ch === "=" || ch === ":") {
              state.position = "quote";
              return null;
            } else if (ch === "\\" && state.position === "quote") {
              if (stream.eol()) {
                state.nextMultiline = true;
              }
            }
            return state.position;
          },
          startState: function() {
            return {
              position: "def",
              // Current position, "def", "quote" or "comment"
              nextMultiline: false,
              // Is the next line multiline value
              inMultiline: false,
              // Is the current line a multiline value
              afterSection: false
              // Did we just open a section
            };
          }
        };
      });
      CodeMirror3.defineMIME("text/x-properties", "properties");
      CodeMirror3.defineMIME("text/x-ini", "properties");
    });
  }
});

// node_modules/codemirror/mode/python/python.js
var require_python = __commonJS({
  "node_modules/codemirror/mode/python/python.js"(exports, module) {
    (function(mod) {
      if (typeof exports == "object" && typeof module == "object")
        mod(require_codemirror());
      else if (typeof define == "function" && define.amd)
        define(["../../lib/codemirror"], mod);
      else
        mod(CodeMirror);
    })(function(CodeMirror3) {
      "use strict";
      function wordRegexp(words2) {
        return new RegExp("^((" + words2.join(")|(") + "))\\b");
      }
      var wordOperators = wordRegexp(["and", "or", "not", "is"]);
      var commonKeywords = [
        "as",
        "assert",
        "break",
        "class",
        "continue",
        "def",
        "del",
        "elif",
        "else",
        "except",
        "finally",
        "for",
        "from",
        "global",
        "if",
        "import",
        "lambda",
        "pass",
        "raise",
        "return",
        "try",
        "while",
        "with",
        "yield",
        "in"
      ];
      var commonBuiltins = [
        "abs",
        "all",
        "any",
        "bin",
        "bool",
        "bytearray",
        "callable",
        "chr",
        "classmethod",
        "compile",
        "complex",
        "delattr",
        "dict",
        "dir",
        "divmod",
        "enumerate",
        "eval",
        "filter",
        "float",
        "format",
        "frozenset",
        "getattr",
        "globals",
        "hasattr",
        "hash",
        "help",
        "hex",
        "id",
        "input",
        "int",
        "isinstance",
        "issubclass",
        "iter",
        "len",
        "list",
        "locals",
        "map",
        "max",
        "memoryview",
        "min",
        "next",
        "object",
        "oct",
        "open",
        "ord",
        "pow",
        "property",
        "range",
        "repr",
        "reversed",
        "round",
        "set",
        "setattr",
        "slice",
        "sorted",
        "staticmethod",
        "str",
        "sum",
        "super",
        "tuple",
        "type",
        "vars",
        "zip",
        "__import__",
        "NotImplemented",
        "Ellipsis",
        "__debug__"
      ];
      CodeMirror3.registerHelper("hintWords", "python", commonKeywords.concat(commonBuiltins).concat(["exec", "print"]));
      function top(state) {
        return state.scopes[state.scopes.length - 1];
      }
      CodeMirror3.defineMode("python", function(conf, parserConf) {
        var ERRORCLASS = "error";
        var delimiters = parserConf.delimiters || parserConf.singleDelimiters || /^[\(\)\[\]\{\}@,:`=;\.\\]/;
        var operators = [
          parserConf.singleOperators,
          parserConf.doubleOperators,
          parserConf.doubleDelimiters,
          parserConf.tripleDelimiters,
          parserConf.operators || /^([-+*/%\/&|^]=?|[<>=]+|\/\/=?|\*\*=?|!=|[~!@]|\.\.\.)/
        ];
        for (var i = 0; i < operators.length; i++)
          if (!operators[i])
            operators.splice(i--, 1);
        var hangingIndent = parserConf.hangingIndent || conf.indentUnit;
        var myKeywords = commonKeywords, myBuiltins = commonBuiltins;
        if (parserConf.extra_keywords != void 0)
          myKeywords = myKeywords.concat(parserConf.extra_keywords);
        if (parserConf.extra_builtins != void 0)
          myBuiltins = myBuiltins.concat(parserConf.extra_builtins);
        var py3 = !(parserConf.version && Number(parserConf.version) < 3);
        if (py3) {
          var identifiers = parserConf.identifiers || /^[_A-Za-z\u00A1-\uFFFF][_A-Za-z0-9\u00A1-\uFFFF]*/;
          myKeywords = myKeywords.concat(["nonlocal", "False", "True", "None", "async", "await"]);
          myBuiltins = myBuiltins.concat(["ascii", "bytes", "exec", "print"]);
          var stringPrefixes = new RegExp(`^(([rbuf]|(br)|(rb)|(fr)|(rf))?('{3}|"{3}|['"]))`, "i");
        } else {
          var identifiers = parserConf.identifiers || /^[_A-Za-z][_A-Za-z0-9]*/;
          myKeywords = myKeywords.concat(["exec", "print"]);
          myBuiltins = myBuiltins.concat([
            "apply",
            "basestring",
            "buffer",
            "cmp",
            "coerce",
            "execfile",
            "file",
            "intern",
            "long",
            "raw_input",
            "reduce",
            "reload",
            "unichr",
            "unicode",
            "xrange",
            "False",
            "True",
            "None"
          ]);
          var stringPrefixes = new RegExp(`^(([rubf]|(ur)|(br))?('{3}|"{3}|['"]))`, "i");
        }
        var keywords = wordRegexp(myKeywords);
        var builtins = wordRegexp(myBuiltins);
        function tokenBase(stream, state) {
          var sol = stream.sol() && state.lastToken != "\\";
          if (sol)
            state.indent = stream.indentation();
          if (sol && top(state).type == "py") {
            var scopeOffset = top(state).offset;
            if (stream.eatSpace()) {
              var lineOffset = stream.indentation();
              if (lineOffset > scopeOffset)
                pushPyScope(state);
              else if (lineOffset < scopeOffset && dedent(stream, state) && stream.peek() != "#")
                state.errorToken = true;
              return null;
            } else {
              var style = tokenBaseInner(stream, state);
              if (scopeOffset > 0 && dedent(stream, state))
                style += " " + ERRORCLASS;
              return style;
            }
          }
          return tokenBaseInner(stream, state);
        }
        function tokenBaseInner(stream, state, inFormat) {
          if (stream.eatSpace())
            return null;
          if (!inFormat && stream.match(/^#.*/))
            return "comment";
          if (stream.match(/^[0-9\.]/, false)) {
            var floatLiteral = false;
            if (stream.match(/^[\d_]*\.\d+(e[\+\-]?\d+)?/i)) {
              floatLiteral = true;
            }
            if (stream.match(/^[\d_]+\.\d*/)) {
              floatLiteral = true;
            }
            if (stream.match(/^\.\d+/)) {
              floatLiteral = true;
            }
            if (floatLiteral) {
              stream.eat(/J/i);
              return "number";
            }
            var intLiteral = false;
            if (stream.match(/^0x[0-9a-f_]+/i))
              intLiteral = true;
            if (stream.match(/^0b[01_]+/i))
              intLiteral = true;
            if (stream.match(/^0o[0-7_]+/i))
              intLiteral = true;
            if (stream.match(/^[1-9][\d_]*(e[\+\-]?[\d_]+)?/)) {
              stream.eat(/J/i);
              intLiteral = true;
            }
            if (stream.match(/^0(?![\dx])/i))
              intLiteral = true;
            if (intLiteral) {
              stream.eat(/L/i);
              return "number";
            }
          }
          if (stream.match(stringPrefixes)) {
            var isFmtString = stream.current().toLowerCase().indexOf("f") !== -1;
            if (!isFmtString) {
              state.tokenize = tokenStringFactory(stream.current(), state.tokenize);
              return state.tokenize(stream, state);
            } else {
              state.tokenize = formatStringFactory(stream.current(), state.tokenize);
              return state.tokenize(stream, state);
            }
          }
          for (var i2 = 0; i2 < operators.length; i2++)
            if (stream.match(operators[i2]))
              return "operator";
          if (stream.match(delimiters))
            return "punctuation";
          if (state.lastToken == "." && stream.match(identifiers))
            return "property";
          if (stream.match(keywords) || stream.match(wordOperators))
            return "keyword";
          if (stream.match(builtins))
            return "builtin";
          if (stream.match(/^(self|cls)\b/))
            return "variable-2";
          if (stream.match(identifiers)) {
            if (state.lastToken == "def" || state.lastToken == "class")
              return "def";
            return "variable";
          }
          stream.next();
          return inFormat ? null : ERRORCLASS;
        }
        function formatStringFactory(delimiter, tokenOuter) {
          while ("rubf".indexOf(delimiter.charAt(0).toLowerCase()) >= 0)
            delimiter = delimiter.substr(1);
          var singleline = delimiter.length == 1;
          var OUTCLASS = "string";
          function tokenNestedExpr(depth) {
            return function(stream, state) {
              var inner = tokenBaseInner(stream, state, true);
              if (inner == "punctuation") {
                if (stream.current() == "{") {
                  state.tokenize = tokenNestedExpr(depth + 1);
                } else if (stream.current() == "}") {
                  if (depth > 1)
                    state.tokenize = tokenNestedExpr(depth - 1);
                  else
                    state.tokenize = tokenString;
                }
              }
              return inner;
            };
          }
          function tokenString(stream, state) {
            while (!stream.eol()) {
              stream.eatWhile(/[^'"\{\}\\]/);
              if (stream.eat("\\")) {
                stream.next();
                if (singleline && stream.eol())
                  return OUTCLASS;
              } else if (stream.match(delimiter)) {
                state.tokenize = tokenOuter;
                return OUTCLASS;
              } else if (stream.match("{{")) {
                return OUTCLASS;
              } else if (stream.match("{", false)) {
                state.tokenize = tokenNestedExpr(0);
                if (stream.current())
                  return OUTCLASS;
                else
                  return state.tokenize(stream, state);
              } else if (stream.match("}}")) {
                return OUTCLASS;
              } else if (stream.match("}")) {
                return ERRORCLASS;
              } else {
                stream.eat(/['"]/);
              }
            }
            if (singleline) {
              if (parserConf.singleLineStringErrors)
                return ERRORCLASS;
              else
                state.tokenize = tokenOuter;
            }
            return OUTCLASS;
          }
          tokenString.isString = true;
          return tokenString;
        }
        function tokenStringFactory(delimiter, tokenOuter) {
          while ("rubf".indexOf(delimiter.charAt(0).toLowerCase()) >= 0)
            delimiter = delimiter.substr(1);
          var singleline = delimiter.length == 1;
          var OUTCLASS = "string";
          function tokenString(stream, state) {
            while (!stream.eol()) {
              stream.eatWhile(/[^'"\\]/);
              if (stream.eat("\\")) {
                stream.next();
                if (singleline && stream.eol())
                  return OUTCLASS;
              } else if (stream.match(delimiter)) {
                state.tokenize = tokenOuter;
                return OUTCLASS;
              } else {
                stream.eat(/['"]/);
              }
            }
            if (singleline) {
              if (parserConf.singleLineStringErrors)
                return ERRORCLASS;
              else
                state.tokenize = tokenOuter;
            }
            return OUTCLASS;
          }
          tokenString.isString = true;
          return tokenString;
        }
        function pushPyScope(state) {
          while (top(state).type != "py")
            state.scopes.pop();
          state.scopes.push({
            offset: top(state).offset + conf.indentUnit,
            type: "py",
            align: null
          });
        }
        function pushBracketScope(stream, state, type) {
          var align = stream.match(/^[\s\[\{\(]*(?:#|$)/, false) ? null : stream.column() + 1;
          state.scopes.push({
            offset: state.indent + hangingIndent,
            type,
            align
          });
        }
        function dedent(stream, state) {
          var indented = stream.indentation();
          while (state.scopes.length > 1 && top(state).offset > indented) {
            if (top(state).type != "py")
              return true;
            state.scopes.pop();
          }
          return top(state).offset != indented;
        }
        function tokenLexer(stream, state) {
          if (stream.sol()) {
            state.beginningOfLine = true;
            state.dedent = false;
          }
          var style = state.tokenize(stream, state);
          var current = stream.current();
          if (state.beginningOfLine && current == "@")
            return stream.match(identifiers, false) ? "meta" : py3 ? "operator" : ERRORCLASS;
          if (/\S/.test(current))
            state.beginningOfLine = false;
          if ((style == "variable" || style == "builtin") && state.lastToken == "meta")
            style = "meta";
          if (current == "pass" || current == "return")
            state.dedent = true;
          if (current == "lambda")
            state.lambda = true;
          if (current == ":" && !state.lambda && top(state).type == "py" && stream.match(/^\s*(?:#|$)/, false))
            pushPyScope(state);
          if (current.length == 1 && !/string|comment/.test(style)) {
            var delimiter_index = "[({".indexOf(current);
            if (delimiter_index != -1)
              pushBracketScope(stream, state, "])}".slice(delimiter_index, delimiter_index + 1));
            delimiter_index = "])}".indexOf(current);
            if (delimiter_index != -1) {
              if (top(state).type == current)
                state.indent = state.scopes.pop().offset - hangingIndent;
              else
                return ERRORCLASS;
            }
          }
          if (state.dedent && stream.eol() && top(state).type == "py" && state.scopes.length > 1)
            state.scopes.pop();
          return style;
        }
        var external = {
          startState: function(basecolumn) {
            return {
              tokenize: tokenBase,
              scopes: [{ offset: basecolumn || 0, type: "py", align: null }],
              indent: basecolumn || 0,
              lastToken: null,
              lambda: false,
              dedent: 0
            };
          },
          token: function(stream, state) {
            var addErr = state.errorToken;
            if (addErr)
              state.errorToken = false;
            var style = tokenLexer(stream, state);
            if (style && style != "comment")
              state.lastToken = style == "keyword" || style == "punctuation" ? stream.current() : style;
            if (style == "punctuation")
              style = null;
            if (stream.eol() && state.lambda)
              state.lambda = false;
            return addErr ? style + " " + ERRORCLASS : style;
          },
          indent: function(state, textAfter) {
            if (state.tokenize != tokenBase)
              return state.tokenize.isString ? CodeMirror3.Pass : 0;
            var scope = top(state);
            var closing = scope.type == textAfter.charAt(0) || scope.type == "py" && !state.dedent && /^(else:|elif |except |finally:)/.test(textAfter);
            if (scope.align != null)
              return scope.align - (closing ? 1 : 0);
            else
              return scope.offset - (closing ? hangingIndent : 0);
          },
          electricInput: /^\s*([\}\]\)]|else:|elif |except |finally:)$/,
          closeBrackets: { triples: `'"` },
          lineComment: "#",
          fold: "indent"
        };
        return external;
      });
      CodeMirror3.defineMIME("text/x-python", "python");
      var words = function(str) {
        return str.split(" ");
      };
      CodeMirror3.defineMIME("text/x-cython", {
        name: "python",
        extra_keywords: words("by cdef cimport cpdef ctypedef enum except extern gil include nogil property public readonly struct union DEF IF ELIF ELSE")
      });
    });
  }
});

// node_modules/codemirror/mode/ruby/ruby.js
var require_ruby = __commonJS({
  "node_modules/codemirror/mode/ruby/ruby.js"(exports, module) {
    (function(mod) {
      if (typeof exports == "object" && typeof module == "object")
        mod(require_codemirror());
      else if (typeof define == "function" && define.amd)
        define(["../../lib/codemirror"], mod);
      else
        mod(CodeMirror);
    })(function(CodeMirror3) {
      "use strict";
      function wordObj(words) {
        var o = {};
        for (var i = 0, e = words.length; i < e; ++i)
          o[words[i]] = true;
        return o;
      }
      var keywordList = [
        "alias",
        "and",
        "BEGIN",
        "begin",
        "break",
        "case",
        "class",
        "def",
        "defined?",
        "do",
        "else",
        "elsif",
        "END",
        "end",
        "ensure",
        "false",
        "for",
        "if",
        "in",
        "module",
        "next",
        "not",
        "or",
        "redo",
        "rescue",
        "retry",
        "return",
        "self",
        "super",
        "then",
        "true",
        "undef",
        "unless",
        "until",
        "when",
        "while",
        "yield",
        "nil",
        "raise",
        "throw",
        "catch",
        "fail",
        "loop",
        "callcc",
        "caller",
        "lambda",
        "proc",
        "public",
        "protected",
        "private",
        "require",
        "load",
        "require_relative",
        "extend",
        "autoload",
        "__END__",
        "__FILE__",
        "__LINE__",
        "__dir__"
      ], keywords = wordObj(keywordList);
      var indentWords = wordObj([
        "def",
        "class",
        "case",
        "for",
        "while",
        "until",
        "module",
        "catch",
        "loop",
        "proc",
        "begin"
      ]);
      var dedentWords = wordObj(["end", "until"]);
      var opening = { "[": "]", "{": "}", "(": ")" };
      var closing = { "]": "[", "}": "{", ")": "(" };
      CodeMirror3.defineMode("ruby", function(config) {
        var curPunc;
        function chain(newtok, stream, state) {
          state.tokenize.push(newtok);
          return newtok(stream, state);
        }
        function tokenBase(stream, state) {
          if (stream.sol() && stream.match("=begin") && stream.eol()) {
            state.tokenize.push(readBlockComment);
            return "comment";
          }
          if (stream.eatSpace())
            return null;
          var ch = stream.next(), m;
          if (ch == "`" || ch == "'" || ch == '"') {
            return chain(readQuoted(ch, "string", ch == '"' || ch == "`"), stream, state);
          } else if (ch == "/") {
            if (regexpAhead(stream))
              return chain(readQuoted(ch, "string-2", true), stream, state);
            else
              return "operator";
          } else if (ch == "%") {
            var style = "string", embed = true;
            if (stream.eat("s"))
              style = "atom";
            else if (stream.eat(/[WQ]/))
              style = "string";
            else if (stream.eat(/[r]/))
              style = "string-2";
            else if (stream.eat(/[wxq]/)) {
              style = "string";
              embed = false;
            }
            var delim = stream.eat(/[^\w\s=]/);
            if (!delim)
              return "operator";
            if (opening.propertyIsEnumerable(delim))
              delim = opening[delim];
            return chain(readQuoted(delim, style, embed, true), stream, state);
          } else if (ch == "#") {
            stream.skipToEnd();
            return "comment";
          } else if (ch == "<" && (m = stream.match(/^<([-~])[\`\"\']?([a-zA-Z_?]\w*)[\`\"\']?(?:;|$)/))) {
            return chain(readHereDoc(m[2], m[1]), stream, state);
          } else if (ch == "0") {
            if (stream.eat("x"))
              stream.eatWhile(/[\da-fA-F]/);
            else if (stream.eat("b"))
              stream.eatWhile(/[01]/);
            else
              stream.eatWhile(/[0-7]/);
            return "number";
          } else if (/\d/.test(ch)) {
            stream.match(/^[\d_]*(?:\.[\d_]+)?(?:[eE][+\-]?[\d_]+)?/);
            return "number";
          } else if (ch == "?") {
            while (stream.match(/^\\[CM]-/)) {
            }
            if (stream.eat("\\"))
              stream.eatWhile(/\w/);
            else
              stream.next();
            return "string";
          } else if (ch == ":") {
            if (stream.eat("'"))
              return chain(readQuoted("'", "atom", false), stream, state);
            if (stream.eat('"'))
              return chain(readQuoted('"', "atom", true), stream, state);
            if (stream.eat(/[\<\>]/)) {
              stream.eat(/[\<\>]/);
              return "atom";
            }
            if (stream.eat(/[\+\-\*\/\&\|\:\!]/)) {
              return "atom";
            }
            if (stream.eat(/[a-zA-Z$@_\xa1-\uffff]/)) {
              stream.eatWhile(/[\w$\xa1-\uffff]/);
              stream.eat(/[\?\!\=]/);
              return "atom";
            }
            return "operator";
          } else if (ch == "@" && stream.match(/^@?[a-zA-Z_\xa1-\uffff]/)) {
            stream.eat("@");
            stream.eatWhile(/[\w\xa1-\uffff]/);
            return "variable-2";
          } else if (ch == "$") {
            if (stream.eat(/[a-zA-Z_]/)) {
              stream.eatWhile(/[\w]/);
            } else if (stream.eat(/\d/)) {
              stream.eat(/\d/);
            } else {
              stream.next();
            }
            return "variable-3";
          } else if (/[a-zA-Z_\xa1-\uffff]/.test(ch)) {
            stream.eatWhile(/[\w\xa1-\uffff]/);
            stream.eat(/[\?\!]/);
            if (stream.eat(":"))
              return "atom";
            return "ident";
          } else if (ch == "|" && (state.varList || state.lastTok == "{" || state.lastTok == "do")) {
            curPunc = "|";
            return null;
          } else if (/[\(\)\[\]{}\\;]/.test(ch)) {
            curPunc = ch;
            return null;
          } else if (ch == "-" && stream.eat(">")) {
            return "arrow";
          } else if (/[=+\-\/*:\.^%<>~|]/.test(ch)) {
            var more = stream.eatWhile(/[=+\-\/*:\.^%<>~|]/);
            if (ch == "." && !more)
              curPunc = ".";
            return "operator";
          } else {
            return null;
          }
        }
        function regexpAhead(stream) {
          var start = stream.pos, depth = 0, next, found = false, escaped = false;
          while ((next = stream.next()) != null) {
            if (!escaped) {
              if ("[{(".indexOf(next) > -1) {
                depth++;
              } else if ("]})".indexOf(next) > -1) {
                depth--;
                if (depth < 0)
                  break;
              } else if (next == "/" && depth == 0) {
                found = true;
                break;
              }
              escaped = next == "\\";
            } else {
              escaped = false;
            }
          }
          stream.backUp(stream.pos - start);
          return found;
        }
        function tokenBaseUntilBrace(depth) {
          if (!depth)
            depth = 1;
          return function(stream, state) {
            if (stream.peek() == "}") {
              if (depth == 1) {
                state.tokenize.pop();
                return state.tokenize[state.tokenize.length - 1](stream, state);
              } else {
                state.tokenize[state.tokenize.length - 1] = tokenBaseUntilBrace(depth - 1);
              }
            } else if (stream.peek() == "{") {
              state.tokenize[state.tokenize.length - 1] = tokenBaseUntilBrace(depth + 1);
            }
            return tokenBase(stream, state);
          };
        }
        function tokenBaseOnce() {
          var alreadyCalled = false;
          return function(stream, state) {
            if (alreadyCalled) {
              state.tokenize.pop();
              return state.tokenize[state.tokenize.length - 1](stream, state);
            }
            alreadyCalled = true;
            return tokenBase(stream, state);
          };
        }
        function readQuoted(quote, style, embed, unescaped) {
          return function(stream, state) {
            var escaped = false, ch;
            if (state.context.type === "read-quoted-paused") {
              state.context = state.context.prev;
              stream.eat("}");
            }
            while ((ch = stream.next()) != null) {
              if (ch == quote && (unescaped || !escaped)) {
                state.tokenize.pop();
                break;
              }
              if (embed && ch == "#" && !escaped) {
                if (stream.eat("{")) {
                  if (quote == "}") {
                    state.context = { prev: state.context, type: "read-quoted-paused" };
                  }
                  state.tokenize.push(tokenBaseUntilBrace());
                  break;
                } else if (/[@\$]/.test(stream.peek())) {
                  state.tokenize.push(tokenBaseOnce());
                  break;
                }
              }
              escaped = !escaped && ch == "\\";
            }
            return style;
          };
        }
        function readHereDoc(phrase, mayIndent) {
          return function(stream, state) {
            if (mayIndent)
              stream.eatSpace();
            if (stream.match(phrase))
              state.tokenize.pop();
            else
              stream.skipToEnd();
            return "string";
          };
        }
        function readBlockComment(stream, state) {
          if (stream.sol() && stream.match("=end") && stream.eol())
            state.tokenize.pop();
          stream.skipToEnd();
          return "comment";
        }
        return {
          startState: function() {
            return {
              tokenize: [tokenBase],
              indented: 0,
              context: { type: "top", indented: -config.indentUnit },
              continuedLine: false,
              lastTok: null,
              varList: false
            };
          },
          token: function(stream, state) {
            curPunc = null;
            if (stream.sol())
              state.indented = stream.indentation();
            var style = state.tokenize[state.tokenize.length - 1](stream, state), kwtype;
            var thisTok = curPunc;
            if (style == "ident") {
              var word = stream.current();
              style = state.lastTok == "." ? "property" : keywords.propertyIsEnumerable(stream.current()) ? "keyword" : /^[A-Z]/.test(word) ? "tag" : state.lastTok == "def" || state.lastTok == "class" || state.varList ? "def" : "variable";
              if (style == "keyword") {
                thisTok = word;
                if (indentWords.propertyIsEnumerable(word))
                  kwtype = "indent";
                else if (dedentWords.propertyIsEnumerable(word))
                  kwtype = "dedent";
                else if ((word == "if" || word == "unless") && stream.column() == stream.indentation())
                  kwtype = "indent";
                else if (word == "do" && state.context.indented < state.indented)
                  kwtype = "indent";
              }
            }
            if (curPunc || style && style != "comment")
              state.lastTok = thisTok;
            if (curPunc == "|")
              state.varList = !state.varList;
            if (kwtype == "indent" || /[\(\[\{]/.test(curPunc))
              state.context = { prev: state.context, type: curPunc || style, indented: state.indented };
            else if ((kwtype == "dedent" || /[\)\]\}]/.test(curPunc)) && state.context.prev)
              state.context = state.context.prev;
            if (stream.eol())
              state.continuedLine = curPunc == "\\" || style == "operator";
            return style;
          },
          indent: function(state, textAfter) {
            if (state.tokenize[state.tokenize.length - 1] != tokenBase)
              return CodeMirror3.Pass;
            var firstChar = textAfter && textAfter.charAt(0);
            var ct = state.context;
            var closed = ct.type == closing[firstChar] || ct.type == "keyword" && /^(?:end|until|else|elsif|when|rescue)\b/.test(textAfter);
            return ct.indented + (closed ? 0 : config.indentUnit) + (state.continuedLine ? config.indentUnit : 0);
          },
          electricInput: /^\s*(?:end|rescue|elsif|else|\})$/,
          lineComment: "#",
          fold: "indent"
        };
      });
      CodeMirror3.defineMIME("text/x-ruby", "ruby");
      CodeMirror3.registerHelper("hintWords", "ruby", keywordList);
    });
  }
});

// node_modules/codemirror/addon/mode/simple.js
var require_simple = __commonJS({
  "node_modules/codemirror/addon/mode/simple.js"(exports, module) {
    (function(mod) {
      if (typeof exports == "object" && typeof module == "object")
        mod(require_codemirror());
      else if (typeof define == "function" && define.amd)
        define(["../../lib/codemirror"], mod);
      else
        mod(CodeMirror);
    })(function(CodeMirror3) {
      "use strict";
      CodeMirror3.defineSimpleMode = function(name, states) {
        CodeMirror3.defineMode(name, function(config) {
          return CodeMirror3.simpleMode(config, states);
        });
      };
      CodeMirror3.simpleMode = function(config, states) {
        ensureState(states, "start");
        var states_ = {}, meta = states.meta || {}, hasIndentation = false;
        for (var state in states)
          if (state != meta && states.hasOwnProperty(state)) {
            var list = states_[state] = [], orig = states[state];
            for (var i = 0; i < orig.length; i++) {
              var data = orig[i];
              list.push(new Rule(data, states));
              if (data.indent || data.dedent)
                hasIndentation = true;
            }
          }
        var mode = {
          startState: function() {
            return {
              state: "start",
              pending: null,
              local: null,
              localState: null,
              indent: hasIndentation ? [] : null
            };
          },
          copyState: function(state2) {
            var s = {
              state: state2.state,
              pending: state2.pending,
              local: state2.local,
              localState: null,
              indent: state2.indent && state2.indent.slice(0)
            };
            if (state2.localState)
              s.localState = CodeMirror3.copyState(state2.local.mode, state2.localState);
            if (state2.stack)
              s.stack = state2.stack.slice(0);
            for (var pers = state2.persistentStates; pers; pers = pers.next)
              s.persistentStates = {
                mode: pers.mode,
                spec: pers.spec,
                state: pers.state == state2.localState ? s.localState : CodeMirror3.copyState(pers.mode, pers.state),
                next: s.persistentStates
              };
            return s;
          },
          token: tokenFunction(states_, config),
          innerMode: function(state2) {
            return state2.local && { mode: state2.local.mode, state: state2.localState };
          },
          indent: indentFunction(states_, meta)
        };
        if (meta) {
          for (var prop in meta)
            if (meta.hasOwnProperty(prop))
              mode[prop] = meta[prop];
        }
        return mode;
      };
      function ensureState(states, name) {
        if (!states.hasOwnProperty(name))
          throw new Error("Undefined state " + name + " in simple mode");
      }
      function toRegex(val, caret) {
        if (!val)
          return /(?:)/;
        var flags = "";
        if (val instanceof RegExp) {
          if (val.ignoreCase)
            flags = "i";
          if (val.unicode)
            flags += "u";
          val = val.source;
        } else {
          val = String(val);
        }
        return new RegExp((caret === false ? "" : "^") + "(?:" + val + ")", flags);
      }
      function asToken(val) {
        if (!val)
          return null;
        if (val.apply)
          return val;
        if (typeof val == "string")
          return val.replace(/\./g, " ");
        var result = [];
        for (var i = 0; i < val.length; i++)
          result.push(val[i] && val[i].replace(/\./g, " "));
        return result;
      }
      function Rule(data, states) {
        if (data.next || data.push)
          ensureState(states, data.next || data.push);
        this.regex = toRegex(data.regex);
        this.token = asToken(data.token);
        this.data = data;
      }
      function tokenFunction(states, config) {
        return function(stream, state) {
          if (state.pending) {
            var pend = state.pending.shift();
            if (state.pending.length == 0)
              state.pending = null;
            stream.pos += pend.text.length;
            return pend.token;
          }
          if (state.local) {
            if (state.local.end && stream.match(state.local.end)) {
              var tok = state.local.endToken || null;
              state.local = state.localState = null;
              return tok;
            } else {
              var tok = state.local.mode.token(stream, state.localState), m;
              if (state.local.endScan && (m = state.local.endScan.exec(stream.current())))
                stream.pos = stream.start + m.index;
              return tok;
            }
          }
          var curState = states[state.state];
          for (var i = 0; i < curState.length; i++) {
            var rule = curState[i];
            var matches = (!rule.data.sol || stream.sol()) && stream.match(rule.regex);
            if (matches) {
              if (rule.data.next) {
                state.state = rule.data.next;
              } else if (rule.data.push) {
                (state.stack || (state.stack = [])).push(state.state);
                state.state = rule.data.push;
              } else if (rule.data.pop && state.stack && state.stack.length) {
                state.state = state.stack.pop();
              }
              if (rule.data.mode)
                enterLocalMode(config, state, rule.data.mode, rule.token);
              if (rule.data.indent)
                state.indent.push(stream.indentation() + config.indentUnit);
              if (rule.data.dedent)
                state.indent.pop();
              var token = rule.token;
              if (token && token.apply)
                token = token(matches);
              if (matches.length > 2 && rule.token && typeof rule.token != "string") {
                for (var j = 2; j < matches.length; j++)
                  if (matches[j])
                    (state.pending || (state.pending = [])).push({ text: matches[j], token: rule.token[j - 1] });
                stream.backUp(matches[0].length - (matches[1] ? matches[1].length : 0));
                return token[0];
              } else if (token && token.join) {
                return token[0];
              } else {
                return token;
              }
            }
          }
          stream.next();
          return null;
        };
      }
      function cmp(a, b) {
        if (a === b)
          return true;
        if (!a || typeof a != "object" || !b || typeof b != "object")
          return false;
        var props = 0;
        for (var prop in a)
          if (a.hasOwnProperty(prop)) {
            if (!b.hasOwnProperty(prop) || !cmp(a[prop], b[prop]))
              return false;
            props++;
          }
        for (var prop in b)
          if (b.hasOwnProperty(prop))
            props--;
        return props == 0;
      }
      function enterLocalMode(config, state, spec, token) {
        var pers;
        if (spec.persistent) {
          for (var p = state.persistentStates; p && !pers; p = p.next)
            if (spec.spec ? cmp(spec.spec, p.spec) : spec.mode == p.mode)
              pers = p;
        }
        var mode = pers ? pers.mode : spec.mode || CodeMirror3.getMode(config, spec.spec);
        var lState = pers ? pers.state : CodeMirror3.startState(mode);
        if (spec.persistent && !pers)
          state.persistentStates = { mode, spec: spec.spec, state: lState, next: state.persistentStates };
        state.localState = lState;
        state.local = {
          mode,
          end: spec.end && toRegex(spec.end),
          endScan: spec.end && spec.forceEnd !== false && toRegex(spec.end, false),
          endToken: token && token.join ? token[token.length - 1] : token
        };
      }
      function indexOf(val, arr) {
        for (var i = 0; i < arr.length; i++)
          if (arr[i] === val)
            return true;
      }
      function indentFunction(states, meta) {
        return function(state, textAfter, line) {
          if (state.local && state.local.mode.indent)
            return state.local.mode.indent(state.localState, textAfter, line);
          if (state.indent == null || state.local || meta.dontIndentStates && indexOf(state.state, meta.dontIndentStates) > -1)
            return CodeMirror3.Pass;
          var pos = state.indent.length - 1, rules = states[state.state];
          scan:
            for (; ; ) {
              for (var i = 0; i < rules.length; i++) {
                var rule = rules[i];
                if (rule.data.dedent && rule.data.dedentIfLineStart !== false) {
                  var m = rule.regex.exec(textAfter);
                  if (m && m[0]) {
                    pos--;
                    if (rule.next || rule.push)
                      rules = states[rule.next || rule.push];
                    textAfter = textAfter.slice(m[0].length);
                    continue scan;
                  }
                }
              }
              break;
            }
          return pos < 0 ? 0 : state.indent[pos];
        };
      }
    });
  }
});

// node_modules/codemirror/mode/rust/rust.js
var require_rust = __commonJS({
  "node_modules/codemirror/mode/rust/rust.js"(exports, module) {
    (function(mod) {
      if (typeof exports == "object" && typeof module == "object")
        mod(require_codemirror(), require_simple());
      else if (typeof define == "function" && define.amd)
        define(["../../lib/codemirror", "../../addon/mode/simple"], mod);
      else
        mod(CodeMirror);
    })(function(CodeMirror3) {
      "use strict";
      CodeMirror3.defineSimpleMode("rust", {
        start: [
          // string and byte string
          { regex: /b?"/, token: "string", next: "string" },
          // raw string and raw byte string
          { regex: /b?r"/, token: "string", next: "string_raw" },
          { regex: /b?r#+"/, token: "string", next: "string_raw_hash" },
          // character
          { regex: /'(?:[^'\\]|\\(?:[nrt0'"]|x[\da-fA-F]{2}|u\{[\da-fA-F]{6}\}))'/, token: "string-2" },
          // byte
          { regex: /b'(?:[^']|\\(?:['\\nrt0]|x[\da-fA-F]{2}))'/, token: "string-2" },
          {
            regex: /(?:(?:[0-9][0-9_]*)(?:(?:[Ee][+-]?[0-9_]+)|\.[0-9_]+(?:[Ee][+-]?[0-9_]+)?)(?:f32|f64)?)|(?:0(?:b[01_]+|(?:o[0-7_]+)|(?:x[0-9a-fA-F_]+))|(?:[0-9][0-9_]*))(?:u8|u16|u32|u64|i8|i16|i32|i64|isize|usize)?/,
            token: "number"
          },
          { regex: /(let(?:\s+mut)?|fn|enum|mod|struct|type|union)(\s+)([a-zA-Z_][a-zA-Z0-9_]*)/, token: ["keyword", null, "def"] },
          { regex: /(?:abstract|alignof|as|async|await|box|break|continue|const|crate|do|dyn|else|enum|extern|fn|for|final|if|impl|in|loop|macro|match|mod|move|offsetof|override|priv|proc|pub|pure|ref|return|self|sizeof|static|struct|super|trait|type|typeof|union|unsafe|unsized|use|virtual|where|while|yield)\b/, token: "keyword" },
          { regex: /\b(?:Self|isize|usize|char|bool|u8|u16|u32|u64|f16|f32|f64|i8|i16|i32|i64|str|Option)\b/, token: "atom" },
          { regex: /\b(?:true|false|Some|None|Ok|Err)\b/, token: "builtin" },
          {
            regex: /\b(fn)(\s+)([a-zA-Z_][a-zA-Z0-9_]*)/,
            token: ["keyword", null, "def"]
          },
          { regex: /#!?\[.*\]/, token: "meta" },
          { regex: /\/\/.*/, token: "comment" },
          { regex: /\/\*/, token: "comment", next: "comment" },
          { regex: /[-+\/*=<>!]+/, token: "operator" },
          { regex: /[a-zA-Z_]\w*!/, token: "variable-3" },
          { regex: /[a-zA-Z_]\w*/, token: "variable" },
          { regex: /[\{\[\(]/, indent: true },
          { regex: /[\}\]\)]/, dedent: true }
        ],
        string: [
          { regex: /"/, token: "string", next: "start" },
          { regex: /(?:[^\\"]|\\(?:.|$))*/, token: "string" }
        ],
        string_raw: [
          { regex: /"/, token: "string", next: "start" },
          { regex: /[^"]*/, token: "string" }
        ],
        string_raw_hash: [
          { regex: /"#+/, token: "string", next: "start" },
          { regex: /(?:[^"]|"(?!#))*/, token: "string" }
        ],
        comment: [
          { regex: /.*?\*\//, token: "comment", next: "start" },
          { regex: /.*/, token: "comment" }
        ],
        meta: {
          dontIndentStates: ["comment"],
          electricInput: /^\s*\}$/,
          blockCommentStart: "/*",
          blockCommentEnd: "*/",
          lineComment: "//",
          fold: "brace"
        }
      });
      CodeMirror3.defineMIME("text/x-rustsrc", "rust");
      CodeMirror3.defineMIME("text/rust", "rust");
    });
  }
});

// node_modules/codemirror/mode/scheme/scheme.js
var require_scheme = __commonJS({
  "node_modules/codemirror/mode/scheme/scheme.js"(exports, module) {
    (function(mod) {
      if (typeof exports == "object" && typeof module == "object")
        mod(require_codemirror());
      else if (typeof define == "function" && define.amd)
        define(["../../lib/codemirror"], mod);
      else
        mod(CodeMirror);
    })(function(CodeMirror3) {
      "use strict";
      CodeMirror3.defineMode("scheme", function() {
        var BUILTIN = "builtin", COMMENT = "comment", STRING = "string", SYMBOL = "symbol", ATOM = "atom", NUMBER = "number", BRACKET = "bracket";
        var INDENT_WORD_SKIP = 2;
        function makeKeywords(str) {
          var obj = {}, words = str.split(" ");
          for (var i = 0; i < words.length; ++i)
            obj[words[i]] = true;
          return obj;
        }
        var keywords = makeKeywords("\u03BB case-lambda call/cc class cond-expand define-class define-values exit-handler field import inherit init-field interface let*-values let-values let/ec mixin opt-lambda override protect provide public rename require require-for-syntax syntax syntax-case syntax-error unit/sig unless when with-syntax and begin call-with-current-continuation call-with-input-file call-with-output-file case cond define define-syntax define-macro defmacro delay do dynamic-wind else for-each if lambda let let* let-syntax letrec letrec-syntax map or syntax-rules abs acos angle append apply asin assoc assq assv atan boolean? caar cadr call-with-input-file call-with-output-file call-with-values car cdddar cddddr cdr ceiling char->integer char-alphabetic? char-ci<=? char-ci<? char-ci=? char-ci>=? char-ci>? char-downcase char-lower-case? char-numeric? char-ready? char-upcase char-upper-case? char-whitespace? char<=? char<? char=? char>=? char>? char? close-input-port close-output-port complex? cons cos current-input-port current-output-port denominator display eof-object? eq? equal? eqv? eval even? exact->inexact exact? exp expt #f floor force gcd imag-part inexact->exact inexact? input-port? integer->char integer? interaction-environment lcm length list list->string list->vector list-ref list-tail list? load log magnitude make-polar make-rectangular make-string make-vector max member memq memv min modulo negative? newline not null-environment null? number->string number? numerator odd? open-input-file open-output-file output-port? pair? peek-char port? positive? procedure? quasiquote quote quotient rational? rationalize read read-char real-part real? remainder reverse round scheme-report-environment set! set-car! set-cdr! sin sqrt string string->list string->number string->symbol string-append string-ci<=? string-ci<? string-ci=? string-ci>=? string-ci>? string-copy string-fill! string-length string-ref string-set! string<=? string<? string=? string>=? string>? string? substring symbol->string symbol? #t tan transcript-off transcript-on truncate values vector vector->list vector-fill! vector-length vector-ref vector-set! with-input-from-file with-output-to-file write write-char zero?");
        var indentKeys = makeKeywords("define let letrec let* lambda define-macro defmacro let-syntax letrec-syntax let-values let*-values define-syntax syntax-rules define-values when unless");
        function stateStack(indent, type, prev) {
          this.indent = indent;
          this.type = type;
          this.prev = prev;
        }
        function pushStack(state, indent, type) {
          state.indentStack = new stateStack(indent, type, state.indentStack);
        }
        function popStack(state) {
          state.indentStack = state.indentStack.prev;
        }
        var binaryMatcher = new RegExp(/^(?:[-+]i|[-+][01]+#*(?:\/[01]+#*)?i|[-+]?[01]+#*(?:\/[01]+#*)?@[-+]?[01]+#*(?:\/[01]+#*)?|[-+]?[01]+#*(?:\/[01]+#*)?[-+](?:[01]+#*(?:\/[01]+#*)?)?i|[-+]?[01]+#*(?:\/[01]+#*)?)(?=[()\s;"]|$)/i);
        var octalMatcher = new RegExp(/^(?:[-+]i|[-+][0-7]+#*(?:\/[0-7]+#*)?i|[-+]?[0-7]+#*(?:\/[0-7]+#*)?@[-+]?[0-7]+#*(?:\/[0-7]+#*)?|[-+]?[0-7]+#*(?:\/[0-7]+#*)?[-+](?:[0-7]+#*(?:\/[0-7]+#*)?)?i|[-+]?[0-7]+#*(?:\/[0-7]+#*)?)(?=[()\s;"]|$)/i);
        var hexMatcher = new RegExp(/^(?:[-+]i|[-+][\da-f]+#*(?:\/[\da-f]+#*)?i|[-+]?[\da-f]+#*(?:\/[\da-f]+#*)?@[-+]?[\da-f]+#*(?:\/[\da-f]+#*)?|[-+]?[\da-f]+#*(?:\/[\da-f]+#*)?[-+](?:[\da-f]+#*(?:\/[\da-f]+#*)?)?i|[-+]?[\da-f]+#*(?:\/[\da-f]+#*)?)(?=[()\s;"]|$)/i);
        var decimalMatcher = new RegExp(/^(?:[-+]i|[-+](?:(?:(?:\d+#+\.?#*|\d+\.\d*#*|\.\d+#*|\d+)(?:[esfdl][-+]?\d+)?)|\d+#*\/\d+#*)i|[-+]?(?:(?:(?:\d+#+\.?#*|\d+\.\d*#*|\.\d+#*|\d+)(?:[esfdl][-+]?\d+)?)|\d+#*\/\d+#*)@[-+]?(?:(?:(?:\d+#+\.?#*|\d+\.\d*#*|\.\d+#*|\d+)(?:[esfdl][-+]?\d+)?)|\d+#*\/\d+#*)|[-+]?(?:(?:(?:\d+#+\.?#*|\d+\.\d*#*|\.\d+#*|\d+)(?:[esfdl][-+]?\d+)?)|\d+#*\/\d+#*)[-+](?:(?:(?:\d+#+\.?#*|\d+\.\d*#*|\.\d+#*|\d+)(?:[esfdl][-+]?\d+)?)|\d+#*\/\d+#*)?i|(?:(?:(?:\d+#+\.?#*|\d+\.\d*#*|\.\d+#*|\d+)(?:[esfdl][-+]?\d+)?)|\d+#*\/\d+#*))(?=[()\s;"]|$)/i);
        function isBinaryNumber(stream) {
          return stream.match(binaryMatcher);
        }
        function isOctalNumber(stream) {
          return stream.match(octalMatcher);
        }
        function isDecimalNumber(stream, backup) {
          if (backup === true) {
            stream.backUp(1);
          }
          return stream.match(decimalMatcher);
        }
        function isHexNumber(stream) {
          return stream.match(hexMatcher);
        }
        function processEscapedSequence(stream, options) {
          var next, escaped = false;
          while ((next = stream.next()) != null) {
            if (next == options.token && !escaped) {
              options.state.mode = false;
              break;
            }
            escaped = !escaped && next == "\\";
          }
        }
        return {
          startState: function() {
            return {
              indentStack: null,
              indentation: 0,
              mode: false,
              sExprComment: false,
              sExprQuote: false
            };
          },
          token: function(stream, state) {
            if (state.indentStack == null && stream.sol()) {
              state.indentation = stream.indentation();
            }
            if (stream.eatSpace()) {
              return null;
            }
            var returnType = null;
            switch (state.mode) {
              case "string":
                processEscapedSequence(stream, {
                  token: '"',
                  state
                });
                returnType = STRING;
                break;
              case "symbol":
                processEscapedSequence(stream, {
                  token: "|",
                  state
                });
                returnType = SYMBOL;
                break;
              case "comment":
                var next, maybeEnd = false;
                while ((next = stream.next()) != null) {
                  if (next == "#" && maybeEnd) {
                    state.mode = false;
                    break;
                  }
                  maybeEnd = next == "|";
                }
                returnType = COMMENT;
                break;
              case "s-expr-comment":
                state.mode = false;
                if (stream.peek() == "(" || stream.peek() == "[") {
                  state.sExprComment = 0;
                } else {
                  stream.eatWhile(/[^\s\(\)\[\]]/);
                  returnType = COMMENT;
                  break;
                }
              default:
                var ch = stream.next();
                if (ch == '"') {
                  state.mode = "string";
                  returnType = STRING;
                } else if (ch == "'") {
                  if (stream.peek() == "(" || stream.peek() == "[") {
                    if (typeof state.sExprQuote != "number") {
                      state.sExprQuote = 0;
                    }
                    returnType = ATOM;
                  } else {
                    stream.eatWhile(/[\w_\-!$%&*+\.\/:<=>?@\^~]/);
                    returnType = ATOM;
                  }
                } else if (ch == "|") {
                  state.mode = "symbol";
                  returnType = SYMBOL;
                } else if (ch == "#") {
                  if (stream.eat("|")) {
                    state.mode = "comment";
                    returnType = COMMENT;
                  } else if (stream.eat(/[tf]/i)) {
                    returnType = ATOM;
                  } else if (stream.eat(";")) {
                    state.mode = "s-expr-comment";
                    returnType = COMMENT;
                  } else {
                    var numTest = null, hasExactness = false, hasRadix = true;
                    if (stream.eat(/[ei]/i)) {
                      hasExactness = true;
                    } else {
                      stream.backUp(1);
                    }
                    if (stream.match(/^#b/i)) {
                      numTest = isBinaryNumber;
                    } else if (stream.match(/^#o/i)) {
                      numTest = isOctalNumber;
                    } else if (stream.match(/^#x/i)) {
                      numTest = isHexNumber;
                    } else if (stream.match(/^#d/i)) {
                      numTest = isDecimalNumber;
                    } else if (stream.match(/^[-+0-9.]/, false)) {
                      hasRadix = false;
                      numTest = isDecimalNumber;
                    } else if (!hasExactness) {
                      stream.eat("#");
                    }
                    if (numTest != null) {
                      if (hasRadix && !hasExactness) {
                        stream.match(/^#[ei]/i);
                      }
                      if (numTest(stream))
                        returnType = NUMBER;
                    }
                  }
                } else if (/^[-+0-9.]/.test(ch) && isDecimalNumber(stream, true)) {
                  returnType = NUMBER;
                } else if (ch == ";") {
                  stream.skipToEnd();
                  returnType = COMMENT;
                } else if (ch == "(" || ch == "[") {
                  var keyWord = "";
                  var indentTemp = stream.column(), letter;
                  while ((letter = stream.eat(/[^\s\(\[\;\)\]]/)) != null) {
                    keyWord += letter;
                  }
                  if (keyWord.length > 0 && indentKeys.propertyIsEnumerable(keyWord)) {
                    pushStack(state, indentTemp + INDENT_WORD_SKIP, ch);
                  } else {
                    stream.eatSpace();
                    if (stream.eol() || stream.peek() == ";") {
                      pushStack(state, indentTemp + 1, ch);
                    } else {
                      pushStack(state, indentTemp + stream.current().length, ch);
                    }
                  }
                  stream.backUp(stream.current().length - 1);
                  if (typeof state.sExprComment == "number")
                    state.sExprComment++;
                  if (typeof state.sExprQuote == "number")
                    state.sExprQuote++;
                  returnType = BRACKET;
                } else if (ch == ")" || ch == "]") {
                  returnType = BRACKET;
                  if (state.indentStack != null && state.indentStack.type == (ch == ")" ? "(" : "[")) {
                    popStack(state);
                    if (typeof state.sExprComment == "number") {
                      if (--state.sExprComment == 0) {
                        returnType = COMMENT;
                        state.sExprComment = false;
                      }
                    }
                    if (typeof state.sExprQuote == "number") {
                      if (--state.sExprQuote == 0) {
                        returnType = ATOM;
                        state.sExprQuote = false;
                      }
                    }
                  }
                } else {
                  stream.eatWhile(/[\w_\-!$%&*+\.\/:<=>?@\^~]/);
                  if (keywords && keywords.propertyIsEnumerable(stream.current())) {
                    returnType = BUILTIN;
                  } else
                    returnType = "variable";
                }
            }
            return typeof state.sExprComment == "number" ? COMMENT : typeof state.sExprQuote == "number" ? ATOM : returnType;
          },
          indent: function(state) {
            if (state.indentStack == null)
              return state.indentation;
            return state.indentStack.indent;
          },
          fold: "brace-paren",
          closeBrackets: { pairs: '()[]{}""' },
          lineComment: ";;"
        };
      });
      CodeMirror3.defineMIME("text/x-scheme", "scheme");
    });
  }
});

// node_modules/codemirror/mode/shell/shell.js
var require_shell = __commonJS({
  "node_modules/codemirror/mode/shell/shell.js"(exports, module) {
    (function(mod) {
      if (typeof exports == "object" && typeof module == "object")
        mod(require_codemirror());
      else if (typeof define == "function" && define.amd)
        define(["../../lib/codemirror"], mod);
      else
        mod(CodeMirror);
    })(function(CodeMirror3) {
      "use strict";
      CodeMirror3.defineMode("shell", function() {
        var words = {};
        function define2(style, dict) {
          for (var i = 0; i < dict.length; i++) {
            words[dict[i]] = style;
          }
        }
        ;
        var commonAtoms = ["true", "false"];
        var commonKeywords = [
          "if",
          "then",
          "do",
          "else",
          "elif",
          "while",
          "until",
          "for",
          "in",
          "esac",
          "fi",
          "fin",
          "fil",
          "done",
          "exit",
          "set",
          "unset",
          "export",
          "function"
        ];
        var commonCommands = [
          "ab",
          "awk",
          "bash",
          "beep",
          "cat",
          "cc",
          "cd",
          "chown",
          "chmod",
          "chroot",
          "clear",
          "cp",
          "curl",
          "cut",
          "diff",
          "echo",
          "find",
          "gawk",
          "gcc",
          "get",
          "git",
          "grep",
          "hg",
          "kill",
          "killall",
          "ln",
          "ls",
          "make",
          "mkdir",
          "openssl",
          "mv",
          "nc",
          "nl",
          "node",
          "npm",
          "ping",
          "ps",
          "restart",
          "rm",
          "rmdir",
          "sed",
          "service",
          "sh",
          "shopt",
          "shred",
          "source",
          "sort",
          "sleep",
          "ssh",
          "start",
          "stop",
          "su",
          "sudo",
          "svn",
          "tee",
          "telnet",
          "top",
          "touch",
          "vi",
          "vim",
          "wall",
          "wc",
          "wget",
          "who",
          "write",
          "yes",
          "zsh"
        ];
        CodeMirror3.registerHelper("hintWords", "shell", commonAtoms.concat(commonKeywords, commonCommands));
        define2("atom", commonAtoms);
        define2("keyword", commonKeywords);
        define2("builtin", commonCommands);
        function tokenBase(stream, state) {
          if (stream.eatSpace())
            return null;
          var sol = stream.sol();
          var ch = stream.next();
          if (ch === "\\") {
            stream.next();
            return null;
          }
          if (ch === "'" || ch === '"' || ch === "`") {
            state.tokens.unshift(tokenString(ch, ch === "`" ? "quote" : "string"));
            return tokenize(stream, state);
          }
          if (ch === "#") {
            if (sol && stream.eat("!")) {
              stream.skipToEnd();
              return "meta";
            }
            stream.skipToEnd();
            return "comment";
          }
          if (ch === "$") {
            state.tokens.unshift(tokenDollar);
            return tokenize(stream, state);
          }
          if (ch === "+" || ch === "=") {
            return "operator";
          }
          if (ch === "-") {
            stream.eat("-");
            stream.eatWhile(/\w/);
            return "attribute";
          }
          if (ch == "<") {
            if (stream.match("<<"))
              return "operator";
            var heredoc = stream.match(/^<-?\s*['"]?([^'"]*)['"]?/);
            if (heredoc) {
              state.tokens.unshift(tokenHeredoc(heredoc[1]));
              return "string-2";
            }
          }
          if (/\d/.test(ch)) {
            stream.eatWhile(/\d/);
            if (stream.eol() || !/\w/.test(stream.peek())) {
              return "number";
            }
          }
          stream.eatWhile(/[\w-]/);
          var cur = stream.current();
          if (stream.peek() === "=" && /\w+/.test(cur))
            return "def";
          return words.hasOwnProperty(cur) ? words[cur] : null;
        }
        function tokenString(quote, style) {
          var close = quote == "(" ? ")" : quote == "{" ? "}" : quote;
          return function(stream, state) {
            var next, escaped = false;
            while ((next = stream.next()) != null) {
              if (next === close && !escaped) {
                state.tokens.shift();
                break;
              } else if (next === "$" && !escaped && quote !== "'" && stream.peek() != close) {
                escaped = true;
                stream.backUp(1);
                state.tokens.unshift(tokenDollar);
                break;
              } else if (!escaped && quote !== close && next === quote) {
                state.tokens.unshift(tokenString(quote, style));
                return tokenize(stream, state);
              } else if (!escaped && /['"]/.test(next) && !/['"]/.test(quote)) {
                state.tokens.unshift(tokenStringStart(next, "string"));
                stream.backUp(1);
                break;
              }
              escaped = !escaped && next === "\\";
            }
            return style;
          };
        }
        ;
        function tokenStringStart(quote, style) {
          return function(stream, state) {
            state.tokens[0] = tokenString(quote, style);
            stream.next();
            return tokenize(stream, state);
          };
        }
        var tokenDollar = function(stream, state) {
          if (state.tokens.length > 1)
            stream.eat("$");
          var ch = stream.next();
          if (/['"({]/.test(ch)) {
            state.tokens[0] = tokenString(ch, ch == "(" ? "quote" : ch == "{" ? "def" : "string");
            return tokenize(stream, state);
          }
          if (!/\d/.test(ch))
            stream.eatWhile(/\w/);
          state.tokens.shift();
          return "def";
        };
        function tokenHeredoc(delim) {
          return function(stream, state) {
            if (stream.sol() && stream.string == delim)
              state.tokens.shift();
            stream.skipToEnd();
            return "string-2";
          };
        }
        function tokenize(stream, state) {
          return (state.tokens[0] || tokenBase)(stream, state);
        }
        ;
        return {
          startState: function() {
            return { tokens: [] };
          },
          token: function(stream, state) {
            return tokenize(stream, state);
          },
          closeBrackets: "()[]{}''\"\"``",
          lineComment: "#",
          fold: "brace"
        };
      });
      CodeMirror3.defineMIME("text/x-sh", "shell");
      CodeMirror3.defineMIME("application/x-sh", "shell");
    });
  }
});

// node_modules/codemirror/mode/smarty/smarty.js
var require_smarty = __commonJS({
  "node_modules/codemirror/mode/smarty/smarty.js"(exports, module) {
    (function(mod) {
      if (typeof exports == "object" && typeof module == "object")
        mod(require_codemirror());
      else if (typeof define == "function" && define.amd)
        define(["../../lib/codemirror"], mod);
      else
        mod(CodeMirror);
    })(function(CodeMirror3) {
      "use strict";
      CodeMirror3.defineMode("smarty", function(config, parserConf) {
        var rightDelimiter = parserConf.rightDelimiter || "}";
        var leftDelimiter = parserConf.leftDelimiter || "{";
        var version = parserConf.version || 2;
        var baseMode = CodeMirror3.getMode(config, parserConf.baseMode || "null");
        var keyFunctions = ["debug", "extends", "function", "include", "literal"];
        var regs = {
          operatorChars: /[+\-*&%=<>!?]/,
          validIdentifier: /[a-zA-Z0-9_]/,
          stringChar: /['"]/
        };
        var last;
        function cont(style, lastType) {
          last = lastType;
          return style;
        }
        function chain(stream, state, parser) {
          state.tokenize = parser;
          return parser(stream, state);
        }
        function doesNotCount(stream, pos) {
          if (pos == null)
            pos = stream.pos;
          return version === 3 && leftDelimiter == "{" && (pos == stream.string.length || /\s/.test(stream.string.charAt(pos)));
        }
        function tokenTop(stream, state) {
          var string = stream.string;
          for (var scan = stream.pos; ; ) {
            var nextMatch = string.indexOf(leftDelimiter, scan);
            scan = nextMatch + leftDelimiter.length;
            if (nextMatch == -1 || !doesNotCount(stream, nextMatch + leftDelimiter.length))
              break;
          }
          if (nextMatch == stream.pos) {
            stream.match(leftDelimiter);
            if (stream.eat("*")) {
              return chain(stream, state, tokenBlock("comment", "*" + rightDelimiter));
            } else {
              state.depth++;
              state.tokenize = tokenSmarty;
              last = "startTag";
              return "tag";
            }
          }
          if (nextMatch > -1)
            stream.string = string.slice(0, nextMatch);
          var token = baseMode.token(stream, state.base);
          if (nextMatch > -1)
            stream.string = string;
          return token;
        }
        function tokenSmarty(stream, state) {
          if (stream.match(rightDelimiter, true)) {
            if (version === 3) {
              state.depth--;
              if (state.depth <= 0) {
                state.tokenize = tokenTop;
              }
            } else {
              state.tokenize = tokenTop;
            }
            return cont("tag", null);
          }
          if (stream.match(leftDelimiter, true)) {
            state.depth++;
            return cont("tag", "startTag");
          }
          var ch = stream.next();
          if (ch == "$") {
            stream.eatWhile(regs.validIdentifier);
            return cont("variable-2", "variable");
          } else if (ch == "|") {
            return cont("operator", "pipe");
          } else if (ch == ".") {
            return cont("operator", "property");
          } else if (regs.stringChar.test(ch)) {
            state.tokenize = tokenAttribute(ch);
            return cont("string", "string");
          } else if (regs.operatorChars.test(ch)) {
            stream.eatWhile(regs.operatorChars);
            return cont("operator", "operator");
          } else if (ch == "[" || ch == "]") {
            return cont("bracket", "bracket");
          } else if (ch == "(" || ch == ")") {
            return cont("bracket", "operator");
          } else if (/\d/.test(ch)) {
            stream.eatWhile(/\d/);
            return cont("number", "number");
          } else {
            if (state.last == "variable") {
              if (ch == "@") {
                stream.eatWhile(regs.validIdentifier);
                return cont("property", "property");
              } else if (ch == "|") {
                stream.eatWhile(regs.validIdentifier);
                return cont("qualifier", "modifier");
              }
            } else if (state.last == "pipe") {
              stream.eatWhile(regs.validIdentifier);
              return cont("qualifier", "modifier");
            } else if (state.last == "whitespace") {
              stream.eatWhile(regs.validIdentifier);
              return cont("attribute", "modifier");
            }
            if (state.last == "property") {
              stream.eatWhile(regs.validIdentifier);
              return cont("property", null);
            } else if (/\s/.test(ch)) {
              last = "whitespace";
              return null;
            }
            var str = "";
            if (ch != "/") {
              str += ch;
            }
            var c = null;
            while (c = stream.eat(regs.validIdentifier)) {
              str += c;
            }
            for (var i = 0, j = keyFunctions.length; i < j; i++) {
              if (keyFunctions[i] == str) {
                return cont("keyword", "keyword");
              }
            }
            if (/\s/.test(ch)) {
              return null;
            }
            return cont("tag", "tag");
          }
        }
        function tokenAttribute(quote) {
          return function(stream, state) {
            var prevChar = null;
            var currChar = null;
            while (!stream.eol()) {
              currChar = stream.peek();
              if (stream.next() == quote && prevChar !== "\\") {
                state.tokenize = tokenSmarty;
                break;
              }
              prevChar = currChar;
            }
            return "string";
          };
        }
        function tokenBlock(style, terminator) {
          return function(stream, state) {
            while (!stream.eol()) {
              if (stream.match(terminator)) {
                state.tokenize = tokenTop;
                break;
              }
              stream.next();
            }
            return style;
          };
        }
        return {
          startState: function() {
            return {
              base: CodeMirror3.startState(baseMode),
              tokenize: tokenTop,
              last: null,
              depth: 0
            };
          },
          copyState: function(state) {
            return {
              base: CodeMirror3.copyState(baseMode, state.base),
              tokenize: state.tokenize,
              last: state.last,
              depth: state.depth
            };
          },
          innerMode: function(state) {
            if (state.tokenize == tokenTop)
              return { mode: baseMode, state: state.base };
          },
          token: function(stream, state) {
            var style = state.tokenize(stream, state);
            state.last = last;
            return style;
          },
          indent: function(state, text, line) {
            if (state.tokenize == tokenTop && baseMode.indent)
              return baseMode.indent(state.base, text, line);
            else
              return CodeMirror3.Pass;
          },
          blockCommentStart: leftDelimiter + "*",
          blockCommentEnd: "*" + rightDelimiter
        };
      });
      CodeMirror3.defineMIME("text/x-smarty", "smarty");
    });
  }
});

// node_modules/codemirror/mode/sql/sql.js
var require_sql = __commonJS({
  "node_modules/codemirror/mode/sql/sql.js"(exports, module) {
    (function(mod) {
      if (typeof exports == "object" && typeof module == "object")
        mod(require_codemirror());
      else if (typeof define == "function" && define.amd)
        define(["../../lib/codemirror"], mod);
      else
        mod(CodeMirror);
    })(function(CodeMirror3) {
      "use strict";
      CodeMirror3.defineMode("sql", function(config, parserConfig) {
        var client = parserConfig.client || {}, atoms = parserConfig.atoms || { "false": true, "true": true, "null": true }, builtin = parserConfig.builtin || set(defaultBuiltin), keywords = parserConfig.keywords || set(sqlKeywords), operatorChars = parserConfig.operatorChars || /^[*+\-%<>!=&|~^\/]/, support = parserConfig.support || {}, hooks = parserConfig.hooks || {}, dateSQL = parserConfig.dateSQL || { "date": true, "time": true, "timestamp": true }, backslashStringEscapes = parserConfig.backslashStringEscapes !== false, brackets = parserConfig.brackets || /^[\{}\(\)\[\]]/, punctuation = parserConfig.punctuation || /^[;.,:]/;
        function tokenBase(stream, state) {
          var ch = stream.next();
          if (hooks[ch]) {
            var result = hooks[ch](stream, state);
            if (result !== false)
              return result;
          }
          if (support.hexNumber && (ch == "0" && stream.match(/^[xX][0-9a-fA-F]+/) || (ch == "x" || ch == "X") && stream.match(/^'[0-9a-fA-F]*'/))) {
            return "number";
          } else if (support.binaryNumber && ((ch == "b" || ch == "B") && stream.match(/^'[01]*'/) || ch == "0" && stream.match(/^b[01]+/))) {
            return "number";
          } else if (ch.charCodeAt(0) > 47 && ch.charCodeAt(0) < 58) {
            stream.match(/^[0-9]*(\.[0-9]+)?([eE][-+]?[0-9]+)?/);
            support.decimallessFloat && stream.match(/^\.(?!\.)/);
            return "number";
          } else if (ch == "?" && (stream.eatSpace() || stream.eol() || stream.eat(";"))) {
            return "variable-3";
          } else if (ch == "'" || ch == '"' && support.doubleQuote) {
            state.tokenize = tokenLiteral(ch);
            return state.tokenize(stream, state);
          } else if ((support.nCharCast && (ch == "n" || ch == "N") || support.charsetCast && ch == "_" && stream.match(/[a-z][a-z0-9]*/i)) && (stream.peek() == "'" || stream.peek() == '"')) {
            return "keyword";
          } else if (support.escapeConstant && (ch == "e" || ch == "E") && (stream.peek() == "'" || stream.peek() == '"' && support.doubleQuote)) {
            state.tokenize = function(stream2, state2) {
              return (state2.tokenize = tokenLiteral(stream2.next(), true))(stream2, state2);
            };
            return "keyword";
          } else if (support.commentSlashSlash && ch == "/" && stream.eat("/")) {
            stream.skipToEnd();
            return "comment";
          } else if (support.commentHash && ch == "#" || ch == "-" && stream.eat("-") && (!support.commentSpaceRequired || stream.eat(" "))) {
            stream.skipToEnd();
            return "comment";
          } else if (ch == "/" && stream.eat("*")) {
            state.tokenize = tokenComment(1);
            return state.tokenize(stream, state);
          } else if (ch == ".") {
            if (support.zerolessFloat && stream.match(/^(?:\d+(?:e[+-]?\d+)?)/i))
              return "number";
            if (stream.match(/^\.+/))
              return null;
            if (support.ODBCdotTable && stream.match(/^[\w\d_$#]+/))
              return "variable-2";
          } else if (operatorChars.test(ch)) {
            stream.eatWhile(operatorChars);
            return "operator";
          } else if (brackets.test(ch)) {
            return "bracket";
          } else if (punctuation.test(ch)) {
            stream.eatWhile(punctuation);
            return "punctuation";
          } else if (ch == "{" && (stream.match(/^( )*(d|D|t|T|ts|TS)( )*'[^']*'( )*}/) || stream.match(/^( )*(d|D|t|T|ts|TS)( )*"[^"]*"( )*}/))) {
            return "number";
          } else {
            stream.eatWhile(/^[_\w\d]/);
            var word = stream.current().toLowerCase();
            if (dateSQL.hasOwnProperty(word) && (stream.match(/^( )+'[^']*'/) || stream.match(/^( )+"[^"]*"/)))
              return "number";
            if (atoms.hasOwnProperty(word))
              return "atom";
            if (builtin.hasOwnProperty(word))
              return "type";
            if (keywords.hasOwnProperty(word))
              return "keyword";
            if (client.hasOwnProperty(word))
              return "builtin";
            return null;
          }
        }
        function tokenLiteral(quote, backslashEscapes) {
          return function(stream, state) {
            var escaped = false, ch;
            while ((ch = stream.next()) != null) {
              if (ch == quote && !escaped) {
                state.tokenize = tokenBase;
                break;
              }
              escaped = (backslashStringEscapes || backslashEscapes) && !escaped && ch == "\\";
            }
            return "string";
          };
        }
        function tokenComment(depth) {
          return function(stream, state) {
            var m = stream.match(/^.*?(\/\*|\*\/)/);
            if (!m)
              stream.skipToEnd();
            else if (m[1] == "/*")
              state.tokenize = tokenComment(depth + 1);
            else if (depth > 1)
              state.tokenize = tokenComment(depth - 1);
            else
              state.tokenize = tokenBase;
            return "comment";
          };
        }
        function pushContext(stream, state, type) {
          state.context = {
            prev: state.context,
            indent: stream.indentation(),
            col: stream.column(),
            type
          };
        }
        function popContext(state) {
          state.indent = state.context.indent;
          state.context = state.context.prev;
        }
        return {
          startState: function() {
            return { tokenize: tokenBase, context: null };
          },
          token: function(stream, state) {
            if (stream.sol()) {
              if (state.context && state.context.align == null)
                state.context.align = false;
            }
            if (state.tokenize == tokenBase && stream.eatSpace())
              return null;
            var style = state.tokenize(stream, state);
            if (style == "comment")
              return style;
            if (state.context && state.context.align == null)
              state.context.align = true;
            var tok = stream.current();
            if (tok == "(")
              pushContext(stream, state, ")");
            else if (tok == "[")
              pushContext(stream, state, "]");
            else if (state.context && state.context.type == tok)
              popContext(state);
            return style;
          },
          indent: function(state, textAfter) {
            var cx = state.context;
            if (!cx)
              return CodeMirror3.Pass;
            var closing = textAfter.charAt(0) == cx.type;
            if (cx.align)
              return cx.col + (closing ? 0 : 1);
            else
              return cx.indent + (closing ? 0 : config.indentUnit);
          },
          blockCommentStart: "/*",
          blockCommentEnd: "*/",
          lineComment: support.commentSlashSlash ? "//" : support.commentHash ? "#" : "--",
          closeBrackets: "()[]{}''\"\"``"
        };
      });
      function hookIdentifier(stream) {
        var ch;
        while ((ch = stream.next()) != null) {
          if (ch == "`" && !stream.eat("`"))
            return "variable-2";
        }
        stream.backUp(stream.current().length - 1);
        return stream.eatWhile(/\w/) ? "variable-2" : null;
      }
      function hookIdentifierDoublequote(stream) {
        var ch;
        while ((ch = stream.next()) != null) {
          if (ch == '"' && !stream.eat('"'))
            return "variable-2";
        }
        stream.backUp(stream.current().length - 1);
        return stream.eatWhile(/\w/) ? "variable-2" : null;
      }
      function hookVar(stream) {
        if (stream.eat("@")) {
          stream.match("session.");
          stream.match("local.");
          stream.match("global.");
        }
        if (stream.eat("'")) {
          stream.match(/^.*'/);
          return "variable-2";
        } else if (stream.eat('"')) {
          stream.match(/^.*"/);
          return "variable-2";
        } else if (stream.eat("`")) {
          stream.match(/^.*`/);
          return "variable-2";
        } else if (stream.match(/^[0-9a-zA-Z$\.\_]+/)) {
          return "variable-2";
        }
        return null;
      }
      ;
      function hookClient(stream) {
        if (stream.eat("N")) {
          return "atom";
        }
        return stream.match(/^[a-zA-Z.#!?]/) ? "variable-2" : null;
      }
      var sqlKeywords = "alter and as asc between by count create delete desc distinct drop from group having in insert into is join like not on or order select set table union update values where limit ";
      function set(str) {
        var obj = {}, words = str.split(" ");
        for (var i = 0; i < words.length; ++i)
          obj[words[i]] = true;
        return obj;
      }
      var defaultBuiltin = "bool boolean bit blob enum long longblob longtext medium mediumblob mediumint mediumtext time timestamp tinyblob tinyint tinytext text bigint int int1 int2 int3 int4 int8 integer float float4 float8 double char varbinary varchar varcharacter precision real date datetime year unsigned signed decimal numeric";
      CodeMirror3.defineMIME("text/x-sql", {
        name: "sql",
        keywords: set(sqlKeywords + "begin"),
        builtin: set(defaultBuiltin),
        atoms: set("false true null unknown"),
        dateSQL: set("date time timestamp"),
        support: set("ODBCdotTable doubleQuote binaryNumber hexNumber")
      });
      CodeMirror3.defineMIME("text/x-mssql", {
        name: "sql",
        client: set("$partition binary_checksum checksum connectionproperty context_info current_request_id error_line error_message error_number error_procedure error_severity error_state formatmessage get_filestream_transaction_context getansinull host_id host_name isnull isnumeric min_active_rowversion newid newsequentialid rowcount_big xact_state object_id"),
        keywords: set(sqlKeywords + "begin trigger proc view index for add constraint key primary foreign collate clustered nonclustered declare exec go if use index holdlock nolock nowait paglock readcommitted readcommittedlock readpast readuncommitted repeatableread rowlock serializable snapshot tablock tablockx updlock with"),
        builtin: set("bigint numeric bit smallint decimal smallmoney int tinyint money float real char varchar text nchar nvarchar ntext binary varbinary image cursor timestamp hierarchyid uniqueidentifier sql_variant xml table "),
        atoms: set("is not null like and or in left right between inner outer join all any some cross unpivot pivot exists"),
        operatorChars: /^[*+\-%<>!=^\&|\/]/,
        brackets: /^[\{}\(\)]/,
        punctuation: /^[;.,:/]/,
        backslashStringEscapes: false,
        dateSQL: set("date datetimeoffset datetime2 smalldatetime datetime time"),
        hooks: {
          "@": hookVar
        }
      });
      CodeMirror3.defineMIME("text/x-mysql", {
        name: "sql",
        client: set("charset clear connect edit ego exit go help nopager notee nowarning pager print prompt quit rehash source status system tee"),
        keywords: set(sqlKeywords + "accessible action add after algorithm all analyze asensitive at authors auto_increment autocommit avg avg_row_length before binary binlog both btree cache call cascade cascaded case catalog_name chain change changed character check checkpoint checksum class_origin client_statistics close coalesce code collate collation collations column columns comment commit committed completion concurrent condition connection consistent constraint contains continue contributors convert cross current current_date current_time current_timestamp current_user cursor data database databases day_hour day_microsecond day_minute day_second deallocate dec declare default delay_key_write delayed delimiter des_key_file describe deterministic dev_pop dev_samp deviance diagnostics directory disable discard distinctrow div dual dumpfile each elseif enable enclosed end ends engine engines enum errors escape escaped even event events every execute exists exit explain extended fast fetch field fields first flush for force foreign found_rows full fulltext function general get global grant grants group group_concat handler hash help high_priority hosts hour_microsecond hour_minute hour_second if ignore ignore_server_ids import index index_statistics infile inner innodb inout insensitive insert_method install interval invoker isolation iterate key keys kill language last leading leave left level limit linear lines list load local localtime localtimestamp lock logs low_priority master master_heartbeat_period master_ssl_verify_server_cert masters match max max_rows maxvalue message_text middleint migrate min min_rows minute_microsecond minute_second mod mode modifies modify mutex mysql_errno natural next no no_write_to_binlog offline offset one online open optimize option optionally out outer outfile pack_keys parser partition partitions password phase plugin plugins prepare preserve prev primary privileges procedure processlist profile profiles purge query quick range read read_write reads real rebuild recover references regexp relaylog release remove rename reorganize repair repeatable replace require resignal restrict resume return returns revoke right rlike rollback rollup row row_format rtree savepoint schedule schema schema_name schemas second_microsecond security sensitive separator serializable server session share show signal slave slow smallint snapshot soname spatial specific sql sql_big_result sql_buffer_result sql_cache sql_calc_found_rows sql_no_cache sql_small_result sqlexception sqlstate sqlwarning ssl start starting starts status std stddev stddev_pop stddev_samp storage straight_join subclass_origin sum suspend table_name table_statistics tables tablespace temporary terminated to trailing transaction trigger triggers truncate uncommitted undo uninstall unique unlock upgrade usage use use_frm user user_resources user_statistics using utc_date utc_time utc_timestamp value variables varying view views warnings when while with work write xa xor year_month zerofill begin do then else loop repeat"),
        builtin: set("bool boolean bit blob decimal double float long longblob longtext medium mediumblob mediumint mediumtext time timestamp tinyblob tinyint tinytext text bigint int int1 int2 int3 int4 int8 integer float float4 float8 double char varbinary varchar varcharacter precision date datetime year unsigned signed numeric"),
        atoms: set("false true null unknown"),
        operatorChars: /^[*+\-%<>!=&|^]/,
        dateSQL: set("date time timestamp"),
        support: set("ODBCdotTable decimallessFloat zerolessFloat binaryNumber hexNumber doubleQuote nCharCast charsetCast commentHash commentSpaceRequired"),
        hooks: {
          "@": hookVar,
          "`": hookIdentifier,
          "\\": hookClient
        }
      });
      CodeMirror3.defineMIME("text/x-mariadb", {
        name: "sql",
        client: set("charset clear connect edit ego exit go help nopager notee nowarning pager print prompt quit rehash source status system tee"),
        keywords: set(sqlKeywords + "accessible action add after algorithm all always analyze asensitive at authors auto_increment autocommit avg avg_row_length before binary binlog both btree cache call cascade cascaded case catalog_name chain change changed character check checkpoint checksum class_origin client_statistics close coalesce code collate collation collations column columns comment commit committed completion concurrent condition connection consistent constraint contains continue contributors convert cross current current_date current_time current_timestamp current_user cursor data database databases day_hour day_microsecond day_minute day_second deallocate dec declare default delay_key_write delayed delimiter des_key_file describe deterministic dev_pop dev_samp deviance diagnostics directory disable discard distinctrow div dual dumpfile each elseif enable enclosed end ends engine engines enum errors escape escaped even event events every execute exists exit explain extended fast fetch field fields first flush for force foreign found_rows full fulltext function general generated get global grant grants group group_concat handler hard hash help high_priority hosts hour_microsecond hour_minute hour_second if ignore ignore_server_ids import index index_statistics infile inner innodb inout insensitive insert_method install interval invoker isolation iterate key keys kill language last leading leave left level limit linear lines list load local localtime localtimestamp lock logs low_priority master master_heartbeat_period master_ssl_verify_server_cert masters match max max_rows maxvalue message_text middleint migrate min min_rows minute_microsecond minute_second mod mode modifies modify mutex mysql_errno natural next no no_write_to_binlog offline offset one online open optimize option optionally out outer outfile pack_keys parser partition partitions password persistent phase plugin plugins prepare preserve prev primary privileges procedure processlist profile profiles purge query quick range read read_write reads real rebuild recover references regexp relaylog release remove rename reorganize repair repeatable replace require resignal restrict resume return returns revoke right rlike rollback rollup row row_format rtree savepoint schedule schema schema_name schemas second_microsecond security sensitive separator serializable server session share show shutdown signal slave slow smallint snapshot soft soname spatial specific sql sql_big_result sql_buffer_result sql_cache sql_calc_found_rows sql_no_cache sql_small_result sqlexception sqlstate sqlwarning ssl start starting starts status std stddev stddev_pop stddev_samp storage straight_join subclass_origin sum suspend table_name table_statistics tables tablespace temporary terminated to trailing transaction trigger triggers truncate uncommitted undo uninstall unique unlock upgrade usage use use_frm user user_resources user_statistics using utc_date utc_time utc_timestamp value variables varying view views virtual warnings when while with work write xa xor year_month zerofill begin do then else loop repeat"),
        builtin: set("bool boolean bit blob decimal double float long longblob longtext medium mediumblob mediumint mediumtext time timestamp tinyblob tinyint tinytext text bigint int int1 int2 int3 int4 int8 integer float float4 float8 double char varbinary varchar varcharacter precision date datetime year unsigned signed numeric"),
        atoms: set("false true null unknown"),
        operatorChars: /^[*+\-%<>!=&|^]/,
        dateSQL: set("date time timestamp"),
        support: set("ODBCdotTable decimallessFloat zerolessFloat binaryNumber hexNumber doubleQuote nCharCast charsetCast commentHash commentSpaceRequired"),
        hooks: {
          "@": hookVar,
          "`": hookIdentifier,
          "\\": hookClient
        }
      });
      CodeMirror3.defineMIME("text/x-sqlite", {
        name: "sql",
        // commands of the official SQLite client, ref: https://www.sqlite.org/cli.html#dotcmd
        client: set("auth backup bail binary changes check clone databases dbinfo dump echo eqp exit explain fullschema headers help import imposter indexes iotrace limit lint load log mode nullvalue once open output print prompt quit read restore save scanstats schema separator session shell show stats system tables testcase timeout timer trace vfsinfo vfslist vfsname width"),
        // ref: http://sqlite.org/lang_keywords.html
        keywords: set(sqlKeywords + "abort action add after all analyze attach autoincrement before begin cascade case cast check collate column commit conflict constraint cross current_date current_time current_timestamp database default deferrable deferred detach each else end escape except exclusive exists explain fail for foreign full glob if ignore immediate index indexed initially inner instead intersect isnull key left limit match natural no notnull null of offset outer plan pragma primary query raise recursive references regexp reindex release rename replace restrict right rollback row savepoint temp temporary then to transaction trigger unique using vacuum view virtual when with without"),
        // SQLite is weakly typed, ref: http://sqlite.org/datatype3.html. This is just a list of some common types.
        builtin: set("bool boolean bit blob decimal double float long longblob longtext medium mediumblob mediumint mediumtext time timestamp tinyblob tinyint tinytext text clob bigint int int2 int8 integer float double char varchar date datetime year unsigned signed numeric real"),
        // ref: http://sqlite.org/syntax/literal-value.html
        atoms: set("null current_date current_time current_timestamp"),
        // ref: http://sqlite.org/lang_expr.html#binaryops
        operatorChars: /^[*+\-%<>!=&|/~]/,
        // SQLite is weakly typed, ref: http://sqlite.org/datatype3.html. This is just a list of some common types.
        dateSQL: set("date time timestamp datetime"),
        support: set("decimallessFloat zerolessFloat"),
        identifierQuote: '"',
        //ref: http://sqlite.org/lang_keywords.html
        hooks: {
          // bind-parameters ref:http://sqlite.org/lang_expr.html#varparam
          "@": hookVar,
          ":": hookVar,
          "?": hookVar,
          "$": hookVar,
          // The preferred way to escape Identifiers is using double quotes, ref: http://sqlite.org/lang_keywords.html
          '"': hookIdentifierDoublequote,
          // there is also support for backticks, ref: http://sqlite.org/lang_keywords.html
          "`": hookIdentifier
        }
      });
      CodeMirror3.defineMIME("text/x-cassandra", {
        name: "sql",
        client: {},
        keywords: set("add all allow alter and any apply as asc authorize batch begin by clustering columnfamily compact consistency count create custom delete desc distinct drop each_quorum exists filtering from grant if in index insert into key keyspace keyspaces level limit local_one local_quorum modify nan norecursive nosuperuser not of on one order password permission permissions primary quorum rename revoke schema select set storage superuser table three to token truncate ttl two type unlogged update use user users using values where with writetime"),
        builtin: set("ascii bigint blob boolean counter decimal double float frozen inet int list map static text timestamp timeuuid tuple uuid varchar varint"),
        atoms: set("false true infinity NaN"),
        operatorChars: /^[<>=]/,
        dateSQL: {},
        support: set("commentSlashSlash decimallessFloat"),
        hooks: {}
      });
      CodeMirror3.defineMIME("text/x-plsql", {
        name: "sql",
        client: set("appinfo arraysize autocommit autoprint autorecovery autotrace blockterminator break btitle cmdsep colsep compatibility compute concat copycommit copytypecheck define describe echo editfile embedded escape exec execute feedback flagger flush heading headsep instance linesize lno loboffset logsource long longchunksize markup native newpage numformat numwidth pagesize pause pno recsep recsepchar release repfooter repheader serveroutput shiftinout show showmode size spool sqlblanklines sqlcase sqlcode sqlcontinue sqlnumber sqlpluscompatibility sqlprefix sqlprompt sqlterminator suffix tab term termout time timing trimout trimspool ttitle underline verify version wrap"),
        keywords: set("abort accept access add all alter and any array arraylen as asc assert assign at attributes audit authorization avg base_table begin between binary_integer body boolean by case cast char char_base check close cluster clusters colauth column comment commit compress connect connected constant constraint crash create current currval cursor data_base database date dba deallocate debugoff debugon decimal declare default definition delay delete desc digits dispose distinct do drop else elseif elsif enable end entry escape exception exception_init exchange exclusive exists exit external fast fetch file for force form from function generic goto grant group having identified if immediate in increment index indexes indicator initial initrans insert interface intersect into is key level library like limited local lock log logging long loop master maxextents maxtrans member minextents minus mislabel mode modify multiset new next no noaudit nocompress nologging noparallel not nowait number_base object of off offline on online only open option or order out package parallel partition pctfree pctincrease pctused pls_integer positive positiven pragma primary prior private privileges procedure public raise range raw read rebuild record ref references refresh release rename replace resource restrict return returning returns reverse revoke rollback row rowid rowlabel rownum rows run savepoint schema segment select separate session set share snapshot some space split sql start statement storage subtype successful synonym tabauth table tables tablespace task terminate then to trigger truncate type union unique unlimited unrecoverable unusable update use using validate value values variable view views when whenever where while with work"),
        builtin: set("abs acos add_months ascii asin atan atan2 average bfile bfilename bigserial bit blob ceil character chartorowid chr clob concat convert cos cosh count dec decode deref dual dump dup_val_on_index empty error exp false float floor found glb greatest hextoraw initcap instr instrb int integer isopen last_day least length lengthb ln lower lpad ltrim lub make_ref max min mlslabel mod months_between natural naturaln nchar nclob new_time next_day nextval nls_charset_decl_len nls_charset_id nls_charset_name nls_initcap nls_lower nls_sort nls_upper nlssort no_data_found notfound null number numeric nvarchar2 nvl others power rawtohex real reftohex round rowcount rowidtochar rowtype rpad rtrim serial sign signtype sin sinh smallint soundex sqlcode sqlerrm sqrt stddev string substr substrb sum sysdate tan tanh to_char text to_date to_label to_multi_byte to_number to_single_byte translate true trunc uid unlogged upper user userenv varchar varchar2 variance varying vsize xml"),
        operatorChars: /^[*\/+\-%<>!=~]/,
        dateSQL: set("date time timestamp"),
        support: set("doubleQuote nCharCast zerolessFloat binaryNumber hexNumber")
      });
      CodeMirror3.defineMIME("text/x-hive", {
        name: "sql",
        keywords: set("select alter $elem$ $key$ $value$ add after all analyze and archive as asc before between binary both bucket buckets by cascade case cast change cluster clustered clusterstatus collection column columns comment compute concatenate continue create cross cursor data database databases dbproperties deferred delete delimited desc describe directory disable distinct distribute drop else enable end escaped exclusive exists explain export extended external fetch fields fileformat first format formatted from full function functions grant group having hold_ddltime idxproperties if import in index indexes inpath inputdriver inputformat insert intersect into is items join keys lateral left like limit lines load local location lock locks mapjoin materialized minus msck no_drop nocompress not of offline on option or order out outer outputdriver outputformat overwrite partition partitioned partitions percent plus preserve procedure purge range rcfile read readonly reads rebuild recordreader recordwriter recover reduce regexp rename repair replace restrict revoke right rlike row schema schemas semi sequencefile serde serdeproperties set shared show show_database sort sorted ssl statistics stored streamtable table tables tablesample tblproperties temporary terminated textfile then tmp to touch transform trigger unarchive undo union uniquejoin unlock update use using utc utc_tmestamp view when where while with admin authorization char compact compactions conf cube current current_date current_timestamp day decimal defined dependency directories elem_type exchange file following for grouping hour ignore inner interval jar less logical macro minute month more none noscan over owner partialscan preceding pretty principals protection reload rewrite role roles rollup rows second server sets skewed transactions truncate unbounded unset uri user values window year"),
        builtin: set("bool boolean long timestamp tinyint smallint bigint int float double date datetime unsigned string array struct map uniontype key_type utctimestamp value_type varchar"),
        atoms: set("false true null unknown"),
        operatorChars: /^[*+\-%<>!=]/,
        dateSQL: set("date timestamp"),
        support: set("ODBCdotTable doubleQuote binaryNumber hexNumber")
      });
      CodeMirror3.defineMIME("text/x-pgsql", {
        name: "sql",
        client: set("source"),
        // For PostgreSQL - https://www.postgresql.org/docs/11/sql-keywords-appendix.html
        // For pl/pgsql lang - https://github.com/postgres/postgres/blob/REL_11_2/src/pl/plpgsql/src/pl_scanner.c
        keywords: set(sqlKeywords + "a abort abs absent absolute access according action ada add admin after aggregate alias all allocate also alter always analyse analyze and any are array array_agg array_max_cardinality as asc asensitive assert assertion assignment asymmetric at atomic attach attribute attributes authorization avg backward base64 before begin begin_frame begin_partition bernoulli between bigint binary bit bit_length blob blocked bom boolean both breadth by c cache call called cardinality cascade cascaded case cast catalog catalog_name ceil ceiling chain char char_length character character_length character_set_catalog character_set_name character_set_schema characteristics characters check checkpoint class class_origin clob close cluster coalesce cobol collate collation collation_catalog collation_name collation_schema collect column column_name columns command_function command_function_code comment comments commit committed concurrently condition condition_number configuration conflict connect connection connection_name constant constraint constraint_catalog constraint_name constraint_schema constraints constructor contains content continue control conversion convert copy corr corresponding cost count covar_pop covar_samp create cross csv cube cume_dist current current_catalog current_date current_default_transform_group current_path current_role current_row current_schema current_time current_timestamp current_transform_group_for_type current_user cursor cursor_name cycle data database datalink datatype date datetime_interval_code datetime_interval_precision day db deallocate debug dec decimal declare default defaults deferrable deferred defined definer degree delete delimiter delimiters dense_rank depends depth deref derived desc describe descriptor detach detail deterministic diagnostics dictionary disable discard disconnect dispatch distinct dlnewcopy dlpreviouscopy dlurlcomplete dlurlcompleteonly dlurlcompletewrite dlurlpath dlurlpathonly dlurlpathwrite dlurlscheme dlurlserver dlvalue do document domain double drop dump dynamic dynamic_function dynamic_function_code each element else elseif elsif empty enable encoding encrypted end end_frame end_partition endexec enforced enum equals errcode error escape event every except exception exclude excluding exclusive exec execute exists exit exp explain expression extension external extract false family fetch file filter final first first_value flag float floor following for force foreach foreign fortran forward found frame_row free freeze from fs full function functions fusion g general generated get global go goto grant granted greatest group grouping groups handler having header hex hierarchy hint hold hour id identity if ignore ilike immediate immediately immutable implementation implicit import in include including increment indent index indexes indicator info inherit inherits initially inline inner inout input insensitive insert instance instantiable instead int integer integrity intersect intersection interval into invoker is isnull isolation join k key key_member key_type label lag language large last last_value lateral lead leading leakproof least left length level library like like_regex limit link listen ln load local localtime localtimestamp location locator lock locked log logged loop lower m map mapping match matched materialized max max_cardinality maxvalue member merge message message_length message_octet_length message_text method min minute minvalue mod mode modifies module month more move multiset mumps name names namespace national natural nchar nclob nesting new next nfc nfd nfkc nfkd nil no none normalize normalized not nothing notice notify notnull nowait nth_value ntile null nullable nullif nulls number numeric object occurrences_regex octet_length octets of off offset oids old on only open operator option options or order ordering ordinality others out outer output over overlaps overlay overriding owned owner p pad parallel parameter parameter_mode parameter_name parameter_ordinal_position parameter_specific_catalog parameter_specific_name parameter_specific_schema parser partial partition pascal passing passthrough password path percent percent_rank percentile_cont percentile_disc perform period permission pg_context pg_datatype_name pg_exception_context pg_exception_detail pg_exception_hint placing plans pli policy portion position position_regex power precedes preceding precision prepare prepared preserve primary print_strict_params prior privileges procedural procedure procedures program public publication query quote raise range rank read reads real reassign recheck recovery recursive ref references referencing refresh regr_avgx regr_avgy regr_count regr_intercept regr_r2 regr_slope regr_sxx regr_sxy regr_syy reindex relative release rename repeatable replace replica requiring reset respect restart restore restrict result result_oid return returned_cardinality returned_length returned_octet_length returned_sqlstate returning returns reverse revoke right role rollback rollup routine routine_catalog routine_name routine_schema routines row row_count row_number rows rowtype rule savepoint scale schema schema_name schemas scope scope_catalog scope_name scope_schema scroll search second section security select selective self sensitive sequence sequences serializable server server_name session session_user set setof sets share show similar simple size skip slice smallint snapshot some source space specific specific_name specifictype sql sqlcode sqlerror sqlexception sqlstate sqlwarning sqrt stable stacked standalone start state statement static statistics stddev_pop stddev_samp stdin stdout storage strict strip structure style subclass_origin submultiset subscription substring substring_regex succeeds sum symmetric sysid system system_time system_user t table table_name tables tablesample tablespace temp template temporary text then ties time timestamp timezone_hour timezone_minute to token top_level_count trailing transaction transaction_active transactions_committed transactions_rolled_back transform transforms translate translate_regex translation treat trigger trigger_catalog trigger_name trigger_schema trim trim_array true truncate trusted type types uescape unbounded uncommitted under unencrypted union unique unknown unlink unlisten unlogged unnamed unnest until untyped update upper uri usage use_column use_variable user user_defined_type_catalog user_defined_type_code user_defined_type_name user_defined_type_schema using vacuum valid validate validator value value_of values var_pop var_samp varbinary varchar variable_conflict variadic varying verbose version versioning view views volatile warning when whenever where while whitespace width_bucket window with within without work wrapper write xml xmlagg xmlattributes xmlbinary xmlcast xmlcomment xmlconcat xmldeclaration xmldocument xmlelement xmlexists xmlforest xmliterate xmlnamespaces xmlparse xmlpi xmlquery xmlroot xmlschema xmlserialize xmltable xmltext xmlvalidate year yes zone"),
        // https://www.postgresql.org/docs/11/datatype.html
        builtin: set("bigint int8 bigserial serial8 bit varying varbit boolean bool box bytea character char varchar cidr circle date double precision float8 inet integer int int4 interval json jsonb line lseg macaddr macaddr8 money numeric decimal path pg_lsn point polygon real float4 smallint int2 smallserial serial2 serial serial4 text time without zone with timetz timestamp timestamptz tsquery tsvector txid_snapshot uuid xml"),
        atoms: set("false true null unknown"),
        operatorChars: /^[*\/+\-%<>!=&|^\/#@?~]/,
        backslashStringEscapes: false,
        dateSQL: set("date time timestamp"),
        support: set("ODBCdotTable decimallessFloat zerolessFloat binaryNumber hexNumber nCharCast charsetCast escapeConstant")
      });
      CodeMirror3.defineMIME("text/x-gql", {
        name: "sql",
        keywords: set("ancestor and asc by contains desc descendant distinct from group has in is limit offset on order select superset where"),
        atoms: set("false true"),
        builtin: set("blob datetime first key __key__ string integer double boolean null"),
        operatorChars: /^[*+\-%<>!=]/
      });
      CodeMirror3.defineMIME("text/x-gpsql", {
        name: "sql",
        client: set("source"),
        //https://github.com/greenplum-db/gpdb/blob/master/src/include/parser/kwlist.h
        keywords: set("abort absolute access action active add admin after aggregate all also alter always analyse analyze and any array as asc assertion assignment asymmetric at authorization backward before begin between bigint binary bit boolean both by cache called cascade cascaded case cast chain char character characteristics check checkpoint class close cluster coalesce codegen collate column comment commit committed concurrency concurrently configuration connection constraint constraints contains content continue conversion copy cost cpu_rate_limit create createdb createexttable createrole createuser cross csv cube current current_catalog current_date current_role current_schema current_time current_timestamp current_user cursor cycle data database day deallocate dec decimal declare decode default defaults deferrable deferred definer delete delimiter delimiters deny desc dictionary disable discard distinct distributed do document domain double drop dxl each else enable encoding encrypted end enum errors escape every except exchange exclude excluding exclusive execute exists explain extension external extract false family fetch fields filespace fill filter first float following for force foreign format forward freeze from full function global grant granted greatest group group_id grouping handler hash having header hold host hour identity if ignore ilike immediate immutable implicit in including inclusive increment index indexes inherit inherits initially inline inner inout input insensitive insert instead int integer intersect interval into invoker is isnull isolation join key language large last leading least left level like limit list listen load local localtime localtimestamp location lock log login mapping master match maxvalue median merge minute minvalue missing mode modifies modify month move name names national natural nchar new newline next no nocreatedb nocreateexttable nocreaterole nocreateuser noinherit nologin none noovercommit nosuperuser not nothing notify notnull nowait null nullif nulls numeric object of off offset oids old on only operator option options or order ordered others out outer over overcommit overlaps overlay owned owner parser partial partition partitions passing password percent percentile_cont percentile_disc placing plans position preceding precision prepare prepared preserve primary prior privileges procedural procedure protocol queue quote randomly range read readable reads real reassign recheck recursive ref references reindex reject relative release rename repeatable replace replica reset resource restart restrict returning returns revoke right role rollback rollup rootpartition row rows rule savepoint scatter schema scroll search second security segment select sequence serializable session session_user set setof sets share show similar simple smallint some split sql stable standalone start statement statistics stdin stdout storage strict strip subpartition subpartitions substring superuser symmetric sysid system table tablespace temp template temporary text then threshold ties time timestamp to trailing transaction treat trigger trim true truncate trusted type unbounded uncommitted unencrypted union unique unknown unlisten until update user using vacuum valid validation validator value values varchar variadic varying verbose version view volatile web when where whitespace window with within without work writable write xml xmlattributes xmlconcat xmlelement xmlexists xmlforest xmlparse xmlpi xmlroot xmlserialize year yes zone"),
        builtin: set("bigint int8 bigserial serial8 bit varying varbit boolean bool box bytea character char varchar cidr circle date double precision float float8 inet integer int int4 interval json jsonb line lseg macaddr macaddr8 money numeric decimal path pg_lsn point polygon real float4 smallint int2 smallserial serial2 serial serial4 text time without zone with timetz timestamp timestamptz tsquery tsvector txid_snapshot uuid xml"),
        atoms: set("false true null unknown"),
        operatorChars: /^[*+\-%<>!=&|^\/#@?~]/,
        dateSQL: set("date time timestamp"),
        support: set("ODBCdotTable decimallessFloat zerolessFloat binaryNumber hexNumber nCharCast charsetCast")
      });
      CodeMirror3.defineMIME("text/x-sparksql", {
        name: "sql",
        keywords: set("add after all alter analyze and anti archive array as asc at between bucket buckets by cache cascade case cast change clear cluster clustered codegen collection column columns comment commit compact compactions compute concatenate cost create cross cube current current_date current_timestamp database databases data dbproperties defined delete delimited deny desc describe dfs directories distinct distribute drop else end escaped except exchange exists explain export extended external false fields fileformat first following for format formatted from full function functions global grant group grouping having if ignore import in index indexes inner inpath inputformat insert intersect interval into is items join keys last lateral lazy left like limit lines list load local location lock locks logical macro map minus msck natural no not null nulls of on optimize option options or order out outer outputformat over overwrite partition partitioned partitions percent preceding principals purge range recordreader recordwriter recover reduce refresh regexp rename repair replace reset restrict revoke right rlike role roles rollback rollup row rows schema schemas select semi separated serde serdeproperties set sets show skewed sort sorted start statistics stored stratify struct table tables tablesample tblproperties temp temporary terminated then to touch transaction transactions transform true truncate unarchive unbounded uncache union unlock unset use using values view when where window with"),
        builtin: set("abs acos acosh add_months aggregate and any approx_count_distinct approx_percentile array array_contains array_distinct array_except array_intersect array_join array_max array_min array_position array_remove array_repeat array_sort array_union arrays_overlap arrays_zip ascii asin asinh assert_true atan atan2 atanh avg base64 between bigint bin binary bit_and bit_count bit_get bit_length bit_or bit_xor bool_and bool_or boolean bround btrim cardinality case cast cbrt ceil ceiling char char_length character_length chr coalesce collect_list collect_set concat concat_ws conv corr cos cosh cot count count_if count_min_sketch covar_pop covar_samp crc32 cume_dist current_catalog current_database current_date current_timestamp current_timezone current_user date date_add date_format date_from_unix_date date_part date_sub date_trunc datediff day dayofmonth dayofweek dayofyear decimal decode degrees delimited dense_rank div double e element_at elt encode every exists exp explode explode_outer expm1 extract factorial filter find_in_set first first_value flatten float floor forall format_number format_string from_csv from_json from_unixtime from_utc_timestamp get_json_object getbit greatest grouping grouping_id hash hex hour hypot if ifnull in initcap inline inline_outer input_file_block_length input_file_block_start input_file_name inputformat instr int isnan isnotnull isnull java_method json_array_length json_object_keys json_tuple kurtosis lag last last_day last_value lcase lead least left length levenshtein like ln locate log log10 log1p log2 lower lpad ltrim make_date make_dt_interval make_interval make_timestamp make_ym_interval map map_concat map_entries map_filter map_from_arrays map_from_entries map_keys map_values map_zip_with max max_by md5 mean min min_by minute mod monotonically_increasing_id month months_between named_struct nanvl negative next_day not now nth_value ntile nullif nvl nvl2 octet_length or outputformat overlay parse_url percent_rank percentile percentile_approx pi pmod posexplode posexplode_outer position positive pow power printf quarter radians raise_error rand randn random rank rcfile reflect regexp regexp_extract regexp_extract_all regexp_like regexp_replace repeat replace reverse right rint rlike round row_number rpad rtrim schema_of_csv schema_of_json second sentences sequence sequencefile serde session_window sha sha1 sha2 shiftleft shiftright shiftrightunsigned shuffle sign signum sin sinh size skewness slice smallint some sort_array soundex space spark_partition_id split sqrt stack std stddev stddev_pop stddev_samp str_to_map string struct substr substring substring_index sum tan tanh textfile timestamp timestamp_micros timestamp_millis timestamp_seconds tinyint to_csv to_date to_json to_timestamp to_unix_timestamp to_utc_timestamp transform transform_keys transform_values translate trim trunc try_add try_divide typeof ucase unbase64 unhex uniontype unix_date unix_micros unix_millis unix_seconds unix_timestamp upper uuid var_pop var_samp variance version weekday weekofyear when width_bucket window xpath xpath_boolean xpath_double xpath_float xpath_int xpath_long xpath_number xpath_short xpath_string xxhash64 year zip_with"),
        atoms: set("false true null"),
        operatorChars: /^[*\/+\-%<>!=~&|^]/,
        dateSQL: set("date time timestamp"),
        support: set("ODBCdotTable doubleQuote zerolessFloat")
      });
      CodeMirror3.defineMIME("text/x-esper", {
        name: "sql",
        client: set("source"),
        // http://www.espertech.com/esper/release-5.5.0/esper-reference/html/appendix_keywords.html
        keywords: set("alter and as asc between by count create delete desc distinct drop from group having in insert into is join like not on or order select set table union update values where limit after all and as at asc avedev avg between by case cast coalesce count create current_timestamp day days delete define desc distinct else end escape events every exists false first from full group having hour hours in inner insert instanceof into irstream is istream join last lastweekday left limit like max match_recognize matches median measures metadatasql min minute minutes msec millisecond milliseconds not null offset on or order outer output partition pattern prev prior regexp retain-union retain-intersection right rstream sec second seconds select set some snapshot sql stddev sum then true unidirectional until update variable weekday when where window"),
        builtin: {},
        atoms: set("false true null"),
        operatorChars: /^[*+\-%<>!=&|^\/#@?~]/,
        dateSQL: set("time"),
        support: set("decimallessFloat zerolessFloat binaryNumber hexNumber")
      });
      CodeMirror3.defineMIME("text/x-trino", {
        name: "sql",
        // https://github.com/trinodb/trino/blob/bc7a4eeedde28684c7ae6f74cefcaf7c6e782174/core/trino-parser/src/main/antlr4/io/trino/sql/parser/SqlBase.g4#L859-L1129
        // https://github.com/trinodb/trino/blob/bc7a4eeedde28684c7ae6f74cefcaf7c6e782174/docs/src/main/sphinx/functions/list.rst
        keywords: set("abs absent acos add admin after all all_match alter analyze and any any_match approx_distinct approx_most_frequent approx_percentile approx_set arbitrary array_agg array_distinct array_except array_intersect array_join array_max array_min array_position array_remove array_sort array_union arrays_overlap as asc asin at at_timezone atan atan2 authorization avg bar bernoulli beta_cdf between bing_tile bing_tile_at bing_tile_coordinates bing_tile_polygon bing_tile_quadkey bing_tile_zoom_level bing_tiles_around bit_count bitwise_and bitwise_and_agg bitwise_left_shift bitwise_not bitwise_or bitwise_or_agg bitwise_right_shift bitwise_right_shift_arithmetic bitwise_xor bool_and bool_or both by call cardinality cascade case cast catalogs cbrt ceil ceiling char2hexint checksum chr classify coalesce codepoint column columns combinations comment commit committed concat concat_ws conditional constraint contains contains_sequence convex_hull_agg copartition corr cos cosh cosine_similarity count count_if covar_pop covar_samp crc32 create cross cube cume_dist current current_catalog current_date current_groups current_path current_role current_schema current_time current_timestamp current_timezone current_user data date_add date_diff date_format date_parse date_trunc day day_of_month day_of_week day_of_year deallocate default define definer degrees delete dense_rank deny desc describe descriptor distinct distributed dow doy drop e element_at else empty empty_approx_set encoding end error escape evaluate_classifier_predictions every except excluding execute exists exp explain extract false features fetch filter final first first_value flatten floor following for format format_datetime format_number from from_base from_base32 from_base64 from_base64url from_big_endian_32 from_big_endian_64 from_encoded_polyline from_geojson_geometry from_hex from_ieee754_32 from_ieee754_64 from_iso8601_date from_iso8601_timestamp from_iso8601_timestamp_nanos from_unixtime from_unixtime_nanos from_utf8 full functions geometric_mean geometry_from_hadoop_shape geometry_invalid_reason geometry_nearest_points geometry_to_bing_tiles geometry_union geometry_union_agg grant granted grants graphviz great_circle_distance greatest group grouping groups hamming_distance hash_counts having histogram hmac_md5 hmac_sha1 hmac_sha256 hmac_sha512 hour human_readable_seconds if ignore in including index infinity initial inner input insert intersect intersection_cardinality into inverse_beta_cdf inverse_normal_cdf invoker io is is_finite is_infinite is_json_scalar is_nan isolation jaccard_index join json_array json_array_contains json_array_get json_array_length json_exists json_extract json_extract_scalar json_format json_object json_parse json_query json_size json_value keep key keys kurtosis lag last last_day_of_month last_value lateral lead leading learn_classifier learn_libsvm_classifier learn_libsvm_regressor learn_regressor least left length level levenshtein_distance like limit line_interpolate_point line_interpolate_points line_locate_point listagg ln local localtime localtimestamp log log10 log2 logical lower lpad ltrim luhn_check make_set_digest map_agg map_concat map_entries map_filter map_from_entries map_keys map_union map_values map_zip_with match match_recognize matched matches materialized max max_by md5 measures merge merge_set_digest millisecond min min_by minute mod month multimap_agg multimap_from_entries murmur3 nan natural next nfc nfd nfkc nfkd ngrams no none none_match normal_cdf normalize not now nth_value ntile null nullif nulls numeric_histogram object objectid_timestamp of offset omit on one only option or order ordinality outer output over overflow parse_data_size parse_datetime parse_duration partition partitions passing past path pattern per percent_rank permute pi position pow power preceding prepare privileges properties prune qdigest_agg quarter quotes radians rand random range rank read recursive reduce reduce_agg refresh regexp_count regexp_extract regexp_extract_all regexp_like regexp_position regexp_replace regexp_split regr_intercept regr_slope regress rename render repeat repeatable replace reset respect restrict returning reverse revoke rgb right role roles rollback rollup round row_number rows rpad rtrim running scalar schema schemas second security seek select sequence serializable session set sets sha1 sha256 sha512 show shuffle sign simplify_geometry sin skewness skip slice some soundex spatial_partitioning spatial_partitions split split_part split_to_map split_to_multimap spooky_hash_v2_32 spooky_hash_v2_64 sqrt st_area st_asbinary st_astext st_boundary st_buffer st_centroid st_contains st_convexhull st_coorddim st_crosses st_difference st_dimension st_disjoint st_distance st_endpoint st_envelope st_envelopeaspts st_equals st_exteriorring st_geometries st_geometryfromtext st_geometryn st_geometrytype st_geomfrombinary st_interiorringn st_interiorrings st_intersection st_intersects st_isclosed st_isempty st_isring st_issimple st_isvalid st_length st_linefromtext st_linestring st_multipoint st_numgeometries st_numinteriorring st_numpoints st_overlaps st_point st_pointn st_points st_polygon st_relate st_startpoint st_symdifference st_touches st_union st_within st_x st_xmax st_xmin st_y st_ymax st_ymin start starts_with stats stddev stddev_pop stddev_samp string strpos subset substr substring sum system table tables tablesample tan tanh tdigest_agg text then ties timestamp_objectid timezone_hour timezone_minute to to_base to_base32 to_base64 to_base64url to_big_endian_32 to_big_endian_64 to_char to_date to_encoded_polyline to_geojson_geometry to_geometry to_hex to_ieee754_32 to_ieee754_64 to_iso8601 to_milliseconds to_spherical_geography to_timestamp to_unixtime to_utf8 trailing transaction transform transform_keys transform_values translate trim trim_array true truncate try try_cast type typeof uescape unbounded uncommitted unconditional union unique unknown unmatched unnest update upper url_decode url_encode url_extract_fragment url_extract_host url_extract_parameter url_extract_path url_extract_port url_extract_protocol url_extract_query use user using utf16 utf32 utf8 validate value value_at_quantile values values_at_quantiles var_pop var_samp variance verbose version view week week_of_year when where width_bucket wilson_interval_lower wilson_interval_upper window with with_timezone within without word_stem work wrapper write xxhash64 year year_of_week yow zip zip_with"),
        // https://github.com/trinodb/trino/blob/bc7a4eeedde28684c7ae6f74cefcaf7c6e782174/core/trino-main/src/main/java/io/trino/metadata/TypeRegistry.java#L131-L168
        // https://github.com/trinodb/trino/blob/bc7a4eeedde28684c7ae6f74cefcaf7c6e782174/plugin/trino-ml/src/main/java/io/trino/plugin/ml/MLPlugin.java#L35
        // https://github.com/trinodb/trino/blob/bc7a4eeedde28684c7ae6f74cefcaf7c6e782174/plugin/trino-mongodb/src/main/java/io/trino/plugin/mongodb/MongoPlugin.java#L32
        // https://github.com/trinodb/trino/blob/bc7a4eeedde28684c7ae6f74cefcaf7c6e782174/plugin/trino-geospatial/src/main/java/io/trino/plugin/geospatial/GeoPlugin.java#L37
        builtin: set("array bigint bingtile boolean char codepoints color date decimal double function geometry hyperloglog int integer interval ipaddress joniregexp json json2016 jsonpath kdbtree likepattern map model objectid p4hyperloglog precision qdigest re2jregexp real regressor row setdigest smallint sphericalgeography tdigest time timestamp tinyint uuid varbinary varchar zone"),
        atoms: set("false true null unknown"),
        // https://trino.io/docs/current/functions/list.html#id1
        operatorChars: /^[[\]|<>=!\-+*/%]/,
        dateSQL: set("date time timestamp zone"),
        // hexNumber is necessary for VARBINARY literals, e.g. X'65683F'
        // but it also enables 0xFF hex numbers, which Trino doesn't support.
        support: set("ODBCdotTable decimallessFloat zerolessFloat hexNumber")
      });
    });
  }
});

// node_modules/codemirror/mode/stex/stex.js
var require_stex = __commonJS({
  "node_modules/codemirror/mode/stex/stex.js"(exports, module) {
    (function(mod) {
      if (typeof exports == "object" && typeof module == "object")
        mod(require_codemirror());
      else if (typeof define == "function" && define.amd)
        define(["../../lib/codemirror"], mod);
      else
        mod(CodeMirror);
    })(function(CodeMirror3) {
      "use strict";
      CodeMirror3.defineMode("stex", function(_config, parserConfig) {
        "use strict";
        function pushCommand(state, command) {
          state.cmdState.push(command);
        }
        function peekCommand(state) {
          if (state.cmdState.length > 0) {
            return state.cmdState[state.cmdState.length - 1];
          } else {
            return null;
          }
        }
        function popCommand(state) {
          var plug = state.cmdState.pop();
          if (plug) {
            plug.closeBracket();
          }
        }
        function getMostPowerful(state) {
          var context = state.cmdState;
          for (var i = context.length - 1; i >= 0; i--) {
            var plug = context[i];
            if (plug.name == "DEFAULT") {
              continue;
            }
            return plug;
          }
          return { styleIdentifier: function() {
            return null;
          } };
        }
        function addPluginPattern(pluginName, cmdStyle, styles) {
          return function() {
            this.name = pluginName;
            this.bracketNo = 0;
            this.style = cmdStyle;
            this.styles = styles;
            this.argument = null;
            this.styleIdentifier = function() {
              return this.styles[this.bracketNo - 1] || null;
            };
            this.openBracket = function() {
              this.bracketNo++;
              return "bracket";
            };
            this.closeBracket = function() {
            };
          };
        }
        var plugins = {};
        plugins["importmodule"] = addPluginPattern("importmodule", "tag", ["string", "builtin"]);
        plugins["documentclass"] = addPluginPattern("documentclass", "tag", ["", "atom"]);
        plugins["usepackage"] = addPluginPattern("usepackage", "tag", ["atom"]);
        plugins["begin"] = addPluginPattern("begin", "tag", ["atom"]);
        plugins["end"] = addPluginPattern("end", "tag", ["atom"]);
        plugins["label"] = addPluginPattern("label", "tag", ["atom"]);
        plugins["ref"] = addPluginPattern("ref", "tag", ["atom"]);
        plugins["eqref"] = addPluginPattern("eqref", "tag", ["atom"]);
        plugins["cite"] = addPluginPattern("cite", "tag", ["atom"]);
        plugins["bibitem"] = addPluginPattern("bibitem", "tag", ["atom"]);
        plugins["Bibitem"] = addPluginPattern("Bibitem", "tag", ["atom"]);
        plugins["RBibitem"] = addPluginPattern("RBibitem", "tag", ["atom"]);
        plugins["DEFAULT"] = function() {
          this.name = "DEFAULT";
          this.style = "tag";
          this.styleIdentifier = this.openBracket = this.closeBracket = function() {
          };
        };
        function setState(state, f) {
          state.f = f;
        }
        function normal(source, state) {
          var plug;
          if (source.match(/^\\[a-zA-Z@]+/)) {
            var cmdName = source.current().slice(1);
            plug = plugins.hasOwnProperty(cmdName) ? plugins[cmdName] : plugins["DEFAULT"];
            plug = new plug();
            pushCommand(state, plug);
            setState(state, beginParams);
            return plug.style;
          }
          if (source.match(/^\\[$&%#{}_]/)) {
            return "tag";
          }
          if (source.match(/^\\[,;!\/\\]/)) {
            return "tag";
          }
          if (source.match("\\[")) {
            setState(state, function(source2, state2) {
              return inMathMode(source2, state2, "\\]");
            });
            return "keyword";
          }
          if (source.match("\\(")) {
            setState(state, function(source2, state2) {
              return inMathMode(source2, state2, "\\)");
            });
            return "keyword";
          }
          if (source.match("$$")) {
            setState(state, function(source2, state2) {
              return inMathMode(source2, state2, "$$");
            });
            return "keyword";
          }
          if (source.match("$")) {
            setState(state, function(source2, state2) {
              return inMathMode(source2, state2, "$");
            });
            return "keyword";
          }
          var ch = source.next();
          if (ch == "%") {
            source.skipToEnd();
            return "comment";
          } else if (ch == "}" || ch == "]") {
            plug = peekCommand(state);
            if (plug) {
              plug.closeBracket(ch);
              setState(state, beginParams);
            } else {
              return "error";
            }
            return "bracket";
          } else if (ch == "{" || ch == "[") {
            plug = plugins["DEFAULT"];
            plug = new plug();
            pushCommand(state, plug);
            return "bracket";
          } else if (/\d/.test(ch)) {
            source.eatWhile(/[\w.%]/);
            return "atom";
          } else {
            source.eatWhile(/[\w\-_]/);
            plug = getMostPowerful(state);
            if (plug.name == "begin") {
              plug.argument = source.current();
            }
            return plug.styleIdentifier();
          }
        }
        function inMathMode(source, state, endModeSeq) {
          if (source.eatSpace()) {
            return null;
          }
          if (endModeSeq && source.match(endModeSeq)) {
            setState(state, normal);
            return "keyword";
          }
          if (source.match(/^\\[a-zA-Z@]+/)) {
            return "tag";
          }
          if (source.match(/^[a-zA-Z]+/)) {
            return "variable-2";
          }
          if (source.match(/^\\[$&%#{}_]/)) {
            return "tag";
          }
          if (source.match(/^\\[,;!\/]/)) {
            return "tag";
          }
          if (source.match(/^[\^_&]/)) {
            return "tag";
          }
          if (source.match(/^[+\-<>|=,\/@!*:;'"`~#?]/)) {
            return null;
          }
          if (source.match(/^(\d+\.\d*|\d*\.\d+|\d+)/)) {
            return "number";
          }
          var ch = source.next();
          if (ch == "{" || ch == "}" || ch == "[" || ch == "]" || ch == "(" || ch == ")") {
            return "bracket";
          }
          if (ch == "%") {
            source.skipToEnd();
            return "comment";
          }
          return "error";
        }
        function beginParams(source, state) {
          var ch = source.peek(), lastPlug;
          if (ch == "{" || ch == "[") {
            lastPlug = peekCommand(state);
            lastPlug.openBracket(ch);
            source.eat(ch);
            setState(state, normal);
            return "bracket";
          }
          if (/[ \t\r]/.test(ch)) {
            source.eat(ch);
            return null;
          }
          setState(state, normal);
          popCommand(state);
          return normal(source, state);
        }
        return {
          startState: function() {
            var f = parserConfig.inMathMode ? function(source, state) {
              return inMathMode(source, state);
            } : normal;
            return {
              cmdState: [],
              f
            };
          },
          copyState: function(s) {
            return {
              cmdState: s.cmdState.slice(),
              f: s.f
            };
          },
          token: function(stream, state) {
            return state.f(stream, state);
          },
          blankLine: function(state) {
            state.f = normal;
            state.cmdState.length = 0;
          },
          lineComment: "%"
        };
      });
      CodeMirror3.defineMIME("text/x-stex", "stex");
      CodeMirror3.defineMIME("text/x-latex", "stex");
    });
  }
});

// node_modules/codemirror/mode/swift/swift.js
var require_swift = __commonJS({
  "node_modules/codemirror/mode/swift/swift.js"(exports, module) {
    (function(mod) {
      if (typeof exports == "object" && typeof module == "object")
        mod(require_codemirror());
      else if (typeof define == "function" && define.amd)
        define(["../../lib/codemirror"], mod);
      else
        mod(CodeMirror);
    })(function(CodeMirror3) {
      "use strict";
      function wordSet(words) {
        var set = {};
        for (var i = 0; i < words.length; i++)
          set[words[i]] = true;
        return set;
      }
      var keywords = wordSet([
        "_",
        "var",
        "let",
        "actor",
        "class",
        "enum",
        "extension",
        "import",
        "protocol",
        "struct",
        "func",
        "typealias",
        "associatedtype",
        "open",
        "public",
        "internal",
        "fileprivate",
        "private",
        "deinit",
        "init",
        "new",
        "override",
        "self",
        "subscript",
        "super",
        "convenience",
        "dynamic",
        "final",
        "indirect",
        "lazy",
        "required",
        "static",
        "unowned",
        "unowned(safe)",
        "unowned(unsafe)",
        "weak",
        "as",
        "is",
        "break",
        "case",
        "continue",
        "default",
        "else",
        "fallthrough",
        "for",
        "guard",
        "if",
        "in",
        "repeat",
        "switch",
        "where",
        "while",
        "defer",
        "return",
        "inout",
        "mutating",
        "nonmutating",
        "isolated",
        "nonisolated",
        "catch",
        "do",
        "rethrows",
        "throw",
        "throws",
        "async",
        "await",
        "try",
        "didSet",
        "get",
        "set",
        "willSet",
        "assignment",
        "associativity",
        "infix",
        "left",
        "none",
        "operator",
        "postfix",
        "precedence",
        "precedencegroup",
        "prefix",
        "right",
        "Any",
        "AnyObject",
        "Type",
        "dynamicType",
        "Self",
        "Protocol",
        "__COLUMN__",
        "__FILE__",
        "__FUNCTION__",
        "__LINE__"
      ]);
      var definingKeywords = wordSet(["var", "let", "actor", "class", "enum", "extension", "import", "protocol", "struct", "func", "typealias", "associatedtype", "for"]);
      var atoms = wordSet(["true", "false", "nil", "self", "super", "_"]);
      var types = wordSet([
        "Array",
        "Bool",
        "Character",
        "Dictionary",
        "Double",
        "Float",
        "Int",
        "Int8",
        "Int16",
        "Int32",
        "Int64",
        "Never",
        "Optional",
        "Set",
        "String",
        "UInt8",
        "UInt16",
        "UInt32",
        "UInt64",
        "Void"
      ]);
      var operators = "+-/*%=|&<>~^?!";
      var punc = ":;,.(){}[]";
      var binary = /^\-?0b[01][01_]*/;
      var octal = /^\-?0o[0-7][0-7_]*/;
      var hexadecimal = /^\-?0x[\dA-Fa-f][\dA-Fa-f_]*(?:(?:\.[\dA-Fa-f][\dA-Fa-f_]*)?[Pp]\-?\d[\d_]*)?/;
      var decimal = /^\-?\d[\d_]*(?:\.\d[\d_]*)?(?:[Ee]\-?\d[\d_]*)?/;
      var identifier = /^\$\d+|(`?)[_A-Za-z][_A-Za-z$0-9]*\1/;
      var property = /^\.(?:\$\d+|(`?)[_A-Za-z][_A-Za-z$0-9]*\1)/;
      var instruction = /^\#[A-Za-z]+/;
      var attribute = /^@(?:\$\d+|(`?)[_A-Za-z][_A-Za-z$0-9]*\1)/;
      function tokenBase(stream, state, prev) {
        if (stream.sol())
          state.indented = stream.indentation();
        if (stream.eatSpace())
          return null;
        var ch = stream.peek();
        if (ch == "/") {
          if (stream.match("//")) {
            stream.skipToEnd();
            return "comment";
          }
          if (stream.match("/*")) {
            state.tokenize.push(tokenComment);
            return tokenComment(stream, state);
          }
        }
        if (stream.match(instruction))
          return "builtin";
        if (stream.match(attribute))
          return "attribute";
        if (stream.match(binary))
          return "number";
        if (stream.match(octal))
          return "number";
        if (stream.match(hexadecimal))
          return "number";
        if (stream.match(decimal))
          return "number";
        if (stream.match(property))
          return "property";
        if (operators.indexOf(ch) > -1) {
          stream.next();
          return "operator";
        }
        if (punc.indexOf(ch) > -1) {
          stream.next();
          stream.match("..");
          return "punctuation";
        }
        var stringMatch;
        if (stringMatch = stream.match(/("""|"|')/)) {
          var tokenize = tokenString.bind(null, stringMatch[0]);
          state.tokenize.push(tokenize);
          return tokenize(stream, state);
        }
        if (stream.match(identifier)) {
          var ident = stream.current();
          if (types.hasOwnProperty(ident))
            return "variable-2";
          if (atoms.hasOwnProperty(ident))
            return "atom";
          if (keywords.hasOwnProperty(ident)) {
            if (definingKeywords.hasOwnProperty(ident))
              state.prev = "define";
            return "keyword";
          }
          if (prev == "define")
            return "def";
          return "variable";
        }
        stream.next();
        return null;
      }
      function tokenUntilClosingParen() {
        var depth = 0;
        return function(stream, state, prev) {
          var inner = tokenBase(stream, state, prev);
          if (inner == "punctuation") {
            if (stream.current() == "(")
              ++depth;
            else if (stream.current() == ")") {
              if (depth == 0) {
                stream.backUp(1);
                state.tokenize.pop();
                return state.tokenize[state.tokenize.length - 1](stream, state);
              } else
                --depth;
            }
          }
          return inner;
        };
      }
      function tokenString(openQuote, stream, state) {
        var singleLine = openQuote.length == 1;
        var ch, escaped = false;
        while (ch = stream.peek()) {
          if (escaped) {
            stream.next();
            if (ch == "(") {
              state.tokenize.push(tokenUntilClosingParen());
              return "string";
            }
            escaped = false;
          } else if (stream.match(openQuote)) {
            state.tokenize.pop();
            return "string";
          } else {
            stream.next();
            escaped = ch == "\\";
          }
        }
        if (singleLine) {
          state.tokenize.pop();
        }
        return "string";
      }
      function tokenComment(stream, state) {
        var ch;
        while (ch = stream.next()) {
          if (ch === "/" && stream.eat("*")) {
            state.tokenize.push(tokenComment);
          } else if (ch === "*" && stream.eat("/")) {
            state.tokenize.pop();
            break;
          }
        }
        return "comment";
      }
      function Context(prev, align, indented) {
        this.prev = prev;
        this.align = align;
        this.indented = indented;
      }
      function pushContext(state, stream) {
        var align = stream.match(/^\s*($|\/[\/\*])/, false) ? null : stream.column() + 1;
        state.context = new Context(state.context, align, state.indented);
      }
      function popContext(state) {
        if (state.context) {
          state.indented = state.context.indented;
          state.context = state.context.prev;
        }
      }
      CodeMirror3.defineMode("swift", function(config) {
        return {
          startState: function() {
            return {
              prev: null,
              context: null,
              indented: 0,
              tokenize: []
            };
          },
          token: function(stream, state) {
            var prev = state.prev;
            state.prev = null;
            var tokenize = state.tokenize[state.tokenize.length - 1] || tokenBase;
            var style = tokenize(stream, state, prev);
            if (!style || style == "comment")
              state.prev = prev;
            else if (!state.prev)
              state.prev = style;
            if (style == "punctuation") {
              var bracket = /[\(\[\{]|([\]\)\}])/.exec(stream.current());
              if (bracket)
                (bracket[1] ? popContext : pushContext)(state, stream);
            }
            return style;
          },
          indent: function(state, textAfter) {
            var cx = state.context;
            if (!cx)
              return 0;
            var closing = /^[\]\}\)]/.test(textAfter);
            if (cx.align != null)
              return cx.align - (closing ? 1 : 0);
            return cx.indented + (closing ? 0 : config.indentUnit);
          },
          electricInput: /^\s*[\)\}\]]$/,
          lineComment: "//",
          blockCommentStart: "/*",
          blockCommentEnd: "*/",
          fold: "brace",
          closeBrackets: "()[]{}''\"\"``"
        };
      });
      CodeMirror3.defineMIME("text/x-swift", "swift");
    });
  }
});

// node_modules/codemirror/mode/toml/toml.js
var require_toml = __commonJS({
  "node_modules/codemirror/mode/toml/toml.js"(exports, module) {
    (function(mod) {
      if (typeof exports == "object" && typeof module == "object")
        mod(require_codemirror());
      else if (typeof define == "function" && define.amd)
        define(["../../lib/codemirror"], mod);
      else
        mod(CodeMirror);
    })(function(CodeMirror3) {
      "use strict";
      CodeMirror3.defineMode("toml", function() {
        return {
          startState: function() {
            return {
              inString: false,
              stringType: "",
              lhs: true,
              inArray: 0
            };
          },
          token: function(stream, state) {
            if (!state.inString && (stream.peek() == '"' || stream.peek() == "'")) {
              state.stringType = stream.peek();
              stream.next();
              state.inString = true;
            }
            if (stream.sol() && state.inArray === 0) {
              state.lhs = true;
            }
            if (state.inString) {
              while (state.inString && !stream.eol()) {
                if (stream.peek() === state.stringType) {
                  stream.next();
                  state.inString = false;
                } else if (stream.peek() === "\\") {
                  stream.next();
                  stream.next();
                } else {
                  stream.match(/^.[^\\\"\']*/);
                }
              }
              return state.lhs ? "property string" : "string";
            } else if (state.inArray && stream.peek() === "]") {
              stream.next();
              state.inArray--;
              return "bracket";
            } else if (state.lhs && stream.peek() === "[" && stream.skipTo("]")) {
              stream.next();
              if (stream.peek() === "]")
                stream.next();
              return "atom";
            } else if (stream.peek() === "#") {
              stream.skipToEnd();
              return "comment";
            } else if (stream.eatSpace()) {
              return null;
            } else if (state.lhs && stream.eatWhile(function(c) {
              return c != "=" && c != " ";
            })) {
              return "property";
            } else if (state.lhs && stream.peek() === "=") {
              stream.next();
              state.lhs = false;
              return null;
            } else if (!state.lhs && stream.match(/^\d\d\d\d[\d\-\:\.T]*Z/)) {
              return "atom";
            } else if (!state.lhs && (stream.match("true") || stream.match("false"))) {
              return "atom";
            } else if (!state.lhs && stream.peek() === "[") {
              state.inArray++;
              stream.next();
              return "bracket";
            } else if (!state.lhs && stream.match(/^\-?\d+(?:\.\d+)?/)) {
              return "number";
            } else if (!stream.eatSpace()) {
              stream.next();
            }
            return null;
          }
        };
      });
      CodeMirror3.defineMIME("text/x-toml", "toml");
    });
  }
});

// node_modules/codemirror/addon/mode/multiplex.js
var require_multiplex = __commonJS({
  "node_modules/codemirror/addon/mode/multiplex.js"(exports, module) {
    (function(mod) {
      if (typeof exports == "object" && typeof module == "object")
        mod(require_codemirror());
      else if (typeof define == "function" && define.amd)
        define(["../../lib/codemirror"], mod);
      else
        mod(CodeMirror);
    })(function(CodeMirror3) {
      "use strict";
      CodeMirror3.multiplexingMode = function(outer) {
        var others = Array.prototype.slice.call(arguments, 1);
        function indexOf(string, pattern, from, returnEnd) {
          if (typeof pattern == "string") {
            var found = string.indexOf(pattern, from);
            return returnEnd && found > -1 ? found + pattern.length : found;
          }
          var m = pattern.exec(from ? string.slice(from) : string);
          return m ? m.index + from + (returnEnd ? m[0].length : 0) : -1;
        }
        return {
          startState: function() {
            return {
              outer: CodeMirror3.startState(outer),
              innerActive: null,
              inner: null,
              startingInner: false
            };
          },
          copyState: function(state) {
            return {
              outer: CodeMirror3.copyState(outer, state.outer),
              innerActive: state.innerActive,
              inner: state.innerActive && CodeMirror3.copyState(state.innerActive.mode, state.inner),
              startingInner: state.startingInner
            };
          },
          token: function(stream, state) {
            if (!state.innerActive) {
              var cutOff = Infinity, oldContent = stream.string;
              for (var i = 0; i < others.length; ++i) {
                var other = others[i];
                var found = indexOf(oldContent, other.open, stream.pos);
                if (found == stream.pos) {
                  if (!other.parseDelimiters)
                    stream.match(other.open);
                  state.startingInner = !!other.parseDelimiters;
                  state.innerActive = other;
                  var outerIndent = 0;
                  if (outer.indent) {
                    var possibleOuterIndent = outer.indent(state.outer, "", "");
                    if (possibleOuterIndent !== CodeMirror3.Pass)
                      outerIndent = possibleOuterIndent;
                  }
                  state.inner = CodeMirror3.startState(other.mode, outerIndent);
                  return other.delimStyle && other.delimStyle + " " + other.delimStyle + "-open";
                } else if (found != -1 && found < cutOff) {
                  cutOff = found;
                }
              }
              if (cutOff != Infinity)
                stream.string = oldContent.slice(0, cutOff);
              var outerToken = outer.token(stream, state.outer);
              if (cutOff != Infinity)
                stream.string = oldContent;
              return outerToken;
            } else {
              var curInner = state.innerActive, oldContent = stream.string;
              if (!curInner.close && stream.sol()) {
                state.innerActive = state.inner = null;
                return this.token(stream, state);
              }
              var found = curInner.close && !state.startingInner ? indexOf(oldContent, curInner.close, stream.pos, curInner.parseDelimiters) : -1;
              if (found == stream.pos && !curInner.parseDelimiters) {
                stream.match(curInner.close);
                state.innerActive = state.inner = null;
                return curInner.delimStyle && curInner.delimStyle + " " + curInner.delimStyle + "-close";
              }
              if (found > -1)
                stream.string = oldContent.slice(0, found);
              var innerToken = curInner.mode.token(stream, state.inner);
              if (found > -1)
                stream.string = oldContent;
              else if (stream.pos > stream.start)
                state.startingInner = false;
              if (found == stream.pos && curInner.parseDelimiters)
                state.innerActive = state.inner = null;
              if (curInner.innerStyle) {
                if (innerToken)
                  innerToken = innerToken + " " + curInner.innerStyle;
                else
                  innerToken = curInner.innerStyle;
              }
              return innerToken;
            }
          },
          indent: function(state, textAfter, line) {
            var mode = state.innerActive ? state.innerActive.mode : outer;
            if (!mode.indent)
              return CodeMirror3.Pass;
            return mode.indent(state.innerActive ? state.inner : state.outer, textAfter, line);
          },
          blankLine: function(state) {
            var mode = state.innerActive ? state.innerActive.mode : outer;
            if (mode.blankLine) {
              mode.blankLine(state.innerActive ? state.inner : state.outer);
            }
            if (!state.innerActive) {
              for (var i = 0; i < others.length; ++i) {
                var other = others[i];
                if (other.open === "\n") {
                  state.innerActive = other;
                  state.inner = CodeMirror3.startState(other.mode, mode.indent ? mode.indent(state.outer, "", "") : 0);
                }
              }
            } else if (state.innerActive.close === "\n") {
              state.innerActive = state.inner = null;
            }
          },
          electricChars: outer.electricChars,
          innerMode: function(state) {
            return state.inner ? { state: state.inner, mode: state.innerActive.mode } : { state: state.outer, mode: outer };
          }
        };
      };
    });
  }
});

// node_modules/codemirror/mode/twig/twig.js
var require_twig = __commonJS({
  "node_modules/codemirror/mode/twig/twig.js"(exports, module) {
    (function(mod) {
      if (typeof exports == "object" && typeof module == "object")
        mod(require_codemirror(), require_multiplex());
      else if (typeof define == "function" && define.amd)
        define(["../../lib/codemirror", "../../addon/mode/multiplex"], mod);
      else
        mod(CodeMirror);
    })(function(CodeMirror3) {
      "use strict";
      CodeMirror3.defineMode("twig:inner", function() {
        var keywords = ["and", "as", "autoescape", "endautoescape", "block", "do", "endblock", "else", "elseif", "extends", "for", "endfor", "embed", "endembed", "filter", "endfilter", "flush", "from", "if", "endif", "in", "is", "include", "import", "not", "or", "set", "spaceless", "endspaceless", "with", "endwith", "trans", "endtrans", "blocktrans", "endblocktrans", "macro", "endmacro", "use", "verbatim", "endverbatim"], operator = /^[+\-*&%=<>!?|~^]/, sign = /^[:\[\(\{]/, atom = ["true", "false", "null", "empty", "defined", "divisibleby", "divisible by", "even", "odd", "iterable", "sameas", "same as"], number = /^(\d[+\-\*\/])?\d+(\.\d+)?/;
        keywords = new RegExp("((" + keywords.join(")|(") + "))\\b");
        atom = new RegExp("((" + atom.join(")|(") + "))\\b");
        function tokenBase(stream, state) {
          var ch = stream.peek();
          if (state.incomment) {
            if (!stream.skipTo("#}")) {
              stream.skipToEnd();
            } else {
              stream.eatWhile(/\#|}/);
              state.incomment = false;
            }
            return "comment";
          } else if (state.intag) {
            if (state.operator) {
              state.operator = false;
              if (stream.match(atom)) {
                return "atom";
              }
              if (stream.match(number)) {
                return "number";
              }
            }
            if (state.sign) {
              state.sign = false;
              if (stream.match(atom)) {
                return "atom";
              }
              if (stream.match(number)) {
                return "number";
              }
            }
            if (state.instring) {
              if (ch == state.instring) {
                state.instring = false;
              }
              stream.next();
              return "string";
            } else if (ch == "'" || ch == '"') {
              state.instring = ch;
              stream.next();
              return "string";
            } else if (stream.match(state.intag + "}") || stream.eat("-") && stream.match(state.intag + "}")) {
              state.intag = false;
              return "tag";
            } else if (stream.match(operator)) {
              state.operator = true;
              return "operator";
            } else if (stream.match(sign)) {
              state.sign = true;
            } else {
              if (stream.eat(" ") || stream.sol()) {
                if (stream.match(keywords)) {
                  return "keyword";
                }
                if (stream.match(atom)) {
                  return "atom";
                }
                if (stream.match(number)) {
                  return "number";
                }
                if (stream.sol()) {
                  stream.next();
                }
              } else {
                stream.next();
              }
            }
            return "variable";
          } else if (stream.eat("{")) {
            if (stream.eat("#")) {
              state.incomment = true;
              if (!stream.skipTo("#}")) {
                stream.skipToEnd();
              } else {
                stream.eatWhile(/\#|}/);
                state.incomment = false;
              }
              return "comment";
            } else if (ch = stream.eat(/\{|%/)) {
              state.intag = ch;
              if (ch == "{") {
                state.intag = "}";
              }
              stream.eat("-");
              return "tag";
            }
          }
          stream.next();
        }
        ;
        return {
          startState: function() {
            return {};
          },
          token: function(stream, state) {
            return tokenBase(stream, state);
          }
        };
      });
      CodeMirror3.defineMode("twig", function(config, parserConfig) {
        var twigInner = CodeMirror3.getMode(config, "twig:inner");
        if (!parserConfig || !parserConfig.base)
          return twigInner;
        return CodeMirror3.multiplexingMode(
          CodeMirror3.getMode(config, parserConfig.base),
          {
            open: /\{[{#%]/,
            close: /[}#%]\}/,
            mode: twigInner,
            parseDelimiters: true
          }
        );
      });
      CodeMirror3.defineMIME("text/x-twig", "twig");
    });
  }
});

// node_modules/codemirror/mode/vb/vb.js
var require_vb = __commonJS({
  "node_modules/codemirror/mode/vb/vb.js"(exports, module) {
    (function(mod) {
      if (typeof exports == "object" && typeof module == "object")
        mod(require_codemirror());
      else if (typeof define == "function" && define.amd)
        define(["../../lib/codemirror"], mod);
      else
        mod(CodeMirror);
    })(function(CodeMirror3) {
      "use strict";
      CodeMirror3.defineMode("vb", function(conf, parserConf) {
        var ERRORCLASS = "error";
        function wordRegexp(words) {
          return new RegExp("^((" + words.join(")|(") + "))\\b", "i");
        }
        var singleOperators = new RegExp("^[\\+\\-\\*/%&\\\\|\\^~<>!]");
        var singleDelimiters = new RegExp("^[\\(\\)\\[\\]\\{\\}@,:`=;\\.]");
        var doubleOperators = new RegExp("^((==)|(<>)|(<=)|(>=)|(<>)|(<<)|(>>)|(//)|(\\*\\*))");
        var doubleDelimiters = new RegExp("^((\\+=)|(\\-=)|(\\*=)|(%=)|(/=)|(&=)|(\\|=)|(\\^=))");
        var tripleDelimiters = new RegExp("^((//=)|(>>=)|(<<=)|(\\*\\*=))");
        var identifiers = new RegExp("^[_A-Za-z][_A-Za-z0-9]*");
        var openingKeywords = ["class", "module", "sub", "enum", "select", "while", "if", "function", "get", "set", "property", "try", "structure", "synclock", "using", "with"];
        var middleKeywords = ["else", "elseif", "case", "catch", "finally"];
        var endKeywords = ["next", "loop"];
        var operatorKeywords = ["and", "andalso", "or", "orelse", "xor", "in", "not", "is", "isnot", "like"];
        var wordOperators = wordRegexp(operatorKeywords);
        var commonKeywords = ["#const", "#else", "#elseif", "#end", "#if", "#region", "addhandler", "addressof", "alias", "as", "byref", "byval", "cbool", "cbyte", "cchar", "cdate", "cdbl", "cdec", "cint", "clng", "cobj", "compare", "const", "continue", "csbyte", "cshort", "csng", "cstr", "cuint", "culng", "cushort", "declare", "default", "delegate", "dim", "directcast", "each", "erase", "error", "event", "exit", "explicit", "false", "for", "friend", "gettype", "goto", "handles", "implements", "imports", "infer", "inherits", "interface", "isfalse", "istrue", "lib", "me", "mod", "mustinherit", "mustoverride", "my", "mybase", "myclass", "namespace", "narrowing", "new", "nothing", "notinheritable", "notoverridable", "of", "off", "on", "operator", "option", "optional", "out", "overloads", "overridable", "overrides", "paramarray", "partial", "private", "protected", "public", "raiseevent", "readonly", "redim", "removehandler", "resume", "return", "shadows", "shared", "static", "step", "stop", "strict", "then", "throw", "to", "true", "trycast", "typeof", "until", "until", "when", "widening", "withevents", "writeonly"];
        var commontypes = ["object", "boolean", "char", "string", "byte", "sbyte", "short", "ushort", "int16", "uint16", "integer", "uinteger", "int32", "uint32", "long", "ulong", "int64", "uint64", "decimal", "single", "double", "float", "date", "datetime", "intptr", "uintptr"];
        var keywords = wordRegexp(commonKeywords);
        var types = wordRegexp(commontypes);
        var stringPrefixes = '"';
        var opening = wordRegexp(openingKeywords);
        var middle = wordRegexp(middleKeywords);
        var closing = wordRegexp(endKeywords);
        var doubleClosing = wordRegexp(["end"]);
        var doOpening = wordRegexp(["do"]);
        var indentInfo = null;
        CodeMirror3.registerHelper("hintWords", "vb", openingKeywords.concat(middleKeywords).concat(endKeywords).concat(operatorKeywords).concat(commonKeywords).concat(commontypes));
        function indent(_stream, state) {
          state.currentIndent++;
        }
        function dedent(_stream, state) {
          state.currentIndent--;
        }
        function tokenBase(stream, state) {
          if (stream.eatSpace()) {
            return null;
          }
          var ch = stream.peek();
          if (ch === "'") {
            stream.skipToEnd();
            return "comment";
          }
          if (stream.match(/^((&H)|(&O))?[0-9\.a-f]/i, false)) {
            var floatLiteral = false;
            if (stream.match(/^\d*\.\d+F?/i)) {
              floatLiteral = true;
            } else if (stream.match(/^\d+\.\d*F?/)) {
              floatLiteral = true;
            } else if (stream.match(/^\.\d+F?/)) {
              floatLiteral = true;
            }
            if (floatLiteral) {
              stream.eat(/J/i);
              return "number";
            }
            var intLiteral = false;
            if (stream.match(/^&H[0-9a-f]+/i)) {
              intLiteral = true;
            } else if (stream.match(/^&O[0-7]+/i)) {
              intLiteral = true;
            } else if (stream.match(/^[1-9]\d*F?/)) {
              stream.eat(/J/i);
              intLiteral = true;
            } else if (stream.match(/^0(?![\dx])/i)) {
              intLiteral = true;
            }
            if (intLiteral) {
              stream.eat(/L/i);
              return "number";
            }
          }
          if (stream.match(stringPrefixes)) {
            state.tokenize = tokenStringFactory(stream.current());
            return state.tokenize(stream, state);
          }
          if (stream.match(tripleDelimiters) || stream.match(doubleDelimiters)) {
            return null;
          }
          if (stream.match(doubleOperators) || stream.match(singleOperators) || stream.match(wordOperators)) {
            return "operator";
          }
          if (stream.match(singleDelimiters)) {
            return null;
          }
          if (stream.match(doOpening)) {
            indent(stream, state);
            state.doInCurrentLine = true;
            return "keyword";
          }
          if (stream.match(opening)) {
            if (!state.doInCurrentLine)
              indent(stream, state);
            else
              state.doInCurrentLine = false;
            return "keyword";
          }
          if (stream.match(middle)) {
            return "keyword";
          }
          if (stream.match(doubleClosing)) {
            dedent(stream, state);
            dedent(stream, state);
            return "keyword";
          }
          if (stream.match(closing)) {
            dedent(stream, state);
            return "keyword";
          }
          if (stream.match(types)) {
            return "keyword";
          }
          if (stream.match(keywords)) {
            return "keyword";
          }
          if (stream.match(identifiers)) {
            return "variable";
          }
          stream.next();
          return ERRORCLASS;
        }
        function tokenStringFactory(delimiter) {
          var singleline = delimiter.length == 1;
          var OUTCLASS = "string";
          return function(stream, state) {
            while (!stream.eol()) {
              stream.eatWhile(/[^'"]/);
              if (stream.match(delimiter)) {
                state.tokenize = tokenBase;
                return OUTCLASS;
              } else {
                stream.eat(/['"]/);
              }
            }
            if (singleline) {
              if (parserConf.singleLineStringErrors) {
                return ERRORCLASS;
              } else {
                state.tokenize = tokenBase;
              }
            }
            return OUTCLASS;
          };
        }
        function tokenLexer(stream, state) {
          var style = state.tokenize(stream, state);
          var current = stream.current();
          if (current === ".") {
            style = state.tokenize(stream, state);
            if (style === "variable") {
              return "variable";
            } else {
              return ERRORCLASS;
            }
          }
          var delimiter_index = "[({".indexOf(current);
          if (delimiter_index !== -1) {
            indent(stream, state);
          }
          if (indentInfo === "dedent") {
            if (dedent(stream, state)) {
              return ERRORCLASS;
            }
          }
          delimiter_index = "])}".indexOf(current);
          if (delimiter_index !== -1) {
            if (dedent(stream, state)) {
              return ERRORCLASS;
            }
          }
          return style;
        }
        var external = {
          electricChars: "dDpPtTfFeE ",
          startState: function() {
            return {
              tokenize: tokenBase,
              lastToken: null,
              currentIndent: 0,
              nextLineIndent: 0,
              doInCurrentLine: false
            };
          },
          token: function(stream, state) {
            if (stream.sol()) {
              state.currentIndent += state.nextLineIndent;
              state.nextLineIndent = 0;
              state.doInCurrentLine = 0;
            }
            var style = tokenLexer(stream, state);
            state.lastToken = { style, content: stream.current() };
            return style;
          },
          indent: function(state, textAfter) {
            var trueText = textAfter.replace(/^\s+|\s+$/g, "");
            if (trueText.match(closing) || trueText.match(doubleClosing) || trueText.match(middle))
              return conf.indentUnit * (state.currentIndent - 1);
            if (state.currentIndent < 0)
              return 0;
            return state.currentIndent * conf.indentUnit;
          },
          lineComment: "'"
        };
        return external;
      });
      CodeMirror3.defineMIME("text/x-vb", "vb");
    });
  }
});

// node_modules/codemirror/mode/vbscript/vbscript.js
var require_vbscript = __commonJS({
  "node_modules/codemirror/mode/vbscript/vbscript.js"(exports, module) {
    (function(mod) {
      if (typeof exports == "object" && typeof module == "object")
        mod(require_codemirror());
      else if (typeof define == "function" && define.amd)
        define(["../../lib/codemirror"], mod);
      else
        mod(CodeMirror);
    })(function(CodeMirror3) {
      "use strict";
      CodeMirror3.defineMode("vbscript", function(conf, parserConf) {
        var ERRORCLASS = "error";
        function wordRegexp(words) {
          return new RegExp("^((" + words.join(")|(") + "))\\b", "i");
        }
        var singleOperators = new RegExp("^[\\+\\-\\*/&\\\\\\^<>=]");
        var doubleOperators = new RegExp("^((<>)|(<=)|(>=))");
        var singleDelimiters = new RegExp("^[\\.,]");
        var brackets = new RegExp("^[\\(\\)]");
        var identifiers = new RegExp("^[A-Za-z][_A-Za-z0-9]*");
        var openingKeywords = ["class", "sub", "select", "while", "if", "function", "property", "with", "for"];
        var middleKeywords = ["else", "elseif", "case"];
        var endKeywords = ["next", "loop", "wend"];
        var wordOperators = wordRegexp(["and", "or", "not", "xor", "is", "mod", "eqv", "imp"]);
        var commonkeywords = [
          "dim",
          "redim",
          "then",
          "until",
          "randomize",
          "byval",
          "byref",
          "new",
          "property",
          "exit",
          "in",
          "const",
          "private",
          "public",
          "get",
          "set",
          "let",
          "stop",
          "on error resume next",
          "on error goto 0",
          "option explicit",
          "call",
          "me"
        ];
        var atomWords = ["true", "false", "nothing", "empty", "null"];
        var builtinFuncsWords = [
          "abs",
          "array",
          "asc",
          "atn",
          "cbool",
          "cbyte",
          "ccur",
          "cdate",
          "cdbl",
          "chr",
          "cint",
          "clng",
          "cos",
          "csng",
          "cstr",
          "date",
          "dateadd",
          "datediff",
          "datepart",
          "dateserial",
          "datevalue",
          "day",
          "escape",
          "eval",
          "execute",
          "exp",
          "filter",
          "formatcurrency",
          "formatdatetime",
          "formatnumber",
          "formatpercent",
          "getlocale",
          "getobject",
          "getref",
          "hex",
          "hour",
          "inputbox",
          "instr",
          "instrrev",
          "int",
          "fix",
          "isarray",
          "isdate",
          "isempty",
          "isnull",
          "isnumeric",
          "isobject",
          "join",
          "lbound",
          "lcase",
          "left",
          "len",
          "loadpicture",
          "log",
          "ltrim",
          "rtrim",
          "trim",
          "maths",
          "mid",
          "minute",
          "month",
          "monthname",
          "msgbox",
          "now",
          "oct",
          "replace",
          "rgb",
          "right",
          "rnd",
          "round",
          "scriptengine",
          "scriptenginebuildversion",
          "scriptenginemajorversion",
          "scriptengineminorversion",
          "second",
          "setlocale",
          "sgn",
          "sin",
          "space",
          "split",
          "sqr",
          "strcomp",
          "string",
          "strreverse",
          "tan",
          "time",
          "timer",
          "timeserial",
          "timevalue",
          "typename",
          "ubound",
          "ucase",
          "unescape",
          "vartype",
          "weekday",
          "weekdayname",
          "year"
        ];
        var builtinConsts = [
          "vbBlack",
          "vbRed",
          "vbGreen",
          "vbYellow",
          "vbBlue",
          "vbMagenta",
          "vbCyan",
          "vbWhite",
          "vbBinaryCompare",
          "vbTextCompare",
          "vbSunday",
          "vbMonday",
          "vbTuesday",
          "vbWednesday",
          "vbThursday",
          "vbFriday",
          "vbSaturday",
          "vbUseSystemDayOfWeek",
          "vbFirstJan1",
          "vbFirstFourDays",
          "vbFirstFullWeek",
          "vbGeneralDate",
          "vbLongDate",
          "vbShortDate",
          "vbLongTime",
          "vbShortTime",
          "vbObjectError",
          "vbOKOnly",
          "vbOKCancel",
          "vbAbortRetryIgnore",
          "vbYesNoCancel",
          "vbYesNo",
          "vbRetryCancel",
          "vbCritical",
          "vbQuestion",
          "vbExclamation",
          "vbInformation",
          "vbDefaultButton1",
          "vbDefaultButton2",
          "vbDefaultButton3",
          "vbDefaultButton4",
          "vbApplicationModal",
          "vbSystemModal",
          "vbOK",
          "vbCancel",
          "vbAbort",
          "vbRetry",
          "vbIgnore",
          "vbYes",
          "vbNo",
          "vbCr",
          "VbCrLf",
          "vbFormFeed",
          "vbLf",
          "vbNewLine",
          "vbNullChar",
          "vbNullString",
          "vbTab",
          "vbVerticalTab",
          "vbUseDefault",
          "vbTrue",
          "vbFalse",
          "vbEmpty",
          "vbNull",
          "vbInteger",
          "vbLong",
          "vbSingle",
          "vbDouble",
          "vbCurrency",
          "vbDate",
          "vbString",
          "vbObject",
          "vbError",
          "vbBoolean",
          "vbVariant",
          "vbDataObject",
          "vbDecimal",
          "vbByte",
          "vbArray"
        ];
        var builtinObjsWords = ["WScript", "err", "debug", "RegExp"];
        var knownProperties = ["description", "firstindex", "global", "helpcontext", "helpfile", "ignorecase", "length", "number", "pattern", "source", "value", "count"];
        var knownMethods = ["clear", "execute", "raise", "replace", "test", "write", "writeline", "close", "open", "state", "eof", "update", "addnew", "end", "createobject", "quit"];
        var aspBuiltinObjsWords = ["server", "response", "request", "session", "application"];
        var aspKnownProperties = [
          "buffer",
          "cachecontrol",
          "charset",
          "contenttype",
          "expires",
          "expiresabsolute",
          "isclientconnected",
          "pics",
          "status",
          //response
          "clientcertificate",
          "cookies",
          "form",
          "querystring",
          "servervariables",
          "totalbytes",
          //request
          "contents",
          "staticobjects",
          //application
          "codepage",
          "lcid",
          "sessionid",
          "timeout",
          //session
          "scripttimeout"
        ];
        var aspKnownMethods = [
          "addheader",
          "appendtolog",
          "binarywrite",
          "end",
          "flush",
          "redirect",
          //response
          "binaryread",
          //request
          "remove",
          "removeall",
          "lock",
          "unlock",
          //application
          "abandon",
          //session
          "getlasterror",
          "htmlencode",
          "mappath",
          "transfer",
          "urlencode"
        ];
        var knownWords = knownMethods.concat(knownProperties);
        builtinObjsWords = builtinObjsWords.concat(builtinConsts);
        if (conf.isASP) {
          builtinObjsWords = builtinObjsWords.concat(aspBuiltinObjsWords);
          knownWords = knownWords.concat(aspKnownMethods, aspKnownProperties);
        }
        ;
        var keywords = wordRegexp(commonkeywords);
        var atoms = wordRegexp(atomWords);
        var builtinFuncs = wordRegexp(builtinFuncsWords);
        var builtinObjs = wordRegexp(builtinObjsWords);
        var known = wordRegexp(knownWords);
        var stringPrefixes = '"';
        var opening = wordRegexp(openingKeywords);
        var middle = wordRegexp(middleKeywords);
        var closing = wordRegexp(endKeywords);
        var doubleClosing = wordRegexp(["end"]);
        var doOpening = wordRegexp(["do"]);
        var noIndentWords = wordRegexp(["on error resume next", "exit"]);
        var comment = wordRegexp(["rem"]);
        function indent(_stream, state) {
          state.currentIndent++;
        }
        function dedent(_stream, state) {
          state.currentIndent--;
        }
        function tokenBase(stream, state) {
          if (stream.eatSpace()) {
            return "space";
          }
          var ch = stream.peek();
          if (ch === "'") {
            stream.skipToEnd();
            return "comment";
          }
          if (stream.match(comment)) {
            stream.skipToEnd();
            return "comment";
          }
          if (stream.match(/^((&H)|(&O))?[0-9\.]/i, false) && !stream.match(/^((&H)|(&O))?[0-9\.]+[a-z_]/i, false)) {
            var floatLiteral = false;
            if (stream.match(/^\d*\.\d+/i)) {
              floatLiteral = true;
            } else if (stream.match(/^\d+\.\d*/)) {
              floatLiteral = true;
            } else if (stream.match(/^\.\d+/)) {
              floatLiteral = true;
            }
            if (floatLiteral) {
              stream.eat(/J/i);
              return "number";
            }
            var intLiteral = false;
            if (stream.match(/^&H[0-9a-f]+/i)) {
              intLiteral = true;
            } else if (stream.match(/^&O[0-7]+/i)) {
              intLiteral = true;
            } else if (stream.match(/^[1-9]\d*F?/)) {
              stream.eat(/J/i);
              intLiteral = true;
            } else if (stream.match(/^0(?![\dx])/i)) {
              intLiteral = true;
            }
            if (intLiteral) {
              stream.eat(/L/i);
              return "number";
            }
          }
          if (stream.match(stringPrefixes)) {
            state.tokenize = tokenStringFactory(stream.current());
            return state.tokenize(stream, state);
          }
          if (stream.match(doubleOperators) || stream.match(singleOperators) || stream.match(wordOperators)) {
            return "operator";
          }
          if (stream.match(singleDelimiters)) {
            return null;
          }
          if (stream.match(brackets)) {
            return "bracket";
          }
          if (stream.match(noIndentWords)) {
            state.doInCurrentLine = true;
            return "keyword";
          }
          if (stream.match(doOpening)) {
            indent(stream, state);
            state.doInCurrentLine = true;
            return "keyword";
          }
          if (stream.match(opening)) {
            if (!state.doInCurrentLine)
              indent(stream, state);
            else
              state.doInCurrentLine = false;
            return "keyword";
          }
          if (stream.match(middle)) {
            return "keyword";
          }
          if (stream.match(doubleClosing)) {
            dedent(stream, state);
            dedent(stream, state);
            return "keyword";
          }
          if (stream.match(closing)) {
            if (!state.doInCurrentLine)
              dedent(stream, state);
            else
              state.doInCurrentLine = false;
            return "keyword";
          }
          if (stream.match(keywords)) {
            return "keyword";
          }
          if (stream.match(atoms)) {
            return "atom";
          }
          if (stream.match(known)) {
            return "variable-2";
          }
          if (stream.match(builtinFuncs)) {
            return "builtin";
          }
          if (stream.match(builtinObjs)) {
            return "variable-2";
          }
          if (stream.match(identifiers)) {
            return "variable";
          }
          stream.next();
          return ERRORCLASS;
        }
        function tokenStringFactory(delimiter) {
          var singleline = delimiter.length == 1;
          var OUTCLASS = "string";
          return function(stream, state) {
            while (!stream.eol()) {
              stream.eatWhile(/[^'"]/);
              if (stream.match(delimiter)) {
                state.tokenize = tokenBase;
                return OUTCLASS;
              } else {
                stream.eat(/['"]/);
              }
            }
            if (singleline) {
              if (parserConf.singleLineStringErrors) {
                return ERRORCLASS;
              } else {
                state.tokenize = tokenBase;
              }
            }
            return OUTCLASS;
          };
        }
        function tokenLexer(stream, state) {
          var style = state.tokenize(stream, state);
          var current = stream.current();
          if (current === ".") {
            style = state.tokenize(stream, state);
            current = stream.current();
            if (style && (style.substr(0, 8) === "variable" || style === "builtin" || style === "keyword")) {
              if (style === "builtin" || style === "keyword")
                style = "variable";
              if (knownWords.indexOf(current.substr(1)) > -1)
                style = "variable-2";
              return style;
            } else {
              return ERRORCLASS;
            }
          }
          return style;
        }
        var external = {
          electricChars: "dDpPtTfFeE ",
          startState: function() {
            return {
              tokenize: tokenBase,
              lastToken: null,
              currentIndent: 0,
              nextLineIndent: 0,
              doInCurrentLine: false,
              ignoreKeyword: false
            };
          },
          token: function(stream, state) {
            if (stream.sol()) {
              state.currentIndent += state.nextLineIndent;
              state.nextLineIndent = 0;
              state.doInCurrentLine = 0;
            }
            var style = tokenLexer(stream, state);
            state.lastToken = { style, content: stream.current() };
            if (style === "space")
              style = null;
            return style;
          },
          indent: function(state, textAfter) {
            var trueText = textAfter.replace(/^\s+|\s+$/g, "");
            if (trueText.match(closing) || trueText.match(doubleClosing) || trueText.match(middle))
              return conf.indentUnit * (state.currentIndent - 1);
            if (state.currentIndent < 0)
              return 0;
            return state.currentIndent * conf.indentUnit;
          }
        };
        return external;
      });
      CodeMirror3.defineMIME("text/vbscript", "vbscript");
    });
  }
});

// node_modules/codemirror/mode/yaml/yaml.js
var require_yaml = __commonJS({
  "node_modules/codemirror/mode/yaml/yaml.js"(exports, module) {
    (function(mod) {
      if (typeof exports == "object" && typeof module == "object")
        mod(require_codemirror());
      else if (typeof define == "function" && define.amd)
        define(["../../lib/codemirror"], mod);
      else
        mod(CodeMirror);
    })(function(CodeMirror3) {
      "use strict";
      CodeMirror3.defineMode("yaml", function() {
        var cons = ["true", "false", "on", "off", "yes", "no"];
        var keywordRegex = new RegExp("\\b((" + cons.join(")|(") + "))$", "i");
        return {
          token: function(stream, state) {
            var ch = stream.peek();
            var esc = state.escaped;
            state.escaped = false;
            if (ch == "#" && (stream.pos == 0 || /\s/.test(stream.string.charAt(stream.pos - 1)))) {
              stream.skipToEnd();
              return "comment";
            }
            if (stream.match(/^('([^']|\\.)*'?|"([^"]|\\.)*"?)/))
              return "string";
            if (state.literal && stream.indentation() > state.keyCol) {
              stream.skipToEnd();
              return "string";
            } else if (state.literal) {
              state.literal = false;
            }
            if (stream.sol()) {
              state.keyCol = 0;
              state.pair = false;
              state.pairStart = false;
              if (stream.match("---")) {
                return "def";
              }
              if (stream.match("...")) {
                return "def";
              }
              if (stream.match(/\s*-\s+/)) {
                return "meta";
              }
            }
            if (stream.match(/^(\{|\}|\[|\])/)) {
              if (ch == "{")
                state.inlinePairs++;
              else if (ch == "}")
                state.inlinePairs--;
              else if (ch == "[")
                state.inlineList++;
              else
                state.inlineList--;
              return "meta";
            }
            if (state.inlineList > 0 && !esc && ch == ",") {
              stream.next();
              return "meta";
            }
            if (state.inlinePairs > 0 && !esc && ch == ",") {
              state.keyCol = 0;
              state.pair = false;
              state.pairStart = false;
              stream.next();
              return "meta";
            }
            if (state.pairStart) {
              if (stream.match(/^\s*(\||\>)\s*/)) {
                state.literal = true;
                return "meta";
              }
              ;
              if (stream.match(/^\s*(\&|\*)[a-z0-9\._-]+\b/i)) {
                return "variable-2";
              }
              if (state.inlinePairs == 0 && stream.match(/^\s*-?[0-9\.\,]+\s?$/)) {
                return "number";
              }
              if (state.inlinePairs > 0 && stream.match(/^\s*-?[0-9\.\,]+\s?(?=(,|}))/)) {
                return "number";
              }
              if (stream.match(keywordRegex)) {
                return "keyword";
              }
            }
            if (!state.pair && stream.match(/^\s*(?:[,\[\]{}&*!|>'"%@`][^\s'":]|[^,\[\]{}#&*!|>'"%@`])[^#]*?(?=\s*:($|\s))/)) {
              state.pair = true;
              state.keyCol = stream.indentation();
              return "atom";
            }
            if (state.pair && stream.match(/^:\s*/)) {
              state.pairStart = true;
              return "meta";
            }
            state.pairStart = false;
            state.escaped = ch == "\\";
            stream.next();
            return null;
          },
          startState: function() {
            return {
              pair: false,
              pairStart: false,
              keyCol: 0,
              inlinePairs: 0,
              inlineList: 0,
              literal: false,
              escaped: false
            };
          },
          lineComment: "#",
          fold: "indent"
        };
      });
      CodeMirror3.defineMIME("text/x-yaml", "yaml");
      CodeMirror3.defineMIME("text/yaml", "yaml");
    });
  }
});

// node_modules/codemirror/addon/scroll/scrollpastend.js
var require_scrollpastend = __commonJS({
  "node_modules/codemirror/addon/scroll/scrollpastend.js"(exports, module) {
    (function(mod) {
      if (typeof exports == "object" && typeof module == "object")
        mod(require_codemirror());
      else if (typeof define == "function" && define.amd)
        define(["../../lib/codemirror"], mod);
      else
        mod(CodeMirror);
    })(function(CodeMirror3) {
      "use strict";
      CodeMirror3.defineOption("scrollPastEnd", false, function(cm, val, old) {
        if (old && old != CodeMirror3.Init) {
          cm.off("change", onChange);
          cm.off("refresh", updateBottomMargin);
          cm.display.lineSpace.parentNode.style.paddingBottom = "";
          cm.state.scrollPastEndPadding = null;
        }
        if (val) {
          cm.on("change", onChange);
          cm.on("refresh", updateBottomMargin);
          updateBottomMargin(cm);
        }
      });
      function onChange(cm, change) {
        if (CodeMirror3.changeEnd(change).line == cm.lastLine())
          updateBottomMargin(cm);
      }
      function updateBottomMargin(cm) {
        var padding = "";
        if (cm.lineCount() > 1) {
          var totalH = cm.display.scroller.clientHeight - 30, lastLineH = cm.getLineHandle(cm.lastLine()).height;
          padding = totalH - lastLineH + "px";
        }
        if (cm.state.scrollPastEndPadding != padding) {
          cm.state.scrollPastEndPadding = padding;
          cm.display.lineSpace.parentNode.style.paddingBottom = padding;
          cm.off("refresh", updateBottomMargin);
          cm.setSize();
          cm.on("refresh", updateBottomMargin);
        }
      }
    });
  }
});

// resources/js/code.mjs
var import_codemirror = __toESM(require_codemirror(), 1);
var import_clipboard = __toESM(require_clipboard_min(), 1);
var import_css = __toESM(require_css(), 1);
var import_clike = __toESM(require_clike(), 1);
var import_dart = __toESM(require_dart(), 1);
var import_diff = __toESM(require_diff(), 1);
var import_fortran = __toESM(require_fortran(), 1);
var import_go = __toESM(require_go(), 1);
var import_haskell = __toESM(require_haskell(), 1);
var import_htmlmixed = __toESM(require_htmlmixed(), 1);
var import_javascript = __toESM(require_javascript(), 1);
var import_julia = __toESM(require_julia(), 1);
var import_lua = __toESM(require_lua(), 1);
var import_markdown = __toESM(require_markdown(), 1);
var import_mllike = __toESM(require_mllike(), 1);
var import_nginx = __toESM(require_nginx(), 1);
var import_octave = __toESM(require_octave(), 1);
var import_perl = __toESM(require_perl(), 1);
var import_pascal = __toESM(require_pascal(), 1);
var import_php = __toESM(require_php(), 1);
var import_powershell = __toESM(require_powershell(), 1);
var import_properties = __toESM(require_properties(), 1);
var import_python = __toESM(require_python(), 1);
var import_ruby = __toESM(require_ruby(), 1);
var import_rust = __toESM(require_rust(), 1);
var import_scheme = __toESM(require_scheme(), 1);
var import_shell = __toESM(require_shell(), 1);
var import_smarty = __toESM(require_smarty(), 1);
var import_sql = __toESM(require_sql(), 1);
var import_stex = __toESM(require_stex(), 1);
var import_swift = __toESM(require_swift(), 1);
var import_toml = __toESM(require_toml(), 1);
var import_twig = __toESM(require_twig(), 1);
var import_vb = __toESM(require_vb(), 1);
var import_vbscript = __toESM(require_vbscript(), 1);
var import_xml = __toESM(require_xml(), 1);
var import_yaml = __toESM(require_yaml(), 1);
var import_scrollpastend = __toESM(require_scrollpastend(), 1);
var modeMap = {
  bash: "shell",
  css: "css",
  c: "text/x-csrc",
  java: "text/x-java",
  scala: "text/x-scala",
  kotlin: "text/x-kotlin",
  "c++": "text/x-c++src",
  "c#": "text/x-csharp",
  csharp: "text/x-csharp",
  dart: "application/dart",
  diff: "diff",
  for: "fortran",
  fortran: "fortran",
  "f#": "text/x-fsharp",
  fsharp: "text/x-fsharp",
  go: "go",
  haskell: "haskell",
  hs: "haskell",
  html: "htmlmixed",
  ini: "properties",
  javascript: "text/javascript",
  json: "application/json",
  js: "text/javascript",
  jl: "text/x-julia",
  julia: "text/x-julia",
  latex: "text/x-stex",
  lua: "lua",
  matlab: "text/x-octave",
  md: "markdown",
  mdown: "markdown",
  markdown: "markdown",
  ml: "mllike",
  mssql: "text/x-mssql",
  mysql: "text/x-mysql",
  nginx: "nginx",
  octave: "text/x-octave",
  perl: "perl",
  pl: "perl",
  powershell: "powershell",
  properties: "properties",
  ocaml: "text/x-ocaml",
  pascal: "text/x-pascal",
  pas: "text/x-pascal",
  php: (content) => {
    return content.includes("<?php") ? "php" : "text/x-php";
  },
  pgsql: "text/x-pgsql",
  "pl/sql": "text/x-plsql",
  postgresql: "text/x-pgsql",
  py: "python",
  python: "python",
  ruby: "ruby",
  rust: "rust",
  rb: "ruby",
  rs: "rust",
  scheme: "scheme",
  shell: "shell",
  sh: "shell",
  smarty: "smarty",
  sql: "text/x-sql",
  sqlite: "text/x-sqlite",
  stext: "text/x-stex",
  swift: "text/x-swift",
  toml: "toml",
  ts: "text/typescript",
  twig: "twig",
  typescript: "text/typescript",
  vbs: "vbscript",
  vbscript: "vbscript",
  "vb.net": "text/x-vb",
  vbnet: "text/x-vb",
  xml: "xml",
  yaml: "yaml",
  yml: "yaml"
};
function highlight() {
  const codeBlocks = document.querySelectorAll(".page-content pre, .comment-box .content pre");
  for (const codeBlock of codeBlocks) {
    highlightElem(codeBlock);
  }
}
function highlightWithin(parent) {
  const codeBlocks = parent.querySelectorAll("pre");
  for (const codeBlock of codeBlocks) {
    highlightElem(codeBlock);
  }
}
function highlightElem(elem) {
  const innerCodeElem = elem.querySelector("code[class^=language-]");
  elem.innerHTML = elem.innerHTML.replace(/<br\s*[\/]?>/gi, "\n");
  const content = elem.textContent.trimEnd();
  let mode = "";
  if (innerCodeElem !== null) {
    const langName = innerCodeElem.className.replace("language-", "");
    mode = getMode(langName, content);
  }
  const cm = (0, import_codemirror.default)(function(elt) {
    elem.parentNode.replaceChild(elt, elem);
  }, {
    value: content,
    mode,
    lineNumbers: true,
    lineWrapping: false,
    theme: getTheme(),
    readOnly: true
  });
  addCopyIcon(cm);
}
function addCopyIcon(cmInstance) {
  const copyIcon = `<svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"/><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>`;
  const copyButton = document.createElement("div");
  copyButton.classList.add("CodeMirror-copy");
  copyButton.innerHTML = copyIcon;
  cmInstance.display.wrapper.appendChild(copyButton);
  const clipboard = new import_clipboard.default(copyButton, {
    text: function(trigger) {
      return cmInstance.getValue();
    }
  });
  clipboard.on("success", (event) => {
    copyButton.classList.add("success");
    setTimeout(() => {
      copyButton.classList.remove("success");
    }, 240);
  });
}
function getMode(suggestion, content) {
  suggestion = suggestion.trim().replace(/^\./g, "").toLowerCase();
  const modeMapType = typeof modeMap[suggestion];
  if (modeMapType === "undefined") {
    return "";
  }
  if (modeMapType === "function") {
    return modeMap[suggestion](content);
  }
  return modeMap[suggestion];
}
function getTheme() {
  const darkMode = document.documentElement.classList.contains("dark-mode");
  return window.codeTheme || (darkMode ? "darcula" : "default");
}
function wysiwygView(cmContainer, content, language) {
  return (0, import_codemirror.default)(cmContainer, {
    value: content,
    mode: getMode(language, content),
    lineNumbers: true,
    lineWrapping: false,
    theme: getTheme(),
    readOnly: true
  });
}
function popupEditor(elem, modeSuggestion) {
  const content = elem.textContent;
  return (0, import_codemirror.default)(function(elt) {
    elem.parentNode.insertBefore(elt, elem);
    elem.style.display = "none";
  }, {
    value: content,
    mode: getMode(modeSuggestion, content),
    lineNumbers: true,
    lineWrapping: false,
    theme: getTheme()
  });
}
function inlineEditor(textArea, mode) {
  return import_codemirror.default.fromTextArea(textArea, {
    mode: getMode(mode, textArea.value),
    lineNumbers: true,
    lineWrapping: false,
    theme: getTheme()
  });
}
function setMode(cmInstance, modeSuggestion, content) {
  cmInstance.setOption("mode", getMode(modeSuggestion, content));
}
function setContent(cmInstance, codeContent) {
  cmInstance.setValue(codeContent);
  setTimeout(() => {
    updateLayout(cmInstance);
  }, 10);
}
function updateLayout(cmInstance) {
  cmInstance.refresh();
}
function markdownEditor(elem) {
  const content = elem.textContent;
  const config = {
    value: content,
    mode: "markdown",
    lineNumbers: true,
    lineWrapping: true,
    theme: getTheme(),
    scrollPastEnd: true
  };
  window.$events.emitPublic(elem, "editor-markdown-cm::pre-init", { config });
  return (0, import_codemirror.default)(function(elt) {
    elem.parentNode.insertBefore(elt, elem);
    elem.style.display = "none";
  }, config);
}
function getMetaKey() {
  let mac = import_codemirror.default.keyMap["default"] == import_codemirror.default.keyMap.macDefault;
  return mac ? "Cmd" : "Ctrl";
}
export {
  getMetaKey,
  highlight,
  highlightWithin,
  inlineEditor,
  markdownEditor,
  popupEditor,
  setContent,
  setMode,
  updateLayout,
  wysiwygView
};
/*! Bundled license information:

clipboard/dist/clipboard.min.js:
  (*!
   * clipboard.js v2.0.11
   * https://clipboardjs.com/
   *
   * Licensed MIT © Zeno Rocha
   *)
*/
//# sourceMappingURL=code.js.map
