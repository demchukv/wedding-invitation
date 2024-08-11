import { InvitationType } from "@/types/invitation";
import dynamic from "next/dynamic";
import React from "react";

interface IncludedWidgetProps {
  data: InvitationType;
  usedWidgets: any;
}
export const IncludedWidget = ({ data, usedWidgets }: IncludedWidgetProps) => {
  const UsedWidgetComponents: any = {};
  for (let i = 0; i < usedWidgets.length; i++) {
    UsedWidgetComponents[usedWidgets[i].id] = dynamic(
      () =>
        import(
          `@/app/(protected)/_components/widgets/${usedWidgets[i].file}`
        ).then(mod => mod[usedWidgets[i].name]),
      {
        ssr: false,
      }
    );
  }

  return (
    <>
      {usedWidgets.length === 0 && <p>Add widgets</p>}

      {usedWidgets.length > 0 && (
        <>
          {usedWidgets.map((widget: any) => {
            const WidgetComponent = UsedWidgetComponents[widget.id];
            return (
              <WidgetComponent
                key={widget.id}
                data={data}
                widgetData={widget.widgetData}
              />
            );
          })}
        </>
      )}
    </>
  );
};
