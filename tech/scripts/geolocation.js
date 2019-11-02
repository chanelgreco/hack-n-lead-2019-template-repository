const locationIqToken = '5ce70522012fda';
let latitude;
let longitude;

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(storeGeoLocation);
  } else {
    console.log('Geolocation is not supported by this browser.');
  }
}

function storeGeoLocation(position) {
  console.log(position.coords.latitude, position.coords.longitude);
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  // return latitude, longitude;
  getReverseGeocoding(latitude, longitude);
}

function getReverseGeocoding(lat, long) {
  fetch(
    `https://eu1.locationiq.com/v1/reverse.php?key=${locationIqToken}&lat=${lat}&lon=${long}&format=json`
  )
    .then(function(response) {
      if (response.status !== 200) {
        console.log(
          'Looks like there was a problem. Status Code: ' + response.status
        );
        return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
        console.log(data);
      });
    })
    .catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
}

getLocation(storeGeoLocation);
