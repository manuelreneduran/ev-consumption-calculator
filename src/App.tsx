import { useState } from "react";
import "./App.css";
import { TripDetailsFormSchema } from "./components/trip-details-form/schema";
import { TripDetailsForm } from "./components/trip-details-form/TripDetailsForm";
import { TripSummary } from "./components/trip-summary/TripSummary";
import TripService from "./services/TripService";
import { TTrip } from "./types";
import { LoadScript } from "@react-google-maps/api";
import MapWithDirections from "./components/map-with-directions/MapWithDirections";

function App() {
  const [tripDetails, setTripDetails] = useState<TTrip | null>(null);
  const [isLoadingTrip, setIsLoadingTrip] = useState(false);
  const [isErrorTrip, setIsErrorTrip] = useState(false);

  const onSubmit = async (data: TripDetailsFormSchema) => {
    setIsLoadingTrip(true);
    setIsErrorTrip(false);
    try {
      const response = await TripService.getTripDetails(data);
      setTripDetails(response);
    } catch (error) {
      console.error("Error fetching trips details:", error);
      setIsErrorTrip(true);
    } finally {
      setIsLoadingTrip(false);
    }
  };

  const defaultOrigin = "San Francisco";
  const defaultDestination = "Los Angeles";
  const destination = tripDetails?.destination || defaultDestination;
  const origin = tripDetails?.origin || defaultOrigin;

  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY!}
      libraries={["places"]}
    >
      <div className="flex flex-row">
        <TripDetailsForm onSubmit={onSubmit} />

        <MapWithDirections origin={origin} destination={destination} />
      </div>
      <TripSummary
        tripDetails={tripDetails}
        isLoading={isLoadingTrip}
        isError={isErrorTrip}
      />
    </LoadScript>
  );
}

export default App;
