import { InvitationType } from "@/types/invitation";
import { wldb } from "@/app/(protected)/_components/widgets/widgets-list-db";
//TODO: get list of widgets from db for this invitation

import { EnabledWidgets } from "@/app/(protected)/_components/invitation/enabled-widgets";
import { UsedWidget } from "@/app/(protected)/_components/invitation/used-widget";
import { WidgetType } from "@/app/(protected)/_components/widgets/widgets-list";

import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

interface EditInvitationProps {
  data: InvitationType;
}

export const EditInvitation = ({ data }: EditInvitationProps) => {
  const [usedWidgets, setUsedWidgets] = useState<WidgetType[]>(
    data?.InviteWidget || []
  );

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

  //TODO: add useEffect to save changes to DB after change usedWidgets
  useEffect(() => {}, [usedWidgets]);

  return (
    <div className="grid w-full grid-cols-4 gap-2">
      <div>
        <EnabledWidgets onClickWidgetButton={onClickWidgetButton} />
      </div>

      <div className="col-span-3" id="invitationArea">
        <>
          <UsedWidget
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
