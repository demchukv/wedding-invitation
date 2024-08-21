import { Button } from "@/components/ui/button";
import { FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InviteWidgetType, JsonValue } from "@/types/invitation";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";

interface TitleWidgetProps {
  widget: InviteWidgetType;
  saveWidgetData: (widget: InviteWidgetType) => void;
}
export const TitleWidget = ({ widget, saveWidgetData }: TitleWidgetProps) => {
  const wdString = JSON.stringify(widget.widgetData);
  const [values, setValues] = useState(JSON.parse(wdString));

  const storeChange = () => {
    const tmpString = JSON.stringify(values);
    saveWidgetData({
      ...widget,
      widgetData: JSON.parse(tmpString) as JsonValue,
    });
  };
  const onSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    storeChange();
  };

  return (
    <div>
      <h1>{widget.name}</h1>
      <form onSubmit={onSubmit}>
        <FormItem>
          <label htmlFor="fSize">Font Size</label>
          <Input
            type="text"
            name="fSize"
            id="fSize"
            value={values.fSize}
            onChange={evt => {
              setValues({ ...values, [evt.target.name]: evt.target.value });
              storeChange();
            }}
          />
        </FormItem>
        <FormItem>
          <label htmlFor="fColor">Font Color</label>
          <Input
            type="text"
            name="fColor"
            id="fColor"
            value={values.fColor}
            onChange={evt => {
              setValues({ ...values, fColor: evt.target.value });
              storeChange();
            }}
          />
        </FormItem>
        <Button variant="two" type="submit">
          Save
        </Button>
      </form>
    </div>
  );
};
