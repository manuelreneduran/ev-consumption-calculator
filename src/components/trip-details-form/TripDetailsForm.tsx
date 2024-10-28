import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { tripDetailsFormSchema, TripDetailsFormSchema } from "./schema";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

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
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-6"
      >
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

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
