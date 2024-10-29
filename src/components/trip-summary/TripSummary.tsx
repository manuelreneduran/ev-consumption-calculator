import { TTrip } from "../../types";
import Loader from "../ui/loader";

type TTripSummaryProps = {
  tripDetails: TTrip | null;
  isLoading: boolean;
  isError: boolean;
};

export function TripSummary({
  tripDetails,
  isLoading,
  isError,
}: TTripSummaryProps) {
  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-full flex items-center justify-center">
        Error fetching trip details
      </div>
    );
  }

  if (!tripDetails) {
    return (
      <div className="h-full flex items-center justify-center">
        No trip details
      </div>
    );
  }

  const {
    origin_latitude,
    origin_longitude,
    destination_latitude,
    destination_longitude,
    distance_km,
    charge_used_kwh,
    percentage_charge_used,
    round_trip_charge_used_kwh,
    round_trip_percentage_used,
    driving_style,
    ev_type,
  } = tripDetails;

  return (
    <div>
      <h2>Trip Summary</h2>
      <p>
        Origin: {origin_latitude}, {origin_longitude}
      </p>
      <p>
        Destination: {destination_latitude}, {destination_longitude}
      </p>
      <p>Distance: {distance_km} km</p>
      <p>
        Charge used: {charge_used_kwh} kWh ({percentage_charge_used}%)
      </p>
      <p>
        Round trip charge used: {round_trip_charge_used_kwh} kWh (
        {round_trip_percentage_used}%)
      </p>
      <p>Driving style: {driving_style}</p>
      <p>EV type: {ev_type}</p>
    </div>
  );
}
