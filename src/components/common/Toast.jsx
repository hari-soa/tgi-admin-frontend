import React, { useState, useEffect } from "react";
import {
  TOAST_CONTAINER,
  TOAST_VISIBLE,
  TOAST_HIDDEN,
} from "../../styles/ToastStyles";

export const Toast = ({ message }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);

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
      className={`${TOAST_CONTAINER} ${visible ? TOAST_VISIBLE : TOAST_HIDDEN}`}
    >
      <span>{message}</span>
    </div>
  );
};

export default Toast;
