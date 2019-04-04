$(document).ready(initializeApp);

function initializeApp(){
    suffleCards(frontimages);
    makeCard();
    display_stats();
    $('.card').on('click','.back',card_clicked);
    $('.reset').click(reset_game);
}

var first_card_clicked = null;
var first_card = null;
var second_card_clicked = null;
var second_card = null;
var total_possible_matches = 9; //total possible matches, 카드 4장일때는 2번
var match_counter = 0;
var matches = 0;
var attempts = 0;
var accuracy = 0;
var games_played = 0;
var noClickable = false;
console.log(frontimages);

var frontimages = [
    "images/akmu2.png",
    "images/blackpink22.png",
    "images/iu32.png",
    "images/mamamoo2.png",
    "images/redvelvet3.png",
    "images/snsd22.png",
    "images/twice23.png",
    "images/bts2.png",
    "images/exo2 (2).png",
    "images/akmu2.png",
    "images/blackpink22.png",
    "images/iu32.png",
    "images/mamamoo2.png",
    "images/redvelvet3.png",
    "images/snsd22.png",
    "images/twice23.png",
    "images/bts2.png",
    "images/exo2 (2).png"
]

function display_stats () {
    $('.games-played .value').text(games_played);
    $('.attempts .value').text(attempts);
    accuracy + "&percnt;";
    $('.accuracy .value').text(accuracy);
}

function makeCard(){
    for(var i = 0 ; i < 18 ; i++ ) {
        var row1 = $('.row1');
        var cardcontainer = $('<div class="cardcontainer">');
        var card = $('<div class="card"></div>');
        var front = $('<div class="front"></div>');
        var back = $('<div class="back"></div>');
        var frontImg = $('<img class="frontimage"></img>')
        var backImg = $('<div class="backimage 1"></div>')
        var src = frontimages[i];
        var img = $(frontImg).attr("src", src)
        $(front).append(img);
        $(back).append(backImg);
        $(card).append(front, back);
        $(cardcontainer).append(card);
        row1.append(cardcontainer);
    }
}
    
function suffleCards(arr) {
    //arr.sort(() => Math.random() - 0.5);
}
    

function card_clicked(){
    // if(games_played === 0) {
    //     games_played = 1;
// 
    if(noClickable) {
        return;
    }
    
    if(first_card_clicked === null){
        $(this).hide();
        first_card = $(this);
        first_card_clicked = $(this).prev().find(".frontimage").attr("src");
    } else {
        second_card = $(this);
        second_card_clicked = $(this).prev().find(".frontimage").attr("src");
        if(first_card_clicked === second_card_clicked) {
            match_counter++;
            matches++;
            attempts++;
            $(this).hide();
            first_card.parent().css({"background-color":"#a29bfe"})
            second_card.parent().css({"background-color":"#a29bfe"})
            first_card_clicked = null;
            second_card_clicked = null;
            if (match_counter === total_possible_matches) {
                console.log("matched!")
            }
        } else {
            noClickable = true;
            $(this).hide();
            attempts++;
            setTimeout(function(){
                first_card.show();
                second_card.show();
                noClickable = false;
            },2000);
            first_card_clicked = null;
            second_card_clicked = null;
        }
    }
    display_stats();
}

function reset_stats() {
    accuracy = 0;
    matches++;s
    attempts = 0;
    display_stats();
}

function reset_game(){
    games_played++;
    reset_stats();
    display_stats();
    $('.card').remove();
}