import { InvitationType } from "@/types/invitation";

interface ImageWidgetProps {
  data: InvitationType;
}
export const ImageWidget = ({ data }: ImageWidgetProps) => {
  return (
    <div className="py-2 border-b-2">
      <div>Container for image</div>
    </div>
  );
};
