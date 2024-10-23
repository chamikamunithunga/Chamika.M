(function($) {

    "use strict";

    // Stellar Parallax
    $(window).stellar({
        responsive: true,
        parallaxBackgrounds: !window.matchMedia("(max-width: 768px)").matches, // Disable on mobile
        parallaxElements: !window.matchMedia("(max-width: 768px)").matches, // Disable on mobile
        horizontalScrolling: false,
        hideDistantElements: false,
        scrollProperty: 'scroll'
    });

    // Full Height
    var fullHeight = function() {
        $('.js-fullheight').css('height', $(window).height());
        $(window).resize(function() {
            $('.js-fullheight').css('height', $(window).height());
        });
    };
    fullHeight();

    // Loader
    var loader = function() {
        setTimeout(function() {
            if ($('#ftco-loader').length > 0) {
                $('#ftco-loader').removeClass('show');
            }
        }, 1);
    };
    loader();

    // Scrollax
    $.Scrollax();

    // Burger Menu
    var burgerMenu = function() {
        $('body').on('click', '.js-fh5co-nav-toggle', function(event) {
            event.preventDefault();
            $(this).toggleClass('active');
        });
    };
    burgerMenu();

    // One Page Click Navigation
    var onePageClick = function() {
        $(document).on('click', '#ftco-nav a[href^="#"]', function(event) {
            event.preventDefault();
            var href = $.attr(this, 'href');
            $('html, body').animate({
                scrollTop: $(href).offset().top - 70
            }, 500);
        });
    };
    onePageClick();

    // Carousel
    var carousel = function() {
        $('.home-slider').owlCarousel({
            loop: true,
            autoplay: true,
            margin: 0,
            animateOut: 'fadeOut',
            animateIn: 'fadeIn',
            nav: false,
            autoplayHoverPause: true,
            items: 1,
            dots: true, // Show dots for navigation
            touchDrag: true, // Enable touch dragging
            mouseDrag: true, // Enable mouse dragging
            responsive: {
                0: {
                    items: 1,
                    nav: false, // No navigation on mobile
                },
                600: {
                    items: 1,
                    nav: false, // No navigation on small tablets
                },
                1000: {
                    items: 1,
                    nav: false, // Show navigation for larger screens
                }
            }
        });
    };
    carousel();

    // Dropdown Menu
    $('nav .dropdown').hover(function() {
        var $this = $(this);
        $this.addClass('show');
        $this.find('> a').attr('aria-expanded', true);
        $this.find('.dropdown-menu').addClass('show');
    }, function() {
        var $this = $(this);
        $this.removeClass('show');
        $this.find('> a').attr('aria-expanded', false);
        $this.find('.dropdown-menu').removeClass('show');
    });

    // Scroll
    var scrollWindow = function() {
        $(window).scroll(function() {
            var $w = $(this),
                st = $w.scrollTop(),
                navbar = $('.ftco_navbar'),
                sd = $('.js-scroll-wrap');

            if (st > 150) {
                if (!navbar.hasClass('scrolled')) {
                    navbar.addClass('scrolled');
                }
            }
            if (st < 150) {
                if (navbar.hasClass('scrolled')) {
                    navbar.removeClass('scrolled sleep');
                }
            }
            if (st > 350) {
                if (!navbar.hasClass('awake')) {
                    navbar.addClass('awake');
                }
                if (sd.length > 0) {
                    sd.addClass('sleep');
                }
            }
            if (st < 350) {
                if (navbar.hasClass('awake')) {
                    navbar.removeClass('awake');
                    navbar.addClass('sleep');
                }
                if (sd.length > 0) {
                    sd.removeClass('sleep');
                }
            }
        });
    };
    scrollWindow();

    // Counter
    var counter = function() {
        $('#section-counter, .hero-wrap, .ftco-counter').waypoint(function(direction) {
            if (direction === 'down' && !$(this.element).hasClass('ftco-animated')) {
                var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
                $('.number').each(function() {
                    var $this = $(this),
                        num = $this.data('number');
                    $this.animateNumber({
                        number: num,
                        numberStep: comma_separator_number_step
                    }, 7000);
                });
            }
        }, { offset: '95%' });
    }
    counter();

    // Content Animation
    var contentWayPoint = function() {
        var i = 0;
        $('.ftco-animate').waypoint(function(direction) {
            if (direction === 'down' && !$(this.element).hasClass('ftco-animated')) {
                i++;
                $(this.element).addClass('item-animate');
                setTimeout(function() {
                    $('body .ftco-animate.item-animate').each(function(k) {
                        var el = $(this);
                        setTimeout(function() {
                            var effect = el.data('animate-effect');
                            if (effect === 'fadeIn') {
                                el.addClass('fadeIn ftco-animated');
                            } else if (effect === 'fadeInLeft') {
                                el.addClass('fadeInLeft ftco-animated');
                            } else if (effect === 'fadeInRight') {
                                el.addClass('fadeInRight ftco-animated');
                            } else {
                                el.addClass('fadeInUp ftco-animated');
                            }
                            el.removeClass('item-animate');
                        }, k * 50, 'easeInOutExpo');
                    });
                }, 100);
            }
        }, { offset: '95%' });
    };
    contentWayPoint();

    // Magnific Popup
    $('.image-popup').magnificPopup({
        type: 'image',
        closeOnContentClick: true,
        closeBtnInside: false,
        fixedContentPos: true,
        mainClass: 'mfp-no-margins mfp-with-zoom',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1]
        },
        image: {
            verticalFit: true
        },
        zoom: {
            enabled: true,
            duration: 300
        }
    });

    $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });

})(jQuery);

// Progress Circles
$(function() {
    $(".progress").each(function() {
        var value = $(this).attr('data-value');
        var left = $(this).find('.progress-left .progress-bar');
        var right = $(this).find('.progress-right .progress-bar');

        if (value > 0) {
            if (value <= 50) {
                right.css('transform', 'rotate(' + percentageToDegrees(value) + 'deg)')
            } else {
                right.css('transform', 'rotate(180deg)')
                left.css('transform', 'rotate(' + percentageToDegrees(value - 50) + 'deg)')
            }
        }
    });

    function percentageToDegrees(percentage) {
        return percentage / 100 * 360
    }
});
