export type TTrip = {
  id: number;
  origin: string;
  origin_latitude: number;
  origin_longitude: number;
  destination: string;
  destination_latitude: number;
  destination_longitude: number;
  distance_km: number;
  charge_used_kwh: number;
  percentage_charge_used: number;
  round_trip_charge_used_kwh: number;
  round_trip_percentage_used: number;
  driving_style: string;
  ev_type: number;
};
