var taxiData =[];
var getData = function(){
  jQuery.ajax({
      type: "GET",
      url: "/coordinatesSentiment",
      dataType: "json",
      async: false,
      success: function(data){
          $.each(data, function(index, value) {
              var longtitude = value.value[0].coordinates[0];
              var latitude = value.value[0].coordinates[1];
              var sentimentWeight = value.value[1]; 
              // var location = new google.maps.LatLng(longtitude, latitude);
              var location = new google.maps.LatLng(latitude, longtitude);
              var newObject = {'location': location, 'weight': sentimentWeight + 2};
              taxiData.push(newObject);
          });

        // setTimeout(function(){
          
        // },5000);
      }

  });
};


function initialize() {
   getData();
    console.log(taxiData);
    var mapOptions = {
    zoom: 7,
    center: new google.maps.LatLng(-37.0000, 144.0000),
    mapTypeId: google.maps.MapTypeId.MAP
  };
  
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
 
  
      var pointArray = new google.maps.MVCArray(taxiData);
      console.log("taxiData out");
      heatmap = new google.maps.visualization.HeatmapLayer({data: pointArray}); 
      heatmap.setMap(map);

}


google.maps.event.addDomListener(window, 'load', initialize);



