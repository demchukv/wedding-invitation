import { InvitationType, InviteWidgetType } from "@/types/invitation";
import { wldb } from "@/app/(protected)/_components/widgets/widgets-list-db";
//TODO: get list of widgets from db for this invitation

import { EnabledWidgets } from "@/app/(protected)/_components/invitation/enabled-widgets";
import { UsedWidget } from "@/app/(protected)/_components/invitation/used-widget";
import { useTransition } from "react";
import { updateInviteWidgets } from "@/actions/invitations/widgets";

import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

interface EditInvitationProps {
  data: InvitationType;
}

export const EditInvitation = ({ data }: EditInvitationProps) => {
  const [isPending, startTransition] = useTransition();
  const [firstRender, setFirstRender] = useState(true);
  const [usedWidgets, setUsedWidgets] = useState<InviteWidgetType[]>(
    data?.InviteWidget || []
  );

  const onClickWidgetButton = (w: InviteWidgetType) => {
    setUsedWidgets(prev => [
      ...prev,
      { ...w, id: nanoid(), inviteId: data.id },
    ]);
  };

  const removeWidget = (id: String) => {
    setUsedWidgets(prev => prev.filter(w => w.id !== id));
  };

  const changePosition = (id: String, direction: "up" | "down") => {
    console.log(id, direction);
    //TODO: add sorting logic
  };

  const updateWidgets = (usedWidgets: InviteWidgetType[]) => {
    startTransition(() => {
      updateInviteWidgets(data.id, usedWidgets).then(res => {
        if (res?.error) {
          console.log(res.error);
        }
        if (res?.success) {
          console.log(res.success);
        }
      });
    });
  };

  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
    } else {
      updateWidgets(usedWidgets);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usedWidgets]);

  return (
    <div className="grid w-full grid-cols-4 gap-6">
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
