import { InvitationType, InviteWidgetType } from "@/types/invitation";

import { EnabledWidgets } from "@/app/(protected)/_components/invitation/enabled-widgets";
import { UsedWidget } from "@/app/(protected)/_components/invitation/used-widget";
import React, {
  useEffect,
  useTransition,
  forwardRef,
  useImperativeHandle,
} from "react";
import { updateInviteWidgets } from "@/actions/invitations/widgets";

import { nanoid } from "nanoid";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BeatLoader } from "react-spinners";

interface EditInvitationProps {
  data: InvitationType;
}
export type EditRef = {
  onTabChangeSaveData: () => void;
};

export const EditInvitation = forwardRef<EditRef, EditInvitationProps>(
  ({ data }, ref) => {
    EditInvitation.displayName = "EditInvitation";

    const [isPending, startTransition] = useTransition();
    const [usedWidgets, setUsedWidgets] = useState<InviteWidgetType[]>(
      data?.InviteWidget
        ? data.InviteWidget.sort((a, b) => a.order - b.order)
        : []
    );

    useImperativeHandle(ref, () => ({
      onTabChangeSaveData: () => {
        updateWidgets(data.id, usedWidgets);
        console.log("On change tab: save invitation data");
      },
    }));

    const onClickWidgetButton = (w: InviteWidgetType) => {
      startTransition(() => {
        setUsedWidgets(prev => [
          ...prev,
          { ...w, id: nanoid(), inviteId: data.id, order: usedWidgets.length },
        ]);
      });
    };

    const removeWidget = (id: String) => {
      startTransition(() => {
        setUsedWidgets(prev => prev.filter(w => w.id !== id));
      });
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
      });
    };

    const updateWidgets = (
      inviteId: string,
      usedWidgets: InviteWidgetType[]
    ) => {
      console.log(usedWidgets);
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

    if (typeof window !== "undefined") {
      window.onbeforeunload = () => {
        updateWidgets(data.id, usedWidgets);
        console.log("before page leave: save invitation data");
      };
    }

    useEffect(() => {
      const onLinkClick = () => {
        updateWidgets(data.id, usedWidgets);
        console.log("After link click: save invitation data");
      };
      const aList = document.querySelectorAll("a");
      aList.forEach(a => {
        a.addEventListener("click", onLinkClick);
      });
      return () => {
        aList.forEach(a => {
          a.removeEventListener("click", onLinkClick);
        });
      };
    }, [data.id, usedWidgets]);

    return (
      <>
        <div className="grid w-auto grid-cols-4 gap-6">
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
          variant="one"
          size="auto"
          className="mt-6"
        >
          {isPending ? <BeatLoader color="white" /> : "Save your changes"}
        </Button>
      </>
    );
  }
);
