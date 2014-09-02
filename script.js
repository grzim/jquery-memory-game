/**
 * Created by Grzegorz on 2014-09-01.
 */


function shuffle(array) {
    var counter = array.length, temp, index;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

var images=[];
(function init(){
    for(var i=1;i<21;i++) {
        $(".main-menu").append('<li role="presentation"><a role="menuitem" tabindex=" - 1" href="#">'+i+'</a></li>');
    }
    for(var i=0;i<20;i++){
        images[i] = "images/cake_" + (i+1) +'.png';
    }
})();


$(".main-menu > li > a").on("click", function(){
    console.log($(this).text())
    var text = $(this).text();
    $(".dropdown-config > .text").text(text);
})
$('#generate').on('click',function(){

    var number = $(".dropdown-config > .text").text() || 0;
    if(number!=0) {
        $(".main-container .card").detach();
        $(".main-container .text").text("");
        console.log(number);
        for (var i = 0; i < number * 2; i++) {
            var card = ( number > 8 ? '<div class="col-xs-6 col-md-2 card on-table small"></div>' : '<div class="col-xs-6 col-md-3 on-table card big"></div>');
            $(".main-container").append(card);
        }
        var cards = $(".main-container .card");
        var imagesTemp = [];
        for(var i=0;i<number;i++){
            imagesTemp.push(images[i]);
        }
        var imagesTemp = shuffle(imagesTemp.concat(imagesTemp));
        for (var i = 0; i < number * 2; i++) {
            var rand = Math.floor(Math.random() * number);
            $(cards[i]).data('background-img', 'url(' + imagesTemp[i] + ')');
            $(cards[i]).data('id', i);
        }

        var cardsShowed = 0;
        var $that = $(".main-container");
        $(".card").on("click", function () {
            if (cardsShowed < 2) {
                var $this = $(this);
                if(!(cardsShowed==1 && $this.data('id')==$that.data('id'))) {
                    cardsShowed++;
                    var bck = $this.data("background-img");
                    $this.css('background-image', bck);
                    if (cardsShowed == 2) {
                        if ($this.css('background-image') === $that.css('background-image')) {
                            var timeout = setTimeout(function () {
                                $this.off('click').css({"opacity": 0, "cursor": "initial"}).removeClass("on-table");
                                $that.off('click').css({"opacity": 0, "cursor": "initial"}).removeClass("on-table");
                                cardsShowed = 0;
                                if($(".on-table").length==0){
                                    $(".dropdown-config > .text").text("Congratulations!");
                                }
                            }, 500);
                        }
                        else {
                            var timeout = setTimeout(function () {
                                $this.css('background-image', "none");
                                $that.css('background-image', "none");
                                cardsShowed = 0;
                            }, 1000);
                        }
                    }
                    else {
                        $that = $this;
                    }
                }
            }
        })
    }
});
