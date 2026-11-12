import { useState } from 'react'

export default function KonbiniLoader({ ready = false }) {
  const [finished, setFinished] = useState(false)

  if (finished) return null

  return (
    <div
      className={`konbini-loader ${ready ? 'ready' : ''}`}
      role="status"
      aria-label={ready ? 'Opening KONBINI' : 'Loading KONBINI'}
    >
      <style>{`
        .konbini-loader {
          position: fixed;
          inset: 0;
          z-index: 9999;
          overflow: hidden;
          background: transparent;
          font-family: Arial, sans-serif;
        }

        .konbini-door {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 50.5%;
          box-sizing: border-box;
          transition: transform 1.05s cubic-bezier(0.45, 0, 0.55, 1);
          will-change: transform;
          backface-visibility: hidden;
          transform: translate3d(0, 0, 0);
          overflow: hidden;
        }

        .konbini-door.left {
          left: 0;
          background: #a8cdba;
          border: 7px solid #315c48;
          border-right: 5px solid #f5edda;
        }

        .konbini-door.right {
          right: 0;
          background: #f3b49f;
          border: 7px solid #315c48;
          border-left: 5px solid #f5edda;
        }

        .konbini-loader.ready .konbini-door.left {
          transform: translate3d(-101%, 0, 0);
        }

        .konbini-loader.ready .konbini-door.right {
          transform: translate3d(101%, 0, 0);
        }

        .konbini-door-stripe {
          position: absolute;
          left: 0;
          right: 0;
          top: 70%;
          height: 9px;
          background: #f5edda;
        }

        .konbini-door-handle {
          position: absolute;
          top: 45%;
          width: 13px;
          height: 75px;
          border-radius: 7px;
          background: #f5edda;
          border: 2px solid #315c48;
        }

        .konbini-door.left .konbini-door-handle {
          right: 18px;
        }

        .konbini-door.right .konbini-door-handle {
          left: 18px;
        }

        .konbini-loader-brand {
          position: absolute;
          z-index: 2;
          left: 50%;
          top: 35%;
          transform: translate(-50%, -50%);
          text-align: center;
          width: min(85%, 390px);
          background: #f5edda;
          border: 5px solid #315c48;
          padding: 25px 12px;
          box-sizing: border-box;
          transition: opacity 0.25s ease;
        }

        .konbini-loader.ready .konbini-loader-brand {
          opacity: 0;
          pointer-events: none;
        }

        .konbini-loader-brand h1 {
          color: #315c48;
          font-size: clamp(34px, 9vw, 60px);
          letter-spacing: 3px;
          margin: 8px 0;
          font-weight: 900;
        }

        .konbini-loader-brand .jp {
          color: #d9503d;
          font-size: 16px;
          font-weight: bold;
        }

        .konbini-loader-brand .subtitle {
          color: #315c48;
          font-size: 11px;
          letter-spacing: 2px;
          font-weight: bold;
        }

        .konbini-loader-status {
          margin-top: 16px;
          font-size: 11px;
          font-weight: bold;
          color: #d9503d;
          letter-spacing: 2px;
        }

        @media (prefers-reduced-motion: reduce) {
          .konbini-door {
            transition-duration: 0.01s;
          }
        }
      `}</style>

      <div className="konbini-door left">
        <div className="konbini-door-stripe" />
        <div className="konbini-door-handle" />
      </div>

      <div
        className="konbini-door right"
        onTransitionEnd={(event) => {
          if (
            ready &&
            event.target === event.currentTarget &&
            event.propertyName === 'transform'
          ) {
            setFinished(true)
          }
        }}
      >
        <div className="konbini-door-stripe" />
        <div className="konbini-door-handle" />
      </div>

      <div className="konbini-loader-brand">
        <span className="subtitle">WELCOME TO</span>
        <h1>KONBINI</h1>
        <span className="jp">いらっしゃいませ</span>
        <div className="konbini-loader-status">
          {ready ? 'DOORS OPENING...' : 'OPENING STORE...'}
        </div>
      </div>
    </div>
  )
}




