/**
 * Created by Anla-E on 2017/4/14.
 */
! function (t, e, i, n) {
    "use strict";

    function r(t, e, i) {
        return setTimeout(c(t, i), e)
    }

    function s(t, e, i) {
        return Array.isArray(t) ? (o(t, i[e], i), !0) : !1
    }

    function o(t, e, i) {
        var r;
        if (t)
            if (t.forEach) t.forEach(e, i);
            else if (t.length !== n)
                for (r = 0; r < t.length;) e.call(i, t[r], r, t), r++;
            else
                for (r in t) t.hasOwnProperty(r) && e.call(i, t[r], r, t)
    }

    function a(t, e, i) {
        for (var r = Object.keys(e), s = 0; s < r.length;)(!i || i && t[r[s]] === n) && (t[r[s]] = e[r[s]]), s++;
        return t
    }

    function h(t, e) {
        return a(t, e, !0)
    }

    function u(t, e, i) {
        var n, r = e.prototype;
        n = t.prototype = Object.create(r), n.constructor = t, n._super = r, i && a(n, i)
    }

    function c(t, e) {
        return function () {
            return t.apply(e, arguments)
        }
    }

    function l(t, e) {
        return typeof t == ct ? t.apply(e ? e[0] || n : n, e) : t
    }

    function p(t, e) {
        return t === n ? e : t
    }

    function f(t, e, i) {
        o(g(e), function (e) {
            t.addEventListener(e, i, !1)
        })
    }

    function d(t, e, i) {
        o(g(e), function (e) {
            t.removeEventListener(e, i, !1)
        })
    }

    function v(t, e) {
        for (; t;) {
            if (t == e) return !0;
            t = t.parentNode
        }
        return !1
    }

    function m(t, e) {
        return t.indexOf(e) > -1
    }

    function g(t) {
        return t.trim().split(/\s+/g)
    }

    function T(t, e, i) {
        if (t.indexOf && !i) return t.indexOf(e);
        for (var n = 0; n < t.length;) {
            if (i && t[n][i] == e || !i && t[n] === e) return n;
            n++
        }
        return -1
    }

    function y(t) {
        return Array.prototype.slice.call(t, 0)
    }

    function E(t, e, i) {
        for (var n = [], r = [], s = 0; s < t.length;) {
            var o = e ? t[s][e] : t[s];
            T(r, o) < 0 && n.push(t[s]), r[s] = o, s++
        }
        return i && (n = e ? n.sort(function (t, i) {
            return t[e] > i[e]
        }) : n.sort()), n
    }

    function I(t, e) {
        for (var i, r, s = e[0].toUpperCase() + e.slice(1), o = 0; o < ht.length;) {
            if (i = ht[o], r = i ? i + s : e, r in t) return r;
            o++
        }
        return n
    }

    function A() {
        return dt++
    }

    function _(t) {
        var e = t.ownerDocument;
        return e.defaultView || e.parentWindow
    }

    function D(t, e) {
        var i = this;
        this.manager = t, this.callback = e, this.element = t.element, this.target = t.options.inputTarget, this.domHandler = function (e) {
            l(t.options.enable, [t]) && i.handler(e)
        }, this.init()
    }

    function S(t) {
        var e, i = t.options.inputClass;
        return new(e = i ? i : gt ? W : Tt ? H : mt ? U : F)(t, w)
    }

    function w(t, e, i) {
        var n = i.pointers.length,
            r = i.changedPointers.length,
            s = e & Dt && n - r === 0,
            o = e & (wt | bt) && n - r === 0;
        i.isFirst = !!s, i.isFinal = !!o, s && (t.session = {}), i.eventType = e, b(t, i), t.emit("hammer.input", i), t.recognize(i), t.session.prevInput = i
    }

    function b(t, e) {
        var i = t.session,
            n = e.pointers,
            r = n.length;
        i.firstInput || (i.firstInput = z(e)), r > 1 && !i.firstMultiple ? i.firstMultiple = z(e) : 1 === r && (i.firstMultiple = !1);
        var s = i.firstInput,
            o = i.firstMultiple,
            a = o ? o.center : s.center,
            h = e.center = N(n);
        e.timeStamp = ft(), e.deltaTime = e.timeStamp - s.timeStamp, e.angle = x(a, h), e.distance = O(a, h), C(i, e), e.offsetDirection = M(e.deltaX, e.deltaY), e.scale = o ? Y(o.pointers, n) : 1, e.rotation = o ? X(o.pointers, n) : 0, R(i, e);
        var u = t.element;
        v(e.srcEvent.target, u) && (u = e.srcEvent.target), e.target = u
    }

    function C(t, e) {
        var i = e.center,
            n = t.offsetDelta || {},
            r = t.prevDelta || {},
            s = t.prevInput || {};
        (e.eventType === Dt || s.eventType === wt) && (r = t.prevDelta = {
            x: s.deltaX || 0,
            y: s.deltaY || 0
        }, n = t.offsetDelta = {
            x: i.x,
            y: i.y
        }), e.deltaX = r.x + (i.x - n.x), e.deltaY = r.y + (i.y - n.y)
    }

    function R(t, e) {
        var i, r, s, o, a = t.lastInterval || e,
            h = e.timeStamp - a.timeStamp;
        if (e.eventType != bt && (h > _t || a.velocity === n)) {
            var u = a.deltaX - e.deltaX,
                c = a.deltaY - e.deltaY,
                l = P(h, u, c);
            r = l.x, s = l.y, i = pt(l.x) > pt(l.y) ? l.x : l.y, o = M(u, c), t.lastInterval = e
        } else i = a.velocity, r = a.velocityX, s = a.velocityY, o = a.direction;
        e.velocity = i, e.velocityX = r, e.velocityY = s, e.direction = o
    }

    function z(t) {
        for (var e = [], i = 0; i < t.pointers.length;) e[i] = {
            clientX: lt(t.pointers[i].clientX),
            clientY: lt(t.pointers[i].clientY)
        }, i++;
        return {
            timeStamp: ft(),
            pointers: e,
            center: N(e),
            deltaX: t.deltaX,
            deltaY: t.deltaY
        }
    }

    function N(t) {
        var e = t.length;
        if (1 === e) return {
            x: lt(t[0].clientX),
            y: lt(t[0].clientY)
        };
        for (var i = 0, n = 0, r = 0; e > r;) i += t[r].clientX, n += t[r].clientY, r++;
        return {
            x: lt(i / e),
            y: lt(n / e)
        }
    }

    function P(t, e, i) {
        return {
            x: e / t || 0,
            y: i / t || 0
        }
    }

    function M(t, e) {
        return t === e ? Ct : pt(t) >= pt(e) ? t > 0 ? Rt : zt : e > 0 ? Nt : Pt
    }

    function O(t, e, i) {
        i || (i = Xt);
        var n = e[i[0]] - t[i[0]],
            r = e[i[1]] - t[i[1]];
        return Math.sqrt(n * n + r * r)
    }

    function x(t, e, i) {
        i || (i = Xt);
        var n = e[i[0]] - t[i[0]],
            r = e[i[1]] - t[i[1]];
        return 180 * Math.atan2(r, n) / Math.PI
    }

    function X(t, e) {
        return x(e[1], e[0], Yt) - x(t[1], t[0], Yt)
    }

    function Y(t, e) {
        return O(e[0], e[1], Yt) / O(t[0], t[1], Yt)
    }

    function F() {
        this.evEl = Wt, this.evWin = qt, this.allow = !0, this.pressed = !1, D.apply(this, arguments)
    }

    function W() {
        this.evEl = kt, this.evWin = Ut, D.apply(this, arguments), this.store = this.manager.session.pointerEvents = []
    }

    function q() {
        this.evTarget = Vt, this.evWin = jt, this.started = !1, D.apply(this, arguments)
    }

    function L(t, e) {
        var i = y(t.touches),
            n = y(t.changedTouches);
        return e & (wt | bt) && (i = E(i.concat(n), "identifier", !0)), [i, n]
    }

    function H() {
        this.evTarget = Bt, this.targetIds = {}, D.apply(this, arguments)
    }

    function k(t, e) {
        var i = y(t.touches),
            n = this.targetIds;
        if (e & (Dt | St) && 1 === i.length) return n[i[0].identifier] = !0, [i, i];
        var r, s, o = y(t.changedTouches),
            a = [],
            h = this.target;
        if (s = i.filter(function (t) {
                return v(t.target, h)
            }), e === Dt)
            for (r = 0; r < s.length;) n[s[r].identifier] = !0, r++;
        for (r = 0; r < o.length;) n[o[r].identifier] && a.push(o[r]), e & (wt | bt) && delete n[o[r].identifier], r++;
        return a.length ? [E(s.concat(a), "identifier", !0), a] : void 0
    }

    function U() {
        D.apply(this, arguments);
        var t = c(this.handler, this);
        this.touch = new H(this.manager, t), this.mouse = new F(this.manager, t)
    }

    function G(t, e) {
        this.manager = t, this.set(e)
    }

    function V(t) {
        if (m(t, ee)) return ee;
        var e = m(t, ie),
            i = m(t, ne);
        return e && i ? ie + " " + ne : e || i ? e ? ie : ne : m(t, te) ? te : $t
    }

    function j(t) {
        this.id = A(), this.manager = null, this.options = h(t || {}, this.defaults), this.options.enable = p(this.options.enable, !0), this.state = re, this.simultaneous = {}, this.requireFail = []
    }

    function Z(t) {
        return t & ue ? "cancel" : t & ae ? "end" : t & oe ? "move" : t & se ? "start" : ""
    }

    function B(t) {
        return t == Pt ? "down" : t == Nt ? "up" : t == Rt ? "left" : t == zt ? "right" : ""
    }

    function J(t, e) {
        var i = e.manager;
        return i ? i.get(t) : t
    }

    function K() {
        j.apply(this, arguments)
    }

    function Q() {
        K.apply(this, arguments), this.pX = null, this.pY = null
    }

    function $() {
        K.apply(this, arguments)
    }

    function tt() {
        j.apply(this, arguments), this._timer = null, this._input = null
    }

    function et() {
        K.apply(this, arguments)
    }

    function it() {
        K.apply(this, arguments)
    }

    function nt() {
        j.apply(this, arguments), this.pTime = !1, this.pCenter = !1, this._timer = null, this._input = null, this.count = 0
    }

    function rt(t, e) {
        return e = e || {}, e.recognizers = p(e.recognizers, rt.defaults.preset), new st(t, e)
    }

    function st(t, e) {
        e = e || {}, this.options = h(e, rt.defaults), this.options.inputTarget = this.options.inputTarget || t, this.handlers = {}, this.session = {}, this.recognizers = [], this.element = t, this.input = S(this), this.touchAction = new G(this, this.options.touchAction), ot(this, !0), o(e.recognizers, function (t) {
            var e = this.add(new t[0](t[1]));
            t[2] && e.recognizeWith(t[2]), t[3] && e.requireFailure(t[3])
        }, this)
    }

    function ot(t, e) {
        var i = t.element;
        o(t.options.cssProps, function (t, n) {
            i.style[I(i.style, n)] = e ? t : ""
        })
    }

    function at(t, i) {
        var n = e.createEvent("Event");
        n.initEvent(t, !0, !0), n.gesture = i, i.target.dispatchEvent(n)
    }
    var ht = ["", "webkit", "moz", "MS", "ms", "o"],
        ut = e.createElement("div"),
        ct = "function",
        lt = Math.round,
        pt = Math.abs,
        ft = Date.now,
        dt = 1,
        vt = /mobile|tablet|ip(ad|hone|od)|android/i,
        mt = "ontouchstart" in t,
        gt = I(t, "PointerEvent") !== n,
        Tt = mt && vt.test(navigator.userAgent),
        yt = "touch",
        Et = "pen",
        It = "mouse",
        At = "kinect",
        _t = 25,
        Dt = 1,
        St = 2,
        wt = 4,
        bt = 8,
        Ct = 1,
        Rt = 2,
        zt = 4,
        Nt = 8,
        Pt = 16,
        Mt = Rt | zt,
        Ot = Nt | Pt,
        xt = Mt | Ot,
        Xt = ["x", "y"],
        Yt = ["clientX", "clientY"];
    D.prototype = {
        handler: function () {},
        init: function () {
            this.evEl && f(this.element, this.evEl, this.domHandler), this.evTarget && f(this.target, this.evTarget, this.domHandler), this.evWin && f(_(this.element), this.evWin, this.domHandler)
        },
        destroy: function () {
            this.evEl && d(this.element, this.evEl, this.domHandler), this.evTarget && d(this.target, this.evTarget, this.domHandler), this.evWin && d(_(this.element), this.evWin, this.domHandler)
        }
    };
    var Ft = {
            mousedown: Dt,
            mousemove: St,
            mouseup: wt
        },
        Wt = "mousedown",
        qt = "mousemove mouseup";
    u(F, D, {
        handler: function (t) {
            var e = Ft[t.type];
            e & Dt && 0 === t.button && (this.pressed = !0), e & St && 1 !== t.which && (e = wt), this.pressed && this.allow && (e & wt && (this.pressed = !1), this.callback(this.manager, e, {
                pointers: [t],
                changedPointers: [t],
                pointerType: It,
                srcEvent: t
            }))
        }
    });
    var Lt = {
            pointerdown: Dt,
            pointermove: St,
            pointerup: wt,
            pointercancel: bt,
            pointerout: bt
        },
        Ht = {
            2: yt,
            3: Et,
            4: It,
            5: At
        },
        kt = "pointerdown",
        Ut = "pointermove pointerup pointercancel";
    t.MSPointerEvent && (kt = "MSPointerDown", Ut = "MSPointerMove MSPointerUp MSPointerCancel"), u(W, D, {
        handler: function (t) {
            var e = this.store,
                i = !1,
                n = t.type.toLowerCase().replace("ms", ""),
                r = Lt[n],
                s = Ht[t.pointerType] || t.pointerType,
                o = s == yt,
                a = T(e, t.pointerId, "pointerId");
            r & Dt && (0 === t.button || o) ? 0 > a && (e.push(t), a = e.length - 1) : r & (wt | bt) && (i = !0), 0 > a || (e[a] = t, this.callback(this.manager, r, {
                pointers: e,
                changedPointers: [t],
                pointerType: s,
                srcEvent: t
            }), i && e.splice(a, 1))
        }
    });
    var Gt = {
            touchstart: Dt,
            touchmove: St,
            touchend: wt,
            touchcancel: bt
        },
        Vt = "touchstart",
        jt = "touchstart touchmove touchend touchcancel";
    u(q, D, {
        handler: function (t) {
            var e = Gt[t.type];
            if (e === Dt && (this.started = !0), this.started) {
                var i = L.call(this, t, e);
                e & (wt | bt) && i[0].length - i[1].length === 0 && (this.started = !1), this.callback(this.manager, e, {
                    pointers: i[0],
                    changedPointers: i[1],
                    pointerType: yt,
                    srcEvent: t
                })
            }
        }
    });
    var Zt = {
            touchstart: Dt,
            touchmove: St,
            touchend: wt,
            touchcancel: bt
        },
        Bt = "touchstart touchmove touchend touchcancel";
    u(H, D, {
        handler: function (t) {
            var e = Zt[t.type],
                i = k.call(this, t, e);
            i && this.callback(this.manager, e, {
                pointers: i[0],
                changedPointers: i[1],
                pointerType: yt,
                srcEvent: t
            })
        }
    }), u(U, D, {
        handler: function (t, e, i) {
            var n = i.pointerType == yt,
                r = i.pointerType == It;
            if (n) this.mouse.allow = !1;
            else if (r && !this.mouse.allow) return;
            e & (wt | bt) && (this.mouse.allow = !0), this.callback(t, e, i)
        },
        destroy: function () {
            this.touch.destroy(), this.mouse.destroy()
        }
    });
    var Jt = I(ut.style, "touchAction"),
        Kt = Jt !== n,
        Qt = "compute",
        $t = "auto",
        te = "manipulation",
        ee = "none",
        ie = "pan-x",
        ne = "pan-y";
    G.prototype = {
        set: function (t) {
            t == Qt && (t = this.compute()), Kt && (this.manager.element.style[Jt] = t), this.actions = t.toLowerCase().trim()
        },
        update: function () {
            this.set(this.manager.options.touchAction)
        },
        compute: function () {
            var t = [];
            return o(this.manager.recognizers, function (e) {
                l(e.options.enable, [e]) && (t = t.concat(e.getTouchAction()))
            }), V(t.join(" "))
        },
        preventDefaults: function (t) {
            if (!Kt) {
                var e = t.srcEvent,
                    i = t.offsetDirection;
                if (this.manager.session.prevented) return void e.preventDefault();
                var n = this.actions,
                    r = m(n, ee),
                    s = m(n, ne),
                    o = m(n, ie);
                return r || s && i & Mt || o && i & Ot ? this.preventSrc(e) : void 0
            }
        },
        preventSrc: function (t) {
            this.manager.session.prevented = !0, t.preventDefault()
        }
    };
    var re = 1,
        se = 2,
        oe = 4,
        ae = 8,
        he = ae,
        ue = 16,
        ce = 32;
    j.prototype = {
        defaults: {},
        set: function (t) {
            return a(this.options, t), this.manager && this.manager.touchAction.update(), this
        },
        recognizeWith: function (t) {
            if (s(t, "recognizeWith", this)) return this;
            var e = this.simultaneous;
            return t = J(t, this), e[t.id] || (e[t.id] = t, t.recognizeWith(this)), this
        },
        dropRecognizeWith: function (t) {
            return s(t, "dropRecognizeWith", this) ? this : (t = J(t, this), delete this.simultaneous[t.id], this)
        },
        requireFailure: function (t) {
            if (s(t, "requireFailure", this)) return this;
            var e = this.requireFail;
            return t = J(t, this), -1 === T(e, t) && (e.push(t), t.requireFailure(this)), this
        },
        dropRequireFailure: function (t) {
            if (s(t, "dropRequireFailure", this)) return this;
            t = J(t, this);
            var e = T(this.requireFail, t);
            return e > -1 && this.requireFail.splice(e, 1), this
        },
        hasRequireFailures: function () {
            return this.requireFail.length > 0
        },
        canRecognizeWith: function (t) {
            return !!this.simultaneous[t.id]
        },
        emit: function (t) {
            function e(e) {
                i.manager.emit(i.options.event + (e ? Z(n) : ""), t)
            }
            var i = this,
                n = this.state;
            ae > n && e(!0), e(), n >= ae && e(!0)
        },
        tryEmit: function (t) {
            return this.canEmit() ? this.emit(t) : void(this.state = ce)
        },
        canEmit: function () {
            for (var t = 0; t < this.requireFail.length;) {
                if (!(this.requireFail[t].state & (ce | re))) return !1;
                t++
            }
            return !0
        },
        recognize: function (t) {
            var e = a({}, t);
            return l(this.options.enable, [this, e]) ? (this.state & (he | ue | ce) && (this.state = re), this.state = this.process(e), void(this.state & (se | oe | ae | ue) && this.tryEmit(e))) : (this.reset(), void(this.state = ce))
        },
        process: function (t) {},
        getTouchAction: function () {},
        reset: function () {}
    }, u(K, j, {
        defaults: {
            pointers: 1
        },
        attrTest: function (t) {
            var e = this.options.pointers;
            return 0 === e || t.pointers.length === e
        },
        process: function (t) {
            var e = this.state,
                i = t.eventType,
                n = e & (se | oe),
                r = this.attrTest(t);
            return n && (i & bt || !r) ? e | ue : n || r ? i & wt ? e | ae : e & se ? e | oe : se : ce
        }
    }), u(Q, K, {
        defaults: {
            event: "pan",
            threshold: 10,
            pointers: 1,
            direction: xt
        },
        getTouchAction: function () {
            var t = this.options.direction,
                e = [];
            return t & Mt && e.push(ne), t & Ot && e.push(ie), e
        },
        directionTest: function (t) {
            var e = this.options,
                i = !0,
                n = t.distance,
                r = t.direction,
                s = t.deltaX,
                o = t.deltaY;
            return r & e.direction || (e.direction & Mt ? (r = 0 === s ? Ct : 0 > s ? Rt : zt, i = s != this.pX, n = Math.abs(t.deltaX)) : (r = 0 === o ? Ct : 0 > o ? Nt : Pt, i = o != this.pY, n = Math.abs(t.deltaY))), t.direction = r, i && n > e.threshold && r & e.direction
        },
        attrTest: function (t) {
            return K.prototype.attrTest.call(this, t) && (this.state & se || !(this.state & se) && this.directionTest(t))
        },
        emit: function (t) {
            this.pX = t.deltaX, this.pY = t.deltaY;
            var e = B(t.direction);
            e && this.manager.emit(this.options.event + e, t), this._super.emit.call(this, t)
        }
    }), u($, K, {
        defaults: {
            event: "pinch",
            threshold: 0,
            pointers: 2
        },
        getTouchAction: function () {
            return [ee]
        },
        attrTest: function (t) {
            return this._super.attrTest.call(this, t) && (Math.abs(t.scale - 1) > this.options.threshold || this.state & se)
        },
        emit: function (t) {
            if (this._super.emit.call(this, t), 1 !== t.scale) {
                var e = t.scale < 1 ? "in" : "out";
                this.manager.emit(this.options.event + e, t)
            }
        }
    }), u(tt, j, {
        defaults: {
            event: "press",
            pointers: 1,
            time: 500,
            threshold: 5
        },
        getTouchAction: function () {
            return [$t]
        },
        process: function (t) {
            var e = this.options,
                i = t.pointers.length === e.pointers,
                n = t.distance < e.threshold,
                s = t.deltaTime > e.time;
            if (this._input = t, !n || !i || t.eventType & (wt | bt) && !s) this.reset();
            else if (t.eventType & Dt) this.reset(), this._timer = r(function () {
                this.state = he, this.tryEmit()
            }, e.time, this);
            else if (t.eventType & wt) return he;
            return ce
        },
        reset: function () {
            clearTimeout(this._timer)
        },
        emit: function (t) {
            this.state === he && (t && t.eventType & wt ? this.manager.emit(this.options.event + "up", t) : (this._input.timeStamp = ft(), this.manager.emit(this.options.event, this._input)))
        }
    }), u(et, K, {
        defaults: {
            event: "rotate",
            threshold: 0,
            pointers: 2
        },
        getTouchAction: function () {
            return [ee]
        },
        attrTest: function (t) {
            return this._super.attrTest.call(this, t) && (Math.abs(t.rotation) > this.options.threshold || this.state & se)
        }
    }), u(it, K, {
        defaults: {
            event: "swipe",
            threshold: 10,
            velocity: .65,
            direction: Mt | Ot,
            pointers: 1
        },
        getTouchAction: function () {
            return Q.prototype.getTouchAction.call(this)
        },
        attrTest: function (t) {
            var e, i = this.options.direction;
            return i & (Mt | Ot) ? e = t.velocity : i & Mt ? e = t.velocityX : i & Ot && (e = t.velocityY), this._super.attrTest.call(this, t) && i & t.direction && t.distance > this.options.threshold && pt(e) > this.options.velocity && t.eventType & wt
        },
        emit: function (t) {
            var e = B(t.direction);
            e && this.manager.emit(this.options.event + e, t), this.manager.emit(this.options.event, t)
        }
    }), u(nt, j, {
        defaults: {
            event: "tap",
            pointers: 1,
            taps: 1,
            interval: 300,
            time: 250,
            threshold: 2,
            posThreshold: 10
        },
        getTouchAction: function () {
            return [te]
        },
        process: function (t) {
            var e = this.options,
                i = t.pointers.length === e.pointers,
                n = t.distance < e.threshold,
                s = t.deltaTime < e.time;
            if (this.reset(), t.eventType & Dt && 0 === this.count) return this.failTimeout();
            if (n && s && i) {
                if (t.eventType != wt) return this.failTimeout();
                var o = this.pTime ? t.timeStamp - this.pTime < e.interval : !0,
                    a = !this.pCenter || O(this.pCenter, t.center) < e.posThreshold;
                this.pTime = t.timeStamp, this.pCenter = t.center, a && o ? this.count += 1 : this.count = 1, this._input = t;
                var h = this.count % e.taps;
                if (0 === h) return this.hasRequireFailures() ? (this._timer = r(function () {
                    this.state = he, this.tryEmit()
                }, e.interval, this), se) : he
            }
            return ce
        },
        failTimeout: function () {
            return this._timer = r(function () {
                this.state = ce
            }, this.options.interval, this), ce
        },
        reset: function () {
            clearTimeout(this._timer)
        },
        emit: function () {
            this.state == he && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input))
        }
    }), rt.VERSION = "2.0.4", rt.defaults = {
        domEvents: !1,
        touchAction: Qt,
        enable: !0,
        inputTarget: null,
        inputClass: null,
        preset: [
            [et, {
                enable: !1
            }],
            [$, {
                enable: !1
            },
                ["rotate"]
            ],
            [it, {
                direction: Mt
            }],
            [Q, {
                direction: Mt
            },
                ["swipe"]
            ],
            [nt],
            [nt, {
                event: "doubletap",
                taps: 2
            },
                ["tap"]
            ],
            [tt]
        ],
        cssProps: {
            userSelect: "none",
            touchSelect: "none",
            touchCallout: "none",
            contentZooming: "none",
            userDrag: "none",
            tapHighlightColor: "rgba(0,0,0,0)"
        }
    };
    var le = 1,
        pe = 2;
    st.prototype = {
        set: function (t) {
            return a(this.options, t), t.touchAction && this.touchAction.update(), t.inputTarget && (this.input.destroy(), this.input.target = t.inputTarget, this.input.init()), this
        },
        stop: function (t) {
            this.session.stopped = t ? pe : le
        },
        recognize: function (t) {
            var e = this.session;
            if (!e.stopped) {
                this.touchAction.preventDefaults(t);
                var i, n = this.recognizers,
                    r = e.curRecognizer;
                (!r || r && r.state & he) && (r = e.curRecognizer = null);
                for (var s = 0; s < n.length;) i = n[s], e.stopped === pe || r && i != r && !i.canRecognizeWith(r) ? i.reset() : i.recognize(t), !r && i.state & (se | oe | ae) && (r = e.curRecognizer = i), s++
            }
        },
        get: function (t) {
            if (t instanceof j) return t;
            for (var e = this.recognizers, i = 0; i < e.length; i++)
                if (e[i].options.event == t) return e[i];
            return null
        },
        add: function (t) {
            if (s(t, "add", this)) return this;
            var e = this.get(t.options.event);
            return e && this.remove(e), this.recognizers.push(t), t.manager = this, this.touchAction.update(), t
        },
        remove: function (t) {
            if (s(t, "remove", this)) return this;
            var e = this.recognizers;
            return t = this.get(t), e.splice(T(e, t), 1), this.touchAction.update(), this
        },
        on: function (t, e) {
            var i = this.handlers;
            return o(g(t), function (t) {
                i[t] = i[t] || [], i[t].push(e)
            }), this
        },
        off: function (t, e) {
            var i = this.handlers;
            return o(g(t), function (t) {
                e ? i[t].splice(T(i[t], e), 1) : delete i[t]
            }), this
        },
        emit: function (t, e) {
            this.options.domEvents && at(t, e);
            var i = this.handlers[t] && this.handlers[t].slice();
            if (i && i.length) {
                e.type = t, e.preventDefault = function () {
                    e.srcEvent.preventDefault()
                };
                for (var n = 0; n < i.length;) i[n](e), n++
            }
        },
        destroy: function () {
            this.element && ot(this, !1), this.handlers = {}, this.session = {}, this.input.destroy(), this.element = null
        }
    }, a(rt, {
        INPUT_START: Dt,
        INPUT_MOVE: St,
        INPUT_END: wt,
        INPUT_CANCEL: bt,
        STATE_POSSIBLE: re,
        STATE_BEGAN: se,
        STATE_CHANGED: oe,
        STATE_ENDED: ae,
        STATE_RECOGNIZED: he,
        STATE_CANCELLED: ue,
        STATE_FAILED: ce,
        DIRECTION_NONE: Ct,
        DIRECTION_LEFT: Rt,
        DIRECTION_RIGHT: zt,
        DIRECTION_UP: Nt,
        DIRECTION_DOWN: Pt,
        DIRECTION_HORIZONTAL: Mt,
        DIRECTION_VERTICAL: Ot,
        DIRECTION_ALL: xt,
        Manager: st,
        Input: D,
        TouchAction: G,
        TouchInput: H,
        MouseInput: F,
        PointerEventInput: W,
        TouchMouseInput: U,
        SingleTouchInput: q,
        Recognizer: j,
        AttrRecognizer: K,
        Tap: nt,
        Pan: Q,
        Swipe: it,
        Pinch: $,
        Rotate: et,
        Press: tt,
        on: f,
        off: d,
        each: o,
        merge: h,
        extend: a,
        inherit: u,
        bindFn: c,
        prefixed: I
    }), typeof define == ct && define.amd ? define(function () {
        return rt
    }) : "undefined" != typeof module && module.exports ? module.exports = rt : t[i] = rt
}(window, document, "Hammer");