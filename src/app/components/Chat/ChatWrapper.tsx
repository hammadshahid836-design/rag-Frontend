"use client";

import { forwardRef, useImperativeHandle, useState } from "react";
import MessageList from "./Messages";
import { useChat } from "@/hooks/useChat";

interface ChatWrapperProps {
  withContext: boolean;
  setContext?: (data: any) => void;
  context?: any;
}

export interface ChatInterface {
  handleMessageSubmit: (e: any) => void;
  handleInputUpdated: (e: any) => void;
}

const ChatWrapper = forwardRef<ChatInterface, ChatWrapperProps>(
  ({ withContext, setContext, context }, ref) => {

    const { messages, sendMessage, isLoading } = useChat(1);
    const [input, setInput] = useState("");

    const handleSubmit = async (e: any) => {
      e.preventDefault();
      if (!input.trim()) return;

      await sendMessage(input);
      setInput("");
    };

    const handleInputChange = (e: any) => {
      setInput(e.target.value);
    };

    useImperativeHandle(ref, () => ({
      handleMessageSubmit: handleSubmit,
      handleInputUpdated: handleInputChange,
    }));

    return (
      <div className="flex flex-col h-full overflow-hidden border-r border-gray-200 last:border-r-0">
        <div className="flex-grow overflow-y-auto p-4">
          <MessageList
            messages={messages}
            withContext={withContext}
            context={context}
          />
        </div>
      </div>
    );
  }
);

ChatWrapper.displayName = "ChatWrapper";
export default ChatWrapper;
