// Sign up to get an access token
L.mapbox.accessToken = 'pk.eyJ1IjoianVzdGlubGlhbmciLCJhIjoiWjhYLVQzRSJ9.Cp2lmK4NDLZzvhvd79sU1Q';

var map = L.mapbox.map('map', 'examples.map-i86nkdio').setView([-37.5891893, 144.9942304], 7);
var featureGroup = L.featureGroup().addTo(map);
var drawControl = new L.Control.Draw({
    edit: {
        featureGroup: featureGroup
    },
    draw: {
        polygon: false,
        polyline: false,
        rectangle: true,
        circle: false,
        marker: false
    }
}).addTo(map);

map.on('draw:created', showPolygonArea);
map.on('draw:edited', showPolygonAreaEdited);

function showPolygonAreaEdited(e) {
    e.layers.eachLayer(function(layer) {
        showPolygonArea({ layer: layer });
    });
}
function showPolygonArea(e) {
    featureGroup.clearLayers();
    featureGroup.addLayer(e.layer);

    var query,
        api,
        maxLatitude = "",
        minLatitude = "",
        maxLongtitude = "",
        minLongtitude = "",
        geoJsonObject = e.layer.toGeoJSON(),
        objectType = geoJsonObject.geometry.type,
        coordinates = geoJsonObject.geometry.coordinates,
        baseUrl = "http://115.146.85.249:5984/public/_design/main/_spatial/points?bbox=";

//    var myIcon = L.AwesomeMarkers.icon({
//        icon: 'twitter',
//        prefix: 'fa',
//        markerColor: 'blue'
//    });

    // Get longtitude and latitude, send to couchdb
    if (objectType == 'Polygon') {
        var arrays = coordinates[0];
        $.each(arrays, function (index, value) {
            if (index == 1) {
                maxLatitude = value[1];
                minLatitude = value[1];
                maxLongtitude = value[0];
                minLongtitude = value[0];
            } else {
                var tempLatitude = value[1];
                var tempLongtitude = value[0];

                if (tempLatitude > maxLatitude) {
                    maxLatitude = tempLatitude;
                } else if (tempLatitude < minLatitude) {
                    minLatitude = tempLatitude;
                } else if (tempLongtitude > maxLongtitude) {
                    maxLongtitude = tempLongtitude;
                } else if (tempLongtitude < minLongtitude) {
                    minLongtitude = tempLongtitude;
                }
            }
        });
    }

    query = minLongtitude + "," + minLatitude + "," + maxLongtitude + "," + maxLatitude;
    api = baseUrl + query;

    $.ajax({
        url: api,
        dataType: 'json',
        success: function (data) {
            $.each(data.rows, function (index, value) {
                var longitude = value.geometry.coordinates[0];
                var latitude = value.geometry.coordinates[1];
                var tweet = value.value[2];
                var sentiment = value.value[3];
                var latlng = L.latLng(latitude, longitude);
                var marker = L.marker(latlng).addTo(featureGroup);
                console.log(value);
                var sentimentValue;
               if(sentiment === 1){
                 sentimentValue = '||Positive||';
               }else
               {
                sentimentValue = '||Negative||';
               }
               var finalPrint = tweet + ' ' + sentimentValue;
                marker.bindPopup(finalPrint);
            });
        },
        error: function (data) {
            console.log("error connection");
        }
    });

//    e.layer.openPopup();
}

L.mapbox.featureLayer({
    type: 'Feature',
    geometry: {
        type: 'Point',
        coordinates: [
            144.9942304,
            -37.5891893
        ]
    },
    properties: {
        'marker-size': 'large',
        'marker-color': '#4099FF',
        'marker-symbol': 'marker-stroked'
    }
}).addTo(map);



// // Sign up to get an access token
// L.mapbox.accessToken = 'pk.eyJ1IjoianVzdGlubGlhbmciLCJhIjoiWjhYLVQzRSJ9.Cp2lmK4NDLZzvhvd79sU1Q';

// var map = L.mapbox.map('map', 'examples.map-i86nkdio').setView([-37.5891893, 144.9942304], 7);
// var featureGroup = L.featureGroup().addTo(map);
// var drawControl = new L.Control.Draw({
//     edit: {
//         featureGroup: featureGroup
//     },
//     draw: {
//         polygon: false,
//         polyline: false,
//         rectangle: true,
//         circle: false,
//         marker: false
//     }
// }).addTo(map);

// map.on('draw:created', showPolygonArea);
// map.on('draw:edited', showPolygonAreaEdited);

