import React from "react";
import { InviteWidgetType } from "@/types/invitation";
import WidgetItem from "./WidgetItem";

interface UsedWidgetProps {
  data: any;
  usedWidgets: InviteWidgetType[];
  removeWidget: (id: string) => void;
  changePosition: (id: string, direction: "up" | "down") => void;
}

export const UsedWidget = React.memo(
  ({ data, usedWidgets, removeWidget, changePosition }: UsedWidgetProps) => {
    return (
      <>
        {usedWidgets.length === 0 ? (
          <p>
            Add widgets from the left panel to start editing your invitation
          </p>
        ) : (
          usedWidgets.map(widget => (
            <WidgetItem
              key={widget.id}
              widget={widget}
              data={data}
              removeWidget={removeWidget}
              changePosition={changePosition}
            />
          ))
        )}
      </>
    );
  }
);

UsedWidget.displayName = "UsedWidget";
