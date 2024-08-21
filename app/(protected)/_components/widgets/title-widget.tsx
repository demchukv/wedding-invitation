import { InvitationType } from "@/types/invitation";
import * as z from "zod";

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

export const TitleWidgetSchema = z.object({
  nameSeparator: z.string().min(1),
  fSize: z.string().min(3),
  fColor: z.string().min(3),
});

export const TitleWidget = ({ data, widgetData }: TitleWidgetProps) => {
  return (
    <>
      <div className="h-full w-full flex gap-4 justify-center items-center text-lg font-semibold bg-amber-100">
        <div style={{ fontSize: widgetData.fSize, color: widgetData.fColor }}>
          {data.nameOne}
        </div>
        {widgetData.nameSeparator !== "" && (
          <div style={{ fontSize: widgetData.fSize, color: widgetData.fColor }}>
            {widgetData.nameSeparator}
          </div>
        )}
        <div style={{ fontSize: widgetData.fSize, color: widgetData.fColor }}>
          {data.nameTwo}
        </div>
      </div>
    </>
  );
};
