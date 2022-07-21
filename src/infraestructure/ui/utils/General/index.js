export const getCurrentGeoLocation = (cb) => {
  let accepted = false;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        accepted = true;
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        if (typeof cb === 'function') {
          cb(pos, accepted);
        }
      },
      (err) => {
        accepted = false;
        if (typeof cb === 'function') {
          cb({}, accepted);
        }
      }
    );
  } else {
    console.error("Browser doesn't support Geolocation");
  }

  return accepted;
};
