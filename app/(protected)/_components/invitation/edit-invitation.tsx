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

import { useDispatch, useSelector } from "react-redux";
import {
  selectInvitation,
  changeOrder,
  removeOneWidget,
  addOneWidget,
} from "@/store/invite/inviteSlice";

interface EditInvitationProps {
  // data: InvitationType;
}
export type EditRef = {
  onTabChangeSaveData: () => void;
};

export const EditInvitation = forwardRef<EditRef, EditInvitationProps>(
  ({}, ref) => {
    EditInvitation.displayName = "EditInvitation";

    const dispatch = useDispatch();

    const data = useSelector(selectInvitation);

    const [isPending, startTransition] = useTransition();

    // const [usedWidgets, setUsedWidgets] = useState<InviteWidgetType[]>(
    //   data?.InviteWidget || []
    // );

    // useImperativeHandle(ref, () => ({
    //   onTabChangeSaveData: () => {
    //     updateWidgets(data.id, data?.InviteWidget || []);
    //   },
    // }));

    const onClickWidgetButton = (w: InviteWidgetType) => {
      dispatch(
        addOneWidget({
          ...w,
          id: nanoid(),
          inviteId: data.id,
          order: data.InviteWidget?.length || 1,
        })
      );
    };

    const removeWidget = (id: String) => {
      dispatch(removeOneWidget({ id }));
    };

    const changePosition = (id: String, direction: "up" | "down") => {
      dispatch(changeOrder({ id, direction }));
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
        updateWidgets(data.id, data?.InviteWidget || []);
      };
    }

    useEffect(() => {
      const onLinkClick = () => {
        updateWidgets(data.id, data?.InviteWidget || []);
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
    }, [data.id, data?.InviteWidget]);

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
              usedWidgets={data?.InviteWidget || []}
              removeWidget={removeWidget}
              changePosition={changePosition}
              isPending={isPending}
            />
          </div>
        </div>
        <Button
          onClick={() => updateWidgets(data.id, data?.InviteWidget || [])}
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
