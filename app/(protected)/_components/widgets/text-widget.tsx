import { InvitationType } from "@/types/invitation";

interface TextWidgetProps {
  data: InvitationType;
  widgetData: {
    text: string;
    tAlign: string;
    tValign: string;
    fSize: string;
    fColor: string;
    fStyle: string;
    fWeight: string;
    fFamily: string;
    bColor: string;
  };
}
export const TextWidget = ({ data, widgetData }: TextWidgetProps) => {
  return (
    <div className="py-2">
      <div>{widgetData.text}</div>
      <div>{data.nameOne}</div>
      <div>{data.nameTwo}</div>
      <div>{data.endDate.toLocaleDateString()}</div>
    </div>
  );
};
