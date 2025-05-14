"use client";

import {
  AIInput,
  AIInputSubmit,
  AIInputTextarea,
  AIInputToolbar,
} from "@/components/ui/kibo-ui/ai/input";
import { SendIcon } from "lucide-react";
import { type FormEventHandler, KeyboardEvent } from "react";

interface SearchInputProps {
  onSubmit: FormEventHandler<HTMLFormElement>;
  isLoading: boolean;
}

export const SearchInput = ({ onSubmit, isLoading }: SearchInputProps) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const form = e.currentTarget.form;
      if (form) {
        form.dispatchEvent(
          new Event("submit", { cancelable: true, bubbles: true })
        );
      }
    }
  };

  return (
    <AIInput onSubmit={onSubmit}>
      <AIInputTextarea
        placeholder="Search for gyms, trainers, or fitness studios..."
        disabled={isLoading}
        onKeyDown={handleKeyDown}
      />
      <AIInputToolbar className="justify-end">
        <AIInputSubmit disabled={isLoading}>
          {isLoading ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600" />
          ) : (
            <SendIcon size={16} />
          )}
        </AIInputSubmit>
      </AIInputToolbar>
    </AIInput>
  );
};
