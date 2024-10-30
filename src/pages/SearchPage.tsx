import { TripDetailsForm } from "../components/trip-details-form/TripDetailsForm";

export function SearchPage() {
  function onSubmit() {}

  return (
    <div className="h-full flex flex-row justify-center items-center">
      <TripDetailsForm onSubmit={onSubmit} />
    </div>
  );
}
