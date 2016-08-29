/**
 * Created by admin on 24.08.2016.
 */
var $item = $(".item-page");
function getBasketData() {
    return JSON.parse(localStorage.getItem('basket'));
}

function getTotalPriceData() {
    return JSON.parse(localStorage.getItem('total'));
}

function setBasketData(o) {
    localStorage.setItem("basket",JSON.stringify(o));
    return false
}

function setTotal(o) {
    localStorage.setItem("total",JSON.stringify(o));
    return false;
}

function addItemInBasket(e) {
    var $parent = $(e).parents(".container");
    var $basketData = getBasketData() || {};
    var $itemId = $(e).attr("data-id");
    var $itemName = $($parent).children(".description-item").children("h4").text();
    var $itemPrice = Number($($parent).children(".description-item").children(".price").text().replace("£",""));
    var $itemColor = $($parent).children(".color").children(".block-color.active").text();
    var $itemSize = $($parent).children(".size").children(".block-size.active").text();

    console.log($itemName);
    console.log(($itemPrice).toFixed(2));
    console.log($itemColor);

    if($basketData.hasOwnProperty($itemId) && $basketData[$itemId][2] == $itemColor && $basketData[$itemId][3] == $itemSize) {
        $basketData[$itemId][4] += 1;
    }

    else {
        $basketData[$itemId] = [$itemName,$itemPrice, $itemColor, $itemSize, 1];
    }



    setBasketData($basketData);
    return false;
}

function openBasket() {
    console.log("sadsadas");
    var basketData = getBasketData();
    var $bagContainer = $(".bag > .container");
    console.log($bagContainer);
    console.log(basketData);
    if(basketData !== 0) {
        for (var item in basketData) {
            $($bagContainer).append('<div class="bag-item clearfix" data-id="'+item+'"><a href="item.html" class="item"><figure class="image-of-item"><img src="img/catalog-item-img7.png" alt=""/></figure>                <span class="price">£'+basketData[item][1]+'</span><span class="new-price">£'+Number(basketData[item][1]*basketData[item][4]).toFixed(2)+'</span>            </a>            <div class="name-and-description">                <h5>'+basketData[item][0]+'</h5>            <div class="color">                <span>Color: </span><span class="color-name">'+basketData[item][2]+'</span>            </div>            <div class="size">                <span>Size: </span><span class="size-name">'+basketData[item][3]+'</span>            </div>            <div class="quantity">                <span>Quantity: </span><input type="number" min="1" value="'+basketData[item][4]+'">                </div>                <span class="remove">Remove item</span>            </div>            </div>')
        }
    }
}

function updateTotalPrice() {
    var $totalPrice = 0;
    var counter = 0;
    var basketData = getBasketData();
    var totalData = getTotalPriceData();
    for (var item in basketData) {
        $totalPrice += basketData[item][1]*basketData[item][4];
        console.log($totalPrice);
        counter += Number(basketData[item][4]);
    }
    totalData = [$totalPrice];
    setTotal(totalData);
    if(counter !== 0 && $totalPrice !== 0) {
        $("header a.bag").html('<i class="fa fa-shopping-bag"></i>Bag £ ' + $totalPrice.toFixed(2) + ' (' + counter + ')');
    }
    else {
        $("header a.bag").html('<i class="fa fa-shopping-bag"></i>Bag')
    }
    $(".total-price").text("£" + $totalPrice.toFixed(2));
}



