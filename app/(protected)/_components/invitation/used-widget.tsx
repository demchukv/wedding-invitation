import { Button } from "@/components/ui/button";
import { InvitationType } from "@/types/invitation";
import { ArrowBigDown, ArrowBigUp, Settings, SquareX } from "lucide-react";
import { WidgetType } from "@/app/(protected)/_components/widgets/widgets-list";
import dynamic from "next/dynamic";
import React from "react";

interface UsedWidgetProps {
  data: InvitationType;
  usedWidgets: WidgetType[];
  removeWidget: (id: string) => void;
  changePosition: (id: string, direction: "up" | "down") => void;
}
export const UsedWidget = ({
  data,
  usedWidgets,
  removeWidget,
  changePosition,
}: UsedWidgetProps) => {
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
          {usedWidgets.map((widget: WidgetType) => {
            const WidgetComponent = UsedWidgetComponents[widget.id];
            return (
              <div
                key={widget.id}
                className="w-full flex flex-row justify-between  border-b-2"
              >
                <div>
                  <WidgetComponent
                    key={widget.id}
                    data={data}
                    widgetData={widget.widgetData}
                  />
                </div>
                <div className="bg-slate-100 p-2 flex flex-col justify-between gap-2">
                  <Button
                    title="Settings"
                    className="hover:bg-yellow-200"
                    size="sm"
                    variant="link"
                  >
                    <Settings />
                  </Button>
                  <Button
                    title="Move up"
                    className="hover:bg-green-200"
                    size="sm"
                    variant="link"
                    onClick={() => {
                      changePosition(widget.id, "up");
                    }}
                  >
                    <ArrowBigUp />
                  </Button>
                  <Button
                    title="Move down"
                    className="hover:bg-green-200"
                    size="sm"
                    variant="link"
                    onClick={() => {
                      changePosition(widget.id, "down");
                    }}
                  >
                    <ArrowBigDown />
                  </Button>
                  <Button
                    title="Remove"
                    className="hover:bg-red-200"
                    size="sm"
                    variant="link"
                    onClick={() => {
                      removeWidget(widget.id);
                    }}
                  >
                    <SquareX />
                  </Button>
                </div>
              </div>
            );
          })}
        </>
      )}
    </>
  );
};
