$(document).ready(function(){
    //set base portion of request URL
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=BlUwnjsAJO1DKy8IZBvwGroJ6kicFbd9&q=";

    var otherParams = "&limit=25&offset=0&rating=G&lang=en"

    var firstButtonAdded = false;

    $(document).on("click", ".hero-button", heroClick);

    //on-click for search button
    function heroClick(){
        //when button is clicked, grab the users input from the search bar
        var input = $(this).text().toLowerCase();
        console.log(input);
        //build request URL with base, input and key
        var totalURL = queryURL + input + otherParams;

        //log totalURL
        console.log("totalURL is " + totalURL);

        //make api call
        $.ajax({
            url: totalURL,
            method: "GET",
            datatype: "application/json",
            header: {
                'Access-Control-Allow-Origin': '*'
            }
          })
            .then(function(response) {
            $("#gif-location").empty();
              var results = response.data;
              addImages(results);
                
              })
        };


    function addImages(results) {
        console.log(results);
              //loop results for first five responses
              for (var i = 0; i < results.length; i++) {
                var articleDiv = $("<div>");
                console.log(results[i].rating);
                
                var gifDiv = $("<div>");

                var rating = results[i].rating;
    
                var p = $("<figcaption>").text("Rating: " + rating);
    
                var heroImage = $("<img>");
                heroImage.addClass("gif");
                heroImage.attr("src", results[i].images.fixed_height_still.url);
                heroImage.attr("data-animate", results[i].images.fixed_height.url);                
                heroImage.attr("data-still", results[i].images.fixed_height_still.url);
                heroImage.attr("data-state", "still");
                
                gifDiv.prepend(p);
                gifDiv.prepend(heroImage);
    
                $("#gif-location").prepend(gifDiv);
                    
        }
    }
    $(document).on("click", ".gif", animateGif);
    
    function animateGif(){

        var state = $(this).attr("data-state");
        console.log(state);     
        var animate = $(this).attr("data-animate");
        console.log(animate);
        var still = $(this).attr("data-still");
        console.log(still);

        if(state === "still"){
          console.log("this is: " + this);
          $(this).attr("src", animate);
          $(this).attr("data-state", "animate");
        }
  
        if(state === "animate"){
          $(this).attr("src", still);
          $(this).attr("data-state", "still");
        }

    };



      $("#create-button").on("click", function(event) {
        event.preventDefault();

        var hero = $("#hero-input").val().trim();

        var a = $("<button>");

        a.addClass("hero-button btn btn-primary mt-2");
        if(firstButtonAdded) {
            a.addClass("ml-1");
        }
        a.text(hero);

        $("#buttons").append(a);

        $(document).on("click", ".hero-button", heroClick);

        firstButtonAdded = true;
      });
      
});