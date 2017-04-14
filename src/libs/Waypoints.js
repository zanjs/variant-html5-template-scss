/**
 * Created by Anla-E on 2017/4/14.
 */
! function (t) {
    var o = t("[data-waypoint-to]");
    o.length && t(document).ready(function () {
        o.each(function () {
            var o = t(this);
            o.on("click", function (n) {
                n.preventDefault(), t("body, html").stop().animate({
                    scrollTop: t(o.attr("data-waypoint-to")).offset().top
                }, 800)
            })
        })
    })
}(jQuery);