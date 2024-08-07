import {
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
  
  interface EditReviewFormProps {
    id: string;
  }
  export const EditReviewForm = ({ id }: EditReviewFormProps) => {
    return (
      <>
        <DialogHeader>
          <DialogTitle>Edit Review</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          FORM - {id}
        </div>
      </>
    );
  };
  