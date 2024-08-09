import { InvitationType } from "@/types/invitation";
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

  const widgetComponents: any = {};

  wl.map(w => {
    widgetComponents[w.name] = dynamic(
      () =>
        import(`@/app/(protected)/_components/widgets/${w.name}`).then(
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
        {wl.map((w, idx) => (
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
        <Widgets.TextWidget data={data} />
      </div>
    </div>
  );
};
