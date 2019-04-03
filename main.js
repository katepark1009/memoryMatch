$(document).ready(initializeApp);

function initializeApp(){
    $('.card').on('click','.back',card_clicked);

}

var first_card_clicked = null;
var first_card = null;
var second_card_clicked = null;
var second_card = null;
var total_possible_matches = 2; //total possible matches, 카드 4장일때는 2번
var match_counter = 0;
var frontimages = [
    "images/akmu2.png",
    "images/blackpink22.png"
]

function card_clicked(){
    if(first_card_clicked === null){
        $(this).hide();
        first_card = $(this);
        first_card_clicked = $(this).prev().find(".frontimage").attr("src");
        console.log("first card", first_card);
        console.log("first card clicked",first_card_clicked);
        return;
    } else {
        second_card = $(this);
        second_card_clicked = $(this).prev().find(".frontimage").attr("src");
        if(first_card_clicked === second_card_clicked) {
            match_counter++;
            $(this).hide();
            first_card_clicked = null;
            second_card_clicked = null;
            if (match_counter === total_possible_matches) {
                alert("Won!");
            }
        } else {
            $(this).hide();
            setTimeout(function(){
                $(this).hide();
                setTimeout(function(){
                    first_card.show();
                    second_card.show();
                },500);
            },1000);
            first_card_clicked = null;
            second_card_clicked = null;
            return;
        }
    }
}


