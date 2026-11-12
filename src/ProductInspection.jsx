import ProductPreview from './ProductPreview.jsx'
const productDetails = {
  box: { name: 'Konbini Crunch Cereal', price: 149, category: 'Breakfast & Pantry' },
  ramen: { name: 'Tokyo Cup Ramen', price: 79, category: 'Instant Noodles' },
  chips: { name: 'Golden Potato Chips', price: 65, category: 'Snacks' },
  can: { name: 'Retro Canned Coffee', price: 55, category: 'Coffee & Drinks' },
  bottle: { name: 'Japanese Bottled Tea', price: 89, category: 'Beverages' },
  sticks: { name: 'Sweet Snack Sticks', price: 99, category: 'Sweet Snacks' },
}

export default function ProductInspection({ product, onClose, onAddToCart }) {
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
            right: '12px',
            top: '12px',
            width: '44px',
            height: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#ffffff',
            color: '#234536',
            border: '1px solid #d8d2c6',
            borderRadius: '50%',
            fontSize: '26px',
            lineHeight: 1,
            fontWeight: 'bold',
            cursor: 'pointer',
            touchAction: 'manipulation',
            zIndex: 2,
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
          <ProductPreview product={product} />
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
          onClick={() => {
            onAddToCart(product)
            onClose()
          }}
          style={{
            width: '100%',
            padding: '14px',
            marginBottom: '10px',
            background: '#477469',
            color: '#fff',
            border: 0,
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          ADD TO CART
        </button>

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




