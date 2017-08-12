var changeText;

$(function() {
    loadContainer();
    loadFooter();
    changeQuote();
});

function setTwitterShareButton() { 
  //Change twitter button on quote refresh
  var textToTweet = $("#quote").text();
  var href = "https://twitter.com/intent/tweet?text=" + textToTweet;
  $(".twitter-share").attr("href", href);
}

function loadContainer() { //Container animation
  $("#container").hide().delay(1000).show(700);
}

function loadFooter() { //Footer animation
  $("#footer").hide().delay(3000).show(1000, function(){
    changeQuote();
  });
}

function setColors() { //Calculating and changing color using HSL.
  var colorIndex = Math.floor(Math.random() * 359);
  var hslText = "hsl(" + colorIndex + ", 80%, 40%)";
  var shadowText = "hsl(" + colorIndex + ", 70%, 30%)";
  var quoteBgText = "hsl(" + colorIndex + ", 70%, 90%)";
  $(".one").css("background", hslText);
  //$("#container").css("background", "white");
  $("#quote").css("color", hslText);
  $(".two").css("box-shadow", "2px 2px 2px " + shadowText);
  //$(".one").css("text-shadow", "0.1px 0.1px 0.1px " + shadowText);
  $("#container").css("background", quoteBgText);
}


$("#nextButton").click(function() {
  changeQuote();
});

function getQuote() { //pulling data from JSON source
  $.ajax({
    url: 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
    cache: false,
    success: function(data) {
      var post = data.shift();
      changeText = post.content + "-- " + post.title;
    }
  });
}

function changeQuote()
{
  setColors();
  getQuote();
  $("#quote").hide(600, function() { //Animation and changing text
    $("#quote").html(changeText).delay(300);
  }).show(600, function(){
    setTwitterShareButton();
  });
}