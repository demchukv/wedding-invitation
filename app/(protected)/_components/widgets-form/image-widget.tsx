import { InviteWidgetType } from "@/types/invitation";

interface ImageWidgetProps {
  widget: InviteWidgetType;
}
export const ImageWidget = ({ widget }: ImageWidgetProps) => {
  return <div>{widget.name} Title Widget Form</div>;
};
