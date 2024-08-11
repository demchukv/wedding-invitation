import { InvitationType } from "@/types/invitation";
import { wldb } from "@/app/(protected)/_components/widgets/widgets-list-db";

import { EnabledWidgets } from "@/app/(protected)/_components/invitation/enabled-widgets";
import { IncludedWidget } from "@/app/(protected)/_components/invitation/included-widget";
import { WidgetType } from "@/app/(protected)/_components/widgets/widgets-list";

import { nanoid } from "nanoid";
import { useState } from "react";

interface EditInvitationProps {
  data: InvitationType;
}

export const EditInvitation = ({ data }: EditInvitationProps) => {
  const [usedWidgets, setUsedWidgets] = useState<any[]>(wldb);

  const onClickWidgetButton = (w: WidgetType) => {
    w = { ...w, id: nanoid() };
    // console.log(w);
    setUsedWidgets(prev => [...prev, w]);
  };
  const removeWidget = (id: string) => {
    setUsedWidgets(prev => prev.filter(w => w.id !== id));
  };

  const changePosition = (id: string, direction: "up" | "down") => {
    console.log(id, direction);
    //TODO: add sorting logic
  };

  return (
    <div className="grid w-full grid-cols-3 gap-2">
      <div>
        <EnabledWidgets onClickWidgetButton={onClickWidgetButton} />
      </div>

      <div className="col-span-2" id="invitationArea">
        <>
          <IncludedWidget
            data={data}
            usedWidgets={usedWidgets}
            removeWidget={removeWidget}
            changePosition={changePosition}
          />
        </>
      </div>
    </div>
  );
};
