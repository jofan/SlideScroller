/*
 * config: {
 *  horzHeight:
 *  horzWidth:
 *  vertHeight:
 *  vertWidth:
 */
(function() {
  window.SlideScroller = function(id, scrollId, config) {
    this.id = id;
    this.scrollId = scrollId;
    this.ele = document.getElementById(id);
    this.scrollEle = document.getElementById(scrollId);
    this.currentNr = 0;
    this.horzHeight = config.horzHeight || 768;
    this.horzWidth = config.horzWidth || 1024;
    this.vertHeight = config.vertHeight || 1024;
    this.vertWidth = config.vertWidth || 768;
  };

  SlideScroller.prototype = {
    _setCurrentNr: function(nr) {
      this.currentNr = nr;
    },

    _scroll: function(nr, dir) {
      var css = '';
      // TODO: Dispatch scrollOut custom event
      if (dir === "horizontal") {
        css = '-webkit-transform:translate3d(' + val + 'px, 0, 0');
      else {
        css = '-webkit-transform:translate3d(0,' + val +  0, 0');
      }
      this.scrollEle.style.cssText = '';
      // TODO: Dispatch scrollIn custom event
    },

    scrollTo: function(nr) {
    },

    next: function() {
    },
    
    previous: function() {
    },

    float: function() {
    },

    sink: function() {
    }
  };
})();
