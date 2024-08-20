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
import { WidgetsForm } from "@/app/(protected)/_components/invitation/widgets-form";

interface WidgetSettingsFormProps {
  widget: InviteWidgetType;
}
export const WidgetSettingsForm = ({ widget }: WidgetSettingsFormProps) => {
  return (
    <>
      <Card className="max-w-[440px] shadow-md border-none">
        <CardHeader>
          <CardTitle>Widget settings</CardTitle>
          <CardDescription>
            Make changes to your widget settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">Universal form fields for all widgets</div>
          <div>{JSON.stringify(widget, null, 2)}</div>
          <WidgetsForm widget={widget} />
        </CardContent>
        <CardFooter className="hidden"></CardFooter>
      </Card>
    </>
  );
};
