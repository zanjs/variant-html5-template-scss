
$document.ready(function () {
    var isNoviBuilder = window.xMode;
    (function ($) {
        if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Mac') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
            $('html').addClass('mac');
        }
    })(jQuery);


    function toggleSwiperCaptionAnimation(swiper) {
        var prevSlide = $(swiper.container),
            nextSlide = $(swiper.slides[swiper.activeIndex]);
        prevSlide.find("[data-caption-animate]").each(function () {
            var $this = $(this);
            $this.removeClass("animated").removeClass($this.attr("data-caption-animate")).addClass("not-animated");
        });
        nextSlide.find("[data-caption-animate]").each(function () {
            var $this = $(this),
                delay = $this.attr("data-caption-delay");
            if (!isNoviBuilder) {
                setTimeout(function () {
                    $this.removeClass("not-animated").addClass($this.attr("data-caption-animate")).addClass("animated");
                }, delay ? parseInt(delay) : 0);
            } else {
                $this.removeClass("not-animated")
            }
        });
    }

    var o = $("#copyright-year");
    if (o.length) {
        o.text(initialDate.getFullYear());
    }
    if (isIE) {
        if (isIE < 10) {
            $html.addClass("lt-ie-10");
        }
        if (isIE < 11) {
            if (plugins.pointerEvents) {
                $.getScript(plugins.pointerEvents).done(function () {
                    $html.addClass("ie-10");
                    PointerEventsPolyfill.initialize({});
                });
            }
        }
        if (isIE === 11) {
            $("html").addClass("ie-11");
        }
        if (isIE === 12) {
            $("html").addClass("ie-edge");
        }
    }
    if (plugins.bootstrapTooltip.length) {
        var tooltipPlacement = plugins.bootstrapTooltip.attr('data-placement');
        initBootstrapTooltip(tooltipPlacement);
        $(window).on('resize orientationchange', function () {
            initBootstrapTooltip(tooltipPlacement);
        })
    }
    if (plugins.mfp.length > 0 || plugins.mfpGallery.length > 0 && isNoviBuilder != "designMode") {
        if (plugins.mfp.length) {
            for (i = 0; i < plugins.mfp.length; i++) {
                var mfpItem = plugins.mfp[i];
                $(mfpItem).magnificPopup({
                    type: mfpItem.getAttribute("data-lightbox")
                });
            }
        }
        if (plugins.mfpGallery.length) {
            for (i = 0; i < plugins.mfpGallery.length; i++) {
                var mfpGalleryItem = $(plugins.mfpGallery[i]).find('[data-lightbox]');
                for (var c = 0; c < mfpGalleryItem.length; c++) {
                    $(mfpGalleryItem).addClass("mfp-" + $(mfpGalleryItem).attr("data-lightbox"));
                }
                mfpGalleryItem.end().magnificPopup({
                    delegate: '[data-lightbox]',
                    type: "image",
                    gallery: {
                        enabled: true
                    }
                });
            }
        }
    }
    
    if (plugins.bootstrapDateTimePicker.length) {
        var i;
        for (i = 0; i < plugins.bootstrapDateTimePicker.length; i++) {
            var $dateTimePicker = $(plugins.bootstrapDateTimePicker[i]);
            var options = {};
            options['format'] = 'dddd DD MMMM YYYY - HH:mm';
            if ($dateTimePicker.attr("data-time-picker") == "date") {
                options['format'] = 'dddd DD MMMM YYYY';
                options['minDate'] = new Date();
            } else if ($dateTimePicker.attr("data-time-picker") == "time") {
                options['format'] = 'HH:mm';
            }
            options["time"] = ($dateTimePicker.attr("data-time-picker") != "date");
            options["date"] = ($dateTimePicker.attr("data-time-picker") != "time");
            options["shortTime"] = true;
            $dateTimePicker.bootstrapMaterialDatePicker(options);
        }
    }
    if (plugins.twitterfeed.length > 0) {
        var i;
        for (i = 0; i < plugins.twitterfeed.length; i++) {
            var twitterfeedItem = plugins.twitterfeed[i];
            $(twitterfeedItem).RDTwitter({});
        }
    }
    if (plugins.selectFilter.length) {
        var i;
        for (i = 0; i < plugins.selectFilter.length; i++) {
            var select = $(plugins.selectFilter[i]);
            select.select2({
                theme: select.attr('data-custom-theme') ? select.attr('data-custom-theme') : "bootstrap"
            }).next().addClass(select.attr("class").match(/(input-sm)|(input-lg)|($)/i).toString().replace(new RegExp(",", 'g'), " "));
        }
    }
    if (plugins.stepper.length) {
        plugins.stepper.stepper({
            labels: {
                up: "",
                down: ""
            }
        });
    }
    if (plugins.radio.length) {
        var i;
        for (i = 0; i < plugins.radio.length; i++) {
            var $this = $(plugins.radio[i]);
            $this.addClass("radio-custom").after("<span class='radio-custom-dummy'></span>")
        }
    }
    if (plugins.checkbox.length) {
        var i;
        for (i = 0; i < plugins.checkbox.length; i++) {
            var $this = $(plugins.checkbox[i]);
            $this.addClass("checkbox-custom").after("<span class='checkbox-custom-dummy'></span>")
        }
    }
    if (plugins.popover.length) {
        if (window.innerWidth < 767) {
            plugins.popover.attr('data-placement', 'bottom');
            plugins.popover.popover();
        } else {
            plugins.popover.popover();
        }
    }
    if (plugins.countDown.length) {
        var i;
        for (i = 0; i < plugins.countDown.length; i++) {
            var countDownItem = plugins.countDown[i],
                d = new Date(),
                type = countDownItem.getAttribute('data-type'),
                time = countDownItem.getAttribute('data-time'),
                format = countDownItem.getAttribute('data-format'),
                settings = [];
            d.setTime(Date.parse(time)).toLocaleString();
            settings[type] = d;
            settings['format'] = format;
            $(countDownItem).countdown(settings);
        }
    }
    if (plugins.dateCountdown.length) {
        var i;
        for (i = 0; i < plugins.dateCountdown.length; i++) {
            var dateCountdownItem = $(plugins.dateCountdown[i]),
                time = {
                    "Days": {
                        "text": "Days",
                        "show": true,
                        color: dateCountdownItem.attr("data-color") ? dateCountdownItem.attr("data-color") : "#f9f9f9"
                    },
                    "Hours": {
                        "text": "Hours",
                        "show": true,
                        color: dateCountdownItem.attr("data-color") ? dateCountdownItem.attr("data-color") : "#f9f9f9"
                    },
                    "Minutes": {
                        "text": "Minutes",
                        "show": true,
                        color: dateCountdownItem.attr("data-color") ? dateCountdownItem.attr("data-color") : "#f9f9f9"
                    },
                    "Seconds": {
                        "text": "Seconds",
                        "show": true,
                        color: dateCountdownItem.attr("data-color") ? dateCountdownItem.attr("data-color") : "#f9f9f9"
                    }
                };
            dateCountdownItem.TimeCircles({
                color: dateCountdownItem.attr("data-color") ? dateCountdownItem.attr("data-color") : "rgba(247, 247, 247, 1)",
                animation: "smooth",
                bg_width: dateCountdownItem.attr("data-bg-width") ? dateCountdownItem.attr("data-bg-width") : 0.9,
                circle_bg_color: dateCountdownItem.attr("data-bg") ? dateCountdownItem.attr("data-bg") : "rgba(0, 0, 0, 1)",
                fg_width: dateCountdownItem.attr("data-width") ? dateCountdownItem.attr("data-width") : 0.03
            });
            $(window).on('load resize orientationchange', function () {
                if (window.innerWidth < 479) {
                    dateCountdownItem.TimeCircles({
                        time: {
                            "Days": {
                                "text": "Days",
                                "show": true,
                                color: dateCountdownItem.attr("data-color") ? dateCountdownItem.attr("data-color") : "#f9f9f9"
                            },
                            "Hours": {
                                "text": "Hours",
                                "show": true,
                                color: dateCountdownItem.attr("data-color") ? dateCountdownItem.attr("data-color") : "#f9f9f9"
                            },
                            "Minutes": {
                                "text": "Minutes",
                                "show": true,
                                color: dateCountdownItem.attr("data-color") ? dateCountdownItem.attr("data-color") : "#f9f9f9"
                            },
                            Seconds: {
                                "text": "Seconds",
                                show: false,
                                color: dateCountdownItem.attr("data-color") ? dateCountdownItem.attr("data-color") : "#f9f9f9"
                            }
                        }
                    }).rebuild();
                } else if (window.innerWidth < 767) {
                    dateCountdownItem.TimeCircles({
                        time: {
                            "Days": {
                                "text": "Days",
                                "show": true,
                                color: dateCountdownItem.attr("data-color") ? dateCountdownItem.attr("data-color") : "#f9f9f9"
                            },
                            "Hours": {
                                "text": "Hours",
                                "show": true,
                                color: dateCountdownItem.attr("data-color") ? dateCountdownItem.attr("data-color") : "#f9f9f9"
                            },
                            "Minutes": {
                                "text": "Minutes",
                                "show": true,
                                color: dateCountdownItem.attr("data-color") ? dateCountdownItem.attr("data-color") : "#f9f9f9"
                            },
                            Seconds: {
                                text: '',
                                show: false,
                                color: dateCountdownItem.attr("data-color") ? dateCountdownItem.attr("data-color") : "#f9f9f9"
                            }
                        }
                    }).rebuild();
                } else {
                    dateCountdownItem.TimeCircles({
                        time: time
                    }).rebuild();
                }
            });
        }
    }
    if (plugins.statefulButton.length) {
        $(plugins.statefulButton).on('click', function () {
            var statefulButtonLoading = $(this).button('loading');
            setTimeout(function () {
                statefulButtonLoading.button('reset')
            }, 2000);
        })
    }
    if (plugins.progressBar.length) {
        var i, bar, type;
        for (i = 0; i < plugins.progressBar.length; i++) {
            var progressItem = plugins.progressBar[i];
            bar = null;
            if (progressItem.className.indexOf("progress-bar-horizontal") > -1) {
                type = 'Line';
            }
            if (progressItem.className.indexOf("progress-bar-radial") > -1) {
                type = 'Circle';
            }
            if (progressItem.getAttribute("data-stroke") && progressItem.getAttribute("data-value") && type) {
                bar = new ProgressBar[type](progressItem, {
                    strokeWidth: Math.round(parseFloat(progressItem.getAttribute("data-stroke")) / progressItem.offsetWidth * 100),
                    trailWidth: progressItem.getAttribute("data-trail") ? Math.round(parseFloat(progressItem.getAttribute("data-trail")) / progressItem.offsetWidth * 100) : 0,
                    text: {
                        value: progressItem.getAttribute("data-counter") === "true" ? '0' : null,
                        className: 'progress-bar__body',
                        style: null
                    }
                });
                bar.svg.setAttribute('preserveAspectRatio', "none meet");
                if (type === 'Line') {
                    bar.svg.setAttributeNS(null, "height", progressItem.getAttribute("data-stroke"));
                }
                bar.path.removeAttribute("stroke");
                bar.path.className.baseVal = "progress-bar__stroke";
                if (bar.trail) {
                    bar.trail.removeAttribute("stroke");
                    bar.trail.className.baseVal = "progress-bar__trail";
                }
                if (progressItem.getAttribute("data-easing") && !isIE) {
                    $(document).on("scroll", {
                        "barItem": bar
                    }, $.proxy(function (event) {
                        var bar = event.data.barItem;
                        var $this = $(this);
                        if (isScrolledIntoView($this) && this.className.indexOf("progress-bar--animated") === -1) {
                            this.className += " progress-bar--animated";
                            bar.animate(parseInt($this.attr("data-value")) / 100.0, {
                                easing: $this.attr("data-easing"),
                                duration: $this.attr("data-duration") ? parseInt($this.attr("data-duration")) : 800,
                                step: function (state, b) {
                                    if (b._container.className.indexOf("progress-bar-horizontal") > -1 || b._container.className.indexOf("progress-bar-vertical") > -1) {
                                        b.text.style.width = Math.abs(b.value() * 100).toFixed(0) + "%"
                                    }
                                    b.setText(Math.abs(b.value() * 100).toFixed(0));
                                }
                            });
                        }
                    }, progressItem)).trigger("scroll");
                } else {
                    bar.set(parseInt($(progressItem).attr("data-value")) / 100.0);
                    bar.setText($(progressItem).attr("data-value"));
                    if (type === 'Line') {
                        bar.text.style.width = parseInt($(progressItem).attr("data-value")) + "%";
                    }
                }
            } else {
                console.error(progressItem.className + ": progress bar type is not defined");
            }
        }
    }
    if (isDesktop && !isNoviBuilder) {
        $().UItoTop({
            easingType: 'easeOutQuart',
            containerClass: 'ui-to-top fa fa-angle-up'
        });
    }
    if (plugins.rdNavbar.length) {
        plugins.rdNavbar.RDNavbar({
            stickUpClone: (plugins.rdNavbar.attr("data-stick-up-clone") && !isNoviBuilder) ? plugins.rdNavbar.attr("data-stick-up-clone") === 'true' : false,
            responsive: {
                0: {
                    stickUp: (!isNoviBuilder) ? plugins.rdNavbar.attr("data-stick-up") === 'true' : false
                },
                768: {
                    stickUp: (!isNoviBuilder) ? plugins.rdNavbar.attr("data-sm-stick-up") === 'true' : false
                },
                992: {
                    stickUp: (!isNoviBuilder) ? plugins.rdNavbar.attr("data-md-stick-up") === 'true' : false
                },
                1200: {
                    stickUp: (!isNoviBuilder) ? plugins.rdNavbar.attr("data-lg-stick-up") === 'true' : false
                }
            }
        });
        if (plugins.rdNavbar.attr("data-body-class")) {
            document.body.className += ' ' + plugins.rdNavbar.attr("data-body-class");
        }
    }
    if (plugins.viewAnimate.length) {
        var i;
        for (i = 0; i < plugins.viewAnimate.length; i++) {
            var $view = $(plugins.viewAnimate[i]).not('.active');
            $document.on("scroll", $.proxy(function () {
                if (isScrolledIntoView(this)) {
                    this.addClass("active");
                }
            }, $view)).trigger("scroll");
        }
    }
    if (plugins.swiper.length) {
        var i;
        for (i = 0; i < plugins.swiper.length; i++) {
            var s = $(plugins.swiper[i]);
            var pag = s.find(".swiper-pagination"),
                next = s.find(".swiper-button-next"),
                prev = s.find(".swiper-button-prev"),
                bar = s.find(".swiper-scrollbar"),
                parallax = s.parents('.rd-parallax').length,
                swiperSlide = s.find(".swiper-slide");
            for (j = 0; j < swiperSlide.length; j++) {
                var $this = $(swiperSlide[j]),
                    url;
                if (url = $this.attr("data-slide-bg")) {
                    $this.css({
                        "background-image": "url(" + url + ")",
                        "background-size": "cover"
                    })
                }
            }
            swiperSlide.end().find("[data-caption-animate]").addClass("not-animated").end().swiper({
                autoplay: s.attr('data-autoplay') !== "false" && !isNoviBuilder ? s.attr('data-autoplay') : null,
                direction: s.attr('data-direction') ? s.attr('data-direction') : "horizontal",
                effect: s.attr('data-slide-effect') ? s.attr('data-slide-effect') : "slide",
                speed: s.attr('data-slide-speed') ? s.attr('data-slide-speed') : 600,
                keyboardControl: s.attr('data-keyboard') === "true",
                mousewheelControl: s.attr('data-mousewheel') === "true",
                mousewheelReleaseOnEdges: s.attr('data-mousewheel-release') === "true",
                nextButton: next.length ? next.get(0) : null,
                prevButton: prev.length ? prev.get(0) : null,
                pagination: pag.length ? pag.get(0) : null,
                paginationClickable: pag.length ? pag.attr("data-clickable") !== "false" : false,
                paginationBulletRender: pag.length ? pag.attr("data-index-bullet") === "true" ? function (index, className) {
                    return '<span class="' + className + '">' + (index + 1) + '</span>';
                } : null : null,
                scrollbar: bar.length ? bar.get(0) : null,
                scrollbarDraggable: bar.length ? bar.attr("data-draggable") !== "false" : true,
                scrollbarHide: bar.length ? bar.attr("data-draggable") === "false" : false,
                loop: s.attr("data-loop") && !isNoviBuilder ? s.attr('data-loop') !== "false" : false,
                simulateTouch: s.attr('data-simulate-touch') && !isNoviBuilder ? s.attr('data-simulate-touch') === "true" : false,
                onTransitionStart: function (swiper) {
                    toggleSwiperInnerVideos(swiper);
                },
                onTransitionEnd: function (swiper) {
                    toggleSwiperCaptionAnimation(swiper);
                },
                onInit: function (swiper) {
                    toggleSwiperInnerVideos(swiper);
                    toggleSwiperCaptionAnimation(swiper);
                    var swiperParalax = s.find(".swiper-parallax");
                    for (var k = 0; k < swiperParalax.length; k++) {
                        var $this = $(swiperParalax[k]),
                            speed;
                        if (parallax && !isIEBrows && !isMobile) {
                            if (speed = $this.attr("data-speed")) {
                                makeParallax($this, speed, s, false);
                            }
                        }
                    }
                    $(window).on('resize', function () {
                        swiper.update(true);
                    })
                }
            });
            $(window).on("resize", function () {
                var mh = getSwiperHeight(s, "min-height"),
                    h = getSwiperHeight(s, "height");
                if (h) {
                    s.css("height", mh ? mh > h ? mh : h : h);
                }
            }).trigger("resize");
        }
    }
    if (plugins.pageLoader.length > 0) {
        $window.on("load", function () {
            var loader = setTimeout(function () {
                plugins.pageLoader.addClass('animated zoomOut')
                // .addClass("loaded");
                // plugins.pageLoader.addClass("loaded");
                $window.trigger("resize");

                setTimeout(function(){
                    plugins.pageLoader.remove()
                },800)
            }, 200);
        });
    }
    if (plugins.search.length || plugins.searchResults) {
        
        var defaultTemplate = '<h6 class="search_title"><a target="_top" href="#{href}" class="search_link">#{title}</a></h6>' + '<p>...#{token}...</p>' + '<p class="match"><em>Terms matched: #{count} - URL: #{href}</em></p>';
        var defaultFilter = '*.html';
        if (plugins.search.length) {
            for (i = 0; i < plugins.search.length; i++) {
                var searchItem = $(plugins.search[i]),
                    options = {
                        element: searchItem,
                        filter: (searchItem.attr('data-search-filter')) ? searchItem.attr('data-search-filter') : defaultFilter,
                        template: (searchItem.attr('data-search-template')) ? searchItem.attr('data-search-template') : defaultTemplate,
                        live: (searchItem.attr('data-search-live')) ? searchItem.attr('data-search-live') : false,
                        liveCount: (searchItem.attr('data-search-live-count')) ? parseInt(searchItem.attr('data-search-live-count')) : 4,
                        current: 0,
                        processed: 0,
                        timer: {}
                    };
                if ($('.rd-navbar-search-toggle').length) {
                    var toggle = $('.rd-navbar-search-toggle');
                    toggle.on('click', function () {
                        if (!($(this).hasClass('active'))) {
                            searchItem.find('input').val('').trigger('propertychange');
                        }
                    });
                }
                if (options.live) {
                    var clearHandler = false;
                    searchItem.find('input').on("keyup input propertychange", $.proxy(function () {
                        this.term = this.element.find('input').val().trim();
                        this.spin = this.element.find('.input-group-addon');
                        clearTimeout(this.timer);
                        if (this.term.length > 2) {
                            this.timer = setTimeout(liveSearch(this), 200);
                            if (clearHandler == false) {
                                clearHandler = true;
                                $("body").on("click", function (e) {
                                    if ($(e.toElement).parents('.rd-search').length == 0) {
                                        $('#rd-search-results-live').addClass('cleared').html('');
                                    }
                                })
                            }
                        } else if (this.term.length == 0) {
                            $('#' + this.live).addClass('cleared').html('');
                        }
                    }, options, this));
                }
                searchItem.submit($.proxy(function () {
                    $('<input />').attr('type', 'hidden').attr('name', "filter").attr('value', this.filter).appendTo(this.element);
                    return true;
                }, options, this))
            }
        }
        if (plugins.searchResults.length) {
            var regExp = /\?.*s=([^&]+)\&filter=([^&]+)/g;
            var match = regExp.exec(location.search);
            if (match != null) {
                $.get(handler, {
                    s: decodeURI(match[1]),
                    dataType: "html",
                    filter: match[2],
                    template: defaultTemplate,
                    live: ''
                }, function (data) {
                    plugins.searchResults.html(data);
                })
            }
        }
    }
    if (plugins.slick.length) {
        var i;
        for (i = 0; i < plugins.slick.length; i++) {
            var $slickItem = $(plugins.slick[i]);
            $slickItem.slick({
                slidesToScroll: parseInt($slickItem.attr('data-slide-to-scroll')) || 1,
                asNavFor: $slickItem.attr('data-for') || false,
                dots: $slickItem.attr("data-dots") == "true",
                infinite: isNoviBuilder ? false : $slickItem.attr("data-loop") == "true",
                focusOnSelect: true,
                arrows: $slickItem.attr("data-arrows") == "true",
                swipe: $slickItem.attr("data-swipe") == "true",
                autoplay: $slickItem.attr("data-autoplay") == "true",
                vertical: $slickItem.attr("data-vertical") == "true",
                centerMode: $slickItem.attr("data-center-mode") == "true",
                centerPadding: $slickItem.attr("data-center-padding") ? $slickItem.attr("data-center-padding") : '0.50',
                mobileFirst: true,
                responsive: [{
                    breakpoint: 0,
                    settings: {
                        slidesToShow: parseInt($slickItem.attr('data-items')) || 1,
                    }
                }, {
                    breakpoint: 479,
                    settings: {
                        slidesToShow: parseInt($slickItem.attr('data-xs-items')) || 1,
                    }
                }, {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: parseInt($slickItem.attr('data-sm-items')) || 1,
                    }
                }, {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: parseInt($slickItem.attr('data-md-items')) || 1,
                    }
                }, {
                    breakpoint: 1199,
                    settings: {
                        slidesToShow: parseInt($slickItem.attr('data-lg-items')) || 1,
                    }
                }]
            }).on('afterChange', function (event, slick, currentSlide, nextSlide) {
                var $this = $(this),
                    childCarousel = $this.attr('data-child');
                if (childCarousel) {
                    $(childCarousel + ' .slick-slide').removeClass('slick-current');
                    $(childCarousel + ' .slick-slide').eq(currentSlide).addClass('slick-current');
                }
            });
        }
    }
    if (plugins.owl.length) {
        var i;
        for (i = 0; i < plugins.owl.length; i++) {
            var c = $(plugins.owl[i]),
                responsive = {};
            var aliaces = ["-", "-xs-", "-sm-", "-md-", "-lg-"],
                values = [0, 480, 768, 992, 1200],
                j, k;
            for (j = 0; j < values.length; j++) {
                responsive[values[j]] = {};
                for (k = j; k >= -1; k--) {
                    if (!responsive[values[j]]["items"] && c.attr("data" + aliaces[k] + "items")) {
                        responsive[values[j]]["items"] = k < 0 ? 1 : parseInt(c.attr("data" + aliaces[k] + "items"));
                    }
                    if (!responsive[values[j]]["stagePadding"] && responsive[values[j]]["stagePadding"] !== 0 && c.attr("data" + aliaces[k] + "stage-padding")) {
                        responsive[values[j]]["stagePadding"] = k < 0 ? 0 : parseInt(c.attr("data" + aliaces[k] + "stage-padding"));
                    }
                    if (!responsive[values[j]]["margin"] && responsive[values[j]]["margin"] !== 0 && c.attr("data" + aliaces[k] + "margin")) {
                        responsive[values[j]]["margin"] = k < 0 ? 30 : parseInt(c.attr("data" + aliaces[k] + "margin"));
                    }
                }
            }
            if (c.attr('data-dots-custom')) {
                c.on("initialized.owl.carousel", function (event) {
                    var carousel = $(event.currentTarget),
                        customPag = $(carousel.attr("data-dots-custom")),
                        active = 0;
                    if (carousel.attr('data-active')) {
                        active = parseInt(carousel.attr('data-active'));
                    }
                    carousel.trigger('to.owl.carousel', [active, 300, true]);
                    customPag.find("[data-owl-item='" + active + "']").addClass("active");
                    customPag.find("[data-owl-item]").on('click', function (e) {
                        e.preventDefault();
                        carousel.trigger('to.owl.carousel', [parseInt(this.getAttribute("data-owl-item")), 300, true]);
                    });
                    carousel.on("translate.owl.carousel", function (event) {
                        customPag.find(".active").removeClass("active");
                        customPag.find("[data-owl-item='" + event.item.index + "']").addClass("active")
                    });
                });
            }
            if (typeof (c.attr("data-numbering")) !== 'undefined') {
                var numberingObject = $(c.attr("data-numbering"));
                c.on('initialized.owl.carousel changed.owl.carousel', function (numberingObject) {
                    return function (e) {
                        if (!e.namespace) return;
                        numberingObject.find('.numbering-current').text(e.item.index + 1);
                        numberingObject.find('.numbering-count').text(e.item.count);
                    };
                }(numberingObject));
            }
            c.owlCarousel({
                autoplay: c.attr("data-autoplay") === "true",
                loop: isNoviBuilder === "designMode" ? false : c.attr("data-loop") == 'true',
                // items: 1,
                dotsContainer: c.attr("data-pagination-class") || false,
                navContainer: c.attr("data-navigation-class") || false,
                mouseDrag: isNoviBuilder === "designMode" ? false : c.attr("data-mouse-drag") !== "false",
                nav: c.attr("data-nav") === "true",
                dots: c.attr("data-dots") === "true",
                dotsEach: c.attr("data-dots-each") ? parseInt(c.attr("data-dots-each")) : false,
                animateIn: c.attr('data-animation-in') ? c.attr('data-animation-in') : 'slide',
                animateOut: c.attr('data-animation-out') ? c.attr('data-animation-out') : false,
                responsive: responsive,
                // navText: []
            });
        }
    }
    if (plugins.counter.length) {
        var i;
        for (i = 0; i < plugins.counter.length; i++) {
            var $counterNotAnimated = $(plugins.counter[i]).not('.animated');
            $document.on("scroll", $.proxy(function () {
                var $this = this;
                if ((!$this.hasClass("animated")) && (isScrolledIntoView($this))) {
                    $this.countTo({
                        refreshInterval: 40,
                        from: 0,
                        to: parseInt($this.text(), 10),
                        speed: $this.attr("data-speed") || 1000,
                        formatter: function (value, options) {
                            value = value.toFixed(options.decimals);
                            if (value < 10) {
                                return '0' + value;
                            }
                            return value;
                        }
                    });
                    $this.addClass('animated');
                }
            }, $counterNotAnimated)).trigger("scroll");
        }
    }
    if (plugins.isotope.length) {
        var i, j, isogroup = [];
        for (i = 0; i < plugins.isotope.length; i++) {
            var isotopeItem = plugins.isotope[i],
                filterItems = $(isotopeItem).closest('.isotope-wrap').find('[data-isotope-filter]'),
                iso;
            iso = new Isotope(isotopeItem, {
                itemSelector: '.isotope-item',
                layoutMode: isotopeItem.getAttribute('data-isotope-layout') ? isotopeItem.getAttribute('data-isotope-layout') : 'masonry',
                filter: '*',
                masonry: {
                    columnWidth: 0.42
                }
            });
            isogroup.push(iso);
            filterItems.on("click", function (e) {
                e.preventDefault();
                var filter = $(this),
                    iso = $('.isotope[data-isotope-group="' + this.getAttribute("data-isotope-group") + '"]'),
                    filtersContainer = filter.closest(".isotope-filters");
                filtersContainer.find('.active').removeClass("active");
                filter.addClass("active");
                iso.isotope({
                    itemSelector: '.isotope-item',
                    layoutMode: iso.attr('data-isotope-layout') ? iso.attr('data-isotope-layout') : 'masonry',
                    filter: this.getAttribute("data-isotope-filter") == '*' ? '*' : '[data-filter*="' + this.getAttribute("data-isotope-filter") + '"]',
                    masonry: {
                        columnWidth: 0.42
                    }
                });
                $window.trigger('resize');
            }).eq(0).trigger("click");
        }
        $(window).on('load', function () {
            setTimeout(function () {
                var i;
                for (i = 0; i < isogroup.length; i++) {
                    isogroup[i].element.className += " isotope--loaded";
                    isogroup[i].layout();
                }
            }, 600);
        });
    }
    if (!isNoviBuilder) {
        if (isDesktop && $html.hasClass("wow-animation") && $(".wow").length) {
            new WOW().init();
        }
    }
    if (plugins.bootstrapTabs.length) {
        var i;
        for (i = 0; i < plugins.bootstrapTabs.length; i++) {
            var bootstrapTabsItem = $(plugins.bootstrapTabs[i]);
            bootstrapTabsItem.on("click", "a", function (event) {
                event.preventDefault();
                $(this).tab('show');
            });
        }
    }
    if (plugins.rdInputLabel.length) {
        plugins.rdInputLabel.RDInputLabel();
    }
    if (plugins.regula.length) {
        attachFormValidator(plugins.regula);
    }
    if (plugins.rdMailForm.length) {
        var i, j, k, msg = {
            'MF000': 'Successfully sent!',
            'MF001': 'Recipients are not set!',
            'MF002': 'Form will not work locally!',
            'MF003': 'Please, define email field in your form!',
            'MF004': 'Please, define type of your form!',
            'MF254': 'Something went wrong with PHPMailer!',
            'MF255': 'Aw, snap! Something went wrong.'
        };
        for (i = 0; i < plugins.rdMailForm.length; i++) {
            var $form = $(plugins.rdMailForm[i]);
            $form.attr('novalidate', 'novalidate').ajaxForm({
                data: {
                    "form-type": $form.attr("data-form-type") || "contact",
                    "counter": i
                },
                beforeSubmit: function () {
                    if (!isNoviBuilder) {
                        var form = $(plugins.rdMailForm[this.extraData.counter]);
                        var inputs = form.find("[data-constraints]");
                        if (isValidated(inputs)) {
                            var output = $("#" + form.attr("data-form-output"));
                            if (output.hasClass("snackbars")) {
                                output.html('<p><span class="icon text-middle fa fa-circle-o-notch fa-spin icon-xs"></span><span>Sending</span></p>');
                                output.addClass("active");
                            }
                        } else {
                            return false;
                        }
                    }
                },
                error: function (result) {
                    if (!isNoviBuilder) {
                        var output = $("#" + $(plugins.rdMailForm[this.extraData.counter]).attr("data-form-output"));
                        output.text(msg[result]);
                    }
                },
                success: function (result) {
                    if (!isNoviBuilder) {
                        var form = $(plugins.rdMailForm[this.extraData.counter]);
                        var output = $("#" + form.attr("data-form-output"));
                        form.addClass('success');
                        result = result.length == 5 ? result : 'MF255';
                        output.text(msg[result]);
                        if (result === "MF000") {
                            if (output.hasClass("snackbars")) {
                                output.html('<p><span class="icon text-middle fa-check icon-xs"></span><span>' + msg[result] + '</span></p>');
                            } else {
                                output.addClass("success");
                                output.addClass("active");
                            }
                        } else {
                            if (output.hasClass("snackbars")) {
                                output.html(' <p class="snackbars-left"><span class="icon icon-xs fa-warning text-middle"></span><span>' + msg[result] + '</span></p>');
                            } else {
                                output.addClass("error");
                                output.addClass("active");
                            }
                        }
                        form.clearForm();
                        form.find('input, textarea').blur();
                        setTimeout(function () {
                            output.removeClass("active");
                            form.removeClass('success');
                        }, 5000);
                    }
                }
            });
        }
    }
    if (plugins.photoSwipeGallery.length && !isNoviBuilder) {
        $document.delegate("[data-photo-swipe-item]", "click", function (event) {
            event.preventDefault();
            var $el = $(this),
                $galleryItems = $el.parents("[data-photo-swipe-gallery]").find("a[data-photo-swipe-item]"),
                pswpElement = document.querySelectorAll('.pswp')[0],
                encounteredItems = {},
                pswpItems = [],
                options, pswpIndex = 0,
                pswp;
            if ($galleryItems.length == 0) {
                $galleryItems = $el;
            }
            $galleryItems.each(function () {
                var $item = $(this),
                    src = $item.attr('href'),
                    size = $item.attr('data-size').split('x'),
                    pswdItem;
                if ($item.is(':visible')) {
                    if (!encounteredItems[src]) {
                        pswdItem = {
                            src: src,
                            w: parseInt(size[0], 10),
                            h: parseInt(size[1], 10),
                            el: $item
                        };
                        encounteredItems[src] = {
                            item: pswdItem,
                            index: pswpIndex
                        };
                        pswpItems.push(pswdItem);
                        pswpIndex++;
                    }
                }
            });
            options = {
                index: encounteredItems[$el.attr('href')].index,
                getThumbBoundsFn: function (index) {
                    var $el = pswpItems[index].el,
                        offset = $el.offset();
                    return {
                        x: offset.left,
                        y: offset.top,
                        w: $el.width()
                    };
                }
            };
            pswp = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, pswpItems, options);
            pswp.init();
        });
    }
    if (plugins.customToggle.length) {
        var i;
        for (i = 0; i < plugins.customToggle.length; i++) {
            var $this = $(plugins.customToggle[i]);
            $this.on('click', $.proxy(function (event) {
                event.preventDefault();
                var $ctx = $(this);
                $($ctx.attr('data-custom-toggle')).add(this).toggleClass('active');
            }, $this));
            if ($this.attr("data-custom-toggle-hide-on-blur") === "true") {
                $("body").on("click", $this, function (e) {
                    if (e.target !== e.data[0] && $(e.data.attr('data-custom-toggle')).find($(e.target)).length && e.data.find($(e.target)).length == 0) {
                        $(e.data.attr('data-custom-toggle')).add(e.data[0]).removeClass('active');
                    }
                })
            }
            if ($this.attr("data-custom-toggle-disable-on-blur") === "true") {
                $("body").on("click", $this, function (e) {
                    if (e.target !== e.data[0] && $(e.data.attr('data-custom-toggle')).find($(e.target)).length == 0 && e.data.find($(e.target)).length == 0) {
                        $(e.data.attr('data-custom-toggle')).add(e.data[0]).removeClass('active');
                    }
                })
            }
        }
    }
    if (plugins.imgZoom.length) {
        var i;
        for (i = 0; i < plugins.imgZoom.length; i++) {
            var $imgZoomItem = $(plugins.imgZoom[i]);
            $imgZoomItem.mag();
        }
    }
    if (isNoviBuilder !== "designMode") {
        if (plugins.customWaypoints.length) {
            var i;
            for (i = 0; i < plugins.customWaypoints.length; i++) {
                var $this = $(plugins.customWaypoints[i]);
                $this.on('click', function (e) {
                    e.preventDefault();
                    $("body, html").stop().animate({
                        scrollTop: $("#" + $(this).attr('data-custom-scroll-to')).offset().top
                    }, 1000, function () {
                        $(window).trigger("resize");
                    });
                });
            }
        }
    }
    if (isNoviBuilder !== "designMode") {
        if (plugins.rdParallax.length && !isMobile) {
            var i;
            $.RDParallax();
            if (!isIE && !isMobile) {
                $(window).on("scroll", function () {
                    for (i = 0; i < plugins.rdParallax.length; i++) {
                        var parallax = $(plugins.rdParallax[i]);
                        if (isScrolledIntoView(parallax)) {
                            parallax.find(".rd-parallax-inner").css("position", "fixed");
                        } else {
                            parallax.find(".rd-parallax-inner").css("position", "absolute");
                        }
                    }
                });
            }
            $("a[href='#']").on("click", function (event) {
                setTimeout(function () {
                    $(window).trigger("resize");
                }, 300);
            });
        }
    }
    if (isNoviBuilder !== "designMode") {
        if (plugins.pageTitles) {
            var varCount = 30;
            for (var i = 0; i < plugins.pageTitles.length; i++) {
                var pageTitle = $(plugins.pageTitles[i]);
                var header = pageTitle.children()[0];
                var wrapper = $(document.createElement('div'));
                wrapper.addClass('page-title-inner');
                var pageTitleLeft = $(document.createElement('div')),
                    pageTitleCenter = $(document.createElement('div')),
                    pageTitleRight = $(document.createElement('div'));
                pageTitleLeft.addClass('page-title-left');
                pageTitleCenter.addClass('page-title-center');
                pageTitleRight.addClass('page-title-right');
                for (var j = 0; j < varCount; j++) {
                    pageTitleLeft.append(header.cloneNode(true));
                    pageTitleRight.append(header.cloneNode(true));
                }
                pageTitleCenter.append(header.cloneNode(true));
                pageTitle.children(0).remove();
                wrapper.append(pageTitleLeft);
                wrapper.append(pageTitleCenter);
                wrapper.append(pageTitleRight);
                pageTitle.append(wrapper);
            }
        }
    }
});