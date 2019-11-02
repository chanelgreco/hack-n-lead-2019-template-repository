const locationIqToken = '5ce70522012fda';

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(storeGeoLocation);
  } else {
    console.log('Geolocation is not supported by this browser.');
  }
}

function storeGeoLocation(position) {
  console.log(position.coords.latitude, position.coords.longitude);
  getReverseGeocoding(position.coords.latitude, position.coords.longitude);
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

      response.json().then(function(data) {
        writeLocation(data);
      });
    })
    .catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
}

function writeLocation(data) {
  let locationInput = document.querySelector('#location');

  console.log(locationInput);

  locationInput.placeholder = `${data.address.road}, ${data.address.postcode} ${data.address.city}, ${data.address.country}`;
}

getLocation(storeGeoLocation);
