/**
 * Created by admin on 31.07.2016.
 */
var main = function() {

    $(".dot").click(function() {
        var currentSlide = $(".active-img");
        var nextSlide = currentSlide.next();
        var currentDot = $(".active-dot");
        var nextDot = currentDot.next();

        if (nextSlide.length == 0) {
            nextSlide = $(".slide").first();
            nextDot = $(".dot").first();
        }

        currentSlide.removeClass("active-img animated fadeInLeft");
        nextSlide.addClass("active-img animated fadeInLeft");
        currentDot.removeClass("active-dot");
        nextDot.addClass("active-dot");
    });


}

$(document).ready(main);
