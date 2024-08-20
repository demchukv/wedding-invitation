import { InvitationType } from "@/types/invitation";

export interface TitleWidgetProps {
  data: InvitationType;
  widgetData: {
    nameSeparator: string;
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
export const TitleWidget = ({ data, widgetData }: TitleWidgetProps) => {
  return (
    <>
      <div className="h-full w-full flex gap-4 justify-center items-center text-lg font-semibold bg-amber-100">
        <div style={{ fontSize: widgetData.fSize }}>{data.nameOne}</div>
        {widgetData.nameSeparator !== "" && (
          <div>{widgetData.nameSeparator}</div>
        )}
        <div>{data.nameTwo}</div>
      </div>
    </>
  );
};
