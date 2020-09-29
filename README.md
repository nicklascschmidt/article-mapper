# Article Mapper
Web application that allows users to visualize locations listed on a listicle blog post (like [this one](https://www.planetware.com/california/things-to-do-in-yosemite-national-park-us-ca-278.htm)). The app scans an article provided by the user and collects location data from each list item, then displays those locations to the user in a basic interactive map view.

## Motivation
When planning a trip, I always come across articles like [this](https://www.thecrazytourist.com/15-best-things-to-do-in-cape-elizabeth-maine/) (...and [this](https://www.tripping.com/guides/day-hikes-in-big-sur) and also [this](https://travel.usnews.com/rankings/best-places-to-visit-in-oregon/), and so on). Often I would find myself typing each location into Google Maps, switching from tab to tab, forgetting where the previous one was and re-copy/pasting over and over, so I figured it'd be helpful to have an app where you can input an article's URL and see a map view of those locations together.

## Status
*MVP complete, continuous development*. The app is live ([here](https://article-mapper.herokuapp.com/map)) and functional, but there is a TODO list of features (see below) and more logic needed to accommodate for variation in article structure.

## How To Use
When you have an article with locations that you'd like to see mapped out, navigate to the [Article Mapper live site](https://article-mapper.herokuapp.com/). The UI flow is simple and explained on site, but for clarity...
* Search Page-- user fills in the form with simple information from the article to help the app extract the location data from the article.
* Confirm Page-- user confirms that the extracted locations are the correct locations. Sometimes excess non-location oriented text is found (i.e. "Explore Yosemite"), in which case that excess text ("Explore") should be removed from the search.
* Map Page-- user interacts with map and clicks into location markers, and can edit, add, or remove locations as needed. User can also start a new search with a click of a button.

## Technologies
* React ([React Router](https://reactrouter.com/web/guides/quick-start), [Styled-Components](https://styled-components.com/docs))
* Redux ([Reselect](https://github.com/reduxjs/reselect), [Redux-Thunk Middleware](https://github.com/reduxjs/redux-thunk))
* [Leaflet](https://leafletjs.com/reference-1.6.0.html#marker) ([React-Leaflet](https://react-leaflet.js.org/docs/en/components), with [Mapbox](https://docs.mapbox.com/mapbox-gl-js/api/))
* [React-tooltip-lite](https://www.npmjs.com/package/react-tooltip-lite)
* NodeJS backend with Express
* [Cheerio](https://cheerio.js.org/)
* Axios
* Heroku deployment
* [Lodash](https://lodash.com/docs/4.17.15)
* [Google Places API](https://developers.google.com/places/web-service/search?hl=en_US)
* [Feather Icons](https://feathericons.com/)

## TODO
* Add more detail into the map popups (eg. pics, location summary, etc.) - see [G Places Details](https://developers.google.com/places/web-service/details)
* Add UI flow for confirming a location with multiple search results
* Improve scrape location detecting with NLP
    * Use location data to add to search `title` or for `locationbias`
* Add `locationbias` param for Google Places API call (see [here](https://developers.google.com/places/web-service/search?hl=en_US))
    * Search near coordinates of `determinedLocations` - get min/max
* Add loading screen when fetching location data in MapView
* Add Recent searches dropdown (if in localstorage)
    * Only show if localstorage recent searches exist
    * Add save button on Map view page (?)

## License
MIT © Nicklas Chen Schmidt

