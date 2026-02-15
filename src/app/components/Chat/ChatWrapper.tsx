"use client";

import { forwardRef, useImperativeHandle } from "react";
// @ts-ignore - This tells VS Code to ignore the "Cannot find module" error
import { useChat } from "ai/react";
import MessageList from "./Messages";

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
    
    // We keep the logic the same, as the library is actually installed
    const { messages, input, handleInputChange, handleSubmit }: any = useChat({
      api: "http://127.0.0.1:8000/chat",
      body: { withContext: withContext },
    });

    useImperativeHandle(ref, () => ({
      handleMessageSubmit: (e: any) => handleSubmit(e),
      handleInputUpdated: (e: any) => handleInputChange(e),
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