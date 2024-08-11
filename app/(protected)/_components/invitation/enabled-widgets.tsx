import { Button } from "@/components/ui/button";
import { WidgetType } from "@/app/(protected)/_components/widgets/widgets-list";
import { enabledWidgets } from "@/app/(protected)/_components/widgets/widgets-list";
interface EnabledWidgetsProps {
  onClickWidgetButton: (w: WidgetType) => void;
}
export const EnabledWidgets = ({
  onClickWidgetButton,
}: EnabledWidgetsProps) => {
  return (
    <>
      <h2 className="mb-4">Select template</h2>
      {enabledWidgets.map(w => (
        <div key={w.id}>
          <Button
            variant="outline"
            className="w-full"
            type="button"
            onClick={() => onClickWidgetButton(w)}
          >
            {w.displayName}
          </Button>
        </div>
      ))}
    </>
  );
};
