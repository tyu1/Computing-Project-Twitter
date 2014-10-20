
//   var taxiData = [];
// var n =0;
// $.when(jQuery.ajax({
//       type: "GET",
//       url: "/coordinatesSentiment",
//       dataType: "json",
//       async: false,
//       success: function(data){
//           $.each(data, function(index, value) {
//               var longtitude = value.value[0].coordinates[0];
//               var latitude = value.value[0].coordinates[1];
//               var sentimentWeight = value.value[1]; 
//               // var location = new google.maps.LatLng(longtitude, latitude);
//               var location = new google.maps.LatLng(latitude, longtitude);
//               var newObject = {'location': location, 'weight': sentimentWeight +2};
//               if(n<60){
//                 taxiData.push(newObject);
//                 n++;
//               }
              
//           });

//         // setTimeout(function(){
          
//         // },5000);
//       }

//   })).done(function(){
//     google.maps.event.addDomListener(window, 'load', initialize);
// });

// function initialize() {

//  console.log(taxiData);
//     var mapOptions = {
//     zoom: 7,
//     center: new google.maps.LatLng(-37.0000, 144.0000),
//     mapTypeId: google.maps.MapTypeId.MAP
//   };
  
//   map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
 
  
//       var pointArray = new google.maps.MVCArray(taxiData);
//       console.log("taxiData out");
//       heatmap = new google.maps.visualization.HeatmapLayer({data: pointArray, radius: 50}); 
//       heatmap.setMap(map);

//   }




// function getData() {
//   var taxiData = [];
//   var api = "/coordinatesSentiment";

//   $.ajax({
//     type: 'GET',
//     url: api,
//     dataType: 'json',
//     async: 'false',
//     success: function (data) {
//       console.log(data);
//       $.each(data, function (index, value) {
//         var longtitude = value.value[0].coordinates[0];
//         var latitude = value.value[0].coordinates[1];
//         var sentimentWeight = value.value[1];
//         var location = new google.maps.LatLng(latitude, longtitude);
//         var newObject = {'location': location, 'weight': sentimentWeight};

//         taxiData.push(newObject);
//       });
//     }
//   });

//   return taxiData;
// }

// function bindInfoWindow() {
//   google.maps.event.addDomListener(window, 'onload', initialize);
// }

// function initialize() {
//   console.log("test");
//     var mapOptions = {
//         zoom: 7,
//         center: new google.maps.LatLng(-37.0000, 144.0000),
//         mapTypeId: google.maps.MapTypeId.MAP
//       };
//     var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
//     var taxiData = getData();
//     var pointArray = new google.maps.MVCArray(taxiData);
//     var heatmap = new google.maps.visualization.HeatmapLayer({data: pointArray, radius: 50}); 

//     heatmap.setMap(map);
// }











