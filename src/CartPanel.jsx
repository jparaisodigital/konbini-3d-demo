export default function CartPanel({ cart, total, onRemove, onClose }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Shopping cart"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 30,
        background: 'rgba(12, 15, 18, 0.65)',
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      <div style={{
        width: '100%',
        maxWidth: '420px',
        height: '100%',
        background: '#f5f2e9',
        color: '#242424',
        padding: '28px',
        overflowY: 'auto',
        boxShadow: '-10px 0 40px rgba(0,0,0,0.2)',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '30px',
        }}>
          <h2 style={{ margin: 0, fontSize: '26px' }}>Your Basket</h2>
          <button onClick={onClose} aria-label="Close cart"
            style={{ border: 0, background: 'none', fontSize: '26px', cursor: 'pointer' }}>
            ×
          </button>
        </div>

        {cart.length === 0 ? (
          <p>Your basket is empty. Explore the store to add some items.</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} style={{
              display: 'flex',
              gap: '15px',
              alignItems: 'center',
              padding: '16px 0',
              borderBottom: '1px solid #d8d2c6',
            }}>
              <div style={{
                width: '48px',
                height: '60px',
                background: item.color,
                borderRadius: '4px',
                flexShrink: 0,
              }} />
              <div style={{ flex: 1 }}>
                <strong>{item.name}</strong>
                <p style={{ margin: '5px 0', fontSize: '13px' }}>
                  Qty: {item.quantity}
                </p>
                <span>₱{(item.price * item.quantity).toFixed(2)}</span>
              </div>
              <button onClick={() => onRemove(item.id)}
                style={{
                  border: '1px solid #b8afa1',
                  background: 'transparent',
                  padding: '8px',
                  cursor: 'pointer',
                }}>
                Remove
              </button>
            </div>
          ))
        )}

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '30px',
          paddingTop: '20px',
          borderTop: '2px solid #242424',
          fontSize: '20px',
          fontWeight: 'bold',
        }}>
          <span>Total</span>
          <span>₱{total.toFixed(2)}</span>
        </div>

        <p style={{ color: '#6c675f', fontSize: '13px', marginTop: '18px' }}>
          Ready to check out? Walk to the cashier at the back of the store.
        </p>

        <button onClick={onClose}
          style={{
            width: '100%',
            padding: '15px',
            background: '#294d46',
            color: '#fff',
            border: 0,
            marginTop: '20px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}>
          CONTINUE SHOPPING
        </button>
      </div>
    </div>
  )
}
