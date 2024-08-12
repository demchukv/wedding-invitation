import { FC } from "react";
import { FeedbackType } from "@/types/feedback";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { CopyableField } from "./copyable-field";

interface OpenFeedbackModalProps {
  feedback: FeedbackType;
}

export const OpenFeedbackModal: FC<OpenFeedbackModalProps> = ({ feedback }) => {
  return (
    <DialogContent>
      <DialogTitle>Feedback Details</DialogTitle>
      {feedback.userId && (
        <CopyableField label="User ID" value={feedback.userId} />
      )}

      {[
        { label: "Username", value: feedback.name },
        { label: "Email", value: feedback.email },
        { label: "Phone", value: feedback.phone },
        { label: "Message", value: feedback.message },
      ].map(field => (
        <div key={field.label} className="mt-4">
          <h4 className="font-bold text-lg mb-2 text-slate-700 dark:text-slate-300">
            {field.label}
          </h4>
          <p className="text-slate-700 dark:text-slate-300">{field.value}</p>
        </div>
      ))}

      <div className="mt-4">
        <h4 className="font-bold text-lg mb-2 text-slate-700 dark:text-slate-300">
          State
        </h4>
        <p
          className={`text-sm font-bold ${
            feedback.state === "NEW" ? "text-green-800" : "text-red-800"
          }`}
        >
          {feedback.state}
        </p>
      </div>

      <div className="mt-4">
        <h4 className="font-bold text-lg mb-2 text-slate-700 dark:text-slate-300">
          Date Created
        </h4>
        <p className="text-slate-700 dark:text-slate-300">
          {feedback.createdAt.toDateString()}
        </p>
      </div>
    </DialogContent>
  );
};
