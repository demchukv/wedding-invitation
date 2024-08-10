import { Button } from "@/components/ui/button";
interface EnabledWidgetsProps {
  enabledWidgets: any[];
  onClickWidgetButton: (w: object) => void;
}
export const EnabledWidgets = ({
  enabledWidgets,
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
