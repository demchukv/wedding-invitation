import { Button } from "@/components/ui/button";
import { enabledWidgets } from "@/app/(protected)/_components/widgets/widgets-list";
interface EnabledWidgetsProps {
  onClickWidgetButton: (w: object) => void;
}
export const EnabledWidgets = ({
  onClickWidgetButton,
}: EnabledWidgetsProps) => {
  return (
    <>
      {enabledWidgets.map(w => (
        <div key={w.id}>
          <Button
            variant="outline"
            className="w-full"
            type="button"
            onClick={() => onClickWidgetButton(w)}
          >
            {w.name}
          </Button>
        </div>
      ))}
    </>
  );
};
