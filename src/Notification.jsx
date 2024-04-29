import React, { useState, useEffect } from "react";

const Notification = ({ message }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return visible ? (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "lightgreen",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 0 20px rgba(0, 0, 0, 0.3)",
        zIndex: "999",
        textAlign: "center", // Center text
        fontSize: "24px", // Larger font size
      }}
    >
      {message}
    </div>
  ) : null;
};

export default Notification;
