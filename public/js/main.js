jQuery(document).ready(function ($) {
    //set your google maps parameters
    var latitude = 32.075530,
        longitude = 34.775082,
        map_zoom = 15;

    $.ajax({
        url: '/api/listings',
        type: 'GET',
        success: function (data) {
            fillListingOnMap(data);
            console.log(data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
        }
    });

    //google map custom marker icon - .png fallback for IE11
    var is_internetExplorer11 = navigator.userAgent.toLowerCase().indexOf('trident') > -1;
    var marker_url = ( is_internetExplorer11 ) ? 'img/cd-icon-location.png' : 'img/cd-icon-location.svg';

    //define the basic color of your map, plus a value for saturation and brightness
    var main_color = '#2d313f',
        saturation_value = -20,
        brightness_value = 5;

    //we define here the style of the map
    var style = [
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
                {hue: main_color},
                {visibility: "on"},
                {lightness: brightness_value},
                {saturation: saturation_value}
            ]
        },
        {
            featureType: "poi",
            elementType: "geometry.fill",
            stylers: [
                {hue: main_color},
                {visibility: "on"},
                {lightness: brightness_value},
                {saturation: saturation_value}
            ]
        },
        {
            featureType: "poi.government",
            elementType: "geometry.fill",
            stylers: [
                {hue: main_color},
                {visibility: "on"},
                {lightness: brightness_value},
                {saturation: saturation_value}
            ]
        },
        {
            featureType: "poi.sport_complex",
            elementType: "geometry.fill",
            stylers: [
                {hue: main_color},
                {visibility: "on"},
                {lightness: brightness_value},
                {saturation: saturation_value}
            ]
        },
        {
            featureType: "poi.attraction",
            elementType: "geometry.fill",
            stylers: [
                {hue: main_color},
                {visibility: "on"},
                {lightness: brightness_value},
                {saturation: saturation_value}
            ]
        },
        {
            featureType: "poi.business",
            elementType: "geometry.fill",
            stylers: [
                {hue: main_color},
                {visibility: "on"},
                {lightness: brightness_value},
                {saturation: saturation_value}
            ]
        },
        {
            featureType: "transit",
            elementType: "geometry.fill",
            stylers: [
                {hue: main_color},
                {visibility: "on"},
                {lightness: brightness_value},
                {saturation: saturation_value}
            ]
        },
        {
            featureType: "transit.station",
            elementType: "geometry.fill",
            stylers: [
                {hue: main_color},
                {visibility: "on"},
                {lightness: brightness_value},
                {saturation: saturation_value}
            ]
        },
        {
            featureType: "landscape",
            stylers: [
                {hue: main_color},
                {visibility: "on"},
                {lightness: brightness_value},
                {saturation: saturation_value}
            ]

        },
        {
            featureType: "road",
            elementType: "geometry.fill",
            stylers: [
                {hue: main_color},
                {visibility: "on"},
                {lightness: brightness_value},
                {saturation: saturation_value}
            ]
        },
        {
            featureType: "road.highway",
            elementType: "geometry.fill",
            stylers: [
                {hue: main_color},
                {visibility: "on"},
                {lightness: brightness_value},
                {saturation: saturation_value}
            ]
        },
        {
            featureType: "water",
            elementType: "geometry",
            stylers: [
                {hue: main_color},
                {visibility: "on"},
                {lightness: brightness_value},
                {saturation: saturation_value}
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
        styles: style
    };
    //inizialize the map
    var map = new google.maps.Map(document.getElementById('google-container'), map_options);
    //add a custom marker to the map

    function fillListingOnMap(data) {
        for (i = 0; i < data.length; i++) {
            var lat = data[i]["latitude"];
            var lng = data[i]["longitude"];
            if (lat && lng) {
                addMarker(data[i], true);
            }
        }
    }

    function addMarker(data, isListing) {
        var latitude = data["latitude"];
        var longitude = data["longitude"];
        var marker_url;
        if (isListing) {
            marker_url = ( is_internetExplorer11 ) ? 'img/cd-icon-location.png' : 'img/cd-icon-location.svg';
        }
        else {
            marker_url = ( is_internetExplorer11 ) ? 'img/cd-icon-location.png' : 'img/cd-icon-location.svg'; //TODO change it to blue/black
        }

        var city = data["city"];
        var street = data["street"];
        var buildingNumber = data["buildingNumber"]
        var apartmentNumber = data["apartmentNumber"]

        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(latitude, longitude),
            map: map,
            visible: true,
            icon: marker_url,
            title: city + " " + street + " " + buildingNumber,
            url: "/listing/" + street + "/" + buildingNumber + "/" + apartmentNumber
        });


        var infowindow = new google.maps.InfoWindow({
            content: city + " " + street + " " + buildingNumber
        });

        marker.addListener('mouseover', function () {
            infowindow.open(map, marker);
        });
        marker.addListener('mouseout', function () {
            infowindow.close();
        });

        marker.addListener('click', function () {
            window.location.href = marker.url;
        });

    }

    addMarker(latitude, longitude, true);


    //add custom buttons for the zoom-in/zoom-out on the map
    function CustomZoomControl(controlDiv, map) {
        //grap the zoom elements from the DOM and insert them in the map
        var controlUIzoomIn = document.getElementById('cd-zoom-in'),
            controlUIzoomOut = document.getElementById('cd-zoom-out');
        controlDiv.appendChild(controlUIzoomIn);
        controlDiv.appendChild(controlUIzoomOut);

        // Setup the click event listeners and zoom-in or out according to the clicked element
        google.maps.event.addDomListener(controlUIzoomIn, 'click', function () {
            map.setZoom(map.getZoom() + 1)
        });
        google.maps.event.addDomListener(controlUIzoomOut, 'click', function () {
            map.setZoom(map.getZoom() - 1)
        });
    }

    var zoomControlDiv = document.createElement('div');
    var zoomControl = new CustomZoomControl(zoomControlDiv, map);


    google.maps.event.addDomListener(window, 'load', function initialize() {

        var emptyDiv = document.createElement('div');
        emptyDiv.className = 'empty';
        map.controls[google.maps.ControlPosition.LEFT_TOP].push(emptyDiv);

        var searchTextField = document.getElementById('searchTextField');
        map.controls[google.maps.ControlPosition.LEFT_TOP].push(searchTextField);

        //insert the zoom div on the top left of the map
        map.controls[google.maps.ControlPosition.LEFT_TOP].push(zoomControlDiv);

        var addNewReviewButton = document.getElementById('addNewReviewButton');
        map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(addNewReviewButton);


        console.log("input: " + searchTextField);
        var autocompleteMap = new google.maps.places.Autocomplete(searchTextField);


        var infowindow = new google.maps.InfoWindow();
        var listingInfo = new google.maps.InfoWindow();


        autocompleteMap.addListener('place_changed', function () {
            infowindow.close();
            var place = autocompleteMap.getPlace();
            if (!place.geometry) {
                window.alert("Autocomplete's returned place contains no geometry");
                return;
            }

            // If the place has a geometry, then present it on a map.
            if (place.geometry.viewport) {
                map.fitBounds(place.geometry.viewport);
            } else {
                map.setCenter(place.geometry.location);
                map.setZoom(17);  // Why 17? Because it looks good.
            }


            var address = '';
            if (place.address_components) {
                address = [
                    (place.address_components[0] && place.address_components[0].short_name || ''),
                    (place.address_components[1] && place.address_components[1].short_name || ''),
                    (place.address_components[2] && place.address_components[2].short_name || '')
                ].join(' ');
            }


            //infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
            //infowindow.open(map, marker);
        });
    });
});




