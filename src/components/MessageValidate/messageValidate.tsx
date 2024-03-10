import React from "react";

const MessageValidate = ({
  message,
  className,
}: {
  message: string;
  className?: string;
}) => {
  return (
    <div
      className={`flex z-0 flex-row-reverse flex-wrap md:align-items-center ${className}`}
    >
      <div className="md:align-items-center">
        <p className="text-base text-red-500">
          <em>{message}</em>
        </p>
      </div>
      <i className="pi pi-exclamation-triangle mr-1 text-red-500"></i>
    </div>
  );
};

export default MessageValidate;
