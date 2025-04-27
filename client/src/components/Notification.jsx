import { useState, useEffect } from 'react';
import '../styles/Notification.css';

function Notification({ message, type, duration = 3000 }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  return (
    <div className={`notification ${type}`}>
      <p>{message}</p>
    </div>
  );
}

export default Notification;