"use client";

import { InvitationType, InviteWidgetType } from "@/types/invitation";
import { WidgetButtons } from "@/app/(protected)/_components/invitation/widget-buttons";
// import dynamic from "next/dynamic";
import { Widgets } from "@/app/(protected)/_components/widgets";
import { useSelector } from "react-redux";
import { selectInvitation } from "@/store/invite/inviteSlice";

interface UsedWidgetProps {
  removeWidget: (id: String) => void;
  changePosition: (id: String, direction: "up" | "down") => void;
  isPending: boolean;
}

export const UsedWidget = ({
  removeWidget,
  changePosition,
  isPending,
}: UsedWidgetProps) => {
  const data = useSelector(selectInvitation);
  const usedWidgets = data?.InviteWidget || [];

  return (
    <>
      {usedWidgets.length === 0 && (
        <p>Add widgets from left panel for start editing your invitation</p>
      )}

      {data && usedWidgets.length > 0 && (
        <>
          {usedWidgets.map((widget: InviteWidgetType) => {
            const WidgetComponent =
              Widgets[widget.name as keyof typeof Widgets];

            return (
              <div
                key={widget.id}
                className="w-full flex flex-row justify-between  border-b-2"
              >
                <div className="w-full">
                  <WidgetComponent
                    key={widget.id}
                    data={data}
                    widgetData={widget.widgetData as any}
                  />
                </div>
                <div className="bg-slate-100 p-2 flex flex-col justify-between gap-2">
                  <WidgetButtons
                    widget={widget}
                    totalWidgets={usedWidgets.length}
                    removeWidget={removeWidget}
                    changePosition={changePosition}
                    isPending={isPending}
                  />
                </div>
              </div>
            );
          })}
        </>
      )}
    </>
  );
};
