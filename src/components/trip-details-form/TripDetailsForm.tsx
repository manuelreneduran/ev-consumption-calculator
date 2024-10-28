import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { tripDetailsFormSchema, TripDetailsFormSchema } from "./schema";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Tabs } from "../ui/tabs";

type TripDetailsFormProps = {
  onSubmit: (data: TripDetailsFormSchema) => void;
};

const evOptions = [
  { value: "1", label: "Tesla Model S" },
  { value: "2", label: "Nissan Leaf" },
  { value: "3", label: "Chevy Bolt" },
  { value: "4", label: "Other" },
];

const drivingStyleOptions = [
  { value: "1", label: "Very Efficient" },
  { value: "2", label: "Efficient" },
  { value: "3", label: "Regular (Recommended)" },
  { value: "4", label: "Aggressive" },
  { value: "5", label: "Very Aggressive" },
];
export function TripDetailsForm({ onSubmit }: TripDetailsFormProps) {
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a EV" />
                  </SelectTrigger>
                  <SelectContent>
                    {evOptions.map((option) => (
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
