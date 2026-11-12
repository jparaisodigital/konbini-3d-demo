import CheckoutSign from './CheckoutSign.jsx'
import ShoppingBasket from './ShoppingBasket.jsx'
import BarcodeScanner from './BarcodeScanner.jsx'
import CashierPOS from './CashierPOS.jsx'
import KonbiniPoster from './KonbiniPoster.jsx'
import KonbiniCeiling from './KonbiniCeiling.jsx'
import ShelfPriceTag from './ShelfPriceTag.jsx'
import ShelfSign from './ShelfSign.jsx'
import TiledFloor from './TiledFloor.jsx'
import OrderReceipt from './OrderReceipt.jsx'
import CheckoutPanel from './CheckoutPanel.jsx'
import CashierDetector from './CashierDetector.jsx'
import CartPanel from './CartPanel.jsx'
import useShoppingCart from './useShoppingCart.js'
import { useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import { useEffect } from 'react'
import ProductInspection from './ProductInspection.jsx'
import { useState } from 'react'
import ProductDetector from './ProductDetector.jsx'
import GroceryProduct from './GroceryProduct.jsx'
import { Canvas } from '@react-three/fiber'
import FirstPersonController from './FirstPersonController.jsx'

function Shelf({ position, products, category }) {
  const levels = [0.25, 0.85, 1.45, 2.05]

  return (
    <group position={position}>
      {/* Vertical metal supports */}
      {[-2.4, 2.4].map((x) =>
        [-0.7, 0.7].map((z) => (
          <mesh key={`${x}-${z}`} position={[x, 1.15, z]} castShadow>
            <boxGeometry args={[0.12, 2.3, 0.12]} />
            <meshStandardMaterial color="#424a50" metalness={0.6} roughness={0.4} />
          </mesh>
        ))
      )}

      {/* Horizontal shelf levels */}
      {levels.map((y) => (
        <mesh key={y} position={[0, y, 0]} castShadow receiveShadow>
          <boxGeometry args={[5, 0.1, 1.6]} />
          <meshStandardMaterial color="#d8b98c" roughness={0.7} />
        </mesh>
      ))}

      {/* Back panel */}
      <mesh position={[0, 1.15, 0]} castShadow>
        <boxGeometry args={[4.9, 2.3, 0.08]} />
        <meshStandardMaterial color="#69757a" />
      </mesh>

      {/* Grocery products */}
      {[0.25, 0.85, 1.45].map((level, row) =>
        Array.from({ length: 10 }, (_, i) => {
          const types = products
          const colors = ['#e8a23c', '#e85d4a', '#69a9a0', '#a67bc2', '#e0cf69']

          return (
            <GroceryProduct
              key={`${row}-${i}`}
              type={types[(i + row) % types.length]}
              color={colors[(i + row) % colors.length]}
              position={[-2.15 + i * 0.47, level + 0.33, -0.45]}
              scale={0.9}
            />
          )
        })
      )}

      {/* Individual product shelf price tags */}
      {[0.25, 0.85, 1.45].map((level, row) =>
        Array.from({ length: 10 }, (_, i) => {
          const type = products[(i + row) % products.length]
          const x = -2.15 + i * 0.47

          return (
            <group key={`price-${row}-${i}`}>
              <group position={[x, level + 0.01, 0.815]}>
                <ShelfPriceTag type={type} />
              </group>
              <group position={[x, level + 0.01, -0.815]} rotation={[0, Math.PI, 0]}>
                <ShelfPriceTag type={type} />
              </group>
            </group>
          )
        })
      )}

      {/* Top header */}
      <mesh position={[0, 2.5, 0]}>
        <boxGeometry args={[5, 0.35, 1.7]} />
        <meshStandardMaterial color="#d9503d" />
      </mesh>

      {/* Japanese aisle category signs - visible from both sides */}
      <group position={[0, 2.5, 0.91]}>
        <ShelfSign category={category} />
      </group>
      <group position={[0, 2.5, -0.91]}>
        <ShelfSign category={category} />
      </group>
    </group>
  )
}

function ExteriorBackdrop() {
  const texture = useTexture('/konbini-street.webp')

  texture.wrapS = 1001
  texture.wrapT = 1001
  texture.repeat.set(0.74, 0.68)
  texture.offset.set(0.13, 0.18)

  return (
    <mesh position={[0, 2.5, 8.85]} rotation={[0, Math.PI, 0]}>
      <planeGeometry args={[9, 5]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  )
}
function CashierSprite() {
  const source = useTexture('/konbini-cashier-atlas.webp')

  const texture = useMemo(() => {
    const copy = source.clone()
    copy.repeat.set(0.5, 0.5)
    copy.offset.set(0, 0.5)
    copy.needsUpdate = true
    return copy
  }, [source])

  useEffect(() => {
    return () => texture.dispose()
  }, [texture])

  useFrame(({ clock }) => {
    const frame = Math.floor(clock.getElapsedTime() * 2.5) % 4
    const column = frame % 2
    const row = Math.floor(frame / 2)

    texture.offset.set(
      column * 0.5,
      (1 - row) * 0.5
    )
  })

  return (
    <sprite position={[0, 2.15, -7.95]} scale={[1.9, 2.5, 1]}>
      <spriteMaterial
        map={texture}
        transparent
        alphaTest={0.05}
        depthWrite={false}
        toneMapped={false}
      />
    </sprite>
  )
}
function Supermarket() {
  return (
    <group>
      <TiledFloor />
      <KonbiniCeiling />

      <mesh position={[0, 2.5, -9]}>
        <boxGeometry args={[9, 5, 0.3]} />
        <meshStandardMaterial color="#e5e2d9" />
      </mesh>

      {/* Retro Japanese promotional poster behind cashier */}
      <group position={[-2.9, 2.65, -8.82]}>
        <KonbiniPoster />
      </group>

      {/* Japanese cashier sign above the counter */}
      <group position={[0, 4.15, -8.82]}>
        <CheckoutSign />
      </group>

      <mesh position={[-4.5, 2.5, 0]}>
        <boxGeometry args={[0.3, 5, 18]} />
        <meshStandardMaterial color="#e5e2d9" />
      </mesh>

      <mesh position={[4.5, 2.5, 0]}>
        <boxGeometry args={[0.3, 5, 18]} />
        <meshStandardMaterial color="#e5e2d9" />
      </mesh>

      {/* Front storefront entrance */}
      <group position={[0, 0, 8.55]}>
        {/* top beam */}
        <mesh position={[0, 4.15, 0]}>
          <boxGeometry args={[9, 0.3, 0.25]} />
          <meshStandardMaterial color="#d9d3c8" />
        </mesh>

        {/* left frame */}
        <mesh position={[-4.35, 2.05, 0]}>
          <boxGeometry args={[0.22, 4.1, 0.25]} />
          <meshStandardMaterial color="#cfc8bc" />
        </mesh>

        {/* right frame */}
        <mesh position={[4.35, 2.05, 0]}>
          <boxGeometry args={[0.22, 4.1, 0.25]} />
          <meshStandardMaterial color="#cfc8bc" />
        </mesh>



        {/* left glass panel */}
        <mesh position={[-2.15, 2.0, 0]}>
          <boxGeometry args={[4.1, 4, 0.06]} />
          <meshStandardMaterial
            color="#dff4ff"
            transparent
            opacity={0.28}
            roughness={0.08}
            metalness={0.1}
          />
        </mesh>

        {/* right glass panel */}
        <mesh position={[2.15, 2.0, 0]}>
          <boxGeometry args={[4.1, 4, 0.06]} />
          <meshStandardMaterial
            color="#dff4ff"
            transparent
            opacity={0.28}
            roughness={0.08}
            metalness={0.1}
          />
        </mesh>

        {/* signage band */}
        <mesh position={[0, 4.75, 0]}>
          <boxGeometry args={[9, 0.9, 0.3]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      </group>

      <ExteriorBackdrop />

      {/* Japanese konbini: wall-side shelves */}
      <group rotation={[0, -Math.PI / 2, 0]}>
        <Shelf position={[-3.5, 0, 3.3]} products={['chips', 'sticks']} category='snacks' />
        <Shelf position={[2.5, 0, 3.3]} products={['ramen']} category='ramen' />
      </group>

      <group rotation={[0, Math.PI / 2, 0]}>
        <Shelf position={[3.5, 0, 3.3]} products={['can', 'bottle']} category='drinks' />
        <Shelf position={[-2.5, 0, 3.3]} products={['box']} category='breakfast' />
      </group>

      {/* 2D Japanese cashier */}
      <CashierSprite />

      {/* Checkout counter at the back center */}
      <group position={[0, 0, -7.5]}>
        <mesh position={[0, 0.55, 0]} castShadow receiveShadow>
          <boxGeometry args={[4, 1.1, 1.4]} />
          <meshStandardMaterial color="#477469" roughness={0.8} />
        </mesh>
        <mesh position={[0, 1.15, 0]} castShadow>
          <boxGeometry args={[4.2, 0.12, 1.6]} />
          <meshStandardMaterial color="#d7b48c" roughness={0.6} />
        </mesh>
        {/* Detailed cashier POS terminal */}
        <group position={[1.1, 1.22, -0.3]}>
          <CashierPOS />
        </group>

        {/* Handheld barcode scanner beside POS */}
        <group position={[0.35, 1.22, -0.15]}>
          <BarcodeScanner />
        </group>

        {/* Red shopping basket on the left side of the counter */}
        <group position={[-1.15, 1.22, -0.1]}>
          <ShoppingBasket />
        </group>
      </group>
    </group>
  )
}

export default function App() {
  const { cart, addItem, removeItem, clearCart, total, itemCount } = useShoppingCart()
  const [cashierNearby, setCashierNearby] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [targetProduct, setTargetProduct] = useState(null)
  const [inspectedProduct, setInspectedProduct] = useState(null)

  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [orderConfirmed, setOrderConfirmed] = useState(false)
  const [completedOrder, setCompletedOrder] = useState(null)

  useEffect(() => {
    const handleInteraction = (event) => {
      if (event.code !== 'KeyE' || event.repeat) return
      if (inspectedProduct || cartOpen || checkoutOpen || orderConfirmed) return

      if (cashierNearby) {
        event.preventDefault()
        setCheckoutOpen(true)
        document.exitPointerLock?.()
      } else if (targetProduct) {
        event.preventDefault()
        setInspectedProduct(targetProduct)
        document.exitPointerLock?.()
      }
    }

    window.addEventListener('keydown', handleInteraction)
    return () => window.removeEventListener('keydown', handleInteraction)
  }, [targetProduct, inspectedProduct, cashierNearby, cartOpen, checkoutOpen, orderConfirmed])

  const confirmDemoOrder = () => {
    if (cart.length === 0) return

    setCompletedOrder({
      items: cart.map((item) => ({ ...item })),
      total,
      orderNumber: `DEMO-${Date.now().toString(36).toUpperCase()}`,
      date: new Date().toLocaleString('en-PH'),
    })

    clearCart()
    setCheckoutOpen(false)
    setOrderConfirmed(true)
  }
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas shadows camera={{ position: [12, 12, 18], fov: 55 }}>
        <color attach="background" args={['#f0ebe2']} />
        <ambientLight color="#fff0dc" intensity={1.2} />
        <hemisphereLight args={['#fff7e8', '#a7a099', 1.0]} />
        <directionalLight
          position={[2, 9, 4]}
          color="#fff1dc"
          intensity={2}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-left={-12}
          shadow-camera-right={12}
          shadow-camera-top={12}
          shadow-camera-bottom={-12}
        />
        <Supermarket />
        <FirstPersonController />
        <ProductDetector onTargetChange={setTargetProduct} />
        <CashierDetector onNearbyChange={setCashierNearby} />
      </Canvas>
      <button
        type='button'
        aria-label='Open shopping cart'
        onClick={() => { document.exitPointerLock?.(); setCartOpen(true) }}
        style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          padding: '10px 14px',
          background: '#294d46',
          color: '#ffffff',
          fontSize: '14px',
          fontWeight: 'bold',
          borderRadius: '8px',
          cursor: 'pointer',
          border: 'none',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 6px 18px rgba(0,0,0,0.18)',
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="9" cy="20" r="1.4" />
          <circle cx="18" cy="20" r="1.4" />
          <path d="M3 4h2l2.2 10.2a1 1 0 0 0 1 .8h8.9a1 1 0 0 0 1-.8L20 8H7" />
        </svg>
        <span>{itemCount}</span>
      </button>
      <div
        aria-label="Aim crosshair"
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          userSelect: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {targetProduct ? (
          <svg
            width="23"
            height="23"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.7))' }}
          >
            <path d="M8 13V6a2 2 0 0 1 4 0v6" />
            <path d="M12 11a2 2 0 0 1 4 0v1" />
            <path d="M16 12a2 2 0 0 1 4 0v4a6 6 0 0 1-6 6h-2a6 6 0 0 1-5-2.7l-3-4.5a2 2 0 0 1 3.1-2.5L8 14" />
          </svg>
        ) : (
          <span style={{
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            background: '#ffffff',
            boxShadow: '0 1px 3px rgba(0,0,0,0.7)',
          }} />
        )}
      </div>
      {targetProduct && !inspectedProduct && (
        <div
          style={{
            position: 'fixed',
            top: '55%',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '10px 16px',
            background: 'rgba(0, 0, 0, 0.75)',
            color: '#fff',
            fontSize: '13px',
            borderRadius: '6px',
            pointerEvents: 'none',
          }}
        >
          Press E to inspect
        </div>
      )}
      {cartOpen && (
        <CartPanel
          cart={cart}
          total={total}
          onRemove={removeItem}
          onClose={() => setCartOpen(false)}
        />
      )}
      {cashierNearby && !cartOpen && !inspectedProduct && !checkoutOpen && !orderConfirmed && (
        <div
          style={{
            position: 'fixed',
            bottom: '15%',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '12px 20px',
            background: 'rgba(0,0,0,0.78)',
            color: '#ffffff',
            borderRadius: '6px',
            fontSize: '14px',
            pointerEvents: 'none',
            zIndex: 10,
          }}
        >
          Press E to Checkout
        </div>
      )}
      {checkoutOpen && (
        <CheckoutPanel
          cart={cart}
          total={total}
          onClose={() => setCheckoutOpen(false)}
          onConfirm={confirmDemoOrder}
        />
      )}

      {orderConfirmed && completedOrder && (
        <OrderReceipt
          order={completedOrder}
          onClose={() => {
            setOrderConfirmed(false)
            setCompletedOrder(null)
          }}
        />
      )}
      <ProductInspection
        product={inspectedProduct}
        onAddToCart={addItem}
        onClose={() => setInspectedProduct(null)}
      />
    </div>
  )
}
















































