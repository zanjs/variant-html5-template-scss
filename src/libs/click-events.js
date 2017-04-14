/**
 * Created by Anla-E on 2017/4/14.
 */
! function (t, n, e) {
    function i(t) {
        for (var n = 0; n < u.length; n++) {
            var e = u[n][0],
                i = u[n][1];
            if (Math.abs(t.clientX - e) < r && Math.abs(t.clientY - i) < r) {
                t.stopPropagation(), t.preventDefault();
                break
            }
        }
    }

    function c() {
        u = []
    }

    function o() {
        u.splice(0, 1)
    }

    function a(t) {
        if (t.touches.length - t.changedTouches.length <= 0) {
            var n = t.changedTouches[0];
            u.push([n.clientX, n.clientY]), setTimeout(o, h)
        }
    }
    var u = [],
        r = 25,
        h = 2500;
    return "ontouchstart" in t ? (t[e] = function (t) {
        t.addEventListener("touchstart", c, !0), t.addEventListener("touchend", a, !0)
    }, void n.addEventListener("click", i, !0)) : void(t[e] = function () {})
}(window, document, "PreventGhostClick");