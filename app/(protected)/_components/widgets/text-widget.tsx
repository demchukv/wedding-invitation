import { InvitationType } from "@/types/invitation";

interface TextWidgetProps {
  data: InvitationType;
}
export const TextWidget = ({ data }: TextWidgetProps) => {
  return (
    <div>
      <div>{data.nameOne}</div>
      <div>{data.nameTwo}</div>
      <div>{data.endDate.toLocaleDateString()}</div>
    </div>
  );
};
