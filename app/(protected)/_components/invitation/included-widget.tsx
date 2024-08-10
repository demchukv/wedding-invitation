import { InvitationType } from "@/types/invitation";
import React from "react";

interface IncludedWidgetProps {
  data: InvitationType;
  savedWidgets: any;
  WidgetDbComponents: any;
}
export const IncludedWidget = ({
  data,
  WidgetDbComponents,
  savedWidgets,
}: IncludedWidgetProps) => {
  return (
    <>
      {savedWidgets.map((widget: any) => {
        const WidgetComponent = WidgetDbComponents[widget.name];
        return (
          <WidgetComponent
            key={widget.id}
            data={data}
            widgetData={widget.widgetData}
          />
        );
      })}
    </>
  );
};
