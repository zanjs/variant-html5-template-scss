 function getSwiperHeight(object, attr) {
     var val = object.attr("data-" + attr),
         dim;
     if (!val) {
         return undefined;
     }
     dim = val.match(/(px)|(%)|(vh)$/i);
     if (dim.length) {
         switch (dim[0]) {
             case "px":
                 return parseFloat(val);
             case "vh":
                 return $(window).height() * (parseFloat(val) / 100);
             case "%":
                 return object.width() * (parseFloat(val) / 100);
         }
     } else {
         return undefined;
     }
 }

 function toggleSwiperInnerVideos(swiper) {
     var prevSlide = $(swiper.slides[swiper.previousIndex]),
         nextSlide = $(swiper.slides[swiper.activeIndex]),
         videos;
     prevSlide.find("video").each(function () {
         this.pause();
     });
     videos = nextSlide.find("video");
     if (videos.length) {
         videos.get(0).play();
     }
 }


 function makeParallax(el, speed, wrapper, prevScroll) {
     var scrollY = window.scrollY || window.pageYOffset;
     if (prevScroll != scrollY) {
         prevScroll = scrollY;
         el.addClass('no-transition');
         el[0].style['transform'] = 'translate3d(0,' + -scrollY * (1 - speed) + 'px,0)';
         el.height();
         el.removeClass('no-transition');
         if (el.attr('data-fade') === 'true') {
             var bound = el[0].getBoundingClientRect(),
                 offsetTop = bound.top * 2 + scrollY,
                 sceneHeight = wrapper.outerHeight(),
                 sceneDevider = wrapper.offset().top + sceneHeight / 2.0,
                 layerDevider = offsetTop + el.outerHeight() / 2.0,
                 pos = sceneHeight / 6.0,
                 opacity;
             if (sceneDevider + pos > layerDevider && sceneDevider - pos < layerDevider) {
                 el[0].style["opacity"] = 1;
             } else {
                 if (sceneDevider - pos < layerDevider) {
                     opacity = 1 + ((sceneDevider + pos - layerDevider) / sceneHeight / 3.0 * 5);
                 } else {
                     opacity = 1 - ((sceneDevider - pos - layerDevider) / sceneHeight / 3.0 * 5);
                 }
                 el[0].style["opacity"] = opacity < 0 ? 0 : opacity > 1 ? 1 : opacity.toFixed(2);
             }
         }
     }
     requestAnimationFrame(function () {
         makeParallax(el, speed, wrapper, prevScroll);
     });
 }


 function isScrolledIntoView(elem) {
     var $window = $(window);
     return elem.offset().top + elem.outerHeight() >= $window.scrollTop() && elem.offset().top <= $window.scrollTop() + $window.height();
 }

 function lazyInit(element, func) {
     var $win = jQuery(window);
     $win.on('load scroll', function () {
         if ((!element.hasClass('lazy-loaded') && (isScrolledIntoView(element)))) {
             func.call();
             element.addClass('lazy-loaded');
         }
     });
 }


 function liveSearch(options) {
     $('#' + options.live).removeClass('cleared').html();
     options.current++;
     options.spin.addClass('loading');
     $.get(handler, {
         s: decodeURI(options.term),
         liveSearch: options.live,
         dataType: "html",
         liveCount: options.liveCount,
         filter: options.filter,
         template: options.template
     }, function (data) {
         options.processed++;
         var live = $('#' + options.live);
         if (options.processed == options.current && !live.hasClass('cleared')) {
             live.find('> #search-results').removeClass('active');
             live.html(data);
             setTimeout(function () {
                 live.find('> #search-results').addClass('active');
             }, 50);
         }
         options.spin.parents('.rd-search').find('.input-group-addon').removeClass('loading');
     })
 }



 function attachFormValidator(elements) {
     for (var i = 0; i < elements.length; i++) {
         var o = $(elements[i]),
             v;
         o.addClass("form-control-has-validation").after("<span class='form-validation'></span>");
         v = o.parent().find(".form-validation");
         if (v.is(":last-child")) {
             o.addClass("form-control-last-child");
         }
     }
     elements.on('input change propertychange blur', function (e) {
         var $this = $(this),
             results;
         if (e.type != "blur") {
             if (!$this.parent().hasClass("has-error")) {
                 return;
             }
         }
         if ($this.parents('.rd-mailform').hasClass('success')) {
             return;
         }
         if ((results = $this.regula('validate')).length) {
             for (i = 0; i < results.length; i++) {
                 $this.siblings(".form-validation").text(results[i].message).parent().addClass("has-error")
             }
         } else {
             $this.siblings(".form-validation").text("").parent().removeClass("has-error")
         }
     }).regula('bind');
 }


 function isValidated(elements) {
     var results, errors = 0;
     if (elements.length) {
         for (j = 0; j < elements.length; j++) {
             var $input = $(elements[j]);
             if ((results = $input.regula('validate')).length) {
                 for (k = 0; k < results.length; k++) {
                     errors++;
                     $input.siblings(".form-validation").text(results[k].message).parent().addClass("has-error");
                 }
             } else {
                 $input.siblings(".form-validation").text("").parent().removeClass("has-error")
             }
         }
         return errors == 0;
     }
     return true;
 }


 function initBootstrapTooltip(tooltipPlacement) {
     if (window.innerWidth < 599) {
         plugins.bootstrapTooltip.tooltip('destroy');
         plugins.bootstrapTooltip.tooltip({
             placement: 'bottom'
         });
     } else {
         plugins.bootstrapTooltip.tooltip('destroy');
         plugins.bootstrapTooltip.tooltipPlacement;
         plugins.bootstrapTooltip.tooltip();
     }
 }


 function changeExternalButtons(respTabItem, direction) {
     var prev, next, activeItem;
     respTabItem.find('.resp-tabs-extertal-list li').removeClass('active');
     activeItem = respTabItem.find('.resp-tab-item.resp-tab-active');
     next = activeItem.next();
     if (!next.length) {
         next = respTabItem.find('.resp-tab-item:first-child()');
     }
     prev = activeItem.prev();
     if (!prev.length) {
         prev = respTabItem.find('.resp-tab-item:last-child()');
     }
     if (direction) {
         if (direction === 'next') {
             next.trigger('click');
         } else {
             prev.trigger('click');
         }
         setTimeout(function () {
             changeExternalButtons(respTabItem);
         }, 10);
     }
     respTabItem.find('.resp-tab-external-prev li:nth-child(' + (prev.index() + 1) + ')').addClass('active');
     respTabItem.find('.resp-tab-external-next li:nth-child(' + (next.index() + 1) + ')').addClass('active');
 }

 function JGoogleMaps(){
     if (plugins.rdGoogleMaps.length) {
        var i;
        $.getScript("//maps.google.com/maps/api/js?key=AIzaSyAFeB0kVA6ouyJ_gEvFbMaefLy3cBCyRwo&sensor=false&libraries=geometry,places&v=3.7", function () {
            var head = document.getElementsByTagName('head')[0],
                insertBefore = head.insertBefore;
            head.insertBefore = function (newElement, referenceElement) {
                if (newElement.href && newElement.href.indexOf('//fonts.googleapis.com/css?family=Roboto') != -1 || newElement.innerHTML.indexOf('gm-style') != -1) {
                    return;
                }
                insertBefore.call(head, newElement, referenceElement);
            };

            function initGoogleMap() {
                var $this = $(this),
                    styles = $this.attr("data-styles");
                $this.googleMap({
                    styles: styles ? JSON.parse(styles) : [],
                    onInit: function (map) {
                        var inputAddress = $('#rd-google-map-address');
                        if (inputAddress.length) {
                            var input = inputAddress;
                            var geocoder = new google.maps.Geocoder();
                            var marker = new google.maps.Marker({
                                map: map,
                                icon: "images/gmap_marker.png",
                            });
                            var autocomplete = new google.maps.places.Autocomplete(inputAddress[0]);
                            autocomplete.bindTo('bounds', map);
                            inputAddress.attr('placeholder', '');
                            inputAddress.on('change', function () {
                                $("#rd-google-map-address-submit").trigger('click');
                            });
                            inputAddress.on('keydown', function (e) {
                                if (e.keyCode == 13) {
                                    $("#rd-google-map-address-submit").trigger('click');
                                }
                            });
                            $("#rd-google-map-address-submit").on('click', function (e) {
                                e.preventDefault();
                                var address = input.val();
                                geocoder.geocode({
                                    'address': address
                                }, function (results, status) {
                                    if (status == google.maps.GeocoderStatus.OK) {
                                        var latitude = results[0].geometry.location.lat();
                                        var longitude = results[0].geometry.location.lng();
                                        map.setCenter(new google.maps.LatLng(parseFloat(latitude), parseFloat(longitude)));
                                        marker.setPosition(new google.maps.LatLng(parseFloat(latitude), parseFloat(longitude)))
                                    }
                                });
                            });
                        }
                    }
                });
            }
            for (i = 0; i < plugins.rdGoogleMaps.length; i++) {
                if (isNoviBuilder !== "designMode") {
                    lazyInit($(plugins.rdGoogleMaps[i]), initGoogleMap.bind(plugins.rdGoogleMaps[i]));
                } else {
                    initGoogleMap.bind(plugins.rdGoogleMaps[i])();
                }
            }
        });
    }
 }