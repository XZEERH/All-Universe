"use client";
import { useEffect, useState } from "react";

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

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap');

        :root {
          --bg-body: #010103;
          --accent-purple: #9b51e0;
          --accent-cyan: #38bdf8;
          --label-red: #ff0000;
        }

        #loading-screen {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: var(--bg-body);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          z-index: 9999;
        }

        .logo-area {
          position: relative;
          width: 250px;
          height: 250px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 20px;
        }

        .eac-badge {
          font-family: 'Orbitron', sans-serif;
          font-size: 22px;
          font-weight: bold;
          color: #ffffff;
          z-index: 10;
          text-shadow: 0 0 15px rgba(168, 85, 247, 0.8);
          letter-spacing: 2px;
        }

        .orbit {
          position: absolute;
          border-radius: 50%;
          border: 2px solid;
          background: transparent;
          width: 100px;
          height: 240px;
        }

        .o1 {
          border-color: var(--accent-purple);
          box-shadow: 0 0 10px var(--accent-purple);
          animation: wheel-spin 3s linear infinite;
        }

        .o2 {
          border-color: var(--accent-cyan);
          box-shadow: 0 0 10px var(--accent-cyan);
          animation: wheel-spin-miring-1 4s linear infinite reverse;
        }

        .o3 {
          border-color: var(--label-red);
          box-shadow: 0 0 10px var(--label-red);
          animation: wheel-spin-miring-2 5s linear infinite;
        }

        @keyframes wheel-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes wheel-spin-miring-1 {
          from { transform: rotate(-45deg); }
          to { transform: rotate(315deg); }
        }

        @keyframes wheel-spin-miring-2 {
          from { transform: rotate(45deg); }
          to { transform: rotate(405deg); }
        }

        .loading-text {
          font-family: 'Orbitron', sans-serif;
          font-size: 14px;
          letter-spacing: 2px;
          margin-top: 20px;
          color: #ffffff;
          opacity: 0.9;
        }

        .dots::after {
          content: '';
          animation: dots-loading 1.5s infinite;
        }

        @keyframes dots-loading {
          0% { content: ''; }
          33% { content: '.'; }
          66% { content: '..'; }
          100% { content: '...'; }
        }
      `}</style>
    </div>
  );
}