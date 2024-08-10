import { useTransition } from "react";

import { deleteFeedback } from "@/actions/feedback/delete-feedback";
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
export const FeedbackDeleteAlert = ({
  feedbackId,
  setOpen,
}: EditUserFormProps) => {
  const [isPending, startTransition] = useTransition();
  const onClickDelete = async () => {
    startTransition(() => {
      deleteFeedback(feedbackId).then(res => {
        if (res.success) {
          toast.success("Feedback deleted successfully");
          setOpen(false);
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
          <DialogTitle>Delete Feedback</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete feedback
            and remove it from our servers.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-2">
          Do you want to continue?
          <br />
          Click <b>Delete</b> below to proceed or click <b>Cancel</b> to go
          back.
        </div>
        <DialogFooter>
          <Button
            variant="destructive"
            onClick={() => onClickDelete()}
            disabled={isPending}
          >
            {isPending ? <BeatLoader /> : "Delete"}
          </Button>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </>
  );
};
