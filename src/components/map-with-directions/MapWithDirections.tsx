// MapWithDirections.tsx
import { DirectionsRenderer, GoogleMap } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";

interface MapWithDirectionsProps {
  origin: string;
  destination: string;
}

const MapWithDirections: React.FC<MapWithDirectionsProps> = ({
  origin,
  destination,
}) => {
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);

  useEffect(() => {
    if (origin && destination) {
      const directionsService = new google.maps.DirectionsService();

      directionsService.route(
        {
          origin,
          destination,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    }
  }, [origin, destination]);

  return (
    <div className="w-full h-[500px]">
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        zoom={10}
        center={{ lat: 37.7749, lng: -122.4194 }} // Default to a location, like San Francisco
      >
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </div>
  );
};

export default MapWithDirections;
