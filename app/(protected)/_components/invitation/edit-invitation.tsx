import { InvitationType } from "@/types/invitation";
import { wldb as savedWidgets } from "@/app/(protected)/_components/widgets/widgets-list-db";
import { wl as enabledWidgets } from "@/app/(protected)/_components/widgets/widgets-list";
import dynamic from "next/dynamic";

import { IncludedWidget } from "@/app/(protected)/_components/invitation/included-widget";
import { EnabledWidgets } from "@/app/(protected)/_components/invitation/enabled-widgets";
import { useEffect, useState } from "react";

interface EditInvitationProps {
  data: InvitationType;
}

export const EditInvitation = ({ data }: EditInvitationProps) => {
  const [savedWidgets, setSavedWidgets] = useState<any[]>([]);
  const [WidgetDbComponents, setWidgetDbComponents] = useState<any[]>([]);

  const enabledWidgetComponents: any = [];
  enabledWidgets.map(w => {
    enabledWidgetComponents[w.name] = dynamic(
      () =>
        import(`@/app/(protected)/_components/widgets/${w.file}`).then(
          mod => mod[w.name]
        ),
      {
        ssr: false,
      }
    );
  });

  const onClickWidgetButton = (w: object) => {
    setSavedWidgets(prev => [...prev, w]);
    console.log(savedWidgets);
  };

  useEffect(() => {
    const getSavedWidgets = () => {
      for (let i = 0; i < savedWidgets.length; i++) {
        WidgetDbComponents[savedWidgets[i].name] = dynamic(
          () =>
            import(
              `@/app/(protected)/_components/widgets/${savedWidgets[i].file}`
            ).then(mod => mod[savedWidgets[i].name]),
          {
            ssr: false,
          }
        );
      }
      setWidgetDbComponents(WidgetDbComponents);
    };

    getSavedWidgets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grid w-full grid-cols-3 gap-2">
      <div>
        <EnabledWidgets
          enabledWidgets={enabledWidgets}
          onClickWidgetButton={onClickWidgetButton}
        />
      </div>

      <div className="col-span-2" id="invitationArea">
        <IncludedWidget
          data={data}
          savedWidgets={savedWidgets}
          WidgetDbComponents={WidgetDbComponents}
        />
      </div>
    </div>
  );
};
