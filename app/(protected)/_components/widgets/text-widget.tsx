import { InvitationType } from "@/types/invitation";

interface TextWidgetProps {
  data: InvitationType;
}
export const TextWidget = ({ data }: TextWidgetProps) => {
  return (
    <div className="py-2 border-b-2">
      <div>{data.nameOne}</div>
      <div>{data.nameTwo}</div>
      <div>{data.endDate.toLocaleDateString()}</div>
    </div>
  );
};
