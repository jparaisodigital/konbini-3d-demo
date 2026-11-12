import { Html } from '@react-three/drei'

export default function CashierThoughtBubble() {
  return (
    <Html
      position={[1.05, 2.65, -7.9]}
      center
      distanceFactor={5}
      style={{
        pointerEvents: 'none',
        userSelect: 'none',
        whiteSpace: 'nowrap',
      }}
    >
      <style>{`
        .konbini-cashier-thought {
          position: relative;
          padding: 12px 16px;
          background: #f5edda;
          border: 2px solid #315c48;
          border-radius: 15px 15px 15px 5px;
          color: #315c48;
          text-align: center;
          font-family: Arial, sans-serif;
          box-shadow: 4px 5px 0 rgba(49,92,72,0.16);
          animation:
            cashierThoughtAppear 0.35s ease-out both,
            cashierThoughtFloat 3s ease-in-out 0.35s infinite;
        }

        .konbini-cashier-thought::after {
          content: '';
          position: absolute;
          bottom: -12px;
          left: 12px;
          width: 12px;
          height: 12px;
          border: 2px solid #315c48;
          border-radius: 50%;
          background: #f5edda;
        }

        .konbini-cashier-thought strong {
          display: block;
          font-size: 14px;
          font-weight: 700;
        }

        .konbini-cashier-thought span {
          display: block;
          margin-top: 5px;
          font-size: 11px;
          font-weight: 600;
          color: #d9503d;
        }

        @keyframes cashierThoughtAppear {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes cashierThoughtFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .konbini-cashier-thought {
            animation: none;
          }
        }
      `}</style>

      <div className="konbini-cashier-thought">
        <strong>Ready to checkout?</strong>
        <span>お会計ですか？</span>
      </div>
    </Html>
  )
}
