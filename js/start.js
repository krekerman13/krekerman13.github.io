/**
 * Created by admin on 31.07.2016.
 */
var main = function() {

    openBasket();

    //Робота з мобільним фільтром
    function dragAndDrop(){
        console.log("3234324");
        DragController.onDragCancel = function(dragObject) {
            dragObject.avatar.rollback();
        };

        DragController.onDragEnd = function(dragObject, dropElem) {
            dragObject.elem.style.display  = "none";
            dragObject.elem.classList.add('selected');
            var li = document.createElement('li');
            var text = dragObject.elem.innerHTML;
            li.innerHTML = text;
            var par =  dragObject.parent;
            var firstSpan = par.childNodes[0];

            var parentOfParent = par.parentNode.parentNode;
            var menuDiv = parentOfParent.getElementsByClassName(par.classList[0])[0];
            var menuSpan = menuDiv.getElementsByClassName("selected-filters")[0];
            par.insertBefore(li,firstSpan);
            li.classList.add("selected");
            par.classList.add("selected");
            menuDiv.classList.add("selected")
            menuSpan.innerHTML += text;
            console.log(dragObject.elem.innerHTML);
            console.log(dragObject.parent);
        };
    }

    //Генератор ID Товарів
    var $dataId = Number($(".btn.btn-add").attr("data-id"));
    function idItemGenerator() {
        if($(".block-size.active").attr("data-size") == 52) {
            if($(".block-color.active").attr("data-color") == "black"){
                $(".btn.btn-add").attr("data-id", $dataId+1);
            }
            if($(".block-color.active").attr("data-color") == "blue"){
                $(".btn.btn-add").attr("data-id",$dataId+2);
            }
        }
        if($(".block-size.active").attr("data-size") == 45) {
            if($(".block-color.active").attr("data-color") == "black"){
                $(".btn.btn-add").attr("data-id", $dataId+3);
            }
            if($(".block-color.active").attr("data-color") == "blue"){
                $(".btn.btn-add").attr("data-id",$dataId+4);
            }
        }
        if($(".block-size.active").attr("data-size") == "52L") {
            if($(".block-color.active").attr("data-color") == "black"){
                $(".btn.btn-add").attr("data-id", $dataId+5);
            }
            if($(".block-color.active").attr("data-color") == "blue"){
                $(".btn.btn-add").attr("data-id",$dataId+6);
            }
        }
    }


    $(".dot").click(function() {
       if($(this).hasClass("dot1")){
           $(".slide").fadeOut('fast');
           $(".slide1").fadeIn('slow');
           $(".dot").removeClass("active-dot");
           $(this).addClass("active-dot");
       }
        if($(this).hasClass("dot2")){
            $(".slide").fadeOut('fast');
            $(".slide2").fadeIn('slow');
            $(".dot").removeClass("active-dot");
            $(this).addClass("active-dot");
        }
        if($(this).hasClass("dot3")){
            $(".slide").fadeOut('fast');
            $(".slide3").fadeIn('slow');
            $(".dot").removeClass("active-dot");
            $(this).addClass("active-dot");
        }
    });
    
    $(".right-arrow").on("click", function () {
        var currentSlide = $(".active-img");
        var nextSlide = currentSlide.next();
        var currentDot = $(".active-dot");
        var nextDot = currentDot.next();

        if (nextSlide.length == 0) {
            nextSlide = $(".slide").first();
            nextDot = $(".dot").first();
        }

        currentSlide.removeClass("active-img");
        nextSlide.addClass("active-img");
        currentDot.removeClass("active-dot");
        nextDot.addClass("active-dot");
    })

    $(".left-arrow").on("click", function () {
        var currentSlide = $('.active-img');
        var prevSlide = currentSlide.prev();

        var currentDot = $('.active-dot');
        var prevDot = currentDot.prev();

        if(prevSlide.length === 0) {
            prevSlide = $('.slide').last();
            prevDot = $('.dot').last();
        }

        currentSlide.removeClass('active-img');
        prevSlide.addClass('active-img');

        currentDot.removeClass('active-dot');
        prevDot.addClass('active-dot');

    })
    
    $(".main-menu-icon-mobile").on("click",function(){
        $(".main-menu").slideToggle();
        $(this).toggleClass("active");
    })

    // Відкриття випадаючого списку фільтру
    $(".icon-filter").on("click",function(){
        if( $(this).parents(".filter").hasClass("active")) {
            $(this).parents(".filter").removeClass("active");
            if($(this).parents(".filter").hasClass("filter-by-price")){
                if($(".filter-by-style").hasClass("selected")){
                    $(".filters").addClass("left");
                }
                else {
                    $(".filters").removeClass("active left right");
                }
            }
        }
        else {
            if($(".filter-by-price").hasClass("active")) {
                $(".filter").removeClass("active");
                $(".filter-by-price").addClass("active");
            }
            else {
                $(".filter").removeClass("active");
            }
            $(this).parents(".filter").addClass("active");
            if($(this).parents(".filter").hasClass("filter-by-price")){
                if($(".filter-by-style").hasClass("selected")){
                    $(".filters").addClass("active").removeClass("left");
                }
                else {
                    $(".filters").addClass("active right");
                }
            }
        }

    })
        //Закриття фільтру по кліку поза його зоною
    $(document).on("click",function(e){
        if((!(e.target).closest(".filter.active")) && (!((e.target).closest(".icon-filter")))) {
            if ($(".filter").hasClass("filter-by-price active")) {
                $(".filter").removeClass("active");
                $(".filter.filter-by-price").addClass("active")
            }
            else {
                $(".filter").removeClass("active");
            }
        }
    })
    // Вибір елементів фільтру
    $(".multiselect.desktop ul li").on("click",function() {
        $(this).toggleClass("selected");
        if($(this).hasClass("selected")){
            $(this).parents(".filter").children(".selected-filters").append($(this).text()+" ," );
        }
        else {
            $(this).parents(".filter").children(".selected-filters").html($(this).parents(".filter").children(".selected-filters").html().replace($(this).text()+" ,"  , ""));
        }



        if($(this).parents(".filter").children(".selected-filters").text().length > 0) {
            $(this).parents(".filter").addClass("selected");
            if($(this).parents(".filter").hasClass("filter-by-style")){
                if($(".filter-by-price").hasClass("active")){
                    $(".filters").addClass("active").removeClass("right");
                }
                else {
                    $(".filters").addClass("active").addClass("left");
                }
            }
        }

        else {
            $(this).parents(".filter").removeClass("selected");
            if($(this).parents(".filter").hasClass("filter-by-style")){
                if($(".filter-by-price").hasClass("active")){
                    $(".filters").removeClass("left").addClass("right");

                }
                else {
                    $(".filters").removeClass("active left right");
                }

        }
    }})


    //Робота із мобільним фільтром
    $(".filters .mobile-icon").on("click", function () {
        $(".multiselect.mobile").slideToggle();
        $(this).toggleClass("active");
        $("#podlogka").toggleClass("active");
    })



    $(".btn-more").on("click",function(){
        $(".hidden").slideToggle();
        if($(this).text() == "Show more"){
            $(this).text("Hide");
            $(this).addClass("active");

        }
        else {
            $(this).text("Show more");
            $(this).removeClass("active");
        }
    });



    //При натисненні на активний фільтр
    $(".multiselect.mobile").on("click","li.selected", function () {
        var $classOfFilter = $(this).parents("ul").attr('class').split(' ')[0];
        //Робимо елемент активнтим для переносу
        $(this).removeClass("selected").addClass("draggable");
        console.log($classOfFilter)
        //Видаляємо позицію з головного меню фільтру
        $(this).parents(".filters").children(".container").children('.'+$classOfFilter).children(".selected-filters").html($(this).parents(".filters").children(".container").children('.'+$classOfFilter).children(".selected-filters").html().replace($(this).text(),""));
        console.log($(this).parents(".filters").children(".container").children('.'+$classOfFilter).children(".selected-filters").text().length);
        //Якщо фільтрів не вибрано, повертаємо заголовок фільтру
        if($(this).parents(".filters").children(".container").children('.'+$classOfFilter).children(".selected-filters").text().length  == 0){
            $(this).parents(".filters").children(".container").children('.'+$classOfFilter).removeClass("selected");
        }

        console.log($(this)== $(this).parents("ul").children("li:first-child"));
        console.log($(this).is(":first-child"));
        console.log($(this).parents("ul").children("li:first-child")[0]);
        //Якщо елемент на першому місці, переміщаємо в кінець
        if($(this).is(":first-child")) {
            $(this).insertAfter($(this).parents("ul").children("li:last-child")[0]);
        }
        //Якщо фільтри не вибрано, повертаємо значення Ноу-селектед
        if($(this).parents("ul").children("li:first-child")[0].classList[0] != "selected"){
            $(this).parents("ul").removeClass("selected");
            $(this).parents("ul").children(".no-selected").insertAfter($(this).parents("ul").children("li:first-child")[0]);
        }

    })


    //Світчер зображень
    $(".img-item").on("click", function () {
        var $src = $(this).children("img").attr("src");
        var $img = $(this).parents(".preview").children(".main-img").children("img");
        $(".img-item").removeClass("active");
        $(this).addClass("active");
        console.log($src);
        console.log( $(this).parents(".preview").children(".main-img").children("img"));
        $($img).fadeOut('slow');

        setTimeout(function(){
            $($img).attr("src",$src);
        },600);
        setTimeout(function () {
            $($img).fadeIn('slow');
        },400);
    })



    //Вибір розміру та кольору
    $(".block-size").on("click", function () {
        if($(this).hasClass("active")) {
            $(".block-size").removeClass("active");
            $(this).addClass("active")
        }
        else{
            $(".block-size").removeClass("active");
        }
        $(this).toggleClass("active");
        if($(".btn-add").hasClass("active")){
            $(".btn-add").removeClass("active").addClass("disabled").text("Add to bag");
        }
        idItemGenerator();
    })

    $(".block-color").on("click", function () {
        if($(this).hasClass("active")) {
            $(".block-color").removeClass("active");
            $(this).addClass("active");
        }
        else{
            $(".block-color").removeClass("active");
        }
        if($(".btn-add").hasClass("active")){
            $(".btn-add").removeClass("active").addClass("disabled").text("Add to bag");
        }
        $(this).toggleClass("active");
        idItemGenerator();
    })

    $(".btn-add").on("click", function () {
        if($(".block-color").hasClass("active") && $(".block-size").hasClass("active")){
            $(this).text("Product added");
            setTimeout(function(){
                $(".btn-add").text("Add to bag");
            },300);
            addItemInBasket(this);
            updateTotalPrice();
        }

    })

    //Зміна кількості товару в кошику
    $(".quantity input").on("change", function(){
       var $price =  $(this).parents(".bag-item").children(".item").children("span.price").text();
        var $newPrice = $(this).parents(".bag-item").children(".item").children("span.new-price");
        var $val = $(this).val();
        var basketData = getBasketData();
        var id = $(this).parents(".bag-item").attr("data-id");
        var $priceNumber = $price.replace("£","");
        if ($val > 0) {
            basketData[id][4] = $val;
            setBasketData(basketData);
            $price = $priceNumber * $val;
            $($newPrice).text("£ " + $price.toFixed(2));
        }
        if ($val <= 0) {
            $val = 1;
            $(this).val($val);
            $price = $priceNumber * $val;
            $($newPrice).text("£ " + $price.toFixed(2));
        }
        updateTotalPrice();
    })

    function isBagClear(){
        if ($(".bag-item").length == 0) {
            $(".clearbag").fadeIn("slow");
            $(".bag-controls").fadeOut('fast');
        }
    }

    $(".remove").on("click", function () {
        var $id = $(this).parents(".bag-item").attr("data-id");
        var basketData = getBasketData();
        delete basketData[$id];
        $(this).parents(".bag-item").remove();
        setBasketData(basketData);
        if ($(".bag-item").length == 0) {
            localStorage.removeItem('basket');
        }
        updateTotalPrice();
        isBagClear();
    })

    $(".empty-bag").on("click", function () {
        $(".bag-item").remove();
        localStorage.removeItem('basket');
        isBagClear();
        updateTotalPrice();
    })

    $(".btn-buy").on("click", function () {
        $(".clearbag").css("display","none");
        $(".order-sent").fadeIn("slow");
        $(".bag-item").remove();
        localStorage.removeItem('basket');
        $(".bag-controls").fadeOut('fast');
        updateTotalPrice();

    })


    updateTotalPrice();
    isBagClear();
    dragAndDrop();




}
$(document).ready(main);
