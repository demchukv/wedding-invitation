import { InvitationType } from "@/types/invitation";
import { wldb as savedWidgets } from "@/app/(protected)/_components/widgets/widgets-list-db";
import { wl as enabledWidgets } from "@/app/(protected)/_components/widgets/widgets-list";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { Widgets } from "@/app/(protected)/_components/widgets/";
import dynamic from "next/dynamic";
import React from "react";

interface EditInvitationProps {
  data: InvitationType;
}

export const EditInvitation = ({ data }: EditInvitationProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const WidgetDbComponents: any = [];
  savedWidgets.map(w => {
    WidgetDbComponents[w.name] = dynamic(
      () =>
        import(`@/app/(protected)/_components/widgets/${w.file}`).then(
          mod => mod[w.name]
        ),
      {
        ssr: false,
      }
    );
  });

  const enabledWidgetComponents: any = [];
  enabledWidgets.map(w => {
    enabledWidgetComponents[w.name] = dynamic(
      () =>
        import(`@/app/(protected)/_components/widgets/${w.file}`).then(
          mod => mod[w.name]
        ),
      {
        ssr: false,
      }
    );
  });

  const addWidget = (id: string, name: string) => {
    const WidgetComponent = enabledWidgetComponents[name];
    return <WidgetComponent key={id} data={data} />;
  };

  const onClickWidgetButton = (w: object) => {
    Object.assign(savedWidgets, { w });
    console.log(savedWidgets);
    // const newWidget = addWidget(id, name);
    // console.log(newWidget);
    // ref.current?.append(newWidget);
  };

  return (
    <div className="grid w-full grid-cols-3 gap-2">
      <div>
        {enabledWidgets.map(w => (
          <div key={w.id}>
            <Button
              variant="custom"
              type="button"
              onClick={() => onClickWidgetButton(w)}
            >
              {w.name}
            </Button>
          </div>
        ))}
      </div>

      <div className="col-span-2" id="invitationArea" ref={ref}>
        {savedWidgets.map(widget => {
          const WidgetComponent = WidgetDbComponents[widget.name];
          return (
            <WidgetComponent
              key={widget.id}
              data={data}
              widgetData={widget.widgetData}
            />
          );
        })}
      </div>
    </div>
  );
};
