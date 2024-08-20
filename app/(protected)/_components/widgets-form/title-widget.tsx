import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InviteWidgetType, JsonValue } from "@/types/invitation";
import { useState } from "react";

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
        <Input
          type="text"
          value={values.fSize}
          onChange={evt => {
            setValues({ ...values, fSize: evt.target.value });
            storeChange();
          }}
          readOnly={false}
        />
        <Button variant="two" type="submit">
          Save
        </Button>
      </form>
    </div>
  );
};