// function showPolygonAreaEdited(e) {
//     e.layers.eachLayer(function(layer) {
//         showPolygonArea({ layer: layer });
//     });
// }

// function showPolygonArea(e) {
//     featureGroup.clearLayers();
//     featureGroup.addLayer(e.layer);

//     var query,
//         api,
//         maxLatitude = "",
//         minLatitude = "",
//         maxLongtitude = "",
//         minLongtitude = "",
//         geoJsonObject = e.layer.toGeoJSON(),
//         objectType = geoJsonObject.geometry.type,
//         coordinates = geoJsonObject.geometry.coordinates,
//         baseUrl = "http://115.146.85.249:5984/public/_design/map/_spatial/points?bbox=";

// //    var myIcon = L.AwesomeMarkers.icon({
// //        icon: 'twitter',
// //        prefix: 'fa',
// //        markerColor: 'blue'
// //    });

//     // Get longtitude and latitude, send to couchdb
//     if (objectType == 'Polygon') {
//         var arrays = coordinates[0];
//         $.each(arrays, function (index, value) {
//             if (index == 1) {
//                 maxLatitude = value[1];
//                 minLatitude = value[1];
//                 maxLongtitude = value[0];
//                 minLongtitude = value[0];
//             } else {
//                 var tempLatitude = value[1];
//                 var tempLongtitude = value[0];

//                 if (tempLatitude > maxLatitude) {
//                     maxLatitude = tempLatitude;
//                 } else if (tempLatitude < minLatitude) {
//                     minLatitude = tempLatitude;
//                 } else if (tempLongtitude > maxLongtitude) {
//                     maxLongtitude = tempLongtitude;
//                 } else if (tempLongtitude < minLongtitude) {
//                     minLongtitude = tempLongtitude;
//                 }
//             }
//         });
//     }

//     query = minLongtitude + "," + minLatitude + "," + maxLongtitude + "," + maxLatitude;
//     api = baseUrl + query;

//     $.ajax({
//         url: api,
//         dataType: 'json',
//         success: function (data) {
//             var currentUserScreenName =  QueryString().screen_name;

//             console.log(data);
//             $.each(data.rows, function (index, value) {
//                 var selectedAreaScreenName  = value.value[4];


// //                console.log(selectedAreaScreenName);

//                 if (currentUserScreenName == selectedAreaScreenName) {
//                     console.log("1");
// //                    var longitude = value.geometry.coordinates[0];
// //                    var latitude = value.geometry.coordinates[1];
// //                    var tweet = value.value[2];
// //                    var latlng = L.latLng(latitude, longitude);
// //                    var marker = L.marker(latlng).addTo(featureGroup);
// //
// //                    marker.bindPopup(tweet);

//                 }

//             });
// //            $.each(data.rows, function (index, value) {
// //                var longitude = value.geometry.coordinates[0];
// //                var latitude = value.geometry.coordinates[1];
// //                var tweet = value.value[1];
// //                var latlng = L.latLng(latitude, longitude);
// //                var marker = L.marker(latlng).addTo(featureGroup);
// //
// //                marker.bindPopup(tweet);
// //            });
//         },
//         error: function (data) {
//             console.log("error connection");
//         }
//     });

// //    e.layer.openPopup();
// }

// function QueryString () {
//     // This function is anonymous, is executed immediately and
//     // the return value is assigned to QueryString!
//     var query_string = {};
//     var query = window.location.search.substring(1);
//     var vars = query.split("&");
//     for (var i = 0; i < vars.length; i++) {
//         var pair = vars[i].split("=");
//         // If first entry with this name
//         if (typeof query_string[pair[0]] === "undefined") {
//             query_string[pair[0]] = pair[1];
//             // If second entry with this name
//         } else if (typeof query_string[pair[0]] === "string") {
//             var arr = [ query_string[pair[0]], pair[1] ];
//             query_string[pair[0]] = arr;
//             // If third or later entry with this name
//         } else {
//             query_string[pair[0]].push(pair[1]);
//         }
//     }
//     return query_string;
// }

// document.getElementById('title').innerHTML = decodeURI(QueryString().name) + "\'s sentiment distribution on map";

// L.mapbox.featureLayer({
//     type: 'Feature',
//     geometry: {
//         type: 'Point',
//         coordinates: [
//             144.9942304,
//             -37.5891893
//         ]
//     },
//     properties: {
//         'marker-size': 'large',
//         'marker-color': '#4099FF',
//         'marker-symbol': 'marker-stroked'
//     }
// }).addTo(map);

