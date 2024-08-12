import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { InviteWidgetType } from "@/types/invitation";

interface WidgetSettingsFormProps {
  widget: InviteWidgetType;
}
export const WidgetSettingsForm = ({ widget }: WidgetSettingsFormProps) => {
  return (
    <>
      <Card className="w-[400px] shadow-md border-none">
        <CardHeader>
          <CardTitle>Widget settings</CardTitle>
          <CardDescription>
            Make changes to your widget settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">Universal form fields for all widgets</div>
          <div>{JSON.stringify(widget)}</div>
        </CardContent>
        <CardFooter>
          <Button>Save</Button>
        </CardFooter>
      </Card>
    </>
  );
};
