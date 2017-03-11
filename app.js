angular.module("ForecastApp", [])
    .controller("WeatherServiceController", ["$scope", "$http", 
        "GoogleGeolocationService", "DarkSkyWeatherService",
        function($scope, $http, 
                 GoogleGeolocationService,
                 DarkSkyWeatherService){
	   
            var wsc = this;
            
            wsc.selected_lat = 0;
            wsc.selected_lon = 0;
        
            //key: AIzaSyAGHmbe7NUenBdXxzsrmr7uyU0c33gGO3c

            //App name    
            wsc.app_name = "Weather App";

            $http.get("cities.json").then(function (response) {
            wsc.mydata = response.data;
            });

            wsc.cities = 
			[
				{
					name : "Amarillo",
					url_name : "Amarillo",
					state : "TX",
					lat : 0,
					lon : 0
				},
				{
					name : "Anchorage",
					url_name : "Anchorage",
					state : "AK",
					lat : 0,
					lon : 0
				},
				{
					name : "Denver",
					url_name : "Denver",
					state : "CO",
					lat : 0,
					lon : 0
				},
				{
					name : "Little Rock",
					url_name : "Little Rock",
					state : "AR",
					lat : 0,
					lon : 0
				},
				{
					name : "Missoula",
					url_name : "Missoula",
					state : "MT",
					lat : 0,
					lon : 0
				}
			]; 
            
            wsc.getLatLonForSelected = function(){
                GoogleGeolocationService.geoLocate(wsc.selected_city)
                    .then(function(res){
                        wsc.selected_lat = res.data.results[0].geometry.location.lat;
                        wsc.selected_lon = res.data.results[0].geometry.location.lng;
                        
                        wsc.selected_city.lat = wsc.selected_lat;
                        wsc.selected_city.lon = wsc.selected_lon;
                        
                        //var google_static_maps_key = "AIzaSyCujIo2lt0ynHxp1-6df_o_QekmKese6mo";
                        var google_static_maps_key = "AIzaSyCujIo2lt0ynHxp1-6df_o_QekmKese6mo";
                        
                        wsc.google_static_maps_url = "https://maps.googleapis.com/maps/api/staticmap?center=" +
                                                     wsc.selected_lat + "," +
                                                     wsc.selected_lon + 
                                                     "&zoom=10&size=600x300&key=" +
                                                     google_static_maps_key;
                                                     
                        console.log("Google Static Map API URL");
                        console.log(wsc.google_static_maps_url);                        
                        
                        //console.log(res);
                        
                        wsc.getCurrentConditions();        
                        
                    })
                    .catch(function(err){
                        console.log(err);
                    });
            };
            //Wind Direction calculations from http://climate.umn.edu/snow_fence/components/winddirectionanddegreeswithouttable3.htm
            wsc.getCurrentConditions = function(){
                DarkSkyWeatherService.getCurrentConditions(wsc.selected_city)
                    .then(function(res){
                        console.log(res);
                        wsc.observation_time = new Date(res.data.currently.time * 1000);
                        wsc.temperature = res.data.currently.temperature;
                        wsc.dewPoint = res.data.currently.dewPoint;
                        wsc.windBearing = res.data.currently.windBearing;
                        wsc.windSpeed = res.data.currently.windSpeed;
                        wsc.summary = res.data.currently.summary;
                        wsc.celsius = parseFloat((wsc.temperature - 32) / 1.8).toFixed(2);
                        wsc.dewPointCelsius = parseFloat((wsc.dewPoint - 32) / 1.8).toFixed(2);
                        wsc.icon = res.data.currently.icon;
                        
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
                        //all images except tornado from http://vclouds.deviantart.com/art/VClouds-Weather-Icons-179152045
                        //tornado from https://pixabay.com/en/tornado-storm-wind-rotation-46793/
                        if(wsc.icon == "clear-day"){
                            wsc.image = "images/clearDay.png";
                        }
                        else if(wsc.icon == "clear-night"){
                            wsc.image = "images/clearNight.png";
                        }
                        else if(wsc.icon == "rain"){
                            wsc.image = "images/rain.png";
                        }
                        else if(wsc.icon == "snow"){
                            wsc.image = "images/snow.png";
                        }
                        else if(wsc.icon == "sleet"){
                            wsc.image = "images/sleet.png";
                        }
                        else if(wsc.icon == "wind"){
                            wsc.image = "images/windy.png";
                        }
                        else if(wsc.icon == "fog"){
                            wsc.image = "images/fog.png";
                        }
                        else if(wsc.icon == "cloudy"){
                            wsc.image = "images/cloudy.png";
                        }
                        else if(wsc.icon == "partly-cloudy-day"){
                            wsc.image = "images/cloudyDay.png";
                        }
                        else if(wsc.icon == "partly-cloudy-night"){
                            wsc.image = "images/cloudyNight.png";
                        }
                        else if(wsc.icon == "hail"){
                            wsc.image = "images/hail.png";
                        }
                        else if(wsc.icon == "thunderstorm"){
                            wsc.image = "images/thunderstorm.png";
                        }
                        else if(wsc.icon == "tornado"){
                            wsc.image = "images/tornado.png";
                        }
                        else {
                            wsc.image = "images/clearDay.png";
                        }
                        
                    })
                    .catch(function(err){
                        
                    });
            };
            
            wsc.selected_city = wsc.cities[0];
            wsc.getLatLonForSelected();
            //wsc.getCurrentConditions();            

            
    }])
    .directive('myConditions', ['$sce', function($sce){
        
        //a reminder on naming conventions for directives: 
        //https://medium.com/@cironunesdev/angularjs-how-to-name-directives-118ac44b81d4#.idz35zby4

        /* https://docs.angularjs.org/guide/directive
        The restrict option is typically set to:

        'A' - only matches attribute name
        'E' - only matches element name
        'C' - only matches class name
        'M' - only matches comment
        */
        
        return{
            restrict: 'E',
            scope: true,
            templateUrl: $sce.trustAsResourceUrl('currentConditions.html')
        }
    }])
    .factory('GoogleGeolocationService', ['$sce', '$http', 
        function($sce, $http){
            //https://docs.angularjs.org/api/ng/service/$sce
            
            //create an empty object
            var geolocationService = {};
            
            //Google Maps Geocoding API key   
            var key = "AIzaSyAGHmbe7NUenBdXxzsrmr7uyU0c33gGO3c";
            
            geolocationService.geoLocate = function(location){

                var address = "+" + location.name + ",+" + location.state;
                var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" +
                          address + "&key=" + key;

                var trustedurl = $sce.trustAsResourceUrl(url);
                return $http.get(trustedurl);
            };
            
            return geolocationService;            
            
        }])
    .factory('DarkSkyWeatherService',['$sce', '$http', 
        function($sce, $http){
            //work happens here
            
            var darkSkyWeatherService = {};
            
            //DarkSky API key
            var key = "ff0e9220be49b46d617bd3a58bb3a09d";
            
            darkSkyWeatherService.getCurrentConditions = function(location){
                
                var url = "https://api.darksky.net/forecast/" +
                          key + "/" + location.lat + "," + location.lon;
                          
                console.log("DarkSky API URL:");
                console.log(url);
                
                var trustedurl = $sce.trustAsResourceUrl(url);
                return $http.jsonp(trustedurl, {jsonpCallbackParam: 'callback'});
                
            };
            
            return darkSkyWeatherService;
        }
    ]);
    
    
    
    
    
    

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    