import axios from "../lib/axios";

class EVService {
  async getEvOptions(): Promise<{ value: string; label: string }[]> {
    const response = await axios.get("evs/options/");
    return response.data;
  }
}

export default new EVService();
