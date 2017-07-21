var geocoder = new google.maps.Geocoder();
// Hacemos la petición indicando la dirección e invocamos la función
// geocodeResult enviando todo el resultado obtenido

// function geocodeAddress(geocoder, resultsMap) {
// 	  var address = document.getElementById('address').value;
// 	  console.log("The adress is " + address);
// 		var buttonCreate = document.getElementById('newResButton');
// 	  geocoder.geocode({'address': address}, function(results, status) {
// 	    if (status === 'OK') {
// 	      resultsMap.setCenter(results[0].geometry.location);
// 				if (markers.length === 0){
// 					var marker = new google.maps.Marker({
// 						map: resultsMap,
// 						position: results[0].geometry.location
// 					});
// 					markers.push(marker);
// 				} else {
// 				setMapOnAll(null);
// 				deleteMarkers();
// 				var marker1 = new google.maps.Marker({
// 					map: resultsMap,
// 					position: results[0].geometry.location
// 				});
// 				markers.push(marker1);
// 				}
//
//
// 				if (!buttonCreate){
// 				var $button = $('<input>').attr('id', 'newResButton').attr('type','submit').attr('value','Crea el restaurante');
// 				$("#restform").append($button);
// 				}
//
// 				} else {
// 	      alert('Geocode was not successful for the following reason: ' + status);
// 	    }
// 	  });
// 	}
// geocoder.geocode({
//   'address': address
// }, geocodeResult);
// console.log(geocoder);

console.log("Startmap funcionando");
var ironhackBCN = {
  lat: 40.3731735,
  lng:-3.6428776999999855
};


var map = new google.maps.Map(
  document.getElementById('map'), {
    zoom: 15,
    center: ironhackBCN
  }
);

var myMarker = new google.maps.Marker({
  position: {
    lat: 40.3731735,
    lng: -3.6428776999999855
  },
  map: map,
  title: beerInfo.currentUser._id
});
