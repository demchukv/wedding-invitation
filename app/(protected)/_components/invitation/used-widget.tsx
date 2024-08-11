import { InvitationType, InviteWidgetType } from "@/types/invitation";
import { WidgetButtons } from "@/app/(protected)/_components/invitation/widget-buttons";
import dynamic from "next/dynamic";

interface UsedWidgetProps {
  data: InvitationType;
  usedWidgets: InviteWidgetType[];
  removeWidget: (id: String) => void;
  changePosition: (id: String, direction: "up" | "down") => void;
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
          {usedWidgets.map((widget: InviteWidgetType) => {
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
                  <WidgetButtons
                    widget={widget}
                    removeWidget={removeWidget}
                    changePosition={changePosition}
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
