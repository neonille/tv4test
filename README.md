Thanks for letting me do this test! This was challangeing but very fun :) 

`npm i` to install all the packages

`npm start` and the app will run at localhost:3000

Click on the side arrows to scroll and on a poster to load the movie

# A little about the app

## Components

`MoviesApp` - This is the main component that renders either a loadingspinner (thirdparty) or the main parts of the app (VideoPlayer and the MovieSlides)

``LoadingSpinner`` - Loading spinner is a functional component that returns a spinner and a "loading" text. It only has one property for the text to be rendered. The component covers the entire container and is centered.

``VideoPlayer`` - Only has one property, the source of the movie to be played. This property is checked in the componentDidUpdate-function to see if the source has changed, if it has, update the videoplayers source to play the new movie

*NOTE: The videoplayer does have some code for custom player controls but i didnt manage to finish it in time and contemplated to delete it but decided to keep it if anyone wants to take a look...*

## MovieSlider - Shows a panel of movies, if you click it, the videoplayer will update. 

``MovieSliderProps`` - Takes a callback function to change the movie. Used in index to relay it back to the VideoPlayer

``Panel`` - The panel to display, each panel contains all the items and title

``MovieSliderStates`` - Mainly used for the description box, where it should be rendered, and IF it should be rendered.



Child components - The MovieSlider has some functional child components. They are apart of the movieslider class to keep the references intact.

``Description`` - The descriptionbox, takes in the where, what and if it should be rendered. All of this is taken in the states of the MovieSlider comp.

``Arrow`` - The arrows at the edges of the MovieSlider. Has one prop, direction.

``PosterList`` - Shows the list of posters


# Improvements

The scrollarrows arent 100% according to design and i would like to improve them. There are some questions if for instance the list should autoscroll if the mouse is at the edges or not (irl i would have asked the stakeholders about this)

Support for different env

Finish the custom controls

The MoviesApp is a functinal component but could also have been a class component instead because of it size.

Implement some JEST tests

Improve the responsivenes

I discovered that Firefox seem to take issue with changing the video src directly. A rough solution could be to completely reload the entire videoplayer instead
(Chrome,Opera and edge works fine)
