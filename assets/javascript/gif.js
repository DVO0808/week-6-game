$(document).ready(function() {


            var topics = ["Beyonce", "Rihana", "Drake", "Prince", "John Legend"];

            function renderButtons() {

                // Deletes the topics prior to adding new topics (this is necessary otherwise you will have repeat buttons)
                $('#buttonsHere').empty();

                // Loops through the array of topics
                for (var i = 0; i < topics.length; i++) {

                    // Then dynamicaly generates buttons for each topic in the array

                    var b = $('<button>')
                    b.addClass('topic btn'); // Added a class 
                    b.attr('data-name', topics[i]); // Added a data-attribute
                    b.text(topics[i]); // Provided the initial button text
                    $('#buttonsHere').append(b); // Added the button to the HTML
                }
            }

            renderButtons();
            getApi();


            $('#addTopic').on('click', function() {

                // This line of code will grab the input from the textbox
                var newTopic = $('#topic-input').val().trim();

                // The movie from the textbox is then added to our array
                topics.push(newTopic);
                console.log(topics);

                // Our array then runs which handles the processing of our movie array
                renderButtons();
                getApi();

                $('#topic-input').val("")

                // We have this line so that users can hit "enter" instead of clicking on ht button and it won't move to the next page
                return false;
            })




            function getApi() {

                $('.topic').on('click', function() {
                    var topic = $(this).attr('data-name');

                    var api_Key = "&api_key=dc6zaTOxFJmzC";
                    var generalURL = "http://api.giphy.com/v1/gifs/search?q=";
                    var limit = "&limit=10"
                    var queryURL = generalURL + topic + api_Key + limit;
                    console.log(queryURL);
                    $('#gifsHere').empty();


                    // Creates AJAX call for the specific movie being 
                    $.ajax({
                        url: queryURL,
                        method: 'GET'
                    }).done(function(response) {


                        console.log(response);


                        var results = response.data;

                        for (var i = 0; i < results.length; i++) {

                            console.log("Result is:" + results[i]);

                            var gifDiv = $('<div class="gif">');

                            // Retrieves the Rating Data
                            var rating = results[i].rating.toUpperCase();

                            // Creates an element to have the rating displayed
                            var gifRating = $('<p class="text">').text("Gif Rating Is: " + rating);

                            // Displays the rating
                            gifDiv.append(gifRating);

                            // Creates an element to hold the image 
                            var image = $('<img class="gifs img-responsive">').attr("src", results[i].images.fixed_height_still.url);

                            $(image).attr("data-still", results[i].images.fixed_height_still.url);
                            $(image).attr("data-animate", results[i].images.fixed_height.url);
                            $(image).attr("data-state", 'still');

                            // Appends the image
                            gifDiv.append(image);

                            // Puts the entire Movie above the previous movies.
                            $('#gifsHere').prepend(gifDiv);

                        }


                        $('.gifs').on('click', function() {

                            var gifState = $(this).attr('data-state');

                            console.log("this is: " + this);
                            //console.log(this.class);
                            console.log("gif state is: " + gifState);

                            if (gifState == 'still') {
                                $(this).attr('src', $(this).data('animate'));
                                $(this).attr('data-state', 'animate');
                            } else {
                                $(this).attr('src', $(this).data('still'));
                                $(this).attr('data-state', 'still');
                            }



                        });


                    });

                });


            }
})