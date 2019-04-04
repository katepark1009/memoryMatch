$(document).ready(initializeApp);

function initializeApp(){
    $('.card').on('click','.back',card_clicked);
    var row1 = $('.row1');
    row1.append('<div class="cardcontainer">');
    $('<div class="cardcontainer">').append('<div class="card"></div>');
    $('<div class="card"><div>').append('<div class="front"></div>, <div class="back"></div>')

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
var matches = 0;
var attempts = 0;
var accuracy = 0;
var game_played = 0;



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
                console.log("matched!")
            }
        } else {
            $(this).hide();
            setTimeout(function(){
                setTimeout(function(){
                    first_card.show();
                    second_card.show();
                },1000);
            },1000);
            first_card_clicked = null;
            second_card_clicked = null;
            return;
        }
    }
}


function display_stats () {
    $('.games-played .value').text(games_played);
    $('.attempts .value').text(attempts);
    accuracy + "&percnt;";
    $('.accuracy .value').text(accuracy);
}


function reset_stats () {
    accuracy = 0;
    matches = 0;
    display_stats();
}

$('.gamestats').on('click', '.reset', function(){
    games_played++;
    reset_stats();
    display_stats();
    $('.back').remove();
});