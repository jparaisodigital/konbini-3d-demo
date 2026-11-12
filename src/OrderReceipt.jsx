export default function OrderReceipt({ order, onClose }) {
  if (!order) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Order receipt"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 60,
        background: 'rgba(12,15,18,0.78)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
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

        @media (prefers-reduced-motion: reduce) {
          [role="dialog"] > div {
            animation: none !important;
          }
        }
      `}</style>
      <div style={{
        width: '100%',
        maxWidth: '340px',
        maxHeight: '90vh',
        overflowY: 'auto',
        background: '#fffdf4',
        color: '#242424',
        padding: '30px 24px',
        fontFamily: "'Courier New', monospace",
        boxShadow: '0 15px 50px rgba(0,0,0,0.25)',
        animation: 'receiptReveal 0.55s cubic-bezier(0.22, 1, 0.36, 1) both',
      }}>
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

        @media (prefers-reduced-motion: reduce) {
          [role="dialog"] > div {
            animation: none !important;
          }
        }
      `}</style>
      <div style={{ textAlign: 'center', marginBottom: '22px' }}>
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

        @media (prefers-reduced-motion: reduce) {
          [role="dialog"] > div {
            animation: none !important;
          }
        }
      `}</style>
      <div style={{ fontSize: '26px', fontWeight: 'bold' }}>
            KONBINI
          </div>
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

        @media (prefers-reduced-motion: reduce) {
          [role="dialog"] > div {
            animation: none !important;
          }
        }
      `}</style>
      <div style={{ fontSize: '13px', marginTop: '4px' }}>
            ありがとうございます
          </div>
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

        @media (prefers-reduced-motion: reduce) {
          [role="dialog"] > div {
            animation: none !important;
          }
        }
      `}</style>
      <div style={{ fontSize: '11px', marginTop: '8px' }}>
            THANK YOU FOR SHOPPING!
          </div>
        </div>

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

        @media (prefers-reduced-motion: reduce) {
          [role="dialog"] > div {
            animation: none !important;
          }
        }
      `}</style>
      <div style={{ borderTop: '1px dashed #555', paddingTop: '15px', fontSize: '12px' }}>
          <div>{order.date}</div>
          <div>ORDER: {order.orderNumber}</div>
          <div>TYPE: DEMO TRANSACTION</div>
        </div>

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

        @media (prefers-reduced-motion: reduce) {
          [role="dialog"] > div {
            animation: none !important;
          }
        }
      `}</style>
      <div style={{ borderTop: '1px dashed #555', marginTop: '16px', paddingTop: '14px' }}>
          {order.items.map((item) => (
            <div key={item.id} style={{ marginBottom: '12px', fontSize: '12px' }}>
              <div>{item.name}</div>
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

        @media (prefers-reduced-motion: reduce) {
          [role="dialog"] > div {
            animation: none !important;
          }
        }
      `}</style>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{item.quantity} × ₱{item.price.toFixed(2)}</span>
                <span>₱{(item.quantity * item.price).toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>

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

        @media (prefers-reduced-motion: reduce) {
          [role="dialog"] > div {
            animation: none !important;
          }
        }
      `}</style>
      <div style={{
          borderTop: '1px dashed #555',
          paddingTop: '15px',
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '17px',
          fontWeight: 'bold',
        }}>
          <span>TOTAL</span>
          <span>₱{order.total.toFixed(2)}</span>
        </div>

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

        @media (prefers-reduced-motion: reduce) {
          [role="dialog"] > div {
            animation: none !important;
          }
        }
      `}</style>
      <div style={{
          textAlign: 'center',
          fontSize: '11px',
          marginTop: '24px',
          borderTop: '1px dashed #555',
          paddingTop: '18px',
        }}>
          <p>またお越しください</p>
          <p>PLEASE VISIT AGAIN!</p>
          <p>NO REAL PAYMENT PROCESSED</p>
        </div>

        <button onClick={onClose} style={{
          marginTop: '20px',
          width: '100%',
          padding: '13px',
          background: '#294d46',
          color: '#fff',
          border: 0,
          fontFamily: 'inherit',
          fontWeight: 'bold',
          cursor: 'pointer',
        }}>
          BACK TO STORE
        </button>
      </div>
    </div>
  )
}

