"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { WidgetSettingsForm } from "@/app/(protected)/_components/invitation/widget-settings-form";
import { InviteWidgetType } from "@/types/invitation";

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
  return (
    <Dialog>
      <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
      <DialogDescription></DialogDescription>
      <DialogContent className="p-0 w-auto border-none">
        <DialogTitle></DialogTitle>
        <WidgetSettingsForm widget={widget} />
      </DialogContent>
    </Dialog>
  );
};
