import { useState } from "react";
import "./App.css";
import { TripDetailsFormSchema } from "./components/trip-details-form/schema";
import { TripDetailsForm } from "./components/trip-details-form/TripDetailsForm";
import { TripSummary } from "./components/trip-summary/TripSummary";
import TripService from "./services/TripService";
import { TTrip } from "./types";

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

  return (
    <>
      <TripDetailsForm onSubmit={onSubmit} />
      <TripSummary
        tripDetails={tripDetails}
        isLoading={isLoadingTrip}
        isError={isErrorTrip}
      />
    </>
  );
}

export default App;
