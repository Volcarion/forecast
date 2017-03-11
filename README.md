# Weather Service App

This program has a list of cities and will display a map and the *current conditions* of the location

1. It has a dropdown menu to select a city
2. Displays a map of the selected city
3. Displays current conditions of the selected city

Images by [VClouds](http://vclouds.deviantart.com/art/VClouds-Weather-Icons-179152045)

```javascript
if(wsc.windBearing>=11.25 && wsc.windBearing <= 33.75){
                            wsc.windBearing = "NNE";
                        }
                        else if(wsc.windBearing>=33.75 && wsc.windBearing <= 56.25){
                            wsc.windBearing = "NE";
                        }
                        else if(wsc.windBearing>=56.25 && wsc.windBearing <= 78.75){
                            wsc.windBearing = "ENE";
                        }
                        else if(wsc.windBearing>=78.75 && wsc.windBearing <= 101.25){
                            wsc.windBearing = "E";
                        }
                        else if(wsc.windBearing>=101.25 && wsc.windBearing <= 123.75){
                            wsc.windBearing = "ESE";
                        }
                        else if(wsc.windBearing>=123.75 && wsc.windBearing <= 146.25){
                            wsc.windBearing = "SE";
                        }
                        else if(wsc.windBearing>=146.25 && wsc.windBearing <= 168.75){
                            wsc.windBearing = "SSE";
                        }
                        else if(wsc.windBearing>=168.75 && wsc.windBearing <= 191.25){
                            wsc.windBearing = "S";
                        }
                        else if(wsc.windBearing>=191.25 && wsc.windBearing <= 213.75){
                            wsc.windBearing = "SSW";
                        }
                        else if(wsc.windBearing>=213.75 && wsc.windBearing <= 236.25){
                            wsc.windBearing = "SW";
                        }
                        else if(wsc.windBearing>=236.25 && wsc.windBearing <= 258.75){
                            wsc.windBearing = "WSW";
                        }
                        else if(wsc.windBearing>=258.75 && wsc.windBearing <= 281.25){
                            wsc.windBearing = "W";
                        }
                        else if(wsc.windBearing>=281.25 && wsc.windBearing <= 303.75){
                            wsc.windBearing = "WNW";
                        }
                        else if(wsc.windBearing>=303.75 && wsc.windBearing <= 326.25){
                            wsc.windBearing = "NW";
                        }
                        else if(wsc.windBearing>=326.25 || wsc.windBearing <= 348.75){
                            wsc.windBearing = "NNW";
                        }
                        else {
                            wsc.windBearing = "N";
                        }
```