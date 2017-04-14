/**
 * Created by Anla-E on 2017/4/14.
 */
(function () {
    ! function (a, b, c) {
        var d;
        return d = function () {
            function d(b, c) {
                this.options = a.extend(!0, {}, this.Defaults, c), this.$element = a(b), this.initialize()
            }
            return d.prototype.Defaults = {
                username: "templatemonster",
                list: null,
                hashtag: null,
                hideReplies: !0,
                dateFormat: "%b/%d/%Y",
                apiPath: "bat/twitter_api/tweet.php",
                loadingText: "Loading...",
                localTemplate: {
                    message: "This is sample tweet for local testing. Upload your project to the live hosting server for get data from twitter.com",
                    serverMessage: "RD Twitter Feed: Please upload project to the server for enable plugin!",
                    user_name: "TemplateMonster",
                    date: "Fri Nov 06 11:20:43 +0000 2015",
                    tweet: "Check Out NEW #Photographer Portfolio Responsive Photo - goo.gl/ECjPvq",
                    avatar: "images/tm-logo.jpg",
                    url: "#",
                    screen_name: "@templatemonster",
                    media_url: ["images/twitter-blank.jpg"]
                },
                dateText: {
                    seconds: "less 1m",
                    minutes: "m",
                    hours: "h",
                    yesterday: "yd"
                },
                callback: !1
            }, d.prototype.initialize = function () {
                var a;
                if (a = this.$element, this.options.list && !this.options.username && console.error("If you want to fetch tweets from a list, you must define the username of the list owner."), this.isLocal()) a.prepend("<h6>" + this.options.localTemplate.message + "</h6>");
                else if (!this.isServer()) return void a.prepend("<h6>" + this.options.localTemplate.serverMessage + "</h6>");
                a.append('<span id="loading_tweet">' + (a.attr("data-twitter-loading") ? a.attr("data-twitter-loading") : this.options.loadingText + "</span>")), this.fetch()
            }, d.prototype.linking = function (a, b) {
                var c, d, e, f, g, h, i, j, k, l;
                if (k = a.replace(/#([a-zA-Z0-9_]+)/g, '<a href="https://twitter.com/search?q=%23$1&amp;src=hash" target="_blank" title="Search for #$1">#$1</a>').replace(/@([a-zA-Z0-9_]+)/g, '<a href="https://twitter.com/$1" target="_blank" title="$1 on Twitter">@$1</a>'), i = a.match(/(https?:\/\/([-\w\.]+)+(:\d+)?(\/([\w\/_\.]*(\?\S+)?)?)?)/gi), null !== i)
                    for (d = 0, f = i.length; d < f; d++) {
                        for (h = i[d], c = !1, j = b.entities.urls, e = 0, g = j.length; e < g; e++) l = j[e], k = k.replace(h, '<a href="' + l.expanded_url + '" target="_blank">' + l.display_url + "</a> ");
                        c || (k = k.replace(h, ""))
                    }
                return k
            }, d.prototype.dating = function (a, b) {
                var c, d, e, f, g, h, i, j, k, l;
                if (l = a.split(" "), a = new Date(Date.parse(l[1] + " " + l[2] + ", " + l[5] + " " + l[3] + " UTC")), d = new Date, f = (d.getTime() - a.getTime()) / 1e3, k = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], c = {
                        "%d": a.getDate(),
                        "%m": a.getMonth() + 1,
                        "%b": k[a.getMonth()].substr(0, 3),
                        "%B": k[a.getMonth()],
                        "%y": String(a.getFullYear()).slice(-2),
                        "%Y": a.getFullYear()
                    }, e = b ? "%Y-%m-%d" : this.$element.attr("data-twitter-date-format") ? this.$element.attr("data-twitter-date-format") : this.options.dateFormat, f < 60) return this.$element.attr("data-twitter-date-seconds") ? this.$element.attr("data-twitter-date-seconds") : this.options.dateText.seconds;
                if (f / 60 < 60) return Math.round(f / 60) + (this.$element.attr("data-twitter-date-minutes") ? this.$element.attr("data-twitter-date-minutes") : this.options.dateText.minutes);
                if (f / 60 / 60 < 24) return Math.round(f / 60 / 60) + (this.$element.attr("data-twitter-date-hours") ? this.$element.attr("data-twitter-date-hours") : this.options.dateText.hours);
                if (f / 60 / 60 / 24 < 2) return this.$element.attr("data-twitter-date-yesterday") ? this.$element.attr("data-twitter-date-yesterday") : this.options.dateText.yesterday;
                for (h = e.match(/%[dmbByY]/g), i = 0, j = h.length; i < j; i++) g = h[i], e = e.replace(g, c[g]);
                return e
            }, d.prototype.isLocal = function () {
                var a, c, d, e;
                for (e = ["127.0.0.1", "192.168", "localhost"], c = 0, d = e.length; c < d; c++)
                    if (a = e[c], b.location.hostname.indexOf(a) > -1) return !0;
                return !1
            }, d.prototype.isServer = function () {
                var a;
                return a = c.location.href, a.indexOf("http://") > -1 || a.indexOf("https://") > -1
            }, d.prototype.getMedia = function (a) {
                var b, c, d, e, f;
                if (!a.extended_entities) return a.entities && a.entities.media ? a.entities.media[0].media_url : null;
                if (a.extended_entities.media) {
                    for (e = [], f = a.extended_entities.media, c = 0, d = f.length; c < d; c++) b = f[c], e.push(b.media_url);
                    return e
                }
            }, d.prototype.getTempData = function (a, b) {
                var c, d, e, f, g, h, i, j, k;
                if (g = a.$element.find('[data-twitter-type="tweet"]').length, j = Array(), a.isLocal())
                    for (d = e = 0, h = g; 0 <= h ? e < h : e > h; d = 0 <= h ? ++e : --e) c = {
                        user_name: a.options.localTemplate.user_name,
                        date: a.dating(a.options.localTemplate.date, !1),
                        datetime: a.dating(a.options.localTemplate.date, !0),
                        tweet: a.linking(a.options.localTemplate.tweet),
                        avatar: a.options.localTemplate.avatar,
                        url: a.options.localTemplate.url,
                        retweeted: !1,
                        screen_name: a.linking(a.options.localTemplate.screen_name),
                        media_url: a.options.localTemplate.media_url
                    }, j.push(c);
                else
                    for (d = f = 0, i = g; 0 <= i ? f < i : f > i; d = 0 <= i ? ++f : --f) {
                        if (k = !1, b[d]) k = b[d];
                        else {
                            if (!b.statuses || !b.statuses[d]) break;
                            k = b.statuses[d]
                        }
                        c = {
                            user_name: k.user.name,
                            date: a.dating(k.created_at, !1),
                            datetime: a.dating(k.created_at, !0),
                            tweet: a.linking(k.text, k),
                            avatar: k.user.profile_image_url,
                            url: "https://twitter.com/" + k.user.screen_name + "/status/" + k.id_str,
                            retweeted: k.retweeted,
                            screen_name: a.linking("@" + k.user.screen_name, k)
                        }, c.media_url = a.getMedia(k), j.push(c)
                    }
                return j
            }, d.prototype.fetch = function () {
                var b;
                b = this.$element, a.getJSON(this.options.apiPath, {
                    username: b.attr("data-twitter-username") ? b.attr("data-twitter-username") : this.options.username,
                    list: b.attr("data-twitter-listname") ? b.attr("data-twitter-listname") : this.options.list,
                    hashtag: b.attr("data-twitter-hashtag") ? b.attr("data-twitter-hashtag") : this.options.hashtag,
                    count: b.find('[data-twitter-type="tweet"]').length + 3,
                    exclude_replies: this.options.hideReplies
                }, a.proxy(function (a) {
                    b.find("#loading_tweet").fadeOut("fast"), this.construct(this.getTempData(this, a))
                }, this)), "function" == typeof this.options.callback && this.options.callback()
            }, d.prototype.construct = function (a) {
                var b, c, d, e, f, g;
                for (c = this, b = c.$element.find('[data-twitter-type="tweet"]'), d = e = 0, g = b.length; 0 <= g ? e < g : e > g; d = 0 <= g ? ++e : --e) "A" === b.prop("tagName") && this.tweetLink(b.eq(d), a[d]), f = 0, b.eq(d).find("*").each(function () {
                    c.parseAttributes(this, a[d], f), this.hasAttribute("data-media_url") && f++
                }), b.css("opacity", "1")
            }, d.prototype.tweetLink = function (a, b) {
                a.attr("href", b.url)
            }, d.prototype.parseAttributes = function (b, c, d) {
                var e, f, g, h, i, j, k;
                e = a(b), h = e.data();
                for (i in h)
                    if (h.hasOwnProperty(i) && "xId" !== i && "xImg" !== i && "xText" !== i)
                        for (g = h[i].split(/\s?,\s?/i), j = 0, k = g.length; j < k; j++) f = g[j], "text" === f.toLowerCase() ? b.innerHTML = c[i] : "media_url" === i ? a.isArray(c[i]) && c[i].length > d ? b.setAttribute(f, c[i][d]) : null !== c[i] && 0 === d ? b.setAttribute(f, c[i]) : e.remove() : b.setAttribute(f, c[i])
            }, a.fn.extend({
                RDTwitter: function (b) {
                    var c;
                    if (this.each(function () {}), c = a(this), !c.data("RDTwitter")) return c.data("RDTwitter", new d(this, b))
                }
            }), d
        }()
    }(window.jQuery, document, window), "undefined" != typeof module && null !== module ? module.exports = window.RDTwitter : "function" == typeof define && define.amd && define(["jquery"], function () {
            "use strict";
            return window.RDTwitter
        })
}).call(this);