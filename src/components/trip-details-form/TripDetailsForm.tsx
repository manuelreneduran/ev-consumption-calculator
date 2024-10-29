import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { tripDetailsFormSchema, TripDetailsFormSchema } from "./schema";
import { drivingStyleOptions, evOptions } from "./const";

type TripDetailsFormProps = {
  onSubmit: (data: TripDetailsFormSchema) => void;
};

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
