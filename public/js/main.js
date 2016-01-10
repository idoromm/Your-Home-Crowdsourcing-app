jQuery(document).ready(function ($) {
    //set your google maps parameters
    var latitude = 32.075530,
        longitude = 34.775082,
        map_zoom = 15;
    
    var markers_list = {};
    var factor = 3;
    
    var num_of_markers_in_screen = 20;

    var listing_return = $.ajax({
        url: '/api/listings',
        type: 'GET',
        success: function (data) {
            fillListingOnMap(data,true);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
        }
    });


    $.ajax({
        url: '/api/askListings',
        type: 'GET',
        success: function (data) {
            fillListingOnMap(data,false);
            console.log(data);
        },
        error: function (e) {
            //called when there is an error
            //console.log(e.message);
        }
    });
    


    //google map custom marker icon - .png fallback for IE11
    var is_internetExplorer11 = navigator.userAgent.toLowerCase().indexOf('trident') > -1;

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
    
    google.maps.event.addListener(map, 'idle', function () {
        updateMarkers();
    });
    function fillListingOnMap(data,isListing) {
        for (i = 0; i < data.length; i++) {
            var lat = data[i]["latitude"];
            var lng = data[i]["longitude"];
            if (lat && lng) {
                addMarker(data[i], isListing);
            }
        }
    }
    
    $("#chkbx_0").on("change", updateMarkers);
    $("#chkbx_1").on("change", updateMarkers);
    $("#chkbx_2").on("change", updateMarkers);
    $("#chkbx_3").on("change", updateMarkers);
    
    var wilson = function (positiveScore, total) {
        var CONFIDENCE_LEVEL = 1.96;
        var phat;
        
        if (total === 0) {
            return 0;
        }
        phat = positiveScore / total;
        return (phat + CONFIDENCE_LEVEL * CONFIDENCE_LEVEL / (2 * total) - CONFIDENCE_LEVEL * Math.sqrt((phat * (1 - phat) + CONFIDENCE_LEVEL * CONFIDENCE_LEVEL / (4 * total)) / total)) / (1 + CONFIDENCE_LEVEL * CONFIDENCE_LEVEL / total);
    };

    
    function updateMarkers() {
        $.when(listing_return).then(function (data) {
            
            //get all checkbox 
            var is_furnished = document.getElementById("chkbx_0").checked;
            var is_renovated = document.getElementById("chkbx_1").checked;
            var is_well_lit = document.getElementById("chkbx_2").checked;
            var has_windows = document.getElementById("chkbx_3").checked;
            
            var current_map_bounds_data = {};
            
            //get all markers in map bound
            for (var i in data) {
                var lat = data[i]["latitude"];
                var lng = data[i]["longitude"];
                if (lat && lng) {
                    if (markers_list.hasOwnProperty(data[i]._id)) {                      
                        //calculate max votes rate
                        if (map.getBounds().contains(markers_list[data[i]._id].getPosition())) {
                            //set visible all markers that have no votes at all in order to promote them
                            if (!(data[i].crowd_furnished_total||
                                data[i].crowd_renovated_total ||
                                data[i].crowd_light_total ||
                                data[i].crowd_windows_total)) {
                                markers_list[data[i]._id].setMap(map);

                            } else {
                                //set diffault size
                                var icon = {
                                    url: markers_list[data[i]._id].getIcon().url,
                                    scaledSize: new google.maps.Size(21, 34)
                                }

                                markers_list[data[i]._id].setMap(map);
                                markers_list[data[i]._id].setIcon(icon);
                                //dont put them in dictionary also
                                current_map_bounds_data[data[i]._id] = data[i];

                            }
                        } else {
                            //remove all markers not in range
                            markers_list[data[i]._id].setMap(null);
                        }

                    }
                }
            }
            if (Object.keys(current_map_bounds_data).length == 0) {
                //all listings in current screen dont have any info
                return;
            }
            
                if (!(is_furnished || is_renovated || is_well_lit || has_windows)) {
                    //all check boxes are unchecked
                    return;
                }

            //calculate avarage and wilson
            var markers_ratio = {};
            var max_rating = 0;
            for (var data in current_map_bounds_data) {
                var total_votes =   (is_furnished * current_map_bounds_data[data].crowd_furnished_total) +
                                    (is_renovated * current_map_bounds_data[data].crowd_renovated_total) +
                                    (is_well_lit * current_map_bounds_data[data].crowd_light_total) +
                                    (has_windows * current_map_bounds_data[data].crowd_windows_total);

                
                
                var positive_votes =    (is_furnished * current_map_bounds_data[data].crowd_furnished) +
                                        (is_renovated * current_map_bounds_data[data].crowd_renovated) +
                                        (is_well_lit * current_map_bounds_data[data].crowd_light) +
                                        (has_windows * current_map_bounds_data[data].crowd_windows);
                
                var rating = wilson(positive_votes, total_votes);
                markers_ratio[data] = wilson(positive_votes,total_votes);
                max_rating = Math.max(max_rating, rating);

            }
            

            //normalize the votes by max_rating
            //normlize according the markers in current bound
            for (var dataId in current_map_bounds_data) {
                markers_ratio[dataId] = markers_ratio[dataId]/ max_rating;
            }

            //once we get the right values we want to sort all the listings
            var markers = []; for (var dataId in markers_ratio) markers.push(dataId);
            markers.sort(function (a, b) { return markers_ratio[a] - markers_ratio[b] });

            for (var i = 0; i < markers.length; i++) {
                
                if (i < num_of_markers_in_screen) {
                    //set markers icon
                    var icon = {
                        url: markers_list[markers[i]].getIcon().url,
                        scaledSize: new google.maps.Size((1 +(markers_ratio[markers[i]]*factor)) * 21, (1 + (markers_ratio[markers[i]] * factor)) * 34)
                    }

                    markers_list[markers[i]].setIcon(icon);
                    markers_list[markers[i]].setMap(map);
                } else {
                    // show only part of listings
                    markers_list[markers[i]].setMap(null);
                }


            }

            

            

        });
    }

    function addMarker(data, isListing) {
        var latitude = data["latitude"];
        var longitude = data["longitude"];
        var pinColor;
        
        //calculate marker color
        if (isListing) {
            //one of the categories is missing
            is_data_missing = !((data.crowd_furnished_total) &&
                                (data.crowd_renovated_total) &&
                                (data.crowd_light_total) &&
                                (data.crowd_windows_total));

            if (is_data_missing) {
                pinColor = "FFFFFF";
            } else {
                pinColor = "FF0000";
            }
        }
        else {
            pinColor = "2F4F4F";
        }
        
        var image = {
            url: "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor
        };

        var city = data["city"];
        var street = data["street"];
        var buildingNumber = data["buildingNumber"];
        var apartmentNumber = data["apartmentNumber"];
        var url;
        if (isListing){url="/listing/" + street + "/" + buildingNumber + "/" + apartmentNumber;}
        else {url="/";}
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(latitude, longitude),
            map: map,
            visible: true,
            icon: image,
			title: city + " " + street + " " + buildingNumber ,			
            url: url
        });
        
        //we can delete a marker only by accessing it
        //so we want to have a reference to all markers 
        //in order to control them later
        markers_list[data._id] = marker;

        var infowindow = new google.maps.InfoWindow({
            content: "<p style=\" padding-left: 10px; \">"+city + " " + street + " " + buildingNumber+"</p>"
        });

        marker.addListener('mouseover', function () {
            infowindow.open(map, marker);
        });
        marker.addListener('mouseout', function () {
            infowindow.close();
        });

		marker.addListener('click', function () {
			if (isListing) {
				window.location.href = marker.url;
			} else {
				angular.element(document.getElementById('addNewReviewButton')).scope().addNewReview(data);
			}
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
        
        var checkboxes = document.getElementById('checkboxes');
        map.controls[google.maps.ControlPosition.LEFT_TOP].push(checkboxes);

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




