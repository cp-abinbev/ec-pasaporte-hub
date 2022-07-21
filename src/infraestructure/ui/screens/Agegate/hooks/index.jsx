import { useState, useEffect } from "react";

export const usePosition = () => {
    const [geoposition, setGeoposition] = useState([]);
    let accepted: false;

    // Try HTML5 geolocation.
    useEffect(() => {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              accepted = true;
              const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };
  
              setGeoposition([accepted, pos]);
            },
            (err) => {
              accepted = false;
              setGeoposition([accepted, {}]);
            }
          );
        } else {
          console.error('Browser doesn\'t support Geolocation');
        }
    }, [geoposition]);

    return geoposition
}