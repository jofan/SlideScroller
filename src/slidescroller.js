/*
 * config: {
 *  horzHeight:
 *  horzWidth:
 *  vertHeight:
 *  vertWidth:
 */
(function() {
  window.SlideScroller = function(id, scrollId, type, limit, config) {
    config = config || {};
    this.id = id;
    this.scrollId = scrollId;
    this.type = type;
    this.ele = document.getElementById(id);
    this.ele.obj = this;
    this.scrollEle = document.getElementById(scrollId);
    this.currentNr = 0;
    this.limit = limit || 50;
    this.horzHeight = config.horzHeight || 768;
    this.horzWidth = config.horzWidth || 1024;
    this.vertHeight = config.vertHeight || 1024;
    this.vertWidth = config.vertWidth || 768;
  };

  SlideScroller.prototype = {
    _setCurrentNr: function(nr) {
      this.currentNr = nr;
    },

    _scroll: function(nr) {
      var css = '',
          val;
      console.log('scrolling');
      document.dispatchEvent(scrollOut);
      if (this.type === "horizontal") {
        val = nr * -this.horzWidth;
        css = '-webkit-transform:translate3d(' + val + 'px, 0, 0);';
      }
      else {
        val = nr * -this.horzHeight;
        css = '-webkit-transform:translate3d(0px,' + val + 'px, 0);';
      }
      this.scrollEle.style.cssText = css;
      this._setCurrentNr(nr);
      document.dispatchEvent(scrollIn);
    },

    bind: function(scope, callback) {
      return function() {
        callback.apply(scope, arguments);
      };
    },

    register: function(eventname, action) {
      var self = this;
      var handler = function() { self[action]() };
      this.ele.addEventListener(eventname, self.bind(self, self[action]), false);
    },

    update: function(id, limit) {
      this.scrollId = id;
      this.scrollEle = document.getElementById(id);
      this.limit = limit;
    },

    activate: function() {
      this.ele.style.zIndex = '101';
    },

    reset: function() {
      this.ele.style.zIndex = '';
      this.scrollEle.style.cssText = '-webkit-transform:translate3d(0px,0px,0px);';
      this._setCurrentNr(0);
    },

    setLimit: function(limit) {
      this.limit = limit;
    },

    scrollTo: function(nr) {
      this._scroll(nr);
    },

    scrollToStart: function() {
      console.log(this);
      this.scrollTo(0);
    },

    next: function() {
      var nextNr = this.currentNr + 1;
      if (nextNr < this.limit) {
        this._scroll(nextNr);
      }
    },
    
    previous: function() {
      var prevNr = this.currentNr - 1;
      if (prevNr > -1) {
        this._scroll(prevNr);
      }
    }
  };

  (function createSlideEvents () {
      window.scrollIn = document.createEvent('UIEvents');
      window.scrollOut = document.createEvent('UIEvents');
      scrollIn.initEvent('scrollIn', true, false);
      scrollOut.initEvent('scrollOut', true, false);
  })();  
})();
