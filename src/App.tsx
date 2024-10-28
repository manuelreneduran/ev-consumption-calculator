import "./App.css";
import { TripDetailsFormSchema } from "./components/trip-details-form/schema";
import { TripDetailsForm } from "./components/trip-details-form/TripDetailsForm";
import { TripSummary } from "./components/trip-summary/TripSummary";

const exampleTrip = {
  id: 1,
  origin_latitude: 0,
  origin_longitude: 0,
  destination_latitude: 0,
  destination_longitude: 0,
  distance_km: 0,
  charge_used_kwh: 0,
  percentage_charge_used: 0,
  round_trip_charge_used_kwh: 0,
  round_trip_percentage_used: 0,
  driving_style: "",
  ev_type: 0,
};
function App() {
  const onSubmit = async (data: TripDetailsFormSchema) => {
    console.log(data);
  };

  return (
    <>
      <TripDetailsForm onSubmit={onSubmit} />
      <TripSummary {...exampleTrip} />
    </>
  );
}

export default App;
