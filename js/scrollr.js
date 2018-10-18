(function($) {
    var lastScrollTop = 0;
    var list = [];
    var viewHeight = 0;
    var limitRatio = 0.6;
    var limitViewRatio = 0.8;
    var maxLimitHeight = 500;

    function inView (inHandler, outHandler) {
        this.each(function() {
            list.push({elem: this, inView: false, inHandler: inHandler, outHandler: outHandler});
        });
    }

    function init (opts) {
        var i = 0;
        var l = list.length;
        var item;
        var el;

        if (opts && opts.limitRatio) {
            limitRatio = opts.limitRatio;
        }

        if (opts && opts.limitViewRatio) {
            limitViewRatio = opts.limitViewRatio;
        }

        for (; i < l; i++) {
            item = list[i];
            el = $(item.elem);
            item.top = el.offset().top;
            item.height = el.outerHeight();
            item.bottom = item.top + item.height;
        }

        if (l) {
            lastScrollTop = $(window).scrollTop();
            unpdateViewHeight();
            addEvents();
            refresh(lastScrollTop);
        }
    }

    function isInView (item, st) {
        var height = item.height;
        var heightInView = Math.min(item.bottom, st + viewHeight) - Math.max(item.top, st);
        var limitHeight = Math.ceil(height * limitRatio);

        limitHeight = limitHeight >= viewHeight ? viewHeight * limitViewRatio : limitHeight;

        return heightInView >= limitHeight;
    }

    function isOutView (item, st) {
        var heightInView = Math.min(item.bottom, st + viewHeight) - Math.max(item.top, st);

        return heightInView <= 0;
    }

    function refresh (st) {
        var l = list.length;
        var item;

        while (l--) {
            item = list[l];
            if (item.inView) {
                if (item.outHandler && isOutView(item, st)) {
                    item.outHandler.call(item.elem, item.elem);
                    item.inView = false;
                }
            } else {
                if (isInView(item, st)) {
                    item.inHandler.call(item.elem, item.elem);
                    item.inView = true;
                }
            }
        }
    }

    function addEvents () {
        $(window).on('scroll', onScroll);
        $(window).on('resize', unpdateViewHeight);
    }

    function removeEvents () {
        $(window).off('scroll', onScroll);
        $(window).off('resize', unpdateViewHeight);
    }

    function unpdateViewHeight () {
        viewHeight = $(window).height();
    }

    function onScroll (evt) {
        var st = $(this).scrollTop();
        var i = 0;
        var l = list.length;
        var item;
        var dir;

        dir = st > lastScrollTop ? 'down' : 'up';
        refresh(st);
        lastScrollTop = st;
    }

    $.inView = $.fn.inView = inView;
    $.inView.init = init;
})(window.jQuery);