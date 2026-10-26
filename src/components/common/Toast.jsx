import React, { useState, useEffect } from "react";

const Toast = ({ message }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);

      // Start fading out shortly before the toast is completely removed
      const timer = setTimeout(() => {
        setVisible(false);
      }, 3500);

      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [message]);

  if (!message) return null;

  return (
    <div
      className={`fixed bottom-5 right-5 bg-blue-600 text-white px-5 py-3 rounded-xl shadow-2xl z-50 text-sm font-semibold animate-bounce flex items-center space-x-2 transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <span>{message}</span>
    </div>
  );
};

export default Toast;
