import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

export const EditableTextCell = ({ getValue }: any) => {
  const initialValue = getValue().toString();
  const [value, setValue] = useState(initialValue);
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);
  return <Input value={value} onChange={e => setValue(e.target.value)} />;
};
