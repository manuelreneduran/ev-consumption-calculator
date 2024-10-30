import { LoadScript } from "@react-google-maps/api";
import { Navigate, Route, Routes } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ResultsPage } from "./pages/ResultsPage";
import { SearchPage } from "./pages/SearchPage";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <LoadScript
        googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY!}
        libraries={["places"]}
      >
        <Routes>
          <Route path="/" element={<Navigate to="/search" replace />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
      </LoadScript>
    </QueryClientProvider>
  );
}

export default App;
