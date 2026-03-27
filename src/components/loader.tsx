"use client";
import { useEffect, useState } from "react";
import "../index.css"; // sambungkan ke CSS global

export default function Loader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div id="loading-screen">
      <div className="logo-area">
        <div className="orbit o1"></div>
        <div className="orbit o2"></div>
        <div className="orbit o3"></div>
        <div className="eac-badge">EAC</div>
      </div>

      <div className="loading-text">
        MASUK KE SISTEM<span className="dots"></span>
      </div>
    </div>
  );
}