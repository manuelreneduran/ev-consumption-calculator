import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import EVService from "../../services/EVService";
import { Button } from "../ui/button";
import { ComboBox } from "../ui/combobox";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { GoogleAutocomplete } from "../ui/google-autocomplete";
import { drivingStyleOptions } from "./const";
import { tripDetailsFormSchema, TripDetailsFormSchema } from "./schema";

type TripDetailsFormProps = {
  onSubmit: (data: TripDetailsFormSchema) => void;
};

type Option = {
  value: string;
  label: string;
};

export function TripDetailsForm({ onSubmit }: TripDetailsFormProps) {
  const [evDropdownOptions, setEvDropdownOptions] = useState<Option[]>([]);

  const form = useForm<TripDetailsFormSchema>({
    resolver: zodResolver(tripDetailsFormSchema),
    shouldUnregister: false,
    reValidateMode: "onChange",
    defaultValues: {
      origin: "",
      destination: "",
      drivingStyle: "", // Default value (e.g., "Regular")
      evType: "", // Default to an empty value or the first EV type
    },
  });

  useEffect(() => {
    const fetchDropdownOptions = async () => {
      const options = await EVService.getDropdownOptions();
      setEvDropdownOptions(options);
    };
    fetchDropdownOptions();
  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-6 w-[200px]"
      >
        {/* Origin Field */}
        <FormField
          control={form.control}
          name="origin"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-y-2 relative">
              <FormLabel>Starting Location</FormLabel>
              <FormControl>
                <GoogleAutocomplete {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        {/* Destination Field */}
        <FormField
          control={form.control}
          name="destination"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-y-2 relative">
              <FormLabel>Destination</FormLabel>
              <FormControl>
                <GoogleAutocomplete {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        {/* EV Type Dropdown */}
        <FormField
          control={form.control}
          name="evType"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-y-2 relative">
              <FormLabel>EV Type</FormLabel>
              <FormControl>
                <ComboBox
                  onChange={field.onChange}
                  value={field.value}
                  options={evDropdownOptions}
                  placeholder="Select an EV type"
                  searchPlaceholder="Search for an EV type"
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Driving Style Dropdown */}
        <FormField
          control={form.control}
          name="drivingStyle"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-y-2 relative">
              <FormLabel>Driving Style</FormLabel>
              <FormControl>
                <ComboBox
                  onChange={field.onChange}
                  value={field.value}
                  options={drivingStyleOptions}
                  placeholder="Select a driving style"
                  searchPlaceholder="Search for a driving style"
                  showSearch={false}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
