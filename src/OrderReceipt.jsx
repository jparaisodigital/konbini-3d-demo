export default function OrderReceipt({ order, onClose }) {
  if (!order) return null

  return (
    <div
      className="konbini-receipt-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Order receipt"
    >
      <style>{`
        @keyframes receiptReveal {
          from {
            opacity: 0;
            transform: translateY(45px) scaleY(0.94);
          }
          to {
            opacity: 1;
            transform: translateY(0) scaleY(1);
          }
        }

        .konbini-receipt-overlay {
          position: fixed;
          inset: 0;
          z-index: 60;
          background: rgba(12, 15, 18, 0.78);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          box-sizing: border-box;
        }

        .konbini-receipt-paper {
          box-sizing: border-box;
          width: 100%;
          max-width: 360px;
          max-height: 90vh;
          max-height: 90dvh;
          overflow-y: auto;
          background: #fffdf4;
          color: #242424;
          padding: 30px 24px;
          font-family: 'Courier New', monospace;
          box-shadow: 0 15px 50px rgba(0,0,0,0.25);
          animation: receiptReveal 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
          -webkit-overflow-scrolling: touch;
          overflow-wrap: anywhere;
        }

        .konbini-receipt-header {
          text-align: center;
          margin-bottom: 22px;
        }

        .konbini-receipt-brand {
          font-size: 26px;
          font-weight: bold;
          letter-spacing: 1px;
        }

        .konbini-receipt-japanese {
          font-size: 14px;
          margin-top: 5px;
        }

        .konbini-receipt-subtitle {
          font-size: 12px;
          margin-top: 9px;
        }

        .konbini-receipt-meta {
          border-top: 1px dashed #555;
          padding-top: 15px;
          font-size: 13px;
          line-height: 1.7;
        }

        .konbini-receipt-items {
          border-top: 1px dashed #555;
          margin-top: 16px;
          padding-top: 14px;
        }

        .konbini-receipt-item {
          margin-bottom: 15px;
          font-size: 14px;
          line-height: 1.55;
        }

        .konbini-receipt-item-name {
          margin-bottom: 4px;
          font-weight: bold;
        }

        .konbini-receipt-line {
          display: flex;
          justify-content: space-between;
          gap: 10px;
        }

        .konbini-receipt-line span:last-child {
          flex-shrink: 0;
        }

        .konbini-receipt-total {
          border-top: 1px dashed #555;
          padding-top: 16px;
          display: flex;
          justify-content: space-between;
          gap: 12px;
          font-size: 19px;
          font-weight: bold;
        }

        .konbini-receipt-footer {
          text-align: center;
          font-size: 12px;
          line-height: 1.6;
          margin-top: 24px;
          border-top: 1px dashed #555;
          padding-top: 18px;
        }

        .konbini-receipt-footer p {
          margin: 6px 0;
        }

        .konbini-receipt-return {
          margin-top: 20px;
          width: 100%;
          min-height: 46px;
          padding: 13px;
          background: #294d46;
          color: #fff;
          border: 0;
          font: bold 14px 'Courier New', monospace;
          cursor: pointer;
          touch-action: manipulation;
        }

        @media (max-width: 480px) {
          .konbini-receipt-overlay {
            padding: 12px;
          }

          .konbini-receipt-paper {
            padding: 26px 20px;
          }

          .konbini-receipt-meta {
            font-size: 14px;
          }

          .konbini-receipt-item {
            font-size: 15px;
          }

          .konbini-receipt-subtitle,
          .konbini-receipt-footer {
            font-size: 13px;
          }

          .konbini-receipt-total {
            font-size: 20px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .konbini-receipt-paper {
            animation: none;
          }
        }
      `}</style>

      <div className="konbini-receipt-paper">
        <div className="konbini-receipt-header">
          <div className="konbini-receipt-brand">
            KONBINI
          </div>

          <div className="konbini-receipt-japanese">
            ありがとうございます
          </div>

          <div className="konbini-receipt-subtitle">
            THANK YOU FOR SHOPPING!
          </div>
        </div>

        <div className="konbini-receipt-meta">
          <div>{order.date}</div>
          <div>ORDER: {order.orderNumber}</div>
          <div>TYPE: DEMO TRANSACTION</div>
        </div>

        <div className="konbini-receipt-items">
          {order.items.map((item) => (
            <div
              key={item.id}
              className="konbini-receipt-item"
            >
              <div className="konbini-receipt-item-name">
                {item.name}
              </div>

              <div className="konbini-receipt-line">
                <span>
                  {item.quantity} × ₱{item.price.toFixed(2)}
                </span>
                <span>
                  ₱{(item.quantity * item.price).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="konbini-receipt-total">
          <span>TOTAL</span>
          <span>₱{order.total.toFixed(2)}</span>
        </div>

        <div className="konbini-receipt-footer">
          <p>またお越しください</p>
          <p>PLEASE VISIT AGAIN!</p>
          <p>NO REAL PAYMENT PROCESSED</p>
        </div>

        <button
          type="button"
          className="konbini-receipt-return"
          onClick={onClose}
        >
          BACK TO STORE
        </button>
      </div>
    </div>
  )
}
