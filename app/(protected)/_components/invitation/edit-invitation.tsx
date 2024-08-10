import { InvitationType } from "@/types/invitation";
import { wldb } from "@/app/(protected)/_components/widgets/widgets-list-db";
import { wl } from "@/app/(protected)/_components/widgets/widgets-list";
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

  const createDynamicComponent = (
    component: React.ComponentType<any>,
    props: any
  ) => {
    const dynamicComponent = React.createElement(component, props);
    return dynamicComponent;
  };

  const WidgetDbComponents: any = [];
  wldb.map(w => {
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

  const widgetComponents: any = {};
  wl.map(w => {
    widgetComponents[w.name] = dynamic(
      () =>
        import(`@/app/(protected)/_components/widgets/${w.file}`).then(
          mod => mod[w.name]
        ),
      {
        ssr: false,
      }
    );
  });

  const onClickWidgetButton = (name: string) => {
    console.log(name);
  };

  return (
    <div className="grid w-full grid-cols-3 gap-2">
      <div>
        {wl.map(w => (
          <div key={w.id}>
            <Button
              variant="custom"
              type="button"
              onClick={() => onClickWidgetButton(w.name)}
            >
              {w.name}
            </Button>
          </div>
        ))}
      </div>

      <div className="col-span-2" id="invitationArea" ref={ref}>
        {wldb.map(widget => {
          const WidgetComponent = WidgetDbComponents[widget.name];
          return <WidgetComponent key={widget.id} data={data} />;
        })}

        {/* <Widgets.TextWidget data={data} /> */}
      </div>
    </div>
  );
};
