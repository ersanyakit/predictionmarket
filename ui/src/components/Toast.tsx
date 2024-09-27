import { useState, useEffect } from "react";
import styles from "../styles/styles.module.css"; // styles.css dosyasını import et

interface ToastProps {
  message: string;
  duration?: number;
}

const Toast = ({ message, duration = 3000 }: ToastProps) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    const timer = setTimeout(() => {
      setShow(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [message, duration]);

  return (
    <div className={`${styles.toast} ${show ? styles.show : ""}`}>
      {message}
    </div>
  );
};

export default Toast;
