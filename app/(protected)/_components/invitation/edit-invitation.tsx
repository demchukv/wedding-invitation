import { InvitationType, InviteWidgetType } from "@/types/invitation";

import { EnabledWidgets } from "@/app/(protected)/_components/invitation/enabled-widgets";
import { UsedWidget } from "@/app/(protected)/_components/invitation/used-widget";
import { useTransition } from "react";
import { updateInviteWidgets } from "@/actions/invitations/widgets";

import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

interface EditInvitationProps {
  data: InvitationType;
}

export const EditInvitation = ({ data }: EditInvitationProps) => {
  const [isPending, startTransition] = useTransition();
  // const [error, setError] = useState<string | null>(null);
  const [firstRender, setFirstRender] = useState(true);
  const [usedWidgets, setUsedWidgets] = useState<InviteWidgetType[]>(
    data?.InviteWidget || []
  );

  const onClickWidgetButton = (w: InviteWidgetType) => {
    setUsedWidgets(prev => [
      ...prev,
      { ...w, id: nanoid(), inviteId: data.id, order: usedWidgets.length },
    ]);
  };

  const removeWidget = (id: String) => {
    setUsedWidgets(prev => prev.filter(w => w.id !== id));
  };

  const changePosition = (id: String, direction: "up" | "down") => {
    usedWidgets.sort((a, b) => a.order - b.order);
    for (let i = 0; i < usedWidgets.length; i++) {
      usedWidgets[i].order = i;
    }
    for (let i = 0; i < usedWidgets.length; i++) {
      if (
        usedWidgets[i].id === id &&
        direction === "up" &&
        usedWidgets[i].order > 0
      ) {
        usedWidgets[i].order = usedWidgets[i].order - 1;
        usedWidgets[i - 1].order = usedWidgets[i - 1].order + 1;
      }
      if (
        usedWidgets[i].id === id &&
        direction === "down" &&
        usedWidgets[i].order < usedWidgets.length - 1
      ) {
        usedWidgets[i].order = usedWidgets[i].order + 1;
        usedWidgets[i + 1].order = usedWidgets[i + 1].order - 1;
      }
    }
    setUsedWidgets(prev => prev.sort((a, b) => a.order - b.order));
    updateWidgets(usedWidgets);
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
          {/* {isPending && <BeatLoader />} */}
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
