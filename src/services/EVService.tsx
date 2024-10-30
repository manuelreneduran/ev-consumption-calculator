import axios from "../lib/axios";

class EVService {
  async getDropdownOptions(): Promise<{ value: string; label: string }[]> {
    try {
      const response = await axios.get("evs/options/");

      return response.data;
    } catch (error: unknown) {
      console.error("Error fetching EV options:", error);
      throw new Error(`error: ${error}`);
    }
  }
}

export default new EVService();
