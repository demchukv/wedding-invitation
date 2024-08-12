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
import { ReviewType } from "@/types/review";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { ReviewDeleteAlert } from "./review-delete-alert";
import { EditReviewForm } from "./edit-review-form";
import { EditReviewModal } from "./edit-review-modal";

export const ActionsReviewMenu = ({ review }: { review: ReviewType }) => {
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  const openModal = (action: string) => {
    if (action === "edit") {
      setModalType(action);
      setOpen(true);
    }
    if (action === "delete") {
      setModalType("delete");
      setOpen(true);
    }
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
          <DropdownMenuSeparator />
          <DropdownMenuItem
            style={{ cursor: "pointer" }}
            onClick={() => openModal("edit")}
          >
            Edit review
          </DropdownMenuItem>
          <DropdownMenuItem
            style={{ cursor: "pointer" }}
            onClick={() => openModal("delete")}
          >
            Delete review
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={open} modal={true} onOpenChange={setOpen}>
        <DialogContent>
          {modalType === "edit" && <EditReviewModal id={review.id} />}
          {modalType === "delete" && (
            <ReviewDeleteAlert id={review.id} setOpen={setOpen} />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
