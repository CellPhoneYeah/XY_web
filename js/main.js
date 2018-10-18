(function() {
    // 初始化滚屏事件
    $(document).ready(function() {
        if ($('html').hasClass('cssanimations') && $('html').hasClass('csstransforms3d')) {
            $('.azg-2, .azg-3, .azg-4, .azg-5, .azg-6').addClass('animate').inView(function() {
                $(this).addClass('active');
            }, function() {
                $(this).removeClass('active');
            });

            $.inView.init();
        }

        resize();

        $(window).on('scroll', onScroll);
        $(window).on('resize', resize);
        $('.d-action').on('click', openPopup);
        $('.popup .close-btn').on('click', closePopup);
        $('.pp-nav-btn').on('click', changeItem);
        $('.b-action').on('click', openPopupRight);
		$('.popupRight .close-btn').on('click', closePopup);

        function onScroll(e) {
            var st = $(this).scrollTop();

            if (st > 0) {
                $('.fixheader').addClass('show');
            } else {
                $('.fixheader').removeClass('show');
            }
        }

        function openPopup(e) {
            var target = $(this).data('target');
            var win = $(window);
            var overlay = $('.overlay');
            var popup = $('.popup');
            var ww = win.width();
            var wh = win.height();
            var pw = popup.width();
            var ph = popup.height();
            var left = Math.floor((ww - pw) / 2);
            var top = Math.floor((wh - ph) / 2);

            overlay.addClass('show');
            popup.css({left: left, top: top}).addClass('show');

            popup.find('.item.active').removeClass('active');
            popup.find('.item.' + target).addClass('active');
            disableScroll();
        }
		 function openPopupRight(e) {
            var win = $(window);
            var overlayRight = $('.overlayRight');
            var popupRight = $('.popupRight');
            var pww = win.width();
            var pwh = win.height();
            var ppw = popupRight.width();
            var pph = popupRight.height();
            var pleft = Math.floor((pww - ppw) / 2);
            var ptop = Math.floor((pwh - pph) / 2);
			
            overlayRight.addClass('show');
            popupRight.css({left: pleft, top: ptop}).addClass('show');
            disableScroll();
        }
        function closePopup(e) {
            $('.overlay, .popup').removeClass('show');
            $('.overlayRight, .popupRight').removeClass('show');
            enableScroll();
        }

        function changeItem() {
            if ($(this).parent().hasClass('active')) {
                return;
            }

            var popup = $('.popup');
            var target = $(this).data('target');

            popup.find('.item.active').removeClass('active');
            popup.find('.item.' + target).addClass('active');
        }

        function resize() {
            if ($(window).width() >= 1720) {
                $('.azg-5').addClass('ws');
            } else {
                $('.azg-5').removeClass('ws');
            }
        }


        // left: 37, up: 38, right: 39, down: 40,
        // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
        var keys = {32: 1, 33: 1, 34: 1, 35: 1, 36: 1, 37: 1, 38: 1, 39: 1, 40: 1};

        function preventDefault(e) {
            e.preventDefault();
        }

        function preventDefaultForScrollKeys(e) {
            if (keys[e.keyCode]) {
                e.preventDefault();
            }
        }

        function disableScroll() {
            $(window).on('wheel', preventDefault);
            $(document).on('keydown', preventDefaultForScrollKeys);
        }

        function enableScroll() {
            $(window).off('wheel', preventDefault);
            $(document).off('keydown', preventDefaultForScrollKeys);
        }
    });
})();