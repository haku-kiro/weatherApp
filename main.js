//this works - but if you say no it does not - use permission query

//creating the function with a callback to get geolocation data
var currentTempStan = 'c';
var gTemp;

var geo_options = {
  enableHighAccuracy: true, 
  maximumAge        : 30000, 
  timeout           : 27000
};

function getLocation(callback) 
{
	if (navigator.geolocation) 
	{
        navigator.geolocation.getCurrentPosition(function(position)
        	{
            	callback(position.coords.latitude, position.coords.longitude)
        	}, function (){ alert("error");},geo_options);
    } 
    else 
    {
        //we could return unkown - or we could return a default value to the callback method     
        //return "Unknown";
        callback(-25.765, 28.2169);
    }
}

//our method that gets the data from the api (using a jquery get method)
function popData(fLat, fLon){
	var rqUrl = "https://fcc-weather-api.glitch.me/api/current?lat=" + fLat + "&lon="+ fLon; 
	$.get(rqUrl, function(data) {
		
		var temp = data.main.temp;
		var iconUrl = data.weather[0].icon;
		var hiTemp = data.main.temp_min;
		var lowTemp = data.main.temp_max;
		var location = data.name;
		var weatherDescription = data.weather[0].description;
        var country = data.sys.country;
        gTemp = temp; //just returning the temp to the global variable
          
        document.getElementById("tempId").innerHTML = Math.round(temp) + "°C"; //celcius by default
        document.getElementById("weatherImgId").setAttribute("src", iconUrl);
        document.getElementById("weatherDes").innerHTML = weatherDescription;
        document.getElementById("locationId").innerHTML = location +", "+ country;
        
		//console.log(temp);
	});
}


//when we call the function we pass it an anon method that will pass the lat and lon to the popData method
getLocation(function(lat, lon) 
{
    //when we get the data - we can use our popData (populate data method)
    popData(lat, lon);
    
});


//function to change to c and f
function tempConversion(temp, currentStan)
{
    if (currentStan == 'c')
    {
        var f = Math.round((temp * 9/5) + 32);
        document.getElementById('tempId').innerHTML = f + "°F";
        currentTempStan = 'f'; //set the temp standard to f
        gTemp = f; //change the global value for temp to equal the new temp in this measurment
    }
    else if(currentStan == 'f')
    {
        var c = Math.round((temp - 32) * 5/9);
        document.getElementById('tempId').innerHTML = c + "°C";
        currentTempStan = 'c';
        gTemp = c;
    }
}
		

