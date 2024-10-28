import { TripDetailsFormSchema } from "../components/trip-details-form/schema";
import axios from "../lib/axios";
import { TTrip } from "../types";

class TripService {
  async getTripDetails(tripDetails: TripDetailsFormSchema): Promise<TTrip> {
    try {
      const response = await axios.post("api/trip/estimate-charge/", {
        origin: tripDetails.origin,
        destination: tripDetails.destination,
        ev_type: tripDetails.evType,
        driving_style: tripDetails.drivingStyle,
      });

      // Assuming the API returns a URL in the response data
      return response.data;
    } catch (error: unknown) {
      console.error("Error fetching trips details:", error);
      throw new Error(`error: ${error}`);
    }
  }
}

export default new TripService();
