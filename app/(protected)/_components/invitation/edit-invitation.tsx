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
import { Button } from "@/components/ui/button";
import { BeatLoader } from "react-spinners";

import { useDispatch, useSelector } from "react-redux";
import {
  selectInvitation,
  changeOrder,
  removeOneWidget,
  addOneWidget,
} from "@/store/invite/inviteSlice";
import { toast } from "sonner";

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
    // setData(useSelector(selectInvitation));
    // const [data, setData] = React.useState<InvitationType>({} as InvitationType);
    const data = useSelector(selectInvitation);

    const [isPending, startTransition] = useTransition();

    useImperativeHandle(ref, () => ({
      onTabChangeSaveData: () => {
        if (data) {
          updateWidgets(data.id, data?.InviteWidget || []);
        }
      },
    }));

    const onClickWidgetButton = (w: InviteWidgetType) => {
      if (data) {
        dispatch(
          addOneWidget({
            ...w,
            id: nanoid(),
            inviteId: data.id,
            order: data.InviteWidget?.length || 1,
          })
        );
      }
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
      startTransition(() => {
        updateInviteWidgets(inviteId, usedWidgets).then(res => {
          if (res?.error) {
            toast.error(res.error);
          }
          if (res?.success) {
            toast.success(res.success);
          }
        });
      });
    };

    if (typeof window !== "undefined") {
      window.onbeforeunload = () => {
        if (data) {
          updateWidgets(data.id, data?.InviteWidget || []);
        }
      };
    }

    useEffect(() => {
      const onLinkClick = () => {
        if (data) {
          updateWidgets(data.id, data?.InviteWidget || []);
        }
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data?.id, data?.InviteWidget]);

    return (
      <>
        {data && (
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
        )}
      </>
    );
  }
);
