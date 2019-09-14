$(document).ready(initializeApp);

function initializeApp(){
    $('.modal').hide();
    $('.remote').hide();
    makeCard();
    display_stats();
    $('.gamestats').on('click','.reset', reset_game);
    $('.tvcontainer').on('click', '.speakerbtn', function(){
        toggle_sound();
        $('.speakerbtn').toggleClass("mutebtn");
    });
}
var first_card_clicked = null;
var first_card = null;
var second_card_clicked = null;
var second_card = null;
var total_possible_matches = 9;
var match_counter = 0;
var matches = 0;
var attempts = 0;
var accuracy = 0;
var games_played = 0;
var noClickable = false;
var player = null;
var mute = false;

var imagesList =  [
    "https://i.imgur.com/4FinmpC.png",
    "https://i.imgur.com/iRh9Y3b.png",
    "https://i.imgur.com/klgLFnR.png",
    "https://i.imgur.com/YhVQXh1.png",
    "https://i.imgur.com/yKiGw8S.png",
    "https://i.imgur.com/fzzpzFq.png",
    "images/twice23.png",
    "images/bts2.png",
    "images/exo2 (2).png"
]

var frontimages = imagesList.concat(imagesList);

var gifs = [
    "images/iugif1.gif",
    "images/blackpinkgif2.gif",
    "images/exogif2.gif",
    "images/btsgif.gif",
    "images/twicegif.gif",
    "images/mamamoogif.gif",
    "images/redvelvetgif.gif",
    "images/snsdgif.gif",
    "images/akmugif.gif"
];
var musicSrc = [
    "songs/akmu.mp3",
    "songs/blackpink.mp3",
    "songs/bts.mp3",
    'songs/exo.mp3',
    "songs/iu.mp3",
    "songs/mamamoo.mp3",
    "songs/redvelvet.mp3",
    "songs/snsd.mp3",
    "songs/twice.mp3"
]

var suffleImages= []; 

function display_stats () {
    if(match_counter === 0) {
        accuracy = "  0 %";
    } else {
        accuracy =  Math.floor(match_counter / attempts * 100) + "%";
    }
    $('.games-played .value').text(games_played);
    $('.attempts .value').text(attempts);
    $('.accuracy .value').text(accuracy);
}

function makeCard(){
    $('.cardset').empty();
    suffleCards(frontimages); 
    var suffleDeck;
    var suffle1 = suffleImages.slice(0,6);
    var suffle2 = suffleImages.slice(6,12);
    var suffle3 = suffleImages.slice(12,18);
    suffleDeck = [ suffle1, suffle2, suffle3 ];
    for(var j = 0 ; j < 3 ; j++ ) {
        var cardSet = $('.cardset');
        var newRow = $(`<div class="row cardRow"></div>`)
      for(var i = 0 ; i < 6 ; i++ ) {
          var cardcontainer = $('<div class="cardcontainer">');
          var card = $('<div class="card"></div>');
          var front = $('<div class="front"></div>');
          var back = $('<div class="back"></div>');
          var frontImg = $('<img class="frontimage" />')
          var backImg = $('<div class="backimage 1"></div>')
          var src = suffleDeck[j][i]; //check
          var img = $(frontImg).attr("src", src)
          $(front).append(img);
          $(back).append(backImg);
          $(card).append(front, back);
          $(cardcontainer).append(card);
          newRow.append(cardcontainer);    
      }
      cardSet.append(newRow);
    }
    $('.card').on('click','.back',card_clicked);
}
    
function suffleCards(a) {
    for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    suffleImages = a; 
}

function card_clicked(){
    if(games_played === 0) {
        games_played = 1;
    }
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
            $('.second_card').css("transform", "rotateY( 180deg )");
            $('.remote').fadeIn(900);
            $('.remote').fadeOut();
            match_counter++;
            var gif=null;
            switch (second_card_clicked) {
                case "images/akmu2.png":
                playSound(musicSrc[0]);
                gif = gifs[8];
                break;
                case "images/blackpink22.png":
                playSound(musicSrc[1]);
                gif = gifs[1];
                break;
                case "images/iu32.png":
                playSound(musicSrc[4]);
                gif = gifs[0];
                break;
                case "images/mamamoo2.png":
                playSound(musicSrc[5]);
                gif = gifs[5];
                break;
                case "images/redvelvet3.png":
                playSound(musicSrc[6]);
                gif = gifs[6];
                break;
                case "images/snsd22.png":
                playSound(musicSrc[7]);
                gif = gifs[7];
                break;
                case "images/twice23.png":
                playSound(musicSrc[8]);
                gif = gifs[4];
                break;
                case "images/bts2.png":
                playSound(musicSrc[2]);
                gif = gifs[3];
                break;
                case "images/exo2 (2).png":
                playSound(musicSrc[3]);
                gif = gifs[2];
                break;
            }
            $('.tvcover').css("background-image","url("+gif+')');
            if(match_counter === total_possible_matches) {
                $('.modal').show();
                $('.attemptresult').text(attempts+1);
                $('.accuracyresult').text(Math.floor(match_counter / (attempts +1 ) * 100) + "%");
                $('.modal').on('click','.retrybtn',function(){
                    reset_game();
                    $('.modal').hide();
                });
            }
            matches++;
            attempts++;
            $(this).hide();
            first_card.parent().css({"background-image":"url('images/purple.gif')"})
            second_card.parent().css({"background-image":"url('images/purple.gif')"})
            first_card_clicked = null;
            second_card_clicked = null;        
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
    matches++;
    attempts = 0;
    display_stats();
}

function reset_game(){
    games_played++;
    match_counter = 0;
    suffleCards(suffleImages); 
    reset_stats();
    display_stats();
    $('.back').show();
    $('.card').css({"background-image":'url("images/yellow.gif")'});
    $('.tvcover').removeAttr('style');
    $('.accuracy .value').text("0 %");
    makeCard();
    player.muted = true;
}
 
function playSound(src) {
    if (player) {
        player.pause();
    }
    player = new Audio(src);
    player.volume = .2;
    player.loop = true;
    if (!mute) {
        player.play();
    }
}

function toggle_sound(){
    $('.speakerbtn').css("background-img","url('images/white-speaker-muted-hi.png')");
    mute = !mute;
    player.muted = mute;
    if (!mute) {
        player.play();
    }
}
