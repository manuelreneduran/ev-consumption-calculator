import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import EVService from "../../services/EVService";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { drivingStyleOptions } from "./const";
import { tripDetailsFormSchema, TripDetailsFormSchema } from "./schema";
import { ComboBox } from "../ui/combobox";

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
      drivingStyle: "3", // Default value (e.g., "Regular")
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
        className="flex flex-col gap-y-6"
      >
        {/* Origin Field */}
        <FormField
          control={form.control}
          name="origin"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-y-2 relative">
              <FormLabel>Starting Location</FormLabel>
              <FormControl>
                <Input placeholder="Starting location" {...field} />
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
                <Input placeholder="Destination" {...field} />
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a driving style" />
                  </SelectTrigger>
                  <SelectContent>
                    {drivingStyleOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
