import { InvitationType } from "@/types/invitation";
import dynamic from "next/dynamic";
import { wl } from "@/app/(protected)/_components/widgets/widgets-list";
import { Button } from "@/components/ui/button";
// import { DynamicComponents } from "@/app/(protected)/_components/dynamic-components";

interface EditInvitationProps {
  data: InvitationType;
}

const widgetComponents = [];

wl.map(w => {
  console.log(w.name);
  widgetComponents.push(
    dynamic(
      () =>
        import(`@/app/(protected)/_components/widgets/${w.name}`).then(
          mod => mod[w.name]
        ),
      {
        loading: () => <p>Loading...</p>,
        ssr: false,
      }
    )
  );
});

export const EditInvitation = ({ data }: EditInvitationProps) => {
  const onClickWidgetButton = (name: string, idx: number) => {
    console.log(name);
  };

  return (
    <div className="grid w-full grid-cols-3 gap-2">
      <div>
        {wl.map((w, idx) => (
          <div key={w.id}>
            <Button
              variant="custom"
              type="button"
              onClick={() => onClickWidgetButton(w.name, idx)}
            >
              {w.name}
            </Button>
          </div>
        ))}
      </div>
      <div className="col-span-2" id="invitationArea">
        {/* <Widgets.TextWidget data={data} /> */}
      </div>
    </div>
  );
};
