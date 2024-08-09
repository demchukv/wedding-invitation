import { InvitationType } from "@/types/invitation";

interface ImageWidgetProps {
  data: InvitationType;
}
export const ImageWidget = ({ data }: ImageWidgetProps) => {
  return (
    <div>
      <div>Container for image</div>
    </div>
  );
};
