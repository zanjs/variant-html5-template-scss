/**
 * Created by Anla-E on 2017/4/14.
 */
(function () {
    var a;
    a = "ontouchstart" in window,
        function (b, c, d) {
            var e;
            return e = function () {
                function e(a, e) {
                    this.options = b.extend(!1, {}, this.Defaults, e), this.$element = b(a), this.$clone = null, this.$win = b(d), this.$doc = b(c), this.currentLayout = this.options.layout, this.loaded = !1, this.focusOnHover = this.options.focusOnHover, this.focusTimer = !1, this.cloneTimer = !1, this.isStuck = !1, this.initialize()
                }
                return e.prototype.Defaults = {
                    layout: "rd-navbar-static",
                    deviceLayout: "rd-navbar-fixed",
                    focusOnHover: !0,
                    focusOnHoverTimeout: 800,
                    linkedElements: ["html"],
                    domAppend: !0,
                    stickUp: !0,
                    stickUpClone: !0,
                    stickUpOffset: "100%",
                    anchorNavSpeed: 400,
                    anchorNavOffset: 0,
                    anchorNavEasing: "swing",
                    autoHeight: !0,
                    responsive: {
                        0: {
                            layout: "rd-navbar-fixed",
                            deviceLayout: "rd-navbar-fixed",
                            focusOnHover: !1,
                            stickUp: !1
                        },
                        992: {
                            layout: "rd-navbar-static",
                            deviceLayout: "rd-navbar-static",
                            focusOnHover: !0,
                            stickUp: !0
                        }
                    },
                    callbacks: {
                        onToggleSwitch: !1,
                        onToggleClose: !1,
                        onDomAppend: !1,
                        onDropdownOver: !1,
                        onDropdownOut: !1,
                        onDropdownToggle: !1,
                        onDropdownClose: !1,
                        onStuck: !1,
                        onUnstuck: !1,
                        onAnchorChange: !1
                    }
                }, e.prototype.initialize = function () {
                    var b;
                    return b = this, b.$element.addClass("rd-navbar").addClass(b.options.layout), a && b.$element.addClass("rd-navbar--is-touch"), b.setDataAPI(b), b.options.domAppend && b.createNav(b), b.options.stickUpClone && b.createClone(b), b.$element.addClass("rd-navbar-original"), b.addAdditionalClassToToggles(".rd-navbar-original", "toggle-original", "toggle-original-elements"), b.applyHandlers(b), b.offset = b.$element.offset().top, b.height = b.$element.outerHeight(), b.loaded = !0, b
                }, e.prototype.resize = function (c, d) {
                    var e, f;
                    return f = a ? c.getOption("deviceLayout") : c.getOption("layout"), e = c.$element.add(c.$clone), f === c.currentLayout && c.loaded || (c.switchClass(e, c.currentLayout, f), null != c.options.linkedElements && b.grep(c.options.linkedElements, function (a, b) {
                        return c.switchClass(a, c.currentLayout + "-linked", f + "-linked")
                    }), c.currentLayout = f), c.focusOnHover = c.getOption("focusOnHover"), c
                }, e.prototype.stickUp = function (a, c) {
                    var d, e, f, g, h;
                    return e = a.getOption("stickUp"), d = a.$doc.scrollTop(), g = null != a.$clone ? a.$clone : a.$element, f = a.getOption("stickUpOffset"), h = "string" == typeof f ? f.indexOf("%") > 0 ? parseFloat(f) * a.height / 100 : parseFloat(f) : f, e ? (d >= h && !a.isStuck || d < h && a.isStuck) && (a.$element.add(a.$clone).find("[data-rd-navbar-toggle]").each(function () {
                            b.proxy(a.closeToggle, this)(a, !1)
                        }).end().find(".rd-navbar-submenu").removeClass("opened").removeClass("focus"), d >= h && !a.isStuck && !a.$element.hasClass("rd-navbar-fixed") ? ("resize" === c.type ? a.switchClass(g, "", "rd-navbar--is-stuck") : g.addClass("rd-navbar--is-stuck"), a.isStuck = !0, a.options.callbacks.onStuck && a.options.callbacks.onStuck.call(a)) : ("resize" === c.type ? a.switchClass(g, "rd-navbar--is-stuck", "") : g.removeClass("rd-navbar--is-stuck").one("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", b.proxy(a.resizeWrap, a, c)), a.isStuck = !1, a.options.callbacks.onUnstuck && a.options.callbacks.onUnstuck.call(a))) : a.isStuck && (a.switchClass(g, "rd-navbar--is-stuck", ""), a.isStuck = !1, a.resizeWrap(c)), a
                }, e.prototype.resizeWrap = function (a) {
                    var b, c;
                    if (c = this, null == c.$clone && !c.isStuck) return b = c.$element.parent(), c.getOption("autoHeight") ? (c.height = c.$element.outerHeight(), "resize" === a.type ? (b.addClass("rd-navbar--no-transition").css("height", c.height), b[0].offsetHeight, b.removeClass("rd-navbar--no-transition")) : b.css("height", c.height)) : void b.css("height", "auto")
                }, e.prototype.createNav = function (a) {
                    return a.$element.find(".rd-navbar-dropdown, .rd-navbar-megamenu").each(function () {
                        var a, c;
                        return a = b(this), c = this.getBoundingClientRect(), c.left + a.outerWidth() >= d.innerWidth - 10 ? this.className += " rd-navbar-open-left" : c.left - a.outerWidth() <= 10 && (this.className += " rd-navbar-open-right"), a.hasClass("rd-navbar-megamenu") ? a.parent().addClass("rd-navbar--has-megamenu") : a.parent().addClass("rd-navbar--has-dropdown")
                    }).parents("li").addClass("rd-navbar-submenu").append(b("<span/>", {
                        class: "rd-navbar-submenu-toggle"
                    })), a.options.callbacks.onDomAppend && a.options.callbacks.onDomAppend.call(this), a
                }, e.prototype.createClone = function (a) {
                    return a.$clone = a.$element.clone().insertAfter(a.$element).addClass("rd-navbar--is-clone"), a.addAdditionalClassToToggles(".rd-navbar--is-clone", "toggle-cloned", "toggle-cloned-elements"), a
                }, e.prototype.closeToggle = function (a, c) {
                    var d, e, f, g, h, i, j;
                    return e = b(c.target), h = !1, i = this.getAttribute("data-rd-navbar-toggle"), a.options.stickUpClone && a.isStuck ? (g = ".toggle-cloned", f = ".toggle-cloned-elements", j = !e.hasClass("toggle-cloned")) : (g = ".toggle-original", f = ".toggle-original-elements", j = !e.hasClass("toggle-original")), c.target !== this && !e.parents(g + "[data-rd-navbar-toggle]").length && !e.parents(f).length && i && j && (d = b(this).parents("body").find(i).add(b(this).parents(".rd-navbar")[0]), d.each(function () {
                        if (!h) return h = (c.target === this || b.contains(this, c.target)) === !0
                    }), h || (d.add(this).removeClass("active"), a.options.callbacks.onToggleClose && a.options.callbacks.onToggleClose.call(this, a))), this
                }, e.prototype.switchToggle = function (a, c) {
                    var d, e, f;
                    return c.preventDefault(), b(this).hasClass("toggle-cloned") ? (f = ".rd-navbar--is-clone", d = ".toggle-cloned-elements") : (f = ".rd-navbar-original", d = ".toggle-original-elements"), (e = this.getAttribute("data-rd-navbar-toggle")) && (b(f + " [data-rd-navbar-toggle]").not(this).each(function () {
                        var a;
                        if (a = this.getAttribute("data-rd-navbar-toggle")) return b(this).parents("body").find(f + " " + a + d).add(this).add(b.inArray(".rd-navbar", a.split(/\s*,\s*/i)) > -1 && b(this).parents("body")[0]).removeClass("active")
                    }), b(this).parents("body").find(f + " " + e + d).add(this).add(b.inArray(".rd-navbar", e.split(/\s*,\s*/i)) > -1 && b(this).parents(".rd-navbar")[0]).toggleClass("active")), a.options.callbacks.onToggleSwitch && a.options.callbacks.onToggleSwitch.call(this, a), this
                }, e.prototype.dropdownOver = function (a, c) {
                    var d;
                    return a.focusOnHover && (d = b(this), clearTimeout(c), d.addClass("focus").siblings().removeClass("opened").each(a.dropdownUnfocus), a.options.callbacks.onDropdownOver && a.options.callbacks.onDropdownOver.call(this, a)), this
                }, e.prototype.dropdownTouch = function (a, c) {
                    var d, e;
                    if (d = b(this), clearTimeout(c), a.focusOnHover) {
                        if (e = !1, d.hasClass("focus") && (e = !0), !e) return d.addClass("focus").siblings().removeClass("opened").each(a.dropdownUnfocus), !1;
                        a.options.callbacks.onDropdownOver && a.options.callbacks.onDropdownOver.call(this, a)
                    }
                    return this
                }, e.prototype.dropdownOut = function (a, c) {
                    var d;
                    return a.focusOnHover && (d = b(this), d.one("mouseenter.navbar", function () {
                        return clearTimeout(c)
                    }), clearTimeout(c), c = setTimeout(b.proxy(a.dropdownUnfocus, this, a), a.options.focusOnHoverTimeout), a.options.callbacks.onDropdownOut && a.options.callbacks.onDropdownOut.call(this, a)), this
                }, e.prototype.dropdownUnfocus = function (a) {
                    var c;
                    return c = b(this), c.find("li.focus").add(this).removeClass("focus"), this
                }, e.prototype.dropdownClose = function (a, c) {
                    var d;
                    return c.target === this || b(c.target).parents(".rd-navbar-submenu").length || (d = b(this), d.find("li.focus").add(this).removeClass("focus").removeClass("opened"), a.options.callbacks.onDropdownClose && a.options.callbacks.onDropdownClose.call(this, a)), this
                }, e.prototype.dropdownToggle = function (a) {
                    return b(this).toggleClass("opened").siblings().removeClass("opened"), a.options.callbacks.onDropdownToggle && a.options.callbacks.onDropdownToggle.call(this, a), this
                }, e.prototype.goToAnchor = function (a, c) {
                    var d, e;
                    return e = this.hash, d = b(e), d.length && (c.preventDefault(), b("html, body").stop().animate({
                        scrollTop: d.offset().top + a.getOption("anchorNavOffset") + 1
                    }, a.getOption("anchorNavSpeed"), a.getOption("anchorNavEasing"), function () {
                        return a.changeAnchor(e)
                    })), this
                }, e.prototype.activateAnchor = function (a) {
                    var c, d, e, f, g, h, i, j, k, l, m, n;
                    if (f = this, m = f.$doc.scrollTop(), n = f.$win.height(), g = f.$doc.height(), l = f.getOption("anchorNavOffset"), m + n > g - 50) return c = b('[data-type="anchor"]').last(), c.length && c.offset().top >= m && (h = "#" + c.attr("id"), d = b('.rd-navbar-nav a[href^="' + h + '"]').parent(), d.hasClass("active") || (d.addClass("active").siblings().removeClass("active"), f.options.callbacks.onAnchorChange && f.options.callbacks.onAnchorChange.call(c[0], f))), c;
                    k = b('.rd-navbar-nav a[href^="#"]').get();
                    for (i in k) j = k[i], e = b(j), h = e.attr("href"), c = b(h), c.length && c.offset().top + l <= m && c.offset().top + c.outerHeight() > m && (e.parent().addClass("active").siblings().removeClass("active"), f.options.callbacks.onAnchorChange && f.options.callbacks.onAnchorChange.call(c[0], f));
                    return null
                }, e.prototype.getAnchor = function () {
                    return history && history.state ? history.state.id : null
                }, e.prototype.changeAnchor = function (a) {
                    return history && (history.state && history.state.id !== a ? history.replaceState({
                        anchorId: a
                    }, null, a) : history.pushState({
                        anchorId: a
                    }, null, a)), this
                }, e.prototype.applyHandlers = function (a) {
                    return null != a.options.responsive && a.$win.on("resize.navbar", b.proxy(a.resize, a.$win[0], a)).on("resize.navbar", b.proxy(a.resizeWrap, a)).on("resize.navbar", b.proxy(a.stickUp, null != a.$clone ? a.$clone : a.$element, a)).on("orientationchange.navbar", b.proxy(a.resize, a.$win[0], a)).trigger("resize.navbar"), a.$doc.on("scroll.navbar", b.proxy(a.stickUp, null != a.$clone ? a.$clone : a.$element, a)).on("scroll.navbar", b.proxy(a.activateAnchor, a)), a.$element.add(a.$clone).find("[data-rd-navbar-toggle]").each(function () {
                        var c;
                        return c = b(this), c.on("click", b.proxy(a.switchToggle, this, a)), c.parents("body").on("click", b.proxy(a.closeToggle, this, a))
                    }), a.$element.add(a.$clone).find(".rd-navbar-submenu").each(function () {
                        var c, d;
                        return c = b(this), d = c.parents(".rd-navbar--is-clone").length ? a.cloneTimer : a.focusTimer, c.on("mouseleave.navbar", b.proxy(a.dropdownOut, this, a, d)), c.find("> a").on("mouseenter.navbar", b.proxy(a.dropdownOver, this, a, d)), c.find("> a").on("touchstart.navbar", b.proxy(a.dropdownTouch, this, a, d)), c.find("> .rd-navbar-submenu-toggle").on("click", b.proxy(a.dropdownToggle, this, a)), c.parents("body").on("click", b.proxy(a.dropdownClose, this, a))
                    }), a.$element.add(a.$clone).find('.rd-navbar-nav a[href^="#"]').each(function () {
                        return b(this).on("click", b.proxy(a.goToAnchor, this, a))
                    }), a
                }, e.prototype.switchClass = function (a, c, d) {
                    var e;
                    return e = a instanceof jQuery ? a : b(a), e.addClass("rd-navbar--no-transition").removeClass(c).addClass(d), e[0].offsetHeight, e.removeClass("rd-navbar--no-transition")
                }, e.prototype.setDataAPI = function (a) {
                    var b, c, d, e, f, g;
                    for (b = ["-", "-xs-", "-sm-", "-md-", "-lg-", "-xl-"], e = [0, 480, 768, 992, 1200, 1800], c = f = 0, g = e.length; f < g; c = ++f) d = e[c], this.$element.attr("data" + b[c] + "layout") && (this.options.responsive[e[c]] || (this.options.responsive[e[c]] = {}), this.options.responsive[e[c]].layout = this.$element.attr("data" + b[c] + "layout")), this.$element.attr("data" + b[c] + "device-layout") && (this.options.responsive[e[c]] || (this.options.responsive[e[c]] = {}), this.options.responsive[e[c]].deviceLayout = this.$element.attr("data" + b[c] + "device-layout")), this.$element.attr("data" + b[c] + "hover-on") && (this.options.responsive[e[c]] || (this.options.responsive[e[c]] = {}), this.options.responsive[e[c]].focusOnHover = "true" === this.$element.attr("data" + b[c] + "hover-on")), this.$element.attr("data" + b[c] + "auto-height") && (this.options.responsive[e[c]] || (this.options.responsive[e[c]] = {}), this.options.responsive[e[c]].autoHeight = "true" === this.$element.attr("data" + b[c] + "auto-height")), this.$element.attr("data" + b[c] + "stick-up-offset") && (this.options.responsive[e[c]] || (this.options.responsive[e[c]] = {}), this.options.responsive[e[c]].stickUpOffset = this.$element.attr("data" + b[c] + "stick-up-offset"))
                }, e.prototype.getOption = function (a) {
                    var b, c;
                    for (b in this.options.responsive) b <= d.innerWidth && (c = b);
                    return null != this.options.responsive && null != this.options.responsive[c][a] ? this.options.responsive[c][a] : this.options[a]
                }, e.prototype.addAdditionalClassToToggles = function (a, c, d) {
                    return b(a).find("[data-rd-navbar-toggle]").each(function () {
                        var e;
                        return b(this).addClass(c), e = this.getAttribute("data-rd-navbar-toggle"), b(this).parents("body").find(a).find(e).addClass(d)
                    })
                }, e
            }(), b.fn.extend({
                RDNavbar: function (a) {
                    var c;
                    if (c = b(this), !c.data("RDNavbar")) return c.data("RDNavbar", new e(this, a))
                }
            }), d.RDNavbar = e
        }(window.jQuery, document, window), "undefined" != typeof module && null !== module ? module.exports = window.RDNavbar : "function" == typeof define && define.amd && define(["jquery"], function () {
            "use strict";
            return window.RDNavbar
        })
}).call(this);