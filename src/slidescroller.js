/*
 * config: {
 *  horzHeight:
 *  horzWidth:
 *  vertHeight:
 *  vertWidth:
 */
(function() {
  window.SlideScroller = function(id, config) {
    config = config || {};
    this.id = id;
    this.scrollId = config.slideshow;
    this.type = config.type || 'primary';
    this.direction = config.direction || 'horizontal';
    this.ele = document.getElementById(id);
    this.ele.obj = this;
    this.scrollEle = document.getElementById(this.scrollId);
    console.log(config.direction);
    this.currentNr = 0;
    this.limit = config.nrOfSlides || 20;
    this.horzHeight = config.horzHeight || 768;
    this.horzWidth = config.horzWidth || 1024;
    this.vertHeight = config.vertHeight || 1024;
    this.vertWidth = config.vertWidth || 768;
    this._init();
  };

  SlideScroller.prototype = {
    _init: function() {
      if (this.direction === 'horizontal') {
        this.register('swipeleft', 'next');
        this.register('swiperight', 'previous');
      }
      else {
        this.register('swipeup', 'next');
        this.register('swipedown', 'previous');
      }
      this.active = false;
    },

    _setCurrentNr: function(nr) {
      this.currentNr = nr;
    },

    _scroll: function(nr) {
      var css = '',
          val;
      console.log('scrolling');
      this.ele.dispatchEvent(slideExit);
      if (this.direction === "horizontal") {
        val = nr * -this.horzWidth;
        css = '-webkit-transform:translate3d(' + val + 'px, 0, 0);';
      }
      else {
        val = nr * -this.horzHeight;
        css = '-webkit-transform:translate3d(0px,' + val + 'px, 0);';
      }
      this.scrollEle.style.cssText = css;
      this._setCurrentNr(nr);
      this.ele.dispatchEvent(slideEnter);
      if (this.type === 'primary') {
        document.dispatchEvent(slideshowChange);
      }
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
      this.active = true;
    },

    isActive: function() {
      return this.active;
    },

    reset: function() {
      var self = this;
      this.ele.style.zIndex = '';
      this.active = false;
      setTimeout(function() {
        self.scrollEle.style.cssText = '-webkit-transform:translate3d(0px,0px,0px);';
        self._setCurrentNr(0);
      }, 800);
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
      window.slideEnter = document.createEvent('UIEvents');
      window.slideExit = document.createEvent('UIEvents');
      window.slideshowChange = document.createEvent('UIEvents');
      slideEnter.initEvent('scrollIn', true, true);
      slideExit.initEvent('scrollOut', true, true);
      slideshowChange.initEvent('slideshowChange', true, true);
  })();  
})();
