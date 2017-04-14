/**
 * Created by Anla-E on 2017/4/14.
 */
! function (o, e) {
    var t = "Magnificent";
    "function" == typeof define && define.amd ? define(["./mag", "./mag-analytics", "jquery", "hammerjs", "prevent-ghost-click", "jquery-bridget"], function (n, i, a, r) {
        return o[t] = e(n, i, a, r, PreventGhostClick)
    }) : "object" == typeof exports ? module.exports = e(require("./mag"), require("./mag-analytics"), require("jquery"), require("hammerjs"), require("prevent-ghost-click"), require("jquery-bridget")) : o[t] = e(o.Mag, o.MagnificentAnalytics, o.$, o.Hammer, o.PreventGhostClick)
}(this,
    function (o, e, t, n) {
        t(":root").addClass("mag-js");
        var i = function (o, e) {
                e = e || t(o.target);
                var n = e.offset();
                return {
                    x: o.pageX - n.left,
                    y: o.pageY - n.top
                }
            },
            a = function (o, e) {
                e = e || t(o.target);
                var n = i(o, e);
                return {
                    x: n.x / e.width(),
                    y: n.y / e.height()
                }
            },
            r = function (o, e, t) {
                return {
                    x: e / o.width(),
                    y: t / o.height()
                }
            },
            s = function (o) {
                return 100 * o + "%"
            },
            m = function (o, e, t) {
                return "3d" === e ? c(o, t) : "2d" === e ? f(o, t) : d(o, t)
            },
            d = function (o, e) {
                var t = {};
                return void 0 !== o.x && (t.left = s(o.x)), void 0 !== o.y && (t.top = s(o.y)), void 0 !== o.w && (t.width = s(o.w)), void 0 !== o.h && (t.height = s(o.h)), t
            },
            f = function (o, e) {
                var t, n, i, a, r = {},
                    m = o.x,
                    d = o.y,
                    f = o.w,
                    c = o.h;
                m += (f - 1) * (.5 - m) / f, d += (c - 1) * (.5 - d) / c, void 0 !== m && (t = s(m)), void 0 !== d && (n = s(d)), void 0 !== f && (i = f), void 0 !== c && (a = c);
                var l = "";
                return i && (l += " scaleX(" + i + ")"), a && (l += " scaleY(" + a + ")"), t && (l += " translateX(" + t + ")"), n && (l += " translateY(" + n + ")"), r["-webkit-transform"] = l, r["-moz-transform"] = l, r["-ms-transform"] = l, r["-o-transform"] = l, r.transform = l, r
            },
            c = function (o, e) {
                var t, n, i, a, r = {},
                    m = o.x,
                    d = o.y,
                    f = o.w,
                    c = o.h;
                m += (f - 1) * (.5 - m) / f, d += (c - 1) * (.5 - d) / c, void 0 !== m && (t = s(m)), void 0 !== d && (n = s(d)), void 0 !== f && (i = f), void 0 !== c && (a = c);
                var l = "";
                return l += " scale3d(" + (void 0 !== i ? i : 0) + "," + (void 0 !== a ? a : 0) + ",1)", l += " translate3d(" + (void 0 !== t ? t : 0) + "," + (void 0 !== n ? n : 0) + ",0)", r["-webkit-transform"] = l, r["-moz-transform"] = l, r["-ms-transform"] = l, r["-o-transform"] = l, r.transform = l, r.width = "100%", r.height = "100%", r.position = "absolute", r.top = "0", r.left = "0", r
            },
            l = function (o, e) {
                this.element = t(o), this.options = t.extend(!0, {}, this.options, e), this._init()
            };
        return l.prototype.options = {
            mode: "inner",
            position: "mirror",
            positionEvent: "move",
            theme: "default",
            initialShow: "thumb",
            constrainLens: !0,
            constrainZoomed: !1,
            zoomMin: 1,
            zoomMax: 10,
            zoomRate: .2,
            dragRate: .2,
            ratio: 1,
            toggle: !0,
            smooth: !0,
            renderIntervalTime: 20,
            cssMode: "3d",
            eventNamespace: "magnificent",
            dataNamespace: "magnificent"
        }, l.prototype.toggle = function (o) {
            o ? (this.$zoomedContainer.fadeIn(), this.$lens && this.$lens.fadeIn()) : (this.$zoomedContainer.fadeOut(), this.$lens && this.$lens.fadeOut())
        }, l.prototype.compute = function () {
            var o = this;
            o.mag.compute(), o.$el.trigger("compute", o)
        }, l.prototype.render = function () {
            var o, e, t = this,
                n = this.$lens,
                i = this.$zoomed;
            if (n) {
                o = this.modelLazy.lens;
                var a = m(o, t.options.cssMode, t.id);
                n.css(a)
            }
            e = this.modelLazy.zoomed;
            var r = m(e, t.options.cssMode, t.id);
            i.css(r), this.$el.trigger("render", t)
        }, l.prototype.eventName = function (o) {
            o = o || "";
            var e = this.options.eventNamespace;
            return o + (e ? "." + e : "")
        }, l.prototype.dataName = function (o) {
            o = o || "";
            var e = this.options.dataNamespace;
            return (e ? e + "." : "") + o
        }, l.prototype._init = function () {
            var e = this,
                i = this.$el = this.element;
            this.$originalEl = i.clone();
            var s = this.options,
                m = i.attr("mag-thumb");
            this.id = m, t.isFunction(s.toggle) && (this.toggle = s.toggle);
            var d = this.$lens,
                f = s.ratio,
                c = s.initial || {},
                l = "undefined" != typeof c.zoom ? c.zoom : 2,
                u = "undefined" != typeof c.focus ? c.focus : {
                    x: .5,
                    y: .5
                },
                g = "undefined" != typeof c.lens ? c.lens : {
                    w: 0,
                    h: 0
                },
                p = this.model = {
                    focus: u,
                    zoom: l,
                    lens: g,
                    ratio: f
                },
                v = this.mag = new o({
                    zoomMin: s.zoomMin,
                    zoomMax: s.zoomMax,
                    constrainLens: s.constrainLens,
                    constrainZoomed: s.constrainZoomed,
                    model: p
                }),
                h = this.modelLazy = {
                    focus: {
                        x: p.focus.x,
                        y: p.focus.y
                    },
                    zoom: p.zoom,
                    lens: {
                        w: p.lens.w,
                        h: p.lens.h
                    },
                    ratio: f
                },
                y = this.magLazy = new o({
                    zoomMin: s.zoomMin,
                    zoomMax: s.zoomMax,
                    constrainLens: s.constrainLens,
                    constrainZoomed: s.constrainZoomed,
                    model: h
                });
            v.compute(), y.compute();
            var z, x, w, $;
            x = i.children(), i.empty(), i.addClass("mag-host"), s.zoomedContainer || (s.zoomedContainer = t('[mag-zoom="' + e.id + '"]')), s.zoomedContainer && ($ = t(s.zoomedContainer), e.$originalZoomedContainer = $.clone(), z = $.children(), $.empty(), "inner" === s.mode && $.remove()), "outer" === s.mode && "undefined" == typeof s.showLens && (s.showLens = !0), z && z.length || (z = x.clone()), s.mode && i.attr("mag-mode", s.mode), s.theme && i.attr("mag-theme", "default"), s.position ? i.attr("mag-position", s.position) : s.position === !1 && (s.positionEvent = !1), s.positionEvent && i.attr("mag-position-event", s.positionEvent), i.attr("mag-toggle", s.toggle), s.showLens && (d = this.$lens = t('<div class="mag-lens"></div>'), i.append(d));
            var C = t('<div class="mag-noflow" mag-theme="' + s.theme + '"></div>');
            if (i.append(C), "inner" === s.mode) $ = C;
            else {
                if ("outer" !== s.mode) throw new Error("Invalid 'mode' option.");
                if (!s.zoomedContainer) throw new Error("Required 'zoomedContainer' option.");
                $ = t(s.zoomedContainer)
            }
            $.attr("mag-theme", s.theme), $.addClass("mag-zoomed-container"), $.addClass("mag-zoomed-bg");
            var b = t('<div class="mag-thumb"></div>');
            b.html(x), i.append(b), w = this.$zoomed = t('<div class="mag-zoomed"></div>'), w.html(z), $.append(w), $.attr("mag-toggle", s.toggle);
            var N = t('<div class="mag-zone"></div>'),
                j = N.get(0);
            if (i.append(N), this.$el = i, this.$zone = N, this.$noflow = C, this.$thumb = b, this.$zoomed = w, this.$zoomedContainer = $, e.proxyToZone($), "outer" === s.mode && e.proxyToZone(b), s.toggle) {
                if ("thumb" === s.initialShow) $.hide(), d && d.hide();
                else if ("zoomed" !== s.initialShow) throw new Error("Invalid 'initialShow' option.");
                i.on(e.eventName("mouseenter"), function () {
                    e.toggle.call(e, !0)
                }), i.on(e.eventName("mouseleave"), function () {
                    e.toggle.call(e, !1)
                })
            }
            e.render();
            var E = .25,
                M = s.renderIntervalTime,
                L = s.dragRate,
                k = s.zoomRate,
                q = function (o, e, n, i, a, r, s) {
                    s = s ? s : r, t.isArray(r) || (r = [r], s = [s]);
                    for (var m = 0, d = r.length; d > m; ++m) {
                        var f = r[m],
                            c = s[m],
                            l = a[c] - i[f];
                        o && Math.abs(l) > e ? i[f] += l * n : i[f] += l
                    }
                },
                Z = function () {
                    q(s.smooth, .01, E, h.focus, p.focus, "x"), q(s.smooth, .01, E, h.focus, p.focus, "y"), q(s.smooth, .05, E, h, p, "zoom"), e.magLazy.compute(), e.render()
                },
                I = function (o) {
                    p.focus.x = o.x, p.focus.y = o.y, e.compute()
                };
            if ("mirror" === s.position)
                if ("move" === s.positionEvent) E = .2, N.on(e.eventName("mousemove"), function (o, e) {
                    o = "object" == typeof e ? e : o;
                    var t = a(o, N);
                    I(t)
                });
                else {
                    if ("hold" !== s.positionEvent) throw new Error("Invalid 'positionEvent' option.");
                    E = .2, N.on(e.eventName("dragstart"), function (o, e, t) {
                        o = "object" == typeof t ? t : o, T = !0, i.addClass("mag--dragging")
                    }), N.on(e.eventName("dragend"), function (o, e, t) {
                        o = "object" == typeof t ? t : o, T = !1, i.removeClass("mag--dragging")
                    }), N.on(e.eventName("drag"), function (o, e, t) {
                        o = "object" == typeof t ? t : o;
                        var n = N.offset(),
                            i = r(N, o.pageX - n.left, o.pageY - n.top);
                        I(i)
                    })
                }
            else if ("drag" === s.position) {
                var X;
                "inner" === s.mode ? (N.on(e.eventName("dragstart"), function (o, e, t) {
                    o = "object" == typeof t ? t : o, o.preventDefault(), T = !0, i.addClass("mag--dragging"), X = {
                        x: p.focus.x,
                        y: p.focus.y
                    }
                }), N.on(e.eventName("dragend"), function (o, e, t) {
                    o = "object" == typeof t ? t : o, T = !1, i.removeClass("mag--dragging"), X = void 0
                }), N.on(e.eventName("drag"), function (o, t, n) {
                    if (o = "object" == typeof n ? n : o, !o.originalEvent || 1 === o.originalEvent.scale) {
                        N.offset();
                        R = r(N, t.originalX - t.offsetX, t.originalY - t.offsetY), R = {
                            x: R.x / p.zoom,
                            y: R.y / p.zoom
                        };
                        var i = p.focus;
                        i.x = X.x + R.x, i.y = X.y + R.y, e.compute()
                    }
                })) : (N.on(e.eventName("dragstart"), function (o, e, t) {
                    o = "object" == typeof t ? t : o, T = !0, i.addClass("mag--dragging"), X = {
                        x: p.focus.x,
                        y: p.focus.y
                    }
                }), N.on(e.eventName("dragend"), function (o, e, t) {
                    o = "object" == typeof t ? t : o, T = !1, i.removeClass("mag--dragging"), X = void 0
                }), N.on(e.eventName("drag"), function (o, t, n) {
                    var i = N.offset();
                    R = r(N, o.pageX - i.left, o.pageY - i.top);
                    var a = p.focus;
                    a.x = R.x, a.y = R.y, e.compute()
                }), N.on(e.eventName("click"), function (o) {
                    var t = N.offset();
                    R = r(N, o.pageX - t.left, o.pageY - t.top);
                    var n = p.focus;
                    n.x = R.x, n.y = R.y, e.compute()
                }))
            } else if ("joystick" === s.position) {
                var Y = 50,
                    T = !1,
                    R = {
                        x: p.focus.x,
                        y: p.focus.y
                    };
                if ("move" === s.positionEvent) T = !0, E = .5, N.on(e.eventName("mousemove"), function (o) {
                    R = a(o, N)
                });
                else {
                    if ("hold" !== s.positionEvent) throw new Error("Invalid 'positionEvent' option.");
                    E = .5, N.drag("start", function () {
                        T = !0, i.addClass("mag--dragging")
                    }), N.drag("end", function () {
                        T = !1, i.removeClass("mag--dragging")
                    }), N.drag(function (o, e) {
                        var t = N.offset();
                        R = r(N, o.pageX - t.left, o.pageY - t.top)
                    })
                }
                setInterval(function () {
                    if (T) {
                        var o = p.focus,
                            t = L;
                        o.x += (R.x - .5) * t, o.y += (R.y - .5) * t, e.compute()
                    }
                }, Y)
            } else if (s.position !== !1) throw new Error("Invalid 'position' option.");
            if (s.position && (N.on(e.eventName("mousewheel"), function (o, t) {
                    o = "object" == typeof t ? t : o, o.preventDefault();
                    var n = k,
                        i = p.zoom,
                        a = (o.deltaY + o.deltaX) / 2;
                    a *= n, a += 1, i *= a, p.zoom = i, e.compute()
                }), PreventGhostClick && PreventGhostClick(j), n)) {
                var D = j,
                    G = N,
                    P = {},
                    S = new n(D, P);
                if (e.$el.on("destroy", function () {
                        S.destroy()
                    }), G.data(e.dataName("hammer")), S.get("pinch").set({
                        enable: !0
                    }), S.on("pinch", function (o) {
                        o.preventDefault(), e.toggle.call(e, !0);
                        var t = p.zoom,
                            n = o.scale || o.originalEvent && o.originalEvent.scale;
                        t *= n, p.zoom = t, e.compute()
                    }), "inner" === s.mode) {
                    var A = S.get("pinch"),
                        B = S.get("pan");
                    A.recognizeWith(B), S.on("pan", function (o) {
                        o.preventDefault(), e.toggle.call(e, !0);
                        var t = -5e-4;
                        p.focus.x += t * o.deltaX, p.focus.y += t * o.deltaY
                    })
                }
            }
            setInterval(Z, M)
        }, l.prototype.proxyToZone = function (o) {
            var e = this,
                n = e.$zone,
                i = ["mousemove", "click", "touchstart", "touchend", "touchmove", "touchcancel", "mousewheel", "draginit", "dragstart", "drag", "dragend"],
                a = t.map(i, function (o) {
                    return e.eventName(o)
                });
            o.on(a.join(" "), function (o) {
                var i = (t(this), Array.prototype.slice.call(arguments));
                o.triggered = !0, i.push(o), i.unshift(e.eventName(o.type)), n.trigger.apply(n, i)
            })
        }, l.prototype.destroy = function () {
            var o = this;
            o.$el.trigger(o.eventName("destroy")), o.off(), o.$originalZoomedContainer && o.$zoomedContainer && (o.$zoomedContainer.after(o.$originalZoomedContainer), o.$zoomedContainer.remove()), o.$el.after(o.$originalEl), o.$el.remove()
        }, l.prototype.off = function () {
            var o = this;
            return o.$originalZoomedContainer && o.$zoomedContainer && o.$zoomedContainer.off(o.eventName()), o.$el.off(o.eventName()), this
        }, l.prototype.zoomBy = function (o) {
            this.model.zoom *= 1 + o, this.compute()
        }, l.prototype.zoomTo = function (o) {
            this.model.zoom = o, this.compute()
        }, l.prototype.moveBy = function (o) {
            "undefined" != typeof o.x && (o.absolute || (o.x /= this.model.zoom), this.model.focus.x += o.x), "undefined" != typeof o.y && (o.absolute || (o.y /= this.model.zoom), this.model.focus.y += o.y), this.compute()
        }, l.prototype.moveTo = function (o) {
            "undefined" != typeof o.x && (this.model.focus.x = o.x), "undefined" != typeof o.y && (this.model.focus.y = o.y), this.compute()
        }, t.bridget("mag", l), e && e.track("mag-jquery.js"), l
    });