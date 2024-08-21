import { InviteWidgetType, JsonValue } from "@/types/invitation";
import { HexColorPicker } from "react-colorful";
import { useForm } from "react-hook-form";
import { TitleWidgetSchema } from "@/app/(protected)/_components/widgets/title-widget";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface TitleWidgetProps {
  widget: InviteWidgetType;
  saveWidgetData: (widget: InviteWidgetType) => void;
}
export const TitleWidget = ({ widget, saveWidgetData }: TitleWidgetProps) => {
  const wdString = JSON.stringify(widget.widgetData);

  const defaultValues = JSON.parse(wdString);

  const form = useForm<z.infer<typeof TitleWidgetSchema>>({
    resolver: zodResolver(TitleWidgetSchema),
    defaultValues: defaultValues,
  });
  const { isSubmitting, isValid, isDirty } = form.formState;

  const storeChange = (values: z.infer<typeof TitleWidgetSchema>) => {
    console.log(values);
    saveWidgetData({
      ...widget,
      widgetData: values,
    });
  };

  const onSubmit = (values: z.infer<typeof TitleWidgetSchema>) => {
    values = { ...defaultValues, ...values };
    storeChange(values);
  };

  return (
    <div>
      <h1>{widget.name}</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          onChange={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full"
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="nameSeparator"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name separator</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="&" type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Font size</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="20px" type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fColor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Font color</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="#000" type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col justify-center items-center w-full gap-2">
            <Button
              type="submit"
              variant="one"
              disabled={!isValid || !isDirty}
              size="auto"
              className="w-full"
            >
              Save
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
