/**
 * Created by admin on 25.08.2016.
 */
//Робота із слайдером ціни
$(function rangeMove() {
    var filter = document.getElementsByClassName("filter-by-price")[0];
    var range = document.getElementById("range");
    console.log(range);
    var thumbLeft = range.children[0];
    var thumbRight = range.children[1];
    var minValue = document.getElementsByClassName("min-value")[0];
    var maxValue = document.getElementsByClassName("max-value")[0];
    minValue.innerHTML = "\u00A3" + " " + 0 + ".00";
    maxValue.innerHTML = "\u00A3" + "" + 860 + ".00";

    thumbLeft.onmousedown = function (e) {
        var thumbCoords = getCoords(thumbLeft);
        var shiftX = e.pageX - thumbCoords.left;
        var rangeCoords = getCoords(range);
        filter.onmousemove = function (e) {
            var newLeft = e.pageX - shiftX - rangeCoords.left;

            if (newLeft < 0) {
                newLeft = 0;
            }

            var rightEdge = getCoords(thumbRight).left - rangeCoords.left - thumbLeft.offsetWidth;
            if (newLeft > rightEdge) {
                newLeft = rightEdge;
            }


            var spanValue = newLeft * 5;
            console.log(spanValue);
            console.log(newLeft);
            minValue.innerHTML = "\u00A3" + " " + spanValue + ".00";
            thumbLeft.style.left = newLeft + 'px';
        }

        filter.onmouseup = function () {
            filter.onmousemove = filter.onmouseup = null;
        };
        return false;
    }
    thumbLeft.ondragstart = function () {
        return false;
    };


    thumbRight.onmousedown = function (e) {
        var thumbCoords = getCoords(thumbRight);
        var shiftX = e.pageX - thumbCoords.left;
        var rangeCoords = getCoords(range);

        filter.onmousemove = function (e) {

            var newLeft = e.pageX - shiftX - rangeCoords.left;
            var leftEdge = getCoords(thumbLeft).left - rangeCoords.left + thumbRight.offsetWidth;
            var rightEdge = range.offsetWidth - thumbRight.offsetWidth;
            if (newLeft > rightEdge) {
                newLeft = rightEdge;
            }

            if (newLeft < leftEdge) {
                newLeft = leftEdge;
            }
            console.log(newLeft);
            console.log(leftEdge);

            var spanValue = newLeft * 5;
            console.log(spanValue);
            console.log(newLeft);
            maxValue.innerHTML = "\u00A3" + " " + spanValue + ".00"
            thumbRight.style.left = newLeft + 'px';
        }

        filter.onmouseup = function () {
            filter.onmousemove = filter.onmouseup =  null;
        };
        return false;
    }

    function getCoords(elem) {
        var box = elem.getBoundingClientRect();

        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        };
    }
    return false;
})