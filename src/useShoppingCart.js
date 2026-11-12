import { useState } from 'react'

const PRODUCT_DETAILS = {
  box: { name: 'Everyday Cereal', price: 149 },
  can: { name: 'Classic Canned Goods', price: 65 },
  bottle: { name: 'Fresh Daily Drink', price: 89 },
}

export default function useShoppingCart() {
  const [cart, setCart] = useState([])

  const addItem = (product) => {
    const details = PRODUCT_DETAILS[product.type] || PRODUCT_DETAILS.box

    setCart((current) => {
      const existing = current.find((item) => item.id === product.id)

      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      return [
        ...current,
        {
          id: product.id,
          type: product.type,
          color: product.color,
          name: details.name,
          price: details.price,
          quantity: 1,
        },
      ]
    })
  }

  const removeItem = (id) => {
    setCart((current) => current.filter((item) => item.id !== id))
  }

  const clearCart = () => setCart([])

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const itemCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  )

  return {
    cart,
    addItem,
    removeItem,
    clearCart,
    total,
    itemCount,
  }
}
