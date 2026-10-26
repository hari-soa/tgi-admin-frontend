import React from "react";

const Toast = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-5 right-5 bg-blue-600 text-white px-5 py-3 rounded-xl shadow-2xl z-50 text-sm font-semibold animate-bounce flex items-center space-x-2">
      <span>{message}</span>
    </div>
  );
};

export default Toast;
