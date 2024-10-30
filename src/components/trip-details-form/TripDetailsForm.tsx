import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import EVService from "../../services/EVService";
import { Button } from "../ui/button";
import { ComboBox } from "../ui/combobox";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { GoogleAutocomplete } from "../ui/google-autocomplete";
import { drivingStyleOptions } from "./const";
import { tripDetailsFormSchema, TripDetailsFormSchema } from "./schema";
import Loader from "../ui/loader";

type TripDetailsFormProps = {
  onSubmit: (data: TripDetailsFormSchema) => void;
};

type Option = {
  value: string;
  label: string;
};

export function TripDetailsForm({ onSubmit }: TripDetailsFormProps) {
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

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["ev-options"],
    queryFn: EVService.getEvOptions,
  });

  if (isPending) {
    return (
      <div className="flex flex-row justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-row justify-center items-center">
        Whoops! There's been an error. Please try again later.
      </div>
    );
  }

  const evDropdownOptions: Option[] = data;

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
                <GoogleAutocomplete name={field.name} />
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
                <GoogleAutocomplete name={field.name} />
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
