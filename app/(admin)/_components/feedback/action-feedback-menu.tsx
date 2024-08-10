import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FeedbackType } from "@/types/feedback";
import { MoreHorizontal } from "lucide-react";
import { FeedbackDeleteAlert } from "./delete-feedback-alert";
import { OpenFeedbackModal } from "./open-feedback-modal";
import { CheckFeedback } from "./check-feedback-alert";

export const ActionsFeedbackMenu = ({
  feedback,
}: {
  feedback: FeedbackType;
}) => {
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  const openModal = (action: string) => {
    setModalType(action);
    setOpen(true);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => openModal("check")}>
            Check feedback
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => openModal("open")}>
            Open completely
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => openModal("delete")}>
            Delete feedback
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={open} onOpenChange={setOpen}>
        {modalType === "check" && (
          <CheckFeedback feedbackId={feedback.id} setOpen={setOpen} />
        )}
        {modalType === "open" && <OpenFeedbackModal feedback={feedback} />}
        {modalType === "delete" && (
          <FeedbackDeleteAlert feedbackId={feedback.id} setOpen={setOpen} />
        )}
      </Dialog>
    </>
  );
};
