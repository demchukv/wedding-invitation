import { useTransition } from "react";

import { checkedFeedback } from "@/actions/feedback/checked-feedback";

import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { BeatLoader } from "react-spinners";
import { toast } from "sonner";

interface EditUserFormProps {
  feedbackId: string;
  setOpen: (open: boolean) => void;
}

export const CheckFeedback = ({ feedbackId, setOpen }: EditUserFormProps) => {
  const [isPending, startTransition] = useTransition();
  const onClickCheck = async () => {
    startTransition(() => {
      checkedFeedback(feedbackId).then(res => {
        if (res.success) {
          toast.success("Feedback checked successfully");
        }
        if (res.error) {
          toast.error(res.error);
        }
      });
    });
  };

  return (
    <>
      <DialogContent className="max-w-min">
        <DialogHeader>
          <DialogTitle>Check Feedback</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently check the
            feedback.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-2">
          Do you want to continue?
          <br />
          Click <b>Check</b> below to proceed or click <b>Cancel</b> to go back.
        </div>
        <DialogFooter>
          <Button
            variant="destructive"
            onClick={() => onClickCheck()}
            disabled={isPending}
          >
            {isPending ? <BeatLoader /> : "Check"}
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </>
  );
};
