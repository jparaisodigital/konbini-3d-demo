const productDetails = {
  box: { name: 'Everyday Cereal', price: 149, category: 'Breakfast & Pantry' },
  can: { name: 'Classic Canned Goods', price: 65, category: 'Canned Food' },
  bottle: { name: 'Fresh Daily Drink', price: 89, category: 'Beverages' },
}

export default function ProductInspection({ product, onClose }) {
  if (!product) return null

  const details = productDetails[product.type] || productDetails.box

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Product details"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 20,
        background: 'rgba(12, 15, 18, 0.72)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '420px',
          background: '#f5f2e9',
          color: '#202020',
          padding: '28px',
          borderRadius: '8px',
          position: 'relative',
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close product details"
          style={{
            position: 'absolute',
            right: '20px',
            top: '16px',
            background: 'transparent',
            border: 0,
            fontSize: '24px',
            cursor: 'pointer',
          }}
        >
          ×
        </button>

        <div
          style={{
            height: '180px',
            background: '#e7e2d7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '24px',
          }}
        >
          <div
            style={{
              width: product.type === 'box' ? '90px' : '65px',
              height: '115px',
              background: product.color,
              borderRadius: product.type === 'box' ? '3px' : '20px',
              boxShadow: '12px 14px 25px rgba(0,0,0,0.15)',
            }}
          />
        </div>

        <p style={{ fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase' }}>
          {details.category}
        </p>

        <h2 style={{ fontSize: '28px', margin: '10px 0' }}>
          {details.name}
        </h2>

        <p style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '22px' }}>
          ₱{details.price.toFixed(2)}
        </p>

        <button
          onClick={onClose}
          style={{
            width: '100%',
            padding: '14px',
            background: '#242424',
            color: '#fff',
            border: 0,
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          BACK TO STORE
        </button>
      </div>
    </div>
  )
}
