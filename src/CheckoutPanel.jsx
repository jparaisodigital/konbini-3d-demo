export default function CheckoutPanel({ cart, total, onClose, onConfirm }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Checkout"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 40,
        background: 'rgba(12,15,18,0.75)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <div style={{
        width: '100%',
        maxWidth: '460px',
        maxHeight: '90vh',
        overflowY: 'auto',
        background: '#f5f2e9',
        color: '#242424',
        padding: '30px',
        borderRadius: '8px',
      }}>
        <p style={{ fontSize: '12px', letterSpacing: '2px', color: '#477469' }}>
          JAPANESE KONBINI
        </p>

        <h2 style={{ fontSize: '28px', margin: '10px 0 20px' }}>
          Checkout
        </h2>

        {cart.length === 0 ? (
          <p>Your basket is empty. Pick some products before checking out.</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '12px',
              padding: '12px 0',
              borderBottom: '1px solid #d8d2c6',
            }}>
              <span>{item.name} × {item.quantity}</span>
              <strong>₱{(item.price * item.quantity).toFixed(2)}</strong>
            </div>
          ))
        )}

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '20px 0',
          marginTop: '15px',
          borderTop: '2px solid #242424',
          fontSize: '21px',
          fontWeight: 'bold',
        }}>
          <span>Total</span>
          <span>₱{total.toFixed(2)}</span>
        </div>

        <button
          disabled={cart.length === 0}
          onClick={onConfirm}
          style={{
            width: '100%',
            padding: '15px',
            background: cart.length ? '#477469' : '#aaa',
            color: '#fff',
            border: 0,
            cursor: cart.length ? 'pointer' : 'not-allowed',
            fontWeight: 'bold',
            marginBottom: '10px',
          }}
        >
          CONFIRM DEMO ORDER
        </button>

        <button onClick={onClose} style={{
          width: '100%',
          padding: '14px',
          background: 'transparent',
          border: '1px solid #aaa',
          cursor: 'pointer',
        }}>
          BACK TO STORE
        </button>
      </div>
    </div>
  )
}
