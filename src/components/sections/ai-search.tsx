"use client";

import {
  AIInput,
  AIInputSubmit,
  AIInputTextarea,
  AIInputToolbar,
} from "@/components/ui/kibo-ui/ai/input";
import { SendIcon } from "lucide-react";
import { type FormEventHandler } from "react";

const AiSearch = () => {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const message = formData.get("message");
    console.log("Submitted message:", message);
  };
  return (
    <AIInput onSubmit={handleSubmit}>
      <AIInputTextarea />
      <AIInputToolbar className="justify-end">
        <AIInputSubmit>
          <SendIcon size={16} />
        </AIInputSubmit>
      </AIInputToolbar>
    </AIInput>
  );
};
export default AiSearch;
