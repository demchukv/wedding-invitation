import { InvitationType, InviteWidgetType } from "@/types/invitation";

import { EnabledWidgets } from "@/app/(protected)/_components/invitation/enabled-widgets";
import { UsedWidget } from "@/app/(protected)/_components/invitation/used-widget";
import { useEffect, useTransition } from "react";
import { updateInviteWidgets } from "@/actions/invitations/widgets";

import { nanoid } from "nanoid";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BeatLoader } from "react-spinners";

interface EditInvitationProps {
  data: InvitationType;
  save: boolean;
}

export const EditInvitation = ({ data, save }: EditInvitationProps) => {
  const [isPending, startTransition] = useTransition();
  // const [firstRender, setFirstRender] = useState(true);
  const [usedWidgets, setUsedWidgets] = useState<InviteWidgetType[]>(
    data?.InviteWidget
      ? data.InviteWidget.sort((a, b) => a.order - b.order)
      : []
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
    startTransition(() => {
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
      usedWidgets.sort((a, b) => a.order - b.order);
      for (let i = 0; i < usedWidgets.length; i++) {
        usedWidgets[i].order = i;
      }
      setUsedWidgets(usedWidgets);
      // updateWidgets(usedWidgets);
    });
  };

  const updateWidgets = (inviteId: string, usedWidgets: InviteWidgetType[]) => {
    startTransition(() => {
      updateInviteWidgets(inviteId, usedWidgets).then(res => {
        if (res?.error) {
          console.log(res.error);
        }
        if (res?.success) {
          console.log(res.success);
        }
      });
    });
  };
  // useEffect(() => {
  //   if (firstRender) {
  //     setFirstRender(false);
  //   } else {
  //     updateWidgets(usedWidgets);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [usedWidgets]);

  console.log(save);
  if (save) {
    updateWidgets(data.id, usedWidgets);
    console.log("before tab change: save invitation data");
  }

  if (typeof window !== "undefined") {
    window.onbeforeunload = event => {
      event.preventDefault();
      updateWidgets(data.id, usedWidgets);
      console.log("before page leave: save invitation data");
    };
  }

  const onLinkClick = (event: any) => {
    updateWidgets(data.id, usedWidgets);
  };

  const aList = document.querySelectorAll("a");
  aList.forEach(a => {
    a.addEventListener("click", onLinkClick);
  });

  // useEffect(() => {
  //   return () => {
  //     aList.forEach(a => {
  //       a.removeEventListener("click", onLinkClick);
  //     });
  //   }
  // }, []);

  return (
    <>
      <div className="grid w-full grid-cols-4 gap-6">
        <div>
          <EnabledWidgets
            onClickWidgetButton={onClickWidgetButton}
            isPending={isPending}
          />
        </div>

        <div className="col-span-3" id="invitationArea">
          <UsedWidget
            data={data}
            usedWidgets={usedWidgets}
            removeWidget={removeWidget}
            changePosition={changePosition}
            isPending={isPending}
          />
        </div>
      </div>
      <Button
        onClick={() => updateWidgets(data.id, usedWidgets)}
        disabled={isPending}
        variant="default"
        className="w-full mt-6"
      >
        {isPending ? <BeatLoader color="white" /> : "Save your changes"}
      </Button>
    </>
  );
};
