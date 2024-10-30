// GoogleAutocomplete.tsx
import React from "react";
import { useFormContext } from "react-hook-form";
import usePlacesAutocomplete from "use-places-autocomplete";
import { Input } from "./input";
import { SearchIcon } from "lucide-react";

interface GoogleAutocompleteProps {
  name: string;
}

export const GoogleAutocomplete: React.FC<GoogleAutocompleteProps> = ({
  name,
}) => {
  const { setValue } = useFormContext();
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue: setAutoCompleteValue,
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address: string) => {
    setAutoCompleteValue(address, false);
    clearSuggestions();
    setValue(name, address); // Set the selected address in react-hook-form
  };

  return (
    <div className="relative">
      <div className="relative">
        <Input
          placeholder="Search addresses"
          value={value}
          onChange={(e) => setAutoCompleteValue(e.target.value)}
          disabled={!ready}
          className="pr-6"
        />
        <SearchIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
      </div>
      {status === "OK" && (
        <ul className="absolute bg-white border rounded shadow-lg z-10">
          {data.map(({ place_id, description }) => (
            <li
              key={place_id}
              onClick={() => handleSelect(description)}
              className="p-2 cursor-pointer hover:bg-gray-200"
            >
              {description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
