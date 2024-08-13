import { Button } from "@/components/ui/button";
import { ArrowBigDown, ArrowBigUp, Settings, SquareX } from "lucide-react";
import { InviteWidgetType } from "@/types/invitation";
import { WidgetSettingsButton } from "@/app/(protected)/_components/invitation/widget-setings-button";

interface WidgetButtonsProps {
  widget: InviteWidgetType;
  totalWidgets: number;
  changePosition: (id: String, direction: "up" | "down") => void;
  removeWidget: (id: String) => void;
  isPending: boolean;
}

export const WidgetButtons = ({
  widget,
  totalWidgets,
  changePosition,
  removeWidget,
  isPending,
}: WidgetButtonsProps) => {
  return (
    <>
      <WidgetSettingsButton asChild widget={widget}>
        <Button
          title="Settings"
          className="hover:bg-yellow-200"
          size="sm"
          variant="link"
          disabled={isPending}
        >
          <Settings />
        </Button>
      </WidgetSettingsButton>
      <Button
        title="Move up"
        className="hover:bg-green-200"
        size="sm"
        variant="link"
        onClick={() => {
          changePosition(widget.id, "up");
        }}
        disabled={widget.order === 0 || isPending}
      >
        <ArrowBigUp />
      </Button>
      <Button
        title="Move down"
        className="hover:bg-green-200"
        size="sm"
        variant="link"
        onClick={() => {
          changePosition(widget.id, "down");
        }}
        disabled={widget.order === totalWidgets - 1 || isPending}
      >
        <ArrowBigDown />
      </Button>
      <Button
        title="Remove"
        className="hover:bg-red-200"
        size="sm"
        variant="link"
        onClick={() => {
          removeWidget(widget.id);
        }}
        disabled={isPending}
      >
        <SquareX />
      </Button>
    </>
  );
};
