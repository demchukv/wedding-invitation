import React, { useCallback } from "react";
import dynamic from "next/dynamic";
import { BeatLoader } from "react-spinners";
import { InviteWidgetType } from "@/types/invitation";
import { WidgetButtons } from "@/app/(protected)/_components/invitation/widget-buttons";
import { ImageWidget } from "../widgets/image-widget";
import { TextWidget } from "../widgets/text-widget";

interface WidgetItemProps {
  widget: InviteWidgetType;
  data: any;
  removeWidget: (id: string) => void;
  changePosition: (id: string, direction: "up" | "down") => void;
}

const WidgetItem = React.memo(
  ({ widget, data, removeWidget, changePosition }: WidgetItemProps) => {
    const widgetComponent: {
      [name: string]: React.ComponentType<{ widgetData: any; data: any }>;
    } = {
      ImageWidget,
      TextWidget,
      // Add more widgets here as needed
    };

    const WidgetComponent = widgetComponent[widget.name];

    return (
      <div className="w-full flex flex-row justify-between border-b-2">
        <div className="p-2">
          <WidgetComponent widgetData={widget} data={data} />
        </div>
        <div className="bg-slate-100 p-2 flex flex-col justify-between gap-2">
          <WidgetButtons
            widget={widget}
            totalWidgets={data.InviteWidget.length}
            removeWidget={useCallback(
              () => removeWidget(widget.id),
              [removeWidget, widget.id]
            )}
            changePosition={useCallback<any>(
              (direction: "up" | "down") =>
                changePosition(widget.id, direction),
              [changePosition, widget.id]
            )}
          />
        </div>
      </div>
    );
  }
);

WidgetItem.displayName = "WidgetItem";

export default WidgetItem;
