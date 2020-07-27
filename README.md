# article-mapper
Scans articles with location data and displays a map of those locations.

## TODO
* figure out locationbias to look near the coordinates of the determinedLocations
* fix the confirm locations flow
    * update initially on form submit
    * then update for each individual action
        * if text field is edited, offer submit checkmark -- when that's submitted, update redux and search for that location
