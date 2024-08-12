import { InvitationType } from "@/types/invitation";

interface ImageWidgetProps {
  data: InvitationType;
  widgetData: {
    imgSrc: string;
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
export const ImageWidget = ({ data, widgetData }: ImageWidgetProps) => {
  return (
    <div className="py-2">
      <div>Container for image</div>
      <div>SRC: {widgetData.imgSrc}</div>
    </div>
  );
};
