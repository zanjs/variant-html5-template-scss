/**
 * Created by Anla-E on 2017/4/14.
 */
(function () {
    var e, i, n, o, d, c, t, r, a, v;
    e = window.device, window.device = {}, n = window.document.documentElement, v = window.navigator.userAgent.toLowerCase(), device.ios = function () {
        return device.iphone() || device.ipod() || device.ipad()
    }, device.iphone = function () {
        return o("iphone")
    }, device.ipod = function () {
        return o("ipod")
    }, device.ipad = function () {
        return o("ipad")
    }, device.android = function () {
        return o("android")
    }, device.androidPhone = function () {
        return device.android() && o("mobile")
    }, device.androidTablet = function () {
        return device.android() && !o("mobile")
    }, device.blackberry = function () {
        return o("blackberry") || o("bb10") || o("rim")
    }, device.blackberryPhone = function () {
        return device.blackberry() && !o("tablet")
    }, device.blackberryTablet = function () {
        return device.blackberry() && o("tablet")
    }, device.windows = function () {
        return o("windows")
    }, device.windowsPhone = function () {
        return device.windows() && o("phone")
    }, device.windowsTablet = function () {
        return device.windows() && o("touch") && !device.windowsPhone()
    }, device.fxos = function () {
        return (o("(mobile;") || o("(tablet;")) && o("; rv:")
    }, device.fxosPhone = function () {
        return device.fxos() && o("mobile")
    }, device.fxosTablet = function () {
        return device.fxos() && o("tablet")
    }, device.meego = function () {
        return o("meego")
    }, device.cordova = function () {
        return window.cordova && "file:" === location.protocol
    }, device.nodeWebkit = function () {
        return "object" == typeof window.process
    }, device.mobile = function () {
        return device.androidPhone() || device.iphone() || device.ipod() || device.windowsPhone() || device.blackberryPhone() || device.fxosPhone() || device.meego()
    }, device.tablet = function () {
        return device.ipad() || device.androidTablet() || device.blackberryTablet() || device.windowsTablet() || device.fxosTablet()
    }, device.desktop = function () {
        return !device.tablet() && !device.mobile()
    }, device.portrait = function () {
        return window.innerHeight / window.innerWidth > 1
    }, device.landscape = function () {
        return window.innerHeight / window.innerWidth < 1
    }, device.noConflict = function () {
        return window.device = e, this
    }, o = function (e) {
        return -1 !== v.indexOf(e)
    }, c = function (e) {
        var i;
        return i = new RegExp(e, "i"), n.className.match(i)
    }, i = function (e) {
        return c(e) ? void 0 : n.className += " " + e
    }, r = function (e) {
        return c(e) ? n.className = n.className.replace(e, "") : void 0
    }, device.ios() ? device.ipad() ? i("ios ipad tablet") : device.iphone() ? i("ios iphone mobile") : device.ipod() && i("ios ipod mobile") : i(device.android() ? device.androidTablet() ? "android tablet" : "android mobile" : device.blackberry() ? device.blackberryTablet() ? "blackberry tablet" : "blackberry mobile" : device.windows() ? device.windowsTablet() ? "windows tablet" : device.windowsPhone() ? "windows mobile" : "desktop" : device.fxos() ? device.fxosTablet() ? "fxos tablet" : "fxos mobile" : device.meego() ? "meego mobile" : device.nodeWebkit() ? "node-webkit" : "desktop"), device.cordova() && i("cordova"), d = function () {
        return device.landscape() ? (r("portrait"), i("landscape")) : (r("landscape"), i("portrait"))
    }, a = "onorientationchange" in window, t = a ? "orientationchange" : "resize", window.addEventListener ? window.addEventListener(t, d, !1) : window.attachEvent ? window.attachEvent(t, d) : window[t] = d, d()
}).call(this);