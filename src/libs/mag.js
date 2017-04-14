/**
 * Created by Anla-E on 2017/4/14.
 */
! function (o, n) {
    var i = "Mag";
    "function" == typeof define && define.amd ? define(["./mag-analytics"], function (t) {
        return o[i] = n(t)
    }) : "object" == typeof exports ? module.exports = n(require("./mag-analytics")) : o[i] = n(o.MagnificentAnalytics)
}(this,
    function (o) {
        var n = function (o) {
            o = o || {}, o.model = o.model || {}, o.zoomMin = o.zoomMin || 1, o.zoomMax = o.zoomMax || 10, o.constrainLens = o.constrainLens !== !1, o.constrainZoomed = o.constrainZoomed !== !1, this.id = o.id, this.model = o.model, this.options = o, this.fillModel()
        };
        return n.prototype.fillXY = function (o) {
            return o = o || {}, o.x = o.x || 0, o.y = o.y || 0, o
        }, n.prototype.fillWH = function (o) {
            return o = o || {}, o.w = o.w || 0, o.h = o.h || 0, o
        }, n.prototype.fillModel = function () {
            var o = this.model;
            o.mode = o.mode || "lag", o.focus = this.fillXY(o.focus), o.lens = this.fillXY(this.fillWH(o.lens)), o.zoomed = this.fillXY(this.fillWH(o.zoomed)), o.boundedLens = this.fillXY(this.fillWH(o.boundedLens)), o.zoom = o.zoom || 1, o.ratio = o.ratio || 1
        }, n.prototype.compute = function () {
            var o, n, i, t, s, e, a = this.options,
                r = this.model;
            o = r.lens, n = r.focus, i = r.zoomed, t = r.zoom, t = this.minMax(t, a.zoomMin, a.zoomMax), n.x = this.minMax(n.x, 0, 1), n.y = this.minMax(n.y, 0, 1), s = 1 / t, e = 1 / t, e /= r.ratio, o.w = s, o.h = e, a.constrainLens && (o = this.constrainLensWH(o)), o.x = n.x - o.w / 2, o.y = n.y - o.h / 2, a.constrainLens && (o = this.constrainLensXY(o)), i.w = 1 / s, i.h = 1 / e;
            var h = this.constrainZoomed(i, a);
            h.w !== i.w && (t *= h.w / i.w), i = h, i.x = .5 - n.x * i.w, i.y = .5 - n.y * i.h, a.constrainZoomed && (i.x = this.minMax(i.x, 1 - t, 0), i.y = this.minMax(i.y, 1 - t, 0)), r.lens = o, r.focus = n, r.zoomed = i, r.zoom = t
        }, n.prototype.minMax = function (o, n, i) {
            return n > o ? n : o > i ? i : o
        }, n.prototype.minMax1 = function (o, n) {
            return this.minMax(o, n, 1)
        }, n.prototype.constrainZoomed = function (o, n) {
            var i, t;
            return i = this.minMax(o.w, n.zoomMin, n.zoomMax), i !== o.w ? (t *= i / o.w, t = this.minMax(t, n.zoomMin, n.zoomMax)) : (t = this.minMax(o.h, n.zoomMin, n.zoomMax), t !== o.h && (i *= t / o.h, i = this.minMax(i, n.zoomMin, n.zoomMax))), {
                w: i,
                h: t,
                x: o.x,
                y: o.y
            }
        }, n.prototype.constrainLensWH = function (o) {
            var n, i;
            return n = this.minMax1(o.w, .1), n !== o.w ? (i *= n / o.w, i = this.minMax1(i, .1)) : (i = this.minMax1(o.h, .1), i !== o.h && (n *= i / o.h, n = this.minMax1(n, .1))), {
                w: n,
                h: i,
                x: o.x,
                y: o.y
            }
        }, n.prototype.constrainLensXY = function (o) {
            return {
                x: this.minMax(o.x, 0, 1 - o.w),
                y: this.minMax(o.y, 0, 1 - o.h),
                w: o.w,
                h: o.h
            }
        }, n.prototype.constrainLens = function (o) {
            var n = this.constrainLensXY(this.constrainLensWH(o));
            return n.w + n.x > 1 && (n.x = Math.max(0, 1 - n.w)), n.h + n.y > 1 && (n.y = Math.max(0, 1 - n.h)), n
        }, n.prototype.project = function (o) {
            var n = this.model,
                i = n.lens;
            return {
                x: i.x * o.w,
                y: i.y * o.h,
                w: i.w * o.w,
                h: i.h * o.h
            }
        }, o && o.track("mag.js"), n
    });