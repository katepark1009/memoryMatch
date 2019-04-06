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

var suffleImages= []; //check

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
    $('.row1').empty();
    suffleCards(frontimages); 
    for(var i = 0 ; i < 18 ; i++ ) {
        var row1 = $('.row1');
        var cardcontainer = $('<div class="cardcontainer">');
        var card = $('<div class="card"></div>');
        var front = $('<div class="front"></div>');
        var back = $('<div class="back"></div>');
        var frontImg = $('<img class="frontimage"></img>')
        var backImg = $('<div class="backimage 1"></div>')
        var src = suffleImages[i]; //check
        var img = $(frontImg).attr("src", src)
        $(front).append(img);
        $(back).append(backImg);
        $(card).append(front, back);
        $(cardcontainer).append(card);
        row1.append(cardcontainer);    
    }
    $('.card').on('click','.back',card_clicked);
}
    
function suffleCards(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
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
    console.log('suffleimg',suffleImages); //front이미지 지우고 다시 만들기
    suffleCards(suffleImages); 
    reset_stats();
    display_stats();
    $('.back').show();
    // $('.card').css({"background-color":"#f9ca24"});
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
