/**
 * Created by Anla-E on 2017/4/14.
 */
(function () {
    (function (p, n, d) {
        var t, x, y, v, k, m, w, r, u;
        m = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        y = /Chrome/.test(navigator.userAgent);
        r = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor) || /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
        v = m && /crios/i.test(navigator.userAgent);
        w = /iPhone|iPad|iPod/i.test(navigator.userAgent) && !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/);
        k = -1 !== navigator.appVersion.indexOf("MSIE") ||
            -1 < navigator.appVersion.indexOf("Trident/");
        u = /windows nt 6.2/.test(navigator.userAgent.toLowerCase()) || /windows nt 6.3/.test(navigator.userAgent.toLowerCase());
        x = null != n.body.classList;
        (function () {
            var k, m, n, b, a;
            m = 0;
            a = ["ms", "moz", "webkit", "o"];
            k = 0;
            for (n = a.length; k < n; k++) b = a[k], d.requestAnimationFrame = d[b + "RequestAnimationFrame"], d.cancelAnimationFrame = d[b + "CancelAnimationFrame"] || d[b + "CancelRequestAnimationFrame"];
            d.requestAnimationFrame || (d.requestAnimationFrame = function (a, c) {
                var e, b, f;
                e = (new Date).getTime();
                f = Math.max(0, 16 - (e - m));
                b = d.setTimeout(function () {
                    a(e + f)
                }, f);
                m = e + f;
                return b
            });
            if (!d.cancelAnimationFrame) return d.cancelAnimationFrame = function (a) {
                return clearTimeout(a)
            }
        });
        t = function () {
            function q(b) {
                this.options = p.extend(!0, {}, this.Defaults, b);
                this.scenes = [];
                this.initialize();
                this.scrollY = d.scrollY || d.pageYOffset;
                this.lastScrollY = -1;
                this.lastDocHeight = 0;
                this.checkLayerHeight = this.inputFocus = !1
            }
            var z, t;
            z = function () {
                function b(a, g, c, e, b, f, h) {
                    this.amend = r || k || m ? 60 : 0;
                    this.element = a;
                    this.aliases = g;
                    this.type =
                        a.getAttribute("data-type") || "html";
                    "html" === this.type && (this.holder = this.createHolder());
                    this.direction = "normal" === a.getAttribute("data-direction") || null == a.getAttribute("data-direction") ? 1 : -1;
                    this.fade = "true" === a.getAttribute("data-fade");
                    this.blur = "true" === a.getAttribute("data-blur");
                    this.boundTo = n.querySelector(a.getAttribute("data-bound-to"));
                    "media" === this.type && (this.url = a.getAttribute("data-url"));
                    this.responsive = this.getResponsiveOptions();
                    this.element.style.position = !k && !m || m || u && k ? "absolute" :
                        "fixed";
                    switch (this.type) {
                        case "media":
                            null != this.url && (this.element.style["background-image"] = "url(" + this.url + ")");
                            break;
                        case "html":
                            k && m && (this.element.style["z-index"] = 1)
                    }
                    this.refresh(c, e, b, f, h)
                }
                b.prototype.refresh = function (a, g, c, e, b) {
                    this.speed = this.getOption("speed", a) || 0;
                    this.offset = this.getOption("offset", a) || 0;
                    m || u && k || (this.element.style.position = b ? "fixed" : "absolute");
                    k && "html" === this.type && (this.element.style.position = "absolute");
                    switch (this.type) {
                        case "media":
                            if (!k) return this.offsetHeight =
                                this.getMediaHeight(g, e, this.speed, this.direction), this.element.style.height = this.offsetHeight + "px";
                            break;
                        case "html":
                            this.element.style.width = this.holder.offsetWidth + "px";
                            this.offsetHeight = this.element.offsetHeight;
                            this.holder.style.height = this.offsetHeight + "px";
                            if (!(!k && !m || m || u && k)) return k ? this.element.style.position = "static" : b && (this.element.style.left = this.getOffset(this.holder).left + "px", this.element.style.top = this.getOffset(this.holder).top - c + "px"), this.holder.style.position = "static";
                            break;
                        case "custom":
                            return this.offsetHeight = this.element.offsetHeight
                    }
                };
                b.prototype.createHolder = function () {
                    var a;
                    a = n.createElement("div");
                    x ? a.classList.add("rd-parallax-layer-holder") : a.className = "rd-parallax-layer-holder";
                    this.element.parentNode.insertBefore(a, this.element);
                    a.appendChild(this.element);
                    if (!k && !m || v) a.style.position = "relative";
                    return a
                };
                b.prototype.isHolderWrong = function () {
                    return "html" === this.type && this.holder.offsetHeight !== this.element.offsetHeight ? !0 : !1
                };
                b.prototype.getOption = function (a,
                                                  g) {
                    var c, e;
                    for (c in this.responsive) c <= g && (e = c);
                    return this.responsive[e][a]
                };
                b.prototype.getResponsiveOptions = function () {
                    var a, g, c, e, b, f, h, l, d;
                    l = {};
                    h = [];
                    g = [];
                    e = this.aliases;
                    for (c in e) a = e[c], h.push(c), g.push(a);
                    c = e = 0;
                    for (b = h.length; e < b; c = ++e)
                        for (f = h[c], l[f] = {}; - 1 <= (a = c);) !l[f].speed && (d = this.element.getAttribute("data" + g[a] + "speed")) && (l[f].speed = this.getSpeed(d)), !l[f].offset && (d = this.element.getAttribute("data" + g[a] + "offset")) && (l[f].offset = parseInt(d)), !l[f].fade && (d = this.element.getAttribute("data" +
                            g[a] + "fade")) && (l[f].fade = "true" === d), c--;
                    return l
                };
                b.prototype.fuse = function (a, g) {
                    var c, e, b;
                    c = this.getOffset(this.element).top + this.element.getBoundingClientRect().top;
                    e = a + g / 2;
                    c += this.offsetHeight / 2;
                    b = g / 6;
                    e + b > c && e - b < c ? this.element.style.opacity = 1 : (e = e - b < c ? 1 + (e + b - c) / g / 3 * 10 : 1 - (e - b - c) / g / 3 * 10, this.element.style.opacity = 0 > e ? 0 : 1 < e ? 1 : e.toFixed(2))
                };
                b.prototype.move = function (a, g, c, b, d, f, h, l, n) {
                    k && "media" === this.type || m || u && k || (h ? (h = !m || "html" === this.type && n || v ? this.speed * this.direction : this.speed * this.direction -
                        1, g = this.offsetHeight, null != l ? f = (b + c - (l + c)) / (c - d) : "media" !== this.type ? b < c || b > f - c ? (f = b < c ? b / (c - d) : (b + c - f) / (c - d), isFinite(f) || (f = 0)) : f = .5 : f = .5, a = v || k ? (d - g) / 2 + (c - d) * f * h + this.offset : m ? -(b - a) * h + (d - g) / 2 + (c - d) * f * (h + 1) + this.offset : -(b - a) * h + (d - g) / 2 + (c - d) * f * h + this.offset, m && null != l && (this.element.style.top = b - l + "px"), r && (this.element.style["-webkit-transform"] = "translate3d(0," + a + "px,0)"), this.element.style.transform = "translate3d(0," + a + "px,0)") : (r && (this.element.style["-webkit-transform"] = "translate3d(0,0,0)"),
                        this.element.style.transform = "translate3d(0,0,0)"))
                };
                b.prototype.getSpeed = function (a) {
                    return Math.min(Math.max(parseFloat(a), 0), 2)
                };
                b.prototype.getMediaHeight = function (a, b, c, e) {
                    return b + (-1 === e ? (b + a) * c : 0) + (1 >= c ? Math.abs(a - b) * c : a * c) + 2 * this.amend
                };
                b.prototype.getOffset = function (a) {
                    a = a.getBoundingClientRect();
                    return {
                        top: a.top + (d.scrollY || d.pageYOffset),
                        left: a.left + (d.scrollX || d.pageXOffset)
                    }
                };
                return b
            }();
            t = function () {
                function b(a, b, c, e) {
                    this.amend = r ? 60 : 0;
                    this.element = a;
                    this.aliases = b;
                    this.on = !0;
                    this.agent =
                        n.querySelector(a.getAttribute("data-agent"));
                    this.anchor = this.findAnchor();
                    this.canvas = this.createCanvas();
                    this.layers = this.createLayers(c);
                    this.fitTo = this.getFitElement();
                    this.responsive = this.getResponsiveOptions();
                    this.refresh(c, e)
                }
                b.prototype.getFitElement = function () {
                    var a;
                    return null != (a = this.element.getAttribute("data-fit-to")) ? "parent" === a ? this.element.parentNode : n.querySelector(a) : null
                };
                b.prototype.findAnchor = function () {
                    var a;
                    for (a = this.element.parentNode; null != a && a !== n;) {
                        if (this.isTransformed.call(a)) return a;
                        a = a.parentNode
                    }
                    return null
                };
                b.prototype.createCanvas = function () {
                    var a;
                    a = n.createElement("div");
                    x ? a.classList.add("rd-parallax-inner") : a.className = "rd-parallax-inner";
                    for (this.element.appendChild(a); this.element.firstChild !== a;) a.appendChild(this.element.firstChild);
                    this.element.style.position = "relative";
                    this.element.style.overflow = "hidden";
                    k || m ? (a.style.position = "absolute", u && k || (a.style.clip = "rect(0, auto, auto, 0)"), a.style.transform = k ? "translate3d(0,0,0)" : "none") : a.style.position = "fixed";
                    a.style.left =
                        this.offsetLeft + "px";
                    a.style.top = 0;
                    r && (a.style["margin-top"] = "-" + this.amend + "px", a.style.padding = this.amend + "px 0", this.element.style["z-index"] = 0);
                    return a
                };
                b.prototype.getOption = function (a, b) {
                    var c, e;
                    for (c in this.responsive) c <= b && (e = c);
                    return this.responsive[e][a]
                };
                b.prototype.getResponsiveOptions = function () {
                    var a, b, c, e, d, f, h, l, k;
                    l = {};
                    h = [];
                    b = [];
                    e = this.aliases;
                    for (c in e) a = e[c], h.push(c), b.push(a);
                    c = e = 0;
                    for (d = h.length; e < d; c = ++e)
                        for (f = h[c], l[f] = {}; - 1 <= (a = c);) l[f].on || null == (k = this.element.getAttribute("data" +
                            b[a] + "on")) || (l[f].on = "false" !== k), null == l[f].on && 0 === a && (l[f].on = !0), c--;
                    return l
                };
                b.prototype.createLayers = function (a, b) {
                    var c, e, d, f, h;
                    e = p(this.element).find(".rd-parallax-layer").get();
                    f = [];
                    c = d = 0;
                    for (h = e.length; d < h; c = ++d) c = e[c], f.push(new z(c, this.aliases, a, b, this.offsetTop, this.offsetHeight, this.on));
                    return f
                };
                b.prototype.move = function (a) {
                    a = null != this.anchor ? this.positionTop : this.offsetTop - a;
                    r && (this.canvas.style["-webkit-transform"] = "translate3d(0," + a + "px,0)");
                    return this.canvas.style.transform =
                        "translate3d(0," + a + "px,0)"
                };
                b.prototype.refresh = function (a, b) {
                    var c, e, d, f, h;
                    f = [];
                    this.on = this.getOption("on", a);
                    this.offsetTop = this.getOffset(this.element).top;
                    this.offsetLeft = this.getOffset(this.element).left;
                    this.width = this.element.offsetWidth;
                    this.canvas.style.width = this.width + "px";
                    null != this.anchor && (this.positionTop = this.element.offsetTop);
                    null != this.agent ? (this.agentOffset = this.getOffset(this.agent).top, this.agentHeight = this.agent.offsetHeight) : this.agentOffset = this.agentHeight = null;
                    h = this.layers;
                    c = 0;
                    for (d = h.length; c < d; c++) e = h[c], "media" === e.type ? f.push(e) : e.refresh(a, b, this.offsetTop, this.offsetHeight, this.on);
                    this.offsetHeight = this.canvas.offsetHeight - 2 * this.amend;
                    this.element.style.height = this.offsetHeight + "px";
                    c = 0;
                    for (d = f.length; c < d; c++) e = f[c], e.refresh(a, b, this.offsetTop, this.offsetHeight, this.on)
                };
                b.prototype.update = function (a, b, c, e, d) {
                    var f, h, l, n, p, q, r;
                    r = this.offsetTop;
                    q = this.offsetHeight;
                    k || m || this.move(a);
                    n = this.layers;
                    p = [];
                    f = 0;
                    for (l = n.length; f < l; f++) h = n[f], h.move(a, b, c, r, q, e, this.on,
                        this.agentOffset, d), h.fade = h.getOption("fade", b) || !1, !h.fade || m || k ? p.push(void 0) : p.push(h.fuse(r, q));
                    return p
                };
                b.prototype.isTransformed = function () {
                    var a, b, c;
                    c = {
                        webkitTransform: "-webkit-transform",
                        OTransform: "-o-transform",
                        msTransform: "-ms-transform",
                        MozTransform: "-moz-transform",
                        transform: "transform"
                    };
                    for (a in c) c.hasOwnProperty(a) && null != this.style[a] && (b = d.getComputedStyle(this).getPropertyValue(c[a]));
                    return null != b && 0 < b.length && "none" !== b ? !0 : !1
                };
                b.prototype.getOffset = function (a) {
                    a = a.getBoundingClientRect();
                    return {
                        top: a.top + (d.scrollY || d.pageYOffset),
                        left: a.left + (d.scrollX || d.pageYOffset)
                    }
                };
                return b
            }();
            q.prototype.Defaults = {
                selector: ".rd-parallax",
                screenAliases: {
                    0: "-",
                    480: "-xs-",
                    768: "-sm-",
                    992: "-md-",
                    1200: "-lg-",
                    1920: "-xl-",
                    2560: "-xxl-"
                }
            };
            q.prototype.initialize = function () {
                var b, a, g, c, e, k, f;
                b = this;
                g = n.querySelectorAll(b.options.selector);
                f = d.innerWidth;
                k = d.innerHeight;
                a = c = 0;
                for (e = g.length; c < e; a = ++c) a = g[a], b.scenes.push(new t(a, b.options.screenAliases, f, k));
                p(d).on("resize", p.proxy(b.resize, b));
                if (w) p("input").on("focusin focus",
                    function (a) {
                        a.preventDefault();
                        b.activeOffset = p(this).offset().top;
                        return d.scrollTo(d.scrollX || d.pageXOffset, b.activeOffset - this.offsetHeight - 100)
                    });
                p(d).trigger("resize");
                b.update();
                b.checkResize()
            };
            q.prototype.resize = function (b) {
                var a, g, c;
                if ((a = d.innerWidth) !== this.windowWidth || !m || b) {
                    this.windowWidth = a;
                    this.windowHeight = d.innerHeight;
                    this.documentHeight = n.body.offsetHeight;
                    g = this.scenes;
                    b = 0;
                    for (a = g.length; b < a; b++) c = g[b], c.refresh(this.windowWidth, this.windowHeight);
                    return this.update(!0)
                }
            };
            q.prototype.update =
                function (b) {
                    var a, g, c, e, k, f, h, l, p, q;
                    g = this;
                    b || requestAnimationFrame(function () {
                        g.update()
                    });
                    l = d.scrollY || d.pageYOffset;
                    w && null != (a = n.activeElement) && (a.tagName.match(/(input)|(select)|(textarea)/i) ? (g.activeElement = a, g.inputFocus = !0) : (g.activeElement = null, g.inputFocus = !1, b = !0));
                    m && y && (a = d.innerHeight - g.windowHeight, g.deltaHeight = a, l -= g.deltaHeight);
                    if ((l !== g.lastScrollY || b) && !g.isActing) {
                        g.isActing = !0;
                        q = g.windowWidth;
                        p = g.windowHeight;
                        c = g.documentHeight;
                        a = l - g.lastScrollY;
                        w && null != g.activeElement &&
                        (g.activeElement.value += " ", g.activeElement.value = g.activeElement.value.trim());
                        f = g.scenes;
                        e = 0;
                        for (k = f.length; e < k; e++) h = f[e], (g.inputFocus || b || l + p >= (h.agentOffset || h.offsetTop) + a && l <= (h.agentOffset || h.offsetTop) + (h.agentHeight || h.offsetHeight) + a) && h.update(l, q, p, c, g.inputFocus);
                        g.lastScrollY = l;
                        return g.isActing = !1
                    }
                };
            q.prototype.checkResize = function () {
                var b;
                b = this;
                setInterval(function () {
                    var a, d, c, e, k, f, h, l;
                    a = n.body.offsetHeight;
                    h = b.scenes;
                    d = 0;
                    for (k = h.length; d < k; d++) {
                        c = h[d];
                        l = c.layers;
                        c = 0;
                        for (f = l.length; c <
                        f; c++)
                            if (e = l[c], e.isHolderWrong()) {
                                b.checkLayerHeight = !0;
                                break
                            }
                        if (b.checkLayerHeight) break
                    }
                    if (b.checkLayerHeight || a !== b.lastDocHeight) return b.resize(!0), b.lastDocHeight = a, b.checkLayerHeight = !1
                }, 500)
            };
            return q
        }();
        p.RDParallax = function (d) {
            var k;
            k = p(n);
            if (!k.data("RDParallax")) return k.data("RDParallax", new t(d))
        };
        return d.RDParallax = t
    })(window.jQuery, document, window);
    "undefined" !== typeof module && null !== module ? module.exports = window.RDParallax : "function" === typeof define && define.amd && define(["jquery"],
            function () {
                return window.RDParallax
            })
}).call(this);