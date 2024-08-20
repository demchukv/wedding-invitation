"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { InviteWidgetType, JsonValue } from "@/types/invitation";
import { WidgetsForm } from "@/app/(protected)/_components/widgets-form";
import { useDispatch } from "react-redux";
import { updateWidgetData } from "@/store/invite/inviteSlice";

interface WidgetSettingsButtonProps {
  children: React.ReactNode;
  asChild?: boolean;
  widget: InviteWidgetType;
}

export const WidgetSettingsButton = ({
  children,
  asChild = false,
  widget,
}: WidgetSettingsButtonProps) => {
  const dispatch = useDispatch();
  const WidgetsFormComponent =
    WidgetsForm[widget.name as keyof typeof WidgetsForm];

  const saveWidgetData = (widget: InviteWidgetType) => {
    dispatch(updateWidgetData(widget as InviteWidgetType));
  };

  return (
    <Dialog>
      <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
      <DialogDescription></DialogDescription>
      <DialogContent className="p-3 pt-10 w-auto border-none">
        <DialogTitle></DialogTitle>
        <WidgetsFormComponent widget={widget} saveWidgetData={saveWidgetData} />
      </DialogContent>
    </Dialog>
  );
};
