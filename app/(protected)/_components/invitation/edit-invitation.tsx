import { InvitationType } from "@/types/invitation";

interface EditInvitationProps {
  data: InvitationType;
}
export const EditInvitation = ({ data }: EditInvitationProps) => {
  return (
    <div>
      <div>{data.nameOne}</div>
      <div>{data.nameTwo}</div>
      <div>{data.endDate.toLocaleDateString()}</div>
    </div>
  );
};
