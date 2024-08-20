import { InviteWidgetType } from "@/types/invitation";

interface TextWidgetProps {
  widget: InviteWidgetType;
}
export const TextWidget = ({ widget }: TextWidgetProps) => {
  return <div>{widget.name} Title Widget Form</div>;
};
