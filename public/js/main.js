jQuery(document).ready(function($){
	//set your google maps parameters
	var latitude = 32.075530,
		longitude = 34.775082,
		map_zoom = 18;

	//google map custom marker icon - .png fallback for IE11
	var is_internetExplorer11= navigator.userAgent.toLowerCase().indexOf('trident') > -1;
	var marker_url = ( is_internetExplorer11 ) ? 'img/cd-icon-location.png' : 'img/cd-icon-location.svg';
		
	//define the basic color of your map, plus a value for saturation and brightness
	var	main_color = '#2d313f',
		saturation_value= -20,
		brightness_value= 5;

	//we define here the style of the map
	var style= [ 
		{
			//set saturation for the labels on the map
			elementType: "labels",
			stylers: [
				{saturation: saturation_value}
			]
		},  
	    {	//poi stands for point of interest - don't show these lables on the map 
			featureType: "poi",
			elementType: "labels",
			stylers: [
				{visibility: "off"}
			]
		},
		{
			//don't show highways lables on the map
	        featureType: 'road.highway',
	        elementType: 'labels',
	        stylers: [
	            {visibility: "off"}
	        ]
	    }, 
		{ 	
			//don't show local road lables on the map
			featureType: "road.local", 
			elementType: "labels.icon", 
			stylers: [
				{visibility: "off"} 
			] 
		},
		{ 
			//don't show arterial road lables on the map
			featureType: "road.arterial", 
			elementType: "labels.icon", 
			stylers: [
				{visibility: "off"}
			] 
		},
		{
			//don't show road lables on the map
			featureType: "road",
			elementType: "geometry.stroke",
			stylers: [
				{visibility: "off"}
			]
		}, 
		//style different elements on the map
		{ 
			featureType: "transit", 
			elementType: "geometry.fill", 
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		}, 
		{
			featureType: "poi",
			elementType: "geometry.fill",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		},
		{
			featureType: "poi.government",
			elementType: "geometry.fill",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		},
		{
			featureType: "poi.sport_complex",
			elementType: "geometry.fill",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		},
		{
			featureType: "poi.attraction",
			elementType: "geometry.fill",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		},
		{
			featureType: "poi.business",
			elementType: "geometry.fill",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		},
		{
			featureType: "transit",
			elementType: "geometry.fill",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		},
		{
			featureType: "transit.station",
			elementType: "geometry.fill",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		},
		{
			featureType: "landscape",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
			
		},
		{
			featureType: "road",
			elementType: "geometry.fill",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		},
		{
			featureType: "road.highway",
			elementType: "geometry.fill",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		}, 
		{
			featureType: "water",
			elementType: "geometry",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		}
	];
		
	//set google map options
	var map_options = {
      	center: new google.maps.LatLng(latitude, longitude),
      	zoom: map_zoom,
      	panControl: false,
      	zoomControl: false,
      	mapTypeControl: false,
      	streetViewControl: false,
      	mapTypeId: google.maps.MapTypeId.ROADMAP,
      	scrollwheel: true,
      	styles: style,
    }
    //inizialize the map
	var map = new google.maps.Map(document.getElementById('google-container'), map_options);
	//add a custom marker to the map				
	var marker = new google.maps.Marker({
	  	position: new google.maps.LatLng(latitude, longitude),
	    map: map,
	    visible: true,
	 	icon: marker_url,
	});

	//add custom buttons for the zoom-in/zoom-out on the map
	function CustomZoomControl(controlDiv, map) {
		//grap the zoom elements from the DOM and insert them in the map 
	  	var controlUIzoomIn= document.getElementById('cd-zoom-in'),
	  		controlUIzoomOut= document.getElementById('cd-zoom-out');
	  	controlDiv.appendChild(controlUIzoomIn);
	  	controlDiv.appendChild(controlUIzoomOut);

		// Setup the click event listeners and zoom-in or out according to the clicked element
		google.maps.event.addDomListener(controlUIzoomIn, 'click', function() {
		    map.setZoom(map.getZoom()+1)
		});
		google.maps.event.addDomListener(controlUIzoomOut, 'click', function() {
		    map.setZoom(map.getZoom()-1)
		});
	}
	function initAutocomplete(map) {
   console.log("Init Autocomplete");
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -33.8688, lng: 151.2195},
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
}

	var zoomControlDiv = document.createElement('div');
 	var zoomControl = new CustomZoomControl(zoomControlDiv, map);
	var initAutocomplete=new initAutocomplete(map);

  	//insert the zoom div on the top left of the map
  	map.controls[google.maps.ControlPosition.LEFT_TOP].push(zoomControlDiv);
});


function initAutocomplete(map) {
   console.log("Init Autocomplete");

  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
}
  