import React, { useEffect, useState } from "react";

export default function GetUserLocation() {
  const [loc, setLoc] = useState();
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

          // Call OpenStreetMap's Nominatim API for reverse geocoding
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          // console.log("data : ", data);

          console.log(
            `City: ${data.address.city || data.address.county || data.address.town || data.address.village
            }`
          );
          console.log(`Ditrict: ${data.address.state_district}`);
          console.log(`Region: ${data.address.state}`);
          console.log(`Country: ${data.address.country}`);
          console.log(`Postal Code : ${data.address.postcode}`);

        },
        (error) => {
          console.error("Error obtaining location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };
  useEffect(() => {
    getLocation();
  }, []);
  return <div>GetUserLocation</div>;
}
